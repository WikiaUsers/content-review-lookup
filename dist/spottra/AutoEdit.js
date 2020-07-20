 function getParamValue(paramName) {
   var cmdRe=RegExp('[&?]'+paramName+'=([^&]*)');
   var h=document.location;
   var m;
   if (m=cmdRe.exec(h)) {
     try { 
       return decodeURI(m[1]);
     } catch (someError) {}
   }
   return null;
 };
  
 function substitute(data,cmdBody) {
   // alert('sub\nfrom: '+cmdBody.from+'\nto: '+cmdBody.to+'\nflags: '+cmdBody.flags);
   var fromRe=RegExp(cmdBody.from, cmdBody.flags);
   return data.replace(fromRe, cmdBody.to);
 };
  
 function execCmds(data, cmdList) {
   for (var i=0; i<cmdList.length; ++i) {
     data=cmdList[i].action(data, cmdList[i]);
   }
   return data;
 }
  
 function parseCmd(str) {
   // returns a list of commands
   if (!str.length) return [];
   var p=false;
   switch (str.charAt(0)) {
   case 's':
     p=parseSubstitute(str);
     break;
   case 'j':
     p=parseJavascript(str);
     break;
   default:
     return false;
   }
   if (p) return [p].concat(parseCmd(p.remainder));
   return false;
 };
  
 function unEscape(str, sep) {
   return str.split('\\\\').join('\\')
         .split('\\'+sep).join(sep)
         .split('\\n').join('\n');
 };
  
  
 function runJavascript(data, argWrapper) {
   // flags aren't used (yet)
  
   // from the user's viewpoint,
   // data is a special variable may appear inside code
   // and gets assigned the text in the edit box
  
   // alert('eval-ing '+argWrapper.code);
  
   return eval(argWrapper.code);
 };
  
 function parseJavascript(str) {
   // takes a string like j/code/;othercmds and parses it
  
   var tmp,code,flags;
  
   if (str.length<3) return false;
   var sep=str.charAt(1);
   str=str.substring(2);
  
   tmp=skipOver(str,sep);
   if (tmp) { code=tmp.segment.split('\n').join('\\n'); str=tmp.remainder; }
   else return false;
  
   flags='';
   if (str.length) {
     tmp=skipOver(str,';') || skipToEnd(str, ';');
     if (tmp) {flags=tmp.segment; str=tmp.remainder; }
   }
  
   return { action: runJavascript, code: code, flags: flags, remainder: str };
 };
  
 function parseSubstitute(str) {
   // takes a string like s/a/b/flags;othercmds and parses it
  
   var from,to,flags,tmp;
  
   if (str.length<4) return false;
   var sep=str.charAt(1);
   str=str.substring(2);
  
   tmp=skipOver(str,sep);
   if (tmp) { from=tmp.segment; str=tmp.remainder; } 
   else return false;
  
   tmp=skipOver(str,sep);
   if (tmp) { to=tmp.segment; str=tmp.remainder; } 
   else return false;
  
   flags='';
   if (str.length) {
     tmp=skipOver(str,';') || skipToEnd(str, ';');
     if (tmp) {flags=tmp.segment; str=tmp.remainder; }
   }
  
   return {action: substitute, from: from, to: to, flags: flags, remainder: str};
  
 };
  
 function skipOver(str,sep) {
   var endSegment=findNext(str,sep);
   if (endSegment<0) return false;
   var segment=unEscape(str.substring(0,endSegment), sep);
   return {segment: segment, remainder: str.substring(endSegment+1)};
 }
  
 function skipToEnd(str,sep) {
   return {segment: str, remainder: ''};
 }
  
 function findNext(str, ch) {
   for (var i=0; i<str.length; ++i) {
     if (str.charAt(i)=='\\') i+=2;
     if (str.charAt(i)==ch) return i;
   }
   return -1;
 };
  
 function runOnLoad(f) {
   if (window.addEventListener) {
     window.addEventListener("load",f,false);
   }
   else if (window.attachEvent) {
     window.attachEvent("onload",f);
   }
   else {
     window._old_popup_autoedit_onload = window.onload;
     window.onload = function() {
       window._old_popup_autoedit_onload();
       f();
     }
   }
 };
  
 window.autoEdit=function() {
   if (window.autoEdit.alreadyRan) return false;
   window.autoEdit.alreadyRan=true;
   var cmdString=getParamValue('autoedit');
   if (cmdString) {
     try { 
       var editbox=document.editform.wpTextbox1;
     } catch (dang) { return; }
     var cmdList=parseCmd(cmdString);
     var input=editbox.value;
     var output=execCmds(input, cmdList);
     editbox.value=output;
     // wikEd user script compatibility
     if (typeof(wikEdUseWikEd) != 'undefined') {
       if (wikEdUseWikEd == true) {
         WikEdUpdateFrame();
       }
     }
   }
  
   var summary=getParamValue('autosummary');
   if (summary) document.editform.wpSummary.value=summary;
  
   var minor=getParamValue('autominor');
   if (minor) {
     switch (minor) {
     case '1':
     case 'yes':
     case 'true':
       document.editform.wpMinoredit.checked=true;
       break;
     case '0':
     case 'no':
     case 'false':
       document.editform.wpMinoredit.checked=false;
     }
   }
  
   var watch = getParamValue('autowatch');
   if (watch) {
     switch (watch) {
       case '1':
       case 'yes':
       case 'true':
         document.editform.wpWatchthis.checked = true;
         break;
       case '0':
       case 'no':
       case 'false':
         document.editform.wpWatchthis.checked = false;
     }
   }
  
   var btn=getParamValue('autoclick');
   if (btn) {
     if (document.editform && document.editform[btn]) {
       var headings=document.getElementsByTagName('h1');
       if (headings) {
         var div=document.createElement('div');
         var button=document.editform[btn];
         div.innerHTML='<font size=+1><b>The "' + button.value + 
           '" button has been automatically clicked.' + 
           ' Please wait for the next page to load.</b></font>';
         document.title='('+document.title+')';
         headings[0].parentNode.insertBefore(div, headings[0]);
         button.click();
       }
     } else {
       alert('autoedit.js\n\nautoclick: could not find button "'+ btn +'".');
     }  
   }
 };
  
 runOnLoad(autoEdit);