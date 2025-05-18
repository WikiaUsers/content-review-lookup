mw.hook( 'wikipage.content' ).add(function() {
	const config = mw.config.get([
	  'wgNamespaceNumber',
	  'wgTitle',
	]);
	
	if (config.wgNamespaceNumber !== 3) return;

	mw.util.addPortlet( 'p-custom-user-talk-nav', 'User navigation', '#firstHeading' );
	const portlets = mw.util.isIPAddress(config.wgTitle) ? [
	  {page: 'Special:Contributions/' + config.wgTitle, title: 'Contributions'},
	  {page: 'User talk:' + config.wgTitle, params: {redirect: 'no'}, title: 'Message wall'},
	  {page: 'Special:UserProfileActivity/' + config.wgTitle, title: 'Activity'},
	  {page: 'Special:Log/' + config.wgTitle, title: 'Log'},
	  {page: 'Special:AbuseLog', params: {wpSearchUser: config.wgTitle}, title: 'Abuse Log'},
	] : [
	  {page: 'User:' + config.wgTitle, title: 'Profile'},
	  {page: 'Message wall:' + config.wgTitle, title: 'Message wall'},
	  {page: 'User blog:' + config.wgTitle, title: 'Blog'},
	  {page: 'Special:Contributions/' + config.wgTitle, title: 'Contributions'},
	  {page: 'Spezial:UserProfileActivity/' + config.wgTitle, title: 'Activity'},
	  {page: 'Special:Log/' + config.wgTitle, title: 'Log'},
	  {page: 'Special:AbuseLog', params: {wpSearchUser: config.wgTitle}, title: 'Abuse Log'},
	];
	
	portlets.forEach(function (portlet) {
	  mw.util.addPortletLink( 'p-custom-user-talk-nav', mw.util.getUrl(portlet.page, portlet.params), typeof portlet.title !== 'undefined' ? portlet.title : portlet.page );
	});
});