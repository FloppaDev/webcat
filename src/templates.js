
class Template {

    constructor(name, fields) {
        this.name = name;
        this.fields = fields;
    }

    // Check that the object has all the required fields defined.
    validate = (object /*e.g. data/shaders/default.js:Pipeline*/) => {
        //Pseudo js code. TODO

        if(object.class_name != this.name) {
            return false;
        }

        for(let field of this.fields) {
            if(object[field] === undefined) {
                return false;
            }
        }

        return true;
    }

}

const templates = [
    new Template("Pipeline", ["vbo", "vao", "ubos", "material"]),
    new Template("Material", ["properties"]),
    new Template("Scene", ["config"]),
    new Template("Script", ["on", "run"]),
]
