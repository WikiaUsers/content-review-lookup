mw.hook('wikipage.content').add(function() {
	'use strict';

	console.log( "Initializing recipes" );
	var recipes = document.querySelectorAll('th.recipe');
	recipes.forEach( function(recipe) {
		var id = recipe.dataset.id;
		console.log( "Initializing recipe " + id );
		var baseOutputCell = document.querySelectorAll('td[id=recipe' + id + '-output-quantity]');
		if ( baseOutputCell.length != 1 || !Number(baseOutputCell[0].dataset.baseValue)) return; // Skip
		
		var desiredOutputCell = document.querySelectorAll('td[id=recipe' + id + '-quantity]');
		if (desiredOutputCell.length != 1) return; // Skip
		
		var newEle = document.createElement("input");
		newEle.type = "number";
		newEle.step = "1";
		newEle.min = "1";
		newEle.value = baseOutputCell[0].dataset.baseValue;
		newEle.style.width = "3.5em";
		newEle.addEventListener("change", function() {
			update(id);
		});
		desiredOutputCell[0].appendChild(newEle);
		desiredOutputCell[0].parentElement.style.display = "contents";
	});

	function update(id) {
		console.log("Updating recipe '" + id + "'");        
		var baseOutput = document.querySelectorAll('td[id=recipe' + id + '-output-quantity]')[0].dataset.baseValue;
		var desiredOutput = document.querySelectorAll("td[id=recipe-quantity] input")[0].value;
		if ( !Number( baseOutput ) || !Number( desiredOutput ) ) return; // Skip
		
		var cycles = Math.ceil( desiredOutput / baseOutput );
		var eleList = document.getElementsByClassName("recipe" + id + "-input-quantity");
		for (var i = 0; i < eleList.length; i++) {
			var baseInput = eleList[i].dataset.baseValue;
			if ( !Number( baseInput ) ) return;
			eleList[i].innerText = (baseInput * cycles) + " x";
		}
		document.querySelectorAll("td[id=recipe" + id + "-output-quantity]" )[0].innerText = baseOutput * cycles;
	}
});