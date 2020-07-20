/* Any JavaScript here will be loaded for all users on every page load. */

SpoilerAlert = {
  categories: "Books", "Heroes", "Villains", "Locations", "Items", "Teams"
}

importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.js"
    ]
});

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Books');
        return -1 !== wgCategories.indexOf('Heroes');
        return -1 !== wgCategories.indexOf('Villains');
        return -1 !== wgCategories.indexOf('Locations');
        return -1 !== wgCategories.indexOf('Items');
        return -1 !== wgCategories.indexOf('Teams');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

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
});
} );


/* Countdown */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});