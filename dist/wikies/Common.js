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
mw.loader.using("mediawiki.api").then(
    function () {
        var title = mw.config.get("wgTitle");

        if ((mw.config.get("wgNamespaceNumber") === 2 && title.indexOf('/') === -1) ||
            (mw.config.get("wgNamespaceNumber") === 1200) ||
            (mw.config.get("wgCanonicalNamespace") === "User_blog" && title.indexOf('/') === -1) ||
            (mw.config.get("wgCanonicalSpecialPageName") === "Contributions") ||
            (mw.config.get("wgCanonicalSpecialPageName") === "UserProfileActivity")) {
            api = new mw.Api();

            function fetchRating(page) {
                return new Promise(
                    function (resolve, reject) {
                        api.get({
                            action: "parse",
                            page: page,
                            format: "json"
                        }).done(
                            function (rating) {
                                rating = rating.parse.text[Object.keys(rating.parse.text)[0]];
                                resolve(rating);
                            }
                        ).fail(reject);
                    }
                );
            }

            fetchRating("Шаблон:Рейтинг_за_всё_время").then(
                function (ratingTable_global) {
                    fetchRating("Шаблон:Рейтинг_сезона").then(
                        function (ratingTable_seasonal) {
                            var rating_global = [];
                            var rating_seasonal = [];

                            const ratingToParse_global = document.createElement("div");
                            const ratingToParse_seasonal = document.createElement("div");

                            ratingToParse_global.innerHTML = ratingTable_global;
                            ratingToParse_seasonal.innerHTML = ratingTable_seasonal;

                            var places_global = ratingToParse_global.querySelector("tbody");
                            var places_seasonal = ratingToParse_seasonal.querySelector("tbody");

                            for (var i = 1; i < places_global.children.length; i++) {
                                var ratingArray_global = places_global.children[i].innerText.split("\n")
                                var ratingArrayFiltered_global = ratingArray_global.filter(
                                    function (e) {
                                        return e !== "";
                                    }
                                );

                                var ratingIndex_global = {};
                                ratingIndex_global.user = ratingArrayFiltered_global[1];
                                ratingIndex_global.place = parseInt(ratingArrayFiltered_global[0]);
                                ratingIndex_global.score = parseInt(ratingArrayFiltered_global[2]);

                                rating_global.push(ratingIndex_global);
                            }

                            for (var i = 1; i < places_seasonal.children.length; i++) {
                                var ratingArray_seasonal = places_seasonal.children[i].innerText.split("\n")
                                var ratingArrayFiltered_seasonal = ratingArray_seasonal.filter(
                                    function (e) {
                                        return e !== "";
                                    }
                                );

                                var ratingIndex_seasonal = {};
                                ratingIndex_seasonal.user = ratingArrayFiltered_seasonal[1];
                                ratingIndex_seasonal.place = parseInt(ratingArrayFiltered_seasonal[0]);
                                ratingIndex_seasonal.score = parseInt(ratingArrayFiltered_seasonal[2]);

                                rating_seasonal.push(ratingIndex_seasonal);
                            }

                            function checkUser() {
                                var user = title.replace(/_/g, " ");
                                var userSplit = user.split(":");
                                userSplit = userSplit[0];

                                switch (title.indexOf('/') != -1) {
                                    case true:
                                        userSplitSecond = userSplit.split("/");
                                        return userSplitSecond = userSplitSecond[1];
                                    case false:
                                        return userSplitSecond = userSplit;
                                }
                            }

                            var ratingUser_global = rating_global.filter(
                                function (e) {
                                    return e.user == checkUser();
                                }
                            );

                            var ratingUser_seasonal = rating_seasonal.filter(
                                function (e) {
                                    return e.user == checkUser();
                                }
                            );

                            var ratingUser_global = ratingUser_global[0];
                            var ratingUser_seasonal = ratingUser_seasonal[0];

                            if (typeof ratingUser_global != "undefined" || typeof ratingUser_seasonal != "undefined") {
                                function insertinfo() {
                                    const placeInfo = document.createElement("span");

                                    Object.assign(placeInfo.style, {
                                        backgroundColor: "rgba(var(--theme-link-color--rgb),.3)",
                                        blockSize: "24px",
                                        borderRadius: "4px",
                                        display: "inline-block",
                                        marginBlockStart: "12px",
                                        marginInlineEnd: "12px",
                                        overflow: "hidden",
                                        padding: 0,
                                        verticalAlign: "text-bottom"
                                    })

                                    const placeInfo_global = document.createElement("a");
                                    const placeInfo_seasonal = document.createElement("a");

                                    if (typeof ratingUser_global != "undefined") {
                                        placeInfo_global.innerHTML = "#" + ratingUser_global.place;

                                        placeInfo_global.title = "Участник занимает " + ratingUser_global.place + "-е место в постоянном рейтинге конкурсов с " + ratingUser_global.score + " очк.";
                                        placeInfo_global.href = "https://wikies.fandom.com/wiki/Шаблон:Рейтинг_за_всё_время";
                                    }

                                    if (typeof ratingUser_seasonal != "undefined") {
                                        placeInfo_seasonal.innerHTML = "#" + ratingUser_seasonal.place;
+0
                                        placeInfo_seasonal.title = "Участник занимает " + ratingUser_seasonal.place + "-е место в рейтинге текущего конкурсного сезона с " + ratingUser_seasonal.score + " очк.";
                                        placeInfo_seasonal.href = "https://wikies.fandom.com/wiki/Шаблон:Рейтинг_сезона";
                                    }

                                    const placeInfo_styles = {
                                        cursor: "help",
                                        display: "inline-block",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        lineHeight: "1.5",
                                        padding: "3px 8px",
                                        verticalAlign: "text-bottom"
                                    }

                                    Object.assign(placeInfo_global.style, placeInfo_styles);
                                    Object.assign(placeInfo_seasonal.style, placeInfo_styles);

                                    switch (ratingUser_global.place) {
                                        case 1:
                                            placeInfo_global.style.color = "black";
                                            placeInfo_global.style.backgroundColor = "gold";
                                            break

                                        case 2:
                                            placeInfo_global.style.color = "black";
                                            placeInfo_global.style.backgroundColor = "silver";
                                            break

                                        case 3:
                                            placeInfo_global.style.color = "white";
                                            placeInfo_global.style.backgroundColor = "#cd7f32";
                                            break

                                        default:
                                            placeInfo_global.style.color = "white";
                                            placeInfo_global.style.backgroundColor = "#5997da";
                                    }

                                    placeInfo_seasonal.style.color = "var(--theme-page-text-color)";

                                    if ($(".user-identity-header__attributes").children('h2').length != 0) {
                                        $(".user-identity-header__attributes").children('h2').after(placeInfo);
                                    } else {
                                        $(".user-identity-header__attributes").children('h1').after(placeInfo);
                                    }

                                    if (typeof ratingUser_global != "undefined") {
                                        placeInfo.appendChild(placeInfo_global)
                                    }
                                    if (typeof ratingUser_seasonal != "undefined") {
                                        placeInfo.appendChild(placeInfo_seasonal)
                                    }
                                }

                                function mastheadCheck() {
                                    if (document.querySelectorAll("#userProfileApp").length > 0) {
                                        insertinfo();
                                    } else {
                                        setTimeout(mastheadCheck, 500);
                                    }
                                }

                                mastheadCheck();
                            }
                        }
                    )
                }
            )
        } else {
            return;
        }
    }
);

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