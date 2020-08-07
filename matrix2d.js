class Matrix2D {

    m;

    constructor() {
        this.m = [1.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000];

    }

    rotate(angle) {
        let s = sin(angle);
        let c = cos(angle);

        let temp1 = this.m[0];
        let temp2 = this.m[1];

        this.m[0] = c * temp1 + s * temp2;
        this.m[1] = -s * temp1 + c * temp2;

        temp1 = this.m[3];
        temp2 = this.m[4];

        this.m[3] = c * temp1 + s * temp2;
        this.m[4] = -s * temp1 + c * temp2;
    }

    translate(tx, ty) {
        this.m[2] = tx * this.m[0] + ty * this.m[1] + this.m[2];
        this.m[5] = tx * this.m[3] + ty * this.m[4] + this.m[5];
    }

}