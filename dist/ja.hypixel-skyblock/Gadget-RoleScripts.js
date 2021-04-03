//##############################################################
/* ==importArticle pre-script actions== */

// AjaxCommentDelete
window.AjaxCommentDeleteConfig = {
    fastDelete: "Comment Was [[#|Off Topic]]/[[w:c:community:Help:Spam|Spam]]/[[w:c:community:Help:Vandalism|Vandalism]]"
};

//AjaxBlock
window.AjaxBlock = {
    blockReasons: {
        '[[w:c:community:Help:Spam|Spam]]/[[w:c:community:Help:Vandalism|Vandalism]]': 'General Spam/Vandalism',
        '[[wP:Wp:DISRUPT|Disruptive Editing]]':'Disruptive Editing',
        '[[WP:WP:CRV|Removing Content From Pages]]': 'Removing Content from Pages',
        'Abusing Multiple Accouts ([[WP:WP:SOCK|Sockpuppetry]])': 'Sockpuppety',
        '[[WP:WP:VOA|Vandalism-Only Account]]': 'VoA Account',
        '[[WP:Disinformation|Inserting False Information]]': 'Inserting False Information',
        'Creating Nonsense/[[w:c:community:Help:Vandalism|Vandalism]] Articles': 'Creating Spam Articles',
        '[[WP:WP:IU|Unacceptable username]]': 'Unacceptable Username',
        'Long-Term Abuse': 'Long-Term Abuse',
        '[[Project:Article Comment Guidelines|Spamming Nonsense Comments]]': 'Nonsense Comments',
        'Inserting nonsense/gibberish into pages': 'Inserting nonsense/gibberish into pages',
        '[[WP:WP:LINKSPAM|Spamming Links to External Sites]]': 'External Link Spam',
        '[[WP:WP:NPA|Personal Attacks]]': 'Personal Attacks',
        'Intimidating Behavior/Harassment': 'Intimidating Behavior/Harassment',
        '[[WP:WP:WAR|Edit Warring]]': 'Edit Warring',
        'Intimidating/Harrasing Comments': 'Intimidating/Harrasing Comments',
        '[[w:Help:Spam|Spam/Adverstising]]': 'Spam/Adverstising',
        'Violation of [[Skyblock Rules|SkyBlock Rules]]': 'Violation of Skyblock Rules',
        '[[wP:Wp:PROXY|Open Proxy/VPN]]': "Open Proxy/VPN",

    },
 
    expiryTimes: {
        '24 hours': '1 day',
        '3 days': '3 days',
        '1 week': '1 week',
        '2 weeks': '2 weeks',
        '3 weeks': '3 weeks',
        '1 month': '1 month',
        '6 weeks': '6 weeks',
        '2 months': '2 months',
        '3 months': '3 months',
        '4 months': '4 months',
        '6 months': '6 months',
        '9 months': '9 months',
        '1 year': '1 year',
        '18 months': '18 months',
        '3 years': '3 years',
        'infinite': 'infinite',
    },
 
    check: {
        talk: true,
        autoBlock: true,
        override: true
    },
};

//AjaxDelete
window.AjaxDelete = {
 
    deleteReasons: {
        'Advertising': 'Advertising',
        '[[w:Help:Spam|Spam]]/[[w:Help:Vandalism|Vandalism]]': 'Spam/Vandalism',
        'Marked for Deletion': 'Marked for deletion',
        'Empty Article': 'Empty Article',
        'Author request': 'Author request',
        'Irrelevant to The Wiki': 'Irrelevant to the wiki',
        'Housekeeping': 'Housekeeping',
        '[[w:Help:Spam|Spam]]/[[w:Help:Vandalism|Vandalism]] Article': 'Spam/vandalism Article',
        'Deprecated/Unused': 'Deprecated/Unused',
        '[[WP:WP:NPA|Personal Attack article]]': 'Personal attack article',
        '[[WP:Disinformation|Disinformation]]/[[WP:Hoax|Hoax]]': 'Disinformation/Hoax',
        'Broken [[Help:Redirects|Redirect]]': 'Broken Redirect',
        'Unused [[Help:Redirects|Redirect]]': 'Unused redirect',
        '[[Help:Redirects|Redirect]] left from [[Help:Help:Rename|pagemove]]': 'Page Move redirect',

    },

    imageDeleteReasons: {
        'Offensive Image': 'Offensive',
        'Inappropriate Image': 'Inappropriate',
        'Harassment-Only image': 'Harassment',
        'Housekeeping': 'Housekeeping',
        'Copyright infringement': 'Copyright',
        'Author request': 'Author request',
        'Duplicate/Superceded File': 'Duplicate/Superceded',
        'Improper Image format': 'Improper Format',
        '[[w:Help:Spam|Spam]]/[[w:Help:Vandalism|Vandalism]]': 'Spam/Vandalism',
    },
 
    autoCheckWatch: true,
    noUndelete: false,
    reload: false,
};

// WHAM
window.WHAMBlockReason = "[[w:c:community:Help:Vandalism|vandalism]]";
window.WHAMDelay = 5;
window.WHAMBlockDuration = '3 months';
window.WHAMDeleteReason = "deleting [[w:c:community:Help:Spam|spam]]/[[w:c:community:Help:Vandalism|vandalism]]";

 //MassBlock
window.massBlockDelay = 5;

// Mass Rename
window.massRenameDelay = 5;

// AjaxBatchDelete/Undelete
window.batchDeleteDelay = 5;
window.batchUnDeleteDelay = 5;

//MassEdit
window.MassEditConfig = {
  interval: 10,
  placement: {
    element: "toolbar",
    type: "append"
  }
};

// FileLinksAutoUpdate
LIRoptions = {
    bottomMessage: '',
    editSummary: 'Updating file links (automatic)',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 10
};

//Nuke
window.nukeDelay = 5;
window.nukeTitle = "Mass delete all pages created by this user";

//##############################################################
/* ==importArticles== */
// Imports scripts from other pages/wikis.
mw.loader.using('mediawiki.api').then(function() {
    if (window.dontWantRoleSpecificJS) {
        return;
    }
    
    // This function checks if the user belongs to any of the groups passed in
    function userBelongsToGroup() {
        var groups = Array.from(arguments);
        return wgUserGroups.some(function(g){ return groups.includes(g) });
    }
    
    // autoconfirmed or above
    if(userBelongsToGroup('autoconfirmed', 'rollback', 'content-moderator', 'sysop')) {
        importArticles({
    	type: 'script',
    	    articles: [
    	        'u:dev:MediaWiki:AjaxUndo/code.js',
    	        'u:dev:MediaWiki:AjaxRedirect/code.js',
    	    ]
        });
    }
    
    // rollback or above
    if(userBelongsToGroup('rollback', 'content-moderator', 'sysop')) {
        importArticles({
    	type: 'script',
    	    articles: [
                'u:dev:MediaWiki:MassRedirect/code.1.js',
                'u:dev:MediaWiki:MassEdit/code.js',
                'u:dev:MediaWiki:MassRename/code.js',
                'u:dev:MediaWiki:MassCategorization/code.js',
                'u:dev:MediaWiki:AnchoredRollback/code.js',
        	]
        });
    }
    
    // Content mod or above
    if (userBelongsToGroup('content-moderator', 'sysop')) {
        importArticles({
    	type: 'script',
    	    articles: [
                'u:dev:MediaWiki:AjaxCommentDelete/code.js',
                'u:dev:MediaWiki:MassProtect/code.js',
                'u:dev:MediaWiki:ViewDeleted/code.js',
                'u:dev:MediaWiki:AjaxBatchUndelete.js',
                'u:dev:MediaWiki:AjaxPatrol/code.js',
                'u:dev:MediaWiki:FastOldImageDelete/code.js',
                'u:dev:MediaWiki:PowerDelete.js',
                'u:dev:MediaWiki:MultipleFileDelete/code.js',
                'u:dev:MediaWiki:AjaxDelete/code.js',
                'u:dev:MediaWiki:Nuke/code.js',
                'u:dev:MediaWiki:AjaxBatchDelete.js',
                'u:dev:MediaWiki:AjaxThreadDelete/code.js',
            ]
        });
    }
    
    // Admin or above
    if (userBelongsToGroup('sysop')) {
        importArticles({
    	type: 'script',
    	    articles: [
                'u:dev:MediaWiki:MassBlock/code.js',
                'u:dev:MediaWiki:AjaxBlock/code.js',
                'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
                'u:dev:MediaWiki:AdminDashboard block/code.js',
            ]
        });
    }
});