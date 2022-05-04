
//-------Script properties--------

// When does the script run?
on: (handler /*TODO*/) => handler.UPDATE,

order: 0,

// Body of the script.
run: (
    engine /*engine.js:Engine*/,
    scene /*TODO*/, 
    object /*TODO*/,
) => {
    object.transform.rotate(this.speed * engine.delta);
},

//-------Custom properties--------

speed: 1
