// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var wgPageName = mw.config.get( 'wgPageName' );

if (($('#ca-addsection').length > 0) && (($('.editButtons').length > 0)) 
    || (wgPageName == 'Terraria_Wiki:Admin_noticeboard') || (wgPageName == 'Terraria_Wiki:Avisos_�_administra��o')){
$('.editCheckboxes').css('margin-bottom','5px');
var addSigTooltip = 
    'Clique no final do seu coment�rio e, em seguida, clique neste link para adicionar sua assinatura.';
var addSigText = '<div style="border:1px #ccc solid; width:95%; padding:10px;"> ' +
    'Quando voc� terminar de digitar seu coment�rio, ' + 
    'por favor coloque o cursor no final do seu coment�rio e ent�o ' +
    '<a style="font-weight:bold;" href="#ggg" class="addSig" title="' + addSigTooltip + '">' +
    'clique aqui para adicionar sua assinatura</a>. <br/>' + 
    '<span style="font-size:90%">Sua assinatura ser� exibida como &quot;&#126;&#126;&#126;&#126;&quot;, ' +
    'que se transformar� automaticamente em seu nome e data quando voc� clicar no bot�o &quot;salvar altera��es&quot;.</span></div>';
$('#editpage-copywarn').before(addSigText);
$('.addSig').click(function(){
		    var caretPos = document.getElementById('wpTextbox1').selectionStart;
		    var textAreaTxt = $("#wpTextbox1").val();
		    var txtToAdd = ' ~' + '~' + '~' + '~';
		    $('#wpTextbox1').val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
});
}