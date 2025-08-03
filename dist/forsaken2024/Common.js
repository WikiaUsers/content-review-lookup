const introPages = {
  '1x1x1x1': {
    src: 'https://static.wikia.nocookie.net/forsaken2024/images/a/a5/1x1x1x1_intro.gif',
    sound: 'https://static.wikia.nocookie.net/forsaken2024/images/d/d9/1xnewintroaud.mp3',
    duration: 2700
  },
  'John_Doe': {
    src: 'https://static.wikia.nocookie.net/forsaken2024/images/4/4a/John_Doe_intro.gif',
    sound: 'https://static.wikia.nocookie.net/forsaken2024/images/e/ed/Mr-jogn-doe-final.ogg',
    duration: 4700
  },
  'C00lkidd': {
    src: 'https://static.wikia.nocookie.net/forsaken2024/images/2/23/C00lkidd_intro.gif',
    sound: 'https://static.wikia.nocookie.net/forsaken2024/images/f/f5/Cool_Intro%282%29.mp3',
    duration: 2500
  },
  'Jason': {
    src: 'https://static.wikia.nocookie.net/forsaken2024/images/1/11/Jason_intro.gif',
    sound: 'https://static.wikia.nocookie.net/forsaken2024/images/7/7f/Jason_Intro.mp3',
    duration: 3500
  },
  'Guest_666': {
    src: 'https://static.wikia.nocookie.net/forsaken2024/images/4/42/Guest_666_Intro.gif',
    sound: 'https://static.wikia.nocookie.net/forsaken2024/images/f/f6/Guest_666_intro_audio.mp3',
    duration: 3500
  },
  'Noli': {
    src: 'https://static.wikia.nocookie.net/forsaken2024/images/6/67/NoliIntroNotext.gif',
    sound: 'https://static.wikia.nocookie.net/forsaken2024/images/5/5e/Introduction.ogg',
    duration: 3300
  },
  'King': {
    src: 'https://static.wikia.nocookie.net/forsaken2024/images/f/fd/KingIntro.gif',
    sound: 'https://static.wikia.nocookie.net/forsaken2024/images/e/e7/KingIntroteaser.mp3',
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