/* Any JavaScript here will be loaded for all users on every page load. */
/* Automatic issue of dies by the number of participant's edits */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount <= 100) {
            title = "Weak sorceress";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Skilled puppetmaster";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Sly bladedancer";
        } else {
            title = "Mighty berserker";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}( this.jQuery );

/*Java for the main menu*/
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", "") );
        $(window).scroll();                    
        setTimeout($(window).scroll(), 1000);   
    return false;
  });
});
});
//Inactive users
InactiveUsers = { 
    months: 2,
    text: 'LEFT THE WIKI FOR OTHER REASONS'
};