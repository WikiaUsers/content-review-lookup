/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */
window.MessageBlock = {
  title : 'Bloqueo',
  message : 'Si usted esta viendo este mensaje, eso significa que usted ha sido bloqueado por no seguir nuestras reglas locales o continuar infringiendo nuestras reglas, para apelar, comuníquese con nosotros en Community Central o solicite este mensaje, gracias'
};

// RevealAnonIP
 
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};

importArticles({    type: 'script',    articles: [        'u:dev:MediaWiki:AutoCreateUserPages.js','u:dev:MediaWiki:UTCClock/code.js','u:dev:MediaWiki:DraggableYouTubePlayer/code.js',    ]});

(function() {
    var config = mw.config.get(['wgNamespaceNumber', 'wgTitle']), i18n;
    if (config.wgNamespaceNumber !== 2 || config.wgTitle.indexOf('/') !== -1 || window.isLakeLinksLoaded) {
        return;
    }
    window.isLakeLinksLoaded = true;
    function makeButton(prefix, message) {
        return $('<a>', {
            'class': 'wds-is-squished wds-button lake-links-button lake-links-button-link lake-links-hoverable',
            href: mw.util.getUrl(prefix + config.wgTitle),
            text: i18n.msg(message).plain()
        });
    }
    function click() {
        $('.lake-links').fadeOut();
    }
    function init(i18nInit) {
        i18n = i18nInit;
        var user = config.wgTitle;
        $('#mw-content-text').append(
            $('<div>', {
                'class': 'lake-links'
            }).append(
                $('<div>').append(
                    makeButton('User:', 'user'),
                    makeButton('User talk:', 'talk'),
                    makeButton('User blog:', 'blog'),
                    makeButton('Special:Contributions/', 'contributions'),
                    $('<span>', {
                        'class': 'lake-links-button lake-links-close-button wds-is-squished wds-button lake-links-hoverable',
                        click: click,
                        text: 'X'
                    })
                )
            )
        );
    }
    function load(i18n) {
        i18n.loadMessages('LakeLinks').then(init);
    }
    mw.hook('dev.i18n').add(load);
    importArticles({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    }, {
        type: 'style',
        article: 'u:dev:MediaWiki:LakeLinks.css'
    });
})();