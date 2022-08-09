
import {Transform} from "./maths.js";

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
                let material = node.material;
                // get shader from material
                // make draw_call from primitive and tranform
            }
        }
    }

    load(data /*data.js:Data*/) {
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
