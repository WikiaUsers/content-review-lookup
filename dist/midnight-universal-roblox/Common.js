/* Any JavaScript here will be loaded for all users on every page load. */
// For [[Module:CSS]]; [[Template:CSS]] dependency

mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
        mw.util.addCSS($(this).attr("data-css"));
    });
});

document.querySelectorAll('.mw-parser-output .obfuscated-text').forEach(function(e) {
    const lowestChar = '!'.charCodeAt(0),
        highestChar = '~'.charCodeAt(0);

    setInterval(function() {
        var randomString = '';
        for (var i = 0; i < 10; i++) {
            randomString += String.fromCharCode(
                (highestChar - lowestChar) * Math.random() + lowestChar);
        }
        e.textContent = randomString;
    }, 100);
});