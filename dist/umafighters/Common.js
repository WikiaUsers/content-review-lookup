/* Staff Online Detector */
$(document).ready(function() {
    // Security to avoid script running on every single fucking page
    if ($('.staff-status').length === 0) return;

    $('.staff-status').each(function() {
        var $statusElement = $(this);
        var username = $statusElement.data('user');

        if (!username) return;

        // API Search
        $.getJSON(mw.util.wikiScript('api'), {
            action: 'query',
            list: 'usercontribs',
            ucuser: username,
            uclimit: 1,
            format: 'json'
        }, function(data) {
            if (data.query && data.query.usercontribs && data.query.usercontribs.length > 0) {
                var lastEditTime = new Date(data.query.usercontribs[0].timestamp);
                var currentTime = new Date();
                
                // Calculate difference in minutes
                var diffInMinutes = (currentTime - lastEditTime) / 1000 / 60;

                // 45 minutes, mark them Online
                if (diffInMinutes <= 45) {
                    $statusElement.html('Online 🟢').css('color', '#2ecc71');
                }
            }
        });
    });
});


==========slot=======
/* UMA Slots Global Logic */
(function() {
    let tokens = 200;
    const cost = 10;
    let isSpinning = false;
    const items = ["1", "2", "3", "4", "5", "6", "7"];

    window.runUmaSlots = function(btnElement) {
        if (isSpinning) return;
        
        const status = document.getElementById('uma-status');
        const tokenDisplay = document.getElementById('uma-tokens');
        const windowEl = document.getElementById('uma-window');
        
        if (!status || !tokenDisplay || !windowEl) return;

        if (tokens < cost) {
            status.textContent = "❌ Out of tokens! Adding 100...";
            setTimeout(() => {
                tokens = 100;
                tokenDisplay.textContent = tokens;
                status.textContent = "Refilled! Spin for 777!";
            }, 1200);
            return;
        }

        // Deduct tokens
        tokens -= cost;
        tokenDisplay.textContent = tokens;
        isSpinning = true;
        
        // Visual feedback for disabled button
        btnElement.style.opacity = "0.5";
        btnElement.style.cursor = "not-allowed";

        status.className = "uma-status";
        status.textContent = "Rolling...";
        windowEl.classList.remove('uma-shake');

        const r1 = document.getElementById('uma-r1');
        const r2 = document.getElementById('uma-r2');
        const r3 = document.getElementById('uma-r3');

        if (r1 && r2 && r3) {
            r1.className = "uma-reel is-spinning";
            r2.className = "uma-reel is-spinning";
            r3.className = "uma-reel is-spinning";

            setTimeout(() => {
                r1.className = "uma-reel";
                const v1 = items[Math.floor(Math.random() * items.length)];
                r1.textContent = v1;
                if (v1 === "7") r1.classList.add('is-seven');
            }, 500);

            setTimeout(() => {
                r2.className = "uma-reel";
                const v2 = items[Math.floor(Math.random() * items.length)];
                r2.textContent = v2;
                if (v2 === "7") r2.classList.add('is-seven');
            }, 900);

            setTimeout(() => {
                r3.className = "uma-reel";
                const v3 = items[Math.floor(Math.random() * items.length)];
                r3.textContent = v3;
                if (v3 === "7") r3.classList.add('is-seven');

                // Evaluate numbers
                if (r1.textContent === "7" && r2.textContent === "7" && r3.textContent === "7") {
                    tokens += 1000;
                    status.textContent = "🔥 777!!! JACKPOT!!! 🔥";
                    status.classList.add('uma-jackpot-win');
                    windowEl.classList.add('uma-shake');
                } else if (r1.textContent === r2.textContent && r2.textContent === r3.textContent) {
                    tokens += 150;
                    status.textContent = `✨ Triple ${r1.textContent}! +150 Tokens!`;
                } else if (r1.textContent === r2.textContent || r2.textContent === r3.textContent || r1.textContent === r3.textContent) {
                    tokens += 15;
                    status.textContent = "Got a pair. +15 Tokens.";
                } else {
                    status.textContent = "No match. Keep trying!";
                }

                tokenDisplay.textContent = tokens;
                isSpinning = false;
                btnElement.style.opacity = "1";
                btnElement.style.cursor = "pointer";
            }, 1300);
        }
    };
})();