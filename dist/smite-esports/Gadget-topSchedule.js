$.when( mw.loader.using( 'mediawiki.api' ), $.ready ).then( function() { 
    $.get('/index.php?title=Project:Top_Schedule&action=render').done(function(data) {
        $(data).appendTo(document.getElementById("mw-head"));
        var i = 0;
        $('.topschedule-box').each(function() {
        	var nowTime = Date.now();
        	var expTime = parseInt($(this).attr('data-expiration')) * 1000;
			if (nowTime >= expTime) {
				$(this).css('display', 'none');
				i = parseInt($(this).attr('data-i'));
			}
			else if (i + 15 < parseInt($(this).attr('data-i'))) {
				$(this).css('display', 'none');
			}
        })
        mw.hook('wikipage.content').fire($('topschedule'));
    }).fail(function (error, code){
        console.log(code);
    });
});