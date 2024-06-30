/* All JavaScript here will be loaded for users of the mobile site */
(function($) {
    $(document).ready(function() {
        $.getScript(mw.util.wikiScript('load') + 
            '?mode=articles&articles=' + 
            encodeURIComponent(
                [
                    'u:dev:UploadMultipleFiles.js',
                    'u:dev:MassEdit/code.js',
                    'u:dev:BackToTopButton/code.js',
                    'u:dev:SearchSuggest/code.js',
                    'u:dev:HTML5AudioPlayer/code.js',
                    'u:dev:PreloadTemplates.js',
                    'u:dev:ThankYou.js',
                    'MediaWiki:GetTableValuesPerRow.js'
                ].join('|')
            )
        ).done(function() {
            console.log('Scripts loaded successfully.');
        }).fail(function() {
            console.error('Failed to load scripts.');
        });
    });
})(jQuery);