/* Wikia Features */
importScriptPage('SocialIcons/code.js','dev');
importScriptPage('BackToTopButton/code.js', 'dev');

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "20px"
};
 
/* Sidebar Notice */
$(document).ready(function() {
    var newSection = '<section id="notice" class="module"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{SidebarNotice}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#notice').append(code);
    });
});
 