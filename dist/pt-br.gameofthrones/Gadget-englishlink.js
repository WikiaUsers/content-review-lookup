// adiciona o link original em ingl�s para a wiki americana, por raz�es de t�tulo e tradu��es que fogem da palavra original
$(function() {
    if($('#enTitle').length > 0 && !mw.config.get('wgIsMainPage')) {
        console.log($('#enTitle'));
        $('#enTitle').clone().appendTo('.page-header__main').css('display', 'block');
    }
});