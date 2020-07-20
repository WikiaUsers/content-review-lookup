/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Message/code.js'
    ]
});

/** Komunikat **/
function setCookie() {
  document.cookie = "PlHelpThread=closed; expires=0; path=/"; 
}
 
function getCookie(name)
  {
 var re = new RegExp(name + "=([^;]+)");
 var value = re.exec(document.cookie);
 return (value != null) ? unescape(value[1]) : null;
  }
 
var notifNotClosed = getCookie("PlHelpThread") != "closed";
 
      if (notifNotClosed) {
 
var message = 'Kliknij <a href="http://pl.szymek.wikia.com/wiki/Odwiedzajacy" class="plainlinks">tutaj</a> i się wpisz!<br/>Chyba możesz to zrobić, skoro tu jesteś!';
 
if($('.WikiaNotifications').length > 0) { 
          $('<li><div id="helpTheWiki" style=""><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li>').prependTo('#WikiaNotifications');
       } else {
        $('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div style="" id="helpTheWiki"><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li></ul>').prependTo('.WikiaBarWrapper');
       }
}


// Rangi dla użytkowników
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // Rangi Użytkowników
 
  rights["Kane188"]                = ["Administrator", "Irlandczyk"];
  rights["SzyMek"]                   = ["Założyciel", "SzyMson", "Wszechmogący człowiek"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});

$('.ChatModule .chat-name').html('Czat SzyMsona')