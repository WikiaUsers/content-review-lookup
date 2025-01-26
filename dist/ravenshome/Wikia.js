
//Thank you to the Ben 10 Fan Fiction Wiki

/* Warning alert */
window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 != $.inArray('Warning', wgCategories);
    }
};
importScriptPage('MediaWiki:WarningAlert/code.js');
 
$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"><h2>' +
      'What is New?' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});

$(window).load(function() {
     $('.discussions-module').after('<section class="module"><h2>' +
      'Discussions' + '</h2>' + '</section>');
});
 
importScriptPage('BackToTopButton/code.js', 'dev');