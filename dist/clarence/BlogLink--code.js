/*
*Adds a link to both your Blog & your Contributions on the user drop-down menu on the top right
*Authors: Count of Howard & Ursuul
*Original Code by Ozank Cx: http://dev.wikia.com/wiki/MediaWiki:ContribsLink/code.js?oldid=46843
*/
$(function() {
    var mwVariables = mw.config.get([
        'wgUserLanguage',
        'wgUserName'
    ]);
 
    var i18n = {
        'en': {
            blog: "My Blog",
            contribs: "My Contributions"
        },
        'es': {
            blog: "Mi Blog",
            contribs: "Mis Contribuciones"
        },
        'fr': {
            blog: "Mon Blog",
            contribs: "Mes contributions"
        },
        'ko': {
            blog: "내 블로그",
            contribs: "기여 목록"
        },
        'zh': {
            blog: "我的博客",
            contribs: "我的貢獻"
        },
        'nl': {
            blog: "Mijn Blog",
            contribs: "Mijn bijdragen"
        },
        'pl': {
            blog: "Mój Blog",
            contribs: "Moje edycje"
        },
        'pt': {
            blog: "Meu Blog",
            contribs: "Minhas contribuições"
        },
        'pt-br': {
            blog: "Meu Blog",
            contribs: "Minhas contribuições"
        },
        'ru': {
            blog: "Мой блог",
            contribs: "Мои вклады"
        },
        'tr': {
            blog: "Bloğum",
            contribs: "Katkılarım"
        }
    };
    var lang = mwVariables.wgUserLanguage;
    var textContent = i18n.hasOwnProperty(lang) ? i18n[lang] : i18n.en;
 
    if ($('a[data-id="blog"]').length || $('a[data-id="contributions"]').length || !$('.wds-global-navigation__content-bar').length) {
        return;
    }
 
    $('.wds-global-navigation__user-menu div:nth-child(2) ul li:nth-child(2)').after('<li><a data-id="contributions" class="wds-global-navigation__dropdown-link" href="' + 
        mw.util.getUrl('Special:Contributions/' + mwVariables.wgUserName) + '">' + textContent.contribs + '</a></li>');
 
    $('.wds-global-navigation__user-menu div:nth-child(2) ul li:nth-child(2)').after('<li><a data-id="blog" class="wds-global-navigation__dropdown-link" href="' + 
        mw.util.getUrl('User_blog:' + mwVariables.wgUserName) + '">' + textContent.blog + '</a></li>');
});