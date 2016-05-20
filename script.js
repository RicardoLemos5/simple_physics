var canvas, ctx, launch;
var fps = 60;
var counter = 1;
window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    clearCanvas();
    launch = document.getElementById("launch");
    launch.style.cursor = "pointer";
    loop();
    launch.onclick = function(){
        balls.push(new Ball());
        balls[counter - 1].random();
        counter++;
    }
}

var width = 800;
var height = 600;

var balls = [];
var gravity = 1;
var resistance = 1;
var bounceFactor = 0.9;
function Ball(){
    this.color = this.randomColor();
    this.size;
    this.x;
    this.y;
    this.vx;
    this.vy;
}

Ball.prototype.update = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.closePath();
    
    this.vx *= (2000 - resistance * 10) / 2000;
    this.x += this.vx;
    this.vy += gravity;
    this.y += this.vy;
    
    if(this.x >= width - this.size){
        this.x = width - this.size;
        this.vx = -this.vx;
    }else if(this.x <= this.size){
        this.x = this.size;
        this.vx = -this.vx;
    }else if(this.vx > -0.01 && this.vx < 0.01){
        this.vx = 0;
    }
    
    if(this.y >= height - this.size){
        this.y = height - this.size;
        this.vy *= -bounceFactor;
        if(bounceFactor === 1) this.y += this.vy;
    }
};

function clearCanvas(){
    ctx.fillStyle = "#000";
    ctx.rect(0, 0, width, height);
    ctx.fill();
}

function loop(){
    setInterval(function(){
        clearCanvas();
        
        for(i = 0; i < counter; i++){
            balls[i].update();
        }
        loop();
    }, 1000/fps);
}

Ball.prototype.random = function(){
    this.size = Math.floor((Math.random() * 50) + 10);
    this.x = Math.floor((Math.random() * (width - 2*this.size)) + this.size);
    this.y = Math.floor((Math.random() * (height - 2*this.size)) + this.size);
    
    randX = Math.random();
    randY = Math.random();
    this.vx = Math.floor((Math.random() * 30) + 1);
    this.vy = Math.floor((Math.random() * 30) + 1);
    if(randX < 0.5) this.vx = -this.vx;
    if(randY < 0.5) this.vy = -this.vy;
};

Ball.prototype.randomColor = function(){
    var r = Math.floor((Math.random() * 255) + 1);
    var g = Math.floor((Math.random() * 255) + 1);
    var b = Math.floor((Math.random() * 255) + 1);
    return this.color = "rgb(" + r +"," + g + "," + b + ")";
};
