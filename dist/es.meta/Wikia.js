//<nowiki>
require(['jquery', 'mw', 'BannerNotification', 'wikia.ui.factory'], function ($, mw, BannerNotification, ui) {
    var conf = mw.config.get([
        'wgTitle',
        'wgNamespaceNumber'
    ]);

    window.LockOldBlogs = {
        expiryMessage: "Este blog se considera archivado ya que no ha sido comentado en 30 días, ¡por favor no comentes en este blog!"
    };

    (function () {
        var threadTitle = $('.page-header__title').text();
        // If it's not a forum thread or it's already marked as solved, it should return
        if (conf['wgNamespaceNumber'] !== 1201 || new RegExp(/^\[SOLUCIONADO\](.*)/, 'i').test(threadTitle) || !/sysop|content-moderator|content-volunteer|vstf|staff|helper/.test(mw.config.get('wgUserGroups').join())) {
            return;
        }
        // Prepends the "mark as solved" button
        $('.comments > li > .speech-bubble-message > .MiniEditorWrapper .buttons').prepend(
            $('<button>', {
                class: 'secondary solve-thread',
                text: 'Marcar como solucionado'
            }).click(function () {
                // Retrieves the message content
                $.nirvana.getJson('WallExternal', 'editMessage', {
                    msgid: conf['wgTitle'],
                    pagenamespace: 1201,
                }, function (d) {
                    // And posts to the server the new information
                    $.nirvana.postJson('WallExternal', 'editMessageSave', {
                            msgid: conf['wgTitle'],
                            // We fetched before the thred title from the page
                            newtitle: '[SOLUCIONADO] ' + threadTitle,
                            // thanks nirvana :-)
                            newbody: d.htmlorwikitext,
                            pagenamespace: 1201,
                            token: mw.user.tokens.get('editToken')
                        },
                        function () {
                            // All done! Showing a confirm banner and reloads the page 
                            new BannerNotification(
                                'Se renombró correctamente. Recargando página...',
                                'confirm',
                                $('.banner-notifications-placeholder')
                            ).show();
                            window.location.reload();
                        }
                    )
                });
            }));
    })();

    /* Importing CSS/JS customizations for specific pages */
    /** Recopilatorios del año **/
    if (wgNamespaceNumber === 500 && /\w+\/Recopilatorio\sde\s\d{4,}$/.test(conf['wgTitle'])) {
        importArticle({
            type: "style",
            article: "MediaWiki:Year-Recap.css"
        });
    }

    /* Interlanguage links in forum */
    (function () {
        if ($('#forum-display').exists()) {
            $('#forum-display').insertBefore('#WikiaFooter');
        }
    })()

    /* Añadir botones al editar artículo en modo normal */
    if (typeof (mwCustomEditButtons) != 'undefined') {
        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://vignette.wikia.nocookie.net/eswikia/images/1/18/Propose-delete.png?1",
            "speedTip": "Proponer el artículo para ser borrado",
            "tagOpen": "{{Borrar|",
            "tagClose": "}}",
            "sampleText": "Motivo",
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://vignette.wikia.nocookie.net/eswikia/images/6/6a/Insert-icon.png?1",
            "speedTip": "Insertar Plantilla Wiki",
            "tagOpen": "{{Wiki\r| wiki = ",
            "tagClose": "\r| logo = \r| descripción = \r| fundado = \r| fundador = \r| nombre_solicitado = \r| estado = \r}}",
            "sampleText": "",
        };
    }

    /**
     * Images waiting to be used
     *
     * - Original version by User:BranDaniMB
     * - Based in http://dev.wikia.com/wiki/LockOldBlogs
     * 
     * License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
    **/
    (function () {
        if (wgNamespaceNumber === 6 && (wgUserGroups.includes('staff') || wgUserGroups.includes('helper') || wgUserGroups.includes('vstf') || wgUserGroups.includes('sysop') || wgUserGroups.includes('content-moderator'))) {
            // Verify that the image belongs to the category
            if (wgCategories.includes("Imágenes en espera de uso")) {
                if (typeof expiredImage !== "object" || expiredImage === null) {
                    expiredImage = {};
                }
                if (typeof expiredImage.expiryDays !== "number") {
                    expiredImage.expiryDays = 7;
                }
                if (typeof expiredImage.expiryMessage !== "string") {
                    expiredImage.expiryMessage = "Esta imagen excedió el plazo fijado de <expiryDays> días.";
                }
                if (typeof expiredImage.nonExpiryMessage !== "string") {
                    expiredImage.nonExpiryMessage = "Esta imagen no ha excedido el plazo fijado de <expiryDays> días.";
                }
                if (typeof expiredImage.expiryCategory !== "string") {
                    expiredImage.expiryCategory = "Imágenes en espera de uso";
                }
                // it replaces <expiryDays> with its value in expiredImage.expiryDays and expiredImage.nonExpiryMessage
                expiredImage.expiryMessage = expiredImage.expiryMessage.replace(/<expiryDays>/g, expiredImage.expiryDays);
                expiredImage.nonExpiryMessage = expiredImage.nonExpiryMessage.replace(/<expiryDays>/g, expiredImage.expiryDays);

                var created, url, expiryMilliseconds, diffMilliseconds;
                // Check the time since image upload
                var url = "/api.php?action=query&format=json&prop=info&inprop=created&pageids=" + wgArticleId;
                $.getJSON(url, function (data) {
                    try {
                        created = data.query.pages[wgArticleId].created; // e.g. 2010-09-29T01:47:30Z
                        expiryMilliseconds = expiredImage.expiryDays * 24 * 60 * 60 * 1000;
                        diffMilliseconds = new Date().getTime() - new Date(created).getTime();
                        if (diffMilliseconds > expiryMilliseconds) {
                            new BannerNotification(expiredImage.expiryMessage, 'error', $('.banner-notifications-placeholder')).show();
                        } else {
                            new BannerNotification(expiredImage.nonExpiryMessage, 'notify', $('.banner-notifications-placeholder')).show();
                        }
                    } catch (e) {
                        console.error(e);
                        return;
                    }
                });
            }
        }
    })();
});
//</nowiki>