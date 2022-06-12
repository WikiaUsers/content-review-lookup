mw.loader.using('mediawiki.util').then(function () {
    if (!$('pre').length || mw.config.get('wgAction') !== 'view' || (
    	//Don't run on ImportJS, [[ImportJS-Plus]] can be used instead
        mw.config.get('wgNamespaceNumber') === 8 &&
        mw.config.get('wgTitle') === 'ImportJS'
    )) {
        return;
    }
    var isDarkTheme = mw.config.get('isDarkTheme');

    //Import CSS from https://cdnjs.com/libraries/highlight.js (via well known CDN, using SRI and locking to a version)
    //DO NOT CHANGE UNLESS YOU KNOW WHAT YOU ARE DOING
    $('<link>', {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-' + (isDarkTheme ? 'dark' : 'light') + '.min.css',
        integrity: isDarkTheme ? 'sha512-Jk4AqjWsdSzSWCSuQTfYRIF84Rq/eV0G2+tu07byYwHcbTGfdmLrHjUSwvzp5HvbiqK4ibmNwdcG49Y5RGYPTg==' : 'sha512-o5v54Kh5PH0dgnf9ei0L+vMRsbm5fvIvnR/XkrZZjN4mqdaeH7PW66tumBoQVIaKNVrLCZiBEfHzRY4JJSMK/Q==',
        crossorigin: 'anonymous',
        appendTo: $('head')
    });
    //Some CSS fixes for playing nice with MediaWiki/Fandom
    mw.util.addCSS('\
        .mw-highlight > pre {\
            border: unset;\
            background-color: ' + (isDarkTheme ? '#282c34' : '#fafafa') + ';\
        }\
    ');

    //Apply lang class to pre if possible (rather than highlight.js trying to guess the lang of the pre)
    const ext = new mw.Title(mw.config.get('wgPageName')).getExtension();
    if (ext) {
        $('pre').addClass(ext);
    }

    //Import JS from https://cdnjs.com/libraries/highlight.js (via a well known CDN, using SRI and locking to a version)
    //DO NOT CHANGE UNLESS YOU KNOW WHAT YOU ARE DOING
    var js = $.ajax({
        url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js',
        dataType: 'script',
        method: 'GET',
        scriptAttrs: {
            integrity: 'sha512-yUUc0qWm2rhM7X0EFe82LNnv2moqArj5nro/w1bi05A09hRVeIZbN6jlMoyu0+4I/Bu4Ck/85JQIU82T82M28w==',
            crossorigin: 'anonymous'
        }
    });

    $.when(js).then(function () {
        $('pre:not(.hljs)').each(function () {
        	//Set the text of the pre to the text content to remove pygment's HTML from the pre, so that highlight.js doesn't complain about XSS/security issues
            $(this).text((_, txt) => txt);

            hljs.highlightElement(this);
        });
    });
});