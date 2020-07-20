/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];
 
/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		provowner: { u:'Provisional Owner', order:-1/0 },
		owner: 'Owner',
		inactive: 'Inactive',
		troll: '☢ TROLL ☢'
	}
};
UserTagsJS.modules.custom = {
	'Wikipenguino45': ['owner'], // Provisional Owner
	'Orangebird763': [], // Owner
	'Doom Bear': ['troll'] // TROLL
};
UserTagsJS.modules.inactive = 100;