/**
 * Switch.js -- By Matthew2602
 *
 * Allows for seamless switching of the view of multiple pieces of content
 *
 * 11:07, July 19, 2012 (UTC)
 *
 * Styles used by this script can be found at http://runescape.wikia.com/wiki/User:Matthew2602/switch.css
 *
 * TODO: Support for multiple separate modules to be chained together and switched with one set of links
 *
 */
 
$(function() {
 
// **********************************************************************
 
// Replaces span tags with the button class with actual button tags in monobook, because the button class does not exist in monobook
 
if (skin == 'monobook') {
    $('.switch .trigger').each(function() {
        $(this).replaceWith('<button type="button" class="' + $(this).attr('class') + '">' + $(this).text() + '</button>');
    });
}
 
// Optimises the template for a particular application, controlled by the "type" parameter
 
$('.switch').each(function() {
 
    var $a = $(this).find('.switch-links');
 
    if ($(this).hasClass('type-infobox')) {
        // Controls the infobox type
        $(this).find('.switch-item table caption').append($a);
        $(this).find('.switch-links .button').css('margin-bottom', '3px');
    } else if ($($a).hasClass('bottom')) {
        $(this).append($a);
    }
 
    // Gets rid of the loading button and shows the relevant elements when optimisation is complete
    $(this).find('.switch-links').show();
    $(this).find('.switch-loading').remove();
 
});
 
// Does the actual switching
 
$('.switch .trigger').click(function() {
    var $a = $(this).parents('.switch');
    $a.find('.switch-item').hide();
    for (var i=1; i <= $a.find('.switch-item').length; i++) {
        if ($(this).hasClass(i)) {
            $a.find('.switch-item.' + i).show();
        }
    }
});
 
});