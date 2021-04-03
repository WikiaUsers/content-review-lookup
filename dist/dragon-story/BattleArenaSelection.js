/* 
 * Initial setup functions
 */

$(document).ready(function() {         
	if(mw.config.get("wgPageName") === "Battle_Arena") {
		addArenaCalculatorForm();
		init();
		setArenaMenuOptions();       
	}
});

function addArenaCalculatorForm() {
	var	$calculator_element = $("#BattleArenaSelection"),
		calculator_form_html = '<div id="DSBattleArenaCalculator"></div><div id="content_messages"></div><form style="display:all" id="form_opponent"><b>Opponent dragon:</b> <select id="select_opponent"></select><br><br><b>Opponent level:</b> <select id="select_opponent_level"></select><br><br><input type="button" value="Find Best Matches (Low Lvl.)" id="calculateScoreButtonLowLevel"/> <input type="button" value="Find Best Matches (High Lvl.)" id="calculateScoreButtonHighLevel"/> <br><br><b>Remember: The percentages reflect your chance of winning, which is the chance of scoring at least 1 critical hit in 3 attacks. A critical hit might but <u>will not necessarily</u> knock out an opponent immediately.</b><br></form><br><div id="content_scores"></div>';

	$calculator_element.html(calculator_form_html);
}

 function init()
 {
	// Populate the list of dragon ids
    window.dragon_ids = [];
    
    for (var id in window.arena_data.breeds)
    {
        dragon_ids.push(id);
    }
	
	// Rename the calculate buttons according to the level ranges in the data
	
    var high_level_button_name = "Find Best Matches (Levels " + window.arena_data.HIGH_USER_DRAGON_MIN + " - " + window.arena_data.HIGH_USER_DRAGON_MAX + ")";
	var low_level_button_name = "Find Best Matches (Levels " + window.arena_data.LOW_USER_DRAGON_MIN + " - " + window.arena_data.LOW_USER_DRAGON_MAX + ")";

	document.getElementById(window.arena_data.HIGH_LEVEL_BUTTON_ID).value = high_level_button_name;
	document.getElementById("calculateScoreButtonHighLevel").onclick = function() {calculateScoreButtonClicked("calculateScoreButtonHighLevel")};
	document.getElementById(window.arena_data.LOW_LEVEL_BUTTON_ID).value = low_level_button_name;
	document.getElementById("calculateScoreButtonLowLevel").onclick = function() {calculateScoreButtonClicked("calculateScoreButtonLowLevel")};
 }
 
 function setArenaMenuOptions()
 {
    var opponent_dragon_menu = document.getElementById("select_opponent");
    var opponent_level_menu = document.getElementById("select_opponent_level");
    
    var names = [];
    
    for (var index in dragon_ids)
    {
        var id = dragon_ids[index];
        var name = window.arena_data.breeds[id].name;
        names.push(name);
    }        
    
    for (var index2 in names)
    {
        var option = document.createElement("option");
        option.text = names[index2];
        opponent_dragon_menu.add(option);
    }
    
    for (var i = window.arena_data.OPPONENT_MAX_LEVEL; i >= window.arena_data.OPPONENT_MIN_LEVEL; i--)
    {
        var option2 = document.createElement("option");
        option2.text = i;
        opponent_level_menu.add(option2);
    }
    
    document.getElementById("form_opponent").style.display = "inline";
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
 
 function calculateScoreButtonClicked(button_id)
 {
	if (button_id === window.arena_data.LOW_LEVEL_BUTTON_ID){
		// Display the table for low levels
		calculateScores(window.arena_data.LOW_USER_DRAGON_MIN, window.arena_data.LOW_USER_DRAGON_MAX);
	}
	else{
		// Arbitrarily default to high level button behavior
		calculateScores(window.arena_data.HIGH_USER_DRAGON_MIN, window.arena_data.HIGH_USER_DRAGON_MAX);
	}
 }
 
 function calculateScores(min_level, max_level)
 {
    var content_field = "content_scores";
    clearContentField(content_field);
    
    var opponent_id = dragon_ids[document.getElementById("select_opponent").selectedIndex];
    var opponent_colors = window.arena_data.breeds[opponent_id].colors;
    var opponent_rarity = window.arena_data.breeds[opponent_id].rarity;
    var opponent_level = window.arena_data.OPPONENT_MAX_LEVEL - document.getElementById("select_opponent_level").selectedIndex;
    
    var dragon_scores_list = [];
    
    for (var id in window.arena_data.breeds)
    {
        if (typeof window.arena_data.breeds[id].unusable === "undefined" || window.arena_data.breeds[id].unusable !== true){        
            dragon_scores_list.push(getDragonScores(id, opponent_colors, opponent_rarity, opponent_level, min_level, max_level));            
        }        
    }
    
    var handler = new HtmlOutput(content_field);
    var output = renderDragonScores(handler, basMergeSort(dragon_scores_list, "dragon_scores"), min_level, max_level);
    handler.output(output);
    
    var bottom_coordinate = document.getElementById(content_field).offsetTop;
    window.scroll(0, bottom_coordinate);
 }

/*
 * Scoring functions
 */
 
 function getCritRate(crit_score)
 {
    if (window.arena_data.win_rates[crit_score] !== undefined)
    {
        return window.arena_data.win_rates[crit_score];
    }
    
    if (crit_score <= window.arena_data.MIN_TOTAL_SCORE)
    {
        return window.arena_data.MIN_WIN_PERCENTAGE;
    }
    
    return window.arena_data.MAX_WIN_PERCENTAGE;
 }
 
 function getDragonScores(challenger_id, opponent_colors, opponent_rarity, opponent_level, min_level, max_level)
 {
    var challenger = window.arena_data.breeds[challenger_id];
    
    var type_score = getTypeScore(challenger.colors, opponent_colors);
    var rarity_score = getRarityScore(challenger.rarity, opponent_rarity);
    var level_scores = [];
    
    for (var i = min_level; i <= max_level; i++)
    {
        level_scores.push(getLevelScore(i, opponent_level));
    }
    
    return new DragonScores(challenger_id, type_score, rarity_score, level_scores);
 }
 
 function getTypeScore(challenger_colors, opponent_colors)
 {
    var advantages = 0;
    
    for (var i in challenger_colors)
    {
        var color = challenger_colors[i];   

        if (window.arena_data.type_advantages[color])
        {
            var strengths = window.arena_data.type_advantages[color].strengths;
            var weaknesses = window.arena_data.type_advantages[color].weaknesses;                        
            
            for (var j in opponent_colors)
            {
                if (basListContainsElements(strengths, [opponent_colors[j]]))
                {
                    advantages += 1;                    
                }
                
                if (basListContainsElements(weaknesses, [opponent_colors[j]]))
                {
                    advantages -= 1;                    
                }
            }
        }
        else
        {
            displayHTML("Warning: The " + color + " color is invalid. " +
            "Please report immediately if you see this message.", "content_messages");
        }
    }
    
    advantages = Math.min(Math.max(advantages, window.arena_data.MIN_TYPE_SCORE), window.arena_data.MAX_TYPE_SCORE);
    
    var type_key = (advantages < 0) ? ("typeneg" + (-1 * advantages)) : ("type" + advantages);     
    
    if (window.arena_data.type_advantage_points[type_key] !== "undefined")
    {
        return window.arena_data.type_advantage_points[type_key];
    }
    
    return window.arena_data.DEFAULT_RETURN_VALUE;
 }

 function getRarityScore(player_rarity, enemy_rarity)
 {
    var player_rarity_score = window.arena_data.rarity[player_rarity];
    var enemy_rarity_score = window.arena_data.rarity[enemy_rarity];
    
    if (player_rarity_score !== null &&
        enemy_rarity_score !== null)
    {            
        var rarity_index = Math.max(enemy_rarity_score - player_rarity_score, 0);
        var rarity_key = (rarity_index < 0) ? ("rarityneg" + (-1 * rarity_index)) : ("rarity" + rarity_index);
        
        if (window.arena_data.rarity_points[rarity_key] !== "undefined")
        {
            return window.arena_data.rarity_points[rarity_key];
        }
    }
    
    displayHTML("Warning: Invalid rarity found. Please report immediately " +
                "if you see this message.", "content_messages");    
    return window.arena_data.DEFAULT_RETURN_VALUE;
 }
 
 function getLevelScore(challenger_level, opponent_level)
 {
    var difference = Math.min(Math.max(challenger_level - opponent_level, window.arena_data.MIN_LEVEL_SCORE), 
    window.arena_data.MAX_LEVEL_SCORE);
    
    var level_key = (difference < 0) ? ("levelneg" + (-1 * difference)) : ("level" + difference);
    
    if (window.arena_data.level_points[level_key] !== "undefined")
    {
        return window.arena_data.level_points[level_key];
    }
    
    return window.arena_data.DEFAULT_RETURN_VALUE;
 }

/* 
 * Validation functions
 */
 
function basListContainsElements(list, required_elements)
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

/*
 * List manipulation functions
 */

 function basMergeSort (values, type)
{
    if (values && values.length > 1) // List requires sorting
    {            
        var split_num = parseInt(values.length / 2);
        var remainder = values.length % 2;
        var left  = [];
        var right = [];
        
        for (var i = 0; i < split_num; i++)
        {
            left.push(values[i]);
            right.push(values[i + split_num]);
        }
        
        if (remainder > 0) // Odd number of values
        {
            right.push(values[values.length - 1]);
        }
        
        left = basMergeSort(left, type);
        right = basMergeSort(right, type);
        
        values = basMerge(values, left, right, type);
    }
        
    return values;    
}

function basMerge(values, left, right, type)
{
    var n = 0; // index of values
    var l = 0; // index of left
    var r = 0; // index of right
    
    while (l < left.length && r < right.length)
    {
        if (basCompareValues(left[l], right[r], type) <= 0) // left < right
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
 
 function basCompareValues (first_val, second_val, type)
{        
    if (type === "alphabetical")
    {
        return basComparePrimitives(first_val, second_val);
    }
    else if (type == "level_scores")
    {
        return basCompareLevelScores(first_val, second_val);
    }
    else if (type === "dragon_scores")
    {
        return basCompareDragonScores(first_val, second_val);
    }
    
    return 0;
}

function basComparePrimitives(a,b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

function basCompareLevelScores(first_val, second_val)
{
    return -1 * basComparePrimitives(first_val, second_val);
}

function basCompareDragonScores(first_val, second_val)
{
    if (first_val instanceof DragonScores && second_val instanceof DragonScores)
    {
        var first_scores = first_val.total_scores;
        var second_scores = second_val.total_scores;
        
        return -1 * basComparePrimitives(first_scores[0], second_scores[0]);
    }
    else
    {
        displayHTML("Warning: Invalid types for comparison.  The compared objects " + 
        "should both be instances of DragonScores.", "content_messages");
    }

    return 0;
}


/*
 * Output rendering code
 */
 
function renderDragonScores(handler, dragon_scores_list, min_level, max_level)
{
    var header_color = "#8EC3CD";
    var header_pieces = [];
    header_pieces.push(handler.wrapHeader("Dragon", header_color, 1, 100));
    
    for (var i = max_level; i >= min_level; i--)
    {
        header_pieces.push(handler.wrapHeader("Lv. " + i, header_color, 1, 50));
    }
    
    var headers = handler.joinRows(header_pieces);
    
    var rows = handler.joinRows(
        dragon_scores_list.map(function(dragon_scores) {
            var dragon_name = window.arena_data.breeds[dragon_scores.challenger].name;
            var total_scores = dragon_scores.total_scores;
            
            var cells = [];
            cells.push(handler.wrapCell(handler.renderArenaDragonLink(dragon_name), "left"));
            
            for (var index in total_scores)
            {
                cells.push(handler.wrapCell(getCritRate(total_scores[index]) + "%", "center"));
            }                        
            
            return handler.wrapRow(handler.joinCells(cells));
        })
    );   
    
    return handler.wrapBorderedTable(handler.joinRows([headers, rows]));
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
};

HtmlOutput.prototype.renderArenaDragonLink = function (breed_name) {    
    return this.toUrl(window.arena_data.site_page_source + breed_name + " Dragon", breed_name, breed_name + " Dragon");
};

HtmlOutput.prototype.wrapBorderedTable = function (content)
{    
    var table_style = "background-color:#CCCCCC; border-collapse: collapse;";
    return "<table border=\"1\" cellPadding=\"10\" style=\"" + table_style + "\">"+content+"</table>";
};

HtmlOutput.prototype.wrapHeader = function (header, color, span, width)
{
    var header_style = "width:" + width + "px; height:50px; background-color:" + color + "; text-align: center;";
    return "<th style=\""+header_style+"\" colspan=\"" + span + "\">"+header+"</th>";
};

HtmlOutput.prototype.wrapCell = function (cell, align)
{
    var cell_style = "text-align:" + align + ";";
    
    return "<td style=\"" +cell_style+"\">"+cell+"</td>";
};

HtmlOutput.prototype.wrapRow = function (row)
{
    return "<tr>"+row+"</tr>";
};

HtmlOutput.prototype.joinRows = function (rows)
{
    return rows.join('');
};

HtmlOutput.prototype.joinCells = function (cells)
{
    return cells.join('');
};

HtmlOutput.prototype.output = function (value)
{   
    document.getElementById(this.outputElementId).innerHTML = value;
};

 /*
  * Custom data structures
  */
 
 function DragonScores(challenger, type_score, rarity_score, level_scores)
 {
    this.challenger = challenger;
    this.type_score = type_score;
    this.rarity_score = rarity_score;
    this.level_scores = basMergeSort(level_scores, "level_scores");
    
    this.total_scores = [];
    
    for (var i = 0; i < this.level_scores.length; i++)
    {
        this.total_scores.push(this.type_score + this.rarity_score + this.level_scores[i]);
    }
 }