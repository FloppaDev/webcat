
//TODO

export class VertexBuffer {

    constructor() {
        //TODO
    }

}

export class IndexBuffer {

    constructor() {
        //TODO
    }

}

export class Primitive {

    constructor(
        vertex_buffer /*VertexBuffer*/, 
        index_buffer /*IndexBuffer*/, 
        material /*shaders:Shader.material*/
    ){
        this.vertex_buffer = vertex_buffer;
        this.index_buffer = index_buffer;
        this.material = material;
    }

}

export class DrawCall {

    constructor(primitive /*Primitive*/, transforms /*TODO*/) {
        this.object = object;
        this.transforms = transforms;
    }

}

export class Dispatch {

    constructor(shader /*shaders.js:Shader*/, draw_call /*DrawCall*/) {
        this.shader = shader;
        this.draw_call = draw_call;
    }

}

export class World {

    constructor() {
        this.draw_calls = [];
        this.primitives = [];
    }

}

