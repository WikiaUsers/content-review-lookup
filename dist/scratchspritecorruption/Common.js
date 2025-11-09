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

/* === Live Clock === */
$(function() {
  if (!document.getElementById("liveClock")) {
    var $clock = $('<div id="liveClock" style="font-weight:bold; font-size:14px; margin-left:10px;"></div>');
    $('#globalNavigation, #WikiaBar, #mw-head').first().append($clock);
  }
  setInterval(function() {
    var clock = document.getElementById("liveClock");
    if (clock) {
      var now = new Date();
      clock.textContent = now.toLocaleTimeString();
    }
  }, 1000);
});

/* === Toggle Lyrics Example === */
function toggleLyrics() {
  const lyrics = document.getElementById("lyrics");
  if (lyrics) {
    lyrics.style.display = lyrics.style.display === "none" ? "block" : "none";
  }
}

/* === Insert Username === */
$(function() {
  if (mw.config.get('wgUserName') !== null) {
    $('.insertusername').text(mw.config.get('wgUserName'));
  }
});

/* === Highlight Rix Variants === */
$(document).ready(function () {
  var words = /\b(rixtyd|rix|rixen)\b/gi;
  function highlightText(node) {
    if (node.nodeType === 3) {
      var match = node.nodeValue.match(words);
      if (match) {
        var span = document.createElement("span");
        span.className = "rix-highlight";
        span.textContent = node.nodeValue;
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

/* === Expand/Collapse Button Warning === */
$(function() {
  $('.page-side-toggle').on('click', function(e) {
    var proceed = confirm("⚠️ Warning: Collapsing the sidebar may cause layout issues. Do you want to continue?");
    if (!proceed) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  });
  $('body').addClass('is-expanded').removeClass('is-collapsed');
});

/* === Custom Comments Loader === */
window.customCommentGroups = [
  { group: "admins", users: ["User1", "User2"] },
  { group: "mods", users: ["User3", "User4"] }
];

importArticles({
  type: 'script',
  articles: [
    'u:dev:MediaWiki:CustomComments.js'
  ]
});

/* === Category $h1t === */
importArticles({type:'script', articles:['u:dev:MediaWiki:HotCat.js']}); 
mw.loader.load('mediawiki.categoryTree');
importArticles({type:'script', articles:['u:dev:MediaWiki:Cat-a-lot.js']});

/* === random stuff, useless like gewfeh tho === */
importArticles({type:'script', articles:['u:dev:MediaWiki:FloatingToc/code.js']});