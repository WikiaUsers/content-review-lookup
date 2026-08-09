(function () {
    "use strict";

    function format(diff) {
        if (diff <= 0) {
            return "Đã kết thúc";
        }

        let seconds = Math.floor(diff / 1000);

        const units = [
            ["năm", 31536000],
            ["tháng", 2592000],
            ["ngày", 86400],
            ["giờ", 3600],
            ["phút", 60]
        ];

        const parts = [];

        units.forEach(([label, value]) => {
            const amount = Math.floor(seconds / value);
            if (amount > 0) {
                parts.push(`${amount} ${label}`);
                seconds %= value;
            }
        });

        if (seconds > 0 || parts.length === 0) {
            parts.push(`${seconds} giây`);
        }

        return parts.join(" ");
    }

    function updateCountdown(el) {
        if (el.dataset.countdownLoaded) {
            return;
        }
        el.dataset.countdownLoaded = "1";

        const dateNode = el.querySelector(".countdowndate");
        if (!dateNode) {
            return;
        }

        const target = new Date(dateNode.textContent.trim());

        if (isNaN(target.getTime())) {
            el.textContent = "Ngày không hợp lệ";
            return;
        }

        const template = el.innerHTML.replace(dateNode.outerHTML, "__COUNTDOWN__");

        function tick() {
            const diff = target.getTime() - Date.now();

            el.innerHTML = template.replace("__COUNTDOWN__", format(diff));

            if (diff <= 0) {
                clearInterval(timer);
            }
        }

        tick();
        const timer = setInterval(tick, 1000);
    }

    function init(root) {
        (root || document).querySelectorAll(".countdown").forEach(updateCountdown);
    }

    if (window.mw && mw.hook) {
        mw.hook("wikipage.content").add(function ($content) {
            init($content[0]);
        });
    } else if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            init(document);
        });
    } else {
        init(document);
    }
})();