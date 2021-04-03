/*
    JS: Table row counter utility, to count the number of rows for specific tables.
    Also shows the total of all counts.
    
    
    IMPORTANT/!\ README:
    To use this utility, the following wiki templates come into play:
    
    1) Add the {{TableCounter Marker|id=1}} template to the table CSS class, to mark it as supporting being counted; (id = number of the table)
    2) Add the {{TableCounter Value|id=1|default=35}} template, on the place you want to see the result for the count of the table with Marker id=1.
    
    3) Finally, add as many {{TableCounter Total|default=351}} wanted, to show the total of all table counts somewhere on the article page.
    
    Note: The parameters named as "default", exist to fix the issue that no javascript is run on the wikia mobile version, thus the default value is always shown.
        Use the default value which you find appropriate.
*/
function tableCounter(){
	var constants = {
        tableCounter:		'table-counter',
		valueSuffix:	    'value',
		valueWrapperSuffix:	'wrapper',
		tableCounterTotal:	'table-counter-total'
	}
	
	function generateValueId(id){
		return constants.tableCounter + '-' + id + '-' + constants.valueSuffix;
	}
	   
	function parseTableClass(tableClass){		
		var tableIdStr		= constants.tableCounter + '-';
		var indexTableId	= tableClass.indexOf(tableIdStr);
		var id;
		
		if(indexTableId >= 0){
			var indexFinal;			
			
			tableClass = tableClass.substr(indexTableId, tableClass.length);
			indexFinal = tableClass.indexOf(' ');
			
			indexTableId	= tableIdStr.length;
			
			if(indexFinal == -1){
				id  = tableClass.substr(indexTableId);
			} else {
				id	= tableClass.substr(indexTableId, indexFinal-indexTableId);
			}			
		}
		
		return id;
	}
	
	/*
		JS: Returns the tables which support being "counted",
		in the format {tables:[{id: 1, value:35}], total: 345}
	*/
	function countTablesData(){
		var tables = $('table.' + constants.tableCounter);
		
		var tableIdx;
		var tableCounterId;
		var tableCounterValue;
		
		var tablesData = {
			tables: [],
			total:	0
		};
		
		
		for(tableIdx = 0; tableIdx < tables.length; tableIdx++){
			tableCounterId = parseTableClass(tables[tableIdx].getAttribute('class'));
			
			if(tableCounterId){
				tableCounterValue = $(tables[tableIdx]).find('tbody > tr').length;
				
				tablesData.tables.push({id: generateValueId(tableCounterId), value: tableCounterValue});
				tablesData.total += tableCounterValue;
			}
		}
		
		return tablesData;
	}
	
	/*
		JS: Shows a single value.
		Either a sub-total or the total of all table counts.
	*/
	function showValue(id, value){
		var elementValue    = $('.' + id);
		var elementWrapper  = $('.' + id + constants.valueWrapperSuffix);
		
		if(elementValue && elementValue.length){
			elementValue.text(value);
			elementWrapper.show();
		}		
	}
	
	/*
		JS: For each table which supports counting,
		shows the value on the specified placeholder (e.g.: span).
	*/
	function showAllValues(data){
		var placeholder;
		var idx;
		
		/* Shows the total of all */
		showValue(constants.tableCounterTotal, data.total);

		/*
			Shows each Sub-Total on the Screen
		*/
		for(idx = 0; idx < data.tables.length; idx++){
			valuePlaceholder = data.tables[idx];
			showValue(valuePlaceholder.id, valuePlaceholder.value);
		}
	}
	
	function count(){
		var tablesData = countTablesData();
		
		showAllValues(tablesData);
		
		return tablesData;
	}
	
    return {
		"count": count
	};
}

var tCounter    = tableCounter();
var result		= tCounter.count();

/*
    JS: Temporary console.trace to check for any errors
*/
console.trace(result);