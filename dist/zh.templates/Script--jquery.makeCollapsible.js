/**
* __NOWYSIWYG__
* [[Category:Script|{{SUBPAGENAME}}]]
**/


(function($){
	
	var makeCollapsible_hack = function ()
	{
		$(this)
			.each(function(){
				var $that = $(this);
				
				if (($that.attr('id') || '').indexOf('mw-customcollapsible-') === 0)
				{
					var collapsetext = $that.attr('data-collapsetext'),
						expandtext = $that.attr('data-expandtext');
					
					var thatId = $that.attr('id'),
						$customTogglers = $('.' + thatId.replace('mw-customcollapsible', 'mw-customtoggle'))
					;
					
					if ($customTogglers.size() && (collapsetext && expandtext)) 
					{
						$customTogglers
							.off('click.mw-collapse-hack')
							.on('click.mw-collapse-hack', function (e) {
								var action = $that.hasClass('mw-collapsed') ? 'collapse' : 'expand';
								
								if (action == 'collapse') 
								{
									$(this).text(expandtext);
								}
								else 
								{
									$(this).text(collapsetext);
								}
							})
							.triggerHandler('click.mw-collapse-hack')
						;
					}
				}
			})
		;
	};
	
	if ($.fn.makeCollapsible)
	{
		(function(_old){
			$.fn.makeCollapsible = function()
			{
				var _ret = _old.apply(this, arguments);
				makeCollapsible_hack.apply(this, arguments);
				
				return _ret;
			};
		})($.fn.makeCollapsible);
	}
	
	makeCollapsible_hack.apply($('.mw-collapsible'));

})(jQuery);