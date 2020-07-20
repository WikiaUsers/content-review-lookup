var modStats = null;
if (weaponCalcDiv = document.getElementById('weaponCalc')) {
    
    modStats = {
        "Нет":{},
        "Апертурный прицел 1":{
            "Run_Modifier":0.50,
            "Marksman_Modifier":-0.05,
            "Marksman_FoV_16:9":-5,
            "Marksman_FoV_4:3":-5
        },    
        "Апертурный прицел 2":{
            "Run_Modifier":1,
            "Marksman_Modifier":-0.10,
            "Marksman_FoV_16:9":-5,
            "Marksman_FoV_4:3":-5
        },
        "Апертурный прицел 3":{
            "Run_Modifier":1.50,
            "Marksman_Modifier":-0.15,
            "Marksman_FoV_16:9":-5,
            "Marksman_FoV_4:3":-5
        },
        "Компенсатор 1":{
            "Time_to_Kill":0.15,
            "Shots_to_Kill":1,
            "Health_Damage":-8.70,
            "Hard Damage":-0.95,
            "Per Shot Modifier":-0.06
        },
        "Компенсатор 2":{
            "Time_to_Kill":0.15,
            "Shots_to_Kill":1,
            "Health_Damage":-17.70,
            "Hard Damage":-1.95,
            "Per Shot Modifier":-0.12
        },
        "Компенсатор 3":{
            "Time_to_Kill":0.15,
            "Shots_to_Kill":1,
            "Health_Damage":-26.20,
            "Hard Damage":-2.85,
            "Per Shot Modifier":-0.18            
        },
        "Кожух с охлаждением 1":{},
        "Кожух с охлаждением 2":{},
        "Кожух с охлаждением 3":{},
        "Сверловка ствола 1":{},
        "Сверловка ствола 2":{},
        "Сверловка ствола 3":{},
        "Тактический ремень 1":{},
        "Тактический ремень 2":{},
        "Тактический ремень 3":{},
        "Эластичный ремень":{},
    };
    var tableRows = '';
    var dropDownOptions = '';
    for (var ing in modStats) {
        dropDownOptions += '<option>' + ing + '</option>';
    }
    
    RowMods = '';
        var mod1Select = '<select id="weaponCalcIng1" onchange="calcWeapon()">';
        mod1Select += dropDownOptions + '</select>';
        var mod2Select = '<select id="weaponCalcIng2" onchange="calcWeapon()">';
        mod2Select += dropDownOptions + '</select>';
        var mod3Select = '<select id="weaponCalcIng3" onchange="calcWeapon()">';
        mod3Select += dropDownOptions + '</select>';
    RowMods += '<th>' + mod1Select + '</th><th>' + mod2Select + '</th><th>' + mod3Select + '</th>';
        
    weaponCalcDiv.innerHTML = '<table class="wikitable" style="width:50%; float:center;">'+
    '<tbody><tr>'+
        '<th colspan="3">Оружие</th>'+
    '</tr><tr>' + RowMods + '</tr></tbody></table>';
}

function calcWeapon() {
    //
    mod1 = modStats[weaponCalcIng1.value];
    mod2 = modStats[weaponCalcIng2.value];
    mod3 = modStats[weaponCalcIng3.value];

    var listRow = new Array;
    listRow = [
        "Time_to_Kill",
        "Shots_to_Kill",
        "Health_Damage",
        "Stamina_Damage",
        "Hard_Damage",
        "Dropoff_Range" ,
        "Min_Damage_Range",
        "Max_Range" ,
        "Minimum_Damage",
        "Equip_Time" ,
        "Fire_Interval",
        "Reload_Time",
        "Crouched_Speed",
        "Walk_Speed",
        "Marksman_Speed",
        "Run_Speed" ,
        "Sprint_Speed",
        "Accuracy_Radius",
        "Per_Shot_Modifier",
        "Shot_Modifier_Cap",
        "Recovery_Delay",
        "Recovery_Per Second",
        "Crouch_Modifier",
        "Walk_Modifier",
        "Run_Modifier",
        "Sprint_Modifier",
        "Jump_Modifier" ,
        "Marksman_Modifier",
        "In_Vehicle_Modifier",
        "Marksman_FoV_16:9",
        "Marksman_FoV_4:3",
        "Ammo_Capacity",
        "Magazine_Capacity" 
    ];
    for (var idRow in listRow){
        FindId = listRow[idRow];
            
        FindValue = 'mod'+FindId;
        FindValue = document.getElementById(FindValue);
            
        var valueCalc = null;
        
        if(FindValue!=null)   
            document.getElementById(FindId).innerHTML = document.getElementById(FindId).innerHTML.split('<span')[0];
                
        if(mod1[FindId]!=null) {
            valueCalc = mod1[FindId];
        }
    
        if(mod2[FindId]!=null) { 
            if(valueCalc==null) 
                valueCalc = mod2[FindId];
            else    
                valueCalc = (valueCalc+mod2[FindId]);
        }
                
        if(mod3[FindId]!=null) { 
            if(valueCalc==null)
                valueCalc = mod3[FindId];
            else
                valueCalc = (valueCalc+mod3[FindId]);
        }
                
        if(valueCalc!=null) {
            RowStat = document.getElementById(FindId).innerHTML;
            RowStat += ' <span id="mod' + listRow[idRow] + '" style="color:green;">(';
            RowStat += parseFloat(document.getElementById(FindId).innerText)+valueCalc;
            RowStat += ')</span>';
            document.getElementById(FindId).innerHTML = RowStat;
        }
    }    
}