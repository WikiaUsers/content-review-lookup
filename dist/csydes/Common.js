// 04:24, January 1, 2020 (UTC) <nowiki>

// AUTO-REFRESH RECENT CHANGES AND WIKI-ACTIVITY
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
// END AUTO-REFRESH

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
window.dev.editSummaries = {
    select: 'Template:Stdsummaries'
};

window.UserTagsJS = {
	modules: {},
	tags: {
		assistant: 'Assistant',
		threadmoderator: 'Discussion Moderator',
		'content-moderator': 'Content Moderator'
	}
};

UserTagsJS.modules.inactive = 62;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'assistant',
    'rollback',
    'chatmoderator',
    'threadmoderator',
    'content-moderator',
    'bannedfromchat',
    'global-discussions-moderator'
];

/* Custom edit buttons
See https://community.fandom.com/wiki/Help:Custom_edit_buttons
 */
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/0/0a/Gallery_add.png",
        "speedTip": "",
        "tagOpen": "<" + "gallery>",
        "tagClose": "</gallery>",
        "sampleText": "",
        "imageId": "mw-editbutton-wpg"
    };  

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/1/11/Btn_toolbar_liste.png",
        "speedTip": "List",
        "tagOpen": "\n* ",
        "tagClose": "\n* Element B\n* Element C",
        "sampleText": "Element A"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/8/88/Btn_toolbar_enum.png",
        "speedTip": "Numbering",
        "tagOpen": "\n# ",
        "tagClose": "\n# Element 2\n# Element 3",
        "sampleText": "Element 1"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/f/fd/Button_blockquote.png",
        "speedTip": "Blockquote",
        "tagOpen": "<blockquote>",
        "tagClose": "</blockquote>",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/7/74/Button_comment.png",
        "speedTip": "Note",
        "tagOpen": "{{Info|Insert title|",
        "tagClose": "}}",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/b/b4/Button_category03.png",
        "speedTip": "Category",
        "tagOpen": "[[Category:",
        "tagClose": "]]",
        "sampleText": "Category name"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/1/12/Button_gallery.png",
        "speedTip": "Picture gallery",
        "tagOpen": "\n<galle" + "ry>\nImage:",
        "tagClose": "|[[C.Syde's Wiki]] Logo\nImage:Wiki.png|[[C.Syde's Wiki]] Logo\nImage:Wiki.png|Eine [[C.Syde's Wiki]] Logo\n<\/gallery>",
        "sampleText": "Wiki.png"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/3/3b/Button_template_alt.png",
        "speedTip": "Template",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Template"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/c/c9/Button_strike.png",
        "speedTip": "Strike",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Strike-through text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/1/13/Button_enter.png",
        "speedTip": "Line break",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/csydes-test/images/7/74/Button_comment.png",
        "speedTip": "Comment visible only for editors",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Insert comment here"
    };
}

$(function() {
    if ($.getUrlVar('action') !== 'edit') {
        return;
    }
    var interval = setInterval(function() {
        var $button = $('#mw-editbutton-wpg');
        if ($button.exists()) {
            clearInterval(interval);
            $button.off().click(function() {
                WikiaPhotoGallery.showEditor({
                    from: 'source'
                });
            });
        }
    }, 100);
});

if (['assistant','bot','content-moderator','sysop'].indexOf(mw.config.get('wgUserGroups')) >= 0) {
    massRenameDelay = 1000;
    massRenameSummary = 'automatic';
    importScriptPage('MediaWiki:MassRename/code.js', 'dev');

    massProtectDelay = 500;
    massProtectSummary = 'automatic';
    importScriptPage('MediaWiki:MassProtect/code.js', 'dev');
}

importArticle({
    type: 'style',
    article: 'MediaWiki:Import.css'
});

(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// Initialise the global objects used without overwriting any already there
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['AdminDashboard JS-Button'] = window.dev.i18n.overrides['AdminDashboard JS-Button'] || {}
window.dev.i18n.overrides['DiscussionsActivity'] = window.dev.i18n.overrides['DiscussionsActivity'] || {};

// Customise the desired messages
window.dev.i18n.overrides['AdminDashboard JS-Button']['tooltip'] = 'Customise your wiki with local JavaScript.';
window.dev.i18n.overrides['DiscussionsActivity']['watchlist'] = 'Targeted Pages only';
window.dev.i18n.overrides['DiscussionsActivity']['recent_changes'] = 'See all activity';
window.dev.i18n.overrides['DiscussionsActivity']['wiki_activity'] = 'Wiki activity';

// Prevent users without rollback rights from using the rollback script
window.RollbackWikiDisable = true;

// Updating the Have you seen this wiki? ajax poll title
$("#ajax-poll-229E2589AD5F35259B83102B2C278828 .header").replaceWith("<div class=\"header\">Have you seen this wiki?</div>");