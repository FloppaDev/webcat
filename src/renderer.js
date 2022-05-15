
import {V2} from "./maths.js";
import {Camera} from "./camera.js";

export class Renderer {

    constructor(data /*data.js:Data*/) {
        this.ctx = null;                 // OpenGl context.
        this.time = 0;                   // Time in seconds since the engine started.
        this.delta = 0;                  // Time between current and previous frame.
        this.shader_sources = {};        // Glsl code for all shaders.
        this.shader_programs = {};       // Shader stages go in there (VkPipeline but OpenGl)
        this.textures = {};              // Textures built from the images
        this.quad_vbo = null;            // Vertex buffer used for all draws.
        this.quad_vao = null;
        this.camera = new Camera();

        try{ this.#load_context(); }
        catch(e){ err(e); throw "Renderer failed to start."; }

        try{ this.#load_shaders(data); }
        catch(e){ err(e); throw "Renderer failed to start."; }

        this.#load_textures(data);
        this.#create_quad_vbo();
    }

    /*Call from "engine.js:Engine"*/
    // Start rendering.
    start() {
        window.requestAnimationFrame(this.#draw);
    }

    // Load OpenGl context.
    #load_context() {
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

        this.ctx = ctx;
    }

    // Load shader glsl code into shader_sources.
    async #load_shaders(data /*data.js:Data*/) {
        let {ctx, shader_sources, shader_programs} = this;
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
    #build_shader(name, source, stage) {
        let {ctx} = this;

        let shader = ctx.createShader(stage);
        ctx.shaderSource(shader, source);
        ctx.compileShader(shader);

        if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
            throw `${name}:${stage}: ${ctx.getShaderInfoLog(shader)}`;
        }

        return shader;
    }

    // Combine shaders into a program.
    #build_program(name, vert, frag) {
        let {ctx} = this;

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
    async #load_image(url) {
        let img;
        await new Promise(resolve => {
            img = new Image();
            img.onload = resolve;
            img.src = url;
        });

        return img;
    }

    async #load_textures(data /*data.js:Data*/) {
        let {ctx, textures} = this;
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
    #create_quad_vbo() {
        let {ctx, quad_vbo} = this;

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

    // Bind camera to a uniform in specified program.
    #bind_camera(ctx, program) {
        let {camera} = this;
        let {x, y} = camera.position;
        let {scale_x, scale_y} = camera.scale; //TODO depth

        let loc = ctx.getUniformLocation(program, "camera");
        ctx.uniform4fv(loc, [x, y, scale_x, scale_y]);
    }

    // Called each frame.
    #draw(t) {
        let {ctx} = this;

        // Update time infos.
        let t_sec = t / 1000;
        delta = t_sec - time;
        time = t_sec;

        // Gameplay happens here.
        //TODO

        //TODO do that somewhere else {
        let {camera, delta, time} = this;
        let {canvas} = ctx;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.viewport(0, 0, canvas.width, canvas.height);

        ctx.imageSmoothingEnabled = false;//TODO not working

        camera.scale.x = 1 / canvas.width * (canvas.width / canvas.height);
        camera.scale.x = 1 / canvas.height;
        //}

        // Clear frame buffer before drawing.
        ctx.clearColor(0.0, 0.0, 0.0, 1.0);
        ctx.clear(ctx.COLOR_BUFFER_BIT);

        // Draw all objects.
        for (let [program, calls] of Object.entries(this.scene.draw_calls)) {
            //TODO bind program

            for (let [object, transforms] of Object.entries(calls)) {
                let draw = [];

                for (let transform of transform) {
                    if (transform.is_active) {
                        //TODO
                        draw.push(transform);
                    }
                }

                //TODO bind ubos
                //TODO draw object with all transforms.
            }
        }

        // Request next frame.
        window.requestAnimationFrame(this.draw);
    }

}
