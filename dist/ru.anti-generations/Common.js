/* Авторы Anti Sonic Forces и Arhhhat. Брать без разрешения Anti Sonic Forces запрещено! */
$(function () {
    var intervaleditCount = setInterval(editcountcalc, 500)
    function editcountcalc(){
    if ($(".user-identity-stats li:first-child strong").length && $('#userProfileApp').length && mw.config.get('wgAction') === 'view') {
        clearInterval(intervaleditCount)
        var editCount = $(".user-identity-stats li:first-child strong").text();
        var title = '';
        if (editCount <= 100) {
            title = "Котёнок/Волчонок";
        } else if (editCount > 100 && editCount <= 1000) {
            title = "Оруженосец";
        } else if (editCount > 1000 && editCount <= 3000) {
            title = "Воитель";
        } else if (editCount > 3000 && editCount <= 6000) {
            title = "Старший Воитель";
        } else if (editCount > 6000 && editCount <= 10000) {
            title = "Глашатай";
        } else {
            title = "Старейшина";
        }
        $('<span />', {
            class: 'user-identity-header__tag',
            text: title
        }).appendTo('.user-identity-box__info .user-identity-header__attributes');
    }
}
});