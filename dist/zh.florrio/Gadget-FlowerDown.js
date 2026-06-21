(function () {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '9998';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  var w, h;
  var petals = [];
  var PETAL_COUNT = 50;
  var globalWind = -1.5; // 固定风向：从右向左吹
  var targetWind = -1.5;
  var mouseX = 0;

  // 花瓣颜色数组
  var colors = [
    '#FFB7C5',
    '#FF9EAF',
    '#FF85A2',
    '#FFC0CB',
    '#FFD1DC',
    '#FFE4E1',
    '#FFAAB7',
  ];

  // 光束系统
  var beams = [];
  var BEAM_COUNT = 6;

  function Beam() {
    this.reset();
  }

  Beam.prototype.reset = function () {
    this.x = w * 0.6 + Math.random() * w * 0.4; // 光束从右侧开始
    this.width = 40 + Math.random() * 80;
    this.height = h * (0.4 + Math.random() * 0.6);
    this.opacity = 0.03 + Math.random() * 0.06;
    this.swaySpeed = 0.0005 + Math.random() * 0.001;
    this.swayAmount = 30 + Math.random() * 60;
    this.swayOffset = Math.random() * Math.PI * 2;
    this.twinkleSpeed = 0.02 + Math.random() * 0.03;
    this.twinkleOffset = Math.random() * Math.PI * 2;
  };

  Beam.prototype.update = function (time) {
    this.x += Math.sin(time * this.swaySpeed + this.swayOffset) * 0.3;
    this.currentOpacity = this.opacity + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.02;
  };

  Beam.prototype.draw = function () {
    ctx.save();
    
    // 光束从右上斜射到左下
    var gradient = ctx.createLinearGradient(this.x, 0, this.x - 80, this.height);
    gradient.addColorStop(0, 'rgba(255, 240, 180, ' + this.currentOpacity + ')');
    gradient.addColorStop(0.3, 'rgba(255, 220, 140, ' + (this.currentOpacity * 0.8) + ')');
    gradient.addColorStop(0.6, 'rgba(255, 200, 100, ' + (this.currentOpacity * 0.4) + ')');
    gradient.addColorStop(1, 'rgba(255, 180, 80, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width * 0.3, 0);
    ctx.lineTo(this.x - this.width * 0.3, 0);
    ctx.lineTo(this.x - this.width * 0.5 - 80, this.height);
    ctx.lineTo(this.x + this.width * 0.5 - 80, this.height);
    ctx.closePath();
    ctx.fill();
    
    // 光束中的微尘粒子
    for (var i = 0; i < 8; i++) {
      var particleY = Math.random() * this.height;
      var particleX = this.x - (particleY / this.height) * 80 + (Math.random() - 0.5) * this.width;
      var particleSize = 0.5 + Math.random() * 1.5;
      var particleOpacity = this.currentOpacity * (0.5 + Math.random() * 0.5);
      
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 220, ' + particleOpacity + ')';
      ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  };

  function Petal() {
    this.reset();
  }

  Petal.prototype.reset = function () {
    this.x = w * 0.5 + Math.random() * w * 0.5; // 花瓣从右侧出现
    this.y = Math.random() * -h * 0.3; // 从顶部偏上出现
    this.size = 4 + Math.random() * 8;
    this.speed = 0.5 + Math.random() * 1.5;
    this.swingSpeed = 0.01 + Math.random() * 0.02;
    this.swingAmount = 15 + Math.random() * 30;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = 0.6 + Math.random() * 0.4;
    this.swingOffset = Math.random() * Math.PI * 2;
  };

  Petal.prototype.update = function (time) {
    this.y += this.speed;
    // 花瓣从右上飘向左下
    this.x += Math.sin(time * this.swingSpeed + this.swingOffset) * 0.3 + globalWind * 0.5;
    this.rotation += this.rotationSpeed;

    if (this.y > h + 50 || this.x < -80) {
      this.reset();
      this.y = Math.random() * -50;
    }
  };

  Petal.prototype.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;

    // 花瓣主体
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 高光
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.ellipse(-this.size * 0.1, -this.size * 0.05, this.size * 0.2, this.size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 纹理
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 0.3;
    ctx.moveTo(0, -this.size * 0.15);
    ctx.lineTo(0, this.size * 0.15);
    ctx.stroke();

    ctx.restore();
  };

  function initPetals() {
    petals = [];
    for (var i = 0; i < PETAL_COUNT; i++) {
      var p = new Petal();
      p.y = Math.random() * h - h;
      petals.push(p);
    }
  }

  function initBeams() {
    beams = [];
    for (var i = 0; i < BEAM_COUNT; i++) {
      beams.push(new Beam());
    }
  }

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    mouseX = w / 2;
    initBeams();
  }

  var time = 0;
  function loop() {
    globalWind += (targetWind - globalWind) * 0.05;
    time += 0.016;

    ctx.clearRect(0, 0, w, h);
    
    // 暖色基调
    var bgGradient = ctx.createLinearGradient(w, 0, 0, h);
    bgGradient.addColorStop(0, 'rgba(255, 230, 150, 0.12)');
    bgGradient.addColorStop(0.4, 'rgba(255, 210, 120, 0.06)');
    bgGradient.addColorStop(1, 'rgba(255, 180, 80, 0.03)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    
    // 绘制光束
    for (var i = 0; i < beams.length; i++) {
      beams[i].update(time);
      beams[i].draw();
    }
    
    // 绘制花瓣
    for (var i = 0; i < petals.length; i++) {
      petals[i].update(time);
      petals[i].draw();
    }
    
    requestAnimationFrame(loop);
  }

  // 启动
  resize();
  initPetals();
  initBeams();
  loop();

  window.addEventListener('resize', function () {
    resize();
    initPetals();
  });
})();