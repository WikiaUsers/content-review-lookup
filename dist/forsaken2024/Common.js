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

importArticle({
  type: 'script',
  article: 'u:dev:LangSelect/code.js'
});