/* Импорт JS-страниц Fixes.js */
importArticles({
	    type: 'script',
	    articles: [
	        'u:ru.wikicorporate:MediaWiki:Fixes.js'
	    ]
	});

/* Выделение комментариев */
setInterval(function () {
	$('.wds-avatar a[href$="LeraBE"]').closest('.Reply, .Reply_body__PM9kM').addClass('bur');
    $('.wds-avatar a[href$="Swit4er"]').closest('.Reply, .Reply_body__PM9kM').addClass('admin');
    $('.wds-avatar a[href$="Voidan%20Dether"]').closest('.Reply, .Reply_body__PM9kM').addClass('admin');
    $('.wds-avatar a[href$="Merzlyak"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="Kostinger"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="TimurKhan"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordMod');
    $('.wds-avatar a[href$="IamNotFreddy"]').closest('.Reply, .Reply_body__PM9kM').addClass('discordAdmin');
    $('.wds-avatar a[href$="Lubitel%20obnimashek"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="JustAccount"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="Fleshka5856"]').closest('.Reply, .Reply_body__PM9kM').addClass('intern');
    $('.wds-avatar a[href$="Creepy%20Owl "]').closest('.Reply, .Reply_body__PM9kM').addClass('contMod');
    $('.wds-avatar a[href$="Lich%20night"]').closest('.Reply, .Reply_body__PM9kM').addClass('threadmod');
}, 500 );