	var linkedDevs = document.getElementsByClassName("linkedDev");
    for (var i = 0; i < linkedDevs.length; i++) {
        var ele = linkedDevs[i];
        if (ele.getAttribute("data-blank")) {
            ele.addEventListener("click", function(e) {
                window.open(e.currentTarget.getAttribute("data-href"))
            });
        } else {
            ele.addEventListener("click", function(e) {
                location.href = e.currentTarget.getAttribute("data-href")
            });
        }
    }