(function ($, mw) {
    'use strict';

    if (window.TopNoticeLoaded) {
        return;
    }
    window.TopNoticeLoaded = true;

    // Récupérer le contenu d'une page MediaWiki
    function fetchPageContent(pageTitle, callback) {
        const api = new mw.Api();
        api.get({
            action: 'parse',
            page: pageTitle,
            format: 'json'
        }).done(function (data) {
            if (data.parse && data.parse.text) {
                callback(data.parse.text['*']);
            }
        });
    }

    // Insérer le contenu avant .page-header
    function insertContentAfterPageHeader(content) {
        if (content) {
            const $pageHeader = $('.page-header');
            if ($pageHeader.length > 0) {
                const $topNotice = $('<div>', {
                    id: 'top_notice',
                    html: content
                });
                $pageHeader.after($topNotice);
            }
        }
    }

    // Initialisation de la fonction
    function init() {
        const pageTitle = 'MediaWiki:Custom-TopNotice'; 
        
        fetchPageContent(pageTitle, insertContentAfterPageHeader);
    }

    // Exécution
    $(document).ready(init);
})(jQuery, mediaWiki);