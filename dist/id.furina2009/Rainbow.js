$(function () {
    mw.loader.using('mediawiki.util').then(function () {
        mw.util.addCSS(`
            .wiki-rainbow-text {
                background: linear-gradient(
                    90deg,
                    red, orange, yellow, green,
                    cyan, blue, violet, red
                );
                background-size: 300% 100%;
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
                -webkit-text-fill-color: transparent;
                animation: wiki-rainbow-move 5s linear infinite;
            }

            @keyframes wiki-rainbow-move {
                0%   { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `);

        document.querySelectorAll(
            '#mw-content-text p, ' +
            '#mw-content-text li, ' +
            '#firstHeading, ' +
            '#mw-content-text h2, ' +
            '#mw-content-text h3'
        ).forEach(function (element) {
            element.classList.add('wiki-rainbow-text');
        });
    });
});