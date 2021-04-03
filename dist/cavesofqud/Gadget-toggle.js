//<nowiki>
/**
 * This script is loaded on both desktop and mobile views.
 * 
 * Desktop-only scripts should go in [[MediaWiki:Common.js]]
 * Mobile-only scripts should go in [[MediaWiki:Mobile.js]].
 *
 * adapted from https://minecraft.gamepedia.com/MediaWiki:Gadget-site.js
 */

(function() {
    'use strict';

    /* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
    mw.hook('wikipage.content').add(function($wikipageContent) {


        /**
         * Collapsible elements
         *
         * Add the "collapsible" class to an element and the child element with class "collapsible-content"
         * (or everything but the header row if a table) will be hidden when the element is collapsed.
         *
         * * Add the class "collapsed" to the element to make it start out collapsed.
         * * Add either "collapsetoggle-left" or "collapsetoggle-inline" to the element to choose the collapse
         *   toggle alignment (defaults to right).
         * * Add an ID in the format of "collapsible-<x>" to the element to make any element with the class
         *  "collapsetoggle-custom" and a matching class in the format of "collapsible-<x>-toggle" control
         *   the collapsing instead of the standard button.
         *   If the custom toggle contains an element with the "jslink" class, only that will be clickable.
         */
        (function() {
            var $collapsibles = $wikipageContent.find('.collapsible');
            if (!$collapsibles.length) {
                return;
            }

            var $toggleTemplate = $('<span>').addClass('collapsetoggle').append(
                '[', $('<span>').addClass('jslink'), ']'
            );
            $collapsibles.each(function() {
                var $collapsible = $(this);
                if ($collapsible.data('made-collapsible')) {
                    return true;
                }

                var $children = $collapsible.children();
                var showText = $collapsible.data('expandtext') || "show";
                var hideText = $collapsible.data('collapsetext') || "hide";

                // If there is no content area, add it
                if (!$collapsible.is('table') && !$children.filter('.collapsible-content').length) {
                    if ($collapsible.is('tr')) {
                        $children.addClass('collapsible-content');
                    } else {
                        $collapsible.wrapInner('<div class="collapsible-content">');
                        $children = $collapsible.children();
                    }
                }

                var $toggle;
                var id = $collapsible.attr('id');
                if (id && id.match(/^collapsible-./)) {
                    $toggle = $($wikipageContent[0].getElementsByClassName(id + '-toggle'))
                        .filter('.collapsetoggle-custom').css('visibility', 'visible');
                }

                // Create and insert the toggle button if there is no custom one
                if (!$toggle || !$toggle.length) {
                    var $toggleContainer;
                    if ($collapsible.is('table')) {
                        var $rows = $children.filter('thead').children();
                        if (!$rows.length) {
                            $rows = $children.filter('tbody').first().children();
                            if (!$rows.length) {
                                $rows = $children.filter('tr');
                            }
                        }
                        $toggleContainer = $rows.first().children().last();
                    } else {
                        $toggleContainer = $children.first();
                        if ($toggleContainer.hasClass('collapsible-content')) {
                            $toggleContainer = $collapsible;
                        }
                    }

                    $toggle = $toggleTemplate.clone();
                    if (
                        $toggleContainer !== $collapsible && (
                            $collapsible.hasClass('collapsetoggle-inline') ||
                            $collapsible.hasClass('collapse-button-none')
                        )) {
                        $toggleContainer.append($toggle);
                    } else {
                        $toggleContainer.prepend($toggle);
                    }
                }

                var $toggleLink = $toggle.find('.jslink');
                if (!$toggleLink.length) {
                    $toggleLink = $toggle;
                }
                $toggleLink.attr('tabindex', 0).text(hideText);

                // Find max toggle size, and set its min-width to it
                var hideWidth = $toggle.width();
                $toggleLink.text(showText);
                var showWidth = $toggle.width();
                if (hideWidth !== showWidth) {
                    $toggle.css('min-width', hideWidth > showWidth ? hideWidth : showWidth);
                }

                // Set the text back to hide if it's not collapsed to begin with
                if (!$collapsible.hasClass('collapsed')) {
                    $toggleLink.text(hideText);
                }

                $toggleLink.on('click keydown', function(e) {
                    // Only trigger on enter press
                    if (e.keyCode && e.keyCode !== 13) {
                        return;
                    }

                    // Don't toggle when clicking buttons or links inside the toggle
                    var $target = $(e.target);
                    if ($target.is('button') || $target.is('a')) {
                        return;
                    }

                    $collapsible.toggleClass('collapsed');
                    if ($collapsible.hasClass('collapsed')) {
                        $toggleLink.text(showText);
                    } else {
                        $toggleLink.text(hideText);
                    }

                    // Stop table sorting activating when clicking the link
                    e.stopPropagation();
                });

                $collapsible.data('made-collapsible', true);
            });
        }());

    });
    /* End wiki content hook */

}());
//</nowiki>