let cube = [];
var current_move;
let speed = 0.3;


let move_lookup = {
    'u': new Move(0, 1, 0, 1),
    'f': new Move(0, 0, 1, 1),
    'b': new Move(0, 0, -1, 1),
    'd': new Move(0, -1, 0, 1),
    'l': new Move(-1, 0, 0, 1),
    'r': new Move(1, 0, 0, 1),
};


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function animate_move(move, reverse) {
    if (move in move_lookup & (!current_move || current_move.finished)) {
        current_move = move_lookup[move];
        if (reverse) {
            current_move = current_move.copy();
            current_move.reverse();
        }
        current_move.start();
    }
}


function keyPressed() {
    animate_move(key, keyIsDown(32));
}


function setup() {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('canvas');
    createEasyCam();
    document.oncontextmenu = () => false;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                matrix = new p5.Matrix('mat4');
                matrix.translate([x, y, z]);
                cube.push(new Cubie(matrix, x, y, z));
            }
        }
    }
}


function turnZ(index, dir) {
    for (let c of cube) {
        if (c.z == index) {
            m2d = new Matrix2D();
            m2d.rotate(dir * HALF_PI);
            m2d.translate(c.x, c.y)
            c.update(round(m2d.m[2]), round(m2d.m[5]), c.z);
            c.turnFacesZ(dir);
        }
    }
}


function turnY(index, dir) {
    for (let c of cube) {
        if (c.y == index) {
            m2d = new Matrix2D();
            m2d.rotate(dir * HALF_PI);
            m2d.translate(c.x, c.z);
            c.update(round(m2d.m[2]), c.y, round(m2d.m[5]));
            c.turnFacesY(dir);
        }
    }
}


function turnX(index, dir) {
    for (let c of cube) {
        if (c.x == index) {
            m2d = new Matrix2D();
            m2d.rotate(dir * HALF_PI);
            m2d.translate(c.y, c.z);
            c.update(c.x, round(m2d.m[2]), round(m2d.m[5]));
            c.turnFacesX(dir);
        }
    }
}


function draw() {
    background(360);
    rotateX(frameCount * 0.001);
    rotateY(frameCount * 0.001);

    if (current_move) {
        current_move.update();
    }

    scale(50);

    for (i = 0; i < cube.length; i++) {
        push();
        if (current_move) {
            if (abs(cube[i].z) > 0 && cube[i].z == current_move.z) {
                rotateZ(current_move.angle);
            } else if (abs(cube[i].x) > 0 && cube[i].x == current_move.x) {
                rotateX(current_move.angle);
            } else if (abs(cube[i].y) > 0 && cube[i].y == current_move.y) {
                rotateY(-current_move.angle);
            }
        }
        cube[i].show();
        pop();
    }
}