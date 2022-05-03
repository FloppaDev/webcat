
export class Engine {

    renderer = {
        // OpenGl context.
        ctx: null,
        // Time in seconds since the engine started.
        time: 0,
        // Time between current and previous frame.
        delta: 0,
        // Glsl code for all shaders.
        shader_sources: [],
        // Shader stages go in there (VkPipeline but OpenGl)
        shader_programs: {},
        // Textures built from the images
        textures: {},
        // Vertex buffer used for all draws.
        quad_vbo: null,
        quad_vao: null,
        camera: null,
    };

    // Load OpenGl context.
    load_context = () => {
        // Create canvas and set resolution to dimensions from html element.
        const canvas = document.querySelector("#canvas");
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Get OpenGl context and set the viewport to match the canvas.
        let ctx = canvas.getContext("webgl2", {alpha: false});
        ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);

        if (ctx === null) {
            throw "Could not load WebGl.";
        }

        this.renderer.ctx = ctx;
    }

    // Load shader glsl code into shader_sources.
    load_shaders = async (data /*data.js:Data*/) => {
        let {ctx, shader_sources, shader_programs} = this.renderer;

        for(let [name, shader] of Object.entries(data.shaders)) {
            let vert = null;
            let frag = null;

            await fetch(shader.vert)
                .then(response => response.text())
                .then(text => vert = text);

            if(shader.frag != null) {
                frag = await fetch(shader.frag)
                    .then(response => response.text())
                    .then(text => frag = text);
            }

            shaders_sources[name] = { vert: vert, frag: frag };
        }

        for(let [name, stages] of Object.entries(this.assets.shader_sources)) {
            let vert = this.#build_shader(name, stages.vert, ctx.VERTEX_SHADER);
            let frag = null;

            if(stages.frag != null) {
                frag = this.#build_shader(name, stages.frag, ctx.FRAGMENT_SHADER);
            }

            shader_programs[name] = this.#build_program(name, vert, frag);    

            ctx.deleteShader(vert);

            if(frag != null) {
                ctx.deleteShader(frag);
            }
        }
    }

    // Compile shader from source.
    #build_shader = (name, source, stage) => {
        let {ctx} = this.renderer;

        let shader = ctx.createShader(stage);
        ctx.shaderSource(shader, source);
        ctx.compileShader(shader);

        if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
            console.error(`${name}:${stage}: ${ctx.getShaderInfoLog(shader)}`);
        }

        return shader;
    }

    // Combine shaders into a program.
    #build_program = (name, vert, frag) => {
        let {ctx} = this.renderer;

        let program = ctx.createProgram();

        // Attach shader stages.
        ctx.attachShader(program, vert);

        if(frag != null) {
            ctx.attachShader(program, frag);
        }

        // Build the program.
        ctx.linkProgram(program);

        if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
            console.error(ctx.getProgramInfoLog(program));
        }

        return program;
    }

}
