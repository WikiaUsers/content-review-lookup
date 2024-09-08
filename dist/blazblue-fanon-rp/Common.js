/*================================================================================

			Common.js on BlazBlue Fanon RP Wiki. Original: Gothicpedia and BlazBlue Wiki

   Placed here JavaScript will be loaded by every user, during page loading.

===============================================================================*/


//===============================================================================
// SCRIPT IMPORT
// In the last line don't put a comma!
//===============================================================================

importArticles({
	type: "script",
	articles: [
// Scripts on Wiki
	"MediaWiki:Common.js/userTags.js",			/* Descriptions of users groups in the user profile */
	"MediaWiki:Common.js/sourceButtons.js",		/* Additional buttons in source mode */
	"MediaWiki:Common.js/extraRollbacks.js",	/* Additional buttons for rollbackers - by Monchoman45 */ 
	"MediaWiki:Common.js/articleDropdown.js",	/* Additional options for dropdown menu */
	"MediaWiki:Common.js/slider.js",			/* New slider */
	"MediaWiki:Common.js/sliderjQuery.js",		/* Slider jQuery by Tierrie */
	"MediaWiki:Common.js/editSummaries.js",		/* Edit summaries */
	"MediaWiki:Common.js/addLicense.js",		/* Easy adding the license for uploaded files */
	"MediaWiki:Common.js/licences.js",			/* License select */
	"MediaWiki:Common.js/withoutLicense.js",	/* Warning for uploading files without license */
	"MediaWiki:Common.js/showhide.js",			/* Dropdown tables */
	"MediaWiki:Common.js/oldBlogPosts.js",		/* Block commenting for 90 days old blog posts */
	"MediaWiki:Common.js/userIP.js",			/* Show IP address */
	"MediaWiki:Common.js/ajax.js",              /* Auto-refresh */
	"MediaWiki:Common.js/displayTimer.js",		/* UTC clock above articles */
 // Import scripts from other Wiki
	"u:dev:VisualSpellCheck/code.js",			/* Spellcheck in visual mode */
	"u:dev:BackToTopButton/code.js",			/* Back to top button */
	"w:dev:ReferencePopups/code.js",			/* References */
    "u:dev:ListFiles/code.js",                  /* */
	"u:dev:DupImageList/code.js",               /* List of duplicated files */
	"u:dev:SearchSuggest/code.js",              /* Suggestions for search results */
	"u:dev:WallGreetingButton/code.js",         /* Edit button for greeting on Message Wall */
	"u:dev:ListAdmins/code.js",                 /* Automatic update of list of admins and bureaucrats */
	"u:dev:LockOldBlogs/code.js",				/* Disables commenting on old blog posts */
	"u:dev:MassRename/code.js",                 /* Mass Renaming of pages on the wiki */
	"u:dev:AjaxBatchDelete/code.js",            /* Mass Deletion of pages no-longer wanted by the wiki's community */
    "u:dev:MassNullEdit/code.js",               /* Mass Null Edit of pages which have not refreshed due to edits on other pages */
    "u:dev:MassProtect/code.js",                /* Mass protection. */
    "u:dev:UserTags/code.js",                   /* Customizes Usertags */
    "u:dev:YoutubePlayer/code.js",              /* Revives MPC */
    "u:dev:MediaWiki:DiscordIntegrator/code.js",
	]
});

/* Link to Answers */
$('ul.tools li:first-child').after('<li><a href="http://blazblue-fanon-rp.wikia.com/wiki/BlazBlue_Fanon_RP_Wiki:About">Got a question about BlazBlue Fanon RP Wiki?</a></li>');

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		templates: { u: 'Template Specialist', order:-2 },
		templatesh: { u: 'Template Helper', order:-1 },
		css: { u: 'CSS Specialist', order:-2 },
		cssh: { u: 'CSS Helper', order:-1 },
		java: { u: 'Java Specialist', order:-2 },
		javah: { u: 'Java Helper', order:-1 },
		inactive: { u: 'Inactive', },
		newuser: { u: 'Rookie' },
		sysop: { u: 'Administrator', link:'BlazBlue Fanon RP Wiki:Admins', order:-1/0 },
		superadmin: { u: 'Super Admin', link:'BlazBlue Fanon RP Wiki:Admins', order:-1/0 },
		superuser: { u: 'Super User', order:-1/0 },
		coding: { u: 'Coding Specialist', order:-2 },
		codingh: { u: 'Coding Helper', order:-1 },
		lst: { u: 'Loyal Stormtrooper', order:1 },
		tr8r: { u: 'Traitor', order:1 },
		inunyan: { u: 'Inunyan', order:1 },
		drawer: { u: 'Drawer', order:1 },
		kor: { u: 'Knight of Ren', order:1 }
		}
};
UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.custom = { //Tags users with custom templates tag
	'BlackRoseIXA': ['drawer', 'templates', 'css', 'java'],
	'ZeroXEbony': ['templatesh', 'cssh'],
	'StyleMazter': ['templatesh', 'cssh', 'javah'],
	'TheKeyofTwilight': ['templatesh', 'lst', 'kor'],
	'Ethank14': ['tr8r'],
	'JYokai': ['inunyan', 'tr8r']
};
UserTagsJS.modules.implode = {
	'superadmin': ['bureaucrat', 'sysop'], // Combines bureaucrat and sysop tags together into superadmin tag
	'superuser': ['rollback', 'chatmoderator'], // Combines rollback and chat moderator tags together into superuser tag
	'coding': ['templates', 'css', 'java'], // Combines templates, css, and java specialist tags together into coding tag
	'codingh': ['templatesh', 'cssh', 'javah'], // Combines templates, css, and java helper tags together into coding helper tag
};
UserTagsJS.modules.metafilter = {
	'rollback': ['sysop'], // Remove rollback from all admins
};
 
nullEditDelay = 1000;
 
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';

  /**
 * SpoilerAlert
 * documentation at: https://dev.fandom.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 */
/* jshint curly:false jquery:true browser:true */
(function () {
    'use strict';
    var config = mw.config.get([
        'wgArticleId',
        'wgNamespaceNumber',
        'wgScriptPath',
        'wgServer'
    ]), $element = $('#SpoilerAlert');
    if (
        config.wgNamespaceNumber === -1 ||
        config.wgArticleId === 0 ||
        $element.length !== 1
    ) {
        return;
    }
    var SpoilerAlert = {
        config: $.extend({
            fadeDelay: 1600
        }, window.SpoilerAlertJS),
        toLoad: 3,
        preload: function() {
            if (--this.toLoad === 0) {
                window.dev.i18n.loadMessages('SpoilerAlert')
                    .then($.proxy(this.init, this));
            }
        },
        init: function(i18n) {
            this.ids = JSON.parse(window.localStorage.getItem('SpoilerAlert')) || [];
            ['yes', 'no', 'question'].forEach(function(msg) {
                if (!this.config[msg]) {
                    this.config[msg] = i18n.msg(msg).plain();
                }
            }, this);
            if (this.valid()) {
                this.insertUI();
            }
            this.insertResetButton(i18n);
        },
        valid: function() {
            return $element.height() < $('#mw-content-text').height() / 2 &&
                   this.ids.indexOf(config.wgArticleId) === -1;
        },
        insertUI: function() {
            var pos = $element.position();
            $('#mw-content-text').append(
                window.dev.ui({
                    type: 'div',
                    attr: {
                        id: 'SpoilerAlertCover'
                    },
                    style: {
                        width: $element.width() + 'px',
                        height: $element.height() + 'px',
                        top: pos.top + 'px',
                        left: pos.left + 'px',
                        'background-color': 'var(--theme-page-background-color)'
                    },
                    children: [
                        {
                            type: 'p',
                            attr: {
                                id: 'SpoilerAlertText'
                            },
                            text: this.config.question
                        },
                        {
                            type: 'span',
                            attr: {
                                id: 'SpoilerAlertYes',
                                'class': 'wds-button'
                            },
                            events: {
                                click: $.proxy(this.yes, this)
                            },
                            text: this.config.yes
                        },
                        {
                            type: 'span',
                            attr: {
                                id: 'SpoilerAlertNo',
                                'class': 'wds-button'
                            },
                            events: {
                                click: $.proxy(this.no, this)
                            },
                            text: this.config.no
                        }
                    ]
                })
            );
        },
        insertResetButton: function(i18n) {
            window.dev.placement.loader.util({
                content: {
                    type: 'li',
                    children: [
                        {
                            type: 'a',
                            attr: {
                                href: '#'
                            },
                            text: i18n.msg('reset').plain(),
                            events: {
                                click: this.reset
                            }
                        }
                    ]
                },
                element: 'tools',
                script: 'SpoilerAlert',
                type: 'append'
            });
        },
        yes: function() {
            this.fadeOut('#SpoilerAlertCover');
            this.ids.push(config.wgArticleId);
            window.localStorage.setItem('SpoilerAlert', JSON.stringify(this.ids));
        },
        no: function() {
            this.fadeOut('#SpoilerAlertText, #SpoilerAlertYes, #SpoilerAlertNo');
            if (this.config.back) {
                if (window.history && window.history.length > 1) {
                    window.history.back();
                } else {
                    location.href = config.wgServer + config.wgScriptPath;
                }
            }
        },
        fadeOut: function(el) {
            $(el).fadeOut(this.config.fadeDelay, function() {
                $(this).remove();
            });
        },
        reset: function(event) {
            event.preventDefault();
            window.localStorage.setItem('SpoilerAlert', JSON.stringify([]));
            window.location.reload();
        }
    };
    if (!window.dev || !window.dev.ui || !window.dev.i18n || !window.dev.placement) {
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:I18n-js/code.js',
                'u:dev:MediaWiki:Placement.js',
                'u:dev:MediaWiki:UI-js/code.js'
            ]
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:SpoilerAlert.css'
    });
    mw.hook('dev.ui').add($.proxy(SpoilerAlert.preload, SpoilerAlert));
    mw.hook('dev.i18n').add($.proxy(SpoilerAlert.preload, SpoilerAlert));
    mw.hook('dev.placement').add($.proxy(SpoilerAlert.preload, SpoilerAlert));
})();
}