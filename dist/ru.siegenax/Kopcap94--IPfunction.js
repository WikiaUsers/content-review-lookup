$(function() {
    if (!$('#Parser').length) {
        return;
    }

    var link, newLink, i18n_obj = {
        ru: {
            link: 'Ваша ссылка на изображение',
            width: 'Ширина?',
            error: 'Вы ввели неправильную ссылку или вовсе не ввели её.',
            help: 'Подсказка по использованию:'+
                  '\n\nПолностью скопируйте ссылку изображения, содержащую vignette или img, и вставьте в первое поле.'+
                  '\n\nЕсли вы хотите получить изображение определённой ширины, вставьте желаемый размер во второе поле (без "px").'+
                  '\n\nНажмите кнопку и вы получаете прямую ссылку и изображение в предпросмотре :)'
        },
        en: {
            link: 'Direct link to image (image\'s url)',
            width: 'Width?',
            error: 'Your url doesn\'t match conditions or just empty. Read help info (?).',
            help: 'How to use it:'+
                  '\n\nCopy your image\'s url, containing "vignette" or "img" in it, and paste it to first area.'+
                  '\n\nIf you want to get image with certain width, use second area and add here need width. If you want to have default image size - leave it empty. Make sure, that this value should be without "px"!'+
                  '\n\nClick on the button and got your new direct link that parsed by MediaWiki into image.'
        }
    },
    get_lang = $.extend(i18n_obj.en, i18n_obj[mw.config.get('wgUserLanguage')]);

    $('#Parser').append(
        '<input type="text" id="getLink" style="width:70%; text-align:center;" placeholder="' + get_lang.link + '">&nbsp;'+
        '<input type="text" id="getWidth" style="width:15%; text-align:center;" placeholder="' + get_lang.width + '">&nbsp;'+
        '<button type="button" id="getLinkSumbit">Go!</button>&nbsp;'+
        '<button type="button" id="getHelp">?</button>'
    );

    $('#getLinkSumbit').on("click", function() {
        $('#ParserResult').children().replaceWith('');
        link = $('#getLink').val(),
        fileWidth = '';

		//                 (      0 or 1                       0 or 1      )   (    0 or 1                    0 or 1        )         0 or 1
        if (link === '' || (link.search('https://') + link.search('http://') + link.search('vignette') + link.search('static') + link.search('img')) === -3) {
            alert(get_lang.error);
            return;
        }

        newLink = link.replace(/(.+)\/\/(static|vignette|img)(.+)\/(revision.*|__cb\d+)/,'$1//images$3');

        if (link.search('path-prefix') > -1) {
            var prefix = link.replace(/.*path-prefix=(.+)(&.*)?/,'$1');
            newLink = newLink.replace('images/', prefix + '/images/');
        }

        if (link.search('/thumb/') > -1) {
            newLink = newLink.replace(/thumb\/(.*)\/\d+px-.*/, '$1');
            fileWidth = link.replace(/.*\/(\d+)px-.*/, '$1');
        }

        if (fileWidth !== '' || link.search('scale-to-width') > -1 || $('#getWidth').val() !== '') {
            if ($('#getWidth').val() !== '') {
                fileWidth = $('#getWidth').val();
            } else if (fileWidth === '') {
                fileWidth = link.replace(/.*scale-to-width(-down)?([^/]+)?\/(.+)\?.*/,'$3');
            }

            var fileName = newLink.replace(/.*\/.{2}\//,'');
            newLink = newLink.replace('images/', 'images/thumb/') + '/'+fileWidth+'px-'+fileName;
        }

        $('#ParserResult').append('<br /><input type="text" value="'+newLink+'" style="width:95%"><br /><br /><img src="'+newLink+'">');
    });

    $('#getHelp').click(function() {
        alert(get_lang.help);
    });
});