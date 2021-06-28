$('.insertusername').text(mw.config.get('wgUserName'));
/*MassEdit*/
window.MassEditConfig = {
  interval: 2500,
  placement: {
    element: "toolbar",
    type: "append"
  }
};

/*用戶標籤*/
window.UserTagsJS = {
	modules: {},
	tags: {
	    es: {u:'金牌顧客', link:'fliplinestudios.fandom.com/es'},
	},
};
UserTagsJS.modules.custom = {
    'Nick2345'   : ['es'],
};

UserTagsJS.modules.mwGroups = ['founder', 'bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback', 'soap', 'global-discussions-moderator'];