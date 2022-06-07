
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
        material /*shaders:Shader.material*/
    ){
        this.index_buffer = index_buffer;
        this.material = material;
    }

}

export class Mesh {
    
    constructor(
        vertex_buffer /*VertexBuffer*/,
        primitives /*[Primitive]*/
    ) {
        this.vertex_buffer = vertex_buffer;
        this.primitives = primitives;
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

export class Node {

    constructor(parent_node /*Node*/) {
        this.transform = new Transform();
        this.parent_node = parent_node;
        this.child_nodes = [];
        this.primitives = [];
    }

}

export class Scene {

    constructor(path /*e.g. test.json*/, module /*TODO*/) {
        this.path = path;
        this.module = module;
    }

    load() {

    }

}

export class World {

    constructor(data /*data.js:Data*/) {
        this.data = data;
        this.loaded_scenes = {};
        this.active_scenes = {};
    }

    load_scene(path /*"scenes/main.json"*/) {

    }

    unload_scene(path /*"scenes/main.json"*/) {

    }

    add_scene(path /*"scenes/main.json"*/) {

    }

    remove_scene(path /*"scenes/main.json"*/) {

    }

}

