/* === Username system === */

function typeText(el, text) {
  let i = 0;
  el.textContent = "";

  if (!text) return;

  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(interval);
    }
  }, 60);
}

mw.hook('wikipage.content').add(function ($content) {
  const user = mw.config.get("wgUserName");

  $content.find(".insertusername").each(function () {
    const el = this;

    const fallback = el.getAttribute("data-fallback") || "";


    const replacement = user ? " " + user : fallback;

    if (!replacement) {
      el.remove();
      return;
    }


    typeText(el, replacement);
  });
});

/* === READING PROGRESS BAR === */
(function () {

    function createBar() {
        const bar = document.createElement("div");

        bar.id = "wiki-reading-progress";

        bar.style.position = "fixed";
        bar.style.top = "0";

        // Fandom has a top bar → we move slightly upwards with a layer
        bar.style.left = "0";

        bar.style.height = "4px";
        bar.style.width = "0%";

        // gradient
        bar.style.background = "linear-gradient(90deg, #4caf50, #2196f3)";

        bar.style.zIndex = "2147483647";

        bar.style.pointerEvents = "none";

        // smooth animation
        bar.style.transition = "width 0.1s linear";

        document.body.appendChild(bar);

        return bar;
    }

    function updateBar(bar) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        let percent = 0;

        if (docHeight > 0) {
            percent = (scrollTop / docHeight) * 100;
        }

        bar.style.width = percent + "%";
    }

    function init() {
        const bar = createBar();

        window.addEventListener("scroll", () => updateBar(bar), { passive: true });
        window.addEventListener("resize", () => updateBar(bar));

        // start immediately (important)
        updateBar(bar);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();

/* === Activity of wiki === */
(function () {

    const style = document.createElement("style");
    style.textContent = `
    @keyframes wikiSadOut {
        0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            opacity: 0;
            transform: scale(0.7);
            filter: blur(2px);
        }
    }

    .wiki-sad-out {
        animation: wikiSadOut 0.6s ease forwards;
    }
    `;
    document.head.appendChild(style);


    function getMood(days) {

        if (days <= 7) {
            return {
                color: "#4caf50",
                icon: "🟢",
                text: "Żyję i mam się dobrze!",
                msg: "Nie daj jej nigdy umrzeć ❤️",
                sadExit: "Ale... dlaczego? 😢"
            };
        }

        if (days <= 30) {
            return {
                color: "#ffeb3b",
                icon: "🟡",
                text: "Jestem spokojna, wiem że wrócisz ❤️",
                msg: "Zawsze jest czas, żeby coś dodać!",
                sadExit: "No dobrze... 😔"
            };
        }

        if (days <= 180) {
            return {
                color: "#ff9800",
                icon: "🟠",
                text: "Czuję się poważnie zaniedbana 😢",
                msg: "Wiki potrzebuje Twojej edycji!",
                sadExit: "Masz innną, prawda?! 💔"
            };
        }

        return {
            color: "#f44336",
            icon: "🔴",
            text: "Czuję się taka samotna...",
            msg: "Ożyw ją zanim będzie za późno!",
            sadExit: "Już mnie nie potrzebujesz... 💔"
        };
    }


    function fetchLastEdit(cb) {

        const api = mw.util.wikiScript("api");

        $.getJSON(api, {
            action: "query",
            list: "recentchanges",
            rclimit: 1,
            rcprop: "timestamp",
            format: "json"
        }, function (data) {

            const change = data.query.recentchanges[0];
            if (!change) return cb(null);

            const lastEdit = new Date(change.timestamp);
            const now = new Date();

            const diffDays = Math.floor((now - lastEdit) / (1000 * 60 * 60 * 24));

            cb(diffDays);
        });
    }


    function createBox(mood, days) {

        const box = document.createElement("div");

        box.style.position = "fixed";
        box.style.bottom = "40px";
        box.style.right = "20px";
        box.style.zIndex = "2147483647";
        box.style.background = "#1e1e1e";
        box.style.color = "#fff";
        box.style.borderRadius = "10px";
        box.style.border = "2px solid " + mood.color;
        box.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
        box.style.fontSize = "13px";
        box.style.padding = "10px 14px";
        box.style.textAlign = "center";
        box.style.maxWidth = "240px";


        const closeBtn = document.createElement("div");
        closeBtn.innerHTML = "×";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "4px";
        closeBtn.style.right = "8px";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.fontSize = "16px";
        closeBtn.style.opacity = "0.7";
        closeBtn.style.userSelect = "none";

        closeBtn.onmouseenter = () => closeBtn.style.opacity = "1";
        closeBtn.onmouseleave = () => closeBtn.style.opacity = "0.7";


        const content = document.createElement("div");
        content.innerHTML = `
            <div style="font-weight:bold;">
                ${mood.icon} Stan Wiki: ${mood.text}
            </div>
            <div style="font-size:12px; opacity:0.8; margin-top:2px;">
                Ostatnia edycja: ${days} dni temu
            </div>
            <div style="
                margin-top:6px;
                font-size:11px;
                opacity:0.7;
                font-style:italic;
            ">
                ${mood.msg}
            </div>
        `;


        closeBtn.onclick = () => {

            // sad news
            content.innerHTML = `
                <div style="font-size:13px; font-weight:bold;">
                    ${mood.sadExit}
                </div>
            `;

            // slight pause before closing
            setTimeout(() => {

                box.classList.add("wiki-sad-out");

                setTimeout(() => {
                    box.remove();
                }, 600);

            }, 700);
        };


        box.appendChild(closeBtn);
        box.appendChild(content);
        document.body.appendChild(box);
    }


    function init() {

        fetchLastEdit(function (days) {

            if (days === null) return;

            const mood = getMood(days);

            createBox(mood, days);
        });

    }


    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();