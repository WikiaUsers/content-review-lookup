/* 此处的JavaScript将加载于所有用户每一个页面。 */
importScriptPage('ShowHide/code.js', 'dev');

if (document.body.className.indexOf('ns-0') >= 0) {
    // Main namespace
    var content = document.getElementById('mw-content-text');

    if (!/(?:^Editing|Reputation|Challenges) /.test(document.title) && $('.categories').get(0).innerHTML.indexOf('PAYDAY 1') !== -1) {
        // Make each '$' link to [[Reputation]]
        var treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        var textNodes = [];
        while (treeWalker.nextNode()) {
            textNodes.push(treeWalker.currentNode);
        }
        
        for (var i = 0; i < textNodes.length; i++) {
            var textNode = textNodes[i];
            var idx = textNode.nodeValue.indexOf('$');
            if (idx !== -1) {
                var newTextNode = document.createTextNode(textNode.nodeValue.substring(idx + 1));
                textNode.nodeValue = textNode.nodeValue.substring(0, idx);
     
                var a = document.createElement('a');
                a.href = '/wiki/Reputation';
                a.appendChild(document.createTextNode('$'));
     
                var nextSibling = textNode.nextSibling;
                if (nextSibling) {
                    textNode.parentNode.insertBefore(a, nextSibling);
                    textNode.parentNode.insertBefore(newTextNode, nextSibling);
                } else {
                    textNode.parentNode.appendChild(a);
                    textNode.parentNode.appendChild(newTextNode);
                }
            }
        }
    }
}

$(document).ready(function() {
    var table = document.getElementById('bigOilEngines');
    if (!table) return;

    $('input[name^="bigoil-"]').change(function(evt) {
        var attr = 'data-' + evt.currentTarget.name;
        evt.currentTarget.value ? table.setAttribute(attr, evt.currentTarget.value) : table.removeAttribute(attr);
    });
    document.getElementById('bigOilInputs').style.display = '';
});