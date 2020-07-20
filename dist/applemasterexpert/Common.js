
/* Any JavaScript here will be loaded for all users on every page load. */
// Report Forms
//importScript("MediaWiki:ReportV.js");
//importScript("MediaWiki:ReportS.js");
importScript("MediaWiki:Reports.js");
 
if ( document.getElementById('TitleItalic') ) {
$('.firstHeading').css('font-style','italic');
}

window.highlightUsersConfig = {
    colors: {
        // 'group-name': 'color',
        'sysop': '#99ff00',
        'staff': '#da0da0',
        'helper': '#bf6240',
        'vstf': '#f77f77',
        'global-discussions-moderator': '#4286f4',
        'voldev': '#23c8d2',
        'vanguard': '#1eaf7a',
        'content-volunteer': '#ff7000',
        'bot': '#a400a4'
    },  
    styles: {
        // 'group-name': 'styles',
        'staff': 'font-weight: bold;'
    }
};
// ... importArticles
/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'automated refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages", "Special:Log"];
 importScriptPage('AjaxRC/code.js', 'dev');
 
// **************************************************************
// RevealAnonIP settings -- MUST be before the script is imported
// **************************************************************
 
window.RevealAnonIP = {
    permissions : ["rollback", "sysop", "bureaucrat"]
};
 
// ****************************
// End of RevealAnonIP settings 
//

 
/* Clock */
window.DisplayClockJS = '%X %x [%{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w] (UTC)';

window.MessageWallUserTags = {
    tagColor: 'cyan',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Applemasterexpert': 'Bureaucrat',
        'ApplemasterBot': 'Bot',
    }
};

window.MessageWallUserTags = {
    //...other options...
    users: {
        'Applemasterexpert': 'Bureaucrat • Admin • Content Moderator • Discussion Moderator • Chat Moderator  ',
    
    }
};
// parse allows you to create a color object from a string:
var red = dev.colors.parse("#FF0000");
var red = dev.colors.parse("#F00");
var red = dev.colors.parse("rgb(255, 0, 0)");
var red = dev.colors.parse("red");
 
// the values of dev.colors.wikia are strings too:
var body = dev.colors.parse(dev.colors.wikia.body);
 
// fromRgb allows you to set the RGB values numerically:
// (values must be between 0 and 255)
var red = dev.colors.fromRgb(255, 0, 0);
 
// fromHsl allows you to use the HSL color model:
// (values must be between 0 and 1)
var red = dev.colors.fromHsl(0, 1, 1);

// lighten red by 20 percent:
var lightRed = red.lighten(20);
 
// desaturate red by 20 percent:
var paleRed = red.saturate(-20);
 
// rotate the hue by 180 degrees to
// get the complementary color:
var cyan = red.rotate(180);
 
// mix two colors:
var orange = red.mix('yellow');


/* Any JavaScript here will be loaded for all users on every page load. */
 
// AjaxRC
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
 
// Custom edit buttons (See https://help.wikia.com/wiki/Help:Custom_edit_buttons)
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
 
// LockForums and LockOldBlogs
 
window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 90
};
 
window.LockOldBlogs = {
    expiryDays: 90
};
 
// Making the chat logs only visible to certain user rights groups
(function(){
    if (!$('pre.ChatLog').exists()) return;
    if (!(/sysop|staff|chatmoderator/m.test(mw.config.get('wgUserGroups').join(' ')))) $('pre.ChatLog').hide();
})();
 
// MessageWallUserTags
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'Cocopuff2018': 'Bureaucrat • Administrator',
        '': 'Bureaucrat • Administrator',
 
        '': 'Administrator',
 
        '': 'Chat Moderator',
 
        '': 'Bot',
        '':  'Bot',
        '': 'Bot',
    }
};
 
// RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};
 
// Imports
importArticles({
    type: "script",
    articles: [
        'u:dev:AdminDashboard JS-Button/code.js',
        'u:dev:CommunityDataUsers/code.js',
        "u:rhythmheaven:MediaWiki:Wikia.js/editCount.js",
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatErrorExplanation.js',
    ]
});