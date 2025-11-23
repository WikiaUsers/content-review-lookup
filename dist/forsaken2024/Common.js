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
const playButton = document.querySelector('.play-button');
const slideshow = document.querySelector('.slideshow-box');
const eggText = document.querySelector('.easter-egg-text');

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
  return str.split('').map(c => Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
}

let hoverInterval;
let flickerInterval;

playButton.addEventListener('mouseenter', () => {
  // Start repeating Easter egg every 30 seconds
  hoverInterval = setInterval(() => {
    // Pick random creepy line
    const randomLine = creepyLines[Math.floor(Math.random() * creepyLines.length)];

    slideshow.classList.add('darkened');
    eggText.style.opacity = '1';
    eggText.style.animation = 'glitchFlicker 0.1s infinite';

    // Start random capitalization flicker
    flickerInterval = setInterval(() => {
      eggText.textContent = randomCaps(randomLine);
    }, 50);

    // Stop after 3 seconds
    setTimeout(() => {
      clearInterval(flickerInterval);
      eggText.style.opacity = '0';
      eggText.style.animation = 'none';
      slideshow.classList.remove('darkened');
    }, 3000);

  }, 30000); // repeat every 30s
});

playButton.addEventListener('mouseleave', () => {
  clearInterval(hoverInterval);
  clearInterval(flickerInterval);
  eggText.style.opacity = '0';
  eggText.style.animation = 'none';
  slideshow.classList.remove('darkened');
});

function fetchStats() {
  // Edits and active users
  fetch('/api.php?action=query&meta=siteinfo&siprop=statistics&format=json')
    .then(res => res.json())
    .then(data => {
      const stats = data.query.statistics;
      document.getElementById('editCount').textContent = stats.edits.toLocaleString();
      document.getElementById('userCount').textContent = stats.activeusers.toLocaleString();
    });

  // Posts count from the "ALL" category
  fetch('/api.php?action=query&list=categorymembers&cmtitle=Category:ALL&cmlimit=max&format=json')
    .then(res => res.json())
    .then(data => {
      const postCount = data.query.categorymembers.length;
      document.getElementById('postCount').textContent = postCount.toLocaleString();
    });
}

// Update every 10 seconds
fetchStats();
setInterval(fetchStats, 10000);

//Infoboxes
// === Popup for Discuss button ===
function addDiscussPopup() {
    // Look for the Discuss button
    const discussBtn = document.querySelector(
        '.wds-button.wds-is-secondary.is-hidden-on-smaller-breakpoints[href*="/f"]'
    );
    if (!discussBtn) return; // not found yet

    // Prevent adding multiple times
    if (document.getElementById("discuss-popup")) return;

    // Create popup
    const popup = document.createElement("div");
    popup.id = "discuss-popup";
    popup.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.7); display:flex; align-items:center;
        justify-content:center; z-index:99999; display:none;
    `;
    popup.innerHTML = `
        <div style="
            background: #222; color:white; padding:20px; border-radius:10px;
            text-align:center; border:2px solid #ff4444;
        ">
            <h2>⚠ WARNING!</h2>
            <p>Before entering the Discussion area, please read the rules.</p>
            <button id="popup-continue" style="
                margin-top:10px; padding:8px 15px; background:#ff4444;
                color:white; border:none; cursor:pointer;
            ">Continue</button>
        </div>
    `;
    document.body.appendChild(popup);

    // Show popup on click
    discussBtn.addEventListener("click", function(e){
        e.preventDefault();
        popup.style.display = "flex";
    });

    // Continue button
    document.getElementById("popup-continue").addEventListener("click", function(){
        window.location.href = discussBtn.href;
    });
}

// Observe DOM changes in case the button is loaded later
const observer = new MutationObserver(addDiscussPopup);
observer.observe(document.body, { childList: true, subtree: true });

// Also try to run immediately in case button is already loaded
addDiscussPopup();