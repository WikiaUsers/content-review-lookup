/* Any JavaScript here will be loaded for all users on every page load. */

$(function(){
   $('#show_season_episodes').click(function(event) {
       event.preventDefault()
       $('#season_episodes').toggle();
       return true;
   }).find('a').attr('href', '#');
});
/* Credits to Dev Wiki and Sam and Cat Wiki */

importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:Countdown/code.js",
		'w:dev:ReferencePopups/code.js',
		"w:dev:RevealAnonIP/code.js",
		"w:dev:SearchSuggest/code.js",
		"w:dev:ShowHide/code.js",
		"w:dev:VisualSpellCheck/code.js",
                "w:dev:WallGreetingButton/code.js",
		"MediaWiki:Common.js/insertusername.js",
	]
});
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u: 'Bureaucrat' },
		rollback: { u: 'Spam Team' },
	}
};
UserTagsJS.modules.custom = {

};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});



// *******************************************************************************************************
// ******************************** BEGINNING: JavaScript for [[Special:Upload]] *************************
// ******** Code courtesy of "[[User:Pinky49]]", created and coded specifically for Duty & Valour ********
// ******************************************** Thanks, Pinky! *******************************************
// *******************************************************************************************************

function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
 return;
}

document.getElementById('wpUploadDescription').appendChild(document.createTextNode("==Summary==\n{{Information\n|attention=\n|description=\n|source=\n|author=\n|filespecs=\n|licensing=\n|other versions=\n|cat subject=\n}}"));

}

// *******************************************************************************************************
// *********************************** END: JavaScript for [[Special:Upload]] ****************************
// *******************************************************************************************************