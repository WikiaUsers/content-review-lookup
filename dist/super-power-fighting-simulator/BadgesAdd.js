/*===W.I.P.===
Script that searches for a particular span class and substitutes a button that allows to access a list with all the badges for the wiki, and when clicking on the name of the badge it will add it to the badge holder*/
/*function badgesAdd(){
	document.write("Hello World");
	var spans = document.getElementsByTagName("span");
	for (var index = 0; index < spans.length; index++) {
		if (spans[index].getAttribute("class") == "add-badges") {
			addBadgesButton(spans[index]);
			addBadgeList(spans[index]);
		}
	}
	
	function addBadgeButton(element){	// Creates the button
		document.write("Button Test");
		var button = document.createElement("button");
		button.append("Add Badge");
		button.style.border = "1px solid black"; // Creating the style for the button
		button.style.width = "70px";
		button.style.height = "70px";
		button.style.display = "inline-block";
		button.style.borderRadius = "5px";
		element.append(button);
		button.onclick = function(){	//Function that changes visibility of the list
			var lists = document.getElementsByTagName("div");	// Obtains all the <div> inside the page
			for (var index = 0; index < lists.length; index++){
				if (lists[index].getAttribute("id") == "badgeList"){
					if (lists[index].hidden == true){
						lists[index].removeAttribute("hidden");
					}
					else{
						lists[index].hidden = true;
					}
				}
			}
		};
	}
	
	function addBadgeList(element)	{
		// Empty scrollable list
		document.write("TEST LIST");
		var list = document.createElement("div");
		list.hidden = "true";
		list.setAttribute("id","badgeList");
		list.style.border = "1px";
		list.style.backgroundColor = "lightgray";
		list.style.width = "auto";
		list.style.height = "200px";
		list.style.overflowY = "scroll";
		list.style.float = "right";
		element.append(list);
		// Takes the pages from the Category:WikiBadges
		var params = {
			action: 'query',
			list: 'categorymembers',
			cmtitle: 'Category:WikiBadges',
			cmprop: "title",
			format: 'json'
		},
		api = new mw.Api();
		api.get( params ).done( function ( data ) {
		var pages = data.query.categorymembers,
		page;
		for ( page in pages ) {
			
			//var badge = document.createElement("badgeAdder");
			//Add the badge to the element above, then append each one inside the badge list (maybe even with a little 				image preview)
			list.append(pages[page].title);
		}
	});
	
	function br() {
		return document.createElement("br");
	}
	}
}

badgesAdd();


/* Old script for reference


   		var spans = document.getElementsByTagName("span");
   		for (var index = 0; index < spans.length; index++) {
      		if (spans[index].getAttribute("class") != null) {
        		outerLoop:
        		switch (spans[index].className) {
            		case "add-badges":
					var button = document.createElement("button");
					button.append("+ Add Badge");
					var badgeList = document.createTextNode("");
					spans[index].append(button, badgeList);
                		break outerLoop;
            		default:
                		break outerLoop;
					}
        		}
      		}

	button.onclick = function showBadgeList(){
		var availableBadges = [];
		var params = {
			action: 'query',
			list: 'categorymembers',
			cmtitle: 'Category:WikiBadges',
			cmprop: "title",
			format: 'json'
		},
		api = new mw.Api();
		api.get( params ).done( function ( data ) {
		var pages = data.query.categorymembers,
			page;
		for ( page in pages ) {
			availableBadges.concat(pages[page].title);
			}
		} );
		for (var index = 0; index < availableBadges.length; index++){
			badgeList.nodeValue += availableBadges[index] + "<br/>";
		}
	};
});*/