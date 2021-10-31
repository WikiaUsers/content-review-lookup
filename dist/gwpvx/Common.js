function toggleCollapsibleTable($table) {
    $table.classList.toggle("collapsed")
    $table.querySelector(".table-collapse-trigger > span").textContent = $table.classList.contains("collapsed") ? "show" : "hide"
}

function createColapsibleTables() {
    document.querySelectorAll("table.collapsible").forEach(function (table) {
        table.setAttribute("data-collapse", "true")
        var th = table.querySelector("th")
        var $collapseButton = $('<span class="table-collapse-trigger">[<span>show</span>]</span>')
        $collapseButton.on("click", function () { toggleCollapsibleTable(table) })
        th.appendChild($collapseButton[0])
    })

    // account for legacy autocollapse not done via CSS
    document.querySelectorAll("table.autocollapse").forEach(function ($el) {
        $el.classList.add("collapsed")
    })
}


function _addViewMenuLink(targetURL, text) {
    // add a new link to the "view menu" of a wiki page
    var viewsEl = document.getElementById("p-views")
    if (!viewsEl) {
        return
    }
    var linkEL = $('<a href="' + targetURL + '" class="wds-button wds-is-text page-header__action-button has-label">' + text + '</a>')[0]
    if (viewsEl.children.length >= 1) {
        viewsEl.insertBefore(linkEL, viewsEl.children[1])
    } else {
        viewsEl.appendChild(linkEL)
    }
}


function addTalkPageLink() {
    // add a link to a talk page (even if none exists) at a top level menu
    var nameSpace = mw.config.values.wgCanonicalNamespace
    if (!nameSpace || nameSpace.endsWith("_talk") || ["Special", "UserProfile", "Message Wall", "Message Wall Greeting", "Thread"].includes(nameSpace)) {
        return
    }
    var talkPageURL = window.location.href.replace(nameSpace, nameSpace + "_talk")
    _addViewMenuLink(talkPageURL, "Talk")
}


function addBuildRateLink() {
    // if the page is in the "Build" namespace, add a link to its rating page
    var nameSpace = mw.config.values.wgCanonicalNamespace
    var ratePageURL = new URL(window.location.href)
    if (
        nameSpace !== "Build"
        || ratePageURL.searchParams.get("action") === "rate"
        || !!document.querySelectorAll(".rating-trial").length  // Build is currently in the trial phase and therefore cannot be rated
    ) {
        return
    }
    ratePageURL.search = "action=rate"
    _addViewMenuLink(ratePageURL, "Rate")
}


function autoExpandContent() {
    window.setTimeout(function () {
        if (!document.body.classList.contains("is-content-expanded")) {
            var contentSizeToggle = document.querySelector(".content-size-toggle")
            if (contentSizeToggle) {
                contentSizeToggle.click()
            }
        }
    }, 5000)
}


$(function () {
    //autoExpandContent()
    createColapsibleTables()
    addTalkPageLink()
    addBuildRateLink()
})


/* pvxrate.js */
function swapColor(id, bgcolor) {
    if (bgcolor !== "") {
        document.getElementById(id).style.backgroundColor = bgcolor
    }
}