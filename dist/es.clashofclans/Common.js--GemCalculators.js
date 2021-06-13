/* Gem Calculators - Dahimi * Tomado de la wiki inglesa (con permiso)Taken from the English wiki (with permission)/
function timeStamp_GemCalculators_js() {
   return "2017.09.21 01:12 (UTC-7)";
}

function doCalcDarkElixirToGems(resources) {
   var ranges = [1,10,100,1000,10000,100000];
   var gems = [1,5,25,125,600,3000];
   var storagemax = 350000;
 
   if (isNaN(resources)) return("???");
   else if (resources < 0) return("???");
   else if (resources == 0) return(0);
   else if (resources <= ranges[0]) return(gems[0]);
 
   for (var i = 1; i < ranges.length-1; i++)
      if (resources <= ranges[i]) 
         return(Math.round((resources - ranges[i-1])/((ranges[i] - ranges[i-1])/(gems[i] - gems[i-1])) + gems[i-1]));
 
   if (resources <= storagemax)
      return(Math.round((resources - ranges[ranges.length-2])/((ranges[ranges.length-1] - ranges[ranges.length-2])/(gems[gems.length-1] - gems[gems.length-2])) + gems[gems.length-2]));           
   else 
      return(doCalcDarkElixirToGems(resources % storagemax) + Math.floor(resources/storagemax)*doCalcDarkElixirToGems(storagemax));
 
   return("???");
}
 
function doCalcResourceToGems(resources) {
   var ranges = [100,1000,10000,100000,1000000,10000000];
   var gems = [1,5,25,125,600,3000];
   var storagemax = 20000000;

   if (isNaN(resources)) return("???");
   else if (resources < 0) return("???");
   else if (resources == 0) return(0);
   else if (resources <= ranges[0]) return(gems[0]);
 
   for (var i = 1; i < ranges.length-1; i++)
      if (resources <= ranges[i]) 
         return(Math.round((resources - ranges[i-1])/((ranges[i] - ranges[i-1])/(gems[i] - gems[i-1])) + gems[i-1]));
 
   if (resources <= storagemax)
      return(Math.round((resources - ranges[ranges.length-2])/((ranges[ranges.length-1] - ranges[ranges.length-2])/(gems[gems.length-1] - gems[gems.length-2])) + gems[gems.length-2]));           
   else 
      return(doCalcResourceToGems(resources % storagemax) + Math.floor(resources/storagemax)*doCalcResourceToGems(storagemax));
 
   return("???");
}

function doCalcBuilderResourceToGems(resources) {
   var ranges = [100,1000,10000,100000,1000000,10000000];
   var gems = [1,10,50,250,1200,6000];
   var storagemax = 5000000;
   
   if (isNaN(resources)) return("???");
   else if (resources < 0) return("???");
   else if (resources == 0) return(0);
   else if (resources <= ranges[0]) return(gems[0]);
 
   for (var i = 1; i < ranges.length-1; i++)
      if (resources <= ranges[i]) 
         return(Math.round((resources - ranges[i-1])/((ranges[i] - ranges[i-1])/(gems[i] - gems[i-1])) + gems[i-1]));
 
   if (resources <= storagemax)
      return(Math.round((resources - ranges[ranges.length-2])/((ranges[ranges.length-1] - ranges[ranges.length-2])/(gems[gems.length-1] - gems[gems.length-2])) + gems[gems.length-2]));           
   else 
      return(doCalcBuilderResourceToGems(resources % storagemax) + Math.floor(resources/storagemax)*doCalcBuilderResourceToGems(storagemax));
 
   return("???");
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
   var result     = "";
 
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
   var result     = "";
 
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

function calcGemsToResources (gems) {
    var resourcesrange = [100,1000,10000,100000,1000000,10000000];
    var gemsrange = [1,5,25,125,600,3000];
    var resources = 0;
    
    if (isNaN(gems)) gems = 0;
    if (gems < 0) {
        return "???";
    } else if (gems === 0) {
        resources = 0;
    } else if (gems <= gemsrange[0]) {
        resources = 212;
    } else {
        if (gems < gemsrange[1]) {
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
       if (resources % 1 === 0) {
               resources--;
       } else {
            resources = Math.floor(resources);
       }
    }
    return resources;
}

function calcGemsToDarkElixir (gems) {
    var resourcesrange = [1,10,100,1000,10000,100000];
    var gemsrange = [1,5,25,125,600,3000];
    var resources = 0;
    
    if (isNaN(gems)) gems = 0;
    if (gems < 0) {
        return "???";
    } else if (gems === 0) {
        resources = 0;
    } else if (gems <= gemsrange[0]) {
        resources = 2;
    } else {
        if (gems < gemsrange[1]) {
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
       if (resources % 1 === 0) {
               resources--;
       } else {
            resources = Math.floor(resources);
       }
    }
    return resources;
}

function calcGemsToBuilderResources (gems) {
    var resourcesrange = [100,1000,10000,100000,1000000,10000000];
    var gemsrange = [1,10,50,250,1200,6000];
    var resources = 0;
    
    if (isNaN(gems)) gems = 0;
    if (gems < 0) {
        return "???";
    } else if (gems === 0) {
        resources = 0;
    } else if (gems <= gemsrange[0]) {
        resources = 149;
    } else {
        if (gems < gemsrange[1]) {
    // There's probably some weird scaling (as determined by cross-checking with pixel crux) going on down here which I'll have to investigate when I have the opportunity. Applies to this range only.
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
       if (resources % 1 === 0) {
               resources--;
       } else {
            resources = Math.floor(resources);
       }
    }
    return resources;
}

$(document).ready(function() {
    $("span#calcResourcesToGemsHarness").html('<input type="text" value="0" id="r2g" style="text-align: right; width: 70px; background-color:white;"></input>');
    $("#doCalcResourcesToGems").click(function() {
        var resources = parseInt(document.getElementById("r2g").value);
        var result = doCalcResourceToGems(resources);
        if (result != 1) {
            document.getElementById("calc-r2g").innerHTML = " = " + result + " Gems";
        } else {
            document.getElementById("calc-r2g").innerHTML = " = " + result + " Gem";
        }
    });
    $("span#calcDarkElixirToGemsHarness").html('<input type="text" value="0" id="de2g" style="text-align: right; width: 70px; background-color:white;"></input>');
    $("#doCalcDarkElixirToGems").click(function() {
        var resources = parseInt(document.getElementById("de2g").value);
        var result = doCalcDarkElixirToGems(resources);
        if (result != 1) {
            document.getElementById("calc-de2g").innerHTML = " = " + result + " Gems";
        } else {
            document.getElementById("calc-de2g").innerHTML = " = " + result + " Gem";
        }
    });
    $("span#calcBuilderResourcesToGemsHarness").html('<input type="text" value="0" id="br2g" style="text-align: right; width: 70px; background-color:white;"></input>');
    $("#doCalcBuilderResourcesToGems").click(function() {
        var resources = parseInt(document.getElementById("br2g").value);
        var result = doCalcBuilderResourceToGems(resources);
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