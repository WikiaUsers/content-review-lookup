mw.hook('wikipage.content').add(function($content) {
    $content.find('.googledriveplayer:not(.loaded)').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://drive.google.com/file/d/'),
            id = String(data.id || 'preview').trim()
 
        if (id === '') {
            console.warn('[GoogleDrivePlayer] Video ID is not defined.');
            return;
        }
 
        uri.path += id;
 
        $this.html(
            $('<iframe>', {
                width: String(data.width || '').trim(),
                height: String(data.height || '').trim(),
                src: uri.toString() + '/preview',
                allowfullscreen: 'true'
            })
        ).addClass('loaded');
    });
});