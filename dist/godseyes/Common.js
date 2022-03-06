/* Any JavaScript here will be loaded for all users on every page load. */
( function() {
'use strict';

// copy to clipboard
$(function() { // wait for content load (DOMContentLoaded)
  $('.copy-clipboard').each(function () {
    var $this = $(this);
    var $button = $('<button title="Copy to Clipboard">&#xf0ea;</button>');
    $this.append($button);
    $button.click(function () {
      var $content = $this.find('.copy-content');
      $content.children().remove();
      selectElementText($content[0]);
  
      try {
        if (!document.execCommand('copy'))
          throw 42;
        mw.notify('Successfully copied to Clipboard.');
      } catch (err) {
        mw.notify('Copy to Clipboard failed. Please do it yourself.', {type:'error'});
      }
    });
  });
});

function selectElementText(element) {
  var range, selection;    
  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();        
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

/* Fires when DOM is ready */
$( function() {

function importScriptRL(page) {
	// importScriptPage doesn't utilise the resource loader (which minifies scripts). Workaround!
	importArticle({ type: 'script', article: page });
}


/**
 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
 *
 * This is so people have a chance to look at the image and click on pages they want to view.
 */
$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.animated-container, .mcui', function( e ) {
	$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
} );


} );
/* End DOM ready */

}() );

/* for Module:layerMap to toggle visibility of the layers */
$(".layerMapToggleButton").click(function(){
  var id = $(this).attr('data-forid');
  $('#' + id).toggle();
});

/* Rail WAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log/Auto-Statistics",
    loadOnPage:'Special:WikiActivity',
    autoLogForUsers:["User:Kusuo1412"],
    loadOnNamespace:[-1],
};