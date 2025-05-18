/* based on : https://pad.fandom.com/wiki/MediaWiki:FilterTable.js  */
/* changed to vanilla js */
/* use class 'filterable' on a table to activate */
/* use class 'unfilterable' on a table header to disable for that column */

function filterTable() {
	/* get all filterable tables in page and generate sorting menus and actions for them */
    document.querySelectorAll("table.filterable").forEach(function(table) {
        let i = 0;
        let cols;

        /* get the header cells and generate filter menus */
        const headers = table.querySelectorAll("tr:first-child th, tr:first-child td");
        headers.forEach(function(cell) {
            if (!cell.classList.contains("unfilterable")) {
                cols = [];
                const columnIndex = i + 1;
                /* get all the column values */
                const columnCells = table.querySelectorAll(`tr td:nth-child(${columnIndex})`);
                columnCells.forEach(function(columnCell) {
                    cols.push(columnCell.textContent);
                });
				/* generate a unique set of all the colums values for the filter list */
                cols = [...new Set(cols)];
				
                cell.style.position = "relative";
                cell.innerHTML = `<p style="cursor: cell;font-weight:bold;" class='showFilterMenu'>${cell.innerHTML} ▼</p>`;
                const filterMenu = document.createElement("div");
                filterMenu.className = "filterMenu";
                filterMenu.style.top = `${cell.offsetHeight}px`;
                filterMenu.style.display = "none";
                cell.appendChild(filterMenu);
				
				/* order:x; for number options will use first 3 int to sort */
                cols.forEach(function(col, j) {
                	let order_string;
					if (typeof col === 'number' && !isNaN(col)) { 
						order_string = "style='order:" + String(col).substr(0, 3)+";'";
					} else {
						order_string = "";
					}			
                    filterMenu.innerHTML += `<div ${order_string}>
                        <input id="opt${j}${1 + i}" type="checkbox" value="${col}" col="${columnIndex}" class="filterOption" checked>
                        <label for="opt${j}${1 + i}">&nbsp;${col}</label>
                    </div>`;
                });
            }
            i++;
        });

        // set initial condition attribute for all rows
        table.querySelectorAll("tr:nth-child(n+1)").forEach(function(row) {
            row.setAttribute("condition", 0);
        });
    });

    // Show/hide filter menu
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("showFilterMenu")) {
            const filterMenu = e.target.parentElement.querySelector(".filterMenu");
            const visibleMenus = document.querySelectorAll(".filterMenu");
            // Hide all visible menus
            visibleMenus.forEach(menu => {
                if (menu.style.display === "block") {
                    menu.style.display = "none";
                }
            });
            // Toggle the clicked menu
            filterMenu.style.display = filterMenu.style.display === "none" ? "block" : "none";
        } else {
            // Hide all menus if clicking outside
            const containers = document.querySelectorAll(".filterMenu");
            containers.forEach(menu => {
                menu.style.display = "none";
            });
        }
    });

    // Handle filter option click
    document.addEventListener("click", function(element) {
        if (element.target.classList.contains("filterOption")) {
            const selected_col = element.target.getAttribute("col");
			console.log(selected_col);
            const selected_filter = element.target.value;
            const is_checked = element.target.checked ? 1 : -1;
			
			const rows =  document.querySelectorAll("table.filterable tr");
            for (let row of rows) {
                const cell = row.querySelector(`td:nth-child(${selected_col})`);
                if (cell && cell.textContent === selected_filter) {
					var cond = parseInt(row.getAttribute("condition")) + is_checked;
					row.setAttribute("condition", cond);
                    if (cond === 0) {
                        row.style.display = "";
                    } else {
                        row.style.display = "none";
                    }
                }
            }
        }
    });
}

filterTable();