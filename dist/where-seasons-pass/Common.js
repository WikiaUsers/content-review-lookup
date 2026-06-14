/* Any JavaScript here will be loaded for all users on every page load. */
(function() {
    function updateSeasonTimer() {
        const container = document.getElementById('season-timer-container');
        if (!container) return; 

        // Get UK Time
        const now = new Date();
        const ukDate = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
        
        // Calculate total hours passed in the week (Starts Monday 00:00)
        const day = ukDate.getDay();
        const shiftedDay = day === 0 ? 6 : day - 1; 
        const currentWeekSeconds = (shiftedDay * 86400) + (ukDate.getHours() * 3600) + (ukDate.getMinutes() * 60) + ukDate.getSeconds();
        
        // 168 hours total in a week / 4 seasons = 42 hours per season
        const SEASON_DURATION = 42 * 3600;

        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        let seasonIndex = Math.floor(currentWeekSeconds / SEASON_DURATION);
        if (seasonIndex > 3) seasonIndex = 3;

        // Automatically assign the CSS class for design
        container.className = 'season-box season-' + seasons[seasonIndex];

        // Calculate time remaining
        let secondsLeft = ((seasonIndex + 1) * SEASON_DURATION) - currentWeekSeconds;
        const d = Math.floor(secondsLeft / 86400); secondsLeft %= 86400;
        const h = Math.floor(secondsLeft / 3600); secondsLeft %= 3600;
        const m = Math.floor(secondsLeft / 60);
        const s = secondsLeft % 60;
        const pad = (num) => String(num).padStart(2, '0');

        // Update Text
        const seasonDiv = document.getElementById('current-season');
        if(seasonDiv) {
            seasonDiv.innerText = seasons[seasonIndex].charAt(0).toUpperCase() + seasons[seasonIndex].slice(1);
            document.getElementById('time-remaining').innerText = `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
        }
    }
    updateSeasonTimer();
    setInterval(updateSeasonTimer, 1000);
})();