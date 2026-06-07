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
window.DisplayClockJS = {
	format: "%2I:%2M:%2S %p, %B %1d, %Y (Server time)",    
    monofonts: 'Archivo Narrow, sans-serif',
    offset: -480
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});


$(function() {
    const $wrapper = $('#custom-gantt-calendar');
    // Only run if the calendar is actually on the page
    if (!$wrapper.length) return; 

    const DAY_WIDTH = 40; // Must match the CSS .gantt-day width
    const ROW_HEIGHT = 38; // Distance between stacked events vertically
    
    let events = [];
    
    // 1. Gather all events from the hidden DPL data
    $('#gantt-data .gantt-event').each(function() {
        const name = $(this).data('name');
        const startStr = $(this).data('start');
        const endStr = $(this).data('end');
        
        if (!startStr || !endStr) return;
        
        // Append T00:00:00 to force local timezone calculation
        const start = new Date(startStr + 'T00:00:00');
        const end = new Date(endStr + 'T00:00:00');
        
        // Calculate duration (+1 to include both start and end days inclusive)
        const duration = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
        events.push({ name, start, end, duration });
    });
    
    if (events.length === 0) {
        $wrapper.html('<div style="padding: 20px;">No upcoming events found.</div>');
        return;
    }
    
    // 2. Sort events by start date to process lanes correctly
    events.sort((a, b) => a.start - b.start);
    
    // 3. Find the strict timeline limits (Min/Max Dates)
    let minDate = new Date(events[0].start);
    let maxDate = new Date(events[0].end);
    events.forEach(e => { 
        if (e.start < minDate) minDate = new Date(e.start);
        if (e.end > maxDate) maxDate = new Date(e.end); 
    });
    
    // --- PADDING REMOVED HERE TO KEEP RANGE STRICT ---
    
    // 4. Overlap Collision Logic (Assign Lanes)
    const lanes = [];
    events.forEach(event => {
        let placed = false;
        // Check existing lanes to see if one is free
        for (let i = 0; i < lanes.length; i++) {
            // If the event starts AFTER the last event in this lane ended
            if (event.start > lanes[i]) {
                event.lane = i;
                lanes[i] = event.end;
                placed = true;
                break;
            }
        }
        // If no lanes are free, make a new lane below it
        if (!placed) {
            event.lane = lanes.length;
            lanes.push(event.end);
        }
    });
    
    // 5. Generate the Header (Months and Leap-Year-Proof Days)
    const totalDays = Math.round((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
    const totalWidth = totalDays * DAY_WIDTH;
    
    let currentMonth = -1;
    let daysInMonthCount = 0;
    let monthLabels = '';
    let daysHtml = '<div class="gantt-header-days" style="width:' + totalWidth + 'px;">';
    
    for (let i = 0; i < totalDays; i++) {
        const d = new Date(minDate);
        d.setDate(d.getDate() + i); // Automatically handles month rollovers and leap years
        
        const monthNum = d.getMonth();
        const dateNum = d.getDate();
        
        daysHtml += `<div class="gantt-day">${dateNum}</div>`;
        
        // Month Header Logic
        if (currentMonth === -1) {
            currentMonth = monthNum;
            daysInMonthCount = 1;
        } else if (currentMonth === monthNum) {
            daysInMonthCount++;
        } else {
            const monthName = new Date(d.getFullYear(), currentMonth, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
            monthLabels += `<div class="gantt-month" style="width:${daysInMonthCount * DAY_WIDTH}px;">${monthName}</div>`;
            currentMonth = monthNum;
            daysInMonthCount = 1;
        }
    }
    // Append the final month chunk
    const lastMonthName = new Date(maxDate.getFullYear(), currentMonth, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
    monthLabels += `<div class="gantt-month" style="width:${daysInMonthCount * DAY_WIDTH}px;">${lastMonthName}</div>`;
    daysHtml += '</div>';
    
    const monthsHtml = `<div class="gantt-header-months" style="width:${totalWidth}px;">${monthLabels}</div>`;
    
    // 6. Render the Events
    let bodyHtml = `<div class="gantt-body" style="width:${totalWidth}px; height:${(lanes.length * ROW_HEIGHT) + 20}px; background-size: ${DAY_WIDTH}px 100%;">`;
    
    events.forEach(e => {
        // Calculate offset (left position) and width
        const left = Math.round((e.start - minDate) / (1000 * 60 * 60 * 24)) * DAY_WIDTH;
        const width = e.duration * DAY_WIDTH;
        const top = (e.lane * ROW_HEIGHT) + 10; // 10px buffer from the top
        
        bodyHtml += `<div class="gantt-event-block" style="left:${left}px; width:${width}px; top:${top}px;" title="${e.name}"><span>${e.name}</span></div>`;
    });
    bodyHtml += '</div>';
    
    // 7. Inject everything into the page
    $wrapper.html(monthsHtml + daysHtml + bodyHtml);
    
    // 8. Auto-scroll to "Today" if today is inside the calendar window
    const today = new Date();
    today.setHours(0,0,0,0);
    if (today >= minDate && today <= maxDate) {
        const scrollPx = Math.round((today - minDate) / (1000 * 60 * 60 * 24)) * DAY_WIDTH;
        // Center the scroll to today's date minus half the wrapper's visible width
        $wrapper.scrollLeft(scrollPx - ($wrapper.width() / 2));
    }
});