/**
 * @name         Readable RecentChanges
 * @description  Reformats Special:RecentChanges into a more readable list.
 *               Requires entries be "ungrouped".
 * @version      1.0
 * @author       Himmalerin
 */
(function () {
    "use strict";

    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Recentchanges' || window.readableRC) {
        return;
    }

    // Import Dorui for building the new entries
    importArticle({type: 'script', article: 'u:dev:MediaWiki:Dorui.js'});

    window.ReadableRecentChanges = {
        getEditEntry: function getEditEntry(entry) {
            return {
                classes: entry.classList,
                // Edit information
                title: entry.querySelector('.mw-changeslist-title'),
                changeslist: entry.querySelector('.mw-changeslist-links:first-of-type'),
                timestamp: entry.querySelector('.mw-changeslist-date'),
                diffChange: entry.querySelector('.mw-diff-bytes'),
                // Edit statuses
                newPage: entry.querySelector('.newpage'),
                minorEdit: entry.querySelector('.minoredit'),
                botEdit: entry.querySelector('.botedit'),
                unpatrolled: entry.querySelector('.unpatrolled'),
                // Author information
                author: entry.querySelector('.mw-userlink'),
                authorTools: entry.querySelector('.mw-usertoollinks'),
                // Edit summary
                summary: entry.querySelector('.comment'),
            };
        },

        buildEditEntry: function buildEditEntry(entryData) {
            return window.dev.dorui.li({
                classes: ['readable-rc-entry'].concat(Array.from(entryData.classes)),
                children: [
                    // Edit information and statuses
                    window.dev.dorui.div({
                        classes: ['readable-rc-line', 'readable-rc-information'],
                        children: [
                            // information
                            entryData.title,
                            entryData.changeslist,
                            entryData.timestamp,
                            entryData.diffChange,
                            // statuses
                            entryData.newPage,
                            entryData.minorEdit,
                            entryData.botEdit,
                            entryData.unpatrolled,
                        ],
                    }),
                    // Author information
                    window.dev.dorui.div({
                        classes: ['readable-rc-line', 'readable-rc-author'],
                        children: [entryData.author, entryData.authorTools],
                    }),
                    // Edit summary
                    window.dev.dorui.div({
                        classes: ['readable-rc-line', 'readable-rc-summary'],
                        children: [entryData.summary],
                    }),
                ],
            });
        },

        editEntry: function editEntry(entry) {
            const entryData = this.getEditEntry(entry);

            const talkLink = entryData.authorTools.querySelector('.mw-usertoollinks-talk, .mw-usertoollinks-wall');
            if (talkLink !== null) {
                talkLink.textContent = 't';
            }

            const blockLink = entryData.authorTools.querySelector('.mw-usertoollinks-block');
            if (blockLink !== null) {
                blockLink.textContent = 'b';
            }

            entryData.authorTools.querySelector('.mw-usertoollinks-contribs').textContent = 'c';

            entry.replaceWith(this.buildEditEntry(entryData));
        },

        getLogEntry: function getLogEntry(entry) {
            return {
                classes: entry.classList,
                // Log information
                log: entry.querySelector('.mw-changeslist-line-inner a:first-of-type'),
                timestamp: entry.querySelector('.mw-changeslist-date'),
                // Log statuses
                newPage: entry.querySelector('.newpage'),
                minorEdit: entry.querySelector('.minoredit'),
                botEdit: entry.querySelector('.botedit'),
                unpatrolled: entry.querySelector('.unpatrolled'),
                // Author information
                author: entry.querySelector('.mw-userlink'),
                authorTools: entry.querySelector('.mw-usertoollinks'),
                // Log summary
                summary: entry.querySelector('.comment'),
            };
        },

        buildLogEntry: function buildLogEntry(entryData, logAction) {
            return window.dev.dorui.li({
                classes: ['readable-rc-entry'].concat(Array.from(entryData.classes)),
                children: [
                    // Log information and statuses
                    window.dev.dorui.div({
                        classes: ['readable-rc-line', 'readable-rc-information'],
                        children: [
                            // information
                            entryData.log,
                            entryData.timestamp,
                            // statuses
                            entryData.newPage,
                            entryData.minorEdit,
                            entryData.botEdit,
                            entryData.unpatrolled,
                        ],
                    }),
                    // Author information
                    window.dev.dorui.div({
                        classes: ['readable-rc-line', 'readable-rc-author'],
                        children: [
                            entryData.author,
                            entryData.authorTools,
                            window.dev.dorui.span({children: Array.from(logAction)}),
                        ],
                    }),
                    // Log summary
                    window.dev.dorui.div({
                        classes: ['readable-rc-line', 'readable-rc-summary'],
                        children: [entryData.summary],
                    }),
                ],
            });
        },

        logEntry: function logEntry(entry) {
            const entryData = this.getLogEntry(entry);

            var logAction = '';
            const innerLine = entry.querySelector('.mw-changeslist-line-inner').childNodes;
            for (var i = 0; i < innerLine.length; i++) {
                if (innerLine[i].classList && innerLine[i].classList.contains('mw-usertoollinks')) {
                    logAction = Array.from(innerLine).slice(i + 1);
                }
            }

            const talkLink = entryData.authorTools.querySelector('.mw-usertoollinks-talk, .mw-usertoollinks-wall');
            if (talkLink !== null) {
                talkLink.textContent = 't';
            }

            const contribsLink = entryData.authorTools.querySelector('.mw-usertoollinks-contribs');
            if (contribsLink !== null) {
                contribsLink.textContent = 'c';
            }

            const blockLink = entryData.authorTools.querySelector('.mw-usertoollinks-block');
            if (blockLink !== null) {
                blockLink.textContent = 'b';
            }

            entry.replaceWith(this.buildLogEntry(entryData, logAction));
        },

        convertEntries: function convertEntries($content) {
            const editEntries = $content.get(0).querySelectorAll('.mw-changeslist-edit');
            const logEntries = $content.get(0).querySelectorAll('.mw-changeslist-log');

            // Modify all edit entries
            editEntries.forEach(function (entry) {
                this.editEntry(entry);
            }, this);

            // Modify all log entries
            logEntries.forEach(function (entry) {
                this.logEntry(entry);
            }, this);
        },

        // Initialize everything and start the conversion
        init: function init() {
            mw.hook('wikipage.content').add(function ($content) {
                ReadableRecentChanges.convertEntries($content);
            });
        },
    };

    mw.hook('doru.ui').add(function () {
        ReadableRecentChanges.init();
    });
})();