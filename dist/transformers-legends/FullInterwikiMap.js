/********************* this comment is 80 characters long *********************/

(function () {

"use strict";
if (window.andrewds1021 && window.andrewds1021.full_interwiki_map) return;
if (!window.andrewds1021) window.andrewds1021 = {};
window.andrewds1021.full_interwiki_map = true;

/*
check the page name
if correct page, proceed with content generation
*/

console.log("FullInterwikiMap.js: Checking page name.");
if ((mw.config.get("wgTitle") === "Interwiki map/full")
    && (mw.config.get("wgNamespaceNumber") === 8)) {
    mw.loader.load("jquery.tablesorter"); // necessary for personal imports to work with IE11
    console.log("FullInterwikiMap.js: This page is \"MediaWiki:Interwiki_map/full\"."
        +" Attempting to generate page content.");
    var main_content = document.getElementById("mw-content-text");
    var article_placeholder = $("#mw-content-text > .noarticletext")[0];
    if (article_placeholder) {
        console.log("FullInterwikiMap.js: An article placeholder has been found."
            +" Attempting to remove it.");
        main_content.removeChild(article_placeholder);
    }
    var params = location.search.substr(1).split(/[&=]/);
    var param_idx = params.indexOf("sifilteriw");
    var filter = "";
    if ((param_idx != -1) && (param_idx < (params.length-1))) {
        filter = params[param_idx+1];
    }
    var iwform = document.getElementById("full_interwiki_form");
    if (!iwform) {
        iwform = document.createElement("form");
        iwform.id = "full_interwiki_form";
        iwform.innerHTML = "<span title=\"set sifilteriw\">Filter:</span><input"
            +" type=\"radio\" name=\"sifilteriw\" id=\"full_interwiki_form_all\">"
            +"<label for=\"full_interwiki_form_all\">all</label><input type=\"radio\""
            +" name=\"sifilteriw\" id=\"full_interwiki_form_local\"><label"
            +" for=\"full_interwiki_form_local\">local</label><input type=\"radio\""
            +" name=\"sifilteriw\" id=\"full_interwiki_form_non-local\"><label"
            +" for=\"full_interwiki_form_non-local\">non-local</label>";
        var input_idxs = [1, 3, 5];
        iwform.children[input_idxs[0]].addEventListener("click", function () {
            updateTable("");
        });
        iwform.children[input_idxs[1]].addEventListener("click", function () {
            updateTable("local");
        });
        iwform.children[input_idxs[2]].addEventListener("click", function () {
            updateTable("!local");
        });
        switch (filter) {
            case "local":
                iwform.children[input_idxs[1]].checked = true;
                break;
            case "!local":
                iwform.children[input_idxs[2]].checked = true;
                break;
            default:
                iwform.children[input_idxs[0]].checked = true;
        }
        main_content.insertBefore(iwform, main_content.firstChild);
    }
    var iwnote = document.getElementById("full_interwiki_note");
    if (!iwnote) {
        iwnote = document.createElement("p");
        iwnote.id = "full_interwiki_note";
        iwnote.innerHTML = "This page content was generated using FullInterwikiMap.js."
            +" This script uses the <a title=\"api.php\" href=\"/api.php\">MediaWiki"
            +" API</a> to retrieve a complete list of interwiki prefixes. That"
            +" list is then presented in the table below.";
        main_content.insertBefore(iwnote, main_content.firstChild);
    }
    console.log("FullInterwikiMap.js: Non-table content has been generated."
        +" Attempting to generate interwiki table.");
    updateTable(filter);
}

/*
generate and send API request
*/

function updateTable(filter) {
    console.log("FullInterwikiMap.js: Attempting to generate and send API request.");
    var request = {
        action: "query",
        meta: "siteinfo",
        siprop: "interwikimap"
    };
    if ((filter === "local") || (filter === "!local")) {
        request.sifilteriw = filter;
    }
    mw.loader.using(["mediawiki.api", "jquery.tablesorter"]).then(function () {
        return new mw.Api().get(request);
    }).then(extractIWData).then(replaceTableContent);
}

/*
place data in a structure that is easier to iterate through
*/

function extractIWData(reply) {
    console.log("FullInterwikiMap.js: An API reply has been recieved. Attempting"
        +" to extract data.");
    var data = {
        prefix: [],
        url: [],
        count: 0
    };
    var iwmap = reply.query.interwikimap;
    for (var i = 0; i < iwmap.length; i++) {
        data.prefix.push(iwmap[i].prefix);
        data.url.push(iwmap[i].url);
    }
    data.count = iwmap.length;
    return data;
}

/*
generate/update table
*/

function replaceTableContent(data) {
    console.log("FullInterwikiMap.js: Data has been extracted from the API reply."
        +" Attempting to generate/update interwiki table.");
    var iwtable = document.getElementById("full_interwiki_table");
    if (!iwtable) {
        iwtable = document.createElement("table");
        iwtable.className = "wikitable sortable";
        iwtable.id = "full_interwiki_table";
        iwtable.style.width = "100%";
        iwtable.style["table-layout"] = "fixed";
        document.getElementById("full_interwiki_form")
            .insertAdjacentElement("afterend", iwtable);
    } else {
        iwtable.className = iwtable.className.replace("jquery-tablesorter", "");
    }
    var theads = iwtable.getElementsByTagName("thead");
    for (var i = 0; i < theads.length; i++) {
        iwtable.removeChild(theads[i]);
    }
    var iwthead = document.createElement("thead");
    iwthead.innerHTML = "<tr><th>Prefix</th><th>Host Name</th><th>URL</th></tr>";
    iwtable.appendChild(iwthead);
    var tbodies = iwtable.getElementsByTagName("tbody");
    for (i = 0; i < tbodies.length; i++) {
        iwtable.removeChild(tbodies[i]);
    }
    var iwtbody = document.createElement("tbody");
    iwtable.appendChild(iwtbody);
    console.log("FullInterwikiMap.js: Attempting to generate interwiki table entries.");
    var new_entry = null;
    for (i = 0; i < data.count; i++) {
        new_entry = document.createElement("tr");
        new_entry.innerHTML = "<td>"+data.prefix[i]+"</td><td>"+getHostName(data.url[i])
            +"</td><td>"+data.url[i]+"</td>";
        iwtbody.appendChild(new_entry);
    }
    console.log("FullInterwikiMap.js: Interwiki table has been generated/updated."
        +" Attempting to run \"jquery.tablesorter\".");
    $("#full_interwiki_table").tablesorter();
    console.log("FullInterwikiMap.js: Content should now be sortable.");
}

/*
extract host name from URL
*/

function getHostName(url) {
    var start = url.indexOf("://")+3;
    var stop = url.indexOf("/", start);
    return url.substring(start, stop);
}

})();