// Vk Video - Author: Jose Buelvas (ihojose)
$(function () {
    $('.vkv').each(function () {
        var vk = mw.html.escape,
            $this = $(this);
            id = vk($this.data('id') || ''),
            oid = vk($this.data('oid') || ''),
            hash = vk($this.data('hash') || ''),
            width = vk($this.data('width') || ''),
            height = vk($this.data('height') || '');
 
        if ( id === '' ) {
            return;
        }
 
        $this.html('<iframe src="https://vk.com/video_ext.php?oid=' + id + '&id=' + id + '&hash=' + hash + '&hd=1&autoplay=1" width="' + width + '" height="' + height + '" frameborder="0"></iframe>');
    });
});