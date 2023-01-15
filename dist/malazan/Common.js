importArticles({
    type: 'script',
    articles: [
        // Wiki syntax highlighting for MonoBook.
        'u:dev:MonobookHighlight.js',
        // Spoiler toggle script that uses cookies. Author: Tierrie @ dragonage.wikia
        'u:dragonage:MediaWiki:SpoilersToggle.js',
    ]
});

/*-----------------------------------------------------------/
/--Checks whether user is logged-in--------------------------/
/-----------------------Replaces user's name in {{USERNAME}}-/
/-------------------------Toggles text with {{ifregistered}}-/
/---------------Originally by [[wikia:User:Splarka|Splarka]]-/
/------------------------New version by [[User:Spang|Spang]]-/
/---------------------------------Expanded by JBed of FFWiki-/
/-----------------------------------------------------------*/
 function checkUserLogin() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
    $('span.userregistered').each(function() {
        $(this).css("display", "inline");
    });
    $('span.userunregistered').each(function() {
        $(this).css("display", "none");
    });
 }
 addOnloadHook(checkUserLogin);
/* ends */

// Remove tooltips from Splr templates
$( '.spoilertext a' ).removeAttr( 'title' )

// Adds icons to page header
$(function () {
  $('.page-header__contribution-buttons > div').prepend($('#malazan-icons'));
  $('#malazan-icons').css({'position': 'relative', 'right': '10px', 'top': '2px'}).show();
});