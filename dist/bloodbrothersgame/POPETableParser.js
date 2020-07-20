function onFinishedGettingFamTable(fillSelectFunc)
{
   var queryRes = JSON.parse(sessionStorage.famJSON);

    var famSelectObj = [];
   var famList = queryRes.query.pages["154453"].revisions[0]["*"];

   var myRe = /\{\{POPE.*\}\}/g;
   var optVars = /\|\w+\=[^\|}]+/g;
   var myPOPERE = /.*POPE Row\|(.*)\|(.*)\|([\d,]+)\|([\d,]+)\|([\d,]+)\|([\d,]+)\|([\d,]+)/;
   var myFamsArray = "";
   var currentEntry = "";
   var i = 0;
   var j = 0;
   var skill2 = "";
   var skill3 = "";
   var skillPos = 0;

   var famInfo = [];
   
   while ((myFamsArray = myRe.exec(famList)) !== null) 
   {
      // remove optional variables
      skill2 = "";
      skill3 = "";
      while (optionalList = optVars.exec(myFamsArray[0]))
      {
           if ((skillPos = optionalList[0].search("skill2")) != -1) {
                skill2 = optionalList[0].substr(skillPos+7);
           }
           if ((skillPos = optionalList[0].search("skill3")) != -1) {
                skill3 = optionalList[0].substr(skillPos+7);
           }
      }
      // run expression on remaining string 
      currentEntry = myFamsArray[0];
      currentEntry = currentEntry.replace(optVars, "");
      currentEntry = myPOPERE.exec(currentEntry);
      
        famSelectObj[i] = [];
        famSelectObj[i][0] = currentEntry[1];
        famSelectObj[i][1] = i;

      famInfo.push({
          name: currentEntry[1],
          hp: currentEntry[3],
          atk: currentEntry[4],
          def: currentEntry[5],
          wis: currentEntry[6],
          agi: currentEntry[7],
          skill1: currentEntry[2],
          skill2: skill2,
          skill3: skill3,
      });
      i++;
   }
   
   famSelectObj.sort();
   var sel = document.createElement("select");
    for (i=0;i<famSelectObj.length;i++) {
        var op = new Option(famSelectObj[i][0], famSelectObj[i][1]);
        op.setAttribute("id", famSelectObj[i][0] + " Option");
        sel.add(op);
    }
    
   sessionStorage.famInfo = JSON.stringify(famInfo);
   sessionStorage.famSelect = sel.innerHTML;

   fillSelectFunc();
}


function readFamiliarsInfo(fillSelectFunc)
{
   if (!sessionStorage.famJSON) 
   {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
             sessionStorage.famJSON = xmlhttp.response;
             onFinishedGettingFamTable(fillSelectFunc);
         }
      };
     
      xmlhttp.open("GET", "http://bloodbrothersgame.wikia.com/api.php?action=query&prop=revisions&titles=POPE_Stats_Table&rvprop=content&format=json", true);
      xmlhttp.send();
      console.log("Fetching POPE table");
   } else {
      // already cached, just parse it and get the result
      onFinishedGettingFamTable(fillSelectFunc);
   }
}