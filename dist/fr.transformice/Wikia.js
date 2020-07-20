// Uses $$ so it returns a javascript object, not a jquery one.
function $$(query, parent/*optional*/) { return (parent ? parent : document).querySelector(query); }
function $$A(query, parent/*optional*/) { return (parent ? parent : document).querySelectorAll(query); }
 
function forEach(collection, callback){ if(collection != undefined) { Array.prototype.forEach.call(collection, callback); } }
 
// Creates a new HTML element (not jQuery) with specific attributes
function newElement(tag, attributes, parent) {
	var element = document.createElement(tag);
	if(attributes != undefined) {
		if(attributes.class != undefined) { attributes.className = attributes.class; attributes.class = undefined; }
		if(attributes.inner != undefined) { attributes.innerHTML = attributes.inner; attributes.inner = undefined; }
		for(var key in attributes) {
			element[key] = attributes[key];
		}
	}
	if(parent != undefined) parent.appendChild(element);
	return element;
}
 
function removeElem(elem) {
	elem.parentNode.removeChild(elem);
}

/*Lien vers le forum officiel dans la barre de navigation*/
var forumLink = $$("nav.WikiNav [href='/wiki/Sp%C3%A9cial:Forum']");
 
var officialForumURL = "http://atelier801.com/forums";
var onTheWikiUL = forumLink.parentNode.parentNode;
var newLI = newElement("li", { class:"subnav-2-item" }, onTheWikiUL);
var newLink = newElement("a", { class:"subnav-2a offForum", inner:"Forum officiel", href:officialForumURL }, newLI);
newLink.dataset.canonical = "forum2";
 
removeElem(forumLink);