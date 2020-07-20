//<nowiki>

/**
 * Message
 *   By [[User:AnimatedCartoons]]
 *   Adapted (slightly) by [[User:Underscorre]]
 */
;(function ($, mw) {
    'use strict';
 
    // Do not load twice
    if (window.message) {
        return;
    }
 
    // Translations
    var lng = {
        // English
        en: {
            cancel: 'Cancel',
            message: 'Message',
            preview: 'Preview',
            send: 'Send',
            title: 'Title',
            users: 'Users (case sensitive; separated by Enter)'
        },
        // Català
        ca: {
            cancel: 'Cancel',
            message: 'Missatge',
            preview: 'Previsualitzar',
            send: 'Enviar',
            title: 'Títol',
            users: 'Usuaris (escriu el nom exacte i separa\'ls amb; - punt i coma-)'
        },
        // Deutsch
        de: {
            cancel: 'Abbrechen',
            message: 'Nachricht',
            preview: 'Vorschau',
            send: 'Senden',
            title: 'Titel',
            users: 'Benutzer (auf Groß-/Kleinschreibung achten; mit Zeilenumbruch voneinander trennen)'
        },
        // Español
        es: {
            cancel: 'Cancelar',
            message: 'Mensaje',
            preview: 'Previsualizar',
            send: 'Enviar',
            title: 'Título',
            users: 'Usuarios (escribe el nombre exacto y separa por el signo ; - punto y coma-)'
        },
        // Français
        fr: {
            cancel: 'Annuler',
            message: 'Message',
            preview: 'Aperçu',
            send: 'Envoyer',
            title: 'Titre',
            users: 'Utilisateurs (sensible à la casse ; séparés par Entrée)'
        },
        // Nederlands (Dutch)
        nl: {
            cancel: 'Annuleren',
            message: 'Bericht',
            preview: 'Voorvertoning',
            send: 'Verzenden',
            title: 'Titel',
            users: 'Gebruikers (hoofdlettergevoelig; één gebruikersnaam per regel)'
        },
        // Polski
        pl: {
            cancel: 'Anuluj',
            message: 'Wiadomość',
            preview: 'Podgląd',
            send: 'Wyślij',
            title: 'Tytuł',
            users: 'Użytkownicy (oddzieleni enterem; wielkość znaków ma znaczenie)'
        },
        // Português
        pt: {
            cancel: 'Cancelar',
            message: 'Mensagem',
            preview: 'Visualizar',
            send: 'Enviar',
            title: 'Título',
            users: 'Utilizadores (escreva o nome exato e separe com; (ponto e vírgula)'
        },
        // Português do Brasil
        'pt-br': {
            cancel: 'Cancelar',
            message: 'Mensagem',
            preview: 'Visualizar',
            send: 'Enviar',
            title: 'Título',
            users: 'Usuários (escreva o nome e separe com; (ponto e vírgula)'
        }
    };
 
    lng = $.extend(lng.en, lng[mw.config.get('wgContentLanguage')], lng[mw.config.get('wgUserLanguage')]);
 
    mw.util.addCSS('#messagemulti { cursor: pointer; } #usrs, #ttl, #bdy { width: 100%; resize: none; } .ArticlePreview p { margin: 0.4em 0 0.5em; }');
 
    window.message = {
        init: function () {
            var nmspc;
 
            // Detect if wiki uses user talk or message wall
            $.get('/wiki/User_talk:' + mw.config.get('wgUserName'), function (data) {
                nmspc = data.slice(data.indexOf('"wgNamespaceNumber":') + 20, data.indexOf(',"wgPageName'));
            });
 
            // User interface
            require(['wikia.ui.factory'], function (uiFactory) {
                uiFactory.init(['modal']).then(function (uiModal) {
                    var msgMdlCnfg = {
                            type: 'default',
                            vars: {
                                id     : 'msgMdl',
                                size   : 'medium',
                                content: '<textarea id="usrs" placeholder="' + lng.users + '" rows="5"></textarea><br /><br /><input type="text" id="ttl" placeholder="' + lng.title + '"></textarea><br /><br /><textarea id="bdy" placeholder="' + lng.message + '" rows="10"></textarea>',
                                title  : lng.message,
                                buttons: [
                                    {
                                        vars: {
                                            value  : lng.send,
                                            classes: [
                                                'normal', 'primary'
                                            ],
                                            data   : [
                                                {
                                                    key  : 'event',
                                                    value: 'ok'
                                                }
                                            ]
                                        }
                                    }, {
                                        vars: {
                                            value: lng.preview,
                                            data : [
                                                {
                                                    key  : 'event',
                                                    value: 'preview'
                                                }
                                            ]
                                        }
                                    }, {
                                        vars: {
                                            value: lng.cancel,
                                            data : [
                                                {
                                                    key  : 'event',
                                                    value: 'close'
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        };
                    uiModal.createComponent(msgMdlCnfg, function (msgMdl) {
                        msgMdl.bind('preview', function (event) {
                            var $ttl = $('#ttl').val(),
                                $bdy = $('#bdy').val();
 
                            if ($ttl !== '' && $bdy !== '') {
                                uiFactory.init(['modal']).then(function (uiModal) {
                                    var prvwCnfg = {
                                            vars: {
                                                id     : 'prvwMdl',
                                                size   : 'medium',
                                                content: '<div class="ArticlePreview" style="height: 555px; border: 1px solid #323232; padding: 10px; overflow: auto; -ms-overflow-x: hidden;"><div style="height: 100%; background: url(' + mw.config.get('stylepath') + '/common/images/ajax.gif) no-repeat center;"></div></div>',
                                                title  : lng.preview
                                            }
                                        };
                                    uiModal.createComponent(prvwCnfg, function (prvwMdl) {
                                        prvwMdl.show();
                                    });
                                });
 
                                // Preview
                                switch (nmspc) {
                                    // Message wall
                                case '1200':
                                    $.post(mw.util.wikiScript('wikia'), {
                                        controller: 'WallExternal',
                                        method    : 'preview',
                                        metatitle : $ttl,
                                        body      : $bdy,
                                        format    : 'json'
                                    }, function (data) {
                                        $('.ArticlePreview').html(data.body);
 
                                        $('.msg-title').css({
                                            'font-size'     : '18px',
                                            'font-weight'   : 'bold',
                                            'padding-bottom': '5px'
                                        });
                                    });
                                    break;
 
                                // User talk
                                case '3':
                                    $.post(mw.util.wikiScript('index'), {
                                        action : 'ajax',
                                        rs     : 'EditPageLayoutAjax',
                                        page   : 'SpecialCustomEditPage',
                                        method : 'preview',
                                        content: '==' + $ttl + '==\n' + $bdy
                                    }, function (data) {
                                        $('.ArticlePreview').html(data.html);
 
                                        $('.pagetitle').remove();
                                    });
                                    break;
                                }
                            }
                        });
 
                        msgMdl.bind('ok', function (event) {
                            var $a   = $('#usrs').val(),
                                b    = $a.split('\n'),
                                $ttl = $('#ttl').val(),
                                $bdy = $('#bdy').val();
 
                            if ($a !== '' && $ttl !== '' && $bdy !== '') {
                                // Remove empty string
                                for (var i = b.length; i--;) {
                                    if (b[i] === '') {
                                        b.splice(i, 1);
                                    }
                                }
 
                                // Remove duplicate
                                var usrs = b.filter(function (elem, pos) {
                                        return b.indexOf(elem) === pos;
                                    });
 
                                // Send
                                for (var j = 0; j < usrs.length; j++) {
                                    switch (nmspc) {
                                        // Message wall
                                    case '1200':
                                        $.post(mw.util.wikiScript('wikia'), {
                                            controller   : 'WallExternal',
                                            method       : 'postNewMessage',
                                            pagenamespace: '1200',
                                            pagetitle    : encodeURIComponent(usrs[j]),
                                            messagetitle : $ttl,
                                            body         : $bdy,
                                            format       : 'json'
                                        });
                                        break;
 
                                    // User talk
                                    case '3':
                                        $.post(mw.util.wikiScript('api'), {
                                            action      : 'edit',
                                            title       : 'User_talk:' + encodeURIComponent(usrs[j]),
                                            section     : 'new',
                                            sectiontitle: $ttl,
                                            text        : $bdy,
                                            token       : mw.user.tokens.values.editToken
                                        });
                                        break;
                                    }
                                }
 
                                $('.primary').replaceWith('<img src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" style="float: right; margin-left: 20px;" />');
 
                                setTimeout(function () {
                                    msgMdl.trigger('close');
                                }, 2000);
                            }
                        });
 
                        msgMdl.show();
                    });
                });
            });
        },
 
        // Add to toolbar
        addToToolbar: function () {
            var $lnk = $('<li><a data-id="multimessage" href="#" id="messagemulti">' + lng.message + '</a></li>');
 
            $('li.account-navigation-first-item ul.user-menu').append($lnk);
 
            $lnk = $('#messagemulti');
            $lnk.one('click', function (e) {
                e.stopPropagation();
 
                $lnk.click(function (e) {
                    e.stopPropagation();
                    message.init();
                });
 
                message.init();
            });
        }
    };
 
    // Start
    $(message.addToToolbar());
}(this.jQuery, this.mediaWiki));
// </nowiki>