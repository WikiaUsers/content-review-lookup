/**Adds a disclaimer above the Recirculation Rail**/
var $interval = setInterval(function () {
    if ($("#recirculation-rail").exists()) {
        var p = document.createElement("p");
        var el = document.querySelector("#recirculation-rail");
        var p1 = document.createElement("span");
        var a = document.createElement("a");
        var p2 = document.createElement("span");
        clearInterval($interval);
        p1.appendChild(document.createTextNode("Bible Wiki "));
        a.appendChild(document.createTextNode("does not endorse"));
        p2.appendChild(document.createTextNode(" this content"));
        p.setAttribute("id", "disclaimer");
        a.setAttribute("href", "/wiki/Bible_Wiki:Disclaimer#Hosting");
        a.setAttribute("title", "Disclaimer");
        p.appendChild(p1);
        p.appendChild(a);
        p.appendChild(p2);
        el.insertBefore(p, el.childNodes[0]);
    }
}, 200);