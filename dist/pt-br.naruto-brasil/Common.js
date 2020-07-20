/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:ListFiles/code.js',
        'MediaWiki:Common.js/FixMultipleUpload.js',
        'u:dev:PurgeButton/code.js',
        'MediaWiki:Common.js/SigReminder.js',
        'u:sims:User:Lost Labyrinth/general/quicklicense.js',
        'u:dev:ArchiveTool/code.js',
        'MediaWiki:Common.js/FairUseUpload.js',
        'u:dev:ShowHide/code.js',
        'u:dev:ReferencePopups/code.js',
        'MediaWiki:Common.js/displayTimer.js',
        'u:dev:View_Source/code.js',
        'u:dev:SocialIcons/code.js',
        'u:dev:UserTags/code.js',
    ]
});

// Ferramenta de Arquivo
var archiveListTemplate = 'ArchiveList';
var archivePageTemplate = 'ArchivePage';
 

/* Recarregamento de Páginas Automaticamente */
AjaxRCRefreshText = 'Automaticamente recarregar a página a cada 60segs';
AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity", "Especial:Páginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:Páginas_novas", "Especial:Contribuições"];
importScriptPage('AjaxRC/code.js', 'dev');


// Importar conteúdo
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:ListFiles/code.js',
        'MediaWiki:Common.js/FixMultipleUpload.js',
        'u:dev:PurgeButton/code.js',
        'MediaWiki:Common.js/SigReminder.js',
        'u:sims:User:Lost Labyrinth/general/quicklicense.js',
        'u:dev:ArchiveTool/code.js',
        'MediaWiki:Common.js/FairUseUpload.js',
        'u:dev:ShowHide/code.js',
        'u:dev:ReferencePopups/code.js',
        'MediaWiki:Common.js/displayTimer.js',
        'u:dev:View_Source/code.js',
        'u:dev:SocialIcons/code.js',
        'u:dev:UserTags/code.js',
    ]
});
  

	/* Personalização de Botões */
 if (mwCustomEditButtons) {
 
/** Botão ū **/
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://i.imgur.com/qtWVLbV.png",
     "speedTip": "Adicionar o caractere ū",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
 
/** Botão ō **/
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://i.imgur.com/ggEG3fC.png",
     "speedTip": "Adicionar o caractere ō",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
/** Botão Referências **/
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://i.imgur.com/tDJoMl1.png",
     "speedTip": "Adicione o Capítulo Referente",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": "''Naruto'' capítulo 0, página 0"};
 
 /** Botão Wikipédia **/
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://i.imgur.com/2fVARP0.png",
     "speedTip": "Adicionar a Predefinição da Wikipedia",
     "tagOpen": "\{\{Wikipedia|",
     "tagClose": "\}\}",
     "sampleText": "Título do Artigo"};
 
 
/** Botão de Redirecionamento **/
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://i.imgur.com/E7szkP9.png",
     "speedTip": "Adicionar um Redirecionamento",
     "tagOpen": "#REDIRECIONAMENTO [[",
     "tagClose": "]]",
     "sampleText": ""};

/** Botão de Personagem **/
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://i.imgur.com/BHhMEgN.png",
     "speedTip": "Adicionar a predefinição de Personagem",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Personagem\n|Nome e Outros = \n|Imagem = \n|Mangá = \n|Anime = \n|Filme = \n|Video Game = \n|OVA = \n|Aparece em = \n|Japonês = \n|Português = \n|Inglês = \n|Aniversário = \n|Sexo = \n|Espécie = \n|Idade = \n|Estado = \n|Altura = \n|Peso = \n|Tipo Sanguíneo = \n|Kekkei Genkai = \n|Kekkei Tōta = \n|Kekkei Mōra = \n|Jinchūriki = \n|Bijū = \n|Classificação = \n|Ocupação = \n|Afiliação = \n|Time = \n|Parceiro = \n|Clã = \n|Rank Ninja = \n|Registro Ninja = \n|Genin = \n|Chūnin= \n|Jōnin = \n|Traços Únicos = \n|Família = \n|Chakra = \n|Jutsu = \n|Equipamentos = \n"};
// PurgeButton
PurgeButtonText = 'Atualizar';
 
// Aviso "WikiRail .module"
$(document).ready(function() {
    var newSection = '<section id="activities">' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Aviso}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});
 
// Etiquetas de usuários
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { u: 'Inativo' },
	}
};
 
UserTagsJS.modules.inactive = {
	days: 31,
	namespaces: [0],
	zeroIsInactive: false
};
UserTagsJS.modules.newuser = false

};
 
// Automatically uncheck "Leave a redirect behind" on files
 if (wgPageName.indexOf("Special:MovePage/File:") != -1) {
  $('input[name=wpLeaveRedirect]').attr('checked', false);
 }
 
// <span class="insertusername"></span>
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) {return;}
    var n = document.getElementsByClassName('insertusername');
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);
 
/* Substitui {{Nome de Usuário}} com o nome do usuário que visitar a página. Requer a cópia: Predefinição:NOMEDOUSUÁRIO. */  
 
function UserNameReplace() { if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; $("span.insertusername").html(wgUserName); } addOnloadHook(UserNameReplace);