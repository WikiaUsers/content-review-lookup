function SetVisibility()
{
    var elementID = arguments[0];
    var visibility = arguments[1];
    
    var f = document.getElementById(elementID);
    f.style.visibility = visibility;
    f.style.display = "";    
}

function FormationNameChanged()
{
    var fn = document.getElementById("FormationName");
    var formationName = fn.options[fn.selectedIndex].value;
    
    switch (formationName.charAt(0))
    {
        case '5':
            SetVisibility("Familiar5", "visible");
            SetVisibility("Familiar10", "visible");
            SetVisibility("Familiar4", "visible");
            SetVisibility("Familiar9", "visible");            
            break;
        case '4':
            SetVisibility("Familiar5", "hidden");
            SetVisibility("Familiar10", "hidden");
            SetVisibility("Familiar4", "visible");
            SetVisibility("Familiar9", "visible");            
            break;
        case '3':
            SetVisibility("Familiar5", "hidden");
            SetVisibility("Familiar10", "hidden");
            SetVisibility("Familiar4", "hidden");
            SetVisibility("Familiar9", "hidden");
            break;
    }
}

function fillFormationTypes()
{
  var formationType = document.getElementById("FormationType");

  var formationFull = document.createElement("option");
  formationFull.text = "Main + Reserve";
  formationFull.value = "FormationFull";
  
  var formationMain = document.createElement("option");
  formationMain.text = "Main";
  formationMain.value = "Formation";
  
  if (formationType.length == "0")
  {
    formationType.add(formationFull);
    formationType.add(formationMain);
  }
}

function fillFormationNames()
{
    var formationNames = [
        "5-Skein", "5-Valley", "5-Tooth", "5-Wave", "5-Front", "5-Mid", 
        "5-Rear", "5-Pike", "5-Shield", "5-Pincer", "5-Saw", "5-Hydra",
        "4-Skein", "4-Valley", "4-Wave", "4-Front", "4-Mid", "4-Rear",
        "3-Skein", "3-Valley", "3-Tooth", "3-Wave"];
    var formationValues = [
        "5A", "5V", "5T", "5W", "5F", "5M", 
        "5R", "5P", "5S", "5Q", "5X", "5H",
        "4S", "4V", "4W", "4F", "4M", "4R",
        "3S", "3V", "3T", "3W"];
    
    var formationName = document.getElementById("FormationName");
    
    if (formationName.length == "0")
    {
        for (var i = 0; i < formationNames.length; i++)
        {
            var opt = document.createElement("option");
            opt.text = formationNames[i];
            opt.value = formationValues[i];
            
            formationName.add(opt);
        }
    }
}

function onFinishedGettingSacSkillInfo()
{
    // parse json into options list
    var catJSON = JSON.parse(sessionStorage.sacSkills);
    
    var catList = catJSON.query.categorymembers;
    
    var skill1selector = document.getElementById("Skill1");
    var skill2selector = document.getElementById("Skill2");
    var skill3selector = document.getElementById("Skill3");

    if (skill1selector.length == "0")
    {
        for (var i = 0; i < catList.length; i++)
        {
            var opt = document.createElement("option");
            opt.text = catList[i].title.slice(9);
            opt.value = catList[i].title.slice(9);
            
            skill1selector.add(opt);
        }
        
        skill2selector.innerHTML = skill1selector.innerHTML;
        skill3selector.innerHTML = skill1selector.innerHTML;
    }
    
    // use options list to fill WL skills selectors
    
    
}

function fillWarlordSkills()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           sessionStorage.sacSkills = xmlhttp.response;
           onFinishedGettingSacSkillInfo();
       }
    };
    
    xmlhttp.open("GET", "http://bloodbrothersgame.wikia.com/api.php?action=query&list=categorymembers&cmtitle=Category:Sacrificable_Skills&format=json&cmlimit=10000&cmnamespace=14&cmprop=title", true);
    xmlhttp.send();
    console.log("Fetching Sacrificable Skills info");
    
    var f = document.getElementById("generate");
    f.style.visibility = "visible";
    f.style.display = "";
}

function fillSingleFamiliar(selectElementId)
{
    var a = document.getElementById(selectElementId);
    
    var famSelect = "<option value=\"-1\">None</option>" + sessionStorage.famSelect;
    a.innerHTML = famSelect;
}

function fillFamiliars()
{
    for (var i = 1; i < 11; i++)
    {
        fillSingleFamiliar("Familiar" + i);
    }

}

function fillSelect()
{
  fillFamiliars();
  fillFormationTypes();
  fillFormationNames();
  fillWarlordSkills();
}

function onFinishedGettingParsedTemplate()
{
    var parsedTemplateJSON = JSON.parse(sessionStorage.parsedTemplate);
    
    var parsedTemplateHTML = parsedTemplateJSON.parse.text["*"];
    
    var output = document.getElementById("FormationGenerated");
    output.innerHTML = parsedTemplateHTML;
    
    var res = document.getElementById("result");
    res.style.visibility = "visible";
    res.style.display = "";
}

function getSelectedFamName()
{
    var famInfo = arguments[0];
    var f = arguments[1];
    
    var index = f.options[f.selectedIndex].value;
    if (index == "-1") { 
        return "";
    } else {
        return famInfo[index].name;
    }
}

function get_skill_str(str)
{
    return "[[:Category:" + str + "|" + str + "]]";
}

function GenerateFormationClicked()
{
    var famInfo = JSON.parse(sessionStorage.famInfo);
    
    var ft = document.getElementById("FormationType");
    var is_formation_full = ft.options[ft.selectedIndex].value == "FormationFull";
    
    var fn = document.getElementById("FormationName");
    
    var s1 = document.getElementById("Skill1");
    var s2 = document.getElementById("Skill2");
    var s3 = document.getElementById("Skill3");
    
    var f1 = document.getElementById("Familiar1");
    var f2 = document.getElementById("Familiar2");
    var f3 = document.getElementById("Familiar3");
    var f4 = document.getElementById("Familiar4");
    var f5 = document.getElementById("Familiar5");
    var f6 = document.getElementById("Familiar6");
    var f7 = document.getElementById("Familiar7");
    var f8 = document.getElementById("Familiar8");
    var f9 = document.getElementById("Familiar9");
    var f10 = document.getElementById("Familiar10");
    // build formation text by selected form fields
    
    var formationName = fn.options[fn.selectedIndex].value;
    var formationSize = parseInt(formationName.charAt(0));
    
    var templateText = "{{Template:" + ft.options[ft.selectedIndex].value + "|" + formationName +
     "|" + getSelectedFamName(famInfo, f1)  +
     "|" + getSelectedFamName(famInfo, f2) +
     "|" + getSelectedFamName(famInfo, f3);
     
     if (formationSize >= 4)  {
         templateText += "|" + getSelectedFamName(famInfo, f4);
     } else if (is_formation_full) {
         templateText += "|";
     }
     
     if (formationSize == 5)  {
         templateText += "|" + getSelectedFamName(famInfo, f5);
     } else if (is_formation_full) {
         templateText += "|";
     }
     
     
     if (is_formation_full)
     {
         templateText += "|" + getSelectedFamName(famInfo, f6) +
            "|" + getSelectedFamName(famInfo, f7) +
            "|" + getSelectedFamName(famInfo, f8);
            
        if (formationSize >= 4)  {
            templateText += "|" + getSelectedFamName(famInfo, f9);
        } else {
            templateText += "|";
        }            
            
        if (formationSize == 5)  {
            templateText += "|" + getSelectedFamName(famInfo, f10);
        } else {
            templateText += "|";
        }
    }
     
     
    templateText += "|skill=" + get_skill_str(s1.options[s1.selectedIndex].value) +  ", " + 
        get_skill_str(s2.options[s2.selectedIndex].value) + ", " + get_skill_str(s3.options[s3.selectedIndex].value);
        
    templateText += "}}";
    
    var text = document.getElementById("FormationText");
    text.textContent = templateText;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           sessionStorage.parsedTemplate = xmlhttp.response;
           onFinishedGettingParsedTemplate();
       }
    };
    
    xmlhttp.open("GET", "http://bloodbrothersgame.wikia.com/api.php?action=parse&format=json&text=" + encodeURIComponent(templateText));
    xmlhttp.send();
}

function fillForm()
{
    $("#formation-form").replaceWith(
'<form id="generate" style="display:none;">' +
'Formation Type:<select id="FormationType" style="margin: 0px 5px 5px 5px;"></select>' +
'Formation: <select id="FormationName" style="margin: 0px 0px 5px 5px;" onchange="FormationNameChanged()"></select>' +
'<br/>' +
'Warlord Skills: ' +
'<select style="font-size: 12px;" id="Skill1" style="margin: 0px 0px 5px 5px;"></select>' +
'<select style="font-size: 12px;" id="Skill2" style="margin: 0px 0px 5px 5px;"></select>' +
'<select style="font-size: 12px;" id="Skill3" style="margin: 0px 0px 5px 5px;"></select>' +
'<br/>' +
'<select style="font-size: 12px;" id="Familiar1" style="margin: 0px 0px 0px 5px;"></select>' +
'<select style="font-size: 12px;" id="Familiar2" style="margin: 0px 0px 0px 5px;"></select>' +
'<select style="font-size: 12px;" id="Familiar3" style="margin: 0px 0px 0px 5px;"></select>' +
'<select style="font-size: 12px;" id="Familiar4" style="margin: 0px 0px 0px 5px;"></select>' +
'<select style="font-size: 12px;" id="Familiar5" style="margin: 0px 0px 0px 5px;"></select>' +
'<br/>' +
'<select style="font-size: 12px;" id="Familiar6" style="margin: 5px 0px 0px 5px;"></select>' +
'<select style="font-size: 12px;" id="Familiar7" style="margin: 5px 0px 0px 5px;"></select>' +
'<select style="font-size: 12px;" id="Familiar8" style="margin: 5px 0px 0px 5px;"></select>' +
'<select style="font-size: 12px;" id="Familiar9" style="margin: 5px 0px 0px 5px;"></select>' +
'<select style="font-size: 12px;" id="Familiar10" style="margin: 5px 0px 0px 5px;"></select>' +
'<br/>' +
'<input type="button" style="margin: 5px 0px 0px 5px;" onclick="GenerateFormationClicked()" value="Generate" id="GenerateFormationButton"/>' +
'</form>' +
'' +
'<div style="width:100%;display:none;" id="result" >' +
'<b>Formation Text:</b><br/>' +
'<textarea id="FormationText" name="FormationText" rows="7" cols="100">' +
'</textarea>' +
'<br/>' +
'<b>Formation Output:</b><br/>' +
'<div style="width:100%;" id="FormationGenerated"/>' +
'</div>'
);
}

$(document).ready(function()
{
//  sessionStorage.famJSON = ""; // force cache cleanup
    fillForm();
    readFamiliarsInfo(fillSelect);
});