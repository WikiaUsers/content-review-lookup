/*Кнопки на верхней панели. Взято с ca.dragonball.wikia.com, оригинальный автор — ShermanTheMythran с Animal Crossing Wiki*/
if(mw.config.get('wgPageName') != 'Dragon_Ball_Вики')
{
	$('.WikiaHeader').append('<span id="button-hub" style="position: fixed; top: 0; left: 60%; margin-top: -7px; transition: margin .5s; -moz-transition: margin .5s; -webkit-transition: margin .5s; -o-transition: margin .5s;"><span class="button" id="scroll-top" title="Наверх" style="border-radius: 0 0 0 100% / 0 0 0 10px; -moz-border-radius: 0 0 0 100% / 0 0 0 10px; -webkit-border-radius: 0 0 0 100% / 0 0 0 10px;">▲</span>' + '<span class="button" id="scroll-bottom" title="Вниз" style="border-radius: 0 0 100% 0 / 0 0 10px 0; -moz-border-radius: 0 0 100% 0 / 0 0 10px 0; -webkit-border-radius: 0 0 100% 0 / 0 0 10px 0;">▼</span>');
	 
	$('#scroll-top, .scroll-top').click(function() { $('html, body').animate({scrollTop:0}, 'slow') });
	 
	$('#scroll-bottom, .scroll-bottom').click(function() { $('html, body').animate({scrollTop:$(document).height()}, 'slow') });
}

/* Подчёркивание утверждения при наведении на сноску (Шаблон:Ref) */
$(".ref-template .reference").hover(
  function ()
  {
    $(this).parent().addClass('ref-underline');
  }, 
  function ()
  {
    $(this).parent().removeClass('ref-underline');
  }
);