(function($, mw, window){
	function WikiTooltip(){
		var title, content, id, $elem, position, theme, isInline, fade,
			args = [].slice.call(arguments);
		if ($.type(args[0]) === 'object'){
			title = args[0].title || '';
			content = args[0].content || args[0].title || '';
			id = args[0].id || '';
			$elem = args[0].$selector || args[0].$elem || null;
			position = args[0].position || 'top';
			theme = args[0].theme || '';
			isInline = args[0].isInline || true;
			fade = args[0].fade || 500;
		} else {
			title = args[0] || '';
			content = (($.type(args[1]) === 'object' && !(args[1] instanceof jQuery)) ? args[1].content : args[1]) || '';
			id = (($.type(args[1]) === 'object') ? args[1].id : args[2]) || '';
			$elem = (($.type(args[1]) === 'object') ? (args[1].$elem || args[1].$selector) : args[3]) || null;
			position = (($.type(args[1]) === 'object') ? args[1].position : args[4]) || 'top';
			theme = (($.type(args[1]) === 'object') ? args[1].theme : args[5]) || '';
			isInline = (($.type(args[1]) === 'object') ? args[1].isInline : args[6]) || true;
			fade = (($.type(args[1]) === 'object') ? args[1].fade : args[7]) || 500;
		}
		
		this.title = title;
		this.content = content;
		this.id = id;
		this.position = position;
		this.theme = theme;
		this.isInline = isInline;
		this.$elem = $elem;
		
		this.show = false;
		this.fade = fade;
		this.load = $.Deferred();
		this.loaded = false;
	}
}(jQuery, mediaWiki, window));