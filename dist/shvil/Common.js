/* כל סקריפט JavaScript שנכתב כאן ירוץ עבור כל המשתמשים בכל טעינת עמוד */
<!--הועתק מויקיפדיה העברית ,התורמים היו: Rotemliss, Yonidebest, ערן,                    -->
/* <div style="direction: ltr;"><pre> */
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

/* הרחבת שורת הלחצנים מעל לתיבת העריכה */
if (mwCustomEditButtons) /* רק אם המערך קיים, כלומר – אם זה דף עריכה */
{
    function addEditButton(imageFile, tagOpen, sampleText, tagClose, speedTip)
    {
        mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://images.wikia.com/shvil/images/" + imageFile,
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
/*addEditButton("8/80/Button_upper_letter.png", "<sup>", "כתב עילי", "</sup>", "כתב עילי");*/
    addEditButton("7/70/Button_lower_letter.png", "<sub>", "כתב תחתי", "</sub>", "כתב תחתי");
    addEditButton("5/58/Button_small.png", "<small>", "הקטנת כתב", "</small>", "הקטנת כתב");
 addEditButton("5/56/Button_big.png", "<big>", "הגדלת כתב", "</big>", "הגדלת כתב");
    addEditButton("3/34/Button_hide_comment.png", "<!-- ", "הערה מוסתרת", " -->", "הערה מוסתרת");
    addEditButton("1/12/Button_gallery.png", "<gallery>\n", "תמונה:PictureFileName.jpg|כיתוב תמונה\nתמונה:PictureFileName.jpg|כיתוב תמונה", "\n</gallery>", "יצירת גלריית תמונות");
    addEditButton("e/e9/Button_headline2.png", "=== ", "כותרת משנית", " ===", "יצירת כותרת ברמה 3");
    addEditButton("8/8e/Button_shifting.png", ":", "", "", "הזחה לשמאל");
    addEditButton("f/fd/Button_blockquote.png", '<blockquote style="border: 1px solid blue; padding: 2em;">\n', "ציטוט", "\n</blockquote>", "חלונית ציטוט");
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
  
  popup.document.write('<html><head><title>פרמטרים לטבלה</title>');
  popup.document.write('<style type=\"text\/css\" media=\"screen,projection\">/*<![CDATA[*/ @import \"\/skins-1.5\/monobook\/main.css?5\";@import \"/skins-1.5/monobook/rtl.css\"; /*]]>*/<\/style>');
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
/* אם בדף יש טופס שחזור */
 var undeleteForm = document.getElementById('undelete');
 if (undeleteForm != null) {
/* סמן את כל תיבות הסימון */
  for(var i=0; a = document.getElementsByTagName("input")[i]; i++) {
   if(a.type=="checkbox") a.checked=true;
  }
 }
}
/* הסתרת הכותרת בעמוד הראשי; מבוסס על ויקיפדיה האנגלית */
if ( wgTitle == "עמוד ראשי" && wgNamespaceNumber == 0 && wgAction == "view" && !getParamValue("diff") && !getParamValue("oldid") ) {
    document.write('<style type="text/css">/*<![CDATA[*/ #siteSub, #contentSub, h1.firstHeading { display: none !important; } /*]]>*/</style>');
}
 
/* החלפת הלשונית ערך בלשונית "עמוד ראשי" בהתבסס על ויקיפדיה האנגלית, ותיקון תאריך השינוי האחרון */
function mainPageChanges() {
    if ( wgTitle == "עמוד ראשי" && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
        document.getElementById( 'ca-nstab-main' ).firstChild.innerHTML = "עמוד ראשי";
        if( wgNamespaceNumber == 0 && document.getElementById("Lastmodified") ) {
            document.getElementById("Lastmodified").innerHTML = "דף זה מעודכן אוטומטית מדי יום.";
        }
    }
}
 
addOnloadHook( mainPageChanges );
/* פונקציה שמשמשת לאיפשור ניקוד ב[[מדיה ויקי:edittools]] */
function nikud(){
 if (document.getElementById('edit-templates')!=null){
  for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
  if(a.className == "nikud") {
   a.onclick=function(){insertTags('', this.title, '');return false;};
   }
  }
 }
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

 // =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
 // התאמה אישית של רשימת הרישיונות בדף העלאת קובץ

function showLicenseAlert(licenseAlert)
{
 licenseAlertField = document.getElementById('uploadAlertData');

 switch (licenseAlert) {
                  case "שימוש הוגן ומקור":
        licenseAlertField.innerHTML = '<b>תזכורת</b>: בשדה התיאור יש להחליף את הכיתוב "שם-הערך-בו-מותר-השימוש" בשם הערך שבגינו העלאתם את התמונה, ואת הכיתוב "מקור-התמונה" באתר האינטרנט ממנה נלקחה התמונה.';
        document.getElementById('uploadAlert').style.display = "block";
        break;
 }
} 

function showLicenseInfo(licenseName)
{
 licenseViewOriginal = document.getElementById('wpUploadDescription');
 if (licenseViewOriginal != null && licenseName != "disabled") {
   licenseViewOriginal.focus();
   var licenseView = '== רישיון ==\n{{';
   var usrName = wgUserName;
   switch (licenseName) {
            case "ייחוס ורישיון זהה עצמי":
          licenseView += 'cc-by-sa-3.0}}\nנוצר על ידי [[משתמש:' + usrName + ']]';
          break;
         case "self GFDL":
          licenseView += 'GFDL}}\nנוצר על ידי [[משתמש:' + usrName + ']]';
        break;
         case "GFDL":
          licenseView += 'GFDL}}';
     break;
         case "רשות ציבור":
          licenseView += 'שימוש חופשי|' + usrName + '}}';
    break;
         case "ייחוס ורישיון זהה":
          licenseView += 'cc-by-sa-3.0}}';
     break;
         case "ייחוס":
          licenseView += 'cc-by-3.0}}';
      break;
         case "ייחוס בלבד":
          licenseView += 'ייחוס|שם משתמש=' + usrName + '}}';
    break;
         case "אין":
          licenseView = '== רישיון ==\n{{ס:תמונה חשודה|אין לי מידע בקשר למצב זכויות היוצרים ולרישיון הקובץ.}}';
          break;
         case "infobox":
          if (licenseViewOriginal.value=="") {
           var doubletilda = '{' + '{';
           licenseView = doubletilda + 'מידע|\n|תיאור=\n|מקור=\n||יוצר=\n|אישורים=\n}}';
          }
          else licenseView = "";
          licenseViewOriginal.rows = 20;
          break;
   }

   if (licenseViewOriginal.value == "") {
     licenseViewOriginal.value = licenseView;
   } else {
   licenseViewOriginal.value = licenseViewOriginal.value + '\n' + licenseView;
   }
 }
}

function licenseListViewer()
{
 licenseListOriginal = document.getElementById('wpLicense');
 if (licenseListOriginal != null) {
   licenseListOriginal.onchange = function(){showLicenseInfo(licenseListOriginal[licenseListOriginal.selectedIndex].title);licenseListOriginal.selectedIndex=0;return false;}

   // remove all old options
   while (licenseListOriginal.options.length != 0) {
        licenseListOriginal.options[0] = null;
   }
   
   // fair use page
   if (wgUserLanguage == 'fairuse') {
     // create custom options
     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "";
     oOption.title = "disabled";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "אין לי מידע בקשר לרישיון";
     oOption.title = "אין";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "אין לי מידע בקשר לרישיון";
     oOption.title = "אין";
   } else { // normal upload page
     // create custom options
     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "";
     oOption.title = "disabled";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "אין לי מידע בקשר לרישיון";
     oOption.title = "אין";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "------- אני יצרתי... -------";
     oOption.title = "disabled";
     oOption.disabled = "disabled";
     oOption.style.color = "red";

    
     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "ואני דורש ייחוס ליוצר כולל הפצת נגזרות תחת רישיון זהה (CC-BY-SA-3.0)";
     oOption.title = "ייחוס ורישיון זהה עצמי";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "ואני דורש ייחוס ליוצר (דו־רישיוני: GFDL ו־CC-BY-3.0)";
     oOption.title = "מולטי ייחוס";
oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "ואני דורש ייחוס ליוצר בלבד";
     oOption.title = "ייחוס בלבד";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "ואני מפיץ אותו תחת GFDL";
     oOption.title = "self GFDL";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "ואני משחרר אותו לרשות הציבור";
     oOption.title = "רשות ציבור";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "------- לא אני יצרתי, אבל יוצר התמונה מרשה הפצה תחת: -------";
     oOption.title = "disabled";
     oOption.disabled = "disabled";
     oOption.style.color = "red";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "GFDL";
     oOption.title = "GFDL";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "ייחוס ליוצר, הפצת נגזרות תחת רישיון זהה (CC-BY-SA-3.0)";
     oOption.title = "ייחוס ורישיון זהה";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "ייחוס ליוצר (CC-BY-3.0)";
     oOption.title = "ייחוס";

     oOption = document.createElement("OPTION");
     licenseListOriginal.options.add(oOption);
     oOption.innerHTML = "אין לי מידע בקשר לרישיון";
     oOption.title = "אין";
   }
 
   //add the מידע template to description box
   showLicenseInfo("infobox");
 }
}

 // סוף התאמה אישית של רשימת הרישיונות בדף העלאת קובץ
 // =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*


/**** move edit sections- taken from [http://de.wikipedia.org/wiki/MediaWiki:Monobook.js] ****/
function moveEditsection() {
    if (typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false) {
        var spans = document.getElementsByTagName("span");
        for(var i = 0; i < spans.length; i++) {
            if(spans[i].className == "editsection") {
                spans[i].style.fontSize = "x-small";
                spans[i].style.fontWeight = "normal";
                spans[i].style.cssFloat = "none";
                spans[i].style.marginRight = "0px";
                spans[i].parentNode.appendChild(document.createTextNode(" "));
                spans[i].parentNode.appendChild(spans[i]);
            }
        }
    }
}
// onload
addOnloadHook(moveEditsection);

/* הגדרת הפונקציות לטעינה */
addLoadEvent(tableButton);
addLoadEvent(EncodedMoveLink);
addLoadEvent(licenseListViewer);
addOnloadHook(selectAllunDel);
addOnloadHook(featuredInterwiki);
addOnloadHook(createNavigationBarToggleButton);
addOnloadHook(addCharSubsetMenu);
addLoadEvent(nikud);
/* </div></pre> */