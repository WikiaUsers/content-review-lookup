/* Any JavaScript here will be loaded for all users on every page load. */
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".current-month-year");

    const now = new Date();

    const options = {
        month: "long",
        year: "numeric"
    };

    const formattedDate = now.toLocaleDateString("en-US", options);

    elements.forEach(el => {
        el.textContent = `(${formattedDate})`;
    });
});