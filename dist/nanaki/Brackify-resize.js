/* Script for resizing Brackify.com embed */

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
window[eventMethod](messageEvent, function(e) {
    if (e.origin != "https://brackify.com") {
        return;
    }
    var iframeWrap = document.getElementById("brackify-iframe-wrap");
    if (iframeWrap) {
        if (e.data["scroll"]) {
            var bodyRect = document.body.getBoundingClientRect();
            var elemRect = iframeWrap.getBoundingClientRect();
            var offset = elemRect.top - bodyRect.top + e.data["scroll"];
            window.scrollTo(0, offset);
        }
        if (e.data["bracket-completed"]) {
            if (window.brackifyBracketCompletedHandler) {
                window.brackifyBracketCompletedHandler();
            }
        }
        if (e.data["resize"]) {
            iframeWrap.style.height = (parseInt(e.data["resize"])) + "px";
        }
    }
}, false);