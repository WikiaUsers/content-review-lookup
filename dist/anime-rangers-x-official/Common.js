/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($content) {
    if (window.copyCodeLoaded) return;
    window.copyCodeLoaded = true;

    $(document).on('click', '.copy-code', function() {
        var $el = $(this);
        var text = $el.attr('data-copy') || $el.text();
        var originalHTML = $el.html();

        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(text).select();

        try {
            document.execCommand("copy");
        
            $el.html('<span style="color: #00ff00;">✔ Copied!</span>');
            $el.css('border-color', '#00ff00');
            
            setTimeout(function() {
                $el.html(originalHTML);
                $el.css('border-color', '#ff8200');
            }, 1000);
        } catch (err) {
            console.error('Copy failed', err);
        }

        $temp.remove();
    });
});