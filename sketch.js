let cube = [];
var x = 0;
var y = 0;
var z = 0;

var current_move;

speed = 0.5;

allMoves = [
    new Move(0, 1, 0, 1), 
    new Move(0, 1, 0, -1), 
    new Move(0, -1, 0, 1), 
    new Move(0, -1, 0, -1), 
    new Move(1, 0, 0, 1), 
    new Move(1, 0, 0, -1), 
    new Move(-1, 0, 0, 1), 
    new Move(-1, 0, 0, -1), 
    new Move(0, 0, 1, 1), 
    new Move(0, 0, 1, -1), 
    new Move(0, 0, -1, 1), 
    new Move(0, 0, -1, -1) 
];

sequence = [];
counter = 0;
started = false;
  

function setup() {
    createCanvas(710, 400, WEBGL);
    createEasyCam();
    document.oncontextmenu = ()=>false;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z ++) {
                matrix = new p5.Matrix('mat4');
                matrix.translate([x, y, z]);
                cube.push(new Cubie(matrix, x, y, z));
            }
        }
     }
     smooth();

     for (let b = 0; b < 10; b++) {
         let r = int(random(allMoves.length));
         let m = allMoves[r];
         sequence.push(m);
     }

    // current_move = sequence[counter];
     for (i = sequence.length - 1; i >= 0; i --){
         next_move = sequence[i].copy();
         next_move.reverse()
         sequence.push(next_move);
     }
     // current_move.start(); 
}

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


function keyPressed() {
    animate_move(key);
  }

  function turnZ(index, dir){
    for (let c of cube) {
        if (c.z == index) {
            m2d = new_2d_mat();
            rotate2d(m2d, dir*HALF_PI);
            translate2d(m2d, c.x, c.y)
            c.update(round(m2d[2]), round(m2d[5]), c.z);
            c.turnFacesZ(dir);
        }
    }
}


function turnY(index, dir) {
    for (let c of cube) {
      if (c.y == index) {
        m2d = new_2d_mat();
        rotate2d(m2d, dir*HALF_PI);
        translate2d(m2d, c.x, c.z);
        c.update(round(m2d[2]), c.y, round(m2d[5]));
        c.turnFacesY(dir);
      }
    }
  }

  function turnX(index, dir) {
    for (let c of cube) {
      if (c.x == index) {
        m2d = new_2d_mat();
        rotate2d(m2d, dir*HALF_PI);
        translate2d(m2d, c.y, c.z);
        c.update(c.x, round(m2d[2]), round(m2d[5]));
        c.turnFacesX(dir);
      }
    }
  }

move_lookup = {
    'u': new Move(0, 1, 0, 1), 
    'U': new Move(0, 1, 0, -1), 
    'f': new Move(0, 0, 1, 1), 
    'F': new Move(0, 0, 1, -1),
    'b':  new Move(0, 0, -1, 1),
    'B':  new Move(0, 0, -1, -1),
    'd':  new Move(0, -1, 0, 1),
    'D':  new Move(0, -1, 0, -1),
    'l':  new Move(-1, 0, 0, 1),
    'L':  new Move(-1, 0, 0, -1),
    'r':  new Move(1, 0, 0, 1),
    'R':  new Move(1, 0, 0, -1),


}

function animate_move(move){
    if (move in move_lookup & (!current_move || current_move.finished)) {
        current_move = move_lookup[move]
        current_move.start()
    }
}
  

function applyMove(move) {
    switch (move) {
    case 'f': 
      turnZ(1, 1);
      break;
    case 'F': 
      turnZ(1, -1);
      break;  
    case 'b': 
      turnZ(-1, 1);
      break;
    case 'B': 
      turnZ(-1, -1);
      break;
    case 'u': 
      turnY(1, 1);
      break;
    case 'U': 
      turnY(1, -1);
      break;
    case 'd': 
      turnY(-1, 1);
      break;
    case 'D': 
      turnY(-1, -1);
      break;
    case 'l': 
      turnX(-1, 1);
      break;
    case 'L': 
      turnX(-1, -1);
      break;
    case 'r': 
      turnX(1, 1);
      break;
    case 'R': 
      turnX(1, -1);
      break;
    }
  }


function draw(){
    background(360);
    let posX = width/2;
    let posY = height/2;
    let angle = Math.atan2(mouseY-posY, mouseX-posX);
    rotateX(-0.5);
    rotateY(0.4);
    rotateZ(0.1);  
    //rotateX(frameCount * 0.01);
    //rotateY(frameCount * 0.01);
   // rotateX(angle);
    //rotateY(angle);

    /*
    console.log(current_move.finished)
    */
    if (current_move){
        console.log('updating move', current_move.angle)
        current_move.update();
    }
    /*
    if (current_move.finished) {
      if (counter < sequence.length-1) {
        console.log('counter++')
        counter++;
        current_move = sequence[counter];
        current_move.start();
      }
    }*/


    scale(40);

    for (i = 0; i < cube.length; i++) {
        push();
        if (current_move){
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