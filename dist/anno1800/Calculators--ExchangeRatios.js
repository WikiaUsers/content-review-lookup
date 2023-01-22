//Set up the id used to call the calculator
var container = $('#exchange_value_calculator');

//Array with all goods as single objects, with names and values for export/import
var goods = [
{name:"advanced weapons", exchangevalue:"4097.7803525", import_multiplier:"0"},
{name:"alpaca wool", exchangevalue:"49.179998", import_multiplier:"0"},
{name:"aluminium profiles", exchangevalue:"892.015888", import_multiplier:"0"},
{name:"atole", exchangevalue:"462.19999", import_multiplier:"0"},
{name:"bauxite", exchangevalue:"547.483938", import_multiplier:"0"},
{name:"bear fur", exchangevalue:"1337.609664", import_multiplier:"0"},
{name:"beef", exchangevalue:"157.34376", import_multiplier:"1"},
{name:"beer", exchangevalue:"517.77842", import_multiplier:"1.4"},
{name:"beeswax", exchangevalue:"162.3818196", import_multiplier:"1"},
{name:"billiard tables", exchangevalue:"3080.511905", import_multiplier:"0"},
{name:"biscuits", exchangevalue:"1827.611183", import_multiplier:"0"},
{name:"bombs", exchangevalue:"2570.77769", import_multiplier:"0"},
{name:"bowler hats", exchangevalue:"449.454152", import_multiplier:"1.4"},
{name:"brass", exchangevalue:"201.736355", import_multiplier:"1.4"},
{name:"bread", exchangevalue:"269.56109", import_multiplier:"1.2"},
{name:"bricks", exchangevalue:"163.236355", import_multiplier:"0"},
{name:"calamari", exchangevalue:"157.5599935", import_multiplier:"0"},
{name:"camphor wax", exchangevalue:"241.079993", import_multiplier:"0"},
{name:"canned food", exchangevalue:"987.36387", import_multiplier:"1.4"},
{name:"caoutchouc", exchangevalue:"231.879998", import_multiplier:"1.4"},
{name:"care packages", exchangevalue:"2735.08317", import_multiplier:"0"},
{name:"caribou meat", exchangevalue:"645.70604", import_multiplier:"1"},
{name:"celluloid", exchangevalue:"1935.202929", import_multiplier:"0"},
{name:"cement", exchangevalue:"72.481815", import_multiplier:"1.2"},
{name:"ceramics", exchangevalue:"900.0720664", import_multiplier:"0"},
{name:"champagne", exchangevalue:"1013.6174225", import_multiplier:"1.6"},
{name:"chassis", exchangevalue:"1039.755038", import_multiplier:"0"},
{name:"cherry wood", exchangevalue:"165.35158", import_multiplier:"0"},
{name:"chewing gum", exchangevalue:"1374.338889", import_multiplier:"0"},
{name:"chocolate", exchangevalue:"1012.116196", import_multiplier:"1.2"},
{name:"cigars", exchangevalue:"2083.353938 ", import_multiplier:"1.6"},
{name:"cinnamon", exchangevalue:"241.079993", import_multiplier:"0"},
{name:"citrus", exchangevalue:"241.079993", import_multiplier:"0"},
{name:"clay", exchangevalue:"106.46363", import_multiplier:"1"},
{name:"clay pipes", exchangevalue:"1161.0965455", import_multiplier:"1.4"},
{name:"coal", exchangevalue:"102.96363", import_multiplier:"1"},
{name:"cocoa", exchangevalue:"224.879998", import_multiplier:"0"},
{name:"coconut oil", exchangevalue:"241.079993", import_multiplier:"0"},
{name:"coffee", exchangevalue:"920.936198", import_multiplier:"1.4"},
{name:"coffee beans", exchangevalue:"269.679998", import_multiplier:"0"},
{name:"cognac", exchangevalue:"1700.486258", import_multiplier:"0"},
{name:"copper", exchangevalue:"72.481815", import_multiplier:"1.2"},
{name:"corn", exchangevalue:"265.479998", import_multiplier:"1"},
{name:"costumes", exchangevalue:"2411.1678025", import_multiplier:"0"},
{name:"cotton", exchangevalue:"241.679998", import_multiplier:"0"},
{name:"cotton fabric", exchangevalue:"270.559996", import_multiplier:"1.4"},
{name:"dried meat", exchangevalue:"286.67659514", import_multiplier:"0"},
{name:"dung", exchangevalue:"160", import_multiplier:"0"},
{name:"dynamite", exchangevalue:"1412.0550425", import_multiplier:"1"},
{name:"electric cables", exchangevalue:"993.418013", import_multiplier:"0"},
{name:"elevators", exchangevalue:"5029.918415", import_multiplier:"0"},
{name:"ethanol", exchangevalue:"893.629438", import_multiplier:"0"},
{name:"fans", exchangevalue:"7297.735776", import_multiplier:"0"},
{name:"felt", exchangevalue:"78.059996", import_multiplier:"1.2"},
{name:"fertiliser", exchangevalue:"221.439994", import_multiplier:"0"},
{name:"filaments", exchangevalue:"775.50273", import_multiplier:"1.2"},
{name:"film reel", exchangevalue:"2691.3209715", import_multiplier:"0"},
{name:"finery", exchangevalue:"259.9409124", import_multiplier:"0"},
{name:"fire extinguishers", exchangevalue:"1860.410558", import_multiplier:"0"},
{name:"fish", exchangevalue:"70.43361", import_multiplier:"1"},
{name:"fish oil", exchangevalue:"84.5259961", import_multiplier:"0"},
{name:"flour", exchangevalue:"194.01564", import_multiplier:"0"},
{name:"fried plantains", exchangevalue:"250.7059891", import_multiplier:"1"},
{name:"fur coats", exchangevalue:"1162.744676", import_multiplier:"1.2"},
{name:"furs", exchangevalue:"387.67188", import_multiplier:"1.2"},
{name:"gas", exchangevalue:"2330.9184", import_multiplier:"0"},
{name:"glass", exchangevalue:"338.5609425", import_multiplier:"1"},
{name:"glasses", exchangevalue:"996.6566975", import_multiplier:"1.4"},
{name:"goat milk", exchangevalue:"109.7318196", import_multiplier:"0"},
{name:"gold", exchangevalue:"1432.652", import_multiplier:"1.6"},
{name:"gold ore", exchangevalue:"784.23912", import_multiplier:"1.2"},
{name:"goose feathers", exchangevalue:"184.308456", import_multiplier:"1.4"},
{name:"goulash", exchangevalue:"636.70794", import_multiplier:"1.2"},
{name:"grain", exchangevalue:"177.34376", import_multiplier:"1"},
{name:"gramophones", exchangevalue:"2310.835685", import_multiplier:"1.4"},
{name:"grapes", exchangevalue:"290.67188", import_multiplier:"0"},
{name:"helium", exchangevalue:"1478.1111", import_multiplier:"0"},
{name:"herbs", exchangevalue:"118.479998", import_multiplier:"0"},
{name:"hibiscus petals", exchangevalue:"218.6659098", import_multiplier:"0"},
{name:"hibiscus tea", exchangevalue:"279.086366", import_multiplier:"1.2"},
{name:"hops", exchangevalue:"183.34376", import_multiplier:"1.2"},
{name:"hot sauce", exchangevalue:"312.105904", import_multiplier:"0"},
{name:"huskies", exchangevalue:"901.029888", import_multiplier:"0"},
{name:"husky sleds", exchangevalue:"2703.8893576", import_multiplier:"0"},
{name:"ice cream", exchangevalue:"1869.699349", import_multiplier:"0"},
{name:"illuminated script", exchangevalue:"1547.1570055", import_multiplier:"0"},
{name:"indigo dye", exchangevalue:"229.1545464", import_multiplier:"0"},
{name:"industrial lubricant", exchangevalue:"661.350526", import_multiplier:"0"},
{name:"iron", exchangevalue:"102.96363", import_multiplier:"1"},
{name:"jalea", exchangevalue:"705.4457795", import_multiplier:"0"},
{name:"jam", exchangevalue:"165.35158", import_multiplier:"0"},
{name:"jewellery", exchangevalue:"2158.776587", import_multiplier:"1.6"},
{name:"lacquer", exchangevalue:"1591.6449605", import_multiplier:"0"},
{name:"lanterns", exchangevalue:"1370.2368446", import_multiplier:"0"},
{name:"leather boots", exchangevalue:"554.2391464", import_multiplier:"1.4"},
{name:"lemonade", exchangevalue:"1233.3093335", import_multiplier:"0"},
{name:"light bulbs", exchangevalue:"1780.6027725", import_multiplier:"1.4"},
{name:"linen", exchangevalue:"178.6318196", import_multiplier:"1.2"},
{name:"linseed", exchangevalue:"141.7886366", import_multiplier:"0"},
{name:"lobster", exchangevalue:"183.32659306", import_multiplier:"0"},
{name:"malt", exchangevalue:"219.116485", import_multiplier:"1.4"},
{name:"medicine", exchangevalue:"2914.298914", import_multiplier:"0"},
{name:"mezcal", exchangevalue:"866.051179", import_multiplier:"0"},
{name:"milk", exchangevalue:"22", import_multiplier:"0"},
{name:"minerals", exchangevalue:"710.296944", import_multiplier:"0"},
{name:"motor", exchangevalue:"4632.725882", import_multiplier:"0"},
{name:"mud bricks", exchangevalue:"942.3220664", import_multiplier:"0"},
{name:"nandu feathers", exchangevalue:"18", import_multiplier:"0"},
{name:"nandu leather", exchangevalue:"72.979998", import_multiplier:"0"},
{name:"oil lamps", exchangevalue:"624.8226894", import_multiplier:"0"},
{name:"orchid", exchangevalue:"115.679998", import_multiplier:"0"},
{name:"ornate candles", exchangevalue:"581.5229846", import_multiplier:"0"},
{name:"pamphlets", exchangevalue:"925.415878", import_multiplier:"0"},
{name:"paper", exchangevalue:"730.7985691", import_multiplier:"0"},
{name:"parkas", exchangevalue:"2165.6458336", import_multiplier:"0"},
{name:"pearls", exchangevalue:"344.239987", import_multiplier:"1.4"},
{name:"pemmican", exchangevalue:"1007.1827104", import_multiplier:"0"},
{name:"penny farthings", exchangevalue:"1811.122448", import_multiplier:"1"},
{name:"perfumes", exchangevalue:"2161.144169", import_multiplier:"0"},
{name:"pigments", exchangevalue:"1811.3562265", import_multiplier:"0"},
{name:"pigs", exchangevalue:"74.01564", import_multiplier:"1"},
{name:"plantains", exchangevalue:"113.579998", import_multiplier:"1"},
{name:"pocket watches", exchangevalue:"3068.960233", import_multiplier:"1.4"},
{name:"police equipment", exchangevalue:"1301.314036", import_multiplier:"0"},
{name:"ponchos", exchangevalue:"116.219992", import_multiplier:"0"},
{name:"potatoes", exchangevalue:"61.84376", import_multiplier:"1"},
{name:"quartz sand", exchangevalue:"80.3045425", import_multiplier:"1"},
{name:"red peppers", exchangevalue:"244.67188", import_multiplier:"1"},
{name:"reinforced concrete", exchangevalue:"764.769525", import_multiplier:"0"},
{name:"resin", exchangevalue:"165.35158", import_multiplier:"0"},
{name:"rum", exchangevalue:"267.455932", import_multiplier:"1.4"},
{name:"sails", exchangevalue:"104.71733", import_multiplier:"0"},
{name:"salt", exchangevalue:"86.53568274", import_multiplier:"0"},
{name:"saltpetre", exchangevalue:"197.3045425", import_multiplier:"1"},
{name:"sanga cow", exchangevalue:"136.8545464", import_multiplier:"1"},
{name:"sausages", exchangevalue:"149.56109", import_multiplier:"1"},
{name:"schnapps", exchangevalue:"121.20316", import_multiplier:"1"},
{name:"scooter", exchangevalue:"9135.7141145", import_multiplier:"0"},
{name:"seafood stew", exchangevalue:"1353.99171726", import_multiplier:"1.4"},
{name:"seal skin", exchangevalue:"80.6062816", import_multiplier:"0"},
{name:"sea mines", exchangevalue:"2445.95496", import_multiplier:"0"},
{name:"sewing machines", exchangevalue:"812.7387", import_multiplier:"1.4"},
{name:"shampoo", exchangevalue:"1139.916836", import_multiplier:"0"},
{name:"sleds", exchangevalue:"878.1721096", import_multiplier:"0"},
{name:"sleeping bags", exchangevalue:"375.5268176", import_multiplier:"0"},
{name:"soap", exchangevalue:"205.39745", import_multiplier:"1"},
{name:"soccer balls", exchangevalue:"366.29999", import_multiplier:"0"},
{name:"souvenirs", exchangevalue:"1273.6803335", import_multiplier:"0"},
{name:"spiced flour", exchangevalue:"740.1224012", import_multiplier:"0"},
{name:"spices", exchangevalue:"203.0659098", import_multiplier:"1.4"},
{name:"steam carriages", exchangevalue:"7914.931003 ", import_multiplier:"1.6"},
{name:"steam motors", exchangevalue:"2699.361665", import_multiplier:"0"},
{name:"steel", exchangevalue:"347.01816", import_multiplier:"1.2"},
{name:"steel beams", exchangevalue:"638.69996", import_multiplier:"0"},
{name:"sugar", exchangevalue:"342.565398", import_multiplier:"0"},
{name:"sugar cane", exchangevalue:"115.679998", import_multiplier:"0"},
{name:"tailored suits", exchangevalue:"983.7046156", import_multiplier:"1.2"},
{name:"tallow", exchangevalue:"133.852", import_multiplier:"1"},
{name:"tapestries", exchangevalue:"914.169867", import_multiplier:"1.2"},
{name:"teff", exchangevalue:"255.1545464", import_multiplier:"0"},
{name:"telephones", exchangevalue:"2926.40206", import_multiplier:"1.6"},
{name:"timber", exchangevalue:"83.00782", import_multiplier:"1"},
{name:"tobacco", exchangevalue:"588.879998", import_multiplier:"1.2"},
{name:"tortillas", exchangevalue:"853.494558", import_multiplier:"1"},
{name:"toys", exchangevalue:"4506.805286", import_multiplier:"0"},
{name:"typewriters", exchangevalue:"3399.0630255", import_multiplier:"0"},
{name:"violins", exchangevalue:"3005.9121005", import_multiplier:"0"},
{name:"wanza timber", exchangevalue:"99.0659098", import_multiplier:"0"},
{name:"water drop", exchangevalue:"614.39994", import_multiplier:"0"},
{name:"weapons", exchangevalue:"463.06361", import_multiplier:"0"},
{name:"whale oil", exchangevalue:"278.4694224", import_multiplier:"0"},
{name:"windows", exchangevalue:"679.1532825", import_multiplier:"0"},
{name:"wood", exchangevalue:"69.33594", import_multiplier:"1"},
{name:"wood veneers", exchangevalue:"724.87504", import_multiplier:"1.4"},
{name:"wool", exchangevalue:"28.67188", import_multiplier:"1"},
{name:"work clothes", exchangevalue:"90.03128", import_multiplier:"1"},
{name:"zinc", exchangevalue:"72.481815", import_multiplier:"1.2"}
];

//Array with export multipliers
var multipliers = [
{name:"Common x1", export_multiplier:"1"},
{name:"Uncommon x1.2", export_multiplier:"1.2"},
{name:"Rare x1.4", export_multiplier:"1.4"},
{name:"Epic x1.6", export_multiplier:"1.6"},
{name:"Legendary x2", export_multiplier:"2"}
];

//Making a list of names of export goods to create dropdown input fields
var export_goods_datalist = $("<datalist id='calculator_exchangeratios_exportgoods_list'></datalist>");
for( var good of goods ) {
	export_goods_datalist.append( $("<option></option>").val(good.name) );
}
container.append(export_goods_datalist);

//Making a list of names of import goods to create dropdown input fields
var import_goods_datalist = $("<datalist id='calculator_exchangeratios_importgoods_list'></datalist>");
for( var good of goods ) {
	if (good.import_multiplier !== "0") {
		import_goods_datalist.append( $("<option></option>").val(good.name) );
	}
}
container.append(import_goods_datalist);

//Defining elements of the calculator: labels and input boxes
var Label_export_good=$("<label class='calculator_input_label'></label>").text("Exported Good: ").css({"width":"150px","float":"left"});
var Input_export_good=$("<input type=text class='calculator_input_text' id='calculator_exchangeratios_export' list='calculator_exchangeratios_exportgoods_list'>"); //.css({"background-color":"white","border":"1px solid black"});

var Label_export_good_tons=$("<label class='calculator_input_label'></label>").text("Tons: ").css({"margin-left":"2.5em"});
var Input_export_good_tons=$("<input type=number class='calculator_input_amount' id='calculator_exchangeratios_export_tons'>");  //.css({"background-color":"white","border":"1px solid black"});

var Label_export_multiplier=$("<label class='calculator_input_label'></label>").text("Exporter Level: ").css({"width":"150px","float":"left"});
var Input_export_multiplier=$("<select class='calculator_input_dropdown' id='calculator_exchangeratios_export_multiplier'></select>").html("\
	<option>Common x1</option>\
	<option>Uncommon x1.2</option>\
	<option>Rare x1.4</option>\
	<option>Epic x1.6</option>\
	<option>Legendary x2</option>\
	");
var Label_import_good=$("<label class='calculator_input_label'></label>").text("Imported Good: ").css({"width":"150px","float":"left"});
var Input_import_good=$("<input type=text class='calculator_input_text' id='calculator_exchangeratios_import' list='calculator_exchangeratios_importgoods_list'>"); //.css({"background-color":"white","border":"1px solid black"});

var Label_import_good_tons=$("<label></label>").text("Tons: ").css({"margin-left":"2.5em"});
var Input_import_good_tons=$("<input type=number class='calculator_input_amount' id='calculator_exchangeratios_import_tons'>"); //.css({"background-color":"white","border":"1px solid black"});

//Defining buttons and the placeholder of the calculator's result
var button_calc = $("<button class='calculator_button'></button>").text("Calculate");
var button_clear = $("<button class='calculator_button'></button>").text("Clear").css({"margin-left":"2.5em"});
var value=$("<p class='calculator_finaloutput' id='calculator_exchangeratios_value'>Exchange Ratio:</p>");

//Adding the contents of the calculator onto a page where there is an element with container's id
container.append(Label_export_good, Input_export_good, Label_export_good_tons, Input_export_good_tons, "<br>", Label_export_multiplier, Input_export_multiplier,"<br><br>", Label_import_good, Input_import_good, Label_import_good_tons, Input_import_good_tons);
container.append("<br><br>", button_calc, button_clear);
container.append("<br>",value);
  
//Programming the calculation button
button_calc.click( function() {
  	
	//Defining and getting input values
	var exporter_level=document.getElementById('calculator_exchangeratios_export_multiplier').value;
	var exporter_level_found = multipliers.find(function (element) {
		return element.name === exporter_level;
		});
	var multiplier_export = Number(exporter_level_found.export_multiplier);
	var exported_good_raw = document.getElementById('calculator_exchangeratios_export').value;
	var exported_good = exported_good_raw.toLowerCase();
	var imported_good_raw = document.getElementById('calculator_exchangeratios_import').value;
	var imported_good = imported_good_raw.toLowerCase();
	var export_tons = document.getElementById('calculator_exchangeratios_export_tons').value;
	var import_tons = document.getElementById('calculator_exchangeratios_import_tons').value;
	
	//Checking if input is present in the array of goods
	var exported_good_found = goods.find(function (element) {
		return element.name === exported_good;
		});
	var imported_good_found = goods.find(function (element) {
		return element.name === imported_good;
		});
		
	//If input is incorrect show error, if it's correct, do calculations
	if (typeof(exported_good_found) != "object" ) {
		$("#calculator_exchangeratios_value").html("Error! Wrong name of exported good");
	} else if (typeof(imported_good_found) != "object") {
		$("#calculator_exchangeratios_value").html("Error! Wrong name of imported good");
	} else {

		//When input is correct, obtain values of goods from the array
		var value_export = Number(exported_good_found.exchangevalue);
		var value_import = Number(imported_good_found.exchangevalue);
		var multiplier_import = Number(imported_good_found.import_multiplier);

		//Checking if selected import good is available for import
		if (multiplier_import === 0) {
			$("#calculator_exchangeratios_value").html("Error! The good chosen for import cannot be imported via Docklands");
		} else {
			
			//Calculating the exchange ratio
	    	var ratio = value_import / value_export * multiplier_import / multiplier_export;
	
			//Checking which good is more valuable
	    	if (ratio<1) {
	    		ratio = 1 / ratio;
	    		var result="1" + ":" + ratio;
	        	var ratio_rounded = ratio.toFixed(3);
	        	var result_rounded = "1" + ":" + ratio_rounded;
	        	if (export_tons.length === 0 && import_tons.length === 0) { 
	    			$("#calculator_exchangeratios_export_tons").val(500);
	    			$("#calculator_exchangeratios_import_tons").val(Math.floor(500*ratio));
	    		} else if (export_tons.length === 0 && import_tons.length !== 0) {
	    			$("#calculator_exchangeratios_export_tons").val(Math.ceil(import_tons/ratio));
	    			$("#calculator_exchangeratios_import_tons").val(import_tons);
	    		} else if (export_tons.length !== 0 && import_tons.length === 0) {
	    			$("#calculator_exchangeratios_export_tons").val(export_tons);
	    			$("#calculator_exchangeratios_import_tons").val(Math.floor(export_tons*ratio));
	    		} else if (export_tons.length !== 0 && import_tons.length !== 0) {
	    			$("#calculator_exchangeratios_export_tons").val(export_tons);
	    			$("#calculator_exchangeratios_import_tons").val(Math.floor(export_tons*ratio));
	    		}
	    	} else {
	    		var result=ratio + ":" + "1";
	        	var ratio_rounded = ratio.toFixed(3);
	        	var result_rounded =  ratio_rounded + ":" + "1";
	            if (export_tons.length === 0 && import_tons.length === 0) { 
	    			$("#calculator_exchangeratios_export_tons").val(500);
	    			$("#calculator_exchangeratios_import_tons").val(Math.floor(500/ratio));
	    		} else if (export_tons.length === 0 && import_tons.length !== 0) {
	    			$("#calculator_exchangeratios_export_tons").val(Math.ceil(import_tons*ratio));
	    			$("#calculator_exchangeratios_import_tons").val(import_tons);
	    		} else if (export_tons.length !== 0 && import_tons.length === 0) {
	    			$("#calculator_exchangeratios_export_tons").val(export_tons);
	    			$("#calculator_exchangeratios_import_tons").val(Math.floor(export_tons/ratio));
	    		} else if (export_tons.length !== 0 && import_tons.length !== 0) {
	    			$("#calculator_exchangeratios_export_tons").val(export_tons);
	    			$("#calculator_exchangeratios_import_tons").val(Math.floor(export_tons/ratio));
	    		}
	    	}
    	
    		var final = "Exchange Ratio: "+ result_rounded + "<br>" + "(More accurate value: " + result + ")";
    		$("#calculator_exchangeratios_value").html(final);
		}
	}
});  //Programming calculation button is finished

//Programming button to clear the input boxes
button_clear.click( function() {
	$("#calculator_exchangeratios_export").val("");
	$("#calculator_exchangeratios_import").val("");
	$("#calculator_exchangeratios_export_tons").val("");
	$("#calculator_exchangeratios_import_tons").val("");
	$("#calculator_exchangeratios_export_multiplier").val("Common x1");
	$("#calculator_exchangeratios_value").html("Exchange Ratio:");
});