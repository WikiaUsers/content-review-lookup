// Disable triggering of new browser tab when clicking URL links that point to internal wiki addresses (purge, edit, etc)
$('a[href^="//terraria-uk.gamepedia.com"]').removeAttr('target');

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
	var anonWarnText = 'Створення сторінок анонімними користувачами в даний час недоступно. <br/> Щоб створити цю сторінку, для початку <a href="https://terraria-uk.gamepedia.com/Спеціальна:Створити_обліковий_запис">зареєструйтеся</a>.';
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
		if (needLink) headerLinks.html('[<a href="javascript:;" class="ajax-load-link">показати дані</a>]');
		table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text('Будь ласка, зачекайте вміст завантажиться…');
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
					headerLinks.append($('<a>редагувати</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
					headerLinks.append(document.createTextNode(']\u00A0['));
					var shown = true;
					$("<a href='javascript:;'>згорнути</a>").click(function() {
						shown = !shown;
						shown ? cell.show() : cell.hide();
						$(this).text(shown ? "згорнути" : "розгорнути");
					}).appendTo(headerLinks);
					headerLinks.append(document.createTextNode(']'));
				}
			}).error(function() {
				cell.text('Неможливо завантажити вміст; можливо, цільова сторінка не існує.');
			});
		});
	});
}

$(addAjaxDisplayLink);
$.when( $.ready ).then(function() {
	// Document is ready.
	// desktop view for mobile screen.
	$('#mw-panel').append('<div id="menu-toggle-button"></div>');
	var $btn = $('#menu-toggle-button');
	var $menu = $('#mw-panel .portal');
	$btn.on('click', function(){
		$('#mw-panel').toggleClass('on');
	});
});

$(window).on('load', function(){
	//main page header.
	var $btn = $('#box-wikiheader #box-wikiheader-toggle-link');
	if($btn.length){
		var $box = $('#box-wikiheader');
		$btn.css('display', 'inline-block');
		if($box.innerHeight() > 180){
			$box.addClass('collapsed');
		}
		$btn.on('click', function(){
			$box.toggleClass('collapsed');
		});
	}

    //sidebar height fix.
    //override left-sidebar resize handle.
	var $sidebar = $('#mw-panel');
	var $wrapper = $('#global-wrapper');
	var $footer = $('#curse-footer');
	$footer.css('margin-top', '0');
	var $top = 0;
	window.handleResizeEvents = function() {
		var $sidebar_bottom = $sidebar.offset().top + $sidebar.outerHeight(true);
		var $footer_top = $footer.offset().top;
		if ($sidebar_bottom > $footer_top - $top){
			$top = $sidebar_bottom - $wrapper.offset().top;
			$wrapper.css('min-height', $top+'px');
		}
	};
	window.handleResizeEvents();
});

// Hyperlink required modules in Module namespace
// Author: RheingoldRiver
$(function() {
	if (mw.config.get('wgCanonicalNamespace') != 'Module') return;
	$('.s1, .s2').each(function() {
		var html = $(this).html();
		var quote = html[0];
		var quoteRE = new RegExp('^' + quote + '|' + quote + '$', 'g');
		var name = html.replace(quoteRE,"");
		if (name.startsWith("Module:")) {
			var target = name.replace(/ /g,'%20');
			var url = mw.config.get('wgServer') + '/' + target;
			var str = quote + '<a href="' + url + '">' + name + '</a>' + quote;
			$(this).html(str);
		}
	});
});

//npcinfobox
$(document).ready(function (){
	$('.infobox.npc .modetabs .tab, .infotable.npc .modetabs .tab').on('click', function(){
    	var $this = $(this);
    	if($this.hasClass('current')){
    		return;
    	}
    	$this.parent().children().removeClass('current');
    	$this.addClass('current');
    	$this.closest('.infobox, .infotable').removeClass('c-expert c-master c-normal').addClass($this.hasClass('normal')?'c-normal':($this.hasClass('expert')?'c-expert':'c-master'));
    });
});


// Добавляет Викификатор
if ( mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit' ) {
	mw.loader.load('/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
}