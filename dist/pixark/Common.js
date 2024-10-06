/* Any JavaScript here will be loaded for all users on every page load. */

(function(mw) {
	'use strict';
	// Example: <div class="copy-clipboard"><span class="copy-content">Test</span></div>
	function selectElementText(element) {
		var range, selection;    
		if (document.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(element);
			range.select();
		} else if (window.getSelection) {
			selection = window.getSelection();        
			range = document.createRange();
			range.selectNodeContents(element);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}
	
	mw.hook('wikipage.content').add(function($content) {
		$content.find('.copy-clipboard:not(.loaded)').each(function(_, ele) {
			ele.classList.add('loaded');
			var button = document.createElement('button');
			button.title = 'Copy to Clipboard';
			button.addEventListener('click', function() {
				var content = ele.getElementsByClassName('copy-content')[0];
				if (!content) return;
				selectElementText(content);
				mw.loader.using('mediawiki.notification').then(function() {
					try {
						if (!document.execCommand('copy'))
							throw 42;
						mw.notify('Successfully copied to Clipboard.');
					} catch (err) {
						mw.notify('Copy to Clipboard failed. Please do it yourself.', {type:'error'});
					}
				});
			});
			ele.append(button);
		});
	});
})(window.mediaWiki);