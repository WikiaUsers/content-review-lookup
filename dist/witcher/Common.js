/* Any JavaScript here will be loaded for all users on every page load. */

/***********************************************************************************

* This 'MediaWiki:Common.js' will be loaded via imported '/site' file, at the *top*
of page in '<head>'. Will load immediately before Wikia.js.

* Common 'importArticles' files will be loaded together via dynamic import as
'/load.php' file, separately appearing at the *bottom* of the page.

************************************************************************************/

/* for ModernBackToTopButton adjustments, must be loaded before the script is imported */
window.BackToTopSpeed = 100;
window.BackToTopStart = 100;

/* lockdown for reference popup configuration */
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

/*******************************************************************************************

SECTION  Import

********************************************************************************************/

// Import Scripts
window.wwImportArticles = {              // allow other code to add imports before committing the list
  type: 'script',
  debug: false,
  articles: [
    'MediaWiki:Map/code.js',             // on page Map and Map lightbox support
  ]
};
//if (mw && mw.config && mw.config.set) mw.config.set('debug', true); // extra debugging

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/

function wtSliderRun() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );

  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ?
      0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ?
      ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
}

function wtSliderInit() {
    $(function() {
        wtSliderRun();
    })
}


//****************************************


/*******************************************************************************************

SECTION  Startup

********************************************************************************************/

// Startup Now
(function () {
  window.ww = window.ww || {};      // ensure has ww JS table, as curtesy for funcs on this page
  
  var defer1 = $.Deferred,
  defer2 = $.Deferred,
  defer3 = $.Deferred;

  mw.loader.using( ['jquery.cookie'], defer1.resolve);
  mw.loader.using( ['jquery.ui.widget'], defer2.resolve);
  mw.loader.using( ['jquery.ui.tabs'], defer3.resolve);

  $.when(defer1, defer2, defer3).done(wtSliderInit);
    
}());

// Startup DOM ready
$(function () {
    //wtSliderInit();
});


//****************************************
//****    Loaders                     ****
//****************************************

/* Load Loaders that were registered and just waiting for mw and jq to run their own
   boot-strap functionality. There's a very long detailed reason for yet another loader. */
(function() {
  var loaders = window.wwLoaders;
  if (!loaders) return;

  for (var i=0, l=loaders.length; i < l; i++)
  {
    var loader = loaders[i];
    if (typeof loader == 'function') { loader(); }
  }
}());

/* Load collected imports */
(function() {
  var imports = window.wwImportArticles;
  if (!imports) return;
  var articles = imports.articles;
  if (!articles || articles.length == 0) return;

  importArticles( imports );
}());