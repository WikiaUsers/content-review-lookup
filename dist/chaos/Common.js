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

var w_ = [
    [0.2],
    [0.2, 0.08],
    [0.2, 0.0333, 0.02],
    [0.2, 0.0333, 0.02, 0.0133],
    [0.2, 0.0333, 0.02, 0.0133, 0.0066]
  ];

var petList = [];

function tierMatrix(tier) {
    var weight = w_[tier-1];
    var u = u_[tier-1];
    var min = Infinity;
    for (var x1 = 0; x1 < tier; x1++) {
        for (var x2 = 0; x2 < tier; x2++) {
            for (var x3 = 0; x3 < tier; x3++) {
                for (var x4 = 0; x4 < tier; x4++) {
                    for (var x5 = 0; x5 < tier; x5++) {

                        var petTier = [tier - x1, tier - x2, tier - x3, tier - x4, tier - x5];
                        var petWeight = [weight[x1], weight[x2], weight[x3], weight[x4], weight[x5]];

                        var sumTier = 0;
                        var sumWeight = 0;

                        var priceTier = [];
                        var priceWeight = [];

                        for(var i = 0; i < 5; i++){
                            sumWeight += petWeight[i];
                            priceWeight.push(sumWeight);
                            sumTier += p_[petTier[i] - 1];
                            priceTier.push(sumTier);
                        }

                        var prices = [];
    
                        for (i = 0; i < 5; i++) {
                            prices[i] = (u / priceWeight[i]) + p_[tier-1] + priceTier[i];
                        }

                        for (var x = 0; x < 5; x++) {
                            if (prices[x] < min) {

                                min = prices[x];
                                petList = [];

                                for(i = 0; i <= x; i++){
                                    petList.push(petTier[i]);
                                }
                            }
                        }

                    }
                }
            }
        }
    }

    p_[tier] = Math.round(min);

}

$(document).ready(function() {

    var i = 1;
    var length = document.querySelectorAll('.FFRSRcalculator').length;

    while (i <= length) {
        $("span#NumBox-" + i).html('<input onClick="this.select();" type="number" value="0" style="text-shadow: 2px 2px 2px black; border: 5px solid #48526B; border-radius: 5px; background-color: #48526B; color: white; width: 100px font-weight: bold;"></input>');
        $("span#TypeBox-" + i).html('<select style="text-shadow: 2px 2px 2px black; border: 5px solid #48526B; border-radius: 5px; background-color: #48526B; color: white; font-weight: bold;"><option value="1">%</option><option value="2">RSR</option></select>');
        i++;
    }
    $(".calcFFRSR").click(function() {
        var id = this.id.substring(5);
        console.log(id);
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

        i = 1;
        while (i <= 5) {
            tierMatrix(i);
            var j = 1;
            document.getElementById("Cost" + i + "-" + id).innerHTML = p_[i] + " RSR";
            while (j <= 5) {
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
                j++;
            }
            i++;
        }
    });
});