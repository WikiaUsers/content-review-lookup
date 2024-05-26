/* Late-Loading */
function loadLater(e, ms) {
    e.style.display = "none";
    setTimeout(function() {
        var dataDis = Boolean(e.getAttribute('data-display')) ? e.getAttribute('data-display') : "block";
        e.style.display = dataDis;
    }, ms)
}
var awaitingE = document.getElementsByClassName("inWaiting");
if (awaitingE != undefined) {
    for (var i=0; i<awaitingE.length; i++) {
        loadLater(awaitingE[i], awaitingE[i].getAttribute("data-during"));
    }
}