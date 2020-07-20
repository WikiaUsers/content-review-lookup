// Komunikat
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
 
var message = 'Kliknij <a href="http://pl.szynka013.wikia.com/wiki/Szynscy!" class="plainlinks">tutaj</a> i zostaw po sobie ślad!<br/>No chyba właśnie po to tu wpadłeś!';
 
if($('.WikiaNotifications').length > 0) { 
          $('<li><div id="helpTheWiki" style=""><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li>').prependTo('#WikiaNotifications');
       } else {
        $('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div style="" id="helpTheWiki"><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li></ul>').prependTo('.WikiaBarWrapper');
       }
}

// Moduł
$(document).ready(function() {
    var newSection = '<section class="WikiaActivityModule module" id="sidebar">' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text=<verbatim>Checkbox</verbatim>&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});