mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(function () {
    const gadgetPrefName = 'enableTitleNameGadget';

    // Check if user has enabled the gadget in Preferences
    const gadgetEnabled = mw.user.options.get(gadgetPrefName);

    // Load NameData module
    new mw.Api().get({
        action: 'parse',
        page: 'Module:NameData',
        prop: 'wikitext'
    }).done(function (data) {
        let nameData = {};
        try {
            let wikitext = data.parse.wikitext['*'];
            let match = wikitext.match(/possibleNames\s*=\s*{([\s\S]*?)}/);
            if (match) {
                let entries = match[1].split(/,\s*\n?/);
                entries.forEach(function (entry) {
                    let kv = entry.match(/\["([^"]+)"\]\s*=\s*"([^"]+)"/);
                    if (kv) nameData[kv[1]] = kv[2];
                });
            }
        } catch (e) {
            console.error('Failed to parse NameData module', e);
        }

        // Replace or revert title1 spans
        function updateTitle1Spans(enabled) {
            document.querySelectorAll('[data-title1]').forEach(function (el) {
                if (enabled) {
                    // Replace [[File:...]] with name from NameData
                    const content = el.getAttribute('data-title1');
                    const match = content.match(/\[\[File:([^\]|]+)(?:\|[^\]]*)?\]\]/);
                    if (match && nameData[match[1]]) {
                        el.textContent = nameData[match[1]];
                    }
                } else {
                    // Revert to original image
                    el.innerHTML = el.getAttribute('data-title1-original');
                }
            });
        }

        // Initial run
        updateTitle1Spans(gadgetEnabled);

        // Optional: listen for preference changes dynamically
        mw.user.options.bind(gadgetPrefName, function(val) {
            updateTitle1Spans(val);
        });
    });
});