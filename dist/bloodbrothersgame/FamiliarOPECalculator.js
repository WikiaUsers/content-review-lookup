function removeChild(targetElement)
{
    var node = document.getElementById(targetElement);
    if (node.hasChildNodes()) {
       node.removeChild(node.firstChild);
    }
}
 

function updateChild(targetElement, updatedChild)
{
    var node = document.getElementById(targetElement);
 
    if (node.hasChildNodes()) {
       node.removeChild(node.firstChild);
    }
    node.appendChild(updatedChild);
}

function addFigure(targetElement, famName)
{
    var a = document.createElement("a");
    a.setAttribute("href", "http://bloodbrothersgame.wikia.com/wiki/" + famName);
    var img = document.createElement("img");
    img.src = "http://bloodbrothersgame.wikia.com/wiki/Special:FilePath/File:" + encodeURI(famName) + "_Figure.png";
    //img.height = ;
    img.width =  100;
    a.appendChild(img);
 
   updateChild(targetElement, a);
}

function update_field_diff(field_str)    
{
    var pope_field = document.getElementById("POPE_" + field_str).textContent.replace(/,/g, '');
    var fam_field  = document.getElementById("FAM_" + field_str).value.replace(/,/g, '');
    
    if (fam_field === "") {
        fam_field = 0;
    }
    
    var field_diff = parseInt(pope_field) - parseInt(fam_field);
    
    var extra_text = "";
    switch (field_diff) 
    {
        case 667:
        case 666:
        case 605:
        case 550:
            extra_text = "PE";
            break;
        case 167:
        case 166:
        case 50:
            extra_text = "OPE50";
            break;
        case 117:
        case 116:
            extra_text = "OPE100";
            break;
        case 67:
        case 66:
            extra_text = "OPE150";
            break;
        case 17:
        case 16:
            extra_text = "OPE200";
            break;
        case 12:
        case 11:
            extra_text = "OPE250";
            break;
        case 7:
        case 6:
            extra_text = "OPE300";
            break;
        case 2:
        case 1:
            extra_text = "OPE350";
            break;
        case 0:
            extra_text = "POPE"; 
            break;
        default:
            break;
    }
    
    var content = field_diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (extra_text !== '') {
        content += " (" + extra_text + ")";
    }
    
    document.getElementById("OPE_" + field_str).textContent = content;
}

function CalculateOPEClicked()
{
    update_field_diff("HP");
    update_field_diff("ATK");
    update_field_diff("DEF");
    update_field_diff("WIS");
    update_field_diff("AGI");
}

function ChangeSelectedFam()
{
    var f = document.getElementById("familiar");
    var index = f.options[f.selectedIndex].value;

    var hp = document.getElementById("POPE_HP");
    var atk = document.getElementById("POPE_ATK");
    var def = document.getElementById("POPE_DEF");
    var wis = document.getElementById("POPE_WIS");
    var agi = document.getElementById("POPE_AGI");
    
    document.getElementById("FAM_HP").value = "";
    document.getElementById("FAM_ATK").value = "";
    document.getElementById("FAM_DEF").value = "";
    document.getElementById("FAM_WIS").value = "";
    document.getElementById("FAM_AGI").value = "";
    
    document.getElementById("OPE_HP").textContent = "";
    document.getElementById("OPE_ATK").textContent = "";
    document.getElementById("OPE_DEF").textContent = "";
    document.getElementById("OPE_WIS").textContent = "";
    document.getElementById("OPE_AGI").textContent = "";
    
    if (index == -1) 
    {
        hp.textContent = 0;
        atk.textContent = 0;
        def.textContent = 0;
        wis.textContent = 0;
        agi.textContent = 0;
        
        removeChild("IMAGE");
    }
    else
    {
        var famInfo = JSON.parse(sessionStorage.famInfo);

        hp.textContent = famInfo[index].hp;
        atk.textContent = famInfo[index].atk;
        def.textContent = famInfo[index].def;
        wis.textContent = famInfo[index].wis;
        agi.textContent = famInfo[index].agi;
        
        addFigure("IMAGE", famInfo[index].name);
    }
}

function fillSelect()
{
  var a = document.getElementById("familiar");
  a.innerHTML = "<option value=\"-1\">None</option>" + sessionStorage.famSelect;
}

document.ready = function()
{
//  sessionStorage.famJSON = ""; // force cache cleanup
  readFamiliarsInfo(fillSelect);
 
  var f = document.getElementById("calculator");
  f.style.visibility = "visible";
  f.style.display = "";
};