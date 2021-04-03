// category insert script
 
if(wgAction == 'edit' || wgAction == 'submit') {
   if(typeof categoryTreeCollapseMsg == "undefined") var categoryTreeCollapseMsg = "összecsuk";
   if(typeof categoryTreeExpandMsg == "undefined") var categoryTreeExpandMsg = "kinyit";
   if(typeof categoryTreeLoadMsg == "undefined") var categoryTreeLoadMsg = "load";
   if(typeof categoryTreeLoadingMsg == "undefined") var categoryTreeLoadingMsg = "töltés";
   if(typeof categoryTreeNothingFoundMsg == "undefined") var categoryTreeNothingFoundMsg = "nincs találat";
   if(typeof categoryTreeNoSubcategoriesMsg == "undefined") var categoryTreeNoSubcategoriesMsg = "nincs alkategória.";
   if(typeof categoryTreeNoPagesMsg == "undefined") var categoryTreeNoPagesMsg = "nincs cikk vagy alkategória."; 
 
   var ciDefaultCategory = "Kategóriák";
   var ciStyleSheet = wgServer + wgScriptPath + "/CategoryTree.css";
 
   // read starting category from cookie
   var results = document.cookie.match("ciStart=(.*?)(;|$)");
   if (results) var ciStartingCategory = unescape(results[1]);
   else var ciStartingCategory = ciDefaultCategory;
   var ciMode = 0;
   // FIXME
   var ciFrame;
   var ciKey;
   var ciTrail;
   var ciTextRange;
   var ciError = false;
   var ciWikEdObj;
 
   if(document.createStyleSheet) {
      document.createStyleSheet(ciStyleSheet);
   } else {
      document.write('<link rel="stylesheet" type="text/css" href="' + ciStyleSheet + '">');
   }
 
   function ciGetDialog() {
      ciFrame = document.getElementById('catInsertFrame');
      if(!ciFrame) {
         ciFrame = document.createElement('div');
         ciFrame.id = 'catInsertFrame';
         ciFrame.style.position = "absolute";
         ciFrame.style.zIndex = "3";
         ciFrame.style.border = "solid #FFBE20 1px";
         ciFrame.style.background = "#FFFAEF";
         ciFrame.style.padding = "0.5em 1.5em 0.5em 0.5em";
         ciFrame.style.fontSize = "12px";
         ciFrame.onkeypress = function(e) { 
            if((event) ? 
                  (event.keyCode == 27) : // IE
                  (e.keyCode == e.DOM_VK_ESCAPE) // FF
               ) ciCloseDialog();
         }
 
         if (typeof(wikEdUseWikEd) != 'undefined' && wikEdUseWikEd == true) {
         var box = document.getElementById('wikEdFrameOuter');
         } else {
            var box = document.getElementById('wpTextbox1');
         }
         box.parentNode.insertBefore(ciFrame, box);
 
         var x = document.createElement('div');
         x.id = 'catInsertClose';
         x.style.position = 'absolute';
         x.style.top = '2px';
         x.style.right = '2px';
         // x.style.width = x.style.height = '1em';
         x.style.textAlign = 'center';
         x.style.verticalAlign = 'middle';
         x.style.padding = '1px 3px';
         x.style.border = '1px solid black'; 
         x.style.background = 'white';
         // x.style.fontFamily = 'monospace';
         // x.style.fontWeight = 'bold';
         x.style.fontFamily = 'Verdana, sans-serif';
         x.style.cursor = 'pointer';
         x.appendChild(document.createTextNode('x'));
         x.onclick = ciCloseDialog;
         ciFrame.appendChild(x);
      }
 
      var ciDiv = document.getElementById('catInsertBody');
      if(!ciDiv) {
         ciDiv = document.createElement('div');
         ciDiv.id = 'catInsertBody';
         ciFrame.appendChild(ciDiv);
      }
      ciFrame.style.display = 'block';
      return ciDiv;
   }
 
   function ciCloseDialog() {
      ciFrame.style.display = 'none';
      if (typeof(wikEdUseWikEd) != 'undefined' && wikEdUseWikEd == true) {
         wikEdFrameWindow.focus();         
      } else {
         document.editform.wpTextbox1.focus();
      }
   }
 
   function ciNextDiv(e) {
      var n= e.nextSibling;
      while ( n && ( n.nodeType != 1 || n.nodeName != 'DIV') ) {
         //alert('nodeType: ' + n.nodeType + '; nodeName: ' + n.nodeName);
         n= n.nextSibling;
      }
 
      return n;
   }
 
   function ciExpandNode(cat, mode, lnk) {
      var div= ciNextDiv( lnk.parentNode.parentNode );
 
      div.style.display= 'block';
      lnk.innerHTML= '&ndash;';
      lnk.title= categoryTreeCollapseMsg;
      lnk.onclick= function() { ciCollapseNode(cat, mode, lnk) }
 
      if (lnk.className != "CategoryTreeLoaded") {
         ciLoadNode(cat, mode, lnk, div);
      }
   }
 
   function ciCollapseNode(cat, mode, lnk) {
      var div= ciNextDiv( lnk.parentNode.parentNode );
 
      div.style.display= 'none';
      lnk.innerHTML= '+';
      lnk.title= categoryTreeExpandMsg;
      lnk.onclick= function() { ciExpandNode(cat, mode, lnk) }
   }
 
   function ciLoadNode(cat, mode, lnk, div) {
      div.style.display= 'block';
      lnk.className= 'CategoryTreeLoaded';
      lnk.innerHTML= '&ndash;';
      lnk.title= categoryTreeCollapseMsg;
      lnk.onclick= function() { ciCollapseNode(cat, mode, lnk); }
 
      ciLoadChildren(cat, mode, div);
   }
 
   function ciLoadChildren(cat, mode, div) {
      div.innerHTML= '<i class="CategoryTreeNotice">' + categoryTreeLoadingMsg + '</i>';
      function f( request ) {
         result= request.responseText;
         result= result.replace(/^\s+|\s+$/, '');
 
         if (request.status != 200) {
            if(ciError == false) { // show default list on error
               sajax_debug('Error loading ' + cat + ': ' + request.status + " " + request.statusText + ": " + result);
               ciLoadChildren(ciStartingCategory,ciMode,ciGetDialog());
            } else { // avoid infinite cycle
               result= "<div class='error'> " + request.status + " " + request.statusText + ": " + result + "</div>";
               ciError = false;
            }
         }
 
         if ( result == '' ) {
            result= '<i class="CategoryTreeNotice">';
 
            if ( mode == 0 ) result= categoryTreeNoSubcategoriesMsg;
            else if ( mode == 10 ) result= categoryTreeNoPagesMsg;
            else result= categoryTreeNothingFoundMsg;
 
            result+= '</i>';
         }
 
         result = result.replace(/categoryTreeExpandNode/g, 'ciExpandNode');
         // result = result.replace(/categoryTreeExpandNode/g, 'ciLoadChildren'); // replace, don't expand
         result = result.replace(/href="\/wiki\/[^"]*">([^<]*)/g, 'onclick="ciInsertCategory(\'$1\')">$1');
         result = result.replace(/##LOAD##/g, categoryTreeExpandMsg);
         div.innerHTML = result;
      }
 
      sajax_do_call( "efCategoryTreeAjaxWrapper", [cat, mode] , f );
   }
 
   function ciInsertCategory(cat) {
      var categoryLink = '['+'[Kategória:' + cat + ciKey + ']]' + ciTrail;
      if (typeof(wikEdUseWikEd) != 'undefined' && wikEdUseWikEd == true) {
         ciWikEdObj.changed.plain = categoryLink;
         ciWikEdObj.changed.keepSel = true;
         wikEdLastVersion = null;
         ciWikEdObj.html = ciWikEdObj.changed.plain;
         if (wikEdHighlightSyntax == true) {
            WikEdHighlightSyntax(ciWikEdObj);
         } else {
            ciWikEdObj.html = ciWikEdObj.html.replace(/(\t)/g, '<span class="wikEdTabPlain">$1</span><!--wikEdTabPlain-->');
         }
         ciWikEdObj.sel.removeAllRanges();
         ciWikEdObj.sel.addRange(ciWikEdObj.changed.range);
         WikEdFrameExecCommand('inserthtml', ciWikEdObj.html);
         wikEdFrameDOMCache = null;
         wikEdFrameWindow.focus();
         if (wikEdHighlightSyntax == true) {
            WikEdFollowLinks();
         }
      } else {
         var textarea = document.editform.wpTextbox1;
         textarea.focus();
         if (document.selection && document.selection.createRange) { // IE, Opera
            if (document.documentElement && document.documentElement.scrollTop) {
               var winScroll = document.documentElement.scrollTop
            } else if (document.body) {
               var winScroll = document.body.scrollTop;
            }
            ciTextRange.text = categoryLink;
            if (document.documentElement && document.documentElement.scrollTop) {
               document.documentElement.scrollTop = winScroll;
            } else if (document.body){ 
               document.body.scrollTop = winScroll;
            }
         } else if(textarea.selectionStart || textarea.selectionStart == '0') { // Gecko-based
            var textScroll = textarea.scrollTop;
            var selStart = textarea.selectionStart;
            textarea.value = textarea.value.substring(0, selStart)
                           + categoryLink
                           + textarea.value.substring(textarea.selectionEnd, textarea.value.length);
            textarea.selectionStart = textarea.selectionEnd = selStart + categoryLink.length;
            textarea.scrollTop = textScroll;
         }
      }
      ciFrame.style.display = 'none';
   }
 
   function ciButtonClicked() {
      var is_ie = false /*@cc_on || true @*/; // browser detection with conditional comments
 
      if(arguments.length) var e = arguments[0]; // FIXME
      else var e = event;
      if (typeof(e.shiftKey) != "undefined") var shift = e.shiftKey;
      else var shift = e.modifiers & Event.SHIFT_MASK;
      if (shift) { // set default starting category
         var start = prompt("Induló kategória: ", ciStartingCategory);
         if(start) {
            ciStartingCategory = start;
            document.cookie = 'ciStart='+escape(start);
         } else if (start === "") {
            ciStartingCategory = ciDefaultCategory;
            document.cookie = 'ciStart=; expires=Thu, 01-Jan-1970 00:00:01 GMT;'; // delete cookie
         }
         return;
      }
      if (typeof(wikEdUseWikEd) != 'undefined' && wikEdUseWikEd == true) {
         ciWikEdObj = {};
	      ciWikEdObj.changed = {};
         WikEdGetText(ciWikEdObj, 'selection');
         ciWikEdObj.changed = ciWikEdObj.selection;
         var selection = ciWikEdObj.selection.plain;
      } else {
         var textarea = document.editform.wpTextbox1;
         if (document.selection && document.selection.createRange) { // IE, Opera
            textarea.focus();
            ciTextRange = document.selection.createRange();
            if(is_ie) { // workaround for the inconsistent handling of trailing newlines in IE
               var l = ciTextRange.text.length;
               var count = 10; // stop IE7 from going into an infinite loop
               while(ciTextRange.text.length == l && count != 0) {
                  ciTextRange.moveEnd('character', -1);
                  count--;
               }
               ciTextRange.moveEnd('character', 1);
            }
            var selection = ciTextRange.text;
         } else if(textarea.selectionStart || textarea.selectionStart == '0') { // Gecko-based
            var selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
         }
      }
      ciKey = ciTrail = '';
      if(!selection) { // use ciStartingCategory as default
         selection = ciStartingCategory;
      } else {
         var match = selection.match(/(\s+)$/);
         if (match && match.length >= 2) { // allow trailing whitespace
            selection = selection.substring(0, selection.length - (match[1].length));
            ciTrail = match[1];
         }
         match = selection.match(/\[\[.*(\|.*)]]$/);
         if(match && match.length >= 2) {
            ciKey = match[1];
         }
         selection = selection.replace(/^\[\[[Kk]ategória:/, '');
         selection = selection.replace(/(\|.*)?]]$/, '');
      }
      var div = ciGetDialog();
      ciFrame.focus();
      ciLoadChildren(selection,ciMode,div);
   }
 
   function ciInstallButton() {
      var toolbar = document.getElementById('toolbar');
      if (!toolbar) { return false; }
      mwInsertEditButton(toolbar, {
         "imageId": "insertCategory",
         "imageFile": 'http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png',
         "speedTip": "Kategória kiválasztása",
         "tagOpen": "",
         "tagClose": "",
         "sampleText": ""
      });
      var button = document.getElementById("insertCategory");
      button.onclick = ciButtonClicked;
   }
   hookEvent('load', ciInstallButton);
}