/* Any JavaScript here will be loaded for all users on every page load. */

/* Any JavaScript here will be loaded for all users on every page load. */

function ddm()
{

// Variables, change these in case you need to set other class names (mmhide_ for 
// contribute users for example)
var parentClass='isParent';      //gets applied when the LI has a nested UL
var activeParentClass='isActive';        //gets applied when the nested UL is visible
var preventHoverClass='nohover';         //denotes a navigation that should not get any hover effects
var indicateJSClass='dhtml';     //gets applied to the main navigation when Javascript is available
var toHideClass='hiddenChild';   //gets applied to hide the nested UL
var toShowClass='shownChild';    //gets applied to show the nested UL
var currentClass='current';      //denotes the current active sub element and prevents collapsing
var d=document.getElementById('nav');   //denotes the navigation element 

// if DOM is not available stop right here.
if(!document.getElementById && !document.createTextNode){return;}

// if the navigation element is available, apply the class denoting DHTML capabilities
if(d)
{
d.className+=d.className==''?indicateJSClass:' '+indicateJSClass;
var lis,i,firstUL,j,apply;

// loop through all LIs and check which ones have a nested UL
lis=d.getElementsByTagName('li');
for(i=0;i<lis.length;i++)
{
firstUL=lis[i].getElementsByTagName('ul')[0]
// if there is a nested UL, deactivate the first nested link and apply the class to show 
// there is a nested list
if(firstUL)
{
lis[i].childNodes[0].onclick=function(){return false;}
lis[i].className+=lis[i].className==''?parentClass:' '+parentClass;
// check if there is a "current" element 
apply=true;
if(new RegExp('\\b'+currentClass+'\\b').test(lis[i].className)){apply=false;}
if(apply)
{
for(j=0;j<firstUL.getElementsByTagName('li').lengt h;j++)
{
if(new RegExp('\\b'+currentClass+'\\b').test(firstUL.getE lementsByTagName('li')[j].className)){apply=false;break}
}
}
// if there is no current element, apply the class to hide the nested list
if(apply)
{
firstUL.className+=firstUL.className==''?toHideCla ss:' '+toHideClass;
// check if there is a class to prevent hover effects and only apply the function
// onclick if that is the case, otherwise apply it onclick and onhover
if(new RegExp('\\b'+preventHoverClass+'\\b').test(d.class Name))
{
lis[i].onclick=function(){doddm(this);}
} else {
lis[i].onclick=function(){doddm(this);}
lis[i].onmouseover=function(){doddm(this);}
lis[i].onmouseout=function(){doddm(null);}
}
// if there is a current element, define the list as being kept open and apply the 
// classes to show the nested list and define the parent LI as an active one
} else {
lis[i].keepopen=1;
firstUL.className+=firstUL.className==''?toShowCla ss:' '+toShowClass;
lis[i].className=lis[i].className.replace(parentClass,activeParentClass);
}
}
}
}
// function to show and hide the nested lists and add the classes to the parent LIs
function doddm(o)
{
var childUL,isobj,swap;

// loop through all LIs of the navigation       
lis=d.getElementsByTagName('li');
for(i=0;i<lis.length;i++)
{
isobj=lis[i]==o;
// function to exchange class names in an object
swap=function(tmpobj,tmporg,tmprep)
{
tmpobj.className=tmpobj.className.replace(tmporg,t mprep)       
}
// if the current LI does not have an indicator to be kept visible
if(!lis[i].keepopen)
{
childUL=lis[i].getElementsByTagName('ul')[0];
// check if there is a nested UL and if the current LI is not the one clicked on
// and exchange the classes accordingly (ie. hide all other nested lists and 
// make the LIs parent rather than active.
if(childUL)     
{       
if(new RegExp('\\b'+preventHoverClass+'\\b').test(d.class Name))
{
if(new RegExp('\\b'+activeParentClass+'\\b').test(lis[i].className))
{
swap(childUL,isobj?toShowClass:toHideClass,isobj?t oHideClass:toShowClass);     
swap(lis[i],isobj?activeParentClass:parentClass,isobj?parentC lass:activeParentClass);  
} else {

swap(childUL,isobj?toHideClass:toShowClass,isobj?t oShowClass:toHideClass);     
swap(lis[i],isobj?parentClass:activeParentClass,isobj?activeP arentClass:parentClass);  
}
} else {
swap(childUL,isobj?toHideClass:toShowClass,isobj?t oShowClass:toHideClass);     
swap(lis[i],isobj?parentClass:activeParentClass,isobj?activeP arentClass:parentClass);  
}
} 
}
}
}
}
window.onload=function()
{
ddm();
// add other functions to be called onload below
}