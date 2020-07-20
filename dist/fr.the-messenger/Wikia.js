 
/* Avatars script */
(function($) {
    if (!$('.avatar_body').length) {
        return;
    }
 
    $('.avatar_body').each(function() {
        var $that = $(this),
            nickname = $(this).attr('data-nick'),
            width = $(this).attr('data-width') + 'px';
 
        $.ajax({
            url: '/wiki/Special:Contributions/' + nickname,
            type: 'GET',
            success: function(data) {
                if (data) {
                    $that.empty().append(
                        $(data).find('.masthead-avatar').children('img').css({
                            'width' : width,
                            'height': 'auto'
                        })
                    );
                }
            },
            error: function() {
                console.log('Error: Cannot obtain user avatar.');
            }
        });
    });
})(this.jQuery);

/* Mainpage links blocks (simplified) (for styles see MediaWiki:Wikia.css) */
$('#linkbox-sabotage').click(function(){
	window.location.replace("https://themessengergame.com/");	
});
 
$('#linkbox-timeshard').css({
    'width': ($('#linkbox-sabotage').width() + 'px')
  });
 
$('#linkbox-timeshard').css({
    'height': ($('#linkbox-sabotage').height() + 'px')
  });
 
$('#linkbox-timeshard').click(function(){
	window.location.replace("https://store.steampowered.com/app/764790/The_Messenger/");	
});