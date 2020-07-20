$(document).ready(function(){
$('.insertusername').text(wgUserName);

importScriptPage('MediaWiki:TemplatedValues.js', 'de.fanfictions');
importScriptPage('Vorlage:Geschichtenbalken2016', 'de.fanfictions');
importScriptPage('MediaWiki:Mum-advent.js', 'bastelstube5');
importScriptPage('MediaWiki:Portalrailcontent.js', 'de.fanfictions');
importScriptPage('MediaWiki:PortalPopulation.js', 'de.fanfictions');
importScriptPage('MediaWiki:NeueNeuigkeit.js', 'de.fanfictions');

var CustomSort = ['status-aktiv', 'status-neu', 'status-pausierend', 'status-pause', 'status-abgeschlossen', 'status-kurzgeschichte', 'status-inaktiv', 'status-status_nicht_definiert'];

function sortUsingNestedText(parent, childSelector) {
    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = $(a).attr('data-attr').toLowerCase();;
        var vB = $(b).attr('data-attr').toLowerCase();;
        return ($.inArray(vA, CustomSort) < $.inArray(vB, CustomSort)) ? -1 : ($.inArray(vA, CustomSort) > $.inArray(vB, CustomSort)) ? 1 : 0;
    });
    parent.append(items);
}

sortUsingNestedText($('#portal-sort'), "div");
});

/** Redirect main page for wikiamobile 
 if (skin == "wikiamobile") {
  if ($('body').hasClass('page-Board_Synchro-Forum')) {
    if (document.URL.indexOf("redirect=no") == -1) {
    window.location = "[URL to redirect to]";
  };
 };
 };
**/
$(function() {
    $('.page-Spezial_UserSignup').click(function(e) {
        if ($(e.target).hasClass('page-Spezial_UserSignup')) {
            document.title = "MeerUndMehr - Fanfiction Writing Wiki beitreten";
        }
    });
});


if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "",
        "speedTip": "Geschichten-Redirect",
        "tagOpen": "#redirect [[{{NAMESPACE}}:{{BASEPAGENAME}}/",
        "tagClose": "]]",
        "sampleText": "Name"
    };
}

/* longer intro */

if ($('body').hasClass('page-Diskussionsforum_Geschichtenupdates')) {
    $('.ForumNewMessage').prepend('<div class="accent" style="border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px;  border: 1px solid #CCC; padding: 16px; margin-bottom: 25px; position: relative; font-size: 12pt; text-shadow: 1px 1px 1px #888;"><h3 style="font-size: 20px; margin: 0px 0px 16px 0px;">Bleib immer auf dem aktuellen Stand</h3>Verpasse keine Veröffentlichung eines neuen Kapitels deiner Lieblingsgeschichte mehr - klicke <a href="http://de.fanfictions.wikia.com/wiki/Diskussionsforum:Geschichtenupdates?action=watch">hier</a>, um alle Geschichtenupdates via E-Mail zu abonnieren! <small>Benötigt Wikia-Benutzerkonto</small><br><a href="http://de.fanfictions.wikia.com/wiki/Board:Geschichtenupdates?sort=nr">Klicke hier, um die Updates chronologisch zu ordnen, sprich neuste zuerst.</a></div>');
};

if ($('body').hasClass('page-Diskussionsforum_Synchro-Forum') || $('body').hasClass('page-Thema_Sprecher_gesucht')) {

$(document).ready(function() {
$("li.thread > div > h4 > a").each(function() {

thread_head = $(this).text();

if (thread_head.match(/\[Beendet\]/g)) {
$(this).parent().parent().parent().css("opacity", "0.25");
$(this).parent().parent().parent().appendTo(".ThreadList");
}
});
});
}

if ($('body').hasClass('page-Diskussionsforum_Synchro-Forum')) {

$('.ForumNewMessage').prepend('<div style="border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px;  border: 1px solid #F0CE21; background: #F3E07D; padding: 16px; margin-bottom: 25px; position: relative; font-size: 12pt;"><h3 style="font-size: 20px; margin: 0px 0px 16px 0px;">Willkommen bei der MeerUndMehr-Hörspiel-Gruppe!</h3>Hallo Leser,<br><br>Wir freuen uns, dass du bei den Aufnahmen mitmachen willst! Suche dir eine aktuell verfügbare Rolle heraus (<a asdf href="http://de.fanfictions.wikia.com/wiki/Thema:Sprecher_gesucht">Liste mit Rollen</a>) und gib dein Bestes :)<br><br>Alternativ kannst du auch dein generelles Interesse am Aufnehmen von Hörspielen im Forum signalisieren, dann wirst du sicher bald kontaktiert werden.<br><br>Alle fertiggestellten Projekte sind auf unserem <a href="https://www.youtube.com/user/meerundmehrwiki">YouTube-Kanal</a> verfügbar.</div>');

}

if ($('body').hasClass('page-Thema_Sprecher_gesucht')) {

$('.ForumNewMessage').prepend('<div style="border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px;  border: 1px solid #F0CE21; background: #F3E07D; padding: 16px; margin-bottom: 25px; position: relative; font-size: 12pt;"><h3 style="font-size: 20px; margin: 0px 0px 16px 0px;">Verfügbare Sprechrollen</h3>Alle hier aufgelisteten Beiträge, sofern sie nicht [Beendet] im Namen enthalten, sind aktuell verfügbar.<br><br>Wir freuen uns darauf, von dir zu hören!</div>');

}





/* geschichtenbalken erscheine */
    $("#button-geschichtenbalken").click(function () {
      $("#geschichtenbalken-komplett:hidden").fadeIn();
      $(".geschichtenbalken-top").hide();
    });
/* afw8 feedback volle größe */
 $("#afw8-enlarge-feedback-button").click(function () {
      $("#afw8-enlarge-feedback").animate().css({'height': '740px'});
      $("#afw8-enlarge-feedback-button").hide();
    });

if ('body.hasClass("page-Geschichte_Alarm_für_Waddle_8")') {
$(".editsection > a").each(function() {
    var text = $(this).text();
    text = text.replace("Bearbeiten", "e");
    $(this).text(text);
});
}

$('a.new[href*="/wiki/Geschichte"]').attr('href', function() {
    return this.href + '&preload=Vorlage:Seite/Hist&editintro=Vorlage:Seite/Hist/Editintro&action=edit';
});

// spoiler
$(window).ready(function() {
setTimeout(function() {
$('.spoiler-container .show-spoiler').click(function() {                  
//alert(this);
    $(this).parents('.spoiler-container').children('.show-spoiler').fadeOut('fast');       $(this).parents('.spoiler-container').children('.spoiler-content').toggle('slow');       
    return false;                                       
  }); 
console.log("spoiler loaded");
}, 5000);
});
// CACHE NERV #5