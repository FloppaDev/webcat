
export class Script {

    constructor() {
        this.speed = 1;
    }

    // When does the script run?
    on: (handler /*TODO*/) => handler.UPDATE,

    // Body of the script.
    run: (
        engine /*engine.js:Engine*/,
        scene /*TODO*/, 
        object /*TODO*/,
    ) => {
        object.transform.rotate(this.speed * engine.delta);
    },

}
