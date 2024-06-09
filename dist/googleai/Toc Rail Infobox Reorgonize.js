// @name         Fandom Article Formatter
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Put the ToC and Infobox into the right rail, paired with MediaWiki:Toc-Rail-Infobox Reorgonize.css
// @author       copilot and gpt4o
// @match        *://*.fandom.com/*
// @require      https://code.jquery.com/jquery-3.6.1.min.js
// @grant        none

(function() {
    'use strict';

    // Wait until the DOM is fully loaded
    $(document).ready(function() {
        // Cache the body element
        var $body = $('body');
        // Cache the main content area of the page
        var $mwOutput = $('.mw-body-content > .mw-parser-output');
        // Detach the page header for manipulation
        var $pageHeader = $('.page-header').detach();
        // Find the Table of Contents (TOC) and ensure it is checked
        var $toc = $mwOutput.find('.toc').find('input.toctogglecheckbox').prop('checked', true).end();
        // Find the infobox element
        var $infobox = $mwOutput.find('.portable-infobox');
        // Store the previous siblings of TOC and infobox for later use
        var $tocPrev = $toc.prev();
        var $infoboxPrev = $infobox.prev();
        var $section;

        // Check if the page has a class of 'mainpage'
        if ($body.hasClass('mainpage')) {
            // Wrap the content inside a section and prepend the page header
            $mwOutput.wrapInner('<section class="preamble-section"></section>').find('.preamble-section').prepend($pageHeader);
        } else {
            // Create a new section, prepend the page header, and insert it at the start of the main content
            $section = $('<section class="preamble-section"></section>').prepend($pageHeader).prependTo($mwOutput);
            // Loop through each child of the main content
            $mwOutput.contents().each(function() {
                var $this = $(this);
                // Check if the node is a text node and contains non-whitespace characters
                if (this.nodeType === 3 && $.trim(this.nodeValue)) {
                    $section.append(this);
                // Check if the node is an element node and is a second-level heading (H2)
                } else if (this.nodeType === 1 && this.tagName === 'H2') {
                    // Create a new section for the article and insert it after the previous section
                    $section = $('<section class="article-section"></section>').insertAfter($section).append(this);
                } else {
                    // Append other nodes to the current section
                    $section.append(this);
                }
            });
        }

        // Add a scroll event listener to the window
        $(window).scroll(function() {
            // Toggle a class on the TOC based on the scroll position
            $toc.toggleClass('scrolled', $(this).scrollTop() > 0);
        });

        // Function to update the page layout based on the right rail visibility
        function updateLayout() {
            var $rightRail = $('.page__right-rail');
            var $rightRailWrapper = $('.right-rail-wrapper');
            // Check if the right rail is hidden
            if ($rightRail.hasClass('is-rail-hidden')) {
                // Reinsert TOC and infobox to their original positions and remove the 'rail-module' class
                $toc.insertAfter($tocPrev).removeClass('rail-module');
                $infobox.insertAfter($infoboxPrev).removeClass('rail-module');
                $body.removeClass('right-rail-visible');
            } else {
                // Move TOC and infobox to the right rail and add the 'rail-module' class
                $toc.detach().addClass('rail-module').prependTo($rightRailWrapper);
                $infobox.detach().addClass('rail-module').prependTo($rightRailWrapper);
                $body.addClass('right-rail-visible');
            }
        }

        // Initial layout update
        updateLayout();
        // Add a click event listener to the right rail toggle button
        $('.right-rail-toggle').click(function() {
            // Update layout with a slight delay to ensure proper re-rendering
            setTimeout(updateLayout, 0);
        });
    });
})();

//Import the CSS styles
importArticle({
	type: 'style',
	article: 'MediaWiki:TocRailInfobox Reorgoniz.css'
});