// https://4classic.fandom.com/wiki/Leveling

(function() {

    function initXpBar(root) {
        if (!root || root.dataset.bound === "1") return;
        root.dataset.bound = "1";

        var badges = root.querySelectorAll(".xp-badge");
        var master = root.querySelector(".xp-fill-master");
        var resetBtn = root.querySelector(".lv-reset");
        var flags = root.querySelectorAll(".xp-flag");
        var leftArrow = root.querySelector(".left-arrow-button");
        var rightArrow = root.querySelector(".right-arrow-button");
        var descs = document.querySelectorAll(".lv-desc");

        var activeNation = null;
        var activeStep = 1;

        var START_X = 71;
        var segmentEnds = [71, 162, 250, 340, 429, 667, 756, 845, 934, 1023];

        var hintInactive = document.createElement("div");
        hintInactive.className = "xp-hint inactive";
        hintInactive.innerHTML = "Select a nation to preview its quest progression";

        var hintActive = document.createElement("div");
        hintActive.className = "xp-hint active";
        hintActive.innerHTML = "Left Arrow to step back × Right Arrow to advance";

        root.appendChild(hintInactive);
        root.appendChild(hintActive);

        function updateWrapperState() {
            root.classList.toggle("has-nation", !!activeNation);
        }

        function updateHint() {
            hintInactive.style.display = activeNation ? "none" : "block";
            hintActive.style.display = activeNation ? "block" : "none";
        }

        function setBadgeClasses() {
            badges.forEach((badge, i) => {
                var n = i + 1;
                badge.className =
                    "xp-badge b" + n +
                    (activeNation ? "-" + activeNation : "-inactive");

                if (activeNation) {
                    badge.classList.toggle("active", i < activeStep);
                }
            });
        }

        function setDesc() {
            descs.forEach(d => d.classList.remove("active"));
            if (!activeNation) return;

            var d = document.querySelector(
                ".lv-desc." + activeNation + ".d" + activeStep
            );
            if (d) d.classList.add("active");
        }

        function setProgress(step) {
            if (!activeNation) return;

            step = Math.max(1, Math.min(10, step));
            activeStep = step;

            var w = segmentEnds[step - 1] - START_X;
            master.style.width = Math.max(0, w) + "px";

            setBadgeClasses();
            setDesc();
        }

        function hardResetFillToZero() {
            master.style.transition = "none";
            master.style.width = "0px";
            void master.offsetWidth;
            master.style.transition = "";
        }

        function fullReset() {
            hardResetFillToZero();
            activeNation = null;
            activeStep = 1;

            flags.forEach(f => f.classList.remove("active"));

            setBadgeClasses();
            setDesc();
            updateHint();
            updateWrapperState();
        }

        flags.forEach(flag => {
            flag.addEventListener("click", function(e) {
                e.preventDefault();

                activeNation = this.dataset.nation;
                flags.forEach(f => f.classList.remove("active"));
                this.classList.add("active");

                hardResetFillToZero();
                activeStep = 1;

                setProgress(1);
                updateHint();
                updateWrapperState();
            });
        });

        badges.forEach(badge => {
            badge.addEventListener("click", function(e) {
                e.preventDefault();
                if (!activeNation) return;
                setProgress(Number(this.dataset.step));
            });

            badge.addEventListener("contextmenu", function(e) {
                e.preventDefault();
                if (!activeNation) return;
                setProgress(Number(this.dataset.step) - 1);
            });
        });

        if (leftArrow) {
            leftArrow.addEventListener("click", function(e) {
                e.preventDefault();
                if (!activeNation) return;
                setProgress(activeStep - 1);
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener("click", function(e) {
                e.preventDefault();
                if (!activeNation) return;
                setProgress(activeStep + 1);
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                fullReset();
            });
        }

        fullReset();
    }

    function scan() {
        var bars = document.querySelectorAll("[data-xp-bar]");
        bars.forEach(initXpBar);
    }

    scan();
    mw.hook("wikipage.content").add(scan);

})();