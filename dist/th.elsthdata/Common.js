/* shrink the side rail to add content space when rail is present */
/* only works with proper css - see [[Forum:Why not get rid of the right sidebar altogether?]] */
function ShrinkRail() {
	if( $('article#WikiaMainContent.WikiaMainContent').width() < 1000 ) {
		$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": '750px'});
		$('article#WikiaMainContent.WikiaMainContent').css({"width": '760px'});
		$('div#catlinks.catlinks').css({"width": '718px'});
 
		$('div#WikiaRail.WikiaRail').css({"width": '220px'});
		$('form#WikiaSearch').css({"width": '218px'});
		$('form#WikiaSearch input[type="text"]').css({"width": '210px'});
 
		$('div#WikiaRail a.wikia-button.upphotos').replaceWith('<a href="/wiki/Special:Upload" title="Add a Photo" class="wikia-button upphotos" style="width:30px; margin-top:0;"> <img src="https://images.wikia.nocookie.net/__cb32790/common/skins/common/blank.gif" height="0" width="0" class="sprite photo" style="margin:0;"> </a>');
		$('div#WikiaRail a.wikia-button.createpage').replaceWith('<a href="/wiki/Special:CreatePage" title="Create a new page on this wiki" class="wikia-button createpage" style="width:25px; margin-top:0;"> <img src="https://images.wikia.nocookie.net/__cb32790/common/skins/common/blank.gif" height="0" width="0" class="sprite new" style="margin:0;"> </a>');
		$('div#WikiaRail a.wikia-button[href="/wiki/Special:CreateBlogPage"]').replaceWith('<a href="/wiki/Special:CreateBlogPage" title="Create blog post" class="wikia-button" style="width:25px"><img src="https://images.wikia.nocookie.net/__cb32790/common/skins/common/blank.gif" height="0" width="0" class="sprite blog" style="margin-left:4px;"></a>');
	}
}
 
addOnloadHook(ShrinkRail);

/* <pre> */
/* Any JavaScript here will be loaded for all users on every page load. */

/* Return whether a particular class is used**************************************
 * Description: Uses regular expressions and caching for better performance.
 */
 
 var usesClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

/** Collapsible tables code *****************************************************
 *  Description: Allows tables to be collapsed, showing only the header
 *  Author: User:Bigfoot Lover @ BionicWiki.com
 *  Added: 24 September 2007
 */

/* Add a hook to make buttons, where need be, on every pageload */
addOnloadHook( createTableButtons );

/* Define global variables:
 * autoShrink is the number of tables that must exist on the page for usage of "class=collapsible autocollapse"
 * minimizeSymbol can be either a symbol such as a minus sign or a word such as hide or disappear
 * maximizeSymbol can be either a symbol such as a plus sign or a word such as show or appear */

var autoShrink = 2;
var minimizeSymbol = "hide";
var maximizeSymbol = "show";

/* Define functions that do-the-work */
/* Function toggleTableView() toggles a specified table's view from minimized to maximized, or vice versa */ 
function toggleTableView( tableIndex, tableShrink )
{
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
    /* If there is no collapsible tables on the page, no need to do any shrinking */
    if (!Table) {
      return false;
    }

    var Button = document.getElementById( "collapseButton" + tableIndex );
    /* If no collapsible buttons, no need to do any shrinking */
    if (!Button ) {
        return false;
    }

    /* Grab the rows of the specified table */
    var Rows = Table.getElementsByTagName( "tr" ); 

    /* Do the hiding/unhiding */
    if ( Button.firstChild.data == minimizeSymbol || tableShrink == 1 ) {
        /* if the button is set to minimize its contents, 
         * then loop through the rows and mark them hidden */
        var count = 1;
        while (Rows.length > count) {
          if (Rows[count].parentNode.parentNode.id == ("collapsibleTable" + tableIndex))
          {
            Rows[count].style.display = "none";
          }
          count++;
        }
        /* After marking, change the table to show the maximize symbol */
        Button.firstChild.data = maximizeSymbol;
    } else {
        /* if the button is set to maximize its contents, 
         * then loop through the rows and mark them visible */     
        var count = 1;
        while (Rows.length > count) {
          if(Rows[count].parentNode.parentNode.id == ("collapsibleTable" + tableIndex))
          {
              Rows[count].style.display = Rows[0].style.display;
          }
          count++;
        }
        /* After marking, change the table to show the minimize symbol */
        Button.firstChild.data = minimizeSymbol;
    }
}

/* Funtion createTableButtons() creates the plus or minus symbol and alignment text
 * to be applied on collapsible tables */
function createTableButtons()
{
    /* Define local variables */
    var tableIndex = 0;
    var NavBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );

    /* Use two count variables to handle cases where continue is used */
    var loopcount = 0;
    var count = 0;    
    while (Tables.length > loopcount) {
        /* For all collapsible table on the page, this code goes through
         * them and makes a button for each one individually */
        count = loopcount;
        loopcount++;
        if ( usesClass( Tables[count], "collapsible" ) ) {

            /* Proceed only if a header row and header exist */
            var HeaderRow = Tables[count].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;

            /* Log where you are in the looping */
            NavBoxes[ tableIndex ] = Tables[count];

            /* Set the identifier of the table being edited in this iteration */
            Tables[count].setAttribute( "id", "collapsibleTable" + tableIndex );

            /* Create the button assuming it is a minimized table
             * to do the initial creation. */
            var Button = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( maximizeSymbol );

            /* Define where the button floats and its font and size.
             * The width should be set to the max character count of
             * the mininizeSymbol and maximizeSymbol + 2. ie. min and max
             * are 3 letters each + 2 = 5em */
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "5em";
Button.style.color = "white";


            /* Set the link color and identifier */
            ButtonLink.style.color = Header.style.color;
ButtonLink.style.color = "white";
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );

            /* Set the destination of the button */
            ButtonLink.setAttribute( "href", "javascript:toggleTableView(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );


            /* Load the next header and table for the next iteration */
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }

    /* Earlier in this function, assumed all tables are minimized to do the initial creation.
     * Now, loop again through the tables and set those to maximized that need setting,
     * and set the rows of those that don't as hidden */
    loopcount = 0;
    while (tableIndex > loopcount) {
        /* If autocollapse or collapse is not invalid, maximize; otherwise, minimize */
        if (((autoShrink > tableIndex) && usesClass( NavBoxes[loopcount], "autocollapse" )) || !usesClass( NavBoxes[loopcount], "collapsed" ) ) {
           toggleTableView( loopcount, 0 );
        }
        else {
           toggleTableView( loopcount, 1 );
        }
        loopcount++;
    }
}

/* JavaScript for rounding borders
   Source: http://webdesign.html.it/articoli/leggi/528/more-nifty-corners */

function NiftyCheck(){
if(!document.getElementById || !document.createElement)
    return(false);
isXHTML=/html\:/.test(document.getElementsByTagName('body')[0].nodeName);
if(Array.prototype.push==null){Array.prototype.push=function(){
      this[this.length]=arguments[0]; return(this.length);}}
return(true);
}

function Rounded(selector,wich,bk,color,opt){
var i,prefixt,prefixb,cn="r",ecolor="",edges=false,eclass="",b=false,t=false;

if(color=="transparent"){
    cn=cn+"x";
    ecolor=bk;
    bk="transparent";
    }
else if(opt && opt.indexOf("border")>=0){
    var optar=opt.split(" ");
    for(i=0;i<optar.length;i++)
        if(optar[i].indexOf("#")>=0) ecolor=optar[i];
    if(ecolor=="") ecolor="#666";
    cn+="e";
    edges=true;
    }
else if(opt && opt.indexOf("smooth")>=0){
    cn+="a";
    ecolor=Mix(bk,color);
    }
if(opt && opt.indexOf("small")>=0) cn+="s";
prefixt=cn;
prefixb=cn;
if(wich.indexOf("all")>=0){t=true;b=true}
else if(wich.indexOf("top")>=0) t="true";
else if(wich.indexOf("tl")>=0){
    t="true";
    if(wich.indexOf("tr")<0) prefixt+="l";
    }
else if(wich.indexOf("tr")>=0){
    t="true";
    prefixt+="r";
    }
if(wich.indexOf("bottom")>=0) b=true;
else if(wich.indexOf("bl")>=0){
    b="true";
    if(wich.indexOf("br")<0) prefixb+="l";
    }
else if(wich.indexOf("br")>=0){
    b="true";
    prefixb+="r";
    }
var v=getElementsBySelector(selector);
var l=v.length;
for(i=0;i<l;i++){
    if(edges) AddBorder(v[i],ecolor);
    if(t) AddTop(v[i],bk,color,ecolor,prefixt);
    if(b) AddBottom(v[i],bk,color,ecolor,prefixb);
    }
}

function AddBorder(el,bc){
var i;
if(!el.passed){
    if(el.childNodes.length==1 && el.childNodes[0].nodeType==3){
        var t=el.firstChild.nodeValue;
        el.removeChild(el.lastChild);
        var d=CreateEl("span");
        d.style.display="block";
        d.appendChild(document.createTextNode(t));
        el.appendChild(d);
        }
    for(i=0;i<el.childNodes.length;i++){
        if(el.childNodes[i].nodeType==1){
            el.childNodes[i].style.borderLeft="1px solid "+bc;
            el.childNodes[i].style.borderRight="1px solid "+bc;
            }
        }
    }
el.passed=true;
}
    
function AddTop(el,bk,color,bc,cn){
var i,lim=4,d=CreateEl("b");

if(cn.indexOf("s")>=0) lim=2;
if(bc) d.className="artop";
else d.className="rtop";
d.style.backgroundColor=bk;
for(i=1;i<=lim;i++){
    var x=CreateEl("b");
    x.className=cn + i;
    x.style.backgroundColor=color;
    if(bc) x.style.borderColor=bc;
    d.appendChild(x);
    }
el.style.paddingTop=0;
el.insertBefore(d,el.firstChild);
}

function AddBottom(el,bk,color,bc,cn){
var i,lim=4,d=CreateEl("b");

if(cn.indexOf("s")>=0) lim=2;
if(bc) d.className="artop";
else d.className="rtop";
d.style.backgroundColor=bk;
for(i=lim;i>0;i--){
    var x=CreateEl("b");
    x.className=cn + i;
    x.style.backgroundColor=color;
    if(bc) x.style.borderColor=bc;
    d.appendChild(x);
    }
el.style.paddingBottom=0;
el.appendChild(d);
}

function CreateEl(x){
if(isXHTML) return(document.createElementNS('http://www.w3.org/1999/xhtml',x));
else return(document.createElement(x));
}

function getElementsBySelector(selector){
var i,selid="",selclass="",tag=selector,f,s=[],objlist=[];

if(selector.indexOf(" ")>0){  //descendant selector like "tag#id tag"
    s=selector.split(" ");
    var fs=s[0].split("#");
    if(fs.length==1) return(objlist);
    f=document.getElementById(fs[1]);
    if(f) return(f.getElementsByTagName(s[1]));
    return(objlist);
    }
if(selector.indexOf("#")>0){ //id selector like "tag#id"
    s=selector.split("#");
    tag=s[0];
    selid=s[1];
    }
if(selid!=""){
    f=document.getElementById(selid);
    if(f) objlist.push(f);
    return(objlist);
    }
if(selector.indexOf(".")>0){  //class selector like "tag.class"
    s=selector.split(".");
    tag=s[0];
    selclass=s[1];
    }
var v=document.getElementsByTagName(tag);  // tag selector like "tag"
if(selclass=="")
    return(v);
for(i=0;i<v.length;i++){
    if(v[i].className.indexOf(selclass)>=0){
        objlist.push(v[i]);
        }
    }
return(objlist);
}

function Mix(c1,c2){
var i,step1,step2,x,y,r=new Array(3);
if(c1.length==4)step1=1;
else step1=2;
if(c2.length==4) step2=1;
else step2=2;
for(i=0;i<3;i++){
    x=parseInt(c1.substr(1+step1*i,step1),16);
    if(step1==1) x=16*x+x;
    y=parseInt(c2.substr(1+step2*i,step2),16);
    if(step2==1) y=16*y+y;
    r[i]=Math.floor((x*50+y*50)/100);
    }
return("#"+r[0].toString(16)+r[1].toString(16)+r[2].toString(16));
}

function doRoundEdges(){
  if(!NiftyCheck())
    return;
  Rounded("div#nifty","all","#FFF","#D4DDFF","smooth");
}

addOnloadHook( doRoundEdges );

/* IE Correction Code **********************************************
 * Description: This is code to fix known bugs in IE
 * Detects if an IE browser and applies browser-specific code
 * Author: User:Bigfoot Lover @ Bionic Wiki
 * Added: 8 October 2007
 * Modified 18 October 2007 to fix ie imagemap bug
 */

// setStyleById: given an element id, style property and 
// value, apply the style.
// args:
//  i - element id
//  p - property
//  v - value
//
function setStyleById(i, p, v) {
	var n = document.getElementById(i);
	n.style[p] = v;
}

/* Add a hook to perform code on every pageload */
addOnloadHook( performIE );
function performIE()
{ 
    if ( -1 != navigator.userAgent.indexOf ("MSIE") ) {
        /* perform Microsoft Internet Explorer-specific subs */
        var Divs = document.getElementsByTagName( "div" );
        var divCnt = 0;
        var divID = "";
        if (Divs.length > 0) {
            var CurrDiv = Divs[0];
            var s = "";
            while (Divs.length > divCnt) { 
                s = eval("CurrDiv.style.ietop");
                if ((s != "") && (s != null)) {
                    divID = "mapDiv" + divCnt;
                    CurrDiv.setAttribute( "id", divID );
                    setStyleById(divID, "top", CurrDiv.style.ietop);
                }
                divCnt++;
                CurrDiv = Divs[divCnt];
            }
        }
    }
} 

//Get Ad Dart Number
var randDARTNumber=0;
function genSetRandDARTNumber()
{
 randDARTNumber = Math.round(Math.random()*1000000000000);
}
genSetRandDARTNumber();

/* </pre> */