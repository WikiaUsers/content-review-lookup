/* Any JavaScript here will be loaded for all users on every page load. */
document.addEventListener("DOMContentLoaded", function () {
    let step = 1;

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            if (step === 1) {
                document.getElementById("screen-1").style.display = "none";
                document.getElementById("screen-2").style.display = "flex";
                step++;
            } else if (step === 2) {
                document.getElementById("screen-2").style.display = "none";
                document.getElementById("screen-3").style.display = "flex";
                step++;
            } else if (step === 3) {
                document.getElementById("screen-3").style.display = "none";
                document.getElementById("hidden-content").style.display = "block";
            }
        }
    });
});