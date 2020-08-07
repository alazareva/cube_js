class Move {

    angle;
    x;
    y;
    z;
    dir;
    animating = false;
    finished = false;

    constructor(x, y, z, dir) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.dir = dir;
        this.angle = 0;
    }

    copy() {
        return new Move(this.x, this.y, this.z, this.dir);
    }

    reverse() {
        this.dir *= -1;
    }

    start() {
        this.animating = true;
        this.finished = false;
        this.angle = 0;
    }

    update() {
        if (this.animating) {
            this.angle += this.dir * speed;
            if (abs(this.angle) > HALF_PI) {
                this.angle = 0;
                this.animating = false;
                this.finished = true;
                if (abs(this.z) > 0) {
                    turnZ(this.z, this.dir);
                } else if (abs(this.x) > 0) {
                    turnX(this.x, this.dir);
                } else if (abs(this.y) > 0) {
                    turnY(this.y, this.dir);
                }
            }
        }
    }

}