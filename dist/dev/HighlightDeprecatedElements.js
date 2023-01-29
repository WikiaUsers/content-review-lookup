/*
 * @module        HighlightDeprecatedElements.js
 * @description   Allows to highlight deprecated elements in CodeMirror.
 * @author        BryghtShadow
 * @attribution   BaRaN6161TURK
 * @license       CC-BY-SA 3.0
 */

;(function($, mw) {
	const title = 'This $1 is deprecated. To learn more about replacing deprecated $2, visit https://dev.fandom.com/wiki/HighlightDeprecatedElements.';

	function handleDeprecatedThings() {
	    var deprecatedTags = ['big', 'center', 'font', 'rb', 'rtc', 'strike', 'tt'];
	    var deprecatedAttributes = ['abbr', 'align', 'axis', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'clear', 'color', 'face', 'frame', 'height', 'rules', 'scope', 'size', 'summary', 'type', 'valign', 'width',];
	    document.querySelectorAll('.CodeMirror-code .cm-mw-htmltag-name:not(.deprecated)').forEach(function (span) {
	        var tagName = span.textContent.trim().toLowerCase();
	        if (!deprecatedTags.includes(tagName)) return;
	        span.classList.add('deprecated');
	        span.title = title.replace('$1', 'tag').replace('$2', 'tags');
	    });
	    document.querySelectorAll('.CodeMirror-code .cm-mw-htmltag-attribute:not(.deprecated)').forEach(function (span) {
	        var attributeName = span.textContent.split('=')[0].trim().toLowerCase();
	        if (!deprecatedAttributes.includes(attributeName)) return;
	        span.classList.add('deprecated');
	        span.title = title.replace('$1', 'attribute').replace('$2', 'attributes');

	    });
	}
	function addEvent(ele) {
		var cm = ele[0].CodeMirror;
	    cm.on('update', handleDeprecatedThings);
	    handleDeprecatedThings();
	}
	function init() {
	    var deprecatedStyles = mw.util.addCSS('.CodeMirror-code .deprecated:is(.cm-mw-htmltag-name, .cm-mw-htmltag-attribute) { color: orange; border-bottom: red solid thick; }');
	
	    // source editor
	    mw.hook('ext.CodeMirror.switch').add(function (isShown, editors) {
	        if (!isShown) return;
	        addEvent(editors);
	    });
	
	    // visual source editor
	    if (ve.init) {
	        var checkExist = setInterval(function () {
	            if ($('.CodeMirror').length) {
	                addEvent($('.CodeMirror'));
	                clearInterval(checkExist);
	            }
	        }, 300);
	    }
	}
	
	mw.loader.using('mediawiki.util').then(function() {
		mw.hook('ve.activationComplete').add(init); // visual source editor
		mw.hook('wikipage.editform').add(init); // source editor
	});
})(window.jQuery, window.mediaWiki);