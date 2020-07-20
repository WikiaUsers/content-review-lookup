;(function() {
    var lastEdited = {
        extend: function(obj) {
            obj = obj || {};
            for (var i = 1; i < arguments.length; i++) {
                if (!arguments[i]) {
                    continue;
                }
                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        obj[key] = arguments[i][key];
                    }
                }
            }
            return obj;
        },
        title: mw.config.get('wgPageName'),
        id: mw.config.get('wgArticleId'),
        i18n: {
            // English
            en: {
                lastEdited: 'Last edited by $1 $2',
                diff: 'diff',
                minor: 'm',
                comment: 'Edit summary',
                size: 'Current size',
                created: 'Created page.',
                loading: 'Loading details of last edit',
                changes: 'Changes',
                link: 'Link',
                undo: 'Undo',
                cancel: 'Cancel'
            },
            // Belarusian
            be: {
                lastEdited: 'Апошняя праўка $1 $2',
                diff: 'розн.',
                minor: 'д',
                comment: 'Каментар',
                size: 'Памер',
                created: 'Створана старонка.',
                loading: 'Загрузка дадзеных аб апошняй праўцы',
                changes: 'Змены',
                link: 'Прамая спасылка',
                undo: 'Адмяніць',
                cancel: 'Зачыніць'
            },
            // Bengali
                bn: {
                lastEdited: ' সম্পাদনা করেছেন $1  $2',
                minor: 'অ',
                comment: 'সম্পাদনার সারাংশ',
                size: 'বর্তমান আকার',
                created: 'তৈরি করেছে',
                loading: 'লোডিং হচ্ছে',
                changes: 'পরিবর্তন',
                link: 'লিংক',
                undo: 'সম্পাদনা বাতিল করুন',
                cancel: 'বাতিল'
            },
            // Catalan
            ca: {
                lastEdited: 'Últim canvi per $1 el $2',
                diff: 'dif',
                minor: 'm',
                comment: 'Resum de l’edició',
                size: 'Mida actual',
                created: 'Pàgina creada.',
                loading: 'Carregant detalls de l’última edició',
                changes: 'Canvis',
                link: 'Enllaç',
                undo: 'Desfer',
                cancel: 'Anuŀla'
            },
            // German
            de: {
                lastEdited: 'Letzte Bearbeitung von $1 $2',
                diff: 'Unterschied',
                minor: 'K',
                comment: 'Zusammenfassung',
                size: 'Aktuelle Größe',
                created: 'Seite erstellt.',
                loading: 'Letzte Details ansehen',
                changes: 'Versionsunterschiede',
                link: 'Link',
                undo: 'Rückgängig machen',
                cancel: 'Abbrechen'
            },
            // Esperanto
            eo: {
                lastEdited: 'Lastafoje redaktita de $1 $2',
                diff: 'malsamoj',
                minor: 'E',
                comment: 'Resumo',
                size: 'Nuna grandeco',
                created: 'Kreita paĝo.',
                loading: 'Ŝarĝante detalojn de lasta redakto',
                changes: 'Ŝanĝoj',
                link: 'Ligilo',
                undo: 'Malfari',
                cancel: 'Nuligi'
            },
            // Spanish
            es: {
                lastEdited: 'Modificado por última vez por $1 $2',
                diff: 'dif',
                minor: 'm',
                comment: 'Resumen de edición',
                size: 'Tamaño actual',
                created: 'Página creada.',
                loading: 'Cargando datos de la última edición',
                changes: 'Cambios',
                link: 'Enlace',
                undo: 'Deshacer',
                cancel: 'Cancelar'
            },
            // Finnish
            fi: {
                lastEdited: 'Viimenen muokkaus $1 $2',
                diff: 'ero',
                minor: 'p',
                comment: 'Muokkauksen kuvaus',
                size: 'Nykyinen koko',
                created: 'Loin sivun.',
                loading: 'Viimeisen muokkauksen tietoja ladataan',
                changes: 'muutokset',
                link: 'Linkkaa',
                undo: 'Kumoa',
                cancel: 'Peruuta'
            },
            // French
            fr: {
                lastEdited: 'Dernière modification de $1 $2',
                diff: 'diff',
                minor: 'm',
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
                minor: 'm',
                comment: 'Resumo da edición',
                size: 'Tamaño actual',
                created: 'Páxina creada.',
                loading: 'A cargar detalles da última edición',
                changes: 'Cambios',
                link: 'Ligazón',
                undo: 'Desfacer',
                cancel: 'Cancelar'
            },
            // Hindi
            hi: {
                lastEdited: '$ 1 $ 2 से एडिट',
                minor: 'छो',
                comment: 'संपादन का सारांश',
                size: 'मौजूदा आकार',
                created: 'नए पेज',
                loading: 'लदान',
                changes: 'बियान अधिक अंक',
                link: 'लिंक',
                undo: 'रद्द करना' ,
                cancel: 'रद्द करना'
            },
            //Fiji Hindi
            hif: {
                lastEdited: 'last edit kya $ 1 $ 2 ',
                minor: 'छो',
                comment: 'sampadana ka sarangsh',
                size: 'bortman akar',
                created: 'toiri kiiya hai',
                loading: 'load le ra hain',
                changes: 'paribartan',
                link: 'link',
                undo: 'batil' ,
                cancel: 'baril'
            },
            // Italian
            it: {
                lastEdited: 'Ultima revisione di $1 $2',
                diff: 'diff',
                minor: 'm',
                comment: 'Riassunto della modifica',
                size: 'Dimensione corrente',
                created: 'Pagina creata.',
                loading: 'Caricando i dettagli dell’ultima revisione',
                changes: 'Modifiche',
                link: 'Collegamento',
                undo: 'Annulla modifica',
                cancel: 'Annulla'
            },
            // Japanese
            ja: {
                lastEdited: '$1による編集 $2',
                diff: '差分',
                minor: '細',
                comment: '編集内容の要約',
                size: '現在のサイズ',
                created: '新しいページ',
                loading: '直近の変更を確認する',
                changes: '変更点',
                link: 'リンク',
                undo: '取り消し',
                cancel: '戻る'
            },
            // Korean
            ko: {
                lastEdited: '$1에 의해 $2 마지막으로 편집됨',
                diff: '차이',
                minor: '잔글',
                comment: '편집 요약',
                size: '현재 크기',
                created: '문서 생성',
                loading: '마지막 편집의 상세정보를 불러오는 중',
                changes: '변경사항',
                link: '링크',
                undo: '편집 취소',
                cancel: '돌아가기'
            },
            // Malay
            ms: {
                lastEdited: 'Terakhir disunting oleh $1 $2',
                diff: 'beza',
                minor: 'k',
                comment: 'Sunting ringkasan',
                size: 'Saiz semasa',
                created: 'Halaman dihasilkan.',
                loading: 'Memuatkan butiran-butiran suntingan terakhir',
                changes: 'Perubahan',
                link: 'Pautan',
                undo: 'Undo',
                cancel: 'Batal'
            },
            // Dutch
            nl: {
                lastEdited: 'Laatst bewerkt door $1 $2',
                diff: 'wijz',
                minor: 'k',
                comment: 'Bewerkingssamenvatting',
                size: 'Huidige grootte',
                created: 'Pagina aangemaakt.',
                loading: 'Details van laatste bewerking laden',
                changes: 'Wijzigingen',
                link: 'Link',
                undo: 'Ongedaan maken',
                cancel: 'Annuleren'
            },
            // Occitan
            oc: {
                lastEdited: 'Darrièr cambiament per $1 $2',
                diff: 'dif',
                minor: 'm',
                comment: 'Resumit de modificacion',
                size: 'Talha actuala',
                created: 'Pagina creada.',
                loading: 'Cargament dels detalhs del darrièr cambiament',
                changes: 'Cambiaments',
                link: 'Ligam',
                undo: 'Desfar',
                cancel: 'Anullar'
            },
            // Polish
            pl: {
                lastEdited: 'Ostatnio edytowane przez $1 $2',
                diff: 'zmiana',
                minor: 'm',
                comment: 'Opis zmian',
                size: 'Obecny rozmiar',
                created: 'Utworzona strona.',
                loading: 'Ładowanie szczegółów ostatniej edycji',
                changes: 'Zmiany',
                link: 'Link',
                undo: 'Cofnij',
                cancel: 'Anuluj'
            },
            // European Portuguese
            pt: {
                lastEdited: 'Última edição por $1 $2',
                diff: 'comparação',
                minor: 'm',
                comment: 'Resumo da edição',
                size: 'Tamanho actual',
                created: 'Página criada.',
                loading: 'A carregar detalhes da última edição',
                changes: 'Mudanças',
                link: 'Ligação',
                undo: 'Desfazer',
                cancel: 'Cancelar'
            },
            // Brazilian Portuguese
            'pt-br': {
                lastEdited: 'Editado última vez por $1 $2',
                diff: 'comparação',
                minor: 'm',
                comment: 'Resumo da Edição',
                size: 'Tamanho atual',
                created: 'Página criada.',
                loading: 'Carregando detalhes da última edição',
                changes: 'Mudanças',
                link: 'Link',
                undo: 'Desfazer',
                cancel: 'Cancelar'
            },
            // Kannada
            kn: {
                lastEdited: 'ಕೊನೆಯದಾಗಿ ಸಂಪಾದಿಸಲಾಗಿದೆ $1 $2',
                diff: 'ವ್ಯತ್ಯಾಸ',
                minor: 'ಸಣ್ಣ',
                comment: 'ಸಾರಾಂಶ',
                size: 'ಪ್ರಸ್ತುತ ಗಾತ್ರ',
                created: 'ಪುಟ ರಚಿಸಲಾಗಿದೆ.',
                loading: 'ಕೊನೆಯ ಸಂಪಾದನೆಯನ್ನು ಕುರಿತ ವಿವರಗಳು ಲೋಡ್ ಆಗುತ್ತಿದೆ',
                changes: 'ಬದಲಾವಣೆಗಳು',
                link: 'ಸಂಪರ್ಕ ಕೊಂಡಿ',
                undo: 'ರದ್ದು ಮಾಡಲು',
                cancel: 'ರದ್ದು'
            },
            // Romanian
            ro: {
                lastEdited: 'Ultimă ediţie de $1 $2',
                diff: 'dif',
                minor: 'm',
                comment: 'Rezumat ediţiei',
                size: 'Mărime actual',
                created: 'Pagină creată.',
                loading: 'Încărcând detalii cu privire la ultima ediţie',
                changes: 'Schimburi',
                link: 'Link',
                undo: 'Desfacere',
                cancel: 'Anulare'
            },
            // Russian
            ru: {
                lastEdited: 'Последняя правка $1 $2',
                diff: 'разн.',
                minor: 'м',
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
                minor: 's',
                comment: 'Ootline',
                size: 'Current size',
                created: 'Creautit page.',
                loading: 'Laidin details o hintmaist eedit',
                changes: 'Chynges',
                link: 'Link',
                undo: 'Ondae',
                cancel: 'Cancel'
            },
            // Valencian
            val: {
                lastEdited: 'Últim canvi per $1 el $2',
                diff: 'dif',
                minor: 'm',
                comment: 'Resum de l’edició',
                size: 'Tamany actual',
                created: 'Pàgina creada.',
                loading: 'Carregant detalls de l’última edició',
                changes: 'Canvis',
                link: 'Enllaç',
                undo: 'Desfer',
                cancel: 'Cancelar'
            },
            // Vietnamese
            vi: {
                lastEdited: 'Sửa đổi lần cuối bởi $1 $2',
                diff: 'khác',
                minor: 'n',
                comment: 'Tóm lược sửa đổi',
                size: 'Kích thước hiện tại',
                created: 'Tạo trang.',
                loading: 'Tải chi tiết của lần sửa đổi cuối',
                changes: 'Thay đổi',
                link: 'Link',
                undo: 'Lùi sửa',
                cancel: 'Quay lại'
            },
             // Українська
            uk: {
                lastEdited: 'Останній раз внесено зміни $1 $2',
                diff: 'порівняти',
                minor: 'м',
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
                minor: '小',
                comment: '編輯簡要',
                size: '目前頁面大小',
                created: '建立新頁面。',
                loading: '最後編輯明細載入中',
                changes: '變動',
                link: '連結',
                undo: '復原',
                cancel: '取消'
            }
        },
        canRollback: /(bureaucrat|sysop|helper|vstf|staff|content-moderator|rollback)/.test(mw.config.get('wgUserGroups').join(' ')),
        get: function(options) {
            var serialized = [];
            for (var i in options) {
                serialized.push(mw.util.wikiUrlencode(i) + '=' + mw.util.wikiUrlencode(options[i]));
            }
            serialized = '?' + serialized.join('&');
            var xhr = new XMLHttpRequest();
            xhr.open('GET', mw.util.wikiScript('api') + serialized, true);
            xhr.onload = function() {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.query.pages['-1']) {
                        return;
                    }
                    lastEdited.add(response.query.pages[lastEdited.id].revisions);
                }
            };
            xhr.send();
        },
        add: function(data) {
            if (!data[1]) return;
            var prev = data[1];
            data = data[0];
            var html = '<div id="lastEdited" class="lastEdited"><img alt="' + lastEdited.i18n.loading + '" title="' + lastEdited.i18n.loading + '" style="margin:2px 10px" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif"></div>';
            switch (mw.config.get('skin')) {
                case 'oasis':
                case 'wikia':
                    if (lastEdited.options.position.element && lastEdited.options.position.method) {
                        if (lastEdited.options.position.method == 'append') {
                            var div = document.createElement('div');
                            div.innerHTML = html;
                            html = div.firstChild;
                            lastEdited.options.position.element.appendChild(html);
                        } else if (lastEdited.options.position.method == 'prepend') {
                            lastEdited.options.position.element.children[0].insertAdjacentHTML('beforeBegin', html);
                        }
                    } else {
                        if (document.querySelector('#WikiaMainContent')) {
                            var div = document.createElement('div');
                            div.innerHTML = html;
                            html = div.firstChild;
                            document.querySelector('#WikiaMainContent').appendChild(html);
                            mw.util.addCSS('#lastEdited { line-height: normal; font-size: 12px; font-weight: normal; }');
                        } else {
                            document.getElementsByClassName('UserProfileActionButton')[0].insertAdjacentHTML('afterEnd', html);
                        }
                    }
                    break;
                case 'monobook':
                case 'wowwiki':
                case 'uncyclopedia':
                    document.getElementById('bodyContent').children[0].insertAdjacentHTML('beforeBegin', html);
                    break;
            }
            var time = '<span class="timeago" title="' + data.timestamp + '"></span>';
            if (lastEdited.options.time == 'timestamp') {
                var date = new Date(data.timestamp).toString();
                if (lastEdited.options.timezone && lastEdited.options.timezone == 'UTC') {
                    date = new Date(data.timestamp).toUTCString();
                }
                time = date.slice(0, 3) + ', ' + date.slice(4, 15) + ', ' + date.slice(16, 24);
            }
            var user = mw.util.wikiUrlencode(data.user);
            user = '<a href="/wiki/User:' + user + '">' + data.user + '</a> (<a href="/wiki/User_talk:' + user + '">talk</a> | <a href="/wiki/Special:Contributions/' + user + '">contribs</a>' + (/(bureaucrat|sysop|helper|vstf|staff)/.test(mw.config.get('wgUserGroups').join(' ')) ? ' | <a href="/wiki/Special:Block/' + user + '">block</a>' : '') + ')';
            html = lastEdited.i18n.lastEdited.replace(/\$1/g, '<img id="lastEdited-avatar"/>' + user).replace(/\$2/g, time);
            if (lastEdited.options.diff && data.diff.from) {
                html += ' (<a style="cursor:pointer" id="lastEdited-diff-link">' + lastEdited.i18n.diff + '</a>)';
            }
            if (data.minor == '') {
                html += ' <span style="font-weight: bold;">[' + lastEdited.i18n.minor +']</span>';
            }
            if (lastEdited.options.comment && data.parsedcomment) {
                if (data.parsedcomment.indexOf('Created page with') > -1) {
                   html += '<br>' + lastEdited.i18n.comment + ': ' + lastEdited.i18n.created;
                } else {
                   html += '<br>' + lastEdited.i18n.comment + ': ' + data.parsedcomment;
                }
            }
            if (lastEdited.options.size) {
                var bytes = data.size - prev.size,
                    span = document.createElement('span');
                if (Math.abs(bytes) > 500) {
                    span.style.fontWeight = 'bold';
                }
                span.style.color = bytes > 0 ? '#006500' : '#8b0000';
                if (bytes === 0) {
                    span.style.color = '#aaaaaa';
                }
                span.innerHTML = '(' + (bytes > 0 ? '+' : '') + bytes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ')';
                html += '<br>' + lastEdited.i18n.size + ': ' + data.size + ' bytes ' + span.outerHTML;
            }
            document.getElementById('lastEdited').innerHTML = html;
            if (lastEdited.options.avatar) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '/api/v1/User/Details?ids=' + data.userid + '&size=' + lastEdited.options.avatarsize, true);
                xhr.onload = function() {
                    if (xhr.status == 200) {
                        var avatar = document.getElementById('lastEdited-avatar');
                        avatar.setAttribute('src', JSON.parse(xhr.responseText).items[0].avatar);
                        avatar.setAttribute('height', lastEdited.options.avatarsize);
                        avatar.setAttribute('width', lastEdited.options.avatarsize);
                        avatar.insertAdjacentHTML('afterEnd', '&nbsp;');
                    }
                };
                xhr.send();
            }
            jQuery('.timeago').timeago();
            if (document.getElementById('lastEdited-diff-link')) {
                document.getElementById('lastEdited-diff-link').addEventListener('click', function() {
                    require(['wikia.ui.factory'], function(ui) {
                        ui.init(['modal']).then(function(modal) {
                            var config = {
                                vars: {
                                    id: 'lastEdited-diff',
                                    size: 'large',
                                    title: lastEdited.i18n.changes + ': ' + lastEdited.title.replace(/_/g, ' '),
                                    content: '<div id="lastEdited-diff-changes" class="WikiaArticle diff"><table style="width: 100%;">' + data.diff['*'] + '</table></div>',
                                    buttons: [{
                                        vars: {
                                            value: lastEdited.i18n.cancel,
                                            data: [{
                                                key: 'event',
                                                value: 'close'
                                            }]
                                        }
                                    }, {
                                        vars: {
                                            value: lastEdited.i18n.link,
                                            classes: ['normal', 'primary'],
                                            data: [{
                                                key: 'event',
                                                value: 'link'
                                            }]
                                        }
                                    }, {
                                        vars: {
                                            value: lastEdited.i18n.undo,
                                            classes: ['normal', 'primary'],
                                            data: [{
                                                key: 'event',
                                                value: 'undo'
                                            }]
                                        }
                                    }]
                                }
                            };
                            if (lastEdited.canRollback && mw.config.get('wgUserName') !== data.user) {
                                config.vars.buttons.push({
                                    vars: {
                                        value: 'Rollback',
                                        classes: ['normal', 'primary'],
                                        data: [{
                                            key: 'event',
                                            value: 'rollback'
                                        }]
                                    }
                                });
                            }
                            modal.createComponent(config, function(diffModal) {
                                diffModal.bind('link', function() {
                                    diffModal.trigger('close');
                                    window.open('/?diff=' + data.diff.to, '_blank');
                                });
                                diffModal.bind('undo', function() {
                                    diffModal.trigger('close');
                                    window.open('/wiki/' + mw.util.wikiUrlencode(lastEdited.title) + '?action=edit&undoafter=' + data.diff.from + '&undo=' + data.diff.to, '_blank');
                                });
                                diffModal.bind('rollback', function() {
                                    var xhr = new XMLHttpRequest();
                                    xhr.open('POST', mw.util.wikiScript('api') + '?action=rollback&title=' + mw.util.wikiUrlencode(lastEdited.title) + '&user=' + mw.util.wikiUrlencode(data.user) + '&token=' + mw.util.wikiUrlencode(data.rollbacktoken) + '&format=json', true);
                                    xhr.onload = function() {
                                        if (xhr.status == 200) {
                                            var response = JSON.parse(xhr.responseText);
                                            if (!response.error) {
                                                window.location.reload();
                                            }
                                        }
                                    };
                                    xhr.send();
                                });
                                mw.loader.using(['mediawiki.action.history.diff'], function() {
                                    diffModal.show();
                                });
                            });
                        });
                    });
                });
            }
        },
        init: function() {
            lastEdited.options = lastEdited.extend({
                avatar: true,
                avatarsize: 15,
                size: true,
                diff: true,
                comment: true,
                time: 'timeago',
                position: {
                     element: '',
                     method: ''
                },
                namespaces: {
                    include: [],
                    exclude: []
                },
                pages: []
            }, window.lastEdited);
            var allowed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 110, 111, 828, 829, 1202];
            if (lastEdited.options.namespaces.include && lastEdited.options.namespaces.include.constructor == Array) {
                for (var i in lastEdited.options.namespaces.include) {
                    allowed.push(lastEdited.options.namespaces.include[i]);
                }
            }
            if (lastEdited.options.namespaces.exclude && lastEdited.options.namespaces.exclude.constructor == Array) {
                allowed = allowed.filter(function(elem) {
                    return lastEdited.options.namespaces.exclude.indexOf(elem) < 0;
                });
            };
            lastEdited.allowed = allowed;
            lastEdited.i18n = (lastEdited.options.lang && typeof lastEdited.options.lang == 'string') ? lastEdited.extend(lastEdited.i18n.en, lastEdited.i18n[lastEdited.options.lang]) : lastEdited.extend(lastEdited.i18n.en, lastEdited.i18n[mw.config.get('wgUserLanguage')]);
            if (
                !mw.util.getParamValue('diff') && !mw.util.getParamValue('oldid') &&
                lastEdited.allowed.indexOf(mw.config.get('wgNamespaceNumber')) > -1 &&
                !(lastEdited.options.pages.indexOf(lastEdited.title) > -1) &&
                !mw.config.get('wgIsMainPage') &&
                !window.lastEditedLoaded
            ) {
                window.lastEditedLoaded = true;
                var query = {
                    action: 'query',
                    titles: lastEdited.title,
                    prop: 'revisions',
                    rvprop: 'timestamp|user|userid|size|parsedcomment|flags',
                    rvlimit: 2,
                    rvdiffto: 'prev',
                    format: 'json'
                };
                if (lastEdited.canRollback) {
                    query.rvtoken = 'rollback';
                }
                mw.util.addCSS(
                    '#lastEdited-diff-changes .diff-marker {' +
                        'width: auto;' +
                    '}' +
                    '#lastEdited-diff-changes td {' +
                        'width: 50%;' +
                        'padding: 5px;' +
                    '}'
                );
                lastEdited.get(query);
            }
        }
    };
    lastEdited.init();
})();