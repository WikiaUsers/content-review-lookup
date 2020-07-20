/* Color de Usuarios */
window.highlightUsersConfig = {
    colors: {
        // 'group-name': 'color',
        'sysop': '#ff0000',
        'staff': '#da0da0',
        'rollback': '#00bfff',
        'bot': '#5f5ese',
        'chatmoderator': '#01ff5f',
        'threadmoderator': '#800080',
        'bureaucrat': '#ffff00',
    },
    styles: {
        // 'group-name': 'styles',
        'sysop': 'font-weight: normal' ,
        'staff': 'font-weight: normal' ,
        'bureaucrat': 'font-weight: normal' ,
    }
};

/* Botones sociales */
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px",
	wikiTwitterAccount: "wikia_es"
};
importScriptPage('SocialIcons/code.js','dev');
importScript("MediaWiki:Parallax.js");