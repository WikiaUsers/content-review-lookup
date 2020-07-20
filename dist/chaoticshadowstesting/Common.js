/* Any JavaScript here will be loaded for all users on every page load. */
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/* Some YT thing */
$(function() {
    $('.mw-content-text a').each(function(i) {
        if ($(this).attr('href').indexOf('youtube.com/watch?v=') != -1) {
            $(this).hover(function() {
                $(this).append('<span class="vid" style="z-index:10; padding: 2px 2px 0px 2px; margin-top:-30px; margin-left: 10px; line-height:13px; display:inline; position:absolute; border:1px solid rgb(0,0,0); background:rgba(0,0,0,0.5)"><iframe width="175" height="100" src="https://www.youtube.com/embed/' + $(this).attr("href").split('=')[1] + '?version=3&hl=en_US&theme=dark&color=white&loop=1&showinfo=0&autohide=0&disablekb=1&autoplay=1" frameborder="0" allowfullscreen=0></iframe></span>');
            }, function(){
                $('.vid').remove();
            });
        }
    });
});