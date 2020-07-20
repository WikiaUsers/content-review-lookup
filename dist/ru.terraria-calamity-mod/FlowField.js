/*
  Johan Karlsson (DonKarlssonSan)
  2017
*/
class Particle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.prevPos = new Vector(x, y);
    this.vel = new Vector(Math.random() - 0.5, Math.random() - 0.5);
    this.acc = new Vector(0, 0);
  }
  
  move(acc) {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
    if(acc) {
      this.acc.addTo(acc);
    }
    this.vel.addTo(this.acc);
    this.pos.addTo(this.vel);
    if(this.vel.getLength() > config.particleSpeed) {
      this.vel.setLength(config.particleSpeed);
    }
    this.acc.x = 0;
    this.acc.y = 0;
  }
    
  drawLine() {
    ctx.beginPath();
    ctx.moveTo(this.prevPos.x, this.prevPos.y);
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.stroke();  
  }
  
  wrap() {
    if(this.pos.x > w) {
      this.prevPos.x = this.pos.x = 0;
    } else if(this.pos.x < 0) {
      this.prevPos.x = this.pos.x = w - 1;
    }
    if(this.pos.y > h) {
      this.prevPos.y = this.pos.y = 0;
    } else if(this.pos.y < 0) {
      this.prevPos.y = this.pos.y = h - 1;
    }
  }
}

let canvas;
let ctx;
let field;
let w, h;
let size;
let columns;
let rows;
let noiseZ;
let hue;
let particles;
let config;
let colorConfig;
let buffer32;

function setup() {
  size = 3;
  noiseZ = 0;
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", reset);  
  config = {
    zoom: 80,
    noiseSpeed: 0.007,
    particleSpeed: 1,
    fieldForce: 20,
  };

  colorConfig = {
    particleOpacity: 0.08,
    baseHue: 120,
    hueRange: 15,
    hueSpeed: 0.005,
    colorSaturation: 90,
  };
  reset();
}

function reset() {
  hue = colorConfig.baseHue;
  noise.seed(Math.random());  
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  columns = Math.floor(w / size) + 1;
  rows = Math.floor(h / size) + 1;
  initParticles();
  initField();
  drawText();
  drawBackground(1);
}

function initParticles() {
  particles = [];
  let numberOfParticles = w * h / 300;
  for(let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle(Math.random() * w, Math.random() * h);
    particles.push(particle);
  }
}

function draw() {
  requestAnimationFrame(draw);
  calculateField();
  noiseZ += config.noiseSpeed;
  drawParticles();
}

function initField() {
  field = new Array(columns);
  for(let x = 0; x < columns; x++) {
    field[x] = new Array(columns);
    for(let y = 0; y < rows; y++) {
      field[x][y] = new Vector(0, 0);
    }
  }  
}

function calculateField() {
  let x1;
  let y1;
  for(let x = 0; x < columns; x++) {
    for(let y = 0; y < rows; y++) {
      let color = buffer32[y*size * w + x*size];
      if (color) {
        x1 = (Math.random()-0.5) * 3;
        y1 = (Math.random()-0.5) * 3;
      } else {
        x1 = noise.simplex3(x/config.zoom, y/config.zoom, noiseZ) * config.fieldForce / 20;
        y1 = noise.simplex3(x/config.zoom + 40000, y/config.zoom + 40000, noiseZ) * config.fieldForce / 20;
        
      }
      field[x][y].x = x1;
      field[x][y].y = y1;
    }
  }
}

function drawBackground(alpha) {
  ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  ctx.fillRect(0, 0, w, h);
}

function drawText() {
  ctx.save();
  let text = "Cl0wn";
  let fontSize = 200;
  ctx.font = "bold " + fontSize + "px sans-serif";
  var textWidth = ctx.measureText(text).width;
  var marginLeft = (w - textWidth) * 0.5;
  var marginTop = (h - fontSize) * 0.25;

  ctx.fillStyle = "white";
  ctx.fillText(text, marginLeft, marginTop + fontSize*0.9);
  ctx.restore();
  let image = ctx.getImageData(0, 0, w, h);
  buffer32 = new Uint32Array(image.data.buffer);
}

function drawParticles() {
  hue += colorConfig.hueSpeed; 
  let h = Math.sin(hue) * colorConfig.hueRange + colorConfig.baseHue;
  ctx.strokeStyle = `hsla(${h}, ${colorConfig.colorSaturation}%, 50%, ${colorConfig.particleOpacity})`;
  let x;
  let y;
  particles.forEach(p => {
    x = p.pos.x / size;
    y = p.pos.y / size;
    let v;
    if(x >= 0 && x < columns && y >= 0 && y < rows) {
      v = field[Math.floor(x)][Math.floor(y)];
    }
    p.move(v);
    p.wrap();
    p.drawLine();
  });
}

setup();
draw();