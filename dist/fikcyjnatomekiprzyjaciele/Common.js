/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*<pre>*/

// KONFIGURACJA SKRYPTÓW
// Konfigurację umieszczamy zgodnie z kolejnością importu.

// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';

// UserTags
window.UserTagsJS = {
	tags: {
		usermonth:	{ u:'Użyt. miesiąca', title: 'Użytkownik miesiąca' }
	},
	modules: {
		inactive: 60,
		mwGroups: ['bot','bureaucrat','chatmoderator','founder','rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true
	}
};

// PurgeButton
PurgeButtonText = 'Odśwież';
 
// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:AjaxRC.js", 			// AjaxRC
	"u:pl.tes:MediaWiki:ElderScrollsWiki.js",		// ToTop
	"u:pl.tes:MediaWiki:Change.js",				// Change
	"u:dev:UserTags/code.js",				// UserTag
	"u:dev:PurgeButton/code.js",				// PurgeButton
	"u:dev:WallGreetingButton/code.js",			// WallGreetingButton
	"u:dev:SearchSuggest/code.js",				// SearchSuggest
	"u:dev:Voice_Dictation/voice.js"			// VoiceDictation
   ]
});

// POMNIEJSZE MODYFIKACJE
// Umieszczamy na własną odpowiedzialność.

// Profil użytkownika
$(function() {
    // Przeniesienie paska wyszukiwania na wysokość nicku
    $('#UserProfileMastheadSearch').appendTo('.masthead-info hgroup h1');
 
    // Przeniesienie przycisku edycji na bardziej logiczne miejsce
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});

// Szablon USERNAME
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

// Chatango
// Made by Rakharow, modifed by Wedkarski
 
function toggleChatangoWnd()
{
	if (parseInt($("#ChatangoWnd").css("left"))!==0) $("#ChatangoWnd").animate({left:"0px"}, 700);
	else $("#ChatangoWnd").animate({left:"-281px"}, 700); 
}
 
$("<div id='ChatangoWnd' onclick='toggleChatangoWnd()'></div>").css({
	width:"301px", 
	height:"390px", 
	position:"fixed",
	top:"150px",
	left:"-281px",
	padding:"11px 0px 0px 11px",
	zIndex:300,
	backgroundImage:"url(https://images.wikia.nocookie.net/risenpedia/pl/images/7/7c/Ramka_Chatango.png)"
}).appendTo("body");
 
$("<div id='sid0010000041709336728'></div>").appendTo("#ChatangoWnd");
 
(function() {function async_load(){s.id="cid0010000041709336728";s.src='http://st.chatango.com/js/gz/emb.js';s.style.cssText="width:255px;height:359px;";s.async=true;s.text='{"handle":"tomekipogaduszki","styles":{"b":100,"c":"666666","d":"666666","f":46,"j":"BCE27F","k":"666666","l":"000000","s":1}}';var ss = document.getElementsByTagName('div');for (var i=0, l=ss.length; i < l; i++){if (ss[i].id=='sid0010000041709336728'){ss[i].id +='_';ss[i].parentNode.insertBefore(s, ss[i]);break;}}}var s=document.createElement('script');if (s.async==undefined){if (window.addEventListener) {addEventListener('load',async_load,false);}else if (window.attachEvent) {attachEvent('onload',async_load);}}else {async_load();}})();


/*</pre>*/