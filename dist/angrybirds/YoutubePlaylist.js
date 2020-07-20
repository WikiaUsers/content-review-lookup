 /* Embedding youtube playlists
 *
 * MPCs vestige
 */
 $(function () {
    $('.youtubeplaylist').each(function () {
        var esc  = mw.html.escape,
        $this    = $(this);
        id       = esc($this.data('id') || ''),
        list     = esc($this.data('list') || ''),
        style    = esc('' + $this.data('style')),
        width    = esc('' + $this.data('width')),
        height   = esc('' + $this.data('height')),
        autoplay = esc('' + $this.data('autoplay'));

        if ( list === '') {
            return;
        }

        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' + id + '?list=' + list + '&autoplay=' + autoplay + '" frameborder="0" style="' + (style == 'undefined' ? '' : style) + '" allowfullscreen></iframe>');
    });
});