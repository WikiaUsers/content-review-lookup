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

if (introPages[currentPage]) {
  $(function () {
    const { src, sound, duration } = introPages[currentPage];

    const audio = new Audio(sound);
    audio.preload = 'auto';

    const gif = new Image();
    gif.src = src;
    gif.style.width = '100vw';
    gif.style.height = '100vh';
    gif.style.objectFit = 'cover';

    const overlay = document.createElement('div');
    overlay.id = 'intro-gif-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
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

$(function () {
  if (mw.config.get('wgPageName') !== '1x1x1x1/Skins') return;

  if (location.hash === '#Hacklord') {
    document.body.style.backgroundImage = 'url(https://static.wikia.nocookie.net/forsaken2024/images/0/0d/Hacklord1xRemodelIntro.gif)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }
});