$(document).ready(function()
{     
   if (skin == "oasis")
   {          
        eval(document.getElementById("breedingcalculatordata").innerHTML);
  	setMenuOptions();
   }        
});

function setMenuOptions()
{
	var menu1 = document.getElementById("breedmonsters_monster1choices");
	var menu2 = document.getElementById("breedmonsters_monster2choices");
	var menu3 = document.getElementById("findparents_monsterchoices");
	
	for (var i = 0; i < monster_ids.length; i++)
	{
		var monsterName = monster_data[monster_ids[i].toLowerCase()].name;
		
		var newOption1 = document.createElement("option");
		newOption1.text = monsterName;
		menu1.add(newOption1);
		
		var newOption2 = document.createElement("option");		
		newOption2.text = monsterName;
		menu2.add(newOption2);
		
		var newOption3 = document.createElement("option");
		newOption3.text = monsterName;
		menu3.add(newOption3);
	}

       $('form#breedmonsters').toggle();	
       $('form#findparents').toggle(); 
}

function printText(text, id)
{
   var newNode = document.createElement("p");
   newNode.innerHTML = text;
   document.getElementById(id).appendChild(newNode);   
}

function addTableHeader(tableName, height, color, rowData, alignData, spanData)
{
	var table = document.getElementById(tableName);
	var data = rowData.split("@coldelim@");
	
	var header = "<tr style=\"height:" + height + "px; background-color:" + color + ";\">";
	
	for (var i = 0; i < data.length; i++)
	{
		header += "<th align=" + alignData[i] + " colspan=" + spanData[i] + "\">" + data[i] + "</th>";
	}
	
	header += "</tr>";
	
	return header;
}

function addTableRow(tableName, rowData, alignData)
{
	var table = document.getElementById(tableName);
	var data = rowData.split("@coldelim@");
 
    var row = "<tr>";
	
	for (var i = 0; i < data.length; i++)
	{
		row += "<td style=\"text-align:" + alignData[i] + ";\">" + data[i] + "</td>"
	}
	
	row += "</tr>";

	return row;
}

function clearContentField(name)
{
	var contentField = document.getElementById(name);
	
	while (contentField.hasChildNodes())
	{
		contentField.removeChild(contentField.firstChild);
	}
}

function clearTable(name)
{
	var table = document.getElementById(name);
	table.innerHTML = "";
}

function getMergedList(list1, list2)
{	
	var data = "";
		
	for (var i = 0; i < list1.length; i++)
	{
		data += data == "" ? list1[i] : "_" + list1[i];
	}

	for (var i = 0; i < list2.length; i++)
	{
		if (!(data.indexOf("_" + list2[i] + "_") > -1 ||
		      data.indexOf(list2[i]) > -1 && data.indexOf(list2[i]) == 0 ||
			  data.indexOf("_" + list2[i]) > -1 && data.indexOf("_" + list2[i]) + list2[i].length + 1 == data.length))			  
		{
			data += "_" + list2[i];
		}		
	}
	
	return data.split("_");		
}

function breedButtonClicked()
{
	getBreedingOutcome();	
}

function getBreedingOutcome()
{	
	var contentSection = "content_breedmonsters";
	clearContentField(contentSection);
	
	var table_name = "breedmonsters_table";
	clearTable(table_name);
	
	var menu1 = document.getElementById("breedmonsters_monster1choices");	
	var menu2 = document.getElementById("breedmonsters_monster2choices");
	
	var monster1Name = monster_data[monster_ids[menu1.selectedIndex]].name;	
	var monster2Name = monster_data[monster_ids[menu2.selectedIndex]].name;
	
	printText("<br>Breeding <b>" + monster1Name + "</b> with <b>" + monster2Name + "</b> can result in: ", contentSection);		
	
	var possible_offspring = sortListByRarity(buildBreedListByRules(monster_ids[menu1.selectedIndex].toLowerCase(), monster_ids[menu2.selectedIndex].toLowerCase()));	
	var row_format = "";
	
	for (var i = 0; i < possible_offspring.length; i++)
	{		
		var offspring_name = monster_data[possible_offspring[i]].name;
		
		if (!(monster_data[possible_offspring[i]].expired))
		{
			var formattedText = "&nbsp &nbsp <a title=\"" + offspring_name + "\" href=\"" +  monsterPageSource + offspring_name + "\">" + offspring_name + "</a>&nbsp &nbsp @coldelim@&nbsp &nbsp ";
			
			var colors = monster_data[possible_offspring[i].toLowerCase()].colors;
			for (var j = 0; j < colors.length; j++)
			{			
				formattedText += " <img src=\"" + colorImagePageSource[colors[j]] + "\" height=\"20\" width=\"20\"/>";
			}
			
			var rarity_index = monster_data[possible_offspring[i].toLowerCase()].rarity - 1;
			formattedText += "&nbsp &nbsp @coldelim@&nbsp &nbsp " + rarities[rarity_index] + "&nbsp &nbsp ";
			
			var incubation = monster_data[possible_offspring[i].toLowerCase()].incubation.split("_");
			formattedText += "@coldelim@&nbsp &nbsp <b>" + incubation[0] + "</b>" + "@coldelim@ <b>" + incubation[1] + "</b>" +
							 "@coldelim@ &nbsp" + incubation[2] + "@coldelim@ <img src=\"" + goldImagePageSource + "\" height=\"20\" width=\"20\"/>";		
					
			row_format += addTableRow(table_name, formattedText, ["center", "center", "center", "right", "left", "right", "left"]);
		}
	}		
	
	var header_format = addTableHeader(table_name, 50, "#8EC3CD", "Monster Name@coldelim@Colors@coldelim@Rarity@coldelim@&nbsp &nbsp Game Display Time&nbsp &nbsp @coldelim@&nbsp &nbsp Cost to Complete &nbsp &nbsp ", 
	              ["center", "center", "center", "center", "center"], ["1", "1", "1", "2", "2"]);	
	
	document.getElementById(table_name).innerHTML = header_format + row_format;
	
	var bottomCoordinate = document.getElementById(contentSection).offsetTop;
	window.scroll(0, bottomCoordinate);
}

function buildBreedListByRules(monster1Name, monster2Name)
{
	var possible_offspring = new Array();
	
	var monster1Type = monster_data[monster1Name.toLowerCase()].breedtype;
	var monster2Type = monster_data[monster2Name.toLowerCase()].breedtype;
	
	var monster1Colors = monster_data[monster1Name.toLowerCase()].colors;
	var monster2Colors = monster_data[monster2Name.toLowerCase()].colors;
	
	var rules = "";
	
	if (monster1Type.indexOf("special") > -1 || monster2Type.indexOf("special") > -1)
	{
		rules = "special";
	}
	else if (monster1Type == "basic" && monster2Type == "basic")
	{
		if (monster1Colors[0] == monster2Colors[0])
		{
			rules = "basic";
		}
		else
		{
			rules = "hybrid";
		}
	}
	else if (monster1Type == "hybrid" || monster2Type == "hybrid")
	{
		rules = "hybrid";
	}
	
	if (rules == "hybrid")
	{
		possible_offspring = getValidHybridOutcomes(monster1Colors, monster2Colors, true);		
	}
	else if (rules == "basic")
	{
		possible_offspring.push(monster1Name);			
	}
	else if (rules == "special")
	{
		if (monster1Type == "special_diamond" || monster2Type == "special_diamond")
		{
			if ((monster1Type == monster2Type) && monster1Colors.length == 1 && monster2Colors.length == 1)
			{
				for (var i = 0; i < pure_outcomes.length; i++)
				{					
					possible_offspring.push(pure_outcomes[i]);
				}
			}
			else 
			{	
				var colorPool = getMergedList(monster1Colors, monster2Colors);
				
				if (colorPool.length > 2)
				{
					possible_offspring = getValidHybridOutcomes(monster1Colors, monster2Colors, true);
				}
				else
				{
					possible_offspring = getMergedList(getValidBasicOutcomes(colorPool), getValidHybridOutcomes(monster1Colors, monster2Colors, false));
				}
			}
		}
		else
		{
			if ((monster1Type == monster2Type) && monster1Colors.length == 1 && monster2Colors.length == 1)
			{
				for (var i = 0; i < white_outcomes.length; i++)
				{					
					possible_offspring.push(white_outcomes[i]);
				}
			}
			else
			{
				possible_offspring = getValidHybridOutcomes(monster1Colors, monster2Colors, true);
			}
		}
	}
	
	return possible_offspring;
}

function sortListByRarity(list_to_sort)
{
	var sorted_list = new Array();
	
	var separated_list = new Array();
	separated_list.push(new Array()); // Common index = 0
	separated_list.push(new Array()); // Rare index = 1
	separated_list.push(new Array()); // Super Rare index = 2
	separated_list.push(new Array()); // Ultra Rare index = 3
	
	for (var i = 0; i < list_to_sort.length; i++)
	{
		var rarity = monster_data[list_to_sort[i].toLowerCase()].rarity;				
		separated_list[rarity - 1].push(list_to_sort[i]);
	}
	
	for (var i = 0; i < separated_list.length; i++)
	{		
		for (var j = 0; j < separated_list[i].length; j++)
		{
			sorted_list.push(separated_list[i][j]);
		}
	}		
	
	return sorted_list;
}

function getValidBasicOutcomes(colorPool)
{
	var possible_offspring = new Array();	
	var basicColors = new Array();
	
	for (var i = 0; i < colorPool.length; i++)
	{
		if (!(colorPool[i] == "diamond"))
		{			
			basicColors.push(colorPool[i]);	
		}
	}
	
	for (var i = 0; i < basicColors.length; i++)
	{
		for (var j = 0; j < pure_outcomes.length; j++)
		{
			if (basicColors[i] == monster_data[pure_outcomes[j]].colors[0])
			{				
				possible_offspring.push(pure_outcomes[j]);
				break;
			}
		}
	}	
	
	return possible_offspring;
}

function getValidHybridOutcomes(monster1Colors, monster2Colors, considerDiamond)
{
	var possible_offspring = new Array();
	
	var colorPool = getMergedList(monster1Colors, monster2Colors);

	if (considerDiamond && colorPool.length >= 4)
	{
		for (var j = 0; j < diamond_outcomes.length; j++)
		{			
			possible_offspring.push(diamond_outcomes[j]);
		}
	}
	
	if (colorPool.length >= 3)
	{
		for (var i = 0; i < white_outcomes.length; i++)
		{
			possible_offspring.push(white_outcomes[i]);
		}
	}
	
	for (var i = 0; i < hybrid_outcomes.length; i++)
	{
		if (comboContainsColors(colorPool, monster_data[hybrid_outcomes[i]].requiredcolors))
		{			
			possible_offspring.push(hybrid_outcomes[i]);
		}
	}	
	
	return possible_offspring;
}

function findParentsButtonClicked()
{
	getPossibleParents();
}

function getPossibleParents()
{   	
	// build a distinct color pool list of keys, give each color an index and sort ascending
	// then merge the color into a spaceless string
	// this forms the key for the dictionary containing parents of a color group
	// the dictionary is built once, at runtime, by running through the monster list and getting the key from the colors
	
	var contentSection = "content_findparents";
	clearContentField(contentSection);
	var table_name = "findparents_table";	
	clearTable(table_name);
	
	var menu = document.getElementById("findparents_monsterchoices");			
	var monsterName = monster_data[monster_ids[menu.selectedIndex]].name;
		
	printText("<br>&nbsp &nbsp &nbsp &nbspBreeding the <b>" + monsterName + "</b> is possible by pairing the following parents:", contentSection);
	
	var possible_parents = buildParentListByRules(monster_ids[menu.selectedIndex]);	
	var row_format = "";
	
	for (var i = 0; i < possible_parents.length; i++)
	{
	    var parentNames = possible_parents[i].split(",");	
	
		var parent1Colors = monster_data[parentNames[0].toLowerCase()].colors;		
		var parent2Colors = monster_data[parentNames[1].toLowerCase()].colors;
		
		parentNames[0] = monster_data[parentNames[0].toLowerCase()].name;
		parentNames[1] = monster_data[parentNames[1].toLowerCase()].name;

		var formattedText = "&nbsp &nbsp &nbsp &nbsp <a title=\"" + parentNames[0] + "\" href=\"" + monsterPageSource + parentNames[0] + "\">" + parentNames[0] + "</a>&nbsp &nbsp &nbsp &nbsp @coldelim@";		
		
		for (var j = 0; j < parent1Colors.length; j++)
		{
			formattedText += " <img src=\"" + colorImagePageSource[parent1Colors[j]] + "\" height=\"20\" width=\"20\"/>";
		}
		
		formattedText += "@coldelim@&nbsp &nbsp &nbsp &nbsp <b>\&</b> &nbsp &nbsp @coldelim@&nbsp &nbsp <a title=\"" + parentNames[1] + " Monster\" href=\"" + monsterPageSource + parentNames[1] + "\">" + parentNames[1] + "</a>&nbsp &nbsp &nbsp &nbsp @coldelim@";		
		
		for (var j = 0; j < parent2Colors.length; j++)
		{
			formattedText += " <img src=\"" + colorImagePageSource[parent2Colors[j]] + "\" height=\"20\" width=\"20\"/>";
		}				
		
		row_format += addTableRow(table_name, formattedText, ["right", "left", "center", "right", "left"]);
	}				
	
	document.getElementById(table_name).innerHTML = row_format;
    
	var bottomCoordinate = document.getElementById(contentSection).offsetTop;
	window.scroll(0, bottomCoordinate);	
}

function buildParentListByRules(monsterName)
{
    var possible_parents = new Array();	
	
	var monsterType = monster_data[monsterName.toLowerCase()].breedtype;
	var monsterColors = monster_data[monsterName.toLowerCase()].colors;
	var monsterColorReq = monster_data[monsterName.toLowerCase()].requiredcolors;
	
	var rules = "";
	
	if (monsterType.indexOf("special") > -1)
	{
		rules = "special";
	}
	else if (monsterType == "basic")
	{
		if (monsterColorReq.length > 1)
		{		 
			rules = "hybrid";
		}
		else
		{
			rules = "basic";
		}
	}
	else if (monsterType == "hybrid")
	{
		rules = "hybrid";
	}
	
	if (rules == "basic")
	{		
		possible_parents.push(monsterName + "," + monsterName);
		
		var basicColors = [monsterColors, "diamond"];
		
		var diamond_parents = new Array();
		var diamond_pures = new Array();
		var diamond_hybrids = new Array();
		
		for (var i = 0; i < diamond_outcomes.length; i++)
		{			
			diamond_parents.push(monsterName + "," + diamond_outcomes[i]);
			
			for (var j = i; j < diamond_outcomes.length; j++)
			{
				diamond_pures.push(diamond_outcomes[i] + "," + diamond_outcomes[j]);				
			}			
		}	
		
		diamond_parents = getMergedList(diamond_parents, diamond_pures);
		
		for (var i = 0; i < monster_ids.length; i++)
		{			
			if (monster_data[monster_ids[i]].breedtype == "special_diamond" &&
			listsMatch(basicColors, monster_data[monster_ids[i]].colors))
			{				
				diamond_hybrids.push(monster_ids[i]);
			}
		}
		
		for (var i = 0; i < diamond_hybrids.length; i++)
		{
			diamond_parents.push(monsterName + "," + diamond_hybrids[i]);
		}
		
		for (var i = 0; i < diamond_hybrids.length; i++)
		{
			for (var j = 0; j < diamond_outcomes.length; j++)
			{
				diamond_parents.push(diamond_outcomes[j] + "," + diamond_hybrids[i]);
			}
		}
		
		possible_parents = getMergedList(possible_parents, diamond_parents);
	}
	else if (rules == "hybrid")
	{
		possible_parents.push(monsterName + "," + monsterName);
		
		if (monsterColors.length == 1)
		{						
			var basicColors = [monsterColors, "diamond"];
			
			var diamond_parents = new Array();
			var diamond_pures = new Array();
			var diamond_hybrids = new Array();
			
			for (var i = 0; i < diamond_outcomes.length; i++)
			{			
				diamond_parents.push(monsterName + "," + diamond_outcomes[i]);
				
				for (var j = i; j < diamond_outcomes.length; j++)
				{
					diamond_pures.push(diamond_outcomes[i] + "," + diamond_outcomes[j]);				
				}			
			}	
			
			diamond_parents = getMergedList(diamond_parents, diamond_pures);
			
			for (var i = 0; i < monster_ids.length; i++)
			{			
				if (monster_data[monster_ids[i]].breedtype == "special_diamond" &&
				listsMatch(basicColors, monster_data[monster_ids[i]].colors))
				{				
					diamond_hybrids.push(monster_ids[i]);
				}
			}
			
			for (var i = 0; i < diamond_hybrids.length; i++)
			{
				diamond_parents.push(monsterName + "," + diamond_hybrids[i]);
			}
			
			for (var i = 0; i < diamond_hybrids.length; i++)
			{
				for (var j = 0; j < diamond_outcomes.length; j++)
				{
					diamond_parents.push(diamond_outcomes[j] + "," + diamond_hybrids[i]);
				}
			}
			
			possible_parents = getMergedList(possible_parents, diamond_parents);
		}
		
		possible_parents = getMergedList(possible_parents, getValidParentPairs(monsterColorReq));
	}
	else if (rules == "special")
	{
		if (monsterType == "special_diamond")
		{
			if (monsterColors.length > 1)
			{
				possible_parents.push(monsterName + "," + monsterName);
				possible_parents = getMergedList(possible_parents, getValidParentPairs(monsterColorReq));	
			}					
			else 
			{				
				for (var i = 0; i < diamond_outcomes.length; i++)
				{
					for (var j = i; j < diamond_outcomes.length; j++)
					{					    
						possible_parents.push(diamond_outcomes[i] + "," + diamond_outcomes[j]);
					}
				}
								
				var four_color_pairs = getNDistinctColorPairs(4);			
				
				for (var i = 0; i < four_color_pairs.length; i++)
				{
					possible_parents.push(four_color_pairs[i]);
				}
				
				var named_monster_pair = new Array();
				named_monster_pair.push(monsterName + "," + monsterName);
				possible_parents = getMergedList(named_monster_pair, possible_parents);
			}
		}
		else if (monsterType == "special_white")
		{			
			for (var i = 0; i < white_outcomes.length; i++)
			{
				for (var j = i; j < white_outcomes.length; j++)
				{
					possible_parents.push(white_outcomes[i] + "," + white_outcomes[j]);
				}
			}
			
			var three_color_pairs = getNDistinctColorPairs(3);
			
			for (var i = 0; i < three_color_pairs.length; i++)
			{
				possible_parents.push(three_color_pairs[i]);
			}
			
			var named_monster_pair = new Array();
			named_monster_pair.push(monsterName + "," + monsterName);
			possible_parents = getMergedList(named_monster_pair, possible_parents);
		}
	}
	
	return possible_parents;
}

function getValidParentPairs(monsterColorReq)
{
	var possible_parents = new Array();
	var single_list_traversal_pairs = new Array();
	var same_color_monsters = new Array();
	var same_color_pairs = new Array();
	
	for (var i = 0; i < monster_ids.length; i++)
	{
		if (listsMatch(monster_data[monster_ids[i]].colors, monsterColorReq))
		{					
			same_color_monsters.push(monster_ids[i]);
		}			
	
		for (var j = i; j < monster_ids.length; j++)
		{			
			if (comboContainsColors(getMergedList(monster_data[monster_ids[i]].colors, monster_data[monster_ids[j]].colors), monsterColorReq))
			{								
				single_list_traversal_pairs.push(monster_ids[i] + "," + monster_ids[j]);				
			}			
		}
	}
	
	for (var i = 0; i < same_color_monsters.length; i++)
	{
		for (var j = i; j < same_color_monsters.length; j++)
		{			
			same_color_pairs.push(same_color_monsters[i] + "," + same_color_monsters[j]);
		}
	}
	
	possible_parents = getMergedList(same_color_pairs, single_list_traversal_pairs); 
	
	return possible_parents;
}

function listsMatch(list1, list2)
{
	if (list1.length == list2.length)
	{
		var num_to_match = list1.length;
		var matches = 0;
		
		for (var i = 0; i < num_to_match; i++)
		{
			for (var j = 0; j < num_to_match; j++)
			{
				if (list1[i] == list2[j])
				{
					matches++;
					break;
				}
			}
		}
		
		if (matches == num_to_match)
		{
			return true;
		}
	}

	return false;
}

function getNDistinctColorPairs(numColors)
{
	var possible_parents = new Array();
	
	for (var i = 0; i < monster_ids.length; i++)
	{
		for (var j = i; j < monster_ids.length; j++)
		{
			var monster1Colors = monster_data[monster_ids[i]].colors;
			var monster2Colors = monster_data[monster_ids[j]].colors;
			var colorPool = getMergedList(monster1Colors, monster2Colors);
			
			if (colorPool.length >= numColors)
			{				
				possible_parents.push(monster_ids[i] + "," + monster_ids[j]);
			}			
		}
	}
	
	return possible_parents;
}

function comboContainsColors(colorList, requiredColors)
{
	for (var i = 0; i < requiredColors.length; i++)
	{
		var found = false;
		
		for (var j = 0; j < colorList.length; j++)
		{
			if (colorList[j] == requiredColors[i])
			{
				found = true;
				break;
			}
		}
		
		if (!found)
		{
			return false;
		}
	}
	
	return true;
}