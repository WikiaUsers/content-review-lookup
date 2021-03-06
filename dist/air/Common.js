/* Any JavaScript here will be loaded for all users on every page load. */

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
$(function() {
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
 
/* Portrait Variations */

/* Add Buttons */
$(window).load(function addButtons() {
    if ($('.image.lightbox').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.button').length === 0) {
        $('.image.lightbox').after(varButton());
    }
});

/* Zoom Switch Feature */
function varButton() {
    var var1Text = 'Variation 1';
    var var2Text = 'Variation 2';
    var $varButton = $('<div>').addClass('var-button');
    var $varLink = $('<a>').addClass('wikia-button').text(var2Text);
    var $body = $('body');
    $noZoomButton.html($noZoomLink);
    $noZoomLink.click(function() {
        $body.toggleClass('var2');
        $body.toggleClass('var1');
        $(this).text(function(index, text) {
            return text === var2Text ? var1Text : var2Text;
        });
    });
    $body.addClass('var1');
    return $varButton;
}
importArticles({    type: 'script',    articles: [        'u:dev:MediaWiki:WikiActivity.js',    ]});