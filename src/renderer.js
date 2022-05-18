
import {V2} from "./maths.js";
import {Camera} from "./camera.js";

export class Renderer {

    static init = () => {
        let renderer = new Renderer();

        renderer.ctx = null;                 // OpenGl context.
        renderer.time = 0;                   // Time in seconds since the engine started.
        renderer.delta = 0;                  // Time between current and previous frame.
        renderer.quad_vbo = null;            // Vertex buffer used for all draws.
        renderer.quad_vao = null;
        renderer.camera = new Camera();

        let load = renderer.#load_context();

        if(load.is_err()) {
            return load.chain(new Error("Renderer failed to start."));
        } 

        renderer.#create_quad_vbo();

        return Result.ok(renderer);
    }

    /*Call from "engine.js:Engine"*/
    // Start rendering.
    start() {
        window.requestAnimationFrame(this.#draw.bind(this));
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
            return Result.err(new Error("Could not load WebGl."));
        }

        this.ctx = ctx;
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
        let {ctx, delta, time} = this;

        // Update time infos.
        let t_sec = t / 1000;
        delta = t_sec - time;
        time = t_sec;

        // Gameplay happens here.
        //TODO

        //TODO do that somewhere else {
        let {camera} = this;
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
        window.requestAnimationFrame(this.#draw.bind(this));
    }

}
