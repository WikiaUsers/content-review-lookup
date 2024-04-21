// *This was written by Copilot. I have minimal programming knowledge.
mw.loader.using(['jquery'], function() {
    // Extracted constants
    var SCROLL_AMOUNT = 250;

    // Extracted selectors
    var PARSER_OUTPUT_SELECTOR = '.mw-parser-output';
    var TOC_SELECTOR = '.toc';
    var HEADLINE_SELECTOR = 'h2 span.mw-headline';
    var STICKY_HEADER_SELECTOR = '.fandom-sticky-header';

    var parserOutput = $(PARSER_OUTPUT_SELECTOR);
    var toc = parserOutput.find(TOC_SELECTOR).clone();
    var newListItem = $('<li class="toclevel-1 tocsection-0"><a href="#" class="active"><span class="toctext">Статья</span></a></li>');

    if(toc.length && parserOutput.length) {
        setupToc();
        setupScrollArrows();
        filterTocLevels();
        setupHideLink();
        setupScrollHandlers();
        setupClickHandler();
    }

    function setupToc() {
        parserOutput.prepend(toc);
        toc.addClass('navbar');
        toc.find('.tocnumber').remove();
        toc.children('ul').prepend(newListItem);
        toc.wrap($('<div class="toc-container"></div>'));
    }

    function setupScrollArrows() {
        var leftArrow = $('<div class="scroll-arrow left-arrow"><i class="fas fa-chevron-left"></i></div>');
        var rightArrow = $('<div class="scroll-arrow right-arrow"><i class="fas fa-chevron-right"></i></div>');

        // Check if the toc is scrollable
        if (toc[0].scrollWidth > toc.innerWidth()) {
            toc.parent().append(leftArrow).append(rightArrow);
            leftArrow.hide();
        }

        leftArrow.on('click', function() {
            toc.scrollLeft(toc.scrollLeft() - SCROLL_AMOUNT);
        });

        rightArrow.on('click', function() {
            toc.scrollLeft(toc.scrollLeft() + SCROLL_AMOUNT);
        });

        toc.on('scroll', function() {
            leftArrow.toggle(toc.scrollLeft() > 0);
            rightArrow.toggle(toc.scrollLeft() + toc.innerWidth() < toc[0].scrollWidth);
        });
    }

    function filterTocLevels() {
        toc.find('li').each(function() {
            if (!$(this).hasClass('toclevel-1')) {
                $(this).remove();
            }
        });
    }

    function setupHideLink() {
        var hideLink = $('<a class="hide-link" href="#">открепить</a>');
        hideLink.on('click', function(e) {
            e.preventDefault();
            $('.toc-container').addClass('static');
            $(window).off('scroll', handleScrollClass);
        });
        $('.toc-container').append(hideLink);
    }

    function handleScroll() {
        var scrollTop = $(window).scrollTop();
        var activeLink = toc.find('.active');
        var found = false;

        $(PARSER_OUTPUT_SELECTOR + ' ' + HEADLINE_SELECTOR).each(function() {
            var positionTop = $(this).position().top;
            if(positionTop <= scrollTop) {
                var id = $(this).attr('id');
                toc.find('li a').removeClass('active');
                toc.find('li a[href="#' + id + '"]').addClass('active');
                found = true;
            }
            if (activeLink.length) {
                var linkOffset = activeLink.offset().left;
                var tocOffset = toc.offset().left;
                var tocScrollLeft = toc.scrollLeft();
                var tocWidth = toc.outerWidth();
                var activeLinkWidth = activeLink.outerWidth();

                var newScrollLeft = tocScrollLeft + linkOffset - tocOffset + activeLinkWidth / 2 - tocWidth / 2;

                toc.scrollLeft(newScrollLeft);
            }
        });

        if (!found) {
            toc.find('li a').removeClass('active');
            newListItem.find('a').addClass('active');
        }

        filterTocLevels();
    }

    function handleScrollClass() {
        // Check if .toc-container has .static class
        if ($('.toc-container').hasClass('static')) {
            $('.toc-container').removeClass('scrolled');
        } else {
            if ($(STICKY_HEADER_SELECTOR).hasClass('is-visible')) {
                $('.toc-container').addClass('scrolled');
            } else {
                $('.toc-container').removeClass('scrolled');
            }
        }

        if ($(window).scrollTop() === 0) {
            $('.toc-container').removeClass('scrolled');
        }
    }

    function setupScrollHandlers() {
        $(window).on('scroll', handleScroll);
        $(window).on('scroll', handleScrollClass);
    }

    function setupClickHandler() {
        // Add click event listener to .toc li a
        $('.toc li a').on('click', function() {
            if ($('.toc-container').hasClass('static')) {
                $('.toc li a').removeClass('active');
                $(this).addClass('active');
            }
        });
    }
});