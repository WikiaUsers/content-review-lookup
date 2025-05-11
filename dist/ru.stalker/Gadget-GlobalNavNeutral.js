/* Fix of unclickable navigation menu for gadget */
(function watchForNavigation() {
    var targetElement = document.getElementById('community-navigation');

    if (targetElement) {
        targetElement.removeAttribute('inert');

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'inert') {
                    targetElement.removeAttribute('inert');
                }
            });
        });

        observer.observe(targetElement, {
            attributes: true,
            attributeFilter: ['inert']
        });
    } else {
        setTimeout(watchForNavigation, 100);
    }
})();