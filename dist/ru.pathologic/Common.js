/* Any JavaScript here will be loaded for all users on every page load. */
var toc, toggleLink;
try {
  toc = document.getElementById('toc').getElementsByTagName('ul')[0];
  toggleLink = document.getElementById('toctogglecheckbox');
  // if (tocIsHidden()) {
  toggleToc();
  // }
} catch (error) {
  console.log('erred', error);
}
function tocIsHidden () {
    return !toc || !toggleLink || window.getComputedStyle(toc).display !== 'block';
}

dev:DiscordIntegrator/code.js

function toggleToc() {
  var hidden = tocIsHidden();
  if (hidden && document.cookie.indexOf('hidetoc=0') > -1) {
    toggleLink.click();
    // changeText(toggleLink, tocShowText);
    // toc.style.display = 'none';
  } else if (!hidden && document.cookie.indexOf('hidetoc=1') > -1) {
    toggleLink.click();
    // changeText(toggleLink, tocHideText);
    // toc.style.display = 'block';
  }
}
toggleLink && toggleLink.addEventListener('click', function () {
  var isHidden = tocIsHidden();
  document.cookie = isHidden
    ? "hidetoc=1"
    : "hidetoc=0";
});