$('.mw-rollback-link').each(function() {
    var href = $(this).find('a').attr('href');
    $(this).html('[<a id="rollback-link" data="' + href + '">rollback</a>]');
    $('#rollback-link').click(function() {
        var data = $(this).attr('data');
        $(this).html('<img src="https://images.wikia.nocookie.net/__cb20120926174803/dev/images/8/82/Facebook_throbber.gif"></img>');
        $.get(data, function() {
            $('#rollback-link').html('[<a>complete</a>]');
        });
    });
});