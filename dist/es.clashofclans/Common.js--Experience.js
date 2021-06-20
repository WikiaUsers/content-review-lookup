/* Calculadora de experiencia - GorillaMan */

/*
 * Experiencia obtenida al construir y mejorar las estructuras
 * Requiere: tiempo en segundos
 * Devuelve: cantidad de experiencia ganada (sin formato)
 */
function experienceGained(seconds) {
   if (seconds < 0)
      seconds = 0;

   return Math.floor(Math.sqrt(seconds), 0);
}

/* Nivel a la experiencia necesaria para ese nivel */
 
function doExperience(Level, noFormat) {
   if (isNaN(Level) || Level <= 0 || Level >= 500)
      return "???";
   if (!Level)
      return 0;
   var retval;
   
   if (Level == 1)
   retval = 30;
   
   else if (Level <= 200)
   retval = 50 * (Level - 1);
   
   else if (Level < 300)
   retval = 500 * (Level - 200) + 9500;
   
   else
   retval = 1000 * (Level - 300) + 60000;
   return (noFormat ? retval : retval.format('#,##0'));
}
/* Level to Experience until the level */
function doExperience2 (Level, noFormat) {
   if (isNaN(Level) || Level <= 0 || Level > 500)
      return "???";
      
   if (Level == 1)
      return 0;
   else if (Level < 202)
      return ((Level - 1) * (Level - 2) * 25 + 30).format('#,##0');
      
   else if (Level < 300)
      return (250 * (Level - 202) * (Level - 202) + 10250 * (Level - 202) + 1005030).format('#,##0');
      
   else
      return (500 * (Level - 300) * (Level - 300) + 59500 * (Level - 300) + 4410530).format('#,##0');
}
$(document).ready(function() {
	$("span#expLevelHarness").html('<input type="text" value="0" id="expLevel" style="text-align: right; width: 40px; background-color:white;"></input>');
	$("span#expLevel2Harness").html('<input type="text" value="0" id="expLevel2" style="text-align: right; width: 40px; background-color:white;"></input>');
	$("#doExperience").click(function() {
		var Level = parseInt(document.getElementById("expLevel").value);
		var result = doExperience(Level);
		document.getElementById("expRequired").innerHTML = " = " + result + " Experience";
	});
	$("#doExperience2").click(function() {
		var Level = parseInt(document.getElementById("expLevel2").value);
    	var result = doExperience2(Level);
    	document.getElementById("expRequired2").innerHTML = " = " + result + " Experience";
	});
});