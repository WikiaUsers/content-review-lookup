mw.loader.using(["mediawiki.api", "oojs-ui"]).then(
    function () {
        // Velocity.js
        mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.2/velocity.min.js").then(
            function () {
                const mpv = {};

                mpv.elements = {
                    video: {
                        $el: document.createElement("video"),
                        $classes: ["rbrbw-mainpage-header__video"],
                        $attributes: {
                            autoplay: "autoplay",
                            loop: "loop"
                        },
                        source: {
                            $el: document.createElement("source"),
                            $classes: ["rbrbw-mainpage-header__video-src"],
                            $attributes: {
                                src: "/ru/wiki/Special:Filepath/File:Microtrailer.webm"
                            }
                        }
                    },
                    blackout: {
                        $el: document.createElement("div"),
                        $classes: ["rbrbw-mainpage-header__blackout"]
                    },
                    content: {
                        $el: document.createElement("div"),
                        $classes: ["rbrbw-mainpage-header__content"],
                        image: {
                            $el: document.createElement("img"),
                            $classes: ["rbrbw-mainpage-header__image"],
                            $attributes: {
                                src: "/ru/wiki/Special:Filepath/File:Заглавная_-_Сисини.png",
                                width: 80
                            }
                        },
                        title: {
                            $el: document.createElement("div"),
                            $classes: ["rbrbw-mainpage-header__title"]
                        },
                        subtitle: {
                            $el: document.createElement("p"),
                            $classes: ["rbrbw-mainpage-header__subtitle"]
                        },
                        separator: {
                            $el: document.createElement("hr"),
                            $classes: ["rbrbw-mainpage-header__separator"]
                        },
                        description: {
                            $el: document.createElement("p"),
                            $classes: ["rbrbw-mainpage-header__description"]
                        },
                        storeLinks: {
                            $el: "...",
                            $classes: ["rbrbw-mainpage-header__storelinks"]
                        }
                    }
                };

                /* ~ video ~ */
                mpv.elements.video.$el.classList.add(mpv.elements.video.$classes);

                for (var i in mpv.elements.video.$attributes) {
                    mpv.elements.video.$el.setAttribute(i, mpv.elements.video.$attributes[i]);
                };

                var header = document.querySelector("#rbrbw-mainpage-header");
                header.innerHTML = "";
                header.appendChild(mpv.elements.video.$el);

                /* ~ video : source ~ */
                mpv.elements.video.source.$el.classList.add(mpv.elements.video.source.$classes);

                for (var i in mpv.elements.video.source.$attributes) {
                    mpv.elements.video.source.$el.setAttribute(i, mpv.elements.video.source.$attributes[i]);
                };

                mpv.elements.video.$el.appendChild(mpv.elements.video.source.$el);

                /* ~ blackout ~ */
                mpv.elements.blackout.$el.classList.add(mpv.elements.blackout.$classes);

                mpv.elements.video.$el.after(mpv.elements.blackout.$el);

                /* ~ content ~ */
                mpv.elements.content.$el.classList.add(mpv.elements.content.$classes);

                mpv.elements.blackout.$el.after(mpv.elements.content.$el);

                /* ~ content : image ~ */
                mpv.elements.content.image.$el.classList.add(mpv.elements.content.image.$classes);

                for (var i in mpv.elements.content.image.$attributes) {
                    mpv.elements.content.image.$el.setAttribute(i, mpv.elements.content.image.$attributes[i]);
                };

                mpv.elements.content.$el.appendChild(mpv.elements.content.image.$el);

                animate(mpv.elements.content.image.$el, 700, 1300);

                /* ~ content : title ~ */
                mpv.elements.content.title.$el.classList.add(mpv.elements.content.title.$classes);

                mpv.elements.content.title.$el.innerHTML = "Добро пожаловать на " + mw.config.get("wgSiteName");

                mpv.elements.content.$el.appendChild(mpv.elements.content.title.$el);

                animate(mpv.elements.content.title.$el, 1800, 800);

                /* ~ content : subtitle ~ */
                mpv.elements.content.subtitle.$el.classList.add(mpv.elements.content.subtitle.$classes);

                mpv.elements.content.subtitle.$el.innerHTML = "Википроект об игре <i>Rabi-Ribi</i>, свободный для редактирования";

                mpv.elements.content.$el.appendChild(mpv.elements.content.subtitle.$el);

                animate(mpv.elements.content.subtitle.$el, 2100, 800);

                /* ~ content : separator ~ */
                mpv.elements.content.separator.$el.classList.add(mpv.elements.content.separator.$classes);

                mpv.elements.content.$el.appendChild(mpv.elements.content.separator.$el);

                animate(mpv.elements.content.separator.$el, 2400, 800);

                /* ~ content : description ~ */
                mpv.elements.content.description.$el.classList.add(mpv.elements.content.description.$classes);

                mpv.elements.content.description.$el.innerHTML = "<i><a href='/ru/wiki/Rabi-Ribi'>Rabi-Ribi</a></i> — это показательная смесь метроидвании и буллет-хелла от студии <i>CreSpirit</i> за авторством идеи <i>GemaYue</i>, предлагающая множество различных сложностей, боссов и вариантов её прохождения.";

                mpv.elements.content.$el.appendChild(mpv.elements.content.description.$el);

                animate(mpv.elements.content.description.$el, 2400, 800);

                /* ~ content : storelinks ~ */
                mpv.elements.content.storeLinks.$el = new OO.ui.FieldLayout(
                    new OO.ui.Widget({
                        content: [
                            new OO.ui.HorizontalLayout({
                                items: [
                                    new OO.ui.ButtonWidget({
                                        label: "Steam",
                                        title: "Перейти на страницу игры в Steam",
                                        href: "https://store.steampowered.com/app/400910/RabiRibi/",
                                        classes: ["rbrbw-mainpage-header__storelink", "rbrbw-mainpage-header__storelink--steam"],
                                        target: "_blank",
                                        rel: "noreferrer noopener"
                                    }),
                                    new OO.ui.ButtonWidget({
                                        label: "PlayStation Store",
                                        title: "Перейти на страницу игры в PlayStation Store",
                                        href: "https://store.playstation.com/ru-ru/product/EP4293-CUSA08233_00-RABIRIBIPS400100",
                                        classes: ["rbrbw-mainpage-header__storelink", "rbrbw-mainpage-header__storelink--psstore"],
                                        target: "_blank",
                                        rel: "noreferrer noopener"
                                    }),
                                    new OO.ui.ButtonWidget({
                                        label: "Nintendo eShop",
                                        title: "Перейти на страницу игры в Nintendo eShop",
                                        href: "https://www.nintendo.ru/-/-Nintendo-Switch/Rabi-Ribi-1651288.html",
                                        classes: ["rbrbw-mainpage-header__storelink", "rbrbw-mainpage-header__storelink--eshop"],
                                        target: "_blank",
                                        rel: "noreferrer noopener"
                                    })
                                ],
                                classes: mpv.elements.content.storeLinks.$classes
                            })
                        ]
                    })
                );

                Object.assign(mpv.elements.content.storeLinks.$el.$element[0].style, {
                    display: "flex",
                    justifyContent: "center"
                });

                mpv.elements.content.$el.appendChild(mpv.elements.content.storeLinks.$el.$element[0]);

                animate(mpv.elements.content.storeLinks.$el.$element[0], 2700, 800);

                function animate(element, delay, duration) {
                    Object.assign(element.style, {
                        opacity: 0
                    });

                    $.Velocity.hook($(element), "translateY", "50px");

                    $(element).velocity({
                        translateY: 0,
                        opacity: 1
                    }, {
                        delay: delay,
                        duration: duration,
                        easing: "easeOutCubic",
                        queue: false
                    });
                };
            }
        );
    }
);