(function() {
    if (mw.config.get('wgCanonicalNamespace') === 'Map' && 
        ['edit', 'submit'].includes(mw.config.get('wgAction'))) {
        const decodeUnicode = function() {
            const $textarea = $('#wpTextbox1');
            if (!$textarea.length) return;
            const originalText = $textarea.val();
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