// our config is stored in an array
window.lessOpts = window.lessOpts || [];
 
// each target page needs separate configuration
window.lessOpts.push( {
    // this is the page that has the compiled CSS
    target: 'MediaWiki:Common.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Common.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [
        'MediaWiki:Common.css',
        'MediaWiki:Common.less'
    ],
    // this is the page that contains the comment header for the target page
    // all other comments are stripped during compilation
    header: 'MediaWiki:Css-header/common'
} );
window.lessConfig = {
    // reloads the page after the target page has successfully been updated
    // defaults to true
    reload: true,
    // wraps the parsed CSS in pre tags to prevent any unwanted links to templates, pages or files
    // defaults to true
    wrap: true,
    // for adding non-standard usergroups that can edit the mediawiki namespace
    // normally this is limited to staff, vstf, helpers and sysops/admins
    // but if there are other groups that can edit the namespace on your wiki
    // add them to the array here for the script to load for them
    allowed: []
};
importArticles({
    type: "style",
    articles: [
        "w:c:dev:FontAwesome/code.css"
    ]
});/* importScriptPages-start */
 
 window.UserTagsJS = {
	modules: {},
	tags: {// group: { associated tag data }
		montheditor: { u:'Editor of the Month' },
		featured: { u:'Featured' },
		inactive: { u:'Inactive' },
		jshelper: { u: 'JavaScript' },
		csshelper: { u: 'CSS' },
		templatehelper: { u: 'Templates' },
		bureaucrat: { u: 'Bcrat' },
		sysop: { u: 'Admin' },
		rollback: { u: 'RB' },
		chatmoderator: { u: 'Mod' },
		'autoconfirmed-user': { u: 'AU' },
		blocked: { u: 'Annihilated' },
		bannedfromchat: { u: 'Exiled' }
},
	oasisPlaceBefore: ''
};
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:FixMultipleUpload/code.js',
 
        /*Mediawiki*/
 
        'MediaWiki:Common.js/summaries.js', // Standard edit summaries
        'MediaWiki:Common.js/autolock.js',  // 30day blog lock
 
        /*Mediawiki End*/
 
        'u:dantest:MediaWiki:Search_Fix.js',
        'u:dev:BackToTopButton/code.js', 
        'u:dev:Countdown/code.js',
        'u:dev:PowerPageMaker/en.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:Toggler.js',
        'u:dev:UserTags/code.js',
        'u:dev:Voice_Dictation/voice.js',
        'u:dev:Digital_Clock/code.js',
        'u:dev:ColorPreview/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:Less/code.2.js',
     ]
});
/* importScriptPages-end */
/* Any JavaScript here will be loaded for all users on every page load. Credit goes to Kuro Bas Wiki */

/* importScriptPages-start */

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');

//importScriptPage('MediaWiki:Search_Fix.js', 'dantest');

importScriptPage('BackToTopButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/* importScriptPages-end */


// </syntax>
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */