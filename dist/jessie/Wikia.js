// Change chat description
importScript('MediaWiki:Chat-headline');

/* Script needs a default chat description to even test results. 
   Commenting out for not to prevent JavaScript errors on the site.
$(function(){
    var chatDesc = "";

    try {
        if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc) {
            $('p.chat-name').html(chatDesc);
            setTimeout("changeChatDesc()", 200);
        }
    }
    catch (err) {
       setTimeout("changeChatDesc()", 200);
   }
});
*/

$(function() {
    var newSection = '<section id="sidebar" class="module"><h1>' +
        'Whats New?' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});