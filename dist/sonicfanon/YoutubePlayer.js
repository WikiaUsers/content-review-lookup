// Originally created by Pintor Kagamine, modified by Akrivus.
$(function () {
    $('.youtubeplayer').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            id = esc($this.data('id') || ''),
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            autoplay = esc('' + $this.data('autoplay'));
 
        if ( id === '' ) {
            return;
        }
        else {
            id = id.match(/(?:http(?:s|):\/\/)?(?:www\\.)?(?:yotu\.be\/|youtube\.com\/)?(?:(?:.+\/)?(?:watch(?:\?v=|.+&v=))?(?:v=)?)([\w_-]{11})(&.+)?/);
        }
 
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' + id + '?feature=player_embedded&autoplay=' + autoplay + '" autohide="0" frameborder="0" allowfullscreen></iframe>');
    });
});