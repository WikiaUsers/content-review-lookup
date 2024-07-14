mw.hook("wikipage.content").add(function () {
    const variant = (mw.config.get('wgUserVariant') || '').substring(3) || 'zh';
    document.querySelectorAll('.tabber').forEach(tabberCheck);
    function tabberCheck(tabber) {
        var headers = [];
        var defaultTabs = {};
        tabber.querySelectorAll(':scope>.wds-tab__content').forEach(tabberCheckHeader);
        tabber.querySelectorAll(':scope>.wds-tabs__wrapper>.wds-tabs>li').forEach(tabberInsertHeader);

        // 變體預設標籤
        const headerUl = tabber.querySelector(':scope>.wds-tabs__wrapper>.wds-tabs');
        const dataDefault = defaultTabs[variant + 'Default'];
        if (dataDefault) {
            headerUl.querySelectorAll(':scope>.wds-tabs__tab').forEach(hideTab);
            headerUl.childNodes[dataDefault - 1].classList.add('wds-is-current');
            headerUl.insertBefore(headerUl.childNodes[dataDefault - 1], headerUl.childNodes[0]);
            tabber.querySelectorAll(':scope>.wds-tab__content').forEach(hideTab);
            tabber.childNodes[dataDefault].classList.add('wds-is-current');
            tabber.insertBefore(tabber.childNodes[dataDefault], tabber.childNodes[1]);
            return;
        }
        if (['cn', 'my', 'sg'].includes(variant)) {
            const dataHansDefault = defaultTabs.hansDefault;
            if (dataHansDefault) {
                headerUl.querySelectorAll(':scope>.wds-tabs__tab').forEach(hideTab);
                headerUl.childNodes[dataHansDefault - 1].classList.add('wds-is-current');
                headerUl.insertBefore(headerUl.childNodes[dataHansDefault - 1], headerUl.childNodes[0]);
                tabber.querySelectorAll(':scope>.wds-tab__content').forEach(hideTab);
                tabber.childNodes[dataHansDefault].classList.add('wds-is-current');
                tabber.insertBefore(tabber.childNodes[dataHansDefault], tabber.childNodes[1]);
                return;
            }
        }
        if (['hk', 'mo', 'tw'].includes(variant)) {
            const dataHantDefault = defaultTabs.hantDefault;
            if (dataHantDefault) {
                headerUl.querySelectorAll(':scope>.wds-tabs__tab').forEach(hideTab);
                headerUl.childNodes[dataHantDefault - 1].classList.add('wds-is-current');
                headerUl.insertBefore(headerUl.childNodes[dataHantDefault - 1], headerUl.childNodes[0]);
                tabber.querySelectorAll(':scope>.wds-tab__content').forEach(hideTab);
                tabber.childNodes[dataHantDefault].classList.add('wds-is-current');
                tabber.insertBefore(tabber.childNodes[dataHantDefault], tabber.childNodes[1]);
            }
        }

        function tabberCheckHeader(tab, i) {
            var header_i;
            tab.querySelectorAll(':scope>p>.tabber-header').forEach(checkHeader);
            tab.querySelectorAll(':scope>.tabber-header').forEach(checkHeader);
            function checkHeader(header) {
                header_i = header.innerHTML;
                for (var name in header.dataset) {
                    defaultTabs[name] = header.dataset[name];
                    delete header.dataset[name];
                }
                header.remove();
            }
            headers[i] = header_i;
        }
        function tabberInsertHeader(header, i) {
            if (!headers[i]) {
                return;
            }
            header.querySelector('.wds-tabs__tab-label').innerHTML = headers[i];
        }
        function hideTab(tab) {
            tab.classList.remove('wds-is-current');
        }
    }
});