$(function () {
    $('.MPC').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            url = esc($this.data('url') || ''),
            loop = esc('&loop=' + ($this.data('loop') || '0')),
            autoplay = esc('&autoplay=' + ($this.data('autoplay') || '0'));
        if ( url === '' ) { return; }
 
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' + url + '&feature=player_embedded' + loop + '' + autoplay + '" frameborder="0" allowfullscreen></iframe>');
    });
});