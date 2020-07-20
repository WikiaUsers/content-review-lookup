/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
window.UserTagsJS = {
	modules: {
		inactive: 30,
		mwGroups: ['bureaucrat', 'sysop', 'chatmoderator', 'rollback', 'bannedfromchat', 'bot', 'voldev', 'fb-user', 'unitl'],
		userfilter: { 'DominElektryk': ['founder'] },
		autoconfirmed: true,
		newuser: true,
		nonuser: true
    },
    tags: {
        bureaucrat: { u:'Strażnik', order: -1000 },
        sysop: { u:'Administrator', order: -999 },
        chatmoderator: { u:'sVIP', order: -998 },
        rollback: { u:'VIP', order: -997 },
    },
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
  var rights = {};
 
// 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
// CODE WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {}; 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS 
 // Plakietki różne
  rights["DanielekKMA"]                = ["Fan Minecrafta"];