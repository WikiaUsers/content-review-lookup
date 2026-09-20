mw.hook('wikipage.content').add(function ($content) {
    $content.find('.wikitable.autonumber[data-start]').each(function () {
        const startVal = parseInt(this.getAttribute('data-start'), 10);
        if (!isNaN(startVal)) {
            // Subtract 1 because the first row increments the counter by 1
            this.style.setProperty('--start-offset', startVal - 1);
        }
    });
});