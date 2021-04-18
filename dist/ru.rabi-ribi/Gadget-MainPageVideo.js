mw.loader.using(["mediawiki.api", "oojs-ui"]).then(
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
        img.src = "https://vignette.wikia.nocookie.net/rabi-ribi/images/1/12/Заглавная_-_Сисини.png/revision/latest?path-prefix=ru";
        img.setAttribute("width", "80px");

        var header = document.createElement("div");
        header.innerHTML = "Добро пожаловать на " + mw.config.get("wgSiteName");

        Object.assign(header.style, {
            background: "linear-gradient(45deg, #8b57bc, #ee7294)",
            fontFamily: "'VAG World Bold', 'Helvetica Neue', Helvetica, sans-serif",
            fontSize: "25px",
            letterSpacing: "0.1ex",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        });

        var subheader = document.createElement("p");
        subheader.innerHTML = "Википроект об игре <i>Rabi-Ribi</i>, свободный для редактирования";

        var separator = document.createElement("hr");

        Object.assign(separator.style, {
            background: "linear-gradient(90deg, transparent, #ee7294, transparent)",
            border: "none",
            height: "2px",
            width: "80%"
        });

        var desc = document.createElement("p");
        desc.innerHTML = "<i><a href='/ru/wiki/Rabi-Ribi'>Rabi-Ribi</a></i> — это показательная смесь метроидвании и буллет-хелла от студии <i>CreSpirit</i> за авторством идеи <i>GemaYue</i>, предлагающая множество различных сложностей, боссов и вариантов её прохождения.";

        var storeLinks = new OO.ui.FieldLayout(
            new OO.ui.Widget({
                content: [
                    new OO.ui.HorizontalLayout({
                        items: [
                            new OO.ui.ButtonWidget({
                                label: "Steam",
                                title: "Перейти на страницу игры в Steam",
                                href: "https://store.steampowered.com/app/400910/RabiRibi/",
                                classes: ["rbrbrw-mainpage-greetings-storeLink", "rbrbrw-mainpage-greetings-storeLink-steam"]
                            }),
                            new OO.ui.ButtonWidget({
                                label: "PlayStation Store",
                                title: "Перейти на страницу игры в PlayStation Store",
                                href: "https://store.playstation.com/ru-ru/product/EP4293-CUSA08233_00-RABIRIBIPS400100",
                                classes: ["rbrbrw-mainpage-greetings-storeLink", "rbrbrw-mainpage-greetings-storeLink-psstore"]
                            }),
                            new OO.ui.ButtonWidget({
                                label: "Nintendo eShop",
                                title: "Перейти на страницу игры в Nintendo eShop",
                                href: "https://www.nintendo.ru/-/-Nintendo-Switch/Rabi-Ribi-1651288.html",
                                classes: ["rbrbrw-mainpage-greetings-storeLink", "rbrbrw-mainpage-greetings-storeLink-eshop"]
                            })
                        ]
                    })
                ]
            })
        );

        Object.assign(storeLinks.$element[0].style, {
            display: "flex",
            justifyContent: "center"
        });

        $("#mainpageHeader")[0].innerHTML = "";
        $("#mainpageHeader")[0].appendChild(video);
        video.appendChild(src);
        video.after(content);

        content.appendChild(img);
        content.appendChild(header);
        content.appendChild(subheader);
        content.appendChild(separator);
        content.appendChild(desc);
        content.appendChild(storeLinks.$element[0]);
    }
);