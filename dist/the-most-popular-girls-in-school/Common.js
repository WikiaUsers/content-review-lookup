/* Any JavaScript here will be loaded for all users on every page load. */
 
importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});
 
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback'];
 
// **************************************************
//  - end -  Hide namespaces in categories
// **************************************************
/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
    $('.insertusername').html(wgUserName);
}

window.dev = window.dev || {};
 	+	
window.dev.editSummaries = {
 	+	
select: 'Template:Stdsummaries‎'
 	+	
};