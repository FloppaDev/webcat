
export class Engine {

    renderer = {
        // OpenGl context.
        ctx: null,
        // Time in seconds since the engine started.
        time: 0,
        // Time between current and previous frame.
        delta: 0,
        // Result of compilation
        shaders: {},
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

}
