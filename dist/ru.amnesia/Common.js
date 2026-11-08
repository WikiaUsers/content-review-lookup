$(function () {
    var intervaleditCount = setInterval(editcountcalc, 500)
    function editcountcalc(){
    if ($(".user-identity-stats li:first-child strong").length && $('#userProfileApp').length && mw.config.get('wgAction') === 'view') {
        clearInterval(intervaleditCount)
        var editCount = $(".user-identity-stats li:first-child strong").text();
        var title = '';
        if (editCount <= 100) {
            title = "Потерявший память";
        } else if (editCount > 100 && editCount <= 1000) {
            title = "Инженер свинолюдей";
        } else if (editCount > 1000 && editCount <= 3000) {
            title = "Искатель масел";
        } else if (editCount > 3000 && editCount <= 6000) {
            title = "Странник Неведомого";
        } else if (editCount > 6000 && editCount <= 10000) {
            title = "Выживший в Бункере";
        } else {
            title = "Хранитель Сфер";
        }
        $('<span />', {
            class: 'user-identity-header__tag',
            text: title
        }).appendTo('.user-identity-box__info .user-identity-header__attributes');
    }
}
});