/* 
 * Initial setup functions
 */

$(document).ready(function()
{           
// Performing eval on the data is a horrible hack to handle inconvenient caching
// It is relatively "safe" here because input is controlled by admin-locked pages
        eval(document.getElementById("breedingcalculatordata").innerHTML);
        buildDataLists();
        setMenuOptions();       
});

function buildDataLists()
{
    window.specific_offspring_list = [];
    window.dragon_ids = [];
    window.incubation_times = [];
    window.player_levels = [];
    window.max_level_requirement = 0;
    window.max_individual_colors = 0;
    
    window.parent_data_list = buildParentDataList();
	window.offspring_color_groups = buildOffspringIndex();
    window.parent_color_groups = buildParentIndex();
	window.parent_color_pools = [];
    
    window.combinable_colors = [];
    window.minor_colors = [];
    window.recessive_colors = [];
    window.counted_colors = [];
     
	for (var color_key in parent_color_groups)
    {
        parent_color_pools.push(color_key.split(","));        
    }

    for (var dragon_id in breeds)
    {
        dragon_ids.push(dragon_id);
        
        var dragon_colors = breeds[dragon_id].colors;
        var incubation_data = breeds[dragon_id].incubation;
        var required_level = breeds[dragon_id].level;
        var specific_offspring = breeds[dragon_id].specificoffspring;
        
        // Process the dragon's colors
        if (dragon_colors.length === 1)
		{
			breeds[dragon_id].requiredcolors = getColorComponents(dragon_colors[0]);            
		}
		else
		{
			breeds[dragon_id].requiredcolors = filterColors(dragon_colors, "recessive");
		}
        
        var num_colors = dragon_colors.length;
                        
        if (num_colors > max_individual_colors)
        {
            max_individual_colors = num_colors;        
        }
        
        // Process the dragon's incubation time
        var incubation = getIncubationTime(incubation_data);
        
        if (incubation !== null)
        {
            incubation_times.push(incubation);
        }
        
        // Process the dragon's level requirement
        if (required_level !== undefined)
        {
            // Do not overwrite a custom level requirement with default values
            
            // Keep track of the maximum level requirement for display purposes
            if (required_level > max_level_requirement)
            {
                max_level_requirement = required_level;
            }            
        }
        else
        {
            // Set the level requirement according to default values
            var sorted_colors = mergeSort(dragon_colors, "level_requirements");
            var highest_req_color = sorted_colors[sorted_colors.length - 1];
            var level_requirement = level_requirements[highest_req_color];
            
            if (level_requirement === undefined)
            {
                level_requirement = 0;
                displayHTML("Warning: Level requirement for " + breeds[dragon_id].name + 
                " set to 0.", "content_messages");
            }
            
            breeds[dragon_id].level = level_requirement;
        }
        
        // Create a list of key = specific offspring, value = list of parents that generate it, if any exist
        if (specific_offspring)
        {            
            for (var index in specific_offspring)
            {
                if (!specific_offspring_list[specific_offspring[index]])
                {
                    specific_offspring_list[specific_offspring[index]] = [];
                }
                
                specific_offspring_list[specific_offspring[index]].push(dragon_id);
            }
        }        
    }
    
    for (var color_index in all_colors)
    {
        var color_type = getColorType(all_colors[color_index]);
        
        if (color_type === "minor")
        {
            minor_colors.push(all_colors[color_index]);
        }
        else if (color_type === "recessive")
        {
            recessive_colors.push(all_colors[color_index]);
        }
        else if (color_type === "counted")
        {
            counted_colors.push(all_colors[color_index]);
        }
        
        var is_excluded_type = false;
        
        for (var i = 0; i < excluded_color_types.length; i++)
        {
            if (color_type === excluded_color_types[i])
            {
                is_excluded_type = true;
            }            
        }
        
        if (!is_excluded_type)
        {
            combinable_colors.push(all_colors[color_index]);
        }
    }
}

function setMenuOptions()
{
    var first_parent_menu = document.getElementById("breeddragons_dragon1choices");
    var second_parent_menu = document.getElementById("breeddragons_dragon2choices");
    var incubation_filter_menu = document.getElementById("breeddragons_incubationchoices");
    var level_filter_menu = document.getElementById("breeddragons_levelchoices");
    var offspring_menu = document.getElementById("findparents_dragonchoices");
            
    for (var dragon_id in breeds)
    {
        var dragon_name = breeds[dragon_id].name;
        
        var first_parent_option = document.createElement("option");
        first_parent_option.text = dragon_name;
        first_parent_menu.add(first_parent_option);
        
        var second_parent_option = document.createElement("option");        
        second_parent_option.text = dragon_name;
        second_parent_menu.add(second_parent_option);
        
        var offspring_option = document.createElement("option");
        offspring_option.text = dragon_name;        
        offspring_menu.add(offspring_option);
    }
    
    mergeSort(incubation_times, "incubation");
    incubation_times.push(new IncubationTime(2, "days"));
    
    /* Must use this extra code because getUniqueObjectList() checking for 
       a valid prototype.equals method does not work on MediaWiki due to 
       an unresolvable race condition when using jQuery's document.ready check */
    var incubation_choices = [incubation_times[0]];
    
    for (var i = 1; i < incubation_times.length; i++)
    {
        if (incubation_choices[incubation_choices.length - 1].text !==
            incubation_times[i].text)
        {
            incubation_choices.push(incubation_times[i]);
        }
    }
    
    incubation_times = incubation_choices;
    
    var default_incubation_option = document.createElement("option");
    default_incubation_option.text = "Filter by time (optional)";
    incubation_filter_menu.add(default_incubation_option);
    
    for (var index in incubation_times)
    {
        var incubation_option = document.createElement("option");
        incubation_option.text = incubation_times[index].text;
        incubation_filter_menu.add(incubation_option);
    }
    
    for (var key in level_requirements)
    {
        if (level_requirements[key] > max_level_requirement)
        {
            max_level_requirement = level_requirements[key];
        }        
    }
    
    var default_level_option = document.createElement("option");
    default_level_option.text = "Filter by player level (optional)";
    level_filter_menu.add(default_level_option);
    
    for (var i = 1; i < max_level_requirement; i++)
    {
        var player_level = new PlayerLevel(i, "Lvl. " + i);
        player_levels.push(player_level);
        
        var level_option = document.createElement("option");
        level_option.text = player_level.text;
        level_filter_menu.add(level_option);        
    }
    
    var max_player_level = new PlayerLevel(max_level_requirement, "Lvl. " + max_level_requirement + " or higher");
    player_levels.push(max_player_level);
    
    var max_level_option = document.createElement("option");
    max_level_option.text = max_player_level.text;
    level_filter_menu.add(max_level_option);
    
    document.getElementById("breeddragons").style.display = "inline";
    document.getElementById("findparents").style.display = "inline";
    document.getElementById("breeddragons_incubationchoices").style.display = "inline";
    document.getElementById("breeddragons_levelchoices").style.display = "inline";
}

/* 
 * Content display functions
 */

function displayHTML(text, id)
{
   var newNode = document.createElement("p");
   newNode.innerHTML = text;
   document.getElementById(id).appendChild(newNode);  
}

function clearContentField(name)
{
    var contentField = document.getElementById(name);
    
    while (contentField.hasChildNodes())
    {
        contentField.removeChild(contentField.firstChild);
    }
}

/* 
 * Button events
 */
 
function breedButtonClicked()
{
    getBreedingOutcome();    
}

function findParentsButtonClicked()
{
    getPossibleParents();
}

function getBreedingOutcome()
{    
    var contentSection = "content_breeddragons";
    clearContentField(contentSection);
            
    var first_parent_menu = document.getElementById("breeddragons_dragon1choices");    
    var second_parent_menu = document.getElementById("breeddragons_dragon2choices");
    var id1 = dragon_ids[first_parent_menu.selectedIndex];
    var id2 = dragon_ids[second_parent_menu.selectedIndex];
    var dragon1Name = breeds[id1].name;
    var dragon2Name = breeds[id2].name;
        
    var parent1_eligibility = getParentEligibilityParameters(id1);
    var parent2_eligibility = getParentEligibilityParameters(id2);
    var parent1_breedable = parent1_eligibility[0];
    var parent2_breedable = parent2_eligibility[0];
    
    if (parent1_breedable && parent2_breedable)
    {
        var handler = new HtmlOutput(contentSection);
        
        var parent1_specific_offspring = breeds[id1].specificoffspring;
        var parent2_specific_offspring = breeds[id2].specificoffspring;
        var parent1_normal = (parent1_specific_offspring && parent1_specific_offspring.length > 0) ? false : true;
        var parent2_normal = (parent2_specific_offspring && parent2_specific_offspring.length > 0) ? false : true;
        
        if (parent1_normal && parent2_normal)
        {
            var possible_offspring = buildBreedList(id1, id2);
            
            var incubation_filter_menu = document.getElementById("breeddragons_incubationchoices");
            var incubation_index = incubation_filter_menu.selectedIndex;
            var incubation_text = "";
            
            if (incubation_index > 0)
            {
                // First index contains default text; remove it
                var selected_incubation = incubation_times[incubation_index - 1]; 
                incubation_text = selected_incubation.text;
                var offspring_list = [];
                
                for (var index in possible_offspring)
                {
                    var dragon = possible_offspring[index];
                    var dragon_incubation = getIncubationTime(dragon.incubation).value;
                                       
                    if (selected_incubation.type === "days")
                    {
                        // The "days" measurement is not exact
                        var min_value = time_measurements["days"] * 
                        (selected_incubation.value / time_measurements["days"] - 1);
                        var max_value = selected_incubation.value;
                        
                        if (dragon_incubation > min_value && dragon_incubation <= max_value)
                        {
                            offspring_list.push(dragon);
                        }
                    }
                    else
                    {
                        if (dragon_incubation === selected_incubation.value)
                        {
                            offspring_list.push(dragon);
                        }
                    }
                }
                
                possible_offspring = offspring_list;
            }
            
            var level_filter_menu = document.getElementById("breeddragons_levelchoices");
            var level_index = level_filter_menu.selectedIndex;
            var level_text = "";
            
            if (level_index > 0)
            {
                // First index contains default text; remove it
                var selected_level = player_levels[level_index - 1];
                var player_level = selected_level.value;
                level_text = selected_level.text;
                
                var offspring_list = [];
                
                for (var index in possible_offspring)
                {
                    var dragon = possible_offspring[index];
                    var dragon_level_requirement = dragon.level;
                    
                    if (dragon_level_requirement <= player_level)
                    {
                        offspring_list.push(dragon);
                    }
                }
                
                possible_offspring = offspring_list;
            }
            
            var outcome_table = renderOutcomeTable(handler, possible_offspring, dragon1Name, 
                                dragon2Name, incubation_text, level_text);
            handler.output(outcome_table);
        }
        else
        {
            var output = [];
            
            if (!parent1_normal)
            {
                output.push(getSpecificOffspringExplanation(handler, dragon1Name, parent1_specific_offspring));                
            }
            
            if (!parent2_normal)
            {
                if (!(id2 === id1))
                {
                    output.push(getSpecificOffspringExplanation(handler, dragon2Name, parent2_specific_offspring));
                }
            }
            
            for (var str in output)
            {
                displayHTML(output[str], contentSection);
            }
        }
    }
    else
    {
        var output = [];
        
        if (!parent1_breedable)
        {        
            output.push(getParentEligibilityExplanation(dragon1Name, parent1_eligibility[1]));
        }
        
        if (!parent2_breedable)
        {
            if (!(id2 === id1))
            {
                output.push(getParentEligibilityExplanation(dragon2Name, parent2_eligibility[1]));
            }
        }
        
        for (var str in output)
        {
            displayHTML(output[str], contentSection);
        }
    }
    
    var bottomCoordinate = document.getElementById(contentSection).offsetTop;
    window.scroll(0, bottomCoordinate);
}

function getPossibleParents()
{            
    var contentSection = "content_findparents";
    clearContentField(contentSection);
        
    var menu = document.getElementById("findparents_dragonchoices");            
    var dragon_id = dragon_ids[menu.selectedIndex];
    var dragon_name = breeds[dragon_id].name;        
    
    var eligibility = getOffspringEligibilityParameters(dragon_id);
    var breedable = eligibility[0];
    
    if (breedable)
    {
        var possible_parents = buildParentList(dragon_id);
        var all_color_parents = possible_parents[0];
        var component_color_parents = possible_parents[1];
        var some_color_parents = possible_parents[2];
		var specific_parents = possible_parents[3];
        
        var handler = new HtmlOutput(contentSection);
        var all_color_parent_table = "";
        var component_color_parent_table = "";
        var some_color_parent_table = "";
		var specific_parent_table = "";                
        
        if (all_color_parents.length > 0)
        {            
            all_color_parent_table = renderAllColorParentTable(handler, all_color_parents, dragon_name);         
        }
                
        if (component_color_parents.length > 0)
        {        
            component_color_parent_table = renderMinorComponentParentTable(handler, component_color_parents, dragon_name);            
        }            
        
        if (some_color_parents && some_color_parents.length > 0)
        {            
            some_color_parent_table = renderSomeColorParentTable(handler, some_color_parents, dragon_name);         
        }
               
	    if (specific_parents && specific_parents.length > 0)
        {        
            specific_parent_table = renderSpecificParentTable(handler, specific_parents, dragon_name);            
        }
        
        handler.output([component_color_parent_table, all_color_parent_table, some_color_parent_table, specific_parent_table].join(''));
    }
    else
    {
        displayHTML(getOffspringEligibilityExplanation(dragon_name, eligibility[1]), contentSection);
    }   
    
    var bottomCoordinate = document.getElementById(contentSection).offsetTop;
    window.scroll(0, bottomCoordinate);
}

/*
 * Data population functions
 */
 
 function getIncubationTime(str)
 {
    var data = str.split("_");
    
    if (time_measurements[data[1]] !== undefined)
    {        
        return new IncubationTime(data[0], data[1]);
    }
    
    return null;
 }
 
 function buildParentDataList()
 {
	var out = [];
	
	for (var id in breeds)
	{
		var parent_data = breeds[id].parents;
		
        // Create a list of key = offspring, value = parent data for the given offspring, if any exist
        if (parentDataIsValid(parent_data))
        {
			out[id] = parent_data;
        }
	}
	
	return out;
}

 function buildOffspringIndex() 
 {
    var index = {};
    function addBreed(key, value) {
        if (!index[key]) {
            index[key] = [];
        }
        index[key].push(value);
    }
    for (var id in breeds) {
        var breed = breeds[id];
        var parent_data = breed.parents;
		
		if (!parent_data_list[id])
		{
			// Do not add any parent-specific dragons to the color groups
			var colors = getSortedColors(breed.colors);
			addBreed(colors.join(','), id);
		}
    }
    for (var key in index) {    
        var value = index[key];
        value.sort(function (a,b) {
            var breed_a = breeds[a];
            var breed_b = breeds[b];
            if (breed_a.rarity === breed_b.rarity) {
                return comparePrimitives(breed_a, breed_b);
            }
            return breed_a.rarity - breed_b.rarity;
        });
    }
    return index;
}

function buildParentIndex() 
{
    var index = {};
    function addBreed(key, value) {
        if (!index[key]) {
            index[key] = [];
        }
        index[key].push(value);
    }
    for (var id in breeds) {
        var breed = breeds[id];
        var colors = getSortedColors(breed.colors);
        var filtered_colors = filterColors(colors, "recessive");
        
        if (filtered_colors.length > 0)
        {
            colors = filtered_colors;
        }
        
        addBreed(colors.join(','), id);
    }
    for (var key in index) {
	    // Remove parents that only produce specific offspring
        index[key] = filterParentGroup(index[key], "specificoffspring");        
        index[key].sort(function (a,b) {
            var breed_a = breeds[a];
            var breed_b = breeds[b];
            if (breed_a.rarity === breed_b.rarity) {
                return comparePrimitives(breed_a, breed_b);
            }
            return breed_a.rarity - breed_b.rarity;
        });            
    }
        
    return index;
}

/*
 * Breeding functions
 */
 
function buildBreedList(parent1_id, parent2_id)
{
    var parent1_colors = breeds[parent1_id].colors;
    var parent2_colors = breeds[parent2_id].colors;
    var outcome_colors = getBreedingOutcomeColors(parent1_colors, parent2_colors);    
    
    var possible_offspring = new Array();
    
    for (var key in parent_data_list)
    {
        var parent_data = parent_data_list[key];
		var offspring = new Dragon(key);
        
		if (parentDataIsValid(parent_data))
		{
			var possible_parent_pairs = getParentsWithRequirements(parent_data);
					
			for (var index in possible_parent_pairs)
			{
				var parent_pair = possible_parent_pairs[index];
				
				if (pairContainsParents(parent_pair, [parent1_id, parent2_id]))
				{
					possible_offspring.push(offspring);
					break; // A valid parent pair was found, unnecessary to find them all
				}
				else
				{
					var breed_colors = offspring.colors.getValue();					
					
                    if (isSingleColorOffspringException(breed_colors, parent1_colors, parent2_colors))
                    {
                        possible_offspring.push(offspring);
                        break; // A valid parent pair was found, unnecessary to find them all
                    }
				}
			}
		}
    }       
    
    for (var i = 0; i < outcome_colors.length; i++)
    {
        var key = outcome_colors[i].colors.join(',');
        var color_group = offspring_color_groups[key];                
        
        if (color_group)
        {
            for (var j = 0; j < color_group.length; j++)
            {            
                possible_offspring.push(new Dragon(color_group[j]));
            }
        }
    }
    
    return mergeSort(getUniqueObjectList(possible_offspring), "offspring_colors");
}

function getBreedingOutcomeColors(first_dragon_colors, second_dragon_colors)
{
    var color_pool = getSortedColors(getMergedList(first_dragon_colors, second_dragon_colors));        
    
    for (var i = 0; i < excluded_color_types.length; i++)
    {
        color_pool = filterColors(color_pool, excluded_color_types[i]);
    }
	
    var out = [];   
    
    var breeding_pool = new BreedingPool(color_pool);
    var original_pool = breeding_pool.original_pool;    
    var total_colors = breeding_pool.original_length;
    var present_minor_colors = breeding_pool.present_minor_colors;
        
    if (total_colors === 1)
    {
        // Check single color pool exceptions
        var single_color = original_pool[0];
        
        if (single_color === "diamond")
        {
            // Include all possible pures generated by a pure Diamond pool
            var pure_diamond_offspring = getPureDiamondPoolOffspring();
            
            for (var index in pure_diamond_offspring)
            {            
                out.push(new ColorPool(pure_diamond_offspring[index]));
            }
        }
        else if (getColorType(single_color) === "minor")
        {
            var minor_color = new MinorColor(single_color);
            var components = minor_color.components;
            
            for (var index in components)
            {
                var component_color = components[index].color;
                
                if (!listContainsElements(out, [component_color]))
                {
                    // Include all minor color component pures (including cascaded minor color components)
                    out.push(new ColorPool([component_color]));
                }
            }
        }
        else
        {
            // Include the pure color
            out.push(new ColorPool([single_color]));
        }
    }
    else
    {
        // The pool has multiple colors in it
        
        // Add all colors that qualify based on the number of colors in the original pool
        for (var i = 0; i < counted_colors.length; i++)
        {
            var total_color_req = color_count_requirements[counted_colors[i]];
            
            if (total_colors >= total_color_req)
            {
                out.push(new ColorPool([counted_colors[i]]));
            }
        }
    
        // Add all color groups that qualify for plain diamond hybrid pools
        if (total_colors === 2 && original_pool[1] === "diamond")
        {
            if (getColorType(original_pool[0]) === "minor")
            {
                // Minor diamond hybrid pools also add pures of the minor color's components
                                
                var minor_color = new MinorColor(original_pool[0]);
                var components = minor_color.components;
                
                for (var index in components)
                {
                    var component_color = components[index].color;
                    
                    // Include all minor color component pures (including cascaded minor color components)
                    out.push(new ColorPool([component_color]));
                }
            }
            else
            {
                out.push(new ColorPool([original_pool[0]]));
            }
        }
        
        // Add all color groups that qualify for split color hybrid exceptions                
        for (var minor_index in present_minor_colors)
        {
            var color_value = present_minor_colors[minor_index].color;
            
            if (listContainsElements(first_dragon_colors, [color_value]) &&
                listContainsElements(second_dragon_colors, [color_value]))
            {
                /* If both parents possess a minor, they can provide both 
                the minor and the components for a minor and component hybrid */
                out = out.concat(getMinorAndComponentHybridPools(color_value));
            }
        }
        
        // Build basic hybrid pool combinations
        var virtual_pools = []; // Make a list of all virtual pools 
        virtual_pools.push(original_pool.slice(0)); // The original pool (without color splitting)
        virtual_pools = virtual_pools.concat(getCascadingColorPools(original_pool, [])); // Pools with splitting                
        
        for (var index in virtual_pools)
        {
            var virtual_pool = virtual_pools[index];            
            var max_colors = Math.min(virtual_pool.length, max_individual_colors);
            var virtual_pool_combos = new Array();
            
            for (var i = 1; i < max_colors; i++)
            {
                virtual_pool_combos.push(combinations(virtual_pool, i + 1));
            }
            
            for (var i = 0; i < virtual_pool_combos.length; i++)
            {
                for (var j = 0; j < virtual_pool_combos[i].length; j++)
                {            
                    out.push(new ColorPool(virtual_pool_combos[i][j]));                    
                }
            }
        }
    }

    // Remove any repeated pools
    out = getUniqueObjectList(out);
    
    // Collect the combinations of recessive colors included or not included        
    var possible_recessive_combinations = [];
        
    for (var i = 0; i < recessive_colors.length; i++)
    {            
        var r_combos = combinations(recessive_colors, i + 1);
        
        for (var j = 0; j < r_combos.length; j++)
        {
            possible_recessive_combinations.push(r_combos[j]);
        }
    }
        
    var recessive_pools = []; // Recessive colors can surface without being present in the pool
    
    for (var i = 0; i < out.length; i++)
    {
        for (var j = 0; j < possible_recessive_combinations.length; j++)
        {                
            var recessive_pool = getSortedColors(getMergedList(out[i], possible_recessive_combinations[j]));
            
            if (!listsMatch(out[i], recessive_pool, "primitive"))
            {
                recessive_pools.push(recessive_pool);
            }
        }
    }
            
    for (var i = 0; i < recessive_pools.length; i++)
    {
        out.push(new ColorPool(recessive_pools[i]));
    }
    
    return out;
}

function buildParentList(dragon_id)
{
    var all_color_parents = []; // Parents that can be paired with anything to generate the desired offspring
    var component_color_parents = []; // Parents that can be paired with anything providing at least one different color to generate the desired offspring
    var some_color_parents = []; // Parents that must be paired together to generate the desired offspring
	var specific_parents = [];
	    
	var parent_data = breeds[dragon_id].parents;
    
	if (parentDataIsValid(parent_data))
	{   
		specific_parents = getParentsWithRequirements(parent_data);
              		
		var dragon_colors = breeds[dragon_id].colors;
		
		if (dragon_colors.length === 1)
		{
			// Single color dragons have special interactions with Diamond or single color pools of their own color			
			var single_color_exceptions = getSingleColorExceptionParents(dragon_id);
			specific_parents = getMergedList(specific_parents, single_color_exceptions);
		}                  
    }
    else
    {
		var dragon_colors = breeds[dragon_id].colors;
		var dragon_color_req = breeds[dragon_id].requiredcolors;
				
		if (dragon_colors.length === 1 && dragon_colors[0] !== "diamond" && 
		    getColorType(dragon_color_req[0]) !== "recessive")
		{
			var single_color_exception_parents = getSingleColorExceptionParents(dragon_id);
			
			for (var index in single_color_exception_parents)
			{
				some_color_parents.push(single_color_exception_parents[index]);
			}
		}
		
		if (dragon_color_req.length === 1)
		{        
			if (getColorType(dragon_color_req[0]) === "recessive")
			{
				// Recessive colors do not contribute to breeding
				// Do nothing!
			}
			else if (dragon_color_req[0] === "diamond")
			{            
				var pure_diamond_group = new DragonGroup(parent_color_groups["diamond"], ["diamond"]);
					
				// Pair the pure diamonds together
				some_color_parents.push(new DragonPair(pure_diamond_group, pure_diamond_group));               
                
                var existing_group_keys = [];
                
                for (var key in parent_color_groups)
                {
                    existing_group_keys.push(key);
                }
                
                // Get the different group combinations and check if they have 4 or more distinct colors combined                                
                var group_combos = combinations(existing_group_keys, 2);
                
                for (var index in group_combos)
                {
                    var left_color_key = group_combos[index][0];
                    var left_group_colors = left_color_key.split(",");
                    var right_color_key = group_combos[index][1];
                    var right_group_colors = right_color_key.split(",");
                    var combined_colors = getMergedList(left_group_colors, right_group_colors);
                    
                    if (combined_colors.length >= 4)
                    {
                        var left_color_group = parent_color_groups[left_color_key];
                        var right_color_group = parent_color_groups[right_color_key];
                        some_color_parents.push(new DragonPair(new DragonGroup(left_color_group, left_group_colors), 
									new DragonGroup(right_color_group, right_group_colors)));                                    
                    }
                }				            
			}
		}
		else
		{
			var candidates = getParentCandidateColors(dragon_color_req);
			var all_color_candidates = candidates[0];
            var component_color_candidates = candidates[1];
			var some_color_candidates = candidates[2];
			var partial_color_pairs = combinations(some_color_candidates, 2);
			
            // Add groups that can be bred with any other dragon to generate the target offspring
			for (var pool in all_color_candidates)
			{
				var desired_pool = all_color_candidates[pool];
				var key = desired_pool.join(',');
				var group = parent_color_groups[key];
				all_color_parents.push(new DragonGroup(group, desired_pool));         
			}
            
            // Add groups that can be bred with all dragons that provide at least one different color to generate the target offspring
            for (var pool in component_color_candidates)
            {
                var desired_pool = component_color_candidates[pool];
                var key = desired_pool.join(',');
                var group = parent_color_groups[key];
                component_color_parents.push(new DragonGroup(group, desired_pool));
            }
			
            // Add other combinations of parents that can generate the target offspring
			for (var i = 0; i < partial_color_pairs.length; i++)
			{
				// Get the color pools for each group in the pair
				var first_pool = partial_color_pairs[i][0];
				var second_pool = partial_color_pairs[i][1];

				// Get the lookup keys for each color pool
				var left_key = first_pool.join(',');
				var right_key = second_pool.join(',');
				
				// Get the groups corresponding to the lookup keys
				var left_group = new DragonGroup(parent_color_groups[left_key], first_pool);
				var right_group = new DragonGroup(parent_color_groups[right_key], second_pool);
				
				var combined_pool = getMergedList(first_pool, second_pool);                                
										
				if (listContainsElements(combined_pool, dragon_color_req))
				{
					some_color_parents.push(new DragonPair(left_group, right_group));
				}
				else
				{
					// Minors do not split unless the combined pool has more than one color in it.
					if (combined_pool.length > 1 && completedByMinors(combined_pool, dragon_color_req))
					{
						some_color_parents.push(new DragonPair(left_group, right_group));
					}
				}
			}
			
			some_color_parents = getMergedList(some_color_parents, getMinorAndComponentHybridExceptions(dragon_id));
		}
    }
	
    var specific_offspring_parents = [];
    for (var index in specific_offspring_list[dragon_id])
    {
		var parent_id = specific_offspring_list[dragon_id][index];
        specific_offspring_parents.push(new DragonGroup([parent_id], breeds[parent_id].colors));
    }
    
    all_color_parents = getMergedList(specific_offspring_parents, all_color_parents); 

    possible_parents = [all_color_parents, component_color_parents, mergeSort(getUniqueObjectList(some_color_parents), "parent_pairs"), mergeSort(getUniqueObjectList(specific_parents), "parent_pairs")];	
    return possible_parents;
}

function getPureDiamondPoolOffspring()
{
    var out = [];
    
    for (var i = 0; i < combinable_colors.length; i++)
    {
        out.push([combinable_colors[i]]);        
    }
    
    return out;
}

function isSingleColorOffspringException(breed_colors, parent1_colors, parent2_colors)
{
    if (breed_colors.length === 1)
    {
        // Offspring is a pure, which has some special inclusive breeding rules
        
        var color_pool = getSortedColors(getMergedList(parent1_colors, parent2_colors));
        
        if (color_pool.length === 1)
        {
            var single_color = color_pool[0];
            
            if (single_color === "diamond")
            {
                // Include as offspring of pure diamond pool
                return true;
            }
            else if (breed_colors[0] === single_color)
            {
                // Include as offspring of pure same color pool		
                return true;
            }
            else
            {
                var color_type = getColorType(single_color);
                
                if (color_type === "minor")
                {
                    var minor_color = new MinorColor(single_color);                    
                    var color_components = minor_color.components;
                    
                    for (var index in color_components)
                    {
                        if (color_components[index].color === breed_colors[0])
                        {
                            // Include as pure component result of single minor pool
                            return true;
                        }
                    }
                }
            }
        }
        else if (color_pool.length === 2 && color_pool[1] === "diamond")
        {
            if (breed_colors[0] === color_pool[0])
            {
                // Include as offspring of pure + diamond pool								
                return true;
            }
            else
            {
                var color_type = getColorType(color_pool[0]);
                
                if (color_type === "minor")
                {
                    var minor_color = new MinorColor(color_pool[0]);                    
                    var color_components = minor_color.components;
                    
                    for (var index in color_components)
                    {
                        if (color_components[index].color === breed_colors[0])
                        {
                            // Include as pure component result of minor + diamond pool
                            return true;
                        }
                    }
                }
            }
        }	
    }
    
    return false;
}

function getSingleColorExceptionParents(id)
{
	// Single color dragons have special interactions with Diamond or single color pools of their own color
	
	var pairs = [];
	var color = breeds[id].colors.length === 1 ? breeds[id].colors[0] : null;
	
	if (color)
	{
		if (color !== "diamond" && getColorType(color) !== "recessive")
		{					
			var pure_diamond_group = new DragonGroup(parent_color_groups["diamond"], ["diamond"]);
			var pure_color_group = new DragonGroup(parent_color_groups[color], [color]);
			var pure_and_diamond_group = parent_color_groups[color + ",diamond"];
			
			// Pair the pure diamonds together
			pairs.push(new DragonPair(pure_diamond_group, pure_diamond_group));
			
			// Pair the pure same colors together                    
			pairs.push(new DragonPair(pure_color_group, pure_color_group));

			// Pair all the pure same colors and pure diamonds together
			pairs.push(new DragonPair(pure_color_group, pure_diamond_group));
			
			if (pure_and_diamond_group)
			{
				var pure_and_diamond_dragon_group = new DragonGroup(pure_and_diamond_group, [color, "diamond"]);
				
				// Pair the pures and diamond hybrids together
				pairs.push(new DragonPair(pure_color_group, pure_and_diamond_dragon_group));
				pairs.push(new DragonPair(pure_diamond_group, pure_and_diamond_dragon_group));
				pairs.push(new DragonPair(pure_and_diamond_dragon_group, pure_and_diamond_dragon_group));
			}

			// Check for special condition where pure minor color or minor color + diamond pools produce component pures
			for (var i = 0; i < minor_colors.length; i++)
			{
				if (color !== minor_colors[i])
				{
					var components = getColorComponents(minor_colors[i]);
					
					for (var j = 0; j < components.length; j++)
					{
						if (color === components[j])
						{
							// Collect the possible parents for plain minor color + diamond pools
							var minor_color_group = new DragonGroup(parent_color_groups[minor_colors[i]], [minor_colors[i]]);
							var minor_and_diamond_group = parent_color_groups[minor_colors[i] + ",diamond"];
							
							pairs.push(new DragonPair(minor_color_group, minor_color_group));
							pairs.push(new DragonPair(minor_color_group, pure_diamond_group));
							
							if (minor_and_diamond_group)
							{
								var minor_and_diamond_dragon_group = new DragonGroup(minor_and_diamond_group, [minor_colors[i], "diamond"]);						
								
								// Pair the parents together                            
								pairs.push(new DragonPair(minor_color_group, minor_and_diamond_dragon_group));
								pairs.push(new DragonPair(pure_diamond_group, minor_and_diamond_dragon_group));
								pairs.push(new DragonPair(minor_and_diamond_dragon_group, minor_and_diamond_dragon_group));
							}
							
							break;
						}
					}
				}
			}
		}
    }
	
	return pairs;
}

function getMinorAndComponentHybridPools(desired_minor)
{
    var pools = [];          
    var minor_color = new MinorColor(desired_minor);
    
    if (typeof minor_color.components !== "undefined")
    {
        // Get the combinations of components to be tacked onto the minor color for the exception pools
        var component_pool = [];
        
        for (var index in minor_color.components)
        {
            component_pool.push(minor_color.components[index].color);            
        }
        
        var max_colors = Math.min(component_pool.length, max_individual_colors - 1);
        var component_pool_combos = [];
        
        for (var i = 0; i < max_colors; i++)
        {
            component_pool_combos.push(combinations(component_pool, i + 1));
        }
        
        for (var i = 0; i < component_pool_combos.length; i++)
        {
            for (var j = 0; j < component_pool_combos[i].length; j++)
            {            
                pools.push(new ColorPool(component_pool_combos[i][j].concat([desired_minor])));       
            }
        }    
    }    
    
    return pools;
}

function getMinorAndComponentHybridExceptions(id)
{
	var pairs = [];
	var colors = breeds[id].colors;
	
	if (colors.length > 1)
	{
		var candidates = [];
		var desired_minors = [];
		
		for (var i = 0; i < colors.length; i++)
		{
			if (getColorType(colors[i]) === "minor")
			{
				desired_minors.push(colors[i]);
			}
		}
		
		for (var i = 0; i < desired_minors.length; i++)
		{
			for (var key in parent_color_groups)
			{
				var pool = key.split(",");
                
				if ((listContainsElements(pool, [desired_minors[i]]) ||
                     completedByMinors(pool, [desired_minors[i]])) &&
				    !(listContainsElements(pool, colors)))
				{                    
					candidates.push(new DragonGroup(parent_color_groups[key], pool));
				}
			}
			
			for (var j = 0; j < candidates.length; j++)
			{
				for (var k = j; k < candidates.length; k++)
				{
					if (isMinorAndComponentHybridException(desired_minors[i],
					colors, candidates[j].getDragonGroupColors(), 
					candidates[k].getDragonGroupColors()))
					{
						pairs.push(new DragonPair(candidates[j], candidates[k]));
					}
				}
			}
		}
	}

	return pairs;
}

function getParentsWithRequirements(requirements)
{
    var parent_pairs = [];
    
    for (var index in requirements)
    {
        var pair_requirements = new PairRequirement(requirements[index]);
        
        var first_parent_requirement = pair_requirements.first_parent_requirement;
        var first_requirement_type = first_parent_requirement.type;        
        
        var second_parent_requirement = pair_requirements.second_parent_requirement;
        var second_requirement_type = second_parent_requirement.type;        
        
        var first_parent_list = [];
        var second_parent_list = [];
		
		var requirements_match = first_parent_requirement.equals(second_parent_requirement);
        
        if (first_requirement_type === "id")
        {            
            var required_id = first_parent_requirement.value;
            first_parent_list.push(new Dragon(required_id));
        }
        else if (first_requirement_type === "colors")
        {
            var required_colors = first_parent_requirement.value;
            
			for (var key in parent_color_groups)
			{
				var pool = key.split(",");
				
				if (listContainsElements(pool, required_colors) ||
				    completedByMinors(pool, required_colors))
				{                
					var group = parent_color_groups[key];			
					first_parent_list.push(new DragonGroup(group, pool));
				}
			}
        }
		
		if (!requirements_match)
        {
			if (second_requirement_type === "id")
			{
				var required_id = second_parent_requirement.value;
				second_parent_list.push(new Dragon(required_id));
			}
			else if (second_requirement_type === "colors")
			{
				var required_colors = second_parent_requirement.value;
				
				for (var key in parent_color_groups)
				{
					var pool = key.split(",");
					
					if (listContainsElements(pool, required_colors) ||
						completedByMinors(pool, required_colors))
					{
						var group = parent_color_groups[key];					
						second_parent_list.push(new DragonGroup(group, pool));
					}
				}
			}
		}
		
		if (requirements_match)
		{
			for (var i = 0; i < first_parent_list.length; i++)
			{
				for (var j = i; j < first_parent_list.length; j++)
				{
                    var pair_to_add = new DragonPair(first_parent_list[i], first_parent_list[j]);
                    
                    if (specificPairIsValid(pair_to_add, pair_requirements))
                    {
                        parent_pairs.push(pair_to_add);
                    }
				}
			}
		}
		else
		{
        	// Get combinations of first parent + second parent
			for (var i = 0; i < first_parent_list.length; i++)
			{
				for (var j = 0; j < second_parent_list.length; j++)
				{       
                    var pair_to_add = new DragonPair(first_parent_list[i], second_parent_list[j]);
                    
                    if (specificPairIsValid(pair_to_add, pair_requirements))
                    {
                        parent_pairs.push(pair_to_add);
                    }
				}
			}
		}
    }
    
    return parent_pairs;
}

function getEligibleParents(color_group)
{
    // Only add parents that can breed to the list
    
    var eligible_parents = [];
	var group_members = [];
	var group_colors = [];
	
	if (color_group instanceof Dragon)
	{
		group_members.push(color_group.id);
		group_colors = color_group.colors.getValue();
	}
	else if (color_group instanceof DragonGroup)
	{
		group_members = color_group.getDragonGroupMembers();
		group_colors = color_group.getDragonGroupColors();
	}
    
    for (var i = 0; i < group_members.length; i++)
    {        
        var breed_id = group_members[i];
        
        if (getParentEligibilityParameters(breed_id)[0])
        {
            eligible_parents.push(breed_id);
        }
    }
    
	if (eligible_parents.length > 0)
	{
		return new DragonGroup(eligible_parents, group_colors);
	}
	else
	{
		return null;
	}
}

function getParentEligibilityParameters(id)
{
    // State whether a parent can breed, the reason (if not), and the parent's id
    
    var params = [true, "", id];
	var type = breeds[id].parenteligibility;
	
	if (type !== undefined)
	{
		if (parent_eligibility_explanations[type] !== undefined)
		{
			params[0] = false;
			params[1] = type;
		}
	}
	
    return params;
}

function getParentEligibilityExplanation(dragon_name, reason)
{
    var reason_text = "";
	var explanation = parent_eligibility_explanations[reason];
	
	if (explanation !== undefined)
	{
		reason_text = "*** The <b>" + dragon_name + " Dragon</b> cannot " +
		"be used as a parent because " + explanation + " ***";
	}
    
    return reason_text;
}

function getOffspringEligibilityParameters(id)
{    
    var params = [true, "", id];
	var type = breeds[id].offspringeligibility;
	
	if (type !== undefined)
	{
		if (offspring_eligibility_explanations[type])
		{
			params[0] = false;
			params[1] = type;
		}
	}
    
    return params;
}

function getOffspringEligibilityExplanation(dragon_name, reason)
{
    var reason_text = "";
	var explanation = offspring_eligibility_explanations[reason];
	
	if (explanation !== undefined)
	{
		reason_text = "*** The <b>" + dragon_name + " Dragon</b> " + explanation + " ***";
	}
    
    return reason_text;
}

function getSpecificOffspringExplanation(handler, dragon_name, offspring)
{
    var offspring_list = handler.renderGroupLinks(new DragonGroup(offspring, []));
    return ("*** Pairing the <b>" + dragon_name + " Dragon</b> with any other dragon will always result in " + offspring_list + " as offspring. ***");
}

function getParentType(id)
{    
    if (breeds[id].specificoffspring && breeds[id].specificoffspring.length > 0)
    {
        return "specificoffspring";
    }
    
    return "normal";
}

function filterColors(color_pool, type_to_filter)
{
    // Add only colors without the specified filter type to the list

    var filtered_pool = [];
    
    for (var i = 0; i < color_pool.length; i++)
    {                
        if (getColorType(color_pool[i]) !== type_to_filter)
        {        
            filtered_pool.push(color_pool[i]);
        }
    }
    
    return filtered_pool;
}

function filterParentGroup(group, type_to_filter)
{
    var filtered_group = [];
    
    for (var i = 0; i < group.length; i++)
    {
        var id = group[i];
        var type = getParentType(id);
        
        if (type !== type_to_filter)
        {
            filtered_group.push(id);
        }
    }
    
    return filtered_group;
}

function getPresentColorType(pool, type)
{
    var present_type_colors = [];        
    
    for (var i = 0; i < pool.length; i++)
    {
        if (getColorType(pool[i]) === type)
        {
            present_type_colors.push(pool[i]);
        }
    }
    
    return present_type_colors;
}

function filterPresentMinorColors(pool, color_to_filter)
{
    var filtered_minor_colors = pool.slice(0);
    
    for (var i = 0; i < filtered_minor_colors.length; i++)
    {
        if (filtered_minor_colors[i] === color_to_filter)
        {
            filtered_minor_colors.splice(i, 1);
        }
    }
    
    return filtered_minor_colors;
}

function getSplitColorPool(pool, desired_color)
{
    // Colors only split if the desired color is a minor color    
    var color_type = getColorType(desired_color);
    
    if (color_type === "minor")
    {
        var substituted_pool = pool.slice(0); // Make a copy for modification purposes
        var color_components = getColorComponents(desired_color);

        for (var i = 0; i < substituted_pool.length; i++)
        {
            if (pool[i] === desired_color)
            {
                substituted_pool.splice(i, 1);
                
                for (var j = 0; j < color_components.length; j++)
                {
                    if (!listContainsElements(substituted_pool, [color_components[j]]))
                    {
                        substituted_pool.push(color_components[j]);
                    }
                }
                
                break;
            }
        }
        
        return getSortedColors(substituted_pool);
    }
    
    return pool;
}

function getParentCandidateColors(desired_colors)
{
    var out = [];    
    var all_color_candidates = [];
    var component_color_candidates = [];
    var partial_color_candidates = [];
    
    for (var i = 0; i < parent_color_pools.length; i++)
    {
        if (listContainsElements(parent_color_pools[i], desired_colors))
        {
            all_color_candidates.push(parent_color_pools[i]);
        }
        else
        {
            var contains_some_colors = false;
            
            for (var j = 0; j < desired_colors.length; j++)
            {
                if (listContainsElements(parent_color_pools[i], [desired_colors[j]]) ||
                    completedByMinors(parent_color_pools[i], [desired_colors[j]]))
                {
                    contains_some_colors = true;
                    break;
                }
            }           
            
            if (completedByMinors(parent_color_pools[i], desired_colors))
            {
                if (parent_color_pools[i].length > 1)
                {
                    // Minors do not split unless the combined pool has more than one color in it.
                    all_color_candidates.push(parent_color_pools[i]);
                }
                else
                {
                    // Single color minors can contribute their components if paired with other colors
                    component_color_candidates.push(parent_color_pools[i]);
                }
            }                
            else if (contains_some_colors)
            {            
                partial_color_candidates.push(parent_color_pools[i]);
            }
        }
    }
            
    out = [all_color_candidates, component_color_candidates, partial_color_candidates];
    return out;
}

/* 
 * Validation functions
 */
 
function completedByMinors(combined_pool, required_colors)
{
    // Does the pool fulfill the requirements with the presence of its minor colors?
    
    var pools = getCascadingColorPools(combined_pool, []);
    
    for (var index in pools)
    {        
        if (listContainsElements(pools[index], required_colors))
        {
            return true;
        }
    }
    
    return false;
}

function isMinorAndComponentHybridPool(desired_minor, hybrid_pool)
{
	if (getColorType(desired_minor) === "minor" && 
       listContainsElements(hybrid_pool, [desired_minor]))
	{
		var color_components = getColorComponents(desired_minor);
        
		var max_colors = Math.min(color_components.length, max_individual_colors - 1);
                
		for (var i = 0; i < max_colors; i++)
		{        
			var combos = combinations(color_components, i + 1);
		
			for (var j = 0; j < combos.length; j++)
			{
				var possible_pool = combos[j].concat(desired_minor);
				
                // Must be listsMatch, not listContainsElements
				if (listsMatch(hybrid_pool, possible_pool))
				{                
					return true;
				}
			}
		}
	}
	
	return false;
}

function isMinorAndComponentHybridException(desired_minor, hybrid_pool, first_dragon_colors, second_dragon_colors)
{
	if (isMinorAndComponentHybridPool(desired_minor, hybrid_pool))
	{   
		var combined_pool = getMergedList(first_dragon_colors, second_dragon_colors);
		var desired_components = [];
		
		for (var i = 0; i < hybrid_pool.length; i++)
		{
			if (hybrid_pool[i] !== desired_minor)
			{
				desired_components.push(hybrid_pool[i]);
			}
		}
        
        if (combined_pool.length > 1) // Minors only split if more than one unique color is in the pool
        {                        
            if (listContainsElements(first_dragon_colors, [desired_minor]) &&
            listContainsElements(second_dragon_colors, [desired_minor]))
            {
                // Both parents possess the minor color and the pool contains at least one other color
                return true;
            }
        }
	}

	return false;
}

function parentDataIsValid(parent_data)
{
    if (!parent_data || parent_data.length === 0)
    {
        return false;
    }
    
    for (var i = 0; i < parent_data.length; i++)
    {
        var first_parent_data = parent_data[i][0];
        var second_parent_data = parent_data[i][1];
        
        if (first_parent_data && second_parent_data &&
            first_parent_data.length === 2 &&
            second_parent_data.length === 2)
        {
            var first_type = first_parent_data[0];
            var first_req = first_parent_data[1];
            
            if (first_type === "id")
            {
                if (!breeds[first_req])
                {
                    return false;
                }
            }
            else if (first_type === "colors")
            {
                if (!(listContainsElements(all_colors, first_req)))
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
            
            var second_type = second_parent_data[0];
            var second_req = second_parent_data[1];
            
            if (second_type === "id")
            {
                if (!breeds[second_req])
                {
                    return false;
                }
            }
            else if (second_type === "colors")
            {
                if (!(listContainsElements(all_colors, second_req)))
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }    
    
    return true;
}

function pairContainsParents(pair, parents)
{
	if (pair instanceof DragonPair)
	{
		var dragon_pair = pair.getPair();
		var left_group = [];
		var right_group = [];
		
		if (dragon_pair[0] instanceof Dragon)
		{
			left_group = [dragon_pair[0].id];
		}
		else if (dragon_pair[0] instanceof DragonGroup)
		{
			left_group = dragon_pair[0].getDragonGroupMembers();
		}
		
		if (dragon_pair[1] instanceof Dragon)
		{
			right_group = [dragon_pair[1].id];
		}
		else if (dragon_pair[1] instanceof DragonGroup)
		{
			right_group = dragon_pair[1].getDragonGroupMembers();
		}
		
		if (left_group.length > 0 && right_group.length > 0)
		{
			if ((listContainsElements(left_group, [parents[0]]) && listContainsElements(right_group, [parents[1]])) ||
				(listContainsElements(left_group, [parents[1]]) && listContainsElements(right_group, [parents[0]])))
			{
				return true;
			}
		}
	}
	
	return false;
}

function specificPairIsValid(pair, requirements)
{
    var first_parent = pair.first_parent;
    var second_parent = pair.second_parent;
    
    var first_parent_colors = [];
    var second_parent_colors = [];
    
    if (first_parent instanceof Dragon)
    {
        first_parent_colors = first_parent.colors.getValue();
    }
    else if (first_parent instanceof DragonGroup)
    {
        first_parent_colors = first_parent.colors;
    }
    
    if (second_parent instanceof Dragon)
    {
        second_parent_colors = second_parent.colors.getValue();
    }
    else if (second_parent instanceof DragonGroup)
    {
        second_parent_colors = second_parent.colors;
    }        
        
    if (first_parent_colors.length === second_parent_colors.length && first_parent_colors.length === 1 && 
        first_parent_colors[0] === second_parent_colors[0] && getColorType(first_parent_colors[0]) === "minor")
    {
        var first_parent_requirement = requirements.first_parent_requirement;
        var second_parent_requirement = requirements.second_parent_requirement;
        
        if (first_parent_requirement.type === "colors" && 
            first_parent_requirement.value[0] !== first_parent_colors[0])
        {        
            // Single color minor pools should not split to provide requirements
            return false;
        }
        
        if (second_parent_requirement.type === "colors" &&
            second_parent_requirement.value[0] !== second_parent_colors[0])
        {
            // Single color minor pools should not split to provide requirements
            return false;
        }
    }
    
    return true;
}

function listContainsElements(list, required_elements)
{
	if (required_elements && required_elements.length > 0)
	{
		for (var i = 0; i < required_elements.length; i++)
		{
			var found = false;
			
			for (var j = 0; j < list.length; j++)
			{
				if (list[j] === required_elements[i])
				{
					found = true;				
					break;
				}
				else if (list[j] instanceof Object && required_elements[i] instanceof Object &&
						 typeof list[j] === typeof required_elements[i] &&
						 typeof list[j].equals === 'function' && typeof required_elements[i].equals === 'function')
				{
					if (list[j].equals(required_elements[i]))
					{				
						found = true;						
						break;
					}
				}
			}
			
			if (!found)
			{			
				return false;
			}
		}
		
		return true;
	}
	
	return false;
}

function listsMatch(list1, list2, sort_type)
{
	var length1 = list1.length;
	var length2 = list2.length;
	
    if (length1 === length2)
    {
		var sorted_list1 = mergeSort(list1.slice(0), sort_type);
		var sorted_list2 = mergeSort(list2.slice(0), sort_type);
		
		for (var i = 0; i < length1; i++)
		{
			if (sorted_list1[i] instanceof Object && 
				  sorted_list2[i] instanceof Object &&
				  typeof sorted_list1[i] === typeof sorted_list2[i] &&
				  typeof sorted_list1[i].equals === 'function' &&
				  typeof sorted_list2[i].equals === 'function')
			{            
				if (!(sorted_list1[i].equals(sorted_list2[i])))
				{
					return false;
				}
			}			
			else if (sorted_list1[i] !== sorted_list2[i])
			{
				return false;
			}
		}
    }
	else
	{
		return false;
	}
    
    return true;
}

function listCanBeCompared (list)
{
	if (list.length > 0)
	{    
		var type = typeof list[0];
		
		for (var index in list)
		{
			if (typeof list[index] !== type ||
			    !(typeof list[index].equals === 'function') ||
                !(typeof list[index].compareTo === 'function'))
			{
				return false;
			}
		}
	}
    else
    {
        return false;
    }
	
	return true;
}

/* 
 * Computation functions
 */
 
 function combinations(arr, n) 
 {    
    var out = [];
    
    function rec(chosen, numconsidered) 
    {
        if (chosen.length >= n) 
        {
            out.push(chosen.slice(0));
        } 
        else if (n - chosen.length <= arr.length - numconsidered) 
        {
            chosen.push(arr[numconsidered]);            
            rec(chosen, numconsidered+1);
            chosen.pop();
            rec(chosen, numconsidered+1);        
        }
    }
    
    rec([], 0);
  
    return out;
}

function getPairRValues(num_vals, r_limit)
{    
    var r_vals = new Array();

    // Finds each way to form num_vals by adding up two numbers where r_limit is the max value for a single number

    // Base case
    if (num_vals === 1)
    {
        return [[1,1]];
    }
        
    for (var i = 1; i <= num_vals / 2; i++)
    {
        if (num_vals - i <= r_limit)
        {
            r_vals.push([i,(num_vals - i)]);            
        }
    }
        
    return r_vals;
}

function getCombinedPairs(left_list, right_list, avoid_repeats)
{
    var combined_list = [];
    
    if (avoid_repeats)
    {
        for (var i = 0; i < left_list.length; i++)
        {
            for (var j = i; j < right_list.length; j++)
            {
                combined_list.push([left_list[i], right_list[j]]);
            }
        }        
    }
    else
    {
        for (var i = 0; i < left_list.length; i++)
        {
            for (var j = 0; j < right_list.length; j++)
            {
                combined_list.push([left_list[i], right_list[j]]);
            }
        }
    }
   
    return combined_list;
}

/*
 * List manipulation functions
 */
 
function getUniqueObjectList(list)
{   
    // Sort the list according to simple primitive comparisons, then traverse it only once    
	if (listCanBeCompared(list))
	{       
        mergeSort(list, "object_compare");
        
		var unique_list = [list[0]];
		
        for (var i = 1; i < list.length; i++)
        {                    
            if (!(unique_list[unique_list.length - 1].equals(list[i])))
            {
                unique_list.push(list[i]);                
            }
        }

		return unique_list;
	}
	else
	{
		/*DEBUG: displayHTML("Warning: List is empty or contains elements that cannot be compared. " + 
		            "Returning original list.", "content_messages");*/
		return list;
	}
}

function getMergedList(list1, list2)
{    
    var merged_list = [];
    
    if (list1.length === 0)
    {
        return list2;
    }
    else if (list2.length === 0)    
    {
        return list1;
    }
    
    for (var i = 0; i < list1.length; i++)
    {
        if (!(listContainsElements(merged_list, [list1[i]])))
        {        
            merged_list.push(list1[i]);            
        }
    }
    
    for (var i = 0; i < list2.length; i++)
    {
        if (!(listContainsElements(merged_list, [list2[i]])))
        {        
            merged_list.push(list2[i]);
        }
    }
    
    return merged_list;
}

function sortListByRarity(list_to_sort)
{
    var sorted_list = new Array();
    
	if (list_to_sort)
	{
		var separated_list = new Array();
		separated_list.push(new Array()); // Common index = 0
		separated_list.push(new Array()); // Rare index = 1
		separated_list.push(new Array()); // Super Rare index = 2
		separated_list.push(new Array()); // Ultra Rare index = 3
		
		for (var i = 0; i < list_to_sort.length; i++)
		{
			var rarity = breeds[list_to_sort[i]].rarity;                
			separated_list[rarity - 1].push(list_to_sort[i]);
		}
		
		for (var i = 0; i < separated_list.length; i++)
		{        
			for (var j = 0; j < separated_list[i].length; j++)
			{
				sorted_list.push(separated_list[i][j]);
			}
		}      
	}	
    
    return sorted_list;
}

function getSortedColors(colors)
{    
    var sorted_colors = new Array();        
    
    for (var i = 0; i < all_colors.length; i++)
    {
        for (var j = 0; j < colors.length; j++)
        {                        
            if (colors[j] === all_colors[i])
            {                
                sorted_colors.push(colors[j]);    
                break;                
            }
        }
    }        
    
    return sorted_colors;
}

function mergeSort (values, type)
{
    if (values && values.length > 1) // List requires sorting
    {            
        var split_num = parseInt(values.length / 2);
        var remainder = values.length % 2;
        var left = new Array();
        var right = new Array();
        
        for (var i = 0; i < split_num; i++)
        {
            left.push(values[i]);
            right.push(values[i + split_num]);
        }
        
        if (remainder > 0) // Odd number of values
        {
            right.push(values[values.length - 1]);
        }
        
        left = mergeSort(left, type);
        right = mergeSort(right, type);
        
        values = merge(values, left, right, type);
    }
        
    return values;    
}

function merge(values, left, right, type)
{
    var n = 0; // index of values
    var l = 0; // index of left
    var r = 0; // index of right
    
    while (l < left.length && r < right.length)
    {
        if (compareValues(left[l], right[r], type) <= 0) // left < right
        {            
            values[n] = left[l];
            l++;
        }
        else // right < left
        {        
            values[n] = right[r];
            r++;            
        }
        
        n++;
    }
    
    // One of the subarrays has been exhausted.  Copy over the remaining elements.
    
    while (l < left.length)
    {
        values[n] = left[l];    
        l++;        
        n++;
    }
    
    while (r < right.length)
    {
        values[n] = right[r];    
        r++;
        n++;
    }
    
    return values;
}

/*
 * Comparison functions
 */

function compareValues (first_val, second_val, type)
{        
	if (type === "primitive")
	{
		return comparePrimitives(first_val, second_val);
	}
    else if (type == "object_compare")
    {
        return first_val.compareTo(second_val);
    }
    else if (type === "incubation")
    {
        return compareIncubationTimes(first_val, second_val);
    }
    else if (type === "level_requirements")
    {
        return compareLevelRequirements(first_val, second_val);
    }
    else if (type === "colors")
    {
        return compareColors(first_val, second_val);
    }
    else if (type === "color_pools")
    {
        return compareColorPools(first_val, second_val);
    }
	else if (type === "group_color_pools")
	{
		return compareGroupColorPools(first_val, second_val);
	}
    else if (type === "offspring_colors")
    {
        return compareOffspringColors(first_val, second_val);
    }
    else if (type === "parent_pairs")
    {
        return compareParentPairs(first_val, second_val);
    }
    else if (type === "pair_pool_size")
    {
        return comparePairPoolSize(first_val, second_val);
    }
    
    return 0;
}

function comparePrimitives(a,b) 
{
    if (a < b) 
    {
        return -1;
    }
    if (a > b) 
    {
        return 1;
    }
    
    return 0;
}

function compareIncubationTimes(first_inc, second_inc)
{
    if (first_inc && second_inc && first_inc instanceof IncubationTime &&
        second_inc instanceof IncubationTime)
    {
        return comparePrimitives(first_inc.value, second_inc.value);
    }
    
    return 0;
}

function compareLevelRequirements(first_color, second_color)
{
    var first_color_req = level_requirements[first_color];
    var second_color_req = level_requirements[second_color];
    
    if (first_color_req !== undefined && second_color_req !== undefined)
    {
        return comparePrimitives(first_color_req, second_color_req);
    }
    
    if (first_color_req === undefined)
    {
        displayHTML("Warning: No level requirement found for the " + first_color + " type.", "content_messages");
    }
    
    if (second_color_req === undefined)
    {
        displayHTML("Warning: No level requirement found for the " + second_color + " type.", "content_messages");
    }    
    
    return 0;
}

function compareColors(first_color, second_color)
{        
    var first_color_val = getColorValue(first_color);
    var second_color_val = getColorValue(second_color);

    if (first_color_val < second_color_val)
    {
        return -1;
    }
    else if (first_color_val > second_color_val)
    {
        return 1;
    }
    
    return 0;
}

function compareColorPools(first_pool, second_pool)
{        
    var first_pool_size = first_pool.length;
    var second_pool_size = second_pool.length;
    
    // Smallest color pools first
    if (first_pool_size < second_pool_size)
    {
        return -1;
    }
    else if (first_pool_size > second_pool_size)    
    {
        return 1;
    }
       
    // Color pool sizes are equal
    for (var i = 0; i < first_pool_size; i++)
    {
        var comparison = compareColors(first_pool[i], second_pool[i]);        
        
        if (comparison < 0)
        {
            return -1;
        }
        else if (comparison > 0)
        {        
            return 1;
        }
    }
    
    return 0;
}

function compareGroupColorPools(first_parent, second_parent)
{ 
	if (first_parent && second_parent)
	{
		var first_pool = [];
		var second_pool = [];
		
		if (first_parent instanceof Dragon)
		{
			first_pool = first_parent.colors.getValue();
		}
		else if (first_parent instanceof DragonGroup)
		{
			first_pool = first_parent.getDragonGroupColors();
		}
		
		if (second_parent instanceof Dragon)
		{
			second_pool = second_parent.colors.getValue();
		}
		else if (second_parent instanceof DragonGroup)
		{
			second_pool = second_parent.getDragonGroupColors();
		}                
		
		return compareColorPools(first_pool, second_pool);
	}
	
	return 0;
}


function compareOffspringColors(first_val, second_val)
{
	if (first_val && second_val)
	{
		var first_pool = [];
		var second_pool = [];
		
		if (first_val instanceof Dragon)
		{
			first_pool = getSortedColors(first_val.colors.getValue());
		}
		
		if (second_val instanceof Dragon)
		{
			second_pool = getSortedColors(second_val.colors.getValue());
		}
		
		return compareColorPools(first_pool, second_pool);
	}
	
	return 0;
}

function compareParentPairs(first_val, second_val)
{
	if (first_val && second_val && first_val instanceof DragonPair && second_val instanceof DragonPair)
	{
        var first_pair = first_val.getPair();
		var second_pair = second_val.getPair();
		
		var first_left_parent_pool = [];
		var first_right_parent_pool = [];
		
		var second_left_parent_pool = [];
		var second_right_parent_pool = [];
		
		if (first_pair[0] instanceof Dragon)
		{
			first_left_parent_pool = first_pair[0].colors.getValue();
		}
		else if (first_pair[0] instanceof DragonGroup)
		{
			first_left_parent_pool = first_pair[0].getDragonGroupColors();
		}
		
		if (first_pair[1] instanceof Dragon)
		{
			first_right_parent_pool = first_pair[1].colors.getValue();
		}
		else if (first_pair[1] instanceof DragonGroup)
		{
			first_right_parent_pool = first_pair[1].getDragonGroupColors();
		}
		
		if (second_pair[0] instanceof Dragon)
		{
			second_left_parent_pool = second_pair[0].colors.getValue();
		}
		else if (second_pair[0] instanceof DragonGroup)
		{
			second_left_parent_pool = second_pair[0].getDragonGroupColors();
		}
		
		if (second_pair[1] instanceof Dragon)
		{
			second_right_parent_pool = second_pair[1].colors.getValue();
		}
		else if (second_pair[1] instanceof DragonGroup)
		{
			second_right_parent_pool = second_pair[1].getDragonGroupColors();
		}
        
		// Size of color pool takes priority over colors in the pool for comparison    
		var size_comparison = comparePairPoolSize([first_left_parent_pool, first_right_parent_pool], 
							  [second_left_parent_pool, second_right_parent_pool], "pair_pool_size");
		
		if (size_comparison !== 0)
		{
			return size_comparison;
		}
		
		// Color pool size check has passed; now compare the values of the colors in the pool    
		var left_comparison = compareColorPools(first_left_parent_pool, second_left_parent_pool);
		
		if (left_comparison < 0)
		{
			return -1;
		}
		else if (left_comparison > 0)
		{
			return 1;
		}
		
		var right_comparison = compareColorPools(first_right_parent_pool, second_right_parent_pool);
		
		if (right_comparison < 0)
		{
			return -1;
		}
		else if (right_comparison > 0)
		{
			return 1;
		}        
	}
	
	return 0;
}

function comparePairPoolSize(first_val, second_val)
{
    var first_left_size = first_val[0].length;
    var first_right_size = first_val[1].length;
    
    var second_left_size = second_val[0].length;
    var second_right_size = second_val[1].length;        
    
    if (first_left_size < second_left_size)
    {        
        return -1;
    }
    else if (first_left_size > second_left_size)
    {    
        return 1;
    }
    
    if (first_right_size < second_right_size)
    {    
        return -1;
    }
    else if (first_right_size > second_right_size)
    {    
        return 1;
    }
    
    return 0;
}

/*
 * Dragon color functions
 */

function getColorValue(color) {
    for (var i = 0; i < all_colors.length; i++)
    {
        if (all_colors[i] === color)
        {
            return i + 1;
        }
    }
    
    return 0;
}

function getColorType (color) {
    var type = complex_color_types[color];
    
    if (type)
    {
        return type;
    }
        
    return "basic";
}

function getColorComponents (color) {
    var components = complex_color_components[color];
    
    if (components)
    {
        return components;
    }
   
   return [color];
}

function getRequiredColorAmount (color) {
    var amount = color_count_requirements[color];
    
    if (amount)
    {
        return amount;
    }
   
   return 0;
}

function getCascadingComponents(components, parent, color)
{
    // Initial components list should be an empty array []
    
    if (getColorType(color) !== "minor")
    {                     
        if (parent === color)
        {
            components.push(new Color(color));
        }
        else
        {
            components.push(new ComponentColor(parent, color));
        }
        
        return components;
    }
    else
    {
        var color_components = getColorComponents(color);
        
        if (parent === color)
        {
            components.push(new Color(color));
        }
        else
        {
            components.push(new ComponentColor(parent, color));
        }
        
        for (var i = 0; i < color_components.length; i++)
        {
            getCascadingComponents(components, color, color_components[i]);
        }
        
        return components;    
    }
}

function getCascadingColorPools(pool_to_cascade, pool_list)
{
    // The original call should send pool_list as an empty array []
    // This is called until there are no minor colors left in the pool
    // This can generate repeat pools, which can be removed later
    
    pool_list.push(pool_to_cascade);
    
    var minor_combos = [];
    var minors_to_split = [];
    var present_minor_colors = getPresentColorType(pool_to_cascade, "minor");
    
    for (var i = 0; i < present_minor_colors.length; i++)
    {
        minor_combos.push(combinations(present_minor_colors, i + 1));
    }
        
    for (var i = 0; i < minor_combos.length; i++)
    {
        for (var j = 0; j < minor_combos[i].length; j++)
        {
            minors_to_split.push(minor_combos[i][j]);
        }
    }
    
    for (var list_index in minors_to_split)
    {
        var minor_list = minors_to_split[list_index];
        var virtual_pool = pool_to_cascade.slice(0); // Copy the original pool for modification                                    
                    
        for (var split_index in minor_list)
        {
            virtual_pool = getSplitColorPool(virtual_pool, minor_list[split_index]);
        }
        
        getCascadingColorPools(virtual_pool, pool_list);
    }    
    
    return pool_list;
}

/*
 * Custom dragon data structures
 */
 
function PlayerLevel(value, text)
{
    this.value = value;
    this.text = text;
}
 
function Dragon(id)
{
	var dragon = breeds[id];
	
	if (dragon)
	{	
		this.id = id;
		
		for (var key in dragon)
		{
			this[key] = dragon[key];
		}
		
		this.colors = new DragonColor(this.colors);
	}
	else
	{
		displayHTML("Warning: Invalid dragon id.", "content_messages");
	}
}

Dragon.prototype.compareTo = function(dragon_to_compare) {
    if (dragon_to_compare instanceof Dragon)
    {
        return comparePrimitives(this.id, dragon_to_compare.id);
    }
    
    return 0;
}

Dragon.prototype.equals = function(dragon_to_compare) {
	if (dragon_to_compare instanceof Dragon)
	{
		if (this.id == dragon_to_compare.id)
		{
			return true;
		}
	}
	
	return false;
}

function IncubationTime(value, type)
{
    if (time_measurements[type] !== undefined)
    {
        this.text = value + " " + type;
        this.value = value * time_measurements[type];
        this.type = type;
    }
    else
    {
        displayHTML("Warning: Invalid incubation time type.", "content_messages");
    }
}

IncubationTime.prototype.compareTo = function(compare_val) {
    if (compare_val instanceof IncubationTime)
    {
        return comparePrimitives(this.value, compare_val.value);
    }
    
    return 0;
}

IncubationTime.prototype.equals = function(compare_val) {
	if (compare_val instanceof IncubationTime)
	{
		if (this.value === compare_val.value &&
            this.text === compare_val.text)
        {
            return true;
        }        
	}
	
	return false;
}

function DragonColor(colors)
{
	this.colors = colors.slice(0);
}

DragonColor.prototype.getValue = function()
{
	return this.colors;
}

function Color(color)
{
    this.color = color;
}

function ComponentColor(parent, color)
{
    this.parent = parent;
    this.color = color;   
}

function MinorColor(color)
{
    if (getColorType(color) === "minor")
    {
        this.color = color;
        this.components = getCascadingComponents([], this.color, this.color);
        
        for (var index in this.components)
        {
            if (this.components[index] instanceof Color)
            {
                this.components.splice(index, 1);
                break;
            }
        }     
    }
    else
    {
        displayHTML("Warning: Incorrect attempt to make " + color + " a minor color.", "content_messages");
    }
}

MinorColor.prototype.compareTo = function(color_to_compare)
{
    if (color_to_compare instanceof MinorColor)
    {
        return comparePrimitives(this.color, color_to_compare.color);
    }
    
    return 0;
}

MinorColor.prototype.equals = function(color_to_compare)
{
    if (color_to_compare instanceof MinorColor)
    {
        if (this.color === color_to_compare.color)
        {
            return true;
        }
    }
    
    return false;
}

function ColorPool(colors)
{
    this.colors = getSortedColors(colors);
}

ColorPool.prototype.compareTo = function(pool_to_compare)
{
    if (pool_to_compare instanceof ColorPool)
    {
        var this_key = this.colors.join(',');
        var compare_key = pool_to_compare.colors.join(',');
        
        return comparePrimitives(this_key, compare_key);
    }
    
    return 0;
}

ColorPool.prototype.equals = function (pool_to_compare)
{
    if (pool_to_compare instanceof ColorPool)
    {
        if (listsMatch(this.colors, pool_to_compare.colors, "primitive"))
        {
            return true;
        }
    }
    
    return false;
}

function BreedingPool(colors)
{
    this.original_pool = getSortedColors(colors.slice(0));
    this.original_length = this.original_pool.length;
    
    this.present_minor_colors = [];
    var present_minor_list = getPresentColorType(this.original_pool, "minor");
    
    for (var index in present_minor_list)
    {
        this.present_minor_colors.push(new MinorColor(present_minor_list[index])); 
    }
}

BreedingPool.prototype.compareTo = function(pool_to_compare)
{
    if (pool_to_compare instanceof BreedingPool)
    {
        var this_key = this.original_pool.join(',');
        var compare_key = this.original_pool.join(',');
        return comparePrimitives(this_key, compare_key);
    }
    
    return 0;
}

BreedingPool.prototype.equals = function(pool_to_compare)
{
    if (pool_to_compare instanceof BreedingPool)
    {
        if (listsMatch(this.original_pool, pool_to_compare.original_pool, "primitive"))
        {
            return true;
        }
    }
    
    return false;
}
 
function DragonGroup(group, colors)
{
    this.group = sortListByRarity(group); // An array of dragon ids
	this.colors = getSortedColors(colors);
    this.compare_value = this.getCompareValue();
}

DragonGroup.prototype.getDragonGroupColors = function() {
    return this.colors;
}

DragonGroup.prototype.getDragonGroupMembers = function() {
    return this.group;
}

DragonGroup.prototype.getCompareValue = function() {
    return this.getDragonGroupMembers().join(','); 
}

DragonGroup.prototype.compareTo = function (group_to_compare) {
    if (group_to_compare instanceof DragonGroup)
    {        
        return comparePrimitives(this.compare_value, group_to_compare.compare_value);
    }
    
    return 0;
}

DragonGroup.prototype.equals = function(group_to_compare) {
	if (group_to_compare instanceof DragonGroup)
	{
		if (listsMatch(this.getDragonGroupMembers(), group_to_compare.getDragonGroupMembers(), "primitive"))
		{
			return true;
		}
	}
	
	return false;
}

function DragonPair(first_parent, second_parent)
{
	if ((first_parent instanceof DragonGroup || first_parent instanceof Dragon) &&
	    (second_parent instanceof DragonGroup || second_parent instanceof Dragon))
	{
		this.pair = mergeSort([first_parent, second_parent], "group_color_pools");
        this.first_parent = this.pair[0];
        this.second_parent = this.pair[1];
        this.compare_value = this.getCompareValue();
	}
	else
	{
		this.pair = null;
		/*DEBUG: displayHTML("Warning: Inappropriate parents submitted for DragonPair.", "content_messages");*/
	}    
}

DragonPair.prototype.getPair = function()
{
    return this.pair;
}

DragonPair.prototype.getCompareValue = function () {
    var first_parent_name = "";
    var second_parent_name = "";
    
    if (this.first_parent instanceof Dragon)
    {
        first_parent_name = this.first_parent.id;
    }
    else if (this.first_parent instanceof DragonGroup)
    {
        first_parent_name = this.first_parent.getDragonGroupMembers().join(',');
    }
    
    if (this.second_parent instanceof Dragon)
    {
        second_parent_name = this.second_parent.id;
    }
    else if (this.second_parent instanceof DragonGroup)
    {
        second_parent_name = this.second_parent.getDragonGroupMembers().join(',');
    }
    
    return [first_parent_name, second_parent_name].join(',');
}

DragonPair.prototype.compareTo = function (pair_to_compare) {
	
	if (pair_to_compare instanceof DragonPair)
	{        
        return comparePrimitives(this.compare_value, pair_to_compare.compare_value);
	}
	else
	{
		/*DEBUG: displayHTML("Warning: Object given for comparison is not a DragonPair.", "content_messages");*/
	}
    
    return 0;
}

DragonPair.prototype.equals = function(pair_to_compare) {
	if (pair_to_compare instanceof DragonPair)
	{
		var compare_pair = pair_to_compare.getPair();
		
		if (this.pair && compare_pair)
		{
			var this_first_parent = this.pair[0];
			var this_second_parent = this.pair[1];
			
			var compare_first_parent = compare_pair[0];
			var compare_second_parent = compare_pair[1];
			
			if ((this_first_parent.equals(compare_first_parent) &&
			     this_second_parent.equals(compare_second_parent)) ||
				(this_first_parent.equals(compare_second_parent) &&
				 this_second_parent.equals(compare_first_parent)))
			{
				return true;
			}
		}
	}

	return false;
}

function PairRequirement(pair_requirement)
{
    this.first_parent_requirement = new ParentRequirement(pair_requirement[0]);
    this.second_parent_requirement = new ParentRequirement(pair_requirement[1]);
}

function ParentRequirement(parent_requirement)
{
    this.type = parent_requirement[0];
    this.value = parent_requirement[1];        
}

ParentRequirement.prototype.equals = function(requirement_to_compare)
{
    if (requirement_to_compare instanceof ParentRequirement)
    {
        if (this.type === requirement_to_compare.type)
        {
            if (this.type === "id" && this.value === requirement_to_compare.value)
            {
                return true;
            }
            else if (this.type === "colors" && listsMatch(this.value, requirement_to_compare.value, "primitive"))
            {
                return true;
            }
        }     
    }
    
    return false;
}

/*
 * Table rendering code
 */
 
function renderOutcomeTable(handler, possible_offspring, parent1_name, parent2_name, incubation_text, level_text)
{    
    var num_results = 0;
    
    var rows = handler.joinRows(
        possible_offspring.map(function (offspring) {            
            if (getOffspringEligibilityParameters(offspring.id)[0])
            {         
                num_results++;
                var name = offspring.name;
                var colors = offspring.colors.getValue();
                var rarity = rarities[offspring.rarity - 1];
                var incubation = offspring.incubation.split("_");
                var incubation_display = incubation[0];
                var incubation_text = incubation[1];
                var incubation_cost = incubation[2];
                
                return handler.wrapRow(
                    handler.joinCells([handler.wrapCell(handler.renderDragonLink(name), "center"),
                    handler.wrapCell(handler.renderDragonColors(colors), "center"),
                    handler.wrapCell("&nbsp &nbsp " + rarity + "&nbsp &nbsp ", "center"),
                    handler.wrapCell(incubation_display, "right"),handler.wrapCell("&nbsp" + incubation_text, "left"),
                    handler.wrapCell("&nbsp " + incubation_cost, "right"),handler.wrapCell(handler.urlToImage(gold_image_page_source, 20, 20), "left")
                    ]));
            }
        })
    );
    
    var selection = "filters";
    var option_text = "options";
    
    if (incubation_text !== "")
    {
        if (level_text === "")
        {
            selection = "incubation time filter";
            option_text = "option";
        }
        else
        {
            selection = "incubation time and level filters";
        }
    }
    else if (level_text !== "")
    {
        selection = "level filter";
        option_text = "option";
    }
    
    if (rows.length > 0)
    {
        var intro_level_text = (level_text === "") ? "" : 
        " at <b>" + level_text + "</b>";
        var intro_incubation_text = (incubation_text === "") ? "" : 
        " with an incubation time of <b>" + incubation_text + "</b>";
        
        var intro_text = "<p>Breeding <b>" + parent1_name + "</b> with <b>" + parent2_name + 
        "</b>" + intro_level_text + " can result in <b>" + num_results + "</b> possible " + 
        ((num_results == 1) ? "dragon" : "dragons") + intro_incubation_text + ":";
        
        var header_color = "#8EC3CD";                  
        var headers = handler.joinRows([handler.wrapHeader("Dragon Name", header_color, 1, 170), handler.wrapHeader("Types", header_color, 1, 70), 
        handler.wrapHeader("Rarity", header_color, 1, 100), handler.wrapHeader("Incubation Time", header_color, 2, 100), handler.wrapHeader("Cost to Complete", header_color, 2, 100)
        ]);
        
        var reminder_text = (selection === "filters") ? "" : "<br><b>Remember:</b> You can select the default first option to cancel the " + selection + ".";
        
        return handler.wrapTable(handler.joinRows([intro_text, headers, rows])) + reminder_text;
    }    
    
    return "<br>There are currently no possible offspring with your selected " + selection + ".<br>" +
           "You can select the default first " + option_text + " to view all the possible offspring " +
           "for this parent pair.";
}

function renderMinorComponentParentTable(handler, component_color_groups, target_name)
{
    var intro_text = "<p>The <b>" + target_name + " Dragon</b> can be bred by pairing one of these dragons with " +
                     "any dragon that provides at least one different color.</p>";

    var header_color = "#8EC3CD";
    var headers = handler.joinRows([handler.wrapHeader("Dragon", header_color, 1, 150), handler.wrapHeader("Type", header_color, 1, 60)]);
    
    var component_color_parents = [];
	
    for (var group in component_color_groups)
    {
        var parents = getEligibleParents(component_color_groups[group]).getDragonGroupMembers();
        
        for (var parent in parents)
        {
            component_color_parents.push(new Dragon(parents[parent]));
        }
    }
    
    mergeSort(component_color_parents, "offspring_colors"); // Make sure the all color table is sorted
    
    var valid_parents = 0;
    
    // Create the rows where a single parent possesses all the required colors
    var rows = handler.joinRows(
        component_color_parents.map(function (dragon) {
            valid_parents++;
            
            var breed_name = dragon.name;    
            var colors = dragon.colors.getValue();
            
            return handler.wrapRow(
                handler.joinCells([handler.wrapCell(handler.renderDragonLink(breed_name), "center"),
                handler.wrapCell(handler.renderDragonColors(colors), "center")
            ]));
        })
    );
    
    var single_parent_text = "the following dragon";
    var multiple_parent_text = "one of the following <b>" + valid_parents + "</b> dragons";
    var intro_text = "<p>The <b>" + target_name + " Dragon</b> can be bred by pairing " +
    ((valid_parents === 1) ? single_parent_text : multiple_parent_text) +
    " with any dragon that provides at least one different color.</p>";    
    return handler.wrapTable(handler.joinRows([intro_text, headers, rows]));
}

function renderAllColorParentTable(handler, all_color_groups, target_name)
{    
    var header_color = "#8EC3CD";
    var headers = handler.joinRows([handler.wrapHeader("Dragon", header_color, 1, 150), handler.wrapHeader("Types", header_color, 1, 100)]);        
    
    var all_color_parents = [];
	
    for (var group in all_color_groups)
    {
        var parents = getEligibleParents(all_color_groups[group]).getDragonGroupMembers();
        
        for (var parent in parents)
        {
            all_color_parents.push(new Dragon(parents[parent]));
        }
    }
    
    mergeSort(all_color_parents, "offspring_colors"); // Make sure the all color table is sorted
    
    var valid_parents = 0;
    
    // Create the rows where a single parent possesses all the required colors
    var rows = handler.joinRows(
        all_color_parents.map(function (dragon) {
            valid_parents++;
            
            var breed_name = dragon.name;    
            var colors = dragon.colors.getValue();
            
            return handler.wrapRow(
                handler.joinCells([handler.wrapCell(handler.renderDragonLink(breed_name), "center"),
                handler.wrapCell(handler.renderDragonColors(colors), "center")
            ]));
        })
    );
            
    var single_parent_text = "the following dragon";
    var multiple_parent_text = "one of the following <b>" + valid_parents + "</b> dragons";
    var intro_text = "<p>The <b>" + target_name + " Dragon</b> can be bred by pairing " +
    ((valid_parents === 1) ? single_parent_text : multiple_parent_text) + 
    " with any other dragon.</p>";
    
    return handler.wrapTable(handler.joinRows([intro_text, headers, rows]));
}

function renderSomeColorParentTable(handler, some_color_groups, target_name)
{            
    var header_color = "#8EC3CD";
    var headers = handler.joinRows([handler.wrapHeader("Group A Dragons", header_color, 1, 200), 
    handler.wrapHeader("Group A Types", header_color, 1, 100),
    handler.wrapHeader("Group B Types", header_color, 1, 100),
    handler.wrapHeader("Group B Dragons", header_color, 1, 200)]);

    var valid_pairs = 0;        
    
    var rows = handler.joinRows(
        some_color_groups.map(function (group_pair) {                        
			var pair = group_pair.getPair();
            var left_group = getEligibleParents(pair[0]);
            var right_group = getEligibleParents(pair[1]);
            
            if (left_group && right_group)
            {
                valid_pairs++;
                
                var left_colors = left_group.getDragonGroupColors();
                var right_colors = right_group.getDragonGroupColors();
                
                return handler.wrapRow(handler.joinCells([handler.wrapCell(handler.renderGroupLinks(left_group), "center"),
                handler.wrapCell(handler.renderDragonColors(left_colors), "center"),
                handler.wrapCell(handler.renderDragonColors(right_colors), "center"),
                handler.wrapCell(handler.renderGroupLinks(right_group), "center")
                ]));
            }
        })
    );
        
    var single_pair_text = "the following pair only";
    var multiple_pair_text = " one of the following <b>" + valid_pairs + "</b> pairs";
    var intro_text = "<p>The <b>" + target_name + " Dragon</b> can be bred using " + 
    ((valid_pairs === 1) ? single_pair_text : multiple_pair_text) + ".</p>";
    
    return handler.wrapBorderedTable(handler.joinRows([intro_text, headers, rows]));
}

function renderSpecificParentTable(handler, specific_parents, target_name)
{            
    var header_color = "#8EC3CD";
    var headers = handler.joinRows([handler.wrapHeader("Group A Dragons", header_color, 1, 200), 
    handler.wrapHeader("Group A Types", header_color, 1, 100),
    handler.wrapHeader("Group B Types", header_color, 1, 100),
    handler.wrapHeader("Group B Dragons", header_color, 1, 200)]);
        
    var valid_pairs = 0;
    
    // Create the rows of each specific parent pair
    var rows = handler.joinRows(
        specific_parents.map(function (parent_pair) {
			var pair = parent_pair.getPair();
			var first_parent = getEligibleParents(pair[0]);
			var second_parent = getEligibleParents(pair[1]);
			
			if (first_parent && second_parent)
			{
                valid_pairs++;
                
				var first_parent_links = "";
				var second_parent_links = "";
				
				var first_parent_colors = [];
				var second_parent_colors = [];
				
				if (first_parent instanceof Dragon)
				{
					first_parent_links = handler.renderDragonLink(first_parent.name);
					first_parent_colors = first_parent.colors.getValue();
				}
				else if (first_parent instanceof DragonGroup)
				{
					first_parent_links = handler.renderGroupLinks(first_parent);
					first_parent_colors = first_parent.getDragonGroupColors();
				}
				
				if (second_parent instanceof Dragon)
				{
					second_parent_links = handler.renderDragonLink(second_parent.name);
					second_parent_colors = second_parent.colors.getValue();
				}
				else if (second_parent instanceof DragonGroup)
				{
					second_parent_links = handler.renderGroupLinks(second_parent);
					second_parent_colors = second_parent.getDragonGroupColors();
				}		
										
				return handler.wrapRow(handler.joinCells([handler.wrapCell(first_parent_links, "center"),
					   handler.wrapCell(handler.renderDragonColors(first_parent_colors), "center"),
					   handler.wrapCell(handler.renderDragonColors(second_parent_colors), "center"),
					   handler.wrapCell(second_parent_links, "center")			
				]));
			}
        })
    );
    
    var single_pair_text = "the following pair only";
    var multiple_pair_text = " one of the following <b>" + valid_pairs + "</b> specific pairs";
    var intro_text = "<p>The <b>" + target_name + " Dragon</b> can be bred using " + 
    ((valid_pairs === 1) ? single_pair_text : multiple_pair_text) + ".</p>";
    
    return handler.wrapBorderedTable(handler.joinRows([intro_text, headers, rows]));
}

/*
 * HTML-specific output handler
 */

function HtmlOutput(outputElementId)
{
    this.outputElementId = outputElementId;
    this.rows = [];
}

HtmlOutput.prototype.toUrl = function (link, text, title) {
    return "<a title=\"" + title + "\" href=\"" +  link + "\">" + text + "</a>";
}

HtmlOutput.prototype.renderDragonLink = function (breed_name) {    
    return this.toUrl(dragon_page_source + breed_name + " Dragon", breed_name + " Dragon", breed_name + " Dragon");
}

HtmlOutput.prototype.renderGroupLinks = function(group) {
    var links = [];
	
	var dragon_group = group.getDragonGroupMembers();
    
    for (var dragon in dragon_group)
    {
        var breed_name = breeds[dragon_group[dragon]].name;            
        links.push(this.toUrl(dragon_page_source + breed_name + " Dragon", breed_name, breed_name + " Dragon"));
    }
    
    return this.arrayToCombinedList(links);
}

HtmlOutput.prototype.arrayToCombinedList = function(list) {
	if (list.length == 1) {
		return list[0];
	}
	else if (list.length == 2) {
		return list.join(' or ');
	}
	
	return list.slice(0, list.length - 1).join(", ") + ", or " + list[list.length - 1];	
}

HtmlOutput.prototype.urlToImage = function (url, width, height) {
    return "<img src=\""+url+"\" width=\""+width+"\" height=\""+height+"\"/>";
}

HtmlOutput.prototype.colorToImage = function (color) {
    var url = color_image_url[color];
    if (url) {
        return this.urlToImage(url,20,20);
    } else {
        return "???"+color+"???";
    }
}

HtmlOutput.prototype.renderDragonColors = function (colors) {    
    var dragon_colors = [];

    for (var color in colors)
    {
        dragon_colors.push(this.colorToImage(colors[color]));
    }
    
    return dragon_colors.join(' ');
}

HtmlOutput.prototype.wrapHeader = function (header, color, span, width)
{
    var header_style = "width:" + width + "px; height:50px; background-color:" + color + "; text-align: center;";
    return "<th style=\""+header_style+"\" colspan=\"" + span + "\">"+header+"</th>";
}

HtmlOutput.prototype.wrapCell = function (cell, align)
{
    var cell_style = "text-align:" + align + ";";
    
    return "<td style=\"" +cell_style+"\">"+cell+"</td>";
}

HtmlOutput.prototype.wrapRow = function (row)
{
    return "<tr>"+row+"</tr>"
}

HtmlOutput.prototype.joinRows = function (rows)
{
    return rows.join('');
}

HtmlOutput.prototype.joinCells = function (cells)
{
    return cells.join('');
}

HtmlOutput.prototype.joinLines = function (lines)
{
    return lines.join('<br/>');
}

HtmlOutput.prototype.joinLinesDouble = function (lines)
{
    return lines.join('<br/><br/>');
}

HtmlOutput.prototype.wrapTable = function (content)
{    
    var table_style = "background-color:#CCCCCC; border-collapse: collapse;";
    return "<table style=\"" + table_style + "\">"+content+"</table>";
}

HtmlOutput.prototype.wrapBorderedTable = function (content)
{    
    var table_style = "background-color:#CCCCCC; border-collapse: collapse;";
    return "<table border=\"1\" cellPadding=\"10\" style=\"" + table_style + "\">"+content+"</table>";
}

HtmlOutput.prototype.output = function (value)
{   
    document.getElementById(this.outputElementId).innerHTML = value;
}