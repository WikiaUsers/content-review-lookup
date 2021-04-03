// <nowiki>
$(function() {
	
	function getNewContent(container, reset) {
		var template = $(container).attr('data-for-template');
		var $elem = $('#' + $(container).attr('data-target-id'));
		var args = reset ? [''] : getArgList(container);
		var defaultArgs = $(container).attr('data-default-args') ? $(container).attr('data-default-args') : '';
		var text = '{{#vardefine:isReload|yes}}{{' + template + args.join('') + defaultArgs + '}}{{#var:log}}';
		
		return new mw.Api().get({
			action : 'parse',
			text : text,
			prop : 'text',
			title : mw.config.get('wgPageName')
		}).then(function(data) {
			$elem.html(data.parse.text['*']);
			mw.hook('wikipage.content').fire($elem);
		});
	}
	
	function getArgList(container) {
		var ret = [];
		$(container).find('input, select').each(function() {
			ret.push('|' + $(this).attr('data-key') + '=' + $(this).val());
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