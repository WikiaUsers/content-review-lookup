wgSidebar['Na Wiki'] = [ 
	'Specjalna:RecentChanges|Ostatnie zmiany',
	'Specjalna:Random|Losowa strona',
	'Specjalna:Videos|Filmy',
	'Specjalna:NewFiles|Obrazy',
	'Specjalna:Forum|Forum',
	'Elder_Scrolls_Wiki:Regulamin|Regulamin'
];

wgSidebar['The Elder Scrolls'] = [ 
	'The Elder Scrolls: Arena|Arena',
	'The Elder Scrolls II: Daggerfall|Daggerfall',
	{'The Elder Scrolls III: Morrowind|Morrowind': [
		'The Elder Scrolls III: Bloodmoon|Bloodmoon',
		'The Elder Scrolls III: Tribunal|Tribunal'
	]},
	{'The Elder Scrolls IV: Oblivion|Oblivion': [
		'The Elder Scrolls IV: Knights of the Nine|Knights of the Nine',
		'The Elder Scrolls IV: Shivering Isles|Shivering Isles'
	]},
	{'The Elder Scrolls V: Skyrim|Skyrim': [
		'The Elder Scrolls V: Dawnguard|Dawnguard',
		'The Elder Scrolls V: Hearthfire|Hearthfire',
		'The Elder Scrolls V: Dragonborn|Dragonborn'
	]},
	'The Elder Scrolls: Online|Online',
	'The Elder Scrolls Legends: Battlespire|Battlespire',
	'The Elder Scrolls Adventures: Redguard|Redguard',
	{'The Elder Scrolls Travels|The Elder Scrolls Travels': [
		'The Elder Scrolls Travels: Dawnstar|Dawnstar',
		'The Elder Scrolls Travels: Stormhold|Stormhold',
		'The Elder Scrolls Travels: Shadowkey|Shadowkey',
		'The Elder Scrolls Travels: Oblivion|Oblivion'
	]}
];

$(MonobookSidebar.init);