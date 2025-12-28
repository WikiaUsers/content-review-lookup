mw.loader.using(['mediawiki.api', 'jquery'], function () {

    var currentPage = 1;
    var limit = 30;
    var searchTerm = "";
    var filters = {};

    /* ---------- helpers ---------- */
    function toCasePairRegex(str) {
        return str
            .replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
            .split("")
            .map(ch => {
                if (/[a-zA-Z]/.test(ch)) {
                    return `[${ch.toLowerCase()}${ch.toUpperCase()}]`;
                }
                return ch;
            })
            .join("");
    }

    /* ---------- filters ---------- */
    $("body").on("click", "li.btn.filter", function () {
        var $btn = $(this);
        var key = $btn.data("key");
        var value = $btn.data("value");
        currentPage = 1;

        if (!filters[key]) filters[key] = [];

        if ($btn.hasClass("selected")) {
            $btn.removeClass("selected");
            filters[key] = filters[key].filter(v => v !== value);
            if (!filters[key].length) delete filters[key];
        } else {
            $btn.addClass("selected");
            filters[key].push(value);
        }
    });

    /* ---------- search (live) ---------- */
    $("body").on("input", "#searchBox", function () {
        searchTerm = $(this).val().trim();
        currentPage = 1;
        $("#queryDataBtn").click();
    });

    /* ---------- page length ---------- */
    $("body").on("change", "#pageLength", function () {
        limit = parseInt($(this).val(), 10);
        currentPage = 1;
        $("#queryDataBtn").click();
    });

    /* ---------- submit ---------- */
    $("body").on("click", "#queryDataBtn", function () {

    let dplLines = [];

    // filters (AND)
    Object.keys(filters).forEach(k =>
        filters[k].forEach(v => dplLines.push("|" + k + "=" + v))
    );

    // search (optional)
    if (searchTerm !== "") {
        const titleRegex = toCasePairRegex(searchTerm.replace(/_/g, " "));
        dplLines.push("|titleregexp=.*" + titleRegex + ".*");
    }

    var offset = (currentPage - 1) * limit;

    const countQuery =
`{{#dpl:
 |namespace=File
 ${dplLines.join("\n ")}
 |category=DPL
 |resultsheader=RESULTCOUNT(%PAGES%)
 |count=0
 |format=,,
}}`;

    const resultsQuery =
`{{#dpl:
 |namespace=File
 ${dplLines.join("\n ")}
 |category=DPL
 |shownamespace=false
 |ordermethod=title
 |order=ascending
 |offset=${offset}
 |count=${limit}
 |format=²{SS¦,²{S¦²{#replace:%TITLE%¦.png¦}²}²,,}²
}}`;

    new mw.Api().post({
        action: "parse",
        text: countQuery + resultsQuery,
        contentmodel: "wikitext",
        prop: "text"
    }).done(function (data) {

        var html = data.parse.text["*"];

        var total = 0;
        var m = html.match(/RESULTCOUNT\((\d+)\)/);
        if (m) total = parseInt(m[1], 10);

        html = html.replace(/RESULTCOUNT\(\d+\)/, "");

        $("#queryTotal").html("Total results: " + total);
        $("#queryDataGrid").html(html);

        renderPagination(total);
        renderFooter(total);
    });
});


    /* ---------- clear ---------- */
    $("body").on("click", "#clearParamBtn", function () {
        $("li.btn.filter.selected").removeClass("selected");
        filters = {};
        searchTerm = "";
        currentPage = 1;

        $("#searchBox").val("");
        $("#queryTotal, #queryDataGrid, #queryPagination, #queryFooter").html("");
    });

    /* ---------- pagination ---------- */
   function renderPagination(total) {
    var pages = Math.ceil(total / limit);
    if (pages <= 1) {
        $("#queryPagination").html("");
        return;
    }

    var maxVisible = 6;
    var start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    var end = start + maxVisible - 1;

    if (end > pages) {
        end = pages;
        start = Math.max(1, end - maxVisible + 1);
    }

    let html = `<div class="dt-paging"><nav aria-label="pagination">`;

    // First
    html += `<button class="dt-paging-button first ${currentPage === 1 ? "disabled" : ""}" data-p="first">«</button>`;

    // Prev
    html += `<button class="dt-paging-button previous ${currentPage === 1 ? "disabled" : ""}" data-p="prev">‹</button>`;

    // Page numbers
    for (let i = start; i <= end; i++) {
        html += `<button class="dt-paging-button ${i === currentPage ? "current" : ""}" data-p="${i}">${i}</button>`;
    }

    // Next
    html += `<button class="dt-paging-button next ${currentPage === pages ? "disabled" : ""}" data-p="next">›</button>`;

    // Last
    html += `<button class="dt-paging-button last ${currentPage === pages ? "disabled" : ""}" data-p="last">»</button>`;

    html += `</nav></div>`;

    $("#queryPagination").html(html);
}
$("body").on("click", ".dt-paging-button", function () {
    if ($(this).hasClass("disabled")) return;

    var p = $(this).data("p");

    if (p === "first") currentPage = 1;
    else if (p === "prev") currentPage = Math.max(1, currentPage - 1);
    else if (p === "next") currentPage += 1;
    else if (p === "last") {
        currentPage = Math.ceil(parseInt($("#queryTotal").text().match(/\d+/)[0]) / limit);
    } else {
        currentPage = parseInt(p);
    }

    $("#queryDataBtn").click();
});


    /* ---------- footer ---------- */
    function renderFooter(total) {
        if (!total) {
            $("#queryFooter").html("Showing 0 to 0 of 0 entries");
            return;
        }

        var start = (currentPage - 1) * limit + 1;
        var end = Math.min(currentPage * limit, total);
        $("#queryFooter").html(`Showing ${start} to ${end} of ${total} entries`);
    }

    /* ---------- UI ---------- */
    $('#pagelimit').html(`
       <div class="mp-stats-section"><div class="dt-layout-cell dt-layout-start"><div class="dt-length"><select id="pageLength">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30" selected>30</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <label for="dt-length-0"> entries per page</label></div></div>
        <div class="dt-layout-cell dt-layout-end"><div class="dt-search"><label for="dt-search-0">Search:</label><input id="searchBox" type="text" placeholder="Search..." /></div></div></div>
    `);
    $("#queryDataBtn").trigger("click");


});