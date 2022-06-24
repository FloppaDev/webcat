
import {V2} from "./maths.js";
import {Camera} from "./camera.js";
import {Game} from "./game.js";

export class Renderer {

    static init = (engine /*engine.js:Engine*/) => {
        let renderer = new Renderer();

        renderer.engine = engine;           // Reference to the parent engine.
        renderer.ctx = null;                // OpenGl context.
        renderer.time = 0;                  // Time in seconds since the engine started.
        renderer.delta = 0;                 // Time between current and previous frame.
        renderer.quad_vbo = null;           // Vertex buffer used for all draws.
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
    start(world /*world.js:World*/) {
        window.requestAnimationFrame(((t) => this.#draw(world, t)).bind(this));
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

        return Result.ok({});
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
    #draw(world, t) {
        let {ctx, delta, time} = this;

        // Update time infos.
        let t_sec = t / 1000;
        delta = t_sec - time;
        time = t_sec;

        // Gameplay happens here.
        Game.update(this.engine);        
        Game.late_update(this.engine);        

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
        for(let scene of world.get_active_scenes()) {
            for(let dispatch of scene.dispatches) {
                let {shader, draw_call} = dispatch;
                let {primitive, transforms} = draw_call;

                shader.bind_shader(this);

                for (let transform of transforms) {
                    let draw = [];

                    for (let transform of transforms) {
                        if (transform.is_active) {
                            //TODO culling
                            draw.push(transform);
                        }
                    }

                    let instance_buffer = new FloatArray(draw.length());

                    for(let i in draw) {
                        let bytes = draw[i].bytes();

                        for(let b in bytes) {
                            instance_buffer[i * VertexBuffer.STRIDE + b] = bytes[b];
                        }
                    }

                    //TODO bind instance_buffer.

                    shader.draw(this);
                }
            }
        }

        // Request next frame.
        window.requestAnimationFrame(((t) => this.#draw(world, t)).bind(this));
    }

}
