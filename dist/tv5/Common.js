/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom block message send with dev script MessageBlock */
window.MessageBlock = {
  title : 'Blocked',
  message : 'You have violated the TV5 Wiki policy. As a preventative measure, you have been blocked from editing for $2 due to $1. If you believe this block is unjustified or that there has been a mistake, you may contest this this block on my wall on Community Central.',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MessageBlock/code.js'
    ]
});

/* User profile header custom tags */
window.UserTagsJS = {
modules: {},
tags: {
sysop: { link:'Project:Administrators' },
rollback: { link:'Project:Rollback' }
}
};
window.UserTagsJS.modules.inactive = 30;
window.UserTagsJS.modules.mwGroups = ['rollback', 'sysop', 'bot', 'bot-global'];

//Link FA

var FA_enabled  = true;

function addfaicon() {
	// if disabled
	if (!FA_enabled) return;
	var pLang = document.getElementById("p-lang");
	if (!pLang) return;
	var lis = pLang.getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		var li = lis[i];
		// only links with a corresponding Link_FA template are interesting
		if (!document.getElementById(li.className + "-fa"))   continue;
		// additional class so the template can be hidden with CSS
		li.className += " FA";
		// change title (mouse over)
		li.title = "This article is rated as featured article.";
	}
}
$(addfaicon);

// Adds icons to page header bottom border
// Credits to https://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function eraIcons() {
    if ( $( '#icons' ).length ) {
    	$( '.page-header__actions' ).first().prepend( $( '#icons' ).show() );
    }
} );
/* Spoiler Alert, credits to Marvel Cinematic Universe Wiki */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
  },
    back: true
};
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

/*Welcome Module (Credits to (G)I-dle Wiki and Sia Wiki)*/
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:NewUser',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').prepend(
                $('<section>')
                    .addClass('rail-module')
                    .attr('id', 'welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('has-icon')
                            .text('Welcome to the TV5 Wiki, Kapatid!')
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('wds-button-group')
                                    .append(
                                        $('<a>')
                                            .attr('role', 'button')
                                            .addClass('wds-button')
                                            .addClass('wds-is-secondary')
                                            .attr('id', 'remove')
                                            .text('Don\'t show again')
                                    )
                                    .append(
                                        $('<a>')
                                            .attr('role', 'button')
                                            .addClass('wds-button')
                                            .addClass('wds-is-secondary')
                                            .attr('id', 'cancel')
                                            .text('Cancel')
                                    )
                            )  
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('#welcome-module .anons').show();
            }
            $('#welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('#welcome-module').fadeOut('slow');
            });
            $('#welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('#welcome-module').fadeOut('slow');
            });
        });
    }
});