// Appends two buttons to the title to copy the title with/without namespace
// Author: RheingoldRiver
// Updated by: Caburum

$(function() {
	importArticle({
    	type: 'style',
		article: 'u:dev:MediaWiki:CopyTitle.css'
    }).then(function() {
    	var el = document.createElement('div')
		$(el).attr('id', 'title-copy-outer').html('<div id="title-copy-content" title="Copy only title (no namespace)">&#xF0C5;</div><div id="title-copy-all" title="Copy full title (including namespace)">&#xF0C5;</div>');
		$('#firstHeading').wrapInner('<div id="first-heading-text"></div>');
		$(el).insertAfter(document.getElementById('first-heading-text'));
	
		$('#title-copy-content').click(function() {
			var text = mw.config.get('wgTitle');
			var copyEl = document.createElement('textarea');
			copyEl.value = text;
			document.body.appendChild(copyEl);
			copyEl.select();
			document.execCommand('copy');
			document.body.removeChild(copyEl);
			
			$('#title-copy-content').css('color','var(--themed-success-color)');
			setTimeout(function() {
				$('#title-copy-content').css('color','');
			}, 2000);
		});
	
		$('#title-copy-all').click(function() {
			var text = mw.config.get('wgPageName');
			var copyEl = document.createElement('textarea');
			copyEl.value = text;
			document.body.appendChild(copyEl);
			copyEl.select();
			document.execCommand('copy');
			document.body.removeChild(copyEl);
			document.execCommand('copy');
			
			$('#title-copy-all').css('color','var(--themed-success-color)');
			setTimeout(function() {
				$('#title-copy-all').css('color','');
			}, 2000);
		});
    })
});