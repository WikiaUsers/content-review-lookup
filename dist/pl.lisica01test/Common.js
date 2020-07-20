/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */


importScriptPage('MediaWiki:Snow.js','c');
 
addOnloadHook( createCollapseButtons );


// KOMUNIKAT
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
 
var message = 'Polub nasz fanpage!<br/>Kliknij <a href="https://www.facebook.com/Polaris-Nocna-Furia" class="plainlinks">tutaj</a> i śledź na bieżąco wszelkie nowinki ze świata Polaris.<br/>Czytaj, komentuj!';
 
if($('.WikiaNotifications').length > 0) { 
          $('<li><div id="helpTheWiki" style=""><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li>').prependTo('#WikiaNotifications');
       } else {
        $('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div style="" id="helpTheWiki"><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li></ul>').prependTo('.WikiaBarWrapper');
       }
}

/* Spoiler Alert */
// This script must always be the very first executed
importScriptPage('MediaWiki:SpoilerAlert.js');
 
 /* Dodanie opcji ponownego ukrycia spoilerów */
    if ($.inArray("Spoilery", wgCategories) > -1) {
        $('#WikiaPageHeader').append('<a id="reset-spoilers" class="wikia-button secondary" style="margin-right: 10px;">Ukryj spoilery</a>');
        $('#reset-spoilers').click(function() {
            localStorage.removeItem("spoilerCache");
            location.reload();
        });
    }