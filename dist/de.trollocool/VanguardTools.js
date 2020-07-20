var i18n = {
    en: {
        infoboxes:'Infoboxes',
        templates:'Templates',
        sitecss:'Site CSS',
        personalcss:'My CSS',
        themescss:'Themes CSS',
        admins:'Admins',
        wikifeatures:'Wiki Features'
    },
    de: {
        infoboxes:'Infoboxen',
        templates:'Vorlagen',
        sitecss:'Wikia CSS',
        personalcss:'Mein CSS',
        themescss:'Themes CSS',
        admins:'Administratoren',
        wikifeatures:'Wiki-Funktionen'
    },
    fr: {
        infoboxes:'Infoboxes',
        templates:'Modèles',
        sitecss:'CSS du Site',
        personalcss:'Mon CSS',
        themescss:'CSS du thème',
        admins:'Administrateurs',
        wikifeatures:'Composants de Wiki',
    },
    es: {
         infoboxes:'Infoboxes',
         templates:'Plantillas',
         sitecss:'CSS del sitio',
         personalcss:'Mi CSS',
         themescss:'Temas CSS',
         admins:'Admins' ,
        wikifeatures:'Funcionalidades de Wiki'
    }
},lang= mw.config.get('wgUserLanguage');

$('.wds-global-navigation__user-menu .wds-list > li:first')
    .before('<li><a href="/wiki/Special:ListUsers/sysop" class="wds-global-navigation__dropdown-link">'+i18n[lang].admins+'</a></li>', '<li><a href="/wiki/Special:Templates?type=infobox" class="wds-global-navigation__dropdown-link">'+i18n[lang].infoboxes+'</a></li>', '<li><a href="/wiki/Special:Templates?type=unknown" class="wds-global-navigation__dropdown-link">'+i18n[lang].templates+'</a></li>', '<li><a href="/wiki/Special:CSS" class="wds-global-navigation__dropdown-link">'+i18n[lang].sitecss+'</a></li>', '<li><a href="/wiki/MediaWiki:Themes.css?action=edit" class="wds-global-navigation__dropdown-link">'+i18n[lang].themescss+'</a></li>', '<li><a href="/wiki/Special:MyPage/wikia.css" class="wds-global-navigation__dropdown-link">'+i18n[lang].personalcss+'</a></li>', '<li><a href="/wiki/Special:WikiFeatures" class="wds-global-navigation__dropdown-link">'+i18n[lang].wikifeatures+'</a></li>');