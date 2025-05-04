mw.loader.using("mediawiki.api").then(
    function () {
        var linksList = [{
                innerHTML: 'Ссылки сюда',
                href: mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/" + 'Special:WhatLinksHere/' + mw.config.get("wgPageName")
            },
            {
                innerHTML: 'Связанные правки',
                href: mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/" + 'Special:RecentChangesLinked/' + mw.config.get("wgPageName")
            },
            {
                innerHTML: 'Загрузить файл',
                href: mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/" + 'Special:Upload'
            },
            {
                innerHTML: 'Служебные страницы',
                href: mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/" + 'Special:SpecialPages'
            },
            {
                innerHTML: 'Сведения о странице',
                href: mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/wiki/" + mw.config.get("wgPageName") + '?action=info'
            }
        ];

        for (var i in linksList) {
            var globalMenu = $(".wiki-page-header__title");
            var item = document.createElement("li");
            var item_link = document.createElement("a");

            item_link.innerHTML = linksList[i].innerHTML;
            item_link.href = linksList[i].href;

            globalMenu[globalMenu.length - 1].after(item);
            item.appendChild(item_link);
        };
    })