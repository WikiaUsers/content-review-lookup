$(document).ready(function() {
    function applyImageWidth() {
        $('[data-width-i-]').each(function() {
            var $element = $(this);
            var dataWidthAttr = $element.attr('data-width-i-');

            if (dataWidthAttr) {
                var widthMatch = dataWidthAttr.match(/^(\d+px)$/i);
                if (widthMatch) {
                    var width = widthMatch[1];

                    $element.find('img').each(function() {
                        $(this).css({
                            'width': width,
                            'height': 'auto'
                        });
                    });
                }
            }
        });
    }

    applyImageWidth();
});