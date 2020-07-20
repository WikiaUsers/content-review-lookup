// NicoVideo - Author Jose Buelvas (ihojose)
$(function () {
    $('.nicovideo').each(function () {
        var esc = mw.html.escape,
            $this = $(this);
            id = esc($this.data('id') || ''),
            width = esc($this.data('width') || ''),
            height = esc($this.data('height') || '');
 
        if ( id === '' ) {
            return;
        }
 
        $this.html('<script type="text/javascript" src="http://ext.nicovideo.jp/thumb_watch/sm' + id + '?w=' + width + '&h=' + height + '"></script>');
    });
});