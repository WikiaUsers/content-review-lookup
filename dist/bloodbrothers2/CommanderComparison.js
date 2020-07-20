function colorElement(elementID) {
   var node = document.getElementById(elementID);

   if (parseInt(node.textContent) > 0) {
     node.style.color = "green";
   } else {
     node.style.color = "red";
   }

   var newText = parseInt(node.textContent).toLocaleString();
   node.textContent = newText;
}

function removeChild(targetElement) {
    var node = document.getElementById(targetElement);
    if (node.hasChildNodes()) {
       node.removeChild(node.firstChild);
    }
}

function updateChild(targetElement, updatedChild) {
    var node = document.getElementById(targetElement);

    if (node.hasChildNodes()) {
       node.removeChild(node.firstChild);
    }
    node.appendChild(updatedChild);
}

function addAffinity(targetElement, affinityName) {
    var img = document.createElement("img");
    img.src = "http://bloodbrothers2.wikia.com/wiki/Special:FilePath/File:" + encodeURI(affinityName) + ".png";
    img.height = 40;
    img.width =  40;
    
    updateChild(targetElement, img);
}

function addRarity(targetElement, rarityValue, evostepValue) {
    var img = document.createElement("img");
    var maxrar = 0;
    if (evostepValue == 1) {
        maxrar = parseInt(rarityValue) + 1;
    } else {
        maxrar = rarityValue;
    }
    img.src = "http://bloodbrothers2.wikia.com/wiki/Special:FilePath/File:" + encodeURI(rarityValue) + "-" + encodeURI(maxrar) + "_Star.png";
    img.height = 13;
    img.width =  13 * maxrar;
    
    updateChild(targetElement, img);
}

function addSource(targetElement, skillSource) {
    var img = document.createElement("img");
    img.src = "http://bloodbrothers2.wikia.com/wiki/Special:FilePath/File:" + encodeURI(skillSource) + "skill.png";
    img.height = 30;
    img.width =  30;
    
    updateChild(targetElement, img);
}

function addFigure(targetElement, CommName) {
    var a = document.createElement("a");
    a.setAttribute("href", "http://bloodbrothers2.wikia.com/wiki/" + CommName);
    var img = document.createElement("img");
    img.src = "http://bloodbrothers2.wikia.com/wiki/Special:FilePath/File:" + encodeURI(CommName) + "_Small.png";
    img.height = 85;
    img.width =  85;
    a.appendChild(img);

   updateChild(targetElement, a);
}

function onFinishedGettingSkillInfo(targetElement, skillName) {
    var doc = document.implementation.createHTMLDocument(skillName);
    doc.documentElement.innerHTML = sessionStorage[skillName];

    var infoBox = (doc.getElementsByClassName("infobox"))[0];
    infoBox.style.width = '100%';

    // insert the skill box to the table
    updateChild(targetElement, infoBox);
}

function addSkillInfo(targetElement, skillName) {
     if (!sessionStorage[skillName]) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
           if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               sessionStorage[skillName] = xmlhttp.response;
               onFinishedGettingSkillInfo(targetElement, skillName);
           }
        };
        xmlhttp.open("GET", "http://bloodbrothers2.wikia.com/index.php?action=render&title=Category:" + encodeURIComponent(skillName), true);
        xmlhttp.send();
        console.log("Fetching Skill " + skillName + "info");
    } else {
        onFinishedGettingSkillInfo(targetElement, skillName);
    }
}

function onFinishedGettingCommPage(CommanderName, elementID) {
    var doc = document.implementation.createHTMLDocument(CommanderName);
    doc.documentElement.innerHTML = sessionStorage[CommanderName + "CommPage"];
    document.getElementById(elementID).innerHTML += "</tbody>";
}

function CompareButtonClicked () {
    var s1 = document.getElementById("commander1");
    var selectedComm1 = s1.options[s1.selectedIndex].value;

    var s2 = document.getElementById("commander2");
    var selectedComm2 = s2.options[s2.selectedIndex].value;

    var CommInfo = JSON.parse(sessionStorage.famInfo);
    
     document.getElementById("HP1").textContent = CommInfo[selectedComm1].hp;
     document.getElementById("ATK1").textContent = CommInfo[selectedComm1].atk;
     document.getElementById("DEF1").textContent = CommInfo[selectedComm1].def;
     document.getElementById("WIS1").textContent = CommInfo[selectedComm1].wis;
     addRarity("RARITY1", CommInfo[selectedComm1].rarity, CommInfo[selectedComm1].evostep);
     addAffinity("AFFINITY1", CommInfo[selectedComm1].affinity);
     addSource("SOURCE1", CommInfo[selectedComm1].source);
     addFigure("comm1Pic", CommInfo[selectedComm1].name);

     document.getElementById("comm1SkillsHeader").textContent= CommInfo[selectedComm1].name + " Skills"; 
     addSkillInfo("ASKILL1", CommInfo[selectedComm1].askill);
     if (CommInfo[selectedComm1].lskill !== "") {
        addSkillInfo("LSKILL1", CommInfo[selectedComm1].lskill);
     } else {
        removeChild("LSKILL1");
     }

     document.getElementById("HP2").textContent = CommInfo[selectedComm2].hp;
     document.getElementById("ATK2").textContent = CommInfo[selectedComm2].atk;
     document.getElementById("DEF2").textContent = CommInfo[selectedComm2].def;
     document.getElementById("WIS2").textContent = CommInfo[selectedComm2].wis;
     addRarity("RARITY2", CommInfo[selectedComm2].rarity, CommInfo[selectedComm2].evostep);
     addAffinity("AFFINITY2", CommInfo[selectedComm2].affinity);
     addSource("SOURCE2", CommInfo[selectedComm2].source);
     addFigure("comm2Pic", CommInfo[selectedComm2].name);

     document.getElementById("comm2SkillsHeader").textContent= CommInfo[selectedComm2].name + " Skills"; 
     addSkillInfo("ASKILL2", CommInfo[selectedComm2].askill);
     if (CommInfo[selectedComm2].lskill !== "") {
       addSkillInfo("LSKILL2", CommInfo[selectedComm2].lskill);
     } else {
       removeChild("LSKILL2");
     }

     document.getElementById("HPDIFF").textContent = (parseInt( CommInfo[selectedComm1].hp.replace(/,/g,'') ) - parseInt( CommInfo[selectedComm2].hp.replace(/,/g,'') ));
     colorElement("HPDIFF");

     document.getElementById("ATKDIFF").textContent = (parseInt( CommInfo[selectedComm1].atk.replace(/,/g,'') ) - parseInt( CommInfo[selectedComm2].atk.replace(/,/g,'') ));
     colorElement("ATKDIFF");
     document.getElementById("DEFDIFF").textContent = (parseInt( CommInfo[selectedComm1].def.replace(/,/g,'') ) - parseInt( CommInfo[selectedComm2].def.replace(/,/g,'') ));
     colorElement("DEFDIFF");
     document.getElementById("WISDIFF").textContent = (parseInt( CommInfo[selectedComm1].wis.replace(/,/g,'') ) - parseInt( CommInfo[selectedComm2].wis.replace(/,/g,'') ));
     colorElement("WISDIFF");

  var t1 = document.getElementById("comparisonTable");
  t1.style.visibility = "visible";
  t1.style.display = "";

  var t2 = document.getElementById("skillsTable");
  t2.style.visibility = "visible";
  t2.style.display = "";
}

function fillSelect() {
  var a = document.getElementById("commander1");
  a.innerHTML = sessionStorage.famSelect;

  var b = document.getElementById("commander2");
  b.innerHTML = sessionStorage.famSelect;
}

function fillForm() {
    $("#comparison-form").replaceWith(
        '<form id="compare">' +
        '<select id="commander1" style="margin: 0px 0px 0px 5px;">' +
        '</select>' +
        '<select id="commander2" style="margin: 0px 0px 0px 5px;">' +
        '</select>' +
        '<input type="button" style="margin: 0px 0px 0px 5px;" onclick="CompareButtonClicked()" value="Compare Commanders" id="CompareCommandersButton"/>' +
        '</form>' +
        '' +
        '<div style="width:80%;">' +
        '<table style="width:100%;text-align:center;display:none;" class="wikitable" id="comparisonTable">' +
        '<tr>' +
        '<th>Commander</th>' +
        '<th>Rarity</th>' +
        '<th>Affinity</th>' +
        '<th>Skill Source</th>' +
        '<th>HP</th>' +
        '<th>ATK</th>' +
        '<th>DEF</th>' +
        '<th>WIS</th>' +
        '</tr>' +
        '<tr>' +
        '<td><div id="comm1Pic" width="85" height="85"></div></td>' +
        '<td id="RARITY1">RARITY1</td>' +
        '<td id="AFFINITY1">AFFINITY1</td>' +
        '<td id="SOURCE1">SOURCE1</td>' +
        '<td id="HP1">HP1</td>' +
        '<td id="ATK1">ATK1</td>' +
        '<td id="DEF1">DEF1</td>' +
        '<td id="WIS1">WIS1</td>' +
        '</tr>' +
        '<tr>' +
        '<td><div id="comm2Pic" width="85" height="85"></div></td>' +
        '<td id="RARITY2">RARITY2</td>' +
        '<td id="AFFINITY2">AFFINITY2</td>' +
        '<td id="SOURCE2">SOURCE2</td>' +
        '<td id="HP2">HP2</td>' +
        '<td id="ATK2">ATK2</td>' +
        '<td id="DEF2">DEF2</td>' +
        '<td id="WIS2">WIS2</td>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="4" id="Desc">Stat Difference (1 - 2)</td>' +
        '<td id="HPDIFF">HPDIFF</td>' +
        '<td id="ATKDIFF">ATKDIFF</td>' +
        '<td id="DEFDIFF">DEFDIFF</td>' +
        '<td id="WISDIFF">WISDIFF</td>' +
        '</tr>' +
        '</table>' +
        '<table id="skillsTable" style="display:none;">' +
        '<tr>' +
        '<th style="width:50%;" id="comm1SkillsHeader">Commander #1 Skills</th>' +
        '<th style="width:50%;" id="comm2SkillsHeader">Commander #2 Skills</th>' +
        '</tr>' +
        '<tr>' +
        '<td style="width:50%;vertical-align:top;" id="ASKILL1"></td>' +
        '<td style="width:50%;vertical-align:top;" id="ASKILL2"></td>' +
        '</tr>' +
        '<tr>' +
        '<td style="width:50%;vertical-align:top;" id="LSKILL1"></td>' +
        '<td style="width:50%;vertical-align:top;" id="LSKILL2"></td>' +
        '</tr>' +
        '</table>' +
        '</div>');
}


$(function() {
//  sessionStorage.CommJSON = ""; // force cache cleanup
    fillForm();
    readCommandersInfo(fillSelect);
});