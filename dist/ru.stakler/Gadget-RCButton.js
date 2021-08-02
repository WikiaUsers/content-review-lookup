/* Adding a RecentChanges button to the top toolbar */
mw.loader.using(["mediawiki.api"])
    .then(
        function () {
            return new mw.Api().loadMessagesIfMissing(["recentchanges"]);
        }
    )
    .then(
        function () {
            document.querySelectorAll(".wiki-tools__theme-switch").forEach(
                function (e) {
                    var rcButton = document.createElement("a");
                    rcButton.classList.add("wds-button", "wds-is-secondary");
                    rcButton.title = mw.message("recentchanges");
					rcButton.href = mw.Title.makeTitle(-1, "RecentChanges").getPrefixedText();

                    const rcButton_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    rcButton_icon.setAttributeNS(null, "viewBox", "0 0 18 18");
                    rcButton_icon.classList.add("wds-icon", "wds-icon-small");
                    rcButton.appendChild(rcButton_icon);
        
                    var rcButton_icon_src = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    rcButton_icon_src.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-activity-small");
                    rcButton_icon.appendChild(rcButton_icon_src);

                    e.after(rcButton);
                }
            );
        }
    );