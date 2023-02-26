/* Any JavaScript here will be loaded for users using the MonoBook skin */
/*<pre>*/

wgSidebar['Games'] = [ 
	{'Category:Games|Main series': [
		'Dead Space|Dead Space',
		'Dead Space 2|Dead Space 2',
		'Dead Space 3|Dead Space 3'
	]},
	{'Category:Games|Other games': [
		'Dead Space: Extraction|Extraction',
		'Dead Space: Ignition|Ignition',
		'Dead Space (mobile)|Dead Space (mobile)',
		'Dead Space 2: Severed|Severed'
	]}
];

wgSidebar['Books and Media'] = [ 
	{'Category:Books|Books': [
		'Dead Space (comics)|Dead Space (comics)',
		'Dead Space: Extraction (comics)|Extraction (comics)',
		'Dead Space: Martyr|Martyr',
		'Dead Space: Salvage|Salvage'
	]},
	{'Category:Films|Films': [
		'Dead Space: Aftermath|Aftermath',
		'Dead Space: Downfall|Downfall'
	]}
];
 
wgSidebar['Gameplay'] = [ 
	'Category:Characters|Characters',
	'Category:Necromorphs|Necromorphs',
	'Category:Weapons|Weapons',
	'Category:Places|Places'
];

wgSidebar['Community'] = [ 
	{'Category:Policy|Rules and policies': [
		'Project:Blocking Policy|Blocking Policy',
		'Project:Blogs|Blogs guideline',
		'Project:Image Policy|Image Policy',
		'Project:Manual of Style|Manual of Style',
		'Project:Signature Policy|Signature Policy' 
    	]},
	{'Project:Administrators|Administrators': [
		'User:Auguststorm1945|Auguststorm1945',
		'User:Haegemonia|Haegemonia',
		'User:LBCCCP|LBCCCP',
		'User:MasterM|MasterM',
		'User:Nightmare Hobo|Nightmare Hobo',
		'User:Noemon|Noemon',
		'User:Subtank|Subtank'
    	]},
	{'Category:Organisation|Communication': [
		'IRC|Live Chat (IRC)',
		'Special:Chat|Wiki Chat',
		'Project:Community Forum|Community Forum' 
	]},
        'Project:FAQ|Frequently asked questions (FAQ)' 
];

wgSidebar['Related sites'] = [ 
	'http://deadspace.com|Official Dead Space site',
	'http://www.deadspacethemovie.com/|Dead Space: Downfall site',
	'http://deadspacefanon.wikia.com/wiki/Dead_Space_Fanon_Wiki|Dead Space Fanon Wiki' 
];

/* Call initialising method of the Monobook Sidebar*/
$(MonobookSidebar.init);
 
/*</pre>*/