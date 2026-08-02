/* =======================================================
   NOTICE DISMISS
======================================================= */

// Checks if the "OK_image" is clicked, then fades out the notice.

document.getElementById("OK_image").addEventListener("click", function () {
    $("#notice").fadeOut(400, function () {
        this.style.display = "none";
    });
});


/* =======================================================
   INCURSION MONITOR
======================================================= */

$(function () {

    const timer = document.querySelector(".incursionMonitorTime");
    const status = document.querySelector(".incursionMonitorStatus");

    if (!timer || !status) return;

    // Beginning of the current era.
    const stableSince = new Date("2026-01-01T00:00:00Z");

    function updateTimer() {

        let diff = Math.floor((Date.now() - stableSince.getTime()) / 1000);

        const years = Math.floor(diff / (365.25 * 24 * 60 * 60));
        diff -= Math.floor(years * 365.25 * 24 * 60 * 60);

        const days = Math.floor(diff / (24 * 60 * 60));
        diff -= days * 24 * 60 * 60;

        const hours = Math.floor(diff / 3600);
        diff -= hours * 3600;

        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;

        timer.textContent =
            `${years}Y ${String(days).padStart(3, "0")}D ` +
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;
    }

    const messages = [
        "Monitoring Multiversal Integrity...",
        "Scanning Adjacent Universes...",
        "Verifying Timeline Stability...",
        "Analyzing Incursion Signatures..."
    ];

    let current = 0;

    function updateStatus() {
        status.innerHTML =
            `<span style="color:#41d36b;">●</span> ${messages[current]}`;
        current = (current + 1) % messages.length;
    }

    updateTimer();
    updateStatus();

    setInterval(updateTimer, 1000);
    setInterval(updateStatus, 5000);

});