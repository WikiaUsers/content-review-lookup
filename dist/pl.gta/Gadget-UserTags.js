window.UserTagsJS = {
  modules: {},
  tags: {
    bureaucrat: { link:'GTA Wiki:Administratorzy#Biurokraci' },
    sysop: { link:'GTA Wiki:Administratorzy#Administratorzy' },
    rollback: { link:'GTA Wiki:Administratorzy#Moderatorzy' },
  }
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'staff', 'vstf', 'helper', 'council'];
UserTagsJS.modules.newuser = { days: 7,	edits: 10 };
UserTagsJS.modules.nonuser = true;

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});