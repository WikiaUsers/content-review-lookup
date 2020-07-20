/* <div style="direction: ltr;"><pre> */
/* ערכו קובץ זה כדי להריץ סקריפטים ב־JavaScript באתר כולו. ערכו את [[מדיה ויקי:Monobook.js]] לסקריפטים שיופעלו ברקע מונובוק בלבד. */

/* הרחבת שורת הלחצנים מעל לתיבת העריכה */
if (mwCustomEditButtons) /* רק אם המערך קיים, כלומר – אם זה דף עריכה */
{
    function addEditButton(imageFile, tagOpen, sampleText, tagClose, speedTip)
    {
        mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://" + imageFile,
        "tagOpen": tagOpen,
        "sampleText": sampleText,
        "tagClose": tagClose,
        "speedTip": speedTip
        };
    }
    
    addEditButton("upload.wikimedia.org/wikipedia/he/c/c9/Button_strike.png", "<s>", "טקסט המסומן כמחוק", "</s>", "טקסט מחוק");
    addEditButton("upload.wikimedia.org/wikipedia/he/e/ea/Button_align_left.png", '<div style="direction: ltr;">\n', "טקסט מיושר לשמאל", "\n</div>", "יישור טקסט לשמאל");
    addEditButton("upload.wikimedia.org/wikipedia/he/5/5f/Button_center.png", '<div style="text-align: center;">\n', "טקסט ממורכז", "\n</div>", "מירכוז טקסט");
    addEditButton("upload.wikimedia.org/wikipedia/he/1/13/Button_enter.png", "<br />", "", "", "ירידת שורה");
    addEditButton("upload.wikimedia.org/wikipedia/he/8/80/Button_upper_letter.png", "<sup>", "כתב עילי", "</sup>", "כתב עילי");
    addEditButton("upload.wikimedia.org/wikipedia/he/7/70/Button_lower_letter.png", "<sub>", "כתב תחתי", "</sub>", "כתב תחתי");
    addEditButton("upload.wikimedia.org/wikipedia/he/5/58/Button_small.png", "<small>", "כתב מוקטן", "</small>", "כתב מוקטן");
    addEditButton("https://images.wikia.nocookie.net/eincyclopedia/images//6/67/Button_BIG.PNG", "<big>", "כתב מוגדל", "</big>", "כתב מוגדל");
    addEditButton("upload.wikimedia.org/wikipedia/he/3/34/Button_hide_comment.png", "<!-- ", "הערה מוסתרת", " -->", "הערה מוסתרת");
    addEditButton("upload.wikimedia.org/wikipedia/he/1/12/Button_gallery.png", "<gallery>\n", "תמונה:PictureFileName.jpg|כיתוב תמונה\nתמונה:PictureFileName.jpg|כיתוב תמונה", "\n</gallery>", "יצירת גלריית תמונות");
    addEditButton("upload.wikimedia.org/wikipedia/he/e/e9/Button_headline2.png", "=== ", "כותרת משנית", " ===", "יצירת כותרת ברמה 3");
    addEditButton("upload.wikimedia.org/wikipedia/he/8/8e/Button_shifting.png", ":", "", "", "הזחה לשמאל");
    addEditButton("upload.wikimedia.org/wikipedia/he/1/1e/Button_font_color.png", '<span style="color: ColorName;">', "טקסט צבוע", "</span>", "טקסט עם צבע");
    addEditButton("upload.wikimedia.org/wikipedia/he/9/93/Button_sub_link.png", "[[", "שם דף#שם כותרת|שם תצוגה", "]]", "קישור לכותרת בדף");
    addEditButton("upload.wikimedia.org/wikipedia/he/d/d3/Button_definition_list.png", "\n; ", "פריט", " : ", "רשימת הגדרות");
    addEditButton("upload.wikimedia.org/wikipedia/he/a/ac/Button_ref.PNG", "<ref>", "הזן הערת שוליים כאן", "</ref>", "הערת שוליים");
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
/* </div></pre> */

addOnloadHook(uploadLink);