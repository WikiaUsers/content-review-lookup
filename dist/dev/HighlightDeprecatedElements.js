/*
 * @module        HighlightDeprecatedElements.js
 * @description   Allows to highlight deprecated elements in CodeMirror.
 * @author        BryghtShadow
 * @attribution   BaRaN6161TURK
 * @license       CC-BY-SA 3.0
 */
 
mw.hook('wikipage.editform').add(function() {
    var deprecatedStyles = mw.util.addCSS('.CodeMirror-code .deprecated:is(.cm-mw-htmltag-name, .cm-mw-htmltag-attribute) { color: orange; border-bottom: red solid thick; }');

    mw.hook('ext.CodeMirror.switch').add(function (isShown, editors) {
        if (!isShown) return;
        function handleDeprecatedThings(editor) {
            var deprecatedTags = ['big', 'center', 'font', 'rb', 'rtc', 'strike', 'tt'];
            var deprecatedAttributes = ['abbr', 'align', 'axis', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'clear', 'color', 'face', 'frame', 'height', 'rules', 'scope', 'size', 'summary', 'type', 'valign', 'width',];
            document.querySelectorAll('.CodeMirror-code .cm-mw-htmltag-name:not(.deprecated)').forEach(function (span) {
                var tagName = span.textContent.trim().toLowerCase();
                if (!deprecatedTags.includes(tagName)) return;
                span.classList.add('deprecated');
                span.title = 'This tag is deprecated.';
            });
            document.querySelectorAll('.CodeMirror-code .cm-mw-htmltag-attribute:not(.deprecated)').forEach(function (span) {
                var attributeName = span.textContent.split('=')[0].trim().toLowerCase();
                if (!deprecatedAttributes.includes(attributeName)) return;
                span.classList.add('deprecated');
                span.title = 'This attribute is deprecated.';
            });
        }
        var cm = editors[0].CodeMirror;
        cm.on('update', handleDeprecatedThings);
        handleDeprecatedThings();
    });
});