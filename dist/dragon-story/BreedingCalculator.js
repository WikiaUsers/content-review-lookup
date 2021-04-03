/* 
 * Initial setup functions
 */

$(document).ready(function() {         
	if(mw.config.get("wgPageName") === "Breeding_Calculator") {
		addBreedingCalculatorForm();
		buildDataLists();
		setBreedingMenuOptions();      
	}
});

function addBreedingCalculatorForm() {
	var	$calculator_element = $("#breeddragons-calculator"),
		calculator_form_html = '<div id="DSBreedingCalculator"></div><div id="content_messages"></div><form style="display:none" id="breeddragons"><select id="breeddragons_dragon1choices"></select><select id="breeddragons_dragon2choices"></select><select id="breeddragons_incubationchoices" style="display:none"></select><select id="breeddragons_levelchoices" style="display:none"></select><br><br><input type="button" onclick="breedButtonClicked()" value="Get Breeding Results" id="breedingResultsButton"/></form><div id="content_breeddragons"></div>',
		
		$calculator_pair_element = $("#breeddragons-pair-calculator"),
		calculator_pair_form_html = '<form style="display:none" id="findparents"><select id="findparents_dragonchoices"></select><br><br><input type="button" onclick="findParentsButtonClicked()" value="Get Potential Pairings" id="potentialPairingsButton"/></form><div id="content_findparents"></div>';
		
	$calculator_element.html(calculator_form_html);
	$calculator_pair_element.html(calculator_pair_form_html);
	document.getElementById("breedingResultsButton").onclick = function() {breedButtonClicked()};
	document.getElementById("potentialPairingsButton").onclick = function() {findParentsButtonClicked()};
}

function buildDataLists(){
    // Build the lists of types   
    window.minor_types = [];
    window.recessive_types = [];
    window.counted_types = [];   
    
    for (var type_index in window.calculator_data.all_types){
        var type_classification = getTypeClassification(window.calculator_data.all_types[type_index]);      
        
        if (type_classification === "minor"){
            minor_types.push(window.calculator_data.all_types[type_index]);
        }
        else if (type_classification === "recessive"){
            recessive_types.push(window.calculator_data.all_types[type_index]);
        }
        else if (type_classification === "counted"){
            counted_types.push(window.calculator_data.all_types[type_index]);
        }
    }
    
    // Build group-related variables
    window.parent_data_list = buildParentDataList();   
    window.offspring_type_groups = buildOffspringIndex();
    window.parent_type_groups = buildParentIndex();
    window.parent_type_pools = [];
    parent_type_pools[window.calculator_data.TYPE_GROUPS_ALL_ID] = [];
    parent_type_pools[window.calculator_data.TYPE_GROUPS_DRAGON_ISLANDS_ID] = [];
    parent_type_pools[window.calculator_data.TYPE_GROUPS_ARCTIC_ISLES_ID] = [];
    
    for (var key in parent_type_groups){
        var group_is_arctic = false;
        var type_group = key.split(",");
        
        for (var index in window.calculator_data.arctic_types){
            if (listContainsElements(type_group, [window.calculator_data.arctic_types[index]])){
                parent_type_pools[window.calculator_data.TYPE_GROUPS_ARCTIC_ISLES_ID].push(type_group);
                group_is_arctic = true;
                break;
            }
        }
        
        if (!group_is_arctic){
            parent_type_pools[window.calculator_data.TYPE_GROUPS_DRAGON_ISLANDS_ID].push(type_group);
        }        
        
        parent_type_pools[window.calculator_data.TYPE_GROUPS_ALL_ID].push(type_group);
    }
    
    // Fill more globally-required variables
        
    window.dragon_ids = [];
    window.environment_breed_ids = [];
	window.type_enabled_ids = [];
    window.incubation_times = [];
    window.player_levels = [];
    window.max_level_requirement = 0;
    window.max_individual_types = 0;
    
    for (var dragon_id in window.calculator_data.breeds){
        dragon_ids.push(dragon_id);
		
		if (window.calculator_data.breeds[dragon_id].enablingtypes){
			type_enabled_ids.push(dragon_id);			
		}
        
        // Process the dragon's types
        var dragon_types = window.calculator_data.breeds[dragon_id].types;
        var num_types = dragon_types.length;
        
        window.calculator_data.breeds[dragon_id].requiredtypes = filterTypes(dragon_types, "recessive");
                       
        if (num_types > max_individual_types){
            max_individual_types = num_types;
        }
        
        // Process the dragon's environment
        var environments = window.calculator_data.breeds[dragon_id].environments;
        
        for (var env_index in environments){
            var env_key = environments[env_index];
            
            if (!environment_breed_ids[env_key]){
                environment_breed_ids[env_key] = [];
            }
            
            environment_breed_ids[env_key].push(dragon_id);
        }
        
        // Process the dragon's incubation time
        var incubation_data = window.calculator_data.breeds[dragon_id].incubation;
        var incubation = getIncubationTime(incubation_data);
        
        if (incubation !== null){
            incubation_times.push(incubation);
        }
        
        // Process the dragon's level requirement
        var required_level = window.calculator_data.breeds[dragon_id].level;
        
        if (required_level !== undefined){
            // Do not overwrite a custom level requirement with default values
            
            // Keep track of the maximum level requirement for display purposes
            if (required_level > max_level_requirement){
                max_level_requirement = required_level;
            }            
        }
        else{
            // Set the level requirement according to default values
            var sorted_types = dbcMergeSort(dragon_types, "level_requirements");
            var highest_req_type = sorted_types[sorted_types.length - 1];
            var level_requirement = window.calculator_data.level_requirements[highest_req_type];
            
            if (level_requirement === undefined){
                level_requirement = 0;
                displayHTML("Warning: Level requirement for " + window.calculator_data.breeds[dragon_id].name + 
                " set to 0.", "content_messages");
            }
            
            window.calculator_data.breeds[dragon_id].level = level_requirement;
        }              
    }     
}

function setBreedingMenuOptions(){
    var first_parent_menu = document.getElementById("breeddragons_dragon1choices");
    var second_parent_menu = document.getElementById("breeddragons_dragon2choices");
    var incubation_filter_menu = document.getElementById("breeddragons_incubationchoices");
    var level_filter_menu = document.getElementById("breeddragons_levelchoices");
    var offspring_menu = document.getElementById("findparents_dragonchoices");
            
    for (var dragon_id in window.calculator_data.breeds){
        var dragon_name = window.calculator_data.breeds[dragon_id].name;
        
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
    
    dbcMergeSort(incubation_times, "incubation");
    incubation_times.push(new IncubationTime(2, "days"));
    
    /* Must use this extra code because getUniqueObjectList() checking for 
       a valid prototype.equals method does not work on MediaWiki due to 
       an unresolvable race condition when using jQuery's document.ready check */
    var incubation_choices = [incubation_times[0]];
    
    for (var i = 1; i < incubation_times.length; i++){
        if (incubation_choices[incubation_choices.length - 1].text !==
            incubation_times[i].text){
            incubation_choices.push(incubation_times[i]);
        }
    }
    
    incubation_times = incubation_choices;
    
    var default_incubation_option = document.createElement("option");
    default_incubation_option.text = "Filter by time (optional)";
    incubation_filter_menu.add(default_incubation_option);
    
    for (var index in incubation_times){
        var incubation_option = document.createElement("option");
        incubation_option.text = incubation_times[index].text;
        incubation_filter_menu.add(incubation_option);
    }
    
    for (var key in window.calculator_data.level_requirements){
        if (window.calculator_data.level_requirements[key] > max_level_requirement){
            max_level_requirement = window.calculator_data.level_requirements[key];
        }        
    }
    
    var default_level_option = document.createElement("option");
    default_level_option.text = "Filter by player level (optional)";
    level_filter_menu.add(default_level_option);
    
    for (var mlri = 1; mlri < max_level_requirement; mlri++){
        var player_level = new PlayerLevel(mlri, "Lvl. " + mlri);
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

function displayHTML(text, id){
   var newNode = document.createElement("p");
   newNode.innerHTML = text;
   document.getElementById(id).appendChild(newNode);  
}

function clearContentField(name){
    var content_field = document.getElementById(name);
    
    while(content_field.hasChildNodes()){
        content_field.removeChild(content_field.firstChild);
    }
}

function scrollToSection(content_section, scroll_offset){
    var bottom_coordinate = document.getElementById(content_section).offsetTop + scroll_offset;
    window.scroll(0, bottom_coordinate);    
}

/* 
 * Button events
 */
 
function breedButtonClicked(){
    getBreedingOutcome();    
}

function findParentsButtonClicked(){
    getPossibleParents();
}

function getBreedingOutcome(){    
    var content_section = "content_breeddragons";
    clearContentField(content_section);
            
    var first_parent_menu = document.getElementById("breeddragons_dragon1choices");    
    var second_parent_menu = document.getElementById("breeddragons_dragon2choices");
    var id1 = dragon_ids[first_parent_menu.selectedIndex];
    var id2 = dragon_ids[second_parent_menu.selectedIndex];
    var dragon1Name = window.calculator_data.breeds[id1].name;
    var dragon2Name = window.calculator_data.breeds[id2].name;
        
    var parent1_eligibility = getParentEligibilityParameters(id1);
    var parent2_eligibility = getParentEligibilityParameters(id2);
    var parent1_breedable = parent1_eligibility[0];
    var parent2_breedable = parent2_eligibility[0];
    
    if (parent1_breedable && parent2_breedable){
        var handler = new HtmlOutput(content_section); 
        
        var possible_offspring = buildOffspringList(id1, id2);
        
        var incubation_filter_menu = document.getElementById("breeddragons_incubationchoices");
        var incubation_index = incubation_filter_menu.selectedIndex;
        var incubation_text = "";
        
        if (incubation_index > 0){
            // First index contains default text; remove it
            var selected_incubation = incubation_times[incubation_index - 1]; 
            incubation_text = selected_incubation.text;
            var inc_offspring_list = [];
            
            for (var index in possible_offspring){
                var inc_dragon = possible_offspring[index];
                var dragon_incubation = getIncubationTime(inc_dragon.incubation).value;
                                   
                if (selected_incubation.type === "days"){
                    // The "days" measurement is not exact
                    var min_value = window.calculator_data.time_measurements.days * 
                    (selected_incubation.value / window.calculator_data.time_measurements.days - 1);
                    var max_value = selected_incubation.value;
                    
                    if (dragon_incubation > min_value && dragon_incubation <= max_value){
                        inc_offspring_list.push(inc_dragon);
                    }
                }
                else{
                    if (dragon_incubation === selected_incubation.value){
                        inc_offspring_list.push(inc_dragon);
                    }
                }
            }
            
            possible_offspring = inc_offspring_list;
        }
        
        var level_filter_menu = document.getElementById("breeddragons_levelchoices");
        var level_index = level_filter_menu.selectedIndex;
        var level_text = "";
        
        if (level_index > 0){
            // First index contains default text; remove it
            var selected_level = player_levels[level_index - 1];
            var player_level = selected_level.value;
            level_text = selected_level.text;
            
            var lvl_offspring_list = [];
            
            for (var po_index in possible_offspring){
                var lvl_dragon = possible_offspring[po_index];
                var dragon_level_requirement = lvl_dragon.level;
                
                if (dragon_level_requirement <= player_level){
                    lvl_offspring_list.push(lvl_dragon);
                }
            }
            
            possible_offspring = lvl_offspring_list;
        }
        
        displayHTML(window.calculator_data.TABLE_RENDERING_PROGRESS_MESSAGE, content_section);
        
        window.setTimeout(function(){
            var outcome_table = renderOutcomeTable(handler, possible_offspring, dragon1Name, 
                            dragon2Name, incubation_text, level_text);
            handler.output(outcome_table);            
        }, 0);         
    }
    else{
        var output = [];
        
        if (!parent1_breedable){        
            output.push(getParentEligibilityExplanation(dragon1Name, parent1_eligibility[1]));
        }
        
        if (!parent2_breedable){
            if (id2 !== id1){
                output.push(getParentEligibilityExplanation(dragon2Name, parent2_eligibility[1]));
            }
        }
        
        for (var str in output){
            displayHTML(output[str], content_section);
        }               
    }
    
    scrollToSection(content_section, 0);
}

function getPossibleParents(){            
    var content_section = "content_findparents";
    clearContentField("content_breeddragons");
    clearContentField(content_section);
   
    var menu = document.getElementById("findparents_dragonchoices");            
    var dragon_id = dragon_ids[menu.selectedIndex];
    var dragon_name = window.calculator_data.breeds[dragon_id].name;        
    
    var eligibility = getOffspringEligibilityParameters(dragon_id);
    var breedable = eligibility[0];
       
    if (breedable){
        var possible_parents = buildParentList(dragon_id);
        var all_type_parents = possible_parents[0];
        var component_type_parents = possible_parents[1];
        var some_type_parents = possible_parents[2];
        var specific_parents = possible_parents[3];
        
        var handler = new HtmlOutput(content_section);
        var default_offspring_message = "";
        var all_type_parent_table = "";
        var component_type_parent_table = "";
        var some_type_parent_table = "";
        var specific_parent_table = "";        
        
        if (window.calculator_data.default_offspring_explanations[dragon_id]){
            default_offspring_message = "<br>" + window.calculator_data.default_offspring_explanations[dragon_id] + "<br>";
        }
                        
        if (all_type_parents.length > 0){            
            all_type_parent_table = renderAllTypeParentTable(handler, all_type_parents, dragon_name);         
        }
                
        if (component_type_parents.length > 0){        
            component_type_parent_table = renderMinorComponentParentTable(handler, component_type_parents, dragon_name);            
        }            
        
        if (some_type_parents && some_type_parents.length > 0){            
            some_type_parent_table = renderSomeTypeParentTable(handler, some_type_parents, dragon_name);         
        }
               
        if (specific_parents && specific_parents.length > 0){        
            specific_parent_table = renderSpecificParentTable(handler, specific_parents, dragon_name);            
        }                
        
        displayHTML(window.calculator_data.TABLE_RENDERING_PROGRESS_MESSAGE, content_section);
                
        window.setTimeout(function(){            
            handler.output([default_offspring_message, component_type_parent_table, all_type_parent_table, some_type_parent_table, specific_parent_table].join(''));            
        }, 0);
    }
    else{
        displayHTML(getOffspringEligibilityExplanation(dragon_name, eligibility[1]), content_section);
    }   
    
    scrollToSection(content_section, 80);
}

/*
 * Data population functions
 */
 
 function getIncubationTime(str)
 {
    var data = str.split("_");
    
    if (window.calculator_data.time_measurements[data[1]] !== undefined){        
        return new IncubationTime(data[0], data[1]);
    }
    
    return null;
 }
 
 function buildParentDataList()
 {
    var out = [];
    
    for (var id in window.calculator_data.breeds){
        var parent_data = window.calculator_data.breeds[id].parents;
        
        // Create a list of key = offspring, value = parent data for the given offspring, if any exist
        if (parentDataIsValid(parent_data)){        
            out[id] = parent_data;
        }
    }
    
    return out;
}

 function buildOffspringIndex(){
    var index = {};
    
    function addBreed(key, value) {
        if (!index[key]) {
            index[key] = [];
        }
        
        index[key].push(value);
    }
    
    for (var id in window.calculator_data.breeds) {
        var breed = window.calculator_data.breeds[id];
        var parent_data = breed.parents;
        
        if (!parent_data_list[id]){
            // Do not add any parent-specific dragons to the type groups
            var types = getSortedTypes(breed.types);
            var filtered_types = filterTypes(types, "recessive");
            
            if (filtered_types.length > 0){
                types = filtered_types;
            }
            
            addBreed(types.join(','), id);
        }
    }
    
    for (var key in index) {    
        var value = index[key];
        value.sort(function (a,b) {
            var breed_a = window.calculator_data.breeds[a];
            var breed_b = window.calculator_data.breeds[b];
            
            if (breed_a.rarity === breed_b.rarity) {
                return comparePrimitives(breed_a, breed_b);
            }
            
            return breed_a.rarity - breed_b.rarity;
        });
    }
    return index;
}

function buildParentIndex(){
    var index = {};
    
    function addBreed(key, value) {    
        if (!index[key]) {
            index[key] = [];
        }
        
        index[key].push(value);
    }
    
    for (var id in window.calculator_data.breeds) {    
        var breed = window.calculator_data.breeds[id];
        
        if (!window.calculator_data.breeds[id].parenteligibility){
            var types = getSortedTypes(breed.types);
            var filtered_types = filterTypes(types, "recessive");
            
            if (filtered_types.length > 0){
                types = filtered_types;
            }
            
            addBreed(types.join(','), id);
        }
    }
    
    for (var key in index) {        
        index[key].sort(function (a,b) {
            var breed_a = window.calculator_data.breeds[a];
            var breed_b = window.calculator_data.breeds[b];
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
 
function buildOffspringList(first_parent_id, second_parent_id){
    var possible_offspring = [];
    var first_parent_types = window.calculator_data.breeds[first_parent_id].types;
    var second_parent_types = window.calculator_data.breeds[second_parent_id].types;    
    
    var first_parent_is_arctic = breedInhabitsEnvironment(first_parent_id, window.calculator_data.ENVIRONMENT_ARCTIC_ISLES_ID);
    var second_parent_is_arctic = breedInhabitsEnvironment(second_parent_id, window.calculator_data.ENVIRONMENT_ARCTIC_ISLES_ID);
    var pair_is_arctic = (first_parent_is_arctic || second_parent_is_arctic);
        
    var outcome_types = getBreedingOutcomeTypes(first_parent_types, second_parent_types);
    
    for (var i = 0; i < outcome_types.length; i++){
        var key = outcome_types[i].types.join(',');
        var type_group = offspring_type_groups[key];                
        
        if (type_group){
            for (var j = 0; j < type_group.length; j++){            
                possible_offspring.push(new Dragon(type_group[j]));
            }
        }
    }
	
	for (var index in type_enabled_ids){
		var enabling_types = window.calculator_data.breeds[type_enabled_ids[index]].enablingtypes;		
		var breeding_pool = new BreedingPool(first_parent_types, second_parent_types);         
		var type_pool = breeding_pool.processed_pool;
				
		for (var type_index in enabling_types){
			if (listContainsElements(type_pool, [enabling_types[type_index]])){
				possible_offspring.push(new Dragon(type_enabled_ids[index]));
			}
		}
	}
    
    for (var key in parent_data_list){
        var parent_data = parent_data_list[key];
        var offspring = new Dragon(key);           
        
        if (parentDataIsValid(parent_data)){
            var possible_parent_pairs = getParentsWithRequirements(parent_data, getEnvironmentKey(key));
                    
            for (var index in possible_parent_pairs){
                var parent_pair = possible_parent_pairs[index];
                
                if (pairContainsParents(parent_pair, [first_parent_id, second_parent_id])){
                    possible_offspring.push(offspring);
                    break; // A valid parent pair was found, unnecessary to find them all
                }
                else{
                    var breed_types = offspring.types.getValue();                    
                    
                    if (isSingleTypeOffspringException(breed_types, first_parent_types, second_parent_types)){                    
                        possible_offspring.push(offspring);
                        break; // A valid parent pair was found, unnecessary to find them all
                    }
                }
            }
        }
    }
    
    if (pair_is_arctic){
        // Only accept arctic inhabitants        
        var filtered_offspring = [];
        
        for (var index in possible_offspring){
            var breed_id = possible_offspring[index].id;
            
            if (breedInhabitsEnvironment(breed_id, window.calculator_data.ENVIRONMENT_ARCTIC_ISLES_ID)){
                filtered_offspring.push(possible_offspring[index]);
            }
        }
        
        possible_offspring = filtered_offspring;
        
        if (possible_offspring.length === 0){
            // All Arctic Isles pairings that do not result in specific offspring will yield the Ice Age Dragon
            possible_offspring.push(new Dragon("iceage"));                        
        }
        else{
            var id_list = [];
            
            for (var possible_offspring_index in possible_offspring){
                var offspring_group = possible_offspring[possible_offspring_index];
                
                if (offspring_group instanceof Dragon){
                    id_list.push(offspring_group.id);
                }
                else if (offspring_group instanceof DragonGroup){
                    var offspring_group_ids = offspring_group.getDragonGroupMembers();
                    
                    for (var offspring_group_index in offspring_group_ids){
                        id_list.push(offspring_group_ids[offspring_group_index]);
                    }
                }
            }
            
            if (breedTypePresent(id_list, "diamond")){            
                 /* When arctic Diamond hybrids are possible, all pures of each present arctic
                   type are possible. This check is only performed at the end to avoid incorrectly 
                   filtering outcomes that should have yielded the Ice Age Dragon. */
                                
                var unfiltered_types = getMergedList(first_parent_types, second_parent_types); 
                var arctic_breeds = environment_breed_ids[window.calculator_data.ENVIRONMENT_ARCTIC_ISLES_ID];
                for (var index in arctic_breeds){
                    if (listContainsElements(unfiltered_types, window.calculator_data.breeds[arctic_breeds[index]].types)){
                        possible_offspring.push(new Dragon(arctic_breeds[index]));
                    }
                }
            }
        }
    }
    
    return dbcMergeSort(getUniqueObjectList(possible_offspring), "offspring_types");
}

function getBreedingOutcomeTypes(first_dragon_types, second_dragon_types){
    var out = [];
   
    var breeding_pool = new BreedingPool(first_dragon_types, second_dragon_types);     
    var total_types = breeding_pool.original_length;        
    var type_pool = breeding_pool.processed_pool;     
    var present_minor_types = breeding_pool.present_minor_types;    
        
    if (total_types === 1){
        // Check single type pool exceptions
        var single_type = type_pool[0];
        
        if (single_type === "diamond"){
            // Include all possible pures generated by a pure Diamond pool
            var pure_diamond_offspring = getPureDiamondPoolOffspring();
            
            for (var index in pure_diamond_offspring){
                out.push(new TypePool(pure_diamond_offspring[index]));
            }
        }
        else if (getTypeClassification(single_type) === "minor"){
            var minor_type = new MinorType(single_type);
            var components = minor_type.components;
            
            for (var index in components){
                var component_type = components[index].type;
                
                if (!listContainsElements(out, [component_type])){
                    // Include all minor type component pures (including cascaded minor type components)
                    out.push(new TypePool([component_type]));
                }
            }
        }
        else {
            // Include the pure type
            out.push(new TypePool([single_type]));
        }
    }
    else{
        // The pool has multiple types in it
        
        // Add all types that qualify based on the number of types in the original pool
        for (var i = 0; i < counted_types.length; i++){
            var total_type_req = window.calculator_data.type_count_requirements[counted_types[i]];
            
            if (total_types >= total_type_req){
                out.push(new TypePool([counted_types[i]]));
            }
        }
        
        // Add all type groups that qualify for plain diamond hybrid pools        
        if (isMinorAndDiamondPool(first_dragon_types, second_dragon_types)){
            // Pools containing only Diamond and a single minor type are processed differently
            // This check must be done here instead of in processed types, because processing is still necessary
            // Minor and Diamond hybrids paired with minor pures must still allow minor and component hybrids
            
            var minor_and_diamond_pool = getSortedTypes(getMergedList(first_dragon_types, second_dragon_types));
            
            // Minor diamond hybrid pools also add pures of the minor type's components
                                    
            var minor_type = new MinorType(minor_and_diamond_pool[0]);
            var components = minor_type.components;
            
            for (var index in components){
                var component_type = components[index].type;
                
                // Include all minor type component pures (including cascaded minor type components)
                out.push(new TypePool([component_type]));
            }   
        }
        else if (total_types === 2 && type_pool[1] === "diamond"){
            // Check after minor and diamond pools to find non-minor and diamond pools
            out.push(new TypePool([type_pool[0]]));
        }     
        
        // Build basic hybrid pool combinations
        var virtual_pools = []; // Make a list of all virtual pools 
        virtual_pools.push(type_pool.slice(0)); // The original pool (without type splitting)
        virtual_pools = virtual_pools.concat(getCascadingTypePools(type_pool, [])); // Pools with splitting                
        
        for (var index in virtual_pools){
            var virtual_pool = virtual_pools[index];     
            var max_types = Math.min(virtual_pool.length, max_individual_types);
            var virtual_pool_combos = new Array();
            
            for (var i = 1; i < max_types; i++){
                virtual_pool_combos.push(combinations(virtual_pool, i + 1));
            }
            
            for (var i = 0; i < virtual_pool_combos.length; i++){
                for (var j = 0; j < virtual_pool_combos[i].length; j++){            
                    out.push(new TypePool(virtual_pool_combos[i][j]));                    
                }
            }
        }
    }

    // Remove any repeated pools
    out = getUniqueObjectList(out);
    
    // Collect the combinations of recessive types included or not included in the offspring types   
    var possible_recessive_combinations = [];
        
    for (var i = 0; i < recessive_types.length; i++){            
        var r_combos = combinations(recessive_types, i + 1);
        
        for (var j = 0; j < r_combos.length; j++){
            possible_recessive_combinations.push(r_combos[j]);
        }
    }
    
    var recessive_pools = []; // Recessive types can surface without being present in the pool
    
    for (var i = 0; i < out.length; i++){
        for (var j = 0; j < possible_recessive_combinations.length; j++){                
            var recessive_pool = getSortedTypes(getMergedList(out[i], possible_recessive_combinations[j]));
            
            if (!listsMatch(out[i], recessive_pool, "primitive")){
                recessive_pools.push(recessive_pool);
            }
        }
    }
    
    for (var i = 0; i < recessive_pools.length; i++){
        out.push(new TypePool(recessive_pools[i]));
    }
    
    return out;
}

function getProcessedTypeList(first_dragon_types, second_dragon_types){
    // Process the list of types according to the breeding rules
    
    var processed_types = [];
    
    for (var i = 0; i < first_dragon_types.length; i++){
        if (getTypeClassification(first_dragon_types[i]) === "minor"){
            if (listContainsElements(second_dragon_types, [first_dragon_types[i]])){
                // This is a minor type provided by both parents
                
                if (getMergedList(first_dragon_types, second_dragon_types).length > 1){
                    // Split this first type and add its components to the pool
                    // This only happens if there is more than one unique type in the pool
                    var minor_type = new MinorType(first_dragon_types[i]);
                    var components = minor_type.components;
                    
                    for (var j = 0; j < components.length; j++){
                        processed_types.push(components[j].type);
                    }
                }
            }
            else{
                // This is a minor type only present in the first parent
                processed_types.push(first_dragon_types[i]);
            }
        }
        else{
            // Add the type without making modifications
            processed_types.push(first_dragon_types[i]);
        }        
    }
    
    for (var i = 0; i < second_dragon_types.length; i++){
        // Add all of the second dragon's types
        // Repeated minor types were handled in the first dragon type's processing
        processed_types.push(second_dragon_types[i]);
    }
    
    // Remove all repeated types
    processed_types = getUniquePrimitiveList(processed_types);
    
    // Filter out excluded types
    for (var i = 0; i < window.calculator_data.excluded_types.length; i++){
        processed_types = filterTypes(processed_types, window.calculator_data.excluded_types[i]);
    }
        
    // Return the sorted type list
    return getSortedTypes(processed_types);
}

function isMinorAndDiamondPool(first_dragon_types, second_dragon_types){
    var merged_pool = getMergedList(first_dragon_types, second_dragon_types);
    
    if (merged_pool.length === 2){
        merged_pool = getSortedTypes(merged_pool);
        
        if (merged_pool[1] === "diamond" && getTypeClassification(merged_pool[0]) === "minor"){
            return true;
        }
    }

    return false;
}

function buildParentList(dragon_id){
    var possible_parents = [];

    var all_type_parents = []; // Parents that can be paired with anything to generate the desired offspring
    var component_type_parents = []; // Parents that can be paired with anything providing at least one different type to generate the desired offspring
    var some_type_parents = []; // Parents that must be paired together to generate the desired offspring
    var specific_parents = [];
        
    var parent_data = window.calculator_data.breeds[dragon_id].parents;
    var breed_types = window.calculator_data.breeds[dragon_id].types;
    var environment_key = getEnvironmentKey(dragon_id);

    if (parentDataIsValid(parent_data)){   
        specific_parents = getParentsWithRequirements(parent_data, environment_key);                              
        
        if (breed_types.length === 1){
            // Single type dragons have special interactions with Diamond or single type pools of their own type            
            var single_type_exceptions = getSingleTypeExceptionParents(dragon_id);
            specific_parents = getMergedList(specific_parents, single_type_exceptions); 
            
            // Arctic diamond hybrids generate pures of the corresponding arctic type
            // Find the corresponding arctic diamond hybrid if necessary
            var arctic_diamond_hybrid_group = getCorrespondingArcticDiamondHybridGroup(breed_types[0]);
            
            if (arctic_diamond_hybrid_group) {
                all_type_parents.push(arctic_diamond_hybrid_group);
            }
        }
    }
    else {
        var breed_type_req = window.calculator_data.breeds[dragon_id].requiredtypes;
                
        if (breed_types.length === 1){
            var single_type_exception_parents = getSingleTypeExceptionParents(dragon_id);
            
            for (var index in single_type_exception_parents){
                some_type_parents.push(single_type_exception_parents[index]);
            }
            
            // Arctic diamond hybrids generate pures of the corresponding arctic type
            // Find the corresponding arctic diamond hybrid if necessary
            var arctic_diamond_hybrid_group = getCorrespondingArcticDiamondHybridGroup(breed_types[0]);
            
            if (arctic_diamond_hybrid_group) {
                all_type_parents.push(arctic_diamond_hybrid_group);
            }
			
			// Some single type dragons like the Olympus can occur in the presence of specific types
			// Such dragons are not restrained to the typical single type exception parent rules
			var enabling_types = window.calculator_data.breeds[dragon_id].enablingtypes;
			
			if (enabling_types){
				for (var index in enabling_types){
					// Get all parents with the enabling type				
					var groups_with_type = getGroupsWithType(enabling_types[index], environment_key);
					
					for (var group_index in groups_with_type){
						all_type_parents.push(groups_with_type[group_index]);
					}
				}
			}		
        }
        
        if (breed_type_req.length === 1){        
            if (getTypeClassification(breed_type_req[0]) === "recessive"){
                // Recessive types do not contribute to breeding
                // Do nothing!
            }
            else if (breed_type_req[0] === "diamond"){
                var pure_diamond_group = new DragonGroup(parent_type_groups["diamond"], ["diamond"]);
                    
                // Pair the pure diamonds together
                some_type_parents.push(new DragonPair(pure_diamond_group, pure_diamond_group));               
                
                var existing_group_keys = [];
                
                for (var index in parent_type_pools[window.calculator_data.TYPE_GROUPS_DRAGON_ISLANDS_ID]){
                    var pool = parent_type_pools[window.calculator_data.TYPE_GROUPS_DRAGON_ISLANDS_ID][index];
                    existing_group_keys.push(pool.join(','));
                }
                
                // Get the different group combinations and check if they have 4 or more distinct types combined                                
                var group_combos = combinations(existing_group_keys, 2);
                
                for (var index in group_combos){
                    var left_type_key = group_combos[index][0];
                    var left_group_types = left_type_key.split(",");
                    var right_type_key = group_combos[index][1];
                    var right_group_types = right_type_key.split(",");
                    var combined_types = getMergedList(left_group_types, right_group_types);
                    
                    if (combined_types.length >= 4){
                        var left_type_group = parent_type_groups[left_type_key];
                        var right_type_group = parent_type_groups[right_type_key];
                        some_type_parents.push(new DragonPair(new DragonGroup(left_type_group, left_group_types), 
                                    new DragonGroup(right_type_group, right_group_types)));                                    
                    }
                }                            
            }
        }
        else{
            var candidates = getParentCandidateTypes(breed_type_req, environment_key);
            var all_type_candidates = candidates[0];
            var component_type_candidates = candidates[1];
            var some_type_candidates = candidates[2];
            var partial_type_pairs = combinations(some_type_candidates, 2);
            
            // Add groups that can be bred with any other dragon to generate the target offspring
            for (var pool in all_type_candidates){
                var desired_pool = all_type_candidates[pool];
                var key = desired_pool.join(',');
                var group = parent_type_groups[key];
                all_type_parents.push(new DragonGroup(group, desired_pool));         
            }
            
            // Add groups that can be bred with all dragons that provide at least one different type to generate the target offspring
            for (var pool in component_type_candidates){
                var desired_pool = component_type_candidates[pool];
                var key = desired_pool.join(',');
                var group = parent_type_groups[key];
                component_type_parents.push(new DragonGroup(group, desired_pool));
            }
            
            // Add other combinations of parents that can generate the target offspring
            for (var i = 0; i < partial_type_pairs.length; i++){
                // Get the type pools for each group in the pair
                var first_pool = partial_type_pairs[i][0];
                var second_pool = partial_type_pairs[i][1];

                // Get the lookup keys for each type pool
                var left_key = first_pool.join(',');
                var right_key = second_pool.join(',');
                
                // Get the groups corresponding to the lookup keys
                var left_group = new DragonGroup(parent_type_groups[left_key], first_pool);
                var right_group = new DragonGroup(parent_type_groups[right_key], second_pool);
                
                var combined_pool = (new BreedingPool(first_pool, second_pool)).processed_pool;
                                        
                if (listContainsElements(combined_pool, breed_type_req)){
                    some_type_parents.push(new DragonPair(left_group, right_group));
                }
                else{
                    // Minors do not split unless the combined pool has more than one type in it.
                    if (combined_pool.length > 1 && completedByMinors(combined_pool, breed_type_req)){
                        some_type_parents.push(new DragonPair(left_group, right_group));
                    }
                }
            }                        
        }
    }    

    var possible_parents = [all_type_parents, component_type_parents, dbcMergeSort(getUniqueObjectList(some_type_parents), "parent_pairs"), dbcMergeSort(getUniqueObjectList(specific_parents), "parent_pairs")];    
    return possible_parents;
}

function getEnvironmentKey(dragon_id){
    var breed_types = window.calculator_data.breeds[dragon_id].types;    
        
    for (var index in window.calculator_data.arctic_types){           
        if (listContainsElements(breed_types, [window.calculator_data.arctic_types[index]])){
            // Arctic Isles dragons have access to all breeds
            return window.calculator_data.TYPE_GROUPS_ALL_ID;                    
        }
    }
    
    return window.calculator_data.TYPE_GROUPS_DRAGON_ISLANDS_ID;
}

function getGroupsWithType(type_to_find, environment_key){
	var out = [];
	var type_pools = parent_type_pools[environment_key];
	
	for (var index in type_pools){
		var pool = type_pools[index];
		
		if (listContainsElements(pool, [type_to_find])){		
			out.push(new DragonGroup(parent_type_groups[pool], pool));
		}
	}
	
	return out;
}

function getPureDiamondPoolOffspring(){
    var out = [];
    
    for (var i = 0; i < window.calculator_data.prismatic_types.length; i++){
        out.push([window.calculator_data.prismatic_types[i]]);        
    }
    
    return out;
}

function isSingleTypeOffspringException(breed_types, parent1_types, parent2_types){   
    // This function is used only to check single type breeds with special parent requirements
    // Arctic exceptions are made in buildOffspringList()
    
    if (breed_types.length === 1){
        // Offspring is a pure, which has some special inclusive breeding rules
        
        var type_pool = getSortedTypes(getMergedList(parent1_types, parent2_types));
        
        if (type_pool.length === 1){
            var single_type = type_pool[0];
            
            if (single_type === "diamond" && listContainsElements(window.calculator_data.prismatic_types, [breed_types[0]])){
                if (!listContainsElements(window.calculator_data.arctic_types, breed_types)){              
                    // Include as offspring of pure diamond pool
                    return true;
                }
            }
            else if (breed_types[0] === single_type){
                // Include as offspring of pure same type pool        
                return true;
            }
            else{
                var type_classification = getTypeClassification(single_type);
                
                if (type_classification === "minor"){
                    var minor_type = new MinorType(single_type);                    
                    var type_components = minor_type.components;
                    
                    for (var index in type_components){
                        if (type_components[index].type === breed_types[0]){
                            // Include as pure component result of single minor pool
                            return true;
                        }
                    }
                }
            }
        }
        else if (type_pool.length === 2 && type_pool[1] === "diamond"){
            if (breed_types[0] === type_pool[0]){
                // Include as offspring of pure + diamond pool                                
                return true;
            }
            else{
                var type_classification = getTypeClassification(type_pool[0]);
                
                if (type_classification === "minor"){
                    var minor_type = new MinorType(type_pool[0]);                    
                    var type_components = minor_type.components;
                    
                    for (var index in type_components){
                        if (type_components[index].type === breed_types[0]){
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

function getSingleTypeExceptionParents(id){
    // Single type dragons have special interactions with Diamond or single type pools of their own type
    
    var pairs = [];
    var type = window.calculator_data.breeds[id].types.length === 1 ? window.calculator_data.breeds[id].types[0] : null;
    
    if (type){
        if (getTypeClassification(type) !== "recessive"){
            var offspring_is_arctic = listContainsElements(window.calculator_data.arctic_types, [type]);
            var pure_diamond_group = new DragonGroup(parent_type_groups["diamond"], ["diamond"]);
            var pure_type_group = new DragonGroup(parent_type_groups[type], [type]);
            var pure_and_diamond_group = parent_type_groups[type + ",diamond"];
            
            // Pair the pure same types together                    
            pairs.push(new DragonPair(pure_type_group, pure_type_group));            
                        
            // Pair all the pure same types and pure diamonds together
            pairs.push(new DragonPair(pure_type_group, pure_diamond_group));
            
            if (offspring_is_arctic) {
                // If diamond is present during an arctic breeding, it can result in pure offspring of all present arctic types                
                
                // Find all of the diamond hybrids except the ones with the matching arctic type                                              
                // The matching diamond hybrid will be added in buildParentList() as an all type parent
                var other_diamond_hybrids = [];
                
                for (var type_index in window.calculator_data.all_types) {
                    var type_to_check = window.calculator_data.all_types[type_index];
                    
                    if (type_to_check !== type) {
                        var group_to_check = parent_type_groups[type_to_check + ",diamond"];
                        
                        if (group_to_check) {
                            var group_to_add = new DragonGroup(group_to_check, [type_to_check, "diamond"]);
                            pairs.push(new DragonPair(pure_type_group, group_to_add));
                        }
                    }
                }                
            }
            else {
                // Pair the pure diamonds together
                pairs.push(new DragonPair(pure_diamond_group, pure_diamond_group));
                
                if (pure_and_diamond_group){
                    var pure_and_diamond_dragon_group = new DragonGroup(pure_and_diamond_group, [type, "diamond"]);
                    
                    // Pair the pures and diamond hybrids together
                    pairs.push(new DragonPair(pure_type_group, pure_and_diamond_dragon_group));
                    pairs.push(new DragonPair(pure_diamond_group, pure_and_diamond_dragon_group));
                    pairs.push(new DragonPair(pure_and_diamond_dragon_group, pure_and_diamond_dragon_group));
                }
            }            

            // Check for special condition where pure minor type or minor type + diamond pools produce component pures
            for (var i = 0; i < minor_types.length; i++){
                if (type !== minor_types[i]){
                    var components = getTypeComponents(minor_types[i]);
                    
                    for (var j = 0; j < components.length; j++){
                        if (type === components[j]){
                            // Collect the possible parents for plain minor type + diamond pools
                            var minor_type_group = new DragonGroup(parent_type_groups[minor_types[i]], [minor_types[i]]);
                            var minor_and_diamond_group = parent_type_groups[minor_types[i] + ",diamond"];
                            
                            pairs.push(new DragonPair(minor_type_group, minor_type_group));
                            pairs.push(new DragonPair(minor_type_group, pure_diamond_group));
                            
                            if (minor_and_diamond_group)
                            {
                                var minor_and_diamond_dragon_group = new DragonGroup(minor_and_diamond_group, [minor_types[i], "diamond"]);                        
                                
                                // Pair the parents together                            
                                pairs.push(new DragonPair(minor_type_group, minor_and_diamond_dragon_group));
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

function getCorrespondingArcticDiamondHybridGroup(type) {
    if (listContainsElements(window.calculator_data.arctic_types, [type])) {
        var pure_and_diamond_group = parent_type_groups[type + ",diamond"];
        
        if (pure_and_diamond_group) {
            return new DragonGroup(pure_and_diamond_group, [type, "diamond"]);
        }
    }
    
    return null;
}

function getParentsWithRequirements(requirements, environment_key){
    var parent_pairs = [];
    
    for (var index in requirements){
        var pair_requirements = new PairRequirement(requirements[index]);
        
        var first_parent_requirement = pair_requirements.first_parent_requirement;
        var first_requirement_type = first_parent_requirement.type;        
        
        var second_parent_requirement = pair_requirements.second_parent_requirement;
        var second_requirement_type = second_parent_requirement.type;        
        
        var first_parent_list = [];
        var second_parent_list = [];
        
        var requirements_match = first_parent_requirement.equals(second_parent_requirement);
        
        if (first_requirement_type === "id"){
            var required_id = first_parent_requirement.value;
            first_parent_list.push(new Dragon(required_id));
        }
        else if (first_requirement_type === "types"){
            var required_types = first_parent_requirement.value;
            
            for (var index in parent_type_pools[environment_key]){
                var pool = parent_type_pools[environment_key][index];
                
                if (listContainsElements(pool, required_types)){                
                    var key = pool.join(',');
                    var group = parent_type_groups[key];
                    first_parent_list.push(new DragonGroup(group, pool));
                }
            }
        }
        
        if (!requirements_match){
            if (second_requirement_type === "id"){
                var required_id = second_parent_requirement.value;
                second_parent_list.push(new Dragon(required_id));
            }
            else if (second_requirement_type === "types"){
                var required_types = second_parent_requirement.value;
                
                for (var index in parent_type_pools[environment_key]){
                    var pool = parent_type_pools[environment_key][index];
                    
                    if (listContainsElements(pool, required_types)){
                        var key = pool.join(',');
                        var group = parent_type_groups[key];                    
                        second_parent_list.push(new DragonGroup(group, pool));
                    }
                }
            }
        }
        
        if (requirements_match){
            for (var i = 0; i < first_parent_list.length; i++){
                for (var j = i; j < first_parent_list.length; j++){
                    var pair_to_add = new DragonPair(first_parent_list[i], first_parent_list[j]);
                    
                    if (specificPairIsValid(pair_to_add, pair_requirements)){
                        parent_pairs.push(pair_to_add);
                    }
                }
            }
        }
        else{
            // Get combinations of first parent + second parent
            for (var i = 0; i < first_parent_list.length; i++){
                for (var j = 0; j < second_parent_list.length; j++){       
                    var pair_to_add = new DragonPair(first_parent_list[i], second_parent_list[j]);
                    
                    if (specificPairIsValid(pair_to_add, pair_requirements)){
                        parent_pairs.push(pair_to_add);
                    }
                }
            }
        }
    }
    
    return parent_pairs;
}

function getEligibleParents(type_group){
    // Only add parents that can breed to the list
    
    var eligible_parents = [];
    var group_members = [];
    var group_types = [];
    
    if (type_group instanceof Dragon){
        group_members.push(type_group.id);
        group_types = type_group.types.getValue();
    }
    else if (type_group instanceof DragonGroup){
        group_members = type_group.getDragonGroupMembers();
        group_types = type_group.getDragonGroupTypes();
    }
    
    for (var i = 0; i < group_members.length; i++){        
        var breed_id = group_members[i];
        
        if (getParentEligibilityParameters(breed_id)[0]){
            eligible_parents.push(breed_id);
        }
    }
    
    if (eligible_parents.length > 0){
        return new DragonGroup(eligible_parents, group_types);
    }
    else{
        return null;
    }
}

function getParentEligibilityParameters(id){
    // State whether a parent can breed, the reason (if not), and the parent's id
    
    var params = [true, "", id];
    var type = window.calculator_data.breeds[id].parenteligibility;
    
    if (type !== undefined){
        if (window.calculator_data.parent_eligibility_explanations[type] !== undefined){
            params[0] = false;
            params[1] = type;
        }
    }
    
    return params;
}

function getParentEligibilityExplanation(dragon_name, reason){
    var reason_text = "";
    var explanation = window.calculator_data.parent_eligibility_explanations[reason];
    
    if (explanation !== undefined){
        reason_text = "*** The <b>" + dragon_name + " Dragon</b> has " +
        "special rules " + explanation + " ***";
    }
    
    return reason_text;
}

function getOffspringEligibilityParameters(id){
    var params = [true, "", id];
    var type = window.calculator_data.breeds[id].offspringeligibility;
    
    if (type !== undefined){
        if (window.calculator_data.offspring_eligibility_explanations[type]){
            params[0] = false;
            params[1] = type;
        }
    }
    
    return params;
}

function getOffspringEligibilityExplanation(dragon_name, reason){
    var reason_text = "";
    var explanation = window.calculator_data.offspring_eligibility_explanations[reason];
    
    if (explanation !== undefined){
        reason_text = "*** The <b>" + dragon_name + " Dragon</b> " + explanation + " ***";
    }
    
    return reason_text;
}

function filterTypes(type_pool, classification_to_filter){
    // Add only types without the specified filter type to the list
    var filtered_pool = [];
    
    for (var i = 0; i < type_pool.length; i++){                
        if (getTypeClassification(type_pool[i]) !== classification_to_filter){        
            filtered_pool.push(type_pool[i]);
        }
    }
    
    return filtered_pool;
}

function getPresentTypeClassification(pool, classification){
    var present_type_classifications = [];
    
    for (var i = 0; i < pool.length; i++){
        if (getTypeClassification(pool[i]) === classification){
            present_type_classifications.push(pool[i]);
        }
    }
    
    return present_type_classifications;
}

function filterPresentMinorTypes(pool, type_to_filter){
    var filtered_minor_types = pool.slice(0);
    
    for (var i = 0; i < filtered_minor_types.length; i++){
        if (filtered_minor_types[i] === type_to_filter){
            filtered_minor_types.splice(i, 1);
        }
    }
    
    return filtered_minor_types;
}

function getSplitTypePool(pool, desired_type){
    // Types only split if the desired type is a minor type    
    var type_classification = getTypeClassification(desired_type);
    
    if (type_classification === "minor"){
        var substituted_pool = pool.slice(0); // Make a copy for modification purposes
        var type_components = getTypeComponents(desired_type);

        for (var i = 0; i < substituted_pool.length; i++){
            if (pool[i] === desired_type){
                substituted_pool.splice(i, 1);
                
                for (var j = 0; j < type_components.length; j++){
                    if (!listContainsElements(substituted_pool, [type_components[j]])){
                        substituted_pool.push(type_components[j]);
                    }
                }
                
                break;
            }
        }
        
        return getSortedTypes(substituted_pool);
    }
    
    return pool;
}

function getParentCandidateTypes(desired_types, environment_key){
    var out = [];
    var all_type_candidates = [];
    var component_type_candidates = [];
    var partial_type_candidates = [];
    
    for (var i = 0; i < parent_type_pools[environment_key].length; i++){
        if (listContainsElements(parent_type_pools[environment_key][i], desired_types)){
            all_type_candidates.push(parent_type_pools[environment_key][i]);
        }
        else{
            var contains_some_types = false;
            
            for (var j = 0; j < desired_types.length; j++){
                if (listContainsElements(parent_type_pools[environment_key][i], [desired_types[j]]) ||
                    completedByMinors(parent_type_pools[environment_key][i], [desired_types[j]])){
                    contains_some_types = true;
                    break;
                }
            }
            
            if (completedByMinors(parent_type_pools[environment_key][i], desired_types)){
                if (parent_type_pools[environment_key][i].length > 1){
                    // Minors do not split unless the combined pool has more than one type in it.
                    all_type_candidates.push(parent_type_pools[environment_key][i]);
                }
                else{
                    // Single type minors can contribute their components if paired with other types
                    component_type_candidates.push(parent_type_pools[environment_key][i]);
                }
            }                
            else if (contains_some_types){            
                partial_type_candidates.push(parent_type_pools[environment_key][i]);
            }
        }
    } 
            
    out = [all_type_candidates, component_type_candidates, partial_type_candidates];
    return out;
}

/* 
 * Validation functions
 */
 
function completedByMinors(combined_pool, required_types){
    // Does the pool fulfill the requirements with the presence of its minor types?
    
    var pools = getCascadingTypePools(combined_pool, []);
    
    for (var index in pools){
        if (listContainsElements(pools[index], required_types)){
            return true;
        }
    }
    
    return false;
}

function parentDataIsValid(parent_data){
    if (!parent_data || parent_data.length === 0){
        return false;
    }
    
    for (var i = 0; i < parent_data.length; i++){
        var first_parent_data = parent_data[i][0];
        var second_parent_data = parent_data[i][1];
        
        if (first_parent_data && second_parent_data &&
            first_parent_data.length === 2 &&
            second_parent_data.length === 2){
            var first_type = first_parent_data[0];
            var first_req = first_parent_data[1];
            
            if (first_type === "id"){
                if (!window.calculator_data.breeds[first_req]){
                    return false;
                }
            }
            else if (first_type === "types"){
                if (!(listContainsElements(window.calculator_data.all_types, first_req))){
                    return false;
                }
            }
            else{
                return false;
            }
            
            var second_type = second_parent_data[0];
            var second_req = second_parent_data[1];
            
            if (second_type === "id"){
                if (!window.calculator_data.breeds[second_req]){
                    return false;
                }
            }
            else if (second_type === "types"){
                if (!(listContainsElements(window.calculator_data.all_types, second_req))){
                    return false;
                }
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }    
    
    return true;
}

function pairContainsParents(pair, parents){
    if (pair instanceof DragonPair){
        var dragon_pair = pair.getPair();
        var left_group = [];
        var right_group = [];
        
        if (dragon_pair[0] instanceof Dragon){
            left_group = [dragon_pair[0].id];
        }
        else if (dragon_pair[0] instanceof DragonGroup){
            left_group = dragon_pair[0].getDragonGroupMembers();
        }
        
        if (dragon_pair[1] instanceof Dragon){
            right_group = [dragon_pair[1].id];
        }
        else if (dragon_pair[1] instanceof DragonGroup){
            right_group = dragon_pair[1].getDragonGroupMembers();
        }
        
        if (left_group.length > 0 && right_group.length > 0){
            if ((listContainsElements(left_group, [parents[0]]) && listContainsElements(right_group, [parents[1]])) ||
                (listContainsElements(left_group, [parents[1]]) && listContainsElements(right_group, [parents[0]]))){
                return true;
            }
        }
    }
    
    return false;
}

function specificPairIsValid(pair, requirements){
    var first_parent = pair.first_parent;
    var second_parent = pair.second_parent;
    
    var first_parent_types = [];
    var second_parent_types = [];
    
    if (first_parent instanceof Dragon){
        first_parent_types = first_parent.types.getValue();
    }
    else if (first_parent instanceof DragonGroup){
        first_parent_types = first_parent.types;
    }
    
    if (second_parent instanceof Dragon){
        second_parent_types = second_parent.types.getValue();
    }
    else if (second_parent instanceof DragonGroup){
        second_parent_types = second_parent.types;
    }        
        
    if (first_parent_types.length === second_parent_types.length && first_parent_types.length === 1 && 
        first_parent_types[0] === second_parent_types[0] && getTypeClassification(first_parent_types[0]) === "minor"){
        var first_parent_requirement = requirements.first_parent_requirement;
        var second_parent_requirement = requirements.second_parent_requirement;
        
        if (first_parent_requirement.type === "types" && 
            first_parent_requirement.value[0] !== first_parent_types[0]){        
            // Single type minor pools should not split to provide requirements
            return false;
        }
        
        if (second_parent_requirement.type === "types" &&
            second_parent_requirement.value[0] !== second_parent_types[0]){
            // Single type minor pools should not split to provide requirements
            return false;
        }
    }
    
    return true;
}

function breedTypePresent(id_list, type){
    if (id_list && id_list.length > 0){
        for (var index in id_list){
            var breed_types = window.calculator_data.breeds[id_list[index]].types;
            
            if (listContainsElements(breed_types, [type])){
                return true;
            }
        }
    }
    else{
        displayHTML("Warning: Invalid list of ids provided", "content_messages");
    }
    
    return false;
}

function allBreedsPossessType(id_list, type){
    if (id_list && id_list.length > 0){                
        for (var index in id_list){            
            var breed_types = window.calculator_data.breeds[id_list[index]].types;
            
            if (!listContainsElements(breed_types, [type])){
                return false;
            }
        }
    }
    else{
        displayHTML("Warning: Invalid list of ids provided", "content_messages");
    }
    
    return true;
}

function breedInhabitsEnvironment(id, environment){
    if (listContainsElements(environment_breed_ids[environment], [id])){
        return true;
    }
    
    return false;
}

function listContainsElements(list, required_elements){
    if (required_elements && required_elements.length > 0){
        for (var i = 0; i < required_elements.length; i++){
            var found = false;
            
            for (var j = 0; j < list.length; j++){
                if (list[j] === required_elements[i]){
                    found = true;                
                    break;
                }
                else if (list[j] instanceof Object && required_elements[i] instanceof Object &&
                         typeof list[j] === typeof required_elements[i] &&
                         typeof list[j].equals === 'function' && typeof required_elements[i].equals === 'function'){
                    if (list[j].equals(required_elements[i])){                
                        found = true;                        
                        break;
                    }
                }
            }
            
            if (!found){            
                return false;
            }
        }
        
        return true;
    }
    
    return false;
}

function listsMatch(list1, list2, sort_type){
    var length1 = list1.length;
    var length2 = list2.length;
    
    if (length1 === length2){
        var sorted_list1 = dbcMergeSort(list1.slice(0), sort_type);
        var sorted_list2 = dbcMergeSort(list2.slice(0), sort_type);
        
        for (var i = 0; i < length1; i++){
            if (sorted_list1[i] instanceof Object && 
                  sorted_list2[i] instanceof Object &&
                  typeof sorted_list1[i] === typeof sorted_list2[i] &&
                  typeof sorted_list1[i].equals === 'function' &&
                  typeof sorted_list2[i].equals === 'function'){            
                if (!(sorted_list1[i].equals(sorted_list2[i]))){
                    return false;
                }
            }            
            else if (sorted_list1[i] !== sorted_list2[i]){
                return false;
            }
        }
    }
    else{
        return false;
    }
    
    return true;
}

function listCanBeCompared (list){
    /* TODO: fix to be within limitations of wikia
    Dragon, DragonGroup, DragonPair, TypePool, BreedingPool, MinorType
    */
    if (list.length > 0){    
        var type = typeof list[0];
        
        for (var index in list){
            if (typeof list[index] !== type ||
                typeof list[index].equals !== 'function'){
                return false;
            }
        }
    }
    else{
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
    
    function rec(chosen, numconsidered) {
        if (chosen.length >= n) {
            out.push(chosen.slice(0));
        } 
        else if (n - chosen.length <= arr.length - numconsidered) {
            chosen.push(arr[numconsidered]);            
            rec(chosen, numconsidered+1);
            chosen.pop();
            rec(chosen, numconsidered+1);        
        }
    }
    
    rec([], 0);
  
    return out;
}

function getPairRValues(num_vals, r_limit){    
    var r_vals = new Array();

    // Finds each way to form num_vals by adding up two numbers where r_limit is the max value for a single number

    // Base case
    if (num_vals === 1){
        return [[1,1]];
    }
        
    for (var i = 1; i <= num_vals / 2; i++){
        if (num_vals - i <= r_limit){
            r_vals.push([i,(num_vals - i)]);            
        }
    }
        
    return r_vals;
}

function getCombinedPairs(left_list, right_list, avoid_repeats){
    var combined_list = [];
    
    if (avoid_repeats){
        for (var i = 0; i < left_list.length; i++){
            for (var j = i; j < right_list.length; j++){
                combined_list.push([left_list[i], right_list[j]]);
            }
        }        
    }
    else{
        for (var i = 0; i < left_list.length; i++){
            for (var j = 0; j < right_list.length; j++){
                combined_list.push([left_list[i], right_list[j]]);
            }
        }
    }
   
    return combined_list;
}

/*
 * List manipulation functions
 */
 
 function getUniquePrimitiveList(list){
    var unique_list = [];
    
    for (var i = 0; i < list.length; i++){        
        var repeated = false;
        for (var j = i + 1; j < list.length; j++){
            if (list[i] === list[j]){
                repeated = true;
                break;
            }
        }
        
        if (!repeated){
            unique_list.push(list[i]);
        }
    }
    
    return unique_list;
}

function getUniqueObjectList(list){   
    // Sort the list according to simple primitive comparisons, then traverse it only once    
    if (listCanBeCompared(list)){
        dbcMergeSort(list, "object_compare");
        var unique_list = [list[0]];
        
        for (var i = 1; i < list.length; i++){                    
            if (!(unique_list[unique_list.length - 1].equals(list[i]))){
                unique_list.push(list[i]);                
            }
        }

        return unique_list;
    }
    else{
        //displayHTML("Warning: List is empty or contains elements that cannot be compared. Returning original list.", "content_messages");//DEBUG
        return list;
    }
}

function getMergedList(list1, list2){    
    var merged_list = [];
    
    if (list1.length === 0){
        return list2;
    }
    else if (list2.length === 0)    {
        return list1;
    }
    
    for (var i = 0; i < list1.length; i++){
        if (!(listContainsElements(merged_list, [list1[i]]))){        
            merged_list.push(list1[i]);            
        }
    }
    
    for (var i = 0; i < list2.length; i++){
        if (!(listContainsElements(merged_list, [list2[i]]))){        
            merged_list.push(list2[i]);
        }
    }
    
    return merged_list;
}

function sortListByRarity(list_to_sort){
    var sorted_list = new Array();
    
    if (list_to_sort){
        var separated_list = new Array();
        separated_list.push(new Array()); // Common index = 0
        separated_list.push(new Array()); // Rare index = 1
        separated_list.push(new Array()); // Super Rare index = 2
        separated_list.push(new Array()); // Ultra Rare index = 3
        
        for (var i = 0; i < list_to_sort.length; i++){
            var rarity = window.calculator_data.breeds[list_to_sort[i]].rarity;                
            separated_list[rarity - 1].push(list_to_sort[i]);
        }
        
        for (var i = 0; i < separated_list.length; i++){        
            for (var j = 0; j < separated_list[i].length; j++){
                sorted_list.push(separated_list[i][j]);
            }
        }      
    }    
    
    return sorted_list;
}

function getSortedTypes(types){
    var sorted_types = new Array();
    
    for (var i = 0; i < window.calculator_data.all_types.length; i++){
        for (var j = 0; j < types.length; j++){                        
            if (types[j] === window.calculator_data.all_types[i]){                
                sorted_types.push(types[j]);
                break;                
            }
        }
    }        
    
    return sorted_types;
}

function dbcMergeSort (values, type){
    if (values && values.length > 1){
        // List requires sorting
        var split_num = parseInt(values.length / 2);
        var remainder = values.length % 2;
        var left = new Array();
        var right = new Array();
        
        for (var i = 0; i < split_num; i++){
            left.push(values[i]);
            right.push(values[i + split_num]);
        }
        
        if (remainder > 0){
            // Odd number of values
            right.push(values[values.length - 1]);
        }
        
        left = dbcMergeSort(left, type);
        right = dbcMergeSort(right, type);
        
        values = dbcMerge(values, left, right, type);
    }
        
    return values;    
}

function dbcMerge(values, left, right, type){
    var n = 0; // index of values
    var l = 0; // index of left
    var r = 0; // index of right
    
    while (l < left.length && r < right.length){
        if (dbcCompareValues(left[l], right[r], type) <= 0){ 
            // left < right
            values[n] = left[l];
            l++;
        }
        else{ 
            // right < left
            values[n] = right[r];
            r++;            
        }
        
        n++;
    }
    
    // One of the subarrays has been exhausted.  Copy over the remaining elements.
    
    while (l < left.length){
        values[n] = left[l];    
        l++;        
        n++;
    }
    
    while (r < right.length){
        values[n] = right[r];    
        r++;
        n++;
    }
    
    return values;
}

/*
 * Comparison functions
 */

function dbcCompareValues (first_val, second_val, type){
    if (type === "primitive"){
        return comparePrimitives(first_val, second_val);
    }
    else if (type == "object_compare"){
        return compareObjects(first_val, second_val);
    }
    else if (type === "incubation"){
        return compareIncubationTimes(first_val, second_val);
    }
    else if (type === "level_requirements"){
        return compareLevelRequirements(first_val, second_val);
    }
    else if (type === "types"){
        return compareTypes(first_val, second_val);
    }
    else if (type === "type_pools"){
        return compareTypePools(first_val, second_val);
    }
    else if (type === "group_type_pools"){
        return compareGroupTypePools(first_val, second_val);
    }
    else if (type === "offspring_types"){
        return compareOffspringTypes(first_val, second_val);
    }
    else if (type === "parent_pairs"){
        return compareParentPairs(first_val, second_val);
    }
    else if (type === "pair_pool_size"){
        return comparePairPoolSize(first_val, second_val);
    }
    
    return 0;
}

function comparePrimitives(a,b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    
    return 0;
}

function compareObjects(first_val, second_val){
  // A necessary workaround because MediaWiki does something that interferes with calling the prototype functions correctly.
  
  if (first_val instanceof Dragon && second_val instanceof Dragon){
    return comparePrimitives(first_val.id, second_val.id);
  }
  else if (first_val instanceof DragonGroup && second_val instanceof DragonGroup){
     return comparePrimitives(first_val.compare_value, second_val.compare_value);
  }
  else if (first_val instanceof DragonPair && second_val instanceof DragonPair){
     return comparePrimitives(first_val.compare_value, second_val.compare_value);
  }
  else if (first_val instanceof TypePool && second_val instanceof TypePool){
     var first_type_pool_key = first_val.types.join(',');
     var second_type_pool_key = second_val.types.join(',');
    return comparePrimitives(first_type_pool_key, second_type_pool_key);
  }
  else if (first_val instanceof BreedingPool && second_val instanceof BreedingPool){
    var first_breed_pool_key = first_val.original_pool.join(',');
    var second_breed_pool_key = second_val.original_pool.join(',');
    return comparePrimitives(first_breed_pool_key, second_breed_pool_key);
  }
  else if (first_val instanceof MinorType && second_val instanceof MinorType){
    return comparePrimitives(first_val.type, second_val.type);
  }
    
  return 0;
}

function compareIncubationTimes(first_inc, second_inc){
    if (first_inc && second_inc && first_inc instanceof IncubationTime &&
        second_inc instanceof IncubationTime){
        return comparePrimitives(first_inc.value, second_inc.value);
    }
    
    return 0;
}

function compareLevelRequirements(first_type, second_type){
    var first_type_req = window.calculator_data.level_requirements[first_type];
    var second_type_req = window.calculator_data.level_requirements[second_type];
    
    if (first_type_req !== undefined && second_type_req !== undefined){
        return comparePrimitives(first_type_req, second_type_req);
    }
    
    if (first_type_req === undefined){
        displayHTML("Warning: No level requirement found for the " + first_type + " type.", "content_messages");
    }
    
    if (second_type_req === undefined){
        displayHTML("Warning: No level requirement found for the " + second_type + " type.", "content_messages");
    }
    
    return 0;
}

function compareTypes(first_type, second_type){        
    var first_type_val = getTypeValue(first_type);
    var second_type_val = getTypeValue(second_type);

    if (first_type_val < second_type_val){
        return -1;
    }
    else if (first_type_val > second_type_val){
        return 1;
    }
    
    return 0;
}

function compareTypePools(first_pool, second_pool){        
    var first_pool_size = first_pool.length;
    var second_pool_size = second_pool.length;
    
    // Smallest type pools first
    if (first_pool_size < second_pool_size){
        return -1;
    }
    else if (first_pool_size > second_pool_size)    {
        return 1;
    }
       
    // Type pool sizes are equal
    for (var i = 0; i < first_pool_size; i++){
        var comparison = compareTypes(first_pool[i], second_pool[i]);        
        
        if (comparison < 0){
            return -1;
        }
        else if (comparison > 0){        
            return 1;
        }
    }
    
    return 0;
}

function compareGroupTypePools(first_parent, second_parent){ 
    if (first_parent && second_parent){
        var first_pool = [];
        var second_pool = [];
        
        if (first_parent instanceof Dragon){
            first_pool = first_parent.types.getValue();
        }
        else if (first_parent instanceof DragonGroup){
            first_pool = first_parent.getDragonGroupTypes();
        }
        
        if (second_parent instanceof Dragon){
            second_pool = second_parent.types.getValue();
        }
        else if (second_parent instanceof DragonGroup){
            second_pool = second_parent.getDragonGroupTypes();
        }                
        
        return compareTypePools(first_pool, second_pool);
    }
    
    return 0;
}


function compareOffspringTypes(first_val, second_val){
    if (first_val && second_val){
        var first_pool = [];
        var second_pool = [];
        
        if (first_val instanceof Dragon){
            first_pool = getSortedTypes(first_val.types.getValue());
        }
        
        if (second_val instanceof Dragon){
            second_pool = getSortedTypes(second_val.types.getValue());
        }
        
        return compareTypePools(first_pool, second_pool);
    }
    
    return 0;
}

function compareParentPairs(first_val, second_val){
    if (first_val && second_val && first_val instanceof DragonPair && second_val instanceof DragonPair){
        var first_pair = first_val.getPair();
        var second_pair = second_val.getPair();
        
        var first_left_parent_pool = [];
        var first_right_parent_pool = [];
        
        var second_left_parent_pool = [];
        var second_right_parent_pool = [];
        
        if (first_pair[0] instanceof Dragon){
            first_left_parent_pool = first_pair[0].types.getValue();
        }
        else if (first_pair[0] instanceof DragonGroup){
            first_left_parent_pool = first_pair[0].getDragonGroupTypes();
        }
        
        if (first_pair[1] instanceof Dragon){
            first_right_parent_pool = first_pair[1].types.getValue();
        }
        else if (first_pair[1] instanceof DragonGroup){
            first_right_parent_pool = first_pair[1].getDragonGroupTypes();
        }
        
        if (second_pair[0] instanceof Dragon){
            second_left_parent_pool = second_pair[0].types.getValue();
        }
        else if (second_pair[0] instanceof DragonGroup){
            second_left_parent_pool = second_pair[0].getDragonGroupTypes();
        }
        
        if (second_pair[1] instanceof Dragon){
            second_right_parent_pool = second_pair[1].types.getValue();
        }
        else if (second_pair[1] instanceof DragonGroup){
            second_right_parent_pool = second_pair[1].getDragonGroupTypes();
        }
        
        // Size of type pool takes priority over types in the pool for comparison    
        var size_comparison = comparePairPoolSize([first_left_parent_pool, first_right_parent_pool], 
                              [second_left_parent_pool, second_right_parent_pool], "pair_pool_size");
        
        if (size_comparison !== 0){
            return size_comparison;
        }
        
        // Type pool size check has passed; now compare the values of the types in the pool    
        var left_comparison = compareTypePools(first_left_parent_pool, second_left_parent_pool);
        
        if (left_comparison < 0){
            return -1;
        }
        else if (left_comparison > 0){
            return 1;
        }
        
        var right_comparison = compareTypePools(first_right_parent_pool, second_right_parent_pool);
        
        if (right_comparison < 0){
            return -1;
        }
        else if (right_comparison > 0){
            return 1;
        }        
    }
    
    return 0;
}

function comparePairPoolSize(first_val, second_val){
    var first_left_size = first_val[0].length;
    var first_right_size = first_val[1].length;
    
    var second_left_size = second_val[0].length;
    var second_right_size = second_val[1].length;        
    
    if (first_left_size < second_left_size){        
        return -1;
    }
    else if (first_left_size > second_left_size){    
        return 1;
    }
    
    if (first_right_size < second_right_size){    
        return -1;
    }
    else if (first_right_size > second_right_size){    
        return 1;
    }
    
    return 0;
}

/*
 * Dragon type functions
 */

function getTypeValue(type) {
    for (var i = 0; i < window.calculator_data.all_types.length; i++){
        if (window.calculator_data.all_types[i] === type){
            return i + 1;
        }
    }
    
    return 0;
}

function getTypeClassification (type) {
    var classification = window.calculator_data.complex_types[type];
    
    if (classification){
        return classification;
    }
        
    return "basic";
}

function getTypeComponents (type) {
    var components = window.calculator_data.complex_type_components[type];
    
    if (components){
        return components;
    }
   
   return [type];
}

function getRequiredTypeAmount (type) {
    var amount = window.calculator_data.type_count_requirements[type];
    
    if (amount){
        return amount;
    }
   
   return 0;
}

function getCascadingComponents(components, parent, type){
    // Initial components list should be an empty array []
    
    if (getTypeClassification(type) !== "minor"){                     
        if (parent === type){
            components.push(new Type(type));
        }
        else{
            components.push(new ComponentType(parent, type));
        }
        
        return components;
    }
    else{
        var type_components = getTypeComponents(type);
        
        if (parent === type){
            components.push(new Type(type));
        }
        else{
            components.push(new ComponentType(parent, type));
        }
        
        for (var i = 0; i < type_components.length; i++){
            getCascadingComponents(components, type, type_components[i]);
        }
        
        return components;    
    }
}

function getCascadingTypePools(pool_to_cascade, pool_list){
    // The original call should send pool_list as an empty array []
    // This is called until there are no minor types left in the pool
    // This can generate repeat pools, which can be removed later
    
    pool_list.push(pool_to_cascade);
    
    var minor_combos = [];
    var minors_to_split = [];
    var present_minor_types = getPresentTypeClassification(pool_to_cascade, "minor");
    
    for (var i = 0; i < present_minor_types.length; i++){
        minor_combos.push(combinations(present_minor_types, i + 1));
    }
        
    for (var i = 0; i < minor_combos.length; i++){
        for (var j = 0; j < minor_combos[i].length; j++){
            minors_to_split.push(minor_combos[i][j]);
        }
    }
    
    for (var list_index in minors_to_split){
        var minor_list = minors_to_split[list_index];
        var virtual_pool = pool_to_cascade.slice(0); // Copy the original pool for modification                                    
                    
        for (var split_index in minor_list){
            virtual_pool = getSplitTypePool(virtual_pool, minor_list[split_index]);
        }
        
        getCascadingTypePools(virtual_pool, pool_list);
    }    
    
    return pool_list;
}

/*
 * Custom dragon data structures
 */
 
function PlayerLevel(value, text){
    this.value = value;
    this.text = text;
}
 
function Dragon(id){
    var dragon = window.calculator_data.breeds[id];
    
    if (dragon){    
        this.id = id;
        
        for (var key in dragon){
            this[key] = dragon[key];
        }
        
        this.types = new DragonType(this.types);
    }
    else{
        displayHTML("Warning: Invalid dragon id.", "content_messages");
    }
}

Dragon.prototype.equals = function(dragon_to_compare) {
    if (dragon_to_compare instanceof Dragon){
        if (this.id == dragon_to_compare.id){
            return true;
        }
    }
    
    return false;
}

function IncubationTime(value, type){
    if (window.calculator_data.time_measurements[type] !== undefined){
        this.text = value + " " + type;
        this.value = value * window.calculator_data.time_measurements[type];
        this.type = type;
    }
    else{
        displayHTML("Warning: Invalid incubation time type.", "content_messages");
    }
}

IncubationTime.prototype.equals = function(compare_val) {
    if (compare_val instanceof IncubationTime){
        if (this.value === compare_val.value &&
            this.text === compare_val.text){
            return true;
        }        
    }
    
    return false;
}

function DragonType(types){
    this.types = types.slice(0);
}

DragonType.prototype.getValue = function(){
    return this.types;
}

function Type(type){
    this.type = type;
}

function ComponentType(parent, type){
    this.parent = parent;
    this.type = type;   
}

function MinorType(type){
    if (getTypeClassification(type) === "minor"){
        this.type = type;
        this.components = getCascadingComponents([], this.type, this.type);
        
        for (var index in this.components){
            if (this.components[index] instanceof Type){
                this.components.splice(index, 1);
                break;
            }
        }     
    }
    else{
        displayHTML("Warning: Incorrect attempt to make " + type + " a minor type.", "content_messages");
    }
}

MinorType.prototype.equals = function(type_to_compare){
    if (type_to_compare instanceof MinorType){
        if (this.type === type_to_compare.type){
            return true;
        }
    }
    
    return false;
}

function TypePool(types){
    this.types = getSortedTypes(types);
}

TypePool.prototype.equals = function (pool_to_compare){
    if (pool_to_compare instanceof TypePool){
        if (listsMatch(this.types, pool_to_compare.types, "primitive")){
            return true;
        }
    }
    
    return false;
}

function BreedingPool(first_dragon_types, second_dragon_types){
    this.original_pool = getSortedTypes(getMergedList(first_dragon_types, second_dragon_types));
    
    // Filter out excluded types
    for (var i = 0; i < window.calculator_data.excluded_types.length; i++){
        this.original_pool = filterTypes(this.original_pool, window.calculator_data.excluded_types[i]);
    }
        
    this.original_length = this.original_pool.length;
    this.processed_pool = getProcessedTypeList(first_dragon_types, second_dragon_types);
    
    this.present_minor_types = [];
    var present_minor_list = getPresentTypeClassification(this.original_pool, "minor");
    
    for (var index in present_minor_list){
        this.present_minor_types.push(new MinorType(present_minor_list[index])); 
    }
}

BreedingPool.prototype.equals = function(pool_to_compare){
    if (pool_to_compare instanceof BreedingPool){
        if (listsMatch(this.original_pool, pool_to_compare.original_pool, "primitive")){
            return true;
        }
    }
    
    return false;
}
 
function DragonGroup(group, types){
    this.group = sortListByRarity(group); // An array of dragon ids
    this.types = getSortedTypes(types);
    this.compare_value = this.getCompareValue();
}

DragonGroup.prototype.getDragonGroupTypes = function() {
    return this.types;
}

DragonGroup.prototype.getDragonGroupMembers = function() {
    return this.group;
}

DragonGroup.prototype.getCompareValue = function() {
    return this.getDragonGroupMembers().join(','); 
}

DragonGroup.prototype.equals = function(group_to_compare) {
    if (group_to_compare instanceof DragonGroup){
        if (listsMatch(this.getDragonGroupMembers(), group_to_compare.getDragonGroupMembers(), "primitive")){
            return true;
        }
    }
    
    return false;
}

function DragonPair(first_parent, second_parent){
    if ((first_parent instanceof DragonGroup || first_parent instanceof Dragon) &&
        (second_parent instanceof DragonGroup || second_parent instanceof Dragon)){
        this.pair = dbcMergeSort([first_parent, second_parent], "group_type_pools");
        this.first_parent = this.pair[0];
        this.second_parent = this.pair[1];
        this.compare_value = this.getCompareValue();
    }
    else{
        this.pair = null;
        //displayHTML("Warning: Inappropriate parents submitted for DragonPair.", "content_messages"); // DEBUG
    }    
}

DragonPair.prototype.getPair = function(){
    return this.pair;
}

DragonPair.prototype.getCompareValue = function () {
    var first_parent_name = "";
    var second_parent_name = "";
    
    if (this.first_parent instanceof Dragon){
        first_parent_name = this.first_parent.id;
    }
    else if (this.first_parent instanceof DragonGroup){
        first_parent_name = this.first_parent.getDragonGroupMembers().join(',');
    }
    
    if (this.second_parent instanceof Dragon){
        second_parent_name = this.second_parent.id;
    }
    else if (this.second_parent instanceof DragonGroup){
        second_parent_name = this.second_parent.getDragonGroupMembers().join(',');
    }
    
    return [first_parent_name, second_parent_name].join(',');
}

DragonPair.prototype.equals = function(pair_to_compare) {
    if (pair_to_compare instanceof DragonPair){
        var compare_pair = pair_to_compare.getPair();
        
        if (this.pair && compare_pair){
            var this_first_parent = this.pair[0];
            var this_second_parent = this.pair[1];
            
            var compare_first_parent = compare_pair[0];
            var compare_second_parent = compare_pair[1];
            
            if ((this_first_parent.equals(compare_first_parent) &&
                 this_second_parent.equals(compare_second_parent)) ||
                (this_first_parent.equals(compare_second_parent) &&
                 this_second_parent.equals(compare_first_parent))){
                return true;
            }
        }
    }

    return false;
}

function PairRequirement(pair_requirement){
    this.first_parent_requirement = new ParentRequirement(pair_requirement[0]);
    this.second_parent_requirement = new ParentRequirement(pair_requirement[1]);
}

function ParentRequirement(parent_requirement){
    this.type = parent_requirement[0];
    this.value = parent_requirement[1];        
}

ParentRequirement.prototype.equals = function(requirement_to_compare){
    if (requirement_to_compare instanceof ParentRequirement){
        if (this.type === requirement_to_compare.type){
            if (this.type === "id" && this.value === requirement_to_compare.value){
                return true;
            }
            else if (this.type === "types" && listsMatch(this.value, requirement_to_compare.value, "primitive")){
                return true;
            }
        }     
    }
    
    return false;
}

/*
 * Table rendering code
 */
 
function renderOutcomeTable(handler, possible_offspring, parent1_name, parent2_name, incubation_text, level_text){    
    var num_results = 0;
    var present_notes = [];
    
    var rows = handler.joinRows(
        possible_offspring.map(function (offspring) {            
            if (getOffspringEligibilityParameters(offspring.id)[0]){
                num_results++;
                var name = offspring.name;
                var types = offspring.types.getValue();
                var rarity = window.calculator_data.rarities[offspring.rarity - 1];
                var incubation = offspring.incubation.split("_");
                var incubation_display = incubation[0];
                var incubation_text = incubation[1];
                var incubation_cost = incubation[2];                
                var offspring_notes = offspring.notes;
                var offspring_note_symbols = [];
                
                if (offspring_notes && offspring_notes.length > 0) {                
                    for (var index in offspring_notes) {
                        var note = window.calculator_data.special_notes[offspring_notes[index]];
                        
                        if (note) {
                            var offspring_note_symbol = note.symbol;
                            var offspring_note_text = offspring_note_symbol + " " + note.text;
                            
                            offspring_note_symbols.push(offspring_note_symbol);
                                                       
                            if (!listContainsElements(present_notes, [offspring_note_text])) {
                                present_notes.push(offspring_note_text);
                            }
                        }
                    }
                }
                
                var offspring_note_text = " " + offspring_note_symbols.join('');
                
                return handler.wrapRow(
                    handler.joinCells([handler.wrapCell(handler.renderDragonLink(name) + offspring_note_text, "center"),
                    handler.wrapCell(handler.renderDragonTypes(types), "center"),
                    handler.wrapCell("&nbsp &nbsp " + rarity + "&nbsp &nbsp ", "center"),
                    handler.wrapCell(incubation_display, "right"), handler.wrapCell("&nbsp" + incubation_text, "left"),
                    handler.wrapCell("&nbsp " + incubation_cost, "right"), handler.wrapCell(handler.urlToImage(window.calculator_data.gold_image_page_source, 20, 20), "left")
                    ]));
            }
        })
    );
    
    var note_text = present_notes.join('<br>');    
    
    var selection = "filters";
    var option_text = "options";
    
    if (incubation_text !== ""){
        if (level_text === ""){
            selection = "incubation time filter";
            option_text = "option";
        }
        else{
            selection = "incubation time and level filters";
        }
    }
    else if (level_text !== ""){
        selection = "level filter";
        option_text = "option";
    }
    
    if (rows.length > 0){
        var intro_level_text = (level_text === "") ? "" : 
        " at <b>" + level_text + "</b>";
        var intro_incubation_text = (incubation_text === "") ? "" : 
        " with an incubation time of <b>" + incubation_text + "</b>";
        
        var intro_text = "<p>Breeding <b>" + parent1_name + "</b> with <b>" + parent2_name + 
        "</b>" + intro_level_text + " can result in <b>" + num_results + "</b> possible " + 
        ((num_results == 1) ? "dragon" : "dragons") + intro_incubation_text + ":";
        
        var header_color = "#8EC3CD";                  
        var headers = handler.joinRows([handler.wrapHeader("Dragon Name", header_color, 1, 220), handler.wrapHeader("Types", header_color, 1, 70), 
        handler.wrapHeader("Rarity", header_color, 1, 110), handler.wrapHeader("Incubation Time", header_color, 2, 100), handler.wrapHeader("Cost to Complete", header_color, 2, 100)
        ]);
        
        var reminder_text = (selection === "filters") ? "" : "<br><b>Remember:</b> You can select the default first option to cancel the " + selection + ".";
               
        return handler.wrapTable(handler.joinRows([intro_text, headers, rows])) + reminder_text + "<br>" + note_text;
    }    
    
    return "<br>There are currently no possible offspring with your selected " + selection + ".<br>" +
           "You can select the default first " + option_text + " to view all the possible offspring " +
           "for this parent pair.";
}

function renderMinorComponentParentTable(handler, component_type_groups, target_name){
    var intro_text = "<p>The <b>" + target_name + " Dragon</b> can be bred by pairing one of these dragons with " +
                     "any dragon that provides at least one different type.</p>";

    var header_color = "#8EC3CD";
    var headers = handler.joinRows([handler.wrapHeader("Dragon", header_color, 1, 150), handler.wrapHeader("Type", header_color, 1, 60)]);
    
    var component_type_parents = [];
    
    for (var group in component_type_groups){
        var parents = getEligibleParents(component_type_groups[group]).getDragonGroupMembers();
        
        for (var parent in parents){
            component_type_parents.push(new Dragon(parents[parent]));
        }
    }
    
    dbcMergeSort(component_type_parents, "offspring_types"); // Make sure the all type table is sorted
    
    var valid_parents = 0;
    
    // Create the rows where a single parent possesses all the required types
    var rows = handler.joinRows(
        component_type_parents.map(function (dragon) {
            valid_parents++;
            
            var breed_name = dragon.name;    
            var types = dragon.types.getValue();
            
            return handler.wrapRow(
                handler.joinCells([handler.wrapCell(handler.renderDragonLink(breed_name), "center"),
                handler.wrapCell(handler.renderDragonTypes(types), "center")
            ]));
        })
    );
    
    var single_parent_text = "the following dragon";
    var multiple_parent_text = "one of the following <b>" + valid_parents + "</b> dragons";
    var intro_text = "<p>The <b>" + target_name + " Dragon</b> can be bred by pairing " +
    ((valid_parents === 1) ? single_parent_text : multiple_parent_text) +
    " with any dragon that provides at least one different type.</p>";    
    return handler.wrapTable(handler.joinRows([intro_text, headers, rows]));
}

function renderAllTypeParentTable(handler, all_type_groups, target_name){    
    var header_color = "#8EC3CD";
    var headers = handler.joinRows([handler.wrapHeader("Dragon", header_color, 1, 150), handler.wrapHeader("Types", header_color, 1, 100)]);        
    
    var all_type_parents = [];
    
    for (var group in all_type_groups){
        var parents = getEligibleParents(all_type_groups[group]).getDragonGroupMembers();
        
        for (var parent in parents){
            all_type_parents.push(new Dragon(parents[parent]));
        }
    }
    
    dbcMergeSort(all_type_parents, "offspring_types"); // Make sure the all type table is sorted
    
    var valid_parents = 0;
    
    // Create the rows where a single parent possesses all the required types
    var rows = handler.joinRows(
        all_type_parents.map(function (dragon) {
            valid_parents++;
            
            var breed_name = dragon.name;    
            var types = dragon.types.getValue();
            
            return handler.wrapRow(
                handler.joinCells([handler.wrapCell(handler.renderDragonLink(breed_name), "center"),
                handler.wrapCell(handler.renderDragonTypes(types), "center")
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

function renderSomeTypeParentTable(handler, some_type_groups, target_name){            
    var header_color = "#8EC3CD";
    var headers = handler.joinRows([handler.wrapHeader("Group A Dragons", header_color, 1, 300),
    handler.wrapHeader("Group B Dragons", header_color, 1, 300)]);

    var valid_pairs = 0;        
    
    var rows = handler.joinRows(
        some_type_groups.map(function (group_pair) {                        
            var pair = group_pair.getPair();
            var left_group = getEligibleParents(pair[0]);
            var right_group = getEligibleParents(pair[1]);
            
            if (left_group && right_group){
                valid_pairs++;
                
                var left_types = left_group.getDragonGroupTypes();
                var right_types = right_group.getDragonGroupTypes();
                
                return handler.wrapRow(handler.joinCells([handler.wrapCell(handler.renderGroupLinks(left_group), "center"),                
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

function renderSpecificParentTable(handler, specific_parents, target_name){            
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
            
            if (first_parent && second_parent){
                valid_pairs++;
                
                var first_parent_links = "";
                var second_parent_links = "";
                
                var first_parent_types = [];
                var second_parent_types = [];
                
                if (first_parent instanceof Dragon){
                    first_parent_links = handler.renderDragonLink(first_parent.name);
                    first_parent_types = first_parent.types.getValue();
                }
                else if (first_parent instanceof DragonGroup){
                    first_parent_links = handler.renderGroupLinks(first_parent);
                    first_parent_types = first_parent.getDragonGroupTypes();
                }
                
                if (second_parent instanceof Dragon){
                    second_parent_links = handler.renderDragonLink(second_parent.name);
                    second_parent_types = second_parent.types.getValue();
                }
                else if (second_parent instanceof DragonGroup){
                    second_parent_links = handler.renderGroupLinks(second_parent);
                    second_parent_types = second_parent.getDragonGroupTypes();
                }        
                                        
                return handler.wrapRow(handler.joinCells([handler.wrapCell(first_parent_links, "center"),
                       handler.wrapCell(handler.renderDragonTypes(first_parent_types), "center"),
                       handler.wrapCell(handler.renderDragonTypes(second_parent_types), "center"),
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

function HtmlOutput(outputElementId){
    this.outputElementId = outputElementId;
    this.rows = [];
}

HtmlOutput.prototype.toUrl = function (link, text, title) {
    return "<a title=\"" + title + "\" href=\"" +  link + "\">" + text + "</a>";
}

HtmlOutput.prototype.renderDragonLink = function (breed_name) {    
    return this.toUrl(window.calculator_data.dragon_page_source + breed_name + " Dragon", breed_name + " Dragon", breed_name + " Dragon");
}

HtmlOutput.prototype.renderGroupLinks = function(group) {
    var links = [];
    
    var dragon_group = group.getDragonGroupMembers();
    
    for (var dragon in dragon_group){
        var breed_name = window.calculator_data.breeds[dragon_group[dragon]].name;            
        links.push(this.toUrl(window.calculator_data.dragon_page_source + breed_name + " Dragon", breed_name, breed_name + " Dragon"));
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

HtmlOutput.prototype.typeToImage = function (type) {
    var url = window.calculator_data.type_image_url[type];
    if (url) {
        return this.urlToImage(url,20,20);
    } else {
        return "???"+type+"???";
    }
}

HtmlOutput.prototype.renderDragonTypes = function (types) {    
    var dragon_types = [];

    for (var index in types){
        dragon_types.push(this.typeToImage(types[index]));
    }
    
    return dragon_types.join(' ');
}

HtmlOutput.prototype.wrapHeader = function (header, color, span, width){
    var header_style = "width:" + width + "px; height:50px; background-color:" + color + "; text-align: center;";
    return "<th style=\""+header_style+"\" colspan=\"" + span + "\">"+header+"</th>";
}

HtmlOutput.prototype.wrapCell = function (cell, align){
    var cell_style = "text-align:" + align + ";";
    
    return "<td style=\"" +cell_style+"\">"+cell+"</td>";
}

HtmlOutput.prototype.wrapRow = function (row){
    return "<tr>"+row+"</tr>"
}

HtmlOutput.prototype.joinRows = function (rows){
    return rows.join('');
}

HtmlOutput.prototype.joinCells = function (cells){
    return cells.join('');
}

HtmlOutput.prototype.joinLines = function (lines){
    return lines.join('<br/>');
}

HtmlOutput.prototype.joinLinesDouble = function (lines){
    return lines.join('<br/><br/>');
}

HtmlOutput.prototype.wrapTable = function (content){    
    var table_style = "background-color:#CCCCCC; border-collapse: collapse;";
    return "<table style=\"" + table_style + "\">"+content+"</table>";
}

HtmlOutput.prototype.wrapBorderedTable = function (content){    
    var table_style = "background-color:#CCCCCC; border-collapse: collapse;";
    return "<table border=\"1\" cellPadding=\"10\" style=\"" + table_style + "\">"+content+"</table>";
}

HtmlOutput.prototype.output = function (value){
    document.getElementById(this.outputElementId).innerHTML = value;
}