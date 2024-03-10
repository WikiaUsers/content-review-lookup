// <nowiki>
$(function() {
	
	function getNewContent(container, reset) {
		var template = $(container).attr('data-for-template');
		var targetId = $(container).attr('data-target-id');
		console.log(targetId);
		var $elem = $('#' + targetId);
		var args = reset ? [''] : getArgList(container);
		var defaultArgs = $(container).attr('data-default-args') ? $(container).attr('data-default-args') : '';
		var text = '{{#vardefine:isReload|yes}}{{' + template + args.join('') + defaultArgs + '}}';
		console.log(text);
		return new mw.Api().get({
			action : 'parse',
			text : text,
			prop : 'text',
			title : mw.config.get('wgPageName')
		}).then(function(data) {
			var result = data.parse.text['*'];
			console.log(result);
			$elem.html(result);
			mw.hook('wikipage.content').fire($elem);
		});
	}
	
	function getArgList(container) {
		var ret = [];
		$(container).find('input, select').each(function() {
			var key = $(this).attr('data-key');
			if (key) {
				ret.push('|' + key + '=' + $(this).val());
			}
		});
		return ret;
	}
	
	$('.template-reload-submit').click(function(e) {
		e.preventDefault();
		return getNewContent($(this).closest('.template-reload'));
	});
	
	$('.template-reload-reset').click(function(e) {
		e.preventDefault();
		return getNewContent($(this).closest('.template-reload'), true);
	});
});
// </nowiki>