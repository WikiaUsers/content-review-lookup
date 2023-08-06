// This script was created, and is primarily maintained by moo1210.
/* Any JavaScript here will be loaded for all users on every page load. */
// UsersTags config (imported in MediaWiki:ImportJS)
window.UserTagsJS = {
	modules: {
		implode: {
			'moderator': ['content-moderator', 'threadmoderator']
		},
		mwGroups: ['bannedfromchat', 'blocked', 'bot', 'bot-global' , 'bureaucrat',  'checkuser', 'content-moderator', 'council', 'helper', 'rollback', 'staff', 'sysop', 'threadmoderator', 'vanguard', 'soap'],
		custom: {
            'PinewoodBuildersSocialMedia': ['owner'],
            'CombatSwift': ['fow'], 
            'Coasterteam': ['facilitator'], 
            'Moo1210': ['technicalmaintainer'],
            'CorruptBIOS': ['technicalmaintainer'],
            'Powershell_exe': ['technicalmaintainer']
        }
	},
	tags: {
            'bot': {
                u: 'Bot',
                order: -1/0 
            },
            owner: { 
                u: 'Wiki Owner',
                order: 1
            },
            facilitator: { 
                u: 'PB Facilitator',
                order: 3 
            },
            bureaucrat: { 
                u: 'Bureaucrat',
                order: 5
            },
            sysop: {
                u: 'Administrator',
                order: 6
            },
            technicalmaintainer: { 
                u: 'Wiki Technical Manager',
                order: 7 
            },
            moderator: {
                u: 'Moderator',
                order: 8
            },
            'content-moderator': {
                u: 'Content Moderator',
                order: 10
            },
            threadmoderator: {
                u: 'Discussion Moderator',
                order: 10
            },
            fow: { 
                u: 'Former Wiki Owner',
                order: 12
            },
	}
};

// MessageBlock config (imported in MediaWiki:ImportJS)

var MessageBlock = {
  title : 'Blocked',
  message : 'You have been blocked for $2 because you have $1. If you wish to appeal this block please contact me or another administrator.',
  autocheck : true
};
mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.user']).then(function() {
	// Custom code config
	var PermGroupCSSClassBlacklist = /(?:\*|\(all\):)/;
	
	// Custom code for PB Wiki
	var api = new mw.Api();
	var userNamesToLinks = {};
	var userNamesToRights = {};
	var everyLinkOnPage = document.querySelectorAll('a[href]');
	var userPageLinkRegex = RegExp("\/wiki\/(?:User:)(.*)");
	// Fetch user links on page
	for (var i = 0; i < everyLinkOnPage.length; i++) {
	  var linkMatchResults = everyLinkOnPage[i].getAttribute("href").match(userPageLinkRegex);
		if (linkMatchResults != null) {
		  if (!userNamesToLinks[linkMatchResults[1]]) {
		  	userNamesToLinks[linkMatchResults[1]] = [];
		  }
		  userNamesToLinks[linkMatchResults[1]].push(everyLinkOnPage[i]);
	  }
	}
	// Fetch user groups for users linked on page
	// (MediaWiki's API, and therefore Fandom's, has a cap of 50 members per API requests by default, I wouldn't expect to find more than usually, but in some cases you may if you clicked on list 500 results in page history, for example, so this splits up the requests to handle that correctly.)
	

	function QueryUserGroupsFromVar(userNameQueryList) {
		var params = {
			action: 'query',
			list: 'users',
			ususers: userNameQueryList.join('|'),
			usprop: 'groups|editcount',
			format: 'json'
		};
		api.get( params ).done(UserGroupsQueryDone);
		userNameQueryList = [];
	}
	
	function UserGroupsQueryDone(data) {
		var users = data.query.users,
			u;
		for ( u in users ) {
			var linksWithUserOnCurPage = userNamesToLinks[users[u].name];
			var classStringToAppend = "";
			if (users[u].groups) {
				for (var i = 0; i < users[u].groups.length; i++) {
					if (users[u].groups[i].match(PermGroupCSSClassBlacklist) == null) {
						classStringToAppend += " " + "wiki-userlink-group-"+ users[u].groups[i].replace(/\s/g,"-");
					}
				}
				
				for (var ii = 0; ii < linksWithUserOnCurPage.length; ii++) {
					linksWithUserOnCurPage[ii].className += classStringToAppend;
				}
			}
		}
	}
	var userNameQueryListA = [];
	for (var user in userNamesToLinks) {
		userNameQueryListA.push(user);
		
		if (i == 50) {
			QueryUserGroupsFromVar(userNameQueryListA);
		}
	}
	
	QueryUserGroupsFromVar(userNameQueryListA);
});