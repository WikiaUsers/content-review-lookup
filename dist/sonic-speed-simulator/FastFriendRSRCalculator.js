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
var Custom = false;


//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------


function tierMatrix(tier) {
    var chance = c_[tier-1];
    var u = u_[tier-1];
    min = Infinity;
    for (var x1 = 0; x1 < tier; x1++) {
        for (var x2 = 0; x2 < tier; x2++) {
            for (var x3 = 0; x3 < tier; x3++) {
                for (var x4 = 0; x4 < tier; x4++) {
                    for (var x5 = 0; x5 < tier; x5++) {

                        Calculator(x1, x2, x3, x4, x5, tier, chance, u);

                    }
                }
            }
        }
    }

    p_[tier] = min;

}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

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
        if (prices[x] <= min) {
            min = Math.round(prices[x]);
            bestChance = priceChance[x]*100;
            petList = [];

            for(i = 0; i <= x; i++){
                petList.push(petTier[i]);
            }

            petList.sort(function(a, b) {
  						return b - a;
			});
        }
    }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

function CustomMode(id){
    var selectHtml = '<select onchange="this.style.color = this.options[this.selectedIndex].style.color;" style="text-shadow: 2px 2px 2px black; border: 5px solid #48526B; border-radius: 5px; background-color: #48526B; font-weight: bold; color: gray">';
    var endselect = '</select>';
    var star1 = '<option value="0" style="color: gray;">Nothing</option><option value="1" style="color: white;">1 star</option>';
    var star2 = star1 + '<option value="2" style="color: green;">2 star</option>';
    var star3 = star2 + '<option value="3" style="color: dodgerblue;">3 star</option>';
    var star4 = star3 + '<option value="4" style="color: blueviolet;">4 star</option>';
    var star5 = star4 + '<option value="5" style="color: orange;">5 star</option>';
    var stars = [star1, star2, star3, star4, star5];

    for (var i = 1; i <= 5; i++) {
        $("#Cost" + i + "-" + id).html("-");
        $("#Chance" + i + "-" + id).html("-");
        for (var j = 1; j <= 5; j++) {
            $("#FFs" + i + "_" + j + "-" + id).html('-');
            $("#FFs" + i + "_" + j + "-" + id).css("color", "gray");
            if (Custom) {
                $("#FFs" + i + "_" + j + "-" + id).html(selectHtml + stars[i-1] + endselect);
            }
        }
    }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

function CustomCalculator(tier){

    var chance = c_[tier-1];
    var u = u_[tier-1];

    var sumTier = 0;
    var sumChance = 0;

    for(var i = 0; i < 5; i++){
        if (petList[i] != 0){
            sumChance += chance[tier - petList[i]];
            sumTier += p_[petList[i]-1];
        }
    }

    petList = [];

    min = Math.round((u / sumChance) + p_[tier-1] + sumTier);
    p_[tier] = min;
    bestChance = sumChance*100;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

function isBlank(arr) {

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            return false;
        }
    }
    return true;
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------


$(document).ready(function() {

    var length = document.querySelectorAll('.FFRSRcalculator').length;

    for (var i = 1; i <= length; i++) {
        $("span#NumBox-" + i).html('<input onClick="this.select();" type="number" value="0" style="text-shadow: 2px 2px 2px black; border: 5px solid #48526B; border-radius: 5px; background-color: #48526B; color: white; max-width: 100px font-weight: bold;"></input>');
        $("span#TypeBox-" + i).html('<select style="text-shadow: 2px 2px 2px black; border: 5px solid #48526B; border-radius: 5px; background-color: #48526B; color: white; font-weight: bold;"><option value="1">%</option><option value="2">RSR</option></select>');
         $("span#CustomMode-" + i).html('<input type="checkbox"></span>');
    }
    
	$(document).on('change', '.CustomMode input[type="checkbox"]', function() {
	    var id = 1;
	    if ($(this).is(':checked')) {
	        Custom = true;
	    } else {
	        Custom = false;
	    }
	    CustomMode(id);
	});

    $(".calcFFRSR").click(function() {
        var id = 1;
        var isSame = 0;
        console.log("Id:" + id);
        p_ = [0, 0, 0, 0, 0, 0];
        petList = [];

        $("#Warning-" + id).html("");

        p_[0] = parseFloat($("#NumBox-" + id + " > input").val());
        
        var percentOrRSR = parseInt($("#TypeBox-" + id + " > select").val());

        if (percentOrRSR == 1) {
            if (p_[0] <= 0){
            	$("#Warning-" + id).html("Warning: Chance cant be 0% or lower.");
            	$("#NumBox-" + id + " > input")[0].value = 1;
            	p_[0] = 1;
            }
            p_[0] = Math.round(10 / (p_[0] / 100));
        }
        else{
	        if (p_[0] < 0) {
	        	$("#Warning-" + id).html("Warning: Cost cant be below 0 RSR.");
	            $("#NumBox-" + id + " > input")[0].value = 0;
	            p_[0] = 0;
	        }
        }

        document.getElementById("BaseCost-" + id).innerHTML = p_[0] + " RSR";

        for (var i = 1; i <= 5; i++) {
            if (Custom) {
                for (var j = 1; j <= 5; j++) {
                    petList[j-1] = parseInt($("#FFs" + i + "_" + j + "-" + id + " select").val());
                }               
				
                if(isBlank(petList)){
                    tierMatrix(i);
                    for (var j = 1; j <= 5; j++) {
                        var pet = petList[j-1];
                        var active = $("#FFs" + i + "_" + j + "-" + id + " select");
                        if (pet === undefined){
                            active.css("color", "gray");
                            active.val(0);
                        }
                        if (pet === 1){
                            active.css("color", "white");
                        }
                        if (pet === 2){
                            active.css("color", "green");
                        }
                        if (pet === 3){
                            active.css("color", "dodgerblue");
                        }
                        if (pet === 4){
                            active.css("color", "blueviolet");
                        }
                        if (pet === 5){
                            active.css("color", "orange");
                        }
                        if (pet !== undefined){
                        active.val(petList[j - 1]);
                        }
                    }
                }
                else
                {
                    CustomCalculator(i);
                    isSame+=1;
                }
                
                document.getElementById("Cost" + i + "-" + id).innerHTML = p_[i] + " RSR";
                document.getElementById("Chance" + i + "-" + id).innerHTML = parseFloat(bestChance.toFixed(2));

            } else {
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
                        active.style.cssText = "color: gray; ";
                    }
                }
            }  
        }

        if (isSame == 5){
            $("#Warning-" + id).html("Warning: Fast Friends already inputted, calculating only Cost.");
        }

    });
});