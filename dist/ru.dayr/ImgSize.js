$(document).ready(function() {
    function applyImageWidth() {
        $('[data-width-]').each(function() {
            var $element = $(this);
            var dataWidthAttr = $element.attr('data-width-');

            if (dataWidthAttr && dataWidthAttr.endsWith('-i')) {
                var widthMatch = dataWidthAttr.match(/^(\d+)px/i);
                if (widthMatch) {
                    var width = widthMatch[1] + 'px';

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