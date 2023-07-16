/* Any JavaScript here will be loaded for users using the MonoBook skin */

wgSidebar['On the Wiki'] = [ 
	'Special:RecentChanges|Recent Changes',
	'Special:Random|Random Page',
	'Special:Videos|Videos',
	'Special:NewFiles|New Images',
];

wgSidebar['Media'] = [ 
];

wgSidebar['List of Characters|Characters'] = [ 
];

wgSidebar['Category:Hungry Joker|Universe'] = [ 
];

wgSidebar['Project:Community Portal|Community'] = [ 
	{'Black Clover Wiki:Administrators|Administrators': [
		'User talk:Ddraig Lucifer|Ddraig Lucifer',
	]},
        'Blog:Recent_posts|Recent blog posts'
];

/* Call initialising method of the Monobook Sidebar*/
$(MonobookSidebar.init);