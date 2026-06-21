(function () {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '9997';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  var w, h;
  var drops = [];
  var DROP_COUNT = 200;
  var globalWind = 0.5;
  var targetWind = 0.5;
  var mouseX = 0;
  var mouseY = 0; // 新增：追踪鼠标Y坐标
  
  // 闪电相关变量
  var lightningTimer = 0;
  var lightningAlpha = 0;
  var lightningBolt = null;
  var nextLightning = Math.random() * 3000 + 2000;

  function Drop() {
    this.reset();
  }

  Drop.prototype.reset = function () {
    this.x = Math.random() * w;
    this.y = Math.random() * -h;
    this.speed = 10 + Math.random() * 18;
    this.len = 10 + Math.random() * 28;
    this.thick = 0.8 + Math.random() * 1.8;
    this.opacity = 0.35 + Math.random() * 0.25;
  };

  Drop.prototype.update = function () {
    var personalWind = (Math.random() - 0.5) * 0.8;
    this.y += this.speed;
    this.x += globalWind + personalWind;

    if (this.y > h + 20 || this.x > w + 60 || this.x < -60) {
      this.reset();
      this.y = Math.random() * -30;
    }
  };

  Drop.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - globalWind * 0.6, this.y - this.len);
    ctx.strokeStyle = 'rgba(140, 160, 200, ' + this.opacity + ')';
    ctx.lineWidth = this.thick;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  // 修改：闪电劈向鼠标位置
  function generateLightning() {
  var startX = mouseX + (Math.random() - 0.5) * 100; // 在鼠标附近随机偏移
  var startY = 0;
  var targetY = h; // 强制劈到屏幕最底部
  
  var points = [{x: startX, y: startY}];
  var currentX = startX;
  var currentY = startY;
  var segments = 8 + Math.floor(Math.random() * 12);
  
  for (var i = 0; i < segments; i++) {
    currentY += (targetY / segments) * (0.8 + Math.random() * 0.4);
    currentX += (Math.random() - 0.5) * 120;
    points.push({x: currentX, y: currentY});
  }
  
  return points;
}

  // 绘制闪电
  function drawLightning() {
    if (lightningAlpha <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = lightningAlpha;
    
    // 主闪电
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(lightningBolt[0].x, lightningBolt[0].y);
    for (var i = 1; i < lightningBolt.length; i++) {
      ctx.lineTo(lightningBolt[i].x, lightningBolt[i].y);
    }
    ctx.stroke();
    
    // 闪电光晕
    ctx.strokeStyle = 'rgba(200, 220, 255, 0.6)';
    ctx.lineWidth = 8;
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.moveTo(lightningBolt[0].x, lightningBolt[0].y);
    for (var i = 1; i < lightningBolt.length; i++) {
      ctx.lineTo(lightningBolt[i].x, lightningBolt[i].y);
    }
    ctx.stroke();
    
    ctx.restore();
  }

  function initDrops() {
    drops = [];
    for (var i = 0; i < DROP_COUNT; i++) {
      var d = new Drop();
      d.y = Math.random() * h - h;
      drops.push(d);
    }
  }

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    mouseX = w / 2;
    mouseY = h / 2; // 新增：初始化鼠标Y坐标
  }

  function loop() {
    globalWind += (targetWind - globalWind) * 0.08;
    
    // 闪电计时器
    lightningTimer += 16;
    if (lightningTimer >= nextLightning) {
      lightningBolt = generateLightning();
      lightningAlpha = 0.8 + Math.random() * 0.2;
      lightningTimer = 0;
      nextLightning = Math.random() * 4000 + 2000;
    }
    
    // 闪电闪烁效果
    if (lightningAlpha > 0) {
      lightningAlpha -= 0.05;
      if (Math.random() < 0.1 && lightningAlpha < 0.3) {
        lightningAlpha = 0.4 + Math.random() * 0.3;
      }
    }
    
    // 清屏，闪电时背景略微变亮
    ctx.clearRect(0, 0, w, h);
    if (lightningAlpha > 0.1) {
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (lightningAlpha * 0.15) + ')';
      ctx.fillRect(0, 0, w, h);
    }
    
    // 绘制闪电
    drawLightning();
    
    // 绘制雨滴
    for (var i = 0; i < drops.length; i++) {
      drops[i].update();
      drops[i].draw();
    }
    
    requestAnimationFrame(loop);
  }

  // 修改：添加鼠标Y坐标追踪
  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY; // 新增：追踪鼠标Y坐标
    targetWind = (mouseX / w - 0.5) * 5;
  });

  window.addEventListener('touchstart', function (e) {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY; // 新增：触屏Y坐标
      targetWind = (mouseX / w - 0.5) * 5;
    }
  });

  window.addEventListener('touchmove', function (e) {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY; // 新增：触屏Y坐标
      targetWind = (mouseX / w - 0.5) * 5;
    }
  });

  // 启动
  resize();
  initDrops();
  loop();

  window.addEventListener('resize', function () {
    resize();
    initDrops();
  });
})();