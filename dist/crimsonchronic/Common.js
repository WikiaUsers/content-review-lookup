// =========================================================
// elburger33k 
// =========================================================

(function (window, document) {
    "use strict";

    // Prevent double initialization
    if (window.BurgerFrameworkInitialized) return;
    window.BurgerFrameworkInitialized = true;

    // -----------------------------
    // CONFIG
    // -----------------------------
    const CONFIG = {
        fadeDuration: 600,
        placeholderImage: "/images/placeholder.png"
    };

    // -----------------------------
    // INIT
    // -----------------------------
    function initFramework() {
        fadeInEffect();
        randomQuotes();
        undertaleEnhancements();
        imageFallback();
        audioEnhancer();
        fontSystem();
    }

    // -----------------------------
    // global fade in
    // -----------------------------
    function fadeInEffect() {
        if (!document.body || document.body.dataset.ccFadeInit) return;

        document.body.dataset.ccFadeInit = "true";
        document.body.style.opacity = "0";
        document.body.style.transition = `opacity ${CONFIG.fadeDuration}ms ease`;

        requestAnimationFrame(() => {
            document.body.style.opacity = "1";
        });
    }

    // -----------------------------
    // random quotes
    // -----------------------------
    function randomQuotes() {
        const quotes = [
            "RUST SPIT.",
            "He ai- - ai - ain huntin' pigeons any- nymore",
            "aRe -U-U- Still There?",
            "V-V-VEGAN ALTERNATIVE!",
            "O-O-olim simplex Crat-t-t",
            "I-I-IIM FAILING E-E-EVERYTHING-ING!",
            "H- H- how old even is- -he she?"
        ];

        document.querySelectorAll(".rust-quote-container").forEach(container => {
            if (!container) return;
            const idx = Math.floor(Math.random() * quotes.length);
            container.textContent = `"${quotes[idx]}"`;
        });
    }

    // -----------------------------
    // undertale enchancements
    // -----------------------------
    function undertaleEnhancements() {
        document.querySelectorAll(".ut-text-glitch").forEach(el => {
            if (!el) return;
            el.style.textShadow = "0 0 2px #fff, 0 0 5px #aaa";
        });

        document.querySelectorAll(".ut-box").forEach(el => {
            if (!el) return;
            el.style.border = "2px solid #fff";
            el.style.background = "#000";
            el.style.color = "#fff";
        });

        document.querySelectorAll(".ut-damage").forEach(el => {
            if (!el) return;
            el.style.color = "#ff3b3b";
            el.style.fontWeight = "bold";
        });
    }

    // -----------------------------
    // image fallback
    // -----------------------------
    function imageFallback() {
        document.querySelectorAll("img").forEach(img => {
            if (!img) return;

            img.addEventListener("error", function handleError() {
                this.removeEventListener("error", handleError);
                this.src = CONFIG.placeholderImage;
            });
        });
    }

    // -----------------------------
    // audio
    // -----------------------------
    function audioEnhancer() {
        document.querySelectorAll("audio").forEach(audio => {
            if (!audio) return;
            audio.classList.add("cc-audio-enhanced");
            audio.style.filter = "contrast(1.2) brightness(1.1)";
        });
    }

    // -----------------------------
    // font system
    // -----------------------------
    function fontSystem() {
        const fontMap = {
            mono: "'Courier New', monospace",
            undertale: "'Determination Mono', monospace",
            pixel: "'Press Start 2P', monospace",
            default: null
        };

        document.querySelectorAll("[data-cc-font]").forEach(el => {
            if (!el) return;

            const fontKey = el.getAttribute("data-cc-font");
            const font = fontMap[fontKey];

            if (font) {
                el.style.fontFamily = font;
            }
        });
    }

    // -----------------------------
    // fandom hook
    // -----------------------------
    if (window.mw && mw.hook) {
        mw.hook("wikipage.content").add(initFramework);
    } else {
        // Fallback for non-Fandom environments
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initFramework);
        } else {
            initFramework();
        }
    }

    // =========================================================
    // link preview
    // =========================================================

    function linkPreviewSystem() {
        if (window.CrimsonLinkPreviewInitialized) return;
        window.CrimsonLinkPreviewInitialized = true;

        const preview = document.createElement("div");
        preview.className = "cc-link-preview";
        document.body.appendChild(preview);

        let activeLink = null;

        function setContent(data) {
            preview.innerHTML = "";

            if (data.image) {
                const img = document.createElement("img");
                img.src = data.image;
                preview.appendChild(img);
            }

            if (data.title) {
                const title = document.createElement("div");
                title.textContent = data.title;
                preview.appendChild(title);
            }

            if (data.description) {
                const desc = document.createElement("div");
                desc.textContent = data.description;
                preview.appendChild(desc);
            }

            if (!data.title && !data.image) {
                preview.textContent = data.fallback || "No preview available";
            }
        }

        async function fetchPageInfo(title) {
            try {
                const res = await fetch(
                    `/api.php?action=query&prop=extracts|pageimages&exintro&explaintext&piprop=thumbnail&pithumbsize=200&format=json&titles=${encodeURIComponent(title)}`
                );

                const json = await res.json();
                const page = Object.values(json.query.pages)[0];

                return {
                    title: page.title || title,
                    description: page.extract || "",
                    image: page.thumbnail ? page.thumbnail.source : null
                };
            } catch {
                return {};
            }
        }

        async function show(el) {
            activeLink = el;
            preview.classList.add("visible");

            const href = el.getAttribute("href");

            let data = { fallback: href || "—" };

            if (href && href.includes("/wiki/")) {
                const title = decodeURIComponent(href.split("/wiki/")[1]);
                const info = await fetchPageInfo(title);
                data = { ...data, ...info };
            } else {
                data.title = el.textContent.trim();
            }

            if (activeLink === el) {
                setContent(data);
            }
        }

        function hide() {
            activeLink = null;
            preview.classList.remove("visible");
        }

        document.addEventListener("mouseover", e => {
            const link = e.target.closest("a[href]");
            if (!link) return;
            show(link);
        });

        document.addEventListener("mouseout", e => {
            if (e.target.closest("a[href]")) {
                hide();
            }
        });

        document.addEventListener("mousemove", e => {
            if (!preview.classList.contains("visible")) return;

            const offset = 15;

            let x = e.clientX + offset;
            let y = e.clientY + offset;

            const rect = preview.getBoundingClientRect();

            if (x + rect.width > window.innerWidth) {
                x = e.clientX - rect.width - offset;
            }

            if (y + rect.height > window.innerHeight) {
                y = e.clientY - rect.height - offset;
            }

            preview.style.left = `${x}px`;
            preview.style.top = `${y}px`;
        });
    }

    // Initialize preview system safely
    if (document.readyState !== "loading") {
        linkPreviewSystem();
    } else {
        document.addEventListener("DOMContentLoaded", linkPreviewSystem);
    }

})(window, document);