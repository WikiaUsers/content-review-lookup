/* Created in Wikia by Gguigui1, revised by Moonwatcher x Qibli
Under CC-BY-SA licence */
;(function($, mw) {
    'use strict';
    const wgPageName = mw.config.get('wgPageName');

    var similitude = similitude || 60;

    function sortbysimilitudeandcolor() {
        var nombres = [];
        $('.noarticletext ul li').each(function() { //Get similarity and sort it
            nombres.push($(this).html().substring($(this).html().lastIndexOf("(") + 1, $(this).html().length).split('%')[0]);
        });
        nombres.sort(function(a, b) {
            return a - b;
        });
        nombres.reverse(); //Reverse the array (compulsory here)
        for (var i = 0; i < nombres.length; i++) { //Change pages list, sort by similarity
            $(".noarticletext ul li:contains(" + nombres[i] + ")").appendTo('.noarticletext ul');
            if (nombres[i] >= 90) {
                $(".noarticletext ul li:contains(" + nombres[i] + ") *").css('color', 'var(--theme-success-color)');
            } else if (nombres[i] >= 80) {
                $(".noarticletext ul li:contains(" + nombres[i] + ") *").css('color', 'var(--theme-warning-color)');
            } else if (nombres[i] >= 70) {
                $(".noarticletext ul li:contains(" + nombres[i] + ") *").css('color', 'dodgerblue');
            } else if (nombres[i] >= 60) {
                $(".noarticletext ul li:contains(" + nombres[i] + ") *").css('color', 'var(--theme-page-text-color)');
            }
        }
    }

    function searchforpages(i18n) {
        new mw.Api().get({
            action: 'query',
            list: 'allpages',
            apfilterredir: 'nonredirects',
            apprefix: wgPageName.substring(0, 1),
            aplimit: 'max'
        }).done(function(data) {
            for (var p in data.query.allpages) {
                var looppage = data.query.allpages[p].title; // For easier code
                var wgPageNameNormalized = wgPageName.replace(/_/g, ' ').toLowerCase();
                var looppageNormalized = looppage.toLowerCase();
                
                var similar_characters_count = 0;
                var minLength = Math.min(wgPageNameNormalized.length, looppageNormalized.length);
                for (var i = 0; i < minLength; i++) {
                    if (looppageNormalized.charAt(i) == wgPageNameNormalized.charAt(i)) {
                        similar_characters_count += 1;
                    }
                }

                // Calculate similarity based on character match and penalize length difference
                var similarity = (similar_characters_count / minLength) * 100;
                var lengthDifferencePenalty = Math.abs(wgPageNameNormalized.length - looppageNormalized.length) / Math.max(wgPageNameNormalized.length, looppageNormalized.length) * 100;
                similarity -= lengthDifferencePenalty;

                if (similarity >= similitude) {
                    if (!$('.noarticletext ul').length) {
                        $('.noarticletext p:last').remove();
                        $('.noarticletext').append('<p style="font-size:130%; text-align:center;">' + i18n.msg('otherpages').escape() + '</p><ul style="list-style-type:circle;"></ul><p></p>');
                    }
                    $('.noarticletext ul').append('<li><a href="' + mw.util.getUrl(looppage) + '">' + looppage + ' (' + i18n.msg('similitude', Math.round(similarity)).escape() + ')</a></li>');
                }
            }
            sortbysimilitudeandcolor();
        });
    }

    if (!$('.noarticletext').length || $('.mw-warning-with-logexcerpt').length) {
        return; //No need to check for potential searched pages
    } else {
        mw.hook('dev.i18n').add(function(i18n) {
            i18n.loadMessages('MisspelledPage').done(searchforpages);
        });
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
})(window.jQuery, window.mediaWiki);