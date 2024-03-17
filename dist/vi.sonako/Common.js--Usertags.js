/* // Usertags
// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		Member: 'Member of Sonako',
		SuperMem: 'S-Rank Member',
        Legend: 'Legendary Member',
        Editor: 'Editor of Sonako',
        FBEditor: 'Facebook Editor',
		Techadmin: 'Tech Admin',
		Legion: 'Legion of Honour',
        newuser: 'Novice',
}
}; 
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Aria132': ['Member'],
	'Aria0214': ['Member'],
	'Avianhope': ['Member'],
	'A.Homura': ['Member', 'Legion'],
	'Brisingr22': ['Member'],
	'Chio Miyamo': ['Member'],
	'Dai ca superman': ['Techadmin', 'SuperMem'],
	'Danielhopper1806': ['Member'],
	'Datvippq': ['Member'],
	'DeHooker': ['Member'],
	'Dorevsdore02': ['Member'],
	'Duong0810': ['SuperMem'],
	'GVN.Chaos': ['Legend'],
	'HamanoAkira': ['SuperMem'],
	'Hewki98': ['Member'],
	'Hibiki3190': ['Member'],
	'Hika2310': ['Member'],
	'HiKiTaNi': ['Member'],
	'Himemaouyuki': ['Member'],
	'Hyddty': ['Member'],
	'Ispassingby': ['Member'],
	'Kaizuka Satomi': ['Member'],
	'Kagamine Rukato': ['Member'],
	'Kirito96': ['Member'],
	'Kiv x Monster': ['Member'],
	'Krt Shu': ['SuperMem'],
	'Kuroneko6558': ['Member'],
 	'Kurosame Yato': ['SuperMem'],
	'Leaf snivy': ['Member'],
	'Lolicon-er': ['Member'],
	'Maththunder': ['SuperMem'],
	'Medassin': ['Legend'],
	'Minhtun': ['Member'],
	'Mistykd': ['Member'],
	'MurakamiAvianHope': ['Member'],
	'Mysakuradying': ['Member'],
	'Ngubathong': ['SuperMem'],
	'NoHag': ['Member'],
	'Perfectstrong': ['Editor', 'Legion', 'SuperMem'],
	'Pikeman1': ['Member'],
	'Phạm Thanh Hà': ['Member'],
	'PrinzEugenz': ['Legend'],
	'QDuyPFIEV': ['Legend'],
	'Ryugamine Mikado': ['Member'],
	'ScarletGold': ['Member'],
	'Shiratori Kanae': ['Member'],
	'Silver Eyes': ['SuperMem'],
	'Sweec1890': ['Member'],
	'The F Factor': ['FBEditor'],
	'Tnguyen2511': ['SuperMem'],	
	'Tran Duc Anh': ['Member'],
	'Trung Khệnh': ['Member'],
	'Turtle-kun': ['Member'],
	'VaSu.Takei': ['Member'],
	'Vnsharing135': ['Member'],
	'Vnsnas': ['Member'],
	'Wasabikiller': ['Member'],
	'W.H.H.H.': ['Member'],
	'XDarKraDx': ['Legend'],
	'Yamitohikari136': ['Member'],
	'YUGI-OH510': ['Legend'],
	'Yuseifudo1994': ['SuperMem'],
	'Zecro': ['Member'],
	'ZzZMineIsMyLifeZzZ': ['Legend']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30; // Inactive if no edits in 30 days
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat'],
rollback: ['bureaucrat'],
chatmoderator: ['bureaucrat']
};
 
impart('u:dev:MediaWiki:UserTags/code.js'); */