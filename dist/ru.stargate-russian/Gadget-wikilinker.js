// Russian Wiki Linker
// Find link for selected text

if (/edit|submit/.test(wgAction)){
  mwCustomEditButtons['wikilinker'] = [WikiLinker, 'commons/b/bd/Wikilinker.png', 'Вики-ссыльщик. Подбирает вики-ссылку для выделенного слова или словосочетания']
  importScript('MediaWiki:Stemmer.js')
}

function stemPhrase(phrase) {
   phrase=phrase.substr(0,100);

   phrase=phrase.replace(/\s/g, " ");
   phrase=phrase.replace(/—/g, " ");
   phrase=phrase.replace(/»/g, "");
   phrase=phrase.replace(/«/g, "");
   phrase=phrase.replace(/\%/g, "");
   phrase=phrase.replace(/\'/g, "");
   phrase=phrase.replace(/\"/g, "");
   phrase=phrase.replace(/_/g, " ");
   phrase=phrase.replace(/\!/g, " ");
   phrase=phrase.replace(/\?/g, " ");
   phrase=phrase.replace(/\./g, " ");
   phrase=phrase.replace(/\,/g, " ");
   phrase=phrase.replace(/\:/g, " ");
   phrase=phrase.replace(/\s+/g, " ");

   var rustemmer = new RussianStemmer();

   var arr = phrase.split(' ')
   var res = '';
   var next_res = '';

   var n = 0;

   for (var i in arr) {
      rustemmer.setCurrent(arr[i]);
      rustemmer.stem();
      next_res = rustemmer.getCurrent();
      if (next_res.length > 0) {
        if (next_res != arr[i] && n < 3) {
           res += next_res + '* ';
           n++; // в строке запроса может быть не более 3 звёздочек
        }
        else {
           res += next_res + ' ';
        }
      }
   }

   // trim string
   res = res.replace(/(^\s+)|(\s+$)/g, "");

   return res;
}

function WikiLinker() {

    var xmlhttp;
    var prepWin;

    var CantWork = 'Сначала нужно выделить слово или словосочетание';
    var range;
    var browserType = 0;

    var requestLength = 0; // длина запроса в словах

    var txt = '';
    var wpTextbox1 = document.editform.wpTextbox1;

    var winScroll = document.documentElement.scrollTop;

    wpTextbox1.focus();

    if (typeof wpTextbox1.selectionStart != 'undefined' && (navigator.productSub > 20031000 || is_safari || is_opera)) { //Mozilla/Opera/Safari3
        browserType = 1;

        var textScroll = wpTextbox1.scrollTop;
        var startPos = wpTextbox1.selectionStart;
        var endPos = wpTextbox1.selectionEnd;
        txt = wpTextbox1.value.substring(startPos, endPos);

        // отсекаем последний пробел
        if (txt.slice(-1) == ' ') {
           txt = txt.slice(0,-1);
           endPos = endPos - 1;
        }

        if (txt == '') {
            alert(CantWork);
        }
        else {
            processText();
        }
        wpTextbox1.selectionStart = startPos;
        wpTextbox1.selectionEnd = startPos + txt.length;
        wpTextbox1.scrollTop = textScroll;
    } else if (document.selection && document.selection.createRange) { //IE
        browserType = 2;

        range = document.selection.createRange();
        txt = range.text;

        // отсекаем последний пробел
        if (txt.slice(-1) == ' ') {
           txt = txt.slice(0,-1);
           range.moveEnd('character', -1);
        }

        if (txt == '') {
            alert(CantWork);
        }
        else {
            processText();
        }
    } else { // other browsers
        alert(CantWork);
    }

    document.documentElement.scrollTop = winScroll // scroll back, for IE/Opera

    function processText() {
        var preparedText = stemPhrase(txt);

        requestLength = preparedText.split(' ').length;

        loadXMLDoc(wgServer + wgScriptPath + '/api.php?action=query&list=search&srlimit=5&srprop=&srredirects=1&format=json&srsearch=' + preparedText);
    }

    function loadXMLDoc(url) {
        xmlhttp = GetXmlHttpObject();
        if (xmlhttp == null) {
            alert("Your browser does not support XMLHTTP!");
            return;
        }
        xmlhttp.onreadystatechange = stateChanged;
        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
    }

    function GetXmlHttpObject() {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            return new XMLHttpRequest();
        }
        if (window.ActiveXObject) {
            // code for IE6, IE5
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
        return null;
    }

    // сравнение по длине строки, без учёта уточнения в скобках
    // чтобы для "Категори*" выдавалось "Категория (значения)", а не "Классификация"
    function compareStringLengths (a, b) {
      a = a.replace(/ \(.*\)/g, "");
      b = b.replace(/ \(.*\)/g, "");

      if ( a.length < b.length ) return -1;
      if ( a.length > b.length ) return 1;
      return 0;
    }

    function initialLower(str) {
       return str.substr(0, 1).toLowerCase() + str.substr(1);
    }

    function stateChanged() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var resp = eval('(' + xmlhttp.responseText + ')');
                
                if (typeof resp.query.search[0] != 'undefined') {

                   var page_name = resp.query.search[0].title;

                   // если в запросе было только одно слово, то выбираем самое короткое название из первых трёх результатов
                   // чтобы для "Аглией" выдавалось "Англия", а не "Англиканство"

                   if (requestLength == 1) {
                      var resar = [];
                   
                      for (var j=0;j<=4;j++) {
                         if (typeof resp.query.search[j] != 'undefined' && txt.substr(0,3).toLowerCase() == resp.query.search[j].title.substr(0,3).toLowerCase() ) {
                            resar.push(resp.query.search[j].title);
                         }
                      }
                   
                      resar.sort(compareStringLengths);
                   
                      if (typeof resar[0] != 'undefined') {
                         page_name = resar[0]
                      }
                   }

                   // для "форумы" будет "[[форум]]ы", а не "[[форум|форумы]]"
                   if ( initialLower(txt.substr(0, page_name.length)) == initialLower(page_name)  &&  page_name.length <= txt.length) {
                      txt = '[[' + txt.substr(0, page_name.length) + ']]' + txt.substr(page_name.length, txt.length - page_name.length) ;
                   }
                   else {
                      txt = '[[' + page_name + '|' + txt + ']]'; 
                   }
                }
                else {
                   txt = '[[' + '|' + txt + ']]';
                }

               if (browserType == 1) { //Mozilla/Opera/Safari3
                   wpTextbox1.value = wpTextbox1.value.substring(0, startPos) + txt + wpTextbox1.value.substring(endPos);

                   wpTextbox1.selectionStart = startPos;
                   wpTextbox1.selectionEnd = startPos + txt.length;
                   wpTextbox1.scrollTop = textScroll;
               } else if (browserType == 2) { //IE
                    range.text = txt;

               } else { // other browsers
                   alert(CantWork);
               }

            }
        }
    }
}