(function ($, fng) {
    fng.gc = fng.gc || {};
    if (fng.gc.version) return;
    fng.gc.version = '1.2';
    var mwc = mw.config.get(['wgEnableMediaGalleryExt']);
    
    $(function() {
        var $galleries, $pi, $thumb, cache;
        if (mwc.wgEnableMediaGalleryExt) {
            $galleries = $('div.media-gallery-wrapper');
        } else {
            $galleries = $('div.wikia-gallery, div.wikia-slideshow');
        }//if new gallery
        $pi = $('.portable-infobox');
        $thumb = $('.image-thumbnail');
        if (!$galleries.length && !$pi.length && !$thumb.length) return;
        $(window).on('lightboxOpened', function() {
            //gather captions across galleries and infoboxes
            if (!cache) {
                cache = [];
                //other thumbnails (mostly plain images)
                $thumb.each(function (i, v) {
                    var $v = $(v);
                    // other stuff will be processed later
                    if ($v.parents('.pi-image, div.media-gallery-wrapper, div.wikia-gallery, div.wikia-slideshow').length) return;
                    $v = $v.find('img');
                    //smth wrong in da world
                    if (!$v.length) return;
                    cache[encodeURIComponent(decodeURIComponent($v.data('imageKey')))] = {
                        caption: decodeURIComponent($v.data('imageName')).replace(/(<([^>]+)>)/ig, ''),
                        captionText: decodeURIComponent($v.attr('alt')).replace(/(<([^>]+)>)/ig, '')
                    };
                });// each thumb
                //gallery
                if (mwc.wgEnableMediaGalleryExt) {
                    $galleries.each(function(i, v) {
                        var data = $(v).data('model');
                        if (!data) return;
                        $.each(data, function(i, v) {
                            //recode key. just for fun and consistency, cuz this key encoded fine already
                            var imgname = encodeURIComponent(decodeURIComponent(v.dbKey));
                            v.captionText = (v.caption || v.title).replace(/(<([^>]+)>)/ig, '');
                            cache[imgname] = v;
                        });//each data-model
                    });//each gallery
                } else {
                    $galleries.find('.wikia-gallery-item .thumbimage, .wikia-slideshow .thumbimage').each(function(i, v) {
                        //there is no caption in slideshow. still trying to get
                        var caption = $(v).closest('.wikia-gallery-item, .wikia-slideshow').find('.lightbox-caption');
                        //recode key, cuz it encoded by weird way
                        cache[encodeURIComponent(decodeURIComponent(v.dataset.imageKey))] = {
                            caption: caption.html(),
                            captionText: (caption.text() || v.dataset.imageName || v.dataset.imageKey || '').replace(/(<([^>]+)>)/ig, '')
                        };
                    });//each gallery
                }//if new gallery
                //infoboxes
                $pi.each(function(i, v) {
                    $(v).find('.pi-image').each(function(i, v) {
                        var $piImage = $(v);
                        var caption = $piImage.find('.pi-caption');
                        cache[encodeURIComponent(decodeURIComponent($piImage.find('img').data('imageKey')))] = {
                            caption: caption.html(),
                            captionText: (caption.text() || '').replace(/(<([^>]+)>)/ig, '')
                        };
                    });//each image
                });//each pi
            }//if !cache
            //w8. not loaded yet
            setTimeout(function() {
                //timeout, do not create multiple timers in case of fast closed lightbox
                var $lb = $('#LightboxModal');
                var thumbs = ((window.Lightbox || {}).current || {}).thumbs;
                if (!$lb.length || !thumbs || !thumbs.length) return;
                var $caption = $('<span>', {
                    class: 'gc-caption'
                });
                function onClick (e) {
                    var thumb = thumbs[window.Lightbox.current.index];
                    $caption.html(thumb.gcCaption || thumb.title || '');
                }//onclick
                $lb.find('.content .toolbar').append($('<li>').append($caption));
                $.each(thumbs, function(i, v) {
                    if (!v.key) return false;
                    //recode key, cuz it encoded by weird way
                    var item = cache[encodeURIComponent(decodeURIComponent(v.key))];
                    if (!item) return;
                    v.gcCaption = item.caption;
                    v.gcCaptionText = item.captionText;
                });//each thumb
                $lb.on('click.gc', '#LightboxCarouselContainer .carousel li', onClick);
                //show caption to starter item
                onClick();
                //add title
                $lb.find('#LightboxCarouselContainer .carousel li').each(function(i, v) {
                    var $v = $(v);
                    if($v.hasClass('more-items')) {
                        return false;
                    } else {
                        var $img = $v.find('img');
                        $img.attr('title', thumbs[i].gcCaptionText);
                    }//if
                });//each li
            }, 1000);//timeout
        });//lightboxOpened
    });
}(jQuery, window.fng = (window.fng || {})));