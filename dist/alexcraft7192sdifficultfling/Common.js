$(function () {
    "use strict";

    const fruits = [
        { id: "orange", file: "Orange.webp", name: "Orange" },
        { id: "apple", file: "Apple.png", name: "Apple" },
        { id: "pear", file: "Pear.png", name: "Pear" },
        { id: "banana", file: "Banana.png", name: "Banana" },
        { id: "watermelon", file: "Watermelon.png", name: "Watermelon" }
    ];

    const storageKey = "difficultyFlingFruits";
    const codeKey = "difficultyFlingFruitCode";
    const pagesKey = "difficultyFlingVisitedPages";
    const cooldownKey = "difficultyFlingLastSpawn";

    const COOLDOWN = 2 * 60 * 1000;
    const SPAWN_CHANCE = 0.25;

    function fileURL(filename) {
        return "https://alexcraft7192sdifficultfling.fandom.com/wiki/Special:FilePath/" +
            encodeURIComponent(filename);
    }

    let collected = [];
    let visitedPages = [];

    try {
        collected = JSON.parse(sessionStorage.getItem(storageKey)) || [];
        visitedPages = JSON.parse(sessionStorage.getItem(pagesKey)) || [];
    } catch (error) {
        collected = [];
        visitedPages = [];
    }

    collected = fruits
        .filter(fruit => collected.includes(fruit.id))
        .map(fruit => fruit.id);

    function generateCode() {
        const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let code = "DF-";

        for (let i = 0; i < 8; i++) {
            code += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }

        return code;
    }

    const counter = document.createElement("div");

    counter.style.cssText = `
        position:fixed;
        bottom:15px;
        right:15px;
        z-index:99999;
        background:#211323;
        color:#eee0d0;
        border:2px solid #a85c22;
        border-radius:8px;
        padding:9px 13px;
        font-family:Tahoma,Verdana,sans-serif;
        font-size:13px;
        box-shadow:0 3px 12px rgba(0,0,0,0.5);
        min-width:110px;
    `;

    document.body.appendChild(counter);

    function updateCounter() {
        const fruitImage = `
            <img src="${fileURL("Fruits.png")}"
            style="width:25px;height:25px;vertical-align:middle;object-fit:contain;">
        `;

        if (collected.length >= 5) {
            let code = sessionStorage.getItem(codeKey);

            if (!code) {
                code = generateCode();
                sessionStorage.setItem(codeKey, code);
            }

            counter.innerHTML = `
                ${fruitImage}
                <b>Fruit Hunt Complete!</b>
                <div style="font-size:11px;margin-top:5px;color:#ff963d;">
                    Code: <b>${code}</b>
                </div>
            `;
        } else {
            counter.innerHTML = `
                ${fruitImage}
                <b>Fruit Hunt</b>
                <div style="font-size:11px;margin-top:4px;">
                    Fruits: ${collected.length} / 5
                </div>
            `;
        }
    }

    updateCounter();

    if (collected.length >= 5) return;

    // Identify the current wiki page.
    const currentPage = mw.config.get("wgPageName");

    // Never spawn twice on the same page during this session.
    if (visitedPages.includes(currentPage)) return;

    // Check the spawn cooldown.
    const lastSpawn = Number(sessionStorage.getItem(cooldownKey)) || 0;

    if (Date.now() - lastSpawn < COOLDOWN) return;

    // Only a 25% chance to spawn.
    if (Math.random() > SPAWN_CHANCE) return;

    const availableFruits = fruits.filter(
        fruit => !collected.includes(fruit.id)
    );

    if (!availableFruits.length) return;

    const fruit = availableFruits[
        Math.floor(Math.random() * availableFruits.length)
    ];

    // Mark this page as visited for fruit spawning.
    visitedPages.push(currentPage);

    sessionStorage.setItem(
        pagesKey,
        JSON.stringify(visitedPages)
    );

    sessionStorage.setItem(cooldownKey, String(Date.now()));

    // Create the fruit.
    const fruitElement = document.createElement("img");

    fruitElement.src = fileURL(fruit.file);
    fruitElement.alt = fruit.name;
    fruitElement.title = "Click to collect " + fruit.name + "!";

    fruitElement.style.cssText = `
        position:fixed;
        width:48px;
        height:48px;
        object-fit:contain;
        cursor:pointer;
        z-index:99998;
        transition:transform 0.15s ease,opacity 0.15s ease;
        filter:drop-shadow(0 3px 5px rgba(0,0,0,0.5));
    `;

    fruitElement.style.left = (5 + Math.random() * 85) + "%";
    fruitElement.style.top = (10 + Math.random() * 75) + "%";

    fruitElement.addEventListener("mouseenter", function () {
        fruitElement.style.transform = "scale(1.2)";
    });

    fruitElement.addEventListener("mouseleave", function () {
        fruitElement.style.transform = "scale(1)";
    });

    // Collect fruit.
    fruitElement.addEventListener("click", function () {
        if (collected.includes(fruit.id)) return;

        collected.push(fruit.id);

        sessionStorage.setItem(
            storageKey,
            JSON.stringify(collected)
        );

        fruitElement.style.transform = "scale(1.5)";
        fruitElement.style.opacity = "0";

        setTimeout(function () {
            fruitElement.remove();
            updateCounter();

            if (collected.length >= 5) {
                const code = generateCode();
                sessionStorage.setItem(codeKey, code);

                updateCounter();

                alert(
                    "🎉 YOU FOUND ALL 5 FRUITS!\n\n" +
                    "Your secret code:\n" + code
                );
            }
        }, 180);
    });

    document.body.appendChild(fruitElement);
});