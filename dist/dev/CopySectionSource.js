/**
 * CopySectionSource
 * Adds a "copy source" link besides the "edit source" link
 *
 * @author HumansCanWinElves
 * 
 * @version 2.0
 * 
 * @status beta
**/

$(function copySectionSource() {
    "use strict";
    if (window.copySectionSource) return;
    window.copySectionSource = true;

    var $sectionLinks = 
            $('.mw-parser-output .mw-editsection a[href*="action=edit"]:last-of-type'),
        isOasis = mw.config.get('skin') === 'oasis';

    var $divider = isOasis ?
            $('.mw-parser-output .mw-editsection .mw-editsection-divider').first() : '';
    if (isOasis && !$divider.length) $divider = $('<span> | </span>');

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
        // Order of alternatives in the regex is essential
        var href = this.href.replace(/(veaction=editsource|veaction=edit|action=edit)/, 'action=raw');
    
        $(this)[isOasis ? 'after' : 'before'](isOasis ? $divider.clone() : '',
            $('<a>').attr('href', href)
                .attr('target', '_BLANK')
                .attr('title', 'Copy section source')
                .text('copy source')
                .click(copy),
            isOasis ? '' : $('<span> </span>'));
    });
});