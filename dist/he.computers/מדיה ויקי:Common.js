/* ערכו קובץ זה כדי להריץ סקריפטים ב־JavaScript באתר כולו. ערכו את [[מדיה ויקי:Monobook.js]] לסקריפטים שיופעלו ברקע מונובוק בלבד. */

/* פונקציה הטוענת פונקציות בעת עליית הדף */
function addLoadEvent(event)
{
    if (window.addEventListener) /* דפדפן שאינו אינטרנט אקספלורר */
    {
        window.addEventListener("load", event, false);
    }
    else if (window.attachEvent) /* אינטרנט אקספלורר */
    {
        window.attachEvent("onload", event);
    }
}

/** JSconfig *****
  * You can override these default in your [[Special:Mypage/monobook.js]]
  * templatesList gets the following parameter:
  * 'toolbar' : adds the list to the toolbar (default).
  * 'bottom'  : adds the list to the bottom of the page, next to the summary.
  * false     : doesn't add the list at all.
  */
var JSconfig =
{
  templatesList: 'toolbar'
}

/* הרחבת שורת הלחצנים מעל לתיבת העריכה */
if (mwCustomEditButtons) /* רק אם המערך קיים, כלומר – אם זה דף עריכה */
{
    function addEditButton(imageFile, tagOpen, sampleText, tagClose, speedTip)
    {
        mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/he/" + imageFile,
        "tagOpen": tagOpen,
        "sampleText": sampleText,
        "tagClose": tagClose,
        "speedTip": speedTip
        };
    }
    
    addEditButton("c/c9/Button_strike.png", "<s>", "טקסט המסומן כמחוק", "</s>", "טקסט מחוק");
    addEditButton("e/ea/Button_align_left.png", '<div style="direction: ltr;">\n', "טקסט מיושר לשמאל", "\n</div>", "יישור טקסט לשמאל");
    addEditButton("5/5f/Button_center.png", '<div style="text-align: center;">\n', "טקסט ממורכז", "\n</div>", "מירכוז טקסט");
    addEditButton("1/13/Button_enter.png", "<br />", "", "", "ירידת שורה");
    addEditButton("8/80/Button_upper_letter.png", "<sup>", "כתב עילי", "</sup>", "כתב עילי");
    addEditButton("7/70/Button_lower_letter.png", "<sub>", "כתב תחתי", "</sub>", "כתב תחתי");
    addEditButton("5/58/Button_small.png", "<small>", "כתב מוקטן", "</small>", "כתב מוקטן");
    addEditButton("3/34/Button_hide_comment.png", "<!-- ", "הערה מוסתרת", " -->", "הערה מוסתרת");
    addEditButton("1/12/Button_gallery.png", "<gallery>\n", "תמונה:PictureFileName.jpg|כיתוב תמונה\nתמונה:PictureFileName.jpg|כיתוב תמונה", "\n</gallery>", "יצירת גלריית תמונות");
    addEditButton("e/e9/Button_headline2.png", "=== ", "כותרת משנית", " ===", "יצירת כותרת ברמה 3");
    addEditButton("8/8e/Button_shifting.png", ":", "", "", "הזחה לשמאל");
    //addEditButton("2/23/Button_code.png", '<source lang="text">\n', "טקסט", "\n<\/source>\n", "עיצוב קוד");
    addEditButton("1/1e/Button_font_color.png", '<span style="color: ColorName;">', "טקסט צבוע", "</span>", "טקסט עם צבע");
    addEditButton("9/93/Button_sub_link.png", "[[", "שם דף#שם כותרת|שם תצוגה", "]]", "קישור לכותרת בדף");
    addEditButton("d/d3/Button_definition_list.png", "\n; ", "פריט", " : ", "רשימת הגדרות");
    addEditButton("a/ac/Button_ref.PNG", "<ref>", "הזן הערת שוליים כאן", "</ref>", "הערת שוליים");
  
}

/* הוספת כפתור טבלה, המעלה כלי ליצירת טבלאות */
/* גרסה 0.1, נלקח מוויקיפדיה בצרפתית, נכתב במקור על־ידי Dake */
function generateTableau(nbCol, nbRow, border, styleHeader, styleLine)
{
        var code = "\n";
        if (styleHeader==1) {
                code += '{| class=\"wikitable\" border=\"' + border + '\"\n';
        } else {
                code += '{| border=\"' + border + '\"\n';
                code += '|+ כותרת הטבלה\n';
        }
        
        for (var i=0;i<nbCol;i++) code += '! כותרת ' + i + '\n'
        
        for (var j=0;j<nbRow;j++) {
                if ((j+1)%2==0 && styleLine==1) {
                        code += '|- bgcolor=\"#EFEFEF\"\n'
                } else {                
                        code += '|-\n'
                }
                
                for (var i=0;i<nbCol;i++) code += '| תא\n';
        }
        
        code += '|}';
        insertTags('','', code); 
}

function popupTableau()
{
  var popup = window.open('','name','height=240,width=250');
  
  javaCode =  '<script type=\"text\/javascript\">function insertCode(){';
  javaCode += 'var row = parseInt(document.paramForm.inputRow.value); '
  javaCode += 'var col = parseInt(document.paramForm.inputCol.value); '
  javaCode += 'var bord = parseInt(document.paramForm.inputBorder.value); '
  javaCode += 'var styleHeader = document.paramForm.inputHeader.checked; '
  javaCode += 'var styleLine = document.paramForm.inputLine.checked; '
  javaCode += 'window.opener.generateTableau(col,row,bord,styleHeader,styleLine); '
  javaCode += '}<\/script>';
  
  popup.document.write('<html dir=\"rtl\"><head><title>פרמטרים לטבלה</title>');
  popup.document.write('<style type=\"text\/css\" media=\"screen,projection\">/*<![CDATA[*/ @import \"\/skins\/monobook\/main.css?20070716083000\";@import \"\/wiki\/מדיה_ויקי:monobook.css\"; /*]]>*/<\/style>');
  popup.document.write(javaCode); 
  popup.document.write('</head><body>');
  popup.document.write('<p>אנא הזן/י פרמטרים לטבלה : </p>');
  popup.document.write('<form name=\"paramForm\">');
  popup.document.write('מספר שורות : <input type=\"text\" name=\"inputRow\" maxlength=\"3\" value=\"3\" style=\"width:50px;\"><p>');
  popup.document.write('מספר עמודות : <input type=\"text\" name=\"inputCol\" maxlength=\"3\" value=\"3\" style=\"width:50px;\"><p>');
  popup.document.write('רוחב מסגרת : <input type=\"text\" name=\"inputBorder\" maxlength=\"2\" value=\"1\" style=\"width:50px;\"><p>');
  popup.document.write('טבלה מעוצבת : <input type=\"checkbox\" name=\"inputHeader\" checked=\"1\" ><p>');
  popup.document.write('שורות אפורות לסירוגין: <input type=\"checkbox\" name=\"inputLine\" checked=\"1\" ><p>');
  popup.document.write('</form">');
  popup.document.write('<p><a href=\"javascript:insertCode();self.close();\"> הוספת הקוד לחלון העריכה</a></p>');
  popup.document.write('<p><a href=\"javascript:self.close()\"> סגירה</a></p>');
  popup.document.write('</body></html>');
  popup.document.close();
}

/* הוספת כפתור טבלאות לסרגל הכלים */
function tableButton()
{
 tooly = document.getElementById('toolbar');
 if (tooly != null)
{
  /* הגדרת כפתור עם כלי להוספת טבלאות. */
  var tableButton=document.createElement("img");
  tableButton.width = 23;
  tableButton.height = 22;
  tableButton.src = "http://upload.wikimedia.org/wikipedia/he/6/60/Button_insert_table.png";
  tableButton.border = 0;
  tableButton.alt = "הוספת טבלה";
  tableButton.title = "הוספת טבלה";
  tableButton.style.cursor = "pointer";
  tableButton.onclick = popupTableau;
  tooly.appendChild(tableButton);
}
}

//************************************
// פונקציה להוספת רשימת תבניות בסרגל הכלים
// נכתב על ידי [[משתמש:Yonidebest]] ו[[משתמש:ערן]]
//
function createOptionElement(selectEl, text) {
 oOption = document.createElement("option");
 selectEl.options.add(oOption);
 oOption.innerHTML = text;
 oOption.title = text;
 return selectEl;
}

function templatesList() {
 if (!JSconfig.templatesList) return; // user doesn't want the template list
 if (!mwCustomEditButtons) return; // not edit page
 var toolbar = document.getElementById('toolbar');
 if (!toolbar && JSconfig.templatesList == 'toolbar') return; // no toolbar

 tmpSelect = document.createElement('select');
 tmpSelect.id = 'templatesList';
 tmpSelect.onchange = function(){insertTemplate(this.selectedIndex);this.selectedIndex=0;return false;}

 // array to define options titles
 var tempTitles=new Array('בחרו תבנית כדי להוסיף', 'קטגוריה', 'פירוש נוסף', 'בעבודה', 'לקריאה נוספת','קישורים חיצוניים', 'ראו גם', 'דף הפניה', 'פירושונים','הפניה להערת שוליים', 'כותרת הערת שוליים', 'הפרת זכויות יוצרים', 'הבהרת חשיבות', 'ערך בבדיקה', 'הוספת ציטוט');
//create options
for(var i=0;i<15;i++) tmpSelect = createOptionElement(tmpSelect, tempTitles[i]);

 // add list to the end of tool
 if (JSconfig.templatesList == 'toolbar') // add to toolbar
   toolbar.appendChild(tmpSelect);
 else { // add to the bottom of the page
   var tmpltTable = document.getElementById('edit-templates').getElementsByTagName('table');
   if (tmpltTable[0]) {
     var nTr = document.createElement('tr');
     var nTd1 = document.createElement('td');
     nTd1.appendChild(document.createTextNode('תבנית:'));
     nTr.appendChild(nTd1);
     var nTd2 = document.createElement('td');
     nTd2.appendChild(tmpSelect);
     nTr.appendChild(nTd2);
     tmpltTable[0].appendChild(nTr);
   }
 }
}

function insertTemplate(index) {
 var templates = new Array;
 var bracketA = "{" + "{";
 var bracketB = "}" + "}";

 templates[0] = "\n[[קטגוריה:";
 templates[1] = "שם הקטגוריה";
 templates[2] = "]]";

 templates[3] = bracketA + "פירוש נוסף|";
 templates[4] = "נוכחי=|אחר=|ראו=";
 templates[5] = bracketB;

 templates[6] = "\n";
 templates[7] = bracketA + "בעבודה" + bracketB;
 templates[8] = "\n";

 templates[9] = "\n== לקריאה נוספת ==\n";
 templates[10] = "* שם סופר, '''שם ספר''', שם הוצאה, תאריך הוצאה.\n";
 templates[11] = "";

 templates[12] = "\n== קישורים חיצוניים ==\n";
 templates[13] = "* שם כותב, [Address תיאור המאמר], שם האתר\n";
 templates[14] = "";

 templates[15] = "\n== ראו גם ==\n";
 templates[16] = "* [[שם ערך]]\n";
 templates[17] = "";

 templates[18] = "#הפניה [[";
 templates[19] = "שם הערך המופנה";
 templates[20] = "]]";

 templates[21] = "\n" + bracketA + "פירושונים|" + "\n";
 templates[22] = "* [[ערך 1]] - הסבר קצר על מהותו של ערך 1\n* [[ערך 2]] - הסבר קצר על מהותו של ערך 2";
 templates[23] = "\n" + bracketB;

 templates[24] = "<ref name=\"ref-name\" />";
 templates[25] = "";
 templates[26] = "";

 templates[27] = "\n== הערות שוליים ==";
 templates[28] = "\n<references />";
 templates[29] = "";

 templates[30] = "\n" + bracketA + "הפרת זכויות יוצרים|מקור=";
 templates[31] = " המקור שממנו הועתק התוכן ";
 templates[32] = "|זמן=" + bracketA + "ס:יום נוכחי" + bracketB + "/" + bracketA + "ס:חודש נוכחי" + bracketB + "/" + bracketA + "ס:שנה נוכחית" + bracketB + "(~~" + "~~" + "~)" + bracketB + "\n";

 templates[33] = bracketA + "ס:הבהרת חשיבות"+ bracketB;
 templates[34] = "";
 templates[35] = "";

 templates[36] = bracketA + "בבדיקה";
 templates[37] = "";
 templates[38] = "|זמן=" + bracketA + "ס:יום נוכחי" + bracketB+ "/" + bracketA + "ס:חודש נוכחי" + bracketB+ "/" + bracketA + "ס:שנה נוכחית" + bracketB+ "(~~" + "~~" + "~)" + bracketB;

 templates[39] = bracketA + "ציטוט|מרכאות=כן|תוכן=";
 templates[40] = "הזינו ציטוט כאן";
 templates[41] = bracketB;

 if (index > 0)
   insertTags(templates[index * 3 - 3], templates[index * 3 - 1], templates[index * 3 - 2]);
}

/* פונקציה להוספת כוכב בקישורי בינויקי לערכים מומלצים */
function featuredInterwiki() 
{
   // iterate over all <span>-elements
   var a;
   for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      // if found a FA span
      if(a.className == "FA") {
         // iterate over all <li>-elements
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            // if found a FA link
            if(b.className == "interwiki-" + a.id) {
               b.className += " FA";
               b.title = "ערך מומלץ";
            }
         }
      }
   }
}

 // ============================================================
 // BEGIN Dynamic Navigation Bars (experimantal)
 
 // set up the words in your language
 var NavigationBarHide = '[הסתר]';
 var NavigationBarShow = '[הראה]';
 
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
        return;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.nodeName.toLowerCase() == "div") {
                if (NavChild.className == 'NavPic') {
                    NavChild.style.display = 'none';
                }
                if (NavChild.className == 'NavContent') {
                    NavChild.style.display = 'none';
                }
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
    var NavFrame;
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
              if (NavFrame.childNodes[j].nodeName.toLowerCase() == "div" && NavFrame.childNodes[j].className == "NavHead") {
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
 
 // END Dynamic Navigation Bars
 // ============================================================

/* פונקציה לבחירת כל הגרסאות בדף השחזורים כברירת מחדל */
function selectAllunDel()
{
/* בצע רק אם בדף יש טופס שחזור */
 var undeleteForm = document.getElementById('undelete');
 if (undeleteForm == null) return;
           var unDelAll=document.createElement('input');
           unDelAll.value='סימון כל הגרסאות';
           unDelAll.type='button';
           unDelAll.onclick=function(){
               for(var j=0; a = document.getElementsByTagName("input")[j]; j++) {
                   if(a.type=="checkbox") a.checked=true;
               }
           };
           undeleteForm.elements["restore"].parentNode.appendChild(unDelAll);
}

/* הסתרת הכותרת בעמוד הראשי; מבוסס על ויקי האנגלית. + הסתרת המילים "שונה לאחרונה" בתחתית העמוד. */
var mpTitle = "עמוד ראשי";
var isMainPage = (document.title.substr(0, document.title.lastIndexOf(" - ")) == mpTitle);
var isDiff = (document.location.search && (document.location.search.indexOf("diff=") != -1 || document.location.search.indexOf("oldid=") != -1));

if (isMainPage && !isDiff) 
{
 document.write('<style type="text/css">/*<![CDATA[*/ #siteSub, #contentSub, h1.firstHeading { display: none !important; } /*]]>*/</style>');
 addOnloadHook( mainPageFixLastModified );
}

function mainPageFixLastModified() {
    document.getElementById("Lastmodified").innerHTML = "דף זה מעודכן אוטומטית מדי יום.";
}

/* החלפת הלשונית ערך בלשונית "עמוד ראשי". לקוח מוויקיפדיה האנגלית. */
function mainPageRenameNamespaceTab() {
    try {
        var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
        if ( Node.textContent ) {      // Per DOM Level 3
            Node.textContent = 'עמוד ראשי';
        } else if ( Node.innerText ) { // IE doesn't handle .textContent
            Node.innerText = 'עמוד ראשי';
        } else {                       // Fallback
            Node.replaceChild( Node.firstChild, document.createTextNode( 'עמוד ראשי' ) ); 
        }
    } catch(e) {
        // bailing out!
    }
}
if ( wgTitle == 'עמוד ראשי' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
       addOnloadHook( mainPageRenameNamespaceTab );
}

/* פונקציה שמשמשת לאיפשור ניקוד ב[[מדיה ויקי:edittools]] */
function nikud(){
 if (mwCustomEditButtons){
  for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
  if(a.className == "nikud") {
   a.onclick=function(){insertTags('', this.title, '');return false;};
   }
  }
 }
}


//============================================================
//
// תווים מיוחדים
//
//============================================================

/**
 * סקריפט מוויקיפדיה הצרפתית להוסף רשימת תווים מיוחדים
 * הערה הסדר ברשימה להלן צריך להיות בהתאם למדיה ויקי:Edittools !
 */
function addCharSubsetMenu() {
  if (wgNamespaceNumber==3) return;
  var specialchars = document.getElementById('specialcharsMenu');
  if (specialchars) {
    var menu = "<select style=\"float:left\" onChange=\"chooseCharSubset(selectedIndex)\">";
    menu += "<option>תווים מיוחדים</option>";
    menu += "<option>מתמטיקה</option>";
    menu += "<option>IPA</option>";
    menu += "<option>לטינית</option>";
    menu += "<option>יוונית</option>";
    menu += "<option>קירילית</option>";
    menu += "<option>גרמנית</option>";
    menu += "<option>ערבית</option>";
    menu += "<option>קטלנית</option>";
    menu += "<option>קרואטית</option>";
    menu += "<option>ספרדית</option>";
    menu += "<option>אספרנטו</option>";
    menu += "<option>אסטונית</option>";
    menu += "<option>ולשית</option>";
    menu += "<option>הירוגליפי</option>";
    menu += "<option>הולנדית</option>";
    menu += "<option>הונגרית</option>";
    menu += "<option>אירית</option>";
    menu += "<option>איסלנדית</option>";
    menu += "<option>איטלקית</option>";
    menu += "<option>לטבית</option>";
    menu += "<option>ליטאית</option>";
    menu += "<option>מלטזית</option>";
    menu += "<option>פולנית</option>";
    menu += "<option>פורטוגזית</option>";
    menu += "<option>רומנית</option>";
    menu += "<option>סקנדינבית</option>";
    menu += "<option>סרבית</option>";
    menu += "<option>צ'כית</option>";
    menu += "<option>טורקית</option>";
    menu += "<option>אנגלית עתיקה</option>";
    menu += "<option>וייטנאמית</option>";
    menu += "</select>";
    specialchars.innerHTML = menu + specialchars.innerHTML;

    /* default subset - try to use a cookie some day */
    // chooseCharSubset(0);
  }
}

/* select subsection of special characters */
function chooseCharSubset(s) {
  var l = document.getElementById('specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
}


/* "Technical restrictions" title fix - Taken from en:MediaWiki:Common.js */

// For pages that have something like Template:Lowercase, replace the title, but only if it is cut-and-pasteable as a valid wikilink.
//      (for instance iPod's title is updated.  But [[C#]] is not an equivalent wikilink, so [[C Sharp]] doesn't have its main title changed)
//
// The function looks for a banner like this: 
 // <div id="RealTitleBanner">    <!-- div that gets hidden -->
 //   <span id="RealTitle">title</span>
 // </div>
 // An element with id=DisableRealTitle disables the function.
var disableRealTitle = 0;               // users can disable this by making this true from their monobook.js
addOnloadHook(function() {
        try {
                var realTitleBanner = document.getElementById("RealTitleBanner");
                if (realTitleBanner && !document.getElementById("DisableRealTitle") && !disableRealTitle) {
                        var realTitle = document.getElementById("RealTitle");
                        if (realTitle) {
                                var realTitleHTML = realTitle.innerHTML;
                                /* אם הכותרת לא כוללת אותיות בעברית ואם realTitleHTML מכיל dir, אז שנה את הכיווניות של הכותרת לשמאל->ימין */
                                if (realTitleHTML=='dir' && !document.getElementsByTagName('h1')[0].innerHTML.match(/[א-ת]/) && document.getElementsByTagName('h1')[0].className=='firstHeading'){
                                document.getElementsByTagName('h1')[0].innerHTML='<span dir=\"ltr\">'+document.getElementsByTagName('h1')[0].innerHTML+'</span>';
realTitleBanner.style.display = "none";
return;
                                }
                                realTitleText = pickUpText(realTitle);

                                var isPasteable = 0;
                                //var containsHTML = /</.test(realTitleHTML);        // contains ANY HTML
                                var containsTooMuchHTML = /</.test( realTitleHTML.replace(/<\/?(sub|sup|small|big)>/gi, "") ); // contains HTML that will be ignored when cut-n-pasted as a wikilink
                                // calculate whether the title is pasteable
                                var verifyTitle = realTitleText.replace(/^ +/, "");             // trim left spaces
                                verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);       // uppercase first character

                                // if the namespace prefix is there, remove it on our verification copy.  If it isn't there, add it to the original realValue copy.
                                if (wgNamespaceNumber != 0) {
                                        if (wgCanonicalNamespace == verifyTitle.substr(0, wgCanonicalNamespace.length).replace(/ /g, "_") && verifyTitle.charAt(wgCanonicalNamespace.length) == ":") {
                                                verifyTitle = verifyTitle.substr(wgCanonicalNamespace.length + 1);
                                        } else {
                                                realTitleText = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleText;
                                                realTitleHTML = wgCanonicalNamespace.replace(/_/g, " ") + ":" + realTitleHTML;
                                        }
                                }

                                // verify whether wgTitle matches
                                verifyTitle = verifyTitle.replace(/^ +/, "").replace(/ +$/, "");                // trim left and right spaces
                                verifyTitle = verifyTitle.replace(/_/g, " ");           // underscores to spaces
                                verifyTitle = verifyTitle.charAt(0).toUpperCase() + verifyTitle.substring(1, verifyTitle.length);       // uppercase first character
                                isPasteable = (verifyTitle == wgTitle);

                                var h1 = document.getElementsByTagName("h1")[0];
                                if (h1 && isPasteable) {
                                        h1.innerHTML = containsTooMuchHTML ? realTitleText : realTitleHTML;
                                        if (!containsTooMuchHTML)
                                                realTitleBanner.style.display = "none";
                                }
                                document.title = realTitleText + " - ויקימחשבים";
                        }
                }
        } catch (e) {
                /* Something went wrong. */
        }
});


// similar to innerHTML, but only returns the text portions of the insides, excludes HTML
function pickUpText(aParentElement) {
  var str = "";

  function pickUpTextInternal(aElement) {
    var child = aElement.firstChild;
    while (child) {
      if (child.nodeType == 1)          // ELEMENT_NODE 
        pickUpTextInternal(child);
      else if (child.nodeType == 3)     // TEXT_NODE
        str += child.nodeValue;

      child = child.nextSibling;
    }
  }

  pickUpTextInternal(aParentElement);

  return str;
}

/* קישור ישיר לדף שהפך להפניה בדף אישור ההעברה */
function EncodedMoveLink()
{
 encodedLinkID = document.getElementById('encodedlink');
 if (encodedLinkID != null) {
 encodedLinkID.innerHTML = '(<a href="http://he.wikipedia.org/w/index.php?title=' + encodedLinkID.innerHTML + '&redirect=no" class="internal">קישור קבוע</a>)';
 encodedLinkID.style.display = "inline";
 }
}

/* לא מאפשר לאנונימיים לשמור את הדף לפני לחיצה על תצוגה מקדימה */

function noSaving() {
  if (wgUserName == null && mwCustomEditButtons) {
    saveButton = document.getElementById('wpSave');
    if (saveButton != null) {
      saveButton.disabled = true;
      if(document.getElementById('wpPreview')!=null) document.getElementById('wpPreview').value = 'הראה תצוגה מקדימה (חובה)';
    }
  }
}
 
 /** MediaWiki media player *******************************************************
   *
   *  Description: A Java player for in-browser playback of media files.
   *  Created by: [[:commons:User:Gmaxwell]]
   */

 document.write('<script type="text/javascript" src="' 
             + 'http://he.wikipedia.org/w/index.php?title=Mediawiki:Wikimediaplayer.js' 
             + '&action=raw&ctype=text/javascript&dontcountme=s"></script>');

/*
 * fix numbered lists in firefox
 *
 * written by Dekel [dekelb(at)(no-spam)gmail.com]
 */
function fixOl()
{
        if(clientPC.indexOf('firefox/') == -1) {
                return;
        }
        var olList = document.getElementsByTagName('ol');
        for(var i = 0; i < olList.length; ++i) {
                var d = document.createElement('div');
                d.setAttribute('style', 'margin-left: 2em; display: table;');
                var o = document.createElement('ol');
                o.innerHTML = olList[i].innerHTML;
                var attr;
                for ( var j = 0; j < olList[i].attributes.length; j++ ) {
                        attr = olList[i].attributes[j];
                        o.setAttribute( attr.nodeName, attr.nodeValue );
                }
                olList[i].parentNode.insertBefore(d, olList[i]);
                olList[i].parentNode.removeChild(olList[i]);
                d.appendChild(o);
        }
}


/* A helper function to add a button to one of the toolbars in the interface.  
 
Took it from [[:en:User:Omegatron/monobook.js/addlink.js]] */
 
function addLink(where, url, name, id, title, key, after){
    var na = document.createElement('a');
    na.href = url;
    na.appendChild(document.createTextNode(name));
    var li = document.createElement('li');
    if(id) li.id = id;
    li.appendChild(na);
    var tabs = document.getElementById(where).getElementsByTagName('ul')[0];
    if(after) {
        tabs.insertBefore(li,document.getElementById(after));
    } else {
        tabs.appendChild(li);
    }
    if(id) {
        if(key && title) { ta[id] = [key, title]; }
        else if(key) { ta[id] = [key, '']; }
        else if(title) { ta[id] = ['', title];} 
    }
    // re-render the title and accesskeys from existing code in wikibits.js
    akeytt();
    return li;
}

// From [[en:User:Lupin/autoedit.js]]
// Retrieve parameter value from the address bar link
//
function getParamValue(paramName) {
 var cmdRe=RegExp('[&?]'+paramName+'=([^&]*)');
 var h=document.location;
 var m=cmdRe.exec(h);
 if (m) {
   try {
     return decodeURIComponent(m[1]);
   } catch (someError) {}
 }
 return null;
}

/* סקריפט זמני לתקופת סקר הקוראים שגורם לקישור הסקר להיפתח בחלון חדש */
function popupsforanons(){
if(!document.getElementById('siteNotice')) return;
if(!document.getElementById('siteNotice').getElementsByTagName('a')[0]) return;
document.getElementById('siteNotice').getElementsByTagName('a')[0].target='_blank';
}

addLoadEvent(popupsforanons);

/* הגדרת הפונקציות לטעינה */
addLoadEvent(tableButton);
addLoadEvent(templatesList);
addLoadEvent(EncodedMoveLink);
addLoadEvent(noSaving);
addOnloadHook(selectAllunDel);
addOnloadHook(featuredInterwiki);
addOnloadHook(createNavigationBarToggleButton);
addOnloadHook(addCharSubsetMenu);
addLoadEvent(nikud);
addOnloadHook(fixOl);