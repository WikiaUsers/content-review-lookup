/*
*****
********** DO NOT SUBMIT THIS FOR REVIEW. NOT READY FR SITEWIDE USE. **********
*****
*/

(function() {
    'use strict';

    $(document).ready(function() {
        var $body = $('body');
        var $mwBodyContent = $('.mw-body-content');
        var $mwParserOutput = $mwBodyContent.children('.mw-parser-output');
        var $pageHeader = $('.page-header').detach();
        var $toc = $mwParserOutput.find('.toc').find('input.toctogglecheckbox').prop('checked', true).end();
        var $infobox = $mwParserOutput.find('.portable-infobox');
        var $tocPrev = $toc.prev();
        var $infoboxPrev = $infobox.prev();
        var $section;

        if (!$mwParserOutput.length) {
            $mwParserOutput = $('<div class="mw-parser-output"></div>').appendTo($mwBodyContent);
            $mwBodyContent.contents().appendTo($mwParserOutput);
        }
        if ($body.hasClass('mainpage')) {
            $mwParserOutput.wrapInner('<section class="article-section"></section>').find('.article-section').prepend($pageHeader);
        } else {
            $section = $('<section class="preamble-section"></section>').prepend($pageHeader).prependTo($mwParserOutput);
            $mwParserOutput.contents().each(function() {
                var $this = $(this);
                if (this.nodeType === 3 && $.trim(this.nodeValue)) {
                    $section.append(this);
                } else if (this.nodeType === 1 && this.tagName === 'H2') {
                    $section = $('<section class="article-section"></section>').insertAfter($section).append(this);
                } else {
                    $section.append(this);
                }
            });
        }

        function updateLayout() {
            var $rightRail = $('.page__right-rail');
            var $rightRailWrapper = $('.right-rail-wrapper');
            if ($rightRail.hasClass('is-rail-hidden')) {
                $toc.insertAfter($tocPrev).removeClass('rail-module');
                $infobox.insertAfter($infoboxPrev).removeClass('rail-module');
                $body.removeClass('right-rail-visible');
            } else {
                $toc.detach().addClass('rail-module').prependTo($rightRailWrapper);
                $infobox.detach().addClass('rail-module').prependTo($rightRailWrapper);
                $body.addClass('right-rail-visible');
            }

            initializeCollapsibleElements();
            wrapOverflowingElements();

        }

        function initializeCollapsibleElements() {
            $('.mw-collapsible').each(function() {
                var $this = $(this);

                if (!$this.hasClass('mw-made-collapsible')) {
                    var expandText = $this.data('expandtext') || 'Expand';
                    var collapseText = $this.data('collapsetext') || 'Collapse';

                    // Create the toggle if it doesn't exist
                    if (!$this.find('.mw-collapsible-toggle').length) {
                        var $toggle = $('<span class="mw-collapsible-toggle mw-collapsible-toggle-default mw-collapsible-toggle-collapsed" role="button" tabindex="0" aria-expanded="false"><a class="mw-collapsible-text">' + expandText + '</a></span>');
                        $toggle.on('click', function() {
                            var $content = $this.find('.mw-collapsible-content');
                            if ($this.hasClass('mw-collapsed')) {
                                $this.removeClass('mw-collapsed').addClass('mw-expanded');
                                $content.slideDown();
                                $toggle.attr('aria-expanded', 'true').removeClass('mw-collapsible-toggle-collapsed').addClass('mw-collapsible-toggle-expanded').find('.mw-collapsible-text').text(collapseText);
                            } else {
                                $this.removeClass('mw-expanded').addClass('mw-collapsed');
                                $content.slideUp();
                                $toggle.attr('aria-expanded', 'false').removeClass('mw-collapsible-toggle-expanded').addClass('mw-collapsible-toggle-collapsed').find('.mw-collapsible-text').text(expandText);
                            }
                        });
                        $this.prepend($toggle);
                    }

                    // Wrap the content if it doesn't exist
                    if (!$this.find('.mw-collapsible-content').length) {
                        var $content = $this.children().not('.mw-collapsible-toggle').wrapAll('<div class="mw-collapsible-content" style="display: none;"></div>').parent();
                    }

                    $this.addClass('mw-made-collapsible');
                }
            });
        }
        function wrapOverflowingElements() {
            $mwParserOutput.children().each(function() {
                var $this = $(this);
                if ($this.width() > $mwParserOutput.width()) {
                    $this.wrap('<div class="scrollable"></div>');
                }
            });
        }

        updateLayout();
        $('.right-rail-toggle').click(function() {
            setTimeout(updateLayout, 0);
        });

        // Create a dummy element to detect when .toc is at the top
        var $tocSentinel = $('<div></div>').insertBefore($toc);

        // Create IntersectionObserver to observe the sentinel element
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.intersectionRatio === 0) {
                    $toc.addClass('scrolled');
                } else {
                    $toc.removeClass('scrolled');
                }
            });
        }, { threshold: [0, 1] });

        // Observe the sentinel element
        observer.observe($tocSentinel[0]);

        // Wrap the hidden categories and initially hide them
        var $hiddenCategoriesLabel = $('.page-footer__categories .hidden-categories-label');
        var $hiddenCategoriesList = $hiddenCategoriesLabel.next('ul.categories');
        var $hiddenCategoriesContainer = $('<div class="hidden-categories-container" style="display: none;"></div>');
        if ($hiddenCategoriesLabel.length && $hiddenCategoriesList.length) {
            $hiddenCategoriesLabel.add($hiddenCategoriesList).wrapAll($hiddenCategoriesContainer);

            // Add a button to toggle hidden categories visibility
            var $toggleButton = $('<button class="toggle-hidden-categories">Show Hidden Categories</button>');
            $toggleButton.insertAfter('.page-footer__categories .special-categories-label');

            $toggleButton.click(function() {
                var $hiddenContainer = $('.hidden-categories-container');
                if ($hiddenContainer.is(':visible')) {
                    $hiddenContainer.hide();
                    $(this).text('Show Hidden Categories');
                } else {
                    $hiddenContainer.show();
                    $(this).text('Hide Hidden Categories');
                }
            });
        }

        mw.loader.load('https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:NoGlobalNav.js');
        mw.loader.load('https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:NoGlobalNav.css&only=styles', "text/css");
    });
})();
//Import the CSS styles
importArticle({
	type: 'style',
	article: 'MediaWiki:TocRailInfobox Reorgonize.css'
});