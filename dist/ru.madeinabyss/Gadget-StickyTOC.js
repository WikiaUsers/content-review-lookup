// *This was written by Copilot. I have minimal programming knowledge.
$(document).ready(function() {
    mw.loader.using(['jquery'], function() {
        var isStatic = document.cookie.indexOf('staticToc=true') !== -1;
        var hideToc = document.cookie.indexOf('hideToc=true') !== -1;
        if (hideToc) return;

        var SCROLL_AMOUNT = 250;
        var parserOutput = $('.mw-parser-output');
        var toc = parserOutput.find('.toc > ul').clone();
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
            var tocWrapper = $('<div class="toc navbar" id="navbartoc"></div>');
            tocWrapper.append(toc);
            parserOutput.prepend(tocWrapper);
            toc.find('.tocnumber').remove();
            toc.prepend(newListItem);
            tocWrapper.wrap($('<div class="toc-container"></div>'));
            if (isStatic) $('.toc-container').addClass('static');
        }

        function setupScrollArrows() {
            var leftArrow = $('<div class="scroll-arrow left-arrow"><i class="fas fa-chevron-left"></i></div>');
            var rightArrow = $('<div class="scroll-arrow right-arrow"><i class="fas fa-chevron-right"></i></div>');
            var navbar = $('#navbartoc');

            if (navbar[0].scrollWidth > navbar.innerWidth()) {
                navbar.parent().append(leftArrow).append(rightArrow);
                leftArrow.hide();
            }

            leftArrow.on('click', function() { navbar.scrollLeft(navbar.scrollLeft() - SCROLL_AMOUNT); });
            rightArrow.on('click', function() { navbar.scrollLeft(navbar.scrollLeft() + SCROLL_AMOUNT); });

            navbar.on('scroll', function() {
                leftArrow.toggle(navbar.scrollLeft() > 0);
                rightArrow.toggle(navbar.scrollLeft() + navbar.innerWidth() < navbar[0].scrollWidth);
            });
        }

        function filterTocLevels() {
            toc.find('li').not('.toclevel-1').remove();
        }

        function handleScroll() {
            var scrollTop = $(window).scrollTop();
            var activeLink = $('#navbartoc').find('.active');
            var found = false;

            $('.mw-parser-output h2 span.mw-headline').each(function() {
                var positionTop = $(this).position().top;
                if(positionTop <= scrollTop) {
                    var id = $(this).attr('id');
                    $('#navbartoc').find('li a').removeClass('active');
                    $('#navbartoc').find('li a[href="#' + id + '"]').addClass('active');
                    found = true;
                }
                if (activeLink.length) {
                    var linkOffset = activeLink.offset().left;
                    var tocOffset = $('#navbartoc').offset().left;
                    var tocScrollLeft = $('#navbartoc').scrollLeft();
                    var tocWidth = $('#navbartoc').outerWidth();
                    var activeLinkWidth = activeLink.outerWidth();

                    var newScrollLeft = tocScrollLeft + linkOffset - tocOffset + activeLinkWidth / 2 - tocWidth / 2;

                    $('#navbartoc').scrollLeft(newScrollLeft);
                }
            });

            if (!found) {
                $('#navbartoc').find('li a').removeClass('active');
                newListItem.find('a').addClass('active');
            }

            filterTocLevels();
        }

        function handleScrollClass() {
            var isScrolled = $('.fandom-sticky-header').hasClass('is-visible') || $(window).scrollTop() !== 0;
            $('.toc-container').toggleClass('scrolled', isScrolled && !$('.toc-container').hasClass('static'));
        }

        function setupScrollHandlers() {
            $(window).on('scroll', handleScroll);
            $(window).on('scroll', handleScrollClass);
        }

        function setupClickHandler() {
            $('.toc li a').on('click', function() {
                if ($('.toc-container').hasClass('static')) {
                    $('.toc li a').removeClass('active');
                    $(this).addClass('active');
                }
            });
        }

        function setupHideLink() {
            var linkContainer = $('<div class="link-container"></div>');
            var hideLink = $('<a class="hide-link" href="#">' + (isStatic ? 'закрепить' : 'открепить') + '</a>');
            var removeLink = $('<a class="remove-link" href="#" title="Убрать этот блок навсегда">убрать</a>');

            hideLink.on('click', function(e) {
                e.preventDefault();
                $('.toc-container').toggleClass('static');
                isStatic = !isStatic;
                document.cookie = 'staticToc=' + isStatic + '; path=/';
                $(this).text(isStatic ? 'закрепить' : 'открепить');
            });

            removeLink.on('click', function(e) {
                e.preventDefault();
                $('.toc-container').remove();
                document.cookie = 'hideToc=true; path=/';
            });

            linkContainer.append(hideLink).append(removeLink);
            $('.toc-container').append(linkContainer);
        }
    });
});