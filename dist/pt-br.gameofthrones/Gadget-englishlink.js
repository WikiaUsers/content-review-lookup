// adiciona o link original em inglês para a wiki americana, por razões de título e traduções que fogem da palavra original
$(function() {
    if($('#enTitle').length > 0 && !mw.config.get('wgIsMainPage')) {
        console.log($('#enTitle'));
        $('#enTitle').clone().appendTo('.page-header__main').css('display', 'block');
    }
});