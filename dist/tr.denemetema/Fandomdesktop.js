importArticles({
	type: 'script',
	articles: [
        "MediaWiki:Common.js/slider.js" /* "Slider" header for main page */
	]
});

/* Social media module
 * Obtained from the Community Central forums @ w:c:community:Thread:537426
 */
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Connect with Us' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{FTImageMap}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});