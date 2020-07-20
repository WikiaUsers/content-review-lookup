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

function buildDataLists(){
    // Build the lists of types   
    window.minor_types = [];
    window.recessive_types = [];
    window.counted_types = [];
    
    for (var type_index in all_types){
        var type_classification = getTypeClassification(all_types[type_index]);      
        
        if (type_classification === "minor"){
            minor_types.push(all_types[type_index]);
        }
        else if (type_classification === "recessive"){
            recessive_types.push(all_types[type_index]);
        }
        else if (type_classification === "counted"){
            counted_types.push(all_types[type_index]);
        }
    }
    
    // Build group-related variables
    window.parent_data_list = buildParentDataList();   
    window.offspring_type_groups = buildOffspringIndex();
    window.parent_type_groups = buildParentIndex();
    window.parent_type_pools = [];
    parent_type_pools[TYPE_GROUPS_ALL_ID] = [];
    
    for (var key in parent_type_groups){        
        var type_group = key.split(",");
        parent_type_pools[TYPE_GROUPS_ALL_ID].push(type_group);
    }
    
    // Fill more globally-required variables
        
    window.animal_ids = [];
    window.environment_breed_ids = [];
    window.incubation_times = [];
    window.player_levels = [];
    window.max_level_requirement = 0;
    window.max_individual_types = 0;
    
    for (var animal_id in breeds){
        animal_ids.push(animal_id);
        
        // Process the animal's types
        var animal_types = breeds[animal_id].types;
        var num_types = animal_types.length;
        
        breeds[animal_id].requiredtypes = filterTypes(animal_types, "recessive");
                       
        if (num_types > max_individual_types){
            max_individual_types = num_types;
        }
        
        // Process the animal's environment
        var environments = breeds[animal_id].environments;
        
        for (var index in environments){
            var key = environments[index];
            
            if (!environment_breed_ids[key]){
                environment_breed_ids[key] = [];
            }
            
            environment_breed_ids[key].push(animal_id);
        }
        
        // Process the animal's incubation time
        var incubation_data = breeds[animal_id].incubation;
        var incubation = getIncubationTime(incubation_data);
        
        if (incubation !== null){
            incubation_times.push(incubation);
        }
        
        // Process the animal's level requirement
        var required_level = breeds[animal_id].level;
        
        if (required_level !== undefined){
            // Do not overwrite a custom level requirement with default values
            
            // Keep track of the maximum level requirement for display purposes
            if (required_level > max_level_requirement){
                max_level_requirement = required_level;
            }            
        }
        else{
            // Set the level requirement according to default values
            var sorted_types = mergeSort(animal_types, "level_requirements");
            var highest_req_type = sorted_types[sorted_types.length - 1];
            var level_requirement = level_requirements[highest_req_type];
            
            if (level_requirement === undefined){
                level_requirement = 0;
                displayHTML("Warning: Level requirement for " + breeds[animal_id].name + 
                " set to 0.", "content_messages");
            }
            
            breeds[animal_id].level = level_requirement;
        }              
    }     
}

function setMenuOptions(){
    var first_parent_menu = document.getElementById(OFFSPRING_MENU_FIRST_PARENT_ID);
    var second_parent_menu = document.getElementById(OFFSPRING_MENU_SECOND_PARENT_ID);
    var incubation_filter_menu = document.getElementById(INCUBATION_FILTER_MENU_ID);
    var level_filter_menu = document.getElementById(LEVEL_FILTER_MENU_ID);
    var offspring_menu = document.getElementById(PARENT_MENU_OFFSPRING_ID);
            
    for (var animal_id in breeds){
        var animal_name = breeds[animal_id].name;
        
        var first_parent_option = document.createElement("option");
        first_parent_option.text = animal_name;
        first_parent_menu.add(first_parent_option);
        
        var second_parent_option = document.createElement("option");
        second_parent_option.text = animal_name;
        second_parent_menu.add(second_parent_option);
        
        var offspring_option = document.createElement("option");
        offspring_option.text = animal_name;        
        offspring_menu.add(offspring_option);
    }
    
    mergeSort(incubation_times, "incubation");
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
    
    for (var key in level_requirements){
        if (level_requirements[key] > max_level_requirement){
            max_level_requirement = level_requirements[key];
        }        
    }
    
    var default_level_option = document.createElement("option");
    default_level_option.text = "Filter by player level (optional)";
    level_filter_menu.add(default_level_option);
    
    for (var i = 1; i < max_level_requirement; i++){
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
    	
    document.getElementById(OFFSPRING_FORM_ID).style.display = "inline";
    document.getElementById(PARENT_FORM_ID).style.display = "inline";
    document.getElementById(INCUBATION_FILTER_MENU_ID).style.display = "inline";
    document.getElementById(LEVEL_FILTER_MENU_ID).style.display = "inline";
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
    var content_section = OFFSPRING_CONTENT_ID;
    clearContentField(content_section);
            
    var first_parent_menu = document.getElementById(OFFSPRING_MENU_FIRST_PARENT_ID);    
    var second_parent_menu = document.getElementById(OFFSPRING_MENU_SECOND_PARENT_ID);
    var first_animal_id = animal_ids[first_parent_menu.selectedIndex];
    var second_animal_id = animal_ids[second_parent_menu.selectedIndex];
    var first_animal_name = breeds[first_animal_id].name;
    var second_animal_name = breeds[second_animal_id].name;
        
    var first_parent_eligibility = getParentEligibilityParameters(first_animal_id);
    var second_parent_eligibility = getParentEligibilityParameters(second_animal_id);
    var first_parent_breedable = first_parent_eligibility[0];
    var second_parent_breedable = second_parent_eligibility[0];
    
    if (first_parent_breedable && second_parent_breedable){
        var handler = new HtmlOutput(content_section); 
        
        var possible_offspring = buildOffspringList(first_animal_id, second_animal_id);
        
        var incubation_filter_menu = document.getElementById("breedanimals_incubationchoices");
        var incubation_index = incubation_filter_menu.selectedIndex;
        var incubation_text = "";
        
        if (incubation_index > 0){
            // First index contains default text; remove it
            var selected_incubation = incubation_times[incubation_index - 1]; 
            incubation_text = selected_incubation.text;
            var offspring_list = [];
            
            for (var index in possible_offspring){
                var animal = possible_offspring[index];
                var animal_incubation = getIncubationTime(animal.incubation).value;
                                   
                if (selected_incubation.type === "days"){
                    // The "days" measurement is not exact
                    var min_value = time_measurements["days"] * 
                    (selected_incubation.value / time_measurements["days"] - 1);
                    var max_value = selected_incubation.value;
                    
                    if (animal_incubation > min_value && animal_incubation <= max_value){
                        offspring_list.push(animal);
                    }
                }
                else{
                    if (animal_incubation === selected_incubation.value){
                        offspring_list.push(animal);
                    }
                }
            }
            
            possible_offspring = offspring_list;
        }
        
        var level_filter_menu = document.getElementById("breedanimals_levelchoices");
        var level_index = level_filter_menu.selectedIndex;
        var level_text = "";
        
        if (level_index > 0){
            // First index contains default text; remove it
            var selected_level = player_levels[level_index - 1];
            var player_level = selected_level.value;
            level_text = selected_level.text;
            
            var offspring_list = [];
            
            for (var index in possible_offspring){
                var animal = possible_offspring[index];
                var animal_level_requirement = animal.level;
                
                if (animal_level_requirement <= player_level){
                    offspring_list.push(animal);
                }
            }
			
			// TODO: This is a hack because of the creators' oversight! Remove once it's resolved.
			
            if (offspring_list.length === 0){
                var both_parents = [first_animal_id, second_animal_id];
                 
                if (listContainsElements(both_parents, ["pyropony", "frostfang"]) &&
                    player_level <= 13){
                    offspring_list.push(new Animal("pyropony"));
                } 
            }
            
            possible_offspring = offspring_list;
        }
        
        displayHTML(TABLE_RENDERING_PROGRESS_MESSAGE, content_section);
        
        window.setTimeout(function(){
            var outcome_table = renderOutcomeTable(handler, possible_offspring, first_animal_name, 
                            second_animal_name, incubation_text, level_text);
            handler.output(outcome_table);            
        }, 0);         
    }
    else{
        var output = [];
        
        if (!first_parent_breedable){        
            output.push(getParentEligibilityExplanation(first_animal_name, first_parent_eligibility[1]));
        }
        
        if (!second_parent_breedable){
            if (!(second_animal_id === first_animal_id)){
                output.push(getParentEligibilityExplanation(second_animal_name, second_parent_eligibility[1]));
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
    clearContentField("content_breedanimals");
    clearContentField(content_section);
   
    var menu = document.getElementById("findparents_animalchoices");            
    var animal_id = animal_ids[menu.selectedIndex];
    var animal_name = breeds[animal_id].name;        
    
    var eligibility = getOffspringEligibilityParameters(animal_id);
    var breedable = eligibility[0];
       
    if (breedable){
        var possible_parents = buildParentList(animal_id);
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
        
        if (default_offspring_explanations[animal_id]){
            default_offspring_message = "<br>" + default_offspring_explanations[animal_id] + "<br>";
        }
                        
        if (all_type_parents.length > 0){            
            all_type_parent_table = renderAllTypeParentTable(handler, all_type_parents, animal_name);         
        }
                
        if (component_type_parents.length > 0){        
            component_type_parent_table = renderMinorComponentParentTable(handler, component_type_parents, animal_name);            
        }            
        
        if (some_type_parents && some_type_parents.length > 0){            
            some_type_parent_table = renderSomeTypeParentTable(handler, some_type_parents, animal_name);         
        }
               
        if (specific_parents && specific_parents.length > 0){        
            specific_parent_table = renderSpecificParentTable(handler, specific_parents, animal_name);            
        }                
        
        displayHTML(TABLE_RENDERING_PROGRESS_MESSAGE, content_section);
                
        window.setTimeout(function(){            
            handler.output([default_offspring_message, component_type_parent_table, all_type_parent_table, some_type_parent_table, specific_parent_table].join(''));            
        }, 0);
    }
    else{
        displayHTML(getOffspringEligibilityExplanation(animal_name, eligibility[1]), content_section);
    }   
    
    scrollToSection(content_section, 80);
}

/*
 * Data population functions
 */
 
 function getIncubationTime(str)
 {
    var data = str.split("_");
    
    if (time_measurements[data[1]] !== undefined){        
        return new IncubationTime(data[0], data[1]);
    }
    
    return null;
 }
 
 function buildParentDataList()
 {
    var out = [];
    
    for (var id in breeds){
        var parent_data = breeds[id].parents;
        
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
    
    for (var id in breeds) {
        var breed = breeds[id];
        var parent_data = breed.parents;
        
        if (!parent_data_list[id]){
            // Do not add any parent-specific animals to the type groups
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

function buildParentIndex(){
    var index = {};
    
    function addBreed(key, value) {    
        if (!index[key]) {
            index[key] = [];
        }
        
        index[key].push(value);
    }
    
    for (var id in breeds) {    
        var breed = breeds[id];
        
        if (!breeds[id].parenteligibility){
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
 
function buildOffspringList(first_parent_id, second_parent_id){
    var possible_offspring = [];
    var first_parent_types = breeds[first_parent_id].types;
    var second_parent_types = breeds[second_parent_id].types;    
        
    var outcome_types = getBreedingOutcomeTypes(first_parent_types, second_parent_types);
    
    for (var i = 0; i < outcome_types.length; i++){
        var key = outcome_types[i].types.join(',');
        var type_group = offspring_type_groups[key];                
        
        if (type_group){			
            for (var j = 0; j < type_group.length; j++){            
                possible_offspring.push(new Animal(type_group[j]));
            }
        }
    }
    
    for (var key in parent_data_list){
        var parent_data = parent_data_list[key];
        var offspring = new Animal(key);           
        
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
    
    return mergeSort(getUniqueObjectList(possible_offspring), "offspring_types");
}

function getBreedingOutcomeTypes(first_animal_types, second_animal_types){
    var out = [];
   
    var breeding_pool = new BreedingPool(first_animal_types, second_animal_types);     
    var total_types = breeding_pool.original_length;        
    var type_pool = breeding_pool.processed_pool;     
    var present_minor_types = breeding_pool.present_minor_types;    
        
    if (total_types === 1){
        // Check single type pool exceptions
        var single_type = type_pool[0];
        
        if (single_type === "legendary"){
            // Include all possible pures generated by a pure Legendary pool
            var pure_legendary_offspring = getPureLegendaryPoolOffspring();		
            
            for (var index in pure_legendary_offspring){			
                out.push(new TypePool(pure_legendary_offspring[index]));
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
            var total_type_req = type_count_requirements[counted_types[i]];
            
            if (total_types >= total_type_req){
                out.push(new TypePool([counted_types[i]]));
            }
        }
        
        // Add all type groups that qualify for plain legendary hybrid pools        
        if (isMinorAndLegendaryPool(first_animal_types, second_animal_types)){
            // Pools containing only Legendary and a single minor type are processed differently
            // This check must be done here instead of in processed types, because processing is still necessary
            // Minor and Legendary hybrids paired with minor pures must still allow minor and component hybrids
            
            var minor_and_legendary_pool = getSortedTypes(getMergedList(first_animal_types, second_animal_types));
            
            // Minor legendary hybrid pools also add pures of the minor type's components
                                    
            var minor_type = new MinorType(minor_and_legendary_pool[0]);
            var components = minor_type.components;
            
            for (var index in components){
                var component_type = components[index].type;
                
                // Include all minor type component pures (including cascaded minor type components)
                out.push(new TypePool([component_type]));
            }   
        }
        else if (total_types === 2 && type_pool[1] === "legendary"){
            // Check after minor and legendary pools to find non-minor and legendary pools
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

function getProcessedTypeList(first_animal_types, second_animal_types){
    // Process the list of types according to the breeding rules
    
    var processed_types = [];
    
    for (var i = 0; i < first_animal_types.length; i++){
        if (getTypeClassification(first_animal_types[i]) === "minor"){
            if (listContainsElements(second_animal_types, [first_animal_types[i]])){
                // This is a minor type provided by both parents
                
                if (getMergedList(first_animal_types, second_animal_types).length > 1){
                    // Split this first type and add its components to the pool
                    // This only happens if there is more than one unique type in the pool
                    var minor_type = new MinorType(first_animal_types[i]);
                    var components = minor_type.components;
                    
                    for (var j = 0; j < components.length; j++){
                        processed_types.push(components[j].type);
                    }
                }
            }
            else{
                // This is a minor type only present in the first parent
                processed_types.push(first_animal_types[i]);
            }
        }
        else{
            // Add the type without making modifications
            processed_types.push(first_animal_types[i]);
        }        
    }
    
    for (var i = 0; i < second_animal_types.length; i++){
        // Add all of the second animal's types
        // Repeated minor types were handled in the first animal type's processing
        processed_types.push(second_animal_types[i]);
    }
    
    // Remove all repeated types
    processed_types = getUniquePrimitiveList(processed_types);
    
    // Filter out excluded types
    for (var i = 0; i < excluded_types.length; i++){
        processed_types = filterTypes(processed_types, excluded_types[i]);
    }
        
    // Return the sorted type list
    return getSortedTypes(processed_types);
}

function isMinorAndLegendaryPool(first_animal_types, second_animal_types){
    var merged_pool = getMergedList(first_animal_types, second_animal_types);
    
    if (merged_pool.length === 2){
        merged_pool = getSortedTypes(merged_pool);
        
        if (merged_pool[1] === "legendary" && getTypeClassification(merged_pool[0]) === "minor"){
            return true;
        }
    }

    return false;
}

function buildParentList(animal_id){
    var possible_parents = [];

    var all_type_parents = []; // Parents that can be paired with anything to generate the desired offspring
    var component_type_parents = []; // Parents that can be paired with anything providing at least one different type to generate the desired offspring
    var some_type_parents = []; // Parents that must be paired together to generate the desired offspring
    var specific_parents = [];
        
    var parent_data = breeds[animal_id].parents;
    var breed_types = breeds[animal_id].types;
    var environment_key = getEnvironmentKey(animal_id);

    if (parentDataIsValid(parent_data)){   
        specific_parents = getParentsWithRequirements(parent_data, environment_key);                              
        
        if (breed_types.length === 1){
            // Single type animals have special interactions with Legendary or single type pools of their own type            
            var single_type_exceptions = getSingleTypeExceptionParents(animal_id);
            specific_parents = getMergedList(specific_parents, single_type_exceptions);                        
        }
    }
    else {        
        var breed_type_req = breeds[animal_id].requiredtypes;
                
        if (breed_types.length === 1){
            var single_type_exception_parents = getSingleTypeExceptionParents(animal_id);
            
            for (var index in single_type_exception_parents){
                some_type_parents.push(single_type_exception_parents[index]);
            }
        }
        
        if (breed_type_req.length === 1){        
            if (breed_type_req[0] === "legendary"){
                var pure_legendary_group = new AnimalGroup(parent_type_groups["legendary"], ["legendary"]);
                    
                // Pair the pure legendarys together
                some_type_parents.push(new AnimalPair(pure_legendary_group, pure_legendary_group));               
                
                var existing_group_keys = [];
                
                for (var index in parent_type_pools[TYPE_GROUPS_ALL_ID]){
                    var pool = parent_type_pools[TYPE_GROUPS_ALL_ID][index];
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
                        some_type_parents.push(new AnimalPair(new AnimalGroup(left_type_group, left_group_types), 
                                    new AnimalGroup(right_type_group, right_group_types)));                                    
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
            
            // Add groups that can be bred with any other animal to generate the target offspring
            for (var pool in all_type_candidates){
                var desired_pool = all_type_candidates[pool];
                var key = desired_pool.join(',');
                var group = parent_type_groups[key];
                all_type_parents.push(new AnimalGroup(group, desired_pool));         
            }
            
            // Add groups that can be bred with all animals that provide at least one different type to generate the target offspring
            for (var pool in component_type_candidates){
                var desired_pool = component_type_candidates[pool];
                var key = desired_pool.join(',');
                var group = parent_type_groups[key];
                component_type_parents.push(new AnimalGroup(group, desired_pool));
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
                var left_group = new AnimalGroup(parent_type_groups[left_key], first_pool);
                var right_group = new AnimalGroup(parent_type_groups[right_key], second_pool);
                
                var combined_pool = (new BreedingPool(first_pool, second_pool)).processed_pool;
                                        
                if (listContainsElements(combined_pool, breed_type_req)){
                    some_type_parents.push(new AnimalPair(left_group, right_group));
                }
                else{
                    // Minors do not split unless the combined pool has more than one type in it.
                    if (combined_pool.length > 1 && completedByMinors(combined_pool, breed_type_req)){
                        some_type_parents.push(new AnimalPair(left_group, right_group));
                    }
                }
            }                        
        }
    }    

    var possible_parents = [all_type_parents, component_type_parents, mergeSort(getUniqueObjectList(some_type_parents), "parent_pairs"), mergeSort(getUniqueObjectList(specific_parents), "parent_pairs")];    
    return possible_parents;
}

function getEnvironmentKey(animal_id){    
    return TYPE_GROUPS_ALL_ID;
}

function getPureLegendaryPoolOffspring(){
    var out = [];
    
    for (var i = 0; i < prismatic_types.length; i++){
        out.push([prismatic_types[i]]);		
    }
    
    return out;
}

function isSingleTypeOffspringException(breed_types, first_parent_types, second_parent_types){   
    // This function is used only to check single type breeds with special parent requirements    
    
    if (breed_types.length === 1){
        // Offspring is a pure, which has some special inclusive breeding rules
        
        var type_pool = getSortedTypes(getMergedList(first_parent_types, second_parent_types));
        
        if (type_pool.length === 1){
            var single_type = type_pool[0];
            
            if (single_type === "legendary" && listContainsElements(prismatic_types, [breed_types[0]])){
                return true;
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
        else if (type_pool.length === 2 && type_pool[1] === "legendary"){
            if (breed_types[0] === type_pool[0]){
                // Include as offspring of pure + legendary pool                                
                return true;
            }
            else{
                var type_classification = getTypeClassification(type_pool[0]);
                
                if (type_classification === "minor"){
                    var minor_type = new MinorType(type_pool[0]);                    
                    var type_components = minor_type.components;
                    
                    for (var index in type_components){
                        if (type_components[index].type === breed_types[0]){
                            // Include as pure component result of minor + legendary pool
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
    // Single type animals have special interactions with Legendary or single type pools of their own type
    
    var pairs = [];
    var type = breeds[id].types.length === 1 ? breeds[id].types[0] : null;
    
    if (type){
        if (getTypeClassification(type) !== "recessive"){            
            var pure_legendary_group = new AnimalGroup(parent_type_groups["legendary"], ["legendary"]);
            var pure_type_group = new AnimalGroup(parent_type_groups[type], [type]);
            var pure_and_legendary_group = parent_type_groups[type + ",legendary"];
            
            // Pair the pure same types together                    
            pairs.push(new AnimalPair(pure_type_group, pure_type_group));            
                        
            // Pair all the pure same types and pure legendarys together
            pairs.push(new AnimalPair(pure_type_group, pure_legendary_group));

			// Pair the pure legendarys together
			pairs.push(new AnimalPair(pure_legendary_group, pure_legendary_group));
			
			if (pure_and_legendary_group){
				var pure_and_legendary_animal_group = new AnimalGroup(pure_and_legendary_group, [type, "legendary"]);
				
				// Pair the pures and legendary hybrids together
				pairs.push(new AnimalPair(pure_type_group, pure_and_legendary_animal_group));
				pairs.push(new AnimalPair(pure_legendary_group, pure_and_legendary_animal_group));
				pairs.push(new AnimalPair(pure_and_legendary_animal_group, pure_and_legendary_animal_group));
			}

            // Check for special condition where pure minor type or minor type + legendary pools produce component pures
            for (var i = 0; i < minor_types.length; i++){
                if (type !== minor_types[i]){
                    var components = getTypeComponents(minor_types[i]);
                    
                    for (var j = 0; j < components.length; j++){
                        if (type === components[j]){
                            // Collect the possible parents for plain minor type + legendary pools
                            var minor_type_group = new AnimalGroup(parent_type_groups[minor_types[i]], [minor_types[i]]);
                            var minor_and_legendary_group = parent_type_groups[minor_types[i] + ",legendary"];
                            
                            pairs.push(new AnimalPair(minor_type_group, minor_type_group));
                            pairs.push(new AnimalPair(minor_type_group, pure_legendary_group));
                            
                            if (minor_and_legendary_group)
                            {
                                var minor_and_legendary_animal_group = new AnimalGroup(minor_and_legendary_group, [minor_types[i], "legendary"]);                        
                                
                                // Pair the parents together                            
                                pairs.push(new AnimalPair(minor_type_group, minor_and_legendary_animal_group));
                                pairs.push(new AnimalPair(pure_legendary_group, minor_and_legendary_animal_group));
                                pairs.push(new AnimalPair(minor_and_legendary_animal_group, minor_and_legendary_animal_group));
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
            first_parent_list.push(new Animal(required_id));
        }
        else if (first_requirement_type === "types"){
            var required_types = first_parent_requirement.value;
            
            for (var index in parent_type_pools[environment_key]){
                var pool = parent_type_pools[environment_key][index];
                
                if (listContainsElements(pool, required_types)){                
                    var key = pool.join(',');
                    var group = parent_type_groups[key];
                    first_parent_list.push(new AnimalGroup(group, pool));
                }
            }
        }
        
        if (!requirements_match){
            if (second_requirement_type === "id"){
                var required_id = second_parent_requirement.value;
                second_parent_list.push(new Animal(required_id));
            }
            else if (second_requirement_type === "types"){
                var required_types = second_parent_requirement.value;
                
                for (var index in parent_type_pools[environment_key]){
                    var pool = parent_type_pools[environment_key][index];
                    
                    if (listContainsElements(pool, required_types)){
                        var key = pool.join(',');
                        var group = parent_type_groups[key];                    
                        second_parent_list.push(new AnimalGroup(group, pool));
                    }
                }
            }
        }
        
        if (requirements_match){
            for (var i = 0; i < first_parent_list.length; i++){
                for (var j = i; j < first_parent_list.length; j++){
                    var pair_to_add = new AnimalPair(first_parent_list[i], first_parent_list[j]);
                    
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
                    var pair_to_add = new AnimalPair(first_parent_list[i], second_parent_list[j]);
                    
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
    
    if (type_group instanceof Animal){
        group_members.push(type_group.id);
        group_types = type_group.types.getValue();
    }
    else if (type_group instanceof AnimalGroup){
        group_members = type_group.getAnimalGroupMembers();
        group_types = type_group.getAnimalGroupTypes();
    }
    
    for (var i = 0; i < group_members.length; i++){        
        var breed_id = group_members[i];
        
        if (getParentEligibilityParameters(breed_id)[0]){
            eligible_parents.push(breed_id);
        }
    }
    
    if (eligible_parents.length > 0){
        return new AnimalGroup(eligible_parents, group_types);
    }
    else{
        return null;
    }
}

function getParentEligibilityParameters(id){
    // State whether a parent can breed, the reason (if not), and the parent's id
    
    var params = [true, "", id];
    var type = breeds[id].parenteligibility;
    
    if (type !== undefined){
        if (parent_eligibility_explanations[type] !== undefined){
            params[0] = false;
            params[1] = type;
        }
    }
    
    return params;
}

function getParentEligibilityExplanation(animal_name, reason){
    var reason_text = "";
    var explanation = parent_eligibility_explanations[reason];
    
    if (explanation !== undefined){
        reason_text = "*** The <b>" + animal_name + " animal</b> cannot " +
        "be used as a parent because " + explanation + " ***";
    }
    
    return reason_text;
}

function getOffspringEligibilityParameters(id){    
    var params = [true, "", id];
    var type = breeds[id].offspringeligibility;
    
    if (type !== undefined){
        if (offspring_eligibility_explanations[type]){
            params[0] = false;
            params[1] = type;
        }
    }
    
    return params;
}

function getOffspringEligibilityExplanation(animal_name, reason){
    var reason_text = "";
    var explanation = offspring_eligibility_explanations[reason];
    
    if (explanation !== undefined){
        reason_text = "*** The <b>" + animal_name + "</b> " + explanation + " ***";
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
                if (!breeds[first_req]){
                    return false;
                }
            }
            else if (first_type === "types"){
                if (!(listContainsElements(all_types, first_req))){
                    return false;
                }
            }
            else{
                return false;
            }
            
            var second_type = second_parent_data[0];
            var second_req = second_parent_data[1];
            
            if (second_type === "id"){
                if (!breeds[second_req]){
                    return false;
                }
            }
            else if (second_type === "types"){
                if (!(listContainsElements(all_types, second_req))){
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
    if (pair instanceof AnimalPair){
        var animal_pair = pair.getPair();
        var left_group = [];
        var right_group = [];
        
        if (animal_pair[0] instanceof Animal){
            left_group = [animal_pair[0].id];
        }
        else if (animal_pair[0] instanceof AnimalGroup){
            left_group = animal_pair[0].getAnimalGroupMembers();
        }
        
        if (animal_pair[1] instanceof Animal){
            right_group = [animal_pair[1].id];
        }
        else if (animal_pair[1] instanceof AnimalGroup){
            right_group = animal_pair[1].getAnimalGroupMembers();
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
    
    if (first_parent instanceof Animal){
        first_parent_types = first_parent.types.getValue();
    }
    else if (first_parent instanceof AnimalGroup){
        first_parent_types = first_parent.types;
    }
    
    if (second_parent instanceof Animal){
        second_parent_types = second_parent.types.getValue();
    }
    else if (second_parent instanceof AnimalGroup){
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
            var breed_types = breeds[id_list[index]].types;
            
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
            var breed_types = breeds[id_list[index]].types;
            
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
        var sorted_list1 = mergeSort(list1.slice(0), sort_type);
        var sorted_list2 = mergeSort(list2.slice(0), sort_type);
        
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
    if (list.length > 0){    
        var type = typeof list[0];
        
        for (var index in list){
            if (typeof list[index] !== type ||
                !(typeof list[index].equals === 'function') ||
                !(typeof list[index].compareTo === 'function')){
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
        mergeSort(list, "object_compare");
        
        var unique_list = [list[0]];
        
        for (var i = 1; i < list.length; i++){                    
            if (!(unique_list[unique_list.length - 1].equals(list[i]))){
                unique_list.push(list[i]);                
            }
        }

        return unique_list;
    }
    else{
        /*DEBUG: displayHTML("Warning: List is empty or contains elements that cannot be compared. " + 
                    "Returning original list.", "content_messages");*/
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
            var rarity = breeds[list_to_sort[i]].rarity;                
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
    
    for (var i = 0; i < all_types.length; i++){
        for (var j = 0; j < types.length; j++){                        
            if (types[j] === all_types[i]){                
                sorted_types.push(types[j]);
                break;                
            }
        }
    }        
    
    return sorted_types;
}

function mergeSort (values, type){
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
        
        left = mergeSort(left, type);
        right = mergeSort(right, type);
        
        values = merge(values, left, right, type);
    }
        
    return values;    
}

function merge(values, left, right, type){
    var n = 0; // index of values
    var l = 0; // index of left
    var r = 0; // index of right
    
    while (l < left.length && r < right.length){
        if (compareValues(left[l], right[r], type) <= 0){ 
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

function compareValues (first_val, second_val, type){        
    if (type === "primitive"){
        return comparePrimitives(first_val, second_val);
    }
    else if (type == "object_compare"){
        return first_val.compareTo(second_val);
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

function compareIncubationTimes(first_inc, second_inc){
    if (first_inc && second_inc && first_inc instanceof IncubationTime &&
        second_inc instanceof IncubationTime){
        return comparePrimitives(first_inc.value, second_inc.value);
    }
    
    return 0;
}

function compareLevelRequirements(first_type, second_type){
    var first_type_req = level_requirements[first_type];
    var second_type_req = level_requirements[second_type];
    
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
        
        if (first_parent instanceof Animal){
            first_pool = first_parent.types.getValue();
        }
        else if (first_parent instanceof AnimalGroup){
            first_pool = first_parent.getAnimalGroupTypes();
        }
        
        if (second_parent instanceof Animal){
            second_pool = second_parent.types.getValue();
        }
        else if (second_parent instanceof AnimalGroup){
            second_pool = second_parent.getAnimalGroupTypes();
        }                
        
        return compareTypePools(first_pool, second_pool);
    }
    
    return 0;
}


function compareOffspringTypes(first_val, second_val){
    if (first_val && second_val){
        var first_pool = [];
        var second_pool = [];
        
        if (first_val instanceof Animal){
            first_pool = getSortedTypes(first_val.types.getValue());
        }
        
        if (second_val instanceof Animal){
            second_pool = getSortedTypes(second_val.types.getValue());
        }
        
        return compareTypePools(first_pool, second_pool);
    }
    
    return 0;
}

function compareParentPairs(first_val, second_val){
    if (first_val && second_val && first_val instanceof AnimalPair && second_val instanceof AnimalPair){
        var first_pair = first_val.getPair();
        var second_pair = second_val.getPair();
        
        var first_left_parent_pool = [];
        var first_right_parent_pool = [];
        
        var second_left_parent_pool = [];
        var second_right_parent_pool = [];
        
        if (first_pair[0] instanceof Animal){
            first_left_parent_pool = first_pair[0].types.getValue();
        }
        else if (first_pair[0] instanceof AnimalGroup){
            first_left_parent_pool = first_pair[0].getAnimalGroupTypes();
        }
        
        if (first_pair[1] instanceof Animal){
            first_right_parent_pool = first_pair[1].types.getValue();
        }
        else if (first_pair[1] instanceof AnimalGroup){
            first_right_parent_pool = first_pair[1].getAnimalGroupTypes();
        }
        
        if (second_pair[0] instanceof Animal){
            second_left_parent_pool = second_pair[0].types.getValue();
        }
        else if (second_pair[0] instanceof AnimalGroup){
            second_left_parent_pool = second_pair[0].getAnimalGroupTypes();
        }
        
        if (second_pair[1] instanceof Animal){
            second_right_parent_pool = second_pair[1].types.getValue();
        }
        else if (second_pair[1] instanceof AnimalGroup){
            second_right_parent_pool = second_pair[1].getAnimalGroupTypes();
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
 * Animal type functions
 */

function getTypeValue(type) {
    for (var i = 0; i < all_types.length; i++){
        if (all_types[i] === type){
            return i + 1;
        }
    }
    
    return 0;
}

function getTypeClassification (type) {
    var classification = complex_types[type];
    
    if (classification){
        return classification;
    }
        
    return "basic";
}

function getTypeComponents (type) {
    var components = complex_type_components[type];
    
    if (components){
        return components;
    }
   
   return [type];
}

function getRequiredTypeAmount (type) {
    var amount = type_count_requirements[type];
    
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
 * Custom animal data structures
 */
 
function PlayerLevel(value, text){
    this.value = value;
    this.text = text;
}
 
function Animal(id){
    var animal = breeds[id];
    
    if (animal){    
        this.id = id;
        
        for (var key in animal){
            this[key] = animal[key];
        }
        
        this.types = new AnimalType(this.types);
    }
    else{
        displayHTML("Warning: Invalid animal id.", "content_messages");
    }
}

Animal.prototype.compareTo = function(animal_to_compare) {
    if (animal_to_compare instanceof Animal){
        return comparePrimitives(this.id, animal_to_compare.id);
    }
    
    return 0;
}

Animal.prototype.equals = function(animal_to_compare) {
    if (animal_to_compare instanceof Animal){
        if (this.id == animal_to_compare.id){
            return true;
        }
    }
    
    return false;
}

function IncubationTime(value, type){
    if (time_measurements[type] !== undefined){
        this.text = value + " " + type;
        this.value = value * time_measurements[type];
        this.type = type;
    }
    else{
        displayHTML("Warning: Invalid incubation time type.", "content_messages");
    }
}

IncubationTime.prototype.compareTo = function(compare_val) {
    if (compare_val instanceof IncubationTime){
        return comparePrimitives(this.value, compare_val.value);
    }
    
    return 0;
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

function AnimalType(types){
    this.types = types.slice(0);
}

AnimalType.prototype.getValue = function(){
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

MinorType.prototype.compareTo = function(type_to_compare){
    if (type_to_compare instanceof MinorType){
        return comparePrimitives(this.type, type_to_compare.type);
    }
    
    return 0;
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

TypePool.prototype.compareTo = function(pool_to_compare){
    if (pool_to_compare instanceof TypePool){
        var this_key = this.types.join(',');
        var compare_key = pool_to_compare.types.join(',');
        
        return comparePrimitives(this_key, compare_key);
    }
    
    return 0;
}

TypePool.prototype.equals = function (pool_to_compare){
    if (pool_to_compare instanceof TypePool){
        if (listsMatch(this.types, pool_to_compare.types, "primitive")){
            return true;
        }
    }
    
    return false;
}

function BreedingPool(first_animal_types, second_animal_types){
    this.original_pool = getSortedTypes(getMergedList(first_animal_types, second_animal_types));
    
    // Filter out excluded types
    for (var i = 0; i < excluded_types.length; i++){
        this.original_pool = filterTypes(this.original_pool, excluded_types[i]);
    }
        
    this.original_length = this.original_pool.length;
    this.processed_pool = getProcessedTypeList(first_animal_types, second_animal_types);
    
    this.present_minor_types = [];
    var present_minor_list = getPresentTypeClassification(this.original_pool, "minor");
    
    for (var index in present_minor_list){
        this.present_minor_types.push(new MinorType(present_minor_list[index])); 
    }
}

BreedingPool.prototype.compareTo = function(pool_to_compare){
    if (pool_to_compare instanceof BreedingPool){
        var this_key = this.original_pool.join(',');
        var compare_key = this.original_pool.join(',');
        return comparePrimitives(this_key, compare_key);
    }
    
    return 0;
}

BreedingPool.prototype.equals = function(pool_to_compare){
    if (pool_to_compare instanceof BreedingPool){
        if (listsMatch(this.original_pool, pool_to_compare.original_pool, "primitive")){
            return true;
        }
    }
    
    return false;
}
 
function AnimalGroup(group, types){
    this.group = sortListByRarity(group); // An array of animal ids
    this.types = getSortedTypes(types);
    this.compare_value = this.getCompareValue();
}

AnimalGroup.prototype.getAnimalGroupTypes = function() {
    return this.types;
}

AnimalGroup.prototype.getAnimalGroupMembers = function() {
    return this.group;
}

AnimalGroup.prototype.getCompareValue = function() {
    return this.getAnimalGroupMembers().join(','); 
}

AnimalGroup.prototype.compareTo = function (group_to_compare) {
    if (group_to_compare instanceof AnimalGroup){        
        return comparePrimitives(this.compare_value, group_to_compare.compare_value);
    }
    
    return 0;
}

AnimalGroup.prototype.equals = function(group_to_compare) {
    if (group_to_compare instanceof AnimalGroup){
        if (listsMatch(this.getAnimalGroupMembers(), group_to_compare.getAnimalGroupMembers(), "primitive")){
            return true;
        }
    }
    
    return false;
}

function AnimalPair(first_parent, second_parent){
    if ((first_parent instanceof AnimalGroup || first_parent instanceof Animal) &&
        (second_parent instanceof AnimalGroup || second_parent instanceof Animal)){
        this.pair = mergeSort([first_parent, second_parent], "group_type_pools");
        this.first_parent = this.pair[0];
        this.second_parent = this.pair[1];
        this.compare_value = this.getCompareValue();
    }
    else{
        this.pair = null;
        /*DEBUG: displayHTML("Warning: Inappropriate parents submitted for AnimalPair.", "content_messages");*/
    }    
}

AnimalPair.prototype.getPair = function(){
    return this.pair;
}

AnimalPair.prototype.getCompareValue = function () {
    var first_parent_name = "";
    var second_parent_name = "";
    
    if (this.first_parent instanceof Animal){
        first_parent_name = this.first_parent.id;
    }
    else if (this.first_parent instanceof AnimalGroup){
        first_parent_name = this.first_parent.getAnimalGroupMembers().join(',');
    }
    
    if (this.second_parent instanceof Animal){
        second_parent_name = this.second_parent.id;
    }
    else if (this.second_parent instanceof AnimalGroup){
        second_parent_name = this.second_parent.getAnimalGroupMembers().join(',');
    }
    
    return [first_parent_name, second_parent_name].join(',');
}

AnimalPair.prototype.compareTo = function (pair_to_compare) {
    
    if (pair_to_compare instanceof AnimalPair){        
        return comparePrimitives(this.compare_value, pair_to_compare.compare_value);
    }
    else{
        /*DEBUG: displayHTML("Warning: Object given for comparison is not a AnimalPair.", "content_messages");*/
    }
    
    return 0;
}

AnimalPair.prototype.equals = function(pair_to_compare) {
    if (pair_to_compare instanceof AnimalPair){
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
 
function renderOutcomeTable(handler, possible_offspring, first_parent_name, second_parent_name, incubation_text, level_text){    
    var num_results = 0;
    var present_notes = [];
    
    var rows = handler.joinRows(
        possible_offspring.map(function (offspring) {            
            if (getOffspringEligibilityParameters(offspring.id)[0]){
                num_results++;
                var name = offspring.name;
                var types = offspring.types.getValue();
                var rarity = rarities[offspring.rarity - 1];
                var incubation = offspring.incubation.split("_");
                var incubation_display = incubation[0];
                var incubation_text = incubation[1];
                var incubation_cost = incubation[2];                
                var offspring_notes = offspring.notes;
                var offspring_note_symbols = [];
                
                if (offspring_notes && offspring_notes.length > 0) {                
                    for (var index in offspring_notes) {
                        var note = special_notes[offspring_notes[index]];
                        
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
                    handler.joinCells([handler.wrapCell(handler.renderAnimalLink(name) + offspring_note_text, "center"),
                    handler.wrapCell(handler.renderAnimalTypes(types), "center"),
                    handler.wrapCell("&nbsp &nbsp " + rarity + "&nbsp &nbsp ", "center"),
                    handler.wrapCell(incubation_display, "right"), handler.wrapCell("&nbsp" + incubation_text, "left"),
                    handler.wrapCell("&nbsp " + incubation_cost, "right"), handler.wrapCell(handler.urlToImage(gem_image_page_source, 20, 20), "left")
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
        
        var intro_text = "<p>Breeding <b>" + first_parent_name + "</b> with <b>" + second_parent_name + 
        "</b>" + intro_level_text + " can result in <b>" + num_results + "</b> possible " + 
        ((num_results == 1) ? "animal" : "animals") + intro_incubation_text + ":";
        
        var header_color = TABLE_HEADER_COLOR;                  
        var headers = handler.joinRows([handler.wrapHeader("Animal Name", header_color, 1, 220), handler.wrapHeader("Types", header_color, 1, 70), 
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
    var intro_text = "<p>The <b>" + target_name + " animal</b> can be bred by pairing one of these animals with " +
                     "any animal that provides at least one different type.</p>";

    var header_color = TABLE_HEADER_COLOR;
    var headers = handler.joinRows([handler.wrapHeader("Animal", header_color, 1, 150), handler.wrapHeader("Type", header_color, 1, 60)]);
    
    var component_type_parents = [];
    
    for (var group in component_type_groups){
        var parents = getEligibleParents(component_type_groups[group]).getAnimalGroupMembers();
        
        for (var parent in parents){
            component_type_parents.push(new Animal(parents[parent]));
        }
    }
    
    mergeSort(component_type_parents, "offspring_types"); // Make sure the all type table is sorted
    
    var valid_parents = 0;
    
    // Create the rows where a single parent possesses all the required types
    var rows = handler.joinRows(
        component_type_parents.map(function (animal) {
            valid_parents++;
            
            var breed_name = animal.name;    
            var types = animal.types.getValue();
            
            return handler.wrapRow(
                handler.joinCells([handler.wrapCell(handler.renderAnimalLink(breed_name), "center"),
                handler.wrapCell(handler.renderAnimalTypes(types), "center")
            ]));
        })
    );
    
    var single_parent_text = "the following animal";
    var multiple_parent_text = "one of the following <b>" + valid_parents + "</b> animals";
    var intro_text = "<p>The <b>" + target_name + "</b> can be bred by pairing " +
    ((valid_parents === 1) ? single_parent_text : multiple_parent_text) +
    " with any animal that provides at least one different type.</p>";    
    return handler.wrapTable(handler.joinRows([intro_text, headers, rows]));
}

function renderAllTypeParentTable(handler, all_type_groups, target_name){    
    var header_color = TABLE_HEADER_COLOR;
    var headers = handler.joinRows([handler.wrapHeader("Animal", header_color, 1, 150), handler.wrapHeader("Types", header_color, 1, 100)]);        
    
    var all_type_parents = [];
    
    for (var group in all_type_groups){
        var parents = getEligibleParents(all_type_groups[group]).getAnimalGroupMembers();
        
        for (var parent in parents){
            all_type_parents.push(new Animal(parents[parent]));
        }
    }
    
    mergeSort(all_type_parents, "offspring_types"); // Make sure the all type table is sorted
    
    var valid_parents = 0;
    
    // Create the rows where a single parent possesses all the required types
    var rows = handler.joinRows(
        all_type_parents.map(function (animal) {
            valid_parents++;
            
            var breed_name = animal.name;    
            var types = animal.types.getValue();
            
            return handler.wrapRow(
                handler.joinCells([handler.wrapCell(handler.renderAnimalLink(breed_name), "center"),
                handler.wrapCell(handler.renderAnimalTypes(types), "center")
            ]));
        })
    );
            
    var single_parent_text = "the following animal";
    var multiple_parent_text = "one of the following <b>" + valid_parents + "</b> animals";
    var intro_text = "<p>The <b>" + target_name + "</b> can be bred by pairing " +
    ((valid_parents === 1) ? single_parent_text : multiple_parent_text) + 
    " with any other animal.</p>";
    
    return handler.wrapTable(handler.joinRows([intro_text, headers, rows]));
}

function renderSomeTypeParentTable(handler, some_type_groups, target_name){            
    var header_color = TABLE_HEADER_COLOR;
    var headers = handler.joinRows([handler.wrapHeader("Group A Animals", header_color, 1, 200), 
    handler.wrapHeader("Group A Types", header_color, 1, 100),
    handler.wrapHeader("Group B Types", header_color, 1, 100),
    handler.wrapHeader("Group B Animals", header_color, 1, 200)]);

    var valid_pairs = 0;        
    
    var rows = handler.joinRows(
        some_type_groups.map(function (group_pair) {                        
            var pair = group_pair.getPair();
            var left_group = getEligibleParents(pair[0]);
            var right_group = getEligibleParents(pair[1]);
            
            if (left_group && right_group){
                valid_pairs++;
                
                var left_types = left_group.getAnimalGroupTypes();
                var right_types = right_group.getAnimalGroupTypes();
                
                return handler.wrapRow(handler.joinCells([handler.wrapCell(handler.renderGroupLinks(left_group), "center"),
                handler.wrapCell(handler.renderAnimalTypes(left_types), "center"),
                handler.wrapCell(handler.renderAnimalTypes(right_types), "center"),
                handler.wrapCell(handler.renderGroupLinks(right_group), "center")
                ]));
            }
        })
    );
        
    var single_pair_text = "the following pair only";
    var multiple_pair_text = " one of the following <b>" + valid_pairs + "</b> pairs";
    var intro_text = "<p>The <b>" + target_name + "</b> can be bred using " + 
    ((valid_pairs === 1) ? single_pair_text : multiple_pair_text) + ".</p>";
    
    return handler.wrapBorderedTable(handler.joinRows([intro_text, headers, rows]));
}

function renderSpecificParentTable(handler, specific_parents, target_name){            
    var header_color = TABLE_HEADER_COLOR;
    var headers = handler.joinRows([handler.wrapHeader("Group A Animals", header_color, 1, 200), 
    handler.wrapHeader("Group A Types", header_color, 1, 100),
    handler.wrapHeader("Group B Types", header_color, 1, 100),
    handler.wrapHeader("Group B Animals", header_color, 1, 200)]);
        
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
                
                if (first_parent instanceof Animal){
                    first_parent_links = handler.renderAnimalLink(first_parent.name);
                    first_parent_types = first_parent.types.getValue();
                }
                else if (first_parent instanceof AnimalGroup){
                    first_parent_links = handler.renderGroupLinks(first_parent);
                    first_parent_types = first_parent.getAnimalGroupTypes();
                }
                
                if (second_parent instanceof Animal){
                    second_parent_links = handler.renderAnimalLink(second_parent.name);
                    second_parent_types = second_parent.types.getValue();
                }
                else if (second_parent instanceof AnimalGroup){
                    second_parent_links = handler.renderGroupLinks(second_parent);
                    second_parent_types = second_parent.getAnimalGroupTypes();
                }        
                                        
                return handler.wrapRow(handler.joinCells([handler.wrapCell(first_parent_links, "center"),
                       handler.wrapCell(handler.renderAnimalTypes(first_parent_types), "center"),
                       handler.wrapCell(handler.renderAnimalTypes(second_parent_types), "center"),
                       handler.wrapCell(second_parent_links, "center")            
                ]));
            }
        })
    );
    
    var single_pair_text = "the following pair only";
    var multiple_pair_text = " one of the following <b>" + valid_pairs + "</b> specific pairs";
    var intro_text = "<p>The <b>" + target_name + "</b> can be bred using " + 
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

HtmlOutput.prototype.renderAnimalLink = function (breed_name) {    
    return this.toUrl(animal_page_source + breed_name, breed_name, breed_name);
}

HtmlOutput.prototype.renderGroupLinks = function(group) {
    var links = [];
    
    var animal_group = group.getAnimalGroupMembers();
    
    for (var animal in animal_group){
        var breed_name = breeds[animal_group[animal]].name;            
        links.push(this.toUrl(animal_page_source + breed_name, breed_name, breed_name));
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
    var url = type_image_url[type];
    if (url) {
        return this.urlToImage(url,20,20);
    } else {
        return "???"+type+"???";
    }
}

HtmlOutput.prototype.renderAnimalTypes = function (types) {    
    var animal_types = [];

    for (var index in types){
        animal_types.push(this.typeToImage(types[index]));
    }
    
    return animal_types.join(' ');
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
    var table_style = "background-color:" + TABLE_BODY_COLOR + "; border-collapse: collapse;";
    return "<table style=\"" + table_style + "\">"+content+"</table>";
}

HtmlOutput.prototype.wrapBorderedTable = function (content){    
    var table_style = "background-color:" + TABLE_BODY_COLOR + "; border-collapse: collapse;";
    return "<table border=\"1\" cellPadding=\"10\" style=\"" + table_style + "\">"+content+"</table>";
}

HtmlOutput.prototype.output = function (value){
    document.getElementById(this.outputElementId).innerHTML = value;
}