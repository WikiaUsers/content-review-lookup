<!-- This script is specifically written to be used by the Main Page editcopy system under the Wikia New Look (WNL) , so that it follows the one-column structure of the actual Main Page.

Sannse of Wikia has explicitly granted special exceptional permission for this explicit usage of javascript to modify subpages of Main Page for the editcopy system.
http://guildwars.wikia.com/index.php?title=User_talk%3ASannse&diff=1573142&oldid=1572974

Because the purpose of this script is only to aid the visualization of the content area of Main Page proposals, it does not actually attempt to make the rest of the page look nice or similar to the Main Page. -->
<script>
/* First ensure this script is only being used on a subpage of Main Page */
var regexpMainSubPage = /^Main_Page\//;
if (regexpMainSubPage.test(wgPageName)){
var domBody = document.getElementsByTagName('BODY')[0];
domBody.className += " oasis-one-column mainpage";
}
</script>