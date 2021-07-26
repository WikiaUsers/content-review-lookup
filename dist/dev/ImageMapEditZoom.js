/********************* this comment is 80 characters long *********************/

(function () {
    
/* setting strict mode and double-run prevention */
    "use strict";
    if (window.andrewds1021 && window.andrewds1021.image_map_edit_zoom
        && window.andrewds1021.image_map_edit_zoom.has_run) return;
    if (!window.andrewds1021) {
        window.andrewds1021 = {
            image_map_edit_zoom: {}
        };
    } else if (!window.andrewds1021.image_map_edit_zoom) {
        window.andrewds1021.image_map_edit_zoom = {};
    }
    window.andrewds1021.image_map_edit_zoom.has_run = true;
    
    if (mw.config.get("wgCanonicalNamespace") !== "File"
        || mw.config.get("wgAction") !== "view"
        || !document.querySelector("#file.fullImageLink > a > img,"
        + " #file.fullImageLink > #imeContainer > img")) return;
    
    var preview, height_elem, selector, observer, interval;
    var img_elem = document.querySelector("#file.fullImageLink > a > img,"
        + " #file.fullImageLink > #imeContainer > img");
    var img_width = img_elem.width;
    var img_height = img_elem.height;
    var height_def = Math.min(img_height, 300);
    var id_regexp = /^imePreview(\d+)$/;
    var observer_opts = {
        subtree: true,
        childList: true,
        attributeFilter: [
            "style"
        ]
    };
    var original = [];
    var zoom = 1;
    
    function setPositions() {
        observer.disconnect();
        Array.prototype.slice.call(preview.children).filter(function (val) {
            return id_regexp.test(val.id);
        }).forEach(function (val, idx) {
            val.style.left = "calc(" + zoom + " / " + original[idx].zoom
                + " * " + original[idx].left + ")";
            val.style.top = "calc(" + zoom + " / " + original[idx].zoom
                + " * " + original[idx].top + ")";
            val.style.width = "calc(" + zoom + " / " + original[idx].zoom
                + " * " + original[idx].width + ")";
            val.style.height = "calc(" + zoom + " / " + original[idx].zoom
                + " * " + original[idx].height + ")";
        });
        observer.observe(preview, observer_opts);
    }
    
    function attachObserver() {
        observer = new MutationObserver(function (records) {
            var removed = records.filter(function (val) {
                return (val.type == "childList") && (val.target == preview)
                    && val.removedNodes.length
                    && id_regexp.test(val.removedNodes[0].id);
            });
            var added = records.filter(function (val) {
                return (val.type == "childList") && (val.target == preview)
                    && val.addedNodes.length
                    && id_regexp.test(val.addedNodes[0].id);
            });
            if (removed.length) {
                original.splice(parseInt(removed[0].removedNodes[0].id
                    .match(id_regexp)[1]), 1);
            } else if (added.length) {
                original.push({
                    zoom: zoom,
                    left: added[0].addedNodes[0].style.left,
                    top: added[0].addedNodes[0].style.top,
                    width: added[0].addedNodes[0].style.width,
                    height: added[0].addedNodes[0].style.height
                });
            } else if ((records[0].type == "attributes")
                && (records[0].target.parentElement == preview)
                && id_regexp.test(records[0].target.id)
                && (records[0].target.style.left.indexOf("calc(") == -1)) {
                var index = selector.selectedIndex;
                var elem = document.getElementById("imePreview" + index);
                if ((elem.style.left != original[index].left)
                    || (elem.style.top != original[index].top)
                    || (elem.style.width != original[index].width)
                    || (elem.style.height != original[index].height))
                    original[index] = {
                        zoom: zoom,
                        left: elem.style.left,
                        top: elem.style.top,
                        width: elem.style.width,
                        height: elem.style.height
                    };
            }
            setPositions();
        });
        observer.observe(preview, observer_opts);
    }
    
    function insertInterface(i18n) {
        i18n.loadMessages("ImageMapEditZoom").then(function (i18n) {
            document.getElementById("ime").insertAdjacentHTML("beforebegin",
                "<fieldset id=\"imeZoom\"><legend>ImageMapEditZoom</legend>"
                + "<label for=\"imeZoom-zoom\">" + i18n.msg("zoom").escape()
                + "</label><input id=\"imeZoom-zoom\" type=\"number\" min=\"0.1\""
                + " step=\"0.1\" value=\"" + zoom + "\" /><br /><label"
                + " for=\"imeZoom-height\"><input id=\"imeZoom-use-height\""
                + " type=\"checkbox\" />" + i18n.msg("height").escape()
                + "</label><input id=\"imeZoom-height\" type=\"number\" min=\"1\""
                + " step=\"1\" value=\"" + height_def + "\" disabled /></fieldset>");
            document.getElementById("imeZoom-zoom").addEventListener("change",
                function (event) {
                if (event.target.checkValidity()) {
                    zoom = event.target.value;
                    preview.style.width = "calc(" + zoom + " * " + img_width + "px)";
                    preview.style.height = "calc(" + zoom + " * " + img_height + "px)";
                    img_elem.style.width = "calc(" + zoom + " * " + img_width + "px)";
                    img_elem.style.height = "calc(" + zoom + " * " + img_height + "px)";
                    setPositions();
                } else {
                    event.target.value = zoom;
                }
            });
            document.getElementById("imeZoom-use-height").addEventListener(
                "change", function (event) {
                if (event.target.checked) {
                    height_elem.disabled = false;
                    if (!height_elem.checkValidity()) height_elem.value = height_def;
                    preview.parentElement.style.height = height_elem.value + "px";
                } else {
                    height_elem.disabled = true;
                    preview.parentElement.style.height = "auto";
                }
            });
            height_elem = document.getElementById("imeZoom-height");
            height_elem.addEventListener("change", function () {
                if (height_elem.disabled) return;
                if (!height_elem.checkValidity()) height_elem.value = height_def;
                preview.parentElement.style.height = height_elem.value + "px";
            });
        });
        mw.loader.using("mediawiki.util").then(function () {
            mw.util.addCSS("#file.fullImageLink > #imeContainer > img {"
                + " max-width: none; } .previewCircle, .previewPoly {"
                + " background-size: contain !important; }");
        });
        img_elem.src = img_elem.src.replace(/\/scale-to-width[^?]*/, "");
    }
    
    function checkIme() {
        var ime = document.getElementById("ime");
        if (!ime) return;
        clearInterval(interval);
        preview = document.getElementById("imePreview");
        selector = ime.children[0].children[0].children[2].children[1];
        attachObserver();
        mw.hook("dev.i18n").add(insertInterface);
    }
    
    function checkLink() {
        var link = document.getElementById("imeLink");
        if (!link) return;
        clearInterval(interval);
        if (document.getElementById("ime")) {
            checkIme();
        } else {
            link.addEventListener("click", function () {
                interval = setInterval(checkIme, 250);
            });
        }
    }
    
    interval = setInterval(checkLink, 250);
    
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:i18n-js/code.js",
            "u:dev:MediaWiki:ImageMapEdit.js"
        ]
    });
    
})();