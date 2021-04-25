switch (mw.config.get('wgPageName')) {
    case 'Test':
    	var passiveEntries = null;
    	var specialAttackEntries = null;
    	
    	function updateFiltering()
    	{
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
        	
        	if (document.getElementById("all_button").style.opacity == "1")
        	{
        		effectTargetType = 0;
        	}
        	else if (document.getElementById("self_button").style.opacity == "1")
        	{
        		effectTargetType = 1;
        	}
        	else if (document.getElementById("allies_button").style.opacity == "1")
        	{
        		effectTargetType = 2;
        	}
        	else
        	{
        		effectTargetType = 3;
        	}
        	
        	var display;
        	var display2;
        	var i;
    		
    		if (passiveEntries)
    		{
    			display;
    			display2;
    			
    			//console.log("Updating filtering");
    			for (i = 0; i < passiveEntries.length; i++)
    			{
    				display = true;
    				display2 = true;
    				
    				switch (effectTargetType)
    				{
    					case 0:
    						// do nothing. accepting all
    						break;
    					case 1:
    						if (!passiveEntries[i].value.includes("Self"))
    							display = false;
    						break;
    					case 2:
    						if (!passiveEntries[i].value.includes("Allies") && !passiveEntries[i].value.toLowerCase().includes("ally"))
    							display = false;
    						break;
    					case 3:
    						if (!passiveEntries[i].value.includes("Enemies") && !passiveEntries[i].value.includes("Target") && !passiveEntries[i].value.includes("Enemy"))
    							display = false;
    						break;
    				}
    				
    				// if still not eliminated
    				if (display)
    				{
	    				if (generic)
	    				{
							if (passiveEntries[i].effect.includes("[") || passiveEntries[i].effect.includes("(on"))
								display2 = false;
							
							if (power && passiveEntries[i].effect.includes("[Power]") || intelligence && passiveEntries[i].effect.includes("[Intelligence]") || dexterity && passiveEntries[i].effect.includes("[Dexterity]") || body && passiveEntries[i].effect.includes("[Body]") || technique && passiveEntries[i].effect.includes("[Technique]") || heart && passiveEntries[i].effect.includes("[Heart]") || rage && passiveEntries[i].effect.includes("[Rage]") || zetsu && passiveEntries[i].effect.includes("[Zetsu]") || yin && passiveEntries[i].effect.includes("[Yin]") || yang && passiveEntries[i].effect.includes("[Yang]"))
							{
								display2 = true;
							}
	    				}
	    				else if (power || intelligence || dexterity || body || technique || heart || rage || zetsu || yin || yang)
	    				{
	    					if (!(power && passiveEntries[i].effect.includes("[Power]") || intelligence && passiveEntries[i].effect.includes("[Intelligence]") || dexterity && passiveEntries[i].effect.includes("[Dexterity]") || body && passiveEntries[i].effect.includes("[Body]") || technique && passiveEntries[i].effect.includes("[Technique]") || heart && passiveEntries[i].effect.includes("[Heart]") || rage && passiveEntries[i].effect.includes("[Rage]") || zetsu && passiveEntries[i].effect.includes("[Zetsu]") || yin && passiveEntries[i].effect.includes("[Yin]") || yang && passiveEntries[i].effect.includes("[Yang]")))
								display2 = false;
	    				}
    				}
    				
    				if (display && display2)
    				{
    					document.getElementById("passiveResult" + i).style.display = "table-row";
    				}
    				else
    				{
    					document.getElementById("passiveResult" + i).style.display = "none";
    				}
    			}
    		}
    		
    		
    		
    		if (specialAttackEntries)
    		{
    			//console.log("Updating filtering");
    			for (i = 0; i < specialAttackEntries.length; i++)
    			{
    				display = true;
    				display2 = true;
    				
    				switch (effectTargetType)
    				{
    					case 0:
    						// do nothing. accepting all
    						break;
    					case 1:
    						if (!specialAttackEntries[i].value.includes("Self"))
    							display = false;
    						break;
    					case 2:
    						if (!specialAttackEntries[i].value.includes("Allies") && !specialAttackEntries[i].value.toLowerCase().includes("ally"))
    							display = false;
    						break;
    					case 3:
    						if (!specialAttackEntries[i].value.includes("Enemies") && !specialAttackEntries[i].value.includes("Target") && !specialAttackEntries[i].value.includes("Enemy"))
    							display = false;
    						break;
    				}
    				
    				// if still not eliminated
    				if (display)
    				{
	    				if (generic)
	    				{
							if (specialAttackEntries[i].effect.includes("[") || specialAttackEntries[i].effect.includes("(on"))
								display2 = false;
							
							if (power && specialAttackEntries[i].effect.includes("[Power]") || intelligence && specialAttackEntries[i].effect.includes("[Intelligence]") || dexterity && specialAttackEntries[i].effect.includes("[Dexterity]") || body && specialAttackEntries[i].effect.includes("[Body]") || technique && specialAttackEntries[i].effect.includes("[Technique]") || heart && specialAttackEntries[i].effect.includes("[Heart]") || rage && specialAttackEntries[i].effect.includes("[Rage]") || zetsu && specialAttackEntries[i].effect.includes("[Zetsu]") || yin && specialAttackEntries[i].effect.includes("[Yin]") || yang && specialAttackEntries[i].effect.includes("[Yang]"))
							{
								display2 = true;
							}
	    				}
	    				else if (power || intelligence || dexterity || body || technique || heart || rage || zetsu || yin || yang)
	    				{
	    					if (!(power && specialAttackEntries[i].effect.includes("[Power]") || intelligence && specialAttackEntries[i].effect.includes("[Intelligence]") || dexterity && specialAttackEntries[i].effect.includes("[Dexterity]") || body && specialAttackEntries[i].effect.includes("[Body]") || technique && specialAttackEntries[i].effect.includes("[Technique]") || heart && specialAttackEntries[i].effect.includes("[Heart]") || rage && specialAttackEntries[i].effect.includes("[Rage]") || zetsu && specialAttackEntries[i].effect.includes("[Zetsu]") || yin && specialAttackEntries[i].effect.includes("[Yin]") || yang && specialAttackEntries[i].effect.includes("[Yang]")))
								display2 = false;
	    				}
    				}
    				
    				if (display && display2)
    				{
    					document.getElementById("specialAttackResult" + i).style.display = "table-row";
    				}
    				else
    				{
    					document.getElementById("specialAttackResult" + i).style.display = "none";
    				}
    			}
    		}
    		
    		
    	}

		mw.loader.using('mw.Api').then(function () {
		    var apiEndpoint = "https://symphogear-xdu-english.fandom.com/api.php";
		    var params;
		
		    var api = new mw.Api();
		    	
		    	function setupFilterButton(filterButton) {
		        	filterButton.style.opacity = "0.5";
		        	filterButton.addEventListener('click', function() {
		        		if (filterButton.style.opacity == "0.5")
		        		{
							filterButton.style.opacity = "1.0";
		        		}
		        		else
		        		{
		        			filterButton.style.opacity = "0.5";
		        		}
		        		
		        		updateFiltering();
					});
		    	}
		    	
		    	function setupRadioFilterButton(filterButton, buttonGroup) {
		        	filterButton.style.opacity = "0.5";
		        	filterButton.addEventListener('click', function() {
						filterButton.style.opacity = "1.0";
						for (var i = 0; i < buttonGroup.length; i++)
						{
							if (buttonGroup[i] !== filterButton)
							{
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
		        
		        promise = promise.then(function (response) {
		        	var character_list = new Array(response.query.categorymembers.length);
		
		            for (var i = 0; i < character_list.length; i++) {
		                character_list[i] = response.query.categorymembers[i].title;
		            }
		        	
		            var promise2 = api.post({
		                action: 'expandtemplates',
		                text: '{{#invoke:CharacterEffectFinder|main|CharacterList=' + character_list + '|effect=ATK Up}}'
		            }).then(function (data) {
		                var resultArray = data.expandtemplates['*'].split("¤");
		                var passiveArray = resultArray[0].split("^");
		                var specialAttackArray = resultArray[1].split("^");
		                passiveEntries = new Array(passiveArray.length);
		                specialAttackEntries = new Array(specialAttackArray.length);
		                var entry;
		                var splitString;
		                var recombinedString;
		                var index;
		                
		            	html_content =
		                    '<table class="article-table sortable" style="width:100%; text-align:center;">'
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
		                    
		                    splitString = entry[1].split('[');//[[File:{{#replace:{{#explode:{{{1|}}}|[|5}}|]|}}.png|25px]]
		                    recombinedString = splitString[0];
		                    for (var index2 = 1; index2 < splitString.length; index2++)
		                    {
		                    	recombinedString += "[[File:" + splitString[index2].replace("]", ".png|25px]]");
		                    }
		                    html_content += "<tr id='passiveResult" + index + "'><td>[[File:No_" + (parseInt(entry[0].split(" ")[1]) + 0) + ".png|53px|link=" + entry[0] + "]]</td><td>" + recombinedString + "</td><td>" + entry[2] + "</td></tr>";
		                }
		
		                html_content += "</table>";
		                
		                html_content +=
		                    '<table class="article-table sortable" style="width:100%; text-align:center;">'
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
		                    
		                    splitString = entry[1].split('[');//[[File:{{#replace:{{#explode:{{{1|}}}|[|5}}|]|}}.png|25px]]
		                    recombinedString = splitString[0];
		                    for (var index2 = 1; index2 < splitString.length; index2++)
		                    {
		                    	recombinedString += "[[File:" + splitString[index2].replace("]", ".png|25px]]");
		                    }
		                    html_content += "<tr id='specialAttackResult" + index + "'><td>[[File:No_" + (parseInt(entry[0].split(" ")[1]) + 0) + ".png|53px|link=" + entry[0] + "]]</td><td>" + recombinedString + "</td><td>" + entry[2] + "</td></tr>";
		                }
		
		                html_content += "</table>";
		
		                return html_content;
		            });
		            
		            promise2.then(function(html_content) {
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
		                	for (var i = 0; i < radioGroup.length; i++)
		                	{
		                		setupRadioFilterButton(radioGroup[i], radioGroup);
		                	}
		                	
		                	radioGroup[0].style.opacity = "1.0";
		                	
		                    document.getElementById("characterResults").innerHTML = data.parse.text['*'].replace(/scale-to-width-down\/53/g, "top-crop/width/53/height/53").replace(/width="53" height="[0-9]+"/g, 'width="53" height="53"');
		                    result = 1;
		                });
		
		            });
		        });
		});
		break;
}