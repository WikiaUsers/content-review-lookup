(function($, document, mw) {
    'use strict';

    if (mw.config.values.wgAction != 'view' || window.checkImgSizeInit) return;

    window.checkImgSizeInit = true;

    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:CheckImgSize.css'
    });

    function checkImgSize() {
        $('.mw-parser-output img').each(function() {

            var img = $(this);

            $('<img>').attr('src', $(img).attr('src')).on('load', function(){

                var initImg = $(img)[0];

                var imageName = initImg.dataset.imageName;
                var usedWidth = initImg.width;
                var usedHeight = initImg.height;

                var realWidth = this.width;
                var realHeight = this.height;

                if (usedWidth > realWidth || usedHeight > realHeight) {

                    if (realWidth <= 1 || realHeight <= 1) return;

                    var rowInfo = '<tr><td>' + imageName + '</td><td>' + usedWidth + 'x' + usedWidth + '</td><td>' + realWidth + 'x' + realHeight + '</td></tr>';
                    if (!$('#oversized-images-info').length) {
                        $('#mw-content-text > .mw-parser-output').prepend('<table class="wikitable" id="oversized-images-info" style="width:100%"><tbody><tr><th>Image</th><th>Used Size</th><th>Original Size</th></tr>' + rowInfo + '</tbody></table>');
                    } else {
                        $('#oversized-images-info > tbody').append(rowInfo);
                    }

                    $(initImg).closest('.image').addClass('oversize-img');

                }

            });
        });
    }

    mw.hook('wikipage.content').add(checkImgSize);
 
})(window.jQuery, document, window.mediaWiki);