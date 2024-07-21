mw.loader.using('mediawiki.util').then(function () {
	var pre = $('pre:not(.hljs)');
    if (!pre.length || mw.config.get('wgAction') !== 'view' || (
    	//Don't run on ImportJS, [[ImportJS-Plus]] can be used instead
        mw.config.get('wgNamespaceNumber') === 8 &&
        mw.config.get('wgTitle') === 'ImportJS'
    )) {
        return;
    }
    var isDarkTheme = mw.config.get('isDarkTheme');

    //Import CSS from https://cdnjs.com/libraries/highlight.js (via well known CDN, using SRI, and locking to a version)
    //DO NOT CHANGE UNLESS YOU KNOW WHAT YOU ARE DOING
    $('<link>', {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/atom-one-' + (isDarkTheme ? 'dark' : 'light') + '.min.css',
        integrity: (isDarkTheme ? 'sha512-Jk4AqjWsdSzSWCSuQTfYRIF84Rq/eV0G2+tu07byYwHcbTGfdmLrHjUSwvzp5HvbiqK4ibmNwdcG49Y5RGYPTg==' : 'sha512-o5v54Kh5PH0dgnf9ei0L+vMRsbm5fvIvnR/XkrZZjN4mqdaeH7PW66tumBoQVIaKNVrLCZiBEfHzRY4JJSMK/Q=='),
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
    var ext = new mw.Title(mw.config.get('wgPageName')).getExtension();
    if (ext) {
        pre.addClass(ext);
    } else if (pre.parent().attr('class').includes('mw-highlight-lang-')) {
        pre.addClass(function () {
            if (!$(this).parent().attr('class').includes('mw-highlight-lang-')) {
                return;
            }
        	return $(this).parent().attr('class').match(/mw-highlight-lang-(\S+) /)[1];
        });
    }

    //Import JS from https://cdnjs.com/libraries/highlight.js (via a well known CDN, using SRI, and locking to a version)
    //DO NOT CHANGE UNLESS YOU KNOW WHAT YOU ARE DOING
    var js = $.ajax({
        url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js',
        dataType: 'script',
        method: 'GET',
        scriptAttrs: {
            integrity: 'sha512-6yoqbrcLAHDWAdQmiRlHG4+m0g/CT/V9AGyxabG8j7Jk8j3r3K6due7oqpiRMZqcYe9WM2gPcaNNxnl2ux+3tA==',
            crossorigin: 'anonymous'
        }
    });

    $.when(js).then(function () {
        pre.each(function () {
            //Handle [[Template:Script Install]]'s `importArticles` having no linebreaks due to the PI removing them
            if (mw.config.get('wgDBname') === 'dev' && $(this).parents('.pi-theme-install.type-javascript').length) {
                //First <span> is empty for some reason
                $(this).find('span:first-child:empty').remove();

                $(this).find('span').each(function () {
                    $(this).text(function (_, txt) {
                        return txt + '\n';
                    });
                });
            }
            
            //Don't run on [[Template:HTML Install]]
            if (mw.config.get('wgDBname') === 'dev' && $(this).parents('.pi-theme-install.type-html').length) {
                return;
            }

        	//Set the text of the pre to the text content to remove pygment's HTML from the pre, so that highlight.js doesn't complain about XSS/security issues
            $(this).text(function (_, txt) {
                return txt;
            });

            hljs.highlightElement(this);
        });
    });
});