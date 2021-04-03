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

wgSidebar['Machnima'] = [
	'Sandguardians|Sandguardians',
	'Chief & Chief|Chief & Chief',
	'C N' P|C N' P',
	'Arby 'n' The Chief|Arby 'n' The Chief',
	'Red vs. Blue|Red vs. Blue',
	'Phil|Phil'
];

wgSidebar['Machinima Creators'] = [
	{'Category:Books|Novels': [
		'Bus Stop Productions|Bus Stop Productions',
		'Josh KG|Josh KG',
		'Alexo670|Alexo670',
		'Jon CJG|Jon CJG',
		'Rooster Teeth|Rooster Teeth',
		'Black Light Productions|Black Light Productions',
		'Darkspire Films|Darkspire Films',
		'Better Fight Fast Productions|Better Fight Fast Productions',
		'SodaGod|SodaGod'
];

wgSidebar['Community'] = [
	{'Halo Machinima:Administrators|Administrators': [
		'User:Oo7nightfire|Oo7nightfire',
		'User:Jman98|Jman98',
		'User:Zeon1|Zeon1'
	]},

];

wgSidebar['Related Sites'] = [
	{'Halo Machinima:Community Links|Community': [
		'http://bungie.net|Bungie.net',
		'http://halowars.com|Halo Wars',
		'http://halo.bungie.org|Halo.Bungie.Org',
		'http://blog.ascendantjustice.com|Ascendant Justice',
		'http://forgehub.com|Forge Hub',
		'http://haloterms.bungie.org|Terminal Hub',
		'http://haloring.org/|HaloRing Club'
	]},
	{'Halo Machnima:Community|Wikis': [
		'http://halofanon.wikia.com/|Halo Fanon',
		'http://halopedian.com/|Halopedia',
		'http://antc.wikia.com/|AnTC',
		'http://halo.wikia.com/|Halo Nation',
		'http://arbynthechiefbeta.wikia.com/|Arby 'n' The Chief',
		'http://rvb.wikia.com/|Red vs. Blue',
		'http://bungie.wikia.com/|Bungiepedia'
	]},
];

/* </pre> */