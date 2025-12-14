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