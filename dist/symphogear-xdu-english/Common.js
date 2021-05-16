var passiveEntries = null;
var specialAttackEntries = null;
var leaderEntries = null;
var gearEntries = null;
var saEntries = null;
var zetsugiEntries = null;
var memoriaEntries = null;

function updateFiltering() {
	var generic = document.getElementById("any_button").style.opacity == "1";
	var power = document.getElementById("power_button").style.opacity == "1";
	var intelligence = document.getElementById("intelligence_button").style.opacity == "1";
	var dexterity = document.getElementById("dexterity_button").style.opacity == "1";
	var body = document.getElementById("body_button").style.opacity == "1";
	var technique = document.getElementById("technique_button").style.opacity == "1";
	var heart = document.getElementById("heart_button").style.opacity == "1";
	var rage = document.getElementById("rage_button").style.opacity == "1";
	var zetsu = document.getElementById("zetsu_button").style.opacity == "1";
	var yin = document.getElementById("yin_button").style.opacity == "1";
	var yang = document.getElementById("yang_button").style.opacity == "1";

	var effectTargetType;

	if (document.getElementById("all_button").style.opacity == "1") {
		effectTargetType = 0;
	} else if (document.getElementById("self_button").style.opacity == "1") {
		effectTargetType = 1;
	} else if (document.getElementById("allies_button").style.opacity == "1") {
		effectTargetType = 2;
	} else {
		effectTargetType = 3;
	}

	var display;
	var display2;
	var i;

	function isDisplay(entry) {
		display = true;
		display2 = true;

		switch (effectTargetType) {
		case 0:
			// do nothing. accepting all
			break;
		case 1:
			if (!entry.value.includes("Self"))
				display = false;
			break;
		case 2:
			if (!entry.value.includes("Allies") && !entry.value.toLowerCase().includes("ally"))
				display = false;
			break;
		case 3:
			if (!entry.value.includes("Enemies") && !entry.value.includes("Target") && !entry.value.includes("Enemy"))
				display = false;
			break;
		}

		// if still not eliminated
		if (display) {
			if (generic) {
				if (entry.effect.includes("[") || entry.effect.includes("(on"))
					display2 = false;

				if (power && entry.effect.includes("[Power]") || intelligence && entry.effect.includes("[Intelligence]") || dexterity && entry.effect.includes("[Dexterity]") || body && entry.effect.includes("[Body]") || technique && entry.effect.includes("[Technique]") || heart && entry.effect.includes("[Heart]") || rage && entry.effect.includes("[Rage]") || zetsu && entry.effect.includes("[Zetsu]") || yin && entry.effect.includes("[Yin]") || yang && entry.effect.includes("[Yang]")) {
					display2 = true;
				}
			} else if (power || intelligence || dexterity || body || technique || heart || rage || zetsu || yin || yang) {
				if (!(power && entry.effect.includes("[Power]") || intelligence && entry.effect.includes("[Intelligence]") || dexterity && entry.effect.includes("[Dexterity]") || body && entry.effect.includes("[Body]") || technique && entry.effect.includes("[Technique]") || heart && entry.effect.includes("[Heart]") || rage && entry.effect.includes("[Rage]") || zetsu && entry.effect.includes("[Zetsu]") || yin && entry.effect.includes("[Yin]") || yang && entry.effect.includes("[Yang]")))
					display2 = false;
			}
		}

		return display && display2;
	}

	if (passiveEntries) {
		for (i = 0; i < passiveEntries.length; i++) {
			if (isDisplay(passiveEntries[i])) {
				document.getElementById("passiveResult" + i).style.display = "table-row";
			} else {
				document.getElementById("passiveResult" + i).style.display = "none";
			}
		}
	}

	if (specialAttackEntries) {
		for (i = 0; i < specialAttackEntries.length; i++) {
			if (isDisplay(specialAttackEntries[i])) {
				document.getElementById("specialAttackResult" + i).style.display = "table-row";
			} else {
				document.getElementById("specialAttackResult" + i).style.display = "none";
			}
		}
	}

	if (leaderEntries) {
		for (i = 0; i < leaderEntries.length; i++) {
			if (isDisplay(leaderEntries[i])) {
				document.getElementById("leaderResult" + i).style.display = "table-row";
			} else {
				document.getElementById("leaderResult" + i).style.display = "none";
			}
		}
	}

	if (gearEntries) {
		for (i = 0; i < gearEntries.length; i++) {
			if (isDisplay(gearEntries[i])) {
				document.getElementById("gearResult" + i).style.display = "table-row";
			} else {
				document.getElementById("gearResult" + i).style.display = "none";
			}
		}
	}

	if (saEntries) {
		for (i = 0; i < saEntries.length; i++) {
			if (isDisplay(saEntries[i])) {
				document.getElementById("saResult" + i).style.display = "table-row";
			} else {
				document.getElementById("saResult" + i).style.display = "none";
			}
		}
	}

	if (zetsugiEntries) {
		for (i = 0; i < zetsugiEntries.length; i++) {
			if (isDisplay(zetsugiEntries[i])) {
				document.getElementById("zetsugiResult" + i).style.display = "table-row";
			} else {
				document.getElementById("zetsugiResult" + i).style.display = "none";
			}
		}
	}

	if (memoriaEntries) {
		for (i = 0; i < memoriaEntries.length; i++) {
			display = true;
			display2 = true;

			switch (effectTargetType) {
			case 0:
				// do nothing. accepting all
				break;
			case 1:
				if (memoriaEntries[i].effect.includes("/"))
					display = false;
				break;
			case 2:
				if (!memoriaEntries[i].effect.includes("Allies") && !memoriaEntries[i].effect.toLowerCase().includes("ally"))
					display = false;
				break;
			case 3:
				if (!memoriaEntries[i].effect.includes("Enemies") && !memoriaEntries[i].effect.includes("Target") && !memoriaEntries[i].effect.includes("Enemy"))
					display = false;
				break;
			}

			// if still not eliminated
			if (display) {
				if (generic) {
					if (memoriaEntries[i].effect.includes("[") || memoriaEntries[i].effect.includes("(on"))
						display2 = false;

					if (power && memoriaEntries[i].effect.includes("[Power]") || intelligence && memoriaEntries[i].effect.includes("[Intelligence]") || dexterity && memoriaEntries[i].effect.includes("[Dexterity]") || body && memoriaEntries[i].effect.includes("[Body]") || technique && memoriaEntries[i].effect.includes("[Technique]") || heart && memoriaEntries[i].effect.includes("[Heart]") || rage && memoriaEntries[i].effect.includes("[Rage]") || zetsu && memoriaEntries[i].effect.includes("[Zetsu]") || yin && memoriaEntries[i].effect.includes("[Yin]") || yang && memoriaEntries[i].effect.includes("[Yang]")) {
						display2 = true;
					}
				} else if (power || intelligence || dexterity || body || technique || heart || rage || zetsu || yin || yang) {
					if (!(power && memoriaEntries[i].effect.includes("[Power]") || intelligence && memoriaEntries[i].effect.includes("[Intelligence]") || dexterity && memoriaEntries[i].effect.includes("[Dexterity]") || body && memoriaEntries[i].effect.includes("[Body]") || technique && memoriaEntries[i].effect.includes("[Technique]") || heart && memoriaEntries[i].effect.includes("[Heart]") || rage && memoriaEntries[i].effect.includes("[Rage]") || zetsu && memoriaEntries[i].effect.includes("[Zetsu]") || yin && memoriaEntries[i].effect.includes("[Yin]") || yang && memoriaEntries[i].effect.includes("[Yang]")))
						display2 = false;
				}
			}

			if (display && display2) {
				document.getElementById("memoriaResult" + i).style.display = "table-row";
			} else {
				document.getElementById("memoriaResult" + i).style.display = "none";
			}
		}
	}
}

if (mw.config.get('wgCategories').includes('Effect')) {

    mw.loader.using('mw.Api').then(function () {
        var apiEndpoint = "https://symphogear-xdu-english.fandom.com/api.php";
        var params;

        var api = new mw.Api();

        function setupFilterButton(filterButton) {
            filterButton.style.opacity = "0.5";
            filterButton.addEventListener('click', function () {
                if (filterButton.style.opacity == "0.5") {
                    filterButton.style.opacity = "1.0";
                } else {
                    filterButton.style.opacity = "0.5";
                }

                updateFiltering();
            });
        }

        function setupRadioFilterButton(filterButton, buttonGroup) {
            filterButton.style.opacity = "0.5";
            filterButton.addEventListener('click', function () {
                filterButton.style.opacity = "1.0";
                for (var i = 0; i < buttonGroup.length; i++) {
                    if (buttonGroup[i] !== filterButton) {
                        buttonGroup[i].style.opacity = "0.5";
                    }
                }

                updateFiltering();
            });
        }

        //params = "action=parse&format=json&text=" + "[[File:No_2660.png]] + &contentmodel=wikitext;
        params = "action=query&format=json&list=categorymembers&cmtitle=Category:Character&cmdir=descending&cmlimit=500";

        var promise = fetch(apiEndpoint + "?" + params).then(function (response) {
            return response.json();
        });

        params = "action=query&format=json&list=categorymembers&cmtitle=Category:Memoria&cmdir=descending&cmlimit=500";

        var memPromise = fetch(apiEndpoint + "?" + params).then(function (response) {
            return response.json();
        });

        promise = promise.then(function (response) {
            var character_list = new Array(response.query.categorymembers.length);

            for (var i = 0; i < character_list.length; i++) {
                character_list[i] = response.query.categorymembers[i].title;
            }
			
            var html_content = "";
            var promise2 = api.post({
                action: 'expandtemplates',
                text: '{{#invoke:CharacterEffectFinder|main|CharacterList=' + character_list + '|effect=' + mw.config.get('wgPageName').replace(/_/g, ' ') + '}}'
            }).then(function (data) {
                var resultArray = data.expandtemplates['*'].split("¤");
                var passiveArray,
                specialAttackArray,
                leaderArray,
                gearArray,
                saArray,
                zetsugiArray;

                if (resultArray[0] == "") {
                    passiveArray = null;
                } else {
                    passiveArray = resultArray[0].split("^");
                    passiveEntries = new Array(passiveArray.length);
                }

                if (resultArray[1] == "") {
                    specialAttackArray = null;
                } else {
                    specialAttackArray = resultArray[1].split("^");
                    specialAttackEntries = new Array(specialAttackArray.length);
                }

                if (resultArray[2] == "") {
                    leaderArray = null;
                } else {
                    leaderArray = resultArray[2].split("^");
                    leaderEntries = new Array(leaderArray.length);
                }

                if (resultArray[3] == "") {
                    gearArray = null;
                } else {
                    gearArray = resultArray[3].split("^");
                    gearEntries = new Array(gearArray.length);
                }

                if (resultArray[4] == "") {
                    saArray = null;
                } else {
                    saArray = resultArray[4].split("^");
                    saEntries = new Array(saArray.length);
                }

                if (resultArray[5] == "") {
                    zetsugiArray = null;
                } else {
                    zetsugiArray = resultArray[5].split("^");
                    zetsugiEntries = new Array(zetsugiArray.length);
                }

                var entry;
                var splitString;
                var recombinedString;
                var index;

                if (passiveArray) {
                    html_content +=
                    '<table class="article-table sortable" style="width:100%; text-align:center; margin-top: 50px;">'
                     + '<caption style="font-size:150%;">Passive Skill</caption>'
                     + '<tr>'
                     + '<th style="text-align:center;">Character</th>'
                     + '<th style="text-align:center;">Effect</th>'
                     + '<th style="text-align:center;">Awaken 4</th>'
                     + '</tr>';

                    for (index = 0; index < passiveArray.length; index++) {
                        entry = passiveArray[index].split('¬');

                        passiveEntries[index] = {};
                        passiveEntries[index].card_no = entry[0];
                        passiveEntries[index].effect = entry[1];
                        passiveEntries[index].value = entry[2];

                        splitString = entry[1].split('['); //[[File:{{#replace:{{#explode:{{{1|}}}|[|5}}|]|}}.png|25px]]
                        recombinedString = splitString[0];
                        for (var index2 = 1; index2 < splitString.length; index2++) {
                            recombinedString += "[[File:" + splitString[index2].replace("]", ".png|25px]]");
                        }
                        html_content += "<tr id='passiveResult" + index + "'><td>[[File:No_" + (parseInt(entry[0].split(" ")[1]) + 0) + ".png|53px|link=" + entry[0] + "]]</td><td>" + recombinedString + "</td><td>" + entry[2] + "</td></tr>";
                    }

                    html_content += "</table>";
                }

                if (specialAttackArray) {
                    html_content +=
                    '<table class="article-table sortable" style="width:100%; text-align:center; margin-top: 50px;">'
                     + '<caption style="font-size:150%;">Special Attacks</caption>'
                     + '<tr>'
                     + '<th style="text-align:center;">Character</th>'
                     + '<th style="text-align:center;">Effect</th>'
                     + '<th style="text-align:center;">Max Skill Lvl.</th>'
                     + '</tr>';

                    for (index = 0; index < specialAttackArray.length; index++) {
                        entry = specialAttackArray[index].split('¬');

                        specialAttackEntries[index] = {};
                        specialAttackEntries[index].card_no = entry[0];
                        specialAttackEntries[index].effect = entry[1];
                        specialAttackEntries[index].value = entry[2];

                        splitString = entry[1].split('['); //[[File:{{#replace:{{#explode:{{{1|}}}|[|5}}|]|}}.png|25px]]
                        recombinedString = splitString[0];
                        for (var index2 = 1; index2 < splitString.length; index2++) {
                            recombinedString += "[[File:" + splitString[index2].replace("]", ".png|25px]]");
                        }
                        html_content += "<tr id='specialAttackResult" + index + "'><td>[[File:No_" + (parseInt(entry[0].split(" ")[1]) + 0) + ".png|53px|link=" + entry[0] + "]]</td><td>" + recombinedString + "</td><td>" + entry[2] + "</td></tr>";
                    }

                    html_content += "</table>";
                }

                if (leaderArray) {
                    html_content +=
                    '<table class="article-table sortable" style="width:100%; text-align:center; margin-top: 50px;">'
                     + '<caption style="font-size:150%;">Leader Skill</caption>'
                     + '<tr>'
                     + '<th style="text-align:center;">Character</th>'
                     + '<th style="text-align:center;">Effect</th>'
                     + '<th style="text-align:center;">Limit Max</th>'
                     + '</tr>';

                    for (index = 0; index < leaderArray.length; index++) {
                        entry = leaderArray[index].split('¬');

                        leaderEntries[index] = {};
                        leaderEntries[index].card_no = entry[0];
                        leaderEntries[index].effect = entry[1];
                        leaderEntries[index].value = entry[2];

                        splitString = entry[1].split('['); //[[File:{{#replace:{{#explode:{{{1|}}}|[|5}}|]|}}.png|25px]]
                        recombinedString = splitString[0];
                        for (var index2 = 1; index2 < splitString.length; index2++) {
                            recombinedString += "[[File:" + splitString[index2].replace("]", ".png|25px]]");
                        }
                        html_content += "<tr id='leaderResult" + index + "'><td>[[File:No_" + (parseInt(entry[0].split(" ")[1]) + 0) + ".png|53px|link=" + entry[0] + "]]</td><td>" + recombinedString + "</td><td>" + entry[2] + "</td></tr>";
                    }

                    html_content += "</table>";
                }

                if (gearArray) {
                    html_content +=
                    '<table class="article-table sortable" style="width:100%; text-align:center; margin-top: 50px;">'
                     + '<caption style="font-size:150%;">Gear/Tribal Skill</caption>'
                     + '<tr>'
                     + '<th style="text-align:center;">Character</th>'
                     + '<th style="text-align:center;">Effect</th>'
                     + '<th style="text-align:center;">Target/Value</th>'
                     + '</tr>';

                    for (index = 0; index < gearArray.length; index++) {
                        entry = gearArray[index].split('¬');

                        gearEntries[index] = {};
                        gearEntries[index].card_no = entry[0];
                        gearEntries[index].effect = entry[1];
                        gearEntries[index].value = entry[2];

                        splitString = entry[1].split('['); //[[File:{{#replace:{{#explode:{{{1|}}}|[|5}}|]|}}.png|25px]]
                        recombinedString = splitString[0];
                        for (var index2 = 1; index2 < splitString.length; index2++) {
                            recombinedString += "[[File:" + splitString[index2].replace("]", ".png|25px]]");
                        }
                        html_content += "<tr id='gearResult" + index + "'><td>[[File:No_" + (parseInt(entry[0].split(" ")[1]) + 0) + ".png|53px|link=" + entry[0] + "]]</td><td>" + recombinedString + "</td><td>" + entry[2] + "</td></tr>";
                    }

                    html_content += "</table>";
                }

                if (saArray) {
                    html_content +=
                    '<table class="article-table sortable" style="width:100%; text-align:center; margin-top: 50px;">'
                     + '<caption style="font-size:150%;">Super Awakening Skill</caption>'
                     + '<tr>'
                     + '<th style="text-align:center;">Character</th>'
                     + '<th style="text-align:center;">Effect</th>'
                     + '<th style="text-align:center;">★5</th>'
                     + '</tr>';

                    for (index = 0; index < saArray.length; index++) {
                        entry = saArray[index].split('¬');

                        saEntries[index] = {};
                        saEntries[index].card_no = entry[0];
                        saEntries[index].effect = entry[1];
                        saEntries[index].value = entry[2];

                        splitString = entry[1].split('['); //[[File:{{#replace:{{#explode:{{{1|}}}|[|5}}|]|}}.png|25px]]
                        recombinedString = splitString[0];
                        for (var index2 = 1; index2 < splitString.length; index2++) {
                            recombinedString += "[[File:" + splitString[index2].replace("]", ".png|25px]]");
                        }
                        html_content += "<tr id='saResult" + index + "'><td>[[File:No_" + (parseInt(entry[0].split(" ")[1]) + 0) + ".png|53px|link=" + entry[0] + "]]</td><td>" + recombinedString + "</td><td>" + entry[2] + "</td></tr>";
                    }

                    html_content += "</table>";
                }

                if (zetsugiArray) {
                    html_content +=
                    '<table class="article-table sortable" style="width:100%; text-align:center; margin-top: 50px;">'
                     + '<caption style="font-size:150%;">Zetsugi (Charge) Skill</caption>'
                     + '<tr>'
                     + '<th style="text-align:center;">Character</th>'
                     + '<th style="text-align:center;">Effect</th>'
                     + '<th style="text-align:center;">Lvl. 15</th>'
                     + '</tr>';

                    for (index = 0; index < zetsugiArray.length; index++) {
                        entry = zetsugiArray[index].split('¬');

                        zetsugiEntries[index] = {};
                        zetsugiEntries[index].card_no = entry[0];
                        zetsugiEntries[index].effect = entry[1];
                        zetsugiEntries[index].value = entry[2];

                        splitString = entry[1].split('['); //[[File:{{#replace:{{#explode:{{{1|}}}|[|5}}|]|}}.png|25px]]
                        recombinedString = splitString[0];
                        for (var index2 = 1; index2 < splitString.length; index2++) {
                            recombinedString += "[[File:" + splitString[index2].replace("]", ".png|25px]]");
                        }
                        html_content += "<tr id='zetsugiResult" + index + "'><td>[[File:No_" + (parseInt(entry[0].split(" ")[1]) + 0) + ".png|53px|link=" + entry[0] + "]]</td><td>" + recombinedString + "</td><td>" + entry[2] + "</td></tr>";
                    }

                    html_content += "</table>";
                }

                return html_content;
            });

            promise2.then(function (html_content) {
                api.post({
                    action: 'parse',
                    text: html_content,
                    format: 'json',
                    contentmodel: 'wikitext'
                }).then(function (data) {
                    setupFilterButton(document.getElementById("any_button"));
                    setupFilterButton(document.getElementById("power_button"));
                    setupFilterButton(document.getElementById("intelligence_button"));
                    setupFilterButton(document.getElementById("dexterity_button"));
                    setupFilterButton(document.getElementById("body_button"));
                    setupFilterButton(document.getElementById("technique_button"));
                    setupFilterButton(document.getElementById("heart_button"));
                    setupFilterButton(document.getElementById("rage_button"));
                    setupFilterButton(document.getElementById("zetsu_button"));
                    setupFilterButton(document.getElementById("yin_button"));
                    setupFilterButton(document.getElementById("yang_button"));

                    var radioGroup = [document.getElementById("all_button"), document.getElementById("allies_button"), document.getElementById("self_button"), document.getElementById("enemies_button")];
                    for (var i = 0; i < radioGroup.length; i++) {
                        setupRadioFilterButton(radioGroup[i], radioGroup);
                    }

                    radioGroup[0].style.opacity = "1.0";
                    
                    document.getElementById("filter_options").style.display = "block";

                    document.getElementById("characterResults").innerHTML = data.parse.text['*'].replace(/scale-to-width-down\/53/g, "top-crop/width/53/height/53").replace(/width="53" height="[0-9]+"/g, 'width="53" height="53"');
                });

            });
        });

        memPromise = memPromise.then(function (response) {
            var memoria_list = new Array(response.query.categorymembers.length);

            for (var i = 0; i < memoria_list.length; i++) {
                memoria_list[i] = response.query.categorymembers[i].title;
            }

            var html_content = "";
            var memPromise2 = api.post({
                action: 'expandtemplates',
                text: '{{#invoke:MemoriaEffectFinder|main|MemoriaList=' + memoria_list + '|effect=' + mw.config.get('wgPageName').replace(/_/g, ' ') + '}}'
            }).then(function (data) {
                var memArray = data.expandtemplates['*'].split("^");
                
                if (memArray == "") {
                    memArray = null;
                } else {
                    memoriaEntries = new Array(memArray.length);
                }
                
                var entry;
                var splitString;
                var recombinedString;
                var index;

				if (memArray)
				{
	                html_content +=
	                    '<table class="article-table sortable" style="width:100%; text-align:center;  margin-top: 50px;">'
	                     + '<caption style="font-size:150%;">Memoria</caption>'
	                     + '<tr>'
	                     + '<th style="text-align:center;">Memoria</th>'
	                     + '<th style="text-align:center;">Max Effect</th>'
	                     + '</tr>';
	
	                for (index = 0; index < memArray.length; index++) {
	                    entry = memArray[index].split('¬');
	
	                    memoriaEntries[index] = {};
	                    memoriaEntries[index].card_no = entry[0];
	                    memoriaEntries[index].effect = entry[1];
	
	                    splitString = entry[1].split('['); //[[File:{{#replace:{{#explode:{{{1|}}}|[|5}}|]|}}.png|25px]]
	                    recombinedString = splitString[0];
	                    for (var index2 = 1; index2 < splitString.length; index2++) {
	                        recombinedString += "[[File:" + splitString[index2].replace("]", ".png|25px]]");
	                    }
	                    html_content += "<tr id='memoriaResult" + index + "'><td>[[File:No_" + entry[0].split(" ")[1] + ".png|53px|link=" + entry[0] + "]]</td><td>" + recombinedString + "</td></tr>";
	                }
	
	                html_content += "</table>";
				}

                return html_content;
            });

            memPromise2.then(function (html_content) {
                api.post({
                    action: 'parse',
                    text: html_content,
                    format: 'json',
                    contentmodel: 'wikitext'
                }).then(function (data) {
                    document.getElementById("memoriaResults").innerHTML = data.parse.text['*'].replace(/scale-to-width-down\/53/g, "top-crop/width/53/height/53").replace(/width="53" height="[0-9]+"/g, 'width="53" height="53"');
                });

            });
        });
    });
}