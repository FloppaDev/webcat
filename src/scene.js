
import {Transform} from "./maths.js";
import {Mesh} from "./mesh.js";
import {DrawCall} from "./shaders.js";

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
        this.meshes = [];
        this.draw_calls = [];
    }

    update(camera /*camera.js/Camera*/) {
        this.draw_calls = [];

        for(let mesh of this.meshes) {
            if(!mesh) {
                continue;
            }

            if(mesh.is_visible(camera)) {
                let transforms = [];

                //TODO support instancing when exporting from blender.
                for(let node of mesh.nodes) {
                    transforms.push(node.transform);
                }

                for(let primitive of mesh.primitives) {
                    let {material_module} = primitive;
                    let {shader} = material_module;

                    let draw_call = new DrawCall(shader, primitive, transforms);
                    this.draw_calls.push(draw_call);
                }
            }
        }
    }

    load(data /*data.js:Data*/) {
        const {DATA} = this.data_module;
        let {nodes, meshes} = this;

        for(let {name, mesh} of DATA.objects) {
            let node = new Node(null);

            if(!mesh) {
                nodes.push(name, node);
                continue;
            }

            node.mesh = Mesh.from_json(data, node, mesh); 

            meshes.push(node.mesh);
            nodes.push(name, node);
        }
    }

}
