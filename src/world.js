
export class VertexBuffer {

    /*position V3, uv: V2*/
    static STRIDE = 4*3 + 4*2;

    constructor(vertices /*[[float; STRIDE]]*/) {
        this.vertices = new Float32Array(vertices);
    }

}

export class IndexBuffer {

    constructor(indices /*[float]*/) {
        this.indices = new Float32Array(indices);
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

    constructor(primitive /*Primitive*/, transforms /*maths.js:Transform*/) {
        this.primitive = primitive;
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

