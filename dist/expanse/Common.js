/* Any JavaScript here will be loaded for all users on every page load. */

/******************************/
/* Not sure what this does... */
/******************************/
$('body.page-The_Expanse_Wiki .mw-spcontent').each(function() {
    var html = '';
    $(this).children('a').each(function() {
        if ($(this).hasClass('new')) {
            html += '<li>' + this.outerHTML + '</li>';
        }
    });
    $(this).html('<ul>' + html + '</ul>');
});


/***********************/
/* Is this still used? */
/***********************/
window.railWAM = {
    logPage:"Project:WAM Log"
};

/*******************************************************************/
/* Used to configure dev:LinkPreview/code.js in MediaWiki:ImportJS */
/* Does not seem to work...                                        */
/*******************************************************************/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/expanse/images/3/3f/Placeholder_other.png';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/expanse/images/3/3f/Placeholder_other.png';

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