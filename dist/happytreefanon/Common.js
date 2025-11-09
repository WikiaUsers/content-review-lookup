var ajaxRefresh = 60;
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');


/* User Tags */
// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 30,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: false,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
tags: {
		fluttershy: { u: 'fluttershy', order: 2 },
		handy: { u: 'handy', order: 2 },
		flaky: { u: 'flaky', order: 3 },
		werehog: { u: 'werehog', order: 4 },
		cynder: { u: 'cynder', order: 5 },
		sans: { u: 'sans', order: 2 },
			}
};
 
UserTagsJS.modules.custom = {
	"GamingDubstepGriffin101": ['sysop', 'bureaucrat', 'fluttershy', 'flaky', 'werehog', 'cynder'],
	'Captain Sans Nightmare': ['sysop', 'bureaucrat', 'sans'],
	'BlueTide': ['handy'],
};
 
UserTagsJS.modules.userfilter = {
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


// reports
mw.loader.using(['mediawiki.util', 'oojs-ui']).then(function() {
    $(function() {
        if (mw.config.get('wgNamespaceNumber') < 0) return;

        // List of pages that should NOT show the report button
        var excludedPages = [
            'Happy_Tree_Fanon_Wiki',
            'Happy_Tree_Friends_Fanon_Wiki:Rules'
        ];

        var pageName = mw.config.get('wgPageName');
        var userName = mw.config.get('wgUserName');

        // Stop if user is not logged in
        if (!userName) return;

        // Stop if this page is in the excluded list
        if (excludedPages.includes(pageName)) return;

        var $reportBtn = $('<a href="#">')
            .text('Report Article')
            .addClass('oo-ui-buttonElement oo-ui-buttonElement-framed oo-ui-widget oo-ui-buttonElement-button')
            .css({ 'margin-top': '15px', 'display': 'block' })
            .on('click', function() {
                var dialog = new OO.ui.MessageDialog();
                var windowManager = new OO.ui.WindowManager();
                $('body').append(windowManager.$element);
                windowManager.addWindows([dialog]);

                var input = new OO.ui.MultilineTextInputWidget({
                    placeholder: 'Explain the issue with this article...',
                    rows: 4,
                    autosize: true
                });

                var panel = new OO.ui.PanelLayout({
                    padded: true,
                    expanded: false
                });
                panel.$element.append(input.$element);

                windowManager.openWindow(dialog, {
                    title: 'Report Article',
                    message: panel,
                    actions: [
                        { action: 'cancel', label: 'Cancel', flags: 'safe' },
                        { action: 'submit', label: 'Submit', flags: ['primary', 'progressive'] }
                    ]
                }).closed.then(function(data) {
                    if (data && data.action === 'submit') {
                        $.post('https://marblyn.net/wiki/fanonwebhook.php', {
                            page: pageName,
                            user: userName,
                            url: mw.config.get('wgServer') + mw.config.get('wgArticlePath').replace('$1', pageName),
                            reason: input.getValue()
                        });
                    }
                });
            });

        var $catlinks = $('#catlinks');
        if ($catlinks.length) {
            $reportBtn.insertBefore($catlinks);
        } else {
            $('.page-footer').prepend($reportBtn);
        }
    });
});