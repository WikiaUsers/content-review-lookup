(function () {
    window.nkch = window.nkch || {};
    nkch.banner = nkch.banner || {};

    var API;

    var config = {
        profileUserName: mw.config.get("profileUserName"),
        wgCanonicalSpecialPageName: mw.config.get("wgCanonicalSpecialPageName"),
        wgNamespaceNumber: mw.config.get("wgNamespaceNumber"),
        wgTitle: mw.config.get("wgTitle"),
        wgUserName: mw.config.get("wgUserName")
    };

    function init() {
        const cssRules = [
            ":root { --profile-hero-color: var(--theme-page-background-color); }",
            ".profile-hero { background: var(--profile-hero-color); border-radius: 3px 3px 0 0; height: 260px; margin-top: 12px; overflow: hidden; position: relative; }",
            ".action-edit .profile-hero, .ve-activated .profile-hero { height: 0; }",
            ".profile-hero__image { background-position: center; background-size: cover; height: 100%; margin: 0 auto; max-width: 1236px; }",
            ".profile-hero__image::after { background: none; content: ''; display: block; width: 100%; height: 100%; }",
            ".is-content-expanded .profile-hero__image::after { background: linear-gradient(to right, var(--profile-hero-color), transparent 8%, transparent 92%, var(--profile-hero-color)); }",
            ".profile-hero__button { height: 100%; position: absolute; top: 0; transition: .3s; width: 100%; }",
            ".profile-hero__button:hover { background-color: #00000050; cursor: pointer; }",
            ".profile-hero__icon { background-color: #0005; border-radius: 3px; fill: white; height: 38px; opacity: 0; padding: 10px; position: absolute; right: 15px; top: 25px; transition: .2s; width: 38px; }",
            ".profile-hero__button:hover .profile-hero__icon { opacity: 1; top: 15px; }",
            ".page { margin-top: 0; }",
            "html:not(.ve-activated) .page.has-right-rail .page__main { border-top-left-radius: 0; }",
            "html:not(.ve-activated) .page.has-right-rail .page__right-rail { border-top-right-radius: 0; }",
        ];

        const title = mw.Title.makeTitle(2, config.profileUserName + "/banner.json").getPrefixedText();

        const params = {
            action: "query",
            prop: "revisions",
            titles: title,
            rvslots: "*",
            rvprop: "content",
            formatversion: 2,
            format: "json"
        };

        API.get(params)
            .done(function (data) {
                if (data.query.pages[0].missing !== true) {
                    const bannerParams = JSON.parse(data.query.pages[0].revisions[0].slots.main.content);

                    if (Object.keys(bannerParams).length > 0) {
                        if (typeof bannerParams.color !== "undefined") {
                            cssRules.push(":root { --profile-hero-color: " + bannerParams.color + "; }");
                        };

                        const profileHero = document.createElement("div");
                        profileHero.classList.add("profile-hero");

                        document.querySelector(".page").before(profileHero);

                        const profileHero__image = document.createElement("div");
                        profileHero__image.classList.add("profile-hero__image");

                        if (typeof bannerParams.image !== "undefined") {
                            profileHero__image.style.backgroundImage = "url(" + bannerParams.image + ")";
                        };

                        profileHero.appendChild(profileHero__image);

                        if (config.wgUserName === config.profileUserName) {
                            const profileHero__button = document.createElement("a");
                            profileHero__button.classList.add("profile-hero__button");

                            profileHero__button.href = mw.util.getUrl(title);

                            profileHero__button.setAttribute("target", "_blank");
                            profileHero__button.setAttribute("role", "button");

                            profileHero.appendChild(profileHero__button);

                            const profileHero__icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            profileHero__icon.setAttributeNS(null, "viewBox", "0 0 24 24");

                            profileHero__icon.classList.add("wds-icon", "profile-hero__icon");

                            const profileHero__iconSrc = document.createElementNS("http://www.w3.org/2000/svg", "use");
                            profileHero__iconSrc.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-pencil-small");

                            profileHero__button.appendChild(profileHero__icon);
                            profileHero__icon.appendChild(profileHero__iconSrc);
                        };
                    }

                    mw.util.addCSS(cssRules.join(" "));
                }
            });
    }

    mw.loader.using(["mediawiki.api", "mediawiki.util"], function () {
        if (!nkch.banner.isActive) {
            if (
                config.wgNamespaceNumber === 2 && config.profileUserName === config.wgTitle ||
                config.wgNamespaceNumber === 3 && config.profileUserName === config.wgTitle ||
                config.wgNamespaceNumber === 1200 && config.profileUserName === config.wgTitle ||
                config.wgNamespaceNumber === 500 && config.profileUserName === config.wgTitle ||
                config.wgNamespaceNumber === -1 && config.wgCanonicalSpecialPageName === "Contributions" ||
                config.wgNamespaceNumber === -1 && config.wgCanonicalSpecialPageName === "UserProfileActivity"
            ) {
                nkch.banner.isActive = true;

                API = new mw.Api();

                init();
            }
        }
    });
})();