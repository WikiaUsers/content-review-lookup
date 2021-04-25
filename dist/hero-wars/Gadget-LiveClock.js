(function (window, $, mw) {
    'use strict';

    if (window.Gadget_LiveClock) {
        return;
    }
    window.Gadget_LiveClock = true;

    var clockInterval = null;
    var getDateTimeFormat = function(element) {
        return new Intl.DateTimeFormat(element.getAttribute('data-locales') || undefined, {
            dateStyle: element.getAttribute('data-dateStyle') || undefined,
            timeStyle: element.getAttribute('data-timeStyle') || undefined,
            calendar: element.getAttribute('data-calendar') || undefined,
            dayPeriod: element.getAttribute('data-dayPeriod') || undefined,
            numberingSystem: element.getAttribute('data-numberingSystem') || undefined,
            localeMatcher: element.getAttribute('data-localeMatcher') || undefined,
            timeZone: element.getAttribute('data-timeZone') || undefined,
            hour12: element.getAttribute('data-hour12') || undefined,
            hourCycle: element.getAttribute('data-hourCycle') || undefined,
            formatMatcher: element.getAttribute('data-formatMatcher') || undefined,
            weekday: element.getAttribute('data-weekday') || undefined,
            era: element.getAttribute('data-era') || undefined,
            year: element.getAttribute('data-year') || undefined,
            month: element.getAttribute('data-month') || undefined,
            day: element.getAttribute('data-day') || undefined,
            hour: element.getAttribute('data-hour') || undefined,
            minute: element.getAttribute('data-minute') || undefined,
            second: element.getAttribute('data-second') || undefined,
            fractionalSecondDigits: element.getAttribute('data-fractionalSecondDigits') || undefined,
            timeZoneName: element.getAttribute('data-timeZoneName') || undefined,
        });
    }
    mw.hook('wikipage.content').add(function($content) {
        if(clockInterval) {
            console.log('LiveClock: Timer stopped!', clockInterval);
            clearInterval(clockInterval);
            clockInterval = null;
        }
        $content.find('.clock-static').text(function(index) {
            try {
                return getDateTimeFormat(this).format(new Date(this.getAttribute('data-parse') || (Number(this.getAttribute('data-timestamp')) * 1000) || undefined));
            } catch (error) {
                return error
            }
        });
        var clock_live = $content.find('.clock-live');

        if(clock_live.length) {
            var format = [];
    
            clock_live.each(function(index, element) {
                format[index] = getDateTimeFormat(element);
            });
            var update = function() {
                var now = new Date();
    
                clock_live.text(function(index) {
                    return format[index].format(now);
                });
            }
            clockInterval = setInterval(update, 1000);
            console.log('LiveClock: Timer started!', clockInterval);
            update();
        }
    });
})(this, jQuery, mediaWiki);