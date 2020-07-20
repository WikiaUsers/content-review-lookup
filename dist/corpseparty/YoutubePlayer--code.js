$(function () {
    $('.youtubeplayer').each(function () {
        var random = Math.floor(Math.random() * (41 - 0 + 1)) + 0;
        var esc = mw.html.escape,
            $this = $(this);
            id = esc($this.data('id') || ''),
            list = esc('' + $this.data('list')),
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            autoplay = esc('' + $this.data('autoplay'));
            loop = esc('' + $this.data('loop'));
 
        if ( id === '' ) {
            return;
        }
 
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' + id + '?feature=player_embedded&autoplay=' + autoplay + '&loop=' + loop + '&list=' + list + '&index=' + random + '" frameborder="0" allowfullscreen></iframe>');
});
});