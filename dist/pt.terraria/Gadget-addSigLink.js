// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var wgPageName = mw.config.get( 'wgPageName' );

if (($('#ca-addsection').length > 0) && (($('.editButtons').length > 0)) 
    || (wgPageName == 'Terraria_Wiki:Admin_noticeboard') || (wgPageName == 'Terraria_Wiki:Avisos_à_administração')){
$('.editCheckboxes').css('margin-bottom','5px');
var addSigTooltip = 
    'Clique no final do seu comentário e, em seguida, clique neste link para adicionar sua assinatura.';
var addSigText = '<div style="border:1px #ccc solid; width:95%; padding:10px;"> ' +
    'Quando você terminar de digitar seu comentário, ' + 
    'por favor coloque o cursor no final do seu comentário e então ' +
    '<a style="font-weight:bold;" href="#ggg" class="addSig" title="' + addSigTooltip + '">' +
    'clique aqui para adicionar sua assinatura</a>. <br/>' + 
    '<span style="font-size:90%">Sua assinatura será exibida como &quot;&#126;&#126;&#126;&#126;&quot;, ' +
    'que se transformará automaticamente em seu nome e data quando você clicar no botão &quot;salvar alterações&quot;.</span></div>';
$('#editpage-copywarn').before(addSigText);
$('.addSig').click(function(){
		    var caretPos = document.getElementById('wpTextbox1').selectionStart;
		    var textAreaTxt = $("#wpTextbox1").val();
		    var txtToAdd = ' ~' + '~' + '~' + '~';
		    $('#wpTextbox1').val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
});
}