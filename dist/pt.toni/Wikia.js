/* Mensagem em vídeo em destaque */
//Pelo Usuário:Fngplg
$(function(){
    if ($('.featured-video__wrapper').length === 0) return;
    var banner = new BannerNotification();
    banner.setContent('O vídeo que você vê na parte superior deste artigo é fornecido pelo host, não pelos editores deste site. Seu conteúdo pode não representar com precisão o artigo.');
    banner.show();
});

/**** Tags de usuário customizadas ****/
window.UserTagsJS = {
    modules: {},
    tags: {
        rollback: 'Rollback',
		designadmin: { u:'Designer de Interface' },
		supervisor: { u:'Supervisor de Edição' }
    }
};

// Adicione grupos personalizados a vários usuários
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inativo, se não houver edições em 35 dias
UserTagsJS.modules.mwGroups = ['rollback'];
UserTagsJS.modules.custom = {
};
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
};

/**** Termina aqui ****/
/* Substitui {{USERNAME}} pelo nome do usuário que está navegando na página. 
   Requer copiar o modelo: USERNAME. */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* Fim da substituição do(a) {{USERNAME}} */

window.archiveListTemplate = 'Archive';

//Prévia do comentário
window.fng = $.extend(true, window.fng, {cp: (window.fng || {}).cp || {} });
window.fng.cp.throbber = 'https://vignette.wikia.nocookie.net/sonic/images/7/7c/AjaxRC.gif/revision/latest?cb=20170917141821';

/* Teste se um elemento tem uma determinada classe **************************************
 *
 * Descrição: usa expressões regulares e armazenamento em cache para melhor desempenho.
 * Extraído do Common.js da Wikipédia.
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

//Verificação de assinatura
var el ='~~' + '~~';
window.SignatureCheckJS = {
    noSignature: '1. Parece que você esqueceu de assinar sua resposta. Use '+ el +' para assinar.\n',
    epilogue: '2. Se você está apenas corrigindo sua postagem já assinada ou corrigindo um problema na página de discussão, não se preocupe com esta mensagem.'
};

    
// *********************************************
// Corrigindo miniaturas GIF estáticas
// *********************************************
window.DynamicImages = {
    gifGaleryImages: true,
    gifImages: false,
    svgGaleryImages: true
};

/**
 * Script TOC flutuante da Wowwiki
 */
 importArticles({
    type: 'script',
    articles: [
        'u:wowwiki:FloatingToc/code.js'
    ]
});

/**** Botões de categoria****/
if ($("#CategorySelectAdd").hasClass("wikia-button secondary add")) {
    $("#CategorySelectAdd").addClass("wds-is-squished wds-button");
    $("#CategorySelectCancel").addClass("wds-is-squished wds-button");
    $("#CategorySelectSave").addClass("wds-is-squished wds-button");
}
if ($('.categories').children('li').length >= 56) {
    document.getElementById('articleCategories').style.backgroundSize = "190%"; 
}

/**** Less ****/
/** Wikia.css **/
window.lessOpts = window.lessOpts || [];
window.lessOpts.push( {
    target: 'MediaWiki:Wikia.css',
    source: 'MediaWiki:Custom-wikia.less',
    load: [
        'MediaWiki:Wikia.css',
        'MediaWiki:Custom-wikia.less'
    ],
    header: 'MediaWiki:Custom-Css-header/common'
} );

//DiscussionsRailModule
window.discussionsModuleLoaded = mw.config.get('wgCanonicalSpecialPageName') === 'WikiActivity';