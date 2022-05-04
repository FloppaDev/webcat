
//shaders = [
//  shader_name: {
//
//      // Bind vertex buffer.
//      vbo: (
//          engine /*engine.js:Engine*/,
//          ctx /*engine.renderer.ctx*/
//      ) => { /*Bind VBO*/ }
//
//      // Record VAO attributes for the vertex shader.
//      vao: (
//          engine /*engine.js:Engine*/,
//          ctx /*engine.renderer.ctx*/, 
//          program /*engine.renderer.shader_programs[x]*/
//      ) => { return vao; },
//
//      // Bind UBOs for draw.
//      ubos: (
//          engine /*engine.js:Engine*/,
//          ctx /*engine.renderer.ctx*/, 
//          program /*engine.renderer.shader_programs[x]*/
//      ) => { /*Bind UBOs*/ },
//
//      // Define structure of the material, along with default values.
//      material: (engine /*engine.js:Engine*/) => { {} },
//      
//  },
//];
//

vbo: (engine, ctx) => {
    ctx.bindBuffer(ctx.ARRAY_BUFFER, engine.renderer.quad_vbo);
}

vao: (engine, ctx, program) => {
    let pos = ctx.getAttribLocation(program, "pos");
    ctx.bindAttribLocation(program, pos, "pos");

    ctx.vertexAttribPointer(pos, 2, ctx.FLOAT, ctx.FALSE, 0, 0);
    ctx.enableVertexAttribArray(0);
},

ubos: (engine, program, material) => {
    engine.bind_camera(ctx, program);
    ctx.bindTexture(ctx.TEXTURE_2D, material.texture);
},

material: (engine) => {
    {
        texture: "grid.png",
    }
},
