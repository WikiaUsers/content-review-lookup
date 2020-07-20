/* Any JavaScript here will be loaded for users using the MonoBook skin */

wgSidebar['On the Wiki'] = [ 
	'Special:RecentChanges|Recent Changes',
	'Special:Random|Random Page',
	'Special:Videos|Videos',
	'Special:NewFiles|New Photos',
];

wgSidebar['Media'] = [ 
	{'Hungry Joker (Series)|Series': [
		'List of Chapters and Volumes|Chapters and Volumes',
	]},
        'Hungry Joker One-shot|One-shot'
        'Yūki Tabata|Yūki Tabata'
        'Weekly Shōnen Jump Issue|Jump Issue'
];

wgSidebar['List of Characters|Characters'] = [ 
	{'Category:White Joker Members|White Joker': [
		'Heidi|Heidi',
		'Chitose Toriiooji|Chitose Toriiooji',
                'Alan Blackman|Alan Blackman',
                'Mira|Mira',
                'Vivienne Blanchard|Vivienne Blanchard',
                'Niels|Niels',
                'Liz Attirante|Liz Attirante',
                'Medico|Medico'
	]},
	{'Category:Mavro Members|Mavro': [
		'Killed|Killed',
		'Rosalie|Rosalie',
		'Ragins|Ragins'
		'Dodomekis|Dodomekis'
		'Nacht|Nacht'
	]},
	{'Category:Characters|Citizens': [
		'James|James',
		'Nurse|Unnamed Nurse'
	]},
	{'Category:One-shot Exclusive Characters|One-shot Exclusive': [
		'Haijiru Darwin|Haijiru Darwin',
		'Alice|Alice',
		'Mona|Mona'
	]},
];

wgSidebar['Category:Hungry Joker|Universe'] = [ 
	{'Category:Eureka|Eurekas': [
		'Newtonian Apple|Newtonian Apple',
		'Mendelian Peas|Mendelian Peas',
		'Pythagorean Hammer|Pythagorean Hammer',
		'Thalesian Amber|Thalesian Amber'
		'Sumerian Ruby|Sumerian Ruby'
		'Curare Beak|Curare Beak'
		'Heronian Aeolipile|Heronian Aeolipile'
		'Roentgenian Fluorescent Paper|Roentgenian Fluorescent Paper'
		'Landsteinerian Paint|Landsteinerian Paint'
    	]},
	{'Category:Faction|Organizations': [
		'White Joker|White Joker',
		'Mavro|Mavro'
    	]},
	{'Category:Arcs|Timeline': [
		'List of Story Arcs|List of Arcs',
		'Genius vs. God Arc|Genius vs. God Arc',
		'White Joker Organization Arc|White Joker Organization Arc',
		'Labyrinth of Mist Arc|Labyrinth of Mist Arc'
		'Blood Ties Arc|Blood Ties Arc'
    	]},
	{'Category:Hungry Joker Terms|Terminologies': [
		'Eureka|Eureka',
		'Glowing Corpse|Glowing Corpse'
    	]},
];

wgSidebar['Project:Community Portal|Community'] = [ 
	{'Hungry Joker Wiki:Administrators|Administrators': [
		'User talk:Ddraig Lucifer|Ddraig Lucifer',
		'User talk:Guilherme Abe|Guilherme Abe',
	]},
        'Blog:Recent_posts|Recent blog posts'
	{'Hungry Joker Wiki:Archive Library|Archive Library': [
		'Hungry Joker Wiki:Archive Library/News|Wiki News Section',
		'Hungry Joker Wiki:Archive Library/Featured Article|Featured Articles Section',
		'Hungry Joker Wiki:Archive Library/Featured Picture|Featured Pictures Section',
		'Hungry Joker Wiki:Archive Library/Poll|Poll Results Section',
	]},
        'w:c:animanga:Hungry Joker|Anime/Manga Hub'
];

/* Call initialising method of the Monobook Sidebar*/
$(MonobookSidebar.init);