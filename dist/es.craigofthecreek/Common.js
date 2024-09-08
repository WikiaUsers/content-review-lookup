/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importArticles({
    type: "style",
    articles: [
        "w:c:dev:MediaWiki:FontAwesome.css"
    ]
});

window.SpoilerAlert = {
  pages: ["Spoiler"],
};
 
/* Usuarops bloqueados infinitamente */
window.addEventListener('load', function() {
	// Los tiempos de espera son siempre una mala elección, pero UserTags no tiene ninguna acción enviada cuando terminó de cargarse.
	setTimeout(function() {
		if (document.getElementById('UserProfileMasthead') === null) return;
		var blockTag = document.querySelector('.tag.usergroup-blocked.blocked-user');
		if (blockTag === null) return;
		new mw.Api().get({
			action: 'query',
			list: 'blocks',
			bkprop: 'expiry',
			bktimestamp: new Date().getTime(),
			bkusers: wgTitle
		}).done(function(d) {
			if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
				blockTag.innerHTML = 'Shattered';
			}
		});
	}, 250);
});
 
/* Para hacer ReportLog visible */
(function showLogs() {
	var $reportLog = $('.ReportLog');
	ug = mw.config.get('wgUserGroups');
	if ( wgPageName==="Special:WikiActivity" && $reportLog.length === 0) setTimeout(showLogs, 250);
	else if (ug.indexOf('bot') + ug.indexOf('chatmoderator') + ug.indexOf('imagecontrol') + ug.indexOf('rollback') + ug.indexOf('sysop') + ug.indexOf('patroller') + ug.indexOf('bureaucrat') > -7) $reportLog.css('display', 'block');
})();
 
/* Etiqueta de spoiler + botones */
if ($('.spoiler').length) {
    switch (wgCanonicalNamespace) {
        case 'User':
        case 'User_talk':
            $('.UserProfileActionButton .wikia-menu-button').before(
                '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>'
            );
            break;
    }
    $('.wikinav2 .WikiaPageHeader').css('padding-right', '0');
    $('#WikiaPageHeader .comments').after(
        '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>'
    );
}
$('#toggle-spoiler').click(function() {
    if ($('.spoiler.on, .spoiler.off').length) {
        $('.spoiler').attr('class', 'spoiler').removeAttr('title');
        $('.wikia-button#toggle-spoiler').attr('title', 'Hide all spoilers on the page').html('Hide Spoilers');
    } else {
        $('.spoiler').attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
        $('.wikia-button#toggle-spoiler').attr('title', 'Show all spoilers on page').html('Show Spoilers');
    }
});
 
var spoilerConfig = function(i, el) {
    var $el = $(el);
    $el.attr('title', 'click to show the spoilers');
    $el.click(function() {
        var $this = $(this);
        if ($this.hasClass('on'))
            $this.attr('class', 'spoiler off').removeAttr('title');
        else
            $this.attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
    });
};
 
$('.spoiler.on').each(spoilerConfig);
 
// Arreglo para comentarios de Artículos.
if ( wgIsArticle ) {
    var fixPagination = function() {
        // Arreglo para mal código HTML.
        var paginations = Array.from(document.getElementsByClassName('article-comments-pagination'));
        for (var i in paginations) {
            var childNodes = Array.from(paginations[i].childNodes);
            for (var child in childNodes) {
                var childElement = childNodes[child];
                if (childElement.nodeType == 3) {
                    childElement.nodeValue = ' ... ';
                }
            }
        }
    };
    $(document).on('DOMNodeInserted', '#article-comments .spoiler.on', spoilerConfig);
    $(document).on('DOMNodeInserted', '.article-comments-pagination', fixPagination);
    var AC = ArticleComments.init;
    ArticleComments.init = function() {
        AC();
        $('#article-comments .spoiler.on').each(spoilerConfig);
        fixPagination();
        $('#article-comm').attr('placeholder', 'Recuerda, no está permitido filtrar información! Si no estás seguro sobre lo que es y no es filrado, contacta a un administrador.');
    };
}
 
/* Reemplaza {{USERNAME}} con el nombre del usuario navegando en la página.
   Requiere copiar Plantilla:USERNAME. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
 
/* Fin del reemplazo de {{USERNAME}} */
 
importArticles({
	type: 'style',
    articles: [
        'u:dev:MediaWiki:FandomIcons/code.css',
	    'u:dev:MediaWiki:TZclock.css'
    ]
}, {
	type: 'script',
	articles: [
	    'u:dev:TZclock.js',
 
        'u:onceuponatime:MediaWiki:CollapsibleTables.js',
        'u:onceuponatime:MediaWiki:Common.js/DuplicateImages.js',
 
        'u:runescape:MediaWiki:Common.js/WLH_edit.js',
    ]
});