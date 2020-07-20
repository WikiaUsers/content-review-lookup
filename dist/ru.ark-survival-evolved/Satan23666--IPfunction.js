$(function() {
    if (!$('#Parser').length) {
        return;
    }
    
    console.log('Image\'s link parser. Wow. So wow.');
    
    $('#Parser').append(
        '<input type="text" id="getLink" style="width:70%; text-align:center;" placeholder="Ваша ссылка на изображение">&nbsp;'+
        '<input type="text" id="getWidth" style="width:15%; text-align:center;" placeholder="Ширина?">&nbsp;'+
        '<button type="button" id="getLinkSumbit">Go!</button>&nbsp;'+
        '<button type="button" id="getHelp">?</button>'
    );
    
    var link, newLink;
    
    $('#getLinkSumbit').on("click", function() {
        $('#ParserResult').children().replaceWith('');
        link = $('#getLink').val(),
        fileWidth = '';
        
        if (link === '' || (link.search('http://') + link.search('vignette') + link.search('img')) === -3) {
            alert('Вы ввели неправильную ссылку или вовсе не ввели её.');
            return;
        }
        
        newLink = link.replace(/(.+)(vignette|img)(.+)\/(revision.*|__cb\d+)/,'$1images$3');
        
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
                fileWidth = link.replace(/.*scale-to-width([^/]+)?\/(.+)\?.*/,'$2');
            }
            
            var fileName = newLink.replace(/.*\/.{2}\//,'');
            newLink = newLink.replace('images/', 'images/thumb/') + '/'+fileWidth+'px-'+fileName;
        }
        
        $('#ParserResult').append('<br /><input type="text" value="'+newLink+'" style="width:95%"><br /><br /><img src="'+newLink+'">');
    });
    
    $('#getHelp').click(function() {
        alert(
            'Подсказка по использованию:'+
            '\n\nПолностью скопируйте ссылку изображения, содержащую vignette или img, и вставьте в первое поле.'+
            '\n\nЕсли вы хотите получить изображение определённой ширины, вставьте желаемый размер во второе поле (без "px").'+
            '\n\nНажмите кнопку и вы получаете прямую ссылку и изображение в предпросмотре :)'+
            '\n\n\n\nPS: Помните, что изображение шириной более 650px будет отображаться некорректно, но это никак не влияет на результат в ссылке :)'
        );
    });
});