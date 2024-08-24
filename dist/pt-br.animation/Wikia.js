/* Não modificar, galeria */
$(function() {
$('.wikinav2
.WikiaPageHeader >
.comments')
.before('<a class="button secondary photogallery" href="/wiki/Galeria:'+encodeURIComponent(wgPageName) +'" title="Ir para a galeria de imagens"><img src="http://images4.wikia.nocookie.net/animation/pt-br/images/e/e2/Photogallery.png" style="height:20px; vertical-align:middle;"/>Galeria</a>');
$('.wikinav2
.WikiaPageHeader >
.comments')
.before('<a class="button secondary articlegallery" href="/wiki/'+encodeURIComponent(wgTitle) +'"title="Voltar ao artigo principal"><img src="http://images1.wikia.nocookie.net/animation/pt-br/images/d/d6/Voltar.gif "style="height:20px; vertical-align:middle;"/>Voltar</a>');
});