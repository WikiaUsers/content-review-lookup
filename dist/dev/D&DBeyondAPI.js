/*
D&DBeyondAPI by Abedecain
Version 1.7.0

Based on OverwatchAPI by Luqgreg 
*/
$(function(){
    var $dndbapi = $("div#dndbapi-main");
    if ($dndbapi.length) {
		console.log("DnDB-Api: v1.7.0");
		$.ajaxPrefilter(function(options) {
			if (options.crossDomain && jQuery.support.cors) {
				options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
			}
		});
        console.log("DnDB-Api: Initializing...");
		var decMark = defaultValue($dndbapi.data("decmark"), '.');
		var decSpaces = defaultValue($dndbapi.data("decspaces"), 2);
		var errorMsg = defaultValue($dndbapi.data("error"), "<span style=\"color:red; font-weight: bold\">Error: Unknown error occurred!</span>");
		var targetTemplate = defaultValue($dndbapi.data("template"), "infobox");
		console.log("DnDB-Api: Settings\ndecMark: " + decMark + "\ndecSpaces: " + decSpaces + "\nerrorMsg: " + errorMsg + "\ntargetTemplate: " + targetTemplate ); 
		
        var charid = $dndbapi.data("charid");

		console.log("DnDB-Api: Downloading character data...");
		
		var jsonUrl = "https://www.dndbeyond.com/character/" + charid + "/json";
		
		console.log("DnDB-Api: URL: " + jsonUrl);
		$.getJSON(jsonUrl
		).done(function(json) {
			console.log("DnDB-Api: Parsing character data...");
			
			parsedInfobox = parseDataInfobox(json);
			queryInfobox = stringifyDataInfobox(parsedInfobox);
            console.log(parsedInfobox);
			
			console.log(targetTemplate);
			
			var queryText = "{{" + targetTemplate
				+ "|charid=" + charid
				+ queryInfobox
				+ "}}";
			var query = "/api.php?action=parse&format=json&text=" + encodeURIComponent(queryText);
			
			console.log("DnDB-Api: Query: " + query);
			
			console.log("DnDB-Api: Parsing character data into template...");
				
			jsonQuery(query, $dndbapi);
			
			console.log("DnDB-Api: Parsing character data into sections...");
			var $dndbapisections = $("div.dndbapi-section");
			var CBFunctions = {'background': parseDataBackground, 'personality': parseDataPersonality, 'backstory': parseDataBackstory};
			$('div.dndbapi-section').each(function(){
				var section = $(this)
				var targetSection = section.data("section");
				console.log("DnDB-Api: Section - " + targetSection);
				if (targetSection != undefined && CBFunctions[targetSection.toLowerCase()] != undefined){
					var sectParsedBody = CBFunctions[targetSection.toLowerCase()](json);
					var sectQueryBody = stringifyDataBody(sectParsedBody);
					console.log(sectParsedBody);
					
					var sectQuery = "/api.php?action=parse&format=json&text=" + encodeURIComponent(sectQueryBody);
			
					console.log("DnDB-Api: Query: " + sectQuery);
					console.log("DnDB-Api: Parsing character data into section...");
					
					jsonQuery(sectQuery, section);
				}
			});
                
		}).error(function(jqxhr, textStatus, error) {
			console.log("DnDB-Api: Unknown Error");
			var err = "First JSON Error: " + textStatus + ", " + error;
			console.log( err );
			console.log(jqxhr);
            $dndbapi.html("<span style=\"color:red; font-weight: bold\">" + err + "</span>");
		}).fail(function( jqxhr, textStatus, error ) {
			var err = "Request Failed: " + textStatus + ", " + error;
			console.log( err );
			console.log(jqxhr);
			$dndbapi.html("<span style=\"color:red; font-weight: bold\">" + err + "</span>");
		});
    }
});

function defaultValue(variable, defaultVal) {
    if(variable !== undefined && variable !== null) return variable;
    return defaultVal;
}

function roundFloat(float, decSpaces) {
    if(decSpaces === 0) return Math.floor(float);
    return (Math.floor(float * Math.pow(10, decSpaces)) / Math.pow(10, decSpaces));
}

function parseDataInfobox(data) {
	var dataArray = {};
	dataArray.stats = parseStats(data.stats, '');
	dataArray.bonusStats = parseStats(data.bonusStats, 'bonus');
	dataArray.overrideStats = parseStats(data.overrideStats, 'over');
	dataArray.fields = parseFields(data);
	dataArray.background = parseBackgroundShort(data.background);
	dataArray.race = parseRace(data.race);
	dataArray.alignment = parseAlignment(data.alignmentId);
	dataArray.lifestyle = parseLifestyle(data.lifestyleId);
	return dataArray;
}

function parseDataBackground(data) {
	var dataArray = {};
	dataArray.background = parseBackgroundLong(data.background);
	return dataArray;
}

function parseDataPersonality(data) {
	var dataArray = {};
	dataArray.traits = parseTraitsLong(data.traits);
	return dataArray;
}

function parseDataBackstory(data) {
	var dataArray = {};
	dataArray.backstory = parseBackstoryLong(data.notes);
	return dataArray;
}

function parseStats(data,prefix) {
	var valueNames = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'];
	var valuesOut = {};
	for (i = 0; i < data.length; i++) {
		stat = data[i].value;
		if (stat !== null){
			var outname = prefix + valueNames[i];
			valuesOut[outname] = stat;
		}
	}
	return valuesOut;
}

function parseFields(data) {
	var valueNames = ['id', 'readonlyUrl', 'avatarUrl', 'frameAvatarUrl', 'backdropAvatarUrl', 'smallBackdropAvatarUrl', 'largeBackdropAvatarUrl', 'thumbnailBackdropAvatarUrl', 'defaultBackdrop', 'themeColorId', 'name', 'gender', 'faith', 'age', 'hair', 'eyes', 'skin', 'height', 'weight', 'inspiration', 'baseHitPoints', 'bonusHitPoints', 'overrideHitPoints', 'removedHitPoints', 'temporaryHitPoints', 'currentXp', 'alignmentId', 'lifestyleId'];
	var valuesOut = {};
	for (i = 0; i < valueNames.length; i++) {
		var fieldName = valueNames[i];
		var field = data[fieldName];
		if(field !== null) {
			valuesOut[fieldName] = field;
		}
	}
	return valuesOut;
}

function parseAlignment(id) {
    var valuesOut = {};
    var valueNames = ['','Lawful Good','Neutral Good','Chaotic Good','Lawful Neutral','Neutral','Chaotic Neutral','Lawful Evil','Neutral Evil','Chaotic Evil'];
    if (valueNames.length >= id){
        valuesOut = {'alignment':valueNames[id]};
    }
	return valuesOut;
}

function parseLifestyle(id) {
    var valuesOut = {};
    var valueNames = ['', 'Wretched ','Squalid (1SP)','Poor (2SP)','Modest (1GP)','Comfortable (2GP)','Wealthy (4GP)','Aristocratic (10GP+)'];
    if (valueNames.length >= id){
        valuesOut = {'lifestyle':valueNames[id]};
    }
	return valuesOut;
}

function parseBackgroundShort(data) {
	var valuesOut = {'backgroundName': data.definition.name};
	return valuesOut;
}

function parseRace(race) {
	var valuesOut = {'race': race.fullName};
	return valuesOut;
}

function parseBackgroundLong(data) {
	var valuesOut = {'suggestedCharacteristicsDescription': data.definition.suggestedCharacteristicsDescription};
	return valuesOut;
}

function parseTraitsLong(data) {
	var valuesOut = {};
	for (var key in data){
		valuesOut[key] =  data[key];
	}
	return valuesOut;
}

function parseBackstoryLong(data) {
	var valuesOut = {'backstory': data.backstory};
	return valuesOut;
}

function stringifyDataInfobox(data) {
	var strifyed = "";
	for (var key in data){
		strifyed += stringifySetInfobox(data[key]);
	}
	return strifyed;
}

function stringifySetInfobox(data) {
	var strifyed = "";
	for (var key in data){
		strifyed += '|' + key + '=' + data[key];
	}
	
	return strifyed;
}

function stringifyDataBody(data) {
	var strifyed = "";
	for (var key in data){
		strifyed += stringifySetBody(data[key]);
	}
	return strifyed;
}

function stringifySetBody(data) {
	var strifyed = "";
	for (var key in data){
		strifyed += '\n' + data[key];
	}
	
	return strifyed;
}

function jsonQuery(query, htmlblock){
	$.getJSON(query, function(data) { 
		var code = data.parse.text['*'];
		htmlblock.html(code); 
	}).error(function(jqxhr, textStatus, error) {
		console.log("DnDB-Api: Unknown Error");
		var err = "Second JSON Error: " + textStatus + ", " + error;
		console.log( err );
		console.log(jqxhr);
		htmlblock.html("<span style=\"color:red; font-weight: bold\">" + err + "</span>");
	}).fail(function( jqxhr, textStatus, error ) {
		var err = "Request Failed: " + textStatus + ", " + error;
		console.log( err );
		console.log(jqxhr);
		htmlblock.html("<span style=\"color:red; font-weight: bold\">" + err + "</span>");
	});
}