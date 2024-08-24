/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
importScriptPage('MediaWiki:Translator/Translator.js', 'dev');
AjaxRCRefreshText = 'Automaticamente recarregar a página a cada 60segs';
AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
ajaxPages = [
    "Especial:Mudanças_recentes",
    "Especial:WikiActivity",
    "Especial:Páginas_vigiadas",
    "Especial:Registro",
    "Especial:Arquivos_novos",
    "Especial:Lista_de_arquivos",
    "Especial:Páginas_novas",
    "Especial:Contribuições"
];

/****************************************/ 
/* Etiqueta personalizada para usuários */ 
/****************************************/ 
function addMastheadTags() {
    var rights = {};
        user;
        
    rights["Returneed"] = ["Padrinho","Consultor", "Administrador Chefe"];
    rights["IrkonBR"]   = ["Fundador","Consultor","Sócio Majoritário"];

    if (wgCanonicalSpecialPageName == "Contributions") {
        user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        user = wgTitle;
    }
    
    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();
        for (var i = 0, len = rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] + 
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
}

$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});

importArticles({
	type: 'script',
	articles: [
        'u:dev:AjaxRC/code.js',
		'u:dev:DisplayClock/code.js',
        'u:dev:TopEditors/code.js'
	]
},{
    type: "style",
    articles: [
        "w:c:dev:FontAwesome/code.css"
    ]
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});