/* Created in Wikia by Gguigui1 https://dev.fandom.com/wiki/User:Gguigui1
Under CC-BY-SA licence */
;(function($, mw) {
	'use strict';
    var wgPageName = mw.config.get('wgPageName');
    var msg;
    
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

    function searchforpages() {
        new mw.Api().get( {
            action: 'query',
            list: 'allpages',
            apfilterredir: 'nonredirects',
            apprefix: wgPageName.substring(0, 1),
            aplimit: 'max'
        } ).done( function( data ) {
            for (var p in data.query.allpages) {
                var similar_characters_count = 0;
                var looppage = data.query.allpages[p].title; //For easier code
                var limit = looppage.length < wgPageName.length ? looppage.length : wgPageName.length;
                for (var i = 0; i < limit; i++) {
                    if (looppage.charAt(i).toLowerCase() == wgPageName.replace(/_/g, ' ').charAt(i).toLowerCase()) {
                        similar_characters_count += 1;
                    }
                }
                similar_characters_count = Math.round(similar_characters_count / limit * 100);
                if (similar_characters_count >= similitude) {
                    if (!$('.noarticletext ul').length) {
                        $('.noarticletext p:last').remove();
                        $('.noarticletext').append('<p style="font-size:130%; text-align:center;">' + msg('otherpages').escape() + '</p><ul style="list-style-type:circle;"></ul><p></p>');
                    }
                    $('.noarticletext ul').append('<li><a href="' + mw.util.getUrl(looppage) + '">' + looppage + ' (' + similar_characters_count + msg('similitude').escape() + ')</a></li>');
                }
            }
            sortbysimilitudeandcolor();
        });
    }
    if (!$('.noarticletext').length || $('.mw-warning-with-logexcerpt').length) {
        return; //No need to check for potential searched pages
    } else {
    	mw.hook('dev.i18n').add(function(i18n) {
			i18n.loadMessages('MisspelledPage').done(function(i18no) {
				msg = i18no.msg;
		        searchforpages();
			});
		});
		importArticle({
			type: 'script',
			article: 'u:dev:MediaWiki:I18n-js/code.js'
		});
    }
})(window.jQuery, window.mediaWiki);