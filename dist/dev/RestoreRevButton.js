$( function() {
	if (window.RestoreRevButton) { return; }
    window.RestoreRevButton = { loaded: true };

	if ($('#p-views.page-header__actions #ca-viewsource').length > 0) return;
	
	var pname = mw.config.get('wgPageName');
	var revid, revcontainer, backup;
	
	$('#pagehistory > ul > li').each(function() {
		$(this).append(
			(' '),
			$('<span>', {
				'class': 'mw-changeslist-links restore-revid'
			}).append(
				$('<span>').append(
					$('<a>', {
						href: 'javascript:void(0)',
						title: 'Restore this revision',
						text: 'restore',
						'data-revid': $(this).attr('data-mw-revid')
					})
				)
			)
		);
	});
	$('.restore-revid a').click(function() {
		revid = $(this).attr('data-revid');
		revbutton = $(this).clone();
		revcontainer = $(this).parent();
		var api = new mw.Api();
		api.get( {
    		action: 'query',
    		format: 'json',
    		prop: 'revisions',
    		rvslots: '*',
    		rvprop: 'content|user',
    		rvstartid: revid,
    		rvendid: revid,
    		titles: pname,
    		formatversion: '2',
		}).done( function(data) {
			var revisionLink = '[[Special:PermanentLink/' + revid + '|' + revid + ']]';
			var userLink = '[[User:' + data.query.pages[0].revisions[0].user + '|' + data.query.pages[0].revisions[0].user + ']]';
			var summarytext = 'Restored revision ' + revisionLink + ' by ' + userLink;
			$('body').css('cursor','wait');
			$(revcontainer).html('loading');
    		api.post({
    			action: 'edit',
        		title: pname,
        		token: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken'),
           		watchlist: 'nochange',
           		text: data.query.pages[0].revisions[0].slots.main.content,
           		summary: summarytext
    		}).done(function() {
    			$('body').css('cursor','');
    			$(revcontainer).html($(revbutton));
    			mw.loader.using('mediawiki.notification', function() {
        			mw.notification.notify('Revision ' + revid + ' restored', {
        				tag: 'RestoreRevButton'
        			});
        		});
			});
		});
	});
	mw.util.addCSS( '#pagehistory > ul > li:not(.selected) .restore-revid { display: none }' );
} );