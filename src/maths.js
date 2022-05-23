
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

        //TODO matrix
    }

}
