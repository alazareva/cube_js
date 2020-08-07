class Face {
    normal;
    c;

    constructor(normal, c){
        this.normal = normal;
        this.c = c;
    }

    turnZ(angle){
        let v2 = createVector(
            round(this.normal.x * cos(angle) - this.normal.y * sin(angle)),
            round(this.normal.x * sin(angle) + this.normal.y * cos(angle)),
            round(this.normal.z)
        );
        this.normal = v2;
    }


    turnY(angle){
        let v2 = createVector(
            round(this.normal.x * cos(angle) - this.normal.z * sin(angle)),
            round(this.normal.y),
            round(this.normal.x * sin(angle) + this.normal.z * cos(angle)),

        );
        this.normal = v2;
    }

    turnX(angle){
        let v2 = createVector(
            round(this.normal.x),
            round(this.normal.y * cos(angle) - this.normal.z * sin(angle)),
            round(this.normal.y * sin(angle) + this.normal.z * cos(angle)),

        );
        this.normal = v2;
    }

    show(){
        push();
        fill(this.c);
        noStroke();
        rectMode(CENTER);
        translate(0.5*this.normal.x, 0.5*this.normal.y, 0.5*this.normal.z);
        if (abs(this.normal.x) > 0) {
            rotateY(HALF_PI);
          } else if (abs(this.normal.y) > 0) {
            rotateX(HALF_PI);
          }
          square(0, 0, 1);
          pop();
    }
}
class Cubie {
    matrix;
    x;
    y;
    z;
    c;
    faces;

    constructor(matrix, x, y, z) {
        this.matrix = matrix;
        this.x = x;
        this.y = y;
        this.z = z;

        let black = color(0, 0, 0);

        this.faces = [
            new Face(createVector(0, 0, -1), z == -1? color('#FF0092'): color(0, 0, 0)),
            new Face(createVector(0, 0,  1), z == 1? color('#FFCA1B'): color(0, 0, 0)),
            new Face(createVector(0, 1,  0), y == 1? color(255, 255, 255): color(0, 0, 0)),
            new Face(createVector(0, -1,  0), y == -1? color('#B6FF00'): color(0, 0, 0)),
            new Face(createVector(1, 0,  0), x == 1? color('#228DFF'): color(0, 0, 0)),
            new Face(createVector(-1, 0,  0), x == -1 ? color('#BA01FF'): color(0, 0, 0)),
        ]
    }

    turnFacesZ(dir){
        for (let f of this.faces){
            f.turnZ(dir * HALF_PI);
        }
    }

    turnFacesY(dir){
        for (let f of this.faces){
            f.turnY(dir * HALF_PI);
        }
    }


    turnFacesX(dir){
        for (let f of this.faces){
            f.turnX(dir * HALF_PI);
        }
    }

    update(_x,  _y, _z){
        this.matrix = new p5.Matrix('mat4');
        this.matrix.translate([_x, _y, _z]);
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

    show() {
        noFill();
        stroke(0);
        strokeWeight(1);
        push();
        applyMatrix(...this.matrix.mat4);
        box(1);
        for (let f of this.faces){
            f.show()
        }
        pop();
    }

}
