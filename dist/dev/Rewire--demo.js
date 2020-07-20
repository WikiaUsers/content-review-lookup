(function (window, $, mw) {
    var wgPageName = mw.config.get('wgPageName');
    if (!/^Rewire(?:\/[\w-]+)?$/.test(wgPageName)) return;

    mw.hook('wikipage.content').add(function ($content) {
        var sandbox = $content[0].querySelector('div[data-enable-rewire-button-label][data-add-content-button-label][data-demo-section]:not(.demoscript-loaded)');
        if (!sandbox) return;

        var Array = window.Array,
            api = new mw.Api(),
            document = window.document;

        var controls = document.createElement('div');
        controls.style.margin = sandbox.style.margin;

        var enableRewireButton = document.createElement('button');
        enableRewireButton.appendChild(document.createTextNode(sandbox.dataset.enableRewireButtonLabel));
        enableRewireButton.addEventListener('click', function () {
            enableRewireButton.disabled = true;
            importArticles({type: 'script', articles: ['u:dev:MediaWiki:Rewire.js']});
        });
        mw.hook('dev.rewire').add(function (rewire) {
            if (window.dev && (window.dev.rewire === rewire)) enableRewireButton.disabled = true;
        });

        var addContentButton = document.createElement('button');
        addContentButton.appendChild(document.createTextNode(sandbox.dataset.addContentButtonLabel));
        addContentButton.addEventListener('click', function () {
            addContentButton.disabled = true;
            api.get({
                action: 'parse',
                page: wgPageName,
                prop: ['text'],
                section: sandbox.dataset.demoSection,
            }).done(function (response) {
                var container = document.createElement('div');
                container.innerHTML = response.parse.text['*'];
                container = container.querySelector('div.mw-collapsible.mw-collapsed');
                if (!container) return;
                container.classList.remove('mw-collapsed');

                Array.prototype.forEach.call(container.getElementsByTagName('script'), function (taintedScript) {
                    var untaintedScript = document.createElement('script');
                    untaintedScript.innerHTML = taintedScript.innerHTML;
                    taintedScript.parentNode.replaceChild(untaintedScript, taintedScript);
                });

                if (window.dev && window.dev.rewire) window.dev.rewire.prepare(container);
                else container.style.borderStyle = 'dotted';

                var wrapper = document.createElement('div');
                wrapper.appendChild(container);
                sandbox.insertBefore(wrapper, controls.nextSibling);
                mw.hook('wikipage.content').fire($(wrapper));
            }).always(function () { addContentButton.disabled = false; });
        });

        controls.append(enableRewireButton, document.createTextNode('\u00a0'), addContentButton);
        while (sandbox.firstChild) sandbox.removeChild(sandbox.firstChild);
        sandbox.appendChild(controls);
        sandbox.classList.add('demoscript-loaded');
    });
}(this, jQuery, mediaWiki));