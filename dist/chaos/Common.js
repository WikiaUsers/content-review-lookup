//                                    ..,*,. 
//                           .,*///(/////((#%&&&&%(/,.                            
//                        ,*(((((/////////*****//(##&@@%*                         
//                    .*((((////*******////////******/(%&@&/                      
//                  *##(//*****,,,,,,,,,,******/(((/****/(#&@&/                   
//                ,##/****,,,,,,,,,..    .,  ..,*///((/*****/#&@#.                
//              .(%(***,,,,,,,,.        ./*.       .*((#(/****(#&&,               
//             *%#/**,,,,,,,            /(*,          .*(#(****/(%@(              
//           .(#/**,,,,,,,             *#/**,            *##/****/#&&,            
//           *#/**,,,,,,.             .##***,.            ,(#(****/(%&/           
//           (#/**,,,,,.             .(%(****,.            ./%#/***/(%(.          
//          ,#(**,,,,*,  ,////////////##/***************,,,,,(%(****/##,          
//         .(#/**,,***,     *(((//////(#****//////***,,,,.   *%#*****/(*          
//         ,%(********.       ./(((((///****,,,,,,,,,,.      .#%/*****//.        
//         .(#******//,          ,/((%(***,,,,,,,,,.         ./%#******/,        
//          *#/*****/#(.          /%#/,,/(*******,           ,#%(*******.        
//          .#(*****/#%*         *%#*,,,,/((*****,.          /%#/*,,***,         
//           /#/****/(##*       ,#(,,,,,,,*((/****,         .#%(*,,,,*,.          
//           .((/*****(#&(     .#(,,,,.     ./((***,       ,(%#/*,,,,,.           
//             /#/*****/#&&,   //,,.           ./(*,.     /#%#/*,,,,,,.           
//              ,#(*****/(%@&/..                  .**   ,(##(**,,,,,,             
//                /#/*****/(#&@&/                    *//#%(/*,,,,,,.              
//                 ,(#//*****/(%&@@&#/*.      ...,*//#%#(/**,,,,,.                
//                   ./#(//******//((#####(//////(##(//***,,,,,.                    
//                      .*((///////////////((((((///***,,,,,,.                       
//                          ,//(((//////////////***,,,,,,,                           
//                              .,,********,,,,,,,,,,,.                              
//                                      ....                                                                            

var p_ = [0, 0, 0, 0, 0, 0];

var u_ = [20, 50, 200, 300, 500];

var c_ = [
    [0.2],
    [0.2, 0.08],
    [0.2, 0.0333, 0.02],
    [0.2, 0.0333, 0.02, 0.0133],
    [0.2, 0.0333, 0.02, 0.0133, 0.0066]
  ];

var petList = [];
var bestChance = 0;
var min = Infinity;

function tierMatrix(tier) {
    var chance = c_[tier-1];
    var u = u_[tier-1];
    min = Infinity
    for (var x1 = 0; x1 < tier; x1++) {
        for (var x2 = 0; x2 < tier; x2++) {
            for (var x3 = 0; x3 < tier; x3++) {
                for (var x4 = 0; x4 < tier; x4++) {
                    for (var x5 = 0; x5 < tier; x5++) {

                        Calculator(x1, x2, x3, x4, x5, tier, chance, u)

                    }
                }
            }
        }
    }

    p_[tier] = Math.round(min);

}

function Calculator(x1, x2, x3, x4, x5, tier, chance, u) {

    var petTier = [tier - x1, tier - x2, tier - x3, tier - x4, tier - x5];
    var petChance = [chance[x1], chance[x2], chance[x3], chance[x4], chance[x5]];

    var sumTier = 0;
    var sumChance = 0;

    var priceTier = [];
    var priceChance = [];

    for(var i = 0; i < 5; i++){
        sumChance += petChance[i];
        priceChance.push(sumChance);
        sumTier += p_[petTier[i] - 1];
        priceTier.push(sumTier);
    }

    var prices = [];

    for (i = 0; i < 5; i++) {
        prices[i] = (u / priceChance[i]) + p_[tier-1] + priceTier[i];
    }

    for (var x = 0; x < 5; x++) {
        if (prices[x] < min) {
            min = prices[x];
            bestChance = priceChance[x]*100;
            petList = [];

            for(i = 0; i <= x; i++){
                petList.push(petTier[i]);
            }
        }
    }
}

function CustomMode(id){
    var selectHtml = '<select onchange="this.style.color = this.options[this.selectedIndex].style.color;" style="text-shadow: 2px 2px 2px black; border: 5px solid #48526B; border-radius: 5px; background-color: #48526B; font-weight: bold; color: gray">';
    var endselect = '</select>';
    var star1 = '<option value="-1" style="color: gray;">Nothing</option><option value="0" style="color: white;">1 star</option>';
    var star2 = star1 + '<option value="1" style="color: green;">2 star</option>';
    var star3 = star2 + '<option value="2" style="color: dodgerblue;">3 star</option>';
    var star4 = star3 + '<option value="3" style="color: blueviolet;">4 star</option>';
    var star5 = star4 + '<option value="4" style="color: orange;">5 star</option>';
    var stars = [star1, star2, star3, star4, star5];

    for (var i = 1; i <= 5; i++) {
        $("#Cost" + i + "-" + id).html("-");
        $("#Chance" + i + "-" + id).html("-");
        for (var j = 1; j <= 5; j++) {
            if (Custom) {
                $("#FFs" + i + "_" + j + "-" + id).html(selectHtml + stars[i-1] + endselect);
            } else {
                $("#FFs" + i + "_" + j + "-" + id).html('-');
            }
        }
    }
}

function CustomCalculator(x1, x2, x3, x4, x5, tier){
    var pets = [x1, x2, x3, x4, x5];
    var chance = c_[tier-1];
    var u = u_[tier-1];

    var sumTier = 0;
    var sumChance = 0;

    for(var i = 0; i < 5; i++){
        if (pets[i] != -1){
            sumChance += chance[tier - pets[i] - 1];
            sumTier += p_[tier - pets[i] - 1];
        }
    }

    p_[tier] = Math.round((u / sumChance) + p_[tier-1] + sumTier);
}

function areAllValuesSame(arr) {

    var firstElement = -1;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== firstElement) {
            return false;
        }
    }

    return true;
}

var Custom = false;

$(document).ready(function() {

    var length = document.querySelectorAll('.FFRSRcalculator').length;

    for (var i = 1; i <= length; i++) {
        $("span#NumBox-" + i).html('<input onClick="this.select();" type="number" value="0" style="text-shadow: 2px 2px 2px black; border: 5px solid #48526B; border-radius: 5px; background-color: #48526B; color: white; max-width: 100px font-weight: bold;"></input>');
        $("span#TypeBox-" + i).html('<select style="text-shadow: 2px 2px 2px black; border: 5px solid #48526B; border-radius: 5px; background-color: #48526B; color: white; font-weight: bold;"><option value="1">%</option><option value="2">RSR</option></select>');
        $("span#CustomMode-" + i).html('<input type="checkbox" onchange="Custom = !Custom; CustomMode(' + i + ');" style="margin-top: 5px; transform: translateY(2px);" ></input>')
    }

    $(".calcFFRSR").click(function() {
        var id = this.id.substring(5);
        console.log("Id:" + id);
        p_ = [0, 0, 0, 0, 0, 0];
        petList = [];

        p_[0] = parseInt($("#NumBox-" + id + " > input").val());
        if (p_[0] < 0) {
            $("#NumBox-" + id + " > input")[0].value = 0;
            p_[0] = 0;
        }

        var percentOrRSR = parseInt($("#TypeBox-" + id + " > select").val());
        if (percentOrRSR == 1) {
            if (p_[0] < 30) {
                p_[0] *= 3;
            }
            p_[0] = Math.round(10 / (p_[0] / 100));
        }

        document.getElementById("BaseCost-" + id).innerHTML = p_[0] + " RSR";

        for (var i = 1; i <= 5; i++) {
            if (Custom) {
                console.log("custom mode on")
                for (var j = 1; j <= 5; j++) {
                    petList[j] = parseInt($("FFs" + i + "_" + j + "-" + id).val());
                }

                if(areAllValuesSame(petList)){
                    console.log("all values same");
                    tierMatrix(i)
                    for (var j = 1; j <= 5; j++) {
                        var pet = petList[j-1];
                        var active = document.getElementById("FFs" + i + "_" + j + "-" + id);
                        if (pet !== undefined){
                            if (pet === 1){
                                active.style.cssText = "color: white; ";
                            }
                            if (pet === 2){
                                active.style.cssText = "color: green; ";
                            }
                            if (pet === 3){
                                active.style.cssText = "color: dodgerblue; ";
                            }
                            if (pet === 4){
                                active.style.cssText = "color: blueviolet; ";
                            }
                            if (pet === 5){
                                active.style.cssText = "color: orange; ";
                            }
                            active.value = petList[j - 1] + " star";
                        }
                        else {
                            active.value = "Nothing";
                        }
                    }
                }
                else{
                    CustomCalculator(petList[1], petList[2], petList[3], petList[4], petList[5], i);
                }


            } else {
                console.log("custom mode off")
                tierMatrix(i);
                document.getElementById("Cost" + i + "-" + id).innerHTML = p_[i] + " RSR";
                document.getElementById("Chance" + i + "-" + id).innerHTML = parseFloat(bestChance.toFixed(2));
                for (var j = 1; j <= 5; j++) {
                    var pet = petList[j-1];
                    var active = document.getElementById("FFs" + i + "_" + j + "-" + id);
                    if (pet !== undefined){
                        if (pet === 1){
                            active.style.cssText = "color: white; ";
                        }
                        if (pet === 2){
                            active.style.cssText = "color: green; ";
                        }
                        if (pet === 3){
                            active.style.cssText = "color: dodgerblue; ";
                        }
                        if (pet === 4){
                            active.style.cssText = "color: blueviolet; ";
                        }
                        if (pet === 5){
                            active.style.cssText = "color: orange; ";
                        }
                        active.innerHTML = petList[j - 1] + " star";
                    }
                    else {
                        active.innerHTML = "-";
                    }
                }
            }  
        }
    });
});