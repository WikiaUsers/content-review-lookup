window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	userLang: "true"
};
importScriptPage('SocialIcons/code.js','dev');

$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
     'News' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Siderail}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});