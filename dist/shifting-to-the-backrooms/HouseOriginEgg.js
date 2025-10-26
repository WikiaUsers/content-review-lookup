$(function () {
  // Cabsmoork = Backrooms
  (function () {
    const el = document.getElementById("Cabsmoork");
    if (!el) return;
    if (el.textContent !== "Cabsmoork") return;

    el.addEventListener("click", function () {
      const duration = 1000;
      const interval = 42;
      const letters = "cCaAbBsSmMoOrRkK";
      const startTime = performance.now();

      const scramble = setInterval(() => {
        const elapsed = performance.now() - startTime;

        if (elapsed < duration) {
          let randomText = "";
          for (let i = 0; i < 9; i++) {
            randomText += letters[Math.floor(Math.random() * letters.length)];
          }
          el.textContent = randomText;
        } else {
          clearInterval(scramble);
          el.textContent = "Backrooms";
        }
      }, interval + 8);
    });
  })();

  // Fall QTE
  (async function () {
    const imageSources = [
      "https://imgur.com/oYBrBPu.png",
      "https://imgur.com/Q9wWvkR.png",
      "https://imgur.com/KzMeh7w.png",
      "https://imgur.com/tGrLlst.png",
      "https://imgur.com/OaIb4gt.png",
      "https://imgur.com/jXAyZM2.png",
    ];

    let fallingActive = false;
    let intervalId = null;

    function createFallingImage() {
      const img = document.createElement("img");
      img.src = imageSources[Math.floor(Math.random() * imageSources.length)];
      img.style.position = 'fixed';
      img.style.top = '-100px';
      img.style.left = Math.random() * window.innerWidth + 'px';
      img.style.width = 30 + Math.random() * 20 + 'px';
      img.style.opacity = 0.9;
      img.style.transition = `top ${3 + Math.random() * 3}s linear`;
      img.style.zIndex = 10000;
      document.body.appendChild(img);

      requestAnimationFrame(() => {
        img.style.top = window.innerHeight + 'px';
      });

      setTimeout(() => img.remove(), 6000);
    }

    function startFalling() {
      if (!fallingActive) {
        fallingActive = true;
        intervalId = setInterval(createFallingImage, 400);
      }
    }

    function stopFalling() {
      if (fallingActive) {
        fallingActive = false;
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    const char = document.getElementById('Character_0-png');
    if (char) char.addEventListener('click', startFalling);

    document.addEventListener("mousedown", (e) => {
        if (!fallingActive) return;
        
        if (e.button === 0 || e.button === 2) {
            stopFalling();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!fallingActive) return;
        
        if (["Escape", "Enter", " ", "q", "c", "e", "Q", "C", "E"].includes(e.key)) {
            stopFalling();
        }
    });
  })();
});