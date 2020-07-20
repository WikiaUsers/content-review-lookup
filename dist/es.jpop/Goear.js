// Goear.com
// Author: Jose Buelvas (ihojose)
$(function () {
    $('.goearplayer').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            id = esc($this.data('id') || '');
 
        if ( id === '' ) {
            return;
        }
 
        $this.html('<iframe width="100%" height="115" src="http://www.goear.com/embed/sound/' + id + '" marginheight="0" align="top" scrolling="no" frameborder="0" hspace="0" vspace="0" allowfullscreen></iframe>');
    });
});