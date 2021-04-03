function toggleFacebookWnd() {
    if (parseInt($("#FacebookWnd").css("right")) !== 0) $("#FacebookWnd").animate({
        right: "0px"
    }, 700);
    else $("#FacebookWnd").animate({
        right: "-210px"
    }, 700);
}

$(function() {
    var d = new Date();
    if (d.getHours() < 5) {
        document.body.className += ' BG4';
        document.getElementById('WikiaPage').className += ' BG4-page';
    } else if (d.getHours() < 9) {
        document.body.className += ' BG3';
        document.getElementById('WikiaPage').className += ' BG3-page';
    } else if (d.getHours() < 18) {
        document.body.className += ' BG1';
        document.getElementById('WikiaPage').className += ' BG1-page';
    } else if (d.getHours() < 19) {
        document.body.className += ' BG2';
        document.getElementById('WikiaPage').className += ' BG2-page';
    } else if (d.getHours() < 24) {
        document.body.className += ' BG4';
        document.getElementById('WikiaPage').className += ' BG4-page';
    }
});
//Komunikat
function setCookie() {
    document.cookie = "PlHelpThread=closed; expires=0; path=/";
}

function getCookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return ((value !== null) ? unescape(value[1]) : null);
}

var notifNotClosed = getCookie("PlHelpThread") !== "closed";

if (notifNotClosed) {
    var message = 'W związku z premierą "Piratów z Karaibów: Zemsty Salazara" artykuły mogą zawierać spoilery. Zalecamy ostrożność.';

    if ($('.WikiaNotifications').length > 0) {
        $('<li><div id="helpTheWiki" style=""><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li>').prependTo('#WikiaNotifications');
    } else {
        $('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div style="" id="helpTheWiki"><a class="sprite close-notification" onclick="setCookie()"></a>' + message + '</div></li></ul>').prependTo('.WikiaBarWrapper');
    }
}