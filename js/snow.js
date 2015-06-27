var canvas = document.getElementById('snow-canvas'),
    buffer = document.createElement('canvas'),
    bufferCtx = buffer.getContext('2d'),
    width = window.innerWidth,
    height = window.innerHeight,
    counter = 0,
    ay = 0.1,
    ax = 0,
    wind = 4 * Math.random(),
    particles = [],
    ctx;

var Particle = function () {
    'use strict';
    this.x = Math.random() * width,
        this.y = -5,
        this.vx = Math.random() < 0.5 ? -1 * wind : wind,
        this.vy = Math.random(),
        this.radius = 5,
        this.mass = 10
};

Particle.prototype.draw = function () {
    'use strict';
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width || this.y > height) {
        this.x = Math.random() * width,
            this.y = 0;
        this.vy = 0;
    }
    this.vx = this.vx + ax;
    this.vy = this.vy + ay;
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

function start() {
    'use strict';
    canvas.width = width;
    canvas.height = height;
    buffer.width = width;
    buffer.height = height;
    ctx = canvas.getContext('2d');
    createParticles();
    paint();
    setInterval(paint, 30);
}

start();