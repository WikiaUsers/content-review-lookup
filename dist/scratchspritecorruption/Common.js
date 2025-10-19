/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'Vgfu9qb', // Fandom Developers Wiki, EXAMPLE CONFIGURATION
    prependToRail: false
};


function startClock() {
  var clock = document.getElementById("liveClock");
  if (!clock) return; // safety check
  setInterval(function() {
    var now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }, 1000);
}
$(startClock);

function toggleLyrics() {
  const lyrics = document.getElementById("lyrics");
  lyrics.style.display = lyrics.style.display === "none" ? "block" : "none";
}