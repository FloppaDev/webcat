
export class V2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

export class Transform {

    constructor(
        position /*V2*/, 
        depth /*float*/,
        angle /*float*/, 
        scale /*V2*/
    ) {
        this.position = position;
        this.angle = angle;
        this.scale = scale;
        this.is_active = true; //TODO set from blender

        //TODO matrix
    }

    //TODO return a matrix
    // Returns the transform as bytes, for use in shader code.
    bytes() {
        let bytes = new ArrayBuffer(4*2);
        bytes[0] = this.position.x;
        bytes[1] = this.position.y;

        return bytes;
    }

}

export class Bounds {

    constructor(
        left /*float*/,
        right /*float*/,
        down /*float*/,
        up /*float*/,
    ) {
        this.left = left;
        this.right = right;
        this.down = down;
        this.up = up;
    }

    is_visible(camera /*camera.js/Camera*/) {
        return true;
        //TODO clipping
    }

}
