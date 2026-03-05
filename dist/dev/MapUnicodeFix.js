/**
 * @name		MapUnicodeFix
 * @description Decodes Unicode escape sequences (\uXXXX) into readable characters within the Map namespace editor for better readability.
 * @author	    [[w:User:Filni Archirium]]
 */

(function() {
	if (mw.config.get('wgCanonicalNamespace') === 'Map' && 
		['edit', 'submit'].includes(mw.config.get('wgAction'))) {
		const decodeUnicode = function() {
			const $textarea = $('#wpTextbox1');
			if (!$textarea.length) return;
			
			const originalText = $textarea.val();
			if (!originalText) return;
			
			const decodedText = originalText.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
				return String.fromCharCode(parseInt(grp, 16));
			});
			
			if (originalText !== decodedText) {
				$textarea.val(decodedText);
			}
		};
		
		mw.loader.using('mediawiki.util', function() {
			$(document).ready(decodeUnicode);
		});
	}
})();