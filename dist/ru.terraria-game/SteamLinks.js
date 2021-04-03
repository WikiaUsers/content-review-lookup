
$(function () {
    $('.steamlink').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            url = esc('' + $this.data('url'));
        if ( url === '' ) {
            return;
        }
 
        $this.html('<a href="steam://' + url + '" ><img src=" https://vignette.wikia.nocookie.net/terraria/images/7/70/Connect_smalll.png/revision/latest?cb=20151103145841&amp;path-prefix=ru" alt="Connect smalll" class="" data-image-key="Connect_smalll.png" data-image-name="Connect smalll.png" height="20" width="122"></a>');
    });
});