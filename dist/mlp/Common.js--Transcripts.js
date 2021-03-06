// All transcript lister by Bobogoobo
// Runs on http://mlp.wikia.com/wiki/Special:BlankPage?blankspecial=transcripts
// TODO: more scalable TOC, better handling of subsections
$(function() {
    var $content = $('#mw-content-text > p'),
      $heading = ($('#WikiaPageHeader').length ? $('#WikiaPageHeader') : $('.AdminDashboardArticleHeader')).children('h1'),
      sections = [], sorting = [], total = 0, completed = 0;

    function nospecials(str) {
        return str.replace(/\W/g, '');
    }

    $heading.html('Transcripts/All');
    document.title = 'All Transcripts - ' + mw.config.get('wgSitename');
    $content.html(
      '<span style="font-size:125%;">&lt; <a href="/wiki/Transcripts" title="Transcripts">Transcripts</a></span>' +
      '<p>This page loads the full transcript of every episode and film in the show (may take some time). ' +
      'It is made to help with searching every transcript at once.<br />Please make any bug reports or suggestions ' +
      '<a href="/wiki/User_talk:Bobogoobo" title="User talk:Bobogoobo">here</a>.</p>' +
      '<div id="transcripts-toc" style="margin:1em 0; border:1px solid #D9D9D9; padding:0.5em; overflow-x:scroll;">' +
      '<h2 style="width:100%; text-align:center; margin-top:0; border-bottom:0;">Progress</h2>' +
      '<table style="width:100%;"><tr><td style="width:100%;">' + 
      '<div style="height:100%; width:0%; text-align:center; background-color:#DCAEEE;">' +
      '<span id="transcripts-progress">0</span>%</div></td></tr></table>'
    );

    $.getJSON('/api.php?action=parse&page=Template:Transcripts&prop=wikitext&format=json', function(data) {
        data = data.parse.wikitext['*'];
        
        var re = /\|group\d+\s*\=\s*(.*)\n\|/g, match, start, end;
        while ((match = re.exec(data)) !== null) {
            start = data.indexOf('|list', data.indexOf(match[0]));
            end = data.indexOf('|group', start);
            if (end === -1) {
                end = data.indexOf('<noinclude>', start);
            }
            // [^-] to skip commented out links
            var substr = data.substring(start, end),
                re2 = /\[\[([^\|]*)\|([^\]]*)\]\][^-]/g,
                match2;
            while ((match2 = re2.exec(substr)) !== null) {
                sections.push(match2[1].replace('Transcripts/', ''));
                sorting.push('');
                total += 1;
            }
        }

        for (var j = 0; j < sections.length; j++) {
            $content.append($('<h2 />', {
                'id': nospecials(sections[j]),
                'html': $('<a />', {
                    'href': '/wiki/' + sections[j].replace(/ /g, '_'),
                    'title': sections[j],
                    'text': sections[j].replace(' (episode)', '')
                })
            }));

            (function(index) {
                $.getJSON('/api.php?action=parse&prop=text|categories&format=json&page=Transcripts/' +
                  encodeURIComponent(sections[index]),
                  function(data) {
                    // Skip pages that don't exist
                    if (!data.error) {
                        // Only find the transcript category
                        $.each(data.parse.categories, function(idx, value) {
                            var season;
                            if (/_transcripts$/.test(value['*'])) {
                                season = value['*'].replace(/[^\d]/g, '');
                                if (season) {
                                    sorting[index] = 'Season ' + season;
                                } else if (value['*'].indexOf('Equestria_Girls') !== -1) {
                                    sorting[index] = 'EG';
                                }
                            }
                        });
                        data = data.parse.text['*'];
                        data = data.substring(
                            // Start at end of infobox table
                            data.indexOf('</table>', data.indexOf('class="infobox"')) + 8,
                            // End at beginning of containing navbox table (2nd to last)
                            data.lastIndexOf('<table', data.lastIndexOf('<table') - 1)
                        ).replace(/h3/g, 'h4').replace(/h2/g, 'h3');
                        // Everything between the infobox and the navbox is valid transcript...hopefully
                        $('#' + nospecials(sections[index])).after((data || '<p></p>'));
                    }

                    completed += 1;
                    $('#transcripts-toc div').css('width', completed / total * 100 + '%');
                    $('#transcripts-progress').text((completed / total * 100).toFixed(2));
                    if (completed === total) {
                        makeTOC();
                    }
                });
            }(j));
        }

        function makeTOC() {
            $('.toc').remove();// From animated shorts pages
            $('#transcripts-toc h2').text('Contents');
            $('#transcripts-toc table').html(
                '<tr></tr>' + 
                '<tr><td style="text-align:center; width:100%;"></td></tr>' + 
                '<tr><td style="text-align:center; width:100%;"></td></tr>'
            );

            for (var i = 0; i < sorting.length; i++) {
                if ((i === 0 || sorting[i] !== sorting[i - 1]) && sorting[i] && sorting[i] !== 'EG') {
                    $('#transcripts-toc table tr:first').append('<td style="vertical-align:top;">' +
                      '<h3 style="width:100%; text-align:center;">' + sorting[i] + '</h3><ul></ul></td>');
                }
                if (!sorting[i]) {
                    if ($('#transcripts-toc table tr:eq(2) td').text()) {
                        $('#transcripts-toc table tr:eq(2) td').append(' • ');
                    }
                    $('#transcripts-toc table tr:eq(2) td').append($('<a />', {
                        'href': '#' + nospecials(sections[i]),
                        'text': sections[i]
                    }));
                } else if (sorting[i] === 'EG') {
                    if ($('#transcripts-toc table tr:eq(1) td').text()) {
                        $('#transcripts-toc table tr:eq(1) td').append(' • ');
                    }
                    $('#transcripts-toc table tr:eq(1) td').append($('<a />', {
                        'href': '#' + nospecials(sections[i]),
                        'text': sections[i].replace('My Little Pony Equestria Girls: ', '')
                    }));
                } else {
                    $('#transcripts-toc table tr:first td:last ul').append($('<li />').append($('<a />', {
                        'href': '#' + nospecials(sections[i]),
                        'text': sections[i].replace(' (episode)', '')
                    })));
                }
            }

            $('#transcripts-toc table tr:not(:first) td').attr('colspan', $('#transcripts-toc table tr:first td').length);
        }

        $.getJSON('/api.php?action=parse&text={{Transcripts|state=expanded}}&prop=text&disablepp=true&format=json',
          function(data) {
            $content.append(data.parse.text['*']);
        });
    });
});