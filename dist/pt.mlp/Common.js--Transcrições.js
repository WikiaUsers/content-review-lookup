// Lista com todas as transcrições feito por Bobogoobo (mlp.wikia), adaptado por Ha³
// Utilizado em http://pt.mlp.wikia.com/wiki/Special:BlankPage?blankspecial=transcrições
$(function() {
    var $content = $('#mw-content-text > p'),
      $heading = ($('#WikiaPageHeader').length ? $('#WikiaPageHeader') : $('.AdminDashboardArticleHeader')).children('h1'),
      sections = [], sorting = [], total = 0, completed = 0;
 
    function nospecials(str) {
        return str.replace(/\W/g, '');
    }
 
    $heading.html('Transcrições/Todas');
    document.title = 'Todas as transcrições - ' + mw.config.get('wgSitename');
    $content.html(
      '<span style="font-size:125%;">&lt; <a href="/wiki/Transcrições" title="Transcrições">Transcrições</a></span>' +
      '<p>Esta página carrega todas as transcrições de episódios, filmes e curtas da franquia (pode levar algum tempo). ' +
      'Criada para que se possa fazer uma pesquisa em todas as transcrições de uma só vez.<br />Favor falar, caso tenha sugestões ou veja algum erro, ' +
      '<a href="/wiki/Mural_de_mensagens:Ha³" title="Mural de mensagens:Ha³">aqui</a>.</p>' +
      '<div id="transcripts-toc" style="margin:1em 0; border:1px solid #D9D9D9; padding:0.5em;">' +
      '<h2 style="width:100%; text-align:center; margin-top:0; border-bottom:0;">Progresso</h2>' +
      '<table style="width:100%;"><tr><td style="width:100%;">' + 
      '<div style="height:100%; width:0%; text-align:center; background-color:#DCAEEE;">' +
      '<span id="transcripts-progress">0</span>%</div></td></tr></table>'
    );
 
    $.getJSON('/api.php?action=parse&page=Predefinição:Transcrições&prop=wikitext&format=json', function(data) {
        data = data.parse.wikitext['*'];
 
        var re = /\|group\d\s*\=\s*(.*)\n\|/g, match;
        while ((match = re.exec(data)) !== null) {
            var start = data.indexOf('|list', data.indexOf(match[0])),
                end = data.indexOf('|group', start),
                group = $(match[1].replace("'''", '')).text();
            if (end === -1) {
                end = data.indexOf('<noinclude>', start);
            }
            if (group.indexOf('{{') !== -1) {
                group = 'Films';
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
                    'text': sections[j]
                })
            }));
 
            (function(index) {
                $.getJSON('/api.php?action=parse&prop=text|categories&format=json&page=Transcrições/' +
                  encodeURIComponent(sections[index]),
                  function(data) {
                    // Skip pages that don't exist
                    if (!data.error) {
                        // Only find the transcript category
                        $.each(data.parse.categories, function(idx, value) {
                            if (/_transcripts$/.test(value['*'])) {
                                sorting[index] = 'Season ' + value['*'].replace(/[^\d]/g, '');
                            }
                        });
                        data = data.parse.text['*'];
                        data = data.substring(
                            // Start at end of infobox table
                            data.indexOf('</table>', data.indexOf('class="infobox"')) + 8,
                            // End at beginning of containing navbox table (2nd to last)
                            data.lastIndexOf('<table', data.lastIndexOf('<table') - 1)
                        ).replace(/h2/g, 'h3');
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
            $('#transcripts-toc table').html('<tr></tr><tr><td style="text-align:center; width:100%;"></td></tr>');
 
            for (var i = 0; i < sorting.length; i++) {
                if ((i === 0 || sorting[i] !== sorting[i - 1]) && sorting[i]) {
                    $('#transcripts-toc table tr:first').append('<td style="vertical-align:top;">' +
                      '<h3 style="width:100%; text-align:center;">' + sorting[i] + '</h3><ul></ul></td>');
                }
                if (!sorting[i]) {
                    if ($('#transcripts-toc table tr:last td').text()) {
                        $('#transcripts-toc table tr:last td').append(' • ');
                    }
                    $('#transcripts-toc table tr:last td').append($('<a />', {
                        'href': '#' + nospecials(sections[i]),
                        'text': sections[i]
                    }));
                } else {
                    $('#transcripts-toc table tr:first td:last ul').append($('<li />').append($('<a />', {
                        'href': '#' + nospecials(sections[i]),
                        'text': sections[i]
                    })));
                }
            }
 
            $('#transcripts-toc table td:last').attr('colspan', $('#transcripts-toc table tr:first td').length);
        }
 
        $.getJSON('/api.php?action=parse&text={{Transcrições|state=expanded}}&prop=text&disablepp=true&format=json',
          function(data) {
            $content.append(data.parse.text['*']);
        });
    });
});