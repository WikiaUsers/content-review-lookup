/* Any JavaScript here will be loaded for all users on every page load. */

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
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

  importStylesheet("MediaWiki:Ambox/code.css");
});
} );

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
 
});
fdButtons[fdButtons.length] = {
	'summary': 'spam',
	'label': 'spam'
};
fdButtons[fdButtons.length] = {
	'summary': 'vandalism',
	'label': 'vandal'
};
fdButtons[fdButtons.length] = {
	'summary': 'copyright',
	'label': 'copyright violation'
};

fdButtons[fdButtons.length] = {
	'summary': '[[Community Guidelines]]',
	'label': 'community guidelines violation'
};

importScriptPage('Sine/code.js', 'dev');

importArticle({type: 'script', article: 'w:c:dev:VisualSpellCheck/code.js'});

importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

importScriptPage('SpoilerAlert/code.js', 'dev');

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

SpoilerAlert = {
    question: 'Violator detected! Prepare to be banned, and please read the [[Community Guidelines]]',
    yes: 'Continue to page',
    no: 'Leave',
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');