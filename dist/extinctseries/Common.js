/* Any JavaScript here will be loaded for all users on every page load. */

/*import*/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js",
        "w:c:dev:ReferencePopups/code.js",
    ]
});

/****************************************/
/* sliders using jquery by User:Tierrie on France's Star Citizen Wiki*/
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie on France's Star Citizen Wiki*/
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
    var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
    $("[class*=portal_sliderlink]").click(function() { // bind click event to link
        $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
        console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
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