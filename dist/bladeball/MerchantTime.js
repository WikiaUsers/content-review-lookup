(function () {
    const estSpawnHours = [2, 5, 8, 11, 14, 17, 20, 23]; // EST/EDT times

    function convertESTHourToLocalTime(hourInEST) {
        const estDate = new Date();

        // Set to today's date at the given hour in EST/EDT
        estDate.setUTCHours(hourInEST + 5, 0, 0, 0); // base is EST (UTC-5)

        // Adjust if it's daylight saving time in EST (EDT = UTC-4)
        const nowInNY = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
        const currentOffset = new Date().getTimezoneOffset();
        const nyOffset = new Date(nowInNY).getTimezoneOffset();
        const offsetDifference = nyOffset - currentOffset;

        estDate.setMinutes(estDate.getMinutes() + offsetDifference);

        return estDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }

    const container = document.getElementById("merchant-spawn-times");
    if (!container) return;

    const title = document.createElement("b");
    title.textContent = "Merchant Spawn Times (Your Local Time):";
    container.appendChild(title);

    const timeString = estSpawnHours
        .map(convertESTHourToLocalTime)
        .join(', ');

    const paragraph = document.createElement("p");
    paragraph.textContent = timeString;

    container.appendChild(paragraph);
})();