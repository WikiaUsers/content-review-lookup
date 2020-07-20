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


function addAlternatingRowColors()
{
    var tables = getElementsByClass('zebra', document.getElementById('content'));
 
    if(tables.length == 0)
        return;
 
    for(var k = 0; k < tables.length; k++) {
        var table = tables[k];
        var rows = table.getElementsByTagName('tr');
        var changeColor = false;
 
        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].className.indexOf('noalt') != -1)
               continue;
            if(rows[i].className.indexOf('stopalt') != -1)
                break;
 
            var ths = rows[i].getElementsByTagName('th');
 
            if(ths.length > 0)
            {
                rows[i].className = "odd";
                changeColor = true;
            }
 
            if(changeColor)
                rows[i].className = "odd";
            else
                rows[i].className = "even";
 
            changeColor = !changeColor;
        }
    }
}
addOnloadHook(addAlternatingRowColors);