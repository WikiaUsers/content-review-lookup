(function () {
    if (window.SkinToggler) return;
    window.SkinToggler = true;

    mw.hook("dev.wds").add(
        function (wds) {
            switch (mw.config.get("skin")) {
                case "fandomdesktop":
                    const fd = {};

                    fd.pageTools = document.querySelector(".page-side-tools");

                    fd.skinButton = document.createElement("button");
                    fd.skinButton.classList.add("page-side-tool");
                    fd.skinButton.title = "Изменить скин";

                    fd.pageTools.appendChild(fd.skinButton);
                    fd.skinButton.appendChild(wds.icon("flag-small"));

                    fd.skinButton.addEventListener("click", function () {
                        changeSkin("oasis", fd.skinButton)
                    }, false);
                    break
                case "oasis":
                    const o = {};

                    o.contribButtons = document.querySelector(".page-header__contribution-buttons");

                    o.skinButton = document.createElement("button");
                    o.skinButton.classList.add("wds-button", "wds-is-secondary");
                    o.skinButton.title = "Изменить скин";

                    o.contribButtons.appendChild(o.skinButton);
                    o.skinButton.appendChild(wds.icon("flag-small"));

                    o.skinButton.addEventListener("click", function () {
                        changeSkin("fandomdesktop", o.skinButton)
                    }, false);
                    break
            }

            function changeSkin(skinToChange, button) {
                new mw.Api().postWithToken("csrf", {
                    action: "options",
                    optionname: "skin",
                    optionvalue: skinToChange
                }).done(
                    function () {
                        button.removeChild(button.querySelector("svg"));
                        button.appendChild(wds.icon("checkmark-small"));
                        mw.notify("Настройки изменены, перезагрузите страницы, чтобы увидеть результат.");
                    }
                )
            }
        }
    );

    importArticle({
        type: "script",
        article: "u:dev:MediaWiki:WDSIcons/code.js"
    });
})();