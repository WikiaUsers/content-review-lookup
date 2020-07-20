function admin(username) {
	$('.MiniEditorWrapper .edited-by a[href="' + wgServer + '/wiki/User_talk:' + username.split(' ').join('_') + '"]:not(.subtle)').after
	('&nbsp;&nbsp;' + '<a href="/wiki/Club_Penguin_Wiki:Administrators" style="color:red;font-size:13px;font-style:italic;font-weight:normal;">admin</a>');
}
importScript("MediaWiki:Common.js/ThreadAdminBadges.js");