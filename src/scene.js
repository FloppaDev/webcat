
import {Transform} from "./maths.js";
import {Mesh} from "./mesh.js";

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
                // get material from primitive
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

            node.mesh = Mesh.from_json(mesh); 

            nodes.push(name, node);
        }
    }

}
