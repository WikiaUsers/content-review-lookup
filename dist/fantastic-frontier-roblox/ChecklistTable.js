$(function() {
    // Variables to determine which save/load methods are available. We want to save checklists persistently for the user when they return.
    var localstorageEnabled, cookiesEnabled = false;
    
    // Checks if localStorage is available.
    var lsTestKey = 'test' + Math.floor(1000 + Math.random() * 99000);
    try {
        localStorage.setItem(lsTestKey, lsTestKey);
        localStorage.removeItem(lsTestKey);
        localstorageEnabled = true;
    } catch(e) {
        localstorageEnabled = false;
    }
    // If localStorage is unavailable, we'll check if cookies are enabled.
    if (!localstorageEnabled) {
        cookiesEnabled = navigator.cookieEnabled;
    }
    // If neither of the 2 save/load methods are available, inform the user that we cannot save their checklists.
    if (!localstorageEnabled && !cookiesEnabled) {
        $(".table-checklist").each(function() {
            $(this).prepend("<thead class='checklist_table_failure'><tr><th colspan='1000'>Saving is not supported on this browser.</th></tr></thead>");
        });
        return;
    }
    
    // Code to get / set cookies from their cookie name. Used if localStorage is unavailable.
    function getCookieValueByRegEx(cookieName) {
        var cookieArray = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
        return cookieArray ? cookieArray.pop() : '';
    }
    function setCookie(cname, cvalue, expiresInDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    // Loads the checklist data for a specific checklist as an object.
    function load(tableId) {
        if (localstorageEnabled) {
            var item = localStorage.getItem("checklist_table_" + tableId);
            return item !== null ? JSON.parse(item) : {};
        } else {
            var cookieValue = getCookieValueByRegEx("checklist_table_" + tableId);
            return cookieValue.length > 0 ? JSON.parse(cookieValue) : {};
        }
    }
    
    // Saves the checklist data for a specific checklist into either localStorage or cookie, whichever the user allows for.
    function save(data, tableId, rowId, checked) {
        data[rowId] = checked;
        var value = JSON.stringify(data);
        if (localstorageEnabled) {
            localStorage.setItem("checklist_table_" + tableId, value);
        } else {
            setCookie("checklist_table_" + tableId, value, 365);
        }
    }
    
    // Called whenever the checklist is loaded or changed. Shows a quick summary of X / Y items checked.
    function updateSummary(table, summary) {
        var rowCount = table.hasClass("grid-table") ? table.find(".grid-item").length : table.find(">tbody>tr").length;
        var checkCount = table.find(".table-checklist-check").length;
        summary.text(checkCount + " / " + rowCount + " items checked");
    }
    
    // To convert from URL to text.
    function escapeHtml(unsafe) {
        return decodeURIComponent(unsafe
            .replace(/"/g, "&quot;")
            .replace(/%~/g, "-")
            .replace(/_/g, " ")
            .replace(/\\/g, ""));
    }
    
    // Converts an article name & hash to a nicely readable format.
    function formatArticleName(articleName) {
        var name = articleName, hash = null;
        if (articleName.indexOf("#") > -1) {
            var result = articleName.split("#");
            name = result[0];
            hash = result[1];
        }
        return escapeHtml(name) + ((hash !== null) ? " » " + escapeHtml(hash) : "");
    }
    
    // Implementation of initializing grid items.
    $(".grid-table .grid-item").each(function() {
        var item = $(this);
        var isChecklistItem = item.parent().hasClass("table-checklist");
        var hasTitle = item.parent(".grid-table").hasClass("show-titles");
        
        var newItem = $("<a class=\"grid-item\"><img/></a>");
        if (item.attr("data-article").length > 0) {
            newItem.attr("href", "/wiki/" + item.attr("data-article"));
            if (hasTitle)
                newItem.append($("<div class=\"grid-item-title\"></div>").text(formatArticleName(item.attr("data-article"))));
        }
        
        var oldImg = item.find("img");
        newItem.find("img").attr("src", oldImg.attr("data-src") !== undefined ? oldImg.attr("data-src") : oldImg.attr("src"));
        
        if (item.attr("data-quantity").length > 0)
            newItem.append($("<span class=\"grid-item-quantity\"></span>").text(item.attr("data-quantity")));
        
        if (item.attr("data-id").length > 0)
            newItem.attr("data-id", item.attr("data-id")).append($("<input type=\"checkbox\"></input>"));
        
        item.replaceWith(newItem);
    });
    
    // Implementation of listening to the checklists.
    $(".table-checklist").each(function() {
        var table = $(this);
        var summary = $("<p class='table-checklist-summary'><b>- / - items checked</b></p>");
        table.before(summary);
        summary = summary.find("b");
        var classes = table.attr("class").split(' ');
        var tableId = "default";
        // Loop and try find a classname fitting the 'table-checklist-id-XXX' identification.
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].length > 19 && classes[i].indexOf("table-checklist-id-") === 0) {
                tableId = classes[i].substr(19).replace(/\W/g, '');
                break;
            }
        }
        var loadData = load(tableId);
        // Grid tables aren't tables, but divs. Div soup!
        if (table.hasClass("grid-table")) {
            var toggleSilhouettes = $("<label class=\"grid-table-silhouettes\"><input type=\"checkbox\"></input>Enable silhouettes</label>");
            table.before(toggleSilhouettes);
            var silhouette_toggle = toggleSilhouettes.find("input");
            
            toggleSilhouettes.find("input").click(function() {
                table.removeClass("silhouette-mode");
                if (toggleSilhouettes.find("input:checked").length > 0)
                    table.addClass("silhouette-mode");
            });
            
            table.find(".grid-item").each(function() {
                var item = $(this);
                var id = item.attr("data-id");
                if (id.length === 0)
                    id = "default";
                var checked = loadData[id] || false; // Is the checklist item checked?
                item.find("input").attr("checked", checked);
                if (checked)
                    item.addClass("table-checklist-check");
                item.find("input").click(function() {
                    checked = !checked;
                    save(loadData, tableId, id, checked);
                    if (checked) {
                        item.addClass("table-checklist-check"); // CSS to style checked items.
                    } else {
                        item.removeClass("table-checklist-check");
                    }
                    updateSummary(table, summary);
                });
            });
        } else { // Actual listing tables.
            // Clicking a hyperlink should not toggle a checklist item.
            table.find("tr a").click(function(event) {
                event.stopPropagation();
            });
            // Prepend an empty header cell if the table uses a header
            table.find(">thead>tr").prepend("<th></th>");
            // Initialize the checkbox for each row in the table. Entries are saved as their first-cell text with only alphanumeric characters. Only take the direct rows, not nested tables.
            table.find(">tbody>tr").each(function() {
                var row = $(this);
                var rowId = row.find(">td:first-child").text().replace(/\W/g, '');
                if (rowId.length === 0) { // If there's no text in the first column, use default.
                    rowId = "default";
                }
                // Prepend in a checkbox as indicator of a checklist item's state.
                row.prepend("<td class='table-checklist-box'><input type='checkbox'/></td>");
                var checked = loadData[rowId] || false; // Is the checklist item checked?
                row.find(".table-checklist-box>input").attr("checked", checked);
                if (checked) {
                    row.addClass("table-checklist-check");
                }
                // Click listener to toggle a checklist item's checked status.
                row.click(function() {
                    checked = !checked;
                    row.find(".table-checklist-box>input").attr("checked", checked);
                    save(loadData, tableId, rowId, checked);
                    if (checked) {
                        row.addClass("table-checklist-check"); // CSS to style checked items.
                    } else {
                        row.removeClass("table-checklist-check");
                    }
                    updateSummary(table, summary);
                });
            });
        }
        updateSummary(table, summary);
    });
});