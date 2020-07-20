/* Any JavaScript here will be loaded for all users on every page load. */

// BEGIN Fix "sortable" with images
(function() {
/**
* @method getInnerText
* @description Return the text representation of the specified element and its children. When an image is found, return its alt attribute
* @param {HTMLElement} el DOM element
* @type String
*/
var getInnerText = function(el){
	if (typeof el === 'string') return el;
	if (typeof el === 'undefined') return '';
	if (el.nodeType !== 1 || (el.nodeType === 1 && el.getElementsByTagName('img').lenght == 0)) {
		return (el.textContent || el.innerText || '');
	}
	var str = '',
		cs = el.childNodes;
	for (var i = 0; i < cs.length; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				if (cs[i].tagName.toLowerCase() == 'img')
					str += cs[i].alt;
				else
					str += getInnerText(cs[i]);
				break;
			case 3: //TEXT_NODE
				str += cs[i].nodeValue;
				break;
		}
	}
	return str;
};

window.ts_getInnerText = function(el) {
	return getInnerText(el);
};

})();
// END Fix "sortable" with images