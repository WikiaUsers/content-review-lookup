/* Any JavaScript here will be loaded for all users on every page load. */
/* Only for the gaster page, if they want to remove this then i should do */

const introPages = {
  'Gaster_(BOSS)': {
    src: 'https://static.wikia.nocookie.net/undertale-test-place-reborn/images/c/c4/Gaster_Intro.gif/revision/latest?cb=20251030083427&format=original',
    duration: 21000 
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
    const { src, duration } = introPages[currentPage];

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
      cursor: pointer;
    `;
    overlay.appendChild(gif);

    const removeOverlay = () => {
      overlay.style.transition = 'opacity 1s ease';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 1000);
    };

    overlay.addEventListener('click', removeOverlay);

    gif.onload = () => {
      document.body.appendChild(overlay);
      
      setTimeout(removeOverlay, duration);
    };
  });
}