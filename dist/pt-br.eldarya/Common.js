/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */

/* Tooltips */
var tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: false,
    events: ['CustomEvent'],
    noCSS: true,
}

/* Alerta de Spoiler */
window.SpoilerAlertJS = {
    question: 'Essa área contém spoilers. Gostaria de visualizar mesmo assim?',
    yes: 'Sim',
    no: 'Não',
    fadeDelay: 1600
};

/* Categorização em massa */
window.MassCategorizationGroups = ['sysop', 'content-moderator'];

/* WAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Replaces {{USERNAME}} with the name of the user browsing the page. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* Identificação de usuários específicos */
window.MessageWallUserTags = {
    tagColor: '#00aebb',
    txtSize: '10px',
    glow: false,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'KouHime': 'Fundadora',
        'Calaglinn': 'Administradora',
        'Leoliver': 'Moderador',
        'Ocllinsy': 'Moderadora',
        'Yukinan': 'Moderadora',
        'SugarBoy3': 'Reversor',
        'SykiMin': 'Miss Wiki'
    }
};

/* Disclaimer */
/* Code from fr.lego.wikia.com/wiki/MediaWiki:Common.js; Saw in Wiki Eldarya FR */
if ($.inArray(wgNamespaceNumber, [ 0, 1, 4, 5, 6, 7, 14, 15, 110, 111, 400, 401, 500, 502, 503, -1 ] ) !== -1) {
    $('<div />', { 
        'class': 'legaldisclaimer',
        css: {
            padding: '2px 5px',
            marginTop: '1em',
            clear: 'both',
            fontSize: '85%',
            border: '1px solid #00c6d4',
            color: '#00c6d4',
            borderRadius: '8px',
            textAlign : 'center',
        }
    }).text('Eldarya é um jogo da empresa Beemoov. A Wiki Eldarya é um site independente feito por fãs e para fãs, sem fins lucrativos. As imagens são majoritamente provenientes do jogo.')
    .appendTo('.WikiaArticle');
}