// Remove "Clan:" from clan page titles

$(function () {
	if ( wgCanonicalNamespace == 'Clan' ) {
		$('#WikiaPageHeader h1').text(wgTitle);
	}
});

// Adds extra tabs to user pages
$(function() {
    var loc = window.location.href;
    var username = (wgTitle == "Contributions") ? mw.html.escape(loc.substring(loc.lastIndexOf("/")+1)) : mw.html.escape(wgTitle);
    $('.tabs-container > ul.tabs').append('<li data-id="sandbox"><a href="/wiki/User:' + username + '/sandbox">Sandbox</a></li>');
});

// LastEdited
// Original copied from http://dev.wikia.com/wiki/LastEdited/code.js?oldid=28335
$(function() {
    var lastEdited = $.extend({
        avatar: false,
        size: false,
        diff: true,
        comment: false,
        time: 'timeago',
        namespaces: {
            include: [],
            exclude: [1,2]
        },
        pages: []
    }, window.lastEdited);
    var i18n = {
        // English
        en: {
            lastEdited: 'Last edited by $1 $2',
            diff: 'diff',
            comment: 'Edit summary',
            size: 'Current size',
            created: 'Created page.',
            loading: 'Loading details of last edit...',
            changes: 'Changes',
            link: 'Link',
            undo: 'Undo',
            cancel: 'Cancel'
        },
        // Belarusian
        be: {
            lastEdited: 'Апошняя праўка $1 $2',
            diff: 'розн.',
            comment: 'Каментар',
            size: 'Памер',
            created: 'Створана старонка.',
            loading: 'Загрузка дадзеных аб апошняй праўцы',
            changes: 'Змены',
            link: 'Прамая спасылка',
            undo: 'Адмяніць',
            cancel: 'Зачыніць'
        },
        // Catalan
        ca: {
            lastEdited: 'Últim canvi per $1 el $2',
            diff: 'dif',
            comment: 'Resum de l’edició',
            size: 'Mida actual',
            created: 'Pàgina creada.',
            loading: 'Carregant detalls de l’última edició...',
            changes: 'Canvis',
            link: 'Enllaç',
            undo: 'Desfer',
            cancel: 'Anuŀla'
        },
        // German
        de: {
            lastEdited: 'Letzte Bearbeitung von $1 $2',
            diff: 'Unterschied',
            comment: 'Zusammenfassung',
            size: 'Aktuelle Größe',
            created: 'Seite erstellt.',
            loading: 'Letzte Details ansehen...',
            changes: 'Versionsunterschiede',
            link: 'Link',
            undo: 'Rückgängig machen',
            cancel: 'Abbrechen'
        },
        // Esperanto
        eo: {
            lastEdited: 'Lastafoje redaktita de $1 $2',
            diff: 'malsamoj',
            comment: 'Resumo',
            size: 'Nuna grandeco',
            created: 'Kreita paĝo.',
            loading: 'Ŝarĝante detalojn de lasta redakto...',
            changes: 'Ŝanĝoj',
            link: 'Ligilo',
            undo: 'Malfari',
            cancel: 'Nuligi'
        },
        // Spanish
        es: {
            lastEdited: 'Modificado por ultima vez por $1 $2',
            diff: 'dif',
            comment: 'Resumen de edición',
            size: 'Tamaño actual',
            created: 'Página creada.',
            loading: 'Cargando datos de la última edición...',
            changes: 'Cambios',
            link: 'Enlace',
            undo: 'Deshacer',
            cancel: 'Cancelar'
        },
        // French
        fr: {
            lastEdited: 'Dernière modification de $1 $2',
            diff: 'diff',
            comment: 'Résumé de modification',
            size: 'Taille actuelle',
            created: 'Page créée.',
            loading: 'Chargement des détails de la dernière modification',
            changes: 'Changements',
            link: 'Lien',
            undo: 'Annuler',
            cancel: 'Annuler'
        },
        // Galician
        gl: {
            lastEdited: 'Última edición por $1 $2',
            diff: 'comparación',
            comment: 'Resumo da edición',
            size: 'Tamaño actual',
            created: 'Páxina creada.',
            loading: 'A cargar detalles da última edición',
            changes: 'Cambios',
            link: 'Ligazón',
            undo: 'Desfacer',
            cancel: 'Cancelar'
        },
        // Italian
        it: {
            lastEdited: 'Ultima edizione da $1 $2',
            diff: 'dif',
            comment: 'Riassumono dell’edizione',
            size: 'Dimensione attuale',
            created: 'Pagina creata.',
            loading: 'Caricando dettagli dell’ultima edizione',
            changes: 'Modifiche',
            link: 'Collegamento',
            undo: 'Disfare',
            cancel: 'Cancellare'
        },
        // Japanese
        ja: {
            lastEdited: '$1による編集 $2',
            diff: '差分',
            comment: '編集内容の要約',
            size: '現在のサイズ',
            created: '新しいページ',
            loading: '直近の変更を確認する',
            changes: '変更点',
            link: 'リンク',
            undo: '取り消し',
            cancel: '戻る'
        },
        // Dutch
        nl: {
            lastEdited: 'Laatst bewerkt door $1 $2',
            diff: 'wijz',
            comment: 'Bewerkingssamenvatting',
            size: 'Huidige grootte',
            created: 'Pagina aangemaakt.',
            loading: 'Details van laatste bewerking laden...',
            changes: 'Wijzigingen',
            link: 'Link',
            undo: 'Ongedaan maken',
            cancel: 'Terug'
        },
        // Occitan
        oc: {
            lastEdited: 'Darrièr cambiament per $1 $2',
            diff: 'dif',
            comment: 'Resumit de modificacion',
            size: 'Talha actuala',
            created: 'Pagina creada.',
            loading: 'Cargament dels detalhs del darrièr cambiament...',
            changes: 'Cambiaments',
            link: 'Ligam',
            undo: 'Desfar',
            cancel: 'Anullar'
        },
        // Polish
        pl: {
            lastEdited: 'Ostatnio edytowane przez $1 $2',
            diff: 'zmiana',
            comment: 'Opis zmian',
            size: 'Obecny rozmiar',
            created: 'Utworzona strona.',
            loading: 'Ładowanie szczegółów ostatniej edycji...',
            changes: 'Zmiany',
            link: 'Link',
            undo: 'Cofnij',
            cancel: 'Anuluj'
        },
        // European Portuguese
        pt: {
            lastEdited: 'Última edição por $1 $2',
            diff: 'comparação',
            comment: 'Resumo da edição',
            size: 'Tamanho actual',
            created: 'Página criada.',
            loading: 'A carregar detalhes da última edição...',
            changes: 'Mudanças',
            link: 'Ligação',
            undo: 'Desfazer',
            cancel: 'Cancelar'
        },
        // Brazilian Portuguese
        'pt-br': {
            lastEdited: 'Editado última vez por $1 $2',
            diff: 'comparação',
            comment: 'Resumo da Edição',
            size: 'Tamanho atual',
            created: 'Página criada.',
            loading: 'Carregando detalhes da última edição...',
            changes: 'Mudanças',
            link: 'Link',
            undo: 'Desfazer',
            cancel: 'Cancelar'
        },
        // Romanian
        ro: {
            lastEdited: 'Ultimă ediţie de $1 $2',
            diff: 'dif',
            comment: 'Rezumat ediţiei',
            size: 'Mărime actual',
            created: 'Pagină creată.',
            loading: 'Încărcând detalii cu privire la ultima ediţie...',
            changes: 'Schimburi',
            link: 'Link',
            undo: 'Desfacere',
            cancel: 'Anulare'
        },
        // Russian
        ru: {
            lastEdited: 'Последняя правка $1 $2',
            diff: 'разн.',
            comment: 'Комментарий',
            size: 'Размер',
            created: 'Создана страница.',
            loading: 'Загрузка данных о последней правке',
            changes: 'Изменения',
            link: 'Прямая ссылка',
            undo: 'Отменить',
            cancel: 'Закрыть'
        },
        // Scots
        sco: {
            lastEdited: 'Hintmaist eeditit by $1 $2',
            diff: 'nou',
            comment: 'Ootline',
            size: 'Current size',
            created: 'Creautit page.',
            loading: 'Laidin details o hintmaist eedit...',
            changes: 'Chynges',
            link: 'Link',
            undo: 'Ondae',
            cancel: 'Cancel'
        },
        // Valencian
        val: {
            lastEdited: 'Últim canvi per $1 el $2',
            diff: 'dif',
            comment: 'Resum de l’edició',
            size: 'Tamany actual',
            created: 'Pàgina creada.',
            loading: 'Carregant detalls de l’última edició...',
            changes: 'Canvis',
            link: 'Enllaç',
            undo: 'Desfer',
            cancel: 'Cancelar'
        },
        // Vietnamese
        vi: {
            lastEdited: 'Sửa đổi lần cuối bởi $1 $2',
            diff: 'khác',
            comment: 'Tóm lược sửa đổi',
            size: 'Kích thước hiện tại',
            created: 'Tạo trang.',
            loading: 'Tải chi tiết của lần sửa đổi cuối...',
            changes: 'Thay đổi',
            link: 'Link',
            undo: 'Lùi sửa',
            cancel: 'Quay lại'
        },
         // Українська
        uk: {
            lastEdited: 'Останній раз внесено зміни $1 $2',
            diff: 'порівняти',
            comment: 'Опис редагувань',
            size: 'Поточний розмір',
            created: 'Створена нова сторінка.',
            loading: 'Завантаження даних останнього редагування',
            changes: 'Сторінка',
            link: 'Посилання',
            undo: 'Редагувати/Порівняти',
            cancel: 'Скасувати'
        },
        // Mandarin
        zh: {
            lastEdited: '由$1最後編輯於$2',
            diff: '差別',
            comment: '編輯簡要',
            size: '目前頁面大小',
            created: '建立新頁面。',
            loading: '最後編輯明細載入中',
            changes: '變動',
            link: '連結',
            undo: '復原',
            cancel: '取消'
        }
    };
    if (lastEdited.lang && typeof lastEdited.lang == 'string') i18n = $.extend(i18n.en, i18n[lastEdited.lang]);
    else i18n = $.extend(i18n.en, i18n[mw.config.get('wgUserLanguage')]);
    var allowed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 110, 111, 828, 829, 1202];
    if ($.isArray(lastEdited.namespaces.include)) {
        for (var i in lastEdited.namespaces.include) {
            allowed.push(lastEdited.namespaces.include[i]);
        }
    }
    if ($.isArray(lastEdited.namespaces.exclude)) {
        allowed = $(allowed).not(lastEdited.namespaces.exclude);
    }
    if (!$.getUrlVar('diff') && !$.getUrlVar('oldid') &&
        $.getUrlVar('action') !== 'history' &&
        $.inArray(mw.config.get('wgNamespaceNumber'), allowed) > -1 &&
        !($.inArray(mw.config.get('wgPageName'), lastEdited.pages) > -1) &&
        !mw.config.get('wgIsMainPage') &&
        !window.lastEditedLoaded // prevent double runs
    ) {
        window.lastEditedLoaded = true;
        /* Timeago by Ryan McGeary */
        /* http://timeago.yarp.com/ */
        mw.loader.load('http://timeago.yarp.com/jquery.timeago.js');
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'timestamp|user|size|parsedcomment',
            rvdiffto: 'prev',
            format: 'json'
        }, function(data) {
            for (var i in data.query.pages) break;
            var rv = data.query.pages[i].revisions[0];
                html = '<div class="lastEdited"><img alt="' + i18n.loading + '" title="' + i18n.loading + '" style="margin:2px 10px" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif"></div>';
            switch (mw.config.get('skin')) {
                case 'oasis':
                case 'wikia':
                    if ($('#WikiaPageHeader').length) {
                        $('#WikiaPageHeader').append(html);
                    }
                    if ($('.WikiaUserPagesHeader').length) {
                        $('.UserProfileActionButton').after(html);
                        mw.util.addCSS('.lastEdited {padding-bottom: 5px;border-bottom: 1px solid #ccc;}');
                    }
                    break;
                case 'monobook':
                case 'uncyclopedia':
                case 'wowwiki':
                    if ($('#content #firstHeading').length) {
                        if ($('#bodyContent #contentSub').length) {
                            $('#bodyContent #contentSub').after(html);
                            mw.util.addCSS('#bodyContent #contentSub {margin-bottom: 0 !important;} .lastEdited {margin: 5px auto 1.4em auto;}');
                        } else {
                            $('#content #firstHeading').after(html);
                        }
                        mw.util.addCSS('.lastEdited {line-height: 12px;border-bottom: ' + $('#firstHeading').css('border-bottom') + ';padding-bottom: 2px}');
                    }
                    break;
            }
            var time;
            switch (lastEdited.time) {
                case 'timestamp':
                    time = new Date(rv.timestamp).toUTCString().slice(0, 16) + ', ' + new Date(rv.timestamp).toUTCString().slice(17, 25) + ' (UTC)';
                    break;
                case 'timeago':
                    time = '<span class="timeago" title="' + rv.timestamp + '"></span>';
                    break;
                default:
                    time = '<span class="timeago" title="' + rv.timestamp + '"></span>';
            }
            var user = '<a href="/wiki/User:' + mw.util.wikiUrlencode(rv.user) + '">' + rv.user + '</a> (<a href="/wiki/User_talk:' + mw.util.wikiUrlencode(rv.user) + '">talk</a> | <a href="/wiki/Special:Contributions/' + mw.util.wikiUrlencode(rv.user) + '">contribs</a>)';
            html = i18n.lastEdited.replace(/\$1/g, '<img class="lastEdited-avatar"/>' + user).replace(/\$2/g, time);
            if (lastEdited.diff && rv.diff.from) html += ' <a style="cursor:pointer" class="lastEdited-diff">(' + i18n.diff + ')</a>';
            if (lastEdited.comment && rv.parsedcomment) 
                if (rv.parsedcomment.indexOf('Created page with') > -1) {
                   html += '<br>' + i18n.comment + ': ' + i18n.created;
                } else {
                   html += '<br>' + i18n.comment + ': ' + rv.parsedcomment;
                }
            if (lastEdited.size) html += '<br>' + i18n.size + ': ' + rv.size + ' bytes';
            $('.lastEdited').html(html);
            if (lastEdited.avatar) {
                $.get('/wiki/Special:Contributions/' + mw.util.wikiUrlencode(rv.user), function(data) {
                    var data = $.parseHTML(data);
                    for (var i in data) if (data[i].className == 'WikiaSiteWrapper') break;
                     $('.lastEdited-avatar').attr({
                         src: data[i].children.WikiaPage.children[1].children[1].children[1].children[0].children[0].src,
                         height: 15,
                         width: 15
                      }).after('&nbsp;');
                });
            }
            $('.timeago').timeago();
            mw.util.addCSS('.lastEdited-diff-changes {height:' + ($(window).height() - 250) + 'px;overflow-y:auto;padding:5px;} .lastEdited-diff-changes table {border-collapse:collapse;} .lastEdited-diff-changes td {border:1px solid ' + $('.WikiaPage').css('border-color') + ';padding:5px;width: 50%;} .lastEdited-diff-changes .diff-marker {width: auto;}');
            mw.loader.using(['mediawiki.action.history.diff'], function() {
                $('.lastEdited-diff').on('click', function() {
                   $.showCustomModal(i18n.changes + ': ' + mw.config.get('wgPageName').replace(/_/g, ' '), '<div class="lastEdited-diff-changes"><table>' + rv.diff['*'] + '</table></div>', {
                       id: 'lastEdited-diff',
                       width: 800,
                       buttons: [{
                           message: i18n.link,
                            defaultButton: true,
                            handler: function() {
                               $('#lastEdited-diff').closeModal();
                               window.open('/?diff=' + rv.diff.to, '_blank');
                            }
                        }, {
                            message: i18n.undo,
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                                window.open('/wiki/' + mw.config.get('wgPageName') + '?action=edit&undoafter=' + rv.diff.from + '&undo=' + rv.diff.to, '_blank');
                            }
                        }, {
                            message: i18n.cancel,
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                            }
                        }]
                    });
                });
            });
        });
    }
});

importArticles({
    type: 'script',
    article: 'u:admintools:MediaWiki:Wikia.js/cancelButton.js'
});