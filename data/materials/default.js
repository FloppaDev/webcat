
//TODO rename, MaterialConfig?
export class Material {

    constructor() {
        this.shader = "default";
    }

    test(){
        log('ok');
    }

    properties(material_properties /*shaders/x.js:MaterialProperties*/) {
        //Changes to the default values go here.

        return material_properties;
    }

} 
