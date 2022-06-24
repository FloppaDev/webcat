
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

    constructor(
        primitive /*Primitive*/, 
        transforms /*maths.js:Transform*/
    ) {
        this.primitive = primitive;
        this.transforms = transforms;
    }

}

export class Dispatch {

    constructor(
        shader /*shaders.js:Shader*/, 
        draw_call /*DrawCall*/
    ) {
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

    constructor(
        data_module /*data/scenes/x.json.js*/,
        script_module /*data/scenes/x.js*/
    ) {
        this.data_module = data_module;
        this.script_module = script_module;
        this.nodes = [];
    }

    load() {
        log(this.data_module.DATA);
    }

}

export class World {

    constructor(data /*data.js:Data*/) {
        this.data = data;
        this.loaded_scenes = [];
        this.active_scenes = [];
    }

    load_scene(name /*"data.js:Data.scenes[name]"*/) {
        if(this.loaded_scenes.includes(name)) {
            return Result.err(new Error(`Scene '${name}' already loaded.`));
        }

        let scene = this.data.scenes[name];

        if(scene == undefined) {
            return Result.err(new Error(`Scene '${name}' not found.`));
        }

        let load = scene.load();

        if(load.is_err()) {
            return load.chain(new Error(`Failed to load scene '${name}'.`));
        }

        this.loaded_scenes.push(name);
    }

    unload_scene(name /*"data.js:Data.scenes[name]"*/) {
        //TODO
    }

    activate_scene(name /*"data.js:Data.scenes[name]"*/) {
        if(this.active_scenes.includes(name)) {
            return Result.err(new Error(`Scene '${name}' already active.`));
        }
        
        this.active_scenes.push(name);
    }

    deactivate_scene(name /*"data.js:Data.scenes[name]"*/) {
        this.active_scenes = this.active_scenes(s => s != name);
    }

    get_active_scenes() {
        return this.active_scenes.map(s => this.data.scenes[s]);
    }

}

