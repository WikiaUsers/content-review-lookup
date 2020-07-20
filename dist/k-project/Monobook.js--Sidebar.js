/* Any JavaScript here will be loaded for users using the MonoBook skin */

wgSidebar['On the Wiki'] = [ 
	'Special:RecentChanges|Recent Changes',
	'Special:Random|Random Page',
	'Special:Videos|Videos',
	'Special:NewFiles|New Photos',
        'Special:Chat?allinone=0&useskin|Chat',
];

wgSidebar['Media'] = [ 
	{'K (series)#Anime|Anime': [
		'K|K',
		'Episodes|Episodes'
	]},
	{'K (series)#Manga|Manga': [
		'K: Memory of Red|K: Memory of Red',
		'K: Stray Dog Story|K: Stray Dog Story',
		'Chapters|Chapters'
	]},
	{'K (series)#Novel|Novel': [
		'K SIDE:BLUE|K SIDE:BLUE',
		'K SIDE:RED|K SIDE:RED',
		'K SIDE:Black & White|K SIDE:Black & White'
	]},
        'Music|Music'
];

wgSidebar['Characters'] = [ 
	{'Category:Kings|Kings': [
		'Adolf K. Weismann|Adolf K. Weismann',
		'Daikaku Kokujōji|Daikaku Kokujōji',
                'Mikoto Suoh|Mikoto Suoh',
                'Genji Kagutsu|Genji Kagutsu',
                'Reisi Munakata|Reisi Munakata',
                'Jin Habari|Jin Habari',
                'Colorless King|Colorless King',
                'Ichigen Miwa|Ichigen Miwa'
	]},
	{'Silver Clan|Silver Clan': [
		'Yashiro Isana|Yashiro Isana',
		'Neko|Neko',
		'Kuroh Yatogami|Kuroh Yatogami'
	]},
	{'Usagi|Usagi': [
		'Daikaku Kokujōji|Daikaku Kokujōji',
		'Kōshi Miduchi|Kōshi Miduchi'
	]},
	{'HOMRA|HOMRA': [
		'Mikoto Suoh|Mikoto Suoh',
		'Anna Kushina|Anna Kushina',
		'Izumo Kusanagi|Izumo Kusanagi',
		'Tatara Totsuka|Tatara Totsuka',
		'Misaki Yata|Misaki Yata',
		'Rikio Kamamoto|Rikio Kamamoto'
	]},
	{'Scepter 4|Scepter 4': [
		'Reisi Munakata|Reisi Munakata',
		'Seri Awashima|Seri Awashima',
		'Saruhiko Fushimi|Saruhiko Fushimi'
	]},
	{'Ashinaka High School|Ashinaka High School': [
		'Kukuri Yukizome|Kukuri Yukizome',
		'Sumika Inaba|Sumika Inaba',
		'Sōta Mishina|Sōta Mishina',
		'Chiho Hyūga|Chiho Hyūga',
		'Sakura Asama|Sakura Asama'
	]},
	'Category:Image Gallery|Gallery'
];

wgSidebar['Universe'] = [ 
	'Dresden Slate|Dresden Slate',
	'Sword of Damocles|Sword of Damocles',
	'Aura|Aura',
	{'Clan|Clans': [
		'Silver Clan|Silver Clan',
		'Usagi|Gold Clan',
		'HOMRA|Red Clan',
		'Scepter 4|Blue Clan'
    	]},
	{'Category:Locations|Locations': [
		'Shizume City|Shizume City',
		'Ashinaka High School|Ashinaka High School'
    	]},
];

wgSidebar['Community'] = [ 
	{'K Project Wiki:Administrators|Administration': [
		'K Project Wiki:Administrators#Administrators|Administrators',
	]},
	{'K Project Wiki:Policy|Policies': [
		'K Project Wiki:Manual of Style|Manual of Style',
		'K Project Wiki:Layout|Layout',
		'K Project Wiki:Image Policy|Image Policy',
		'K Project Wiki:Forum Policy|Forum Policy',
		'K Project Wiki:Chat Policy|Chat Policy',
		'K Project Wiki:User Page Policy|User Page Policy',
		'K Project Wiki:Talk Page Policy|Talk Page Policy'
	]},
	{'Forum:Index|Forums': [
		'Forum:Announcements|Announcements',
		'Forum:Help desk|Help desk',
		'Forum:Watercooler|Watercooler',
		'Forum:Improvements and Issues|Improvements and Issues'
	]},
	{'w:c:animanga|Anime/Manga Hub': [
		'w:c:animanga:K|K'
	]},
];

/* Call initialising method of the Monobook Sidebar */
$(MonobookSidebar.init);