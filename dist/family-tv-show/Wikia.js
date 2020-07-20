/* Warning alert */
window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 != $.inArray('Warning', wgCategories);
    }
};
importScriptPage('MediaWiki:WarningAlert/code.js');
 
$(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'What is New?' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Specials}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});