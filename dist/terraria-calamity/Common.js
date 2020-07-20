 tabberOptions = {
   onLoad: function() {
     if (window.location.hash) {
       var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ');
       var currentTabber = this;
       $(".tabbernav li a", this.div).each(function(i) { 
         if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
       });
       delete currentTabber;
     }
   }
 };
 /* Source: http://www.dustindiaz.com/getelementsbyclass/ getElementsByClass,
  * which complements getElementById and getElementsByTagName, returns an array
  * of all subelements of ''node'' that are tagged with a specific CSS class
  * (''searchClass'') and are of the tag name ''tag''. If tag is null, it
  * searches for any suitable elements regardless of the tag name.  Example:
  * getElementsByClass('infobox', document.getElementById('content'), 'div')
  * selects the same elements as the CSS declaration #content div.infobox
  */
 function getElementsByClass(searchClass, node, tag) {
    var classElements = new Array();
    
    if(node == null) node = document;
    
    if(tag == null) tag = '*';
    
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var tester = new ClassTester(searchClass);
    
    for(i = 0, j = 0; i < elsLen; i++) {
        if(tester.isMatch(els[i])) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
 }
 function ClassTester(className) {
    this.regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
 }
 ClassTester.prototype.isMatch = function(element) {
    return this.regex.test(element.className);
 }
 // end getElementsByClass

 function addAlternatingRowColors() {
    var infoboxes = getElementsByClass('zebra', document.getElementById('content'));
    if(infoboxes.length == 0) return;
    
    for(var k = 0; k < infoboxes.length; k++) {
        var infobox = infoboxes[k];
        var rows = infobox.getElementsByTagName('tr');
        var changeColor = false;
        var colaras=true;
        
        for(var i = 0; i < rows.length; i++) {
            if(rows[i].className.indexOf('multicol') != -1) colaras=!colaras;
            if(rows[i].className.indexOf('head') != -1){
            changeColor=false;
            colaras=true;
            continue; 
            }
            var ths = rows[i].getElementsByTagName('th');
            if(ths.length > 0) continue;
            
            if(changeColor) rows[i].style.backgroundColor = '#581b03';
            if(colaras){
            changeColor = !changeColor;
            }
            else{
            colaras=!colaras;
            }
        }
    }
 }
 addOnloadHook(addAlternatingRowColors);