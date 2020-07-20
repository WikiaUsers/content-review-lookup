// Auto-Refresh
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

/* User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		icaffairs: { u:'In-Character Affairs', order: 1 },
		oocaffairs: { u:'Out-of-Character Affairs', order: 1 },
		expansions: { u:'Expansions', order: 2 },
		smallerevents: { u:'Smaller Events', order: 2 },
		characters: { u:'Characters', order: 2 },
		maintenance: { u:'Maintenance', order: 2 },
		coding: { u:'Coding', order: 2 }
	}
};

/* Custom Groups */
UserTagsJS.modules.custom = {
    'Carnarvan': ['icaffairs'],
    'MaknaeLivi': ['oocaffairs'],
    'TakeMeToTheHole': ['icaffairs', 'expansions'],
    'Dirael': ['icaffairs', 'smallerevents'],
    'TimeForTheTea': ['oocaffairs', 'characters'],
    'UniPacific16': ['oocaffairs', 'maintenance'],
    'Zany_Knave': ['oocaffairs', 'characters']
};