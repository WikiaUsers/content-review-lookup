const card =
    document.querySelector(".invert-card");

const spotlight =
    document.querySelector(".spotlight");

const scatter =
    document.createElement("div");

scatter.className =
    "scatter-light";

document.body.appendChild(scatter);

let mouseX = 250;
let mouseY = 140;

let lightX = 250;
let lightY = 140;

let velocityX = 0;
let velocityY = 0;

let scatterX = 250;
let scatterY = 140;

card.addEventListener(
    "mouseenter",
    () => {
        spotlight.style.opacity = 1;
        scatter.style.opacity = .8;
    });

card.addEventListener(
    "mousemove",
    e => {
        const rect =
            card.getBoundingClientRect();

        mouseX =
            e.clientX - rect.left;

        mouseY =
            e.clientY - rect.top;
    });

card.addEventListener(
    "mouseleave",
    () => {
        spotlight.style.opacity = 0;
        scatter.style.opacity = 0;
    });

function animate() {

    /*
     =========================
     spotlight 物理
     =========================
    */

    const dx =
        mouseX - lightX;

    const dy =
        mouseY - lightY;

    velocityX +=
        dx * 0.045;

    velocityY +=
        dy * 0.045;

    velocityX *= 0.8;
    velocityY *= 0.8;

    lightX += velocityX;
    lightY += velocityY;

    const speed =
        Math.sqrt(
            velocityX * velocityX +
            velocityY * velocityY
        );

    const stretch =
        Math.min(
            speed / 42,
            0.35
        );

    spotlight.style.left =
        lightX + "px";

    spotlight.style.top =
        lightY + "px";

    spotlight.style.setProperty(
        "--scaleX",
        1 + stretch
    );

    spotlight.style.setProperty(
        "--scaleY",
        1 - stretch * .45
    );

    /*
     =========================
     scatter 简单跟随
     =========================
    */

    scatterX +=
        (mouseX - scatterX) * 0.15;

    scatterY +=
        (mouseY - scatterY) * 0.15;

    const rect =
        card.getBoundingClientRect();

    scatter.style.left =
        rect.left +
        scatterX +
        "px";

    scatter.style.top =
        rect.top +
        scatterY +
        "px";

    requestAnimationFrame(
        animate
    );

}

animate();