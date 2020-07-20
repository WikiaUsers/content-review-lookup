/* <pre> */
/**
 * Credit goes to English RuneScape Wiki 
 * gemhpop.js
 *
 * Creates mouseovers for GEMH images in the main namespace containing
 * an expanded graph and GEMW details.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
$(document).ready(function() {
	function parseTemplate(text, tpl) {
		tpl = tpl.replace(/[_ ]/g, '[_ ]');
		var re = new RegExp('{{\\s*(template:)?' + tpl + '\\s*\\|([\\w\\W]+?)}}', 'gi');
 
		var data = [];
		var match;
 
		while (match = re.exec(text)) {
			var params = match[2].split('|');
			var j = 1;
			var tplData = new Array();
			for (var k in params) {
				var t = params[k].split('=');
				var name = null;
				var value = null;
				if (t.length == 1) {
					name = (j++) + '';
					value = t[0];
				} else {
					name = t[0];
					value = t[1];
				}
 
				tplData[$.trim(name)] = $.trim(value);
			}
			data.push(tplData);
		}
 
		return data;
	}
 
	function fillData(data) {
		if (typeof(data) == 'object') {
			var diff = data['Price'] - data['Last'];
			$div.children('p').empty().append(
				$('<span />').css({'font-weight': 'bold', 'font-size': '140%', 'margin-right': '10px'}).text(data['Item'])).append(
				$('<span />').css({'font-weight': 'bold', 'margin-right': '5px'}).text('Price: ' + data['Price'])).append(
				$('<span />').css({'color': (diff < 0) ? 'red' : 'green'}).text(((diff > 0) ? '(+' : '(') + diff + ')')); 
		}
	}
 
	if (wgCanonicalNamespace != '') {
		return;
	}
 
	var $div = $('<div />').append($('<p />')).append($('<img />')).attr('id', 'gemhPopup').css({
		'z-index': '1010',
		'position': 'absolute',
		'top': '0',
		'left': '0',
		'padding': '0.75em'
	}).hide().addClass('color1');
	$('body').append($div);
 
	var gemwCache = [];
 
	$('img').each(function() {
		var matches = /\/([0-9a-f])\/([0-9a-f]{2})\/GEMH_([^\/]+)\.png/.exec($(this).attr('src'));
		if (matches != null) {
			$(this).mouseenter(function() {
				$div.show().children('img').attr('src', 'https://images.wikia.nocookie.net/runescape/images/' + matches[1] + '/' + matches[2] + '/GEMH_' + matches[3] + '.png');
 
				if (gemwCache[matches[3]] == null) {
					gemwCache[matches[3]] = true;
 
					$.ajax({
						data: {
							'action': 'query',
							'prop': 'revisions',
							'titles': 'Exchange:' + decodeURIComponent(matches[3]),
							'rvprop': 'content',
							'redirects': '',
							'format': 'json'
						},
						dataType: 'json',
						success: function(response) {
							var pages = response.query.pages;
							var pageId = null;
 
							for (var i in pages) {
								pageId = i;
							}
 
							if (pages[pageId].missing == null) {
								gemwCache[matches[3]] = parseTemplate(pages[pageId].revisions[0]['*'].replace('{{{View}}}', ''), 'exchangeitem')[0];
								fillData(gemwCache[matches[3]]);
							}
						},
						url: wgScriptPath + '/api.php',
						timeout: 10000
					});
				} else {
					fillData(gemwCache[matches[3]]);
				}
			}).mouseleave(function() {
				$div.hide();
			}).mousemove(function(e) {
				var x = ($(window).width() - 483 < e.clientX) ? e.pageX - 513 : e.pageX + 20;
				var y = ($(window).height() - 387 < e.clientY) ? e.pageY - 417 : e.pageY + 20;
				$div.css({'top': y, 'left': x});
			});
		}
	});
});
/* </pre> */