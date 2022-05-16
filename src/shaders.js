
export class Shader {

    constructor(
        vert /*e.g. "default.vert"*/,
        frag /*e.g. "default.frag"*/,
        module /*e.g. data/shaders/default.js*/
    ) {
        this.vert = vert;
        this.frag = frag;
        this.module = module;
        this.pipeline = new module.Pipeline();
        this.material = new module.Material();
    }

    // Builds a shader program from sources. 
    /*Call from 'data.js:Data contructor'*/
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

        let vert_stage = this.#build_stage(vert_source, ctx.VERTEX_SHADER);
        let frag_stage = this.#build_stage(frag_source, ctx.FRAGMENT_SHADER);

        program = this.#build_program(vert_stage, frag_stage);    

        ctx.deleteShader(vert_stage);
        ctx.deleteShader(frag_stage);
    }

    // Compile shader from source.
    #build_stage(ctx /*renderer.js:Renderer.ctx*/, source, stage) {
        let shader = ctx.createShader(stage);
        ctx.shaderSource(shader, source);
        ctx.compileShader(shader);

        if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
            throw ctx.getShaderInfoLog(shader);
        }

        return shader;
    }

    // Combine shaders into a program.
    #build_program(ctx /*renderer.js:Renderer.ctx*/, vert, frag) {
        let program = ctx.createProgram();

        // Attach shader stages.
        ctx.attachShader(program, vert);
        ctx.attachShader(program, frag);

        // Build the program.
        ctx.linkProgram(program);

        if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
            throw ctx.getProgramInfoLog(program);
        }

        return program;
    }

    bind(renderer /*renderer.js:Renderer*/) {
        let {ctx} = renderer;

        ctx.useProgram(/*TODO*/);

        //TODO bind uniforms.

        //TODO bind VAO.
    }

    draw(renderer /*renderer.js:Renderer*/) {
        this.pipeline.draw(renderer);
    }

}
