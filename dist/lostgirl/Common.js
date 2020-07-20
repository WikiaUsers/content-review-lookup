/* Any JavaScript here will be loaded for all users on every page load. */

// *****************************
// Beginning of Script importing
// *****************************
 
importArticles({
      type: "script",
      articles: [
          "w:c:dev:DisplayClock/code.js",  // Wikia Clock (UTC)
          "w:dev:SearchSuggest/code.js"    // Improves Search Results
        ]
});
         
// ****************************************************************
// Display clock settings
// Display 24 hour time followed by day, month, and year in "(UTC)"
// ****************************************************************
         
window.DisplayClockJS = {
       format: "%2H:%2M:%2S %p %2d %B %Y (UTC)",
       location: "header"
};