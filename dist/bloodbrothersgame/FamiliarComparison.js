function parseURL(url) 
{
    var parser = document.createElement('a'),
    searchObject = {},
    queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    if (url.indexOf("?") != -1)
    {
        queries = parser.search.replace(/^\?/, '').split('&');
        for( i = 0; i < queries.length; i++ ) {
            split = queries[i].split('=');
            searchObject[split[0]] = split[1];
        }
    }
    
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}

function colorElement(elementID)
{
   var node = document.getElementById(elementID);

   if (parseInt(node.textContent) > 0) {
     node.style.color = "green";
   } else {
     node.style.color = "red";
   }

   var newText = parseInt(node.textContent).toLocaleString();
   node.textContent = newText;
}

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
    img.height = 85;
    img.width =  61;
    a.appendChild(img);

   updateChild(targetElement, a);
}

function onFinishedGettingSkillInfo(targetElement, skillName)
{
    var doc = document.implementation.createHTMLDocument(skillName);
    doc.documentElement.innerHTML = sessionStorage[skillName];

    var infoBox = (doc.getElementsByClassName("infobox"))[0];
    infoBox.style.width = '100%';

    // insert the skill box to the table
    updateChild(targetElement, infoBox);
}

function addSkillInfo(targetElement, skillName)
{
     if (!sessionStorage[skillName]) 
     {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
           if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               sessionStorage[skillName] = xmlhttp.response;
               onFinishedGettingSkillInfo(targetElement, skillName);
           }
        };
        xmlhttp.open("GET", "http://bloodbrothersgame.wikia.com/index.php?action=render&title=Category:" + encodeURIComponent(skillName), true);
        xmlhttp.send();
        console.log("Fetching Skill " + skillName + "info");
     }
     else 
     {
        onFinishedGettingSkillInfo(targetElement, skillName);
     }
}

function onFinishedGettingFamPage(familiarName, elementID)
{
    var doc = document.implementation.createHTMLDocument(familiarName);
    doc.documentElement.innerHTML = sessionStorage[familiarName + "FamPage"];

    var autoAttack = doc.getElementById("AutoAttack");
    var autoAttackAffliction = doc.getElementById("AutoAttackAffliction");
    var autoAttackAbility = doc.getElementById("AutoAttackAbility");

    document.getElementById(elementID).innerHTML = "<tbody>" + autoAttack.innerHTML;
    if (autoAttackAffliction) {
        document.getElementById(elementID).innerHTML += "<br/>" + autoAttackAffliction.innerHTML;
    }

    if (autoAttackAbility) {
       document.getElementById(elementID).innerHTML += "<br/>" + autoAttackAbility.innerHTML 
    }
    document.getElementById(elementID).innerHTML += "</tbody>";
}

function getAutoAttackInfo(familiarName, elementID)
{
   if (!sessionStorage[familiarName + "FamPage"]) 
   {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
             sessionStorage[familiarName + "FamPage"] = xmlhttp.response;
//             console.log("response = " + xmlhttp.response);
//             console.log("storage = " + sessionStorage[familiarName + "FamPage"]);
             onFinishedGettingFamPage(familiarName, elementID);
         }
      };
     
      xmlhttp.open("GET", "http://bloodbrothersgame.wikia.com/index.php?action=render&title=" + encodeURIComponent(familiarName), true);
      xmlhttp.send();
      console.log("Fetching Familiar page: " + "http://bloodbrothersgame.wikia.com/index.php?action=render&title=" + encodeURIComponent(familiarName));
   } else {
      // already cached, just parse it and get the result
      onFinishedGettingFamPage(familiarName, elementID);
   }
}

function CompareButtonClicked ()
{
    var s1 = document.getElementById("familiar1");
    console.log("s1.selectedIndex = " + s1.selectedIndex);
    var selectedFam1 = s1.options[s1.selectedIndex].value;

    var s2 = document.getElementById("familiar2");
    var selectedFam2 = s2.options[s2.selectedIndex].value;

    var famInfo = JSON.parse(sessionStorage.famInfo);
    
     document.getElementById("HP1").textContent = famInfo[selectedFam1].hp;
     document.getElementById("ATK1").textContent = famInfo[selectedFam1].atk;
     document.getElementById("DEF1").textContent = famInfo[selectedFam1].def;
     document.getElementById("WIS1").textContent = famInfo[selectedFam1].wis;
     document.getElementById("AGI1").textContent = famInfo[selectedFam1].agi;
     addFigure("fam1Pic", famInfo[selectedFam1].name);

     document.getElementById("fam1SkillsHeader").textContent= famInfo[selectedFam1].name + " Skills"; 
     addSkillInfo("SKILL11", famInfo[selectedFam1].skill1);
     if (famInfo[selectedFam1].skill2 !== "") {
        addSkillInfo("SKILL21", famInfo[selectedFam1].skill2);
     } else {
        removeChild("SKILL21");
     }
     if (famInfo[selectedFam1].skill3 !== "") {
        addSkillInfo("SKILL31", famInfo[selectedFam1].skill3);
     } else {
        removeChild("SKILL31");
     }

     getAutoAttackInfo(famInfo[selectedFam1].name, "AUTO1");

     document.getElementById("HP2").textContent = famInfo[selectedFam2].hp;
     document.getElementById("ATK2").textContent = famInfo[selectedFam2].atk;
     document.getElementById("DEF2").textContent = famInfo[selectedFam2].def;
     document.getElementById("WIS2").textContent = famInfo[selectedFam2].wis;
     document.getElementById("AGI2").textContent= famInfo[selectedFam2].agi;
     addFigure("fam2Pic", famInfo[selectedFam2].name);

     document.getElementById("fam2SkillsHeader").textContent= famInfo[selectedFam2].name + " Skills"; 
     addSkillInfo("SKILL12", famInfo[selectedFam2].skill1);
     if (famInfo[selectedFam2].skill2 !== "") {
       addSkillInfo("SKILL22", famInfo[selectedFam2].skill2);
     } else {
       removeChild("SKILL22");
     }
     if (famInfo[selectedFam2].skill3 !== "") {
       addSkillInfo("SKILL32", famInfo[selectedFam2].skill3);
     } else {
       removeChild("SKILL32");
     }

     getAutoAttackInfo(famInfo[selectedFam2].name, "AUTO2");

     document.getElementById("HPDIFF").textContent = (parseInt( famInfo[selectedFam1].hp.replace(/,/g,'') ) - parseInt( famInfo[selectedFam2].hp.replace(/,/g,'') ));
     colorElement("HPDIFF");

     document.getElementById("ATKDIFF").textContent = (parseInt( famInfo[selectedFam1].atk.replace(/,/g,'') ) - parseInt( famInfo[selectedFam2].atk.replace(/,/g,'') ));
     colorElement("ATKDIFF");
     document.getElementById("DEFDIFF").textContent = (parseInt( famInfo[selectedFam1].def.replace(/,/g,'') ) - parseInt( famInfo[selectedFam2].def.replace(/,/g,'') ));
     colorElement("DEFDIFF");
     document.getElementById("WISDIFF").textContent = (parseInt( famInfo[selectedFam1].wis.replace(/,/g,'') ) - parseInt( famInfo[selectedFam2].wis.replace(/,/g,'') ));
     colorElement("WISDIFF");
     document.getElementById("AGIDIFF").textContent = (parseInt( famInfo[selectedFam1].agi.replace(/,/g,'') ) - parseInt( famInfo[selectedFam2].agi.replace(/,/g,'') ));
     colorElement("AGIDIFF");
     
     // Generate Template code
     console.log("generating template code");
     var templateText = "{{Compare2Familiars|" + famInfo[selectedFam1].name + "|" + famInfo[selectedFam2].name + "}}";
     document.getElementById("CompareTemplate").textContent = templateText;

  var t1 = document.getElementById("comparisonTable");
  t1.style.visibility = "visible";
  t1.style.display = "";

  var t2 = document.getElementById("skillsTable");
  t2.style.visibility = "visible";
  t2.style.display = "";
}

function fillSelect()
{
  var a = document.getElementById("familiar1");
  a.innerHTML = sessionStorage.famSelect;

  var b = document.getElementById("familiar2");
  b.innerHTML = sessionStorage.famSelect;
  
  console.log("calling parseUrlInfo");
  parseUrlInfo();
}

function parseUrlInfo()
{
    var fam1url = "";
    var fam2url = "";
    
    var urlInfo = parseURL(window.location.href);
    
    if (typeof urlInfo.searchObject !== "undefined") 
    {
        
        if (urlInfo.searchObject.hasOwnProperty("fam1")) {
            fam1url = decodeURIComponent(urlInfo.searchObject.fam1);
        }
    
        if (urlInfo.searchObject.hasOwnProperty("fam2")) {
            fam2url = decodeURIComponent(urlInfo.searchObject.fam2);
        }
    
        console.log("given fam names: " + fam1url + ", " + fam2url);
    }
  
    if (fam1url) 
    {
        console.log("looking for " + fam1url);
        var s1 = document.getElementById("familiar1").options.namedItem(fam1url + " Option");
        console.log("s1 " + s1);
        if (s1) {
            console.log("updating selected index");
            document.getElementById("familiar1").selectedIndex = s1.index;
        }
    }
    
    if (fam2url) 
    {
        console.log("looking for " + fam2url);
        var s2 = document.getElementById("familiar1").options.namedItem(fam2url + " Option");
        console.log("s2 " + s2);
        if (s2) {
            console.log("updating selected index");
            document.getElementById("familiar2").selectedIndex = s2.index;
        }
    }    
    
    if (fam1url && fam2url)
    {
        CompareButtonClicked();
    }
}

function fillForm()
{
    $("#comparison-form").replaceWith(
'<form id="compare">' +
'<select id="familiar1" style="margin: 0px 0px 0px 5px;">' +
'</select>' +
'<select id="familiar2" style="margin: 0px 0px 0px 5px;">' +
'</select>' +
'<input type="button" style="margin: 0px 0px 0px 5px;" onclick="CompareButtonClicked()" value="Compare Familiars" id="CompareFamiliarsButton"/>' +
'</form>' +
'' +
'<div style="width:100%;">' +
'<table style="width:100%;text-align:center;display:none;" class="wikitable" id="comparisonTable">' +
'<tr>' +
'<th>Familiar</th>' +
'<th>HP</th>' +
'<th>ATK</th>' +
'<th>DEF</th>' +
'<th>WIS</th>' +
'<th>AGI</th>' +
'<th>Auto</th>' +
'</tr>' +
'<tr>' +
'<td><div id="fam1Pic" width="61" height="85"></div></td>' +
'<td id="HP1">HP1</td>' +
'<td id="ATK1">ATK1</td>' +
'<td id="DEF1">DEF1</td>' +
'<td id="WIS1">WIS1</td>' +
'<td id="AGI1">AGI1</td>' +
'<td id="AUTO1">AUTO1</td>' +
'</tr>' +
'<tr>' +
'<td><div id="fam2Pic" width="61" height="85"></div></td>' +
'<td id="HP2">HP2</td>' +
'<td id="ATK2">ATK2</td>' +
'<td id="DEF2">DEF2</td>' +
'<td id="WIS2">WIS2</td>' +
'<td id="AGI2">AGI2</td>' +
'<td id="AUTO2">AUTO2</td>' +
'</tr>' +
'<tr>' +
'<td/>' +
'<td id="HPDIFF">HPDIFF</td>' +
'<td id="ATKDIFF">ATKDIFF</td>' +
'<td id="DEFDIFF">DEFDIFF</td>' +
'<td id="WISDIFF">WISDIFF</td>' +
'<td id="AGIDIFF">AGIDIFF</td>' +
'<td/>' +
'</tr>' +
'<tr>' +
'<td><b>Comparison Link</b></td>' +
'<td id="CompareTemplate" colspan="6"/>' +
'</tr>' +
'</table>' +
'<table id="skillsTable" style="display:none;">' +
'<tr>' +
'<th style="width:50%;" id="fam1SkillsHeader">Familiar #1 Skills</th>' +
'<th style="width:50%;" id="fam2SkillsHeader">Familiar #2 Skills</th>' +
'</tr>' +
'<tr>' +
'<td style="width:50%;vertical-align:top;" id="SKILL11"></td>' +
'<td style="width:50%;vertical-align:top;" id="SKILL12"></td>' +
'</tr>' +
'<tr>' +
'<td style="width:50%;vertical-align:top;" id="SKILL21"></td>' +
'<td style="width:50%;vertical-align:top;" id="SKILL22"></td>' +
'</tr>' +
'<tr>' +
'<td style="width:50%;vertical-align:top;" id="SKILL31"></td>' +
'<td style="width:50%;vertical-align:top;" id="SKILL32"></td>' +
'</tr>' +
'</table>' +
'</div>'
    );
}

$(document).ready(function()
{
//  sessionStorage.famJSON = ""; // force cache cleanup
    fillForm();
    readFamiliarsInfo(fillSelect);

    var f = document.getElementById("compare");
    f.style.visibility = "visible";
    f.style.display = "";
});