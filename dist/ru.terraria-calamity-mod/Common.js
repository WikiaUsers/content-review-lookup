importScript('MediaWiki:Morph.js');
importScript('MediaWiki:InterLanguageLink.js');

$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
});

window.railWAM = {
   logPage:"Project:WAM Log"
};

// Finishes loading and makes switch infoboxes functional
$( '.switch-infobox.loading' ).removeClass( 'loading' );
 
//Debug
console.log('Initialised switch infoboxes', $( '.switch-infobox' ).length);


/* Динамически-подгружаемый контент с других страниц */
$("table.ajax").each(function (i) {
	var table = $(this).attr("id", "ajaxTable" + i);
	table.find(".nojs-message").remove();
	var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
	var cell = table.find("td").first();
	var needLink = true;
	cell.parent().show();
	if (cell.hasClass("showLinkHere")) {
		var old = cell.html();
		var rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
		if (rep !== old) {
			cell.html(rep);
			needLink = false;
		}
	}
	if (needLink){
		headerLinks.html('[<a href="javascript:;" class="ajax-load-link">Показать данные</a>]');
	}
	table.find(".ajax-load-link").parent().addBack().filter('a').click(function(event) {
		event.preventDefault();
		var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
		cell.text('Таблица загружается, пожалуйста, подождите.');
		$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
			if (!data) {
				return;
			}
			cell.html(data);
			cell.find('.ajaxHide').remove();
			if (cell.find("table.sortable").length) {
				mw.loader.using('jquery.tablesorter', function() {
					cell.find("table.sortable").tablesorter();
				});
			}
			headerLinks.text('[');
			headerLinks.append($('<a>Редактировать</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
			headerLinks.append(document.createTextNode(']\u00A0['));
			var shown = true;
			$("<a href='javascript:;'>Скрыть</a>").click(function() {
				shown = !shown;
				cell.toggle(shown);
				$(this).text(shown ? 'Скрыть' : 'Показать');
			}).appendTo(headerLinks);
			headerLinks.append(document.createTextNode(']'));
		}).error(function() {
			cell.text('Невозможно загрузить таблицу. Возможно, искомая страница не существует.');
		});
	});
});

//Must have for that page, without expanded it looks bad 
$(function(){   
    switch ( mw.config.get('wgPageName') ) {
      case 'Заглавная':
            $('body').addClass('is-content-expanded')
        break;
    }
});
// BackToTopModern button
window.BackToTopModern = true;
//gadgets toggeler
nkch_gst_gadgets = [{
    name: "Hiderail", // название гаджета с MediaWiki:Gadgets-definition; обязательно
    title: "Скрытие правой рельсы страницы", // Название в меню
    description: "Мы настоятельно рекомендуем вас это сделать, вики мгновенно станет приятнее для глаз" // Описание гаджета в меню при наведении
},];

/* This imports the latest version of previewTab from Terraria: https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab.css */
//import css before js to reduce CSS Flash
$('head').first().append('<link rel="stylesheet" type="text/css" href="https://terraria.gamepedia.com/index.php?title=MediaWiki:Gadget-previewTab.css&action=raw&ctype=text/css" />');
/* This imports the latest version of previewTab from Terraria: https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab.js */
mw.loader.load('https://terraria.gamepedia.com/index.php?title=MediaWiki:Gadget-previewTab.js&action=raw&ctype=text/javascript');

/*Right module discord */
window.AddRailModule = [
    {page: 'Template:Discord', prepend: true}];