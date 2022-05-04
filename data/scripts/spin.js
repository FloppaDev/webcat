
// When does the script run?
on: (handler /*TODO*/) => handler.UPDATE,

// Body of the script.
run: (
    engine /*engine.js:Engine*/,
    scene /*TODO*/, 
    object /*TODO*/,
) => {
    object.transform.rotate(1 * engine.delta);
}
