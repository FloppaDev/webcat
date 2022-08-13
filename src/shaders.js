
import {Transform} from "./maths.js";

export class Shader {

    constructor(
        vert /*e.g. "default.vert"*/,
        frag /*e.g. "default.frag"*/,
        module /*e.g. data/shaders/default.js*/
    ) {
        this.vert = vert;
        this.frag = frag;
        this.program = null;
        this.module = module;
        this.pipeline = new module.Pipeline();
    }

    // Builds a shader program from sources. 
    /*Call from 'engine.js:Engine' once the renderer is initialized*/
    /*Returns Result*/
    async build(ctx /*renderer.js:Renderer.ctx*/) {
        let {vert, frag} = this;
        let shaders_dir = "data/shaders";

        let vert_source = null;
        let frag_source = null;

        await fetch(`${shaders_dir}/${vert}`)
            .then(response => response.text())
            .then(text => vert_source = text);

        await fetch(`${shaders_dir}/${frag}`)
            .then(response => response.text())
            .then(text => frag_source = text);

        let vert_stage = this.#build_stage(ctx, vert_source, ctx.VERTEX_SHADER);
        let frag_stage = this.#build_stage(ctx, frag_source, ctx.FRAGMENT_SHADER);

        let stages_result = Result.merge_err([vert_stage, frag_stage]);
        
        if(stages_result.is_err()) {
            return stages_result;
        }

        vert_stage = vert_stage.unwrap();
        frag_stage = frag_stage.unwrap();
        this.program = this.#build_program(ctx, vert_stage, frag_stage);    

        if(this.program.is_err()) {
            return this.program.chain(new Error(
                "Could not build shader program."));
        }

        this.program = this.program.unwrap();

        ctx.deleteShader(vert_stage);
        ctx.deleteShader(frag_stage);

        return Result.ok({});
    }

    // Compile shader from source.
    /*Returns Result*/
    #build_stage(ctx /*renderer.js:Renderer.ctx*/, source, stage) {
        let shader = ctx.createShader(stage);
        ctx.shaderSource(shader, source);
        ctx.compileShader(shader);

        if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
            return Result.err(new Error(ctx.getShaderInfoLog(shader)));
        }

        return Result.ok(shader);
    }

    // Combine shaders into a program.
    /*Returns Result*/
    #build_program(ctx /*renderer.js:Renderer.ctx*/, vert, frag) {
        let program = ctx.createProgram();

        // Attach shader stages.
        ctx.attachShader(program, vert);
        ctx.attachShader(program, frag);

        // Build the program.
        ctx.linkProgram(program);

        if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
            return Result.err(new Error(ctx.getProgramInfoLog(program)));
        }

        return Result.ok(program);
    }

    bind_shader(
        data /*data.js:Data*/,
        renderer /*renderer.js:Renderer*/,
        material /*Material*/,
    ) {
        let {ctx} = renderer;
        let {pipeline, program} = this;

        ctx.useProgram(program);
        pipeline.ubos(data, renderer, program, material); 
        pipeline.vao(renderer, program); 
    }

    draw(renderer /*renderer.js:Renderer*/) {
        this.pipeline.draw(renderer);
    }

}

export class DrawCall {

    constructor(
        primitive /*Primitive*/, 
        transforms /*maths.js:Transform*/
    ) {
        this.primitive = primitive;
        this.transforms = transforms;
    }

}

export class Material {

    constructor(
        data /*data.js:Data*/,
        material_module /*../data/materials/x.js*/,
    ) {
        let material_config = new material_module.Material();

        let shader_name = material_config.shader 
            ? material_config.shader
            : "default";

        this.material_module = material_module;
        this.shader = data.shaders[shader_name];

        let defaults = new this.shader.module.MaterialProperties();
        this.properties = material_config.properties(defaults);
    }

}
