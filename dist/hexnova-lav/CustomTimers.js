// The Ultimate Schedule & List Timer
setInterval(function() {
    var now = new Date();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    document.querySelectorAll('.wiki-timer-wrapper').forEach(function(wrapper) {
        var timer = wrapper.querySelector('.timer-display');
        var status = wrapper.querySelector('.status-display');
        var label = wrapper.querySelector('.timer-label');
        var title = wrapper.querySelector('.timer-title');
        
        var duration = parseInt(wrapper.getAttribute('data-duration'));
        var listStr = wrapper.getAttribute('data-list');
        var timesStr = wrapper.getAttribute('data-times'); // New: Custom start times
        var singleGoal = parseInt(wrapper.getAttribute('data-time'));

        var isOpening = false;
        var remainMin = 0;
        var currentName = "";

        // LOGIC A: Custom Schedule (Different start times for each difficulty)
        if (listStr && timesStr) {
            var names = listStr.split(',');
            var starts = timesStr.split(',').map(Number);
            
            // Find which dungeon is next or currently active
            var activeIdx = -1;
            for (var i = 0; i < starts.length; i++) {
                if (min >= starts[i] && min < (starts[i] + duration)) {
                    activeIdx = i;
                    isOpening = true;
                    break;
                }
            }

            if (isOpening) {
                currentName = names[activeIdx];
                remainMin = (starts[activeIdx] + duration - 1) - min;
            } else {
                // Find the next upcoming dungeon
                var nextIdx = 0;
                for (var j = 0; j < starts.length; j++) {
                    if (starts[j] > min) {
                        nextIdx = j;
                        break;
                    }
                }
                currentName = names[nextIdx];
                remainMin = (starts[nextIdx] - 1) - min;
                // If all times today passed, point to the first one of next hour
                if (starts[starts.length-1] <= min) {
                    currentName = names[0];
                    remainMin = (59 - min) + starts[0];
                }
            }
            if (title) title.innerHTML = currentName.toUpperCase();
        } 
        
        // LOGIC B: Standard Single Event (Titan Defense, etc.)
        else {
            var goal = singleGoal;
            isOpening = (min % goal < duration);
            remainMin = isOpening ? (duration - 1 - (min % goal)) : (goal - 1 - (min % goal));
        }

        // VISUALS
        if (label) label.innerHTML = isOpening ? "ENDS IN" : "STARTS IN";
        status.innerHTML = isOpening ? "● OPEN" : "○ CLOSED";
        status.style.color = isOpening ? "#00ff00" : "#ff0000";
        wrapper.style.borderColor = isOpening ? "#00ff00" : "#555";

        var remainSec = 59 - sec;
        timer.innerHTML = (remainMin < 10 ? "0" : "") + remainMin + ":" + (remainSec < 10 ? "0" : "") + remainSec;
    });
}, 1000);