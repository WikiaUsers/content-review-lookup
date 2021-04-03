importScriptPage('MediaWiki:Tables.js');
function getEpisodes(season,callback) {
    console.log('Episodenliste zur Staffel',season);
    var data = {
        season: season
    };
    $.get('http://pfefferkoerner.wikia.com/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&titles=MediaWiki:Episoden_Staffel_' + season + '.js&format=json').done(callback);
}

function getAllEpisodes(seasons,callback) {
    var pages = [];
    console.log(seasons,seasons.length,'Staffeln');
    for(i = 0; i < seasons.length; i++) {
        console.log(i,'of',seasons.length);
        pages.push('MediaWiki:Episoden_Staffel_' + seasons[i] + '.js');
    }
    var titles = pages.join('|');
    console.log('Titles',titles,pages);
    $.get('http://pfefferkoerner.wikia.com/api.php?action=query&prop=revisions&rvprop=content&titles=' + titles + '&format=json').done(callback);
}

if($('.api-episodenliste').length) {
    if($('.api-episodenliste').length > 1) {
        var seasons = [];
        for(n = 0; n < $('.api-episodenliste').length; n++) {
            if(!$('.api-episodenliste').eq(n).data('staffel')) {
                var pagename = document.location.href.substr(document.location.href.lastIndexOf('/') + 1);
                seasons.push(Number(pagename.split('_')[1].replace('.','')));
                $('.api-episodenliste').eq(n).data('staffel',Number(pagename.split('_')[1].replace('.','')));
            }
            else {
                seasons.push($('.api-episodenliste').eq(n).data('staffel'));
            }
        }
        console.log(seasons.length,'Staffeln (first occurence)');
        getAllEpisodes(seasons,function(data) {
                var episodenlisten = []; 
            for(i = 0; i < Object.keys(data.query.pages).length; i++) {
                console.log('list'+i,data.query.pages[Object.keys(data.query.pages)[i]].revisions[0]['*']);
                episodenlisten.push(JSON.parse(data.query.pages[Object.keys(data.query.pages)[i]].revisions[0]['*']));
            }
            var i = 0;
            var headers = ($('.api-episodenliste').length !== 0 && $('.api-episodenliste[data-headers]').length !== 0) ? $('.api-episodenliste').data('headers') : '';
            var cells = ($('.api-episodenliste').length !== 0 && $('.api-episodenliste[data-data]').length !== 0) ? $('.api-episodenliste').data('data') : 'id,title,pubDate';
            console.log($('.api-episodenliste').data('headers'),headers);
            for(x = 0; Object.keys(episodenlisten).length; x++) {
                createTable({
                   headers: headers,
                   cells: cells,
                   data: episodenlisten[x],
                   parent: ($('.api-episodenliste').eq(x).length !== 0) ? $('.api-episodenliste').eq(x) : $('.api-infobox'),
                   idPref: 'Episode'
                });
            }
            /*
            $('.api-episodenliste').each(function() {
                console.log($(this),$(this).data('staffel'),seasons[i]);
                if($(this).data('staffel') == seasons[i]) {
                    $(this)
                    .html($('<table />')
                    .addClass('wikitable sortable episodenliste-staffel-' + seasons[i]));
                }
                i++;
            });
            for(i = 0; i < episodenlisten.length; i++) {
                $('table.episodenliste-staffel-' + seasons[i]).append(
                   $('<tr />').append(
                        $('<th />').text('Episodennummer')
                    )
                );
                $('table.episodenliste-staffel-' + seasons[i] + ' tr').append(
                    $('<th />').text('Episodentitel')
                );
                $('table.episodenliste-staffel-' + seasons[i] + ' tr').append(
                    $('<th />').text('Erstausstrahlung')
                );
                for(n = 0; n <= Object.keys(episodenlisten[i].Episoden).length - 1; n++) {
                   console.log('Durchlauf',n,'von',Object.keys(episodenlisten[i].Episoden).length);
                   $('table.episodenliste-staffel-' + seasons[i]).append(
                       $('<tr />').append(
                            $('<td />').text(n+1)
                        )
                    );
                    $('table.episodenliste-staffel-' + seasons[i] + ' tr').eq(n+1).append(
                        $('<td />').html('<a href="/wiki/' + encodeURI(episodenlisten[i].Episoden[n].title) + '">' + episodenlisten[i].Episoden[n].title + '</a>')
                    );
                    var date = episodenlisten[i].Episoden[n].pubDate !== '' ? new Date(episodenlisten[i].Episoden[n].pubDate) : '';
                    var pubDate = date !== '' ? date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() : '';
                    $('table.episodenliste-staffel-' + seasons[i] + ' tr').eq(n+1).append(
                        $('<td />').text(pubDate)
                    );
                }
            }*/
        });
        console.log('Season Array',seasons);
    }
    else {
        if(!$('.api-episodenliste').data('staffel')) {
            var pagename = document.location.href.substr(document.location.href.lastIndexOf('/') + 1);
            var season = pagename.split('_')[1].replace('.','');
        }
        else {
            var season = $('.api-episodenliste').data('staffel');
        }
        getEpisodes(season,function(data) {
            console.log('Episodenliste zur Staffel',season);
           var episodenliste = JSON.parse(data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*']);
           console.dir(episodenliste);
           $('.api-episodenliste').append($('<table />').addClass('wikitable sortable'));
           $('.api-episodenliste table').append(
               $('<tr />').append(
                    $('<th />').text('Episodennummer')
                )
            );
            $('.api-episodenliste table tr').append(
                $('<th />').text('Episodentitel')
            );
            $('.api-episodenliste table tr').append(
                $('<th />').text('Erstausstrahlung')
            );
           for(i = 0; i <= Object.keys(episodenliste.Episoden).length - 1; i++) {
               console.log('Durchlauf',i,'von',Object.keys(episodenliste.Episoden).length);
               $('.api-episodenliste table').append(
                   $('<tr />').append(
                        $('<td />').text(i+1)
                    )
                );
                $('.api-episodenliste table tr').eq(i+1).append(
                    $('<td />').html('<a href="/wiki/' + encodeURI(episodenliste.Episoden[i].title) + '">' + episodenliste.Episoden[i].title + '</a>')
                );
                var pubDate = episodenliste.Episoden[i].pubDate !== '' ? new Date(episodenliste.Episoden[i].pubDate) : '';
                $('.api-episodenliste table tr').eq(i+1).append(
                    $('<td />').text(pubDate.getDate() + '.' + pubDate.getMonth() + '.' + pubDate.getFullYear())
                );
           }
        });
    }
}