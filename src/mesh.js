
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
        material_module /*shaders.js:Shader.material*/
    ){
        this.index_buffer = index_buffer;
        this.material_module = material_module;
    }

}

export class Mesh {
    
    constructor(
        nodes /*[scene.js:Node]*/,
        vertex_buffer /*VertexBuffer*/,
        primitives /*[Primitive]*/,
        bounds /*Box*/,
    ) {
        this.nodes = nodes;
        this.vertex_buffer = vertex_buffer;
        this.primitives = primitives;
        this.bounds = bounds;
    }

    static from_json = (
        data /*data.js:Data*/,
        node /*scene.js:Node*/,
        mesh /*TODO mesh object from python*/,
    ) => {
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

            let material_index = 0; //TODO material indices are not exported yet.
            let material_name = mesh.materials[material_index];
            let material = data.materials[material_name];

            primitives.push(new Primitive(ib, material));
        }

        return new Mesh([node], vb, primitives, bounds); 
    };

    is_visible(camera /*camera.js/Camera*/) {
        return this.bounds.is_visible(camera);
    }

}
