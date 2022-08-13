
export class Pipeline {

    // Bind vertex buffer.
    vbo(renderer /*renderer.js:Renderer*/) {
        let {ctx, quad_vbo} = renderer;
        ctx.bindBuffer(ctx.ARRAY_BUFFER, quad_vbo);
    }

    // Record VAO attributes for the vertex shader.
    vao(
        renderer /*renderer.js:Renderer*/, 
        program /*shaders.js:Shader.program*/
    ) {
        let {ctx} = renderer;

        let pos = ctx.getAttribLocation(program, "pos");
        ctx.bindAttribLocation(program, pos, "pos");

        ctx.vertexAttribPointer(pos, 2, ctx.FLOAT, ctx.FALSE, 0, 0);
        ctx.enableVertexAttribArray(0);
    }

    // Bind UBOs for draw.
    ubos(
        renderer /*renderer.js:Renderer*/, 
        program /*shaders.js:Shader.program*/,
        material /*shaders.js:Material*/,
    ) {
        let {ctx} = renderer;

        renderer.bind_camera(ctx, program);
        ctx.bindTexture(ctx.TEXTURE_2D, material.properties.texture);
    }

    draw(renderer /*renderer.js:Renderer*/) {
        //TODO
    }

}

export class MaterialProperties {

    constructor() {
        this.texture = "grid.png";
    }

}
