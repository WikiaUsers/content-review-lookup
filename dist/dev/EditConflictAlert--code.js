/* EditConflictAlert
 *
 * Tells the user when a page that is currently being edited is updated.
 *
 * @author Dorumin
 * @author Joritochip
 */

$(function() {
    var config = mw.config.get([
        'wgAction',
        'wgArticleId',
        'wgContentLanguage',
        'wgCurRevisionId',
        'wgNamespaceIds',
        'wgNamespaceNumber',
        'wgPageName',
        'wgScriptPath',
        'wgUserName',
        'skin',
        'stylepath',
    ]);
    
    if (
        (config.wgAction !== 'edit' && config.wgAction !== 'submit') ||
        [1201, 1200, 2002].indexOf(config.wgNamespaceNumber) !== -1 ||
        config.wgArticleId === 0 ||
        window.EditConflictAlertInit
    ) return;
    window.EditConflictAlertInit = true;
    
    var cur_id = config.wgCurRevisionId,
        old_id = cur_id,
        diff_css_loaded = false,
        diff_modal,
        new_content,
        Api,
        i18n;
        
    function fetch_revs() {
    	return Api.get({
    		action: 'query',
    		prop: 'revisions',
    		rvprop: 'ids|user|content',
    		titles: config.wgPageName,
    		cb: Date.now()
    	});
    }
    
    function load_diff_css() {
    	if (diff_css_loaded || config.skin !== 'fandomdesktop') return;
    	diff_css_loaded = true;
    	/* Re-importing skin.fandomdesktop.css because VE loads in other CSS that overrides diff css */
    	$.get(mw.util.wikiScript('load') + '?modules=mediawiki.diff.styles%7Cskin.fandomdesktop.css&only=styles').done(function(data) {
    		$('#EditConflictAlert_css').append(data);
    	});
    }
    
    function fetch_diff() {
    	$.get(config.wgScriptPath + '/?diffonly=1&diff=' + cur_id + '&oldid=' + old_id).done(function(page) {
    		var $el = $(page).find('.diff');
    		var diff = $('<div>').append($el.clone());
    		$('.modal-js-window #EditConflictAlert_modal .oo-ui-layout').append(diff);
    		diff_modal.setTitle(i18n.msg('diff-between-revs').escape());
    	});
    }
    
    function set_editor_content(wikitext) {
    	if ($('.ace_editor').length) {
    		var editor = $('.ace_editor')[0].env.editor;
    		editor.session.setValue(wikitext);
		} else if ($('.wikiEditor-ui').length) {
			if ($('.CodeMirror').length) {
				var cm = $('.CodeMirror')[0].CodeMirror; 
				cm.setValue(wikitext); 
				cm.refresh();
			} else {
				$('.wikiEditor-ui #wpTextbox1').val(wikitext);
			}
    	} else if (window.ve && ve.init && ve.init.target && ve.init.target.active) {
    		var target = ve.init.target,
    			surface = target.getSurface(),
    			model = surface.getModel(),
    			doc = model.getDocument(),
    			range = doc.getDocumentRange(),
    			fragment = model.getLinearFragment(range, true);
    		
    		switch (surface.getMode()) {
    			case 'source':
    				fragment.insertContent(wikitext);
    				break;
    			case 'visual':
	    			surface.setReadOnly(true);
	    			target.parseWikitextFragment(wikitext).done(function(data) {
	    				surface.setReadOnly(false);
	    				fragment.insertHtml(data.visualeditor.content);
	    			});
	    			break;
    		}
    	}
    }
        
    function init(values) {
    	var banner = values[0],
    		modal = values[1];
    	Api = new mw.Api();
    	i18n = values[2];
    	
    	diff_modal = new modal.Modal({
    		content: 'Placeholder',
    		size: 'content-size',
    		buttons: [
    			{
    				event: 'replace',
    				id: 'replace-content',
    				text: i18n.msg('update').escape(),
    				primary: true
    			}
    		],
    		events: {
    			replace: function() {
    				if (new_content) { 
    					set_editor_content(new_content);
    					$('.wds-banner-notification.EditConflictAlert_conflict').remove();
    					diff_modal.hide();
    				}
    			}
    		},
    		id: 'EditConflictAlert_modal'
    	});
    	diff_modal.create();
    	
    	setInterval(function() {
    		fetch_revs().done(function(data) {
    			var d = data.query.pages,
    				p = d[Object.keys(d)[0]];
    				
    			if (!p.revisions) return;
    			var r = p.revisions[0];
    			
    			if (r.revid !== cur_id && r.user !== config.wgUserName) {
    				if ($('.wds-banner-notification.EditConflictAlert_conflict').length) return;
    				load_diff_css();
    				diff_modal.hide();
    				
    				cur_id = r.revid;
    				new_content = r['*'];
    				
    				var message = i18n.msg('notification-body').escape()
    					+ ' (<a id="EditConflictAlert_view-diff" href="#">'
    					+ i18n.msg('diff').escape()
    					+ '</a>)';
    				new banner(message, 'notify').show().$element.addClass('EditConflictAlert_conflict');
    				
    				$('#EditConflictAlert_view-diff').click(function(e) {
    					e.stopPropagation();
    					diff_modal.setTitle(i18n.msg('loading').escape());
    					$('.modal-js-window #EditConflictAlert_modal .oo-ui-layout').empty();
			            diff_modal.show();
			            fetch_diff();
    				});
    			}
    		});
    	}, window.EditConflictAlertInterval ||
    	window.queryInterval ||
    	5000);
    	
    	/* Append style to show banners when VE is active */
    	$('<style>', {
    		id: 'EditConflictAlert_css',
    		text: '.ve-active .notifications-placeholder{display:inherit !important}#EditConflictAlert_modal {color: var(--theme-page-text-color)}',
    		appendTo: $('body')
    	});
    }
    
    /* Load external libraries */
    Promise.all([
    	new Promise(function(resolve) {
    		mw.hook('dev.banners').add(resolve);
    	}),
    	new Promise(function(resolve) {
    		mw.hook('dev.modal').add(resolve);
    	}),
    	new Promise(function(resolve) {
		    mw.hook('dev.i18n').add(function(lib) {
		        lib.loadMessages('EditConflictAlert').done(function(lang) {
		            lang.useUserLang();
		            resolve(lang);
		        });
		    });
    	}),
    	mw.loader.using('mediawiki.api'),
    	mw.loader.using('mediawiki.util')
    ]).then(init);
    
    importArticles({
    	type: 'script',
    	articles: [
    		'u:dev:MediaWiki:BannerNotification.js',
    		'u:dev:MediaWiki:I18n-js/code.js',
    		'u:dev:MediaWiki:Modal.js',
    	]
    });
});