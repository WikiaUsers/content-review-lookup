/* Gem Calculators - Dahimi */
function timeStamp_GemCalculators_js() {
   return "2017.09.21 01:12 (UTC-7)";
}

function doCalcDarkElixirToGems(resources,TH) {
   var ranges = [1,10,100,1000,10000,100000];
   var gems = [1,5,25,125,600,3000];
   var storagemaxArray = [ // Vary the max level based on the TH selected. If N/A selected, then do not do any carrying over (this is for calculating raw values if so desired). That's defined separately below.
    20000,    	// TH7
    80000,    	// TH8
    190000,    	// TH9
    200000,    	// TH10
    200000,   	// TH11
    240000,   	// TH12
    300000    	// TH13
    ];
	var overfillCostArray = [867, 2467, 5400, 5667, 5667, 6733, 8333];
	if (TH != 0) {
		var storagemax = storagemaxArray[TH-7];
	} else {
		var storagemax = Infinity;
	}
	var overfillTimes = 0;
	var overfillCost = 0;
	var result = 0;
 	if (isNaN(resources)) return("???");
   	else if (resources < 0) return("???");
   	else if (resources == 0) return(0);
   	else if (resources <= ranges[0]) return(gems[0]);
   	if (resources > storagemax) {
        overfillTimes = Math.floor(resources/storagemax);
        overfillCost = overfillCostArray[TH-7]; // Note: no exception for TH = 0 (i.e. N/A), since the condition to enter this block cannot be met then (as storagemax = Infinity)
        resources = resources % storagemax;
   	}
   	if (resources == 0) {
           result = 0;
   	} else if (resources <= ranges[0]) {
           result = gems[0];
   	} else if (resources <= ranges[1]) {
           result = Math.round((resources - ranges[0])/((ranges[1] - ranges[0])/(gems[1] - gems[0])) + gems[0]);
   	} else if (resources <= ranges[2]) {
           result = Math.round((resources - ranges[1])/((ranges[2] - ranges[1])/(gems[2] - gems[1])) + gems[1]);
   	} else if (resources <= ranges[3]) {
           result = Math.round((resources - ranges[2])/((ranges[3] - ranges[2])/(gems[3] - gems[2])) + gems[2]);
   	} else if (resources <= ranges[4]) {
           result = Math.round((resources - ranges[3])/((ranges[4] - ranges[3])/(gems[4] - gems[3])) + gems[3]);
   	} else {
           result = Math.round((resources - ranges[4])/((ranges[5] - ranges[4])/(gems[5] - gems[4])) + gems[4]);
   	}
   	return(result + overfillTimes * overfillCost);
}
 
function doCalcResourceToGems(resources,TH) {
   var ranges = [100,1000,10000,100000,1000000,10000000];
   var gems = [1,5,25,125,600,3000];
   var storagemaxArray = [ // Vary the max level based on the TH selected. If N/A selected, then do not do any carrying over (this is for calculating raw values if so desired)
    Infinity,    // N/A option selected
    2500,       // TH1
    7000,       // TH2
    100000,     // TH3
    500000,     // TH4
    1000000,    // TH5
    2000000,    // TH6
    4000000,    // TH7
    6000000,    // TH8
    8000000,    // TH9
    8500000,    // TH10
    10000000,   // TH11
    14000000,   // TH12
    18000000    // TH13
    ];
   var overfillCostArray = [0, 8, 18, 125, 336, 600, 867, 1400, 1933, 2467, 2600, 3000, 4067, 5133];
   var storagemax = storagemaxArray[TH];
   var overfillTimes = 0;
   var overfillCost = 0;
   var result = 0;
   if (isNaN(resources)) return("???");
   else if (resources < 0) return("???");
   else if (resources == 0) return(0);
   else if (resources <= ranges[0]) return(gems[0]);
   if (resources > storagemax) {
        overfillTimes = Math.floor(resources/storagemax);
        overfillCost = overfillCostArray[TH];
        resources = resources % storagemax;
   }
   if (resources == 0) {
           result = 0;
   } else if (resources <= ranges[0]) {
           result = gems[0];
   } else if (resources <= ranges[1]) {
           result = Math.round((resources - ranges[0])/((ranges[1] - ranges[0])/(gems[1] - gems[0])) + gems[0]);
   } else if (resources <= ranges[2]) {
           result = Math.round((resources - ranges[1])/((ranges[2] - ranges[1])/(gems[2] - gems[1])) + gems[1]);
   } else if (resources <= ranges[3]) {
           result = Math.round((resources - ranges[2])/((ranges[3] - ranges[2])/(gems[3] - gems[2])) + gems[2]);
   } else if (resources <= ranges[4]) {
           result = Math.round((resources - ranges[3])/((ranges[4] - ranges[3])/(gems[4] - gems[3])) + gems[3]);
   } else {
           result = Math.round((resources - ranges[4])/((ranges[5] - ranges[4])/(gems[5] - gems[4])) + gems[4]);
   }
   return(result + overfillTimes * overfillCost);
}

function doCalcBuilderResourceToGems(resources,BH) {
   var ranges = [100,1000,10000,100000,1000000,10000000];
   var gems = [1,10,50,250,1200,6000];
   var storagemaxArray = [ // Vary the max level based on the BH selected. If N/A selected, then do not do any carrying over (this is for calculating raw values if so desired)
    Infinity,    // N/A option selected
    50000,      // BH1
    75000,      // BH2
    250000,     // BH3
    500000,     // BH4
    1500000,    // BH5
    2000000,    // BH6
    3000000,    // BH7
    4000000,    // BH8
    5000000,    // BH9
    ];
   var overfillCostArray = [0, 139, 194, 408, 672, 1467, 1733, 2267, 2800, 3333];
   var storagemax = storagemaxArray[BH];
   var overfillTimes = 0;
   var overfillCost = 0;
   var result = 0;
   if (isNaN(resources)) return("???");
   else if (resources < 0) return("???");
   else if (resources == 0) return(0);
   else if (resources <= ranges[0]) return(gems[0]);
   if (resources > storagemax) {
        overfillTimes = Math.floor(resources/storagemax);
        overfillCost = overfillCostArray[BH];
        resources = resources % storagemax;
   }
   if (resources == 0) {
           result = 0;
   } else if (resources <= ranges[0]) {
           result = gems[0];
   } else if (resources <= ranges[1]) {
           result = Math.round((resources - ranges[0])/((ranges[1] - ranges[0])/(gems[1] - gems[0])) + gems[0]);
   } else if (resources <= ranges[2]) {
           result = Math.round((resources - ranges[1])/((ranges[2] - ranges[1])/(gems[2] - gems[1])) + gems[1]);
   } else if (resources <= ranges[3]) {
           result = Math.round((resources - ranges[2])/((ranges[3] - ranges[2])/(gems[3] - gems[2])) + gems[2]);
   } else if (resources <= ranges[4]) {
           result = Math.round((resources - ranges[3])/((ranges[4] - ranges[3])/(gems[4] - gems[3])) + gems[3]);
   } else {
           result = Math.round((resources - ranges[4])/((ranges[5] - ranges[4])/(gems[5] - gems[4])) + gems[4]);
   }
   return(result + overfillTimes * overfillCost);
}

function doCalcTimeToGems(secondsinput) {
   var timerange = [60,3600,86400,604800];
   var gemsrange = [1,20,260,1000];
 
   if (isNaN(secondsinput)) secondsinput = 0;
 
   if (secondsinput < 0)
      return "???";
   else if (secondsinput === 0)
      gems = 0;
   else if (secondsinput <= 246)
      gems = gemsrange[0];
   else {
      var idx = 3;

      for (var i = 1; i < timerange.length; i ++) {
         if (secondsinput <= timerange[i]) {
            idx = i;
            break;
         }
      }

      gems = Math.ceil((secondsinput + 1 - timerange[idx - 1]) *
         (gemsrange[idx] - gemsrange[idx - 1]) /
         (timerange[idx] - timerange[idx - 1])) + gemsrange[idx - 1] - 1;
   }
 
   return gems;
}

function doCalcBuilderTimeToGems(secondsinput) {
   var timerange = [60,3600,86400,604800];
   var gemsrange = [1,50,500,2000];
 
   if (isNaN(secondsinput)) secondsinput = 0;
 
   if (secondsinput < 0)
      return "???";
   else if (secondsinput === 0)
      gems = 0;
   else if (secondsinput <= 132)
      gems = gemsrange[0];
   else {
      var idx = 3;

      for (var i = 1; i < timerange.length; i ++) {
         if (secondsinput <= timerange[i]) {
            idx = i;
            break;
         }
      }

      gems = Math.ceil((secondsinput + 1 - timerange[idx - 1]) *
         (gemsrange[idx] - gemsrange[idx - 1]) /
         (timerange[idx] - timerange[idx - 1])) + gemsrange[idx - 1] - 1;
   }
 
   return gems;
}

function doCalcGemToCash(gemsinput) {
	//I'm heavily considering making the cost array a 2D one to accommodate for multiple different currencies
   var cost = [0.99, 4.99, 9.99, 19.99, 49.99, 99.99];
   var gems = [80, 500, 1200, 2500, 6500, 14000];

   if (isNaN(gemsinput)) return("???");
 
   if (gemsinput <= 0) return(0);
 
   for (var i = gems.length-1; i > 0; i--) 
      if (gemsinput > gems[i-1]*2)
         return(cost[i] + doCalcGemToCash(gemsinput - gems[i]));
 
   return(cost[0] + doCalcGemToCash(gemsinput - gems[0]));
}

function calcGemsToTime (gems) {
   var timerange = [60,3600,86400,604800];
   var gemsrange = [1,20,260,1000];
   var seconds   = 0;
   var days      = 0;
   var hours     = 0;
   var minutes   = 0;
   var result	 = "";
 
   if (isNaN(gems)) gems = 0;
 
   if (gems < 0) {
	   result = "???";
       return result;
   }
   else if (gems == 0) {
       seconds = 0;
   }
   else if (gems <= gemsrange[0]) {
       seconds = 246;
   }
   else {
       gems = gems + 1;
 
       if (gems <= gemsrange[1]) {
           seconds = Math.ceil((gems - gemsrange[0])*((timerange[1] - timerange[0])/(gemsrange[1] - gemsrange[0])) + timerange[0])-1;
       }
       else if (gems <= gemsrange[2]) {
           seconds = Math.ceil((gems - gemsrange[1])*((timerange[2] - timerange[1])/(gemsrange[2] - gemsrange[1])) + timerange[1])-1;
       }
       else {
           seconds = Math.ceil((gems - gemsrange[2])*((timerange[3] - timerange[2])/(gemsrange[3] - gemsrange[2])) + timerange[2])-1;
       }
   }
 
   days    = Math.floor(seconds/(24*60*60));
   seconds = seconds % (24*60*60);
   hours   = Math.floor(seconds/(60*60));
   seconds = seconds % (60*60);
   minutes = Math.floor(seconds/60);
   seconds = seconds % 60;
 
   result = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
 
   return result;
}

function calcBuilderGemsToTime (gems) {
   var timerange = [60,3600,86400,604800];
   var gemsrange = [1,50,500,2000];
   var seconds   = 0;
   var days      = 0;
   var hours     = 0;
   var minutes   = 0;
   var result	 = "";
 
   if (isNaN(gems)) gems = 0;
 
   if (gems < 0) {
       result = "???";
       return result;
   }
   else if (gems == 0) {
       seconds = 0;
   }
   else if (gems <= gemsrange[0]) {
       seconds = 132;
   }
   else {
       gems = gems + 1;
 
       if (gems <= gemsrange[1]) {
           seconds = Math.ceil((gems - gemsrange[0])*((timerange[1] - timerange[0])/(gemsrange[1] - gemsrange[0])) + timerange[0])-1;
       }
       else if (gems <= gemsrange[2]) {
           seconds = Math.ceil((gems - gemsrange[1])*((timerange[2] - timerange[1])/(gemsrange[2] - gemsrange[1])) + timerange[1])-1;
       }
       else {
           seconds = Math.ceil((gems - gemsrange[2])*((timerange[3] - timerange[2])/(gemsrange[3] - gemsrange[2])) + timerange[2])-1;
       }
   }
 
   days    = Math.floor(seconds/(24*60*60));
   seconds = seconds % (24*60*60);
   hours   = Math.floor(seconds/(60*60));
   seconds = seconds % (60*60);
   minutes = Math.floor(seconds/60);
   seconds = seconds % 60;
 
   result = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
 
   return result;
}

function calcGemsToResources (gems,TH) {
    var resourcesrange = [100,1000,10000,100000,1000000,10000000];
    var gemsrange = [1,5,25,125,600,3000];
    var storagemaxArray = [0, 2500, 7000, 100000, 500000, 1000000, 2000000, 4000000, 6000000, 8000000, 8500000, 10000000, 14000000, 18000000];
    var overfillCostArray = [Infinity, 8, 18, 125, 336, 600, 867, 1400, 1933, 2467, 2600, 3000, 4067, 5133];
    var overfillCost = overfillCostArray[TH];
    var storagemax = storagemaxArray[TH];
    var overfillTimes = 0;
    if (gems >= overfillCost) {
        overfillTimes = Math.floor(gems/overfillCost);
        gems = gems % overfillCost;
    }
    var resources = 0;
    
    if (isNaN(gems)) gems = 0;
    if (gems < 0) {
        return "???";
    } else if (gems === 0) {
        resources = 0;
    } else if (gems < gemsrange[1]) {
            resources = resourcesrange[0] + ((2*gems + 1 - 2*gemsrange[0])*(resourcesrange[1]-resourcesrange[0]))/(2*(gemsrange[1]-gemsrange[0]));
    } else if (gems < gemsrange[2]) {
            resources = resourcesrange[1] + ((2*gems + 1 - 2*gemsrange[1])*(resourcesrange[2]-resourcesrange[1])/(2*(gemsrange[2]-gemsrange[1])));
    } else if (gems < gemsrange[3]) {
            resources = resourcesrange[2] + ((2*gems + 1 - 2*gemsrange[2])*(resourcesrange[3]-resourcesrange[2])/(2*(gemsrange[3]-gemsrange[2])));
    } else if (gems < gemsrange[4]) {
            resources = resourcesrange[3] + ((2*gems + 1 - 2*gemsrange[3])*(resourcesrange[4]-resourcesrange[3])/(2*(gemsrange[4]-gemsrange[3])));
    } else {
            resources = resourcesrange[4] + ((2*gems + 1 - 2*gemsrange[4])*(resourcesrange[5]-resourcesrange[4])/(2*(gemsrange[5]-gemsrange[4])));
    }
    // If integer, subtract one from the answer (because putting that amount of the resources into the reverse calculator yields a half-integer which is rounded up). Otherwise, floor that amount
    if (resources % 1 === 0 && resources > 0) {
       resources--;
    } else {
       resources = Math.floor(resources);
    }
    return resources + overfillTimes * storagemax;
}

function calcGemsToDarkElixir (gems,TH) {
    var resourcesrange = [1,10,100,1000,10000,100000];
    var gemsrange = [1,5,25,125,600,3000];
    var storagemaxArray = [20000, 80000, 190000, 200000, 200000, 240000, 300000];
    var overfillCostArray = [867, 2467, 5400, 5667, 5667, 6733, 8333];
    if (TH != 0) {
    	var overfillCost = overfillCostArray[TH-7];
    	var storagemax = storagemaxArray[TH-7];
    } else {
    	var overfillCost = Infinity;
    	var storagemax = 0;
    }
    var overfillTimes = 0;
    if (gems >= overfillCost) {
        overfillTimes = Math.floor(gems/overfillCost);
        gems = gems % overfillCost;
    }
    var resources = 0;
    
    if (isNaN(gems)) gems = 0;
    if (gems < 0) {
        return "???";
    } else if (gems === 0) {
        resources = 0;
    } else if (gems < gemsrange[1]) {
        resources = resourcesrange[0] + ((2*gems + 1 - 2*gemsrange[0])*(resourcesrange[1]-resourcesrange[0]))/(2*(gemsrange[1]-gemsrange[0]));
    } else if (gems < gemsrange[2]) {
        resources = resourcesrange[1] + ((2*gems + 1 - 2*gemsrange[1])*(resourcesrange[2]-resourcesrange[1])/(2*(gemsrange[2]-gemsrange[1])));
    } else if (gems < gemsrange[3]) {
        resources = resourcesrange[2] + ((2*gems + 1 - 2*gemsrange[2])*(resourcesrange[3]-resourcesrange[2])/(2*(gemsrange[3]-gemsrange[2])));
    } else if (gems < gemsrange[4]) {
        resources = resourcesrange[3] + ((2*gems + 1 - 2*gemsrange[3])*(resourcesrange[4]-resourcesrange[3])/(2*(gemsrange[4]-gemsrange[3])));
    } else {
        resources = resourcesrange[4] + ((2*gems + 1 - 2*gemsrange[4])*(resourcesrange[5]-resourcesrange[4])/(2*(gemsrange[5]-gemsrange[4])));
    }
    // If integer, subtract one from the answer (because putting that amount of the resources into the reverse calculator yields a half-integer which is rounded up). Otherwise, floor that amount
    if (resources % 1 === 0 && resources > 0) {
    	resources--;
    } else {
        resources = Math.floor(resources);
    }
    return resources + overfillTimes * storagemax;
}

function calcGemsToBuilderResources (gems,BH) {
    var resourcesrange = [100,1000,10000,100000,1000000,10000000];
    var gemsrange = [1,10,50,250,1200,6000];
    var storagemaxArray = [0, 50000, 75000, 250000, 500000, 1500000, 2000000, 3000000, 4000000, 5000000];
    var overfillCostArray = [Infinity, 139, 194, 408, 672, 1467, 1733, 2267, 2800, 3333];
    var overfillCost = overfillCostArray[BH];
    var storagemax = storagemaxArray[BH];
    var overfillTimes = 0;
    if (gems >= overfillCost) {
        overfillTimes = Math.floor(gems/overfillCost);
        gems = gems % overfillCost;
    }
    var resources = 0;
    
    if (isNaN(gems)) gems = 0;
    if (gems < 0) {
        return "???";
    } else if (gems === 0) {
        resources = 0;
    } else if (gems < gemsrange[1]) {
            resources = resourcesrange[0] + ((2*gems + 1 - 2*gemsrange[0])*(resourcesrange[1]-resourcesrange[0]))/(2*(gemsrange[1]-gemsrange[0]));
    } else if (gems < gemsrange[2]) {
            resources = resourcesrange[1] + ((2*gems + 1 - 2*gemsrange[1])*(resourcesrange[2]-resourcesrange[1])/(2*(gemsrange[2]-gemsrange[1])));
    } else if (gems < gemsrange[3]) {
            resources = resourcesrange[2] + ((2*gems + 1 - 2*gemsrange[2])*(resourcesrange[3]-resourcesrange[2])/(2*(gemsrange[3]-gemsrange[2])));
    } else if (gems < gemsrange[4]) {
            resources = resourcesrange[3] + ((2*gems + 1 - 2*gemsrange[3])*(resourcesrange[4]-resourcesrange[3])/(2*(gemsrange[4]-gemsrange[3])));
    } else {
            resources = resourcesrange[4] + ((2*gems + 1 - 2*gemsrange[4])*(resourcesrange[5]-resourcesrange[4])/(2*(gemsrange[5]-gemsrange[4])));
    }
    // If integer, subtract one from the answer (because putting that amount of the resources into the reverse calculator yields a half-integer which is rounded up). Otherwise, floor that amount
    if (resources % 1 === 0 && resources > 0) {
       resources--;
    } else {
       resources = Math.floor(resources);
    }
    return resources + overfillTimes * storagemax;
}

$(document).ready(function() {
	$("span#calcResourcesToGemsHarness").html('<input type="text" value="0" id="r2g" style="text-align: right; width: 70px; background-color:white;"></input>');
	$("span#calcResourcesToGemsTHHarness").html('<div id="r2gTH-input">TH Level: <select name="r2gTH" id="r2gTH"> <option value="0">N/A</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> <option value="13">13</option></select></div>');
	$("#doCalcResourcesToGems").click(function() {
		var resources = parseInt(document.getElementById("r2g").value);
		var TH = document.getElementById("r2gTH").value * 1;
		var result = doCalcResourceToGems(resources,TH);
		if (result != 1) {
			document.getElementById("calc-r2g").innerHTML = " = " + result + " Gems";
		} else {
			document.getElementById("calc-r2g").innerHTML = " = " + result + " Gem";
		}
	});
	$("span#calcDarkElixirToGemsHarness").html('<input type="text" value="0" id="de2g" style="text-align: right; width: 70px; background-color:white;"></input>');
	$("span#calcDarkElixirToGemsTHHarness").html('<div id="de2gTH-input">TH Level: <select name="de2gTH" id="de2gTH"> <option value="0">N/A</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> <option value="13">13</option></select></div>');
	$("#doCalcDarkElixirToGems").click(function() {
		var resources = parseInt(document.getElementById("de2g").value);
		var TH = document.getElementById("de2gTH").value * 1;
		var result = doCalcDarkElixirToGems(resources,TH);
		if (result != 1) {
			document.getElementById("calc-de2g").innerHTML = " = " + result + " Gems";
		} else {
			document.getElementById("calc-de2g").innerHTML = " = " + result + " Gem";
		}
	});
	$("span#calcBuilderResourcesToGemsHarness").html('<input type="text" value="0" id="br2g" style="text-align: right; width: 70px; background-color:white;"></input>');
	$("span#calcBuilderResourcesToGemsBHHarness").html('<div id="br2gTH-input">BH Level: <select name="br2gTH" id="br2gTH"> <option value="0">N/A</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option></select></div>');
	$("#doCalcBuilderResourcesToGems").click(function() {
    	var resources = parseInt(document.getElementById("br2g").value);
		var BH = document.getElementById("br2gTH").value * 1;
    	var result = doCalcBuilderResourceToGems(resources,BH);
    	if (result != 1) {
        	document.getElementById("calc-br2g").innerHTML = " = " + result + " Gems";
    	} else {
        	document.getElementById("calc-br2g").innerHTML = " = " + result + " Gem";
    	}
    });
	$("span#calcTimeToGemsHarness").html('<input type="text" value="0" id="t2gd" style="text-align: right; width: 40px; background-color:white;"></input>'+' d '+'<input type="text" value="0" id="t2gh" style="text-align: right; width: 40px; background-color:white;"></input>'+' h '+'<input type="text" value="0" id="t2gm" style="text-align: right; width: 40px; background-color:white;"></input>'+' m '+'<input type="text" value="0" id="t2gs" style="text-align: right; width: 40px; background-color:white;"></input>'+' s');
    $("#doCalcTimeToGems").click(function() {
    	var days = parseInt(document.getElementById("t2gd").value);
		var hours = parseInt(document.getElementById("t2gh").value);
		var minutes = parseInt(document.getElementById("t2gm").value);
		var seconds = parseInt(document.getElementById("t2gs").value);
		var secondsinput = 86400 * days + 3600 * hours + 60 * minutes + seconds;
    	var result = doCalcTimeToGems(secondsinput);
    	if (result != 1) {
        	document.getElementById("calc-t2g").innerHTML = " = " + result + " Gems";
    	} else {
        	document.getElementById("calc-t2g").innerHTML = " = " + result + " Gem";
    	}
    });
	$("span#calcBuilderTimeToGemsHarness").html('<input type="text" value="0" id="bt2gd" style="text-align: right; width: 40px; background-color:white;"></input>'+' d '+'<input type="text" value="0" id="bt2gh" style="text-align: right; width: 40px; background-color:white;"></input>'+' h '+'<input type="text" value="0" id="bt2gm" style="text-align: right; width: 40px; background-color:white;"></input>'+' m '+'<input type="text" value="0" id="bt2gs" style="text-align: right; width: 40px; background-color:white;"></input>'+' s');
    $("#doCalcBuilderTimeToGems").click(function() {
    	var days = parseInt(document.getElementById("bt2gd").value);
    	var hours = parseInt(document.getElementById("bt2gh").value);
    	var minutes = parseInt(document.getElementById("bt2gm").value);
    	var seconds = parseInt(document.getElementById("bt2gs").value);
    	var secondsinput = 86400 * days + 3600 * hours + 60 * minutes + seconds;
    	var result = doCalcBuilderTimeToGems(secondsinput);
    	if (result != 1) {
        	document.getElementById("calc-bt2g").innerHTML = " = " + result + " Gems";
    	} else {
        	document.getElementById("calc-bt2g").innerHTML = " = " + result + " Gem";
    	}
    });
	$("span#calcGemsToCashHarness").html('<input type="text" value="0" id="g2c" style="text-align: right; width: 50px; background-color:white;"></input>');
    $("#doCalcGemsToCash").click(function() {
    	var gems = parseInt(document.getElementById("g2c").value);
    	var result = doCalcGemToCash(gems);
		document.getElementById("calc-g2c").innerHTML = " = $" + Math.round(result*100)/100 + " USD";
    });
	$("span#calcGemsToTimeHarness").html('<input type="text" value="0" id="g2t" style="text-align: right; width: 50px; background-color:white;"></input>');
	$("#doCalcGemsToTime").click(function() {
    	var gems = parseInt(document.getElementById("g2t").value);
    	var result = calcGemsToTime(gems);
    	document.getElementById("calc-g2t").innerHTML = " = " + result;
    });
	$("span#calcBuilderGemsToTimeHarness").html('<input type="text" value="0" id="bg2t" style="text-align: right; width: 50px; background-color:white;"></input>');
    $("#doCalcBuilderGemsToTime").click(function() {
    	var gems = parseInt(document.getElementById("bg2t").value);
    	var result = calcBuilderGemsToTime(gems);
    	document.getElementById("calc-bg2t").innerHTML = " = " + result;
    });
	$("span#calcGemsToResourcesHarness").html('<input type="text" value="0" id="g2r" style="text-align: right; width: 50px; background-color:white;"></input>');
	$("#doCalcGemsToResources").click(function() {
        var gems = parseInt(document.getElementById("g2r").value);
        var result = calcGemsToResources(gems);
        document.getElementById("calc-g2r").innerHTML = " = " + result + " Gold/Elixir";
    });
	$("span#calcGemsToDarkElixirHarness").html('<input type="text" value="0" id="g2de" style="text-align: right; width: 50px; background-color:white;"></input>');
    $("#doCalcGemsToDarkElixir").click(function() {
        var gems = parseInt(document.getElementById("g2de").value);
        var result = calcGemsToDarkElixir(gems);
        document.getElementById("calc-g2de").innerHTML = " = " + result + " Dark Elixir";
    });
	$("span#calcGemsToBuilderResourcesHarness").html('<input type="text" value="0" id="g2br" style="text-align: right; width: 50px; background-color:white;"></input>');
    $("#doCalcGemsToBuilderResources").click(function() {
        var gems = parseInt(document.getElementById("g2br").value);
        var result = calcGemsToBuilderResources(gems);
        document.getElementById("calc-g2br").innerHTML = " = " + result + " Builder Gold/Elixir";
    });
});