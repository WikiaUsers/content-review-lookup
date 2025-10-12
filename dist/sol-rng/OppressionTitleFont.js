$(function () {
    var elements = $('.SwitchingCases');

    if (!elements.length) return;

    elements.each(function () {
        var el = $(this);
        var originalText = el.text();

        function randomCaseText(str) {
            return str.split("").map(function (char) {
                if (/[a-z]/i.test(char)) {
                    return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
                }
                return char;
            }).join("");
        }

        setInterval(function () {
            el.text(randomCaseText(originalText));
        }, 5);
    });
});