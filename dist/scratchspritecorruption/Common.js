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

$(function() {
  if (mw.config.get('wgUserName') !== null) {
    $('.insertusername').text(mw.config.get('wgUserName'));
  }
});

$(document).ready(function () {
  var words = /\b(rixtyd|rix|rixen)\b/gi;

  function highlightText(node) {
    if (node.nodeType === 3) { // text node
      var match = node.nodeValue.match(words);
      if (match) {
        var span = document.createElement("span");
        span.innerHTML = node.nodeValue.replace(words, '<span class="rix-highlight">$1</span>');
        node.parentNode.replaceChild(span, node);
      }
    } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
      for (var i = 0; i < node.childNodes.length; i++) {
        highlightText(node.childNodes[i]);
      }
    }
  }

  highlightText(document.body);
});

importArticle({ type: 'script', article: 'MediaWiki:UTCClock.js' });