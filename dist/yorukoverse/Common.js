/* Any JavaScript here will be loaded for all users on every page load. */
document.addEventListener("DOMContentLoaded", function () {
    // Toggle sections when clicked
    document.querySelectorAll(".infobox-section").forEach(function (section) {
        section.addEventListener("click", function () {
            let nextRow = section.nextElementSibling;
            while (nextRow && !nextRow.classList.contains("infobox-section")) {
                nextRow.style.display = nextRow.style.display === "none" ? "table-row" : "none";
                nextRow = nextRow.nextElementSibling;
            }
        });
    });

    // Highlight important sections
    document.querySelectorAll(".infobox-section").forEach(function (section) {
        section.style.cursor = "pointer";
        section.style.backgroundColor = "#dcdcdc";
    });
});