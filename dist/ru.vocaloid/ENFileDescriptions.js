(function() {
    if (mw.config.get('wgNamespaceNumber') === 6) {
        var fileName = mw.config.get('wgTitle');
        var apiUrl = 'https://vocaloid.fandom.com/api.php';
        
        $.ajax({
            url: apiUrl,
            data: {
                action: 'parse',
                page: 'File:' + fileName,
                format: 'json',
                prop: 'text'
            },
            dataType: 'json',
            success: function(data) {
                if (data.parse && data.parse.text) {
                    var content = data.parse.text['*'];
                    var message = '<p>Этот файл импортирован с английской вики, находящейся по адресу <a href="https://vocaloid.fandom.com/wiki/File:' + fileName + '" target="_blank">vocaloid.fandom.com</a>. Ниже следует описание файла из английской вики.</p>';
                    var wrapperDiv = '<div style="border: 1px solid var(--theme-border-color); padding: 1.25rem;">' + content + '</div>';
                    $('#mw-imagepage-content .mw-parser-output').prepend(message + wrapperDiv);
                }
            },
            error: function() {
                $('#mw-imagepage-content .mw-parser-output').prepend(
                    '<div class="mw-message-box mw-message-box-error">' +
                    '<p>Ошибка при получении данных из API.</p></div>'
                );
            }
        });
    }
})();