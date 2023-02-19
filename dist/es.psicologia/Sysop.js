 /** Crea a boton para invertir cajas de verificacion en Special:Undelete */
 if (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName == "Undelete") {
     (function () {
         var form             = document.forms["undelete"];
         if( !form ) {
             return;
         }
         var elements         = form.elements;
         var submitButton     = elements["mw-undelete-submit"];
         if( !submitButton ) {
             return;
         }
         var toggleButton     = document.createElement("input");
         toggleButton.type    = "button";
         toggleButton.value   = "Invertir selección";
         
         toggleButton.onclick = function () {
                 for( var i = 0; i < elements.length; ++i ) {
                     var input = elements[i];
                     if( input.type != "checkbox" ) {
                         continue;
                     }
                     input.checked = !input.checked;
                 }
             };
         submitButton.parentNode.insertBefore( toggleButton, submitButton );
     })();
 }


// Para ver las IP 
if (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName == "Blockip")
{
	ips = Array(
		Array(/\b63\.162\.143\.21\b/, 'the [[United States Department of Homeland Security|U.S. Department of Homeland Security]]'),
		Array(/\b82\.148\.9(6\.68|7\.69)\b/, '[[Qatar|Qatar]]'),
		Array(/\b128\.183\.103\.97\b/, '[[NASA|NASA]]'),
		Array(/\b(((2|5)?6|7|[12]1|2(2|8|9)|3(0|3)|55)\.([01]?\d\d?|2(5[0-5]|[0-4]\d))|130\.22)(\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}\b/, 'ctm los gringorS! [departamento de defensa de ee.uu]'),
		Array(/\b138\.16[23](\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}\b/, 'los weones de la marina gringa [estacion de telecomunicaciones navales ee.uu]'),
		Array(/\b143\.2(2[89]|3[01])(\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}\b/, 'no se que chucha pero son gringos [casa de representativos ee.uu]'),
		Array(/\b149\.101(\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}\b/, 'los jueces gringos nos atacan! [departamento de justicia de ee.uu]'),
		Array(/\b156\.33(\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}\b/, 'jajajaj el senado gringo! [senado ee.uu]'),
		Array(/\b(162\.4[56]\.([01]?\d\d?|2(5[0-5]|[0-4]\d))|198\.81\.(128|129|1[3-8]\d|191))\.([01]?\d\d?|2(5[0-5]|[0-4]\d))\b/, 'cuidao weon, mas gringos atacando!!  [agencia de inteligencia central de ee.uu]'),
		Array(/\b192\.197\.(7[7-9]|8[0-6])\.([01]?\d\d?|2(5[0-5]|[0-4]\d))\b/, 'los canadienses atacan! [gobierno de canada]'),
		Array(/\b(51(\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}|194.60.\d[0-5]?)\.([01]?\d\d?|2(5[0-5]|[0-4]\d))\b/, 'unos ingleses que nos atacan [parlamento del reino unido]'),
		Array(/\b66\.230\.(19[2-9]|2[0-3]\d)\.([01]?\d\d?|2(5[0-5]|[0-4]\d))\b/, 'los weones de wikipedia [fundación wikimedia]'),
		Array(/\b91\.198\.174\.(19[2-9]|2([01]\d|2[0-3]))\b/, 'otros weones de wikimedia [wikimedia toolserver]')
	);
	ip = document.getElementById('mw-bi-target').value;
	if (/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/.test(ip))
	{
		for (i = 0; i < ips.length; i++)
		{
			if (ip.match(ips[i][0]))
			{
				jsMsg('<table><tr><td valign="center"><img src="http://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nuvola_apps_important.svg/48px-Nuvola_apps_important.svg.png" /></td><td valign="center">Estás bloqueando una IP de algun gob: ' + ips[i][1].replace('[[', '<a href="http://www.wikipediars.com/wiki/').replace('|', '">').replace(']]', '</a>') + '. Por favor, <a href="http://meta.wikimedia.org/wiki/Communications_committee/Notifications" class="extiw" title="meta:Communications_committee/Notifications">notifica</a> a <a href="http://meta.wikimedia.org/wiki/Communications_committee" class="extiw" title="meta:Communications_committee">Wikimedia Foundation Communications Committee</a> immediatamente.</td></tr></table>');
			}
		}
	}
}