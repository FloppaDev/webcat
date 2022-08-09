
import {Bounds} from "./maths.js";

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
        index_buffer /*IndexBuffer*/, 
        material /*shaders.js:Shader.material*/
    ){
        this.index_buffer = index_buffer;
        //TODO wrap material module in shader.js:Material
        // and do the same for all module types.
        this.material = material;
    }

}

export class Mesh {
    
    constructor(
        vertex_buffer /*VertexBuffer*/,
        primitives /*[Primitive]*/,
        bounds /*Box*/,
    ) {
        this.vertex_buffer = vertex_buffer;
        this.primitives = primitives;
        this.bounds = bounds;
    }

    is_visible(camera /*camera.js/Camera*/) {
        return this.bounds.is_visible(camera);
    }

}
