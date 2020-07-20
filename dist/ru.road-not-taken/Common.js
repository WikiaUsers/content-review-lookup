/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// Добавление к ссылке автоматическое открытие в новой вкладке
$(function() {
    if ($('.link-external').length) {
        $('.link-external').attr('target','_blank');
    }
    if ($('.goBlank').length) {
        $('.goBlank a').attr('target','_blank');
    }
});