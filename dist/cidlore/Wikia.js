// ****************************************************************
// Display clock settings - http://dev.wikia.com/wiki/DisplayClock
// Display 24 hour time followed by day, month, and year in "(UTC)"
// ****************************************************************
 
window.DisplayClockJS = {
      format: "%2H:%2M:%2S %p %2d %B %Y (UTC)",
      location: "header"
};

importArticles({
    type: "script",
    articles: [
        'w:c:dev:DisplayClock/code.js',             
        'w:c:dev:AutoEditDropdown/code.js',         
        'w:c:dev:BackToTopButton/code.js',
        "w:c:community:MediaWiki:Snow.js
    ]
});

// ************************************
// Add Site Rules Link to "On the Wiki"
// ************************************
 
$(function() {
  if (skin == "oasis" || skin == "wikia") {
    $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/The_Cleric_is_Dead_Wiki:Site_Rules">Site Rules</a></li>');
  }
});