var URL_ExternalData;
var game_defs = [];

//load-popualte initial data
$(document).ready(function()
{
    //get the elements trying to load data (if any)
    eles = $('.DynamicData'); 
    
    //Dynamic Data Elements Exists
    if(eles && eles.length > 0)
    {
        //set the BaseURL for the Remote Data
        if (!URL_ExternalData)
        {
            //defined in Template:Dyanmic Data
            //allows for changing location of External Data
            o = $("[data-dsource]");
            if (o && o.length > 0)
            {
                URL_ExternalData = o.first().attr("data-dsource");
            }
            else
            {
                URL_ExternalData = "https://bootch-ds.github.io/Idle-Champs-Data/GameDefs/";
            }
        }
        
        //check if URL has a #Value (Parameter)
        //where #Value == Object.Name in the definitions
        var select_prop;
        var select_val;
        params = GetQueryString();
        if (params && params.length > 0)
        {
            select_prop = "Name";
            select_val = params[0];
        }
        
        PopulateDynamicData(select_prop, select_val, true);
    }
});

function PopulateDynamicData(select_prop, select_val, repop_all)
{
    //get the elements trying to load data (if any)
    if (repop_all)
    {
        els = $('.DynamicData'); 
    }
    else
    {
        els = $('.DynamicData').not('[data-reload="never"]');
    }
    
     //call self populators 
    els.each(function() { PopulateSelf($(this), select_prop, select_val); });
}

function PopulateSelf(container,select_prop, select_val)
{
    //handle default scenarios
    sBuildType = container.attr("data-dtype");
    sDefName = container.attr("data-defname");
    sDefault = container.attr("data-default");
    
    if (sDefault && !select_prop && !select_val)
    {
        s_split = sDefault.split(":");
        
        //get default params from the Table MarkUp
        if (s_split.length == 2)
        {
            select_prop = s_split[0];
            select_val  = s_split[1];
        }
    }
    
    switch(sBuildType)
    {
        case "Table":
            PopulateTable(container, sDefName, select_prop, select_val);
            break;
        case "Repeater":
            PopulateRepeater(container, sDefName);
            break;
    }
}

//check for #Name in URL
function GetQueryString(){
    sURL = window.location.href;
    if (!sURL.includes("#"))
    {
        return null;
    }
    
    var vars = [], hash;
    var hashes = window.location.href.slice(sURL.indexOf('#') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

//get JSON defs from Remote Server
function GetGameDefs(sDefName) {
	if (!game_defs || !game_defs.hasOwnProperty(sDefName))
	{
        $.ajax({
        	url: URL_ExternalData + sDefName + ".json",
        	dataType: "json",
        	async : false,
        	success: function(data) {
        	    game_defs[sDefName] = data;
        	}
        });
	}
}

//filter game_def[sDefName] for a specific object
function GetDefByProperty(sDefName, sPName, sVal) {
    if (!game_defs || !game_defs.hasOwnProperty(sDefName))
    {
        GetGameDefs(sDefName);
    }
    
    var oData = game_defs[sDefName];
    oDef = oData.Values.filter(function(el) 
    {
        regex = new RegExp('^' + el[sPName] + '$', 'i');
        if (regex.test(sVal)) {
            return true;
        }
    });
   
    if (oDef && oDef.length > 0) 
    {
        return oDef[0];
    }
    return null;
}

function PopulateRepeater(container, sDefName)
{
    if (!game_defs || !game_defs.hasOwnProperty(sDefName))
    {
        GetGameDefs(sDefName);
    }
    
    //get the template to be repeated (td)
    template = container.find("[data-template]").first();
    
    //get the container for the repeating element (tr)
    myParent = template.parent();
    
    //remove the template definition
    myParent.empty();

    for(var i=0; i < game_defs[sDefName].Values.length; i++)
	{
	    data = game_defs[sDefName].Values[i];
	    
	    //make a copy of the repeat template (td)
	    new_ele = template.clone();
	    
	    //populate the copy with values from the game_def (spans)
	    els = new_ele.find("[data-pname]");
        els.each(function() 
        {
            pname = $(this).attr("data-pname");
            element_type = $(this).attr("data-type");
            
            if (element_type == "img")
            {
                var img = $("<img>");
        	    img.addClass("pi-image-thumbnail");
                img.attr('src', 'https://idle-champions.fandom.com/wiki/Special:FilePath/Mini_Portrait_' + data[pname] +  '.png');

                $(this).parent().prepend(img);
                $(this).remove();
            }
            else
            {
                $(this).text(data[pname]);
            }
        });
        
        //check if any elements have onclick functions
        click_els = new_ele.find("[data-onclick]");
        click_els.each(function() 
        {
            sFun = $(this).attr('data-onclick');
            pname = $(this).attr('data-arg-pname');
            sFun = sFun + "('" + pname + "', '" + data[pname] + "')"; 
            $(this).on("click", new Function(sFun));
        });
        
        //add the clone to the parent
        new_ele.appendTo(myParent);
	}
}

function PopulateTable(container, sDefName, select_prop, select_val)
{
    var data = GetDefByProperty(sDefName, select_prop, select_val);
    if (!data)
    {
        sDefault = container.attr("data-default");
            
        if (sDefault)
        {
            s_split = sDefault.split(":");
            
            //get default params from the Table MarkUp
            if (s_split.length == 2)
            {
                select_prop = s_split[0];
                select_val  = s_split[1];
            }
        }
        data = GetDefByProperty(sDefName, select_prop, select_val);
    }
    
    if (data)
    {
        eles = container.find("[data-pname]");
        
        if (eles.length > 0)
        {
            eles.each(function() 
            {
                pname = $(this).attr("data-pname");
                
                if (pname.includes("Pic_"))
                {
                    var fig = $("<figure>");
	                var href = $("<a>");
	                var img = $("<img>");
	                var span = $('<span>');
	    
                    fig.addClass("pi-item").addClass("pi-image");
	                href.addClass("image").addClass("image-thumbnail");
	    
	                img.addClass("pi-image-thumbnail");
                    img.attr('src', 'https://idle-champions.fandom.com/wiki/Special:FilePath/Portrait_' + data.Name +  '.png');
                    span.text(data.Name);
        
                    href.append(img);
                    fig.append(href);
                    
                    $(this).empty();
                    $(this).append(fig);
                }
                else
                {
                    $(this).text(data[pname]);
                }
            });
        }
    }
}