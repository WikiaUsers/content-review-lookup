// <syntaxhighlight lang="javascript">
$(function () {
    $('.youtubeplayer').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            id = esc($this.data('id') || ''),
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            autoplay = esc('' + $this.data('autoplay'));
            loop = esc('' + $this.data('loop'));
 
        if ( id === '' ) {
            return;
        }
 
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' + id + '?feature=player_embedded&autoplay=' + autoplay + '&loop=' + loop + '&playlist=' + id + '" frameborder="0" allowfullscreen></iframe>');
    });
});
// </syntaxhighlight>