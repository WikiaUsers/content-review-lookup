/* C�digos JavaScript colocados aqui ser�o carregados por todos aqueles que acessarem alguma p�gina desta wiki */
window.MassCategorizationGroups = ['sysop', 'content-moderator', 'bot'];

window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'JrfX3xVVTJ',
    prependToRail: true
};

// IN�CIO: JavaScript para colocar a predefini��o de justificativa de uso justo dentro da caixa de resumo em [[Special:Upload]]. Criado e codificado por "[[wikipedia:User:Pinky49]]", especialmente para a [[wikia:c:cdnmilitary|Duty & Valour]].
 
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '{{Raz�o do uso justo \n|Descri��o        = \n |Fonte            = \n |Parte            = \n |Prop�sito        = \n |Resolu��o        = \n |Substitu�vel     = \n |Outros detalhes  = \n }}'
;
	}
});
 
// ****** FIM: JavaScript for [[Special:Upload]] ******