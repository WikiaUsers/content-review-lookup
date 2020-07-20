function wftest1 () {
  var wfelem = document.getElementById('wftest');
  var table = document.createElement('table');
  var wftitle = mw.config.get('wgPageName');
  table.setAttribute('class','wikitable');
  table.setAttribute('style','text-align:center;');
  table.setAttribute('width','100%');

  var row7 = table.insertRow(0);
  var cell11 = row7.insertCell(0);
  cell11.setAttribute('colspan','2');
  cell11.style.background =  '#d7d7d7';
  
  var row6 = table.insertRow(0);
  var cell10 = row6.insertCell(0);
  cell10.setAttribute('colspan','2');
  
  var row5 = table.insertRow(0);
  var cell8 = row5.insertCell(0);
  var cell9 = row5.insertCell(1);
  
  var row4 = table.insertRow(0);
  var cell6 = row4.insertCell(0);
  var cell7 = row4.insertCell(1);

  var row3 = table.insertRow(0);
  var cell4 = row3.insertCell(0);
  var cell5 = row3.insertCell(1);
  
  var row2 = table.insertRow(0);
  var cell2 = row2.insertCell(0);
  cell2.style.background =  '#d7d7d7';
  cell2.innerHTML = "Attachment";
  var cell3 = row2.insertCell(1);
  cell3.style.background =  '#d7d7d7';
  cell3.innerHTML = "Effect";
  
  var row1 = table.insertRow(0);
  var cell1 = row1.insertCell(0);

  cell1.setAttribute('colspan','2');
  cell1.style.background =  '#d7d7d7';
  cell1.innerHTML = "Muzzle";
  
  var form = document.createElement("form");
  var input1 = document.createElement("input");
  var input2 = document.createElement("input");
  var input3 = document.createElement("input");
  var input4 = document.createElement("input");
  var input5 = document.createElement("input");
  var input6 = document.createElement("input");
  var span1 = document.createElement("span");
  var span2 = document.createElement("span");
  var span3 = document.createElement("span");
  var span4 = document.createElement("span");
  var span5 = document.createElement("span");
  var span6 = document.createElement("span");
  var span7 = document.createElement("span");
  /* Buttons */
  /* Muzzle */
  input1.setAttribute("type", "radio");
  input1.setAttribute("id", "nomuzzle_input");
  input1.setAttribute("name", "wftest-radio1");
  input1.checked = true;
  input2.setAttribute("type", "radio");
  input2.setAttribute("id", "ss_input");
  input2.setAttribute("name", "wftest-radio1");
  input3.setAttribute("type", "radio");
  input3.setAttribute("id", "as1_input");
  input3.setAttribute("name", "wftest-radio1");
  input4.setAttribute("type", "radio");
  input4.setAttribute("id", "as2_input");
  input4.setAttribute("name", "wftest-radio1");
  input5.setAttribute("type", "radio");
  input5.setAttribute("id", "ab_input");
  input5.setAttribute("name", "wftest-radio1");
  input6.setAttribute("type", "button");
  input6.setAttribute("value", "Submit"); 
  input6.setAttribute("onclick", "wftestf3();");
  /* Span */
  span1.setAttribute("id", "wftest-span1");
  span1.innerHTML = "None";
  span2.setAttribute("id", "wftest-span2");
  span2.innerHTML = "Shared Silencer";
  span3.setAttribute("id", "wftest-span3");
  span3.innerHTML = "Assault Silencer";
  span4.setAttribute("id", "wftest-span4");
  span4.innerHTML = "-";
  span5.setAttribute("id", "wftest-span5");
  span5.innerHTML = "-15% Damage";
  span6.setAttribute("id", "wftest-span6");
  span6.innerHTML = "-10% Damage";
  span7.setAttribute("id", "wftest-span7");
  span7.innerHTML = "Damage: 0";
  form.appendChild(document.createTextNode(" ==> "));
  cell4.appendChild(input1);
  cell4.appendChild(span1);
  cell5.appendChild(span4);
  cell6.appendChild(input2);
  cell6.appendChild(span2);
  cell7.appendChild(span5);
  cell8.appendChild(input3);
  cell8.appendChild(span3);
  cell9.appendChild(span6);
  cell10.appendChild(span7);
  cell11.appendChild(input6);
  form.appendChild(table);
  form.appendChild(document.createTextNode(" <== "));
  wfelem.appendChild(form);
  var wftestquery = document.querySelector(".wftest-class").getAttribute('data-damage');
  document.getElementById("wftest-span7").innerHTML = "Damage:" + wftestquery;
}
function wftestf2() {
  var wftestquery = document.querySelector(".wftest-class").getAttribute('data-damagemin');
  document.getElementById("wftest-span7").innerHTML = "Damage:" + wftestquery;
}
function wftestf3() {
   $.get(mw.util.wikiScript() + "?title=Module:BvictimHunter/Username&action=raw", function(data){
       var weapdataindex1 = data.indexOf("Weapons Listed:");
       var weapdataindex2 = data.indexOf("}}");
       var weapondata1 = data.slice(weapdataindex1 + 15, weapdataindex2);
       var weapondata2 = weapondata1.split("\n");
       var weapondata3 = [];
       var weapdata3i = 0;
       for (var i=0;i<weapondata2.length;i++){
           var weapdataindex3 = weapondata2[i].indexOf("{");
           var weapdataindex4 = weapondata2[i].indexOf("}");
           if (!(weapdataindex3 == -1)){
              weapondata2[i] = weapondata2[i].slice(weapdataindex3 + 1, weapdataindex4);
              weapondata3[weapdata3i] = weapondata2[i];
              weapdata3i++;
           }
       }
       document.getElementById("wftest-span7").innerHTML = weapondata3 + "..." + weapdata3i;
   });
}

addOnloadHook(wftest1);