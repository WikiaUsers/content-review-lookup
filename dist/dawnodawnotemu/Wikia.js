importScriptPage('MediaWiki:Wikia.js/SpoilerPop.js');
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

/*Klawisze*/
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
   // Opiekuni fanonu i biurokraci
  rights["Rafi862"]                   = ["Strażnik fanonu"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
    if (typeof rights[wgTitle] != "undefined") {
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});