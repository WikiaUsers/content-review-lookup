
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
  var DROP_COUNT = 100;
  var globalWind = 0.5;
  var targetWind = 0.5;
  var mouseX = 0;

  function Drop() {
    this.reset();
  }

  Drop.prototype.reset = function () {
    this.x = Math.random() * w;
    this.y = Math.random() * -h;
    this.speed = 7 + Math.random() * 13;
    this.len = 8 + Math.random() * 22;
    this.thick = 0.6 + Math.random() * 1.4;
    this.opacity = 0.25 + Math.random() * 0.18;
  };

  Drop.prototype.update = function () {
    var personalWind = (Math.random() - 0.5) * 0.6;
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
    ctx.strokeStyle = 'rgba(160, 200, 240, ' + this.opacity + ')';
    ctx.lineWidth = this.thick;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

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
  }

  function loop() {
    // 平滑过渡速度加快，响应更灵敏
    globalWind += (targetWind - globalWind) * 0.08;

    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < drops.length; i++) {
      drops[i].update();
      drops[i].draw();
    }
    requestAnimationFrame(loop);
  }

  // ── 交互：风向影响加大 ──────────────────
  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    // 系数从 2.5 提升到 5，左右两侧风力更强
    targetWind = (mouseX / w - 0.5) * 5;
  });

  window.addEventListener('touchstart', function (e) {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      targetWind = (mouseX / w - 0.5) * 5;
    }
  });

  window.addEventListener('touchmove', function (e) {
    if (e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      targetWind = (mouseX / w - 0.5) * 5;
    }
  });

  // ── 启动 ────────────────────────────────
  resize();
  initDrops();
  loop();

  window.addEventListener('resize', function () {
    resize();
    initDrops();
  });
})();