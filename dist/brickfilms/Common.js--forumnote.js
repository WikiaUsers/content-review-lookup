// This displays the message at the top of Special:Forum
$(document).ready(function() {
    if (document.getElementById("Forum")) {
        $.getJSON('/api.php?action=parse&text={{Forum-MainNotice}}&format=json', function(data) {
            var code = data.parse.text['*'];
            $('.boards').prepend(code);
        });
    }
});