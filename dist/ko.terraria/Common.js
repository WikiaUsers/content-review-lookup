// Disable triggering of new browser tab when clicking URL links that point to internal wiki addresses (purge, edit, etc)
$('a[href^="//terraria.gamepedia.com"]').removeAttr('target');

// Select links to new tabs for Template:ilnt and Template:elnt
$('.linkNewTab a').each(function(){
    $(this).attr('target','_blank');
});

// Implement border-collapse + border-radius workaround for "terraria"-class tables 
/* (temporarily?) disabled, broke display for tables with percentage widths 
$('.terraria:not(.outer)')
	.removeClass('terraria')
	.addClass('inner')
	.wrap('<table class="terraria outer"></table>');
*/

// Disable creation of non-talk pages by anonymous IP editors and link to registration (also disabled by abuse filter but this provides warning before attempting edit)
var wgPageName = mw.config.get( 'wgPageName' );
var wgUserName = mw.config.get( 'wgUserName' );

var isTalk = false, isAnon = false;
if (wgPageName.indexOf('talk:') > -1 || wgPageName.indexOf('Talk:') > -1) isTalk = true;
if (wgUserName === null) isAnon = true;

if (isAnon == true){
    $('a.new').each(function(){
        var href = $(this).attr('href');
        $(this).attr('href', href.replace(/&action=edit/g, '') );
    });
}

if (isAnon == true && isTalk == false) {
    var anonWarnText = 'Page creation by anonymous editors is currently disabled. <br> To create this page, please <a href="https://terraria.gamepedia.com/Special:CreateAccount">register an account</a> first.';
    $('body').append('<div class="anonWarnOverlay" style="display:none; background-color: #000; opacity: 0.4; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 500;"></div>');					
    $('body').prepend('<div class="anonWarnBox" style="display:none; text-align:center; font-weight: bold; box-shadow: 7px 7px 5px #000; font-size: 0.9em; line-height: 1.5em; z-index: 501; opacity: 1; position: fixed; width: 50%; left: 25%; top: 30%; background: #F7F7F7; border: #222 ridge 1px; padding: 20px;">' + anonWarnText + '</div>');

    var newSelect = 'a.new, #ca-edit a:contains(Create), #ca-ve-edit a:contains(Create), a.external.text:contains(edit this page)';
    $(newSelect).each(function(){
        if ($(this).attr('title').search(/talk\:/gi) < 0) {
            $(this).attr('href', '#').click(function(){
                $('.anonWarnBox').show();
                $('.anonWarnOverlay').show();
            });
        }
    });
    
    $('.anonWarnOverlay').click(function(){
        $('.anonWarnBox').hide();
        $(this).hide();
    });
}

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
		if (needLink) headerLinks.html('[<a href="javascript:;" class="ajax-load-link">보이기 data</a>]');
		table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text('잠시만 기다려 주세요, 내용을 부르고 있습니다...');
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
					headerLinks.append($('<a>편집</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
					headerLinks.append(document.createTextNode(']\u00A0['));
					var shown = true;
					$("<a href='javascript:;'>숨기기</a>").click(function() {
						shown = !shown;
						shown ? cell.show() : cell.hide();
						$(this).text(shown ? "숨기기" : "보이기");
					}).appendTo(headerLinks);
					headerLinks.append(document.createTextNode(']'));
				}
			}).error(function() {
				cell.text('테이블을 불러올 수 없습니다. 해당 문서가 존재하지 않을 수 있습니다.');
			});
		});
	});
}

$(addAjaxDisplayLink);