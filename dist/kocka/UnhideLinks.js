(function() {
    if (!mw.config.get('profileUserName')) {
        return;
    }
    function findContainer() {
        var promise = $.Deferred(),
            interval = setInterval(function() {
                var $element = $('#userProfileApp .user-identity-social');
                if ($element.length) {
                    clearInterval(interval);
                    promise.resolve($element);
                }
            }, 300);
        return promise;
    }
    findContainer().then(function($container) {
        var regexes = {
            website: /^https?:\/\/(?:www\.)?(.*)\/*/,
            twitter: /^https?:\/\/(?:mobile\.)?twitter\.com\/(.*)\/*$/,
            facebook: /^https?:\/\/(?:www\.|m\.|web\.)?facebook\.com\/(.*)\/*/
        };
        $container.find('li').each(function() {
            var $li = $(this),
                xlink = $li.find('a > svg > use').attr('xlink:href'),
                className = $li.attr('class'),
                network;
            if (xlink) {
                network = xlink.substring(11);
                if (network === 'link') {
                    network = 'website';
                }
            } else {
                network = className;
            }
            if (regexes[network]) {
                var $a = $li.find('a'),
                    $img = $a.find('img, svg'),
                    match = $a.attr('href').match(regexes[network])[1];
                if (match) {
                    $a.text('     ' + decodeURIComponent(match)).prepend($img);
                }
            }
        });
        var $dropdown = $container.find('.wds-dropdown');
        if ($dropdown.length) {
            var $content = $dropdown.find('.wds-dropdown__content');
            $content.replaceWith($content.html().trim());
        }
    });
})();