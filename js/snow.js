var canvas = document.getElementById('snow-canvas'),
    buffer = document.createElement('canvas'),
    bufferCtx = buffer.getContext('2d'),
    width = window.innerWidth,
    height = window.innerHeight,
    counter = 0,
    ay = 0.3,
    ax = 0,
    wind = 4,
    particles = [],
    bounceFactor = 0.35,
    rubbingFactor = 0.65,
    ctx;

var Particle = function () {
    'use strict';
    this.x = Math.random() * width,
        this.y = -5,
        this.vx = Math.random() < 0.5 ? -1 * wind * Math.random() : wind * Math.random(),
        this.vy = Math.random(),
        this.radius = 5,
        this.mass = 10
};

Particle.prototype.setPosition = function (x, y){
    this.x = x;
    this.y = y;
};

Particle.prototype.update = function () {
    // vx and vy updates
    if (this.y > height - this.radius * 2) {
        this.vx = this.vx * rubbingFactor + ax;
        this.vy = this.vy * (-1) * bounceFactor + ay;
        this.y = height - this.radius * 2;
    } else {
        this.vx = this.vx + ax;
        this.vy = this.vy + ay;
    }
    // x and y updates
    if (this.x > width) {
        this.x = 0;
    } else if (this.x < 0) {
        this.x = width;
    } else {
        this.x += this.vx;
        this.y += this.vy;
    }
}

Particle.prototype.draw = function () {
    'use strict';
    this.update();
    bufferCtx.save();
    bufferCtx.fillStyle = 'white';
    bufferCtx.fillRect(this.x, this.y, this.radius, this.radius);
    bufferCtx.restore();

};

function createParticles() {
    'use strict';
    var i = 0,
        numberOfParticles = Math.random() * 10;
    for (; i < numberOfParticles; i += 1) {
        var aParticle = new Particle();
        particles.push(aParticle);
    }
}

function updateBuffer() {
    'use strict';
    for (var i = 0; i < particles.length; i += 1) {
        particles[i].draw(); // Redraw each particle
    }
}

// It paints a new frame
function paint() {
    'use strict';
    ctx.save();
    if (particles.length < 100 && counter > 50) {
        createParticles();
        counter = 0;
    } else {
        counter += 1;
    }
    bufferCtx.fillStyle = '#3366FF';
    bufferCtx.fillRect(0, 0, width, height);
    updateBuffer();
    ctx.drawImage(buffer, 0, 0, width, height);
    ctx.restore();
}

function listenToMouse(){
    canvas.onmousedown = function (e) {
        for(var i = 0; i < 15; i += 1) {
            var aParticle = new Particle();
            aParticle.setPosition(e.clientX, e.clientY);
            particles.push(aParticle);
        }
        e.preventDefault();
    };
}

function start() {
    'use strict';
    canvas.width = width;
    canvas.height = height;
    buffer.width = width;
    buffer.height = height;
    ctx = canvas.getContext('2d');
    createParticles();
    listenToMouse();
    paint();
    setInterval(paint, 15);
}

start();