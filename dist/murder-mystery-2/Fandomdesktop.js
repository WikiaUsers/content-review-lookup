// Reinstate 'Add Video' button
(function () {
    "use strict";
    if (window.addVideoPatch || mw.config.get("skin") !== "fandomdesktop"
        || mw.config.get("wgCanonicalSpecialPageName") !== "Newimages") return;
    window.addVideoPatch = true;
    
    var button_text;
    
    function addVideoPatch() {
        mw.hook("wikipage.content").remove(addVideoPatch);
        var button = document.createElement("A");
        button.classList.add("wds-button");
        button.classList.add("addVideo");
        button.href = "#";
        button.textContent = button_text;
        button.addEventListener("click", function () {
            document.getElementsByClassName("special-videos__upload")[0]
                .classList.remove("is-hidden");
        });
        document.getElementsByClassName("page-header__actions")[0].appendChild(button);
    }
    
    mw.loader.using("mediawiki.api").then(function () {
        (new mw.Api()).getMessages("videos-add-video").then(function (msg_data) {
            button_text = msg_data["videos-add-video"];
            mw.hook("wikipage.content").add(addVideoPatch);
        });
    });
})();