//PNG thumbs for .svg
if (/\.svg$/i.test(mw.config.get('wgTitle'))) {
    $(function () {
        var url = $('#file img').attr('src');
        if (!url) {
            return;
        }

        var thumbText = window.wpPngThumbs || 'В виде PNG в других размерах:',
            thumbSize = [200, 500, 1000, 2000];

        for (var i = 0; i < thumbSize.length; i++) {
            thumbText += (i > 0 ? ',' : '')
                + ' <a href="' + url.replace(/\/\d+(px-[^\/]+$)/, '/' + thumbSize[i] + '$1')
                + '">' + thumbSize[i] + 'px</a>';
        }

        $('<p>')
            .addClass('SVGThumbs')
            .html(thumbText)
            .appendTo('div.fullMedia');
    });
}


//local pages for Commons files
if (!mw.config.get('wgArticleId')) {
    $(function () {
        $('#ca-talk.new:not(.selected), #ca-edit:not(.selected), #ca-ve-edit:not(.selected), #editform, #toolbar').hide();

        if (!$('#shared-image-desc, .redirectMsg').length) {
            return; //non-existing file: done
        }

        //otherwise file/redirect is on Commons

        $('#ca-watch').hide();

        var commons_link = $('#ca-view-foreign a');
        commons_link
            .attr('href', commons_link.attr('href') + '?uselang=' + mw.config.get('wgUserLanguage'))
            .attr('title', 'Этот файл находится на Викискладе, а не в Farm Frenzy вики')
            .text('Посмотреть на Викискладе →');

        var aa = $('#shared-image-desc').find('a[title^="Commons:Deletion requests/"]');
        if (aa.length) {
            $('<li><span><a href="' + aa.eq(0).attr('href')
                + '" title="Файл предложен к удалению">'
                + (mw.config.get('wgUserLanguage') === 'ru' ? 'обсуждение удаления' : 'deletion request')
                + '</a></span></li>'
                ).insertBefore('#ca-edit');
        }

        //ImageNotes
        var iaNotes = $('#shared-image-desc').children('.image_annotation');
        if (iaNotes.length && !window.ImageAnnotator) {
            importMW('ImageNotesViewer');
        }
    });
}