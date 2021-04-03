(function () {
    var now = Date.now() - 60000 * (new Date()).getTimezoneOffset();
    [].forEach.call(document.getElementsByClassName("local-timed-display"), function(val) {
        var start = val.getAttribute("data-start");
        if (start) start = new Date(start);
        if (isNaN(start)) start = false;
        var end = val.getAttribute("data-end");
        if (end) end = new Date(end);
        if (isNaN(end)) end = false;
        var display = val.getAttribute("data-display");
        if (!display) display = "block";
        if ((!start || (start <= now)) && (!end || (end > now)))
            val.style.display = display;
    });
})();