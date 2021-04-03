(function ($, mw, QuickContribs) {
    // Scoping and double runs
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'WikiActivity' ||
        (window.QuickContribs && window.QuickContribs.loaded)
    ) {
        return;
    }
    var cfg = mw.config.get([
        'wgContentLanguage',
        'wgUserLanguage',
        'wgScriptPath',
        'wgUserGroups',
    ]);
    var i18n = {
        // English
        en: {
            expiry: 'Block duration: ',
            reason: 'Block reason: ',
            loading: 'Loading, please wait...',
            emptyvariables: 'You have to enter block\'s expiry and user to block.',
            errorapi: 'Error: API returned error code',
            success: 'User has been blocked',
            blockbutton: 'Block the user',
            cancelbutton: 'Cancel',
            nocontribs: 'No contribs',
            noright: 'You don\'t have the right to see deleted contribs.',
            modalname: 'Delete contribs'
        },
        // German
        de: {
            expiry: 'Sperrdauer: ',
            reason: 'Grund: ',
            loading: 'Laden, bitte warten...',
            emptyvariables: 'Du musst Sperrdauer und einen Benutzer angeben, um jemanden zu sperren.',
            errorapi: 'Fehler: API gibt eine Fehlermeldung zurück',
            success: 'Der Benutzer wurde gesperrt',
            blockbutton: 'Sperre den Benutzer',
            cancelbutton: 'Abbrechen',
            nocontribs: 'Keine Beiträge',
            noright: 'Du hast nicht genügend Rechte, um gelöschte Beiträge einzusehen.',
            modalname: 'Lösche Beiträge'
        },
        // Français
        fr: {
            expiry: 'Durée du blocage :',
            reason: 'Motif du blocage :',
            loading: 'Chargement, merci de patienter...',
            emptyvariables: 'Merci de rentrer la durée du blocage ainsi que l\'utilisateur à bloquer',
            errorapi: 'Erreur: l\'API a retourné le code d\'erreur',
            success: 'L\'utilisateur a été bloqué avec succès.',
            blockbutton: 'Bloquer l\'utilisateur',
            cancelbutton: 'Annuler',
            nocontribs: 'Aucune contribution.',
            noright: 'Vous n\'avez pas les droits requis pour voir les contributions supprimées.',
            modalname: 'Contributions supprimées'
        },
        // Nederlands
        nl: {
            expiry: 'Duur blokkade: ',
            reason: 'Reden blokkade: ',
            loading: 'Aan het laden, een ogenblik geduld...',
            emptyvariables: 'Je moet een einddatum en een te blokkeren gebruiker opgeven.',
            errorapi: 'Fout: API foutcode',
            success: 'Gebruiker is geblokkeerd',
            blockbutton: 'Blokkeer deze gebruiker',
            cancelbutton: 'Annuleren',
            nocontribs: 'Geen bijdragen',
            noright: 'Je hebt geen rechten om de verwijderde bijdragen te bekijken.',
            modalname: 'Verwijderde bijdragen'
        },
        pl: {
            expiry: 'Czas blokady: ',
            reason: 'Powód blokady: ',
            loading: 'Ładowanie, proszę czekać...',
            emptyvariables: 'Musisz wpisać powód i czas blokady, aby zablokować użytkownika.',
            errorapi: 'Błąd: API zwróciło kod błędu',
            success: 'Użytkownik został zablokowany',
            blockbutton: 'Zablokuj użytkownika',
            cancelbutton: 'Anuluj',
            nocontribs: 'Brak wkładu',
            noright: 'Nie posiadasz praw do usunięcia wkładu.',
            modalname: 'Usuń wkład'
        },
        // Português do Brasil 
        'pt-br': {
            expiry: 'Duração do bloqueio: ',
            reason: 'Razão do bloqueio: ',
            loading: 'Carregando, por favor, espere...',
            emptyvariables: 'Você deve informar o motivo e o tempo de bloqueio',
            errorapi: 'Erro: API retornou um código de erro',
            success: 'O usuário foi bloqueado',
            blockbutton: 'Bloquear o usuário',
            cancelbutton: 'Cancelar', 
            nocontribs: 'Nenhuma contribuição',
            noright: 'Você não tem o direito de remover as contribuições', 
            modalname: 'Deletar contribuições' 
        }, 
        // Turkish (Türkçe)
        tr: {
            expiry: 'Engel süresi: ',
            reason: 'Engel nedeni: ',
            loading: 'Yükleniyor, lütfen bekleyin...',
            emptyvariables: 'Bloğun son kullanma tarihini ve engellemek için kullanıcı girmelisiniz.',
            errorapi: 'Hata: API hata kodu döndürdü',
            success: 'Kullanıcı engellendi',
            blockbutton: 'Kullanıcıyı engelle',
            cancelbutton: 'İptal',
            nocontribs: 'Katkı yok',
            noright: 'Silinen katkıları görmek için hakkınız yok.',
            modalname: 'Katkıları sil'
        },
    };
    i18n = $.extend(i18n.en, i18n[cfg.wgContentLanguage], i18n[cfg.wgUserLanguage]);
    QuickContribs = $.extend(QuickContribs, {});
    QuickContribs.expiry = QuickContribs.expiry || '2 weeks';
    QuickContribs.reason = QuickContribs.reason || 'Vandalism';
    QuickContribs.loaded = true;
    var user = "";
    var contributions = "";
    var deletecontributions = "";
    $(document).on("click", 'span.subtle > a[rel="nofollow"], a.real-name', function (evt) {
        if (!evt.ctrlKey) {
            return;
        }
        evt.preventDefault();
        var number = $(this).attr('href').lastIndexOf('/');
        if (number > -1) {
            user = $(this).attr('href').substr(number + 1);
        }
        if (mw.util.isIPv4Address(user) || mw.util.isIPv6Address(user)) {
            console.log('IP');
        } else {
            console.log('User');
            user = $(this).html();
        }
        getcontributions(user);
        showQuickContribsModal(i18n.loading + ' <img src="https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif">', i18n.loading + ' <img src="https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif">');
    });

    function blockuser(user, expiry, reason) {
        if (!expiry) {
            expiry = prompt(i18n.expiry, QuickContribs.expiry);
        }
        if (!reason) {
            reason = prompt(i18n.reason, QuickContribs.reason);
        }
        if (!user || !expiry) {
            alert(i18n.emptyvariables);
            return false;
        }
        mw.loader.using(['mediawiki.api', 'mediawiki.api.edit'], function() {
            var params = {
                action: 'block',
                user: user,
                expiry: expiry,
                reason: reason,
                nocreate: '',
                autoblock: '',
                format: 'json',
            };
            var api = new mw.Api();
            api.postWithEditToken(params, function(data) {
                alert(i18n.success);
                $('#blockbutton').addClass('disabled');
            }, function(code, result) {
                alert(i18n.errorapi + ' : ' + result.info);
                return false;
            });
        });
    }

    function getcontributions(user) {
        $.ajax({
            type: "GET",
            url:  cfg.wgScriptPath + '/wiki/Special:DeletedContributions/' + user,
            success: function (content) {
                deletecontributions = $(content).find('#mw-content-text > ul').html();
            },
            error: function (data) {
                alert(i18n.errorapi + ' : ' + data.error.info);
            }
        });
        $.ajax({
            type: "GET",
            url:  cfg.wgScriptPath + '/wiki/Special:Contributions/' + user,
            success: function (content) {
                contributions = $(content).find('#mw-content-text > ul').html();
                showQuickContribsModal(deletecontributions, contributions);
            },
            error: function (data) {
                alert(i18n.errorapi + ' : ' + data.error.info);
            }
        });
    }

    function showQuickContribsModal(content, nextcontent) {
        if ($('#quick-contributions').length === 0) {
            var ajaxform = '\
  <form method="" name="" class="WikiaForm "> \
    <div id="Deletecontributions" style="float:left; height:300px; width:450px"/> \
	<div id="Contributions" style="float:right; height:300px; width:450px"/> \
  </form>';
            $.showCustomModal(i18n.modalname + ' (' + user + ')', ajaxform, {
                id: 'quick-contributions',
                width: 900,
                buttons: [{
                    message: i18n.cancelbutton,
                    handler: function () {
                        $('#quick-contributions').closeModal();
                    }
                }, {
                    id: 'blockbutton',
                    message: i18n.blockbutton + ' (' + user + ')',
                    defaultButton: true,
                    handler: function () {
                        if (!$(this).attr('disabled')) {
                            blockuser(user);
                        }
                    }
                }]
            });
        }
        mw.util.addCSS(
            'div#Deletecontributions, div#Contributions {\n' +
            '\tmax-height:' + ($(window).height() - 100) + 'px;\n' +
            '\toverflow:auto;\n' +
            '}\n.disabled {\n' +
            '\tcolor:#888;\n' +
            '}');
        if (content) {
            $('#Deletecontributions').html(content);
        } else {
            $('#Deletecontributions').html('<font size="4">' + i18n.nocontribs + '</font>');
        }
        if (nextcontent) {
            $('#Contributions').html(nextcontent);
        } else {
            $('#Contributions').html('<font size="4">' + i18n.nocontribs + '</font>');
        }
        if (cfg.wgUserGroups.indexOf('sysop') + cfg.wgUserGroups.indexOf('bureaucrat') + cfg.wgUserGroups.indexOf('staff') + cfg.wgUserGroups.indexOf('soap') + cfg.wgUserGroups.indexOf('helper') + wgUserGroups.indexOf('wiki-manager') == -6) {
            $('#blockbutton').attr("disabled", "true");
            $('#Deletecontributions').html('<font size="4">' + i18n.noright + '</font>');
        }
    }
    window.QuickContribs = QuickContribs;
})(this.jQuery, this.mediaWiki, window.QuickContribs);