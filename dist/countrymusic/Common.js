/* Any JavaScript here will be loaded for all users on every page load. */

// AUTO-REFRESH RECENT CHANGES AND WIKI-ACTIVITY
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
// END AUTO-REFRESH

window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Message Wall User Tags */
window.MessageWallUserTags = {
    tagColor: 'yellow',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Messenger of Heaven': 'Bureaucrat •  Administrator',
        'SassyBot':  'Bot',       
        'SlendyBot': 'Bot',
    }
};
/* End of Message Wall User Tags */

/* Making the chat logs only visible to certain user rights groups */
 
(function(){
    if (!$('pre.ChatLog').exists()) return;
    if (!(/sysop|vstf|staff|helper|chatmoderator/m.test(mw.config.get('wgUserGroups').join(' ')))) $('pre.ChatLog').hide();
})();
 
/* End of Making the chat logs only visible to certain user rights groups */
 

/* Custom edit buttons
See http://help.wikia.com/wiki/Help:Custom_edit_buttons
 */
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png",
        "speedTip": "List",
        "tagOpen": "\n* ",
        "tagClose": "\n* Element B\n* Element C",
        "sampleText": "Element A"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png",
        "speedTip": "Numbering",
        "tagOpen": "\n# ",
        "tagClose": "\n# Element 2\n# Element 3",
        "sampleText": "Element 1"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/f/fd/Button_blockquote.png",
        "speedTip": "Blockquote",
        "tagOpen": "<blockquote>",
        "tagClose": "</blockquote>",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
        "speedTip": "Note",
        "tagOpen": "{{Info|Insert title|",
        "tagClose": "}}",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
        "speedTip": "Category",
        "tagOpen": "[[Category:",
        "tagClose": "]]",
        "sampleText": "Category name"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Insert text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
        "speedTip": "Picture gallery",
        "tagOpen": "\n<galle" + "ry>\nImage:",
        "tagClose": "|[[The Demon's Light Wiki]] Logo\nImage:Wiki.png|[[The Demon's Light Wiki]] Logo\nImage:Wiki.png|Eine [[The Demon's Light Wiki]] Logo\n<\/gallery>",
        "sampleText": "Wiki.png"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png",
        "speedTip": "Template",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Template"
    };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile":
"https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"
    };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile":
"https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""
    };

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile":
"https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"
    };
}
/* End of Custom edit buttons */


importArticles({
    type: "script",
    articles: [
        "u:rhythmheaven:MediaWiki:Wikia.js/editCount.js"
    ]
});