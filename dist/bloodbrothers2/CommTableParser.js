function onFinishedGettingCommTable(fillSelectFunc)
{
   var queryRes = JSON.parse(sessionStorage.CommJSON);

   var CommList = queryRes.query.pages["6291"].revisions[0]["*"];

   var myRe = /\{\{CommTableRow.*\}\}/g;
   var optVars = /\|\w+\=[^\|}]+/g;
   var myCommRE = /.*CommTableRow\|([^\|]*)\|([^\|]*)\|([^\|]*)\|([^\|]*)\|([^\|]*)\|([^\|]*)\|([^\|]*)\|(?:\w+\|)?([\d,]+)\|([\d,]+)\|([\d,]+)\|([\d,]+)\|(\d)/;
   var CommSelect = "";
   var myFamsArray = "";
   var currentEntry = "";
   var i = 0;
   var lskill = "";
   var skillPos = 0;

   var famInfo = [];
   var famSelect = "";

  while ((myFamsArray = myRe.exec(CommList)) !== null) 
  {
      // remove optional variables
      lskill = "";
      currentEntry = myFamsArray[0];
      while (optionalList = optVars.exec(myFamsArray[0]))
      {
           if ((skillPos = optionalList[0].search("lskill")) != -1) {
                lskill = optionalList[0].substr(skillPos+7);
           }
      }
      
      // run expression on remaining string 
      currentEntry = currentEntry.replace(optVars, "");
      currentEntry = myCommRE.exec(currentEntry);
      famSelect += "<option value=\""+i+"\">"+currentEntry[1]+"</option>";
      famInfo.push({
          name: currentEntry[1],
          rarity: currentEntry[2],
          affinity: currentEntry[3],
          hp: currentEntry[8],
          atk: currentEntry[9],
          def: currentEntry[10],
          wis: currentEntry[11],
          askill: currentEntry[5],
          source: currentEntry[6],
          evostep: currentEntry[12],
          lskill: lskill,
      });
      i++;
   }
 
   sessionStorage.famInfo = JSON.stringify(famInfo);
   sessionStorage.famSelect = famSelect;
 
   fillSelectFunc();
}

function readCommandersInfo(fillSelectFunc)
{
   if (!sessionStorage.CommJSON) 
   {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
             sessionStorage.CommJSON = xmlhttp.response;
             onFinishedGettingCommTable(fillSelectFunc);
         }
      };
     
      xmlhttp.open("GET", "http://bloodbrothers2.wikia.com/api.php?action=query&prop=revisions&titles=Commander_Table&rvprop=content&format=json", true);
      xmlhttp.send();
      console.log("Fetching commander table");
   } else {
      // already cached, just parse it and get the result
      onFinishedGettingCommTable(fillSelectFunc);
   }
}