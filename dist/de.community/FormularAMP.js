var _api = {
    edittoken: mw.user.tokens.values.editToken,
    watchtoken: mw.user.tokens.values.watchToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    language: mw.config.get('wgUserLanguage')
};
 
temp_text = $('#wikiName').val();
user = "~" + "~~";
date = "~" + "~~" + "~~";
language = wgContentLanguage;
 
var $ = this.jQuery,
    mw = this.mediaWiki;
 
$("span#neuerantragknopf").html('<span id="opener" class="wds-button headerbg" onclick="FormularHauptfunktion()">' + 'Neuer Antrag' + '</span>');
 
function submitAntrag() {
summary = 'Neuer Mentoren-Antrag';
wikiName = $("#wikiName").val();
bereich = $("#wikiBereich").val();
text = $("#wikiText").val();
url = $("#wikiURL").val();
urlname = url.replace('http://', '').replace(/\.wikia\.com(.*)/g, '');
destination = "Admin-Mentor-Programm/Antrag";
text = '\n==' + urlname + '==\n{{' + 'AMPAntrag' + '\n|User=' + user + '\n|Wiki=' + wikiName + '\n|Bereich=' + bereich + '\n|Text=' + text + '\n|urlname=' + urlname + '\n|S=1' + '\n|Datum=' + date + '\n}}\n'; 
 
$.post(wgServer + '/api.php?action=edit&title=' + encodeURIComponent(destination) + '&appendtext=' + encodeURIComponent(text) + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=' + summary, function() {
setTimeout(function() {
window.location.reload();
}, 500);
});
}
 
function FormularHauptfunktion()  {
$("#opener").fadeOut();
 
$("#neuerantragknopf span").after('<div id="ampform" style="text-align: left;">' 
+ '<h2>' + 'Antragsformular' + '</h2>'
+ '<b>' + 'URL des Wikis, für welches du einen Mentor möchtest' + '</b>'
+ '<br>'
+ '<input id="wikiURL"></input>'
+ '<br>'
+ '<b>' + 'Name des Wikis' + '</b>'
+ '<br>'
+ '<input id="wikiName"></input>'
+ '<br>'
+ '<b>' + 'Art der Hilfe, die du brauchst (z. B. "Sozial" oder "Technisch")' + '</b>'
+ '<br>'
+ '<input id="wikiBereich"></input>'
+ '<br>'
+ '<b>' + 'Ergänzender Text' + '</b>'
+ '<br>'
+ '<textarea id="wikiText"></textarea>'
+ '<br><span id="wikiSubmit" class="wds-button wds-is-squished headerbg" onclick="submitAntrag()">' + 'Abschicken' + '</span>'
+ '</div>');
 
$("#ampform input, #ampform textarea").css("box-sizing", "border-box").css("width", "100%");
}