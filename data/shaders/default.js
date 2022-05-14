
export class Pipeline {

    // Bind vertex buffer.
    vbo = (engine /*engine.js:Engine*/, ctx /*engine.renderer.ctx*/) => {
        ctx.bindBuffer(ctx.ARRAY_BUFFER, engine.renderer.quad_vbo);
    };

    // Record VAO attributes for the vertex shader.
    vao = (
        engine /*engine.js:Engine*/,
        ctx /*engine.renderer.ctx*/, 
        program /*engine.renderer.shader_programs[x]*/
    ) => {
        let pos = ctx.getAttribLocation(program, "pos");
        ctx.bindAttribLocation(program, pos, "pos");

        ctx.vertexAttribPointer(pos, 2, ctx.FLOAT, ctx.FALSE, 0, 0);
        ctx.enableVertexAttribArray(0);
    };

    // Bind UBOs for draw.
    ubos = (
        engine /*engine.js:Engine*/,
        ctx /*engine.renderer.ctx*/, 
        program /*engine.renderer.shader_programs[x]*/,
        material /*engine.materials[x]*/
    ) => {
        engine.bind_camera(ctx, program);
        ctx.bindTexture(ctx.TEXTURE_2D, material.texture);
    };

}

export class Material {

    constructor() {
        this.texture = "grid.png";
    }

}
