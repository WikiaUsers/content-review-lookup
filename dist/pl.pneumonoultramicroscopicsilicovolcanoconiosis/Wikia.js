       ;(function () {
            var regex = /"(\w+)":/g;
 
            var crateOptions = {
                server: '323557016159125515', // Star Wars Fanonpedia
                channel: '323557016159125515', // #ogólny
                shard: 'https://e.widgetbot.io',
                color: '#738ad6',
                location: ['bottom', 'right']
            };
 
            var options = JSON.stringify(crateOptions, null, 4);
            options = options.replace(regex, '$1:');
 
            var popupData = {
                content: 'Chcesz porozmawiać z innymi fanami? Wbij na nasz serwer!',
                timeout: 10000,
                avatar: 'https://vignette.wikia.nocookie.net/pneumonoultramicroscopicsilicovolcanoconiosis/images/5/54/D.png/revision/latest?cb=20200829110553&path-prefix=pl'
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
 
    addOnloadHook(ready);
})();