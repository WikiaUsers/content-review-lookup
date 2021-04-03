// Non-720p image listing script by Bobogoobo
// A message will pop up at the top of the screen when the script is finished.
// To reduce maximum number of listings per episode, add to your /wikia.js:
//     window.non720limit = 100;
// Let me know if there are any more certain things in file names that should be excluded.
// Or if you have other suggestions.
$(function() {
    $('#mw-content-text').html(
        '<p>This list is generated from subcategories of Category:Episode images. ' +
        'Please check whether an image is intended to be the size it is before reuploading it. ' +
        'Make any suggestions (including additional patterns that should be skipped) ' +
        '<a href="/wiki/User_talk:Bobogoobo" title="User talk:Bobogoobo">here</a>.</p>' + 
        '<div id="non720" style="width:100%;"></div>'
    );
    
    var limit = window.non720limit || 100, pending = 3;// init pending to number of items added manually

    ($('#WikiaPageHeader').length ? $('#WikiaPageHeader') :
        $('.AdminDashboardArticleHeader')).children('h1').html('Non-720p images');
    document.title = 'Non-720p images - ' + mw.config.get('wgSitename');

    function nospecials(str) {
        return str.replace(/\W/g, '');
    }

    function doEpisode(episode) {
        var cat = 'Category:' + episode + ' images', pagelist = [];
        if (episode === 'My Little Pony Equestria Girls') {
            cat = 'Category:Equestria Girls images';
        }
        if (episode === 'My Little Pony Equestria Girls: Rainbow Rocks') {
            cat = 'Category:Equestria Girls: Rainbow Rocks images';
        }
        if (episode === 'My Little Pony Equestria Girls: Friendship Games') {
            cat = 'Category:Equestria Girls: Friendship Games images';
        }

        function getList(qcontinue, callback) {
            var pages, file, cont;
            var titleTest = /\s(?:crop|cropped|id|promotional|thumb)(?:\s|\.png$)|^File\:Navbox\s|^File\:S\d{1,2}E\d{1,2} Title|\.gif$/i;
            $.getJSON('/api.php?action=query&generator=categorymembers&gcmtitle=' + 
              encodeURIComponent(cat) + '&gcmtype=file&prop=imageinfo&iiprop=size&gcmcontinue=' + 
              qcontinue + '&gcmlimit=max&format=json', function(data) {
                if (data.query) {
                    pages = data.query.pages;
                } else {
                    pages = [];
                }
                for (var id in pages) {
                    file = pages[id];
                    if (file.imageinfo === undefined) {
                        continue;// File redirects or other weirdness
                    }
                    if (
                        (file.imageinfo[0].width !== 1280 || file.imageinfo[0].height !== 720) &&
                        (file.imageinfo[0].width !== 1920 || file.imageinfo[0].height !== 1080) &&
                        !(titleTest.test(file.title))
                    ) {
                        pagelist.push([file.title, file.imageinfo[0].width, file.imageinfo[0].height]);
                    }

                    if (pagelist.length >= limit) { break; }
                }
 
                if (data.query) {
                    cont = data['query-continue'];
                }
                if (cont !== undefined && pagelist.length < limit) {
                    getList(cont.categorymembers.gcmcontinue, callback);
                } else {
                    callback();
                }
            });
        }

        function printResults() {
            pagelist.sort();
            for (var i = 0; i < pagelist.length; i++) {
                $('#non720-' + nospecials(episode) + ' ol').append('<li>' + $('<a />', {
                    'href': '/wiki/' + encodeURIComponent(pagelist[i][0].replace(/ /g, '_')),
                    'text': pagelist[i][0]
                })[0].outerHTML + ' - ' + pagelist[i][1] + 'x' + pagelist[i][2] + '</li>');
            }
            if (!pagelist.length) {
                $('#non720-' + nospecials(episode)).html('<p>No results. Yay!</p>');
            }
            pending -= 1;
            if (pending === 0) {
                console.log('Non-720p listing completed.');
            }
        }

        getList('', printResults);
    }

    // Most of this section adapted from transcripts script
    $.getJSON('/api.php?action=parse&page=Template:Transcripts&prop=links&format=json', function(data) {
        var sections = [];
        data = data.parse.links;
        // Loop through episodes only - update second number when new EG films come out
        for (var i = 2; i < data.length - 5; i++) {
            if (data[i].exists === '') {
                sections.push(data[i]['*'].replace('Transcripts/', ''));
                pending += 1;
            }
            // Add EG films in chronological order as discussed
            // Shorts images are in same category so only need one element
            if (i === 66) {
                sections.push('My Little Pony Equestria Girls');
            }
            if (i === 92) {
                sections.push('My Little Pony Equestria Girls: Rainbow Rocks');
            }
            /* Uncomment and remove from below when S6 is listed
            if (i === 118) {
                sections.push('My Little Pony Equestria Girls: Friendship Games');
            }
            */
        }
        sections.push('My Little Pony Equestria Girls: Friendship Games');
 
        for (var j = 0; j < sections.length; j++) {
            $('#non720').append($('<h2 />', {
                'html': $('<a />', {
                    'href': '/wiki/' + sections[j].replace(/ /g, '_') + '/Gallery',
                    'title': sections[j],
                    'text': sections[j]
                })
            })).append($('<div />', {
                'id': 'non720-' + nospecials(sections[j]),
                'html': '<ol></ol>'
            }));

            doEpisode(sections[j]);
        }
    });
});