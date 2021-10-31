/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
//Стиль кнопки назад dev wiki
window.BackToTopModern = true;

//Превью избранных через модуль Getdata
window.tooltips_list = [{
    classname: 'tooltip-info',
    parse: '{{#invoke:getdata2|div|<#article#>|Инфо}}'
}
];

/*кастом модули*/
window.AddRailModule = [
    { page: 'Template:RailModule1', prepend: true },
    'Template:RailModule2',
    'Template:RailModule3',
];

/* Рейтинг в профайле */
/* Автор: Не кочан */
(function () {
    if (
        (mw.config.get("wgNamespaceNumber") === 2 && mw.config.get("wgTitle").indexOf("/") === -1) ||
        (mw.config.get("wgNamespaceNumber") === 1200) ||
        (mw.config.get("wgCanonicalNamespace") === "User_blog" && mw.config.get("wgTitle").indexOf("/") === -1) ||
        (mw.config.get("wgCanonicalSpecialPageName") === "Contributions") ||
        (mw.config.get("wgCanonicalSpecialPageName") === "UserProfileActivity")
    ) {
        mw.loader.using(["mediawiki.api"], function () {
            const rating_global = new mw.Title("Рейтинг за всё время", 10).getPrefixedText();
            const rating_seasonal = new mw.Title("Рейтинг сезона", 10).getPrefixedText();

            const api = new mw.Api();

            function getRating(page) {
                return new Promise(
                    function (resolve, reject) {
                        api.get({
                                action: "parse",
                                page: page,
                                format: "json"
                            })
                            .done(
                                function (rating) {
                                    rating = rating.parse.text[Object.keys(rating.parse.text)[0]];
                                    resolve(rating);
                                }
                            )
                            .fail(reject);
                    }
                );
            };

            Promise.all([
                getRating(rating_global),
                getRating(rating_seasonal),
            ]).then(
                function (data) {
                    const ratings = {};

                    ratings.global = {};

                    ratings.global.html = document.createElement("div");
                    ratings.global.html.innerHTML = data[0];

                    ratings.seasonal = {};

                    ratings.seasonal.html = document.createElement("div");
                    ratings.seasonal.html.innerHTML = data[1];

                    function parseRatings(ratingType) {
                        ratingType.rating = [];

                        ratingType.html.placesTable = ratingType.html.querySelector("tbody");
                        ratingType.rating = [];

                        console.log(ratingType);

                        for (var i = 1; i < ratingType.html.placesTable.children.length; i++) {
                            var ratingArray = ratingType.html.placesTable.children[i].innerText.split("\n");
                            var ratingArrayFiltered = ratingArray.filter(
                                function (el) {
                                    return el !== "";
                                }
                            );

                            var ratingIndex = {};
                            ratingIndex.user = ratingArrayFiltered[1];
                            ratingIndex.place = parseInt(ratingArrayFiltered[0]);
                            ratingIndex.score = parseInt(ratingArrayFiltered[2].replace(/−/g, "-"));

                            ratingType.rating.push(ratingIndex);
                        }

                        function checkUser() {
                            var user = mw.config.get("wgTitle").replace(/_/g, " ");
                            var userSplitted = user.split(":")[0];

                            switch (mw.config.get("wgTitle").indexOf("/") !== -1) {
                                case true:
                                    return userSplitted.split("/")[1];
                                case false:
                                    return userSplitted;
                            }
                        }

                        var ratingUser = ratingType.rating.filter(
                            function (el) {
                                return el.user === checkUser();
                            }
                        )[0];

                        if (typeof ratingUser != "undefined") {
                            ratingType.current = ratingUser;
                        }

                        return ratingType;
                    }

                    parseRatings(ratings.global);
                    parseRatings(ratings.seasonal);

                    if (typeof ratings.global.current != "undefined" || typeof ratings.seasonal.current != "undefined") {
                        const ratingIndicators = document.createElement("div");
                        ratingIndicators.classList.add("nkch-profile-rating");

                        mw.util.addCSS(
                            ".nkch-profile-rating { display: flex; gap: 5px; justify-content: center; inline-size: 138px; }" +
                            ".nkch-profile-rating__indicator { background-color: var(--theme-accent-color); border-radius: 5px; color: var(--theme-accent-label-color); cursor: pointer; display: block; flex-wrap: wrap; padding: 3px 12px; text-decoration: none !important; transform: skewX(-25deg); transition: background-color .3s; }" +
                            ".nkch-profile-rating__indicator:hover { background: var(--theme-accent-color--hover); color: var(--theme-accent-label-color); }" +
                            ".nkch-profile-rating__indicator-content { align-items: center; display: flex; gap: 3px; transform: skewX(25deg); }" +
                            ".nkch-profile-rating__indicator-label { font-weight: bold; }" +

                            ".nkch-profile-rating__indicator--global { animation: profile-rating-slide-in--global .3s ease; }" +
                            ".nkch-profile-rating__indicator--seasonal { animation: profile-rating-slide-in--seasonal .3s ease; }" +

                            ".nkch-profile-rating__indicator--first { background-color: hsl(51 100% 50%); color: #3a3a3a; }" +
                            ".nkch-profile-rating__indicator--first:hover { background-color: hsl(51 100% 40%); color: #3a3a3a; }" +
                            ".nkch-profile-rating__indicator--first path { fill: #3a3a3a; }" +

                            ".nkch-profile-rating__indicator--second { background-color: hsl(0 0% 75%); color: #3a3a3a; }" +
                            ".nkch-profile-rating__indicator--second:hover { background-color: hsl(0 0% 65%); color: #3a3a3a; }" +
                            ".nkch-profile-rating__indicator--second path { fill: #3a3a3a; }" +

                            ".nkch-profile-rating__indicator--third { background-color: hsl(30 61% 50%); color: white }" +
                            ".nkch-profile-rating__indicator--third:hover { background-color: hsl(30 61% 40%); color: white }" +
                            ".nkch-profile-rating__indicator--third path { fill: white }" +

                            "@keyframes profile-rating-slide-in--global { 0% { opacity: 0; transform: skewX(-25deg) translateX(10px); } }" +
                            "@keyframes profile-rating-slide-in--seasonal { 0% { opacity: 0; transform: skewX(-25deg) translateX(10px); } 25% { opacity: 0; transform: skewX(-25deg) translateX(10px); } }"
                        );

                        function setupIndicator(type) {
                            var ratingIndicator = document.createElement("a");
                            ratingIndicator.classList.add("nkch-profile-rating__indicator");

                            switch (type) {
                                case "global":
                                    ratingIndicator.title = "Участник занимает " + ratings.global.current.place + "-е место в постоянном рейтинге конкурсов со счётом в " + ratings.global.current.score + " очк.";
                                    ratingIndicator.classList.add("nkch-profile-rating__indicator--global");
                                    ratingIndicator.href = mw.util.getUrl(rating_global);

                                    switch (ratings.global.current.place) {
                                        case 1:
                                            ratingIndicator.classList.add("nkch-profile-rating__indicator--first");
                                            break;
                                        case 2:
                                            ratingIndicator.classList.add("nkch-profile-rating__indicator--second");
                                            break;
                                        case 3:
                                            ratingIndicator.classList.add("nkch-profile-rating__indicator--third");
                                            break;
                                    }
                                    break;
                                case "seasonal":
                                    ratingIndicator.title = "Участник занимает " + ratings.seasonal.current.place + "-е место в рейтинге текущего конкурсного сезона со счётом в " + ratings.seasonal.current.score + " очк.";
                                    ratingIndicator.classList.add("nkch-profile-rating__indicator--seasonal");
                                    ratingIndicator.href = mw.util.getUrl(rating_seasonal);

                                    switch (ratings.seasonal.current.place) {
                                        case 1:
                                            ratingIndicator.classList.add("nkch-profile-rating__indicator--first");
                                            break;
                                        case 2:
                                            ratingIndicator.classList.add("nkch-profile-rating__indicator--second");
                                            break;
                                        case 3:
                                            ratingIndicator.classList.add("nkch-profile-rating__indicator--third");
                                            break;
                                    }
                                    break;
                            }

                            var ratingIndicatorContent = document.createElement("div");
                            ratingIndicatorContent.classList.add("nkch-profile-rating__indicator-content");

                            ratingIndicator.appendChild(ratingIndicatorContent);

                            var ratingIndicatorIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            ratingIndicatorIcon.classList.add("nkch-profile-rating__indicator-icon");

                            ratingIndicatorIcon.setAttribute("height", 20);
                            ratingIndicatorIcon.setAttribute("width", 20);
                            ratingIndicatorIcon.setAttribute("viewBox", "0 0 24 24");

                            var ratingIndicatorIconSrc = document.createElementNS("http://www.w3.org/2000/svg", "path");

                            switch (type) {
                                case "global":
                                    ratingIndicatorIconSrc.setAttribute("d", "M20.25 2c.966 0 1.75.783 1.75 1.75v3.042a2.75 2.75 0 0 1-1.477 2.438l-6.282 3.28a5 5 0 1 1-4.482 0L3.477 9.23A2.75 2.75 0 0 1 2 6.792V3.75C2 2.783 2.784 2 3.75 2h16.5ZM12 13.48a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM15.5 3.5h-7v6.662l3.384 1.767a.25.25 0 0 0 .232 0L15.5 10.16V3.5Zm-8.5 0H3.75a.25.25 0 0 0-.25.25v3.043c0 .466.259.893.671 1.108L7 9.377V3.499Zm13.25 0H17v5.878L19.829 7.9a1.25 1.25 0 0 0 .671-1.108V3.75a.25.25 0 0 0-.25-.25Z");
                                    break;
                                case "seasonal":
                                    ratingIndicatorIconSrc.setAttribute("d", "M13.238 3.272a1.75 1.75 0 0 0-2.475 0L7.05 6.984A6.999 6.999 0 0 0 11.25 18.89v2.359a.75.75 0 0 0 1.5 0V18.89a6.999 6.999 0 0 0 4.199-11.907l-3.712-3.712ZM12.75 17.38v-5.63a.75.75 0 0 0-1.5 0v5.63a5.499 5.499 0 0 1-3.138-9.336l3.711-3.711a.25.25 0 0 1 .354 0l3.711 3.711a5.499 5.499 0 0 1-3.138 9.336Z");
                                    break;
                            }

                            ratingIndicatorIconSrc.setAttribute("fill", "var(--theme-accent-label-color)");

                            ratingIndicatorIcon.appendChild(ratingIndicatorIconSrc);

                            var ratingIndicatorLabel = document.createElement("div");
                            ratingIndicatorLabel.classList.add("nkch-profile-rating__indicator-label");

                            switch (type) {
                                case "global":
                                    ratingIndicatorLabel.innerHTML = "№&nbsp" + ratings.global.current.place;
                                    break;
                                case "seasonal":
                                    ratingIndicatorLabel.innerHTML = "#" + ratings.seasonal.current.place;
                                    break;
                            }

                            ratingIndicatorContent.appendChild(ratingIndicatorIcon);
                            ratingIndicatorContent.appendChild(ratingIndicatorLabel);

                            ratingIndicators.appendChild(ratingIndicator);
                        }

                        if (typeof ratings.global.current != "undefined") {
                            setupIndicator("global");
                        }

                        if (typeof ratings.seasonal.current != "undefined") {
                            setupIndicator("seasonal");
                        }

                        function mastheadCheck() {
                            switch (document.querySelectorAll(".user-identity-avatar").length > 0) {
                                case true:
                                    document.querySelector(".user-identity-avatar").appendChild(ratingIndicators);
                                    return;
                                case false:
                                    setTimeout(mastheadCheck, 500);
                                    break;
                            }
                        }

                        mastheadCheck();
                    }
                }
            )
        })
    }
})();


/* Параллаксный фон */
/* Автор: Не кочан */
//
$(document).ready(
    function () {
        $(window).bind("scroll",
            function (e) {
                parallaxScroll();
            }
        );

        function parallaxScroll() {
            var scrolled = $(window).scrollTop();
            $(".fandom-community-header__background").css("background-position-y", (0 - (scrolled / 8)) + "px");
        };
    }
);