
//TODO rename, MaterialConfig?
export class Material {

    constructor() {
        //Name of the shader, it is set to "default" if omitted.
        this.shader = "default";
    }

    /*Call from shaders.js:Material.constructor*/
    /*Modifies the default properties*/
    properties(material_properties /*shaders/x.js:MaterialProperties*/) {
        //Changes to the default values go here.

        return material_properties;
    }

} 
