$.when( mw.loader.using( 'mediawiki.api' ), $.ready ).then( function() {
	
	var perkArea = document.getElementById('userbuild-perks');
	if (!perkArea) {
		return;
	}
	
	var makeDict = new Promise(function(resolve, reject) {
		// check if dictionary is already created, if it is resolve promise
		// otherwise try and make the dictionary with cargo and resolve/reject accordingly
		if (window.perkDict) {
			resolve();
		}
		else {
			a = new mw.Api();
			a.get({
				action:"cargoquery",
				tables:"Perks_F76",
				fields:"Name,Value,Stat"
			}).done(function(data) {
				window.perkDict = {
					Strength : {},
					Perception : {},
					Endurance : {},
					Charisma : {},
					Intelligence : {},
					Agility : {},
					Luck : {}
				}
				for (i in data.cargoquery) {
					var row = data.cargoquery[i].title;
					perkDict[row.Stat][row.Name] = parseInt(row.Value);
				}
				resolve();
			}).fail(function (code,data) {
				reject(Error(code));
			});
		}
	});

	function checkStats(e) {
		// "main" function that's executed after button is clicked
		e.preventDefault();
		makeDict.then(function(result) {
		// go through each special stat and check if it's ok
			for (i in special) {
				var stat = special[i];
				tbl = [];
				$('.perks-field-' + stat).each(function() {
					tbl.push(this.innerText);
				});
				printResult(checkStat(special[i], tbl), stat  );
			}
		}, function(error) {
			// fail condition for the promise
			console.log(error);
		}
		
		);
	}

	function checkStat(stat, data) {
		// add all of the values of the perks within this stat
		// and return difference from max allowed
		var total = 0;
		for (i in data) {
			if (data[i].replace(/^\s+|\s+$/g, '') != '') {
				total += perkDict[stat][data[i]];
			}
		}
		return specialValues[stat] - total;
	}

	function printResult(result, stat) {
		// display something below the stat div showing the current total
		var oldResult = document.getElementById('perks-result-' + stat);
		if (oldResult) { oldResult.remove(); }
		var text = result >= 0 ? 'Okay!' : 'Not Okay';
		var color = result >= 0 ? 'green' : 'red';
		var message = document.createElement('div');
		message.innerHTML = text + ' (' + result + ')';
		message.style.color = color;
		message.setAttribute('id', 'perks-result-' + stat);
		document.getElementById('perks-' + stat).appendChild(message);
	}
	
	var special = [ 'Strength', 'Perception', 'Endurance', 'Charisma', 'Intelligence', 'Agility', 'Luck' ];
	
	var specialValues = {
		Strength : $('[name="UserBuild[Strength]"').val(),
		Perception : $('[name="UserBuild[Perception]"').val(),
		Endurance : $('[name="UserBuild[Endurance]"').val(),
		Charisma : $('[name="UserBuild[Charisma]"').val(),
		Intelligence : $('[name="UserBuild[Intelligence]"').val(),
		Agility : $('[name="UserBuild[Agility]"').val(),
		Luck : $('[name="UserBuild[Luck]"').val(),
	};	
	
	// writing it out seemed marginally less annoying than parsing the name field to pull the key
	// update the max allowed in each special category as the user updates the dropdowns
	
	$('[name="UserBuild[Strength]"').change(function() {specialValues.Strength = $(this).val();});
	$('[name="UserBuild[Perception]"').change(function() {specialValues.Perception = $(this).val();});
	$('[name="UserBuild[Endurance]"').change(function() {specialValues.Endurance = $(this).val();});
	$('[name="UserBuild[Charisma]"').change(function() {specialValues.Charisma = $(this).val();});
	$('[name="UserBuild[Intelligence]"').change(function() {specialValues.Intelligence = $(this).val();});
	$('[name="UserBuild[Agility]"').change(function() {specialValues.Agility = $(this).val();});
	$('[name="UserBuild[Luck]"').change(function() {specialValues.Luck = $(this).val();});
	
	// create a button that checks the stuff on click
	
	var button = document.createElement('button');
	button.innerHTML = 'Check Perks';
	$(button).insertAfter(perkArea);
	button.addEventListener('click', checkStats);

});