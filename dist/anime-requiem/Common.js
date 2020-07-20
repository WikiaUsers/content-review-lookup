/* Any JavaScript here will be loaded for all users on every page load.  */
 
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};

/* Run a bunch of display tweaks and fixes */
$(function() {
   //Change this colour to verify that your browser is loading updated js
   $('.jsupdate').css('background-color','lime');
 
   $('#mw-content-text > .noarticletext a').not('a[href*="action=edit"]').off('click');
 
   $(".category-gallery-item-text .snippet").each( function() { //loop text items in gallery
      this.innerHTML ="<img src='' alt='No photo' style='width: 105px !important;height: 100px !important;padding: 15px 20px;'>";
      this.removeAttribute("class");
   });
$(".articleSnippet").each( function() { //loop text items in gallery
      this.innerHTML ="<img src='https://images.wikia.nocookie.net/shingekinokyojin/images/b/b8/Policia_Militar.png ' alt='No photo' style='width: 105px !important;height: 100px !important;'>";
      this.removeAttribute("class");
   });
 
   $("#WikiaRecentActivity li").each( function() { //add diff links to images in Recent Wiki Activity module.
      link = $("a", this)[0].getAttribute('href', 2); //get link
      image = $("img", this)[0]; //get image
//      image.src = "http://images.wikia.com/shingekinokyojin/images/b/b8/Policia_Militar.png";
      newNode = document.createElement("a"); //create anchor for image link
      newNode.innerHTML = image.outerHTML; //copy image inside anchor
      newNode.href = link+"?diff=cur"; //append diff to url
      newNode.title="show me the change on this page";
      replacedNode = this.replaceChild(newNode, image);
    });
});
 
$(function collapsercexpanded() {
   $(".rc-conntent span.mw-collapsible-toggle-expanded").each( function() { 
     this.click(); //collapsing expanded sections on recentchanges by default.  Wikia has been notified about this problem, but have not fixed it.
   });
});