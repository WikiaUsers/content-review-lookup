/* This JS page is used to test JavaScript as to not intefer
with the standard Common.js page.

Note to admins, do not sumbit this page for review under any circumstances */

 $(window).load(function(){
     $('<section class="module"><div style="background-color: #0000FF; width: 100px; height: 100px">Testing</div></section>').insertBefore('section#wikia-recent-activity.rail-moudle.activity-moudle');
 });
 
 /* Relocates images with the ID "PHClink" to 
div.page-header__contribution.

The height of the images in this template are resized to 25px in height,
as well as the images will be located above the Edit button and left of
the interlanguage drop-down menu (if it exists). Both of these should conform to the
customization policies

Credits to Brawl Stars Wiki for this snippet, located in their Common.js page.*/

$("#PHCLink").prependTo(".page-header__contribution > div:first-child").css({"display": "inline-block"});