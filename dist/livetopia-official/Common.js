/* Any JavaScript here will be loaded for all users on every page load. */

mw.loader.load('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

var style = document.createElement('style');
style.innerHTML = `
    body, .page, #WikiaPage, #WikiaArticle, .wds-dropdown, .fandom-community-header {
        font-family: 'Fredoka One', sans-serif;
    }
`;
document.head.appendChild(style);

link = document.querySelector('a[href$="/wiki/User:Anna Aviation"]');
if (link) {
  Object.assign(link.style, {
    fontWeight: '700',
    color: 'white',
    textStroke: '1px blue', // Standard
    webkitTextStroke: '1px blue' // Webkit fallback
  });
}

function updateClock() {
    var now = new Date();
    var utcTime = now.toISOString().split("T");
    var timeString = utcTime[1].split(".")[0] + " " + utcTime[0] + " (UTC)";
    document.getElementById("wikiClock").innerHTML = timeString;
}
setInterval(updateClock, 1000);
mw.hook('wikipage.content').add(function() {
    if (document.getElementById("wikiClock")) {
        updateClock();
    }
});