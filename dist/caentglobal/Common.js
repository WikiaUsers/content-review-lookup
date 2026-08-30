(function () {
    "use strict";

    /*
     * =========================================================
     * THREENITY UNIVERSAL AUDIO PLAYER
     *
     * GENERAL RULE:
     * - Normal .audio-track elements behave like released songs.
     * - A track is treated as scheduled ONLY when it has:
     *     data-release-date="YYYY-MM-DDTHH:mm:ss+09:00"
     *
     * This prevents scheduled-release logic from affecting older
     * released tracklists such as ME, BEHIND THE MIRROR.
     * =========================================================
     */

    const AUDIO_STATE = {
        queue: [],
        activeTrack: null,
        shuffle: false,
        repeatMode: 0,
        initialized: false
    };

    /*
     * =========================================================
     * GENERAL HELPERS
     * =========================================================
     */

    function getAllTracks() {
        return Array.from(
            document.querySelectorAll(".audio-track")
        );
    }

    function getReleasedTracks() {
        return getAllTracks().filter(function (track) {
            return isTrackReleased(track);
        });
    }

    function hasReleaseSchedule(track) {
        return !!(
            track &&
            track.hasAttribute("data-release-date") &&
            track.getAttribute("data-release-date").trim() !== ""
        );
    }

    function getReleaseTimestamp(track) {
        if (!hasReleaseSchedule(track)) {
            return null;
        }

        const dateString =
            track.getAttribute("data-release-date");

        const timestamp =
            new Date(dateString).getTime();

        return isNaN(timestamp)
            ? null
            : timestamp;
    }

    function isTrackReleased(track) {
        if (!track) {
            return false;
        }

        /*
         * IMPORTANT:
         * Tracks without data-release-date are considered
         * already released. This preserves ME, BEHIND THE MIRROR
         * and all other existing released tracklists.
         */
        if (!hasReleaseSchedule(track)) {
            return true;
        }

        const releaseTimestamp =
            getReleaseTimestamp(track);

        if (releaseTimestamp === null) {
            return false;
        }

        return Date.now() >= releaseTimestamp;
    }

    function formatAudioTime(seconds) {
        if (
            seconds === undefined ||
            seconds === null ||
            !isFinite(seconds) ||
            isNaN(seconds)
        ) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remaining =
            Math.floor(seconds % 60);

        return (
            minutes +
            ":" +
            String(remaining).padStart(2, "0")
        );
    }

    function getAudio(track) {
        if (!track) {
            return null;
        }

        return track.querySelector("audio");
    }

    function closeAllTrackMenus() {
        document
            .querySelectorAll(".track-menu")
            .forEach(function (menu) {
                menu.classList.remove("open");
            });
    }

    function pauseAllOtherTracks(currentAudio) {
        document
            .querySelectorAll(".audio-track audio")
            .forEach(function (audio) {
                if (audio !== currentAudio) {
                    audio.pause();
                }
            });
    }

    /*
     * =========================================================
     * COUNTDOWN SYSTEM
     * =========================================================
     *
     * Countdown elements work independently from the audio
     * release system.
     *
     * IMPORTANT:
     * A countdown only displays "RELEASED" after the actual
     * target timestamp has been reached.
     * =========================================================
     */

    function initCountdowns() {
        document
            .querySelectorAll(".countdown")
            .forEach(function (element) {

                if (
                    element.dataset.countdownInitialized ===
                    "true"
                ) {
                    return;
                }

                const dateString =
                    element.getAttribute("data-date") ||
                    element.getAttribute("data-target");

                if (!dateString) {
                    element.textContent =
                        "INVALID DATE";
                    return;
                }

                const target =
                    new Date(dateString).getTime();

                if (isNaN(target)) {
                    element.textContent =
                        "INVALID DATE";
                    return;
                }

                element.dataset.countdownInitialized =
                    "true";

                function updateCountdown() {
                    const difference =
                        target - Date.now();

                    if (difference <= 0) {
                        element.textContent =
                            "RELEASED";

                        return;
                    }

                    const days =
                        Math.floor(
                            difference / 86400000
                        );

                    const hours =
                        Math.floor(
                            (difference / 3600000) % 24
                        );

                    const minutes =
                        Math.floor(
                            (difference / 60000) % 60
                        );

                    const seconds =
                        Math.floor(
                            (difference / 1000) % 60
                        );

                    element.textContent =
                        days +
                        "d " +
                        hours +
                        "h " +
                        minutes +
                        "m " +
                        seconds +
                        "s";
                }

                updateCountdown();

                const interval =
                    setInterval(
                        updateCountdown,
                        1000
                    );

                element._countdownInterval =
                    interval;
            });
    }

    /*
     * =========================================================
     * ELAPSED TIMER SYSTEM
     * =========================================================
     */

    function initElapsedTimers() {
        document
            .querySelectorAll(".elapsed")
            .forEach(function (element) {

                if (
                    element.dataset.elapsedInitialized ===
                    "true"
                ) {
                    return;
                }

                const dateString =
                    element.getAttribute(
                        "data-start"
                    );

                if (!dateString) {
                    element.textContent =
                        "INVALID DATE";
                    return;
                }

                const start =
                    new Date(dateString).getTime();

                if (isNaN(start)) {
                    element.textContent =
                        "INVALID DATE";
                    return;
                }

                element.dataset.elapsedInitialized =
                    "true";

                function updateElapsed() {
                    const difference =
                        Date.now() - start;

                    if (difference < 0) {
                        element.textContent =
                            "NOT STARTED";
                        return;
                    }

                    const days =
                        Math.floor(
                            difference / 86400000
                        );

                    const hours =
                        Math.floor(
                            (difference / 3600000) % 24
                        );

                    const minutes =
                        Math.floor(
                            (difference / 60000) % 60
                        );

                    const seconds =
                        Math.floor(
                            (difference / 1000) % 60
                        );

                    element.textContent =
                        days +
                        "d " +
                        hours +
                        "h " +
                        minutes +
                        "m " +
                        seconds +
                        "s";
                }

                updateElapsed();

                element._elapsedInterval =
                    setInterval(
                        updateElapsed,
                        1000
                    );
            });
    }

    /*
     * =========================================================
     * SCHEDULED CONTENT SYSTEM
     * =========================================================
     */

    function initScheduledContent() {
        document
            .querySelectorAll(".scheduled-content")
            .forEach(function (element) {

                if (
                    element.dataset.scheduledInitialized ===
                    "true"
                ) {
                    return;
                }

                const dateString =
                    element.getAttribute(
                        "data-release-date"
                    );

                if (!dateString) {
                    element.style.display = "none";
                    return;
                }

                const releaseTime =
                    new Date(dateString).getTime();

                if (isNaN(releaseTime)) {
                    element.style.display = "none";
                    return;
                }

                element.dataset.scheduledInitialized =
                    "true";

                function updateVisibility() {
                    if (Date.now() >= releaseTime) {
                        element.style.display = "";
                    } else {
                        element.style.display = "none";
                    }
                }

                updateVisibility();

                element._scheduledInterval =
                    setInterval(
                        updateVisibility,
                        1000
                    );
            });
    }

    /*
     * =========================================================
     * PLAYER CSS
     * =========================================================
     */

    function injectAudioStyles() {

        if (
            document.getElementById(
                "threenity-universal-audio-player-styles"
            )
        ) {
            return;
        }

        const style =
            document.createElement("style");

        style.id =
            "threenity-universal-audio-player-styles";

        style.textContent = `
.audio-album-player{
    position:relative;
    background:#121212;
    color:#fff;
    padding:8px 20px 20px;
    box-sizing:border-box;
    overflow:hidden
}

.audio-player-header{
    display:grid;
    grid-template-columns:70px 1fr 100px 44px;
    align-items:center;
    padding:14px 12px;
    border-bottom:1px solid #303030;
    color:#a7a7a7;
    font-size:12px;
    text-transform:uppercase;
    letter-spacing:1px
}

.audio-player-header .header-number{
    text-align:center
}

.audio-player-header .header-time{
    text-align:right;
    padding-right:8px
}

.audio-track{
    position:relative;
    border-bottom:1px solid #282828;
    transition:background .18s ease
}

.audio-track:last-of-type{
    border-bottom:none
}

.audio-track:hover{
    background:#1b1b1b
}

.audio-track.is-playing{
    background:#191919
}

.audio-track-main{
    display:grid;
    grid-template-columns:70px 1fr 100px 44px;
    align-items:center;
    min-height:74px;
    padding:8px 12px;
    box-sizing:border-box
}

.audio-track-number-area{
    position:relative;
    width:40px;
    height:40px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:auto
}

.audio-track-number{
    color:#b3b3b3;
    font-size:15px
}

.audio-track-play{
    position:absolute;
    width:32px;
    height:32px;
    display:none;
    align-items:center;
    justify-content:center;
    border:0;
    border-radius:50%;
    background:#fff;
    color:#121212;
    cursor:pointer;
    font-size:12px;
    padding:0
}

.audio-track:not(.audio-track-locked):hover .audio-track-number,
.audio-track.is-playing .audio-track-number{
    opacity:0
}

.audio-track:not(.audio-track-locked):hover .audio-track-play,
.audio-track.is-playing .audio-track-play{
    display:flex
}

.audio-track-play:hover{
    transform:scale(1.06)
}

.audio-track-info{
    min-width:0
}

.audio-track-title{
    font-size:16px;
    font-weight:600;
    color:#f3f3f3;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis
}

.audio-track-artist{
    margin-top:5px;
    color:#a7a7a7;
    font-size:13px
}

.audio-track-time{
    text-align:right;
    color:#b3b3b3;
    font-size:14px;
    white-space:nowrap;
    padding-right:8px
}

.audio-track-menu-area{
    position:relative;
    display:flex;
    justify-content:center
}

.track-menu-button,
.queue-menu-button{
    width:32px;
    height:32px;
    border:0;
    background:transparent;
    color:#b3b3b3;
    cursor:pointer;
    border-radius:50%;
    font-size:20px
}

.track-menu-button:hover,
.queue-menu-button:hover{
    background:#2a2a2a;
    color:#fff
}

.track-menu{
    position:absolute;
    right:0;
    top:38px;
    width:190px;
    background:#282828;
    border:1px solid #3a3a3a;
    border-radius:8px;
    padding:5px;
    display:none;
    z-index:5000;
    box-shadow:0 10px 30px rgba(0,0,0,.5)
}

.track-menu.open{
    display:block
}

.track-menu-item{
    width:100%;
    border:0;
    background:transparent;
    color:#eee;
    padding:10px 12px;
    text-align:left;
    cursor:pointer;
    border-radius:5px;
    font-size:13px;
    box-sizing:border-box
}

.track-menu-item:hover{
    background:#3a3a3a
}

.track-menu-item:disabled{
    color:#777;
    cursor:default
}

.track-menu-item:disabled:hover{
    background:transparent
}

.audio-track-locked{
    cursor:default
}

.audio-track-locked .audio-track-title,
.audio-track-locked .audio-track-artist,
.audio-track-locked .audio-track-time,
.audio-track-locked .audio-track-number{
    opacity:.9
}

.audio-track-locked .audio-track-play{
    display:none!important
}

.audio-source{
    display:none!important
}

.audio-bottom-player{
    position:relative;
    margin-top:18px;
    background:#090a0b;
    border:1px solid #303236;
    border-radius:14px;
    padding:18px;
    box-sizing:border-box
}

.audio-bottom-top{
    display:grid;
    grid-template-columns:minmax(0,1fr) auto;
    gap:15px;
    align-items:center
}

.audio-now-playing{
    display:flex;
    align-items:center;
    min-width:0
}

.audio-bottom-info{
    min-width:0
}

.audio-bottom-title{
    font-size:17px;
    font-weight:700;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis
}

.audio-bottom-artist{
    margin-top:6px;
    font-size:13px;
    color:#a7a7a7
}

.audio-controls{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:12px
}

.audio-control-button{
    position:relative;
    border:0;
    background:transparent;
    color:#a7a7a7;
    font-size:20px;
    cursor:pointer;
    padding:7px;
    border-radius:50%;
    min-width:34px;
    height:34px
}

.audio-control-button:hover{
    color:#fff;
    background:#1d1f22
}

.audio-control-button.active{
    color:#1ed760
}

.audio-repeat.repeat-one::after{
    content:"1";
    position:absolute;
    font-size:8px;
    right:5px;
    bottom:4px;
    font-weight:700
}

.audio-main-play{
    width:56px;
    height:56px;
    border-radius:50%;
    border:0;
    background:#f1f1f1;
    color:#111;
    font-size:22px;
    cursor:pointer
}

.audio-main-play:hover{
    transform:scale(1.05)
}

.audio-bottom-progress-row{
    display:grid;
    grid-template-columns:48px 1fr 48px;
    gap:10px;
    align-items:center;
    margin-top:14px
}

.audio-bottom-time{
    font-size:12px;
    color:#a7a7a7;
    text-align:center
}

.audio-bottom-progress{
    height:4px;
    background:#555;
    border-radius:999px;
    cursor:pointer;
    overflow:hidden
}

.audio-bottom-progress-fill{
    height:100%;
    width:0%;
    background:#fff
}

.audio-bottom-actions{
    display:flex;
    justify-content:flex-end;
    align-items:center;
    gap:8px;
    margin-top:8px
}

.audio-lyrics-button,
.audio-queue-button{
    width:34px;
    height:34px;
    border:0;
    background:transparent;
    color:#b3b3b3;
    font-size:18px;
    cursor:pointer;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center
}

.audio-lyrics-button:hover,
.audio-queue-button:hover{
    color:#fff;
    background:#1d1f22
}

.audio-queue-button.active{
    color:#1ed760
}

.audio-queue-sidebar{
    position:absolute;
    top:0;
    right:-420px;
    width:360px;
    max-width:92vw;
    height:100%;
    background:#171717;
    border-left:1px solid #303030;
    box-shadow:-10px 0 35px rgba(0,0,0,.45);
    transition:right .25s ease;
    z-index:2500;
    display:flex;
    flex-direction:column;
    box-sizing:border-box
}

.audio-queue-sidebar.open{
    right:0
}

.audio-queue-header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:18px;
    border-bottom:1px solid #303030
}

.audio-queue-title{
    font-size:18px;
    font-weight:700
}

.audio-queue-close{
    border:0;
    background:transparent;
    color:#b3b3b3;
    font-size:24px;
    cursor:pointer
}

.audio-queue-close:hover{
    color:#fff
}

.audio-queue-list{
    flex:1;
    overflow-y:auto;
    padding:8px
}

.audio-queue-empty{
    padding:25px 12px;
    color:#888;
    font-size:14px;
    text-align:center
}

.audio-queue-item{
    display:grid;
    grid-template-columns:36px minmax(0,1fr) 42px;
    gap:10px;
    align-items:center;
    padding:10px;
    border-radius:8px
}

.audio-queue-item:hover{
    background:#222
}

.audio-queue-number{
    color:#888;
    font-size:13px;
    text-align:center
}

.audio-queue-info{
    min-width:0
}

.audio-queue-song-title{
    font-size:14px;
    font-weight:600;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis
}

.audio-queue-song-artist{
    margin-top:4px;
    color:#888;
    font-size:12px
}

.audio-queue-menu-area{
    position:relative;
    display:flex;
    justify-content:center
}

.audio-lyrics-overlay,
.audio-credits-overlay{
    display:none;
    position:absolute;
    inset:0;
    z-index:6000;
    background:#121212;
    padding:24px;
    box-sizing:border-box;
    overflow-y:auto
}

.audio-lyrics-overlay.open,
.audio-credits-overlay.open{
    display:block
}

.audio-lyrics-close,
.audio-credits-close{
    float:right;
    border:0;
    background:transparent;
    color:#b3b3b3;
    font-size:26px;
    cursor:pointer
}

.audio-lyrics-close:hover,
.audio-credits-close:hover{
    color:#fff
}

.audio-lyrics-title,
.audio-credits-title{
    font-size:24px;
    font-weight:700;
    padding-right:40px
}

.audio-lyrics-artist,
.audio-credits-artist{
    color:#a7a7a7;
    margin-top:6px;
    margin-bottom:24px
}

.audio-lyrics-combined{
    max-width:700px
}

.audio-lyrics-pair{
    margin-bottom:22px;
    opacity:.35;
    transition:opacity .35s ease,transform .35s ease
}

.audio-lyrics-pair.active{
    opacity:1;
    transform:scale(1.015);
    transform-origin:left center
}

.audio-original-line{
    white-space:pre-wrap;
    line-height:1.65;
    font-size:18px;
    color:#9a9a9a;
    font-weight:500;
    transition:color .35s ease,text-shadow .35s ease
}

.audio-translation-line{
    white-space:pre-wrap;
    line-height:1.55;
    font-size:13px;
    color:#666;
    margin-top:5px;
    transition:color .35s ease,text-shadow .35s ease
}

.audio-lyrics-pair.active .audio-original-line{
    color:#fff;
    text-shadow:0 0 8px rgba(255,255,255,.55),0 0 18px rgba(255,255,255,.25)
}

.audio-lyrics-pair.active .audio-translation-line{
    color:#d0d0d0;
    text-shadow:0 0 10px rgba(255,255,255,.15)
}

.audio-credits-content{
    max-width:650px
}

.audio-credit-row{
    padding:15px 0;
    border-bottom:1px solid #2b2b2b
}

.audio-credit-label{
    font-size:11px;
    text-transform:uppercase;
    letter-spacing:1.2px;
    color:#777;
    margin-bottom:5px
}

.audio-credit-value{
    font-size:16px;
    color:#fff;
    line-height:1.5
}

@media(max-width:700px){
    .audio-album-player{
        padding:8px 12px 16px
    }

    .audio-player-header{
        grid-template-columns:50px 1fr 65px 38px
    }

    .audio-track-main{
        grid-template-columns:50px minmax(0,1fr) 65px 38px
    }

    .audio-bottom-top{
        grid-template-columns:1fr
    }

    .audio-controls{
        justify-content:space-between;
        gap:5px
    }

    .audio-main-play{
        width:50px;
        height:50px
    }

    .audio-track-title{
        white-space:normal
    }

    .audio-track-play{
        display:flex
    }

    .audio-track-number{
        opacity:0
    }

    .audio-queue-sidebar{
        width:100%;
        right:-100%
    }

    .audio-original-line{
        font-size:16px
    }
}
        `;

        document.head.appendChild(style);
    }

    /*
     * =========================================================
     * QUEUE
     * =========================================================
     */

    function isTrackQueued(track) {
        return AUDIO_STATE.queue.includes(track);
    }

    function addToQueue(track) {
        if (!track) {
            return;
        }

        if (!isTrackReleased(track)) {
            return;
        }

        if (!getAudio(track)) {
            return;
        }

        if (isTrackQueued(track)) {
            return;
        }

        AUDIO_STATE.queue.push(track);

        renderQueue();
        updateAllQueueMenus();
    }

    function removeFromQueue(track) {
        const index =
            AUDIO_STATE.queue.indexOf(track);

        if (index !== -1) {
            AUDIO_STATE.queue.splice(index, 1);
        }

        renderQueue();
        updateAllQueueMenus();
    }

    function updateQueueMenu(track, player) {
        const button =
            player.querySelector(".queue-toggle");

        if (!button) {
            return;
        }

        if (!isTrackReleased(track)) {
            button.textContent =
                "Unavailable until release";

            button.disabled = true;

            return;
        }

        if (!getAudio(track)) {
            button.textContent =
                "Audio unavailable";

            button.disabled = true;

            return;
        }

        if (isTrackQueued(track)) {
            button.textContent =
                "Added to queue";

            button.disabled = true;
        } else {
            button.textContent =
                "Add to queue";

            button.disabled = false;
        }
    }

    function updateAllQueueMenus() {
        document
            .querySelectorAll(".audio-track")
            .forEach(function (track) {

                const player =
                    track.querySelector(
                        ".audio-track-ui"
                    );

                if (player) {
                    updateQueueMenu(
                        track,
                        player
                    );
                }
            });
    }

    function renderQueue() {

        const list =
            document.querySelector(
                ".audio-queue-list"
            );

        if (!list) {
            return;
        }

        list.innerHTML = "";

        if (AUDIO_STATE.queue.length === 0) {
            list.innerHTML =
                '<div class="audio-queue-empty">' +
                "Your queue is empty." +
                "</div>";

            return;
        }

        AUDIO_STATE.queue.forEach(
            function (track, index) {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "audio-queue-item";

                item.innerHTML =
                    '<div class="audio-queue-number">' +
                    (index + 1) +
                    "</div>" +

                    '<div class="audio-queue-info">' +
                    '<div class="audio-queue-song-title"></div>' +
                    '<div class="audio-queue-song-artist"></div>' +
                    "</div>" +

                    '<div class="audio-queue-menu-area">' +
                    '<button class="queue-menu-button" type="button">⋮</button>' +

                    '<div class="track-menu">' +
                    '<button class="track-menu-item remove-from-queue" type="button">' +
                    "Remove from queue" +
                    "</button>" +
                    "</div>" +

                    "</div>";

                item
                    .querySelector(
                        ".audio-queue-song-title"
                    )
                    .textContent =
                    track.dataset.title ||
                    "Unknown Track";

                item
                    .querySelector(
                        ".audio-queue-song-artist"
                    )
                    .textContent =
                    track.dataset.artist ||
                    "THREENITY";

                const menuButton =
                    item.querySelector(
                        ".queue-menu-button"
                    );

                const menu =
                    item.querySelector(
                        ".track-menu"
                    );

                const removeButton =
                    item.querySelector(
                        ".remove-from-queue"
                    );

                menuButton.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();

                        const wasOpen =
                            menu.classList.contains(
                                "open"
                            );

                        closeAllTrackMenus();

                        if (!wasOpen) {
                            menu.classList.add(
                                "open"
                            );
                        }
                    }
                );

                removeButton.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();

                        removeFromQueue(track);

                        closeAllTrackMenus();
                    }
                );

                item.addEventListener(
                    "dblclick",
                    function () {
                        playTrack(
                            track,
                            true
                        );
                    }
                );

                list.appendChild(item);
            }
        );
    }

    /*
     * =========================================================
     * TRACK UI
     * =========================================================
     */

    function buildTrackUI(track) {

        const existing =
            track.querySelector(
                ".audio-track-ui"
            );

        if (existing) {
            return existing;
        }

        const number =
            track.dataset.number ||
            "";

        const title =
            track.dataset.title ||
            "Unknown Track";

        const artist =
            track.dataset.artist ||
            "THREENITY";

        const duration =
            track.dataset.duration ||
            "--:--";

        const player =
            document.createElement("div");

        player.className =
            "audio-track-ui";

        player.innerHTML =
            '<div class="audio-track-main">' +

            '<div class="audio-track-number-area">' +
            '<span class="audio-track-number"></span>' +
            '<button class="audio-track-play" type="button" aria-label="Play track">▶</button>' +
            "</div>" +

            '<div class="audio-track-info">' +
            '<div class="audio-track-title"></div>' +
            '<div class="audio-track-artist"></div>' +
            "</div>" +

            '<div class="audio-track-time">' +
            '<span class="audio-duration"></span>' +
            "</div>" +

            '<div class="audio-track-menu-area">' +
            '<button class="track-menu-button" type="button" aria-label="More options">⋮</button>' +

            '<div class="track-menu">' +
            '<button class="track-menu-item queue-toggle" type="button">Add to queue</button>' +
            '<button class="track-menu-item view-credits" type="button">View song details</button>' +
            "</div>" +

            "</div>" +

            "</div>";

        player
            .querySelector(
                ".audio-track-number"
            )
            .textContent =
            number;

        player
            .querySelector(
                ".audio-track-title"
            )
            .textContent =
            title;

        player
            .querySelector(
                ".audio-track-artist"
            )
            .textContent =
            artist;

        player
            .querySelector(
                ".audio-duration"
            )
            .textContent =
            duration;

        const source =
            track.querySelector(
                ".audio-source"
            );

        if (source) {
            track.insertBefore(
                player,
                source
            );
        } else {
            track.appendChild(
                player
            );
        }

        return player;
    }

    /*
     * =========================================================
     * TRACK RELEASE STATE
     * =========================================================
     */

    function updateTrackReleaseState(track) {

        const player =
            track.querySelector(
                ".audio-track-ui"
            );

        if (!player) {
            return;
        }

        const playButton =
            player.querySelector(
                ".audio-track-play"
            );

        const duration =
            player.querySelector(
                ".audio-duration"
            );

        const audio =
            getAudio(track);

        /*
         * -----------------------------------------------------
         * SCHEDULED TRACK BEFORE RELEASE
         * -----------------------------------------------------
         */

        if (
            hasReleaseSchedule(track) &&
            !isTrackReleased(track)
        ) {

            track.classList.add(
                "audio-track-locked"
            );

            track.classList.remove(
                "is-playing"
            );

            if (playButton) {
                playButton.disabled = true;
                playButton.style.cursor =
                    "default";
                playButton.textContent =
                    "▶";
            }

            if (duration) {
                duration.textContent =
                    "--:--";
            }

            return;
        }

        /*
         * -----------------------------------------------------
         * SCHEDULED TRACK AFTER RELEASE BUT AUDIO NOT FOUND
         * -----------------------------------------------------
         */

        if (
            hasReleaseSchedule(track) &&
            isTrackReleased(track) &&
            !audio
        ) {

            track.classList.add(
                "audio-track-locked"
            );

            if (playButton) {
                playButton.disabled = true;
                playButton.style.cursor =
                    "default";
            }

            if (duration) {
                duration.textContent =
                    "--:--";
            }

            return;
        }

        /*
         * -----------------------------------------------------
         * RELEASED TRACK
         * -----------------------------------------------------
         */

        if (audio) {

            track.classList.remove(
                "audio-track-locked"
            );

            if (playButton) {
                playButton.disabled = false;
                playButton.style.cursor =
                    "pointer";
            }

            if (
                isFinite(audio.duration) &&
                audio.duration > 0
            ) {
                if (duration) {
                    duration.textContent =
                        formatAudioTime(
                            audio.duration
                        );
                }
            }
        }
    }

    /*
     * =========================================================
     * PLAYBACK
     * =========================================================
     */

    function playTrack(track, restart) {

        if (!track) {
            return;
        }

        /*
         * Never allow a scheduled song to play before release.
         */
        if (!isTrackReleased(track)) {
            return;
        }

        const audio =
            getAudio(track);

        if (!audio) {
            return;
        }

        if (restart) {
            try {
                audio.currentTime = 0;
            } catch (error) {
                console.warn(
                    "Unable to reset audio position:",
                    error
                );
            }
        }

        AUDIO_STATE.activeTrack =
            track;

        pauseAllOtherTracks(audio);

        document
            .querySelectorAll(".audio-track")
            .forEach(function (otherTrack) {

                if (otherTrack !== track) {
                    otherTrack.classList.remove(
                        "is-playing"
                    );

                    otherTrack.classList.remove(
                        "is-paused"
                    );

                    const otherButton =
                        otherTrack.querySelector(
                            ".audio-track-play"
                        );

                    if (otherButton) {
                        otherButton.textContent =
                            "▶";
                    }
                }
            });

        const playPromise =
            audio.play();

        if (
            playPromise &&
            typeof playPromise.catch ===
                "function"
        ) {
            playPromise.catch(
                function (error) {
                    console.error(
                        "Audio playback error:",
                        error
                    );
                }
            );
        }
    }

    /*
     * =========================================================
     * NEXT / PREVIOUS
     * =========================================================
     */

    function getNextTrack(currentTrack) {

        const tracks =
            getReleasedTracks();

        if (tracks.length === 0) {
            return null;
        }

        /*
         * Queue always takes priority.
         */
        while (
            AUDIO_STATE.queue.length > 0
        ) {

            const queued =
                AUDIO_STATE.queue.shift();

            if (
                queued &&
                isTrackReleased(queued) &&
                getAudio(queued)
            ) {

                renderQueue();
                updateAllQueueMenus();

                return queued;
            }
        }

        if (
            AUDIO_STATE.shuffle &&
            tracks.length > 1
        ) {

            const available =
                tracks.filter(
                    function (track) {
                        return (
                            track !==
                            currentTrack
                        );
                    }
                );

            if (available.length > 0) {
                return available[
                    Math.floor(
                        Math.random() *
                        available.length
                    )
                ];
            }
        }

        const index =
            tracks.indexOf(
                currentTrack
            );

        if (
            index !== -1 &&
            tracks[index + 1]
        ) {
            return tracks[index + 1];
        }

        /*
         * Repeat-all.
         */
        if (
            AUDIO_STATE.repeatMode === 1
        ) {
            return tracks[0];
        }

        return null;
    }

    function getPreviousTrack(currentTrack) {

        const tracks =
            getReleasedTracks();

        if (tracks.length === 0) {
            return null;
        }

        /*
         * Shuffle previous chooses another available track.
         */
        if (
            AUDIO_STATE.shuffle &&
            tracks.length > 1
        ) {

            const available =
                tracks.filter(
                    function (track) {
                        return (
                            track !==
                            currentTrack
                        );
                    }
                );

            if (available.length > 0) {
                return available[
                    Math.floor(
                        Math.random() *
                        available.length
                    )
                ];
            }
        }

        const index =
            tracks.indexOf(
                currentTrack
            );

        if (index > 0) {
            return tracks[index - 1];
        }

        if (
            AUDIO_STATE.repeatMode === 1
        ) {
            return tracks[
                tracks.length - 1
            ];
        }

        return currentTrack;
    }

    function playNextTrack(currentTrack) {

        if (
            AUDIO_STATE.repeatMode === 2
        ) {
            playTrack(
                currentTrack,
                true
            );

            return;
        }

        const next =
            getNextTrack(
                currentTrack
            );

        if (next) {
            /*
             * IMPORTANT:
             * Every newly selected song starts at 0.
             */
            playTrack(
                next,
                true
            );
        }
    }

    function playPreviousTrack(currentTrack) {

        const previous =
            getPreviousTrack(
                currentTrack
            );

        if (previous) {
            /*
             * IMPORTANT:
             * Previous-song selection always resets
             * the previous song to its beginning.
             */
            playTrack(
                previous,
                true
            );
        }
    }

    /*
     * =========================================================
     * GLOBAL PLAYER
     * =========================================================
     */

    function updateBottomPlayer() {

        const player =
            document.querySelector(
                ".audio-bottom-player"
            );

        if (!player) {
            return;
        }

        if (!AUDIO_STATE.activeTrack) {
            return;
        }

        const track =
            AUDIO_STATE.activeTrack;

        const audio =
            getAudio(track);

        if (!audio) {
            return;
        }

        const title =
            track.dataset.title ||
            "Unknown Track";

        const artist =
            track.dataset.artist ||
            "THREENITY";

        player
            .querySelector(
                ".audio-bottom-title"
            )
            .textContent =
            title;

        player
            .querySelector(
                ".audio-bottom-artist"
            )
            .textContent =
            artist;

        player
            .querySelector(
                ".audio-bottom-current"
            )
            .textContent =
            formatAudioTime(
                audio.currentTime
            );

        player
            .querySelector(
                ".audio-bottom-duration"
            )
            .textContent =
            formatAudioTime(
                audio.duration
            );

        player
            .querySelector(
                ".audio-main-play"
            )
            .textContent =
            audio.paused
                ? "▶"
                : "❚❚";

        const fill =
            player.querySelector(
                ".audio-bottom-progress-fill"
            );

        if (
            audio.duration &&
            isFinite(audio.duration)
        ) {

            fill.style.width =
                (
                    audio.currentTime /
                    audio.duration
                ) *
                100 +
                "%";

        } else {

            fill.style.width =
                "0%";
        }

        updateSyncedLyrics();
    }

    function createBottomPlayer() {

        let player =
            document.querySelector(
                ".audio-bottom-player"
            );

        if (player) {
            return player;
        }

        const albumPlayer =
            document.querySelector(
                ".audio-album-player"
            );

        if (!albumPlayer) {
            return null;
        }

        player =
            document.createElement("div");

        player.className =
            "audio-bottom-player";

        player.innerHTML =
            '<div class="audio-bottom-top">' +

            '<div class="audio-now-playing">' +
            '<div class="audio-bottom-info">' +
            '<div class="audio-bottom-title">Select a track</div>' +
            '<div class="audio-bottom-artist">THREENITY</div>' +
            "</div>" +
            "</div>" +

            '<div class="audio-controls">' +

            '<button class="audio-control-button audio-shuffle" type="button" title="Shuffle">⇄</button>' +

            '<button class="audio-control-button audio-previous" type="button" title="Previous">▮◀</button>' +

            '<button class="audio-main-play" type="button" title="Play">▶</button>' +

            '<button class="audio-control-button audio-next" type="button" title="Next">▶▮</button>' +

            '<button class="audio-control-button audio-repeat" type="button" title="Enable repeat">↻</button>' +

            "</div>" +

            "</div>" +

            '<div class="audio-bottom-progress-row">' +

            '<div class="audio-bottom-time audio-bottom-current">0:00</div>' +

            '<div class="audio-bottom-progress">' +
            '<div class="audio-bottom-progress-fill"></div>' +
            "</div>" +

            '<div class="audio-bottom-time audio-bottom-duration">0:00</div>' +

            "</div>" +

            '<div class="audio-bottom-actions">' +

            '<button class="audio-lyrics-button" type="button" title="Lyrics">♫</button>' +

            '<button class="audio-queue-button" type="button" title="Queue">☰</button>' +

            "</div>" +

            '<div class="audio-queue-sidebar">' +

            '<div class="audio-queue-header">' +
            '<div class="audio-queue-title">Queue</div>' +
            '<button class="audio-queue-close" type="button">×</button>' +
            "</div>" +

            '<div class="audio-queue-list"></div>' +

            "</div>";

        const credits =
            albumPlayer.querySelector(
                ".audio-release-info"
            );

        if (credits) {
            albumPlayer.insertBefore(
                player,
                credits
            );
        } else {
            albumPlayer.appendChild(
                player
            );
        }

        const mainPlay =
            player.querySelector(
                ".audio-main-play"
            );

        const next =
            player.querySelector(
                ".audio-next"
            );

        const previous =
            player.querySelector(
                ".audio-previous"
            );

        const shuffle =
            player.querySelector(
                ".audio-shuffle"
            );

        const repeat =
            player.querySelector(
                ".audio-repeat"
            );

        const progress =
            player.querySelector(
                ".audio-bottom-progress"
            );

        const lyricsButton =
            player.querySelector(
                ".audio-lyrics-button"
            );

        const queueButton =
            player.querySelector(
                ".audio-queue-button"
            );

        const sidebar =
            player.querySelector(
                ".audio-queue-sidebar"
            );

        const queueClose =
            player.querySelector(
                ".audio-queue-close"
            );

        mainPlay.addEventListener(
            "click",
            function () {

                if (!AUDIO_STATE.activeTrack) {

                    const tracks =
                        getReleasedTracks();

                    if (tracks[0]) {
                        playTrack(
                            tracks[0],
                            true
                        );
                    }

                    return;
                }

                const audio =
                    getAudio(
                        AUDIO_STATE.activeTrack
                    );

                if (!audio) {
                    return;
                }

                if (audio.paused) {
                    playTrack(
                        AUDIO_STATE.activeTrack
                    );
                } else {
                    audio.pause();
                }
            }
        );

        next.addEventListener(
            "click",
            function () {

                if (!AUDIO_STATE.activeTrack) {

                    const tracks =
                        getReleasedTracks();

                    if (tracks[0]) {
                        playTrack(
                            tracks[0],
                            true
                        );
                    }

                    return;
                }

                playNextTrack(
                    AUDIO_STATE.activeTrack
                );
            }
        );

        previous.addEventListener(
            "click",
            function () {

                if (!AUDIO_STATE.activeTrack) {

                    const tracks =
                        getReleasedTracks();

                    if (tracks[0]) {
                        playTrack(
                            tracks[0],
                            true
                        );
                    }

                    return;
                }

                playPreviousTrack(
                    AUDIO_STATE.activeTrack
                );
            }
        );

        shuffle.addEventListener(
            "click",
            function () {

                AUDIO_STATE.shuffle =
                    !AUDIO_STATE.shuffle;

                this.classList.toggle(
                    "active",
                    AUDIO_STATE.shuffle
                );

                this.title =
                    AUDIO_STATE.shuffle
                        ? "Disable shuffle"
                        : "Shuffle";
            }
        );

        repeat.addEventListener(
            "click",
            function () {

                AUDIO_STATE.repeatMode =
                    (
                        AUDIO_STATE.repeatMode +
                        1
                    ) % 3;

                this.classList.remove(
                    "active",
                    "repeat-one"
                );

                if (
                    AUDIO_STATE.repeatMode ===
                    0
                ) {

                    this.title =
                        "Enable repeat";

                } else if (
                    AUDIO_STATE.repeatMode ===
                    1
                ) {

                    this.classList.add(
                        "active"
                    );

                    this.title =
                        "Enable repeat one";

                } else {

                    this.classList.add(
                        "active",
                        "repeat-one"
                    );

                    this.title =
                        "Disable repeat";
                }
            }
        );

        progress.addEventListener(
            "click",
            function (event) {

                if (!AUDIO_STATE.activeTrack) {
                    return;
                }

                const audio =
                    getAudio(
                        AUDIO_STATE.activeTrack
                    );

                if (
                    !audio ||
                    !audio.duration ||
                    !isFinite(audio.duration)
                ) {
                    return;
                }

                const rect =
                    this.getBoundingClientRect();

                const percentage =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width
                        )
                    );

                audio.currentTime =
                    percentage *
                    audio.duration;

                updateBottomPlayer();
            }
        );

        lyricsButton.addEventListener(
            "click",
            function () {

                if (!AUDIO_STATE.activeTrack) {
                    return;
                }

                showLyrics(
                    AUDIO_STATE.activeTrack
                );
            }
        );

        queueButton.addEventListener(
            "click",
            function () {

                const open =
                    sidebar.classList.toggle(
                        "open"
                    );

                queueButton.classList.toggle(
                    "active",
                    open
                );

                renderQueue();
            }
        );

        queueClose.addEventListener(
            "click",
            function () {

                sidebar.classList.remove(
                    "open"
                );

                queueButton.classList.remove(
                    "active"
                );
            }
        );

        renderQueue();

        return player;
    }

    /*
     * =========================================================
     * LYRICS
     * =========================================================
     */

    function createLyricsOverlay() {

        let overlay =
            document.querySelector(
                ".audio-lyrics-overlay"
            );

        if (overlay) {
            return overlay;
        }

        const albumPlayer =
            document.querySelector(
                ".audio-album-player"
            );

        if (!albumPlayer) {
            return null;
        }

        overlay =
            document.createElement("div");

        overlay.className =
            "audio-lyrics-overlay";

        overlay.innerHTML =
            '<button class="audio-lyrics-close" type="button">×</button>' +

            '<div class="audio-lyrics-title"></div>' +

            '<div class="audio-lyrics-artist"></div>' +

            '<div class="audio-lyrics-combined"></div>';

        albumPlayer.appendChild(
            overlay
        );

        overlay
            .querySelector(
                ".audio-lyrics-close"
            )
            .addEventListener(
                "click",
                function () {
                    overlay.classList.remove(
                        "open"
                    );
                }
            );

        return overlay;
    }

    function updateSyncedLyrics() {

        const overlay =
            document.querySelector(
                ".audio-lyrics-overlay"
            );

        if (
            !overlay ||
            !overlay.classList.contains(
                "open"
            ) ||
            !AUDIO_STATE.activeTrack
        ) {
            return;
        }

        const audio =
            getAudio(
                AUDIO_STATE.activeTrack
            );

        if (!audio) {
            return;
        }

        const pairs =
            overlay.querySelectorAll(
                ".audio-lyrics-pair"
            );

        const times =
            (
                AUDIO_STATE.activeTrack
                    .dataset
                    .lyricsTimes ||
                ""
            )
            .split(",")
            .map(function (time) {
                return parseFloat(
                    time.trim()
                );
            });

        if (
            !times.length ||
            isNaN(times[0])
        ) {
            return;
        }

        let activeIndex = -1;

        for (
            let i = 0;
            i < times.length;
            i++
        ) {

            if (
                audio.currentTime >=
                times[i]
            ) {
                activeIndex = i;
            } else {
                break;
            }
        }

        pairs.forEach(
            function (pair, index) {

                pair.classList.toggle(
                    "active",
                    index ===
                    activeIndex
                );
            }
        );

        if (
            activeIndex >= 0 &&
            pairs[activeIndex]
        ) {

            const activePair =
                pairs[activeIndex];

            const overlayRect =
                overlay.getBoundingClientRect();

            const pairRect =
                activePair.getBoundingClientRect();

            if (
                pairRect.top <
                    overlayRect.top + 100 ||
                pairRect.bottom >
                    overlayRect.bottom - 100
            ) {

                activePair.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }
    }

    function showLyrics(track) {

        if (!track) {
            return;
        }

        const overlay =
            createLyricsOverlay();

        if (!overlay) {
            return;
        }

        overlay
            .querySelector(
                ".audio-lyrics-title"
            )
            .textContent =
            track.dataset.title ||
            "Unknown Track";

        overlay
            .querySelector(
                ".audio-lyrics-artist"
            )
            .textContent =
            track.dataset.artist ||
            "THREENITY";

        const original =
            (
                track.dataset.lyrics ||
                "Lyrics will be added soon."
            ).split("\n");

        const translation =
            (
                track.dataset.translation ||
                ""
            ).split("\n");

        const combined =
            overlay.querySelector(
                ".audio-lyrics-combined"
            );

        combined.innerHTML = "";

        const total =
            Math.max(
                original.length,
                translation.length
            );

        for (
            let i = 0;
            i < total;
            i++
        ) {

            const pair =
                document.createElement(
                    "div"
                );

            pair.className =
                "audio-lyrics-pair";

            const originalLine =
                document.createElement(
                    "div"
                );

            originalLine.className =
                "audio-original-line";

            originalLine.textContent =
                original[i] || "";

            const translationLine =
                document.createElement(
                    "div"
                );

            translationLine.className =
                "audio-translation-line";

            translationLine.textContent =
                translation[i] || "";

            pair.appendChild(
                originalLine
            );

            if (translation[i]) {
                pair.appendChild(
                    translationLine
                );
            }

            combined.appendChild(
                pair
            );
        }

        overlay.classList.add(
            "open"
        );

        updateSyncedLyrics();
    }

    /*
     * =========================================================
     * SONG DETAILS / CREDITS
     * =========================================================
     */

    function createCreditsOverlay() {

        let overlay =
            document.querySelector(
                ".audio-credits-overlay"
            );

        if (overlay) {
            return overlay;
        }

        const albumPlayer =
            document.querySelector(
                ".audio-album-player"
            );

        if (!albumPlayer) {
            return null;
        }

        overlay =
            document.createElement(
                "div"
            );

        overlay.className =
            "audio-credits-overlay";

        overlay.innerHTML =
            '<button class="audio-credits-close" type="button">×</button>' +

            '<div class="audio-credits-title"></div>' +

            '<div class="audio-credits-artist"></div>' +

            '<div class="audio-credits-content"></div>';

        albumPlayer.appendChild(
            overlay
        );

        overlay
            .querySelector(
                ".audio-credits-close"
            )
            .addEventListener(
                "click",
                function () {
                    overlay.classList.remove(
                        "open"
                    );
                }
            );

        return overlay;
    }

    function showCredits(track) {

        const overlay =
            createCreditsOverlay();

        if (!overlay) {
            return;
        }

        overlay
            .querySelector(
                ".audio-credits-title"
            )
            .textContent =
            track.dataset.title ||
            "Unknown Track";

        overlay
            .querySelector(
                ".audio-credits-artist"
            )
            .textContent =
            track.dataset.artist ||
            "THREENITY";

        const content =
            overlay.querySelector(
                ".audio-credits-content"
            );

        content.innerHTML = "";

        const credits = [
            {
                label: "Writers",
                value:
                    track.dataset.writers ||
                    "TBA"
            },
            {
                label: "Composers",
                value:
                    track.dataset.composers ||
                    "TBA"
            },
            {
                label: "Producers",
                value:
                    track.dataset.producers ||
                    "TBA"
            }
        ];

        if (hasReleaseSchedule(track)) {

            const releaseDate =
                track.dataset.releaseDate ||
                "";

            credits.push({
                label: "Release",
                value:
                    releaseDate ||
                    "Scheduled release"
            });
        }

        credits.forEach(
            function (credit) {

                const row =
                    document.createElement(
                        "div"
                    );

                row.className =
                    "audio-credit-row";

                row.innerHTML =
                    '<div class="audio-credit-label"></div>' +
                    '<div class="audio-credit-value"></div>';

                row
                    .querySelector(
                        ".audio-credit-label"
                    )
                    .textContent =
                    credit.label;

                row
                    .querySelector(
                        ".audio-credit-value"
                    )
                    .textContent =
                    credit.value;

                content.appendChild(
                    row
                );
            }
        );

        overlay.classList.add(
            "open"
        );
    }

    /*
     * =========================================================
     * TRACK EVENT INITIALIZATION
     * =========================================================
     */

    function initTrack(track) {

        if (
            track.dataset.universalAudioInitialized ===
            "true"
        ) {

            updateTrackReleaseState(
                track
            );

            return;
        }

        track.dataset.universalAudioInitialized =
            "true";

        const player =
            buildTrackUI(track);

        const audio =
            getAudio(track);

        const source =
            track.querySelector(
                ".audio-source"
            );

        if (source) {
            source.style.display =
                "none";
        }

        /*
         * Build the visual track regardless of
         * whether the file is released.
         */
        updateTrackReleaseState(
            track
        );

        const playButton =
            player.querySelector(
                ".audio-track-play"
            );

        const duration =
            player.querySelector(
                ".audio-duration"
            );

        const menuButton =
            player.querySelector(
                ".track-menu-button"
            );

        const menu =
            player.querySelector(
                ".track-menu"
            );

        const queueButton =
            player.querySelector(
                ".queue-toggle"
            );

        const creditsButton =
            player.querySelector(
                ".view-credits"
            );

        updateQueueMenu(
            track,
            player
        );

        /*
         * -----------------------------------------------------
         * HOVER / TRACK PLAY BUTTON
         * -----------------------------------------------------
         */

        if (playButton) {

            playButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    if (
                        !isTrackReleased(
                            track
                        )
                    ) {
                        return;
                    }

                    /*
                     * Clicking a track from the
                     * tracklist always starts it
                     * from the beginning.
                     */
                    playTrack(
                        track,
                        true
                    );
                }
            );
        }

        /*
         * -----------------------------------------------------
         * MENU
         * -----------------------------------------------------
         */

        if (menuButton) {

            menuButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    const wasOpen =
                        menu.classList.contains(
                            "open"
                        );

                    closeAllTrackMenus();

                    if (!wasOpen) {
                        menu.classList.add(
                            "open"
                        );
                    }
                }
            );
        }

        /*
         * -----------------------------------------------------
         * ADD TO QUEUE
         * -----------------------------------------------------
         */

        if (queueButton) {

            queueButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    addToQueue(
                        track
                    );

                    closeAllTrackMenus();
                }
            );
        }

        /*
         * -----------------------------------------------------
         * VIEW SONG DETAILS
         * -----------------------------------------------------
         */

        if (creditsButton) {

            creditsButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    showCredits(
                        track
                    );

                    closeAllTrackMenus();
                }
            );
        }

        /*
         * -----------------------------------------------------
         * AUDIO ELEMENT
         * -----------------------------------------------------
         */

        if (!audio) {
            return;
        }

        audio.preload =
            "metadata";

        audio.style.display =
            "none";

        /*
         * -----------------------------------------------------
         * PLAY EVENT
         * -----------------------------------------------------
         */

        audio.addEventListener(
            "play",
            function () {

                /*
                 * A scheduled track can never bypass
                 * the release timestamp.
                 */
                if (
                    !isTrackReleased(
                        track
                    )
                ) {

                    audio.pause();

                    return;
                }

                AUDIO_STATE.activeTrack =
                    track;

                pauseAllOtherTracks(
                    audio
                );

                document
                    .querySelectorAll(
                        ".audio-track"
                    )
                    .forEach(
                        function (otherTrack) {

                            if (
                                otherTrack !==
                                track
                            ) {

                                otherTrack.classList.remove(
                                    "is-playing"
                                );

                                otherTrack.classList.remove(
                                    "is-paused"
                                );

                                const otherButton =
                                    otherTrack.querySelector(
                                        ".audio-track-play"
                                    );

                                if (otherButton) {
                                    otherButton.textContent =
                                        "▶";
                                }
                            }
                        }
                    );

                track.classList.add(
                    "is-playing"
                );

                track.classList.remove(
                    "is-paused"
                );

                if (playButton) {
                    playButton.textContent =
                        "❚❚";
                }

                updateBottomPlayer();
            }
        );

        /*
         * -----------------------------------------------------
         * PAUSE EVENT
         * -----------------------------------------------------
         */

        audio.addEventListener(
            "pause",
            function () {

                if (!audio.ended) {

                    track.classList.remove(
                        "is-playing"
                    );

                    track.classList.add(
                        "is-paused"
                    );

                    if (playButton) {
                        playButton.textContent =
                            "▶";
                    }
                }

                updateBottomPlayer();
            }
        );

        /*
         * -----------------------------------------------------
         * ENDED EVENT
         * -----------------------------------------------------
         */

        audio.addEventListener(
            "ended",
            function () {

                track.classList.remove(
                    "is-playing"
                );

                track.classList.remove(
                    "is-paused"
                );

                track.classList.add(
                    "is-ended"
                );

                if (playButton) {
                    playButton.textContent =
                        "▶";
                }

                updateBottomPlayer();

                playNextTrack(
                    track
                );
            }
        );

        /*
         * -----------------------------------------------------
         * METADATA
         * -----------------------------------------------------
         */

        audio.addEventListener(
            "loadedmetadata",
            function () {

                if (
                    isTrackReleased(
                        track
                    ) &&
                    isFinite(
                        audio.duration
                    )
                ) {

                    if (duration) {
                        duration.textContent =
                            formatAudioTime(
                                audio.duration
                            );
                    }
                } else {

                    if (
                        hasReleaseSchedule(
                            track
                        )
                    ) {

                        if (duration) {
                            duration.textContent =
                                "--:--";
                        }
                    }
                }

                updateTrackReleaseState(
                    track
                );

                updateBottomPlayer();
            }
        );

        /*
         * -----------------------------------------------------
         * TIME UPDATE
         * -----------------------------------------------------
         */

        audio.addEventListener(
            "timeupdate",
            function () {
                updateBottomPlayer();
            }
        );

        /*
         * -----------------------------------------------------
         * AUDIO ERROR
         * -----------------------------------------------------
         */

        audio.addEventListener(
            "error",
            function () {

                /*
                 * Only scheduled tracks should become
                 * locked because of release/file problems.
                 *
                 * Existing released tracklists keep
                 * their normal behavior.
                 */
                if (
                    hasReleaseSchedule(
                        track
                    )
                ) {

                    track.classList.add(
                        "audio-track-locked"
                    );

                    if (duration) {
                        duration.textContent =
                            "--:--";
                    }

                    if (playButton) {
                        playButton.disabled =
                            true;
                    }

                    updateQueueMenu(
                        track,
                        player
                    );
                }
            }
        );
    }

    /*
     * =========================================================
     * UPDATE ALL SCHEDULED TRACKS
     * =========================================================
     *
     * This is what makes a scheduled track become playable
     * automatically when the release time arrives while the
     * page is open.
     *
     * A normal track with no data-release-date is ignored.
     * =========================================================
     */

    function updateScheduledTracks() {

        document
            .querySelectorAll(
                ".audio-track[data-release-date]"
            )
            .forEach(
                function (track) {

                    const wasReleased =
                        track.dataset.wasReleased ===
                        "true";

                    const released =
                        isTrackReleased(
                            track
                        );

                    if (released) {

                        track.dataset.wasReleased =
                            "true";

                        updateTrackReleaseState(
                            track
                        );

                        const player =
                            track.querySelector(
                                ".audio-track-ui"
                            );

                        if (player) {
                            updateQueueMenu(
                                track,
                                player
                            );
                        }

                        /*
                         * If the Fandom-rendered audio element
                         * becomes available after release,
                         * load its metadata.
                         */
                        const audio =
                            getAudio(track);

                        if (
                            audio &&
                            !wasReleased
                        ) {

                            try {
                                audio.load();
                            } catch (error) {
                                console.warn(
                                    "Unable to reload released audio:",
                                    error
                                );
                            }
                        }
                    }
                }
            );
    }

    /*
     * =========================================================
     * INITIALIZATION
     * =========================================================
     */

    function initAudioPlayers() {

        injectAudioStyles();

        const tracks =
            document.querySelectorAll(
                ".audio-track"
            );

        if (!tracks.length) {
            return;
        }

        tracks.forEach(
            function (track) {
                initTrack(track);
            }
        );

        createBottomPlayer();

        updateAllQueueMenus();

        updateScheduledTracks();
    }

    /*
     * =========================================================
     * GLOBAL CLICK HANDLER
     * =========================================================
     */

    function initGlobalMenuHandler() {

        if (
            document.body.dataset
                .universalAudioMenuListener ===
            "true"
        ) {
            return;
        }

        document.body.dataset
            .universalAudioMenuListener =
            "true";

        document.addEventListener(
            "click",
            function () {
                closeAllTrackMenus();
            }
        );
    }

    /*
     * =========================================================
     * MASTER INITIALIZATION
     * =========================================================
     */

    function initAll() {

        try {
            initCountdowns();
        } catch (error) {
            console.error(
                "Countdown system error:",
                error
            );
        }

        try {
            initElapsedTimers();
        } catch (error) {
            console.error(
                "Elapsed timer system error:",
                error
            );
        }

        try {
            initScheduledContent();
        } catch (error) {
            console.error(
                "Scheduled content system error:",
                error
            );
        }

        try {
            initAudioPlayers();
        } catch (error) {
            console.error(
                "Audio player system error:",
                error
            );
        }

        try {
            initGlobalMenuHandler();
        } catch (error) {
            console.error(
                "Audio menu system error:",
                error
            );
        }
    }

    /*
     * =========================================================
     * SCHEDULED TRACK WATCHER
     * =========================================================
     */

    setInterval(
        function () {
            try {
                updateScheduledTracks();
            } catch (error) {
                console.error(
                    "Scheduled track update error:",
                    error
                );
            }
        },
        1000
    );

    /*
     * =========================================================
     * PAGE LOAD
     * =========================================================
     */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initAll
        );

    } else {

        initAll();
    }

    /*
     * =========================================================
     * FANDOM / MEDIAWIKI DYNAMIC CONTENT
     * =========================================================
     */

    if (
        typeof mw !== "undefined" &&
        typeof mw.hook === "function"
    ) {

        mw.hook(
            "wikipage.content"
        ).add(
            function () {

                setTimeout(
                    function () {
                        initAll();
                    },
                    100
                );
            }
        );
    }

})();