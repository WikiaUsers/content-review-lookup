mw.hook('wikipage.content').add(function () {
  /*============================================================================================*/
  //PrettySpoiler
if($(".pretty-spoiler").length) {

  var texts = { OPEN: "Reveal hidden contents", CLOSE: "Hide contents" };
  
  $('.pretty-spoiler > .title').click(function() {
    var content = $(this).next('div');
    changeTitleState($(this), content.is(":visible"));
    content.slideToggle(300);
  });

  function changeTitleState(elem, state) {
    if(state){
      elem.css("background-color", "rgba(255,255,255,0.1)");
      elem.prop('title', texts.OPEN);
    } else {
      elem.css("background-color", "rgba(255,255,255,0.3)");
      elem.prop('title', texts.CLOSE);
    }
    elem.children('.title-arrow').toggleClass('rotate180');
  }
}

  /*====================================================================================*/
  /*Gear Score Calcuator*/

  if($("#gearScoreCalculator").length) {
    var gearScoreObj = {
      "turrets": [
          {	
              "name": "Mk1",
              "min": 0,
              "max": 500,
              "steps": 10
          },
          {
              "name": "Mk2",
              "min": 500,
              "max": 1000,
              "steps": 10
          },
          {
              "name": "Mk3",
              "min": 1000,
              "max": 1500,
              "steps": 10
          },
          {
              "name": "Mk4",
              "min": 1500,
              "max": 2000,
              "steps": 10
          },
          {
              "name": "Mk5",
              "min": 2000,
              "max": 2500,
              "steps": 10
          },
          {
              "name": "Mk6",
              "min": 2500,
              "max": 3000,
              "steps": 10
          },
          {
              "name": "Mk7",
              "min": 3000,
              "max": 4000,
              "steps": 20
          }
      ],
      "hulls": [
          {
              "name": "Mk1",
              "min": 0,
              "max": 500,
              "steps": 10
          },
          {
              "name": "Mk2",
              "min": 500,
              "max": 1000,
              "steps": 10
          },
          {
              "name": "Mk3",
              "min": 1000,
              "max": 1500,
              "steps": 10
          },
          {
              "name": "Mk4",
              "min": 1500,
              "max": 2000,
              "steps": 10
          },
          {
              "name": "Mk5",
              "min": 2000,
              "max": 2500,
              "steps": 10
          },
          {
              "name": "Mk6",
              "min": 2500,
              "max": 3000,
              "steps": 10
          },
          {
              "name": "Mk7",
              "min": 3000,
              "max": 4000,
              "steps": 20
          }
      ],
      "modules": [
          {
              "name": "Mk1",
              "min": 40,
              "max": 80,
              "steps": 5
          },
          {
              "name": "Mk2",
              "min": 80,
              "max": 120,
              "steps": 5
          },
          {
              "name": "Mk3",
              "min": 120,
              "max": 160,
              "steps": 5
          },
          {
              "name": "Mk4",
              "min": 160,
              "max": 200,
              "steps": 5
          },
          {
              "name": "Mk5",
              "min": 200,
              "max": 240,
              "steps": 5
          },
          {
              "name": "Mk6",
              "min": 240,
              "max": 280,
              "steps": 5
          },
          {
              "name": "Mk7",
              "min": 280,
              "max": 400,
              "steps": 15
          }
      ],
      "drone": {
          "min": 59,
          "max": 599,
          "steps": 20
      },
      "turretAlteration": 100,
      "hullAlteration": 100
    };
    var template = [
      '<fieldset>',
        '<legend>Calculadora de puntuación de engranajes</legend>',
        '<label>Torreta: </label><select data-obj="turrets" id="turret"><option data-static="true" value="0" disabled selected>Modificación</option>' + fillDropdownFromObj(gearScoreObj.turrets) + '</select> <select id="turretUpgrades"><option data-static="true" value="0" disabled selected>Actualizaciones</option></select><br>',
        '<label>Casco: </label><select data-obj="hulls" id="hull"><option data-static="true" value="0" disabled selected>Modificación</option>' + fillDropdownFromObj(gearScoreObj.hulls) + '</select> <select id="hullUpgrades"><option data-static="true" value="0" disabled selected>Actualizaciones</option></select><br>',
        '<label>Ranura de módulo 1: </label><select data-obj="modules" id="module1"><option data-static="true" value="none" selected>Ninguno</option>' + fillDropdownFromObj(gearScoreObj.modules) + '</select> <select id="moduleUpgrades1" disabled><option data-static="true" value="0" disabled selected>Actualizaciones</option></select><br>',
        '<label>Ranura de módulo 2: </label><select data-obj="modules" id="module2"><option data-static="true" value="none" selected>Ninguno</option>' + fillDropdownFromObj(gearScoreObj.modules) + '</select> <select id="moduleUpgrades2" disabled><option data-static="true" value="0" disabled selected>Actualizaciones</option></select><br>',
        '<label>Ranura de módulo 3: </label><select data-obj="modules" id="module3"><option data-static="true" value="none" selected>Ninguno</option>' + fillDropdownFromObj(gearScoreObj.modules) + '</select> <select id="moduleUpgrades3" disabled><option data-static="true" value="0" disabled selected>Actualizaciones</option></select><br>',
        '<label>Dron: </label><select data-obj="drone" id="droneUpgrades"><option data-static="true" value="0" selected>Ninguno</option>' + fillUpgrades($('#droneUpgrades'), 'drone') + '</select><br><br>',
        '<label>Alteración de torreta: </label><input type="checkbox" id="gsAlterationTurret" /><br><br>',
        '<label>Alteración de casco: </label><input type="checkbox" id="gsAlterationHull" /><br><br>',
        '<strong>Puntuación total de engranajes: <span style="color: #ffc178;" id="gearScore">0</span></strong><br>',
      '</fieldset>',
     ].join('\n');
     $("#gearScoreCalculator").empty().html(template);
     $("#gearScoreCalculator select, #gearScoreCalculator input").on("input, change", function() {
       if($(this).is("label + select") && $(this).is(":not(#droneUpgrades)") && $(this).val() != "none") {
         fillUpgrades($(this), $(this).attr("data-obj"));
       }

       if($(this).is("select[data-obj=modules]")) {
         if($(this).val() != "none") {
           $(this).next("select").prop("disabled", false);
         } else {
           $(this).next().val("0").change().prop("disabled", "disabled");
         }
       }
       calculateGearScore();
     });

     function calculateGearScore() {
       var gs = 0;
       var turretDropdown = $("#turret");
       var turretUpgrades = $("#turretUpgrades");
       var hullDropdown = $("#hull");
       var hullUpgrades = $("#hullUpgrades");
       var moduleDropdown1 = $("#module1");
       var moduleUpgrades1 = $("#moduleUpgrades1");
       var moduleDropdown2 = $("#module2");
       var moduleUpgrades2 = $("#moduleUpgrades2");
       var moduleDropdown3 = $("#module3");
       var moduleUpgrades3 = $("#moduleUpgrades3");
       var droneDropdown = $("#drone");
       var droneUpgrades = $("#droneUpgrades");
       var alterationTurretCheckbox = $("#gsAlterationTurret");
       var alterationHullCheckbox = $("#gsAlterationHull");

       gs+= parseInt(turretUpgrades.val());
       gs+= parseInt(hullUpgrades.val());
       gs+= parseInt(moduleUpgrades1.val());
       gs+= parseInt(moduleUpgrades2.val());
       gs+= parseInt(moduleUpgrades3.val());
       gs+= parseInt(droneUpgrades.val());

       if(alterationTurretCheckbox.is(":checked")) {
         gs+= gearScoreObj.turretAlteration;
       }
       if(alterationHullCheckbox.is(":checked")) {
         gs+= gearScoreObj.hullAlteration;
       }

       $("#gearScore").text(gs);
     }

     function fillUpgrades(select, obj) {
       if(obj != "drone") {
       select.next("select").find("option:not(option[data-static=true])").remove();
       select.next("select").find("option:last-child").after(function() {
         var output = "";
         var key = select.find("option[value=" + select.val() + "]").attr("data-key");
         var name = select.attr("data-obj");
         var minGS = gearScoreObj[name][key].min;
         var gsPerStep = Math.round(parseFloat((gearScoreObj[name][key].max-gearScoreObj[name][key].min)/(gearScoreObj[name][key].steps)));
         for(i = 0; i < gearScoreObj[name][key].steps; i++) {
           if(i == 0) {
             output+='<option value="' + minGS + '">Micro-actualización ' + parseInt(i) + '</option>';
           }
           var currentOptionsGS = parseInt(minGS+((i+1)*gsPerStep));
           output+='<option value="' + currentOptionsGS + '">Micro-actualización ' + parseInt(i+1) + '</option>';
         }
         return output;
       });
       } else {
         var output = "";
         var name = obj;
         var minGS = gearScoreObj[name].min;
         var gsPerStep = parseFloat((gearScoreObj[name].max-gearScoreObj[name].min)/(gearScoreObj[name].steps));
         for(i = 0; i < gearScoreObj[name].steps; i++) {
           if(i == 0) {
             output+='<option value="' + minGS + '">Micro-actualización ' + parseInt(i) + '</option>';
           }
           var currentOptionsGS = Math.round(parseFloat(minGS+((i+1)*gsPerStep)));
           output+='<option value="' + currentOptionsGS + '">Micro-actualización ' + parseInt(i+1) + '</option>';
         }
         return output;
       }
     }

     function fillDropdownFromObj(obj) {
       var output = "";
       for(key in obj) {
         output+= '<option data-key="' + key + '" value="' + obj[key].name + '">' + obj[key].name + '</option>';
       }
       return output;
     }
  }
});