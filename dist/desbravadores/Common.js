/* Any JavaScript here will be loaded for all users on every page load. */
//$("li.marked").hide();

function link_busca(){
  $("#_lk_busca").attr("href","http://desbravadores.wikia.com/wiki/index.php?search="+$("#_busca").val()+"&fulltext=Search");
  $("#_lk_acessa").attr("href","http://desbravadores.wikia.com/wiki/"+$("#_busca").val());
}

$(document).ready(function(){
  $("#WikiaTopAds").hide();

  $("#_form").html("")
  $("#_form").html($("#_form").html()+"<input id='_busca' type='text' name='search' placeholder='Pesquisar em Desbravadores Wiki' autocomplete='on' accesskey='f' value='' onChange='link_busca();' onBlur='link_busca();' onkeyup='link_busca();'>");
  $("#_form").html($("#_form").html()+"<a href='' class='wikia-button' id='_lk_busca'>Buscar</a>");
  $("#_form").html($("#_form").html()+"<a href='' class='wikia-button' id='_lk_acessa'>Acessar</a>");  
  $("#_form").html($("#_form").html()+"<a href='/wiki/Special:CreatePage' data-id='createpage' class='createpage wikia-button' style='margin-left:5px;'>Novo Artigo</a>");

  $(".botao_novo_artigo").html("<a href='/wiki/Special:CreatePage' data-id='createpage' class='createpage wikia-button' style='float:right;'>Novo Artigo</a>")
})