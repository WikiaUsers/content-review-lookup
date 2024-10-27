document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === "/de/wiki/Xorum_Wiki:Interlanguage") {
        var pageHeaderTop = document.querySelector('.page-header__top');
        var pageHeaderLanguages = document.querySelector('.page-header__languages');
        
        if (pageHeaderTop && pageHeaderLanguages) {
            var newDiv = document.createElement('div');
            newDiv.classList.add('page-header__variants');
            newDiv.innerHTML = `
                <div class="wds-dropdown">
                    <div class="wds-dropdown__toggle">Deutschland
                        <svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron">
                            <use xlink:href="#wds-icons-dropdown-tiny"></use>
                        </svg>
                    </div>
                    <div class="wds-dropdown__content">
                        <ul class="wds-list wds-is-linked">
                            <li id="ca-varlang-1"><a href="/de/wiki/Xorum_Wiki:Interlanguage/at" data-tracking-label="variant-de-at">Österreich</a></li>
                            <li id="ca-varlang-2"><a href="/de/wiki/Xorum_Wiki:Interlanguage/ch" data-tracking-label="variant-de-ch">Schweiz</a></li>
                        </ul>
                    </div>
                </div>
            `;
            pageHeaderTop.insertBefore(newDiv, pageHeaderLanguages);
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === "/de/wiki/Xorum_Wiki:Interlanguage/at") {
        var pageHeaderTop = document.querySelector('.page-header__top');
        var pageHeaderLanguages = document.querySelector('.page-header__languages');
        
        if (pageHeaderTop && pageHeaderLanguages) {
            var newDiv = document.createElement('div');
            newDiv.classList.add('page-header__variants');
            newDiv.innerHTML = `
                <div class="wds-dropdown">
                    <div class="wds-dropdown__toggle">Österreich
                        <svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron">
                            <use xlink:href="#wds-icons-dropdown-tiny"></use>
                        </svg>
                    </div>
                    <div class="wds-dropdown__content">
                        <ul class="wds-list wds-is-linked">
                            <li id="ca-varlang-0"><a href="/de/wiki/Xorum_Wiki:Interlanguage" data-tracking-label="variant-de">Deutschland</a></li>
                            <li id="ca-varlang-2"><a href="/de/wiki/Xorum_Wiki:Interlanguage/ch" data-tracking-label="variant-de-ch">Schweiz</a></li>
                        </ul>
                    </div>
                </div>
            `;
            pageHeaderTop.insertBefore(newDiv, pageHeaderLanguages);
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === "/de/wiki/Xorum_Wiki:Interlanguage/ch") {
        var pageHeaderTop = document.querySelector('.page-header__top');
        var pageHeaderLanguages = document.querySelector('.page-header__languages');
        
        if (pageHeaderTop && pageHeaderLanguages) {
            var newDiv = document.createElement('div');
            newDiv.classList.add('page-header__variants');
            newDiv.innerHTML = `
                <div class="wds-dropdown">
                    <div class="wds-dropdown__toggle">Schweiz
                        <svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron">
                            <use xlink:href="#wds-icons-dropdown-tiny"></use>
                        </svg>
                    </div>
                    <div class="wds-dropdown__content">
                        <ul class="wds-list wds-is-linked">
                            <li id="ca-varlang-0"><a href="/de/wiki/Xorum_Wiki:Interlanguage" data-tracking-label="variant-de">Deutschland</a></li>
                            <li id="ca-varlang-1"><a href="/de/wiki/Xorum_Wiki:Interlanguage/at" data-tracking-label="variant-de-at">Österreich</a></li>
                        </ul>
                    </div>
                </div>
            `;
            pageHeaderTop.insertBefore(newDiv, pageHeaderLanguages);
        }
    }
});