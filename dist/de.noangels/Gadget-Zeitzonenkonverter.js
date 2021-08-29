// ersetzt CE(S)T durch ME(S)Z (ohne Änderung von Seiten)
 
addOnloadHook(function () {
	function text_ersetzen(text) {
		    return text.replace(/(20\d\d) \(CE(S?)T\)/gi, '$1 (ME$2Z)');
	}
 
	function node_ersetzen(node) {
		if (node.nodeType === 3) {
			node.data = text_ersetzen(node.data);
		} else if (node.id !== 'editform') {
			for (var i = 0 ; i < node.childNodes.length ; i++) {
				node_ersetzen(node.childNodes[i]);
			}
		}
	}
 
	node_ersetzen(document.getElementById('content'));
});