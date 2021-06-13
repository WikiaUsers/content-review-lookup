/*<pre>
Warning: This is JavaScript code. If there's any syntax error in this code, the sidebar menu will stop working. Make sure you don't break anything.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Every menu is a list [ ... ]. A string " ... " is an element. An object { ... } is an element with a submenu, where the key (before the : ) is the element itself and the value (after the : ) is a list [ ... ] with the contents of the submenu.
For each element, It will be the link and the text. If you put a pipe character | what comes before will be the link and what comes after will be the text
*/
wgSidebar["Help"] = [
	"Help:Tecna's Files|Tecna's Files",
	"Help:Winx Wikia Standards|Winx Wikia Standards",
	"Help:Administrators|Administrators",
	"Help:New Users|New Users",
	"Forum:Help:Q/A|Q/A Forum"
];

wgSidebar["community"] = [
	"Forum:Index|Forum"
];

wgSidebar["Winx Club"] = [
	{"Winx Club": [
		"Bloom",
		"Stella",
		"Flora",
		"Musa",
		"Tecna",
		"Layla",
		"Roxy"
	]},
	{"Specialists": [
		"Sky",
		"Brandon",
		"Helia",
		"Riven",
		"Timmy",
		"Nabu"
	]},
	{"Witches": [
		"Icy",
		"Darcy",
		"Stormy"
	]},
	{"Pixies": [
		"Lockette",
		"Amore",
		"Chatta",
		"Tune",
		"Digit",
		"Piff"
	]},
	{"Wizards": [
		"Anagan",
		"Duman",
		"Gantlos",
		"Ogron"
	]},
        {"Pop Pixie": [
        ]},
];

wgSidebar["Series"] = [
	"Season 1",
	"Season 2",
	"Season 3",
	"Season 4",
	"Season 5",
	"Winx Club: The Secret of the Lost Kingdom",
	"Winx Club 3D:Magic Adventure"
];

wgSidebar["Affiliates"] = [
	"http://www.winxclubfanon.wikia.com|Winx Club Fanon Wikia"
]

/* Call the initialization code */
$(MonobookSidebar.init);

/*</pre>*/