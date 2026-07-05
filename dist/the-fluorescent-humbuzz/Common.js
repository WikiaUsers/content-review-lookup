(function () {

    function showBootScreen() {

        if (document.getElementById("backrooms-loader")) return;

        const overlay = document.createElement("div");
        overlay.id = "backrooms-loader";

        overlay.innerHTML = `
            <div id="vhs-overlay"></div>

            <div style="
                position:relative;
                z-index:2;
                text-align:center;
            ">
                <div style="
                    font-size:52px;
                    letter-spacing:4px;
                    margin-bottom:28px;
                ">
                    RECOVERING ARCHIVE
                </div>

                <div id="loader-text"
                     style="
                        font-size:24px;
                        height:30px;
                     ">
                    .
                </div>
            </div>
        `;

        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            background: "#111",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: '"SteinAntik", serif',
            zIndex: "2147483647",
            opacity: "1",
            transition: "opacity .8s ease"
        });

        document.body.appendChild(overlay);

        const gif = document.getElementById("vhs-overlay");

        Object.assign(gif.style, {
            position: "absolute",
            inset: "0",
            backgroundImage: 'url("/wiki/Special:FilePath/vhs.gif")',
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            opacity: "0.15",
            pointerEvents: "none"
        });
        

        const frames = [
            ".",
            ". .",
            ". . ."
        ];

        let frame = 0;

        const animation = setInterval(() => {

            const text = document.getElementById("loader-text");

            if (text) {
                text.textContent = frames[frame];
                frame = (frame + 1) % frames.length;
            }

        }, 350);

        setTimeout(() => {

            clearInterval(animation);

            overlay.style.opacity = "0";

            setTimeout(() => {
                overlay.remove();
            }, 800);

        }, 3500);

    }

    mw.loader.using("mediawiki.util").then(function () {

        const page = mw.config.get("wgPageName");

        if (page === "Level_Database") {

            showBootScreen();

        } else if (Math.random() < 0.15) {

            showBootScreen();

        }

    });

})();

/*notifs yes yes yes*/
(function () {

    const messages = [
        "BACKROOMS FLUORESCENT HUMBUZZ",
        "CONNECTION ISSUES..",
        "ARCHIVE SYNC COMPLETE",
        "UNREGISTERED SIGNAL RECEIVED",
        "LOGS ACCESSED"
    ];

    const glitchMessages = [
        "NETWORK ERROR",
        "ARCHIVE // INSTABILITY"
    ];

    function getMessage() {
        return Math.random() < 0.25
            ? glitchMessages[Math.floor(Math.random() * glitchMessages.length)]
            : messages[Math.floor(Math.random() * messages.length)];
    }

    function ensureBox() {
        let box = document.getElementById("backrooms-notification");

        if (box) return box;

        box = document.createElement("div");
        box.id = "backrooms-notification";
        box.className = "backrooms-notification";

        box.textContent = "SYSTEM BOOTING...";

        document.body.appendChild(box);

        return box;
    }

    function updateBox(box) {

        box.style.opacity = "0.4";

        setTimeout(() => {

            box.textContent = getMessage();

            box.classList.remove("glitch");
            void box.offsetWidth;

            if (Math.random() < 0.15) {
                box.classList.add("glitch");

                setTimeout(() => {
                    box.classList.remove("glitch");
                }, 300);
            }

            box.style.opacity = "0.9";

        }, 200);
    }

    mw.loader.using("mediawiki.util").then(() => {

        const box = ensureBox();

        // start after 10 seconds
        setTimeout(() => {

            updateBox(box);

            const interval = setInterval(() => {
                if (!document.getElementById("backrooms-notification")) return;
                updateBox(box);
            }, 5000);

            setTimeout(() => {

                clearInterval(interval);

                box.style.transition = "opacity 2s ease";
                box.style.opacity = "0";

                setTimeout(() => {
                    box.remove();
                }, 2000);

            }, 60000);

        }, 10000);

    });

})();