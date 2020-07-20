 // Usertags
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
 
impart('u:dev:MediaWiki:UserTags/code.js');

// MessageWallClass
// Created by Dai ca superman
window.MessageWallClass = {
    users: {
	'Aria132': 'Member Aria132',
	'Aria0214': 'Member Aria0214',
	'Avianhope': 'Member Avianhope',
	'A.Homura': 'Member Legion Homura',
	'Brisingr22': 'Member Brisingr22',
	'Chio_Miyamo': 'Member GMC',
	'Dai_ca_superman': 'Techadmin Dai-ca-superman',
	'Danielhopper1806': 'Member Danielhopper1806',
	'Datvippq': 'Member Datvippq',
	'DeHooker': 'Member DeHooker',
	'Dorevsdore02': 'Member Dorevsdore02',
	'Duong0810': 'SuperMem Duong0810',
	'GVN.Chaos': 'Legend Chaos',
	'HamanoAkira': 'SuperMem HamanoAkira',
	'Hewki98': 'Member Hewki98',
	'Hibiki3190': 'Member Hibiki3190',
	'Hika2310': 'Member Hika2310',
	'HiKiTaNi': 'Member HiKiTaNi',
	'Himemaouyuki': 'Member Himemaouyuki',
	'Hyddty': 'Member Hyddty',
	'Ispassingby': 'Member Ispassingby',
	'Kaizuka_Satomi': 'Member Kaizuka-Satomi',
	'Kagamine_Rukato': 'Member Kagamine-Rukato',
	'Kirito96': 'Member Kirito96',
	'Kiv_x_Monster': 'Member Kiv-x-Monster',
	'Krt_Shu': 'SuperMem Krt-Shu',
	'Kuroneko6558': 'Member Kuroneko6558',
	'Kurosame_Yato': 'SuperMem Kurosame-Yato',
	'Leaf_snivy': 'Member Nokemon',
	'Lolicon-er': 'Member Lolicon-er',
	'Maththunder': 'Admin Maththunder',
	'Medassin': 'Legend Medassin',
	'Minhtun': 'Member Minhtun',
	'Mistykd': 'Member Mistykd',
	'MurakamiAvianHope': 'Member MurakamiAvianHope',
	'Mysakuradying': 'Member Mysakuradying',
	'Ngubathong': 'SuperMem Ngubathong',
	'NoHag': 'Member NoHag',
	'Perfectstrong': 'Editor Legion Perfectstrong',
	'Pikeman1': 'Member Pikeman1',
	'Phạm_Thanh_Hà': 'Member Pham_Thanh_Ha',
	'PrinzEugenz': 'Legend PrinzEugenz',
	'QDuyPFIEV': 'Legend QDuyPFIEV',
	'Ryugamine_Mikado': 'Member Ryugamine-Mikado',
	'ScarletGold': 'Member ScarletGold',
	'Shiratori_Kanae': 'Member Shiratori_Kanae',
	'Silver_Eyes': 'SuperMem Silver-Eyes',
	'Sweec1890': 'Member Sweec1890',
	'The_F_Factor': 'FBEditor TFF',
	'Tnguyen2511': 'SuperMem Tnguyen2511',	
	'Tran_Duc_Anh': 'Member Tran-Duc-Anh',
	'Trung_Kh%E1%BB%87nh': 'Member Trung-Khenh',
	'Turtle-kun': 'Member Turtle-kun',
	'VaSu.Takei': 'Member VaSuTakei',
	'Vnsharing135': 'Member Vnsharing135',
	'Vnsnas': 'Admin Vnsnas',
	'Wasabikiller': 'Member Wasabikiller',
	'W.H.H.H.': 'Member WHHH',
	'XDarKraDx': 'Admin XDarKraDx',
	'Yamitohikari136': 'Member Yamitohikari136',
	'YUGI-OH510': 'Legend YUGI-OH510',
	'Yuseifudo1994': 'SuperMem Yuseifudo1994',
	'Zecro': 'Member Zecro',
	'ZzZMineIsMyLifeZzZ': 'Legend Kizz'
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