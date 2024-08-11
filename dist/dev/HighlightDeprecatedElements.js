/*
 * @module        HighlightDeprecatedElements.js
 * @description   Allows to highlight deprecated elements in CodeMirror.
 * @author        BryghtShadow
 * @attribution   BaRaN6161TURK
 * @license       CC-BY-SA 3.0
 */

(function($, mw) {
	'use strict';
	var title = 'This $1 is deprecated. To learn more about replacing deprecated $2, visit https://dev.fandom.com/wiki/HighlightDeprecatedElements.',
		deprecatedTags = ['big', 'center', 'font', 'rb', 'rtc', 'strike', 'tt'],
		deprecatedAttributes = ['abbr', 'align', 'axis', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'clear', 'color', 'face', 'frame', 'height', 'rules', 'scope', 'size', 'summary', 'type', 'valign', 'width'];

	mw.loader.addStyleTag('.cm-line .deprecated:is(.cm-mw-htmltag-name, .cm-mw-htmltag-attribute) { color: orange; border-bottom: red solid thick; }');

	function handleDeprecatedThings(e) {
		setTimeout(function() {
			e.find('.cm-mw-htmltag-name').each(function(index, span) {
				if (!span.classList.contains('deprecated')) {
					var tagName = span.textContent.trim().toLowerCase();
					if (!deprecatedTags.includes(tagName)) return;
					span.classList.add('deprecated');
					span.title = title.replace('$1', 'tag').replace('$2', 'tags');
				}
			});
			e.find('.cm-mw-htmltag-attribute').each(function(index, attribute) {
				if (!attribute.classList.contains('deprecated')) {
					var attributeName = attribute.textContent.split('=')[0].trim().toLowerCase();
					if (!deprecatedAttributes.includes(attributeName)) return;
					attribute.classList.add('deprecated');
					attribute.title = title.replace('$1', 'attribute').replace('$2', 'attributes');
				}
			});
		}, 30);
	}

	mw.hook('ve.activationComplete').add(function() { // visual source editor
		handleDeprecatedThings($('.cm-editor'));
		window.ve.init.target.$element.on('keydown', function(e) {
			handleDeprecatedThings($('.cm-editor'));
		});
		window.ve.init.target.$element.on('click', function(e) {
			handleDeprecatedThings($('.cm-editor'));
		});
	});
	mw.hook('wikipage.editform').add(function() { // source editor
		mw.hook('ext.CodeMirror.switch').add(function(isShown, editor) {
			if (!isShown) return;
			handleDeprecatedThings(editor);
			editor.on('keydown', function(e) {
				handleDeprecatedThings($(e.target));
			});
			editor.on('click', function(e) {
				 handleDeprecatedThings($(e.target));
			});
		});
	});
})(window.jQuery, window.mediaWiki);