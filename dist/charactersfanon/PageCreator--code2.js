;(function (module, window, $, mw) {
  "use strict";
 
  // Prevent double loads and respect prior double load check formatting
  if (!window || !$ || !mw || module.isLoaded || window.isPageCreatorLoaded) {
    return;
  }
  module.isLoaded = true;