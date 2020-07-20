/* Any JavaScript here will be loaded for all users on every page load. */

/* Any JavaScript here will be loaded for all users on every page load. */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat', link:'Help:User access levels#Bureaucrats' },
                sysop: { u:'Administrator', link:'Project:Administrators' },
                chatmoderator: {  },
                rollback: { link:'Help:User access levels#Rollbacks' },
                founder: { u:'Founder', link:'Help:User access levels#Founder' },
                bot: { u:'Bot', link:'Help:Bots' },
	}
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.inactive = 30; // 30 days
 
UserTagsJS.modules.inactive = {
	days: 30,
 
 
};

// Unchecks redirects when moving files
if (wgPageName.indexOf("Special:MovePage/File:") != -1) {
    $('input#wpLeaveRedirect').removeAttr('checked'); 
}

/*** Custom user rights tags ***/
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_blog" || wgCanonicalNamespace == "User_talk" || wgPageName.indexOf("Special:Contributions") != -1){
    importScript('MediaWiki:Common.js/mastheads.js');
}

        /**
         * Script for USERNAME temp.
         */
        insertUsername: {
            conditional: !!conf.wgUserName,
            exec: function () {
                $('.insertusername').text(conf.wgUserName);
            }
        },