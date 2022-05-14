
export class Scene {

    config = (objects /*TODO*/) => {
        let cube = objects["Cube"];
        let spin = cube.scripts.push(scripts.spin);
        spin.speed = 2;
    };

}
