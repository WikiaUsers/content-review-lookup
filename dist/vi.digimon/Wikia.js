importScriptPage('ShowHide/code.js', 'dev');
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
 
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'Thông tin cộng đồng' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Thông tin nổi bật}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});