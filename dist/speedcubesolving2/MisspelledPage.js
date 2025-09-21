/* Created in Wikia by Gguigui1 https://dev.fandom.com/wiki/User:Gguigui1
Under CC-BY-SA licence */
/*Improved by 7o'clock*/
$(function() {
    var config = mw.config.get([
        'wgContentLanguage',
        'wgUserLanguage',
        'wgPageName'
    ]);
    function similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }
    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();
    
      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }
 
    var i18n = {
        en: {
            otherspages: "Or perhaps are you looking for one of this page:",
            similitude: "% similarity"
        },
        es: {
            otherspages: "O tal vez estes buscando alguna de estas paginas:",
            similitude: "% de similaritud"
        },
        ja: {
            otherspages: "お探しのページはこちらですか？",
            similitude: "% 類似ページ"
        },
        fr: {
            otherspages: "Ou peut-être cherchez-vous une des pages suivantes:",
            similitude: "% de similitude"
        },
        tr: {
            otherspages: "Ya da belki bu sayfalardan birini mi arıyorsunuz:",
            similitude: "% benzerlik"
        },
        pl: {
            otherspages: "Może szukasz jednej z tych stron:",
            similitude: "% podobieństwa"
        }
    };
    i18n = $.extend({}, i18n.en, i18n[config.wgContentLanguage], i18n[config.wgUserLanguage]);
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
        for (i = 0; i < nombres.length; i++) { //Change pages list, sort by similarity
            $(".noarticletext ul li:contains(" + nombres[i] + ")").appendTo('.noarticletext ul');
            if (nombres[i] >= 90) {
                $(".noarticletext ul li:contains(" + nombres[i] + ") *").css('color', 'green');
            } else if (nombres[i] >= 80) {
                $(".noarticletext ul li:contains(" + nombres[i] + ") *").css('color', 'orange');
            } else if (nombres[i] >= 70) {
                $(".noarticletext ul li:contains(" + nombres[i] + ") *").css('color', 'blue');
            } else if (nombres[i] >= 60) {
                $(".noarticletext ul li:contains(" + nombres[i] + ") *").css('color', 'black');
            }
        }
    }
 
    function searchforpages() {
        new mw.Api().get( {
            action: 'query',
            list: 'allpages',
            apfilterredir: 'nonredirects',
            apprefix: config.wgPageName.substring(0, 1),
            aplimit: 'max'
        } ).done( function( data ) {
            for (var p in data.query.allpages) {
                var similar_characters_count = 0;
                var looppage = data.query.allpages[p].title;
                similar_characters_count = similarity(looppage, config.wgPageName) * 100;
                if (similar_characters_count >= similitude) {
                    if (!$('.noarticletext ul').length) {
                        $('.noarticletext p:last').remove();
                        $('.noarticletext').append('<p style="font-size:130%; text-align:center;">' + i18n.otherspages + '</p><ul style="list-style-type:circle;"></ul><p></p>');
                    }
                    $('.noarticletext ul').append('<li><a href="' + mw.util.getUrl(looppage) + '">' + looppage + ' (' + similar_characters_count + i18n.similitude + ')</a></li>');
                }
            }
            sortbysimilitudeandcolor();
        });
    }
    if (!$('.noarticletext').length || $('.mw-warning-with-logexcerpt').length) {
        return; //No need to check for potential searched pages
    } else {
        searchforpages();
    }
});