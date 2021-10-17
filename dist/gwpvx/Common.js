function toggleCollapsibleTable($table) {
    $table.classList.toggle("collapsed");
    $table.querySelector(".table-collapse-trigger > span").textContent = $table.classList.contains("collapsed") ? "show" : "hide";
}

function createColapsibleTables() {
    document.querySelectorAll("table.collapsible").forEach(function (table) {
    	table.setAttribute("data-collapse", "true")
        var th = table.querySelector("th");
        var $collapseButton = $('<span class="table-collapse-trigger">[<span>show</span>]</span>')
        $collapseButton.on("click", function() {toggleCollapsibleTable(table);});
        th.appendChild($collapseButton[0]);
    });

    // account for legacy autocollapse not done via CSS
    document.querySelectorAll("table.autocollapse").forEach(function ($el) {
        $el.classList.add("collapsed");
    });
}

$(createColapsibleTables);


/* pvxrate.js */
function swapColor(id, bgcolor) {
    if (bgcolor !== "") {
        document.getElementById(id).style.backgroundColor = bgcolor;
    }
}