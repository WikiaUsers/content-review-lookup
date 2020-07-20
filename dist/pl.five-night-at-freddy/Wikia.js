//Importy
importScriptPage('MediaWiki:Wikia.js/KącikMatrymonialny.js');
importScriptPage('PurgeButton/code.js','dev');
importScriptPage('MediaWiki:Wikia.js/TimeCircles.js');
importScriptPage('MediaWiki:Wikia.js/CountdownSettings.js‎');


//Dodatkowe plakietki

/* "Nieakwywny(-a)" */
InactiveUsers = { text: 'Nieaktywny(-a)' };
importScriptPage('InactiveUsers/code.js', 'dev');
 

//Szablon Username 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.interusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);

//Dodatwe przyciski w edytorze źródłowym
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
		"speedTip": "Zaznacz do ekspresowego usunięcia",
		"tagOpen": "{{Ek",
		"tagClose": "}}",
		"sampleText": ""
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
		"speedTip": "Wstaw link do profilu użytkownika",
		"tagOpen": "[[Użytkownik:",
		"tagClose": "|Nick_użytkownika]]",
		"sampleText": "Nick_użytkownika"
	};
	
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png",
		"speedTip": "Dodaj kategorię",
		"tagOpen": "[[Kategoria:",
		"tagClose": "|{" + "{PAGENAME}}]]",
		"sampleText": "Nazwa kategorii"
	};
	
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/30/Btn_toolbar_rayer.png",
		"speedTip": "Przekreśl tekst",
		"tagOpen": "<del>",
		"tagClose": "</" + "del>",
		"sampleText": "Skreślony tekst"	
    };

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
		"speedTip": "Wyśrodkuj tekst",
		"tagOpen": "<center>",
		"tagClose": "</center>",
		"sampleText": ""
	};	
	
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
		"speedTip": "Wstaw komentarz widoczny tylko podczas edycji",
		"tagOpen": "<!--",
		"tagClose": "-->",
		"sampleText": "Treść komentarza"
	};