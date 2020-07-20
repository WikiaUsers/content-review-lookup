/**
* __NOWYSIWYG__
* [[Category:Script|{{SUBPAGENAME}}]]
* [[Category:Hack|{{SUBPAGENAME}}]]
* [[Category:Wikia|{{SUBPAGENAME}}]]
**/

(function (_fn){
	
	$(window)
		.on('load', function(){
			_fn();
		})
	;
	
	_fn();
	
})(function(){
	
	$('#WikiaBar')
		.each(function(){
			var _WikiaBar = $(this);
			
			$('.toolbar .tools li a:not([data-done])', _WikiaBar)
				.each(function(){
					var _a = $(this);
					
					var _is_done = true;
					
					var _href = _a.attr('href');
					
					switch (_a.data('name') || _a.attr('data-name'))
					{
						case 'createpage':
							_a.attr('href', _url_add_query(_href, 'preload=Template:PreloadManager2/Main/Default'));
							break;
						case 'export':
//							_a.attr('href', _href + '/' + wgPageName);
							_a.attr('href', _url_add_query(_href, 'templates=' + wgPageName));
							
//							_a.attr('target', '_blank');
							break;
						default:
							_is_done = false;
						
							break;
					};
					
					if (_is_done)
					{
						_a.attr('data-done', true);
					}
				})
			;
		})
	;
	
	function _url_add_query (url, query)
	{
		if (!url.match(/\?/))
		{
			url = url + '?';
		}
		
		var query_text = query;
		
		return url + '&' + query_text;
	}
	
});