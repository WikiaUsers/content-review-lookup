// 11:59, March 22, 2024 (UTC)

// JS for the StatusIndicator (ATW:SI)
// From User:Rappy_4187 (Aion Wiki)
// Taken from w:c:admintools:MediaWiki:Common.js/statusIndicator.js, simplified
// Note: this isn't really used anymore and is only used
// for the dozen or so profiles that still use it. 
// w:c:dev:Status should be used on this wiki in the future

(function() {
  // Put StatusIndicator in ProfileMasthead
  // Support for Template:Statustop2
  function init() {
    if ($(".status.helpcursor").length) {
      $(".status.helpcursor").appendTo($("ul.user-identity-social"));
    }
  }

  // Message walls are now lazy loading on UCP
  var statusIndicator = setInterval(function() {
    if ($("#userProfileApp").length) {
      clearInterval(statusIndicator);
      init();
    }
    // 1000 = amount of seconds we'll be rechecking
    // whether the masthead exists
  }, 1000);
})();