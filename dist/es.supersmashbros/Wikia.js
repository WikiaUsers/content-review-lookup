var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "wikia_es"
};
importScriptPage('SocialIcons/code.js','dev');

function editMensaje() { $('#EditPageHeader').after('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div data-type="1"><a class="sprite close-notification"></a><a href="/index.php?title=SmashPedia%3AReglas_de_edici%C3%B3n_de_art%C3%ADculos">Reglas de edición</a>.</div></li></ul>'); }   addOnloadHook(editMensaje);

function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/User_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Blogs</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});