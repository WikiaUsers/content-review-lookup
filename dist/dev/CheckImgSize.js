;(function(window, $, mw) {
    'use strict';

    if (mw.config.values.wgAction != 'view' || window.checkImgSizeInit) return;

    window.checkImgSizeInit = true;
    var msg;

    function checkImgSize() {
        $('.mw-parser-output img').each(function() {

            var img = $(this);

            $('<img>').attr('src', $(img).attr('src')).on('load', function(){

                var initImg = $(img)[0],

                    imageName = initImg.dataset.imageName,
                    usedWidth = initImg.width,
                    usedHeight = initImg.height,

                    realWidth = this.width,
                    realHeight = this.height;

                if (usedWidth > realWidth || usedHeight > realHeight) {

                    if (realWidth <= 1 || realHeight <= 1) return;

                    var rowInfo = '<tr><td>' + imageName + '</td><td>' + usedWidth + 'x' + usedWidth + '</td><td>' + realWidth + 'x' + realHeight + '</td></tr>';
                    if (!$('#oversized-images-info').length) {
                        $('#mw-content-text > .mw-parser-output').prepend(
                            '<table class="wikitable" id="oversized-images-info" style="width:100%">' +
                                '<tbody>' +
                                    '<tr>' +
                                        '<th>' + msg('image-header').escape() + '</th>' +
                                        '<th>' + msg('used-size-header').escape() + '</th>' +
                                        '<th>' + msg('original-size-header').escape() + '</th>' +
                                    '</tr>' + rowInfo +
                                '</tbody>' +
                            '</table>'
                        );
                    } else {
                        $('#oversized-images-info > tbody').append(rowInfo);
                    }

                    $(initImg).closest('.image').addClass('oversize-img');

                }

            });
        });
    }

    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('CheckImgSize').done(function (i18no) {
            msg = i18no.msg;
            mw.hook('wikipage.content').add(checkImgSize);
        });
    });
    importArticles({
        type: 'script',
        articles: 'u:dev:MediaWiki:I18n-js/code.js'
    },
    {
        type: 'style',
        article: 'u:dev:MediaWiki:CheckImgSize.css'
    });
 
})(window, window.jQuery, window.mediaWiki);