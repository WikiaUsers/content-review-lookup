importArticles({
    type: 'script',
    articles: [
        "u:dev:DisplayClock/code.js",
        "u:dev:NullEditButton/code.js",
        "u:dev:PowerPageMaker/code.js",
        "u:dev:CategoryRenameAuto-update/code.js",
        "u:dev:ListFiles/code.js",
        "u:dev:FixWantedFiles/code.js",
        "u:dev:DupImageList/code.js",
        "u:dev:RevealAnonIP/code.js",
        "u:dev:DynamicImages/code.js",
        "u:dev:ExternalImageLoader/code.js",
        "u:dev:Tooltips/code.js",
        "u:dev:BackToTopButton/code.js",
    ]
});

batchDeleteDelay = 1000;
importScriptPage('AjaxBatchDelete/code.2.js', 'dev');
 
nullEditDelay = 1000;
importScriptPage('MassNullEdit/code.js', 'dev');

// ======================
// EXPERIMENTAL scripts
// ======================

// ============================================================
// BEGIN sliders using jquery by User:Tierrie
// ============================================================
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://bioshock.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );
 
// ============================================================
// END sliders using jquery by User:Tierrie
// ============================================================