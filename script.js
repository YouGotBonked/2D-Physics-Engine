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

class Ball {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vel_x = 0;
    this.vel_y = 0;
    this.acc_x = 0;
    this.acc_y = 0;
    this.color = color;
    this.acceleration = 1;
    this.playerKey = false;
    this.playerArrow = false;
    BALLZ.push(this);
  }

  drawBall(color) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  //displaying the current acceleration and the velocity of the ball
  display() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.acc_x * 100, this.y + this.acc_y * 100);
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.vel_x * 10, this.y + this.vel_y * 10);
    ctx.strokeStyle = "blue";
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
    if(e.key === "Shift") {
      BRAKE = true;
      if(brakeAmt < 1) {
        brakeAmt+= 0.00000000000000001;
      }
    }
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
    if(e.key === "Shift") {
      BRAKE = false;
      brakeAmt = globalBrakeAmt
    }
  });

  //if true, the accelertion component gets a certain value
  if (LEFT) {
    b.acc_x = -b.acceleration;
  }
  if (UP) {
    b.acc_y = -b.acceleration;
  }
  if (RIGHT) {
    b.acc_x = b.acceleration;
  }
  if (DOWN) {
    b.acc_y = b.acceleration;
  }
  if (!UP && !DOWN) {
    b.acc_y = 0;
  }
  if (!RIGHT && !LEFT) {
    b.acc_x = 0;
  }
  var localFriction = friction;
  if((b.velocity == 0) && BRAKE) {
    brakeAmt = 1;
  }
  if(BRAKE) {
    localFriction = brakeAmt;
  }

  //acceleration values added to the velocity components
  b.vel_x += b.acc_x;
  b.vel_y += b.acc_y;
  //velocity gets multiplied by a number between 0 and 1
  b.vel_x *= 1 - localFriction;
  b.vel_y *= 1 - localFriction;
  //velocity values added to the current x, y position
  b.x += b.vel_x;
  b.y += b.vel_y;

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
    if(e.key === "Enter") {
      BRAKE2 = true;
      if(brakeAmt2 < 1) {
        brakeAmt2+= 0.000001;
      }
    }
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
    if(e.key === "Enter") {
      BRAKE2 = false;
      brakeAmt2 = globalBrakeAmt;
    }
  });

  //if true, the accelertion component gets a certain value
  if (LEFT2) {
    b.acc_x = -b.acceleration;
  }
  if (UP2) {
    b.acc_y = -b.acceleration;
  }
  if (RIGHT2) {
    b.acc_x = b.acceleration;
  }
  if (DOWN2) {
    b.acc_y = b.acceleration;
  }
  if (!UP2 && !DOWN2) {
    b.acc_y = 0;
  }
  if (!RIGHT2 && !LEFT2) {
    b.acc_x = 0;
  }
  if(b.velocity == 0 && BRAKE2) {
    brakeAmt2 = 1;
  }
  var localFriction = friction;
    if(BRAKE2) {
      localFriction = brakeAmt2;
    }

  //acceleration values added to the velocity components
  b.vel_x += b.acc_x;
  b.vel_y += b.acc_y;
  //velocity gets multiplied by a number between 0 and 1
  b.vel_x *= 1 - localFriction;
  b.vel_y *= 1 - localFriction;
  //velocity values added to the current x, y position
  b.x += b.vel_x;
  b.y += b.vel_y;

}

function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  BALLZ.forEach((b) => {
    b.drawBall(b.color);
    if (b.playerKey) {
      keyControl(b);
    }else if (b.playerArrow)
    {
      arrowControl(b);
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
      b.vel_x = 0;
      b.vel_y = 0;
      b.acc_x = 0;
      b.acc_y = 0;
    });
  }
})
let Ball1 = new Ball(200, 200, 30, "red");
Ball1.playerKey = true;
let Ball2 = new Ball(400, 200, 30, "blue");
Ball2.playerArrow = true;

requestAnimationFrame(mainLoop);
