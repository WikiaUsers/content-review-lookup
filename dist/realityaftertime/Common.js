if (Math.random() < 0.50) {

    document.body.classList.add("norrell-spooku");

    document.querySelectorAll("h1, h2, h3").forEach(el => {
        el.textContent = "HELLO";
    });

}