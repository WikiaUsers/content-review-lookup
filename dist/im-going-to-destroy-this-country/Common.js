/* Any JavaScript here will be loaded for all users on every page load. */
 document.addEventListener("DOMContentLoaded", function () {
    let mouseDown = false;
    let startX, scrollLeft;
    const slider = document.querySelector(".fandom-gallery-container");

    const startDragging = (e) => {
        mouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    };

    const stopDragging = () => {
        mouseDown = false;
    };

    const move = (e) => {
        e.preventDefault();
        if (!mouseDown) return;
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;
    };

    // Add the event listeners
    slider.addEventListener("mousemove", move, false);
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);

    // Optional: Add touch support for mobile users
    let touchStartX, touchScrollLeft;

    slider.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].pageX - slider.offsetLeft;
        touchScrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("touchmove", (e) => {
        if (!touchStartX) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - touchStartX) * 2;
        slider.scrollLeft = touchScrollLeft - walk;
    });
});