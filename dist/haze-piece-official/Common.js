$(document).ready(function () {

    function updateStockTimer() {
        const now = new Date();
        const utcMs = now.getTime();

        // 2‑hour cycle = 7,200,000 ms
        const cycle = 2 * 60 * 60 * 1000;

        // Find the next 2‑hour boundary after the current UTC time
        const nextReset = Math.ceil(utcMs / cycle) * cycle;

        // Ensure the next reset is in the *next hour* (not the current hour)
        // If the nextReset is in the same hour, push it to the next boundary
        const currentHour   = Math.floor(utcMs / (60 * 60 * 1000));
        const resetHour     = Math.floor(nextReset / (60 * 60 * 1000));
        if (resetHour === currentHour) {
            // already in the same hour => jump to the *next* 2‑hour slot
            nextReset += cycle;
        }

        const diff    = nextReset - utcMs;
        const hours   = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        $(".stock-timer").each(function () {
            this.innerHTML =
                "Next Stock Reset: " +
                hours + "h " +
                minutes + "m " +
                seconds + "s";
        });
    }

    updateStockTimer();
    setInterval(updateStockTimer, 1000);
});