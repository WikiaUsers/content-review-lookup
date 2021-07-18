mw.loader.using(['mediawiki.api']).done(function() {
	if (!/sysop|bot|soap|staff|bot-global|helper|wiki-representative|wiki-specialist|util/.test(mw.config.get('wgUserGroups').join('\n'))) {
		return;
	}
	if (mw.config.get('wgCanonicalSpecialPageName') !== 'Whatlinkshere') return;
	var $links = $('#mw-whatlinkshere-list li > a');
	if ($links.length === 0) return;
	var threadLinks = [];
	$links.each(function() {
		if ($(this).attr('title').match(/(thread.*@|blog.*\/@comment-\d+)/i)) threadLinks.push($(this).attr('title'));
	});
	if (threadLinks.length === 0) return;
	var target = $('#mw-whatlinkshere-target').val();
	var $button = $('<button title="Remove legacy threads which link here (listed on this page)">Remove legacy threads</button>');
	$button.click(function() {
		$('#RemoveThreadsThrobber').css('visibility','visible');
		var a = new mw.Api();
		a.get({action:'query',titles:target,prop:'linkshere',lhlimit:$links.length}).done(function(data){
			var prom = [];
			for (var p in data.query.pages) {
				var pg = data.query.pages[p];
				if (pg.linkshere == undefined) continue;
				if (pg.linkshere.length === 0) continue;
				for (var l in pg.linkshere) {
					var link = pg.linkshere[l];
					if (threadLinks.indexOf(link.title) === -1) continue;
					prom.push(a.postWithEditToken({action:'edit',text:'',pageid:link.pageid,reason:'Blanking inaccessible threads',bot:true}));
				}
			}
			Promise.allSettled(prom).then(function(res) {
				for (var r in res) {
					if (res[r].status === 'rejected') {
						console.error('Error blanking page:',res[r].value);
					}
				}
				for (var t in threadLinks) {
					$('#mw-whatlinkshere-list > li > a[title="'+threadLinks[t]+'"]').parent().remove();
				}
				$('#RemoveThreadsThrobber').css('visibility','hidden');
			});
		}).fail(function(data){
			console.error('Error getting data:',data);
			$('#RemoveThreadsThrobber').css('visibility','hidden');
		});
		return false;
	});
	$('#mw-whatlinkshere-target').parent().append(' &nbsp;',$button,'<div id="RemoveThreadsThrobber" style="visibility:hidden; height:11px; width:43px; background-image:url(https://vignette.wikia.nocookie.net/dev/images/d/de/Ajax-loader.gif); margin:0 10px; display: inline-block;"></div>');
});