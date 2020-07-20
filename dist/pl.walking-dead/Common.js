/* Do szablonu Username */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 

importArticles({
    type: 'script',
    articles: [
/* Łatwe edytowanie przywitania na tablicy wiadomości */
        'w:dev:MediaWiki:WallGreetingButton/code.js',
/* Licznik */
        "w:c:dev:MediaWiki:Countdown/code.js",
/* Rozbudowana nawigacja */
        'u:dev:ExtendedNavigation/code.js',
/* Opisy zmian w edytorze źródłowym */
        "MediaWiki:Summaries.js",
	'u:dev:MediaWiki:NewPagesUser.js',
/* Plakietki użytkowników */
	"MW:UserTags.js",
	"MW:AutoEditDropdown.js",
	"u:pl.tes:MediaWiki:Licenses.js"
]});

/* Dod. linków na karcie "Na Wiki" w menu nawigacji (podziękowania dla Vuha za pozwolenie użycia skryptu!)*/
$(document).ready(function() {
	$('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/The_Walking_Dead_Wiki:Regulamin">Regulamin</a></li>');
});

$(document).ready(function(){$(".quotebox-button").click(function(){var t=$(this).attr("id");$(".quotebox").each(function(){$(this).attr("id")==t?$(this).show():$(this).hide()})})});