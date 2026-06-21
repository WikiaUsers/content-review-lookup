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




/********/
/* Auto-Convert UTC times to User's Local Timezone with Weekdays & (GMT±X) */
mw.hook('wikipage.content').add(function($content) {
    $content.find('.local-time').each(function() {
        var $this = $(this);
        var rawTime = $this.attr('data-time');
        
        if (!rawTime) return;

        var dateObj = new Date(rawTime);
        if (isNaN(dateObj.getTime())) return; 

        // 1. Format the base time (Weekday, Month, Day, Time)
        var localString = dateObj.toLocaleString([], {
            weekday: 'short',  // Adds "Wed"
            month: 'short',    // Adds "Jun"
            day: 'numeric',    // Adds "27"
            hour: '2-digit',   // Adds "03"
            minute: '2-digit'  // Adds "20" and "AM/PM"
        });

        // 2. Calculate the exact GMT offset mathematically
        var offsetMinutes = dateObj.getTimezoneOffset();
        var sign = offsetMinutes > 0 ? '-' : '+'; 
        var absMinutes = Math.abs(offsetMinutes);
        var hours = Math.floor(absMinutes / 60);
        var minutes = absMinutes % 60;
        
        // Build the string: e.g., (GMT+7) or (GMT-8)
        var offsetString = '(GMT' + sign + hours + (minutes > 0 ? ':' + minutes : '') + ')';
        if (offsetMinutes === 0) offsetString = '(GMT)';

        // 3. Combine the time and the offset parenthesis
        var finalString = localString + ' ' + offsetString;

        // Apply it to the page
        $this.text(finalString);
        $this.attr('title', 'Automatically converted to your local timezone');
        $this.css({'border-bottom': '1px dashed gray', 'cursor': 'help'}); 
    });
});