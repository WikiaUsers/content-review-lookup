/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/* Staat je toe om sjablonen te maken die je in/uit kan klappen */
importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "weergeef",
	hide: "verberg",
	showAll: "alle weergeven",
	hideAll: "alle verbergen"
    }
};

/* icons, Avatar Wiki*/
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});