$(document).ready(function() {
    mw.loader.using(['jquery'], function() {
        var isStatic = document.cookie.indexOf('staticToc=true') !== -1;
        var hideToc = document.cookie.indexOf('hideToc=true') !== -1;

        if (hideToc) {
            addRestoreTocAction();
            return;
        }

        var SCROLL_AMOUNT = 250;
        var parserOutput = $('.mw-parser-output');
        var toc = parserOutput.find('.toc > ul').clone();
        var newListItem = $('<li class="toclevel-1 tocsection-0"><a class="active" href="#"><span class="toctext">Статья</span></a></li>');

        if (toc.length && parserOutput.length) {
            setupToc();
            setupScrollArrows();
            filterTocLevels();
            setupGearDropdown();
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

            function updateArrows() {
                var scrollWidth = navbar[0].scrollWidth;
                var clientWidth = navbar.innerWidth();
                var scrollLeft = navbar.scrollLeft();

                leftArrow.toggle(scrollLeft > 0);
                rightArrow.toggle(scrollLeft + clientWidth < scrollWidth);
            }

            navbar.parent().append(leftArrow).append(rightArrow);

            leftArrow.on('click', function() {
                navbar.animate({
                    scrollLeft: '-=' + SCROLL_AMOUNT
                }, 300);
            });

            rightArrow.on('click', function() {
                navbar.animate({
                    scrollLeft: '+=' + SCROLL_AMOUNT
                }, 300);
            });

            navbar.on('scroll', updateArrows);
            $(window).on('resize', updateArrows);

            setTimeout(updateArrows, 0);
        }

        function filterTocLevels() {
            toc.find('li').not('.toclevel-1').remove();
        }

        function handleScroll() {
            var scrollTop = $(window).scrollTop();
            var winHeight = $(window).height();
            var docHeight = $(document).height();
            var found = false;

            $('.mw-parser-output h2').each(function() {
                var $this = $(this);
                var offsetTop = $this.offset().top;

                if (offsetTop <= scrollTop + winHeight / 3) {
                    var id = $this.find('.mw-headline').attr('id');
                    $('#navbartoc').find('li a').removeClass('active');
                    $('#navbartoc').find('li a[href="#' + id + '"]').addClass('active');
                    found = true;
                } else {
                    return false;
                }
            });

            if (!found) {
                $('#navbartoc').find('li a').removeClass('active');
                newListItem.find('a').addClass('active');
            }

            var activeLink = $('#navbartoc').find('.active');
            if (activeLink.length) {
                var linkOffset = activeLink.offset().left;
                var tocOffset = $('#navbartoc').offset().left;
                var tocScrollLeft = $('#navbartoc').scrollLeft();
                var tocWidth = $('#navbartoc').outerWidth();
                var activeLinkWidth = activeLink.outerWidth();

                var newScrollLeft = tocScrollLeft + linkOffset - tocOffset - (tocWidth / 2) + (activeLinkWidth / 2);

                $('#navbartoc').scrollLeft(newScrollLeft);
            }
        }

        function handleScrollClass() {
            var isScrolled = $('.fandom-sticky-header').hasClass('is-visible') || $(window).scrollTop() !== 0;
            $('.toc-container').toggleClass('scrolled', isScrolled && !$('.toc-container').hasClass('static'));
        }

        function setupScrollHandlers() {
            $(window).on('scroll', handleScroll);
            $(window).on('scroll', handleScrollClass);
            handleScroll();
            handleScrollClass();
        }

        function setupClickHandler() {
            $('.toc li a').on('click', function() {
                if ($('.toc-container').hasClass('static')) {
                    $('.toc li a').removeClass('active');
                    $(this).addClass('active');
                }
            });
        }

        function setupGearDropdown() {
            var gearDropdown = $(
                '<div class="wds-dropdown toc-gear-dropdown">' +
                '<div class="wds-dropdown__toggle wds-button wds-is-text page-header__action-button"><i class="fas fa-cog"></i></div>' +
                '<div class="wds-dropdown__content wds-is-right-aligned">' +
                '<ul class="wds-list wds-is-linked">' +
                '<li><a href="#" class="toggle-link">' + (isStatic ? 'Закрепить' : 'Открепить') + '</a></li>' +
                '<li><a href="#" class="remove-link">Убрать</a></li>' +
                '</ul>' +
                '</div>' +
                '</div>'
            );

            $('.toc-container').append(gearDropdown);

            gearDropdown.find('.toggle-link').on('click', function(e) {
                e.preventDefault();
                $('.toc-container').toggleClass('static');
                isStatic = !isStatic;
                document.cookie = 'staticToc=' + isStatic + '; path=/';
                $(this).text(isStatic ? 'Закрепить' : 'Открепить');
            });

            gearDropdown.find('.remove-link').on('click', function(e) {
                e.preventDefault();
                $('.toc-container').remove();
                document.cookie = 'hideToc=true; path=/';
                addRestoreTocAction();
            });
        }

        function addRestoreTocAction() {
            var actionList = $('#p-cactions ul');
            var restoreLink = $('<li><a href="#">Вернуть закрепленный блок</a></li>');

            restoreLink.on('click', function(e) {
                e.preventDefault();
                document.cookie = 'hideToc=false; path=/';
                location.reload();
            });

            actionList.append(restoreLink);
        }
    });
});