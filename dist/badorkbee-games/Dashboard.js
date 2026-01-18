mw.loader.using('mediawiki.api', function () {
    if (mw.config.get("wgCanonicalNamespace") == "Project" && mw.config.get("wgTitle") == "Dashboard" && window.dashboardInit != true) {
        window.dashboardInit = true;

        const api = new mw.Api();
        const userGroups = mw.config.get("wgUserGroups");

        function includesMultiple(needles, haystack) {
            for (const needle of needles) {
                if (haystack.includes(needle)) {
                    return true;
                }
            }
            return false;
        }

        function query(page) {
            return api.get({
                action: "query",
                list: "querypage",
                qppage: page,
                qplimit: "max"
            });
        }

        const dashboardModules = document.querySelectorAll(".bdb-dashboard-module");
        for (const node of dashboardModules) {

            let designatedUserGroups = node.dataset.requireGroup;
            if (designatedUserGroups) {

                designatedUserGroups = designatedUserGroups.split(",");
                if (includesMultiple(designatedUserGroups, userGroups)) {

                    node.style.display = "inherit";

                }

            }
        }

        const pageCounts = document.querySelectorAll(".bdb-dashboard-module-count");
        for (const node of pageCounts) {

            let requestedPage = node.dataset.pageName;
            if (requestedPage) {

                query(requestedPage)
                    .then(function (data) {
                        if (data.query && data.query.querypage.results) {
                            node.textContent = data.query.querypage.results.length;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }

    }
});