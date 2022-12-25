(function (window, $, mw) {
        "use strict";

        // Bulk loading scripts.
        // scriptList are scripts to load everywhere
        // pageScriptList are scripts which only certain pages need.
        var scriptList = [],
                pageScriptList = [];

                       /* Scripts to be loaded everywhere */

        // Make WantedFiles File:xxx entries become links to Special:Upload (bug fix)
        scriptList.push('MediaWiki:Common.js/FixWantedFiles.js');

        // Configure AjaxRC
        (window.ajaxPages = (window.ajaxPages || [])).push(
                "Special:RecentChanges",
                "Special:Watchlist",
                "Special:Log",
                "Special:Contributions",
                "Special:NewFiles",
                "Special:NewPages",
                "Special:ListFiles",
                "Special:WikiActivity"
        );
        window.AjaxRCRefreshText = 'Automatically refresh every 60secs';
        window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
        scriptList.push('u:dev:AjaxRC/code.js');

        // ArchiveTool
        window.archiveListTemplate = 'ArchiveList';
        window.archivePageTemplate = 'ArchivePage';
        scriptList.push('u:dev:ArchiveTool/code.js');

        // Refresh button
        scriptList.push('u:dev:PurgeButton/code.js');

        // List Files. See [[Narutopedia:ListFiles]]
        scriptList.push('u:dev:ListFiles/code.js');

        // Sig Reminder
        scriptList.push('MediaWiki:Common.js/SigReminder.js');

        // Warnings
        scriptList.push('MediaWiki:Common.js/Warnings.js');

        // Reference Popups, like on Wikipedia
        scriptList.push('u:dev:ReferencePopups/code.js');

                            /* Page specific scripts */

        // List Duplicate images
        if (mw.config.get('wgPageName') === 'Narutopedia:Duplicate_Images') {
                pageScriptList.push('u:dev:DupImageList/code.js');
        }

        // Custom Special:[Multiple]Upload UI
        $(function ($) {
                // Detach the AJAX upload feature from the Recent Image Uploads "Add Image" button
                // because the pop-up form does not obey the preloads and such.
                $('a.wikia-button.upphotos').off('click');
        });
        if (({
                Upload: 1,
                MultipleUpload: 1
        })[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
                pageScriptList.push(
                        'MediaWiki:Common.js/FairUseUpload.js',
                        'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
                );
        }


             /* Small scripts which donot need a seperate page */

        // Remove red-links (deleted pages) from Recent Changes
        // [They stay red, they just don't link to ?action=edit]
        if (({
                Recentchanges: 1,
                Log: 1
        })[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
                var deNewRC = function () {
                        $('a.new').each(function () {
                                this.href = this.href.replace(/\?[^?]*$/, '');
                        });
                };
                $(deNewRC);
                window.ajaxCallAgain.push(deNewRC);
        }

        // Remove dismiss option from Site Notice
        if (mw.config.get('skin') === 'monobook') {
                $('#mw-dismissable-notice > tbody > tr > td:last').remove();
        }

        // Custom edit buttons
        if ($.isArray(window.mwCustomEditButtons)) {
                mwCustomEditButtons[mwCustomEditButtons.length] = {
                        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
                        "speedTip": "Add the ū character",
                        "tagOpen": "ū",
                        "tagClose": "",
                        "sampleText": ""
                };

                mwCustomEditButtons[mwCustomEditButtons.length] = {
                        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
                        "speedTip": "Add the ō character",
                        "tagOpen": "ō",
                        "tagClose": "",
                        "sampleText": ""
                };

                mwCustomEditButtons[mwCustomEditButtons.length] = {
                        "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
                        "speedTip": "Add a Chapter Reference",
                        "tagOpen": "<ref>",
                        "tagClose": "</ref>",
                        "sampleText": "''Naruto'' chapter 0, page 0"
                };
        }

        // HOOK: Verbatim imports embedded on particular pages.
        if ($.isArray(window.pageNeededScripts)) {
                pageScriptList.push.apply(pageScriptList, window.pageNeededScripts);
                try {
                        delete window.pageNeededScripts;
                } catch (e) {
                        window.pageNeededScripts = null;
                } // IE8 sucks.
        }

        // Import all scripts in bulk (and minified)
        window.importArticles({
                type: 'script',
                articles: scriptList
        }, {
                type: 'script',
                articles: pageScriptList
        });
})(window, jQuery, mediaWiki);