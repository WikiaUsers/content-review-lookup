/* ===============================
   Community Hub: Drag + Smooth Glow
   =============================== */
(function() {
  const hub = document.getElementById('communityHub');
  const header = document.getElementById('hubToggle');
  if (!hub || !header) return;

  let isDragging = false;
  let startX = 0, startY = 0;
  let offsetX = 0, offsetY = 0;

  // Hover glow
  hub.style.transition = 'box-shadow 0.25s ease, border-color 0.25s ease';
  header.addEventListener('mouseenter', () => {
    hub.style.boxShadow = '0 0 18px 4px #FFF2B0';
    hub.style.borderColor = '#FFF2B0';
  });
  header.addEventListener('mouseleave', () => {
    if (!isDragging) {
      hub.style.boxShadow = '0 0 12px #D9B55D';
      hub.style.borderColor = '#D9B55D';
    }
  });

  // Drag start
  header.addEventListener('mousedown', e => {
    isDragging = true;
    header.style.cursor = 'grabbing';
    hub.style.transition = 'none';
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
    e.preventDefault();
  });

  // Drag move
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    hub.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  // Drag stop
  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    header.style.cursor = 'grab';

    // Smooth bounce
    hub.animate([
      { transform: `translate(${offsetX}px, ${offsetY}px) scale(1)` },
      { transform: `translate(${offsetX}px, ${offsetY}px) scale(1.03)` },
      { transform: `translate(${offsetX}px, ${offsetY}px) scale(1)` }
    ], {
      duration: 200,
      easing: 'ease-out'
    });

    hub.style.transition = 'box-shadow 0.25s ease, border-color 0.25s ease';
    hub.style.boxShadow = '0 0 12px #D9B55D';
    hub.style.borderColor = '#D9B55D';
  });

  // Smooth glide back on page refresh
  window.addEventListener('beforeunload', () => {
    hub.style.transition = 'transform 0.6s cubic-bezier(0.22, 1.61, 0.36, 1)';
    hub.style.transform = 'translate(0, 0)';
  });
})();


/* ===============================
   Idiot Popups: Retro 80s Drag + Bounce
   =============================== */
(function() {
  const popups = document.querySelectorAll('.idiot-popup');
  if (!popups.length) return;

  popups.forEach(popup => {
    const title = popup.querySelector('.idiot-title');
    if (!title) return;

    let isDragging = false;
    let startX = 0, startY = 0;
    let offsetX = 0, offsetY = 0;

    // Set initial transform
    popup.style.transform = 'translate(0px, 0px)';
    popup.style.willChange = 'transform';
    popup.style.right = 'auto';
    popup.style.bottom = 'auto';
    if (!popup.style.top || popup.style.top === 'auto') popup.style.top = '100px';
    if (!popup.style.left || popup.style.left === 'auto') popup.style.left = '50px';

    // Drag start
    title.addEventListener('mousedown', e => {
      isDragging = true;
      title.style.cursor = 'grabbing';
      popup.style.transition = 'none';
      startX = e.clientX - offsetX;
      startY = e.clientY - offsetY;
      e.preventDefault();
    });

    // Drag move
    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      offsetX = e.clientX - startX;
      offsetY = e.clientY - startY;
      popup.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });

    // Drag stop
    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      title.style.cursor = 'grab';

      // Retro choppy bounce (centered)
      popup.animate([
        { transform: `translate(${offsetX}px, ${offsetY}px) scale(1)` },
        { transform: `translate(${offsetX}px, ${offsetY - 8}px) scale(1.08)` },
        { transform: `translate(${offsetX}px, ${offsetY + 4}px) scale(0.96)` },
        { transform: `translate(${offsetX}px, ${offsetY}px) scale(1)` }
      ], {
        duration: 400,
        easing: 'steps(5, end)'
      });

      // Reset transform so next reload returns to start
      popup.style.transition = 'none';
    });

    // Glide back + bounce on page reload
    window.addEventListener('load', () => {
      popup.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      popup.style.transform = 'translate(0px, 0px)';

      // Small retro bounce
      popup.animate([
        { transform: 'translate(0px, 0px) scale(0.95)' },
        { transform: 'translate(0px, -8px) scale(1.05)' },
        { transform: 'translate(0px, 0px) scale(1)' }
      ], {
        duration: 500,
        easing: 'steps(5, end)'
      });

      setTimeout(() => {
        popup.style.transition = 'none';
      }, 600);
    });
  });
})();

// ================================
// Chaos Page Smooth Breathing + Rotational Wobble + Smooth Gradient Transition + Warning
// ================================
(function() {
    if (!document.body.classList.contains('page-Chaos')) return;

    const colors = [
        '#CC6A6E', '#4A3472', '#5E8C63', '#D9B55D',
        '#0A1A2F', '#1F182A', '#468189', '#B0454A',
        '#FF8C42', '#9D4EDD', '#FF5C5C'
    ];

    function pickColors(count) {
        const shuffled = colors.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Convert hex to RGB
    function hexToRgb(hex) {
        hex = hex.replace('#','');
        const bigint = parseInt(hex,16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }

    // Convert RGB to hex
    function rgbToHex(r,g,b) {
        return "#" + ((1 << 24) + (r <<16) + (g<<8) + b).toString(16).slice(1);
    }

    // Interpolate between two colors
    function lerpColor(c1, c2, t) {
        const r = Math.round(c1[0] + (c2[0]-c1[0])*t);
        const g = Math.round(c1[1] + (c2[1]-c1[1])*t);
        const b = Math.round(c1[2] + (c2[2]-c1[2])*t);
        return [r,g,b];
    }

    // Initial colors
    let currentColors = pickColors(5).map(hexToRgb);
    let targetColors = pickColors(5).map(hexToRgb);
    let colorTransitionProgress = 0; // 0 → 1

    function applyGradient(colorsArray) {
        const gradient = `radial-gradient(circle at center, ${colorsArray.map(rgbToHex).join(', ')})`;
        document.body.style.background = `
            ${gradient},
            url('https://static.wikia.nocookie.net/varandia/images/2/29/WhiteNoise.png/revision/latest?cb=20250513164951') center/cover no-repeat
        `;
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundSize = 'cover';
    }

    // Overlay
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(15, 10, 25, 0.4)';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '-1';
    document.body.appendChild(overlay);

    // Smooth breathing + wobble
    const breathingAmplitude = 0.1;
    const rotationAmplitude = 2;
    const speed = 0.0005;
    let start = Date.now();

    function animate() {
        const t = Date.now() - start;

        // Breathing scale and wobble
        const scale = 1 + Math.sin(t*speed) * breathingAmplitude;
        const rotation = Math.sin(t*speed*0.8) * rotationAmplitude;
        document.body.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

        // Smooth color transition
        colorTransitionProgress += 0.1; // adjust speed of color flow
        if(colorTransitionProgress > 1){
            colorTransitionProgress = 0;
            currentColors = targetColors;
            targetColors = pickColors(5).map(hexToRgb);
        }
        const lerpedColors = currentColors.map((c,i)=>lerpColor(c, targetColors[i], colorTransitionProgress));
        applyGradient(lerpedColors);

        requestAnimationFrame(animate);
    }

    animate();

    // System warning
    alert("⚠ ALERT: Chaos anomaly detected in the Common.js.");
})();