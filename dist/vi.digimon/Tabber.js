/*Copied from http://www.barelyfitz.com/projects/tabber/example.css used under mit license
see http://www.barelyfitz.com/projects/tabber/
*/
/* $Id: example.css,v 1.5 2006/03/27 02:44:36 pat Exp $ */
 
/*--------------------------------------------------
  REQUIRED to hide the non-active tab content.
  But do not hide them in the print stylesheet!
  --------------------------------------------------*/
.tabberlive .tabbertabhide {
 display:none;
}
 
/*--------------------------------------------------
  .tabber = before the tabber interface is set up
  .tabberlive = after the tabber interface is set up
  --------------------------------------------------*/
.tabber {
}
.tabberlive {
 margin-top:1em;
}
 
/*--------------------------------------------------
  ul.tabbernav = the tab navigation list
  li.tabberactive = the active tab
  --------------------------------------------------*/
ul.tabbernav
{
 margin:0;
 padding: 3px 0;
 border-bottom: 1px solid #CCC;
 font: bold 12px Verdana, sans-serif;
}
 
ul.tabbernav li
{
 list-style: none;
 margin: 0;
 display: inline;
}
 
ul.tabbernav li a
{
 padding: 3px 0.5em;
 margin-left: 3px;
 border: 1px solid #ccc;
 border-bottom: none;
 background: #f2f7ff;
 text-decoration: none;
}
 
ul.tabbernav li a:link { color: #448; }
ul.tabbernav li a:visited { color: #667; }
 
ul.tabbernav li a:hover
{
 color: #000;
 background: #fff9f2;
 border-color: #CCC;
}
 
ul.tabbernav li.tabberactive a
{
 background-color: #fff;
 border-bottom: 1px solid #fff;
}
 
ul.tabbernav li.tabberactive a:hover
{
 color: #000;
 background: white;
 border-bottom: 1px solid white;
}
 
/*--------------------------------------------------
  .tabbertab = the tab content
  Add style only after the tabber interface is set up (.tabberlive)
  --------------------------------------------------*/
.tabberlive .tabbertab {
 padding:5px;
 border:1px solid #CCC;
 border-top:0;
 
 /* If you don't want the tab size changing whenever a tab is changed
    you can set a fixed height */
 
 /* height:200px; */
 
 /* If you set a fix height set overflow to auto and you will get a
    scrollbar when necessary */
 
 /* overflow:auto; */
}
 
/* If desired, hide the heading since a heading is provided by the tab */
.tabberlive .tabbertab h2 {
 display:none;
}
.tabberlive .tabbertab h3 {
 display:none;
}
 
/* Example of using an ID to set different styles for the tabs on the page */
.tabberlive#tab1 {
}
.tabberlive#tab2 {
}
.tabberlive#tab2 .tabbertab {
 height:200px;
 overflow:auto;
}