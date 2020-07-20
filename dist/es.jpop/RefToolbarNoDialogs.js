var numforms = 0;
var wikEdAutoUpdateUrl;
function refbuttons() {
  if (mwCustomEditButtons && (document.getElementById('toolbar') || document.getElementById('wikiEditor-ui-toolbar'))/* && wikEdAutoUpdateUrl == null*/) {
    if (document.getElementById('toolbar')) {
      button = document.createElement('a');
      button.href = "javascript:easyCiteMain()";
      button.title = "Insert citation";
      buttonimage = document.createElement('img');
      buttonimage.src = "//upload.wikimedia.org/wikipedia/commons/0/00/Button_easy_cite_%281%29.png";
      buttonimage.alt = "Insert footnote";
      button.appendChild(buttonimage);
      document.getElementById('toolbar').appendChild(button);
    } else {
      button = document.createElement('a');
      button.href = "#";
      button.title = "Insert citation";
      button.id = 'reftoolbar-button';
      buttonimage = document.createElement('img');
      buttonimage.src = "//upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Curly_Brackets.svg/22px-Curly_Brackets.svg.png";
      buttonimage.alt = "Insert citation";
      button.classname = "tool tool-button";
      buttonimage.style.width = "22px";
      buttonimage.style.height = "17px";
      buttonimage.style.paddingTop = "5px";
      buttonimage.style.paddingLeft = "3px";
      button.appendChild(buttonimage)
      document.getElementById('wikiEditor-ui-toolbar').childNodes[0].childNodes[1].appendChild(button);
      //document.getElementById('reftoolbar-button').onclick = easyCiteMain;
      $j('#reftoolbar-button').live('click', function() { easyCiteMain(); });
    }
    if (navigator.userAgent.indexOf('MSIE') == -1) {
      citemain = document.createElement('div');
      citemain.style.display = 'none';
      citemain.setAttribute('Id', 'citeselect');
      citemain.appendChild( addOption("citeWeb()", "Cite web") );
      citemain.appendChild( addOption("citeBook()", "Cite book") );
      citemain.appendChild( addOption("citeJournal()", "Cite journal") );
      citemain.appendChild( addOption("citeNews()", "Cite news") );
      citemain.appendChild( addOption("citeNamedRef()", "Named ref") );
      citemain.appendChild( addOption("dispErrors()", "Error check") );
      citemain.appendChild( addOption("hideInitial()", "Cancel") );
      document.getElementById('wpTextbox1').parentNode.insertBefore(citemain, document.getElementById('wpTextbox1'));
    }
    else {
    selection = '<div id="citeselect" style="display:none"><input type="button" value="Cite web" onclick="citeWeb()" />'+
      '<input type="button" value="Cite book" onclick="citeBook()" />'+
      '<input type="button" value="Cite journal" onclick="citeJournal()" />'+
      '<input type="button" value="Cite news" onclick="citeNews()" />'+
      '<input type="button" value="Named ref" onclick="citeNamedRef()" />'+
      '<input type="button" value="Error check" onclick="dispErrors()" />'+
      '<input type="button" value="Cancel" onclick="hideInitial()" /></div>';
    document.getElementById('editform').innerHTML = selection + document.getElementById('editform').innerHTML;
    }
  }
}
 
function addOption(script, text) {
  option = document.createElement('input');
  option.setAttribute('type', 'button');
  option.setAttribute('onclick', script);
  option.setAttribute("value", text);
  return option;
}
 
function hideInitial() {
  document.getElementById('citeselect').style.display = 'none';
  oldFormHide();
}
 
function oldFormHide() {
  if (numforms != 0) {
    document.getElementById('citediv'+numforms).style.display = 'none';
  }
  if (document.getElementById('errorform') != null) {
    document.getElementById('citeselect').removeChild(document.getElementById('errorform'));
  }
} 
 
function easyCiteMain() {
  document.getElementById('citeselect').style.display = '';
}
 
var months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
var citeGlobalDateFormat = "<date> <monthname> <year>";
function getTime() {
  var datestr = '';
  if (typeof citeUserDateFormat != 'undefined') {
    datestr = citeUserDateFormat;
  } else {
    datestr = citeGlobalDateFormat;
  }
  var DT = new Date();
  var zmonth = '';
  var month = DT.getUTCMonth()+1;
  if (month < 10) {
    zmonth = "0"+month.toString();
  } else {
    zmonth = month.toString();
  }
  month = month.toString();
  var zdate = '';
  var date = DT.getUTCDate()
  if (date < 10) {
    zdate = "0"+date.toString();
  } else {
    zdate = date.toString();
  }
  date = date.toString()
  datestr = datestr.replace('<date>', date);
  datestr = datestr.replace('<month>', month);
  datestr = datestr.replace('<zdate>', zdate);
  datestr = datestr.replace('<zmonth>', zmonth);
  datestr = datestr.replace('<monthname>', months[DT.getUTCMonth()]);
  datestr = datestr.replace('<year>', DT.getUTCFullYear().toString());
  return (datestr);
}
 
function citeWeb() {
  citeNewsWeb("cite web");
}
function citeNews() {
  citeNewsWeb("cite news");
}
 
function citeNewsWeb(templatename) {
  oldFormHide();
  template = templatename;
  var legend;
  if (template == "cite web") {
    legend = "Cite web source";
  } else {
    legend = "Cite news source";
  }
  newtime = getTime();
  numforms++;
  form = '<div id="citediv'+numforms+'">'+
    '<fieldset><legend>'+legend+'</legend>'+
    '<table cellspacing="5">'+
    '<input type="hidden" value="'+template+'" id="template">'+
    '<tr><td width="120"><label for="url">&nbsp;URL: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="url"></td>'+
    '<td width="120"><label for="title">&nbsp;Title: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="title"></td></tr>'+
    '<tr><td width="120"><label for="last">&nbsp;Last name: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="last"></td>'+
    '<td width="120"><label for="first">&nbsp;First name: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="first"></td></tr>'+
    '<tr><td width="120"><label for="coauthors">&nbsp;Coauthors: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="coauthors"></td>'+
    '<td width="120"><label for="date">&nbsp;Publication date: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="date"></td></tr>'+
    '<tr><td width="120"><label for="work">&nbsp;Work: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="work"></td>'+
    '<td width="120"><label for="publisher">&nbsp;Publisher: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="publisher"></td></tr>'+
    '<tr><td width="120"><label for="pages">&nbsp;Pages: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="pages"></td>'+
    '<td width="120"><label for="language">&nbsp;Language: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="language"></td></tr>'+
    '<tr><td width="120"><label for="accessdate">&nbsp;Access date: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="accessdate" value="'+ newtime +'"></td>'+
    '<td width="120"><label for="location">&nbsp;Location: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="location"></td></tr>'+
    '<tr><td width="120"><label for="refname">&nbsp;Reference name: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="refname"></td></tr>'+
    '</table>'+
    '<input type="button" value="Add citation" onClick="addcites()">'+
 '</fieldset></div>';
   document.getElementById('citeselect').innerHTML += form;
}
 
function citeBook() {
  oldFormHide();
  template = "cite book";
  numforms++;
  form = '<div id="citediv'+numforms+'">'+
    '<fieldset><legend>Cite book source</legend>'+
    '<table cellspacing="5">'+
    '<input type="hidden" value="'+template+'" id="template">'+
    '<tr><td width="120"><label for="last">&nbsp;Last name: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="last"></td>'+
    '<td width="120"><label for="first">&nbsp;First name: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="first"></td></tr>'+
    '<tr><td width="120"><label for="coauthors">&nbsp;Coauthors: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="coauthors"></td>'+
    '<td width="120"><label for="others">&nbsp;Others: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="others"></td></tr>'+
    '<tr><td width="120"><label for="title">&nbsp;Title: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="title"></td>'+
    '<td width="120"><label for="editor">&nbsp;Editor: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="editor"></td></tr>'+
    '<tr><td width="120"><label for="publisher">&nbsp;Publisher: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="publisher"></td>'+
    '<td width="120"><label for="location">&nbsp;Location: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="location"></td></tr>'+
    '<tr><td width="120"><label for="date">&nbsp;Publication date: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="date"></td>'+
    '<td width="120"><label for="edition">&nbsp;Edition: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="edition"></td></tr>'+
    '<tr><td width="120"><label for="series">&nbsp;Series: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="series"></td>'+
    '<td width="120"><label for="volume">&nbsp;Volume: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="volume"></td></tr>'+
    '<tr><td width="120"><label for="pages">&nbsp;Pages: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="pages"></td>'+
    '<td width="120"><label for="chapter">&nbsp;Chapter: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="chapter"></td></tr>'+
    '<tr><td width="120"><label for="isbn">&nbsp;ISBN: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="isbn"></td>'+
    '<td width="120"><label for="oclc">&nbsp;OCLC: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="oclc"></td></tr>'+
    '<tr><td width="120"><label for="url">&nbsp;URL: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="url"></td>'+
    '<td width="120"><label for="accessdate">&nbsp;Access date: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="accessdate"></td></tr>'+
    '<tr><td width="120"><label for="language">&nbsp;Language: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="language"></td>'+
    '<td width="120"><label for="refname">&nbsp;Reference name: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="refname"></td></tr>'+
    '</table>'+
    '<input type="button" value="Add citation" onClick="addcites()">'+
 '</fieldset></div>';
   document.getElementById('citeselect').innerHTML += form;
}
 
function citeJournal() {
  oldFormHide();
  template = "cite journal";
  numforms++;
  form = '<div id="citediv'+numforms+'">'+
    '<fieldset><legend>Cite book source</legend>'+
    '<table cellspacing="5">'+
    '<input type="hidden" value="'+template+'" id="template">'+
    '<tr><td width="120"><label for="last">&nbsp;Last name: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="last"></td>'+
    '<td width="120"><label for="first">&nbsp;First name: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="first"></td></tr>'+
    '<tr><td width="120"><label for="coauthors">&nbsp;Coauthors: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="coauthors"></td>'+
    '<td width="120"><label for="date">&nbsp;Publication date: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="date"></td></tr>'+
    '<tr><td width="120"><label for="title">&nbsp;Title: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="title"></td>'+
    '<td width="120"><label for="journal">&nbsp;Journal: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="journal"></td></tr>'+
    '<tr><td width="120"><label for="publisher">&nbsp;Publisher: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="publisher"></td>'+
    '<td width="120"><label for="location">&nbsp;Location: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="location"></td></tr>'+
    '<tr><td width="120"><label for="volume">&nbsp;Volume: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="volume"></td>'+
    '<td width="120"><label for="issue">&nbsp;Issue: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="issue"></td></tr>'+
    '<tr><td width="120"><label for="pages">&nbsp;Pages: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="pages"></td>'+
    '<td width="120"><label for="issn">&nbsp;ISSN: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="issn"></td></tr>'+
    '<tr><td width="120"><label for="oclc">&nbsp;OCLC: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="oclc"></td>'+
    '<td width="120"><label for="language">&nbsp;Language: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="language"></td></tr>'+
    '<tr><td width="120"><label for="url">&nbsp;URL: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="url"></td>'+
    '<td width="120"><label for="accessdate">&nbsp;Access date: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="accessdate"></td></tr>'+
    '<tr><td width="120"><label for="refname">&nbsp;Reference name: </label></td>'+
      '<td width="400"><input type="text" tabindex=1 style="width:100%" id="refname"></td></tr>'+
    '</table>'+
    '<input type="button" value="Add citation" onClick="addcites()">'+
 '</fieldset></div>';
   document.getElementById('citeselect').innerHTML += form;
}
 
function addcites(template) {
  cites = document.getElementById('citediv'+numforms).getElementsByTagName('input');
  var citebegin = '<ref';
  var citename = '';
  var citeinner = '';
  for (var i=0; i<cites.length-1; i++) {
    if (cites[i].value != '' && cites[i].id != "refname" && cites[i].id != "template") {
      citeinner += "|" + cites[i].id + "=" + cites[i].value;
    }
    else if (cites[i].value != '' && cites[i].id == "refname" && cites[i].id != "template") {
      citebegin += ' name="' + cites[i].value + '"';
    }
    else if (cites[i].value != '' && cites[i].id != "refname" && cites[i].id == "template") {
      citename = '>{{' + cites[i].value;
    }
  }
  cite = citebegin + citename + citeinner + "}}</ref>";
  insertTags(cite, '', '');
  document.getElementById('citediv'+numforms).style.display = 'none';
}
 
function getNamedRefs(calls) {
  if (typeof(wikEdUseWikEd) != 'undefined') {
    if (wikEdUseWikEd == true) {
      WikEdUpdateTextarea();
    }
  }
  text = document.getElementById('wpTextbox1').value;
  var regex;
  if (calls) {
    regex = /< *?ref +?name *?= *?(('([^']*?)')|("([^"]*?)")|([^'"\s]*?[^\/]\b)) *?\/ *?>/gi //'
  } else {
    regex = /< *?ref +?name *?= *?(('([^']*?)')|("([^"]*?)")|([^'"\s]*?[^\/]\b)) *?>/gi //'
  }
  var namedrefs = new Array();
  var i=0;
  var nr=true;
  do {
    ref = regex.exec(text);
    if(ref != null){
      if (ref[5]) {
        namedrefs[i] = ref[5];
      } else if (ref[3]) {
        namedrefs[i] = ref[3];
      } else {
        namedrefs[i] = ref[6];
      }
      i++;
    } else {
      nr=false;
    }
  } while (nr==true);
  return namedrefs;
}
 
function citeNamedRef() {
  namedrefs = getNamedRefs(false);
  if (namedrefs == '') {
    oldFormHide();
    numforms++;
    out = '<div id="citediv'+numforms+'"><fieldset>'+
      '<legend>References in text</legend>There are no named refs (<tt>&lt;ref name="Name"&gt;</tt>) in the text</fieldset></div>';
    document.getElementById('citeselect').innerHTML += out;
  }
  else {
    oldFormHide();
    numforms++;
    form = '<div id="citediv'+numforms+'">'+
      '<fieldset><legend>References in article</legend>'+
      '<table cellspacing="5">'+
      '<tr><td><label for="namedrefs">&nbsp;Named references in text</label></td>'+
            '<td><select name="namedrefs" id="namedrefs">';
    for (var i=0;i<namedrefs.length;i++) {
      form+= '<option value="'+namedrefs[i]+'">'+namedrefs[i]+'</option>';
    }
    form+= '</select>'+
      '</td></tr></table>'+
      '<input type="button" value="Add citation" onClick="addnamedcite()">'+
      '</fieldset></div>';
     document.getElementById('citeselect').innerHTML += form;
  }
}
 
function addnamedcite() {
  name = document.getElementById('citediv'+numforms).getElementsByTagName('select')[0].value;
  ref = '<ref name="'+name+'" />';
  insertTags(ref, '', '');
  document.getElementById('citediv'+numforms).style.display = 'none';
}
 
function getAllRefs() {
  if (typeof(wikEdUseWikEd) != 'undefined') {
    if (wikEdUseWikEd == true) {
      WikEdUpdateTextarea();
    }
  }
  text = document.getElementById('wpTextbox1').value;
  regex = /< *?ref( +?name *?= *?(('([^']*?)')|("([^"]*?)")|([^'"\s]*?[^\/]\b)))? *?>((.|\n)*?)< *?\/? *?ref *?>/gim //"
  var allrefs = new Array();
  var i=0;
  var nr=true;
  do {
    ref = regex.exec(text);
    if(ref != null){
      if (ref[0].search(/[^\s]{150}/) != -1) {
        ref[0] = ref[0].replace(/\|([^\s])/g, "| $1");
      }
      ref[0] = ref[0].replace(/</g, "&lt;");
      ref[0] = ref[0].replace(/>/g, "&gt;");
      allrefs[i] = ref[0];
      i++;
    } else {
      nr=false;
    }
  } while (nr==true);
  return allrefs;
}
 
function NRcallError(namedrefs, refname) {
  for (var i=0; i<namedrefs.length; i++) {
    if (namedrefs[i] == refname) {
      return true;
    }
  }
  return false;
}
 
function errorCheck() {
  var allrefs = getAllRefs();
  var allrefscontent = new Array();
  var samecontentexclude = new Array();
  var sx=0;
  var templateexclude = new Array();
  var tx=0;
  var skipcheck = false;
  var namedrefcalls = getNamedRefs(true);
  for (var i=0; i<allrefs.length; i++) {
    allrefscontent[i] = allrefs[i].replace(/&lt; *?ref( +?name *?= *?(('([^']*?)')|("([^"]*?)")|([^'"\s]*?[^\/]\b)))? *?&gt;((.|\n)*?)&lt; *?\/? *?ref *?&gt;/gim, "$8");  //"
  }
  var namedrefs = getNamedRefs(false);
  var errorlist = new Array();
  var q=0;
  unclosed = document.getElementById('unclosed').checked;
  samecontent = document.getElementById('samecontent').checked;
  templates = document.getElementById('templates').checked;
  repeated = document.getElementById('repeated').checked;
  undef = document.getElementById('undef').checked;
  for (var i=0; i<allrefs.length; i++) {
    if (allrefs[i].search(/&lt; *?\/ *?ref *?&gt;/) == -1 && unclosed) {
      errorlist[q] = '<tr><td width="75%"><tt>'+allrefs[i]+'</tt></td>';
      errorlist[q] += '<td width="25%">Unclosed <tt>&lt;ref&gt;</tt> tag</td></tr>';
      q++;
    }
    if (samecontent) {
      for (var d=0; d<samecontentexclude.length; d++) {
        if (allrefscontent[i] == samecontentexclude[d]) {
          skipcheck = true;
        }
      }
      var p=0;
      while (p<allrefs.length && !skipcheck) {
        if (allrefscontent[i] == allrefscontent[p] && i != p) {
          errorlist[q] = '<tr><td width="75%"><tt>'+allrefscontent[i]+'</tt></td>';
          errorlist[q] += '<td width="25%">Multiple refs contain this content, a <a href="//en.wikipedia.org/wiki/Wikipedia:Footnotes#Naming_a_ref_tag_so_it_can_be_used_more_than_once">named reference</a> should be used instead</td></tr>';
          q++;
          samecontentexclude[sx] = allrefscontent[i]
          sx++;
          break;
        }
        p++;
      }
     skipcheck=false;
    }
    if (templates) {
      if (allrefscontent[i].search(/\{\{cite/i) == -1 && allrefscontent[i].search(/\{\{citation/i) == -1 && allrefscontent[i].search(/\{\{Comic (book|strip) reference/i) == -1 && allrefscontent[i].search(/\{\{Editorial cartoon reference/i) == -1 && allrefscontent[i].search(/\{\{harv/i) == -1) {
        for (var x=0; x<templateexclude.length; x++) {
          if (allrefscontent[i] == templateexclude[x]) {
            skipcheck = true;
          }
        }
        if (!skipcheck) {
          errorlist[q] = '<tr><td width="75%"><tt>'+allrefs[i]+'</tt></td>';
          errorlist[q] += '<td width="25%">Does not use a <a href="//en.wikipedia.org/wiki/Wikipedia:Citation_templates">citation template</a></td></tr>';
          q++;
          templateexclude[tx] = allrefscontent[i];
          tx++;
        }
        skipcheck = false;
      }
    }
  }
  if (repeated) {
    var repeatnameexclude = new Array();
    var rx=0;
    for (var k=0; k<namedrefs.length; k++) {
      for (var d=0; d<repeatnameexclude.length; d++) {
        if (namedrefs[k] == repeatnameexclude[d]) {
          skipcheck = true;
        }
      }
      var z=0;
      while (z<namedrefs.length && !skipcheck) {
        if (namedrefs[k] == namedrefs[z] && k != z) {
          errorlist[q] = '<tr><td width="75%"><tt>'+namedrefs[k]+'</tt></td>';
          errorlist[q] += '<td width="25%">Multiple references are given the same <a href="//en.wikipedia.org/wiki/Wikipedia:Footnotes#Naming_a_ref_tag_so_it_can_be_used_more_than_once">name</a></td></tr>';
          q++;
          repeatnameexclude[rx] = namedrefs[z];
          rx++;
          break;
        }
        z++;
      }
     skipcheck = false;
    }
  }
  if (undef) {
    var undefexclude = new Array();
    var ux=0;
    for (var p=0; p<namedrefcalls.length; p++) {
      for (var d=0; d<undefexclude.length; d++) {
        if (allrefscontent[i] == undefexclude[d]) {
          skipcheck = true;
        }
      }
      if (!skipcheck) {
        if (!NRcallError(namedrefs, namedrefcalls[p])) {
          errorlist[q] = '<tr><td width="75%"><tt>'+namedrefcalls[p]+'</tt></td>';
          errorlist[q] += '<td width="25%">A <a href="//en.wikipedia.org/wiki/Wikipedia:Footnotes#Naming_a_ref_tag_so_it_can_be_used_more_than_once">named reference</a> is used but not defined</td></tr>';
          q++;
          undefexclude[ux] = namedrefs[p];
          ux++;
        }
      }
      skipcheck = false;
    }
 }
  if (q > 0) {
    return errorlist;
  } else {
    return 0;
  }
}
 
function dispErrors() {
  oldFormHide();
  form = '<div id="errorform"><fieldset>'+
    '<legend>Error checking</legend>'+
    '<b>Check for:</b><br/>'+
    '<input type="checkbox" id="unclosed" /> Unclosed <tt>&lt;ref&gt;</tt> tags<br/>'+
    '<input type="checkbox" id="samecontent" /> References with the same content<br/>'+
    '<input type="checkbox" id="templates" /> References not using a <a href="//en.wikipedia.org/wiki/Wikipedia:Citation_templates">citation template</a><br/>'+
    '<input type="checkbox" id="repeated" /> Multiple references with the same name<br/>'+
    '<input type="checkbox" id="undef" /> Usage of undefined named references<br/>'+
    '<input type="button" id="errorchecksubmit" value="Check for selected errors" onclick="doErrorCheck()"/>'+
    '</fieldset></div>';
  document.getElementById('citeselect').innerHTML += form;
}
 
function doErrorCheck() {
  var errors = errorCheck();
  document.getElementById('citeselect').removeChild(document.getElementById('errorform'));
  if (errors == 0) {
    if (numforms != 0) {
      document.getElementById('citediv'+numforms).style.display = 'none';
    }
    numforms++;
    out = '<div id="citediv'+numforms+'"><fieldset>'+
      '<legend>Error checking</legend>No errors found.</fieldset></div>';
    document.getElementById('citeselect').innerHTML += out;
  }
  else {
    if (numforms != 0) {
      document.getElementById('citediv'+numforms).style.display = 'none';
    }
    numforms++;
    form = '<div id="citediv'+numforms+'">'+
      '<fieldset><legend>Error checking</legend>'+
      '<table border="1px">';
    for (var i=0; i<errors.length; i++) {
      form+=errors[i];
    }
    form+= '</table>'+
      '</fieldset></div>';
     document.getElementById('citeselect').innerHTML += form;
  }
}
 
$( refbuttons );