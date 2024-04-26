const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const BALLZ = [];

let LEFT, UP, RIGHT, DOWN, BRAKE;
let LEFT2, UP2, RIGHT2, DOWN2, BRAKE2;

//velocity gets multiplied by (1-friction)
let friction = 0.05;
let globalBrakeAmt = 0.1;
let brakeAmt = globalBrakeAmt;
let brakeAmt2 = globalBrakeAmt;
//=====================
class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(v){
        return new Vector(this.x+v.x, this.y+v.y);
    }

    subtr(v){
        return new Vector(this.x-v.x, this.y-v.y);
    }

    mag(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    mult(n){
        return new Vector(this.x*n, this.y*n);
    }

    //returns a perpendicular normal vector
    normal(){
        return new Vector(-this.y, this.x).unit();
    }

    //returns a vector with same direction and 1 length
    unit(){
        if(this.mag() === 0){
            return new Vector(0,0);
        } else {
            return new Vector(this.x/this.mag(), this.y/this.mag());
        }
    }

    drawVec(start_x, start_y, n, color){
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath()
    }
    static dot(v1, v2){
        return v1.x*v2.x + v1.y*v2.y;
    }
}

class Ball {
    constructor(x, y, r, color) {
      this.pos = new Vector(x,y);
      this.r = r;
      this.vel = new Vector(0,0);
      this.acc = new Vector(0,0);
      this.color = color;
      this.acceleration = 1;
      this.playerKey = false;
      this.playerArrow = false;
      BALLZ.push(this);
    }

    drawBall(color) {
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }

    //displaying the current acceleration and the velocity of the ball
    display() {
      this.vel.drawVec(550, 400, 10, "green");
      this.acc.unit().drawVec(550, 400, 50, "blue");
      ctx.beginPath();
      ctx.arc(550, 400, 50, 0, 2*Math.PI);
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.closePath();
    }
}

function keyControl(b) {
    canvas.addEventListener('keydown', function(e) {
      if (e.key === "a" || e.key === "A") {
        LEFT = true;
      }
      if (e.key === "w" || e.key === "W") {
        UP = true;
      }
      if (e.key === "d" || e.key === "D") {
        RIGHT = true;
      }
      if (e.key === "s" || e.key === "S") {
        DOWN = true;
      }
      /*if(e.key === "Shift") {
        BRAKE = true;
        if(brakeAmt < 1) {
          brakeAmt+= 0.00000000000000001;
        }
      }*/
    });

    canvas.addEventListener('keyup', function(e) {
      if (e.key === "a" || e.key === "A") {
        LEFT = false;
      }
      if (e.key === "w" || e.key === "W") {
        UP = false;
      }
      if (e.key === "d" || e.key === "D") {
        RIGHT = false;
      }
      if (e.key === "s" || e.key === "S") {
        DOWN = false;
      }
      /*if(e.key === "Shift") {
        BRAKE = false;
        brakeAmt = globalBrakeAmt
      }*/
    });

    //if true, the accelertion component gets a certain value
    if (LEFT) {
      b.acc.x = -b.acceleration;
    }
    if (UP) {
      b.acc.y = -b.acceleration;
    }
    if (RIGHT) {
      b.acc.x = b.acceleration;
    }
    if (DOWN) {
      b.acc.y = b.acceleration;
    }
    if (!UP && !DOWN) {
      b.acc.y = 0;
    }
    if (!RIGHT && !LEFT) {
      b.acc.x = 0;
    }

    /*var localFriction = friction;
    if((b.velocity == 0) && BRAKE) {
      brakeAmt = 1;
    }
    if(BRAKE) {
      localFriction = brakeAmt;
    }*/

    b.acc = b.acc.unit().mult(b.acceleration);
    b.vel = b.vel.add(b.acc);
    b.vel = b.vel.mult(1-friction);
    b.pos = b.pos.add(b.vel);

}

function arrowControl(b) {
    canvas.addEventListener('keydown', function(e) {
      if (e.key === "ArrowLeft") {
        LEFT2 = true;
      }
      if (e.key === "ArrowUp") {
        UP2 = true;
      }
      if (e.key === "ArrowRight") {
        RIGHT2 = true;
      }
      if (e.key === "ArrowDown") {
        DOWN2 = true;
      }
      /*if(e.key === "Enter") {
        BRAKE2 = true;
        if(brakeAmt2 < 1) {
          brakeAmt2+= 0.000001;
        }
      }*/
    });

    canvas.addEventListener('keyup', function(e) {
      if (e.key === "ArrowLeft") {
        LEFT2 = false;
      }
      if (e.key === "ArrowUp") {
        UP2 = false;
      }
      if (e.key === "ArrowRight") {
        RIGHT2 = false;
      }
      if (e.key === "ArrowDown") {
        DOWN2 = false;
      }
      /*if(e.key === "Enter") {
        BRAKE2 = false;
        brakeAmt2 = globalBrakeAmt;
      }*/
    });

    //if true, the accelertion component gets a certain value
    if (LEFT2) {
      b.acc.x = -b.acceleration;
    }
    if (UP2) {
      b.acc.y = -b.acceleration;
    }
    if (RIGHT2) {
      b.acc.x = b.acceleration;
    }
    if (DOWN2) {
      b.acc.y = b.acceleration;
    }
    if (!UP2 && !DOWN2) {
      b.acc.y = 0;
    }
    if (!RIGHT2 && !LEFT2) {
      b.acc.x = 0;
    }
    /*if(b.velocity == 0 && BRAKE2) {
      brakeAmt2 = 1;
    }
    var localFriction = friction;
      if(BRAKE2) {
        localFriction = brakeAmt2;
      }*/

    b.acc = b.acc.unit().mult(b.acceleration);
    b.vel = b.vel.add(b.acc);
    b.vel = b.vel.mult(1-friction);
    b.pos = b.pos.add(b.vel);
}

function round(number, precision){
    let factor = 10**precision;
    return Math.round(number * factor) / factor;
}

function collisionDetect(b1, b2){
    if(b1.r + b2.r >= b2.pos.subtr(b1.pos).mag()){
        return true;
    } else {
        return false;
    }
}

function collisionRepositioner(b1, b2){
    let dist = b1.pos.subtr(b2.pos);
    let pen_depth = b1.r + b2.r - dist.mag();
    let pen_res = dist.unit().mult(pen_depth/2);
    b1.pos = b1.pos.add(pen_res);
    b2.pos = b2.pos.add(pen_res.mult(-1));
}

function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  BALLZ.forEach((b, index) => {
    b.drawBall(b.color);
    if (b.playerKey) {
      keyControl(b);
    }else if (b.playerArrow)
    {
      arrowControl(b);
    }

    for(let i = index+1; i<BALLZ.length; i++){
        if(collisionDetect(BALLZ[index], BALLZ[i])){
            collisionRepositioner(BALLZ[index], BALLZ[i]);
        }
    }
    b.display();
  });
  requestAnimationFrame(mainLoop);
}

canvas.addEventListener('keypress', function(e){
  if (e.key === "r"||e.key === "R")
  {
    BALLZ.forEach((b) => {
      b.x = canvas.clientWidth/2;
      b.y = canvas.clientHeight/2;
      b.vel.x = 0;
      b.vel.y = 0;
      b.acc.x = 0;
      b.acc.y = 0;
    });
  }
})
let Ball1 = new Ball(200, 200, 30, "red");
Ball1.playerKey = true;
let Ball2 = new Ball(400, 200, 30, "blue");
Ball2.playerArrow = true;

requestAnimationFrame(mainLoop);
