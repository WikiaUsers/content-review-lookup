// INNE MODYFIKACJE
;(function () {
    function ready () {
        if (!window.hasOwnProperty('DOMTools')) return setTimeout(ready, 1000);
        run();
    }
 
    function run () {
        // AVATARY W HISTORII WĄTKÓW NA TABLICY
        ;(function () {
            var fixDimensions, avatars;
 
            if (!document.getElementById('WallThreadHistory')) return;
 
            fixDimensions = function (avatar) {
                var src = avatar.getAttribute('src');
                avatar.setAttribute('height', '50');
                avatar.setAttribute('width', '50');
                avatar.setAttribute('src', src.slice(0, -2) + 50);
            };
 
            avatars = DOMTools.queryAll('.WallHistory #WallThreadHistory .avatar');
            avatars.forEach(fixDimensions);
        })();
        // Add Discord widget code from the English Bloodborne Wiki
        // WidgetBot: https://github.com/widgetbot-io/widgetbot
        // Crate: https://github.com/widgetbot-io/widgetbot/tree/2.5/packages/crate
        ;(function () {
            var regex = /"(\w+)":/g;
 
            var crateOptions = {
                channel: '692116769501872128',
                server: '692113215601115246',
                shard: 'https://e.widgetbot.io',
                color: '#16161d',
                location: ['bottom', 'right']
            };
 
            var options = JSON.stringify(crateOptions, null, 4);
            options = options.replace(regex, '$1:');
 
            var popupData = {
                content: 'Chcesz porozmawiać o filmach lub serialach? Zapraszamy na nasz server discord!',
                timeout: 10000,
                avatar: 'https://static.wikia.nocookie.net/netflixpedia/images/7/71/Netflix_-_logo.jpg/revision/latest/scale-to-width-down/240?cb=20201119204232&path-prefix=pl'
            };
 
            var popup = JSON.stringify(popupData, null, 4);
            popup = popup.replace(regex, '$1:');
 
            var script = document.createElement('script');
            script.setAttribute('id', 'WidgetCrate');
            script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3');
            script.setAttribute('async', '');
            script.setAttribute('defer', '');
            script.textContent = 'var crate = new Crate(' + options + ');\n\n';
            script.textContent += 'crate.notify(' + popup + ')';
 
            DOMTools.appendTo(document.head, script);
        })();
    }
 
    ready();
})();