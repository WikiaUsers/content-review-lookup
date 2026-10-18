const card =
    document.querySelector(".invert-card");
const light =
    document.querySelector(".rgb-light");
card.addEventListener(
    "mouseenter",
    () => {
        light.style.opacity = 1;
    });
card.addEventListener(
    "mousemove",
    e => {
        const rect =
            card.getBoundingClientRect();
        const x =
            e.clientX - rect.left;
        const y =
            e.clientY - rect.top;
        card.style.setProperty(
            "--x",
            x + "px"
        );
        card.style.setProperty(
            "--y",
            y + "px"
        );
    });
card.addEventListener(
    "mouseleave",
    () => {
        light.style.opacity = 0;
    }
);