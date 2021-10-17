// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var wgPageName = mw.config.get( 'wgPageName' );

if (($('#ca-addsection').length > 0) && (($('.editButtons').length > 0)) 
    || (wgPageName == 'Terraria_Wiki:Portail de l\'administration') || (wgPageName == 'Terraria_Wiki:Portail de la communauté')){
$('.editCheckboxes').css('margin-bottom','5px');
var addSigTooltip = 
    'Cliquez à la fin de votre commentaire, puis cliquez sur ce lien pour ajouter votre signature.';
var addSigText = '<div style="border:1px #ccc solid; width:95%; padding:10px;"> ' +
    'Lorsque vous avez terminé d\'écrire votre commentaire, ' + 
    'veuillez placer le curseur à la fin de votre commentaire et ' +
    '<a style="font-weight:bold;" href="#ggg" class="addSig" title="' + addSigTooltip + '">' +
    'cliquez-ici pour ajouter votre signature</a>. <br/>' + 
    '<span style="font-size:90%">Votre signature s\'affichera en tant que &quot;&#126;&#126;&#126;&#126;&quot;, ' +
    'qui se transformera automatiquement en votre nom et la date lorsque vous cliquez sur le bouton &quot;enregistrer&quot;.</span></div>';
$('#editpage-copywarn').before(addSigText);
$('.addSig').click(function(){
		    var caretPos = document.getElementById('wpTextbox1').selectionStart;
		    var textAreaTxt = $("#wpTextbox1").val();
		    var txtToAdd = ' ~' + '~' + '~' + '~';
		    $('#wpTextbox1').val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
});
}