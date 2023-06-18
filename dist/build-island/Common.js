importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ProtectionIcons.js',
        'u:dev:MediaWiki:FastBlock.js',
        'u:dev:MediaWiki:SOAPReport.js',
    ],
});

$(document).ready(function() {
    // Modify image links in all templates
    $('.boilerplate.metadata img').each(function() {
        var imageSrc = $(this).attr('src');
        if (imageSrc.startsWith('File:')) {
            var fileName = imageSrc.substr(5);
            var imageUrl = mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/wikia.php?controller=Imaginary&method=render&format=original&title=' + fileName;
            $(this).wrap('<a href="' + imageUrl + '" target="_blank"></a>');
        }
    });

    // Exclude headings inside Notice Templates from being considered as headings
    $('.boilerplate.metadata').find('h1, h2, h3, h4, h5, h6').not('.boilerplate.metadata h1, .boilerplate.metadata h2, .boilerplate.metadata h3, .boilerplate.metadata h4, .boilerplate.metadata h5, .boilerplate.metadata h6').each(function() {
        $(this).removeClass('mw-headline');
    });
});