$(function() {
    var mwVariables = mw.config.get([
        'wgUserLanguage',
        'wgUserName'
    ]);
 
    var i18n = {
        'en': {
            blog: "My Blog",
            contribs: "My Contributions",
            talk: "My Talk"
        },
        'zh': {
            blog: "我的博客",
            contribs: "我的贡献",
            talk: "我的讨论页"
        },
        'es': {
            blog: "Mi Blog",
            contribs: "Mis Contribuciones",
            talk: "Mis mensajes"
        },
        'fr': {
            blog: "Mon Blog",
            contribs: "Mes contributions",
            talk: "Mes messages"
        },
        'ko': {
            blog: "내 블로그",
            contribs: "기여 목록",
            talk: "내 토크"
        },
        'nl': {
            blog: "Mijn Blog",
            contribs: "Mijn bijdragen",
            talk: "Mijn Overleg"
        },
        'pl': {
            blog: "Mój Blog",
            contribs: "Moje edycje",
            talk: "Moja dyskusja"
        },
        'pt': {
            blog: "Meu Blog",
            contribs: "Minhas contribuições",
            talk: "Minhas mensagens"
        },
        'pt-br': {
            blog: "Meu Blog",
            contribs: "Minhas contribuições",
            talk: "Minhas mensagens"
        },
        'ru': {
            blog: "Мой блог",
            contribs: "Мои вклады",
            talk: "Обсуждение"
        },
        'ja': {
            blog: "私のブログ",
            contribs: "私の貢献",
            talk: "トーク"
        },
        'tr': {
            blog: "Bloğum",
            contribs: "Katkılarım",
            talk: "Benim Mesaj"
        }
    };
    var lang = mwVariables.wgUserLanguage;
    var textContent = i18n.hasOwnProperty(lang) ? i18n[lang] : i18n.en;
 
    if ($('a[data-id="blog"]').length || $('a[data-id="contributions"]').length || $('a[data-id="talk"]').length || !$('.wds-global-navigation__content-bar').length) {
        return;
    }
 
    $('.wds-global-navigation__user-menu div:nth-child(2) ul li:nth-child(2)').after('<li><a data-id="contributions" class="wds-global-navigation__dropdown-link" href="' + 
        mw.util.getUrl('Special:Contributions/' + mwVariables.wgUserName) + '">' + textContent.contribs + '</a></li>');
 
    $('.wds-global-navigation__user-menu div:nth-child(2) ul li:nth-child(2)').after('<li><a data-id="blog" class="wds-global-navigation__dropdown-link" href="' + 
        mw.util.getUrl('User_blog:' + mwVariables.wgUserName) + '">' + textContent.blog + '</a></li>');
 
    $('.wds-global-navigation__user-menu div:nth-child(2) ul li:nth-child(2)').after('<li><a data-id="talk" class="wds-global-navigation__dropdown-link" href="' + 
        mw.util.getUrl('User:' + mwVariables.wgUserName + '/Talk') + '">' + textContent.talk + '</a></li>');
});

window.BackToTopText = "返回顶部";
/* Scripts added here will run for all users on all page views */
$(function () {
    if ($('#forum-display').length) {
        $('#forum-display').insertBefore('#WikiaFooter');
    }
});