
export class Engine {

    renderer = {
        // OpenGl context.
        ctx: null,
        // Time in seconds since the engine started.
        time: 0,
        // Time between current and previous frame.
        delta: 0,
        // Glsl code for all shaders.
        shader_sources: {},
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
        let shaders_dir = "data/shaders";

        for(let [name, shader] of Object.entries(data.shaders)) {
            let vert = null;
            let frag = null;

            await fetch(`${shaders_dir}/${shader.vert}`)
                .then(response => response.text())
                .then(text => vert = text);

            await fetch(`${shaders_dir}/${shader.frag}`)
                .then(response => response.text())
                .then(text => frag = text);

            shader_sources[name] = { vert: vert, frag: frag };
        }

        for(let [name, stages] of Object.entries(shader_sources)) {
            let vert = this.#build_shader(name, stages.vert, ctx.VERTEX_SHADER);
            let frag = this.#build_shader(name, stages.frag, ctx.FRAGMENT_SHADER);

            shader_programs[name] = this.#build_program(name, vert, frag);    

            ctx.deleteShader(vert);
            ctx.deleteShader(frag);
        }
    }

    // Compile shader from source.
    #build_shader = (name, source, stage) => {
        let {ctx} = this.renderer;

        let shader = ctx.createShader(stage);
        ctx.shaderSource(shader, source);
        ctx.compileShader(shader);

        if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
            throw `${name}:${stage}: ${ctx.getShaderInfoLog(shader)}`;
        }

        return shader;
    }

    // Combine shaders into a program.
    #build_program = (name, vert, frag) => {
        let {ctx} = this.renderer;

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

    // Load an image from url.
    #load_image = async (url) => {
        let img;
        await new Promise(resolve => {
            img = new Image();
            img.onload = resolve;
            img.src = url;
        });

        return img;
    }

    load_textures = async (data /*data.js:Data*/) => {
        let {ctx, textures} = this.renderer;
        let textures_dir = "data/textures";

        for(let name of data.textures) {
            let img = await this.#load_image(`${textures_dir}/${name}`); 

            let texture = ctx.createTexture();
            ctx.bindTexture(ctx.TEXTURE_2D, texture);

            ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, img);
            //ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST); TODO fix

            textures[name] = texture;
        }
    }

    // Quad buffer, it will be used to render sprites.
    create_quad_vbo = () => {
        let {ctx, quad_vbo} = this.renderer;

        // Two triangles to define the quad.
        let vertices = new Float32Array([
            -1, -1,
            -1, 1,
            1, 1,
            1, 1,
            1, -1,
            -1, -1,
        ]);

        // Create buffer and upload vertices.
        quad_vbo = ctx.createBuffer();
        ctx.bindBuffer(ctx.ARRAY_BUFFER, quad_vbo);
        ctx.bufferData(ctx.ARRAY_BUFFER, vertices, ctx.STATIC_DRAW);

        // Unbind buffer.
        ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
    }

    // Called each frame.
    draw = (t) => {
        let {ctx} = this.renderer;
        let {canvas} = ctx;

        // Update time infos.
        let t_sec = t / 1000;
        this.renderer.delta = t_sec - this.renderer.time;
        this.renderer.time = t_sec;

        // Gameplay happens here.
        //TODO

        //TODO do that somewhere else {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.viewport(0, 0, canvas.width, canvas.height);

        ctx.imageSmoothingEnabled = false;//TODO not working

        let {camera} = this.renderer;
        camera.scaling_x = 1 / canvas.width * (canvas.width / canvas.height);
        camera.scaling_y = 1 / canvas.height;
        //}

        // Clear frame buffer before drawing.
        ctx.clearColor(0.0, 0.0, 0.0, 1.0);
        ctx.clear(ctx.COLOR_BUFFER_BIT);

        // Draw all objects.
        //TODO

        // Request next frame.
        window.requestAnimationFrame(this.draw);
    }   

}
