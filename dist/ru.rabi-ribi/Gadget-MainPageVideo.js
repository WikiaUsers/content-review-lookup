mw.loader.using(["mediawiki.api", "oojs-ui"]).then(
    function () {
        // Velocity.js
        mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.2/velocity.min.js").then(
            function () {
                var video = document.createElement("video");
                video.setAttribute("loop", "loop");
                video.setAttribute("autoplay", "autoplay");

                Object.assign(video.style, {
                    borderRadius: "10px",
                    filter: "brightness(.2)",
                    width: "100%"
                });

                var src = document.createElement("source");
                src.src = "https://static.wikia.nocookie.net/rabi-ribi/images/2/2a/Microtrailer.webm/revision/latest?path-prefix=ru";

                var content = document.createElement("div");

                Object.assign(content.style, {
                    margin: "10% 0",
                    position: "absolute",
                    textAlign: "center",
                    width: "80%"
                });

                var img = document.createElement("img");
                img.id = "rbrbw-mainpage-greetings-image";
                img.src = "https://vignette.wikia.nocookie.net/rabi-ribi/images/1/12/Заглавная_-_Сисини.png/revision/latest?path-prefix=ru";
                img.setAttribute("width", "80px");

                Object.assign(img.style, {
                    opacity: 0
                });

                var header = document.createElement("div");
                header.id = "rbrbw-mainpage-greetings-header";
                header.innerHTML = "Добро пожаловать на " + mw.config.get("wgSiteName");

                Object.assign(header.style, {
                    background: "linear-gradient(45deg, #8b57bc, #ee7294)",
                    fontFamily: "'VAG World Bold', 'Helvetica Neue', Helvetica, sans-serif",
                    fontSize: "25px",
                    letterSpacing: "0.1ex",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: 0
                });

                var subheader = document.createElement("p");
                subheader.id = "rbrbw-mainpage-greetings-subheader";
                subheader.innerHTML = "Википроект об игре <i>Rabi-Ribi</i>, свободный для редактирования";

                Object.assign(subheader.style, {
                    opacity: 0
                });

                var separator = document.createElement("hr");
                separator.id = "rbrbw-mainpage-greetings-separator";

                Object.assign(separator.style, {
                    background: "linear-gradient(90deg, transparent, #ee7294, transparent)",
                    border: "none",
                    height: "2px",
                    width: "80%",
                    opacity: 0
                });

                var desc = document.createElement("p");
                desc.id = "rbrbw-mainpage-greetings-description";
                desc.innerHTML = "<i><a href='/ru/wiki/Rabi-Ribi'>Rabi-Ribi</a></i> — это показательная смесь метроидвании и буллет-хелла от студии <i>CreSpirit</i> за авторством идеи <i>GemaYue</i>, предлагающая множество различных сложностей, боссов и вариантов её прохождения.";

                Object.assign(desc.style, {
                    opacity: 0
                });

                mw.util.addCSS(".rbrbw-mainpage-greetings-storelinks { opacity: 0 }")

                var storelinks = new OO.ui.FieldLayout(
                    new OO.ui.Widget({
                        content: [
                            new OO.ui.HorizontalLayout({
                                items: [
                                    new OO.ui.ButtonWidget({
                                        label: "Steam",
                                        title: "Перейти на страницу игры в Steam",
                                        href: "https://store.steampowered.com/app/400910/RabiRibi/",
                                        classes: ["rbrbw-mainpage-greetings-storelink", "rbrbw-mainpage-greetings-storelink-steam"]
                                    }),
                                    new OO.ui.ButtonWidget({
                                        label: "PlayStation Store",
                                        title: "Перейти на страницу игры в PlayStation Store",
                                        href: "https://store.playstation.com/ru-ru/product/EP4293-CUSA08233_00-RABIRIBIPS400100",
                                        classes: ["rbrbw-mainpage-greetings-storelink", "rbrbw-mainpage-greetings-storelink-psstore"]
                                    }),
                                    new OO.ui.ButtonWidget({
                                        label: "Nintendo eShop",
                                        title: "Перейти на страницу игры в Nintendo eShop",
                                        href: "https://www.nintendo.ru/-/-Nintendo-Switch/Rabi-Ribi-1651288.html",
                                        classes: ["rbrbw-mainpage-greetings-storelink", "rbrbw-mainpage-greetings-storelink-eshop"]
                                    })
                                ],
                                classes: ["rbrbw-mainpage-greetings-storelinks"]
                            })
                        ]
                    })
                );

                Object.assign(storelinks.$element[0].style, {
                    display: "flex",
                    justifyContent: "center"
                });

                $("#rbrbw-mainpage-header")[0].innerHTML = "";
                $("#rbrbw-mainpage-header")[0].appendChild(video);
                video.appendChild(src);
                video.after(content);

                content.appendChild(img);
                content.appendChild(header);
                content.appendChild(subheader);
                content.appendChild(separator);
                content.appendChild(desc);
                content.appendChild(storelinks.$element[0]);

                $.Velocity.hook($("#rbrbw-mainpage-greetings-image"), "translateY", "50px");
                $.Velocity.hook($("#rbrbw-mainpage-greetings-header"), "translateY", "50px");
                $.Velocity.hook($("#rbrbw-mainpage-greetings-subheader"), "translateY", "50px");
                $.Velocity.hook($("#rbrbw-mainpage-greetings-separator"), "translateY", "50px");
                $.Velocity.hook($("#rbrbw-mainpage-greetings-description"), "translateY", "50px");
                $.Velocity.hook($("#rbrbw-mainpage-greetings-storelinks"));

                $("#rbrbw-mainpage-greetings-image").velocity({
                    translateY: 0,
                    opacity: 1
                }, {
                    delay: 700,
                    duration: 1300,
                    easing: "easeOutCubic",
                    queue: false
                });

                $("#rbrbw-mainpage-greetings-header").velocity({
                    translateY: 0,
                    opacity: 1
                }, {
                    delay: 1800,
                    duration: 800,
                    easing: "easeOutCubic",
                    queue: false
                });
                
                $("#rbrbw-mainpage-greetings-subheader").velocity({
                    translateY: 0,
                    opacity: 1
                }, {
                    delay: 2100,
                    duration: 800,
                    easing: "easeOutCubic",
                    queue: false
                });

                $("#rbrbw-mainpage-greetings-separator").velocity({
                    translateY: 0,
                    opacity: 1
                }, {
                    delay: 2400,
                    duration: 800,
                    easing: "easeOutCubic",
                    queue: false
                });

                $("#rbrbw-mainpage-greetings-description").velocity({
                    translateY: 0,
                    opacity: 1
                }, {
                    delay: 2400,
                    duration: 800,
                    easing: "easeOutCubic",
                    queue: false
                });

                $(".rbrbw-mainpage-greetings-storelinks").velocity({
                    opacity: 1
                }, {
                    delay: 2700,
                    duration: 800,
                    easing: "easeOutCubic",
                    queue: false
                });
            }
        );
    }
);