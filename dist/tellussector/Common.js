<pre><nowiki>
/* Any JavaScript here will be loaded for all users on every page load. */

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
    var infoboxes = getElementsByClass('altline', document.getElementById('content'));
    if(infoboxes.length == 0) return;
    
    for(var k = 0; k < infoboxes.length; k++) {
        var infobox = infoboxes[k];
        var rows = infobox.getElementsByTagName('tr');
        var changeColor = false;
        
        for(var i = 0; i < rows.length; i++) {
            if(rows[i].className.indexOf('infoboxstopalt') != -1) break;
            
            var ths = rows[i].getElementsByTagName('th');
            if(ths.length > 0) continue;
            
            if(changeColor) rows[i].style.backgroundColor = '#f9f9f9';
            
            changeColor = !changeColor;
        }
    }
 }
 addOnloadHook(addAlternatingRowColors);

</nowiki></pre>