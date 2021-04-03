/* Color de Usuarios */
window.highlightUsersConfig = {
    colors: {
        // 'group-name': 'color',
        'staff': mw.config.get('wgSassParams')["color-links"],
        'sysop': '#ff0000',
        'helper': '#bf6240',
        'soap': '#f77f77',
        'threadmoderator': '#4286f4',
        'content-moderator': '#23c8d2',
        'rollback': '#1eaf7a',
        'content-volunteer': '#ff7000',
        'bureaucrat': '#ffff00'
    },
    styles: {
        // 'group-name': 'styles',
        'sysop': 'font-weight: normal' ,
        'staff': 'font-weight: normal' ,
        'bureaucrat': 'font-weight: normal' ,
    }
};

// ... importArticles

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