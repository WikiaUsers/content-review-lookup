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

function addFigure(targetElement, pngName)
{
    var elem = document.createElement("img");
    elem.src = "http://bloodbrothersgame.wikia.com/wiki/Special:FilePath/File:" + encodeURI(pngName);
    elem.height = 85;
    elem.width =  61;

   updateChild(targetElement, elem);
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

    document.getElementById(elementID).innerHTML = "<tbody>" + autoAttack.innerHTML + "<br/>" + autoAttackAffliction.innerHTML + "<br/>" + autoAttackAbility.innerHTML + "</tbody>";
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

function CompareButtonClicked()
{
    var s1 = document.getElementById("familiar1");
    var selectedFam1 = s1.options[s1.selectedIndex].value;

    var s2 = document.getElementById("familiar2");
    var selectedFam2 = s2.options[s2.selectedIndex].value;

    var famInfo = JSON.parse(sessionStorage.famInfo);
    
     document.getElementById("HP1").textContent = famInfo[selectedFam1].hp;
     document.getElementById("ATK1").textContent = famInfo[selectedFam1].atk;
     document.getElementById("DEF1").textContent = famInfo[selectedFam1].def;
     document.getElementById("WIS1").textContent = famInfo[selectedFam1].wis;
     document.getElementById("AGI1").textContent = famInfo[selectedFam1].agi;
     addFigure("fam1Pic", famInfo[selectedFam1].name + "_Figure.png");

     document.getElementById("fam1SkillsHeader").textContent= famInfo[selectedFam1].name + " Skills"; 
     addSkillInfo("SKILL11", famInfo[selectedFam1].skill1);
     if (famInfo[selectedFam1].skill2) {
        addSkillInfo("SKILL21", famInfo[selectedFam1].skill2);
     } else {
        removeChild("SKILL21");
     }

     getAutoAttackInfo(famInfo[selectedFam1].name, "AUTO1");

     document.getElementById("HP2").textContent = famInfo[selectedFam2].hp;
     document.getElementById("ATK2").textContent = famInfo[selectedFam2].atk;
     document.getElementById("DEF2").textContent = famInfo[selectedFam2].def;
     document.getElementById("WIS2").textContent = famInfo[selectedFam2].wis;
     document.getElementById("AGI2").textContent= famInfo[selectedFam2].agi;
     addFigure("fam2Pic", famInfo[selectedFam2].name + "_Figure.png");

     document.getElementById("fam2SkillsHeader").textContent= famInfo[selectedFam2].name + " Skills"; 
     addSkillInfo("SKILL12", famInfo[selectedFam2].skill1);
     if (famInfo[selectedFam2].skill2) {
       addSkillInfo("SKILL22", famInfo[selectedFam2].skill2);
     } else {
       removeChild("SKILL22");
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

  var t1 = document.getElementById("comparisonTable");
  t1.style.visibility = "visible";
  t1.style.display = "";

  var t2 = document.getElementById("skillsTable");
  t2.style.visibility = "visible";
  t2.style.display = "";
}

function onFinishedGettingFamTable()
{
   var queryRes = JSON.parse(sessionStorage.famJSON);

   var famList = queryRes.query.pages["154453"].revisions[0]["*"];

   var myRe = /\{\{POPE.*\}\}/g;
   var myPOPERE = /.*POPE Row\|(.*)\|(.*)\|([\d,]+)\|([\d,]+)\|([\d,]+)\|([\d,]+)\|([\d,]+)/;
   var myPOPE2SkillsRE = /.*POPE Row 2 Skills\|(.*)\|(.*)\|(.*)\|([\d,]+)\|([\d,]+)\|([\d,]+)\|([\d,]+)\|([\d,]+)/;
   var famSelect = "";
   var myFamsArray = "";
   var currentEntry = "";
   var dual = 0
   var i = 0;

   var famInfo = [];

   while ((myFamsArray = myRe.exec(famList)) !== null) 
   {
      dual = 0;

      if (myFamsArray[0].search("POPE Row 2 Skills") != -1 ) {
          currentEntry  = myPOPE2SkillsRE.exec(myFamsArray[0]);
          dual = 1;
      } else {
          currentEntry = myPOPERE.exec(myFamsArray[0]);
      }

      famSelect += "<option value=\""+i+"\">"+currentEntry[1]+"</option>";
      if (dual) {
        famInfo.push({
            name: currentEntry[1],
            hp: currentEntry[3+dual],
            atk: currentEntry[4+dual],
            def: currentEntry[5+dual],
            wis: currentEntry[6+dual],
            agi: currentEntry[7+dual],
            skill1: currentEntry[2],
            skill2: currentEntry[3],
        });
      } else {
        famInfo.push({
            name: currentEntry[1],
            hp: currentEntry[3+dual],
            atk: currentEntry[4+dual],
            def: currentEntry[5+dual],
            wis: currentEntry[6+dual],
            agi: currentEntry[7+dual],
            skill1: currentEntry[2],
            skill2: "",
      });
      }
      i++;
   }

   sessionStorage.famInfo = JSON.stringify(famInfo);
   sessionStorage.FamPage = [];

  var a = document.getElementById("familiar1");
  a.innerHTML = famSelect;

  var b = document.getElementById("familiar2");
  b.innerHTML = famSelect;
}

function readFamiliarsInfo()
{
   if (!sessionStorage.famJSON) 
   {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
             sessionStorage.famJSON = xmlhttp.response;
             onFinishedGettingFamTable();
         }
      };
     
      xmlhttp.open("GET", "http://bloodbrothersgame.wikia.com/api.php?action=query&prop=revisions&titles=POPE_Stats_Table&rvprop=content&format=json", true);
      xmlhttp.send();
      console.log("Fetching POPE table");
   } else {
      // already cached, just parse it and get the result
      onFinishedGettingFamTable();
   }
}

document.ready = function()
{
//  sessionStorage.famJSON = ""; // force cache cleanup
  readFamiliarsInfo();

  var f = document.getElementById("compare");
  f.style.visibility = "visible";
  f.style.display = "";

  addFigure("fam1Pic", "Placeholder Familiar.png");
  addFigure("fam2Pic", "Placeholder Familiar.png");
};