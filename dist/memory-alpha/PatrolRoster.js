$(function(){
	var rights = mw.config.get('wgUserGroups');
	var wrongRights =
		rights.indexOf('content-moderator') === -1 &&
		rights.indexOf('helper') === -1 &&
		rights.indexOf('staff') === -1 &&
		rights.indexOf('sysop') === -1 &&
		rights.indexOf('wiki-specialist') === -1;
	
	if (wrongRights){
		return;
	}

	mw.hook('AutoCreateUserPages.loaded').add(function(array){
		console.log(array);
	});
});