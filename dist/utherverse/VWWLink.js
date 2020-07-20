mw.hook('wikipage.content').add(function($content) {
    $content.find('.custom-link').each(function() {
        var $this = $(this),
            link = ($this.data('protocol')) + '://' + ($this.text()),
            $a = $('<a>', {
                href: link,
                text: $this.data('alias') || ($this.data('protocol') + '://' + $this.text()),
            });
        $this.text('');
        $a.appendTo($this);
    });
});