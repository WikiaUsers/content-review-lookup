// Displays a label in the page header if there are comments in the code
(function() {
    var pageName = mw.config.get('wgPageName');
    fetch('https://stalker.fandom.com/ru/api.php?action=query&prop=revisions&titles=' + pageName + '&rvslots=%2A&rvprop=content&formatversion=2&format=json')
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
        	if (!json.query.pages[0].revisions) return;
            if (json.query.pages[0].revisions[0].slots.main.content.match(/<!--[^\s-]|[^\s-]-->|<!--\n[^\s!<>-]|[^\s!<>-]\n-->/g)) {
                var bottomHeaderContainer = document.querySelector('header .fandom-community-header__local-navigation');
                bottomHeaderContainer.style.display = 'flex';
                var commentIndicator = document.createElement('div');
                commentIndicator.classList.add('wds-tabs__tab-label');
                commentIndicator.innerText = 'В коде есть комментарии';
                bottomHeaderContainer.append(commentIndicator);
            }
        });
})();