/* Makes the collapse button on notice boxes work. */
/* Will need to make it permanent until the cache is refreshed, but this works for now. */
document.addEventListener("click", function (e) {
	if (!e.target.classList.contains("notice-close")) {
		return;
	}

	const box = e.target.closest(".notice-box");

	if (box) {
		box.classList.add("notice-hidden");
	}
});

/* Main page splash text. */
(function () {
    var splash = document.querySelector(".insanity-splash");
    if (!splash) return;

    var typing;
    var reset;

    function typeText(text) {
        clearInterval(typing);
        splash.textContent = "";

        var i = 0;

        function typeNext() {
            if (i >= text.length) return;

            splash.textContent += text[i++];

            if (text[i - 1] === " ") {
                typeNext();
            } else {
                typing = setTimeout(typeNext, 55);
            }
        }
        typeNext();
    }

    document.querySelectorAll(".mp-game").forEach(function (game) {
        game.onmouseenter = function () {
            clearTimeout(reset);
            typeText(game.dataset.title);
        };

        game.onmouseleave = function () {
            reset = setTimeout(function () {
                typeText("WHAT YOU'RE HERE FOR.");
            }, 300);
        };
    });
})();