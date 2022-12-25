/* 0. Nawigacja */
// ============================================================
 // BEGIN Dynamic Navigation Bars (experimantal)
 // pochodzi z http://en.wikipedia.org/wiki/MediaWiki:Monobook.js
 // autorzy: http://en.wikipedia.org/w/index.php?title=MediaWiki:Monobook.js&action=history
 // licencja: GFDL
 // set up the words in your language
 var NavigationBarHide = '[ukryj]';
 var NavigationBarShow = '[pokaż]';
 
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
 
 addOnloadHook(function(){createNavigationBarToggleButton();});
 
 // END Dynamic Navigation Bars
 // ============================================================

//Dodatkowe przyciski
//Copyright by Gudys 23 June 2008

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",  //ścieżka do obrazka (pełna ścieżka)22x22px
        "speedTip": "Przekierowanie",    //tekst który się wyświetli gdy najedziemy na przycisk myszką
        "tagOpen": "#REDIRECT[[",        //znacznik rozpoczynający
        "tagClose": "]]",      //znacznik kończący
        "sampleText": "Tytuł strony"   ////tekst pomiędzy znacznikami (domyślnie zaznaczony)
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",  
        "speedTip": "Tekst przekreślony",    
        "tagOpen": "<del>",
        "tagClose": "</del>",
        "sampleText": "Tekst przekreślony"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
        "speedTip": "Złamanie linii",    
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
        "speedTip": "Indeks górny",
        "tagOpen": "<sup>",
        "tagClose": "</sup>",
        "sampleText": "Indeks górny"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
        "speedTip": "Indeks dolny",
        "tagOpen": "<sub>",
        "tagClose": "</sub>",
        "sampleText": "Indeks dolny"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
        "speedTip": "Mały tekst",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Mały tekst"
}; 
   mwCustomEditButtons[mwCustomEditButtons.length] = {

     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
     "speedTip": "Wstaw galerię grafiki",
     "tagOpen": "<gallery>\n",
     "tagClose": "\n</gallery>",
     "sampleText": "Grafika:Przykład.jpg|Podpis1\nGrafika:Przykład.jpg|Podpis2"};

mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
        "speedTip": "Długi cytat",
        "tagOpen": "<blockquote>",
        "tagClose": "</blockquote>",
        "sampleText": "Tutaj wstaw długi cytat"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
        "speedTip": "Przypis",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Tutaj wstaw treść przypisu"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/2a/Button_category_plus.png",
        "speedTip": "Wstaw kategorię",
        "tagOpen": "[[Kategoria:",
        "tagClose": "]]",
        "sampleText": "Nazwa kategorii"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
        "speedTip": "Wstaw szablon",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Nazwa szablonu"
};
mwCustomEditButtons.push(button);

var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
        "speedTip": "Wstaw tabelę",
        "tagOpen": '{| class="wikitable"\n|-\n',
        "tagClose": "\n|}",
        "sampleText": '! nagłówek 1\n! nagłówek 2\n! nagłówek 3\n|-\n| wiersz 1, komórka 1\n| wiersz 1, komórka 2\n| wiersz 1, komórka 3\n|-\n| wiersz 2, komórka 1\n| wiersz 2, komórka 2\n| wiersz 2, komórka 3',
};

mwCustomEditButtons.push(button);

/*
  Funkcje sortowania w tabelkach
*/
function ts_parseFloat(num) {
        if (!num) return 0;
        num = parseFloat(num.replace(/,/g, ".").replace(/[\xa0]/g, ""));
        return (isNaN(num) ? 0 : num);
}
 
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
        if (itm.match(/^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/))
                sortfn = ts_sort_date;
        if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/))
                sortfn = ts_sort_date;
        if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d$/))
                sortfn = ts_sort_date;
        if (itm.match(/^[\u00a3$\u20ac]/)) // pound dollar euro
                sortfn = ts_sort_currency;
        if (itm.match(/^[\d.,\xa0]+\%?$/))
                sortfn = ts_sort_numeric;
 
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
                        arrowHTML = '<img src="'+ ts_image_path + ts_image_down + '" alt="↓"/>';
                        newRows.reverse();
                        span.setAttribute('sortdir','up');
        } else {
                        arrowHTML = '<img src="'+ ts_image_path + ts_image_up + '" alt="↑"/>';
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
                spans[i].innerHTML = '<img src="'+ ts_image_path + ts_image_none + '" alt="↓"/>';
        }
        span.innerHTML = arrowHTML;
 
        ts_alternate(table);            
}
// zakoszone z [[en:User:Mr.Z-man/refToolbar.js]]
 
var numforms = 0;
var wikEdAutoUpdateUrl;
function refbuttons() {
  if (mwCustomEditButtons && document.getElementById('toolbar')/* && wikEdAutoUpdateUrl == null*/) {
    button = document.createElement('a');
    button.href = "javascript:easyCiteMain()";
    button.title = "Wstaw szablon cytowania";
    buttonimage = document.createElement('img');
    buttonimage.src = "http://upload.wikimedia.org/wikipedia/commons/b/bf/Button_easy_cite_pl.png";
    buttonimage.alt = "Wstaw szablon przypisu";
    button.appendChild(buttonimage);
    document.getElementById('toolbar').appendChild(button);
    if (navigator.userAgent.indexOf('MSIE') == -1) {
      citemain = document.createElement('div');
      citemain.style.display = 'none';
      citemain.setAttribute('Id', 'citeselect');
      citemain.appendChild( addOption("citeWeb()", "Strona WWW") );
      citemain.appendChild( addOption("citeBook()", "Książka") );
      citemain.appendChild( addOption("citeJournal()", "Pismo") );
      citemain.appendChild( addOption("citeNamedRef()", "Istniejące przypisy") );
      citemain.appendChild( addOption("dispErrors()", "Sprawdzenie błędów") );
      citemain.appendChild( addOption("hideInitial()", "Anuluj") );
      document.getElementById('wpTextbox1').parentNode.insertBefore(citemain, document.getElementById('wpTextbox1'));
    }
    else {
    selection = '<div id="citeselect" style="display:none"><input type="button" value="Strona WWW" onclick="citeWeb()" />'+
      '<input type="button" value="Książka" onclick="citeBook()" />'+
      '<input type="button" value="Pismo" onclick="citeJournal()" />'+
      '<input type="button" value="Istniejące przypisy" onclick="citeNamedRef()" />'+
      '<input type="button" value="Sprawdzenie błędów" onclick="dispErrors()" />'+
      '<input type="button" value="Anuluj" onclick="hideInitial()" /></div>';
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
 
function getTime() {
  var time = new Date();
  var nowdate = time.getUTCDate();
  if (nowdate<10) { nowdate = "0"+ nowdate.toString(); }
  var nowmonth = time.getUTCMonth()+1;
  if (nowmonth<10) { nowmonth = "0"+ nowmonth.toString(); }
  var nowyear = time.getUTCFullYear();
  newtime =  nowyear + '-' + nowmonth + '-' + nowdate;
  return (newtime);
}
 
function citeWeb() {
  oldFormHide();
  template = "cytuj stronę";
  var legend = "Cytowanie strony internetowej";
  newtime = getTime();
  numforms++;
  form = '<div id="citediv'+numforms+'">'+
    '<fieldset><legend>'+legend+'</legend>'+
    '<table cellspacing="5">'+
    '<input type="hidden" value="'+template+'" id="template">'+
    '<tr><td width="120"><label for="url">&nbsp;URL: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="url"></td>'+
    '<td width="120"><label for="tytuł">&nbsp;Tytuł: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="tytuł"></td></tr>'+
    '<tr><td width="120"><label for="nazwisko">&nbsp;Nazwisko: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="nazwisko"></td>'+
    '<td width="120"><label for="imię">&nbsp;Imię: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="imię"></td></tr>'+
    '<tr><td width="120"><label for="nazwisko2">&nbsp;Nazwisko&nbsp;2.&nbsp;autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="nazwisko2"></td>'+
    '<td width="120"><label for="imię2">&nbsp;Imię 2. autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="imię2"></td></tr>'+
    '<tr><td width="120"><label for="autor">&nbsp;Autor: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="autor"></td></tr>'+
    '<td width="120"><label for="data">&nbsp;Data publikacji: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="data"></td></tr>'+
    '<tr><td width="120"><label for="work">&nbsp;Praca: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="praca"></td>'+
    '<td width="120"><label for="opublikowany">&nbsp;Wydawca: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="opublikowany"></td></tr>'+
    '<tr><td width="120"><label for="strony">&nbsp;Strony: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="strony"></td>'+
    '<td width="120"><label for="język">&nbsp;Język: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="język"></td></tr>'+
    '<tr><td width="120"><label for="data dostępu">&nbsp;Data dostępu: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="data dostępu" value="'+ newtime +'"></td>'+
    '<td width="120"><label for="refname">&nbsp;Nazwa przypisu: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="refname"></td></tr>'+
    '</table>'+
    '<input type="button" value="Dodaj przypis" onClick="addcites()">'+
 '</fieldset></div>';
   document.getElementById('citeselect').innerHTML += form;
}
 
function citeBook() {
  oldFormHide();
  template = "cytuj książkę";
  numforms++;
  form = '<div id="citediv'+numforms+'">'+
    '<fieldset><legend>Cytowanie wydawnictw zwartych (książek)</legend>'+
    '<table cellspacing="5">'+
    '<input type="hidden" value="'+template+'" id="template">'+
    '<tr><td width="120"><label for="nazwisko">&nbsp;Nazwisko: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="nazwisko"></td>'+
    '<td width="120"><label for="imię">&nbsp;Imię: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="imię"></td></tr>'+
    '<tr><td width="120"><label for="autor">&nbsp;Autor: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="autor"></td></tr>'+
    '<tr><td width="120"><label for="tytuł">&nbsp;Tytuł: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="tytuł"></td>'+
    '<tr><td width="120"><label for="wydawca">&nbsp;Wydawnictwo: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="wydawca"></td>'+
    '<td width="120"><label for="miejsce">&nbsp;Miejsce wydania: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="miejsce"></td></tr>'+
    '<tr><td width="120"><label for="data">&nbsp;Data publikacji: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="data"></td>'+
    '<td width="120"><label for="seria">&nbsp;Tytuł serii: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="seria"></td></tr>'+
    '<tr><td width="120"><label for="strony">&nbsp;Strony: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="strony"></td>'+
    '<tr><td width="120"><label for="isbn">&nbsp;ISBN: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="isbn"></td>'+
    '<td width="120"><label for="refname">&nbsp;Nazwa przypisu: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="refname"></td></tr>'+
    '</table>'+
	'<table cellspacing="5" class="collapsible collapsed noprint" style="background: transparent; width: 100%; border: 1px solid #dddddd;" cellspacing="0" cellpadding="0">'+
	'<tr><th colspan="4">Dodatkowe pola</th></tr>'+
	'<tr><td width="120"><label for="nazwisko2">&nbsp;Nazwisko&nbsp;2.&nbsp;autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="nazwisko2"></td>'+
    '<td width="120"><label for="imię2">&nbsp;Imię 2. autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="imię2"></td></tr>'+
	'<tr><td width="120"><label for="nazwisko2">&nbsp;Nazwisko&nbsp;3.&nbsp;autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="nazwisko3"></td>'+
    '<td width="120"><label for="imię2">&nbsp;Imię 3. autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="imię3"></td></tr>'+
	'<tr><td width="120"><label for="nazwisko2">&nbsp;Nazwisko&nbsp;4.&nbsp;autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="nazwisko4"></td>'+
    '<td width="120"><label for="imię2">&nbsp;Imię 4. autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="imię4"></td></tr>'+
	'<tr><td width="120"><label for="nazwisko2">&nbsp;Nazwisko&nbsp;5.&nbsp;autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="nazwisko5"></td>'+
    '<td width="120"><label for="imię2">&nbsp;Imię 5. autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="imię5"></td></tr>'+
    '<tr><td width="120"><label for="inni">&nbsp;Inni: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="inni"></td></tr>'+
    '<tr><td width="120"><label for="tom">&nbsp;Numer tomu: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="tom"></td>'+
    '<td width="120"><label for="tytuł tomu">&nbsp;Tytuł tomu: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="tytuł tomu"></td></tr>'+
    '<tr><td width="120"><label for="rozdział">&nbsp;Tytuł rozdziału: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="rozdział"></td></tr>'+
    '<tr><td width="120"><label for="imię r">&nbsp;Imię autora rozdziału: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="imię r"></td>'+
    '<td width="120"><label for="nazwisko r">&nbsp;Nazwisko autora rozdziału: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="nazwisko r"></td></tr>'+
    '<tr><td width="120"><label for="url">&nbsp;DOI: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="doi"></td>'+
    '<td width="120"><label for="data dostępu">&nbsp;Data dostępu: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="data dostępu"></td></tr>'+
    '<tr><td width="120"><label for="url">&nbsp;URL: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="url"></td>'+
    '<td width="120"><label for="oclc">&nbsp;OCLC: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="oclc"></td></tr>'+
	'</table>'+
    '<input type="button" value="Dodaj przypis" onClick="addcites()">'+
	'</fieldset></div>';
   document.getElementById('citeselect').innerHTML += form;
   createCollapseButtons();
}
 
function citeJournal() {
  oldFormHide();
  template = "cytuj pismo";
  numforms++;
  form = '<div id="citediv'+numforms+'">'+
    '<fieldset><legend>Cytowanie czasopisma, pracy naukowej, itp.</legend>'+
    '<table cellspacing="5">'+
    '<input type="hidden" value="'+template+'" id="template">'+
    '<tr><td width="120"><label for="nazwisko">&nbsp;Nazwisko: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="nazwisko"></td>'+
    '<td width="120"><label for="imię">&nbsp;Imię: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="imię"></td></tr>'+
    '<tr><td width="120"><label for="nazwisko2">&nbsp;Nazwisko&nbsp;2.&nbsp;autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="nazwisko2"></td>'+
    '<td width="120"><label for="imię2">&nbsp;Imię 2. autora: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="imię2"></td></tr>'+
    '<tr><td width="120"><label for="autor">&nbsp;Autor: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="autor"></td></tr>'+
    '<tr><td width="120"><label for="tytuł">&nbsp;Tytuł: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="tytuł"></td>'+
    '<td width="120"><label for="czasopismo">&nbsp;Czasopismo: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="czasopismo"></td></tr>'+
    '<tr><td width="120"><label for="wydawca">&nbsp;Wydawca: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="wydawca"></td>'+
    '<td width="120"><label for="odpowiedzialność">&nbsp;Odpowiedzialność: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="odpowiedzialność"></td></tr>'+
    '<tr><td width="120"><label for="wydanie">&nbsp;Wydanie: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="wydanie"></td>'+
    '<td width="120"><label for="numer">&nbsp;Numer: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="numer"></td></tr>'+
    '<tr><td width="120"><label for="strony">&nbsp;Strony: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="strony"></td>'+
    '<td width="120"><label for="issn">&nbsp;ISSN: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="issn"></td></tr>'+
    '<tr><td width="120"><label for="oclc">&nbsp;OCLC: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="oclc"></td>'+
    '<td width="120"><label for="język">&nbsp;Język: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="język"></td></tr>'+
    '<tr><td width="120"><label for="data">&nbsp;Data publikacji: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="data"></td>'+
    '<td width="120"><label for="url">&nbsp;URL: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="url"></td>'+
    '<tr><td width="120"><label for="url">&nbsp;DOI: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="doi"></td>'+
    '<td width="120"><label for="refname">&nbsp;Nazwa przypisu: </label></td>'+
              '<td width="400"><input type="text" style="width:100%" id="refname"></td></tr>'+
    '</table>'+
    '<input type="button" value="Dodaj przypis" onClick="addcites()">'+
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
      '<legend>Przypisy z artykułu</legend>Nie znaleziono żadnych przypisów z przypisanymi nazwami (<tt>&lt;ref name="nazwa"&gt;</tt>)</fieldset></div>';
    document.getElementById('citeselect').innerHTML += out;
  }
  else {
    oldFormHide();
    numforms++;
    form = '<div id="citediv'+numforms+'">'+
      '<fieldset><legend>Przypisy z artykułu</legend>'+
      '<table cellspacing="5">'+
      '<tr><td><label for="namedrefs">&nbsp;Nazwane przypisy</label></td>'+
            '<td><select name="namedrefs" id="namedrefs">';
    for (var i=0;i<namedrefs.length;i++) {
      form+= '<option value="'+namedrefs[i]+'">'+namedrefs[i]+'</option>';
    }
    form+= '</select>'+
      '</td></tr></table>'+
      '<input type="button" value="Dodaj przypis" onClick="addnamedcite()">'+
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
      errorlist[q] += '<td width="25%">Niedomknięty tag <tt>&lt;ref&gt;</tt></td></tr>';
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
          errorlist[q] += '<td width="25%">Wiele przypisów posiada tę zawartość. Do tego przypisu powinna zostać przypisana <a href="http://pl.wikipedia.org/wiki/Pomoc:Przypisy#Wielokrotne_u.C5.BCycie_jednego_odno.C5.9Bnika">nazwa</a>.</td></tr>';
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
      if (allrefscontent[i].search(/\{\{cytuj/i) == -1 && allrefscontent[i].search(/\{\{cite/i) == -1) {
        for (var x=0; x<templateexclude.length; x++) {
          if (allrefscontent[i] == templateexclude[x]) {
            skipcheck = true;
          }
        }
        if (!skipcheck) {
          errorlist[q] = '<tr><td width="75%"><tt>'+allrefs[i]+'</tt></td>';
          errorlist[q] += '<td width="25%">Przypis nie wykorzystuje szablonów cytowania</td></tr>';
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
          errorlist[q] += '<td width="25%">Kilka różnych przypisów posiada <a href="http://pl.wikipedia.org/wiki/Pomoc:Przypisy#Wielokrotne_u.C5.BCycie_jednego_odno.C5.9Bnika">tę samą nazwę</a>.</td></tr>';
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
          errorlist[q] += '<td width="25%">Użyty przypis nie został wcześniej <a href="http://pl.wikipedia.org/wiki/Pomoc:Przypisy#Wielokrotne_u.C5.BCycie_jednego_odno.C5.9Bnika">zdefiniowany</a>.</td></tr>';
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
    '<legend>Sprawdzanie błędów</legend>'+
    '<b>Sprawdź:</b><br/>'+
    '<input type="checkbox" id="unclosed" checked="checked" /> Niedomknięte tagi <tt>&lt;ref&gt;</tt><br/>'+
    '<input type="checkbox" id="samecontent" checked="checked" /> Przypisy z tymi samymi danymi<br/>'+
    '<input type="checkbox" id="templates" checked="checked" /> Przypisy niewykorzystujące szablonów cytowania<br/>'+
    '<input type="checkbox" id="repeated" checked="checked" /> Powtórzone przypisy o tej samej nazwie<br/>'+
    '<input type="checkbox" id="undef" checked="checked" /> Użycie nazwanych przypisów bez treści/definicji<br/>'+
    '<input type="button" id="errorchecksubmit" value="Sprawdzenie pod kątem wybranych błędów" onclick="doErrorCheck()"/>'+
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
      '<legend>Sprawdzanie błędów</legend>Nie znaleziono żadnych błędów.</fieldset></div>';
    document.getElementById('citeselect').innerHTML += out;
  }
  else {
    if (numforms != 0) {
      document.getElementById('citediv'+numforms).style.display = 'none';
    }
    numforms++;
    form = '<div id="citediv'+numforms+'">'+
      '<fieldset><legend>Sprawdzanie błędów</legend>'+
      '<table border="1px">';
    for (var i=0; i<errors.length; i++) {
      form+=errors[i];
    }
    form+= '</table>'+
      '</fieldset></div>';
     document.getElementById('citeselect').innerHTML += form;
  }
}
 
hookEvent("load", refbuttons);