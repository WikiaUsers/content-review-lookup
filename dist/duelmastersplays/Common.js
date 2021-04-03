window.tooltips_config = {
    offsetX: 8,
    offsetY: 8,
    waitForImages: false,
    events: ['CustomEvent'],
    noCSS: true,
}

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
		
		if(categories.length === 0 && matchTitles === null && set === 'Any'){
			document.getElementById('content-container').innerHTML = "No search parameters specified.";
			return;
		} 
		//Make Changes
		var text = '{{#dpl:uses = Template:Cardtable';
		if(matchTitles !== null) text += '|titleregexp =' + createRegEx(matchTitles);
		if(categories.length > 0) text += '|category = ' + categories.join('|category = ');
		if(exCategories.length > 0) text += '|notcategory = ' + exCategories.join('|notcategory = ');
		if(set !== "Any" && set !== null) text += '|linksfrom=' + set;
		text += '|allowcachedresults = true';
		text += '|count = 100';
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
	
	function addList(elem, container, cat) {
		container.setAttribute("class", "paddedCardSearchDiv");
		var datalist = document.createElement("datalist");
		datalist.id = cat + "-datalist";
		var subcats = container.getAttribute("data-subcats");
		if (subcats === null) return;
        subcats = subcats.split(",");
		for (var i = 0; i < subcats.length; i++) {
			var option = document.createElement("option");
			option.value = subcats[i].trim();
            datalist.appendChild(option);
        }
		
		var dropdown = document.createElement("input");
		dropdown.setAttribute("list", cat + "-datalist");
        dropdown.id = cat.replace(/\W/g, "") + "-input";
        dropdown.name = cat;
		dropdown.className = "searchbox";

        var label = document.createElement("label");
        label.setAttribute("for", dropdown.id);

        //dropdown.addEventListener("input", updateContent.bind(this, elem));

		container.appendChild(label);
		container.appendChild(datalist);
        container.appendChild(dropdown);
	}
	
	function addSelectList(elem, container, cat) {
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
	
	function addItems(elem) {
		//Lists
		var cContainer = document.getElementById("typeContainer");
		addSelectList.bind(this, elem, cContainer, "Type")();
		cContainer = document.getElementById("costContainer");
		addSelectList.bind(this, elem, cContainer, "Cost")();
		cContainer = document.getElementById("rarityContainer");
		addSelectList.bind(this, elem, cContainer, "Rarity")();
		
		//CheckBoxes
		
		cContainer = document.getElementById("keywordsContainer");
		addCheckBox.bind(this, elem, cContainer, "Keywords")();
		cContainer = document.getElementById("civsContainer");
		addCheckBox.bind(this, elem, cContainer, "Civilizations")();
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
//======================= End of card data search code =============================