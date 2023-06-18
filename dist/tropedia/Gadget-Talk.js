$(function() {
    var tab = document.getElementById('ca-talk');
    if(!tab) return;
    var tablink = tab.getElementsByTagName('a')[0];
 
    if(!tablink) return;
    tablink.firstChild.nodeValue = 'Talk';
    if( mw.config.get("skin") === "monobook" ) {
      tablink.style.paddingLeft = ".4em";
      tablink.style.paddingRight = ".4em";
    }
});