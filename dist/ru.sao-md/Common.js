/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
// Добавление к внешним ссылкам автоматическое открытие в новой вкладке
$(function() {
    if ($('.link-external').length) {
        $('.link-external').attr('target','_blank');
    }
    if ( $('.user-link').length )
         $('.user-link a').attr('target', '_blank');
});