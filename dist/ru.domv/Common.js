/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/*Рамка администраторов*/
setInterval(function () {
	$('.wds-avatar a[href$="Arhhhat"]').closest('.Reply, .Reply_body__PM9kM').addClass('Arhhhat');
}, 500 );

/*Обложки на заглавной*/
$(function(){
	function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var url = "https://domv.fandom.com/ru/wiki/Шаблон:Издания/data #editions"+ getRandomInt(1, 18);

$('#editionscontent').load(url);
});

/*Блок групп*/
$('.flock a').each(function(){
$(this).removeAttr('title');
});

/*Discord  Spoiler >.<*/
$(function(){
    $('.discordspoiler').each(function(){
        $(this).click(function() {
            $(this).addClass('discordspoileropen');
            $(this).removeClass('discordspoiler');
        });
    });
});