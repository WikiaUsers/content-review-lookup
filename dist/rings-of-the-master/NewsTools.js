/**
 * @Name            NewsTools
 * @Version         v1.1
 * @Author          TheGoldenPatrik1
 * @Protect         <nowiki>
 * @Description     Adds a variety of tools for News Team writers
 */
(function() {
    /**
     * Get config
     * Only load once
     * Restrict to certain usergroups, namespaces, and pages
     */
    var config = mw.config.get([
        'wgUserGroups',
        'wgTitle',
        'wgNamespaceNumber',
        'wgPageName'
    ]);
    if (
        window.NewsToolsLoaded ||
        !/sysop|content-moderator/.test(config.wgUserGroups.join()) ||
        config.wgNamespaceNumber !== 4 ||
        ['NT/Changelog News', 'NT/Wiki Event News', 'NT/Wiki Policy News', 'NT/Tech News', 'NT/Fandom News', 'NT/Opinion Polls'].indexOf(config.wgTitle) === -1
    ) {
        return;
    }
    window.NewsToolsLoaded = true;
    /**
     * Custom edit buttons
     */
    if (config.wgPageName === 'Rings_of_the_Master_Wikia:NT/Opinion_Polls')
    {
        /**
         * Opinion Polls buttons
         */
        if (mwCustomEditButtons) {
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                'imageFile': '',
                'speedTip': 'OPS',
                'tagOpen': '{{OPS\n|title    = ',
                'tagClose': ' News Polls\n|content  = <poll>\n</poll>}}',
                'sampleText' : ' '
            };
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                'imageFile': '',
                'speedTip': 'Poll',
                'tagOpen': '<poll>\n',
                'tagClose': '\n</poll>'
            };
        }
    } else {
        /**
         * Other buttons
         */
        if (mwCustomEditButtons) {
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                'imageFile': '',
                'speedTip': 'Code',
                'tagOpen': '<code style="white-space: nowrap;">',
                'tagClose': '</code>'
            };
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                'imageFile': '',
                'speedTip': 'Nowiki',
                'tagOpen': '<nowiki>',
                'tagClose': '</nowiki>'//<nowiki>
            };
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                'imageFile': '',
                'speedTip': 'Strong',
                'tagOpen': '<strong>',
                'tagClose': '</strong>'
            };
        }
    }
    /**
     * Clear button
     * Changes text based on pagename
     */
    var text = {
        'Rings_of_the_Master_Wikia:NT/Changelog_News': '{{DetailStart}}\n<tabber>\n|-|Changelog News={{MercuryTab|Changelog News}}\n\n\n\n</tabber>\n{{DetailStop}}\n{{NTNav}}\n{{DISPLAYTITLE:Changelog News Draft}}\n__NOTOC__',
        'Rings_of_the_Master_Wikia:NT/Wiki_Event_News': '{{DetailStart}}\n<tabber>\n|-|Event News={{MercuryTab|Event News}}\n\n\n\n</tabber>\n{{DetailStop}}\n{{NTNav}}\n{{DISPLAYTITLE:Event News Draft}}\n__NOTOC__',
        'Rings_of_the_Master_Wikia:NT/Wiki_Policy_News': '{{DetailStart}}\n<tabber>\n|-|Policy News={{MercuryTab|Policy News}}\n\n\n\n</tabber>\n{{DetailStop}}\n{{NTNav}}\n{{DISPLAYTITLE:Policy News Draft}}\n__NOTOC__',
        'Rings_of_the_Master_Wikia:NT/Tech_News': '{{DetailStart}}\n<tabber>\n|-|Tech News={{MercuryTab|Tech News}}\n\n\n\n</tabber>\n{{DetailStop}}\n{{NTNav}}\n{{DISPLAYTITLE:Tech News Draft}}\n__NOTOC__',
        'Rings_of_the_Master_Wikia:NT/Fandom_News': '{{DetailStart}}\n<tabber>\n|-|FANDOM News={{MercuryTab|FANDOM News}}\n\n\n\n</tabber>\n{{DetailStop}}\n{{NTNav}}\n{{DISPLAYTITLE:FANDOM News Draft}}\n__NOTOC__',
        'Rings_of_the_Master_Wikia:NT/Opinion_Polls': '{{DetailStart}}\n<tabber>\n|-|Opinion Polls=\n\n\n\n</tabber>\n{{DetailStop}}\n{{NTNav}}\n{{DISPLAYTITLE:Opinion Polls Draft}}\n__NOTOC__'
    }[config.wgPageName];
    $('.page-header__contribution-buttons .wds-list').append(
        $('<li>').append(
            $('<a>', {
                href: '#',
                id: 'ca-clear',
                text: 'Clear',
                click: click
            })
        )
    );
        function click() {
            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                dataType: 'json',
                data: {
                    action: 'edit',
                    title: config.wgPageName,
                    summary: '[[MediaWiki:NewsTools.js|Clearing]]',
                    text: text,
                    format: 'json',
                    token: mw.user.tokens.get('editToken')
                }
            }).done(function(data) {
                if (data.edit.result === 'Success') {
                    new BannerNotification('Page cleared!', 'confirm').show();
                    window.location.reload();
                } else {
                    new BannerNotification('An error occurred.', 'error').show();
                }
            }).fail(function(data) {
                new BannerNotification('An error occurred.', 'error').show();
            });
        }
    })
();