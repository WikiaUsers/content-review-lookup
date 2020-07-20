// IMPORT
importArticles({
    type: "script",
    articles: [
      "w:c:dev:ChatTags/code.js",            //ChatTags
      "w:c:dev:CapsFirst/code.js",           //CapsFirst
    ]
});
 
// LINKI W NAGŁÓWKU by Szynka013
var headline_wikiname = 'Ben 10 Wiki',
    headline_ruleslink = 'Project:Zasady',
    headline_textcolor = '#000',
    headline_styles = 'display: inline-block; width: 300px; font-size: 12px; text-align: center; line-height: 14px; padding: 7px 0; font-weight: bold; color: #FFF; position: absolute; right: 160px;',
    headline_bar = '<div style="' + headline_styles + '">Ważne strony ' + headline_wikiname + '!</br><a href="/wiki/Project:O_nas" target="_blank">O nas</a> — <a href="/wiki/' + headline_ruleslink + '" target="_blank">Zasady</a> — <a href="/wiki/MediaWiki:Emoticons" target="_blank">Emotikony</a></div>';  
 
$('.ChatHeader > .wordmark').append(headline_bar);
 
// AUTOMATYCZNE ODŚWIEŻANIE EMOTIKON
ajaxEmoticonsInterval = 45000;
importScriptPage('AjaxEmoticons/code.js', 'dev');
 
// WORDFILTER by Drew1200, translation by Szynka013
window.outputWarning = '';
window.badWords = ["blocked-test", "bfd", "omfg", "penis", "fuck", "shit", "bastard", "bitch", "faggot", "fag", "nigger", "dick", "whore", "cunt", "wtf", "stfu", "piss", "boobs", "tits", "damn", "masturbate", "slut", "lmao", "joder", "jodete", "jodido", "tetas", "pechos", "masturbar", "masturbación", "felación", "semen", "puta", "mierda", "coño", "nigga", "gilipollas", "cabrón", "fap", "fapear", "fapearse", "chuj", "chujem", "chujnie", "chuju", "chuje", "chujowo", "chuja", "chujowi", "chujach", "chujami", "kurwa", "kurwy", "kurwie", "kurwę", "kurwą", "kurwą", "kurwo", "kurwy", "kurw", "kurwami", "kurwach", "spierdalaj", "spierdalajcie", "spierdalają", "spierdoliło", "spierdoliliście", "pojebany", "pojebana", "pojebani", "pojebało", "zajebiste", "zajebiście", "zajebiści", "zajebisty", "zajebista"];
$('#Write textarea').keydown(function(e) {
    if (e.keyCode == 13 && wordFilter() === true && mainRoom.active === true) {
        for (var i = 0; i < window.badWords.length; i++) {
            window.outputWarning = $('#Write textarea').val();
        }
        $("div.Chat>ul").append("<li class='inline-alert'>W tej wiadomości znajdują się treści, które są uważane powszechnie za wulgarne, niemoralne, propagujące nienawiść lub/i budzące obrazę społeczną jak i osobową! Czy chcesz przesłać swoją wiadomość?<span id='temporary'> ~<br><br>~ <span onclick='ignoreWarning();' style='color:blue;cursor:pointer;'>Tak</span> czy <span onclick='endMessage();' style='color:blue;cursor:pointer;'>Nie</span><span></li>");
        $(this).unbind('keypress').val('');
    }
})
 
function ignoreWarning() {
    mainRoom.socket.send(new models.ChatEntry({roomId:this.roomId,name:wgUserName,text:window.outputWarning}).xport());
    $("#temporary").remove();
}
 
function endMessage() {
    $('#temporary').remove();
}
 
function wordFilter() {
    for (var i = 0; i < window.badWords.length; i++) {
        if ($('#Write textarea').val().toLowerCase().indexOf(window.badWords[i]) !== -1) {
            return true;
        }
    }
}