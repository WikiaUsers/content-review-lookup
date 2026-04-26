

mw.hook('wikipage.content').add(function($content) {
    $content.find('.pb-copy-pill').each(function() {
        if ($(this).data('copy-bound')) return;
        $(this).data('copy-bound', true);

        $(this).on('click', function() {
            var codeToCopy = $(this).attr('data-code');
            var $icon = $(this).find('.pb-copy-icon');
            var originalIcon = $icon.text();

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(codeToCopy).then(function() {
                    showSuccess($icon, originalIcon);
                });
            } else {
                var textArea = document.createElement("textarea");
                textArea.value = codeToCopy;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showSuccess($icon, originalIcon);
                } catch (err) {
                    console.error('Copy failed', err);
                }
                document.body.removeChild(textArea);
            }
        });
    });

    function showSuccess($iconElement, originalText) {
        $iconElement.text('✅');
        $iconElement.css('color', '#E6E6E6');
        setTimeout(function() {
            $iconElement.text(originalText);
            $iconElement.css('color', '');
        }, 1500);
    }
});