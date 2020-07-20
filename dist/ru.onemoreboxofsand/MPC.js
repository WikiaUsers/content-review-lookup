$(function () {
    $('.MPC').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            width = esc('' + $this.data('width')),
            height = esc('' + $this.data('height')),
            loop = esc('&loop=' + ($this.data('loop') || '0')),
            url = esc($this.data('url') || '');
        if ( url === '' ) { return; }
 
        $this.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' + url + '?feature=player_embedded&hl=en_US&theme=dark&color=white' + loop + '&showinfo=0&autohide=0&disablekb=1" frameborder="0" allowfullscreen></iframe>');
    });
});