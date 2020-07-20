whenRailReadyStop = 1;
$(function whenRailReady() {
        if ($('.WikiaArticleInterlang').length > 0) {

        if ($('#WikiaRail section').length > 0) {
                $('#WikiaRail section.module:last').after('<section class="module" id="languagemodule"></section>');
                $('.WikiaArticleInterlang ul li.more').css('display', 'block');
                $('.WikiaArticleInterlang ul li.more').css('float', 'left');
                $('.WikiaArticleInterlang ul li:first-child').css('border', 'none');
                $('.WikiaArticleInterlang ul li:first-child').css('padding-left', '0');
                $('.WikiaArticleInterlang ul li.more-link').css('display', 'none');
                $('.WikiaArticleInterlang ul li.more-link').css('padding', '0');
                $('nav.WikiaArticleInterlang').appendTo('#languagemodule');
                $('nav.WikiaArticleInterlang').css('margin', '0');
                $('nav.WikiaArticleInterlang').css('padding', '0');
                $('.WikiaArticleInterlang ul li').css('font-size', '13px');
                $('.WikiaArticleInterlang ul li').css('font-weight', 'normal');

var heading = $('#languagemodule h3');
heading.replaceWith('<h1>' + heading.html() + '</h1>')

$("#languagemodule h1").each(function() {
    var text = $(this).text();
    text = text.replace(":", "");
    $(this).text(text);
});

        } else {
                if (whenRailReadyStop < 60) {
                        setTimeout(function() {
                                whenRailReady();
                        },1000);
                }
                whenRailReadyStop++;
        }
        }
});