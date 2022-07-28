
import {Transform} from "./maths.js";

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

export class Box {

    constructor(
        half_width /*float*/,
        half_height /*float*/,
    ) {
        this.half_width = half_width;
        this.half_height = half_height;
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

    //TODO parents are not exported.
    constructor(name /*string*/, parent_node /*Node*/) {
        this.name = name;
        this.transform = new Transform();
        this.parent_node = parent_node;
        this.child_nodes = [];
        this.mesh = null;
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
        this.dispatches = [];//TODO write dispatches
    }

    update(camera /*camera.js/Camera*/) {
        this.dispatches = [];

        for(let node of this.node) {

        }
    }

    load() {
        const {DATA} = this.data_module;
        let {nodes} = this;

        for(let {name, mesh} of DATA.objects) {
            let node = new Node(null);

            if(!mesh) {
                nodes.push(name, node);
                continue;
            }

            let vertices = [];

            for(let pos of mesh.v_positions) {
                vertices.push(...pos);
            }

            for(let uv of mesh.v_uvs) {
                vertices.push(...uv);
            }

            let vb = new VertexBuffer(vertices);
            let primitives = [];

            for(let primitive of mesh.primitives) {
                let ib = new IndexBuffer(primitive.indices);
                //TODO material indices are not exported yet.
                primitives.push(new Primitive(ib, 0/*TODO primitive.material*/));
            }

            node.mesh = new Mesh(vb, primitives); 

            nodes.push(name, node);
        }
    }

}

export class World {

    constructor(data /*data.js:Data*/) {
        this.data = data;
        this.loaded_scenes = [];
        this.active_scenes = [];
    }

    update(camera /*camera.js/Camera*/) {
        for(let scene of this.active_scenes) {
            scene.update(camera);
        }
    }

    load_scene(name /*"data.js:Data.scenes[name]"*/) {
        if(this.loaded_scenes.includes(name)) {
            return Result.err(new Error(`Scene '${name}' already loaded.`));
        }

        let scene = this.data.scenes[name];

        if(scene == undefined) {
            return Result.err(new Error(`Scene '${name}' not found.`));
        }

        scene.load();
        this.loaded_scenes.push(name);

        return Result.ok();
    }

    unload_scene(name /*"data.js:Data.scenes[name]"*/) {
        //TODO
    }

    activate_scene(name /*"data.js:Data.scenes[name]"*/) {
        if(this.active_scenes.includes(name)) {
            return Result.err(new Error(`Scene '${name}' already active.`));
        }
        
        this.active_scenes.push(name);

        return Result.ok();
    }

    deactivate_scene(name /*"data.js:Data.scenes[name]"*/) {
        this.active_scenes = this.active_scenes(s => s != name);
    }

    get_active_scenes() {
        return this.active_scenes.map(s => this.data.scenes[s]);
    }

}

