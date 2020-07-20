/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// TROXEL 3D viewer
$.getScript('https://chrmoritz.github.io/Troxel/static/libTroxel.min.js');
// END of TROXEL 3D viewer

// AJAX tables
function addAjaxDisplayLink() {
	$("table.ajax").each(function (i) {
		var table = $(this).attr("id", "ajaxTable" + i);
		table.find(".nojs-message").remove();
		var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
		var cell = table.find("td").first(), needLink = true;
		cell.parent().show();
		if (cell.hasClass("showLinkHere")) {
			var old = cell.html(), rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
			if (rep != old) {
				cell.html(rep);
				needLink = false;
			}
		}
		if (needLink) headerLinks.html('[<a href="javascript:;" class="ajax-load-link">show data</a>]');
		table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text('Please wait, the content is being loaded...');
			$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
				if (data) {
					cell.html(data);
					cell.find('.ajaxHide').remove();
					cell.find('.terraria').removeClass('terraria');
					if (cell.find("table.sortable").length) {
						mw.loader.using('jquery.tablesorter', function() {
							cell.find("table.sortable").tablesorter();
						});
					}
					headerLinks.text('[');
					headerLinks.append($('<a>edit</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
					headerLinks.append(document.createTextNode(']\u00A0['));
					var shown = true;
					$("<a href='javascript:;'>hide</a>").click(function() {
						shown = !shown;
						shown ? cell.show() : cell.hide();
						$(this).text(shown ? "hide" : "show");
					}).appendTo(headerLinks);
					headerLinks.append(document.createTextNode(']'));
				}
			}).error(function() {
				cell.text('Unable to load table; the source article for it might not exist.');
			});
		});
	});
}

$(addAjaxDisplayLink);
// END of AJAX tables

// Auto-refresh
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity", "Special:Statistics"];
window.AjaxRCRefreshText = 'Авто-перезагрузка';
window.AjaxRCRefreshHoverText = 'Автоматическая перезагрузка страницы';
// END of ajax auto-refresh

// Expand All
var expandAllFlag = 0;
var $expandAll = $('.expandAll a');
$('.expandAll a').click(function(){
    if (expandAllFlag == 0){
        $('.mw-collapsible tbody tr').fadeIn();
        expandAllFlag = 1;
        $expandAll.text('Скрыть все');
    } else {
        $('.mw-collapsible tbody tr').fadeOut();
        expandAllFlag = 0;
        $expandAll.text('Раскрыть все');
    }
});
//End of Expand All

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',       //AjaxRC
        'u:dev:MediaWiki:Countdown/code.js',    //COUNTDOWN
        'u:dev:MediaWiki:ListAdmins/code.js',   //ListAdmins 
        'u:dev:MediaWiki:ListUsers/code.js',    //ListUsers
        'u:dev:MediaWiki:Message/code.js',      //Message (сообщения для нескольких пользователей)
        'u:dev:MediaWiki:PurgeButton/code.js',  //PurgeButton
        'u:dev:MediaWiki:PageMakerPro/code.js', //PageMakerPro
    ]
});

importArticles({
	type: 'style',
	articles: [
		'u:dev:MediaWiki:TZclock.css'
	]
}, {
	type: 'script',
	articles: [
		'u:dev:TZclock.js'
	]
});

window.UserTagsJS = {
	modules: {},
	tags: {
		chiefadmin: { u:'Главный администратор' },
		activeadmin: { u:'Активный администратор'},
		activemember: { u:'Активный участник', f:'Активная участница' }
	}
};
UserTagsJS.modules.custom = {
	'AlexSibirov': ['activeadmin'],
	'Yuransys': ['activeadmin']
};
UserTagsJS.modules.implode = {
	'chiefadmin': ['bureaucrat', 'sysop']
};
UserTagsJS.modules.inactive = false;
UserTagsJS.modules.metafilter = false;
UserTagsJS.modules.newuser = false;