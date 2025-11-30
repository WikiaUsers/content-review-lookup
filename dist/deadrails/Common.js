function initializeDynamicOffsetClocks() {
    const allElements = document.querySelectorAll('.dynamic-offset-time');
    
    if (allElements.length === 0) return;

    const uniqueOffsets = new Set();
    allElements.forEach(element => {
        const offset = element.getAttribute('data-offset');
        if (offset !== null) {
            uniqueOffsets.add(offset);
        }
    });

    uniqueOffsets.forEach(offsetHoursStr => {
        const offsetHours = parseFloat(offsetHoursStr);
        const elementsForThisOffset = document.querySelectorAll('.dynamic-offset-time[data-offset="' + offsetHoursStr + '"]');

        function updateTimeForOffsetGroup() {
            const now = new Date();
            const offsetMs = now.getTime() + (now.getTimezoneOffset() * 60000) + (offsetHours * 3600000);
            const offsetDate = new Date(offsetMs);

            let hours = offsetDate.getHours();
            const minutes = offsetDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            hours = hours % 12;
            hours = hours ? hours : 12;

            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const timeString = `${hours}:${formattedMinutes} ${ampm}`;

            elementsForThisOffset.forEach(element => {
                element.textContent = timeString;
            });
        }

        updateTimeForOffsetGroup();

        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        setTimeout(() => {
            updateTimeForOffsetGroup();
            setInterval(updateTimeForOffsetGroup, 60000);
        }, msUntilNextMinute);
    });
}

jQuery(function($) {
    initializeDynamicOffsetClocks();
});