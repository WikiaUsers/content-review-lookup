/* Social icons
 * Obtained from the Wikia Developers Wiki @ w:c:dev:SocialIcons
 */
var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'dark',
        buttonSize: '30px',
	wikiTwitterAccount: 'RandLWiki'
};
importScriptPage('SocialIcons/code.js','dev');
 
/* Social media module
 * Obtained from the Community Central forums @ w:c:community:Thread:537426
 */
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Connect with us' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{SocialMedia}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});