/* Kello */
window.DisplayClockJS = {
    format: '%2I:%2M:%2S %p %2d %{tammikuuta;helmikuuta;maaliskuuta;huhtikuuta;toukokuuta;kesäkuuta;heinäkuuta;elokuuta;syyskuuta;lokakuuta;marraskuuta;joulukuuta}m %Y (UTC)',
    location: 'header',
    hoverText: 'Kello',
    interval: 500, /* How often the timer updates in milliseconds (1000=1second) */
    monofonts: 'Arial, Arial' /* The font the clock uses by default */
};
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

/* ChatOptions */
importScriptPage('ChatOptions/code.js', 'dev');

/* IP-paljastus */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

/* Poistotyökalu */
importScriptPage( 'FastDelete/code.js', 'dev' );

/* AjaxRC */
importScriptPage('AjaxRC/code.js', 'dev');

/* Lumi */
importScriptPage('MediaWiki:Snow.js');

/* Facenappi */
function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=144617159082075
&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="280" height="250" scrolling="no" />');
}
$(fBox);

/* Epäaktiivinen */
/* Koodi on kopioitu sivulta http://community.wikia.com/wiki/Forum:Inactive_tag */

$(function() {
 
    if (!$('#UserProfileMasthead').length) return;
 
    if (!parseInt($("#UserProfileMasthead .tally").text())) return;
 
    var userName  = $("#UserProfileMasthead h1").text();
 
    function ISODateNDaysAgo (days) {
        function pad (n) { return n < 10 ? '0' + n : n; }  
        function ISODateString (d) {  
            return    d.getUTCFullYear() + '-'  
                + pad(d.getUTCMonth()+1) + '-'  
                + pad(d.getUTCDate())    + 'T'  
                + pad(d.getUTCHours())   + ':'  
                + pad(d.getUTCMinutes()) + ':'  
                + pad(d.getUTCSeconds()) + 'Z';
        }
        return ISODateString(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
    }
 
    var apiUrl = '/api.php?action=query&list=usercontribs&uclimit=1&ucprop=title|timestamp&format=json' +
                 '&ucuser='  + userName +
                 '&ucstart=' + ISODateNDaysAgo(0) +
                 '&ucend='   + ISODateNDaysAgo(3 * 30);
 
    $.getJSON(apiUrl, function (result) {
        if (typeof result.query != 'undefined' && typeof result.query.usercontribs != 'undefined' &&
            !result.query.usercontribs.length) {
            $('<span class="group inactive-user"> Epäaktiivinen</span>').appendTo('#UserProfileMasthead hgroup');
        }
    });
});