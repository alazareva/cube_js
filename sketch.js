let cube = [];
var x = 0;
var y = 0;
var z = 0;

function setup() {
    createCanvas(710, 400, WEBGL);
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z ++) {
                matrix = new p5.Matrix('mat4');
                matrix.translate([x, y, z]);
                cube.push(new Cubie(matrix, x, y, z));
            }
        }
     }
     cube[0].high = true;
     //turnZ();
     smooth();
}

function keyPressed(){
    turnZ(0, 1);
}
/*
void turnZ(int index, int dir) {
  for (int i = 0; i < cube.length; i++) {
    Cubie qb = cube[i];
    if (qb.z == index) {
      PMatrix2D matrix = new PMatrix2D();
      matrix.rotate(dir*HALF_PI);
      matrix.translate(qb.x, qb.y);
      matrix.print();
      qb.update(round(matrix.m02), round(matrix.m12), round(qb.z));
      qb.turnFacesZ(dir);
    }
  }
}
*/


function rotate2d(matrix, angle) {
    s = sin(angle);
    c = cos(angle);

    m = matrix

    temp1 = m[0];
    temp2 = m[1];

    m[0] = c * temp1 + s * temp2;
    m[1] = -s * temp1 + c * temp2;

    temp1 = m[3];
    temp2 = m[4];
    
    m[3] = c * temp1 + s * temp2;
    m[4] = -s * temp1 + c * temp2;
}

function translate2d(matrix, tx, ty) {
    m = matrix
    m[2] = tx * m[0] + ty * m[1] + m[2];
    m[5] = tx * m[3] + ty * m[4] + m[5];

}

function new_2d_mat(){
    return [1.0000,  0.0000, 0.0000,
             0.0000,  1.0000,  0.0000]
}

function turnZ(index, dir){
    for (let c of cube) {
        if (c.z == index) {
            m2d = new_2d_mat();
            rotate2d(m2d, HALF_PI);
            translate2d(m2d, c.x, c.y)
            console.log('cx', c.x)
            console.log('cy', c.y)
            console.log(m2d)
            c.update(round(m2d[2]), round(m2d[5]), c.z);
        }
    }
}
  

function draw(){
    //rotateZ(frameCount * 0.01);
    //rotateX(frameCount * 0.01);
    //rotateY(frameCount * 0.01);
       
    let posX = width/2;
    let posY = height/2;
    let angle = Math.atan2(mouseY-posY, mouseX-posX);
    rotateZ(angle);
    rotateY(angle);
    rotateX(angle);
    //rotateX(frameCount * 0.01);
    //rotateY(frameCount * 0.01);
    scale(30);
    background(200);
    for (let c of cube) {
        c.show();
    }

}