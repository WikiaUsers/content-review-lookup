// Previous project, Google Spreadsheet Get Value, can't be made because of some security restrictions, that says MediaWiki doesn't allow direct access to external spreadsheets using JavaScript. Hence this is made inside the website it self as a turn-around.
// The current javascript code allows the user to show their a table values, so that whatever changes made to that table will be updated every 1 minute
// [This code might not work if it is published in dev.fandom.com due to "manually & specificly connecting each cells by column desired in data-row-index" to the table in Secret_Wiki_Table. If any coder wants to code this GTVPR you are very welcomed (which means, you might need some coding experience that sets rows, columns, readings, cell location, and cell count)]
// GTVPR = Get Table Value Per Row

		(function ($) {
		  // Fetch the data container element (replace with your element's ID)
		  var dataContainer = $('#your-data-container');
		
		  // Function to retrieve data from the MediaWiki page
		  function fetchData(rowIndex) {
		    $.ajax({
		      url: mw.config.get('wgScript') + '?action=raw&title=Secret_Wiki_Table', // Replace with your data page name
		      dataType: 'text',
		      success: function (data) {
		        console.log("Raw data fetched:", data); // Debugging: Log the raw data
		
		        // Basic function to convert wiki table markup to HTML
		        function wikiTableToHtml(wikiText) {
		          var html = wikiText
		            .replace(/\{\|[^\n]*/g, '<table class="wikitable">')
		            .replace(/\|\-/g, '<tr>')
		            .replace(/\|\}/g, '</table>')
		            .replace(/^\!(.*?)\n/gm, '<th>$1</th>')
		            .replace(/^\|(.*?)\n/gm, '<td>$1</td>');
		          return html;
		        }
				
		        // Convert the wiki markup to HTML
		        var htmlData = wikiTableToHtml(data);
		        console.log("Converted HTML:", htmlData); // Debugging: Log the converted HTML
		
		        // Parse the converted HTML
		        var tableData = $('<div>' + htmlData + '</div>').find('table.wikitable');
		        console.log("Parsed table data:", tableData); // Debugging: Log the parsed table data
		
		        if (tableData.length) {
		          // Get the row index from the data attribute
		          var rowIndex = parseInt($('#GTVPR_Selector').attr('data-row-index'), 10);
		          var rows = tableData.find('tr');
		          
		          // Change index to select a specific row (0-based), get rowIndex from function parameter
		          var selectedRow = rows.eq(rowIndex); 
		
		          // Extract data from the selected row's cells and replace &nbsp; with <br>
		          var cell0 = selectedRow.find('td:eq(0)').html();
		          var cell1 = selectedRow.find('td:eq(1)').html();
		          var cell2 = selectedRow.find('td:eq(2)').html();
		          var cell3 = selectedRow.find('td:eq(3)').html();
		          var cell4 = selectedRow.find('td:eq(4)').html();
		          var cell5 = selectedRow.find('td:eq(5)').html();
		          var cell6 = selectedRow.find('td:eq(6)').html();
		          var cell7 = selectedRow.find('td:eq(7)').html();
		          var cell8 = selectedRow.find('td:eq(8)').html();
		          var cell9 = selectedRow.find('td:eq(9)').html();
		          var cell10 = selectedRow.find('td:eq(10)').html();
		
		          // Update data container elements (replace with your element IDs)
		          $('#GTVPR_0').html(cell0);
		          $('#GTVPR_1').html(cell1);
		          $('#GTVPR_2').html(cell2);
		          $('#GTVPR_3').html(cell3);
		          $('#GTVPR_4').html(cell4);
		          $('#GTVPR_5').html(cell5);
		          $('#GTVPR_6').html(cell6);
		          $('#GTVPR_7').html(cell7);
		          $('#GTVPR_8').html(cell8);
		          $('#GTVPR_9').html(cell9);
		          $('#GTVPR_10').html(cell10);
		
		        } else {
		          console.error('Data table not found on the page.');
		        }
		      },
		      error: function (jqXHR, textStatus, errorThrown) {
		        console.error('Error fetching data:', textStatus, errorThrown);
		      }
		    });
		  }
			
		  $(document).ready(function() {
		    fetchData(); // Initial call
		    setInterval(fetchData, 60000); // Subsequent calls every 1 minutes
		  });
		})(jQuery);



// Code has been proven to be working using the Test Mode.
// Please recheck the code before accepting so that every id doesn't crash to each other, Thank you.