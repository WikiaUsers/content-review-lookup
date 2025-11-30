const introPages = {
  'User:No1.exe': {
    src: 'https://static.wikia.nocookie.net/forsaken2024/images/0/0d/Hacklord1xRemodelIntro.gif',
    sound: 'https://static.wikia.nocookie.net/forsaken2024/images/d/de/Hacklordintro.mp3',
    duration: 5500
  },
  'User:SlayDenty': {
    src: 'https://static.wikia.nocookie.net/forsaken2024/images/1/11/Dnetysthingabab.gif',
    sound: 'https://static.wikia.nocookie.net/forsaken2024/images/8/89/Videoplayback_%2837%29.mp3',
    duration: 2500
  }
};

const currentPage = mw.config.get('wgPageName');
const currentAction = mw.config.get('wgAction');
const urlParams = new URLSearchParams(window.location.search);

const isBlockedContext = (
  currentAction === 'history' ||
  urlParams.has('diff') ||
  urlParams.has('oldid')
);

if (introPages[currentPage] && !isBlockedContext) {
  $(function () {
    const { src, sound, duration } = introPages[currentPage];

    const audio = new Audio(sound);
    audio.preload = 'auto';

    const gif = new Image();
    gif.src = src;
    gif.style.width = '100%';
    gif.style.height = '100%';
    gif.style.objectFit = 'cover';

    const overlay = document.createElement('div');
    overlay.id = 'intro-gif-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: var(--global-navigation-width, 64px);
      width: calc(100% - var(--global-navigation-width, 64px));
      height: 100%;
      background: black;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    overlay.appendChild(gif);

    const removeOverlay = () => {
      overlay.style.transition = 'opacity 1s ease';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 1000);
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    overlay.addEventListener('click', removeOverlay);

    let loaded = 0;
    const checkStart = () => {
      loaded++;
      if (loaded === 2) {
        document.body.appendChild(overlay);
        audio.play().catch(() => {
          const resume = () => {
            audio.play();
            document.removeEventListener('click', resume);
          };
          document.addEventListener('click', resume);
        });
        setTimeout(removeOverlay, duration);
      }
    };

    gif.onload = checkStart;
    audio.oncanplaythrough = checkStart;
  });
}
/*Mainpages tuff*/
document.addEventListener("DOMContentLoaded", () => {

  const playButton = document.querySelector(".play-button");
  const slideshow = document.querySelector(".slideshow-box");
  const eggText = document.querySelector(".easter-egg-text");

  const creepyLines = [
    "you aren't alone here.",
    "do you call this your home?",
    "i decide when you can leave.",
    "don't test my patience.",
    "i want to see your face.",
    "come back and play.",
    "you wouldn't dare defy me.",
    "don't turn around.",
    "the air is heavier out there, isn't it?",
    "i've been waiting for you.",
    "is this where it ends?",
    "do you hear that?",
    "i never left.",
    "if you leave, you won't make it far.",
    "can you feel me watching?",
    "why did you lock the door?",
    "you brought this upon yourself.",
    "there's nowhere to hide.",
    "don't make me find you.",
    "leaving is not an option.",
    "you belong to me now.",
    "who else knows you're here?",
    "it's colder now, isn't it?",
    "you can't escape me.",
    "APieceForThePuzzle Awaits You"
  ];

  function randomCaps(str) {
    return str.split('')
      .map(c => Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase())
      .join('');
  }

  let repeatInterval;

  function showEgg() {
    const line = creepyLines[Math.floor(Math.random() * creepyLines.length)];

    slideshow.classList.add("darkened");
    eggText.style.opacity = "1";
    eggText.style.animation = "glitchFlicker 0.1s infinite";

    const flick = setInterval(() => {
      eggText.textContent = randomCaps(line);
    }, 50);

    setTimeout(() => {
      clearInterval(flick);
      eggText.style.opacity = "0";
      eggText.style.animation = "none";
      slideshow.classList.remove("darkened");
    }, 3000);
  }

  playButton.addEventListener("mouseenter", () => {
    showEgg(); // show instantly
    repeatInterval = setInterval(showEgg, 30000); // repeat every 30s
  });

  playButton.addEventListener("mouseleave", () => {
    clearInterval(repeatInterval);
    eggText.style.opacity = "0";
    eggText.style.animation = "none";
    slideshow.classList.remove("darkened");
  });

});

/*==============Testing stuff =====================*/
(function () {
  // === CONFIGURE THESE ===
  const framesPath = 'https://static.wikia.nocookie.net/YOUR_WIKI/images/'; 
  const frameCount = 36;
  const filenamePattern = (i) => `frame${String(i).padStart(3, '0')}.webp`;
  const autoplay = false;
  const playSpeed = 80;
  const loop = true;
  // ========================

  const canvas = document.getElementById('f360-canvas');
  const ctx = canvas.getContext('2d');
  const loadingEl = document.querySelector('.f360-loading');
  const loadedCountEl = document.getElementById('f360-loaded-count');
  const totalCountEl = document.getElementById('f360-total-count');
  const zoomInput = document.getElementById('f360-zoom');
  const prevBtn = document.getElementById('f360-prev');
  const nextBtn = document.getElementById('f360-next');
  const playBtn = document.getElementById('f360-play');

  let images = new Array(frameCount + 1);
  let loaded = 0;
  let current = 1;
  let isDragging = false;
  let lastX = 0;
  let playing = autoplay;
  let playTimer = null;
  let zoom = 1;

  totalCountEl.textContent = frameCount;

  // Preload all frames
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      loaded++;
      loadedCountEl.textContent = loaded;
      images[i] = img;
      if (loaded === frameCount) onAllLoaded();
    };
    img.onerror = () => {
      loaded++;
      loadedCountEl.textContent = loaded;
      images[i] = null;
      if (loaded === frameCount) onAllLoaded();
    };
    img.src = framesPath + filenamePattern(i);
  }

  function onAllLoaded() {
    loadingEl.style.display = 'none';
    const first = images.find((x) => x);
    if (!first) return;

    canvas.width = first.naturalWidth;
    canvas.height = first.naturalHeight;

    drawFrame(current);
    if (playing) startPlay();

    attachEvents();
    fitCanvas();
    window.addEventListener('resize', () => {
      fitCanvas();
      drawFrame(current);
    });
  }

  function fitCanvas() {
    const w = canvas.parentElement.clientWidth;
    const ratio = canvas.height / canvas.width;
    canvas.style.width = w + 'px';
    canvas.style.height = w * ratio + 'px';
  }

  function drawFrame(index) {
    const img = images[index];
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const iw = img.naturalWidth * zoom;
    const ih = img.naturalHeight * zoom;
    const dx = (canvas.width - iw) / 2;
    const dy = (canvas.height - ih) / 2;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, iw, ih);
  }

  function setFrame(n) {
    current = ((n - 1 + frameCount) % frameCount) + 1;
    drawFrame(current);
  }

  function attachEvents() {
    canvas.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('mousemove', onDrag);

    canvas.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchmove', onDrag, { passive: false });

    prevBtn.addEventListener('click', () => {
      stopPlay();
      setFrame(current - 1);
    });

    nextBtn.addEventListener('click', () => {
      stopPlay();
      setFrame(current + 1);
    });

    playBtn.addEventListener('click', () => {
      playing ? stopPlay() : startPlay();
    });

    zoomInput.addEventListener('input', (e) => {
      zoom = parseFloat(e.target.value);
      drawFrame(current);
    });

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      stopPlay();
      if (e.deltaY > 0) setFrame(current + 1);
      else setFrame(current - 1);
    });

    canvas.addEventListener('dblclick', () => {
      zoom = 1;
      zoomInput.value = '1';
      drawFrame(current);
    });
  }

  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    lastX = getX(e);
    stopPlay();
  }

  function endDrag() {
    isDragging = false;
  }

  function onDrag(e) {
    if (!isDragging) return;
    e.preventDefault();

    const x = getX(e);
    const dx = x - lastX;
    lastX = x;

    const sensitivity = 0.25;
    const framesDelta = Math.round(dx * sensitivity);

    if (framesDelta !== 0) setFrame(current - framesDelta);
  }

  function getX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  function startPlay() {
    playing = true;
    playBtn.textContent = 'Stop';
    playTimer = setInterval(() => {
      setFrame(current + 1);
    }, playSpeed);
  }

  function stopPlay() {
    playing = false;
    playBtn.textContent = 'Play';
    if (playTimer) clearInterval(playTimer);
    playTimer = null;
  }
})();