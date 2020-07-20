// Jpopsuki.tv
// Author: Jose Buelvas (ihojose)
$(function () {
    $('.jpopsuki').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            id = esc($this.data('id') || '');
            width = esc($this.data('width') || '');
            height = esc($this.data('height') || '');
 
        if ( id === '' ) {
            return;
        }
 
        $this.html('<iframe src="http://www.jpopsuki.tv/media/embed?key=' + id + '&autoplay=false&autolightsoff=false&loop=false" width="' + width + '" height="' + height + '" frameborder="0" allowfullscreen="allowfullscreen" allowtransparency="true" scrolling="no"></iframe>');
    });
});