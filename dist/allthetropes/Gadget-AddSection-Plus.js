$(function() {
    var tab = document.getElementById('ca-addsection');
    if(!tab) return;
    var tablink = tab.getElementsByTagName('a')[0]
 
    if(!tablink) return;
    tablink.firstChild.nodeValue = '+';
    if( skin == "monobook" ) {
      tablink.style.paddingLeft = ".4em";
      tablink.style.paddingRight = ".4em";
    }
});