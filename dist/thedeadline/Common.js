// IIFE (Immediately Invoked Function Expression)
(function() {
    // define cell color-coding
    const cell_codes = [
        "OTT",
        "LTL",
    ];
    const cell_colors = [
        "rgb(74, 134, 232)",
        "rgb(60, 120, 21)",
    ];

    // Function that applies color to cells within the target table 
    function applyColorCoding(table) {
        table.querySelectorAll("td").forEach(cell => {
            let index = cell_codes.indexOf(cell.innerHTML.trim());
            if (index != -1) {
                cell.style.backgroundColor = cell_colors[index];
            }
        });
    }

    // Function that applies color-coding to any table with the given class 
    function processTables() {
        document.querySelectorAll(".color-coded").forEach(applyColorCoding);
    }

    // Add a listener to target tables after page is loaded
    document.addEventListener("DOMContentLoaded", processTables);

    // Add an observer to target dynammically added tables
    const observer = new MutationObserver(processTables);
    observer.observe(document.body, { childList: true, subtree: true });

})();