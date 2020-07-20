/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

/* Configuração de Tags de Usuário */
window.UserTagsJS = {
	modules: {},
	tags: {
        /* Grupos de Usuários */
        founder: {u:'Fundador'},
        bureaucrat: {u:'Burocrata'},
        sysop: {u: 'Administrador'},
        rollback: {u: 'Reversor'},
        chatmoderator: {u: 'Moderador de Chat'},
        contentmoderator: {u: 'Moderador de Conteúdo'},
        threadmoderator: {u: 'Moderador de Discussões'},
        designer: {u: 'Designer'},
        newuser: {u:'Novo Editor'},
        inactive: {u: 'Inativo'},
        montheditor: {u: 'Editor do Mês'},
        revisor: {u: 'Revisor de Conteúdo'},
    }
};
 
/* Adicionar Tags */
UserTagsJS.modules.custom = {
	'Lucas D 77': ['designer', 'sysop'],
};

// Personalização de Botões
if (mwCustomEditButtons) {

    // Botão ū 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
        "speedTip": "Adicionar o caractere ū",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };

    // Botão ō
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
        "speedTip": "Adicionar o caractere ō",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };

    // Botão de Referência
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
        "speedTip": "Adicionar referência",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Digite o Conteúdo da referencia"
    };

    //Botão de Referências
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/QYofGTv.png",
        "speedTip": "Adicionar references",
        "sampleText": "<references/>"
    };

    //Botão da Infobox Personagens
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/FN9Rk3q.png",
        "speedTip": "Adicionar a Infobox Personagens",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Personagens\n|nome = \n|imagem = \n|nomej = \n|nomer = \n|nomep = \n|familia = \n|primeira = \n|afiliac = \n|cargo = \n|alcunha = \n|idade = \n|niver = \n|altura = \n|nomeanm = \n|nomeanm_p = \n|tipo = \n|terranatal = \n|recomp = \n|seiyu = \n"
    };
    
    //Botão da Predefinição Akuma no Mi
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/svqYhcq.png",
        "speedTip": "Adicionar a Infobox Akuma no Mi ",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Akuma no Mi\n|nome = \n|imagem = \n|nomej = \n|nomer = \n|nomep = \n|sign = \n|primeira = \n|tipo = \n|comeu = \n|inimigo = \n"
    };
    
    //Botão da Infobox Episódios
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/TmQeL2p.png",
        "speedTip": "Adicionar a Infobox Episode Box",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Episode Box\n|Translation = \n|P = \n|# = \n|N = \n|Kanji = \n|Romaji = \n|Airdate = \n|Saga = \n|Arco = \n|Opening = \n|image = \n|Season = \n|Screen = \n|Art = \n|Ad = \n|Ed = \n|eyecatcher = \n|chapter = \n|rating = \n|rank = \n"
    };
    
    //Botão da Infobox Músicas
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/FDntbid.jpg?1",
        "speedTip": "Adicionar a Infobox Músicas",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Músicas \n|title1 = \n|image1 = \n|caption1 = \n|nome_japonês: = \n|nome_romanizado: = \n|significado: = \n|cantor_e_banda: = \n|tempo: = \n|duração: = \n|episódios_usados: = \n|abertura_anterior: = \n|abertura_seguinte = \n"
    };
    
    //Botão da Infobox Capítulos
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/xKevL8O.png",
        "speedTip": "Adicionar a Infobox Capítulos",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Capítulos\n|title = \n|image = \n|jname = \n|rname = \n|ename = \n|page = \n|date = \n|date2 = \n "
    };
    
    //Botão da Infobox Volume Box
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/PY2u1Xi.png",
        "speedTip": "Adicionar a Infobox Volume Box",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Volume Box\n|title = \n|image = \n|chapters = \n|jname = \n|rname = \n|ename = \n|page = \n|date = \n|isbn = \n"
    };
    
    //Botão da Infobox Navios
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/027VdEr.png",
        "speedTip": "Adicionar a Infobox Navios",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Navios\n|imagem = \n|nomej = \n|nomer = \n|nomeoc = \n|seiyu =\n|pertence = \n|const = \n|primeira = \n|ultima = \n"
    };
    
    //Botão da Infobox Organizações
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/n39dgmR.png",
        "speedTip": "Adicionar a Infobox Organizações",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Organizações \n|nome = \n|imagem = \n|nomej = \n|nomer = \n|nomep = \n|primeira = \n|lider = \n|afiliac = \n|qmembros = \n|qnavios = \n|terranatal = \n|recomp = \n|pinimigos = \n"
    };
    
    //Botão da Infobox Lugares
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/86kGMBS.png",
        "speedTip": "Adicionar a Infobox Lugares",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Lugares \n|imagem = \n|nomej = \n|nomer = \n|nomep = \n|primeira = \n|região = \n|afiliac = \n|população = \n"
    };
    
    //Botão da Infobox Jogos
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://i.imgur.com/c98ljT5.png",
        "speedTip": "Adicionar a Infobox Jogos",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Jogos|title1 = \n|image1 = \n|caption1 = \n|nome_japonês = \n|nome_romanizado: = \n|nome_oficial_em_português: = \n|desenvolvedor: = \n|editor: = \n|data_de_publicação: = \n|plataforma: = \n|genero: = \n"
    };
}

// =====================================
//        Variables for functions
// =====================================
// Ajax auto-refresh
ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity', 'Special:Watchlist', 'Special:Log', 'Special:Contributions', 'Special:NewFiles', 'Special:AbuseLog'];
AjaxRCRefreshText = 'Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

//ArchiveTool
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archived Talk Tabs',
   archivePageTemplate: 'Archived Talk Tabs',
   archiveSubpage: 'Archive',
   userLang: true
};

// Expand All
var expandAllFlag = 0;
var $expandAll = $('.expandAll a');
$('.expandAll a').click(function(){
    if (expandAllFlag == 0){
        $('.mw-collapsible .mw-collapsible-toggle-collapsed').click();
        expandAllFlag = 1;
        $expandAll.text('Collapse All');
    } else {
        $('.mw-collapsible .mw-collapsible-toggle-expanded').click();
        expandAllFlag = 0;
        $expandAll.text('Expand All');
    }
});

// =====================================
//                Imports
// =====================================

// See MediaWiki:ImportJS