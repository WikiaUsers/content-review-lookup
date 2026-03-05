(function() {
    function forceHighRes(img) {
        if (img.classList.contains('high-res-fixed')) return;

        var src = img.getAttribute('src') || '';
        var dataSrc = img.getAttribute('data-src') || '';
        
        var scaleRegex = /\/(scale-to-width-down|thumbnail-down|smart\/width)\/\d+/ig;
        var needsFixing = false;

        if (src.match(scaleRegex)) {
            img.setAttribute('src', src.replace(scaleRegex, ''));
            needsFixing = true;
        }
        
        if (dataSrc.match(scaleRegex)) {
            img.setAttribute('data-src', dataSrc.replace(scaleRegex, ''));
            needsFixing = true;
        }

        if (img.hasAttribute('srcset') || img.hasAttribute('data-srcset')) {
            img.removeAttribute('srcset');
            img.removeAttribute('data-srcset');
            needsFixing = true;
        }

        if (needsFixing) {
            img.classList.add('high-res-fixed');
        }
    }

    mw.hook('wikipage.content').add(function($content) {
        $content.find('.wikia-gallery .thumbimage, .gallerybox img').each(function() {
            forceHighRes(this);
        });
    });

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                var target = mutation.target;
                if (target.tagName === 'IMG' && target.classList.contains('thumbimage')) {
                    forceHighRes(target);
                }
            }
            else if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        if (node.tagName === 'IMG' && node.classList.contains('thumbimage')) {
                            forceHighRes(node);
                        } else {
                            var imgs = node.querySelectorAll('.wikia-gallery .thumbimage, .gallerybox img');
                            imgs.forEach(function(img) { forceHighRes(img); });
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src']
    });
})();