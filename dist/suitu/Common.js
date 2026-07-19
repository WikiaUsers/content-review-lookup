(function () {
    function getOriginalUrl(url) {
        return url.replace(
            /(\.(?:png|jpe?g|gif|webp|svg))(?:\/[^?]*)?(\?.*)?$/i,
            '$1$2'
        );
    }

    function forceHighRes(img) {
        if (img.classList.contains('high-res-fixed')) return;

        var src = img.getAttribute('src') || '';
        var dataSrc = img.getAttribute('data-src') || '';
        var needsFixing = false;

        if (src) {
            var newSrc = getOriginalUrl(src);
            if (newSrc !== src) {
                img.setAttribute('src', newSrc);
                needsFixing = true;
            }
        }

        if (dataSrc) {
            var newDataSrc = getOriginalUrl(dataSrc);
            if (newDataSrc !== dataSrc) {
                img.setAttribute('data-src', newDataSrc);
                needsFixing = true;
            }
        }

        if (img.hasAttribute('srcset')) {
            img.removeAttribute('srcset');
            needsFixing = true;
        }

        if (img.hasAttribute('data-srcset')) {
            img.removeAttribute('data-srcset');
            needsFixing = true;
        }

        if (needsFixing) {
            img.classList.add('high-res-fixed');
        }
    }

    mw.hook('wikipage.content').add(function ($content) {
        $content.find('img').each(function () {
            forceHighRes(this);
        });
    });

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'src' &&
                mutation.target.tagName === 'IMG'
            ) {
                forceHighRes(mutation.target);
            } else if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType !== 1) return;

                    if (node.tagName === 'IMG') {
                        forceHighRes(node);
                    } else {
                        node.querySelectorAll('img').forEach(function (img) {
                            forceHighRes(img);
                        });
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

/********/
window.DisplayClockJS = {
	format: "%2I:%2M:%2S %p, %B %1d, %Y (Server time)",    
    monofonts: 'Archivo Narrow, sans-serif',
    offset: -480
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});