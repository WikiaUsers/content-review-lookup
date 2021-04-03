//<source lang="JavaScript">
 
 
 /** Creates a button to invert checkboxes on Special:Undelete */
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
         toggleButton.value   = "Invert selection";
 
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
 
/** Automatic deletion dropdown
  *******************************************************
  *
  *  Description: Looks for CSD/XFD/PROD templates on a page; if 
  *               one is present,picks up the deletion reason  that's  
  *               hidden on the template and tweaks the 'delete' tab 
  *               link to preload that deletion summary.
  *  Maintainers: Happy-melon
  */
addOnloadHook(function() {
if ( document.getElementById('ca-delete') && document.getElementById('delete-criterion') ) { 
    var link = document.getElementById('ca-delete').getElementsByTagName('A')[0];
    var reason = document.getElementById('delete-reason').innerHTML;
    link.setAttribute( 'href' , link.getAttribute('href') + '&wpReason=' + reason );
}
})
 
 
/** Sensitive IP checker
  *******************************************************
  *
  *  Description: Blocking certain ranges is politically...
  *               sensitive, and must be reported to the 
  *               Foundation Communications Committee.
  *  Maintainers: east718
  */
if (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName == "Blockip" && document.getElementById('mw-bi-target'))
{
	ips = Array(
		Array(/\b63\.162\.143\.21\b/, 'the [[United States Department of Homeland Security|U.S. Department of Homeland Security]]'),
		Array(/\b82\.148\.9(6\.68|7\.69)\b/, '[[Qatar|Qatar]]'),
		Array(/\b128\.183\.103\.97\b/, '[[NASA|NASA]]'),
		Array(/\b(((2|5)?6|7|[12]1|2(2|8|9)|3(0|3)|55)\.([01]?\d\d?|2(5[0-5]|[0-4]\d))|130\.22)(\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}\b/, 'the [[United States Department of Defense|U.S. Department of Defense]]'),
		Array(/\b138\.16[23](\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}\b/, 'the [[United States Navy|U.S. Naval Telecommunications Station]]'),
		Array(/\b143\.2(2[89]|3[01])(\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}\b/, 'the [[United States House of Representatives|U.S. House of Representatives]]'),
		Array(/\b149\.101(\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}\b/, 'the [[United States Department of Justice|U.S. Department of Justice]]'),
		Array(/\b156\.33(\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}\b/, 'the [[United States Senate|U.S. Senate]]'),
		Array(/\b(162\.4[56]\.([01]?\d\d?|2(5[0-5]|[0-4]\d))|198\.81\.(128|129|1[3-8]\d|191))\.([01]?\d\d?|2(5[0-5]|[0-4]\d))\b/, 'the [[Central Intelligence Agency|U.S. Central Intelligence Agency]]'),
		Array(/\b192\.197\.(7[7-9]|8[0-6])\.([01]?\d\d?|2(5[0-5]|[0-4]\d))\b/, 'the [[Government of Canada|Government of Canada]]'),
		Array(/\b(51(\.([01]?\d\d?|2(5[0-5]|[0-4]\d))){2}|194.60.\d[0-5]?)\.([01]?\d\d?|2(5[0-5]|[0-4]\d))\b/, 'the [[Parliament of the United Kingdom|U.K. Parliament]]'),
		Array(/\b66\.230\.(19[2-9]|2[0-3]\d)\.([01]?\d\d?|2(5[0-5]|[0-4]\d))\b/, 'the [[Wikimedia Foundation|Wikimedia secure gateway]]'),
		Array(/\b91\.198\.174\.(19[2-9]|2([01]\d|2[0-3]))\b/, 'the [[m:Toolserver|Wikimedia Toolserver]]')
	);
	ip = document.getElementById('mw-bi-target').value;
	if (/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/.test(ip))
	{
		for (i = 0; i < ips.length; i++)
		{
			if (ip.match(ips[i][0]))
			{
				jsMsg('<table><tr><td valign="center"><img src="http://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nuvola_apps_important.svg/48px-Nuvola_apps_important.svg.png" /></td><td valign="center">You are blocking a sensitive IP address belonging to ' + ips[i][1].replace('[[', '<a href="http://en.wikipedia.org/wiki/').replace('|', '">').replace(']]', '</a>') + '. Please be sure to <a href="http://meta.wikimedia.org/wiki/Communications_committee/Notifications" class="extiw" title="meta:Communications_committee/Notifications">notify</a> the <a href="http://meta.wikimedia.org/wiki/Communications_committee" class="extiw" title="meta:Communications_committee">Wikimedia Foundation Communications Committee</a> immediately.</td></tr></table>');
			}
		}
	}
}
 
 
//</source>