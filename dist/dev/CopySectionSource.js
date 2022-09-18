/**
 * CopySectionSource
 * Adds a "copy source" link besides the "edit source" link
 *
 * @author HumansCanWinElves
 * @version 2.1
 * @status beta
**/

;(function($) {
    'use strict';
    if (window.copySectionSourceLoaded) return;
    window.copySectionSourceLoaded = true;
	var msg,
    	$sectionLinks = $(
    	'.mw-parser-output .mw-editsection a[href*="action=edit"]:last-of-type'
    	);

    function copy(event) {
        if (event.ctrlKey) return;
        event.preventDefault();

        $.ajax(this.href).done(function(data) {
            var $ghost = $('<textarea>'), ghost = $ghost[0];

            $ghost.css({position: 'fixed', top: '-10000px', opacity: '0'})
                .val(data);
            $ghost.appendTo(document.body);

            ghost.select();
            ghost.setSelectionRange(0, 99999); // For mobile devices

            document.execCommand('copy');

            $ghost.remove();
        });

    }

	function init() {
	    $sectionLinks.each(function() {
	        var source = this.href.replace(/(ve)?action=edit(source)?/, 'action=raw');
	    
	        $(this).after(' ',
	            $('<a>')
		            .attr({
						href: source,
		                target: '_BLANK',
		                title: msg('copy-source-tooltip').plain()
		            })
		            .text(msg('copy-source-link').plain())
		            .click(copy)
	        );
	    });
	}
    mw.hook('dev.i18n').add(function (i18n) {
		i18n.loadMessages('CopySectionSource').done(function (i18no) {
			msg = i18no.msg;
			init();
		});
	});
	importArticles({
		type: 'script',
		articles: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.jQuery);