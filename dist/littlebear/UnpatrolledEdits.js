$(function(){
	var rights = mw.config.get('wgUserGroups');
	var wrongRights =
		rights.indexOf('content-moderator') === -1 &&
		rights.indexOf('helper') === -1 &&
		rights.indexOf('staff') === -1 &&
		rights.indexOf('sysop') === -1 &&
		rights.indexOf('wiki-specialist') === -1;
	
	if (mw.config.get('wgNamespaceNumber') !== -1 || mw.config.get('wgTitle') !== 'BlankPage/UnpatrolledEdits' || wrongRights){
		return;
	}
	
	var api = new mw.Api();
	
	api.get({
		action:'query',
		list:'recentchanges',
		rcprop:'title|ids',
		rcshow:'!patrolled',
		rclimit:'5000',
	}).done(function(data){
		api.loadMessagesIfMissing(['Custom-UnpatrolledEdits-title', 'Custom-UnpatrolledEdits-summary', 'Specialpage-empty']).done(function(){
			document.title = mw.message('Custom-UnpatrolledEdits-title').text() + ' | Little Bear Wiki | Fandom';
			
			$('#firstHeading').html(mw.message('Custom-UnpatrolledEdits-title').parse());
			$('#mw-content-text p').html(mw.message('Custom-UnpatrolledEdits-summary').text());
			
			var changes = data.query.recentchanges;
			
			if (changes.length === 0){
				$('#mw-content-text p').after(mw.message('Specialpage-empty').parse());
				return;
			}
			
			var list = $('<ul>');
			
			changes.forEach(function(v){
				list.append($('<li><a href="' + mw.util.getUrl(v.title) + '">' + mw.html.escape(v.title) + '</a> (<a href="' + mw.util.getUrl('Special:Diff/' + v.revid) + '">diff</a>)</li>'));
			});
			
			$('#mw-content-text p').after(list);
		});
	});
});