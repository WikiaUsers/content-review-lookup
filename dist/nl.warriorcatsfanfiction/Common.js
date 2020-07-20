/* JavaScript die hier wordt geplaatst heeft invloed

op alle pagina's voor alle gebruikers, kom hier dus niet aan, als je niet weet wat het doet! Dus niet doen!*/


/* Met deze code kun je iemands gebruikersnaam toevoegen aan een pagina door het

typen van de tekst "{{Username}}". Vereist het kopieren van Sjabloon:Username */


function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});