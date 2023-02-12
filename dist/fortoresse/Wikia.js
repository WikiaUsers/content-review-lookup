/*
Any JavaScript here will be loaded for all users on the oasis skin.
See MediaWiki:Common.js for scripts that affect every skin.
*/
 
/* Table of Contents
-----------------------
 * (A00) helperFunctions
 * (B00) navBarChanges
 * (Y00) importArticles
*/

//##############################################################
/* ==helperFunctions== (A00)*/
// Things to make life easier

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

//##############################################################
/* ==navBarChanges== (B00)*/
// Tweaks appearance / links on the main wiki navbar. See also Special:CSS

var forumLink = $$("nav.WikiNav [href='/wiki/Special:Forum']");

var officialForumURL = "http://atelier801.com/section?f=8&s=14";
var onTheWikiUL = forumLink.parentNode.parentNode;
var newLI = newElement("li", { class:"subnav-2-item" }, onTheWikiUL);
var newLink = newElement("a", { class:"subnav-2a offForum", inner:"Official Forum", href:officialForumURL }, newLI);
newLink.dataset.canonical = "forum2";

removeElem(forumLink);
 
//##############################################################
/* ==importArticles== (Y00)*/
// Imports scripts from other pages/wikis.
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:VisualSpellCheck/code.js'
    ]
});