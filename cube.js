face_colors = ['#FF0092', '#FFCA1B', '#B6FF00', '#228DFF', '#BA01FF', '#FFFFFF'];
inside_color = '#000000';

class Face {
    normal;
    c;

    constructor(normal, c) {
        this.normal = normal;
        this.c = c;
    }

    turnZ(angle) {
        let v2 = createVector(
            round(this.normal.x * cos(angle) - this.normal.y * sin(angle)),
            round(this.normal.x * sin(angle) + this.normal.y * cos(angle)),
            round(this.normal.z)
        );
        this.normal = v2;
    }

    turnY(angle) {
        let v2 = createVector(
            round(this.normal.x * cos(angle) - this.normal.z * sin(angle)),
            round(this.normal.y),
            round(this.normal.x * sin(angle) + this.normal.z * cos(angle)),

        );
        this.normal = v2;
    }

    turnX(angle) {
        let v2 = createVector(
            round(this.normal.x),
            round(this.normal.y * cos(angle) - this.normal.z * sin(angle)),
            round(this.normal.y * sin(angle) + this.normal.z * cos(angle)),

        );
        this.normal = v2;
    }

    show() {
        push();
        fill(this.c);
        noStroke();
        rectMode(CENTER);
        translate(0.5 * this.normal.x, 0.5 * this.normal.y, 0.5 * this.normal.z);
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

    constructor(matrix, _x, _y, _z) {
        this.matrix = matrix;
        this.x = _x;
        this.y = _y;
        this.z = _z;

        this.faces = [
            new Face(createVector(0, 0, -1), this.z == -1 ? color(face_colors[0]) : color(inside_color)),
            new Face(createVector(0, 0, 1), this.z == 1 ? color(face_colors[1]) : color(inside_color)),
            new Face(createVector(0, 1, 0), this.y == 1 ? color(face_colors[2]) : color(inside_color)),
            new Face(createVector(0, -1, 0), this.y == -1 ? color(face_colors[3]) : color(inside_color)),
            new Face(createVector(1, 0, 0), this.x == 1 ? color(face_colors[4]) : color(inside_color)),
            new Face(createVector(-1, 0, 0), this.x == -1 ? color(face_colors[5]) : color(inside_color)),
        ]
    }

    turnFacesZ(dir) {
        for (let f of this.faces) {
            f.turnZ(dir * HALF_PI);
        }
    }

    turnFacesY(dir) {
        for (let f of this.faces) {
            f.turnY(dir * HALF_PI);
        }
    }

    turnFacesX(dir) {
        for (let f of this.faces) {
            f.turnX(dir * HALF_PI);
        }
    }

    update(_x, _y, _z) {
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
        for (let f of this.faces) {
            f.show()
        }
        pop();
    }
}