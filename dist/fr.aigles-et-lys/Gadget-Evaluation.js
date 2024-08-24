/* adapté de [[MediaWiki:Gadget-Evaluation.js]] (version du 12 septembre 2008) par Chphe
* {{:Projet:JavaScript/Script|Evaluation}}
* rajouter l'onglet suivi des users
* 
*/
//<source lang=javascript>//<pre><nowiki>


if(wgNamespaceNumber==0 && wgAction == "view") addOnloadHook(ev_addEvalTab)

//rajoute l'onglet suivi des users
function ev_addEvalTab()
{
   var list = document.getElementById('p-cactions')
 
   if(!list) return
 
   list = list.childNodes[3].childNodes[1]
 
   var elt = document.createElement('li')
   elt.innerHTML = "<a id='caa_evaluation' href='javascript:ev_launchEval()'>Évaluer</a>"
   list.appendChild(elt)
   removeClass(list, "emptyPortlet");

   try {if(alwaysEval){ev_launchEval()}}
   catch(e){ }
}
 
 
//initialise les variables 
function ev_initVars()
{
   if(typeof initEvalProjectNames != "undefined")
      initEvalProjectNames();
   else
      evalProjectNames=new Array(); 
 
   try {if(evalProjectNames){}}
   catch(e){ evalProjectNames = new Array() }
 
   evaluation_multiprojets = new Object();
   evaluation_multiprojets.project = new Array();
   evaluation_multiprojets.importance = new Array();
   evaluation_multiprojets.avancement = new Array();
   evaluation_multiprojets.state = new Array();
   evaluation_multiprojets.avancement_global = "?";
   evaluation_multiprojets.autres = {}; // pour ramasser le reste (WP1.0, todo, wikiconcours, ...)
}
 
function ev_launchEval()
{
   var req=new XMLHttpRequest()
   var div = document.getElementById('bodyContent') // Monobook et affiliés, Vector
   if(!div) div = document.getElementById('mw_contentholder'); // Moderne
   if(!div) div = document.getElementById('article'); // Bleu de Cologne, Standard, Nostalgia
   if(!div) return;
   var dummy = new Date().getTime()
 
   if (document.URL.match(/&printable/))
   {
       /* version imprimable */
       return;
   } 
 
   EvalDiv = document.getElementById('EvalDiv')
 
   if(!EvalDiv)
   {
      EvalDiv = document.createElement('div')
      EvalDiv.id = "EvalDiv"
      EvalDiv.align="center"
      div.parentNode.insertBefore(EvalDiv, div)
   }
 
   EvalDiv.innerHTML = "Interrogation de la page de discussion..."
 
   ev_initVars()
 
   req.onreadystatechange = function()
   {
      if(req.readyState == 4)
      {
         if(req.status==200)
         {   
            ev_ExtractEvaluation(req.responseText)
 
            ev_AddMyProjects()
            ev_drawEvaluation()
         }
         else if(req.status==404) //la pdd n'existe pas 
         {
            ev_AddMyProjects()
            ev_drawEvaluation()
         }
      }//fin readyState == 4
   }
 
   req.open("GET",wgScript+"?title="+wgFormattedNamespaces[1]+":" + encodeURIComponent(wgPageName)   + "&action=raw&_dum=" + dummy, true)
   req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
   req.send(null)
}
 
function ev_addCell(line, html, bgcolor)
{
   return ev_addCell(line, htlk, bgcolor, 0)
}
function ev_addCell(line, html, bgcolor, colSpan)
{
   var cell = line.insertCell(-1)
   cell.innerHTML = html
   if(colSpan != 0) cell.colSpan = colSpan;
 
   if(bgcolor) cell.style.backgroundColor = "#" + bgcolor
 
   return cell;
}
function ev_htmlEncode(string)
{
   string = string.replace(/&/, '&amp;');
   string = string.replace(/>/, '&gt;');
   string = string.replace(/</, '&lt;');
   string = string.replace(/"/, '&quot;');
   return string
}
 
function ev_getRadioboxHtml(id, selected, n, prop, value)
{
   if(prop == "avancement_global")
      return "<input onclick='evaluation_multiprojets.avancement_global=\"" + value + "\"'  name='" + id + "_mp' type='radio'" + (selected?" checked='true'/>":"/>")
   else
      return "<input onclick='evaluation_multiprojets." + prop + "["+n+"]=\"" + value + "\"'  name='" + id + "_mp' type='radio'" + (selected?" checked='true'/>":"/>")
}
 
function ev_addEvalLine(tab, project, av, im, state, n)
{
   var line = tab.insertRow(-1)

   ev_addCell(line, '<a title="Projet:' + ev_htmlEncode(project) + '" href="/wiki/Projet:' + encodeURIComponent(project) + '">' + project + "</a>")
   ev_addCell(line, "<input onclick='evaluation_multiprojets.state["+n+"]=this.checked' type='checkbox'" + (state?" checked='true'/>":"/>"))
   ev_addCell(line, "<input onclick='evaluation_multiprojets.avancement["+n+"] = null' name='" + n + "a_mp' type='radio'" + (av == null?" checked='true'/>":"/>"))
      
   ev_addCell(line, ev_getRadioboxHtml(n+"a", av=="AdQ", n, "avancement", "AdQ"))
   ev_addCell(line, ev_getRadioboxHtml(n+"a", av=="BA", n, "avancement", "BA"))
   ev_addCell(line, ev_getRadioboxHtml(n+"a", av=="A", n, "avancement", "A"))
   ev_addCell(line, ev_getRadioboxHtml(n+"a", av=="B", n, "avancement", "B"))
   ev_addCell(line, ev_getRadioboxHtml(n+"a", av=="BD", n, "avancement", "BD"))
   ev_addCell(line, ev_getRadioboxHtml(n+"a", av=="ébauche", n, "avancement", "ébauche"))
   ev_addCell(line, ev_getRadioboxHtml(n+"a", av=="?", n, "avancement", "?"))
   ev_addCell(line, ev_getRadioboxHtml(n+"i", im=="maximum", n, "importance", "maximum"))
   ev_addCell(line, ev_getRadioboxHtml(n+"i", im=="élevée", n, "importance", "élevée"))
   ev_addCell(line, ev_getRadioboxHtml(n+"i", im=="moyenne", n, "importance", "moyenne"))
   ev_addCell(line, ev_getRadioboxHtml(n+"i", im=="faible", n, "importance", "faible"))
   ev_addCell(line, ev_getRadioboxHtml(n+"i", im=="?", n, "importance", "?"))
}
 
function ev_drawEvaluation()
{
   var tab = document.createElement("table")
   var line = tab.insertRow(-1)
 
   ev_addCell(line, "<b>Projet</b>", "F8F8F8")
   ev_addCell(line, "<b>Bandeau présent</b>", "F8F8F8")
   ev_addCell(line, "<b>Eval. par déf.</b>", "F8F8F8")
   ev_addCell(line, "<b>AdQ</b>", "6699FF")
   ev_addCell(line, "<b>BA</b>", "66FF66")
   ev_addCell(line, "<b>A</b>", "66FFFF")
   ev_addCell(line, "<b>B</b>", "FFFF66")
   ev_addCell(line, "<b>BD</b>", "FFAA66")
   ev_addCell(line, "<b>Ébauche</b>", "FF6666")
   ev_addCell(line, "<b>?</b>", "F8F8F8")
   ev_addCell(line, "<b>Maximum</b>", "FF00FF")
   ev_addCell(line, "<b>Élevée</b>", "FF88FF")
   ev_addCell(line, "<b>Moyenne</b>", "FFCCFF")
   ev_addCell(line, "<b>Faible</b>", "FFEEFF")
   ev_addCell(line, "<b>?</b>", "F8F8F8")
   
   line = tab.insertRow(-1)
   var av = evaluation_multiprojets.avancement_global;
   ev_addCell(line, "<b>Avancement commun</b>", "F8F8F8", 3)
   ev_addCell(line, ev_getRadioboxHtml("ag", av=="AdQ", null, "avancement_global", "AdQ", true))
   ev_addCell(line, ev_getRadioboxHtml("ag", av=="BA", null, "avancement_global", "BA", true))
   ev_addCell(line, ev_getRadioboxHtml("ag", av=="A", null, "avancement_global", "A", true))
   ev_addCell(line, ev_getRadioboxHtml("ag", av=="B", null, "avancement_global", "B", true))
   ev_addCell(line, ev_getRadioboxHtml("ag", av=="BD", null, "avancement_global", "BD", true))
   ev_addCell(line, ev_getRadioboxHtml("ag", av=="ébauche", null, "avancement_global", "ébauche", true))
   ev_addCell(line, ev_getRadioboxHtml("ag", av=="?", null, "avancement_global", "?", true))
   ev_addCell(line, "", "F8F8F8", 5)
 
   for(var i=0; i<evaluation_multiprojets.project.length; i++)
      ev_addEvalLine(tab, evaluation_multiprojets.project[i], evaluation_multiprojets.avancement[i], evaluation_multiprojets.importance[i], evaluation_multiprojets.state[i], i, true)
 
   tab.className = 'wikitable'
   tab.style.textAlign = 'center'
   tab.style.fontSize = '90%'
 
   EvalDiv.innerHTML = ''
   EvalDiv.appendChild(tab)
 
   var button  = document.createElement("button")
   button.textContent = "Exporter cette évaluation vers la page de discussion"
   button.onclick = ev_setEvaluation
   button.id='EvalButton'
   EvalDiv.appendChild(button)
}
 
//définition de la méthode indexOf et map pour les versions JavaScript inférieures à 1.6
if (!Array.prototype.indexOf)
{
   Array.prototype.indexOf = function(elt /*, from*/)
   {
      var len = this.length;
 
      var from = Number(arguments[1]) || 0;
      from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
      if (from < 0)
         from += len;
 
      for (; from < len; from++)
      {
         if (from in this &&
            this[from] === elt)
            return from;
      }
      return -1;
   };
}
 
if (!Array.prototype.map)
{
   Array.prototype.map = function(fun /*, thisp*/)
   {
      var len = this.length;
      if (typeof fun != "function"){
         throw new TypeError();
      }
      var res = new Array(len);
      var thisp = arguments[1];
      for (var i = 0; i < len; i++)
      {
         if (i in this)
            res[i] = fun.call(thisp, this[i], i, this);
      }
 
      return res;
   };
}
 
function ev_AddMyProjects()
{
   for(var i=0; i<evalProjectNames.length;i++)
   {
      if(evaluation_multiprojets.project.indexOf(evalProjectNames[i]) == -1)
      {
         var t = evaluation_multiprojets.project.length
 
         evaluation_multiprojets.project[t] = evalProjectNames[i]
         evaluation_multiprojets.importance[t] = "?"
         evaluation_multiprojets.state[t] = false
         evaluation_multiprojets.avancement[t] = null;
      }
   }
}
 
function ev_ExtractEvaluation(discussion)
{
   var modeles;
 
   discussion = " "  + discussion
   modeles = discussion.split(/\{\{[W|w]ikiprojet /)
   modeles.shift()
   
   var reg_plus_consultes = /{{([lL]es plus consultés\s*\|[^}]*}})/;
   var m = reg_plus_consultes.exec(discussion);
   if(m) { modeles.push(m[1]); }
   
   var tab_anc_eval = new Array();
 
   for(var i=0;i<modeles.length;i++)
   {
      try
      {    
         modeles[i] = modeles[i].split("}}")[0]
         var temp = modeles[i].split("|")
         evaluation_multiprojets.project[i] = temp[0]
         tab_anc_eval.push(temp[0])
         evaluation_multiprojets.avancement[i] = "?"
         evaluation_multiprojets.importance[i] = "?"

         if(temp.length >= 2) ev_getOldEval(temp[1], i)
         if(temp.length >= 3) ev_getOldEval(temp[2], i)
         if(temp.length >= 4) ev_getOldEval(temp[3], i)

         evaluation_multiprojets.state[i] = true
      }
      catch(e){alert(e)}
   }
     
   var reg_modele_multiprojet = /{{([wW]ikiprojet|[éÉ]valuation multiprojet)\s*\|([^}]*)}}/;
   var regAv = /avancement\s*((\s\S.*)?)$/;
   m = reg_modele_multiprojet.exec(discussion);
   if(m)
   {
      var tab = m[2].split("|");
      var i=0;
      var ind=evaluation_multiprojets.project.length;
      var tab_avancement=new Array();
      while(i<tab.length)
      {
         var t = tab[i].split("=");
         if(t.length == 2)
         {
            var mm = regAv.exec(t[0]);
            if(mm)
            {
               if(mm[1] == "")
                  evaluation_multiprojets.avancement_global = ev_cleanAvancement(t[1].replace(/^\s+|\s+$/g, ''));
               else
                  tab_avancement[mm[1].replace(/^\s+|\s+$/g, '')] = ev_cleanAvancement(t[1].replace(/^\s+|\s+$/g, ''));
            }
            else
            {
               evaluation_multiprojets.autres[t[0]] = t[1].replace(/^\s+|\s+$/g, '');
            }
         }
         else if(t.length == 1)
         {
            var _proj =tab[i].replace(/^\s+|\s+$/g, '');
            if(_proj in tab_anc_eval) { i+= 2 ; continue; }
            evaluation_multiprojets.project[ind] =_proj;
            if(i==tab.length-1) alert("Erreur de lecture du modèle {{éÉvaluation multiprojet}}");
            evaluation_multiprojets.importance[ind] = ev_cleanImportance(tab[i+1].replace(/^\s+|\s+$/g, ''));
            evaluation_multiprojets.avancement[ind] = null;
            evaluation_multiprojets.state[ind] = true;
            ind++;
            i++;
         }
         i++;
      }
      
      for(var i=0; i<evaluation_multiprojets.project.length; i++)
      {
         if(evaluation_multiprojets.project[i] in tab_avancement)
            evaluation_multiprojets.avancement[i] = tab_avancement[evaluation_multiprojets.project[i]];
      }
   }
}
 
function ev_cleanAvancement(val)
{
   if(val=="AdQ") return "AdQ"
   if(val=="BA") return "BA"
   if(val=="A") return "A"
   if(val=="B") return "B"
   if(val=="BD") return "BD"
   if(val=="ébauche" || val=="Ébauche") return "ébauche"
 
   return "?"
}
 
 
function ev_cleanImportance(val)
{
   if(val.toLowerCase()=="maximum" || val.toLowerCase()=="maximale") return "maximum"
   if(val.toLowerCase()=="élevée") return "élevée"
   if(val.toLowerCase()=="moyenne") return "moyenne"
   if(val.toLowerCase()=="faible") return "faible"
 
   return "?"
}
 
function ev_getOldEval(str,i)
{
   var params = str.split("=")
 
   if(params[0]=="importance") evaluation_multiprojets.importance[i] = ev_cleanImportance(params[1])
   else if(params[0]=="avancement") evaluation_multiprojets.avancement[i] = ev_cleanAvancement(params[1])
}
 
function ev_setEvaluation()
{
   document.getElementById("EvalButton").disabled = true
   wpEditPage("Discuter:" + wgPageName, {}, ev_editFoo, ev_saveFoo, {})
}
 
function ev_editFoo(text, summary, doc, data)
{
   summary = "[[MediaWiki:Gadget-Evaluation.js|Évaluation]]: "+ev_getSummary_multiprojects();
   text = ev_suppr_anc_eval(text);
   text = ev_process_multiprojects(text);
   text = ev_remise_en_tete(text);
   return { wpTextbox1: text, wpSummary: summary, data: data };
}
 
function ev_saveFoo()
{
   document.getElementById("EvalButton").disabled = false
}
 
function ev_getSummary_multiprojects()
{
   summary = " Multiprojet ("+evaluation_multiprojets.avancement_global+")";
   for(var i=0; i<evaluation_multiprojets.project.length; i++)
   {
      if(evaluation_multiprojets.state[i])
      {
         summary += " "+evaluation_multiprojets.project[i] + "|" + evaluation_multiprojets.importance[i];
         if(evaluation_multiprojets.avancement[i] != null)
            summary += "|"+evaluation_multiprojets.avancement[i];
      }
   }
   return summary+")";
}
function ev_suppr_anc_eval(text)
{
   var regtxt =new RegExp("\\{\\{([W|w]ikiprojet [^\\}|]|[lL]es plus consultés)[^\\}]*\\}\\}", "g");
   // return eval("text.replace(" + regtxt + ",'')")
   var regtext_b = new RegExp("\\{\\{[éÉ]valuations[ _]WP1[^\\}\\{]*\\}\\}", "g")
   return text.replace(regtxt, '').replace(regtext_b, '');
}
 
function ev_process_multiprojects(text)
{
   var regtxt = /\{\{([wW]ikiprojet|[éÉ]valuation multiprojet)\s*\|[^\}]*\}\}/
   var newtxt = "{{Wikiprojet";
   var regtodo=/\{\{([tT]odo\|?\*?|[àÀ] faire\|?\*?)\}\}/
   var ok = false
   for(var i=0; i<evaluation_multiprojets.project.length; i++)
   {
      if(evaluation_multiprojets.state[i])
      {
         newtxt += "\n|"+evaluation_multiprojets.project[i]+"|"+evaluation_multiprojets.importance[i]
         if(evaluation_multiprojets.avancement[i] != null)
            newtxt += "|avancement "+evaluation_multiprojets.project[i]+"="+evaluation_multiprojets.avancement[i]
         ok = true;
      }
   }
   ok = ok || (evaluation_multiprojets.avancement_global != "?");
   newtxt += "\n|avancement="+evaluation_multiprojets.avancement_global;
   
   for(var i in evaluation_multiprojets.autres)
   {
      newtxt += "\n|"+i+"="+evaluation_multiprojets.autres[i];
   }
   newtxt += "\n}}";
 
   if(ok)
   {
      if(regtxt.test(text))
         text = text.replace(regtxt, newtxt)
      else
         text = newtxt + "\n" + text
      text = text.replace(regtodo, "")
   }
    return text;
}
function ev_remise_en_tete(text)
{
   var reg = /(\{\{[tT]raduit de\s*\|[^}]*\}\})/
   var m = reg.exec(text);
   if(m)
   {
      var left = RegExp.leftContext
      var right = RegExp.rightContext
      text = m[1]+"\n"+left.replace(/\s+$/, '')+"\n"+right.replace(/^\s+/, '');
   }
   return text;
} 
 
 
/////////////////////////////////////////////////////////from tichou
 
 
 
// URL encode
if (typeof(wpURLEncode) == "undefined") {
  wpURLEncode = function(string) {
    if (!string) return "";
    return string.replace(/ /g, "_").replace(/[\x00-\x2C\x3B-\x40\x5B-\x5E\x60\x7B-\uFFFF]/g,
      function (match) {
        var c = match.charCodeAt(0);
        var s = new Array();
        if (c < 0x80) s.push(c);
        else if (c < 0x0800) s.push(c >>  6 | 0xC0, c & 0x3F | 0x80);
        else if (c < 0x010000) s.push(c >> 12 | 0xE0, c >>  6 & 0x3F | 0x80, c & 0x3F | 0x80);
        else if (c < 0x110000) s.push(c >> 18 | 0xF0, c >> 12 & 0x3F | 0x80, c >>  6 & 0x3F | 0x80, c & 0x3F | 0x80);
        for (var i = 0, len = s.length; i < len; i++)
          s[i] = (s[i] < 16 ? "%0" : "%") + s[i].toString(16).toUpperCase();
        return s.join("");
      });
  }
}
 
// getElementById
if (typeof(getElementById) == "undefined") {
  getElementById = function(id) {
    var element = null;
    if (this.id == id) {
      element = this;
      element.getElementsByClassName = document.getElementsByClassName;
    }
    for (var child = this.firstChild; !element && child; child = child.nextSibling)
      if (child.nodeType == 1) {
        child.getElementById = getElementById;
        element = child.getElementById(id);
      }
    return element;
  }
}
 
// HTTP
if (typeof(httpRequest) == "undefined") {
  httpRequest = function(url, options, data) {
    // options.async
    // options.method
    // options.headers
    // options.content
    // options.onSuccess(request,data)
    // options.onFailure(request,data)
    var request;
    try {
      request = new XMLHttpRequest();
    } catch(e) {
      try {
        request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          request = false;
        }
      }
    }
 
    if (request) {
      request.onreadystatechange = function() {
        if (request.readyState == 4)
          httpComplete(request, options, data);
      };
      request.open(options.method ? options.method : "GET", url, options.async == false ? false : true);
      if (options.headers) {
        for (var field in options.headers)
          request.setRequestHeader(field, options.headers[field]);
      }
      request.send(options.content ? options.content : null);
    }
    return request;
  }
}
 
if (typeof(httpComplete) == "undefined") {
  httpComplete = function(request, options, data) {
    if (request.status >= 200 && request.status < 300) {
      if (options.onSuccess) {
        var contentType = request.getResponseHeader("Content-Type");
        var regex = new RegExp(/^([^\/]+\/[^;]+).*/);
        contentType = contentType.replace(regex, "$1");
        if (contentType == "text/html") {
          var doc = document.createElement("div");
          doc.innerHTML = request.responseText;
          doc.getElementsByClassName = document.getElementsByClassName;
          doc.getElementById = getElementById;
          options.onSuccess(doc, data);
        } else if (contentType == "text/xml") {
          var xml = null;
          if (navigator.appName == "Microsoft Internet Explorer") {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.loadXML(request.responseText);
          } else if (window.DOMParser) {
            xml = new DOMParser();
            xml = xml.parseFromString(request.responseText, 'text/xml');
          }
          options.onSuccess(xml, data);
        } else {
          options.onSuccess(request, data);
        }
      }
    } else if (options.onFailure) {
      options.onFailure(request, data);
    } else {
      alert(request.statusText);
    }
  }
}
 
// Edit WP page
if (typeof(wpEditPage) == "undefined") {
  wpEditPage = function(title, params, editFunction, saveFunction, data) {
    var url = wgServer + wgScript + '?title=' + wpURLEncode(title)
            + '&action=edit';
 
    for (var name in params)
      url += '&' + name + '=' + wpURLEncode(params[name]);
 
    var options = { onSuccess: wpSavePage };
 
    data.title = title;
    data.editFunction = editFunction;
    data.saveFunction = saveFunction;
 
    httpRequest(url, options, data);
  }
}
 
// Save WP page
if (typeof(wpSavePage) == "undefined") {
   wpSavePage = function(doc, data) {
      var inputs = doc.getElementById('editform').getElementsByTagName('input');
      var editform = new Array();
      for (var i = 0, len = inputs.length; i < len; i++) 
      {
         var value = inputs[i].value
         if(inputs[i].type != "checkbox" || inputs[i].checked) 
            editform[inputs[i].name] = value;
      }
    
      var wpTextbox1 = doc.getElementById('wpTextbox1').value;
      var wpSummary = editform['wpSummary'];
    
      var regex = new RegExp(/var wgArticleId = "(\d+)";(?:\n.*)*var wgCurRevisionId = "(\d+)";/m);
      var match = regex.exec(doc.textContent);
      if (match) {
         data.pageId = match[1];
         data.curRevId = match[2];
      }
    
      var edit = data.editFunction(wpTextbox1, wpSummary, doc, data);
    
      if (typeof(edit.error) == "undefined") { 
         editform['wpTextbox1'] = edit.wpTextbox1;
         editform['wpSummary'] = edit.wpSummary;
    
         var params = [ 'wpTextbox1', 'wpSummary', 'wpSection',
                        'wpStarttime', 'wpEdittime', 'wpEditToken', 'wpSave' ];
    
         if(editform['wpWatchthis']) params.push('wpWatchthis')
         var content = params.map(function(name) { return name + '=' + encodeURIComponent(editform[name]); }).join("&");
    
         var url = wgServer + wgScript + '?title=' + wpURLEncode(data.title)
                 + '&action=submit';
    
         var headers = new Object();
         headers['Content-Type'] = 'application/x-www-form-urlencoded';
    
         var options = { method: 'POST', headers: headers, content: content, onSuccess: data.saveFunction };
    
         data = edit.data;
    
         httpRequest(url, options, data);
      } else {
         edit.error(edit.data);
      }
   }
}
 
var wpfunctions = 1;

//</nowiki></pre></source>