window.EditIntroButtonText = 'intro';

$(function() {
    var newSection = '<section id="activities" class="module"><h2>' +
      'New Features' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Specials}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});

importArticles({
    type: 'script',
    articles: [
        'u:diepio:MediaWiki:BlogLink/code.js'
    ]
});

window.discussionsModuleEmbed = true;
discussionsModule.added;
mw.loader.using('mediawiki.util').then(function() {
    mw.hook('discussionsModule.added').add(function() {
        // Module addition
        if ($('.insights-module').exists()) {
            $('#WikiaRail .discussions-rail-theme').insertBefore('.insights-module');
        } else {
            $('#WikiaRail .discussions-rail-theme').appendTo('#WikiaRail');
        }
    });
});

window.discussionsModuleConfig = {
	'columns' : '1',
	'size' : '6',
	'mostrecent' : 'true',
	'catid' : [
		'first category id',
		'second category id',
		'etc'
	]
};