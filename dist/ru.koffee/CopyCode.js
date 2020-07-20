/**
 * Используется в [Кофейном сарайчике](w:c:ru.koffee) для работы шаблона {{Установка}}.
 * @Kofirs2634
 */

$(function() {
    if (!$('#copy-script')) return;
    
    $('#copy-script').click(function() {
        $('#mw-content-text').append($('<textarea>', {
            id: 'code-temp',
            rows: 10,
            text: $('#script-code').text().substr(1)
        }));
        $('#code-temp').select();
        var state = document.execCommand('copy');
        $('#code-temp').remove();
        if (state) return new BannerNotification('Код импорта успешно скопирован!', 'confirm', null, 10000).show()
        else return new BannerNotification('Возникла ошибка. Возможно, вам придется попробовать еще.', 'error', null, 10000).show()
    })
})