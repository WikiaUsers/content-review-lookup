/* =====================================================================
   MediaWiki:Common.js for Seaopolis / Submerged 2 Wiki
   =====================================================================
   
   This file adds:
   - Custom hover tooltips (Minecraft-style item info with colors)
   - Pauses animations/GIFs on mouse hover for easier reading
   
   You can safely edit or remove sections if not needed.
   ===================================================================== */


/* PART 1: Custom Hover Tooltips
   ---------------------------------------------------------------------
   Creates pop-up tooltips for items/blocks when hovering.
   - Supports color codes like &0–&f, &l bold, etc.
   - Can have main title + extra description lines (use / for <br>)
   - Works on elements with class="minetip" or class="invslot-item"
   - Often added automatically by item templates
*/

(function() {
    'use strict';

    // Characters to escape for safe HTML display
    var escapeChars = {
        '\\&': '&#38;',
        '<':   '&#60;',
        '>':   '&#62;'
    };

    // Escape function to prevent HTML issues
    var escape = function(text) {
        return text
            .replace(/\\\\/g, '&#92;')
            .replace(/\\&|[<>]/g, function(char) {
                return escapeChars[char];
            });
    };

    var $tooltip = $();           // Current tooltip element
    var $win = $(window);
    var winWidth, winHeight, width, height;

    // Events on content area for tooltip elements
    $('#mw-content-text').on({
        'mouseenter.minetip': function(e) {
            $tooltip.remove();

            var $elem = $(this);
            var title = $elem.attr('data-minetip-title');

            // Fallback to native title if no data attribute
            if (title === undefined) {
                title = $elem.attr('title');
                if (title !== undefined) {
                    title = $.trim(title.replace(/&/g, '\\&'));
                    $elem.attr('data-minetip-title', title);
                }
            }

            // Check child elements if needed (for nested titles)
            if (title === undefined || 
                (title !== '' && title.replace(/&([0-9a-jl-qs-vyz]|#[0-9a-fA-F]{6}|\$[0-9a-fA-F]{3})/g, '') === '')) {
                
                var childElem = $elem[0];
                var childTitle;
                do {
                    if (childElem.hasAttribute && childElem.hasAttribute('title')) {
                        childTitle = childElem.title;
                    }
                    childElem = childElem.firstChild;
                } while (childElem && childElem.nodeType === 1);

                if (childTitle !== undefined) {
                    if (!title) title = '';
                    title += $.trim(childTitle.replace(/&/g, '\\&'));
                    $elem.attr('data-minetip-title', title);
                }
            }

            // Remove native titles once processed (prevents double tooltips)
            if (!$elem.data('minetip-ready')) {
                $elem.find('[title]').addBack().removeAttr('title');
                $elem.data('minetip-ready', true);
            }

            if (title === '' || title === undefined) {
                return;
            }

            // Build tooltip content
            var content = '<span class="minetip-title">' + escape(title) + '&r</span>';

            var description = $.trim($elem.attr('data-minetip-text'));
            if (description) {
                description = escape(description).replace(/\\\//g, '&#47;');
                content += '<span class="description">' + 
                           description.replace(/\//g, '<br>') + 
                           '&r</span>';
            }

            // Apply formatting spans for color/bold/etc.
            content = content.replace(/&([0-9a-fk-or])/g, '<span class="format-$1">$1</span>');
            content = content.replace(/&r/g, '');

            $tooltip = $('<div id="minetip-tooltip">')
                .html(content)
                .appendTo('body');

            winWidth  = $win.width();
            winHeight = $win.height();
            width     = $tooltip.outerWidth(true);
            height    = $tooltip.outerHeight(true);

            $elem.trigger('mousemove', e);
        },

        'mousemove.minetip': function(e, triggerEvent) {
            if (!$tooltip.length) {
                $(this).trigger('mouseenter');
                return;
            }

            e = triggerEvent || e;

            var top  = e.clientY - 34;
            var left = e.clientX + 14;

            if (left + width > winWidth) {
                left -= width + 36;
            }

            if (left < 0) {
                left = 0;
                top -= height - 22;
                if (top < 0) top += height + 47;
            } else if (top < 0) {
                top = 0;
            } else if (top + height > winHeight) {
                top = winHeight - height;
            }

            $tooltip.css({ top: top, left: left });
        },

        'mouseleave.minetip': function() {
            if ($tooltip.length) {
                $tooltip.remove();
                $tooltip = $();
            }
        }
    }, '.minetip, .invslot-item');
})();


/* PART 2: Pause Animations on Hover
   ---------------------------------------------------------------------
   Pauses GIFs or CSS animations when hovering (resumes when mouse leaves).
   Targets: .animated-container, .mcui, .mcui-Crafting_Table
   Requires .animated-paused { animation-play-state: paused; } in Common.css
*/

$(function() {
    $('#mw-content-text').on('mouseenter mouseleave', 
        '.animated-container, .mcui, .mcui-Crafting_Table', 
        function(e) {
            $(this).find('.animated').toggleClass('animated-paused', e.type === 'mouseenter');
        }
    );
});