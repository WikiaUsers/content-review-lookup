/* Any JavaScript here will be loaded for all users on every page load. */

//==========================================================================================================
// General purpose popup code
//==========================================================================================================
 
function getXEBPopupDiv(name)
{
    XEBMainDiv= document.getElementById("XEB");
    if(XEBMainDiv==null){
        XEBMainDiv=document.createElement("div");
        document.body.appendChild(XEBMainDiv);
        XEBMainDiv.id="XEB";
    }
 
    me= document.getElementById("XEBPopup" & name);
    if(!(me==null))return me;
    me=document.createElement("div");
    XEBMainDiv.appendChild(me);
 
    me.id="XEBPopup";
    me.style.position='absolute';
    me.display='none';
    me.visibility='hidden';
    me.onmouseout=CheckHideXEBPopup;
    me.onmouseover=cancelHidePopup;
    return me;
}
 
//Function:
//    CheckHideXEBPopup
//Purpose:
//    Looks at the cursor position and if it has moved outside the popup it will close the popup
//Called:
//    When the onMouseEvent is fired on the popup
 
function CheckHideXEBPopup(e){
    m= document.getElementById("XEBmnu");
    if(is_gecko)
    {
        ph=m.offsetHeight;
        var x=e.clientX + window.scrollX;
        var y=e.clientY + window.scrollY;;
        s=window.getComputedStyle(m,"");
        ph=s.height;
        ph=Number(ph.substring(0,ph.length-2));
    }
    else
    {
        var x=event.clientX+ document.documentElement.scrollLeft + document.body.scrollLeft;
        var y=event.clientY+ document.documentElement.scrollTop + document.body.scrollTop;
        ph=m.offsetHeight;
    }
    pl=curPopup.x;
    pt=curPopup.y;
    pw=m.style.width;
    pw=Number(pw.substring(0,pw.length-2));
 
    if(x>(pl+2)&&x<(pl+pw-5)&&y>(pt+2)&&y<(pt+ph-5))return;
    curPopup.hideTimeout=setTimeout('hideXEBPopup()',XEBHideDelay*1000);
}
 
function cancelHidePopup()
{
    clearTimeout(curPopup.hideTimeout)
}
 
function hideXEBPopup(){
    XEBMainDiv= document.getElementById("XEB");
    m= document.getElementById("XEBPopup");
    XEBMainDiv.removeChild(m);
}
 
function XEBstartDrag(e)
{
    m=new GetPos(e||event);
    curPopup.startDrag.mouse=m;
    curPopup.startDrag.floatpopup.y=parseInt(curPopup.div.style.top);
    curPopup.startDrag.floatpopup.x=parseInt(curPopup.div.style.left);
    curPopup.dragging=true;
}
 
function XEBstopDrag(e)
{
    if(curPopup.dragging==false)return;
    curPopup.dragging=false;
}
 
function XEBDrag(e)
{
    if(curPopup.dragging==false)return;
 
    m=new GetPos(e||event);
    x=parseInt(curPopup.startDrag.floatpopup.x+(m.x-curPopup.startDrag.mouse.x));
    y=parseInt(curPopup.startDrag.floatpopup.y+(m.y-curPopup.startDrag.mouse.y));
 
    curPopup.div.style.top=y+"px";
    curPopup.div.style.left=x+"px";
 
    curPopup.x=x;
    curPopup.y=y;
}
 
//=============================================================================
// Popup: Table
//=============================================================================
 
function XEBPopup(name,x,y)
{
    // Make sure the popup can appear on the screen
 
    this.IESelectedRange=XEBgetIESelectedRange();
 
    winW=(is_gecko)?window.innerWidth:document.body.offsetWidth;
    if((winW-this.width)<x)x=(winW-this.width);
 
    this.div=getXEBPopupDiv(name);
    this.div.style.zIndex=2000;
    this.div.display="inline";
    this.div.visibility="visible";
    this.div.style.top=y + "px";
    this.x=x;
    this.y=y;
    this.name=name;
 
    this.startDrag=new Object;
    this.startDrag.floatpopup=new Object;
}
 
function setInnerHTML(text)
{
    winW=(is_gecko)?window.innerWidth:document.body.offsetWidth;
    if((winW-this.width)<this.x)this.x=(winW-this.width);
    this.div.style.left=this.x+ "px";
 
    mt="<div id='XEBmnu' style='width:" + this.width + "px' >";
    mt+='<div id="XEBmnuTitle" class="XEBPopupTitle" onmousedown="XEBstartDrag(event)" onmouseup="XEBstopDrag(event)" onmousemove="XEBDrag(event)">Title</div>'
    mt+=text;
    mt+="</div>";
    this.div.innerHTML=mt;
//Turn off autocomplete. If the mouse moves over the autocomplete popup then x,y in CheckHidePopup is relative to the
// autocomplete popup and our popup is hidden
    var InTexts = this.div.getElementsByTagName('input');
    for (var i = 0; i < InTexts.length; i++) {
            var theInput = InTexts[i];
        if (theInput.type == 'text'){theInput.setAttribute('autocomplete','off');}
    }
//Add rollover features to menu items. Doing it here means we don't have to do it for each menu
    x=XEBgetElementsByClassName(this.div,'XEBMnuItm','span');
    for (var i = 0; i < x.length; i++) {
            var theItm = x[i];
        theItm.onmouseout=XEBMenuMouseOut;
        theItm.onmouseover=XEBMenuMouseOver;
    }
 
    this.div.style.borderWidth='thin';
    this.div.style.borderStyle='solid';
    this.div.style.backgroundColor='#D0D0D0';
}
XEBPopup.prototype.width=250;
XEBPopup.prototype.dragging=false;
XEBPopup.prototype.setInnerHTML=setInnerHTML;
 
var curPopup;
 
function GetPos(e)
{
    this.x=e.clientX-10+ document.documentElement.scrollLeft + document.body.scrollLeft;
    this.y=e.clientY-10+ document.documentElement.scrollTop + document.body.scrollTop;
}
 
function XEBPopupTable(e){
    m=new GetPos(e||event);
 
    curPopup=new XEBPopup("table",m.x,m.y);
 
    mt='<p>Enter the table parameters below: <\/p>'
        +'<form name="XEBPopupTableForm">'
        +'Table caption: <input type="checkbox" name="inputCaption"><p\/>'
        +'Table alignment: center<input type="checkbox" name="inputAlign"><p\/>'
        +'Table headline: colored<input type="checkbox" name="inputHead"><p\/>'
        +'Number of rows: <input type="text" name="inputRow" value="3" size="2"><p\/>'
        +'Number of columns: <input type="text" name="inputCol" value="3" size="2"><p\/>'
        //+'Alternating grey lines: <input type="checkbox" name="inputLine" checked="1" ><p\/>'
        +'Item column: <input type="checkbox" name="inputItems" ><p\/>'
        +'Sortable: <input type="checkbox" name="inputSort" ><p\/>'
        +'<\/form>'
        +'<i>The default table allows for fields and values only.<\/i><p\/>'
        +'Check "Item column" to allow for the table to have fields, items, and values.<\/i><p\/>'
        +'<p><button onClick="javascript:insertTableCode()">Insert</button>'
        +'<button onClick="hideXEBPopup()">Cancel</button>'
 
    curPopup.setInnerHTML(mt);
 
    return true;
}
 
function insertTableCode(){
    f=document.XEBPopupTableForm;
    var caption = (f.inputCaption.checked)?"|+ TABLE CAPTION \n":""; 
    var exhead = (f.inputHead.checked)?'|- style="background: #DDFFDD;"\n':""; 
    var nbRow = parseInt(f.inputRow.value); 
    var nbCol = parseInt(f.inputCol.value); 
    var exfield = f.inputItems.checked; 
    var align = (f.inputAlign.checked)?'align="center"':""; 
 
    //generateTable(caption, exhead, nbCol, nbRow, exfield, align);
 
    var code = "\n";
    code += '{| {{prettytable}} ' + align + ' '; // en: class="wikitable"
    code+=(f.inputSort.checked)?'class="sortable" \n':'\n';
    code += caption + exhead;
    if (exfield) code += '!\n';
    for (i=1;i<nbCol+1;i++) code += '! FELD ' + i + '\n';
    var items = 0;
    for (var j=0;j<nbRow;j++){
        if (exfield) { 
            items++;
            code += '|-\n! style="background: #FFDDDD;"|ITEM ' + items + '\n';
        }    else code += '|-\n';
        for (i=0;i<nbCol;i++) code += '| Element\n';
    }
    code += '|}\n';
    hideXEBPopup();
    insertTags('','', code);
    extendSummary('table');
 
    return false;
}  
 
// Get the text currently selected by user in the textAra
// This code is based on part of the insertTags function in wikibits.js
 
function XEBGetSelectedText()
{
    var txtarea;
    if (document.editform) {
        txtarea = document.editform.wpTextbox1;
    } else {
        // some alternate form? take the first one we can find
        var areas = document.getElementsByTagName('textarea');
 
        txtarea = areas[0];
    }
    // IE & Opera
    if (document.selection  && !is_gecko)
    {
        var theSelection = document.selection.createRange().text;
        if (!theSelection) theSelection='';
    }
    // Mozilla
    else if(txtarea.selectionStart || txtarea.selectionStart == '0') {
        var replaced = false;
        var startPos = txtarea.selectionStart;
        var endPos = txtarea.selectionEnd;
        var theSelection = (txtarea.value).substring(startPos, endPos);
        if (!theSelection) theSelection='';
    }
    return theSelection;
}
 
//Notes:
//    IE loses the cursor position in the textarea when the popup is used. 
//    So we save the cursor position here
function XEBgetIESelectedRange(){
    var IESel=new Object;
    var txtarea;
    if (document.editform) {
        txtarea = document.editform.wpTextbox1;
    } else {
        // some alternate form? take the first one we can find
        var areas = document.getElementsByTagName('textarea');
 
        txtarea = areas[0];
    }
    // IE & Opera
 
    if (document.selection  && !is_gecko)
    {
        txtarea.focus();
        IESel.Rng=document.selection.createRange();
        return IESel;
    }
}
 
function XEBinsertText(beforeText,selText,afterText,IESelectedRange) {
    var newText=beforeText + selText + afterText;
    var txtarea;
    if (document.editform) {
        txtarea = document.editform.wpTextbox1;
    } else {
        // some alternate form? take the first one we can find
        var areas = document.getElementsByTagName('textarea');
        txtarea = areas[0];
    }
 
    // IE
    if (document.selection  && !is_gecko) {
 
        tr=IESelectedRange.Rng;
        tr.text=newText;
        txtarea.focus();
        //txtarea.caretpos=tr.duplicate();
        tr.select();
 
        return;
 
    // Mozilla
    } else if(txtarea.selectionStart || txtarea.selectionStart == '0') {
        var replaced = false;
        var startPos = txtarea.selectionStart;
        var endPos = txtarea.selectionEnd;
 
        if (endPos-startPos) {
            replaced = true;
        }
        var scrollTop = txtarea.scrollTop;
//        var myText = (txtarea.value).substring(startPos, endPos);
//        if (!myText) {
//            myText=sampleText;
//        }
//        if (myText.charAt(myText.length - 1) == " ") { // exclude ending space char, if any
//            subst = tagOpen + myText.substring(0, (myText.length - 1)) + tagClose + " ";
//        } else {
//            subst = tagOpen + myText + tagClose;
//        }
        txtarea.value = txtarea.value.substring(0, startPos) + newText +
            txtarea.value.substring(endPos, txtarea.value.length);
        txtarea.focus();
        //set new selection
        if (!replaced) {
            var cPos = startPos+(newText.length);
            txtarea.selectionStart = cPos;
            txtarea.selectionEnd = cPos;
        } else {
            txtarea.selectionStart = startPos+beforeText.length;
            txtarea.selectionEnd = startPos+beforeText.length+selText.length;
        }
        txtarea.scrollTop = scrollTop;
 
    // All other browsers get no toolbar.
    // There was previously support for a crippled "help"
    // bar, but that caused more problems than it solved.
    }
    // reposition cursor if possible
    if (txtarea.createTextRange) {
 
        txtarea.caretPos = document.selection.createRange().duplicate();
//txtarea.caretPos =IESelectedRange.Rng;
    }
txtarea.focus();
}
 
 
//============================================================
// Table generator 
//============================================================
/** en: Generate an array using Mediawiki syntax
* @author: originally from fr:user:dake
* @version: 0.2 */
function generateTable(caption, exhead, nbCol, nbRow, exfield, align){
 
};
 
 
function XEBPopupRef(e){
 
    m=new GetPos(e||event);
 
    curPopup=new XEBPopup("ref",m.x,m.y);
    curPopup.width=500;
    mt='<p>Enter the reference parameters below: <\/p>'
        +'<form name="XEBPopupRefForm">'
        +'Name:<input type="text" name="refName" value="" size="10"><p\/>'
        +'Material:<input type="text" name="refMaterial" value="' + XEBGetSelectedText() + '" size="20">'
        +'<\/form>'
        +'<p><button onClick="javascript:insertRef()">Insert</button>'
        +'<button onClick="hideXEBPopup()">Cancel</button>';
 
    curPopup.setInnerHTML(mt);
//    document.XEBPopupRefForm.refName.focus();
    return true;
}
 
function insertRef(){
    f=document.XEBPopupRefForm;
    var refName = f.refName.value;
    var refMaterial=f.refMaterial.value;
 
    hideXEBPopup();
    var code1='<ref';
    code1+=(refName)?' name="'+refName+'">':'>'; 
    code2=refMaterial;
    code3='<\/ref>'
    XEBinsertText(code1,code2,code3,curPopup.IESelectedRange);
 
    extendSummary('ref');
    return false;
} 
 
//===GEO LINK Function==================================================
 
function XEBPopupGeoLink(e)
{
    m=new GetPos(e||event);
 
    curPopup=new XEBPopup("geo",m.x,m.y);
    curPopup.width=300;
    mt='<p>Enter the location parameters below: <\/p>'
        +'<form name="XEBPopupGeoLinkForm">'
        +'Loction:<p\/>'
        +'<table style="background: transparent;">'
        +'<tr><td>Latitude:<\/td><td><input type="text" autocomplete="off" name="geoLatDeg" value="" size="4"><\/td>'
        +'<td><input type="text" name="geoLatMin" size="4"><\/td>'
        +'<td><input type="text" name="geoLatSec" size="4"><\/td>'
        +'<td><select name="geoLatNS"><option value="N">N<option value="S">S</select><\/td><\/tr>'
        +'<tr><td>Longitude:<\/td><td><input type="text" name="geoLonDeg" value="" size="4"><\/td>'
        +'<td><input type="text" name="geoLonMin" value="" size="4"><\/td>'
        +'<td><input type="text" name="geoLonSec" value="" size="4"><\/td>'
        +'<td><select name="geoLonEW"><option value="E">E<option value="W">W</select><\/td><\/tr>'
        +'<\/table>'
        +'Region:<input type="text" name="geoRegion" value="" size="4"><p\/>'
        +'Type:'
        +'<SELECT NAME="geoType" size="5">'
        +'<OPTION VALUE="country">Country<OPTION VALUE="state">State'
        +'<OPTION VALUE="adm1st">Admin unit, 1st level<OPTION VALUE="adm2st">Admin unit, 2nd level'
        +'<OPTION VALUE="city">City<OPTION VALUE="airport">Airport'
        +'<OPTION VALUE="mountain">Mountain<OPTION VALUE="isle">Isle'
        +'<OPTION VALUE="waterbody">Waterbody<OPTION VALUE="landmark" SELECTED>Landmark'
        +'<OPTION VALUE="forest">forest</SELECT><br>'
        +'Title: <input type="checkbox" name="geoTitle" ><p\/>'
        +'<\/form>'
        +'<p><button onClick="javascript:insertGeoLink()">Insert</button>'
        +'<button onClick="hideXEBPopup()">Cancel</button>';
 
    curPopup.setInnerHTML(mt);
    document.paramForm.refName.focus();
    return true;
 
}
function insertGeoLink()
{
    f=document.XEBPopupGeoLinkForm;
 
    var code='{{Coor ';
    if(f.geoTitle.checked)code+='title ';
    ft='dms';
    if(f.geoLatSec.value==''&&f.geoLonSec.value=='')ft='dm';
    if(ft=='dm'&&f.geoLatMin.value==''&&f.geoLonMin.value=='')ft='d';
    code+=ft;
    code+='|'+f.geoLatDeg.value;
    code+=(ft=='dm'||ft=='dms')?'|'+f.geoLatMin.value:'';
    code+=(ft=='dms')?'|'+f.geoLatSec.value:'';
    code+='|'+f.geoLatNS.value;
    code+='|'+f.geoLonDeg.value;
    code+=(ft=='dm'||ft=='dms')?'|'+f.geoLonMin.value:'';
    code+=(ft=='dms')?'|'+f.geoLonSec.value:'';
    code+='|'+f.geoLonEW.value;
    code+='|type:'+f.geoType.value+'_region:'+f.geoRegion.value
    code+='}}';
    insertTags('','', code);
    extendSummary('geo-location');
    hideXEBPopup();
    return false;
}
 
//===Talk Page entry Function===========================================
 
function XEBPopupTalk(e)
{
    m=new GetPos(e||event);
 
    curPopup=new XEBPopup("talk",m.x,m.y);
    curPopup.width=200;
    mt='<div style="font-size:medium"><p>Please choose:<\/p>'
    mt+='<span class="XEBMnuItm" onclick="XEBInsertTalk(1)">Test1<\/span><br>'
    mt+='<span class="XEBMnuItm" onclick="XEBInsertTalk(2)">Self Test<\/span><br>'
    mt+='<span class="XEBMnuItm" onclick="XEBInsertTalk(3)">Nonsense<\/span><br>'
    mt+='<span class="XEBMnuItm" onclick="XEBInsertTalk(4)">Please stop<\/span><br>'
    mt+='<span class="XEBMnuItm" onclick="XEBInsertTalk(5)">Last chance<\/span><br>'
    mt+='<span class="XEBMnuItm" onclick="XEBInsertTalk(6)">Blanking<\/span><br>'
    mt+='<span class="XEBMnuItm" onclick="XEBInsertTalk(7)">Blatant<\/span><br>'
    mt+='<span class="XEBMnuItm" onclick="XEBInsertTalk(8)">*BLOCKED*<\/span><br>'
    mt+='<span class="XEBMnuItm" onclick="XEBInsertTalk(9)">Spam<\/span><br>'
    mt+='<span class="XEBMnuItm" onclick="XEBInsertTalk(10)">Npov<\/span></div>'
 
    curPopup.setInnerHTML(mt);
 
    return true;
 
}
function XEBInsertTalk(itm)
{
    hideXEBPopup();
    if(itm==1)code='{{subst:test1-n|}}';
    if(itm==2)code='{{subst:selftest-n|}}';
    if(itm==3)code='{{subst:test2-n|}}';
    if(itm==4)code='{{subst:test3-n|}}';
    if(itm==5)code='{{subst:test4-n|}}';
    if(itm==6)code='{{subst:test2a-n|}}';
    if(itm==7)code='{{subst:bv-n|}}';
    if(itm==8)code='{{subst:blantant|}}';
    if(itm==9)code='{{subst:spam-n|}}';
    if(itm==10)code='{{subst:NPOV user}}';
 
    insertTags('','', code);
    return false;
}
function XEBPopupImage(e)
{
    m=new GetPos(e||event);
 
    curPopup=new XEBPopup("image",m.x,m.y);
    curPopup.width=300;
 
    mt='<p>Enter the image parameters below: <\/p>'
        +'<form name="XEBPopupImageForm">'
        +'File:<input type="text" name="imgFile" value="' + XEBGetSelectedText() + '" size="30"><br>'
        +'Type:<SELECT NAME="imgType">'
        +'<OPTION VALUE="thumb">Thumbnail'
        +'<OPTION VALUE="frame">Frame'
        +'<OPTION VALUE="none">[not specified]'
        +'</SELECT><br>'
        +'Location:<SELECT NAME="imgLocation">'
        +'<OPTION VALUE="left">Left'
        +'<OPTION VALUE="center">Centre'
        +'<OPTION VALUE="right">Right'
        +'<OPTION VALUE="none">None'
        +'</SELECT><br>'
        +'Size:<input type="text" name="imgSize" value="100" size="3">px<br>'
        +'Caption:<input type="text" name="imgCaption" value="" size="30"><\/p>'
        +'<\/form>'
        +'<p><button onClick="javascript:XEBInsertImage()">Insert</button>'
        +'<button onClick="hideXEBPopup()">Cancel</button>';
 
    curPopup.setInnerHTML(mt);
 
    return true;
}
function XEBInsertImage()
{
    f=document.XEBPopupImageForm;
    hideXEBPopup();
    var code='[[Image:';
    code+=f.imgFile.value;
    code+='|'+f.imgType.value;
    code+='|'+f.imgLocation.value;
    code+='|'+f.imgSize.value;
    code+='|'+f.imgCaption.value;
    code+=']]';
    insertTags('','', code);
    extendSummary('image');
 
    return false;
}
 
function XEBPopupFormattedText(e)
{
    m=new GetPos(e||event);
 
    curPopup=new XEBPopup("image",m.x,m.y);
    curPopup.width=300;
 
    mt='<form name="XEBPopupImageForm">'
        +'<table  style="background: transparent;">'
        +'<tr><td>Bold:<\/td><td><input type="checkbox" name="textBold"><\/td>'
        +'<td>Superscript:<\/td><td><input type="checkbox" name="textSuperscript"><\/td><\/tr>'
        +'<tr><td>Italic:<\/td><td><input type="checkbox" name="textItalic"><\/td>'
        +'<td>Subscript:<\/td><td><input type="checkbox" name="textSubscript"><\/td><\/tr>'
        +'<tr><td>Strike:<\/td><td><input type="checkbox" name="textStrike"><\/td>'
        +'<td>&nbsp;<\/td><\/tr>'
        +'</table>'
        +'Size:<SELECT NAME="textSize">'
        +'<OPTION VALUE="small">small'
        +'<OPTION VALUE="normal">[Normal]'
        +'<OPTION VALUE="big">big'
        +'</SELECT><br><table style="background:transparent;"><tr><td>Colour:<\/td><td>'
        +'<table width="100px">'
        +'<tr><td colspan="4">None<\/td></tr>'
        +'<tr><td bgcolor="aqua">&nbsp;<\/td><td bgcolor="gray"> &nbsp;<\/td>'
        +'<td bgcolor="olive">&nbsp;<\/td><td bgcolor="navy">&nbsp;<\/td><\/tr>'
        +'<tr><td bgcolor="black">&nbsp;<\/td><td bgcolor="green"> &nbsp;<\/td>'
        +'<td bgcolor="purple">&nbsp;<\/td><td bgcolor="teal">&nbsp;<\/td><\/tr>'
        +'<tr><td bgcolor="blue">&nbsp;<\/td><td bgcolor="lime">&nbsp;<\/td>'
        +'<td bgcolor="red">&nbsp;<\/td><td bgcolor="white">&nbsp;<\/td><\/tr>'
        +'<tr><td bgcolor="fuchsia">&nbsp;<\/td><td bgcolor="maroon">&nbsp;<\/td>'
        +'<td bgcolor="silver">&nbsp;<\/td><td bgcolor="yellow">&nbsp;<\/td><\/tr>'
        +'</table><\/td><\/tr>'
        +'<\/form>'
        +'Sample:'
        +'<span id="sampleText">Text</span>"'
        +'<p><button onClick="javascript:XEBInsertFormattedText()">Insert</button>'
        +'<button onClick="hideXEBPopup()">Cancel</button>';
 
    curPopup.setInnerHTML(mt);
 
    return true;
}
 
function XEBUpdateSampleText()
{
    f=document.XEBPopupImageForm;
}
 
//====================
 
function XEBMenuMouseOut(e)
{
    var targ;
    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
 
    targ.style.color='black';
}
 
function XEBMenuMouseOver(e)
{    var targ;
    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
 
    targ.style.color='red';
}
 
//=======================================================================
// Other functions
//=======================================================================
 
function XEBgetElementsByClassName(parent,clsName,htmltag){ 
    var arr = new Array(); 
    var elems = parent.getElementsByTagName(htmltag);
    for ( var cls, i = 0; ( elem = elems[i] ); i++ ){
        if ( elem.className == clsName ){
            arr[arr.length] = elem;
        }
    }
    return arr;
}
 
function extendSummary(newText)
{
    if(!XEBExtendEditSummary)return;
    s=document.editform.elements['wpSummary'].value;
    s+=(s=='')?newText:' +'+newText;
    document.editform.elements['wpSummary'].value=s;
}
 
function bug(msg)
{
    if(wgUserName=='MarkS')alert(msg);
}
 
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
     "speedTip": "Insertar bloque de texto citado",
     "tagOpen": "<blockquote>\n",
     "tagClose": "\n</blockquote>",
     "sampleText": "Bloque citado"};