/* Any JavaScript here will be loaded for users using the MonoBook skin */

/* <pre>
Note: This is JavaScript code. If there is any syntax error in this code the sidebar menu stops working. Make sure you do not break anything.
Each element of wgSidebar is the text (after the |) of the element in [[MediaWiki:Sidebar]].
Menus are lists [ ... ]. A string ' ... ' is an element. An object { ... } is an element with a submenu, where the key (before : ) is the element itself and the value (after the : ) is a list [... ] of the contents of the submenu.
For each element, It will be the link and the text. If you put a pipe character | what comes before will be the link and what comes after will be the text.
*/
wgSidebar['Navigation'] = [
	'Main Page|Main Page',
	'Special:RecentChanges|Recent Changes',
	'Special:Random|Random page'
];

wgSidebar['Games'] = [
	'Halo: Combat Evolved|Halo: Combat Evolved',
	'Halo 2|Halo 2',
	'Halo 3|Halo 3',
	'Halo 3: ODST|Halo 3: ODST',
	'Halo Wars|Halo Wars',
	'Halo: Reach|Halo: Reach',
	{'Category:Deleted Material|Canceled Projects': [
		'Halo: Chronicles|Halo: Chronicles',
		'Halo DS|Halo DS',
		'Untitled Halo MMO|Halo MMO'
	]}
];

wgSidebar['Books & Media'] = [
	{'Category:Books|Novels': [
		'Halo: The Fall of Reach|The Fall of Reach',
		'Halo: The Flood|The Flood',
		'Halo: First Strike|First Strike',
		'Halo: Ghosts of Onyx|Ghosts of Onyx',
		'Halo: Contact Harvest|Contact Harvest',
		'Halo: The Cole Protocol|The Cole Protocol',
		'Ghosts of Onyx sequel|Ghosts of Onyx 2',
		'Forerunner Saga|Forerunner Trilogy',
		'Halo: Evolutions - Essential Tales of the Halo Universe|Evolutions'
	]},
	{'Category:Books|Comics': [
		{'Halo: Uprising|Uprising': [
			'Halo: Uprising Issue 1|Issue 1',
			'Halo: Uprising Issue 2|Issue 2',
			'Halo: Uprising Issue 3|Issue 3',
			'Halo: Uprising Issue 4|Issue 4'
		]},
		{'Halo: Helljumper|Helljumper': [
			'Halo: Helljumper Issue 1|Issue 1',
			'Halo: Helljumper Issue 2|Issue 2',
			'Halo: Helljumper Issue 3|Issue 3',
			'Halo: Helljumper Issue 4|Issue 4',
			'Halo: Helljumper Issue 5|Issue 5'
		]},
		{'Halo: Blood Line|Blood Line': [
			'Halo: Blood Line Issue 1|Issue 1',
			'Halo: Blood Line Issue 2|Issue 2',
			'Halo: Blood Line Issue 3|Issue 3',
			'Halo: Blood Line Issue 4|Issue 4',
			'Halo: Blood Line Issue 5|Issue 5'
		]},
		{'Halo: Fall of Reach|Fall of Reach': [
                        'Halo: Fall of Reach - Boot Camp|Boot Camp',
                        'Halo: Fall of Reach - Covenant|Covenant',
                        'Halo: Fall of Reach - Pillar of Autumn|Pillar of Autumn'
                ]},
		'Halo Wars: Genesis|Genesis',
		{'Halo Graphic Novel|Graphic Novel': [
			'The Last Voyage of the Infinite Succor|The Last Voyage of the Infinite Succor',
			'Armor Testing|Armor Testing',
			'Breaking Quarantine|Breaking Quarantine',
			'Second Sunrise over New Mombasa|Second Sunrise over New Mombasa'
		]},
		'Halo 3: The Cradle of Life|The Cradle of Life'
	]},
	{'Category:Film|Animation': [
		{'Halo Legends|Halo Legends': [
			'Babysitter|Babysitter',
			'Duel|Duel',
			'Homecoming|Homecoming',
			'Odd One Out|Odd One Out',
			'Origins|Origins',
			'The Package|The Package',
			'Prototype|Prototype'
		]}
	]},
	{'Category:Film|Live Action': [
		{'Halo: Landfall|Halo: Landfall': [
			'Halo: Arms Race|Arms Race',
			'Halo: Combat|Combat',
			'Halo: Last One Standing|Last One Standing'
		]},
		{'Remember Reach|Remember Reach': [
			{'Remember Reach Webfilm|Remember Reach Webfilm': [
				'New Life|New Life',
				'Patrol|Patrol',
				'Spaceport|Spaceport'
			]},
			'Deliver Hope|Deliver Hope'
		]},
		'Birth of a Spartan|Birth of a Spartan',
		'We Are ODST|We Are ODST',
		'Halo (Film)|Halo movie'
	]},
	{'Category:Books|Reference': [
		'Art of Halo|Art of Halo',
		'Art of Halo 3|Art of Halo 3',
		'Halo Encyclopedia|Halo Encyclopedia'
	]},
	{'Category:Books|Strategy Guides': [
		'Halo: Combat Evolved: Sybex Official Strategies & Secrets|Halo: Combat Evolved',
		'Halo 2: The Official Strategy Guide|Halo 2',
		'Halo 3: The Official Strategy Guide|Halo 3',
		'Halo Wars: Official Strategy Guide|Halo Wars',
		'Halo 3: ODST Official Strategy Guide|Halo 3: ODST',
'		Halo: Reach Official Strategy Guide|Halo: Reach'
	]}
];

wgSidebar['Gameplay'] = [
	'Halo Waypoint|Waypoint',
	'Equipment|Equipment',
	'Weapons|Weapons',
	'Category:Vehicles|Vehicles',
	'Armor Permutations|Armor Permutations',
	'Category:Levels|Walkthroughs',
	'Multiplayer|Multiplayer'
];

wgSidebar['The Universe'] = [
	{'Category:Characters|Main Game Characters': [
		'John-117|John-117',
		'Cortana|Cortana',
		'Thel \'Vadam|Thel \'Vadamee',
		'Avery Junior Johnson|Avery Johnson',
		'Prophet of Truth|Prophet of Truth',
		'Gravemind|Gravemind',
		'343 Guilty Spark|343 Guilty Spark',
		'James Gregory Cutter|James Cutter',
		'Serina|Serina',
		'John Forge|John Forge',
		'Ellen Anders|Ellen Anders',
		'Ripa \'Moramee|Ripa \'Moramee',
		'Prophet of Regret|Prophet of Regret',
		'The Rookie|The Rookie',
		'Superintendent|Superintendent',
		'Unnamed Shock Trooper Squad|Buck\'s Squad',
		'Noble Team|Noble Team'
	]},
	{'Category:Characters|Main Book Characters': [
		'Kurt-051|Kurt Ambrose',
		'Rtas \'Vadum|Rtas \'Vadumee',
		'Catherine Elizabeth Halsey|Catherine Halsey',
		'James Ackerson|James Ackerson',
		'Adriana-111|Adriana-111',
		'Jai-006|Jai-006',
		'Mike (SPARTAN-II)|Mike',
		'Ignatio Delgado|Ignatio Delgado',
		'Connor Brien|Connor Brien',
		'Michael Baird|Michael Baird',
		'Gage Yevgenny|Gage Yevgenny',
		'Jonah|Jonah',
		'Roland (Spartan)|Roland',
		'Unnamed Sangheili Shipmaster (The Return)|Shipmaster (The Return)',
		'Preston Jeremiah Cole|Preston Jeremiah Cole'
	]},
	{'Category:Characters|Main Comic Characters': [
		'Ruwan Ackerson|Ruwan Ackerson',
		'Myras Tyla|Myras Tyla',
		'Team Black|Team Black',
		'686 Ebullient Prism|686 Ebullient Prism',
		'Thon \'Talamee|Thon \'Talamee',
		'Reff \'Talamee|Reff \'Talamee'
	]},
	'United Nations Space Command|United Nations Space Command',
	'Covenant Empire|Covenant Empire',
	'Forerunner|Forerunner',
	'Flood|Flood'
];

wgSidebar['Community'] = [
	{'Halopedia:Administrators|Administrators': [
		'User:CommanderTony|CommanderTony',
		'User:Dragonclaws|Dragonclaws',
		'User:Forerunner|Forerunner',
		'User:General5 7|General5 7',
		'User:Halo-343|Halo-343',
		'User:Jack Phoenix|Jack Phoenix',
		'User:Jugus|Jugus',
		'User:Nicmavr|Nicmavr',
		'User:Porplemontage|Porplemontage',
		'User:Smoke.|Smoke.'
	]},
	{'Halopedia:Usergroups|Disbanded Usergroups': [
		'Halopedia:Monitors of Halopedia|Monitors',
		'Halopedia:Standards Council of Halopedia|Standards Council',
		'Halopedia:UNSC of Halopedia|United Nations',
		'Halopedia:Covenant of Halopedia|Covenant',
		'Halopedia:Ancients of Halopedia|Ancients',
		'Halopedia:Gamers of Halopedia|Gamers'
	]},
	'Forum:Index|Halopedia Forums',
	'Halopedia:IRC Channel|Live Chat',
	'Halopedia:Halopedian of the Month|Halopedian of the Month',
	'Halopedia:Halopedian|List of Halopedians',
	'Category:Featured Articles|Featured articles',
	'Halopedia:Warz|Halopedia Warz',
	'Halopedia:Project Userbox|Project Userbox',
	'Halopedia talk:Parodies|Parodies',
	'Special:TopUsers|Distinguished Users'
];

wgSidebar['Help'] = [
	{'Category:Official Halopedia Policy|Policies': [
		'Halopedia:General Disclaimer|General Disclaimer',
		'Halopedia:What Halopedia is not|What Halopedia is not',
		'Halopedia:Blocking Policy|Blocking Policy',
		'Halopedia:Bots|Bot Policy',
		'Halopedia:Canon Policy|Canon Policy',
		'Halopedia:Copyright Policy|Copyright Policy',
		'Halopedia:Image Policy|Image Policy',
		'Halopedia:Layout Guide|Layout Guide',
		'Halopedia:Manual of Style|Manual of Style',
		'Halopedia:Notability Policy|Notability Policy',
		'Halopedia:Protected page Policy|Protected Page Policy',
		'Halopedia:Signature Policy|Signature Policy',
		'Halopedia:Spoilers Policy|Spoilers Policy',
		'Halopedia:Usergroup Policy|Usergroup Policy',
		'Halopedia:Voting Policy|Voting Policy'
	]},
	{'Help:Contents|Guidelines': [
		'Help:Signatures|Custom Signatures',
		'Help:Disambiguation|Disambiguation',
		'Help:Editing|Editing',
		'Help:Images|Images',
		'Help:Level Walkthroughs|Level Walkthroughs',
		'Help:Links|Links',
		'Halopedia:Parodies|Parodies',
		'Help:References|References',
		'Help:Rollback Rights|Rollback Rights',
		'Halopedia:Shortcut|Shortcuts',
		'Help:Tables|Tables',
		'Help:Templates|Templates',
		'Help:Userboxes|Userboxes',
		'Help:YouTube|YouTube'
	]}
];

wgSidebar['Related Sites'] = [
	{'Halopedia:Related Sites|Community': [
		'http://bungie.net|Bungie.net',
		'http://halowars.com|Halo Wars',
		'http://halo.bungie.org|Halo.Bungie.Org',
		'http://blog.ascendantjustice.com|Ascendant Justice',
		'http://forgehub.com|Forge Hub',
		'http://haloterms.bungie.org|Terminal Hub',
		'http://haloring.org/|HaloRing Club'
	]},
	{'Halopedia:Related Sites|Wikis': [
		'http://halofanon.wikia.com/|Halo Fanon',
		'http://unhalo.wikia.com/|Gruntipedia',
		'http://halomachinima.wikia.com/|Halo Machinima',
		'http://halomods.wikia.com/|Halo Mods',
		'http://haloroleplay.wikia.com/|Halo Roleplay',
		'http://rvb.wikia.com/|Red vs. Blue',
		'http://bungie.wikia.com/|Bungiepedia'
	]},
	{'Halopedia:Project Userbox/Babel|International': [
		'http://fr.halo.wikia.com/|Français (French)',
		'http://de.halo.wikia.com/|Deutsch (German)',
		'http://el.halo.wikia.com/|Ελληνικά (Greek)',
		'http://it.halo.wikia.com/|Italiano (Italian)',
		'http://ja.halo.wikia.com/|日本語 (Japanese)',
		'http://pl.halo.wikia.com/|Polski (Polish)',
		'http://es.halo.wikia.com/|Español (Spanish)'
	]}
];

/* </pre> */