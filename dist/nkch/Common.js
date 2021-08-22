mw.loader.using("mediawiki.api").then(
    function () {
        const api = new mw.Api();

        const dialWheel = document.querySelector(".un-ion__dial");

        if (typeof dialWheel !== "undefined" || typeof dialWheel !== "") {
            const dial = document.createElement("div");

            Object.assign(dial.style, {
                background: "var(--theme-page-background-color--secondary)",
                borderRadius: "400px",
                height: "400px",
                marginInline: "auto",
                width: "400px"
            });

            api.get({
                action: "parse",
                page: "MediaWiki:Custom-un-ion.json",
                prop: "wikitext",
                format: "json"
            }).done(
                function (data) {
                    data = JSON.parse(data.parse.wikitext["*"]);

                    dialWheel.appendChild(dial);

                    for (var i = 0; i < data.members.length; i++) {
                        var dial_member = document.createElement("div");

                        dial_member.classList.add("un-ion__dial-member");

                        Object.assign(dial_member.style, {
                            borderRadius: "40px",
                            height: "40px",
                            marginInlineStart: "-20px",
                            position: "absolute",
                            insetInlineStart: "50%",
                            transformOrigin: "50% 180px",
                            transition: ".3s ease-out",
                            width: "40px",
                            zIndex: 1
                        });

                        switch (typeof data.members[i].color !== "undefined") {
                            case true:
                                dial_member.style.backgroundColor = data.members[i].color;
                                break;
                            case false:
                            default:
                                dial_member.style.backgroundColor = "gray";
                                break;
                        }

                        dial_member.style.transform = "translateY(20px) rotate(" + ((360 / data.members.length) * i) + "deg)";

                        var dial_link = document.createElement("a");

                        dial_link.classList.add("un-ion__dial-link");

                        Object.assign(dial_link.style, {
                            alignItems: "center",
                            display: "flex",
                            height: "40px",
                            justifyContent: "center",
                            width: "40px"
                        });

                        dial_link.style.transform = "rotate(" + (360 - (360 / data.members.length) * i) + "deg)";

                        dial_link.setAttribute("href", data.members[i].url);
                        dial_link.setAttribute("title", data.members[i].name);

                        dial_member.appendChild(dial_link);

                        var dial_icon = document.createElement("img");

                        dial_icon.classList.add("un-ion__dial-icon");

                        dial_icon.setAttribute("src", data.members[i].url + "wiki/Special:FilePath/Site-favicon.ico");
                        dial_icon.setAttribute("width", "24px");

                        dial_link.appendChild(dial_icon);

                        // dial_tooltip = document.createElement("div");

                        // dial_tooltip.classList.add("wds-tooltip", "is-bottom");

                        // Object.assign(dial_tooltip.style, {
                        //     transform: "translate(0, 150%)",
                        //     whiteSpace: "nowrap"
                        // });

                        // dial_tooltip.innerHTML = data.members[i].name;

                        // dial_link.appendChild(dial_tooltip);

                        dial.appendChild(dial_member);
                    }
                }
            );
        }
    }
)