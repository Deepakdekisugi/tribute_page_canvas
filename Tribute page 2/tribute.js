const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.height = window.innerHeight;
canvas2.width = window.innerWidth;

ctx.fillStyle = '#95d4de';
ctx.strokeStyle = 'transparent';
ctx2.fillStyle = '#95d4de';
ctx2.strokeStyle = '#78f060';

ctx.lineWidth = 1;
ctx2.lineWidth = 1;

ctx.shadowOffsetX = 8;
ctx.shadowOffsetY = 8;
ctx.shadowBlur = 15;
ctx.shadowColor = 'rgba(0,0,0,0.9)';

ctx2.shadowOffsetX = 15;
ctx2.shadowOffsetY = 15;
ctx2.shadowBlur = 15;
ctx2.shadowColor = 'rgba(0,0,0,0.5)';
let hue = 0;
let drawing = false;
let timer = 0;

let sparks = [];
const mouse = {
    x: 0,
    y: 0,
}
let direction = 1;
let size = 10;

class Spark {
    constructor(x,y){
        this.x = x;
        this.y = y//;
        this.size = Math.random() * 20 + 10;
        this.speedX = Math.random() * 4 - 2;
        this.weight = Math.random() * 5 - 1;
        this.markedForDeletion = false;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }
    update(){
        this.x += this.speedX + Math.sin(angle) * 2;
        this.angle += this.va;
        if (this.size > 0.4) {
            this.size -= 0.4;
        } else {
            this.markedForDeletion = true;
        }
        this.weight -= 0.05;
        this.y += this.weight + Math.cos(angle) * 2;
    }
    draw(){
        ctx2.save();
        ctx2.translate(this.x, this.y);
        ctx2.rotate(this.angle);
        drawShape(0, 0, this.size, 0.3, 12, ctx2);
        //ctx2.fillRect(0,0,10,10)
        ctx2.restore();
    }
}


function drawShape(x, y, radius, inset, n, ctx){
    
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - radius);
    for (let i = 0; i < n; i++){
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - (radius * inset));
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - radius);
    }
    ctx.restore();
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
const radius = 70;
const inset = 0.4;
const n = 2;

drawShape(120, 120, 50, 0.3, 12, ctx);
//drawShape(80, 70, 10, 1, 10, ctx);

let angle = 0;

window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('mousedown', function(){
    drawing = true;
});
window.addEventListener('mouseup', function(){
    drawing = false;
});

function animate(){
    //ctx2.fillStyle = 'hsla(60,100%,0%,0.2)';
    //ctx2.fillRect(0,0,canvas.width, canvas.height);
    sparks.forEach(object => object.update());
    sparks.forEach(object => object.draw());
    sparks = sparks.filter(object => !object.markedForDeletion); 
    console.log(sparks.length)
    requestAnimationFrame(animate);

    if (drawing){
        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        ctx.rotate(angle);
        //ctx.fillStyle = '#E45826';
        drawShape(0, 0, size, 0.3, 12, ctx);
        if (size > 100 || size < 10) direction = direction * -1;
        size += direction;
        hue+=2;
        angle -= 0.07;
        ctx.restore();
        timer++;
        if (timer % 3 === 0) sparks.push(new Spark(mouse.x, mouse.y))
    }
}
animate();