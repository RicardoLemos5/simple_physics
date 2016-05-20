var canvas, ctx, launch;
var fps = 60;
window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    clearCanvas();
    launch = document.getElementById("launch");
    launch.style.cursor = "pointer";
    loop();
    launch.onclick = function(){
        random();
    }
}

var width = 800;
var height = 600;

var color = "orange";
var size, x, y;
var vx, vy;
var gravity = 1;
var resistance = 1; //set values from 0 to 10 to see results
var bounceFactor = 0.9;

function clearCanvas(){
    ctx.fillStyle = "#000";
    ctx.rect(0, 0, width, height);
    ctx.fill();
}

function loop(){
    setTimeout(function(){
        clearCanvas();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, size, 0, 2*Math.PI, false);
        ctx.fill();
        ctx.closePath();
        
        vx *= (2000 - resistance * 10) / 2000;
        x += vx;
        vy += gravity;
        y += vy;
        
        if(x >= width - size){
            x = width - size;
            vx = -vx;
        }else if(x <= size){
            x = size;
            vx = -vx;
        }else if(vx > -0.01 && vx < 0.01){
            vx = 0;
        }
        
        if(y >= height - size){
            y = height - size;
            vy *= -bounceFactor;
            if(bounceFactor === 1) y += vy;
        }
        
        loop();
    }, 1000/fps);
}

function random(){
    size = Math.floor((Math.random() * 50) + 10);
    x = Math.floor((Math.random() * (width - 2*size)) + size);
    y = Math.floor((Math.random() * (height - 2*size)) + size);
    
    randX = Math.random();
    randY = Math.random();
    vx = Math.floor((Math.random() * 30) + 1);
    vy = Math.floor((Math.random() * 30) + 1);
    if(randX < 0.5) vx = -vx;
    if(randY < 0.5) vy = -vy;
}
