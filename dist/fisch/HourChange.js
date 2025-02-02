/*
 * HourChange Module
 * Displays text that changes every hour based on UTC time with title styling
 * Supports both predefined titles and custom text
 */
mw.loader.using(['mediawiki.util'], function() {
    'use strict';
    
    // Predefined title styles
    var TITLES = {
        'Extinct': { color: '#ff7133', bold: true },
        'Vigilante': { color: '#3c438f', bold: true },
        'Lady Of The Sea': { color: '#4079ff', bold: true },
        'Orcs Best Friend': { color: '#779166', italic: true },
        'True Hakari': { color: '#53ffc6' },
        'Made In Heaven': { color: '#fffbc1', italic: true },
        'Chosen by Zeus': { color: '#025be9', bold: true },
        'Poseidon\'s Blessing': { color: '#00AA7F', bold: true }
    };
    
    // Initialize the module
    function initHourChange() {
        $('.hour-change').each(function() {
            var $element = $(this);
            var items = $element.data('items').split('|');
            
            // If only one item, show it permanently
            if (items.length === 1) {
                updateText(items[0], $element);
                return;
            }
            
            function updateText(text, element) {
                var titleData = TITLES[text];
                
                if (titleData) {
                    // This is a predefined title
                    var style = `color: ${titleData.color};`;
                    if (titleData.bold) {
                        text = `<strong>${text}</strong>`;
                    }
                    if (titleData.italic) {
                        text = `<em>${text}</em>`;
                    }
                    element.html(`<span class="title-text" style="${style}">${text}</span>`);
                } else {
                    // This is custom text, just display it normally
                    element.html(`<span class="title-text">${text}</span>`);
                }
            }
            
            function update() {
                var hour = new Date().getUTCHours();
                var index = hour % items.length;
                updateText(items[index], $element);
            }
            
            // Update immediately and then every minute
            update();
            setInterval(update, 60000);
        });
    }
    
    // Initialize on page load and when content changes
    $(document).ready(initHourChange);
    mw.hook('wikipage.content').add(initHourChange);
});