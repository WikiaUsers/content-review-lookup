importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:FixAdminKick/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js'
    ]
});

//adds link to Chat rules
$(window).bind("load", function () {
    var link = '<a class="wds-button wds-is-secondary wds-is-squished chat-toolbar__button" title="RèglementChat" href="https://fairy-tail.fandom.com/fr/wiki/Fairy_Tail_Wiki:R%C3%A8glement_du_Tchat" target="_blank">Règles du tchat</a>'
    $('.wds-button-group').first().append(link);
});