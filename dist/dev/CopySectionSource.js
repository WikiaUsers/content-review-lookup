/**
 * CopySectionSource
 * Adds a "copy source" link besides the "edit source" link
 *
 * @author HumansCanWinElves
 * @version 2.1
 * @status beta
**/

$(function copySectionSource() {
    "use strict";
    if (window.copySectionSourceLoaded) return;
    window.copySectionSourceLoaded = true;

    var $sectionLinks = $(
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

            document.execCommand("copy");

            $ghost.remove();
        });

    }

    $sectionLinks.each(function() {
        var source = this.href.replace(/(ve)?action=edit(source)?/, 'action=raw');
    
        $(this).after(' ',
            $('<a>')
	            .attr({
					href: source,
	                target: '_BLANK',
	                title: 'Copy section source'
	            })
	            .text('copy source')
	            .click(copy)
        );
    });
});