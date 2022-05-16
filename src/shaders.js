
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

    build(renderer /*renderer.js:Renderer*/) {
        //TODO
    };

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
