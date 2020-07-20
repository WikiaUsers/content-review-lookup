
// <syntaxhighlight lang="javascript">
$(function () {
    $('.dailyplayer').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            id = esc($this.data('id') || ''),
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            autoplay = esc('' + $this.data('autoplay'));
 
        if ( id === '' ) {
            return;
        }
 
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.dailymotion.com/services/oembed' + id + '?feature=player_embedded&autoplay=' + autoplay + '" frameborder="0" allowfullscreen></iframe>');
    });
});
// </syntaxhighlight>