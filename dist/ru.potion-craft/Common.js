/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
$(function(){
$('.recipetoggler').click(function() {
    if ($(this).hasClass('changed')) {
    $(this).closest('.recipe').removeClass('recipecircle')
    $(this).closest('.recipe').addClass('recipesq')
    $(this).removeClass('changed')
    } else {
    $(this).addClass('changed')
    $(this).closest('.recipe').removeClass('recipesq')
    $(this).closest('.recipe').addClass('recipecircle')
    }
});
});