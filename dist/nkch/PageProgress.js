if (mw.config.get("wgNamespaceNumber") === 0 && !mw.config.get("wgIsMainPage")) {
    switch (!!document.querySelector(".sticky-modules-wrapper")) {
        case true:
            pageProgressInit();
            break;
        case false:
            const observer = new MutationObserver(
                function(mutationList) {
                    mutationList.forEach(function(mutation) {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.classList.contains("sticky-modules-wrapper")) {
                                pageProgressInit();
                                observer.disconnect();
                                return;
                            }   
                        });
                    });
                }
            );
    
            observer.observe(document.querySelector(".right-rail-wrapper"), {
                childList: true
            });
            break;
    }

    function pageProgressInit() {
        var stickyRail = document.querySelector(".sticky-modules-wrapper");

        var progress = document.createElement("div");
        progress.classList.add("rail-module", "nkch-page-progress")

        var progressBar = document.createElement("div");
        progressBar.classList.add("nkch-page-progress__bar");

        var progressValue = document.createElement("div");
        progressValue.classList.add("nkch-page-progress__value");
        progressValue.style.width = 0;

        progress.append(progressBar);
        progressBar.append(progressValue);
        stickyRail.prepend(progress);

        function getProgressValue() {
            var rect = content.getBoundingClientRect();
            progressValue.style.width = (rect.top < 0 ? ((0 - rect.top) / content.offsetHeight).toFixed(2) * 100 : 0) + "%";
        }

        var progressTime = document.createElement("div");
        progressTime.classList.add("nkch-page-progress__reading-time");

        var progressTimeIcon = $('<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-clock-small"></use></svg>')[0];
        progressTimeIcon.classList.add("nkch-page-progress__reading-time-icon");
        progressTime.append(progressTimeIcon);

        var progressTimeValue = document.createElement("span");
        progressTimeValue.classList.add("nkch-page-progress__reading-time-value");
        progressTime.append(progressTimeValue);

        function getReadingTime() {
            var time = Math.ceil(content.innerText.trim().split(/\s+/).length / 200);
            progressTimeValue.innerText = time + " мин. — среднее время прочтения";
        }

        progress.append(progressTime);

        var content = document.querySelector(".page-content");
        document.addEventListener("scroll", getProgressValue);

        getProgressValue();
        getReadingTime();
    }
    
    importArticles({
        type: "style",
        article: "u:nkch:MediaWiki:PageProgress.css"
    });
}