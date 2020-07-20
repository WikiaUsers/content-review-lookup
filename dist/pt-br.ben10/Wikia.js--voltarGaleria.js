/* botao "Voltar" nas novas galerias */
$(function() {
  $('.wikinav2 .WikiaPageHeader > .comments').before('<a class="button" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Voltar ao artigo">Voltar</a>');
});