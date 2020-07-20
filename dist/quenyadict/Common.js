importScriptPage('ShowHide/code.js', 'dev');

// Substitute header
function newHeader() {
    var text = document.getElementById("real").getElementsByTagName("span")[0].innerHTML;
    if (text) {
        document.getElementById("WikiaPageHeader").getElementsByTagName("h1")[0].innerHTML = text;
    }
}

// Remove Redirected from
function removeRedirect() {
    var redirect = document.getElementById("WikiaPageHeader").getElementsByTagName("h2")[0];
    if (redirect.getElementsByTagName("a")[0]) {
        redirect.innerHTML = "";
    }
}

// Tengwar in Categories
function classTengwar() {
    var tengwar = document.getElementById("tengwar");
    if (tengwar) {
        var category = document.getElementById("mw-pages"),
            headers = category.getElementsByTagName("h3"),
            lists = category.getElementsByTagName("ul"),
            i = 0;
        for (i=0;i<headers.length;i++) {
            headers[i].className = "Tengwar";
        }
        for (i=0;i<lists.length;i++) {
            lists[i].className = "Tengwar";
        }
    }
}

try {newHeader(); } catch (err) {}
try {removeRedirect(); } catch (err) {}
try {classTengwar(); } catch (err) {}