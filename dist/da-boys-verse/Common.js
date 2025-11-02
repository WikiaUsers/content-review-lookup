// Auto-fill current month and year for the Calendar module
document.addEventListener("DOMContentLoaded", function() {
    // Find all elements that use the Calendar template
    document.querySelectorAll('[data-mw*="Calendar|main"]').forEach(function(el) {
        const today = new Date();
        const month = today.getMonth() + 1; // JS months are 0–11
        const year = today.getFullYear();

        // Get the original wikitext
        let text = el.textContent;

        // Replace month/year parameters if they exist, otherwise add them
        if (text.includes("month=")) {
            text = text.replace(/month=\{\{\{month\|.*?\}\}\}/, `month=${month}`);
        } else {
            text = text.replace("Calendar|main", `Calendar|main|month=${month}`);
        }

        if (text.includes("year=")) {
            text = text.replace(/year=\{\{\{year\|.*?\}\}\}/, `year=${year}`);
        } else {
            text = text.replace("month=" + month, `month=${month}|year=${year}`);
        }

        // Replace the element’s contents with the updated template
        el.textContent = text;
    });
});