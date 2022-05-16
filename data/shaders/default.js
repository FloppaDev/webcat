
export class Pipeline {

    // Bind vertex buffer.
    vbo(renderer /*renderer.js:Renderer*/) {
        let {ctx, quad_vbo} = renderer;
        ctx.bindBuffer(ctx.ARRAY_BUFFER, quad_vbo);
    }

    // Record VAO attributes for the vertex shader.
    vao(
        renderer /*renderer.js:Renderer*/, 
        program /*renderer.js:Renderer.shader_programs[x]*/
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
        program /*engine.renderer.shader_programs[x]*/,
        material /*engine.materials[x]*/
    ) {
        let {ctx} = renderer;

        renderer.bind_camera(ctx, program);
        ctx.bindTexture(ctx.TEXTURE_2D, material.texture);
    }

    draw(
        renderer /*renderer.js:Renderer*/,
        shader_module /*Object.entries(data.js:Data.shaders)[x]*/
    ) {
        //TODO
    }

}

export class Material {

    constructor() {
        this.texture = "grid.png";
    }

}
