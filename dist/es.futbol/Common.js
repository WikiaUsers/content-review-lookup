/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// ============================================================
// COMIENZO script de cuenta atrás
// Código por MegaScience de BioShock Wiki | Traducido por bola
// (Usado en la Plantilla:Countdown)
// ============================================================
dateFuture = new Date(2010,6,11,22,30,0);
function GetCount(){

	dateNow = new Date();
	amount = dateFuture.getTime() - dateNow.getTime();
	delete dateNow;

	if(amount < 0){
		if(typeof flicker == 'undefined'){
			flicker = 0;
		}
		else if(flicker == 0){
			document.getElementById('countbox').innerHTML="¡Ya se ha acabado el mundial!";
			flicker=1;
		}
		
		setTimeout("GetCount()", 500);
		
	}
	else{
		days=0;hours=0;mins=0;secs=0;out="<span style=text-align:center; float:center;\">¡Sabremos quién es el ganador del Mundial en ";

		amount = Math.floor(amount/1000);

		days=Math.floor(amount/86400);
		amount=amount%86400;

		hours=Math.floor(amount/3600);
		amount=amount%3600;

		mins=Math.floor(amount/60);
		amount=amount%60;

		secs=Math.floor(amount);

		if(days != 0){out += days +" día"+((days!=1)?"s":"")+", ";}
		if(days != 0 || hours != 0){out += hours +" hora"+((hours!=1)?"s":"")+",<br/>";}
		if(days != 0 || hours != 0 || mins != 0){out += mins +" minuto"+((mins!=1)?"s":"")+" y ";}
		out += secs +" segundos!</span>";
		document.getElementById('countbox').innerHTML=out;
		
		setTimeout("GetCount()", 1000);
		
	}
	
}

window.onload=GetCount;


// ===========================================================
// FINAL script de cuenta atrás
// ===========================================================

/*Cambios recientes automaticos por [[w:user:Pcj|Pcj]] y [[w:user:Grunny|Grunny]] */
 
AjaxRCRefreshText = 'Actualización automatica';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptURI('http://vegadark.wikia.com/index.php?title=MediaWiki:RapiTareas.js&action=raw&ctype=text/javascript');
importScriptPage('AjaxRC/code.js', 'dev');