// Appends two buttons to the title to copy the title with/without namespace
// Author: RheingoldRiver
// Updated by: Caburum

$(function() {
	if (window.CopyTitleLoaded) {
		return;
	}
	window.CopyTitleLoaded = true;
	
	function init(i18n) {
    	var el = document.createElement('span');
		$(el).attr('id', 'title-copy-container').html('<span id="title-copy-content" title="' + i18n.msg('title-copy-content').escape() + '">&#xF0C5;</span><span id="title-copy-all" title="' + i18n.msg('title-copy-all').escape() + '">&#xF0C5;</span>');
		$('.skin-oasis #firstHeading, .skin-fandomdesktop .page-header__title').append($(el));
	
		$('#title-copy-content').click(function() {
			var text = mw.config.get('wgTitle');
			var copyEl = document.createElement('textarea');
			copyEl.value = text;
			document.body.appendChild(copyEl);
			copyEl.select();
			document.execCommand('copy');
			document.body.removeChild(copyEl);
			
			$('#title-copy-content').css('color', 'var(--theme-success-color)');
			setTimeout(function() {
				$('#title-copy-content').css('color', '');
			}, 2000);
		});
	
		$('#title-copy-all').click(function() {
			var text = mw.config.get('wgPageName').replace(/_/g, ' ');
			var copyEl = document.createElement('textarea');
			copyEl.value = text;
			document.body.appendChild(copyEl);
			copyEl.select();
			document.execCommand('copy');
			document.body.removeChild(copyEl);
			document.execCommand('copy');
			
			$('#title-copy-all').css('color', 'var(--theme-success-color)');
			setTimeout(function() {
				$('#title-copy-all').css('color', '');
			}, 2000);
		});
    }
    
    mw.hook('dev.i18n').add(function() {
    	window.dev.i18n.loadMessages('CopyTitle').then(init);
    });

	importArticle({
		type: 'style',
		article: 'u:dev:MediaWiki:CopyTitle.css'
	});
	importArticles({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
});