/* Any JavaScript here will be loaded for users using the MonoBook skin */

wgSidebar['Necromorphs'] = [ //Top Level elements of the list must match the names in the mediawiki:sidebar navigation list
	{'Dead Space|Dead Space 1': [ //Second Level element of the list which includes a Third Level list
		'Slasher|Slasher', //Third Level element with no sublist
		'Exploder|Exploder',
		'Lurker|Lurker'
	]},
	{'Dead Space 2|Dead Space 2': [
		'The Pack|The Pack',
		'Stalker|Stalker',
		'Crawler|Crawler',
		{'Dead Space 2: Severed|Severed': [ //This is a Third Level element with a sublist
			'Twitcher|Twitcher'
		]} //Notice the absence of a coma, for the last elements of lists
	]},
	'Dead Space 3|Dead Space 3' //This is a Second Level Element without sublist
];
 
wgSidebar['Weapons'] = [
	{'Dead Space|Dead Space 1': [
		'211-V Plasma Cutter|Plasma Cutter' //Left of the | is the URI link, right of the | is the text that appears
	]},
	{'Dead Space 2|Dead Space 2': [
		'Javelin Gun|Javelin Gun'
	]}
];
 
/* Call initialising method of the Monobook Sidebar*/
$(MonobookSidebar.init);
 
/*</pre>*/