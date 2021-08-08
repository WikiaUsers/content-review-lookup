/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */
window.MassCategorizationGroups = ['sysop', 'content-moderator', 'bot'];

window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'JrfX3xVVTJ',
    prependToRail: true
};

// INÍCIO: JavaScript para colocar a predefinição de justificativa de uso justo dentro da caixa de resumo em [[Special:Upload]]. Criado e codificado por "[[wikipedia:User:Pinky49]]", especialmente para a [[wikia:c:cdnmilitary|Duty & Valour]].
 
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '{{Razão do uso justo \n|Descrição        = \n |Fonte            = \n |Parte            = \n |Propósito        = \n |Resolução        = \n |Substituível     = \n |Outros detalhes  = \n }}'
;
	}
});
 
// ****** FIM: JavaScript for [[Special:Upload]] ******