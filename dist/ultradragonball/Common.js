/* Any JavaScript here will be loaded for all users on every page load. */
/************* Funzioni di utilità generale *************/
 
 /* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();
 
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
 
function getElementsByName (name, root) {
 if (root == undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}

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


/* Social Icons */
importScriptPage('SocialIcons/code.js','dev');

/* Dev Scripts */
/* Voice Dictation */
importScriptPage('Voice_Dictation/voice.js', 'dev');
/* Ajax Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

//User tags
window.UserTagsJS = {
	modules: {},
	tags: {
		editmaster: { u:'Over 9000', title:'This user has the highest number of edits in the wiki!' },
                techno: {u:'Wizard', title:'This user is one of the technical experts of the wiki!'},
                newusermonth: {u:'Potential Unlocked', title:'This user is the New User of the Month!'},
                editorweek: {u:'False Super Saiyan', title:'This user is the current editor of the week!'}, 
                genkisstuff: {u:'Guardian', title:'This is just for Genki, nuff said!'},
                Coder:{u:'Coder', title:'For free style coders!'},
                rollback: {u:'Kaio-Ken', title:'This user is a rollback on Ultra Dragon Ball Wiki!'},
                chatmoderator: {u:'Super Saiyan', title:'This user is a chat moderator on Ultra Dragon Ball Wiki!'},
                sysop: {u:'Super Saiyan 2', title:'This user is an administrator on Ultra Dragon Ball Wiki!'},
                bureaucrat: {u:'Super Saiyan 3', title:'This user is a bureaucrat on Ultra Dragon Ball Wiki!'},

	}
};
 
UserTagsJS.modules.custom = {
	'Daimaō': ['editmaster'], 
        'Ishido Shūji': ['techno'],
        'CertainlyNot1218': ['techno'],
        'Ninjamonster15': ['newusermonth'],
        'Genki Dama': ['genkisstuff'],
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});