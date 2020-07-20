/* Any JavaScript here will be loaded for users using the MonoBook skin */

wgSidebar['Di Wiki'] = [ 
	'Special:RecentChanges|Perubahan Terbaru',
	'Special:Random|Halaman Sembarang',
	'Special:Videos|Video',
	'Special:NewFiles|Gambar Baru',
];

wgSidebar['Media'] = [ 
];

wgSidebar['Daftar Karakter|Karakter'] = [ 
];

wgSidebar['Project:Portal Komunitas|Komunitas'] = [ 
	{'Project:Pengurus|Pengurus': [
		'User talk:TrueGuy|TrueGuy',
		'User talk:SF12|SF12'
	]},
        'Blog:Posting terbaru|Posting blog terbaru'
];

/* Call initialising method of the Monobook Sidebar*/
$(MonobookSidebar.init);