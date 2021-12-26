function formatTable(table) {
    var headers = $('th', table).toArray();

    var result = '';
    var parsedOutput = formatRows($('tr', table), headers)
    
    function extractHeader(headerIndex) {
    	result += headers[headerIndex].outerHTML;
    }
    
    for (var i = 0; i < parsedOutput.length; i++) {
    	var output = parsedOutput[i];
    	
    	var attributes = Object.entries(output.globalAttributes)
        for (var j = 0; j < attributes.length; j++) {
        	var attribute = attributes[j];
            result += "<p><b>" + attribute[0] + ":</b> " + attribute[1] + "<p>";
        }
        result += '<table class="FoETable">'
        
        output.columnHeaderIndicies.forEach(extractHeader);

        for (var k = 0; k < output.tdsToKeep.length; k++) {
        	var row = output.tdsToKeep[k];
            var content = row.map(function (e) { return e.outerHTML }).join('')
            result += "<tr>" + content + "</tr>"
        }
        result += '</table>';
    }

    return result
}

function formatRows(rows, headers) {
    var rowspans = headers.map(function () {return 0});
    var currentSummary = createSummary();
    var listOfSummaries = [];
    var firstRow = true;

	var rowArray = rows.toArray()
    for (var rowIndex = 0; rowIndex < rowArray.length; rowIndex++) {
    	var row = rowArray[rowIndex];
        var cells = $('td', row);
        if (cells.length === 0) {
            continue; // It is probably a header line
        }
        var indexIntoCellList = 0;
        var cellsToKeep = [];
        var globalAttributes = {};
        var rowHasRowspan = false
        for (var column = 0; column < rowspans.length; column++) {
            // If the rowspan of the column is zero it is expected to have a corresponding td
            if (rowspans[column] === 0) {
                var rowspan = cells[indexIntoCellList].getAttribute('rowspan') || 1
                var headerName = headers[indexIntoCellList].innerText;

                if (rowspan > 1) {
                    rowHasRowspan = true
                    globalAttributes[headerName] = cells[indexIntoCellList].innerHTML;
                } else {
                    cellsToKeep.push(cells[indexIntoCellList]);
                    currentSummary.columnHeaderIndicies.add(column)
                }

                rowspans[column] = rowspan;
                // We only need to increment this if the rowspan is zero otherwise
                // the cell from above is expanded down and there is no element in the cells array
                indexIntoCellList++;
            }
            rowspans[column]--;
        }
        if (rowHasRowspan) {
            if (firstRow) {
                firstRow = false;
            } else {
                listOfSummaries.push(currentSummary)
                currentSummary = createSummary()
            }
            // We need to save the global attributes after creating a new summary object
            // otherwise the first iteration will be skipped and we have an off by one error
            currentSummary.globalAttributes = globalAttributes
        }
        if (cellsToKeep.length > 0) {
            currentSummary.tdsToKeep.push(cellsToKeep)
        }
    }
    listOfSummaries.push(currentSummary)

    return listOfSummaries;
}

function createSummary() {
    return {
        tdsToKeep: [],
        globalAttributes: [],
        columnHeaderIndicies: new Set(),
    };
}

function refactorTables() {
	console.log('Running table formatting')
	var table = $('.responsive-FoETable');
	var output = formatTable(table)
	table.after($("<hr /><div>" + output + "</div>"));
}

if (window.mw.config.get('wgPageName') === "User:Mamazu/Sandbox") {
	$(document).ready(refactorTables);
}