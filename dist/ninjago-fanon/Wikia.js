window.addEventListener("load", function () {
    var eb = document.getElementById("wpTextbox1");
    if (eb) {
        eb.select();
    }
}, false);
 
window.addEventListener("load", function () {
    var me = document.getElementById("wpMinoredit");
    if (me) {
        me.setAttribute("checked", "checked");
    }
    var eb = document.getElementById("wpTextbox1");
    eb.value = eb.value.replace(/<\/?noinclude>/, "");
}, false);