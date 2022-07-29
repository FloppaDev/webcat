
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

export class Bounds {

    constructor(
        left /*float*/,
        right /*float*/,
        down /*float*/,
        up /*float*/,
    ) {
        this.left = left;
        this.right = right;
        this.down = down;
        this.up = up;
    }

    is_visible(camera /*camera.js/Camera*/) {
        return true;
        //TODO clipping
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

export class DrawCall {

    constructor(
        primitive /*Primitive*/, 
        transform /*maths.js:Transform*/
    ) {
        this.primitive = primitive;
        this.transform = transform;
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
        //TODO material
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
        this.dispatches = [];
    }

    update(camera /*camera.js/Camera*/) {
        this.dispatches = [];

        for(let node of this.nodes) {
            if(!node.mesh) {
                continue;
            }

            if(node.mesh.is_visible(camera)) {
                //TODO
                // get shader from material
                // make draw_call from primitive and tranform
            }
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

            let left = 0;
            let right = 0;
            let down = 0; let up = 0;

            for(let pos of mesh.v_positions) {
                vertices.push(...pos);

                if(pos[0] < left) {
                    left = pos[0];
                }

                else if(pos[0] > right) {
                    right = pos[0];
                }

                if(pos[3] < down) {
                    down = pos[3];
                }

                else if(pos[3] > up) {
                    up = pos[3];
                }
            }

            let bounds = new Bounds(left, right, down, up);

            //TODO i forgor why uvs go into vertices
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

            node.mesh = new Mesh(vb, primitives, bounds); 

            nodes.push(name, node);
        }
    }

}

export class World {

    constructor(data /*data.js:Data*/) {
        this.data = data;           // data.js:Data
        this.loaded_scenes = [];    // [str]            Loaded scenes are ready for activation
        this.active_scenes = [];    // [str]            Active scenes are rendered
    }

    update(camera /*camera.js/Camera*/) {
        for(let scene of this.active_scenes) {
            this.data.scenes[scene].update(camera);
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

