const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//array that stores all the Ball objects
const BALLZ = [];

let LEFT, UP, RIGHT, DOWN;

//creating a Ball class
class Ball{
    //special method that gets called at the instantiation
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.player = false;
        //pushing the Ball object into the BALLZ array
        BALLZ.push(this);
    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

function keyControl(b){
    canvas.addEventListener('keydown', function(e){
        if(e.key === "a" || e.key === "A"){
            LEFT = true;
        }
        if(e.key === "w" || e.key === "W"){
            UP = true;
        }
        if(e.key === "d" || e.key === "D"){
            RIGHT = true;
        }
        if(e.key === "s" || e.key === "S"){
            DOWN = true;
        }
    });

    canvas.addEventListener('keyup', function(e){
        if(e.key === "a" || e.key === "A"){
            LEFT = false;
        }
        if(e.key === "w" || e.key === "W"){
            UP = false;
        }
        if(e.key === "d" || e.key === "D"){
            RIGHT = false;
        }
        if(e.key === "s" || e.key === "S"){
            DOWN = false;
        }
    });

    if(LEFT){
        b.x--;
    }
    if(UP){
        b.y--;
    }
    if(RIGHT){
        b.x++;
    }
    if(DOWN){
        b.y++;
    }

}

function mainLoop() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    BALLZ.forEach((b) => {
        b.drawBall();
        if (b.player){
            keyControl(b);
        }
    });
    requestAnimationFrame(mainLoop);
}

//create two Ball objects
let Ball1 = new Ball(200, 200, 30);
let Ball2 = new Ball(300, 300, 20);
Ball1.player = true;

requestAnimationFrame(mainLoop);
