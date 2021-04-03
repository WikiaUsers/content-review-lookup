/* Any JavaScript here will be loaded for all users on every page load. */

// User tags
window.UserTagsJS = {
	modules: {
		inactive: 45,
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'patroller',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
		autoconfirmed: true,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
		},
		newuser: true,
	},

	tags: {
		bureaucrat: {
            u:'Consul',
            link:'Project:Administrators',
            color:'white',
            title:'Bureaucrat' 
        },
		sysop: {
            u:'Council member',
            link:'Project:Administrators',
            color:'white',
            title:'Admin' 
        },
		patroller: { 
            u:'Inquisitor',
            link:'Project:Administrators',
            color:'white',
            title:'Patroller' 
        },
		rollback: {
            u:'Shadowhunter',
            link:'Project:Administrators',
            color:'white',
            title:'Rollback' 
        },
	}
};
// -end - User tags

// Spoiler and Not Final Alert
window.SpoilerAlertJS = {
    question: 'This page contains spoilers. Are you sure you want to proceed?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1200
};
// - end -  Spoiler and Not Final Alert

// LockOldBlogs
window.LockOldBlogs = {
    expiryDays: 180,
    expiryMessage: "This blog is considered inactive and archived because it hasn\'t been commented on in 6 months and there is no longer an ongoing discussion in the comments section.",
};
 // - end -  LockOldBlogs

// LockForums
window.LockForums = {
    expiryDays: 200,
    expiryMessage: "This forum is considered archived because it is no longer active and hasn\'t been commented on in over 6 months, please don\'t bump this forum!",
    warningDays: 150,
    warningMessage: "This forum hasn\'t been commented on for 5 months. Please reply ONLY if a response is really needed.",
    forumName: "Forum",
    banners: true,
    ignoreDeletes: true,
    warningPopup: true,
    disableOn: ["49058", "54431"],
};
// - end -  LockForums

// RailWAM
window.railWAM = {
    logPage:"Project:WAM Log"
};
// - end - RailWAM

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
// ** Recent Wiki Activity and Recent changes auto refresh ** //
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity"
];
// - end - Auto-refresh

/************************************************************
 * Functions.js stuff (http://starwars.wikia.com/wiki/MediaWiki:Functions.js)
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag) {
	var classElements = [];

	if(node === null)
		node = document;

	if(tag === null)
		tag = '*';

	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);

	for(i = 0, j = 0; i < elsLen; i++) {
		if(tester.isMatch(els[i])) {
			classElements[j] = els[i];
			j++;
		}
	}
    
	return classElements;
}

function ClassTester(className) {
	this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function(element) {
	return this.regex.test(element.className);
};
/*
    end getElementsByClass
*/

function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}
	//MOZILLA/NETSCAPE support
	else if(myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
	} else {
		myField.value += myValue;
	}
}

/************************************************************
 * End old Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/