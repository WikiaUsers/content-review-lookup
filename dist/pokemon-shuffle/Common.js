/* Any JavaScript here will be loaded for all users on every page load. */
/* ############################################# */
/* ##          CUSTOM EDIT BUTTONS            ## */
/* ############################################# */
/* All credit for this code goes to Pokémon Wiki */
 
if((wgAction == "edit" || wgAction == "submit") && mwCustomEditButtons)
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/pokemon/images/4/42/Accent_Button.png",
		"speedTip": "Insert Pokémon",
		"tagOpen": "Pokémon",
		"tagClose": "",
		"sampleText": ""
	};
 
if(mwCustomEditButtons)
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		 "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		 "speedTip": "Redirect",
		 "tagOpen": "#REDIRECT [[",
		 "tagClose": "]]",
		 "sampleText": "Insert text"
	};
/* User Tags script */
window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor of the Month', order:-1/0},
		featured: { u:'Featured' },
        },
	oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});


/* ############################################# */
/* ##               TOOLTIPS                  ## */
/* ############################################# */

var tooltips_list = [
    {
        classname: 'pokemon-tooltip',
        parse: '{' + '{#ifeq:{' + '{Pokémon Data/Dex|name=<#pokemon#>}}|???|{' + '{#ifeq:{' + '{Pokémon Data/Dex With Modifier|name=<#pokemon#>}}|???|{' + '{#ifexist:Template:Pokémon Tooltip/<#pokemon#>|{' + '{Pokémon Tooltip/<#pokemon#>}}|<div align="center" style="width:128px"><#pokemon#><br>[[File:<#pokemon#>.png|64px]]</div>}}|{' + '{Pokémon Tooltip v2|pokemon=<#pokemon#>|modifier=<#modifier#>}}}}|{' + '{Pokémon Tooltip v2|pokemon=<#pokemon#>|modifier=<#modifier#>}}}}',
        delay: 250,
    },
    {
        classname: 'other-tooltip',
        parse: '{' + '{#ifexist:Template:Pokémon Tooltip/<#name#>|{' + '{Pokémon Tooltip/<#name#>}}|<div align="center" style="width:128px"><#name#><br>[[File:<#name#>.png|64px]]</div>}}',
        delay: 250,
    },
    {
        classname: 'support-pokemon-tooltip',
        parse: '{' + '{Support_Pokémon_Tooltip|pokemon=<#pokemon#>|modifier=<#modifier#>|megamodifier=<#megamodifier#>|level=<#level#>|SL=<#sl#>|RML=<#rml#>|MSU=<#msu#>|SS=<#ss#>|mega=<#mega#>}}',
        delay: 250,
    },
    {
        classname: 'skill-tooltip',
        parse: '{' + '{#ifeq:{' + '{Skill Data/ID|name=<#skill#>}}|???|No such skill|{' + '{Skill Tooltip|skill=<#skill#>}}}}',
        delay: 250,
    },
    {
        classname: 'page-tooltip',
        parse: '{' + '{:<#page#>}}',
        delay: 250,
    },
    {
        classname: 'type-tooltip',
        parse: '{' + '{Type Tooltip|type=<#type#>}}',
        delay: 250,
    },
    {
        classname: 'pokemon-tooltip has-redlinks',
        delay:250,
    }
];

var tooltips_config = {
    offsetX: 10,
    offsetY: 10,
    waitForImages: false,
};

/* ############################################# */
/* ##                CALCULATOR               ## */
/* ############################################# */
//This function clicks the Submit Pokemon button when enter is pressed
function clicksubmitpokemon(e) {
    if (e.keyCode == 13) {
        document.getElementById("submitpokemon").click();
        return false;
    }
    return true;
}

//This function grabs a list of pokemon and creates a list of autofill options for the pokemon input field
function getpokemonlist() {
    $.get(wgScript,
        {title: 'Template:PokemonList',
         action: 'raw',
         ctype: 'text/plain'},
        function(data) {
            var pokemonlist = data.split(",");
            var optionshtml = "";
            for (i = 0; i < pokemonlist.length; i++) {
                optionshtml += "<option value='" + pokemonlist[i] + "'>";
            }
            document.getElementById("pokemonlist").innerHTML = optionshtml;
        }
    );
}

function getskilllist() {
    $.get(wgScript,
        {title: 'Template:SkillList',
         action: 'raw',
         ctype: 'text/plain'},
        function(data) {
            var skilllist = data.split(",");
            var optionshtml = "";
            for (i = 0; i < skilllist.length; i++) {
                optionshtml += "<option value='" + skilllist[i] + "'>";
            }
            document.getElementById("skilllist").innerHTML = optionshtml;
        }
    );
}

//This function updates the list of autofill options with possible modifiers for the inputted pokemon
function updatemodifierlist() {
    var inputpokemon = document.getElementById('inputpokemon').value;
    //gonna try to parse some wikitext using javascript
    var example = "{{ModifierList|name=" + inputpokemon + "}}";
    $.getJSON('http://pkmnshuffle.wikia.com/api.php?format=json&action=parse&disablepp=true&text=' + example,
        function(data) {
            var modifierstring = data.parse.text["*"];
            modifierstring = modifierstring.replace("<p>", "");
            modifierstring = modifierstring.replace("</p>", "");
            modifierlist = modifierstring.split(",");
            var optionshtml = "";
            for (i = 0; i < modifierlist.length; i++) {
                optionshtml += '<option value="' + modifierlist[i] + '">';
            }
            document.getElementById("modifierlist").innerHTML = optionshtml;
        }
    );
}

//Given an index of "{{" in a string, finds the matching "}}". Returns -1 if the index doesn't point to a "{{", and returns the length of the substring if a matching "}}" wasn't found.
function findmatchingbrackets(string, startindex) {
    snippet = string.substr(startindex);
    var current = snippet.substr(0, 2);
    if (current != "{{") {
        return -1;
    }
    var currentindex  = 2;
    var numopen = 1;
    while (numopen != 0 && currentindex < snippet.length) {
        current = snippet.substr(currentindex, 2);
        if (current == "{{") {
            numopen += 1;
            currentindex += 2;
        }
        else if (current == "}}") {
            numopen -= 1;
            currentindex += 2;
        }
        else {
            currentindex += 1;
        }
    }
    return currentindex + startindex;
}

switch (mw.config.get('wgPageName')) {
    case 'Template:Test2':
        //HTML code for the Pokemon forms
        var PDRinnerhtml = ['Pokémon: <input id="inputpokemon" list="pokemonlist" onkeypress="return clicksubmitpokemon(event);"><br>Modifier: <input id="inputmodifier" list="modifierlist" onfocus="updatemodifierlist();" onkeypress="return clicksubmitpokemon(event);"><br><button id="submitpokemon" type="button" onclick="submitpokemon()">Submit</button><datalist id="pokemonlist"></datalist><datalist id="modifierlist"></datalist>'].join('');
        
        //HTML code for the Pokemon data output
        var PDRoutputinnerhtml = ['<div id="pokemonoutput"></div>'].join('');
        
        //HTML code for the Skill forms
        var SDRinnerhtml = ['Skill: <input id="inputskill" list="skilllist" onkeypress="return clicksubmitskill(event);"><br><select id="dropdownskill" onchange="autofillinput();"></select><br><button id="submitskill" type="button" onclick="submitskill()">Submit</button><datalist id="skilllist"></datalist>'].join('');
        
        //HTML code for the Skill data output
        var SDRoutputinnerhtml = ['<div id="skilloutput"></div>'].join('');
        
        //Inject the HTML code for Pokemon forms
        var pokemondataretriever = document.createElement('div');
        pokemondataretriever.style.display = 'inline-block';
        pokemondataretriever.style.width = '50%';
        pokemondataretriever.style.verticalAlign = 'top';
        pokemondataretriever.innerHTML = PDRinnerhtml;
        document.getElementById('form').appendChild(pokemondataretriever);
        
        //Inject the HTML code for Skill forms
        var skilldataretriever = document.createElement('div');
        skilldataretriever.style.display = 'inline-block';
        skilldataretriever.style.width = '50%';
        skilldataretriever.style.verticalAlign = 'top';
        skilldataretriever.innerHTML = SDRinnerhtml;
        document.getElementById('form').appendChild(skilldataretriever);
        
        //Inject the HTML code for Pokemon data output
        var PDRoutput = document.createElement('div');
        PDRoutput.style.display = 'inline-block';
        PDRoutput.style.width = '50%';
        PDRoutput.style.verticalAlign = 'top';
        PDRoutput.innerHTML = PDRoutputinnerhtml;
        document.getElementById('form').appendChild(PDRoutput);
        
        //Inject the HTML code for Skill data output
        var SDRoutput = document.createElement('div');
        SDRoutput.style.display = 'inline-block';
        SDRoutput.style.width = '50%';
        SDRoutput.style.verticalAlign = 'top';
        SDRoutput.innerHTML = SDRoutputinnerhtml;
        document.getElementById('form').appendChild(SDRoutput);
        
        //This function clicks the Submit Skill button when enter is pressed
        function clicksubmitskill(e) {
            if (e.keyCode == 13) {
                document.getElementById("submitskill").click();
                return false;
            }
            return true;
        }
        
        //This function autofills the skill form if an option is selected from the skill dropdown menu
        function autofillinput() {
	        var dropdownskill = document.getElementById("dropdownskill");
            var value = dropdownskill.options[dropdownskill.selectedIndex].value;
            document.getElementById("inputskill").value = value;
        }
        
        //This function attempts to retrieve and output data using the input Pokemon
        function submitpokemon() {
            //Retrieve the input
            var inputpokemon = document.getElementById('inputpokemon').value;
            var inputmodifier = document.getElementById('inputmodifier').value;
            var name = inputpokemon;
            if (inputmodifier !== null && inputmodifier !== '') name = name.concat(' (').concat(inputmodifier).concat(')');
            
            //Placeholder text while the rest of the function is working
            document.getElementById('pokemonoutput').innerHTML = 'Looking up '.concat(name).concat('... (this text will stay if lookup failed)');
            
            //Get request to a page on the Wikia
            $.get(wgScript,
                {title: name,
                 action: 'raw',
                 ctype: 'text/plain'},
                function(data) {
                    //Don't even continue if the page isn't a Pokemon page
                    if (data.indexOf("[[Category:Pokémon]]") == -1) return;
                    
                    //Parse the page for data
                    var name = data.match(/name \= [a-z\s0-9+\-\(\)]+/i);
                    if (name !== null) name = name.toString().replace("name = ", "");
                    
                    var dex = data.match(/no \= [0-9]+/i);
                    if (dex !== null) dex = dex.toString().replace("no = ", "");
                    else dex = "000";
                    
                    var type = data.match(/type \= [a-z]+/i);
                    if (type !== null) type = type.toString().replace("type = ", "");
                    else {
    	                type = data.match(/type \= \[\[File:Type [a-z]+\.png\]\]/i);
                        if (type !== null) type = type.toString().replace("type = [[File:Type ", "").replace(".png]]", "");
                        else type = "Unknown";
                    }
                    
                    var bp = data.match(/atk \= [0-9]+/i);
                    if (bp !== null) bp = bp.toString().replace("atk = ", "");
                    else bp = "0";
                    
                    var rml = data.match(/RML \= [0-9]+/i);
                    if (rml !== null) rml = rml.toString().replace("RML = ", "");
                    else rml = "0";
                    
                    var skill = data.match(/ability \= [a-z\s0-9+\-]+/i);
                    if (skill !== null) skill = skill.toString().replace("ability = ", "");
                    else skill = "Unknown";
                    
                    var ss1 = data.match(/SS1 \= [a-z\s0-9+\-]+/i);
                    if (ss1 !== null) ss1 = ss1.toString().replace("SS1 = ", "");
                    var ss2 = data.match(/SS2 \= [a-z\s0-9+\-]+/i);
                    if (ss2 !== null) ss2 = ss2.toString().replace("SS2 = ", "");
                    var ss3 = data.match(/SS3 \= [a-z\s0-9+\-]+/i);
                    if (ss3 !== null) ss3 = ss3.toString().replace("SS3 = ", "");
                    var ss4 = data.match(/SS4 \= [a-z\s0-9+\-]+/i);
                    if (ss4 !== null) ss4 = ss4.toString().replace("SS4 = ", "");
                    
                    //Construct the HTML code to inject
                    var innerhtml2 = "<div id='infobox'></div>";
                    innerhtml2 = innerhtml2 + "<br><b>Name</b>: " + name;
                    innerhtml2 = innerhtml2 + "<br><b>Dex No.</b>: " + dex;
                    innerhtml2 = innerhtml2 + "<br><b>Type</b>: " + type;
                    innerhtml2 = innerhtml2 + "<br><b>Base Power</b>: " + bp;
                    innerhtml2 = innerhtml2 + "<br><b>RML</b>: " + rml;
                    innerhtml2 = innerhtml2 + "<br><b>Skill</b>: " + skill;
                    if (ss1 !== null) innerhtml2 = innerhtml2 + "<br><b>SS1</b>: " + ss1;
                    if (ss2 !== null) innerhtml2 = innerhtml2 + "<br><b>SS2</b>: " + ss2;
                    if (ss3 !== null) innerhtml2 = innerhtml2 + "<br><b>SS3</b>: " + ss3;
                    if (ss4 !== null) innerhtml2 = innerhtml2 + "<br><b>SS4</b>: " + ss4;
                    
                    innerhtml2 += "<br>If the data shown here doesn't match the data shown in the Infobox above, please report it to me, thanks!";
                    
                    //Inject the HTML code!
                    document.getElementById('pokemonoutput').innerHTML = innerhtml2;
                    
                    //Update dropdown menu with pokemon's skills
                    var innerhtml3 = "<option></option><option value='" + skill + "'>" + skill + "</option>";
                    if (ss1 !== null) innerhtml3 = innerhtml3 + "<option value='" + ss1 + "'>" + ss1 + "</option>";
                    if (ss2 !== null) innerhtml3 = innerhtml3 + "<option value='" + ss2 + "'>" + ss2 + "</option>";
                    if (ss3 !== null) innerhtml3 = innerhtml3 + "<option value='" + ss3 + "'>" + ss3 + "</option>";
                    if (ss4 !== null) innerhtml3 = innerhtml3 + "<option value='" + ss4 + "'>" + ss4 + "</option>";
                    document.getElementById('dropdownskill').innerHTML = innerhtml3;
                }
            );
            
            //gonna try to parse some wikitext using javascript
            var example = "{{Pokémon_Tooltip_v2|pokemon=" + inputpokemon + "|modifier=" + inputmodifier + "}}";
            $.getJSON('http://pkmnshuffle.wikia.com/api.php?format=json&action=parse&text=' + example,
                function(data) {
                    var innerhtml4 = data.parse.text["*"];
                    document.getElementById('infobox').innerHTML = innerhtml4;
                }
            );
        }
        
        //This function attempts to retrieve and output data using the input Skill
        function submitskill() {
            //Retrieve the input
            var inputskill = document.getElementById('inputskill').value;
            
            //Placeholder text while the rest of the function is working
            document.getElementById('skilloutput').innerHTML = 'Looking up '.concat(inputskill).concat('... (this text will stay if lookup failed)');
            
            //Get request to a page on the Wikia
            $.get(wgScript,
                {title: inputskill,
                 action: 'raw',
                 ctype: 'text/plain'},
                function(data) {
                    //Don't even continue if the page isn't a Skill page
                    if (data.indexOf("[[Category:Skill]]") == -1) return;
                    
                    //Parse the page for data
                    var name = data.match(/name \= [a-z\s0-9+\-\(\),]+/i);
                    if (name !== null) name = name.toString().replace("name = ", "");
                    
                    var desc = data.match(/desc \= [a-z\s0-9+\-\(\)'é,]+/i);
                    if (desc !== null) desc = desc.toString().replace("desc = ", "");
                    var notes = data.match(/notes \= [a-z\s0-9+\-\(\)'é,\[\]\=÷×%<>:\/\.]+/i);
                    if (notes !== null) notes = notes.toString().replace("notes = ", "");
    
                    var rate3 = data.match(/rate3 \= [0-9]+/i);
                    if (rate3 !== null) rate3 = rate3.toString().replace("rate3 = ", "");
                    var rate4 = data.match(/rate4 \= [0-9]+/i);
                    if (rate4 !== null) rate4 = rate4.toString().replace("rate4 = ", "");
                    var rate5 = data.match(/rate5 \= [0-9]+/i);
                    if (rate5 !== null) rate5 = rate5.toString().replace("rate5 = ", "");
                    
                    var rates = rate3 + "% / " + rate4 + "% / " + rate5 + "%";
    
                    var damage = data.match(/damage \= [0-9+\.]+/i);
                    if (damage !== null) damage = damage.toString().replace("damage = ", "");
                    
                    var ratebonus2 = data.match(/ratebonus2 \= [0-9]+/i);
                    if (ratebonus2 !== null) ratebonus2 = ratebonus2.toString().replace("ratebonus2 = ", "");
                    var ratebonus3 = data.match(/ratebonus3 \= [0-9]+/i);
                    if (ratebonus3 !== null) ratebonus3 = ratebonus3.toString().replace("ratebonus3 = ", "");
                    var ratebonus4 = data.match(/ratebonus4 \= [0-9]+/i);
                    if (ratebonus4 !== null) ratebonus4 = ratebonus4.toString().replace("ratebonus4 = ", "");
                    var ratebonus5 = data.match(/ratebonus5 \= [0-9]+/i);
                    if (ratebonus5 !== null) ratebonus5 = ratebonus5.toString().replace("ratebonus5 = ", "");
    
                    var damagebonus2 = data.match(/damagebonus2 \= [0-9\.]+/i);
                    if (damagebonus2 !== null) damagebonus2 = damagebonus2.toString().replace("damagebonus2 = ", "");
                    var damagebonus3 = data.match(/damagebonus3 \= [0-9\.]+/i);
                    if (damagebonus3 !== null) damagebonus3 = damagebonus3.toString().replace("damagebonus3 = ", "");
                    var damagebonus4 = data.match(/damagebonus4 \= [0-9\.]+/i);
                    if (damagebonus4 !== null) damagebonus4 = damagebonus4.toString().replace("damagebonus4 = ", "");
                    var damagebonus5 = data.match(/damagebonus5 \= [0-9\.]+/i);
                    if (damagebonus5 !== null) damagebonus5 = damagebonus5.toString().replace("damagebonus5 = ", "");
                    
                    var SP1 = data.match(/SP1 \= [0-9]+/i);
                    if (SP1 !== null) SP1 = SP1.toString().replace("SP1 = ", "");
                    var SP2 = data.match(/SP2 \= [0-9]+/i);
                    if (SP2 !== null) SP2 = SP2.toString().replace("SP2 = ", "");
                    var SP3 = data.match(/SP3 \= [0-9]+/i);
                    if (SP3 !== null) SP3 = SP3.toString().replace("SP3 = ", "");
                    var SP4 = data.match(/SP4 \= [0-9]+/i);
                    if (SP4 !== null) SP4 = SP4.toString().replace("SP4 = ", "");
    
                    var skillpoints = SP1 + " / " + SP2 + " / " + SP3 + " / " + SP4 + " (Total: ";
                    skillpoints = skillpoints + (parseInt(SP1) + parseInt(SP2) + parseInt(SP3) + parseInt(SP4)) + ")";
    
                    var ratebonuses = "";
                    //Construct the string for displaying bonus activation rates
                    if (ratebonus2 !== null) {
                        //Unchanged SL1 rates
    	                ratebonuses = "<div>" + rates;
        
                        //Calculate the increased activation rates
                        //0 rate stays 0, limit rate up to 100
                        if (parseInt(rate3) != 0) {
        	                var rate3_2 = Math.min(parseInt(rate3) + parseInt(ratebonus2), 100);
                            var rate3_3 = Math.min(parseInt(rate3) + parseInt(ratebonus3), 100);
                            var rate3_4 = Math.min(parseInt(rate3) + parseInt(ratebonus4), 100);
                            var rate3_5 = Math.min(parseInt(rate3) + parseInt(ratebonus5), 100);
                        }
                        else { var rate3_2 = 0; var rate3_3 = 0; var rate3_4 = 0; var rate3_5 = 0; }
                        if (parseInt(rate4) != 0) {
        	                var rate4_2 = Math.min(parseInt(rate4) + parseInt(ratebonus2), 100);
                            var rate4_3 = Math.min(parseInt(rate4) + parseInt(ratebonus3), 100);
                            var rate4_4 = Math.min(parseInt(rate4) + parseInt(ratebonus4), 100);
                            var rate4_5 = Math.min(parseInt(rate4) + parseInt(ratebonus5), 100);
                        }
                        else { var rate4_2 = 0; var rate4_3 = 0; var rate4_4 = 0; var rate4_5 = 0; }
                        if (parseInt(rate5) != 0) {
        	                var rate5_2 = Math.min(parseInt(rate5) + parseInt(ratebonus2), 100);
                            var rate5_3 = Math.min(parseInt(rate5) + parseInt(ratebonus3), 100);
                            var rate5_4 = Math.min(parseInt(rate5) + parseInt(ratebonus4), 100);
                            var rate5_5 = Math.min(parseInt(rate5) + parseInt(ratebonus5), 100);
                        }
                        else { var rate5_2 = 0; var rate5_3 = 0; var rate5_4 = 0; var rate5_5 = 0; }
        
                        //Finish constructing the string
                        ratebonuses = ratebonuses + "<br>" + rate3_2 + "% / " + rate4_2 + "% / " + rate5_2 + "%";
                        ratebonuses = ratebonuses + "<br>" + rate3_3 + "% / " + rate4_3 + "% / " + rate5_3 + "%";
                        ratebonuses = ratebonuses + "<br>" + rate3_4 + "% / " + rate4_4 + "% / " + rate5_4 + "%";
                        ratebonuses = ratebonuses + "<br>" + rate3_5 + "% / " + rate4_5 + "% / " + rate5_5 + "%";
                        ratebonuses = ratebonuses + "</div>";
                    }
    
                    var damagebonuses = "";
                    //Construct the string for displaying bonus damage
                    if (damagebonus2 !== null) {
    	                //Unchanged SL1 damage
                        damagebonuses = "x" + damage;
                        
                        //Calculate bonus damages, rounding to two decimal places
                        var damage2 = Math.round(parseFloat(damage) * parseFloat(damagebonus2) * 100) / 100;
                        var damage3 = Math.round(parseFloat(damage) * parseFloat(damagebonus3) * 100) / 100;
                        var damage4 = Math.round(parseFloat(damage) * parseFloat(damagebonus4) * 100) / 100;
                        var damage5 = Math.round(parseFloat(damage) * parseFloat(damagebonus5) * 100) / 100;
                        
                        //Finish constructing the string
                        damagebonuses = damagebonuses + " / x" + damage2;
                        damagebonuses = damagebonuses + " / x" + damage3;
                        damagebonuses = damagebonuses + " / x" + damage4;
                        damagebonuses = damagebonuses + " / x" + damage5;
                    }
    
                    //Construct the HTML code to inject
                    var innerhtml2 = "<b>Name</b>: " + name;
                    innerhtml2 = innerhtml2 + "<br><b>Description</b>: " + desc;
                    if (notes !== null) innerhtml2 = innerhtml2 + "<br><b>Notes</b>: " + notes;
                    innerhtml2 = innerhtml2 + "<br><b>Activation Rates</b>: " + rates;
                    innerhtml2 = innerhtml2 + "<br><b>Damage Multiplier</b>: x" + damage;
                    if (ratebonuses != "") innerhtml2 = innerhtml2 + "<br><b>Activation Rate Bonuses</b>:" + ratebonuses;
                    if (damagebonuses != "") innerhtml2 = innerhtml2 + "<br><b>Damage Bonuses</b>: " + damagebonuses;
                    innerhtml2 = innerhtml2 + "<br><b>Skill Points</b>: " + skillpoints;
    
                    //Finally, inject HTML code!
                    document.getElementById('skilloutput').innerHTML = innerhtml2;
                }
            );
        }
        
        getpokemonlist();
        getskilllist();
    break;
    case 'Template:ProfileCardCustomizer':
        //HTML code for the input forms
        var inputinnerhtml = '<div id="input">Pokémon: <input id="inputpokemon" list="pokemonlist" onkeypress="return clicksubmitpokemon(event);"><br>Modifier: <input id="inputmodifier" list="modifierlist" onfocus="updatemodifierlist();" onkeypress="return clicksubmitpokemon(event);"><br>Mega?: <input id="inputmega" type="checkbox"><br>Mega Modifier: <select id="inputmegamodifier"><option></option><option value="X">X</option><option value="Y">Y</option></select><br>Border: <select id="inputborder"><option value="1">Level 1</option><option value="2">Level 5</option><option value="3">Level 10</option><option value="4">Level 15</option><option value="5">Level 20</option><option value="6">Level 30</option></select><br>Profile Card?: <input id="inputprofilecard" type="checkbox" onchange="togglesupports();"><br>Profile Card Color: <select id="inputprofilecardcolor"><option value="White">White</option><option value="Orange">Orange</option><option value="Pink">Pink</option><option value="Red">Red</option><option value="Bronze">Bronze</option><option value="Silver">Silver</option><option value="Gold">Gold</option><option value="Platinum">Platinum</option><option value="Rainbow">Rainbow</option><option value="Black">Black</option></select><br><button id="submitpokemon" type="button" onclick="submitpokemon2()">Submit</button><datalist id="pokemonlist"></datalist><datalist id="modifierlist"></datalist></div>';
        
        var input2innerhtml = '<div id="input2" style="display:none;">Support 1: <input id="inputsupport1" onkeypress="return clicksubmitpokemon(event);"><br>Support 2: <input id="inputsupport2" onkeypress="return clicksubmitpokemon(event);"><br>Support 3: <input id="inputsupport3" onkeypress="return clicksubmitpokemon(event);"><br>Support 4: <input id="inputsupport4" onkeypress="return clicksubmitpokemon(event);"></div>';
        
        //HTML code for the output
        var outputinnerhtml = '<div id="output"></div>';
        
        var output2innerhtml = '<div id="output2" style="display:none;"><div id="inputnickname">Nickname</div><div id="inputplays">99999</div><div id="inputpokemoncaught">999</div><div id="inputmainscleared">999</div><div id="inputmaxcombo">999</div><div id="inputhighscore">9999999</div><div id="inputsmrecord">99</div></div>';
        
        //Inject the HTML code for the input forms
        var input = document.createElement('div');
        input.style.display = 'inline-block';
        input.style.width = '33%';
        input.style.verticalAlign = 'top';
        input.innerHTML = inputinnerhtml;
        document.getElementById('form').appendChild(input);
        
        var input2 = document.createElement('div');
        input2.style.display = 'inline-block';
        input2.style.width = '33%';
        input2.style.verticalAlign = 'top';
        input2.innerHTML = input2innerhtml;
        document.getElementById('form').appendChild(input2);
        
        //Inject the HTML code for the output
        var output = document.createElement('div');
        output.style.display = 'inline-block';
        output.style.width = '34%';
        output.style.verticalAlign = 'top';
        output.innerHTML = outputinnerhtml;
        document.getElementById('form').appendChild(output);
        
        var output2 = document.createElement('div');
        output2.style.display = 'inline-block';
        output2.style.width = '100%';
        output2.style.verticalAlign = 'top';
        output2.innerHTML = output2innerhtml;
        document.getElementById('form').appendChild(output2);
        
        var nickname = "Nickname";
        var plays = 99999;
        var pokemoncaught = 999;
        var mainscleared = 999;
        var maxcombo = 999;
        var highscore = 9999999;
        var smrecord = 99;
        
        //shows/hides the second set of input forms
        function togglesupports() {
            if (document.getElementById("inputprofilecard").checked) {
                document.getElementById("input2").style.display = "inline";
            }
            else {
                document.getElementById("input2").style.display = "none";
            }
        }
        
        //This function attempts to retrieve an image of the inputted pokemon and also places a specified border on it
        function submitpokemon2() {
            //Retrieve the input
            var inputpokemon = document.getElementById('inputpokemon').value;
            var inputmodifier = document.getElementById('inputmodifier').value;
            var inputmega = document.getElementById('inputmega').checked;
            var inputmegamodifier = document.getElementById('inputmegamodifier').value;
            var inputborder = document.getElementById('inputborder').value;
            var inputprofilecard = document.getElementById('inputprofilecard').checked;
            var inputprofilecardcolor = document.getElementById('inputprofilecardcolor').value;
            var inputsupports = [];
            for (var i = 0; i < 4; i++) {
                inputsupport = document.getElementById('inputsupport'.concat(i+1)).value;
                if (inputsupport != "") {
                    inputsupports[i] = inputsupport;
                }
                else {
                    inputsupports[i] = "EmptySupport";
                }
            }
            
            var name = inputpokemon;
            if (inputmega) {
                name = "Mega ".concat(name);
                if (inputmegamodifier != "") {
                    name = name.concat(" " + inputmegamodifier);
                }
            }
            if (inputmodifier !== null && inputmodifier !== '') name = name.concat(' (').concat(inputmodifier).concat(')');
            
            nickname = document.getElementById('inputnickname').innerHTML;
            plays = document.getElementById('inputplays').innerHTML;
            pokemoncaught = document.getElementById('inputpokemoncaught').innerHTML;
            mainscleared = document.getElementById('inputmainscleared').innerHTML;
            maxcombo = document.getElementById('inputmaxcombo').innerHTML;
            highscore = document.getElementById('inputhighscore').innerHTML;
            smrecord = document.getElementById('inputsmrecord').innerHTML;
            
            //Placeholder text while the rest of the function is working
            document.getElementById('output').innerHTML = 'Loading... (this text will stay if the process failed)';
            
            //gonna try to parse some wikitext using javascript
            var example = '<div style="display:inline-block; position:relative; height:160px; width:160px;"><div style="position:absolute;">[[File:IconBorder' + inputborder + '.png|160px|link=]]</div><div style="position:absolute; top:26px; left:26px;">[[File:' + name + '.png|108px|link=]]</div></div>';
            
            if (inputprofilecard) {
                var black = "";
                if (inputprofilecardcolor == "Black") {
                    black = "black";
                }
                example = '<div class="profilecard' + black + '" style="display:inline-block; position:relative; height:640px; width:400px;"><div style="position:absolute;">[[File:ProfileCard' + inputprofilecardcolor + '.png|640px|link=]]</div><div style="position:absolute; top:64px; left:64px;">[[File:IconBorder' + inputborder + '.png|100px|link=]]</div><div style="position:absolute; top:81px; left:80px;">[[File:' + name + '.png|67px|link=]]</div><div style="position:absolute; top:90px; left:210px;">[[File:' + inputsupports[0] + '.png|67px|link=]]</div><div style="position:absolute; top:90px; left:290px;">[[File:' + inputsupports[1] + '.png|67px|link=]]</div><div style="position:absolute; top:90px; left:370px;">[[File:' + inputsupports[2] + '.png|67px|link=]]</div><div style="position:absolute; top:90px; left:450px;">[[File:' + inputsupports[3] + '.png|67px|link=]]</div><div class="profilecardnickname' + black + '" id="nickname" style="position:absolute; top:60px; left:205px; width:320px; text-align:center;"></div><div style="position:absolute; top:178px; left:66px;">Plays:</div><div style="position:absolute; top:209px; left:66px;">Pokémon caught:</div><div style="position:absolute; top:240px; left:66px;">Main stage reached:</div><div style="position:absolute; top:271px; left:66px;">Max. combo:</div><div style="position:absolute; top:302px; left:66px;">High score:</div><div style="position:absolute; top:333px; left:66px;">Best Survival Mode record:</div><div id="plays" style="position:absolute; top:178px; left:408px; width:160px; text-align:right;"></div><div id="pokemoncaught" style="position:absolute; top:209px; left:408px; width:160px; text-align:right;"></div><div id="mainscleared" style="position:absolute; top:240px; left:408px; width:160px; text-align:right;"></div><div id="maxcombo" style="position:absolute; top:271px; left:408px; width:160px; text-align:right;"></div><div id="highscore" style="position:absolute; top:302px; left:408px; width:160px; text-align:right;"></div><div id="smrecord" style="position:absolute; top:333px; left:408px; width:160px; text-align:right;"></div></div>';
            }
            
            $.getJSON('http://pkmnshuffle.wikia.com/api.php?format=json&action=parse&disablepp=true&text=' + example,
                function(data) {
                    var innerhtml = data.parse.text["*"];
                    innerhtml = innerhtml.replace("<p>", "");
                    innerhtml = innerhtml.replace("</p>", "");
                    
                    if (inputprofilecard) {
                        document.getElementById("output").innerHTML = "";
                        document.getElementById("output2").innerHTML = innerhtml;
                        document.getElementById("nickname").innerHTML = "<div id='inputnickname' contenteditable='true' spellcheck='false'>" + nickname + "</div>";
                        document.getElementById("plays").innerHTML = "<div id='inputplays' contenteditable='true' spellcheck='false'>" + plays + "</div>";
                        document.getElementById("pokemoncaught").innerHTML = "<div id='inputpokemoncaught' contenteditable='true' spellcheck='false'>" + pokemoncaught + "</div>";
                        document.getElementById("mainscleared").innerHTML = "<div id='inputmainscleared' contenteditable='true' spellcheck='false'>" + mainscleared + "</div>";
                        document.getElementById("maxcombo").innerHTML = "<div id='inputmaxcombo' contenteditable='true' spellcheck='false'>" + maxcombo + "</div>";
                        document.getElementById("highscore").innerHTML = "<div id='inputhighscore' contenteditable='true' spellcheck='false'>" + highscore + "</div>";
                        document.getElementById("smrecord").innerHTML = "<div id='inputsmrecord' contenteditable='true' spellcheck='false'>" + smrecord + "</div>";
                        document.getElementById("output2").style.display = "inline";
                    }
                    else {
                        document.getElementById("output").innerHTML = innerhtml;
                        document.getElementById("output2").style.display = "none";
                    }
                }
            );
        }
        
        getpokemonlist();
    break;
    case 'Template:Test4':
        //HTML code for the output
        var inputinnerhtml = '<div id="input">Stage: <input id="inputpage"><br><button id="submitpage" type="button" onclick="submitpage();">Submit</button></div>';
        
        var outputinnerhtml = '<div id="output"></div>';
        
        //Inject the HTML code for the input forms
        var input = document.createElement('div');
        input.style.display = 'inline-block';
        input.style.width = '100%';
        input.style.verticalAlign = 'top';
        input.innerHTML = inputinnerhtml;
        document.getElementById('form').appendChild(input);
        
        //Inject the HTML code for the output forms
        var output = document.createElement('div');
        output.style.display = 'inline-block';
        output.style.width = '100%';
        output.style.verticalAlign = 'top';
        output.innerHTML = outputinnerhtml;
        document.getElementById('form').appendChild(output);
        
        function submitpage() {
            var page = document.getElementById("inputpage").value;
            
            //Get request to a page on the Wikia
            $.get(wgScript,
                {title: page,
                 action: 'raw',
                 ctype: 'text/plain'},
                function(data) {
                    index = data.indexOf("{{Event Stage v3");
                    if (index == -1) {
                        document.getElementById("output").innerHTML = "No event stage found.";
                    }
                    else {
                        var index2 = findmatchingbrackets(data, index);
                        var snippet = data.substring(index, index2);
                        var disruptions = [];

                        var cd1index = snippet.indexOf("|cd1");
                        if (cd1index != -1) {
                            var cd1 = snippet.substring(cd1index, cd1index + snippet.substr(cd1index+1).indexOf("\n|"));
                            while (cd1.indexOf("{{Thumbicon|pokemon=") != -1) {
                                var thumbiconindex = cd1.indexOf("{{Thumbicon");
                                cd1 = cd1.substring(thumbiconindex);
                                var pokemon = cd1.substring(20, cd1.indexOf("}}"));
                                var modifier = "";
                                if (pokemon.indexOf("|") != -1) {
                                    modifier = pokemon.substring(pokemon.indexOf("|")+10);
                                    pokemon = pokemon.substring(0, pokemon.indexOf("|"));
                                }
                                var disruption = pokemon;
                                if (modifier != "") {
                                    disruption += " (" + modifier + ")";
                                }
                                if (disruptions.indexOf(disruption) == -1) {
                                	disruptions.push(disruption);
                                }
                                cd1 = cd1.substring(cd1.indexOf("}}") + 2);
                            }
                        }
                        
                        var cd2index = snippet.indexOf("|cd2");
                        if (cd2index != -1) {
                            var cd2 = snippet.substring(cd2index, cd2index + snippet.substr(cd2index+1).indexOf("\n|"));
                            while (cd2.indexOf("{{Thumbicon|pokemon=") != -1) {
                                var thumbiconindex = cd2.indexOf("{{Thumbicon");
                                cd2 = cd2.substring(thumbiconindex);
                                var pokemon = cd2.substring(20, cd2.indexOf("}}"));
                                var modifier = "";
                                if (pokemon.indexOf("|") != -1) {
                                    modifier = pokemon.substring(pokemon.indexOf("|")+10);
                                    pokemon = pokemon.substring(0, pokemon.indexOf("|"));
                                }
                                var disruption = pokemon;
                                if (modifier != "") {
                                    disruption += " (" + modifier + ")";
                                }
                                if (disruptions.indexOf(disruption) == -1) {
                                	disruptions.push(disruption);
                                }
                                cd2 = cd2.substring(cd2.indexOf("}}") + 2);
                            }
                        }
                        
                        var cd3index = snippet.indexOf("|cd3");
                        if (cd3index != -1) {
                            var cd3 = snippet.substring(cd3index, cd3index + snippet.substr(cd3index+1).indexOf("\n|"));
                            while (cd3.indexOf("{{Thumbicon|pokemon=") != -1) {
                                var thumbiconindex = cd3.indexOf("{{Thumbicon");
                                cd3 = cd3.substring(thumbiconindex);
                                var pokemon = cd3.substring(20, cd3.indexOf("}}"));
                                var modifier = "";
                                if (pokemon.indexOf("|") != -1) {
                                    modifier = pokemon.substring(pokemon.indexOf("|")+10);
                                    pokemon = pokemon.substring(0, pokemon.indexOf("|"));
                                }
                                var disruption = pokemon;
                                if (modifier != "") {
                                    disruption += " (" + modifier + ")";
                                }
                                if (disruptions.indexOf(disruption) == -1) {
                                	disruptions.push(disruption);
                                }
                                cd3 = cd3.substring(cd3.indexOf("}}") + 2);
                            }
                        }
                        
                        document.getElementById("output").innerHTML = "Disruptions: " + disruptions.toString();
                    }
                }
            );
        }
    break;
}