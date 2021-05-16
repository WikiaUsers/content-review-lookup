/*********************************/
/* Page Credit to Simon Lovelace */
/*********************************/
// Documents
const w         = window;
const W         = window;
const D         = document;
const d         = document;
const Doc       = document;
const doc       = document;
//Elements
const dElem = document.documentElement;
// Ids, Classes, Tags
document.getElementsById		= D.getElementById.bind(document);
document.getElementByClassName	= document.getElementsByClassName.bind(document);
document.getElementByTagName	= document.getElementsByTagName.bind(document);
const gId           			= document.getElementById.bind(document);
const getId         			= gId;
const gClass        			= document.getElementsByClassName.bind(document);
const gClassName    			= gClass;
const getClass      			= gClass;
const getClassName  			= gClass;
const gTag          			= document.getElementsByTagName.bind(document);
const gTagName      			= gTag;
const getTag        			= gTag;
const getTagName    			= gTag;
const gTagNameNS    			= document.getElementsByTagNameNS.bind(document);
const gTagNS        			= document.getElementsByTagNameNS.bind(document);
const getTagNameNS  			= document.getElementsByTagNameNS.bind(document);
// Document.G(Id, ClassName, TagName, TagNameNS) 
document.gId          = document.getElementById.bind(document);
document.getId        = document.gId;
document.gClass       = document.getElementsByClassName.bind(document);
document.gClassName   = document.gClass;
document.getClass     = document.gClass;
document.getClassName = document.gClass;
document.gTag         = document.getElementsByTagName.bind(document);
document.gTagName     = document.gTag;
document.getTag       = document.gTag;
document.getTagName   = document.gTag;
document.gTagNameNS   = document.getElementsByTagNameNS.bind(document);
document.gTagNS       = document.gTagNameNS;
document.getTagNameNS = document.gTagNameNs;
// Query Selectors
const $     = document.querySelector.bind(document);
const qSel  = $;
const $$    = document.querySelectorAll.bind(document);
const qSelA = $$;
const A$    = $('*');
const C$    = document.getElementsByClassName.bind(document);
const I$    = document.getElementById.bind(document);
const T$    = document.getElementsByTagName.bind(document);
// Math Constants
const E         = Math.E;
const SQRT2     = Math.SQRT2;
const SQRT1_2   = Math.SQRT1_2;
const LN2       = Math.LN2;
const LN10      = Math.LN10;
const LOG2E     = Math.LOG2E;
const PI        = Math.PI;
const PHI       = (1 + Math.sqrt(5) ) / 2;
Math .PHI       = PHI;
// Math Methods
const Abs = Math.abs;
const Factorial = function (FACT) {var FACT_ = 1; for (var F = 2; F <= FACT; F++) FACT_ = FACT_ * F; return FACT_;};
Math.factorial  = Factorial;
const Logbase   = function (base, logorithm) { return (Math.log(logorithm)) / (Math.log(base)) };
Math.logbase    = Logbase;
const Inv       = function (d) { return ( 1 / d ) }; 
Math.inv        = Inv;
// Creating things
const cAttrib           = document.createAttribute.bind(document);
const cAttribNS         = document.createAttributeNS.bind(document);
const cCdataSect        = document.createCDATASection.bind(document);
const cComment          = document.createComment.bind(document);
const cFragment         = document.createDocumentFragment.bind(document);
const cElement          = document.createElement.bind(document);
const cElementNS        = document.createElementNS.bind(document);
const cEvent            = document.createEvent.bind(document);
const cExpress          = document.createExpression.bind(document);
const cNodeIterator     = document.createNodeIterator.bind(document);
const cNSResolve        = document.createNSResolver.bind(document);
const cProgressInstruct = document.createProcessingInstruction.bind(document);
const cRange            = document.createRange.bind(document);
const cText             = document.createTextNode.bind(document);
const cTouch            = document.createTouch;
const cTouchList        = document.createTouchList;
const cTreeWalker       = document.createTreeWalker.bind(document);
// Nodes
const NodeP   = Node.prototype;
NodeP.xChild  = NodeP.removeChild;
NodeP.reChild = NodeP.replaceChild;
NodeP.AEL     = NodeP.addEventListener;
window.AEL    = window.addEventListener;
NodeP.iBefore = NodeP.insertBefore;
NodeP.append  = NodeP.appendChild;
NodeP.IAH     = NodeP.insertAdjacentHTML;