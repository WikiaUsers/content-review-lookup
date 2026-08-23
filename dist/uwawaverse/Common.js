// --- 2. RISING HYDRO-BUBBLES PARTICLES ---
  function initHydroBubbles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'hud-bubble-canvas';
    canvas.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: -1; opacity: 0.5;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const bubbles = [];
    for (let i = 0; i < 30; i++) {
      bubbles.push({
        x: Math.random() * w,
        y: Math.random() * h + h,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 1.2 + 0.4,
        wobble: Math.random() * 2
      });
    }

    function renderBubbles() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = '#00ffaa';
      ctx.lineWidth = 1;

      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x + Math.sin(b.wobble) * 2, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();

        b.y -= b.speed;
        b.wobble += 0.03;

        if (b.y < -10) {
          b.y = h + 10;
          b.x = Math.random() * w;
        }
      });

      requestAnimationFrame(renderBubbles);
    }
    renderBubbles();
  }