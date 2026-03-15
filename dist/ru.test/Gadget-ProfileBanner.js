mw.loader.using(["mediawiki.api"]).then(
    function () {
        if (
            mw.config.get("wgNamespaceNumber") === 2 && mw.config.get("profileUserName") === mw.config.get("wgTitle") ||
            mw.config.get("wgNamespaceNumber") === 3 && mw.config.get("profileUserName") === mw.config.get("wgTitle") ||
            mw.config.get("wgNamespaceNumber") === 1200 && mw.config.get("profileUserName") === mw.config.get("wgTitle") ||
            mw.config.get("wgNamespaceNumber") === 500 && mw.config.get("profileUserName") === mw.config.get("wgTitle") ||
            mw.config.get("wgNamespaceNumber") === -1 && mw.config.get("wgCanonicalSpecialPageName") === "Contributions" ||
            mw.config.get("wgNamespaceNumber") === -1 && mw.config.get("wgCanonicalSpecialPageName") === "UserProfileActivity"
        ) {
            const api = new mw.Api();

            const params = {
                action: "query",
                prop: "revisions",
                titles: mw.Title.makeTitle(2, mw.config.get("profileUserName") + "/banner.json").getPrefixedText(),
                rvslots: "*",
                rvprop: "content",
                formatversion: 2,
                format: "json"
            };

            api.get(params).done(
                function (data) {
                    if (data.query.pages[0].missing !== true) {
                        const bannerParams = JSON.parse(data.query.pages[0].revisions[0].slots.main.content);

                        if (Object.keys(bannerParams).length > 0) {
                            mw.util.addCSS(":root { --profile-hero-color: var(--theme-page-background-color); }");

                            const heroBanner = document.createElement("div");
                            heroBanner.classList.add("profile-hero");

                            if (typeof bannerParams.color !== "undefined") {
                                mw.util.addCSS(":root { --profile-hero-color: " + bannerParams.color + "; }");
                            };

                            mw.util.addCSS(".profile-hero { background: var(--profile-hero-color); border-radius: 3px 3px 0 0; height: 260px; margin-top: 12px; overflow: hidden; position: relative; }");
                            mw.util.addCSS(".action-edit .profile-hero, .ve-activated .profile-hero { height: 0; }");

                            document.querySelector(".page").before(heroBanner);

                            const heroBannerImage = document.createElement("div");
                            heroBannerImage.classList.add("profile-hero__image");

                            if (typeof bannerParams.image !== "undefined") {
                                heroBannerImage.style.backgroundImage = "url(" + bannerParams.image + ")";
                            };

                            mw.util.addCSS(".profile-hero__image { background-position: center; background-size: cover; height: 100%; margin: 0 auto; max-width: 1236px; }");
                            mw.util.addCSS(".profile-hero__image::after { background: none; content: ''; display: block; width: 100%; height: 100%; }");
                            mw.util.addCSS(".is-content-expanded .profile-hero__image::after { background: linear-gradient(to right, var(--profile-hero-color), transparent 8%, transparent 92%, var(--profile-hero-color)); }");

                            heroBanner.appendChild(heroBannerImage);

                            if (mw.config.get("wgUserName") === mw.config.get("profileUserName")) {
                                const heroBannerButton = document.createElement("a");
                                heroBannerButton.classList.add("profile-hero__button");

                                heroBannerButton.href = mw.util.getUrl(mw.Title.makeTitle(2, mw.config.get("profileUserName") + "/banner.json").getPrefixedText());

                                mw.util.addCSS(".profile-hero__button { height: 100%; position: absolute; top: 0; transition: .3s; width: 100%; }");
                                mw.util.addCSS(".profile-hero__button:hover { background-color: #00000070; cursor: pointer; }");

                                heroBannerButton.setAttribute("target", "_blank");
                                heroBannerButton.setAttribute("role", "button");

                                heroBanner.appendChild(heroBannerButton);

                                const heroBannerButtonIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                heroBannerButtonIcon.setAttributeNS(null, "viewBox", "0 0 24 24");

                                heroBannerButtonIcon.classList.add("wds-icon", "profile-hero__icon");

                                const heroBannerButtonIconSrc = document.createElementNS("http://www.w3.org/2000/svg", "use");
                                heroBannerButtonIconSrc.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-pencil");

                                mw.util.addCSS(".profile-hero__icon { fill: white; position: absolute; right: 15px; top: -100%; transition: .2s; }");
                                mw.util.addCSS(".profile-hero__button:hover .profile-hero__icon { top: 15px; }");

                                heroBannerButton.appendChild(heroBannerButtonIcon);
                                heroBannerButtonIcon.appendChild(heroBannerButtonIconSrc);
                            };

                            mw.util.addCSS(".page { margin-top: 0; }");
                            mw.util.addCSS("html:not(.ve-activated) .page.has-right-rail .page__main { border-top-left-radius: 0; }");
                            mw.util.addCSS("html:not(.ve-activated) .page.has-right-rail .page__right-rail { border-top-right-radius: 0; }");
                        }
                    }
                }
            );
        }
    }
);