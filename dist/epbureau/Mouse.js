/**
 * @name 光标特效 Canvas cursor cool effect
 * @link https://wjghj.fandom.com/wiki/MediaWiki:Mouse.js
 */
$(function() {
  $('body').prepend($('<canvas>').attr('id', 'CanvasCursorEffect').css({
    'margin': '0',
    'padding': '0',
    'display': 'block',
    'z-index': '114514',
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'pointer-events': 'none'
  }));
  var canvas = $('#CanvasCursorEffect')[0];
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  c = canvas.getContext('2d');

  /* 配色 */
  // (转载请注意修改颜色，别整一坨不合适的颜色到自己的wiki)
  var colorArray = ['0, 214, 214', '223, 236, 36', '222, 231, 229']

  // 自动调整canvas大小
  window.addEventListener('resize',
  function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    initCanvas();
  })

  // 获取光标位置
  var mouse = {
    x: undefined,
    y: undefined
  }
  window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircles();
  });
  $(window).click(function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircles();
  });
  // 优化移动端
  window.addEventListener('touchmove', function (event) {
    var touch = event.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
    drawCircles();
  });

  // 小颗粒样式
  function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.vx = vx;
    this.vy = vy;
    this.birth = birth;
    this.life = life;
    this.opacity = opacity;

    this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
      c.fillStyle = 'rgba(' + rgb + ',' + this.opacity + ')';
      c.fill();
    }

    this.update = function() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.vx = -this.vx;
      }

      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.vy = -this.vy;
      }

      this.x += this.vx;
      this.y += this.vy;

      this.opacity = 1 - (((frame - this.birth) * 1) / this.life);

      if (frame > this.birth + this.life) {
        for (var i = 0; i < circleArray.length; ++i) {
          if (this.birth == circleArray[i].birth && this.life == circleArray[i].life) {
            circleArray.splice(i, 1);
            break;
          }
        }
      } else {
        this.draw();
      }
    }

  }

  var circleArray = [];

  function initCanvas() {
    circleArray = [];
  }

  function drawCircles() {
    for (var i = 0; i < 6; i++) {
      var radius = Math.floor(Math.random() * 4) + 2;
      var vx = (Math.random() * 2) - 1;
      var vy = (Math.random() * 2) - 1;
      var spawnFrame = frame;
      var rgb = colorArray[Math.floor(Math.random() * colorArray.length)];
      var life = 100;
      circleArray.push(new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, spawnFrame, life));

    }
  }

  var frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame += 1;
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }

  }

  initCanvas();
  animate();
});