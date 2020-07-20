/* Notification */
var WikiaNotificationMessage = "Die finale TubeClash-Staffel, #FinalClash, ist gestartet: <a href='http://de.youtube.wikia.com/d/p/2888675319839983677'>Tausche dich mit den anderen Benutzern darüber aus!</a>";
var WikiaNotificationexpiry = 30;
importScriptPage('WikiaNotification/code.js', 'dev');

/* Taken from: http://youtube.wikia.com/MediaWiki:Wikia.js */
$(document).ready(function() {
    var newSection = '<div id="footer">' + '</div>';
    $('.WikiaFooter section').before(newSection);
    $.getJSON('/api.php?action=parse&text={{Footer}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('div#footer').append(code);
    });
});