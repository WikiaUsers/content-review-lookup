mw.loader.using("oojs-ui").then(
    function () {
        return new mw.Api().loadMessagesIfMissing(["community-header-pages", "community-header-explore", "community-header-recent-changes", "community-header-random-page", "community-header-community", "community-header-videos", "community-header-images", "community-header-discuss", "community-header-main-page"]);
    }
).then(
    function () {
        $.ajax({
            url: encodeURI(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + "/api/v1/Articles/Details"),
            type: "GET",
            data: {
                controller: "DesignSystemApi",
                method: "getAllElements",
                product: "wikis",
                id: mw.config.get("wgCityId"),
            }
        }).done(
            function (data) {
                function nkchNW(config) {
                    nkchNW.super.call(this, config);
                }

                OO.inheritClass(nkchNW, OO.ui.ProcessDialog);

                nkchNW.static.name = "nkchNW";
                nkchNW.static.title = "Navigation Wizard";
                nkchNW.static.actions = [{
                    label: "Cancel",
                    flags: "safe"
                }];

                nkchNW.prototype.initialize = function () {
                    nkchNW.super.prototype.initialize.apply(this, arguments);
                    this.size = "full";

                    function svgIcon(size, vbHW, src, className) {
                        var buttonIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        buttonIcon.setAttributeNS(null, "viewBox", "0 0 " + vbHW + " " + vbHW);

                        buttonIcon.classList.add(className);

                        buttonIcon.classList.add("wds-icon", "wds-icon-" + size);

                        var buttonSrc = document.createElementNS("http://www.w3.org/2000/svg", "use");
                        buttonSrc.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + src);
                        buttonIcon.appendChild(buttonSrc);

                        return buttonIcon;
                    };

                    var navPreview = document.createElement("div");

                    var navPreview_wrapper = document.createElement("div");
                    navPreview_wrapper.classList.add("WikiaSiteWrapper");
                    navPreview_wrapper.style.margin = "40px auto";
                    navPreview.appendChild(navPreview_wrapper);

                    var navPreview_page = document.createElement("div");
                    navPreview_page.classList.add("WikiaPage");
                    navPreview_wrapper.appendChild(navPreview_page);

                    var navPreview_header = document.createElement("header");
                    navPreview_header.classList.add("wds-community-header");
                    navPreview_header.style.backgroundImage = "url('" + data["community-header"]["background_image"] + "')";
                    navPreview_page.appendChild(navPreview_header);

                    if (data["community-header"].wordmark != undefined) {
                        var navPreview_wordmark = document.createElement("div");
                        navPreview_wordmark.classList.add("wds-community-header__wordmark");
                        navPreview_header.appendChild(navPreview_wordmark);

                        var navPreview_wordmarkImage = document.createElement("img");
                        navPreview_wordmarkImage.setAttribute("src", data["community-header"].wordmark["image-data"].url);
                        navPreview_wordmark.appendChild(navPreview_wordmarkImage);
                    };

                    var navPreview_topContainer = document.createElement("div");
                    navPreview_topContainer.classList.add("wds-community-header__top-container");
                    navPreview_header.appendChild(navPreview_topContainer);

                    var navPreview_sitename = document.createElement("div");
                    navPreview_sitename.classList.add("wds-community-header__sitename");
                    navPreview_topContainer.appendChild(navPreview_sitename);

                    var navPreview_sitenameLink = document.createElement("a");
                    navPreview_sitenameLink.href = "#";
                    navPreview_sitenameLink.innerHTML = data["community-header"].sitename.title.value;
                    navPreview_sitename.appendChild(navPreview_sitenameLink);

                    var navPreview_counter = document.createElement("div");
                    navPreview_counter.classList.add("wds-community-header__counter");
                    navPreview_topContainer.appendChild(navPreview_counter);

                    var navPreview_counterValue = document.createElement("span");
                    navPreview_counterValue.classList.add("wds-community-header__counter-value");
                    navPreview_counterValue.innerHTML = data["community-header"].counter.value;
                    navPreview_counter.appendChild(navPreview_counterValue);

                    var navPreview_counterLabel = document.createElement("span");
                    navPreview_counterLabel.classList.add("wds-community-header__counter-label");
                    navPreview_counterLabel.innerHTML = mw.message("community-header-pages").text();
                    navPreview_counter.appendChild(navPreview_counterLabel);

                    var navPreview_buttons = document.createElement("div");
                    navPreview_buttons.classList.add("wds-community-header__wiki-buttons", "wds-button-group");
                    navPreview_topContainer.appendChild(navPreview_buttons);

                    for (var i in data["community-header"].buttons) {
                        var navPreview_buttons_button;

                        if (data["community-header"].buttons[i].type == "link-button") {
                            navPreview_buttons_button = document.createElement("a");
                            navPreview_buttons_button.classList.add("wds-button", "wds-is-secondary");
                            navPreview_buttons_button.href = "#";

                            navPreview_buttons_button.appendChild(svgIcon("small", 18, data["community-header"].buttons[i]["image-data"].name));
                        } else {
                            navPreview_buttons_button = document.createElement("div");
                            navPreview_buttons_button.classList.add("wds-dropdown");

                            navPreview_buttons_dropdown = document.createElement("div");
                            navPreview_buttons_dropdown.classList.add("wds-button", "wds-is-secondary", "wds-dropdown__toggle");
                            navPreview_buttons_button.appendChild(navPreview_buttons_dropdown);

                            navPreview_buttons_dropdown.appendChild(svgIcon("small", 18, "wds-icons-more"));
                        }
                        navPreview_buttons.appendChild(navPreview_buttons_button);
                    };

                    var navPreview_navigation = document.createElement("div");
                    navPreview_navigation.classList.add("wds-community-header__local-navigation");
                    navPreview_header.appendChild(navPreview_navigation);

                    var navPreview_navigationList_general = document.createElement("ul");
                    navPreview_navigationList_general.classList.add("wds-tabs");
                    navPreview_navigationList_general.id = "nkchNW-general";
                    navPreview_navigation.appendChild(navPreview_navigationList_general);

                    var navPreview_navigationList_common = document.createElement("ul");
                    navPreview_navigationList_common.classList.add("wds-tabs");
                    navPreview_navigationList_common.id = "nkchNW-common";
                    navPreview_navigation.appendChild(navPreview_navigationList_common);

                    var navigationTabs = data["community-header"].navigation.filter(
                        function (a) {
                            return a.type == "dropdown";
                        }
                    );

                    var navDiff = data["community-header"].navigation.length - navigationTabs.length;

                    var navDiffed = data["community-header"].navigation;
                    var discuss = navDiffed.splice(navDiffed.length - navDiff, 1);

                    for (var i in navigationTabs) {
                        var navPreview_navigation_tab;

                    };

                    var navPreview_navigation_explore = document.createElement("li");
                    navPreview_navigation_explore.classList.add("wds-tabs__tab");
                    navPreview_navigationList_common.appendChild(navPreview_navigation_explore);

                    var navPreview_navigation_exploreDropdown = document.createElement("div");
                    navPreview_navigation_exploreDropdown.classList.add("wds-dropdown");
                    navPreview_navigation_explore.appendChild(navPreview_navigation_exploreDropdown);

                    var navPreview_navigation_exploreDropdownLabel = document.createElement("div");
                    navPreview_navigation_exploreDropdownLabel.classList.add("wds-tabs__tab-label", "wds-dropdown__toggle");
                    navPreview_navigation_exploreDropdown.appendChild(navPreview_navigation_exploreDropdownLabel);

                    navPreview_navigation_exploreDropdownLabel.appendChild(svgIcon("tiny", 12, "wds-icons-book-tiny"));

                    var navPreview_navigation_exploreDropdown_text = document.createElement("span");
                    navPreview_navigation_exploreDropdown_text.innerHTML = mw.message("community-header-explore").text();
                    navPreview_navigation_exploreDropdownLabel.appendChild(navPreview_navigation_exploreDropdown_text);

                    navPreview_navigation_exploreDropdownLabel.appendChild(svgIcon("tiny", 12, "wds-icons-dropdown-tiny", "wds-dropdown__toggle-chevron"));

                    var navPreview_navigation_exploreDropdownContent = document.createElement("div");
                    navPreview_navigation_exploreDropdownContent.classList.add("wds-is-not-scrollable", "wds-dropdown__content");
                    navPreview_navigation_exploreDropdown.appendChild(navPreview_navigation_exploreDropdownContent);

                    var navPreview_navigation_exploreDropdownContentList = document.createElement("ul");
                    navPreview_navigation_exploreDropdownContentList.classList.add("wds-list", "wds-is-linked", "wds-has-bolded-items");
                    navPreview_navigation_exploreDropdownContent.appendChild(navPreview_navigation_exploreDropdownContentList);

                    for (var i in navDiffed[navDiffed.length - 1].items) {
                        var navPreview_navigation_exploreDropdownContentList_item = document.createElement("li");
                        navPreview_navigation_exploreDropdownContentList.appendChild(navPreview_navigation_exploreDropdownContentList_item);

                        var navPreview_navigation_exploreDropdownContentList_itemLink = document.createElement("a");
                        navPreview_navigation_exploreDropdownContentList_itemLink.href = "#";
                        navPreview_navigation_exploreDropdownContentList_itemLink.innerHTML = mw.message(navDiffed[navDiffed.length - 1].items[i].title.key).text();
                        navPreview_navigation_exploreDropdownContentList_item.appendChild(navPreview_navigation_exploreDropdownContentList_itemLink);
                    };

                    if (discuss.length > 0) {
                        var navPreview_navigation_discuss = document.createElement("li");
                        navPreview_navigation_discuss.classList.add("wds-tabs__tab");
                        navPreview_navigationList_common.appendChild(navPreview_navigation_discuss);

                        var navPreview_navigation_discussLabel = document.createElement("div");
                        navPreview_navigation_discussLabel.classList.add("wds-tabs__tab-label");
                        navPreview_navigation_discuss.appendChild(navPreview_navigation_discussLabel);

                        var navPreview_navigation_discussLabelLink = document.createElement("a");
                        navPreview_navigation_discussLabelLink.href = "#";
                        navPreview_navigation_discussLabel.appendChild(navPreview_navigation_discussLabelLink);

                        navPreview_navigation_discussLabelLink.appendChild(svgIcon("tiny", 12, discuss[0]["image-data"].name));

                        var navPreview_navigation_discussLabelLink_text = document.createElement("span");
                        navPreview_navigation_discussLabelLink_text.innerHTML = mw.message(discuss[0].title.key);
                        navPreview_navigation_discussLabelLink.appendChild(navPreview_navigation_discussLabelLink_text);
                    };

                    this.content = new OO.ui.StackLayout({
                        items: [new OO.ui.PanelLayout({
                            expanded: false,
                            $content: navPreview
                        }), new OO.ui.PanelLayout({
                            expanded: false,
                            framed: true,
                            padded: true,
                            $content: "sss"
                        })],
                        continuous: true,
                        padded: true
                    });

                    this.$body.append(this.content.$element);
                };

                nkchNW.prototype.getActionProcess = function (action) {
                    var dialog = this;
                    if (action) {
                        return new OO.ui.Process(function () {
                            dialog.close({
                                action: action
                            });
                        });
                    }
                    return nkchNW.super.prototype.getActionProcess.call(this, action);
                };

                var windowManager = new OO.ui.WindowManager();
                $(document.body).append(windowManager.$element);

                var navMenuEditor = new nkchNW();
                windowManager.addWindows([navMenuEditor]);
                windowManager.openWindow(navMenuEditor);
            }
        );
    }
);