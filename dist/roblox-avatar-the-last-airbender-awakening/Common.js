mw.loader.using(['mediawiki.util']).then(function () {

    if (document.getElementById("awakeningStatusIcon")) return;

    const statusIcon = document.createElement("div");
    statusIcon.id = "awakeningStatusIcon";
    statusIcon.textContent = "🟢";
    document.body.appendChild(statusIcon);

    const statusPopup = document.createElement("div");
    statusPopup.id = "awakeningStatusPopup";
    statusPopup.innerHTML = "<div id='awakeningStatusContent'>Loading...</div>";
    document.body.appendChild(statusPopup);

    fetch("/api.php?action=parse&page=Project:Current%20Status&format=json&origin=*")
        .then(response => response.json())
        .then(data => {
            if (data.parse && data.parse.text) {
                document.getElementById("awakeningStatusContent").innerHTML = data.parse.text["*"];
            } else {
                document.getElementById("awakeningStatusContent").innerHTML = "Status unavailable.";
            }
        })
        .catch(() => {
            document.getElementById("awakeningStatusContent").innerHTML = "Error loading status.";
        });

    statusIcon.addEventListener("click", function (e) {
        e.stopPropagation();
        statusPopup.classList.toggle("showStatusPopup");
    });

    document.addEventListener("click", function (e) {
        if (!statusPopup.contains(e.target) && e.target !== statusIcon) {
            statusPopup.classList.remove("showStatusPopup");
        }
    });

});