// [[Template:Игры]]
(function($, document, mw) {
    'use strict';

    function TitleIcons() {
        if (window.titleiconLoaded) return;
        window.titleiconLoaded = true;
	   
		if ( $('.va-titleicons').length ) {
			var previewCount = $('.va-titleicons-preview > a').length;
			var fullsizeCount = $('.va-titleicons-fullsize-content > a').length;
			
			if (previewCount < fullsizeCount) {
				$('.va-titleicons-preview').addClass('va-titleicons-showmore');
			}
		
		    var titleiconsSection = '<section id="title-icons-section" class="rail-module">' +  $('#va-titleicons-section').html() + '</section>';
		
		    $('#WikiaRail').prepend(titleiconsSection);
		    $('.va-titleicons-section').remove();
		}
	 
    }

    mw.hook('wikipage.content').add(TitleIcons);
 
})(window.jQuery, document, window.mediaWiki);