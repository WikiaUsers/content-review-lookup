/* Any JavaScript here will be loaded for all users on every page load. */

// Cross-browser normalization

var textAccess = document.body.textContent ? "textContent" : "innerText";

// Switch button

function createSwitchButton( id ) {
  var text = $('#button' + id);
  if (text !== null) {
    var link = $('<a>');
    link.attr('href', '#');
    link.click( function(e) {
        switchPanel(id);
        e.preventDefault();
    });
    link.append(text.contents());
    text.append(link);
  }
 
  function switchPanel(id) {
    $('#panel' + id).css( 'display', 'block' );
    $('#panel' + (3 - id)).css( 'display', 'none' );
  }
}
 
$(createSwitchButton(1));
$(createSwitchButton(2));


/*
 * Scroll bars
*/
scrolling = false;

function scroll(speed) {
    $('#scrollcontent').animate({
        scrollTop: $('#scrollcontent').scrollTop() + speed
    }, 10, function () {
        if (scrolling)
            scroll(speed);
    });
}

$('#up').mousedown(function () {
    scrolling = true;
    scroll(-8);
}).mouseup(function () {
    scrolling = false;
});

$('#down').mousedown(function () {
    scrolling = true;
    scroll(8);
}).mouseup(function () {
    scrolling = false;
});

/* Replaces {{Username}} with the name of the user browsing the page.
 * If the user is an anonymous user, then "anonymous user" will be displayed.
 *
 * Original version from the 'Don't Starve' wiki
 */
$(function() {
    if ( window.disableUsernameReplace )
        return;
    var userName = mw.config.get( 'wgUserName' );
    if ( userName === null )
        userName = 'anonymous user';
    $( 'span.insertusername' ).html( userName );
});

// Add a link to the IRC chat on the chat module
$(function() {
    var placed = false;
    $('#WikiaRail').on('DOMNodeInserted', function() {
        if (placed)
            return;
        var chatModule = $('.ChatModule');
        if (chatModule.length != 0) {
            placed = true;
            chatModule.append(
                $('<div></div>').html('Also checkout the <a href="https://kiwiirc.com/client/irc.snoonet.org/#pixeldungeon">IRC</a> chat')
            );
        }
    });
});


// Load external scripts
importScript('MediaWiki:Sm2.js');
importScript('MediaWiki:Common.js/MainSlide.js');
importScript('MediaWiki:Common.js/QuoteCollapse.js');