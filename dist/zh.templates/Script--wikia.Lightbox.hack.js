/**
* __NOWYSIWYG__
* [[Category:Script|{{SUBPAGENAME}}]]
* [[Category:Hack|{{SUBPAGENAME}}]]
* [[Category:Lightbox|{{SUBPAGENAME}}]]
* [[Category:Media|{{SUBPAGENAME}}]]
* [[Category:Wikia|{{SUBPAGENAME}}]]
* [[Category:Extend|{{SUBPAGENAME}}]]
* 
**/

(function (window, $) {

	$(function () {
		
		var Lightbox = window.Lightbox;
		
		var _Lightbox_hack = function () {
			
			(0 || Lightbox = window.Lightbox) && (function (_old) {
			
				Lightbox.renderHeader = function (params) {
					var _ret = _old.apply(this, arguments);
					
					setTimeout(function () {
						if ($(Lightbox.openModal.header).size())
						{
							var _file = $('h1 > a', Lightbox.openModal.header).text();
							
							$('.see-full-size-link', Lightbox.openModal.header)
								.attr('target', '_blank')
								.attr('download', _file)
								.get(0).download = _file
							;
						}
					}, 300);
					
					return _ret;
				};
				
				Lightbox.renderHeader();
				
			})(Lightbox.renderHeader);
			
		};
		
		if (window.Lightbox)
		{
			setTimeout(_Lightbox_hack, 500);
		}
		else 
		{
			$('.lightbox')
				.one('click.lightboxhack', function () {
					setTimeout(_Lightbox_hack, 1500);
				})
			;
		}
		
		$(window)
			.on('lightboxOpened', function () {
				Lightbox && Lightbox.renderHeader();
			})
		;
		
		if (wgNamespaceNumber == 6)
		{
			$('#WikiaArticle, .WikiaArticle')
				.find('.fullMedia a.internal, .mw-filepage-resolutioninfo a.mw-thumbnail-link, .fullImageLink a, #file a')
					.each(function () {
						$(this)
							.attr('download', function(){
								var _this = $(this);
								var _img = $('> img:eq(0)', _this);
								
								var _file;
								
								if (_img.size())
								{
									_file = _img.data('image-name') || _img.attr('data-image-name');
								}
								
								_file = _file || _this.attr('title') || wgPageName.replace(/^[^:]+\:/i, '').replace(/[\_]/ig, ' ') || $('.header-title h1').text();
								
								_img.size() && _img.attr('download', _file);
		
								return this.download = _file;
							})
						;
					})
			;
		}
	});

})(window, jQuery);