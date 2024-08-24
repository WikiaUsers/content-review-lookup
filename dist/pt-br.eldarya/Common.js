/* C�digos JavaScript colocados aqui ser�o carregados por todos aqueles que acessarem alguma p�gina desta wiki */

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// Discord Banner
window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'xkSFpVP',
    prependToRail: true
};

/* Tooltips */
var tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: false,
    events: ['CustomEvent'],
    noCSS: true
};

/* Alerta de Spoiler */
window.SpoilerAlertJS = {
    question: 'Essa �rea cont�m spoilers. Gostaria de visualizar mesmo assim?',
    yes: 'Sim',
    no: 'N�o',
    fadeDelay: 1600
};

/* Categoriza��o em massa */
window.MassCategorizationGroups = ['sysop', 'content-moderator'];

/* Identifica��o de usu�rios espec�ficos */
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
        'Leoliver': 'Administrador',
        'Ocllinsy': 'Moderadora',
        'Yukinan': 'Moderadora',
        'SugarBoy3': 'Reversor',
		'HimoryWoods': 'Moderador',
		'FunnyWolfie': 'Moderadora'
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
    }).text('Eldarya � um jogo da empresa Beemoov. A Wiki Eldarya � um site independente feito por f�s e para f�s, sem fins lucrativos. As imagens s�o majoritamente provenientes do jogo.')
    .appendTo('.WikiaArticle');
}