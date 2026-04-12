/* Auto-Updating DST clocks */
function initializeDynamicTimezoneClocks() {
    const allElements = document.querySelectorAll('.dynamic-timezone-time');
    
    if (allElements.length === 0) return;
    
    const uniqueTimezones = new Set();
    allElements.forEach(element => {
        const timezone = element.getAttribute('data-timezone');
        if (timezone) {
            uniqueTimezones.add(timezone);
        }
    });
    
    uniqueTimezones.forEach(timezone => {
        const elementsForThisTimezone = document.querySelectorAll('.dynamic-timezone-time[data-timezone="' + timezone + '"]');
        
        function updateTimeForTimezoneGroup() {
            try {
                const timeString = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }).format(new Date());
                
                elementsForThisTimezone.forEach(element => {
                    element.textContent = timeString;
                });
            } catch (e) {
                // Invalid timezone, fallback
                elementsForThisTimezone.forEach(element => {
                    element.textContent = 'Invalid timezone, please use IANA official timezones.';
                });
            }
        }
        
        updateTimeForTimezoneGroup();
        
        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        
        setTimeout(() => {
            updateTimeForTimezoneGroup();
            setInterval(updateTimeForTimezoneGroup, 60000);
        }, msUntilNextMinute);
    });
}

jQuery(function($) {
    initializeDynamicTimezoneClocks();
});

/* Autolock Comments */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 14;

mw.hook('wikipage.content').add(function($content) {
    var $parseroutput = $content.children('.mw-parser-output');

    $parseroutput.find('.mw-headline')
        .not('#mw-toc-heading')
        .each(function () {

        var headline = $(this);
        var header = headline.parent(); // h2–h6
        if (!header.is('h2, h3, h4, h5, h6')) return;

        var level = parseInt(header.prop('tagName').substring(1));
        var content = [];

        var next = header.next();

        // Stop when we hit a header of same or higher level
        while (next.length) {
            if (next.is('h2, h3, h4, h5, h6')) {
                var nextLevel = parseInt(next.prop('tagName').substring(1));
                if (nextLevel <= level) break;
            }
            content.push(next);
            next = next.next();
        }

        if (content.length === 0) return;

        var toggle = $('<span>')
            .text('▼')
            .css({
                cursor: 'pointer',
                fontSize: '12px',
                color: 'gray',
                float: 'right',
                marginRight: '8px',
                userSelect: 'none'
            })
            .on('click', function () {
                var collapsed = $(this).data('collapsed');
                $.each(content, function () { $(this).toggle(collapsed); });
                $(this).text(collapsed ? '▼' : '►');
                $(this).data('collapsed', !collapsed);
            })
            .data('collapsed', false);

        header.prepend(toggle);
    });
});