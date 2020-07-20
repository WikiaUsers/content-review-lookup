/*
* Force Rollback
* Immediately rollback a revision to the specified one on a history page
* @author Ozuzanna
*/
	
;(function($, mw) {

if (mw.config.get('wgAction') != 'history') return;

mw.util.addCSS('.force-rollback { cursor:pointer; }');

$('.mw-history-undo').after(' | <a class="force-rollback" title="\"Rollback to this revision\" reverts edit(s) to this page to this revision in one click">rollback to this revision</a>');

$('.force-rollback').click(function() {
	var API = new mw.Api(),
	obj = $(this);
	
	API.get({	
		action: 'query',
		prop: 'revisions',
		rvprop: 'content',
		revids: obj.parent().children('input:first').val()
	})
	.done(function(d) {
		if (!d.error) {
			var text;
			
			for (var i in d.query.pages) {
				if (d.query.pages[i].revisions)
					text = d.query.pages[i].revisions[0]["*"];
				else
					text = "";
			}
			
			API.post({	
				action: 'edit',
				watchlist: 'nochange',
				title: mw.config.get('wgPageName'),
				summary: 'Reverted edit(s) to revision ' + obj.parent().children('input:first').val(),
				text: text,
				bot: true,
				token: mw.user.tokens.get('editToken')
			})
			.done(function(d2) {
				if (!d2.error)
					obj.css({'color':'grey','text-decoration':'line-through'}).removeAttr('href title').text('rollbacked');
				else
					obj.css('color','red').text('Rollback failed: ' + d2.error.code);
			})
			.fail(function() {
				obj.css('color','red').text('Rollback failed');
			});
		}
		else
			obj.css('color','red').text('Rollback failed: ' + d.error.code);
	})
	.fail(function() {
		obj.css('color','red').text('Rollback failed');
	});
});

}) (this.jQuery, this.mediaWiki);