// Espaços do Fórum
$(function(){
  $(".Forum .DiscussionBox input[type=text], .message-topic input[type=text]").attr('placeholder', 'Adicionar uma categoria (opcional)');
  $(".Forum .DiscussionBox input[type=editarea], .MiniEditorWrapper .editarea .cke_source, .MiniEditorWrapper .editarea textarea").attr('placeholder', 'Sobre o que você quer falar?');
  $(".Forum .DiscussionBox textarea[type=title], .Forum .DiscussionBox textarea.title").attr('placeholder', 'Título');
 
$(".new-reply .MiniEditorWrapper").last().before("<center><small>Antes de postar sua resposta, verifique-a se está nos padrões com o <a href='/wiki/One_Piece_Wiki:Uso_do_Fórum'>uso do fórum.</small></center>");
 $(".ForumNewMessage .heading").after("<center><small>Antes de postar um novo tópico, por favor, verifique que ele está seguindo o <a href='/wiki/One_Piece_Wiki:Uso_do_Fórum'>uso do Fórum.</center>");
  $('textarea.title').attr('maxlength','125');
});
 
// Botão de Dados
if ( mw.config.get( 'wgPageName' ) === 'Quadro:Debate_de_Batalhas' || mw.config.get( 'wgPageName' ) === 'Quadro:Debate_de_Batalhas_Crossover' ) {
   $('.Forum .DiscussionBox .speech-bubble-buttons').append('<button onclick="copiarModelo(\'#modeloForum\')" style="margin-right: 10px;">Dados (Pressione CTRL+V ao clicar)</button>');
   $('.Forum .board-description').append('<p id="modeloForum" style="display: none;"/>');
 
    function copiarModelo(element) {
   var $temp = $("<input>");
   $("body").append($temp);
   $temp.val($(element).text()).select();
   document.execCommand("copy");
   $temp.remove();
    }
 
 
   $("#modeloForum").text("'''Local:'''<br>'''Intenção:'''<br>'''Distância:'''<br>'''Condições:'''<br>'''Conhecimento:'''<br>'''Restrições:'''<br>'''Mídias:'''");
}