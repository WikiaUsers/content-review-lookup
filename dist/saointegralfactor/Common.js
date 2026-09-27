/* Any JavaScript here will be loaded for all users on every page load. */

(function () {
    // console.log("[START] ResetTimer Script loaded and running at " + new Date().toUTCString());

    function isMountainTimeDST(year) {
        try {
            let startDST = new Date(Date.UTC(year, 2, 1, 0, 0, 0));
            startDST.setUTCDate(1 + (14 - startDST.getUTCDay()) % 7 + 7);
            startDST.setUTCHours(9, 0, 0, 0);

            let endDST = new Date(Date.UTC(year, 10, 1, 0, 0, 0));
            endDST.setUTCDate(1 + (7 - endDST.getUTCDay()) % 7);
            endDST.setUTCHours(8, 0, 0, 0);

            let now = new Date();
            let isDST = now >= startDST && now < endDST;

       //     // console.log(`[DST] Now (UTC): ${now.toUTCString()}`);
       //     // console.log(`[DST] Start (UTC): ${startDST.toUTCString()}`);
       //     // console.log(`[DST] End (UTC): ${endDST.toUTCString()}`);
       //     // console.log(`[DST] Is DST: ${isDST}`);

            return isDST;
        } catch (error) {
            // console.error("[ERROR] ResetTimer DST Calculation Failed:", error);
            return false;
        }
    }
    function updateCountdown() {
        try {
            let now = new Date();
            let year = now.getUTCFullYear();
            let isDST = isMountainTimeDST(year);
            let targetUTCOffset = isDST ? -6 : -7;

            let targetTime = new Date(now);
            targetTime.setUTCHours(0 - targetUTCOffset, 0, 0, 0);
            if (now >= targetTime) {
                targetTime.setUTCDate(targetTime.getUTCDate() + 1);
            }

            let timeDiff = targetTime - now;
            let hours = Math.floor(timeDiff / (1000 * 60 * 60));
            let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        //    // console.log(`[UPDATE] Now (UTC): ${now.toUTCString()}`);
        //    // console.log(`[UPDATE] Target (UTC): ${targetTime.toUTCString()}`);
        //    // console.log(`[UPDATE] Offset: UTC${targetUTCOffset}`);
        //    // console.log(`[UPDATE] Time Left: ${hours}h ${minutes}m ${seconds}s`);

            let timerElements = document.querySelectorAll('#countdown-timer');
            if (timerElements.length === 0) {
                // console.warn("[UPDATE] ResetTimer No #countdown-timer found!");
                return;
            }
            timerElements.forEach(element => {
                element.textContent =
                    (hours < 10 ? '0' + hours : hours) + ':' +
                    (minutes < 10 ? '0' + minutes : minutes) + ':' +
                    (seconds < 10 ? '0' + seconds : seconds);
            });
        } catch (error) {
            // console.error("[ERROR] ResetTimer Countdown Update Failed:", error);
        }
    }

    mw.hook('wikipage.content').add(function () {
        // console.log("[INIT] ResetTimer Wiki page content loaded at " + new Date().toUTCString());
        let timerElements = document.querySelectorAll('#countdown-timer');
        if (timerElements.length > 0) {
            // console.log(`[INIT] Found ${timerElements.length} timer elements`);
            setInterval(updateCountdown, 1000);
            updateCountdown();
        } else {
            // console.warn("[INIT] ResetTimer No #countdown-timer elements found!");
        }
    });
})();