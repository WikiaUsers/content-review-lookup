if (!$('#adminToolsWrapper').length) {
    $('.wds-global-navigation__content-bar-right .wds-button.wds-is-secondary.wds-global-navigation__link-button').wrap('<div class="wds-button-group" id="adminToolsWrapper"/>');
    $('.wds-global-navigation__content-bar-right .wds-button.wds-is-secondary.wds-global-navigation__link-button[data-tracking-label="start-a-wiki"]').css('padding', 'padding: 7px 16px;');
    mw.hook('dev.wds').add(function(wds) {
        var admin = mw.config.get('wgUserGroups');
        var userToBlock;
        $('.wds-global-navigation .wds-button.wds-is-secondary.wds-global-navigation__link-button[data-tracking-label="start-a-wiki"]').after(
                $('<div>')
                    .addClass('wds-dropdown')
                    .append(
                        $('<div>')
                        .attr('id', 'wds-global-navigation__admin-tools')
                        .addClass('wds-button wds-is-secondary wds-global-navigation__link-button wds-dropdown__toggle')
                        .attr('style', 'border-left: none !important; padding: 4px 3px !important;')
                        .html(wds.icon('more'))
                        .after(
                            $('<div>')
                            .addClass('wds-dropdown__content wds-is-right-aligned wds-is-not-scrollable')
                            .append(
                                $('<ul>')
                                .addClass('wds-list wds-is-linked')
                                .append(
                                    $('<li>').append(
                                        $('<a>')
                                        .attr('href', '/wiki/Special:RecentChanges')
                                        .attr('id', 'adminTools-rc')
                                        .text('Recent Changes')
                                    )
                                    .after(
                                        $('<li>').append(
                                            $('<a>')
                                            .attr('href', '/wiki/Special:UserRights')
                                            .attr('id', 'adminTools-rights')
                                            .text('User Rights')
                                        )
                                        .after(
                                            $('<li>').append(
                                                $('<a>')
                                                .attr('href', '/wiki/Special:Log')
                                                .attr('id', 'adminTools-log')
                                                .text('All Logs')
                                        )
                                        .after(
                                            $('<li>').append(
                                                $('<a>')
                                                .attr('href', '/wiki/Special:ThemeDesigner')
                                                .attr('id', 'adminTools-td')
                                                .text('Theme Designer')
                                        )
                                        .after(
                                            $('<li>').append(
                                                $('<a>')
                                                .attr('href', '/wiki/Special:WhatLinksHere')
                                                .attr('id', 'adminTools-wlh')
                                                .text('What Links Here')
                                        )
                                        .after(
                                            $('<li>').append(
                                                $('<a>')
                                                .attr('href', '/wiki/Special:ListAdmins')
                                                .attr('id', 'adminTools-la')
                                                .text('Local Admins')
                                        )
                                        .after(
                                            $('<li>').append(
                                                $('<a>')
                                                .attr('href', '/wiki/Special:Contact/General')
                                                .attr('id', 'adminTools-staff')
                                                .text('Contact Staff')
                                        )
                                        .after(
                                            $('<li>').append(
                                                $('<a>')
                                                .attr('href', '/announcements')
                                                .attr('id', 'adminTools-announce')
                                                .text('Announcements')
                                        )
                                        .after(
                                            $('<li>').append(
                                                $('<a>')
                                                .click(openBlockModal())
                                                .addClass('wds-button wds-is-secondary wds-is-disabled wds-global-navigation__link-button')
                                                .attr('id', 'adminTools-block')
                                                .css('padding', '7px 12px')
                                                .text('Block')
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
 
        )
    )
    )
    )
    );
    mw.hook('dev.ui').add(function(ui) {
        function openBlockModal() { // doesn't work if i define openBlockModal() here
            $.showCustomModal('Block a User',
            ui({
                type: "div",
                attr: {
                    id: "atblock-modal"
                },
                children: [
                    {
                        type: "div",
                        attr: {
                            id: "atblock-legend"
                        },
                        text: "Enter the name of the user you would like to block below:"
                    },
                    {
                        type: "input",
                        attr: {
                            id: "atblock-user"
                        }
                    }
                ]
            })
        );
        userToBlock = document.getElementById('atblock-user').value;
        $('.wds-global-navigation .wds-button.wds-is-secondary.wds-is-disabled').attr('href', 'Special:Block/' + userToBlock)
        }
    });
});
    // only activate if i'm an admin
    if (/sysop/.test(admin.join())) {
        $('.wds-global-navigation .wds-button.wds-is-secondary.wds-is-disabled').removeClass('wds-is-disabled')
    }
// too small to put in a seperate document lol
mw.util.addCSS(' \
.wds-global-navigation #wds-global-navigation__admin-tools #wds-icons-more { \
	transform: scale(0.8); \
}');
importArticles({
	type: 'script',
	articles: [
        'u:dev:MediaWiki:WDSIcons/code.js',
		'u:dev:MediaWiki:UI-js/code.js',
		'u:dev:MediaWiki:AjaxBlock/code.js',
	]
});
}
//