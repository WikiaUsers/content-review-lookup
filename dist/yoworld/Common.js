//* Code below is for User Tags *//
importScriptPage('InactiveUsers/code.js', 'dev');
    
//* Code below is for import articles *//

importArticles({
    type: "script",
    articles: [
        'w:c:dev:Countdown/code.js',
    ]});

window.UserTagsJS = {
	modules: {},
	tags: {
                t: { u: 'TESTER', order: 99 }, //Unused Tag
                vm: { u: 'ELITE CONTRIBUTOR', order: 100 }, //Unused Tag
                we: { u: 'WIKIA EXPERT', order: 101 }, //Unused Tag
                ye: { u: 'YOWORLD EXPERT', order: 102 }, //Unused Tag
                ca: { u: 'COMMUNITY ADMIN', order: 103 }, //Unused Tag
                sa: { u: 'SITE ADMINISTRATOR', order: 104 }, //Unused Tag
                os: { u: 'OLD STAFF', order: 105 }, //Unused Tag
                y: { u: 'YOHERO', order: 106 }, //Unused Tag
                n: { u: 'NINJA', order: 107 }, //Unused Tag
                v: { u: 'VIKING', order: 108 }, //Unused Tag
                is: { u: 'INACTIVE STAFF', order: 109 }, //Unused Tag
                f: { u: 'FORUMER', order: 110 }, //Unused Tag
                h: { u: 'HELPER', order: 111 }, //Unused Tag
                pga: { u: 'PRICE GUIDE AGENT', order: 112 }, //Unused Tag
                yar: { u: 'YOWORLD ACTIVITY REPORTER', order: 113 }, //Unused Tag
                wl1: { u: 'Warning Level: 1', order: 114 }, //Unused Tag
                wl2: { u: 'Warning Level: 2', order: 115 }, //Unused Tag
                wl3: { u: 'Warning Level: 3', order: 116 }, //Unused Tag 
                s: { u: 'Staff', order: 117 }, //Staff Tag
                yk: { u: 'YoWorld Wiki Keeper', order: 118 },
                yn: { u: 'YoWorld Fashion Scholar', order: 119 },
                yp: { u: 'YoWorld Wikia Envoy', order: 120 },
                bureaucrat: { order: 1 } //Unknown
                
	}
};
UserTagsJS.modules.custom = {

	'Anthony Hiram': ['yk'],
	'Brian YoWorld': ['yp'], 
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];


//* Code below is for username template *//

if (wgUserName != 'null') {
    $('.insertusername').html(wgUserName);}
    
//* Code below is for username template *//

var MessageBlock = {
  title : 'Banned',
  message : 'You have been banned for $2 for the following reason(s): "$1"',
  autocheck : true
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js',
    
    ]
});

//*The following Coding removed the message features from out BOT walls*//

if(wgPageName === "Message_Wall:YoBot5000") {
   $('.Wall').remove();
}