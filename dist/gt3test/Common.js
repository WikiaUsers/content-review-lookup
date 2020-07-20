
// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		chatlog: { m: 'Chat Logger', f:'Chat Loggess', u: 'Undefined Guy Who Logs Chat', order: -1/0, link:'http://en.wikipedia.org/wiki/Gender' },
		muckraker: 'Muckraker',
		sysop: { u:'Addermin', link:'Project:Administrators' }, // Change "Administrator" to "Addermin"
		'mini-sysop': { u: 'Half Administrator', link:'Project:HalfAdmins' },
		'vandal-patrol': { u: 'Spamdal Janitor', link:'Project:Janitors' }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'GT3Tester': ['muckraker', 'chatlog'],
	'Uglyfish63': ['muckraker'],
	'You': ['inactive'], // Force inactive group instead of relying on the inactive module
	'Guppie the Third': ['mini-sysop', 'muckraker']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
	hello: ['muckraker'], // Remove hello group from people with muckraker group
	'vandal-patrol': ['mini-sysop'] // Remove vandal-patrol from mini-sysops
};
UserTagsJS.modules.userfilter = {
	'John Smith': ['inactive'] // John Smith is never inactive, even when he is
};
UserTagsJS.modules.implode = {
	'mini-sysop': ['patroller', 'rollback', 'chatmoderator'] // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/*b3 and torus*/
importScriptPage('MediaWiki:Torus.js', 'monchbox');


 var script = document.createElement('script');
 script.src = 'http://monchbox.wikia.com/wiki/MediaWiki:B3.js?action=raw&ctype=text/javascript&templates=expand&t=' + (new Date()).getTime();
 script.type = 'text/javascript';
 document.head.appendChild(script);

importScriptPage('ArchiveTool/code.js', 'dev');

importScriptPage('MediaWiki:Common.js/textillatenlettering.js', 'gt3test');

$("h1.wordmark").find("img").attr("src", "https://images.wikia.nocookie.net/gt3test/images/6/65/Wordmark.gif");

var messageWallUserTags = {
    'Guppie the Third': 'bureaucrat',
    'Uglyfish63': 'Founder',
    'Hyperking Hesham': 'Bureaucrat'
};
window.messageWallTagColor = 'red';
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});

addOnloadHook(function() {$('#iframe').after('<iframe src="http://' + $('#iframe').html() + '></iframe>');});