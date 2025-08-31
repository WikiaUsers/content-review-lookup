/* something will be here soon, thanks no.1exe for the code.*/
const introPages = {
  'User:BluenoobandKitchenWizardareabsolutepeak': {
    src: 'https://static.wikia.nocookie.net/block-tales-the-discussion-args/images/4/4c/IDONTGIVEASHIT.gif/revision/latest?cb=20250827211134',
    duration: 5500
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
  if (mw.config.get('wgPageName') !== 'User:BluenoobandKitchenWizardareabsolutepeak') return;

  if (location.hash === '#JX1DX1') {
    document.body.style.backgroundImage = 'url(https://static.wikia.nocookie.net/block-tales-the-discussion-args/images/4/4c/IDONTGIVEASHIT.gif/revision/latest?cb=20250827211134';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }
});