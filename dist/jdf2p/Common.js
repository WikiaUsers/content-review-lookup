/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * performs initialization functions
 */
function loadFunc() {
    addHideButtons();
}
addOnloadHook(loadFunc);

/* From http://runescape.wikia.com/wiki/MediaWiki:Common.js */
/**
 * Show/Hide
 * Add show/hide buttons to page
 *
 * example code usage: 
 * <div class="hidable">                            <!-- main container (optional class of start-hidden will hide content on load)-->
 * <span class="hidable-button"></span>             <!-- holds show/hide text -->
 * <div class="hidable-content>blah blah blah</div> <!-- stuff to hide goes here -->
 * </div>
 */
function addHideButtons() {
    var $hidables = $('.hidable').each(function() {
        var $box = $(this);
        $('span.hidable-button:eq(0)', this).each(function() {
            var $button= $(this);
            $button.click(toggleHidable);
            $button.append(document.createTextNode('[hide]'));

            if ($box.hasClass('start-hidden')) {
                $button.click();
            }
        });
    });
}

/**
 * performs show/hide functionality
 */
function toggleHidable(e) {
    var t = this;
    $(e.target).closest('.hidable').find('.hidable-content:eq(0)').each(function() {
        if (this.style.display == 'none') {
            this.style.display = this.oldDisplayStyle;
            t.firstChild.nodeValue = '[hide]';
        } else {
            this.oldDisplayStyle = this.style.display;
            this.style.display = 'none';
            t.firstChild.nodeValue = '[show]';
        }
    });
}

importScript('MediaWiki:Functions.js');