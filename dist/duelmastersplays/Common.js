window.tooltips_config = {
    noCSS: true
};
window.tooltips_list = [
   {
       classname: 'card-tooltip',
       parse: '{'+'{CardTT|<#image#>}}',
   }
];

//=============== Card Database Test / Advanced Card Search ==================
function searchJavaScript() {
	function createRegEx(str){
		var result = ".*";
		var i, char, char2;
		for(i = 0; i<str.length; i++){
			char = str[i].toUpperCase();
			result += "[" + char;
			char2 = str[i].toLowerCase();
			if(char !== char2) result += char2;
			result+="]";
		}
		result+=".*";
		return result;
	}
	function updateContent(elem) {
		var categories = [];
		var exCategories = [];
        var matchTitles = null;
		//Get Categories
		///InputBox Categories
		var inputboxes = elem.querySelectorAll('input[class="searchbox"]');
		inputboxes.forEach(function (inputBox) {
			if (inputBox.value !== "") {
				if(inputBox.id === "matchName-input"){
					matchTitles = inputBox.value;
				}else if(inputBox.id.endsWith('-excludedInput')){
					exCategories.push(inputBox.value);
				}else{
					categories.push(inputBox.value);
				}
			}
		});
		///CheckBox Categories
		var checkboxes = elem.querySelectorAll('input[type="checkbox"]');
		checkboxes.forEach(function(checkbox) {
			if (checkbox.checked) {
				categories.push(checkbox.getAttribute('data-cat'));
			}
		});
        
        var set = 'Any';
        var selectboxes = elem.querySelectorAll('select[class="selectbox"]');
        
		selectboxes.forEach(function (inputBox) {
			if (inputBox.value !== "" && inputBox.value!== 'Any') {
            	if(inputBox.name === 'ExpansionSet'){
            		set = inputBox.value;
				}else if(inputBox.id.endsWith('-excludedInput')){
					exCategories.push(inputBox.value);
				}else{
					categories.push(inputBox.value);
				}
			}
		});

		//number comparisons(eg. Power)
		var conditions = elem.querySelectorAll('select[class="comparisonCondition"]');
		conditions.forEach(function (condition) 
		{
			var n1 = condition.id.indexOf("-inputComparison");
			if(n1 > 0){
				var conditionType = condition.id.substring(0,n1);
				var number = document.getElementById(conditionType+"-inputNumber");
				var catList = document.getElementById(conditionType+"-catList");

				if(number !== null && catList!=null && number.value !== ""){
					console.log("dpl: Found conditon and number "+number.id +" "+catList.id+", Number value is "+number.value );
					var powerCats = catList.value.trim().split(","); //just use half-length of this later for condition inversion if required.
					//check if the number is at the end or start of the category name

					var words = powerCats[0].trim().split(" ");
					var categoryName = powerCats[0].trim();
					var startsWithNumber = false;


					if(isNaN(words[0])){
						console.log("dpl:First word is not a number");
						categoryName = categoryName.substring(0, categoryName.lastIndexOf(" "));

					}
					else{
						console.log("dpl:First word is a number");
						categoryName = categoryName.substring(categoryName.indexOf(" "));
						categoryName = categoryName.trim();
						startsWithNumber = true;
					}

					console.log("dpl: categoryName is ["+categoryName + "] and startsWithNumber is " + startsWithNumber);
					
					//in case conditon is Equals, just add one category
					if(condition.value === "Equals" ){
						categories.push(startsWithNumber?(number.value+" "+categoryName):(categoryName+" "+number.value));
					}
					else{
						var categoriesToInclude = [];
						//if searching for greater than something, the infinite cost/power ones will always be included.
						if(condition.value === "Greater than"){
							categoriesToInclude.push(startsWithNumber?("∞ "+categoryName):(categoryName+" ∞"));
						}

						powerCats.forEach(function (powerCat){
							var power = powerCat.trim().split(" ");
							power = startsWithNumber? power[0] : power[power.length-1];

							if(!isNaN(power)){//process only if numerical power
								if(condition.value === "Greater than" && parseInt(power) > number.value){
									categoriesToInclude.push(startsWithNumber?(power+" "+categoryName):(categoryName+" "+power));
									console.log("dpl:Pushed cat "+(startsWithNumber?(power+" "+categoryName):(categoryName+" "+power)));
								}
								if(condition.value === "Less than" && parseInt(power) < number.value){
									categoriesToInclude.push(startsWithNumber?(power+" "+categoryName):(categoryName+" "+power));
									console.log("dpl:Pushed cat "+(startsWithNumber?(power+" "+categoryName):(categoryName+" "+power)));
								}
							}
							
						});
						categories.push(categoriesToInclude.join("¦"));
					}
				}
			}
		});
		
		if(categories.length === 0 && exCategories.length === 0 && matchTitles === null && set === 'Any'){
			document.getElementById('content-container').innerHTML = "No search parameters specified or invalid number input.";
			return;
		} 
		//Make Changes
		var text = '{{#dpl:uses = Template:Cardtable¦Template:TCGCardtable';
		if(matchTitles !== null) text += '|titleregexp =' + createRegEx(matchTitles);
		if(categories.length > 0) text += '|category = ' + categories.join('|category = ');
		if(exCategories.length > 0) text += '|notcategory = ' + exCategories.join('|notcategory = ');
		if(set !== "Any" && set !== null) text += '|linksfrom=' + set;
		text += '|allowcachedresults = true';
		text += '|count = 100';
		text += '|ordermethod = title';
		text += '|noresultsheader = No cards match the search criteria.';
		text += '}}';
		console.log(text);
		new mw.Api().get({
			action: 'parse',
			text: text,
			contentmodel: 'wikitext',
		}).then(function(data) {
			console.log(data);
			document.getElementById('content-container').innerHTML = data.parse.text['*'];
		});
	}
	
	function addInput(elem, container, cat) {
		if(container === null) return;
		
		var input = document.createElement("input");
		if(cat.startsWith("Excluded")) input.id = cat + "-excludedInput";
        else input.id = cat + "-input";
		input.className = "searchbox";
		
		var label = document.createElement("label");
		label.setAttribute("for", input.id);
		
		container.appendChild(label);
		container.appendChild(input);
        container.setAttribute("class", "paddedCardSearchDiv");
	}
	
	function addCheckBox(elem, container, cat) {
		if(container === null) return;
		container.setAttribute("class", "paddedCardSearchDiv");
		var subcats = container.getAttribute("data-subcats");
		if (subcats === null) return;
		subcats = subcats.split(",");
		
		var containerLabel = document.createElement("label");
		containerLabel.id = cat + "Label";
		containerLabel.setAttribute("for", container.id);
		container.appendChild(containerLabel);
		
		for (var i = 0; i < subcats.length; i++) {
			var checkbox = document.createElement("input");
			checkbox.type = 'checkbox';
			checkbox.id = cat + "-" + subcats[i].replace(/\W/g, '');
			checkbox.setAttribute("data-cat", subcats[i]);
            checkbox.setAttribute("style", "display:none");
			
			var label = document.createElement("label");
			label.setAttribute("for", checkbox.id);
            label.setAttribute("class", "checkBoxCardSearchLabel");
			label.textContent = subcats[i].trim();            
			
			container.appendChild(checkbox);
			container.appendChild(label);
            container.appendChild (document.createTextNode (" "));
		}
	}
	
	
	function addSelectList(elem, container, cat) {
		if(container === null) return;
		container.setAttribute("class", "paddedCardSearchDiv");
		
        var dropdown = document.createElement("select");
        dropdown.id = cat.replace(/\W/g, "") + "-input";
        dropdown.name = cat;
		dropdown.className = "selectbox";
        
		var subcats = container.getAttribute("data-subcats");
		if (subcats === null) return;
        subcats = subcats.split(",");
        
        var option = document.createElement("option");
        option.value = "Any";
		option.textContent = "Any";
        dropdown.appendChild(option);
        
		for (var i = 0; i < subcats.length; i++) {
			option = document.createElement("option");
			option.value = subcats[i].trim();
			option.textContent = subcats[i].trim();
            dropdown.appendChild(option);
        }
        
        

        var label = document.createElement("label");
        label.setAttribute("for", dropdown.id);

		container.appendChild(label);
        container.appendChild(dropdown);
	}

	function addIntegerComparison(elem, container, cat) {
		if(container === null) return;
		container.setAttribute("class", "paddedCardSearchDiv");
		
        var dropdown = document.createElement("select");
        dropdown.id = cat.replace(/\W/g, "") + "-inputComparison";
        dropdown.name = cat;
		dropdown.className = "comparisonCondition";
        
        var option = document.createElement("option");
        option.value = "Equals";
		option.textContent = "Equals";
		dropdown.appendChild(option);

		option = document.createElement("option");
        option.value = "Greater than";
		option.textContent = "Greater than";
        dropdown.appendChild(option);

        option = document.createElement("option");
        option.value = "Less than";
		option.textContent = "Less than";
        dropdown.appendChild(option);

        var label = document.createElement("label");
        label.setAttribute("for", dropdown.id);
        
        //the power input
        var input = document.createElement("input");
        input.id = cat + "-inputNumber";
        input.type = "number";
		input.className = "comparisonNumber";


        
        var label2 = document.createElement("label2");
        label2.setAttribute("for", input.id);

        //add the cat list as a value
        var subcats = container.getAttribute("data-subcats");
		if (subcats === null) return;
        var catList = document.createElement("input");
        catList.value = subcats;
        catList.id = cat + "-catList";
        catList.type = "hidden";

		container.appendChild(label);
        container.appendChild(dropdown);
        container.appendChild(label2);
        container.appendChild(input);
        container.appendChild(catList);
	}
	
	function addItems(elem) {
		//Lists
		var cContainer = document.getElementById("typeContainer");
		addSelectList.bind(this, elem, cContainer, "Type")();
		cContainer = document.getElementById("rarityContainer");
		addSelectList.bind(this, elem, cContainer, "Rarity")();
		cContainer = document.getElementById("editionContainer");
		addSelectList.bind(this, elem, cContainer, "Edition")();
		
		//CheckBoxes
		
		cContainer = document.getElementById("keywordsContainer");
		addCheckBox.bind(this, elem, cContainer, "Keywords")();
		cContainer = document.getElementById("civsContainer");
		addCheckBox.bind(this, elem, cContainer, "Civilizations")();
		cContainer = document.getElementById("searchAbilitiesContainer");
		addCheckBox.bind(this, elem, cContainer, "miscAbilities")();
        cContainer = document.getElementById("miscAbilitiesContainer");
		addCheckBox.bind(this, elem, cContainer, "miscAbilities")();
		
		//Other
        cContainer = document.getElementById("matchNameContainer");
		addInput.bind(this, elem, cContainer, "matchName")();
		
		cContainer = document.getElementById("raceContainer");
		addInput.bind(this, elem, cContainer, "Race1")();
		cContainer = document.getElementById("race2Container");
		addInput.bind(this, elem, cContainer, "Race2")();
        
        cContainer = document.getElementById("setContainer");
		addSelectList.bind(this, elem, cContainer, "ExpansionSet")();
		
		cContainer = document.getElementById("powerContainer");
		addIntegerComparison.bind(this, elem, cContainer, "Power")();

		cContainer = document.getElementById("costContainer");
		addIntegerComparison.bind(this, elem, cContainer, "Cost")();
		
		//upto 5 additional category inputs can be added
		var i;
		for (i = 1; i <= 5; i++) {
		cContainer = document.getElementById("additionalCat"+i+"Container");
		if(cContainer===null) break;
		addInput.bind(this, elem, cContainer, "Included"+i)();
		}
		
		//upto 5 additional EXCLUDED category inputs can be added
		for (i = 1; i <= 5; i++) {
		cContainer = document.getElementById("excludedCat"+i+"Container");
		if(cContainer===null) break;
		addInput.bind(this, elem, cContainer, "Excluded"+i)();
		}
		
		var searchButton = document.createElement("button");
		searchButton.type = "button";
		searchButton.innerHTML = "Search";
		searchButton.addEventListener("click", updateContent.bind(this, elem));
		
		document.getElementById("filters").appendChild(searchButton);
	}
	
	var divBox = document.getElementById("search-in-cats");
	addItems(divBox);	
}
switch (mw.config.get('wgPageName')) {
	case "User:NotoroX/CardSearchV2": //test page
	case "Advanced_Card_Search":
		searchJavaScript();
		
}
//======================= End of card data dsearch code =============================