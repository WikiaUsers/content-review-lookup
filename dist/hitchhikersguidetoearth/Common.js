/* Any JavaScript here will be loaded for all users on every page load. */

document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript"></script>');    

 /** Import module *************************************************************
  *
  *  Description: Includes a raw wiki page as javascript or CSS, 
  *               used for including user made modules.
  *  Maintainers: [[wikipedia:User:AzaToth]]
  */
 importedScripts = {}; // object keeping track of included scripts, so a script ain't included twice
 function importScript( page ) {
     if( importedScripts[page] ) {
         return;
     }
     importedScripts[page] = true;
     var url = wgScriptPath
             + '/index.php?title='
             + encodeURIComponent( page.replace( / /g, '_' ) )
             + '&action=raw&ctype=text/javascript';
     var scriptElem = document.createElement( 'script' );
     scriptElem.setAttribute( 'src' , url );
     scriptElem.setAttribute( 'type' , 'text/javascript' );
     document.getElementsByTagName( 'head' )[0].appendChild( scriptElem );
 }
 
 function importStylesheet( page ) {
     var sheet = '@import "'
               + wgScriptPath
               + '/index.php?title='
               + encodeURIComponent( page.replace( / /g, '_' ) )
               + '&action=raw&ctype=text/css";'
     var styleElem = document.createElement( 'style' );
     styleElem.setAttribute( 'type' , 'text/css' );
     styleElem.appendChild( document.createTextNode( sheet ) );
     document.getElementsByTagName( 'head' )[0].appendChild( styleElem );
 }

 /** Username replace function ([[template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by [[wikia:User:Splarka|Splarka]]
  * New version by [[User:Spang|Spang]]
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    var n = YAHOO.util.Dom.getElementsByClassName('insertusername', 'span', document.getElementById('bodyContent'));
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);


 /** Dynamic navigation bars ************************************************
  * Allows navigations templates to expand and collapse their content to save space
  * Documentation on wikipedia at [[wikipedia:Wikipedia:NavFrame|Wikipedia:NavFrame]]
  */
 
 // set up the words in your language
 var NavigationBarHide = '[hide]';
 var NavigationBarShow = '[show]';
  
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1;
 
 
 // shows and hides content and picture (if available) of navigation bars
 // Parameters:
 //     indexNavigationBar: the index of navigation bar to be toggled
 function toggleNavigationBar(indexNavigationBar)
 {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
        }
    NavToggle.firstChild.data = NavigationBarHide;
    }
 }
  
 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
            
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(
              var j=0; 
              j < NavFrame.childNodes.length; 
              j++
            ) {
              if (NavFrame.childNodes[j].className == "NavHead") {
                NavFrame.childNodes[j].appendChild(NavToggle);
              }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }
 
 }
 
 addOnloadHook(createNavigationBarToggleButton, false);


 /** Archive edit tab disabling *************************************
  * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
  * Page can still be edited by going via the edit tab on the history etc, or by 
  * typing the edit address manually.
  * By [[User:Spang|Spang]]
  */
 
 function disableOldForumEdit () {
   if(typeof(enableOldForumEdit) != 'undefined' && enableOldForumEdit) return;
   if (!document.getElementById('ca-edit') || !document.getElementById('old-forum-warning')) return;
   editLink = document.getElementById('ca-edit').firstChild;
   editLink.removeAttribute('href', 0);
   editLink.style.color = 'gray';
   editLink.innerHTML = 'no editing';
 }
 addOnloadHook(disableOldForumEdit);

 //<pre>
 /** Embed flash movies **************************************************
  * Allows embedding of flash files in a page. Only enabled in userspace currently. 
  * See [[Template:Flash]]
  * By [[User:Olipro|Olipro]]
  */
 var flashOk;
 function embedFlashMovie(flashOk) {
     mainbody = document.getElementById('bodyContent');
     mainbody.innerHTML = contentTempHolder;
     spancheck = document.getElementsByTagName('span');
     for(i = 0; i < spancheck.length; i ++) {
         if(spancheck[i].getAttribute('id') != 'embedFlashDoc')
             continue;
         obj = spancheck[i].innerHTML.split('@');
         flwidth = obj[0];
         flheight = obj[1];
         flfile = obj[2].replace('fullurl://', 'http://');
         showFlash = ' ';
         if(flashOk) {
             showFlash = '<object width="'+ flwidth +'" height="' + flheight + '"';
             showFlash += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
             showFlash += 'codebase="http://fpdownload.macromedia.com/pub/';
             showFlash += 'shockwave/cabs/flash/swflash.cab#version=8,0,0,0">';
             showFlash += '<param name="movie" value="'+ flfile +'" />';
             showFlash += '<embed src="'+ flfile +'" width="'+ flwidth +'" height=';
             showFlash += '"'+ flheight +'" type="application/x-shockwave-flash" ';
             showFlash += 'pluginspage="http://www.macromedia.com/go/getflashplayer" />';
             showFlash += '</object>';
         } else {
             showFlash = '<a class="plainlinks" href="javascript:embedFlashMovie(true)" onClick="embedFlashMovie(true)">'+flfile+'</a> (Click to Show)';
         }
         spancheck[i].innerHTML = showFlash;
         spancheck[i].style.display = 'inline';
     }
 }
 var contentTempHolder;
 function embedFlashCheck() {
     if(!document.getElementById('embedFlashDoc'))
         return;
     mainbody = document.getElementById('bodyContent');
     contentTempHolder = mainbody.innerHTML;
     if(typeof displayFlashOverride != 'undefined') {
         embedFlashMovie(displayFlashOverride);
         return;
     }
     askmessage = '<div align="center" id="askflash">This page contains ';
     askmessage += 'Flash; would you ';
     askmessage += 'like to see it? <b><a href="javascript:embedFlashMovie(true)" ';
     askmessage += 'onClick="embedFlashMovie(true)">Yes</a> | <a ';
     askmessage += 'href="javascript:embedFlashMovie(false)" ';
     askmessage += 'onClick="embedFlashMovie(false)">No</a> | <a ';
     askmessage += 'href="/index.php?title=User:'+wgUserName+'/'+skin+'.js&';
     askmessage += 'action=edit&section=new&preload=Template:Flash/disable">';
     askmessage += 'Don\'t show this again</a></b></div>';
     mainbody.innerHTML = askmessage;
 }
 addOnloadHook(embedFlashCheck);
 //</pre>



 //
 /** Sortable table fixes **************************************************
  * Fixes some problems the default sortable table script has.
  * From http://meta.wikimedia.org/wiki/MediaWiki:Common.js
  */
 
 function ts_parseFloat(num) {
 	if (!num) return 0;
      num = removeSpaces(num);
 	num = parseFloat(num.replace(/,/g, ""));
 	return (isNaN(num) ? 0 : num);
 }
  
 //Keep spaces in "currency" mode, to sort a range "70 to 80" at 70, not 7080
 function ts_parseFloat_ks(num) {
 	if (!num) return 0;
 	num = parseFloat(num.replace(/,/g, ""));
 	return (isNaN(num) ? 0 : num);
 }
  
 //Auxiliary function for function ts_resortTable(lnk)
 function removeSpaces(string) {
         var tstring = "";
         string = '' + string;
         splitstring = string.split(" ");
         for(i = 0; i < splitstring.length; i++)
         tstring += splitstring[i];
         return tstring;
 }
  
 //Overrides the function with the same name in http://svn.wikimedia.org/viewvc/mediawiki/trunk/phase3/skins/common/wikibits.js
 //Changes the criteria for various sorting modes, see [[Help:Sorting]].
 //For easy maintenance the difference with wikibits.js is kept limited to a few lines.
 function ts_resortTable(lnk) {
 	// get the span
 	var span = lnk.getElementsByTagName('span')[0];
  
 	var td = lnk.parentNode;
 	var tr = td.parentNode;
 	var column = td.cellIndex;
  
 	var table = tr.parentNode;
 	while (table && !(table.tagName && table.tagName.toLowerCase() == 'table'))
 		table = table.parentNode;
 	if (!table) return;
  
 	// Work out a type for the column
 	if (table.rows.length <= 1) return;
  
 	// Skip the first row if that's where the headings are
 	var rowStart = (table.tHead && table.tHead.rows.length > 0 ? 0 : 1);
  
 	var itm = "";
 	for (var i = rowStart; i < table.rows.length; i++) {
 		if (table.rows[i].cells.length > column) {
 			itm = ts_getInnerText(table.rows[i].cells[column]);
 			itm = itm.replace(/^[\s\xa0]+/, "").replace(/[\s\xa0]+$/, "");
 			if (itm != "") break;
 		}
 	}
  
 	sortfn = ts_sort_caseinsensitive;
      itmns = removeSpaces(itm);
      if (itmns.match(/^[\d\.\,\-\+]+\%?$/)) sortfn = ts_sort_numeric;
      if (itmns.match(/^[\d\.\,\-\+]+[eE][\d\-\+]+\%?$/)) sortfn = ts_sort_numeric;
      if (itmns.match(/^[\d\.\,\-\+]+e[\d\-\+]+\u00d710[\d\-\+]+\%?$/)) sortfn = ts_sort_numeric;
 	if (itm.match(/^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/))
 		sortfn = ts_sort_date;
 	if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/))
 		sortfn = ts_sort_date;
 	if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d$/))
 		sortfn = ts_sort_date;
 	if (itm.match(/^[\u00a3$\u20ac\u00a5]/)) // pound dollar euro yen
 		sortfn = ts_sort_currency;
      if (itm.match(/sm=c$/)) sortfn = ts_sort_currency;
      if (itm.match(/sm=d$/)) sortfn = ts_sort_date;
      if (itm.match(/sm=n$/)) sortfn = ts_sort_numeric;
  
 	var reverse = (span.getAttribute("sortdir") == 'down');
  
 	 var newRows = new Array();
 	 for (var j = rowStart; j < table.rows.length; j++) {
 	 	var row = table.rows[j];
 	 	var keyText = ts_getInnerText(row.cells[column]);
 		 var oldIndex = (reverse ? -j : j);
 
 		newRows[newRows.length] = new Array(row, keyText, oldIndex);
 	}
  
 	newRows.sort(sortfn);
  
 	var arrowHTML;
 	if (reverse) {
 			arrowHTML = '<img src="'+ ts_image_path + ts_image_down + '" alt="&darr;"/>';
 			newRows.reverse();
 			span.setAttribute('sortdir','up');
 	} else {
 			arrowHTML = '<img src="'+ ts_image_path + ts_image_up + '" alt="&uarr;"/>';
 			span.setAttribute('sortdir','down');
 	}
  
 	// We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
 	// don't do sortbottom rows
 	for (var i = 0; i < newRows.length; i++) {
 		if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") == -1)
 			table.tBodies[0].appendChild(newRows[i][0]);
 	}
 	// do sortbottom rows only
 	for (var i = 0; i < newRows.length; i++) {
 		if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") != -1)
 			table.tBodies[0].appendChild(newRows[i][0]);
 	}
  
 	// Delete any other arrows there may be showing
 	var spans = getElementsByClassName(tr, "span", "sortarrow");
 	for (var i = 0; i < spans.length; i++) {
 		spans[i].innerHTML = '<img src="'+ ts_image_path + ts_image_none + '" alt="&darr;"/>';
 	}
 	span.innerHTML = arrowHTML;
  
 	ts_alternate(table);		
 }


 /** IP template for ban patrol ******
  * Others can be added for other or all pages.
  */
 if (mwCustomEditButtons && wgPageName == 'Uncyclopedia:Ban_Patrol') {
  mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://images1.wikia.com/uncyclopedia/images/d/d7/IP_button.png",
    "speedTip": "IP template",
    "tagOpen": "{" + "{" + "IP|",
    "tagClose": "}" + "}",
    "sampleText": "127.0.0.1"};
 }


 


 /** Fix XML bugs *******************************
  * By [[User:Spang|Spang]]
  * Eliminates bugs caused by invalid XHTML
  * The first parameter is the text of the page. Default is to return the XML, set the second parameter to false to return as text.
  */
 
 //<nowiki>
 function fixXML(text, parsetext) {
    var bug1a = text.indexOf('<head>');
    var bug1b = text.indexOf('<!-- start content -->');
    if (bug1a != -1 || bug1b != -1 ) var text = text.substring(0, bug1a) + '<body><div id="bodyContent">' + text.substring(bug1b);
 
    var bug2 = text.indexOf('<!-- end content -->');
    if (bug2 != -1)
       var text = text.substring(0, bug2) + '</div></body></html>';
    else
       return null;
 
    if (parsetext == false) return text; 
 
    var parser = new DOMParser();
    var fixedXML = parser.parseFromString(text, 'text/xml');
    return fixedXML;
 }
 //</nowiki>