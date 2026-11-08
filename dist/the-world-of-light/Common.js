
/* ========================================
   THE WORLD OF LIGHT
   F.M CORPORATION EMBLEM PREVIEW
   ======================================== */

(function () {
    "use strict";

    function setupFMPreview() {

        // Run only on The F.M Corporation page
        var page = mw.config.get("wgPageName") || "";
        page = page.replace(/_/g, " ");

        if (!/^(The )?F\.M\.? Corporation$/i.test(page)) {
            return;
        }

        // Prevent duplicate previews
        if (document.getElementById("wol-fm-overlay")) {
            return;
        }

        // Find the Organization Infobox
        var infobox = document.querySelector(
            ".portable-infobox.pi-theme-wol-organization"
        );

        if (!infobox) return;

        // Find the original emblem
        var emblem = infobox.querySelector(".pi-image img");

        if (!emblem) return;

        var trigger = emblem.closest("a") || emblem;

        // Find organization title
        var title = infobox.querySelector(".pi-title");

        var organizationName = title
            ? title.textContent.trim()
            : "The F.M Corporation";

        // Find introductory description
        var paragraphs = document.querySelectorAll(
            ".mw-parser-output p"
        );

        var description = "";

        for (var i = 0; i < paragraphs.length; i++) {
            var paragraph = paragraphs[i];

            if (infobox.contains(paragraph)) continue;

            var content = paragraph.textContent.trim();

            if (content.length > 20) {
                description = content;
                break;
            }
        }

        if (!description) {
            description =
                "Discover the history, objectives, " +
                "and activities of The F.M Corporation.";
        }

        // Create preview overlay
        var overlay = document.createElement("div");

        overlay.id = "wol-fm-overlay";

        overlay.innerHTML =
            '<div id="wol-fm-window" role="dialog" ' +
            'aria-label="F.M Corporation emblem preview">' +
                '<div id="wol-fm-text">' +
                    '<h2 id="wol-fm-title"></h2>' +
                    '<p id="wol-fm-description"></p>' +
                '</div>' +
                '<div id="wol-fm-image">' +
                    '<img alt="Indivisible Light Emblem">' +
                '</div>' +
            '</div>';

        // Insert title and description
        overlay.querySelector("#wol-fm-title").textContent =
            organizationName;

        overlay.querySelector("#wol-fm-description").textContent =
            description;

        // Reuse the actual infobox image
        var image = overlay.querySelector("#wol-fm-image img");

        image.src = emblem.currentSrc || emblem.src;
        image.alt = emblem.alt || "Indivisible Light Emblem";

        document.body.appendChild(overlay);

        
        // Open preview
        function openPreview() {
            overlay.classList.add("wol-fm-open");
        }

        // Close preview
        function closePreview() {
            overlay.classList.remove("wol-fm-open");
        }

        // Automatically close when the mouse
        // leaves the enlarged preview window.

        var previewWindow = overlay.querySelector(
            "#wol-fm-window"
        );

        previewWindow.addEventListener(
            "mouseleave",
            function () {
                closePreview();
            }
        );

        // Hover over the original emblem
        trigger.addEventListener("mouseenter", openPreview);

        // Also allow clicking or tapping
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            openPreview();
        });

        // Keyboard access
        if (!trigger.hasAttribute("tabindex") &&
            trigger.tagName !== "A") {
            trigger.setAttribute("tabindex", "0");
        }

        trigger.addEventListener("focus", openPreview);

        // Click outside the window to close
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) {
                closePreview();
            }
        });

        // Escape key closes the window
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closePreview();
            }
        });

    }

    // Initialize after wiki content loads
    mw.hook("wikipage.content").add(setupFMPreview);

})();


/* ============================================
   THE WORLD OF LIGHT WIKI
   CINEMATIC FULL-SCREEN INTRODUCTION
   ============================================ */

(function () {
    "use strict";

    /* ============================================
       INTRODUCTION SETTINGS
       ============================================ */

    var MESSAGE =
        "We Are The Light That Pierces Through The Darkness";

    var FILES = {
        background: "WOL_Intro_Background.png",
        light: "WOL_Intro_Light.jpg",
        logo: "WOL_Intro_Logo.png"
    };

    var TYPING_SPEED = 62;
    var LIGHT_DELAY = 1600;
    var LOGO_DELAY = 2700;
    var END_DELAY = 5900;

    /* ============================================
       IMAGE URL HELPER
       ============================================ */

    function fileURL(filename) {
        return mw.util.getUrl(
            "Special:FilePath/" + filename
        );
    }

    /* ============================================
       MAIN INTRODUCTION FUNCTION
       ============================================ */

    function setupCinematicIntro() {

        /* RUN ONLY ON THE MAIN PAGE */

        if (mw.config.get("wgIsMainPage") !== true) {
            return;
        }

        /* DO NOT RUN WHILE EDITING */

        if (mw.config.get("wgAction") !== "view") {
            return;
        }

        /* PREVENT DUPLICATE INTRODUCTIONS */

        if (document.getElementById(
            "wol-cinematic-intro"
        )) {
            return;
        }

        /* ============================================
           BUILD FULL-SCREEN WINDOW
           ============================================ */

        var intro = document.createElement("div");

        intro.id = "wol-cinematic-intro";

        intro.setAttribute("role", "dialog");
        intro.setAttribute("aria-modal", "true");
        intro.setAttribute("aria-label", MESSAGE);

        intro.innerHTML =
            '<div class="wol-cinematic-texture"></div>' +

            '<img class="wol-cinematic-flare" ' +
            'alt="" aria-hidden="true">' +

            '<div class="wol-cinematic-message" ' +
            'aria-hidden="true"></div>' +

            '<img class="wol-cinematic-logo" ' +
            'alt="The World of Light Logo">' +

            '<div class="wol-cinematic-skip">' +
            'Enter / Esc on PC • Double-tap on mobile to skip' +
            '</div>';

        /* ============================================
           BACKGROUND TEXTURE
           ============================================ */

        var texture = intro.querySelector(
            ".wol-cinematic-texture"
        );

        texture.style.backgroundImage =
            'url("' + fileURL(FILES.background) + '")';

        /* ============================================
           WHITE LIGHT IMAGE
           ============================================ */

        var flare = intro.querySelector(
            ".wol-cinematic-flare"
        );

        flare.src = fileURL(FILES.light);

        /* ============================================
           WORLD OF LIGHT LOGO
           ============================================ */

        var logo = intro.querySelector(
            ".wol-cinematic-logo"
        );

        logo.src = fileURL(FILES.logo);

        /* ============================================
           GLOWING TEXT
           ============================================ */

        var messageElement = intro.querySelector(
            ".wol-cinematic-message"
        );

        /* ============================================
           DISPLAY THE INTRODUCTION
           ============================================ */

        // Keep the black CSS curtain active
        // until the animation has finished.

        document.body.classList.remove(
            "wol-intro-finished"
        );

        // Place the cinematic overlay on the page.
        document.body.appendChild(intro);

        /* ============================================
           PREVENT PAGE SCROLLING
           ============================================ */

        var previousOverflow =
            document.documentElement.style.overflow;

        document.documentElement.style.overflow =
            "hidden";

        /* ============================================
           ANIMATION VARIABLES
           ============================================ */

        var closing = false;
        var typingTimer = null;
        var scheduledTimers = [];

        /* ============================================
           TIMER HELPER
           ============================================ */

        function schedule(action, delay) {

            var timer = window.setTimeout(
                action,
                delay
            );

            scheduledTimers.push(timer);

            return timer;
        }

        /* ============================================
           CLOSE THE INTRODUCTION
           ============================================ */

        function closeIntro() {

            // Prevent the closing animation
            // from running more than once.

            if (closing) {
                return;
            }

            closing = true;

            /* STOP THE TYPEWRITER */

            window.clearInterval(typingTimer);

            /* CANCEL REMAINING TIMERS */

            scheduledTimers.forEach(function (timer) {
                window.clearTimeout(timer);
            });

            /* REMOVE KEYBOARD EVENT */

            document.removeEventListener(
                "keydown",
                handleKeydown
            );

            /* BEGIN THE FINAL FADE-OUT */

            intro.classList.add(
                "wol-cinematic-out"
            );

            /* ========================================
               REMOVE INTRO AND REVEAL THE WIKI
               ======================================== */

            window.setTimeout(function () {

                // Tell the CSS that the intro is over.
                // This removes the black loading curtain.

                document.body.classList.add(
                    "wol-intro-finished"
                );

                // Remove the full-screen intro.

                if (intro.parentNode) {
                    intro.parentNode.removeChild(intro);
                }

                // Restore normal page scrolling.

                document.documentElement.style.overflow =
                    previousOverflow;

            }, 900);
        }

        /* ============================================
           PC KEYBOARD CONTROLS
           ============================================ */

        function handleKeydown(event) {

            // Enter or Escape closes the introduction.

            if (
                event.key === "Enter" ||
                event.key === "Escape"
            ) {

                event.preventDefault();

                closeIntro();
            }
        }

        document.addEventListener(
            "keydown",
            handleKeydown
        );

        /* ============================================
           MOBILE DOUBLE-TAP CONTROLS
           ============================================ */

        var lastTapTime = 0;
        var lastTapX = 0;
        var lastTapY = 0;

        function handleDoubleTap(event) {

            // Ignore multi-finger gestures.

            if (event.changedTouches.length !== 1) {
                return;
            }

            var currentTime = Date.now();

            var touch = event.changedTouches[0];

            var timeDifference =
                currentTime - lastTapTime;

            var distanceX = Math.abs(
                touch.clientX - lastTapX
            );

            var distanceY = Math.abs(
                touch.clientY - lastTapY
            );

            /* DETECT DOUBLE-TAP */

            if (
                timeDifference > 0 &&
                timeDifference <= 350 &&
                distanceX < 70 &&
                distanceY < 70
            ) {

                // Prevent unwanted browser zooming.

                event.preventDefault();

                // Close the cinematic introduction.

                closeIntro();

                // Reset the double-tap detector.

                lastTapTime = 0;

            } else {

                // Remember the first tap.

                lastTapTime = currentTime;

                lastTapX = touch.clientX;
                lastTapY = touch.clientY;
            }
        }

        /* ENABLE MOBILE DOUBLE-TAP */

        intro.addEventListener(
            "touchend",
            handleDoubleTap,
            { passive: false }
        );

        /* ============================================
           CINEMATIC ANIMATION SEQUENCE
           ============================================ */

        function finishTyping() {

            /* REMOVE THE TYPEWRITER CURSOR */

            intro.classList.add(
                "wol-cinematic-typed"
            );

            /* WHITE LIGHT FADES IN */

            schedule(function () {

                intro.classList.add(
                    "wol-cinematic-show-light"
                );

            }, LIGHT_DELAY);

            /* WORLD OF LIGHT LOGO APPEARS */

            schedule(function () {

                intro.classList.add(
                    "wol-cinematic-show-logo"
                );

            }, LOGO_DELAY);

            /* AUTOMATICALLY CLOSE THE INTRO */

            schedule(
                closeIntro,
                END_DELAY
            );
        }

        /* ============================================
           REDUCED MOTION ACCESSIBILITY
           ============================================ */

        var reducedMotion =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (reducedMotion) {

            // Display everything without animation.

            messageElement.textContent = MESSAGE;

            intro.classList.add(
                "wol-cinematic-typed",
                "wol-cinematic-show-light",
                "wol-cinematic-show-logo"
            );

            // Close after a short display.

            schedule(closeIntro, 2500);

        } else {

            /* ========================================
               GLOWING TYPEWRITER EFFECT
               ======================================== */

            var position = 0;

            typingTimer = window.setInterval(
                function () {

                    // Advance to the next character.

                    position++;

                    // Display the typed portion.

                    messageElement.textContent =
                        MESSAGE.slice(0, position);

                    // Stop at the final character.

                    if (position >= MESSAGE.length) {

                        window.clearInterval(
                            typingTimer
                        );

                        // Begin the rest of the animation.

                        finishTyping();
                    }

                },
                TYPING_SPEED
            );
        }
    }

    /* ============================================
       START AUTOMATICALLY ON THE MAIN PAGE
       ============================================ */

    mw.loader.using(
        "mediawiki.util"
    ).then(function () {

        if (document.readyState === "loading") {

            document.addEventListener(
                "DOMContentLoaded",
                setupCinematicIntro,
                { once: true }
            );

        } else {

            setupCinematicIntro();
        }

    });

})();

/* ============================================================
   WORLD OF LIGHT — PERSISTENT MUSIC + SETTINGS
   Paste at END of MediaWiki:Common.js, AFTER removing the OLD
   'WORLD OF LIGHT - DYNAMIC BACKGROUND MUSIC' block.

   Create the wiki article WOL_Music_Player first.
   Its popup stays open across full article navigations.
   ============================================================ */
(function () {
    "use strict";

    var PLAYER_PAGE = "WOL_Music_Player";
    var AUDIO_FILE = "WOL_Background_Music.ogg";
    var PREF_KEY = "wol_music_enabled_v2";
    var CHANNEL_NAME = "wol_ambient_audio_v2";
    var NORMAL = 0.07;
    var WINDOW = 0.18;
    var INTRO = 0.25;

    if (!window.mw || !mw.config || !mw.loader) return;

    mw.loader.using("mediawiki.util").then(function () {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", launch, { once: true });
        } else {
            launch();
        }
    });

    function launch() {
        var bus = ("BroadcastChannel" in window)
            ? new BroadcastChannel(CHANNEL_NAME) : null;

        if ((mw.config.get("wgPageName") || "") === PLAYER_PAGE) {
            initPersistentPlayer(bus);
        } else {
            initWikiSettings(bus);
        }
    }

    function enabled() {
        try { return localStorage.getItem(PREF_KEY) === "1"; }
        catch (e) { return false; }
    }

    function setEnabled(value) {
        try { localStorage.setItem(PREF_KEY, value ? "1" : "0"); }
        catch (e) { /* Storage may be disabled. */ }
    }

    function tell(bus, type, data) {
        if (!bus) return;
        var msg = data || {};
        msg.type = type;
        bus.postMessage(msg);
    }

    /* ---------- MAIN WIKI SETTINGS WINDOW ---------- */
    function initWikiSettings(bus) {
        if (document.getElementById("wol-settings-gear")) return;

        var gear = document.createElement("button");
        gear.type = "button";
        gear.id = "wol-settings-gear";
        gear.textContent = "⚙";
        gear.setAttribute("aria-label", "Open wiki settings");
        gear.setAttribute("title", "Wiki settings");

        var overlay = document.createElement("div");
        overlay.id = "wol-settings-overlay";
        overlay.setAttribute("aria-hidden", "true");
        overlay.innerHTML =
            '<section id="wol-settings-dialog" role="dialog" aria-modal="true" ' +
            'aria-labelledby="wol-settings-title" tabindex="-1">' +
              '<button type="button" id="wol-settings-close" aria-label="Close settings">×</button>' +
              '<div class="wol-settings-eyebrow">THE WORLD OF LIGHT</div>' +
              '<h2 id="wol-settings-title">Settings</h2>' +
              '<div class="wol-settings-rule"></div>' +
              '<div class="wol-settings-option">' +
                '<div class="wol-settings-option-copy">' +
                  '<strong>Background Music</strong>' +
                  '<p>Keep the ambience playing as you explore the wiki.</p>' +
                '</div>' +
                '<label class="wol-settings-switch" aria-label="Enable background music">' +
                  '<input type="checkbox" id="wol-music-switch">' +
                  '<span class="wol-settings-switch-track" aria-hidden="true"></span>' +
                '</label>' +
              '</div>' +
              '<p id="wol-settings-status" role="status" aria-live="polite"></p>' +
              '<p class="wol-settings-note">For uninterrupted playback, keep the small ' +
              'music-player window open. It can be minimized.</p>' +
            '</section>';

        document.body.appendChild(gear);
        document.body.appendChild(overlay);

        var dialog = overlay.querySelector("#wol-settings-dialog");
        var close = overlay.querySelector("#wol-settings-close");
        var toggle = overlay.querySelector("#wol-music-switch");
        var status = overlay.querySelector("#wol-settings-status");
        var connected = false;
        var playing = false;
        var lastVolume = -1;
        var previousOverflow = "";

        function updateLabel() {
            toggle.checked = enabled();
            if (!enabled()) status.textContent = "Music is off.";
            else if (playing) status.textContent = "Music is playing continuously.";
            else if (connected) status.textContent = "Open the player window and press Play if needed.";
            else status.textContent = "Enable music to open the persistent player.";
        }

        function openSettings() {
            previousOverflow = document.body.style.overflow;
            overlay.classList.add("wol-settings-visible");
            overlay.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            updateLabel();
            dialog.focus();
        }

        function closeSettings() {
            overlay.classList.remove("wol-settings-visible");
            overlay.setAttribute("aria-hidden", "true");
            document.body.style.overflow = previousOverflow;
            gear.focus();
        }

        gear.addEventListener("click", openSettings);
        close.addEventListener("click", closeSettings);
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) closeSettings();
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && overlay.classList.contains("wol-settings-visible")) {
                closeSettings();
            }
        });

        function openPlayerWindow() {
            // Empty URL reuses an existing named player WITHOUT reloading it.
            // A new window starts at about:blank, then navigates to the wiki page.
            var popup = window.open("", "WOLPersistentMusicPlayer", "width=440,height=300");
            if (!popup) return false;
            try {
                if (popup.location.href === "about:blank") {
                    popup.location.replace(mw.util.getUrl(PLAYER_PAGE));
                }
            } catch (e) {
                // A pre-existing window may be loading: the channel will connect it.
            }
            return true;
        }

        toggle.addEventListener("change", function () {
            var wantMusic = toggle.checked;
            if (!wantMusic) {
                setEnabled(false);
                playing = false;
                tell(bus, "set-enabled", { enabled: false });
                updateLabel();
                return;
            }

            if (!bus) {
                toggle.checked = false;
                status.textContent = "This browser cannot connect to a persistent player.";
                return;
            }

            setEnabled(true);
            if (!connected && !openPlayerWindow()) {
                setEnabled(false);
                toggle.checked = false;
                status.textContent = "The player was blocked. Allow pop-ups for this wiki and try again.";
                return;
            }
            tell(bus, "set-enabled", { enabled: true });
            tell(bus, "ping");
            updateLabel();
        });

        function currentlyVisible(selector) {
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                var style = window.getComputedStyle(elements[i]);
                if (style.visibility !== "hidden" &&
                    style.display !== "none" &&
                    Number(style.opacity || "1") > 0.1) {
                    return true;
                }
            }
            return false;
        }

        function wantedVolume() {
            if (currentlyVisible("#wol-cinematic-intro:not(.wol-cinematic-out)")) return INTRO;
            if (overlay.classList.contains("wol-settings-visible") ||
                currentlyVisible("#wol-fm-overlay.wol-fm-open") ||
                currentlyVisible(".wol-hover-window")) return WINDOW;
            return NORMAL;
        }

        function sendVolume() {
            var volume = wantedVolume();
            if (volume !== lastVolume) {
                lastVolume = volume;
                tell(bus, "set-volume", { volume: volume });
            }
        }

        if (bus) {
            bus.onmessage = function (event) {
                var msg = event.data || {};
                if (msg.type === "player-state") {
                    connected = true;
                    playing = !!msg.playing;
                    updateLabel();
                    sendVolume();
                } else if (msg.type === "player-closed") {
                    connected = false;
                    playing = false;
                    updateLabel();
                }
            };
            tell(bus, "ping");
            window.setInterval(sendVolume, 250);
            window.addEventListener("pagehide", function () {
                tell(bus, "set-volume", { volume: NORMAL });
            });
        }
        updateLabel();
        sendVolume();
    }

    /* ---------- SEPARATE PERSISTENT PLAYER PAGE ---------- */
    function initPersistentPlayer(bus) {
        if (document.getElementById("wol-player-shell")) return;

        var shell = document.createElement("div");
        shell.id = "wol-player-shell";
        shell.innerHTML =
            '<div class="wol-player-heading">THE WORLD OF LIGHT</div>' +
            '<h1>Ambient Music</h1>' +
            '<p>Keep this window open for uninterrupted music while browsing.</p>' +
            '<button type="button" id="wol-player-play">▶ Play</button>' +
            '<div id="wol-player-status" role="status" aria-live="polite"></div>';
        document.body.appendChild(shell);

        var button = shell.querySelector("#wol-player-play");
        var status = shell.querySelector("#wol-player-status");
        var audio = new Audio(mw.util.getUrl("Special:FilePath/" + AUDIO_FILE));
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = NORMAL;
        var target = NORMAL;

        function state() {
            var isPlaying = !audio.paused;
            button.textContent = isPlaying ? "Ⅱ Pause" : "▶ Play";
            status.textContent = isPlaying
                ? "Playing — you may minimize this window."
                : "Paused — press Play here to resume.";
            tell(bus, "player-state", { playing: isPlaying });
        }

        function play() {
            if (!enabled()) return;
            var request = audio.play();
            if (request && typeof request.catch === "function") {
                request.catch(function () {
                    status.textContent = "Browser blocked autoplay. Click Play in this window.";
                    tell(bus, "player-state", { playing: false });
                });
            }
        }

        function changeVolume(value) {
            target = Math.min(1, Math.max(0, Number(value) || 0));
        }

        button.addEventListener("click", function () {
            if (audio.paused) {
                setEnabled(true);
                play();
            } else {
                setEnabled(false);
                audio.pause();
            }
        });
        audio.addEventListener("play", state);
        audio.addEventListener("pause", state);
        audio.addEventListener("ended", state);
        audio.addEventListener("error", function () {
            status.textContent = "Audio couldn't load. Check WOL_Background_Music.ogg on the wiki.";
        });

        if (bus) {
            bus.onmessage = function (event) {
                var msg = event.data || {};
                if (msg.type === "ping") state();
                if (msg.type === "set-volume") changeVolume(msg.volume);
                if (msg.type === "set-enabled") {
                    setEnabled(!!msg.enabled);
                    if (msg.enabled) play();
                    else audio.pause();
                    state();
                }
            };
        }
        window.setInterval(function () {
            var difference = target - audio.volume;
            if (Math.abs(difference) < 0.012) audio.volume = target;
            else audio.volume = Math.max(0, Math.min(1, audio.volume +
                Math.sign(difference) * Math.min(0.012, Math.abs(difference))));
        }, 50);
        window.addEventListener("beforeunload", function () {
            tell(bus, "player-closed");
        });
        state();
        if (enabled()) play();
    }
})();