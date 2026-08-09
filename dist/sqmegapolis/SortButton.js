document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("container");
    var buttons = document.querySelectorAll(".mw-sort-btn");

    if (!container) {
        console.error('Sorting: #container not found.');
        return;
    }

    function sortItems(key) {
        var items = Array.prototype.slice.call(
            container.querySelectorAll(":scope > .item")
        );

        items.sort(function (a, b) {
            var elA = a.querySelector("." + key);
            var elB = b.querySelector("." + key);

            if (!elA || !elB) {
                return 0;
            }

            var valA = elA.getAttribute("data-value") || "";
            var valB = elB.getAttribute("data-value") || "";

            var numA = Number(valA);
            var numB = Number(valB);

            if (valA !== "" && valB !== "" &&
                Number.isFinite(numA) && Number.isFinite(numB)) {
                return numA - numB;
            }

            return valA.localeCompare(valB, undefined, {
                numeric: true,
                sensitivity: "base"
            });
        });

        items.forEach(function (item) {
            container.appendChild(item);
        });
    }

    Array.prototype.forEach.call(buttons, function (btn) {
        btn.addEventListener("click", function () {
            var key = btn.getAttribute("data-sort");
            console.log("Sort by:", key);
            sortItems(key);
        });
    });

    console.log("Sort function initialized:", buttons.length, "Buttons");
});