 // Usertags
// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		Member: 'Member of Higashi',
		SuperMem: 'Rank-S Member',
        Legend: 'Legendary Member',
        Editor: 'Editor of Higashi',
		Techadmin: 'Tech Admin',
		Legion: 'Legion of Honour',
        newuser: 'Novice',
}
}; 
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Aria132': ['Member'],
	'Aria0214': ['Member'],
	'A.Homura': ['Member', 'Legion'],
	'Brisingr22': ['Member'],
	'Kenkyouta118': ['Techadmin', 'SuperMem' , 'Editor of Higashi'],
	'Danielhopper1806': ['Member'],
	'Dorevsdore02': ['Member'],
	'Duong0810': ['SuperMem'],
	'HamanoAkira': ['SuperMem'],
	'Hewki98': ['Member'],
	'Hibiki3190': ['Member'],
	'Hika2310': ['Member'],
	'HiKiTaNi': ['Member'],
	'Himemaouyuki': ['Member'],
	'Hyddty': ['Member'],
	'Kaizuka Satomi': ['Member'],
	'Kagamine Rukato': ['Member'],
	'Kirito96': ['Member'],
	'Krt Shu': ['SuperMem'],
 	'Kurosame Yato': ['Member'],
	'Leaf snivy': ['Member'],
	'Lolicon-er': ['Member'],
	'Maththunder': ['SuperMem'],
	'Medassin': ['Legend'],
	'Minhtun': ['Member'],
	'Mistykd': ['Member'],
	'Mysakuradying': ['Member'],
	'Ngubathong': ['Member'],
	'NoHag': ['Member'],
	'Perfectstrong': ['Editor', 'Legion'],
	'Pikeman1': ['Member'],
	'QDuyPFIEV': ['SuperMem'],
	'Ryugamine Mikado': ['Member'],
	'ScarletGold': ['Member'],
	'Shiratori Kanae': ['Member'],
	'Silver Eyes': ['SuperMem'],
	'Sweec1890': ['Member'],
	'Tnguyen2511': ['SuperMem'],	
	'Tran Duc Anh': ['Member'],
	'Turtle-kun': ['Member'],
	'VaSu.Takei': ['Member'],
	'Vnsharing135': ['Member'],
	'Vnsnas': ['Member'],
	'Wasabikiller': ['Member'],
	'W.H.H.H.': ['Member'],
	'XDarKraDx': ['Legend'],
	'Yamitohikari136': ['Member'],
	'YUGI-OH510': ['Legend'],
	'Yuseifudo1994': ['Member'],
	'Zecro': ['Member'],
	'ZzZMineIsMyLifeZzZ': ['SuperMem'],
	'Kirishi': ['SuperMem' , 'Techadmin' , 'Editor of Higashi'],
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30; // Inactive if no edits in 30 days
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat'],
rollback: ['bureaucrat'],
chatmoderator: ['bureaucrat']
};
 
impart('u:dev:MediaWiki:UserTags/code.js');

// MessageWallClass
// Created by Kenkyouta118
window.MessageWallClass = {
    users: {
	'Aria132': 'Member Aria132',
	'Aria0214': 'Member Aria0214',
	'A.Homura': 'Member Legion Homura',
	'Brisingr22': 'Member Brisingr22',
	'Dai_ca_superman': 'Techadmin Dai-ca-superman',
	'Danielhopper1806': 'Member Danielhopper1806',
	'Dorevsdore02': 'Member Dorevsdore02',
	'Duong0810': 'SuperMem Duong0810',
	'HamanoAkira': 'SuperMem HamanoAkira',
	'Hewki98': 'Member Hewki98',
	'Hibiki3190': 'Member Hibiki3190',
	'Hika2310': 'Member Hika2310',
	'HiKiTaNi': 'Member HiKiTaNi',
	'Himemaouyuki': 'Member Himemaouyuki',
	'Hyddty': 'Member Hyddty',
	'Kaizuka_Satomi': 'Member Kaizuka-Satomi',
	'Kagamine_Rukato': 'Member Kagamine-Rukato',
	'Kirito96': 'Member Kirito96',
	'Krt_Shu': 'SuperMem Krt-Shu',
	'Kurosame_Yato': 'Member Kurosame-Yato',
	'Leaf_snivy': 'Member Nokemon',
	'Lolicon-er': 'Member Lolicon-er',
	'Maththunder': 'Admin Maththunder',
	'Medassin': 'Legend Medassin',
	'Minhtun': 'Member Minhtun',
	'Mistykd': 'Member Mistykd',
	'Mysakuradying': 'Member Mysakuradying',
	'Ngubathong': 'Member Ngubathong',
	'NoHag': 'Member NoHag',
	'Perfectstrong': 'Editor Legion Perfectstrong',
	'Pikeman1': 'Member Pikeman1',
	'QDuyPFIEV': 'SuperMem QDuyPFIEV',
	'Ryugamine_Mikado': 'Member Ryugamine-Mikado',
	'ScarletGold': 'Member ScarletGold',
	'Shiratori_Kanae': 'Member Shiratori_Kanae',
	'Silver_Eyes': 'SuperMem Silver-Eyes',
	'Sweec1890': 'Member Sweec1890',
	'Tnguyen2511': 'SuperMem Tnguyen2511',	
	'Tran_Duc_Anh': 'Member Tran-Duc-Anh',
	'Turtle-kun': 'Member Turtle-kun',
	'VaSu.Takei': 'Member VaSuTakei',
	'Vnsharing135': 'Member Vnsharing135',
	'Vnsnas': 'Admin Vnsnas',
	'Wasabikiller': 'Member Wasabikiller',
	'W.H.H.H.': 'Member WHHH',
	'XDarKraDx': 'Admin XDarKraDx',
	'Yamitohikari136': 'Member Yamitohikari136',
	'YUGI-OH510': 'Legend YUGI-OH510',
	'Yuseifudo1994': 'Member Yuseifudo1994',
	'Zecro': 'Member Zecro',
	'ZzZMineIsMyLifeZzZ': 'SuperMem Kizz'
    }
};

(function($, config) {
    var users = config.users || {}; //List of users to tag and what the tag will say
    function test() {
        for (var name in users) {
            $( '.MiniEditorWrapper' ).has('a[href$="Message_Wall:' + mw.util.wikiUrlencode(name) + '"]')
                .addClass(users[name]);
        }
    }
    test();
}(jQuery, window.MessageWallClass));