(function ($) {
    // Configuration
    var userconfig = (window.ArchiveToolConfig) ? window.ArchiveToolConfig : {};
    var config = $.extend(true, {
            archiveListTemplate: window.archiveListTemplate || 'ArchiveList',
            archivePageTemplate: window.archivePageTemplate || 'ArchivePage',
            archiveSubpage: 'Archive',
            userLang: true,
            // Deutsch
            'de': {
                buttonArchiveTool: "Archivieren",
                buttonArchiveToolTooltip: "Seite archivieren",
                buttonSelectAll: "Alle auswählen",
                buttonDeselectAll: "Keine auswählen",
                buttonSaveArchive: "Archiv speichern",
                buttonAbort: "Abbrechen",
                labelLines: "Zeilen",
                labelSections: "Abschnitte",
                summaryArchiveFrom: "ArchiveTool: Archiviert von",
                summaryArchiveTo: "ArchiveTool: Archiviert als"
            },
            // Беларуская
            'be': {
                buttonArchiveTool: "Архіваваць",
                buttonArchiveToolTooltip: "Архіваваць гэтую старонку",
                buttonSelectAll: "Выбраць усе",
                buttonDeselectAll: "Не выбіраць нічога",
                buttonSaveArchive: "Запісаць старонку",
                buttonAbort: "Спыніць",
                labelLines: "Лінія",
                labelSections: "Секцыя",
                summaryArchiveFrom: "ArchiveTool: архівавана з",
                summaryArchiveTo: "ArchiveTool: архівавана ў"
            },
            // English
            'en': {
                buttonArchiveTool: "Archive",
                buttonArchiveToolTooltip: "Archive this page",
                buttonSelectAll: "Select all",
                buttonDeselectAll: "Deselect all",
                buttonSaveArchive: "Save archive",
                buttonAbort: "Abort",
                labelLines: "Lines",
                labelSections: "Sections",
                summaryArchiveFrom: "ArchiveTool: Archiving from",
                summaryArchiveTo: "ArchiveTool: Archiving to"
            },
            // Italian
            'it': {
                buttonArchiveTool: "Archivio",
                buttonArchiveToolTooltip: "Archivia questa pagina",
                buttonSelectAll: "Seleziona tutto",
                buttonDeselectAll: "Deseleziona tutto",
                buttonSaveArchive: "Salva archivio",
                buttonAbort: "Annulla",
                labelLines: "Righe",
                labelSections: "Sezioni",
                summaryArchiveFrom: "ArchiveTool: Archiviazione da",
                summaryArchiveTo: "ArchiveTool: Archiviazione a"
            },
            // Magyar
            'hu': {
                buttonArchiveTool: "Archívum",
                buttonArchiveToolTooltip: "Ezen oldal archiválása",
                buttonSelectAll: "Összes kiválasztása",
                buttonDeselectAll: "Kiválasztás visszavonása",
                buttonSaveArchive: "Archívum mentése",
                buttonAbort: "Megszakítás",
                labelLines: "Sorok",
                labelSections: "Szakaszok",
                summaryArchiveFrom: "ArchiveTool: Archiválás innen:",
                summaryArchiveTo: "ArchiveTool: Archiválás eddig:"
            },
            // Polski
            'pl': {
                buttonArchiveTool: "Archiwum",
                buttonArchiveToolTooltip: "Archiwizuj tę stronę",
                buttonSelectAll: "Zaznacz wszystko",
                buttonDeselectAll: "Odznacz wszystko",
                buttonSaveArchive: "Zapisz archiwum",
                buttonAbort: "Anuluj",
                labelLines: "Linie",
                labelSections: "Sekcje",
                summaryArchiveFrom: "ArchiveTool: Archiwizowanie z",
                summaryArchiveTo: "ArchiveTool: Archiwizowanie do"
            },
            // Français
            'fr': {
                buttonArchiveTool: "Archiver",
                buttonArchiveToolTooltip: "Archiver cette page",
                buttonSelectAll: "Sélectionner tout",
                buttonDeselectAll: "Désélectionner tout",
                buttonSaveArchive: "Sauvegarder l'archive",
                buttonAbort: "Annuler",
                labelLines: "Lignes",
                labelSections: "Sections",
                summaryArchiveFrom: "ArchiveTool: Archivage de",
                summaryArchiveTo: "ArchiveTool: Archivage vers"
            },
            // Русский
            'ru': {
                buttonArchiveTool: "Архивировать",
                buttonArchiveToolTooltip: "Архивировать эту страницу",
                buttonSelectAll: "Выбрать всё",
                buttonDeselectAll: "Не выбирать ничего",
                buttonSaveArchive: "Записать страницу",
                buttonAbort: "Остановить",
                labelLines: "Линия",
                labelSections: "Секция",
                summaryArchiveFrom: "ArchiveTool: архивировано из",
                summaryArchiveTo: "ArchiveTool: архивировано в"
            },
            // Українська
            'uk': {
                buttonArchiveTool: "Архівувати",
                buttonArchiveToolTooltip: "Архівувати цю сторінку",
                buttonSelectAll: "Вибрати все",
                buttonDeselectAll: "Не вибирати нічого",
                buttonSaveArchive: "Записати сторінку",
                buttonAbort: "Зупинити",
                labelLines: "Лінія",
                labelSections: "Секція",
                summaryArchiveFrom: "ArchiveTool: архівовано із",
                summaryArchiveTo: "ArchiveTool: архівовано в"
            },
            // Japanese
            'ja': {
                buttonArchiveTool: "アーカイブ",
                buttonArchiveToolTooltip: "このページをアーカイブ",
                buttonSelectAll: "すべて選択",
                buttonDeselectAll: "すべて選択解除",
                buttonSaveArchive: "アーカイブを保存",
                buttonAbort: "中止",
                labelLines: "行",
                labelSections: "セクション",
                summaryArchiveFrom: "ArchiveTool: アーカイブ元",
                summaryArchiveTo: "ArchiveTool: アーカイブ先"
            },
            // Catalan
            'ca': {
                buttonArchiveTool: "Arxivar",
                buttonArchiveToolTooltip: "Arxiva aquesta pàgina",
                buttonSelectAll: "Selecciona-ho tot",
                buttonDeselectAll: "Deselecciona-ho tot",
                buttonSaveArchive: "Desa l'arxiu",
                buttonAbort: "Cancel·la",
                labelLines: "Línies",
                labelSections: "Seccions",
                summaryArchiveFrom: "ArchiveTool: Arxivant des de",
                summaryArchiveTo: "ArchiveTool: Arxivant a"
            },
            // Spanish
            'es': {
                buttonArchiveTool: "Archivar",
                buttonArchiveToolTooltip: "Archiva esta página",
                buttonSelectAll: "Selecciona todo",
                buttonDeselectAll: "Deselecciona todo",
                buttonSaveArchive: "Guarda el archivo",
                buttonAbort: "Cancela",
                labelLines: "Líneas",
                labelSections: "Secciónes",
                summaryArchiveFrom: "ArchiveTool: Archivado desde",
                summaryArchiveTo: "ArchiveTool: Archivado a"
            }
        }, userconfig);

    // Function for multi-language support (by Daniel Friesen aka User:Dantman)
    function msg(name) {
        if (config.userLang && wgUserLanguage in config && name in config[wgUserLanguage]) {
            return config[wgUserLanguage][name];
        }
        if (wgContentLanguage in config && name in config[wgContentLanguage]) {
            return config[wgContentLanguage][name];
        }
        return config.en[name];
    }

    if (((wgNamespaceNumber % 2 !== 0 && wgNamespaceNumber > -1 ) || wgNamespaceNumber === 110) && (wgAction === "view" || wgAction === "purge")) {
        var skinConfig = {
                textCont: '',
                pageControls: '',
                controlsMarkup: '',
                buttonOpenPri: '',
                buttonOpenSec: '',
                buttonClose: ''
            };

        importStylesheetURI('http://dev.wikia.com/index.php?title=ArchiveTool/code.css&action=raw&ctype=text/css');

        switch (skin) {
        case 'monobook':
            skinConfig.textCont = '#bodyContent';
            skinConfig.pageControls = '#p-cactions > div > ul';
            skinConfig.controlsMarkup = '<li id="control_archive"><a id="ca-archive" title="' + msg('buttonArchiveToolTooltip') + '" href="#" rel="nofollow">' + msg('buttonArchiveTool') + '</a></li>';
            skinConfig.buttonOpenPri = '<input type="submit" style="font-weight: bold;" value="';
            skinConfig.buttonOpenSec = '<input type="submit" value="';
            skinConfig.buttonClose = '" />';
            break;
        case 'oasis':
        case 'wikia':
            skinConfig.textCont = '#WikiaArticle';
            skinConfig.pageControls = ($('#WikiaUserPagesHeader').length ? '.UserProfileActionButton' : '#PageHeader') + ' .wds-dropdown__content > ul';
            if (wgNamespaceNumber == 3 ) { skinConfig.pageControls = ($('#WikiaUserPagesHeader').length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button > ul'; }
            skinConfig.controlsMarkup = '<li id="control_archive"><a id="ca-archive" rel="nofollow">' + msg('buttonArchiveTool') + '</a></li>';
            skinConfig.buttonOpenPri = '<a class="wikia-button">';
            skinConfig.buttonOpenSec = '<a class="wikia-button secondary">';
            skinConfig.buttonClose = '</a>';
            break;
        }

        $(function () {
            function api(q, fn) {
                q.format = 'json';
                return $.post(wgScriptPath + '/api.php', q, fn, "json");
            }
            function token(page, fn) {
                api({
                    action: 'query',
                    query: 'prop',
                    prop: 'info',
                    titles: page,
                    intoken: 'edit'
                }, function (q) {
                    for (var k in q.query.pages) 
                        return fn(q.query.pages[k]);
                    });
            }

            function startArchiving() {
                var c = config.archiveListTemplate.substr(0, 1);
                var archiveListRegex = '[' + c.toUpperCase() + c.toLowerCase() + ']' + config.archiveListTemplate.substr(1);
                var bc = $(skinConfig.textCont).addClass('archiving').empty();
                $('<img class="ajax" alt="Loading..." />').attr({
                    src: stylepath + '/common/progress-wheel.gif'
                }).appendTo(bc);
                api({
                    action: 'query',
                    prop: 'revisions',
                    titles: wgPageName,
                    rvprop: 'timestamp|content'
                }, function (q) {
                    bc.empty();
                    var rev = q.query.pages[wgArticleId].revisions[0];
                    var time = rev.timestamp;
                    var talkToken,
                        tokenTime;
                    var content = rev['*'];
                    token(wgPageName, function (p) {
                        talkToken = p.edittoken;
                        tokenTime = p.starttimestamp;
                    });

                    var lines = content.split('\n');

                    var table = $('<table style="margin: 10px 0;"><thead><tr><th>' + msg('labelLines') + '</th><th title="' + msg('labelSections') + '">{&hellip;}</th></tr></thead></table>').appendTo(bc);
                    var ul = $('<tbody/>').appendTo(table);

                    for (var l = 0; l < lines.length; l++) {
                        var line = lines[l];
                        $('<tr/>').toggleClass('noarchive', (new RegExp('^\\{\\{' + archiveListRegex + '\}\}')).test(line)).attr({
                            line: line
                        }).append($('<td class=line />').text(line).append('&nbsp;')).appendTo(ul);
                    }

                    var sections = [];
                    var sectionEnd = lines.length - 1;
                    for (var l = lines.length - 1; l >= 0; l--) {
                        var line = lines[l];

                        if (/^=.+?=/.test(line) || l === 0) {
                            var section = {
                                    start: l,
                                    end: sectionEnd
                                };
                            section.length = section.end - section.start + 1;
                            sections.unshift(section);

                            sectionEnd = l - 1;
                        }
                    }

                    var section;
                    while (section = sections.shift()) {
                        var tr = ul.children().eq(section.start);
                        $('<td class=section />').attr({
                            rowspan: section.length
                        }).appendTo(tr);
                    }

                    $('<div class="buttons" style="text-align: right;" />').append($(skinConfig.buttonOpenSec + msg('buttonSelectAll') + skinConfig.buttonClose).click(function (e) {
                        e.preventDefault();
                        ul.children('tr').addClass('archive');
                    }), ' ', $(skinConfig.buttonOpenSec + msg('buttonDeselectAll') + skinConfig.buttonClose).click(function (e) {
                        e.preventDefault();
                        ul.children('tr').removeClass('archive');
                    }), ' ', $(skinConfig.buttonOpenPri + msg('buttonSaveArchive') + skinConfig.buttonClose).click(function (e) {
                        archive();
                    }), ' ', $(skinConfig.buttonOpenPri + msg('buttonAbort') + skinConfig.buttonClose).click(function (e) {
                        bc.find('.ajax').remove();
                        location = wgServer + wgScript + '?title=' + encodeURI(wgPageName) + '&action=purge';
                    })).prependTo(bc).clone(true).appendTo(bc);

                    var click = false;
                    var add;
                    table.mousedown(function (e) {
                        e.preventDefault();
                        var $li = $(e.target).closest('tr');
                        if (!$li.length) 
                            return;
                        var $section = $(e.target).closest('.section');
                        if ($section.length) {
                            var slist = $li.nextAll(':lt(' + (parseInt($section.attr('rowspan'), 10) - 1) + ')').andSelf();
                            var sadd = slist.filter(function () {
                                    return !$(this).hasClass('archive');
                                }).length;
                            slist.toggleClass('archive', !!sadd);
                            return;
                        }
                        click = true;
                        add = !$li.hasClass('archive');

                        $li.toggleClass('archive', !!add);
                    });
                    table.mouseover(function (e) {
                        if (!click) 
                            return;
                        var $li = $(e.target).closest('tr');
                        if (!$li.length) 
                            return;
                        
$li.toggleClass('archive', !!add);
                    });
                    $('body').mouseup(function (e) {
                        click = false;
                    });

                    function archive() {
                        var talkLines = [];
                        var archiveLines = [];
                        ul.children().each(function () {
                            var arr = $(this).hasClass('noarchive') || !$(this).hasClass('archive') ? talkLines : archiveLines;

                            arr.push($(this).attr('line'));
                        });

                        if (!(new RegExp('^\\{\\{' + archiveListRegex + '\}\}')).test(talkLines[0])) 
                            talkLines = [
                                '{{' + config.archiveListTemplate + '}}', ''
                            ].concat(talkLines);
                        archiveLines = [
                            '{{' + config.archivePageTemplate + '}}', ''
                        ].concat(archiveLines);

                        bc.empty();
                        $('<img class="ajax" alt="Loading..." />').attr({
                            src: stylepath + '/common/progress-wheel.gif'
                        }).appendTo(bc);

                        runArchive(talkLines.join('\n'), archiveLines.join('\n'));
                    }

                    var archiveTitle;
                    function runArchive(talkContent, archiveContent) {
                        var archiveNo = 1;
                        function findArchives() {
                            var m = $('<p>Finding archive id: </p>').appendTo(bc);
                            api({
                                action: 'query',
                                list: 'allpages',
                                apnamespace: wgNamespaceNumber,
                                apprefix: wgTitle + '/' + config.archiveSubpage,
                                aplimit: 'max',
                                apdir: 'ascending'
                            }, function (q) {
                                $.each(q.query.allpages, function (index, value) {
                                    qt = parseInt(q.query.allpages[index].title.substr(wgPageName.length + ("/" + config.archiveSubpage).length), 10);
                                    if (qt >= archiveNo) {
                                        archiveNo = qt + 1;
                                    }
                                });
                                archiveTitle = wgPageName + '/' + config.archiveSubpage + ' ' + archiveNo;
                                m.append('done... (using ' + archiveNo + ')');

                                saveArchive();
                            });
                        }

                        function saveArchive() {
                            var m = $('<p>Finding token for ' + archiveTitle + ': </p>').appendTo(bc);
                            token(archiveTitle, function (p) {
                                m.append('done...');
                                m = $('<p>Saving archive page: </p>').appendTo(bc);
                                api({
                                    action: 'edit',
                                    title: archiveTitle,
                                    text: archiveContent,
                                    token: p.edittoken,
                                    summary: msg('summaryArchiveFrom') + " [[" + wgPageName + "]].",
                                    minor: true,
                                    createonly: true
                                }, function (q) {
                                    if (q.error && q.error.code === "articleexists") {
                                        m.append('failed...');
                                        bc.append("<p>The archive page we tried to create already exists.</p>");
                                        return abort();
                                    }
                                    m.append('done...');

                                    saveTalk();
                                });
                            });
                        }

                        function saveTalk() {
                            var m = $('<p>Finding token for ' + wgPageName + ': </p>').appendTo(bc);
                            m.append('done...');
                            m = $('<p>Updating talk page: </p>').appendTo(bc);
                            api({
                                action: 'edit',
                                title: wgPageName,
                                text: talkContent,
                                token: talkToken,
                                summary: msg('summaryArchiveTo') + " [[" + archiveTitle + "]].",
                                minor: true,
                                basetimestamp: time,
                                starttimestamp: tokenTime
                            }, function (q) {
                                if (q.edit.result === "Success") {
                                    m.append('done...');
                                    bc.find('.ajax').remove();
                                    location = wgServer + wgScript + '?title=' + encodeURI(wgPageName) + '&action=purge';
                                } else {
                                    m.append('failed...');
                                    bc.append("<p>Failed to update talkpage, you may wish to have the archive subpage we just created deleted.</p>");
                                    return abort();
                                }
                            });
                        }

                        function abort() {
                            bc.find('.ajax').remove();
                            bc.append("<p>Aborting...</p>");

                            $("<p>You may want to </p>").append($('<a>refresh</a>').attr({
                                href: wgServer + wgArticlePath.replace('$1', encodeURI(wgPageName))
                            })).append(' and try again.').appendTo(bc);
                        }

                        // start
                        findArchives();
                    }
                });
            }

            $(skinConfig.controlsMarkup).click(startArchiving).appendTo(skinConfig.pageControls);
        });
    }
})(jQuery);