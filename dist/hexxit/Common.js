/* Any JavaScript here will be loaded for all users on every page load. */



//**********************************
// Configuration for PurgeButton
//**********************************
PurgeButtonText = 'Purge';

//**********************************
// Configuration for UserTags
//**********************************
// Custom UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		// EXAMPLE
		// name: { m: 'For Males', f:'For Females', u: 'No Gender Set', order: -1/0},
		templates: { u: 'Templates' },
		commentpatroller: {u: 'Comment Patroller' },
		blocker: {u: 'Blocker' },
		filemover: {u: 'File Mover' },
		helpful: {u: 'Helpful', title:'This user has done great work on this wiki.' },
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	// EXAMPLE
	// 'Username': ['Group1', 'Group2'],
	'Kalbintion': ['templates'],
	'AmbassadorArt': ['helpful'],
};

UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat', 'commentpatroller', 'blocker', 'filemover']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
};
UserTagsJS.modules.userfilter = {
	// EXAMPLE
	// 'John Smith': ['inactive'] // John Smith is never inactive, even when he is
};
UserTagsJS.modules.implode = {
	// EXAMPLE
	// 'mini-sysop': ['patroller', 'rollback', 'chatmoderator'] // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};
UserTagsJS.modules.explode = {
	// EXAMPLE
	// 'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};

//**********************************
// Configuration for User Rights Reasons Dropdown
//**********************************
userReasonDefault = '<option value="Default reason">None</option>';

//**********************************
// Support for Script Imports
//**********************************
importArticles({
	type:'script',
	articles: [
		'w:c:dev:PurgeButton/code.js',
		'w:c:dev:UserTags/code.js',
		'w:c:dev:View_Source/code.js',
		'w:c:dev:AjaxRC/code.js',
		'w:c:dev:WallGreetingButton/code.js',
		"w:c:dev:User Rights Reasons Dropdown/code.js",
	]
});

//**********************************
// Support for [[Template:USERNAME]]
//**********************************
 
$(document).ready(function(){
  if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace === null || wgUserName === null) {return;}
  $(".insertusername").each(function(){
    $(this).html(wgUserName);
  });
});

//**********************************
// Support for Custom MibbitIRC (See Hexxit_Wiki:Chat for page info)
//**********************************
function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe width="700" height="500" scrolling="no" src="http://widget.mibbit.com?channel=%23Hexxit&server=irc.chatspike.net"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);