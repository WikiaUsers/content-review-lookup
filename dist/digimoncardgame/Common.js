function searchJavaScript() {
	function updateContent(elem) {
		var categories = [];
		//Get Categories
		///InputBox Categories
		var inputboxes = elem.querySelectorAll('input[class="searchbox"]');
		inputboxes.forEach(function (inputBox) {
			if (inputBox.value != "") {
				categories.push(inputBox.value);
			}
		});
		///CheckBox Categories
		var checkboxes = elem.querySelectorAll('input[type="checkbox"]');
		checkboxes.forEach(function(checkbox) {
			if (checkbox.checked) {
				categories.push(checkbox.getAttribute('data-cat'));
			}
		});
		
		categories.push("Cards");
		
		//Make Changes
		var text = '{{#dpl:all|';
		text += 'category = ' + categories.join('|category = ');
		text += '|allowcachedresults = true';
		text += '|count = 100';
		text += '}}'
		
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
		input.id = cat + "-input";
		input.className = "searchbox";
		
		var label = document.createElement("label");
		label.setAttribute("for", input.id);
		label.textContent = cat + ":";
		
		container.appendChild(label);
		container.appendChild(input);
	}
	
	function addCheckBox(elem, container, cat) {
		var subcats = container.getAttribute("data-subcats");
		if (subcats === null) return;
		subcats = subcats.split(",");
		
		var containerLabel = document.createElement("label");
		containerLabel.id = cat + "Label";
		containerLabel.setAttribute("for", container.id);
		containerLabel.textContent = cat + ":";
		container.appendChild(containerLabel);
		
		for (var i = 0; i < subcats.length; i++) {
			var checkbox = document.createElement("input");
			checkbox.type = 'checkbox';
			checkbox.id = cat + "-" + subcats[i].replace(/\W/g, '');
			checkbox.setAttribute("class", "checkBoxCardSearch");
			checkbox.setAttribute("data-cat", subcats[i]);
			
			var label = document.createElement("label");
			label.setAttribute("for", checkbox.id);
			label.setAttribute("class", "checkBoxCardSearchLabel");
			label.textContent = subcats[i];
			
			container.appendChild(checkbox);
			container.appendChild(label);
		}
	}
	
	function addList(elem, container, cat) {
		var datalist = document.createElement("datalist");
		datalist.id = cat + "-datalist";
		var subcats = container.getAttribute("data-subcats");
		if (subcats === null) return;
        subcats = subcats.split(",");
		for (var i = 0; i < subcats.length; i++) {
			var option = document.createElement("option");
			option.value = subcats[i];
            datalist.appendChild(option);
        }
		
		var dropdown = document.createElement("input");
		dropdown.setAttribute("list", cat + "-datalist");
        dropdown.id = cat.replace(/\W/g, "") + "-input";
        dropdown.name = cat;
		dropdown.className = "searchbox";

        var label = document.createElement("label");
        label.setAttribute("for", dropdown.id);
        label.textContent = cat + ":";

        //dropdown.addEventListener("input", updateContent.bind(this, elem));

		container.appendChild(label);
		container.appendChild(datalist);
        container.appendChild(dropdown);
	}
	
	function addItems(elem) {
		//Lists
		var archetypeContainer = document.getElementById("archetypeContainer");
		addList.bind(this, elem, archetypeContainer, "Archetype")();
		var cTypeContainer = document.getElementById("cTypeContainer");
		addList.bind(this, elem, cTypeContainer, "Type")();
		var levelContainer = document.getElementById("levelContainer");
		addList.bind(this, elem, levelContainer, "Level")();
		var colourContainer = document.getElementById("colourContainer");
		addList.bind(this, elem, colourContainer, "Colour")();
		var attributeContainer = document.getElementById("attributeContainer");
		addList.bind(this, elem, attributeContainer, "Attribute")();
		//CheckBoxes
		var keywordsContainer = document.getElementById("keywordsContainer");
		addCheckBox.bind(this, elem, keywordsContainer, "Keywords")();
		var digiTypeContainer = document.getElementById("digiTypeContainer");
		addCheckBox.bind(this, elem, digiTypeContainer, "DigiType")();
		
		//Other
		var nameContainer = document.getElementById("nameContainer");
		addInput.bind(this, elem, nameContainer, "Name")();
		
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
	case "DigimonCardGame_Wiki:Advanced_Search":
		searchJavaScript();
}