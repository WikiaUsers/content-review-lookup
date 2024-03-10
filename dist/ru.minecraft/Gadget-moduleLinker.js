/* Генератор ссылок на модули, запрашиваемые в других модулях.
 * Код взят с Leaguepedia (https://lol.gamepedia.com/MediaWiki:Common.js) и
 * изменён для работы с русским языком. Исходный автор — RheingoldRiver.
 */
$(function() {
	if (mw.config.get('wgCanonicalNamespace') != 'Module') return;
	$('.s1, .s2').each(function() {
		var html = $(this).html();
		var quote = html[0];
		var quoteRE = new RegExp('^' + quote + '|' + quote + '$', 'g');
		var name = html.replace(quoteRE,"");
		if (name.startsWith("Модуль:")) {
			var target = name.replace(/ /g,'%20');
			var url = mw.config.get('wgServer') + '/ru/' + target;
			var str = quote + '<a href="' + url + '">' + name + '</a>' + quote;
			$(this).html(str);
		}
	});
	// Hack: Add support for `[[]]` module strings MCW likes so much
	$('.s').each(function() {
		var html = $(this).html();
		
		if (html[0] !== '[') {
			// Unexpected condition. This should not happen. Code below relies
			// on it never happening and may fail otherwise. Exit early to avoid
			// unpredicted failures.
			console.log("Module linker: warning: `.s` first character is not `[`");
			return;
		}
		
		var quoteRE = new RegExp('^\\[\\[|\\]\\]$', 'g');
		var name = html.replace(quoteRE, "");
		
		if (name.startsWith("Модуль:")) {
			var target = name.replace(/ /g, '%20');
			var url = mw.config.get('wgServer') + '/ru/' + target;
			var str = '[[<a href="' + url + '">' + name + '</a>]]';
			$(this).html(str);
		}
	});
});