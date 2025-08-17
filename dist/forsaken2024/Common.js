@import "/load.php?mode=articles&articles=u:dev:MediaWiki:StylizedTabs.css&only=styles";
@import url("/load.php?mode=articles&only=styles&articles=MediaWiki:UsernameColor.css|MediaWiki:Warnings.css");
// THIS IS FOR A USER PAGE NOT AN ACTUAL ARTICLE
const introPages = {
  'User:No1.exe': {
    src: 'https://static.wikia.nocookie.net/forsaken2024/images/0/0d/Hacklord1xRemodelIntro.gif',
    sound: 'https://static.wikia.nocookie.net/forsaken2024/images/d/de/Hacklordintro.mp3',
    duration: 20000
  }
};

const currentPage = mw.config.get('wgPageName');
const currentAction = mw.config.get('wgAction');
const urlParams = new URLSearchParams(window.location.search);

// Only block intro on history, diff, or oldid pages
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

/* Please move this to Common.js as this doesn't work in .css. - Bool
/*.lockOldComments = (window.lockOldComments || {});
/*window.lockOldComments.limit = 4 Days;

/* Profile header buttons - black background + white border */
.user-identity-header__tabs .wds-tabs__tab {
    background-color: black !important;   /* Button background */
    border: 1px solid white !important;   /* White border */
    color: white !important;              /* Text color */
    padding: 6px 12px;                     /* Slightly bigger buttons */
    border-radius: 4px;                    /* Rounded corners */
}

/* Active/selected tab styling */
.user-identity-header__tabs .wds-tabs__tab.wds-is-current {
    background-color: #111 !important;     /* Slightly lighter black */
    border-color: white !important;
    color: white !important;
}

/* Remove default hover background and keep white border */
.user-identity-header__tabs .wds-tabs__tab:hover {
    background-color: #222 !important;
    border-color: white !important;
    color: white !important;
}


#userProfileApp {
        background:
        linear-gradient(
            rgba(0, 0, 0, 0.11),
            rgba(0, 0, 0)
        ), url("https://static.wikia.nocookie.net/forsaken2024/images/c/ca/Got.webp/revision/latest?cb=20250811042541");	
    padding: 25px;
    background-size: cover;
}

#userProfileApp .user-identity-header__tag {
    color: white;
}

#userProfileApp .user-identity-header__attributes {
	color: #ffffff;
}

#userProfileApp .user-profile-navigation__link a  {
	color: #ffffff;
}

#userProfileApp .user-identity-header__actions .wds-button {
    background-color: rgb(140, 0, 0, 0.5) !important;
    color: white !important;
}

#userProfileApp .user-identity-header :is(h1) {
    line-height: normal;
    color: #ffffff !important;
    text-shadow: white 0 2.5px 15px !important;
}

/*
#userProfileApp ul.user-identity-stats a {
	color: #ffffff;
	text-shadow: white 0 2.5px 15px !important;
}
*/

#userProfileApp .user-identity-bio {
	color: #ffffff;
	text-shadow: white 0 2.5px 15px !important;
    font-style: italic;
}

#userProfileApp .user-identity-avatar {
	padding: 10px
	
}

#userProfileApp .user-identity-avatar__image:hover {

transform: scale(1.05);
filter: drop-shadow(0px 0px 10px black);
	
}

.user-identity-avatar__image {
    transition: transform 125ms ease-in-out;
}

.mastrightsbadge {
	z-index:5 !important;
}

body.page-User_No1_exe,
body.page-User_talk_No1_exe,
body.page-Special_Contributions_No1_exe,
body.page-Special_UserProfileActivity_No1_exe,
body.page-User_blog_No1_exe,
body.page-Message_Wall_No1_exe {
.user-identity-headertabs .wds-tabstab {
    background-color: black !important;   / Button background /
    border: 1px solid white !important;   / White border /
    color: white !important;              / Text color /
    padding: 6px 12px;                     / Slightly bigger buttons /
    border-radius: 4px;                    / Rounded corners /
}

/* Active/selected tab styling */
.user-identity-headertabs .wds-tabstab.wds-is-current {
    background-color: #111 !important;     / Slightly lighter black /
    border-color: white !important;
    color: white !important;
}

/* Remove default hover background and keep white border */
.user-identity-headertabs .wds-tabstab:hover {
    background-color: #222 !important;
    border-color: white !important;
    color: white !important;
}


#userProfileApp {
        background:
        linear-gradient(
            rgba(0, 0, 0, 0.11),
            rgba(0, 0, 0)
        ), url("https://static.wikia.nocookie.net/forsaken2024/images/f/f4/HacklordShedletskyRender.png/revision/latest?cb=20250407193014");
    padding: 25px;
    background-size: cover;
}

#userProfileApp .user-identity-headertag {
    color: white;
}

#userProfileApp .user-identity-headerattributes {
    color: #ffffff;
}

#userProfileApp .user-profile-navigationlink a  {
    color: #ffffff;
}

#userProfileApp .user-identity-headeractions .wds-button {
    background-color: rgb(140, 0, 0, 0.5) !important;
    color: white !important;
}

#userProfileApp .user-identity-header :is(h1) {
    line-height: normal;
    color: #ffffff !important;
    text-shadow: white 0 2.5px 15px !important;
}


#userProfileApp ul.user-identity-stats a {
    color: #ffffff;
    text-shadow: white 0 2.5px 15px !important;
}

#userProfileApp .user-identity-bio {
    color: #ffffff;
    text-shadow: white 0 2.5px 15px !important;
    font-style: italic;
}

#userProfileApp .user-identity-avatar {
    padding: 10px

}

#userProfileApp .user-identity-avatarimage:hover {

transform: scale(1.05);
filter: drop-shadow(0px 0px 10px black);

}

.user-identity-avatarimage {
    transition: transform 125ms ease-in-out;
}

.mastrightsbadge {
    z-index:5 !important;
}
}

body.page-User_NHEEEEEEEEEEEE,
body.page-User_talk_NHEEEEEEEEEEEE,
body.page-Special_Contributions_NHEEEEEEEEEEEE,
body.page-Special_UserProfileActivity_NHEEEEEEEEEEEE,
body.page-User_blog_NHEEEEEEEEEEEE,
body.page-Message_Wall_NHEEEEEEEEEEEE {
.user-identity-headertabs .wds-tabstab {
    background-color: black !important;   / Button background /
    border: 1px solid white !important;   / White border /
    color: white !important;              / Text color /
    padding: 6px 12px;                     / Slightly bigger buttons /
    border-radius: 4px;                    / Rounded corners /
}

/* Active/selected tab styling */
.user-identity-headertabs .wds-tabstab.wds-is-current {
    background-color: #111 !important;     / Slightly lighter black /
    border-color: white !important;
    color: white !important;
}

/* Remove default hover background and keep white border */
.user-identity-headertabs .wds-tabstab:hover {
    background-color: #222 !important;
    border-color: white !important;
    color: white !important;
}


#userProfileApp {
        background:
        linear-gradient(
            rgba(0, 0, 0, 0.11),
            rgba(0, 0, 0)
        ), url("https://static.wikia.nocookie.net/forsaken2024/images/8/8e/Vanitythatisbutchered.webp/revision/latest?cb=20250807235142");
    padding: 25px;
    background-size: cover;
}

#userProfileApp .user-identity-headertag {
    color: white;
}

#userProfileApp .user-identity-headerattributes {
    color: #ffffff;
}

#userProfileApp .user-profile-navigationlink a  {
    color: #ffffff;
}

#userProfileApp .user-identity-headeractions .wds-button {
    background-color: rgb(140, 0, 0, 0.5) !important;
    color: white !important;
}

#userProfileApp .user-identity-header :is(h1) {
    line-height: normal;
    color: #ffffff !important;
    text-shadow: white 0 2.5px 15px !important;
}


#userProfileApp ul.user-identity-stats a {
    color: #ffffff;
    text-shadow: white 0 2.5px 15px !important;
}

#userProfileApp .user-identity-bio {
    color: #ffffff;
    text-shadow: white 0 2.5px 15px !important;
    font-style: italic;
}

#userProfileApp .user-identity-avatar {
    padding: 10px

}

#userProfileApp .user-identity-avatarimage:hover {

transform: scale(1.05);
filter: drop-shadow(0px 0px 10px black);

}

.user-identity-avatarimage {
    transition: transform 125ms ease-in-out;
}

.mastrightsbadge {
    z-index:5 !important;
}
}