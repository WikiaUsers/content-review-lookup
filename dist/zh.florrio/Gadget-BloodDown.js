/**
 * 在原来的基础上自己瞎摸的
 */
(function () {

  const CONFIG = {
    totalSnowflakes: 180,
    repelRadius: 130,
    repelStrength: 1.5,
    recoverySpeed: 0.003,
    windSpeed: 0.2,
    layer1: {
      ratio: 0.4,
      minRadius: 2.5,
      maxRadius: 5.6,
      minSpeed: 2.0,
      maxSpeed: 4.8,
      swayAmount: 45,
      swaySpeed: 0.008,
      opacityMin: 0.55,
      opacityMax: 0.9,
    },
    layer2: {
      ratio: 0.6,
      minRadius: 1.5,
      maxRadius: 4.4,
      minSpeed: 4.8,
      maxSpeed: 6.7,
      swayAmount: 20,
      swaySpeed: 0.014,
      opacityMin: 0.35,
      opacityMax: 0.65,
    },
    hideCSSSnow: true,
  };

  let snowflakes = [];
  let mouseX = -2000;
  let mouseY = -2000;
  let canvas, ctx;
  let animId;
  let width, height;
  let time = 0;

  const rand = (min, max) => Math.random() * (max - min) + min;

  function createSnowflake(layerConfig) {
    const radius = rand(layerConfig.minRadius, layerConfig.maxRadius);
    return {
      x: rand(0, width),
      y: rand(-height * 0.2, height),
      radius,
      speed: rand(layerConfig.minSpeed, layerConfig.maxSpeed),
      opacity: rand(layerConfig.opacityMin, layerConfig.opacityMax),
      displacedX: 0,
      displacedY: 0,
    };
  }

  function initSnowflakes() {
    snowflakes = [];
    const count1 = Math.floor(CONFIG.totalSnowflakes * CONFIG.layer1.ratio);
    const count2 = CONFIG.totalSnowflakes - count1;
    for (let i = 0; i < count1; i++) snowflakes.push(createSnowflake(CONFIG.layer1));
    for (let i = 0; i < count2; i++) snowflakes.push(createSnowflake(CONFIG.layer2));
  }

  function updateSnowflake(sf) {
    // 垂直下落
    sf.y += sf.speed;

    // 统一水平漂移 + 微小随机扰动，避免过于呆板
    sf.x += CONFIG.windSpeed + (Math.random() - 0.5) * 0.5;

    // 鼠标排斥力
    const dx = sf.x - mouseX;
    const dy = sf.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < CONFIG.repelRadius) {
      const angle = Math.atan2(dy, dx);
      const force = (CONFIG.repelRadius - dist) / CONFIG.repelRadius * CONFIG.repelStrength;
      sf.x += Math.cos(angle) * force;
      sf.y += Math.sin(angle) * force;
    }

    // 边界处理：出界后从顶部重新出现
    if (sf.y > height + sf.radius || sf.x < -sf.radius || sf.x > width + sf.radius) {
      sf.y = -sf.radius;
      sf.x = rand(0, width);
    }
  }

  function drawSnowflake(sf) {
    ctx.beginPath();
    ctx.arc(sf.x, sf.y, sf.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(139, 0, 0, 75' + sf.opacity + ')';
    ctx.fill();
  }

  function loop() {
    time++;
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < snowflakes.length; i++) {
      updateSnowflake(snowflakes[i]);
      drawSnowflake(snowflakes[i]);
    }
    animId = requestAnimationFrame(loop);
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function setup() {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '9997';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    resize();
    initSnowflakes();

    // 隐藏 CSS 雪花（如果有）
    if (CONFIG.hideCSSSnow) {
      const style = document.createElement('style');
      style.textContent = 'body::before, body::after { display: none !important; }';
      document.head.appendChild(style);
    }

    // 鼠标事件
    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // 触屏事件
    window.addEventListener('touchmove', function (e) {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    });
    window.addEventListener('touchstart', function (e) {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    });

    // 鼠标离开窗口时，排斥力消失
    window.addEventListener('mouseleave', function () {
      mouseX = -2000;
      mouseY = -2000;
    });

    // 窗口大小变化
    window.addEventListener('resize', function () {
      resize();
      initSnowflakes();
    });

    loop();
  }

  setup();

})();