// The current javascript code allows the user to show their PUBLIC Google Spreadsheet values without having to publish their Google Spreadsheet
// [This code might not work if it is published in dev.fandom.com due to "manually & specificly connecting each cells by column desired in b_after+1" to the google spreadsheet. If any coder wants to code this GSGV you are very welcomed (which means, you might need some coding experience that sets 'a', 'b', and 'cell to left' / 'cell to right' and the 'cell counts')]

        // Load the Visualization API and the corechart package.
        google.load('visualization', '1', {packages: ['corechart', 'line']});
        google.setOnLoadCallback(drawChart);

        // Create variable placeholder (in case it results in nothing)
        var a; var b; a = b = 1;

        // Function to set 'b' and update hidden div
		function setB(value) {
            b = value;
            document.getElementById('GSGV_editableDiv').innerText = b;
            drawChart(); // Redraw the chart when 'b' changes
        }

        function drawChart() {
            // Put "Studlands" Google Sheets URL
            var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1muAoebMp3Hw8wsrHVaXUHP-FeX6X9TJvBKWJgPMQt6I/edit?usp=sharing";
			
            // Create a query to fetch data from the specified URL
            var query = new google.visualization.Query(spreadsheetUrl);
            query.send(handleQueryResponse);
        }

        // Handle html responses
        function handleQueryResponse(response) {
			
			// If error, tell why
            if (response.isError()) {
                console.error('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            // Get the data table from the response
            var dataTable = response.getDataTable();
			
            // Fetch data using the value of 'b' from the hidden div
            var b_after = parseInt(document.getElementById('GSGV_editableDiv').innerText)-1;
			
			
            // Put a number inside the 'div' tag with an id="editableDiv" to change the value of 'b_after'. Hence showing the desired item "ID"
            // Example: <div id="editableDiv" style="display:none;">[number]</div>
			
			
            // Get specific cell values and display them in the specified HTML elements
            // Use id="GSGV_[Table Type]" in a 'div' tag to display
            // Example: <div id="GSGV_1">[Text before the change || Loading...]</div>
            // NOTE : id GSGV_1 must exists for the js code to work
            document.getElementById("GSGV_1").innerHTML = (dataTable.getValue(b_after, (a)) || "").replace(/&nbsp;/g, '<br>');
            document.getElementById("GSGV_2").innerHTML = (dataTable.getValue(b_after, (a+1)) || "").replace(/&nbsp;/g, '<br>');
            document.getElementById("GSGV_3").innerHTML = (dataTable.getValue(b_after, (a+2)) || "").replace(/&nbsp;/g, '<br>');
            document.getElementById("GSGV_4").innerHTML = (dataTable.getValue(b_after, (a+3)) || "").replace(/&nbsp;/g, '<br>');
            document.getElementById("GSGV_5").innerHTML = (dataTable.getValue(b_after, (a+4)) || "").replace(/&nbsp;/g, '<br>');
			// Extras
            document.getElementById("GSGV_6").innerHTML = (dataTable.getValue(b_after, (a+5)) || "").replace(/&nbsp;/g, '<br>');
            document.getElementById("GSGV_7").innerHTML = (dataTable.getValue(b_after, (a+6)) || "").replace(/&nbsp;/g, '<br>');
            document.getElementById("GSGV_8").innerHTML = (dataTable.getValue(b_after, (a+7)) || "").replace(/&nbsp;/g, '<br>');
            document.getElementById("GSGV_9").innerHTML = (dataTable.getValue(b_after, (a+8)) || "").replace(/&nbsp;/g, '<br>');
            document.getElementById("GSGV_10").innerHTML = (dataTable.getValue(b_after, (a+9)) || "").replace(/&nbsp;/g, '<br>');
		}
		
// The current script works on https://www.w3schools.com/
// Please recheck the code before accepting so that every id doesn't crash to each other, Thank you.