
class Cubie {
    matrix;
    highlight = false;
    x;
    y;
    z;
    fff;
    constructor(matrix, x, y, z) {
        this.matrix = matrix;
        this.x = x;
        this.y = y;
        this.z = z;
        this.fff = random(255);
    }

    set high(h) {
        this.highlight = h;
      }

    update(_x,  _y, _z){
        this.matrix = new p5.Matrix('mat4');
        this.matrix.translate([_x, _y, _z]);
        console.log(_x);
        console.log(_y);
        console.log(_z);
        //console.log(this.matrix);
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

    show() {
        fill(this.fff);
        if (this.highlight) {
            fill(50);
        }
        stroke(0);
        strokeWeight(1);
        push();
        applyMatrix(...this.matrix.mat4);
        box(1);
        pop();
    }

}
