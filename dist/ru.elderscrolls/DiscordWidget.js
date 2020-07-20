// Discord widget
// Только для зарегистрированных пользователей

if (wgUserName) {
    
    function getDiscordHtml(width, height) {
        width = width || '100%';
        height = height || '300'
        var DiscordHtml = '<div style="margin-bottom: 5px;"><iframe src="https://discordapp.com/widget?id=195040343337467906&theme=dark" width="' + width + '" height="' + height + '" allowtransparency="true" frameborder="0"></iframe></div>';
        return DiscordHtml;
    }
    var isNews = wgNamespaceNumber === 500;
    
    if (!isNews) {
        $('#WikiaRail').prepend(getDiscordHtml());
    }
    // Добавление виджета в блок #rutes-discord
    if ($('#rutes-discord').length) {
        var width = $('#rutes-discord').data('width'),
            heigth = $('#rutes-discord').data('heigth');
        $('#rutes-discord').html(
            getDiscordHtml(width || '100%', heigth || '100%')
        );
    }
}