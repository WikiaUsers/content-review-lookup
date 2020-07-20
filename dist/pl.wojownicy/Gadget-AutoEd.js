//<pre><nowiki>
//This script does not function without additional "helper" modules!
//Please see [[Wikipedia:AutoEd]] for details on use.
//Podrasowany przez SH3VEK, Nonsensopedia
//Initiates AutoEd
function autoEdExecute() {
 if(!document.getElementById('wpTextbox1')) return;
 // copy wikEd ([[User:Cacycle/wikEd.js]]) frame to wpTextbox1 textarea
 // for compatibility with WikiEd
 if (typeof(wikEdUseWikEd) != 'undefined') {
   if (wikEdUseWikEd == true) {
     WikEdUpdateTextarea();
   }
 }
 //alert/return if autoEdFunctions is not defined
 if( typeof( autoEdFunctions ) == 'undefined' ) {
  alert('AutoEd/core.js: autoEdFunctions is undefined');
  return;
 }
 autoEdFunctions();
 autoEdEditSummary();
 // copy wpTextbox1 textarea back to wikEd frame
 // for compatibility with WikiEd
 if (typeof(wikEdUseWikEd) != 'undefined') {
  if (wikEdUseWikEd == true) {
   WikEdUpdateFrame();
  }
 }
}
//Adds Tag to edit summary textbox
function autoEdEditSummary() {
 var txt = document.forms.editform.wpSummary;
 if( typeof( autoEdTag ) == 'undefined' ) {
  var tag = "Poprawki same się robią...";
 } else {
  var tag = autoEdTag;
 }
 // Is the tag blank?
 if( tag.match(/[^\s]/) ) {
  // Has it already been tagged?
  if( txt.value.indexOf(tag) == -1 ) {
   // Append a pipe if necessary
   if( txt.value.match(/[^\*\/\s][^\/\s]?\s*$/) ) {
    txt.value += " | ";
   }
   // Append our tag
   txt.value += tag;
  }
 }
 // Check 'This is a minor edit'
 if( typeof( autoEdMinor ) == 'undefined' || autoEdMinor ) {
  document.forms.editform.wpMinoredit.checked = true;
 }
 // Click 'Show changes'
 if( typeof( autoEdClick ) == 'undefined' || autoEdClick ) {
  document.forms.editform.wpDiff.click();
 }
}
//Allows URI to be properly decoded for AutoEd in View Mode
function autoEdQueryString(p) {
 var re = RegExp('[&?]' + p + '=([^&]*)');
 var matches;
 if (matches = re.exec(document.location)) {
  try {
   return decodeURI(matches[1]);
  } catch (e) {
  }
 }
 return null;
}
// Add "auto ed" tab and associate with actions
$(document).ready(function () {
 //Execute AutoEd after call from "view mode"
 if( autoEdQueryString('AutoEd') ) {
  autoEdExecute();
 }
 // Set default values for any unset variables
 if( typeof( autoEdLinkHover ) == 'undefined' ) {
  autoEdLinkHover = "Uruchom AutoEd";
 }
 if( typeof( autoEdLinkName ) == 'undefined' ) {
  autoEdLinkName = "AutoEd";
 }
 if( typeof( autoEdLinkLocation ) == 'undefined' ) {
  autoEdLinkLocation = "p-cactions";
 }
 //Add the "auto ed" tab
 if( typeof( document.forms.editform) != 'undefined' ) {
  addPortletLink( autoEdLinkLocation, 'javascript:autoEdExecute()', autoEdLinkName,
                 'ca-AutoEd', autoEdLinkHover, '', document.getElementById('ca-move'));
 } else if (wgIsArticle && document.getElementById('ca-edit') && wgAction == "view") {
  var url = wgServer + wgScript + '?title=' + encodeURIComponent(wgPageName) + '&action=edit';
  addPortletLink( autoEdLinkLocation, url + '&AutoEd=true', autoEdLinkName,
                 'ca-AutoEd', autoEdLinkHover, '', document.getElementById('ca-move'));
 } //End view-mode/edit-mode if
});
 
/* autoEdUnicodify() 
 * converts HTML entities to WikiText
 */
function autoEdUnicodify(str) { //MAIN FUNCTION describes list of fixes
 
 // Task 1: Replace named html entities with unicode
 
 // Most common replacements
 str = str.replace(/&mdash;/gi, '—');
 str = str.replace(/&ndash;/gi, '–');
 str = str.replace('-', '–');
 // Case insensitive symbols
 if(str.search(/&[a-z][a-z]+[0-9]*;/i) >= 0) {
  //XML and HTML Symbols
  str = str.replace(/&hellip;/gi, '...');
  str = str.replace(/&plus;/gi, '+');
  str = str.replace(/&plusmn;/gi, '±');
  str = str.replace(/&minus;/gi, '−');
  str = str.replace(/&times;/gi, '×');
  str = str.replace(/&divide;/gi, '÷');
  str = str.replace(/&ne;/gi, '≠');
  str = str.replace(/&asymp;/gi, '≈');
  str = str.replace(/&le;/gi, '≤');
  str = str.replace(/&ge;/gi, '≥');
  str = str.replace(/&quot;/gi, '"'); // "
  str = str.replace(/&apos;/gi, "'"); // '
  str = str.replace(/&iexcl;/gi, '¡');
  str = str.replace(/&cent;/gi, '¢');
  str = str.replace(/&pound;/gi, '£');
  str = str.replace(/&curren;/gi, '¤');
  str = str.replace(/&yen;/gi, '¥');
  str = str.replace(/&brvbar;/gi, '¦');
  str = str.replace(/&sect;/gi, '§');
  str = str.replace(/&uml;/gi, '¨');
  str = str.replace(/&copy;/gi, '©');
  str = str.replace(/&ordf;/gi, 'ª');
  str = str.replace(/&laquo;/gi, '«');
  str = str.replace(/&not;/gi, '¬');
  str = str.replace(/&reg;/gi, '®');
  str = str.replace(/&macr;/gi, '¯');
  str = str.replace(/&deg;/gi, '°');
  str = str.replace(/&sup2;/gi, '²');
  str = str.replace(/&sup3;/gi, '³');
  str = str.replace(/&acute;/gi, '´');
  str = str.replace(/&micro;/gi, 'µ');
  str = str.replace(/&para;/gi, '¶');
  str = str.replace(/&middot;/gi, '·');
  str = str.replace(/&cedil;/gi, '¸');
  str = str.replace(/&sup1;/gi, '¹');
  str = str.replace(/&ordm;/gi, 'º');
  str = str.replace(/&raquo;/gi, '»');
  str = str.replace(/&frac14;/gi, '¼');
  str = str.replace(/&frac12;/gi, '½');
  str = str.replace(/&frac34;/gi, '¾');
  str = str.replace(/&iquest;/gi, '¿');
  str = str.replace(/&circ;/gi, 'ˆ');
  str = str.replace(/&tilde;/gi, '˜');
  str = str.replace(/&lsquo;/gi, '‘');
  str = str.replace(/&rsquo;/gi, '’');
  str = str.replace(/&sbquo;/gi, '‚');
  str = str.replace(/&ldquo;/gi, '“');
  str = str.replace(/&rdquo;/gi, '”');
  str = str.replace(/&bdquo;/gi, '„');
  str = str.replace(/&bull;/gi, '•');
  str = str.replace(/&permil;/gi, '‰');
  str = str.replace(/&lsaquo;/gi, '‹');
  str = str.replace(/&rsaquo;/gi, '›');
  str = str.replace(/&oline;/gi, '‾');
  str = str.replace(/&frasl;/gi, '⁄');
  str = str.replace(/&euro;/gi, '€');
  str = str.replace(/&image;/gi, 'ℑ');
  str = str.replace(/&weierp;/gi, '℘');
  str = str.replace(/&real;/gi, 'ℜ');
  str = str.replace(/&trade;/gi, '™');
  str = str.replace(/&alefsym;/gi, 'ℵ');
  str = str.replace(/&crarr;/gi, '↵');
  str = str.replace(/&forall;/gi, '∀');
  str = str.replace(/&part;/gi, '∂');
  str = str.replace(/&exist;/gi, '∃');
  str = str.replace(/&empty;/gi, '∅');
  str = str.replace(/&nabla;/gi, '∇');
  str = str.replace(/&isin;/gi, '∈');
  str = str.replace(/&notin;/gi, '∉');
  str = str.replace(/&ni;/gi, '∋');
  str = str.replace(/&prod;/gi, '∏');
  str = str.replace(/&sum;/gi, '∑');
  str = str.replace(/&lowast;/gi, '∗');
  str = str.replace(/&radic;/gi, '√');
  str = str.replace(/&prop;/gi, '∝');
  str = str.replace(/&infin;/gi, '∞');
  str = str.replace(/&ang;/gi, '∠');
  str = str.replace(/&and;/gi, '∧');
  str = str.replace(/&or;/gi, '∨');
  str = str.replace(/&cap;/gi, '∩');
  str = str.replace(/&cup;/gi, '∪');
  str = str.replace(/&int;/gi, '∫');
  str = str.replace(/&there4;/gi, '∴');
  str = str.replace(/&sim;/gi, '∼');
  str = str.replace(/&cong;/gi, '≅');
  str = str.replace(/&sub;/gi, '⊂');
  str = str.replace(/&sup;/gi, '⊃');
  str = str.replace(/&nsub;/gi, '⊄');
  str = str.replace(/&sube;/gi, '⊆');
  str = str.replace(/&supe;/gi, '⊇');
  str = str.replace(/&oplus;/gi, '⊕');
  str = str.replace(/&otimes;/gi, '⊗');
  str = str.replace(/&perp;/gi, '⊥');
  str = str.replace(/&sdot;/gi, '⋅');
  str = str.replace(/&lceil;/gi, '⌈');
  str = str.replace(/&rceil;/gi, '⌉');
  str = str.replace(/&lfloor;/gi, '⌊');
  str = str.replace(/&rfloor;/gi, '⌋');
  str = str.replace(/&lang;/gi, '〈');
  str = str.replace(/&rang;/gi, '〉');
  str = str.replace(/&loz;/gi, '◊');
  str = str.replace(/&spades;/gi, '♠');
  str = str.replace(/&clubs;/gi, '♣');
  str = str.replace(/&hearts;/gi, '♥');
  str = str.replace(/&diams;/gi, '♦');
}
 
// Uppercase symbols
 if(str.search(/&[A-Z][a-z]+;/) >= 0) {
  //Greek symbols
  str = str.replace(/&Alpha;/g, 'Α');
  str = str.replace(/&Beta;/g, 'Β');
  str = str.replace(/&Gamma;/g, 'Γ');
  str = str.replace(/&Delta;/g, 'Δ');
  str = str.replace(/&Epsilon;/g, 'Ε');
  str = str.replace(/&Zeta;/g, 'Ζ');
  str = str.replace(/&Eta;/g, 'Η');
  str = str.replace(/&Theta;/g, 'Θ');
  str = str.replace(/&Iota;/g, 'Ι');
  str = str.replace(/&Kappa;/g, 'Κ');
  str = str.replace(/&Lambda;/g, 'Λ');
  str = str.replace(/&Mu;/g, 'Μ');
  str = str.replace(/&Nu;/g, 'Ν');
  str = str.replace(/&Xi;/g, 'Ξ');
  str = str.replace(/&Omicron;/g, 'Ο');
  str = str.replace(/&Pi;/g, 'Π');
  str = str.replace(/&Rho;/g, 'Ρ');
  str = str.replace(/&Sigma;/g, 'Σ');
  str = str.replace(/&Tau;/g, 'Τ');
  str = str.replace(/&Upsilon;/g, 'Υ');
  str = str.replace(/&Phi;/g, 'Φ');
  str = str.replace(/&Chi;/g, 'Χ');
  str = str.replace(/&Psi;/g, 'Ψ');
  str = str.replace(/&Omega;/g, 'Ω');
  //Latin symbols
  str = str.replace(/&Agrave;/g, 'À');
  str = str.replace(/&Aacute;/g, 'Á');
  str = str.replace(/&Acirc;/g, 'Â');
  str = str.replace(/&Atilde;/g, 'Ã');
  str = str.replace(/&Auml;/g, 'Ä');
  str = str.replace(/&Aring;/g, 'Å');
  str = str.replace(/&AElig;/g, 'Æ');
  str = str.replace(/&Ccedil;/g, 'Ç');
  str = str.replace(/&Egrave;/g, 'È');
  str = str.replace(/&Eacute;/g, 'É');
  str = str.replace(/&Ecirc;/g, 'Ê');
  str = str.replace(/&Euml;/g, 'Ë');
  str = str.replace(/&Igrave;/g, 'Ì');
  str = str.replace(/&Iacute;/g, 'Í');
  str = str.replace(/&Icirc;/g, 'Î');
  str = str.replace(/&Iuml;/g, 'Ï');
  str = str.replace(/&Ntilde;/g, 'Ñ');
  str = str.replace(/&Ograve;/g, 'Ò');
  str = str.replace(/&Oacute;/g, 'Ó');
  str = str.replace(/&Ocirc;/g, 'Ô');
  str = str.replace(/&Otilde;/g, 'Õ');
  str = str.replace(/&Ouml;/g, 'Ö');
  str = str.replace(/&Oslash;/g, 'Ø');
  str = str.replace(/&Ugrave;/g, 'Ù');
  str = str.replace(/&Uacute;/g, 'Ú');
  str = str.replace(/&Ucirc;/g, 'Û');
  str = str.replace(/&Uuml;/g, 'Ü');
  str = str.replace(/&Yacute;/g, 'Ý');
  str = str.replace(/&Scaron;/g, 'Š');
  str = str.replace(/&Yuml;/g, 'Ÿ');
  //XML and HTML Symbols
  str = str.replace(/&Dagger;/g, '‡');
  str = str.replace(/&Prime;/g, '″');
}
 
// lowercase symbols
 if(str.search(/&[a-z][a-z]+;/) >= 0) {
  //Greek symbols
  str = str.replace(/&alpha;/g, 'α');
  str = str.replace(/&beta;/g, 'β');
  str = str.replace(/&gamma;/g, 'γ');
  str = str.replace(/&delta;/g, 'δ');
  str = str.replace(/&epsilon;/g, 'ε');
  str = str.replace(/&zeta;/g, 'ζ');
  str = str.replace(/&eta;/g, 'η');
  str = str.replace(/&theta;/g, 'θ');
  str = str.replace(/&iota;/g, 'ι');
  str = str.replace(/&kappa;/g, 'κ');
  str = str.replace(/&lambda;/g, 'λ');
  str = str.replace(/&mu;/g, 'μ');
  str = str.replace(/&nu;/g, 'ν');
  str = str.replace(/&xi;/g, 'ξ');
  str = str.replace(/&omicron;/g, 'ο');
  str = str.replace(/&pi;/g, 'π');
  str = str.replace(/&rho;/g, 'ρ');
  str = str.replace(/&sigmaf;/g, 'ς');
  str = str.replace(/&sigma;/g, 'σ');
  str = str.replace(/&tau;/g, 'τ');
  str = str.replace(/&upsilon;/g, 'υ');
  str = str.replace(/&phi;/g, 'φ');
  str = str.replace(/&chi;/g, 'χ');
  str = str.replace(/&psi;/g, 'ψ');
  str = str.replace(/&omega;/g, 'ω');
  str = str.replace(/&thetasym;/g, 'ϑ');
  str = str.replace(/&upsih;/g, 'ϒ');
  str = str.replace(/&piv;/g, 'ϖ');
  //Latin symbols
  str = str.replace(/&szlig;/g, 'ß');
  str = str.replace(/&agrave;/g, 'à');
  str = str.replace(/&aacute;/g, 'á');
  str = str.replace(/&acirc;/g, 'â');
  str = str.replace(/&atilde;/g, 'ã');
  str = str.replace(/&auml;/g, 'ä');
  str = str.replace(/&aring;/g, 'å');
  str = str.replace(/&aelig;/g, 'æ');
  str = str.replace(/&ccedil;/g, 'ç');
  str = str.replace(/&egrave;/g, 'è');
  str = str.replace(/&eacute;/g, 'é');
  str = str.replace(/&ecirc;/g, 'ê');
  str = str.replace(/&euml;/g, 'ë');
  str = str.replace(/&igrave;/g, 'ì');
  str = str.replace(/&iacute;/g, 'í');
  str = str.replace(/&icirc;/g, 'î');
  str = str.replace(/&iuml;/g, 'ï');
  str = str.replace(/&eth;/g, 'ð');
  str = str.replace(/&ntilde;/g, 'ñ');
  str = str.replace(/&ograve;/g, 'ò');
  str = str.replace(/&oacute;/g, 'ó');
  str = str.replace(/&ocirc;/g, 'ô');
  str = str.replace(/&otilde;/g, 'õ');
  str = str.replace(/&ouml;/g, 'ö');
  str = str.replace(/&oslash;/g, 'ø');
  str = str.replace(/&ugrave;/g, 'ù');
  str = str.replace(/&uacute;/g, 'ú');
  str = str.replace(/&ucirc;/g, 'û');
  str = str.replace(/&uuml;/g, 'ü');
  str = str.replace(/&yacute;/g, 'ý');
  str = str.replace(/&thorn;/g, 'þ');
  str = str.replace(/&yuml;/g, 'ÿ');
  str = str.replace(/&oelig;/g, 'œ');
  str = str.replace(/&scaron;/g, 'š');
  str = str.replace(/&fnof;/g, 'ƒ');
  //XML and HTML Symbols
  str = str.replace(/&dagger;/g, '†');
  str = str.replace(/&prime;/g, '′');
 }
 
 // False positives
 // Breaks large amounts of code which discuss programming/scripting.
 // str = str.replace(/&lt;/gi, '<');
 // str = str.replace(/&gt;/gi, '>');
 // Breaks large number of URLs and discussion of programming/scripting.
 // str = str.replace(/&amp;/gi, '&');
 
 // Arrows
 str = str.replace(/&larr;/g, '←');
 str = str.replace(/&rarr;/g, '→');
 str = str.replace(/&uarr;/g, '↑');
 str = str.replace(/&darr;/g, '↓');
 str = str.replace(/&lArr;/g, '⇐');
 str = str.replace(/&rArr;/g, '⇒');
 str = str.replace(/&uArr;/g, '⇑');
 str = str.replace(/&dArr;/g, '⇓');
 str = str.replace(/&harr;/g, '↔');
 str = str.replace(/&hArr;/g, '⇔');
 str = str.replace(/<==|<--/gi, '←');
 str = str.replace(/==>/gi, '→');
 
 // Specific case
 str = str.replace(/&ETH;/g, 'Ð');
 str = str.replace(/&THORN;/g, 'Þ');
 str = str.replace(/&OElig;/g, 'Œ');
 
 
 // Task 2: Replace numeric html entities with unicode ( User:CharlotteWebb )
 
 // Symbols for which there may be a good reason to obfuscate/escape
 var dont_replace = "|!{}[]=<>";
 
 // START specialreplace function from User:CharlotteWebb
 function specialreplace(ent, base){
  var chr = "";
  var num = parseInt(ent.replace(/[\&\#\;x]/g, ''), base);
  // see [[UTF-16]] for chars outside the BMP
  // try this with Gothic letters at full volume ^_^
  if (num > 0xFFFF) {
   num -= 0x10000;
   chr = String.fromCharCode(0xD800 + (num >> 10), 0xDC00 + (num & 0x3FF));  
  } else {
   chr = String.fromCharCode(num);
  }
  if (dont_replace.indexOf(chr) == -1) {
   str = str.replace(ent, chr, "gi");
  }
 }
 // END specialreplace function
 
 // perform replacement
 if(m = str.match(/\&\#(\d+)\;/g)) {
  for(i = 0; i < m.length; i++) {
   specialreplace(m[i], 10);
  }
 }
 if(m = str.match(/\&\#x([\da-f]+)\;/gi)) {
  for(i = 0; i < m.length; i++) { 
   specialreplace(m[i], 16);
  }
 }
 
 // Task 3: Unprintable control characters [[Windows-1252]] from User:CharlotteWebb
 var failstr = "<!-- AutoEd: rm unicode ctrl char w/no win-1252 mapping, intent unknown -->";
 str = str.replace(/\u0080/g, '€');
 str = str.replace(/\u0081/g, failstr);
 str = str.replace(/\u0082/g, '‚');
 str = str.replace(/\u0083/g, 'ƒ');
 str = str.replace(/\u0084/g, '„');
 str = str.replace(/\u0085/g, '…');
 str = str.replace(/\u0086/g, '†');
 str = str.replace(/\u0087/g, '‡');
 str = str.replace(/\u0088/g, 'ˆ');
 str = str.replace(/\u0089/g, '‰');
 str = str.replace(/\u008a/g, 'Š');
 str = str.replace(/\u008b/g, '‹');
 str = str.replace(/\u008c/g, 'Œ');
 str = str.replace(/\u008d/g, failstr);
 str = str.replace(/\u008e/g, 'Ž');
 str = str.replace(/\u008f/g, failstr);
 str = str.replace(/\u0090/g, failstr);
 str = str.replace(/\u0091/g, '‘');
 str = str.replace(/\u0092/g, '’');
 str = str.replace(/\u0093/g, '“');
 str = str.replace(/\u0094/g, '”');
 str = str.replace(/\u0095/g, '•');
 str = str.replace(/\u0096/g, '–');
 str = str.replace(/\u0097/g, '—');
 str = str.replace(/\u0098/g, '˜');
 str = str.replace(/\u0099/g, '™');
 str = str.replace(/\u009a/g, 'š');
 str = str.replace(/\u009b/g, '›');
 str = str.replace(/\u009c/g, 'œ');
 str = str.replace(/\u009d/g, failstr);
 str = str.replace(/\u009e/g, 'ž');
 str = str.replace(/\u009f/g, 'Ÿ');
 
 return str;
}
/* autoEdISBN()
 * fixes ISBN syntax so that WikiMagic can work
 */
function autoEdISBN(str) { //MAIN FUNCTION describes list of fixes
 
    //Allows WikiMagic to work with ISBNs
    str = str.replace(/ISBN-10:|ISBN-13:|ISBN-10|ISBN-13|ISBN:/gi, 'ISBN');
 
    return str;
}
/* autoEdWhitespace()
 * cleans up whitespace
 */
function autoEdWhitespace(str) { //MAIN FUNCTION describes list of fixes
 
    str = str.replace(/\t/g, " ");
 
    str = str.replace(/^ ? ? \n/gm, "\n");
    str = str.replace(/(\n\n)\n+/g, "$1");
    str = str.replace(/== ? ?\n\n==/g, "== \n ==");
    str = str.replace(/\n\n(\* ?\[?http)/g, "\n$1");
 
    str = str.replace(/^ ? ? \n/gm, "\n");
    str = str.replace(/\n\n\*/g, "\n*");
    str = str.replace(/[ \t][ \t]+/g, " ");
    str = str.replace(/([=\n]\n)\n+/g, "$1");
    str = str.replace(/ \n/g, "\n");
 
    //* bullet points
    str = str.replace(/^([\*#]+:*) /gm, "$1");
    str = str.replace(/^([\*#]+:*)/gm, "$1 ");
 
    //==Headings==
    str = str.replace(/^(={1,4}) ?(.*?) ?(={1,4})$/gm, "$1 $2 $3");
    return str;
}
/* autoEdWikilinks()
 * simplifies and shortens wikilinks where appropriate
 * Credits: A modification of [[Wikipedia:WikiProject User scripts/Scripts/Formatter]]
 */
function autoEdWikilinks(str) { //MAIN FUNCTION describes list of fixes
 
 //Get the list of all wikilinks with underscores
 var m = str.match(/\[\[[^\[\]]*_[^\[\]]*\]\]/g);
 if (m) {
  //For each wikilink in the list
  for (var i = 0; i < m.length; i++) {
   var x = m[i].toString() // Contains the entire wikilink
   // Exclude URLs and leading underscores
   if( !x.match(/^\[\[[\t ]*(?:http|ftp|https):/i) && !x.match(/^\[\[_[^\[\]]*\]\]/) ) {
    var x_arr = x.match(/^(\[\[[^\[\]\|]*)(\|?[^\[\]]*?\]\])$/);
    var a = x_arr[1]; // Everything before the pipe (or everything minus ]])
    var b = x_arr[2]; // Everything after the pipe (or ]])
 
    // Replace underscores with spaces
    a = a.replace(/_/g, ' ');
    // Do the replacement
    str = str.replace(x, a+b);
   }
  }
 }
 
 //Fix links which have no target
 str = str.replace(/\[\[[\t ]*\|/gi, '[[');
 
 //Leading and trailing space before the pipe inside wikilinks
 str=str.replace(/(\[\[)[\t ]+([^\[\]\|]*?)(\|)/g, '$1$2$3');
 str=str.replace(/(\[\[)([^\[\]\|]*?)[\t ]+(\|)/g, '$1$2$3');
 //Leading space after the pipe (or in an unpiped) wikilink
 str=str.replace(/^(\[\[[^\[\]\|]*?\||\[\[)[\t ]+([^\[\]\|\t ][^\[\]\|]*?)(\]\])/g, '$1$2$3');
 str=str.replace(/(\[\[[^\[\]\|]*?\||\[\[)[\t ]+([^\[\]\|\t ][^\[\]\|]*?)(\]\])/g, ' $1$2$3');
 //Trailing space after the pipe (or in an unpiped) wikilink
 str=str.replace(/(\[\[[^\[\]\|]*?\||\[\[)([^\[\]\|\t ][^\[\]\|]*?)[\t ]+(\]\])([^A-Za-z])/gi, '$1$2$3 $4');
 str=str.replace(/(\[\[[^\[\]\|]*?\||\[\[)([^\[\]\|]*?)[\t ]+(\]\])$/gi, '$1$2$3');
 
 //Get the list of all piped wikilinks
 var m = str.match(/\[\[[^\[]*?\|[^\[]*?\]\]/g);
 if (m) {
  //For each piped wikilink in the list
  for (var i = 0; i < m.length; i++) {
   var n_arr = m[i].toString().match(/\[\[[ ]*([^\[]*?)\|[ ]*([^\[]*?)\]\]/);
   var n = n_arr[0]; // Contains the entire piped link
   var a = n_arr[1]; // Contains everything before pipe
   var b = n_arr[2]; // Contains everything after pipe
   var c = b.replace(/[\.,:; ]*$/); // Same as b, but without trailing punctuation
   //Is the display name a leading substring of the wikilink?
   if (b.indexOf(a) == 0 || b.indexOf(autoEd_first2lower(a)) == 0) {
    //Create a simplified replacement string
    var k = n.replace(/\[\[([^\]\|]*?)\|(\1)([\w]*?)\]\]/i, "[[$2]]$3");
    //And do the replacement
    str = str.replace(n, k);
   }
   if (c.indexOf(a) == 0 || c.indexOf(autoEd_first2lower(a)) == 0) {
    // Create a simplified replacement string
    var k = n.replace(/\[\[([^\]\|]*?)\|(\1)([\w\.,:;]*?)\]\]/i, "[[$2]]$3");
    // And do the replacement
    str = str.replace(n, k);
   }
  }
 }
 
 //Push trailing characters into display string of piped wikilinks
 str = str.replace(/\[\[([^\[\]\|]+)\|([^\[\]\|]+)\]\]([a-z]+)/g, "[[$1|$2$3]]");
 
 //Removes links to current article
 var p1 = wgPageName;                  // PAGENAME including underscores
 var p2 = wgPageName.replace('_',' '); // PAGENAME without underscores
 var p3 = autoEd_first2lower(p1);      // First character lowercase PAGENAME including underscores
 var p4 = autoEd_first2lower(p2);      // First character lowercase PAGENAME without underscores
 // Standard wikilinks
 str = str.replace(new RegExp('\\[\\[(' + p1 + '|' + p2 + '|' + p3 + '|' + p4 + ')\\]\\]', 'g'), '$1');
 // Piped wikilinks
 str = str.replace(new RegExp('\\[\\[(?:' + p1 + '|' + p2 + '|' + p3 + '|' + p4 + ')\\|([^\\]\\|]*)\\]\\]', 'g'), '$1');
 
 //Shorten interwiki links
 str = str.replace(/\[\[WIKTIONARY:/gi, '[[wikt:');
 str = str.replace(/\[\[WIKINEWS:/gi, '[[n:');
 str = str.replace(/\[\[WIKIBOOKS:/gi, '[[b:');
 str = str.replace(/\[\[WIKIQUOTE:/gi, '[[q:');
 str = str.replace(/\[\[WIKISOURCE:/gi, '[[s:');
 str = str.replace(/\[\[WIKISPECIES:/gi, '[[species:');
 str = str.replace(/\[\[WIKIVERSITY:/gi, '[[v:');
 str = str.replace(/\[\[(?:WIKIMEDIA|FOUNDATION):/gi, '[[wmf:');
 str = str.replace(/\[\[METAWIKIPEDIA:/gi, '[[m:');
 
 //Replace [[Foo #bar]] -> [[Foo#bar]]
 str = str.replace(/\[\[([^\]]*?)( |_)+#([^\]]*?)\]\]/g, '[[$1#$3]]');
 
 //Replace [[Foo|]] -> [[Foo| ]]
 str = str.replace(/\|\]\]/g, '| ]]');
 
 return str;
}
 
// Converts the first character in a string to lower case
// Notes: Used by autoEdWikilinks
function autoEd_first2lower(str) {
 if (str != "") {
  var letter = str.substr(0, 1);
  return letter.toLowerCase() + str.substr(1, str.length);
 } else {
  return "";
 }
}
/* autoEdHTMLtoWikitext()
 * converts HTML to wikitext
 */
function autoEdHTMLtoWikitext(str) {
  // <b>, <strong>, <i>, and <em> tags
  str = str.replace(/<(B|STRONG)[ ]*>((?:[^<>]|<[a-z][^<>]*\/>|<([a-z]+)(?:| [^<>]*)>[^<>]*<\/\3>)*?)<\/\1[ ]*>/gi,  "'''$2'''");
  str = str.replace(/<(I|EM)[ ]*>((?:[^<>]|<[a-z][^<>]*\/>|<([a-z]+)(?:| [^<>]*)>[^<>]*<\/\3>)*?)<\/\1[ ]*>/gi,  "''$2''");
  // </br>, <\br>, <br\>, <BR />, ...
  str = str.replace(/<[\\\/]+BR[\\\/\s]*>/gim, '<br />');
  str = str.replace(/<[\\\/\s]*BR[\s]*[\\\/]+[\s]*>/gim, '<br />');
  // <.br>, <br.>, <Br>, ...
  str = str.replace(/<[\s\.]*BR[\s\.]*>/gim, '<br>');
  // <br>>, <<br />, <<br >> ...
  str = str.replace(/<[\s]*(<br[\s\/]*>)/gim, '$1');
  str = str.replace(/(<br[\s\/]*>)[\s]*>/gim, '$1');
  // <hr>
  str = str.replace(/([\r\n])[\t ]*<[\\\/\. ]*HR[\\\/\. ]*>/gi, '$1----');
  str = str.replace(/(.)<[\\\/\. ]*HR[\\\/\. ]*>/gi, '$1\n----');
  // Not really an HTML-to-wikitext fix, but close enough
  str = str.replace(/<[\\\/\s]*REFERENCES[\\\/\s]*>/gim, '<references />');
  // Repeated references tag
  str = str.replace(/(<references \/>)[\s]*\1/gim, '$1');
  // Make sure <H1>, ..., <H6> is after a newline
  str = str.replace(/([^\r\n ])[\t ]*(<H[1-6][^<>]*>)/gim, '$1\n$2');
  // Make sure </H1>, ..., </H6> is before a newline
  str = str.replace(/(<\/H[1-6][^<>]*>)[\t ]*([^\r\n ])/gim, '$1\n$2');
  // Remove newlines from inside <H1>, ..., <H6>
  var loopcount = 0;
  while( str.search( /<H([1-6])[^<>]*>(?:[^<>]|<\/?[^\/h\r\n][^<>]*>)*?<\/H\1[^<>]*>/gim ) >= 0 && loopcount <= 10 ) {
    str = str.replace(/(<H)([1-6])([^<>]*>(?:[^<>]|<\/?[^\/h\r\n][^<>]*>)*?)[\r\n]((?:[^<>]|<\/?[^\/h\r\n][^<>]*>)*?<\/H)\2([^<>]*>)/gim, '$1$2$3 $4$2$5');
    loopcount++;
  }
  // Replace <H1>, ..., <H6> with wikified section headings
  str = str.replace(/(^|[\r\n])[\t ]*<H1[^<>]*>([^\r\n]*?)<\/H1[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1= $2 =$3');
  str = str.replace(/(^|[\r\n])[\t ]*<H2[^<>]*>([^\r\n]*?)<\/H2[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1== $2 ==$3');
  str = str.replace(/(^|[\r\n])[\t ]*<H3[^<>]*>([^\r\n]*?)<\/H3[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1=== $2 ===$3');
  str = str.replace(/(^|[\r\n])[\t ]*<H4[^<>]*>([^\r\n]*?)<\/H4[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1==== $2 ====$3');
  str = str.replace(/(^|[\r\n])[\t ]*<H5[^<>]*>([^\r\n]*?)<\/H5[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1===== $2 =====$3');
  str = str.replace(/(^|[\r\n])[\t ]*<H6[^<>]*>([^\r\n]*?)<\/H6[\r\n\t ]*>[\t ]*([\r\n]|$)/gim, '$1====== $2 ======$3');
 
  return str;
}
/* autoEdHeadlines()
 * fixes common headline errors and renames some headers
 */
function autoEdHeadlines(str) { //MAIN FUNCTION describes list of fixes
 
// Remove bold from section headings
var loopcount = 0;
while( str.search(/^[=]{1,5}[^=\r\n]*'''[^=\r\n]*[=]{1,5}/gim) >= 0 && loopcount <= 10 ) { //'
str = str.replace(/(^[=]{1,5}[^=\r\n]*)'''([^=\r\n]*[=]{1,5})[\t ]*/gim, '$1$2'); //'
loopcount++;
}
 
// Remove trailing colon from section headings
str = str.replace(/(^[=]{1,5}[^=\r\n]*)[:]([\t ]*[=]{1,5})[\t ]*/gim, '$1$2');
 
// Correct caps in "See also" section
str = str.replace(/(==[\t ]*)see also([\t ]*==)/gi, "$1 See also $2");
 
// Change common synonyms for "See also" to "See also", but only if "See also" doesn't exist
if( !str.match(/=[\t ]*See also[\t ]*=/gi) ) {
str = str.replace(/(==[\t ]*)(?:related topics|related articles|internal links|also see)([\t ]*==)/gi, "$1 See also $2");
}
// Common synonyms for "External links"
str = str.replace(/(==[\t ]*)(?:external links?|outside links?|web ?links?|exterior links?)([\t ]*==)/gi, "$1 External links $2");
 
// Capitalization and/or plural of "References", "Sources", "Further reading"
str = str.replace(/(==[\t ]*)references([\t ]*==)/gi, "$1 References $2");
str = str.replace(/(==[\t ]*)sources([\t ]*==)/gi, "$1 Sources $2");
str = str.replace(/(==[\t ]*)further readings?([\t ]*==)/gi, "$1 Further reading $2");
 
return str;
}
/* autoEdUnicodeControlChars()
 * converts HTML to wikitext
 */
function autoEdUnicodeControlChars(str) { //MAIN FUNCTION describes list of fixes
 
  //Removes unneeded Unicode control characters
  str = str.replace(new RegExp('\u200E|\uFEFF|\u200B', 'gi'), '');
 
  return str;
}
/* autoEdUnicodeHex()
 * converts hex encoded characters to unicode
 *
 * Purpose: Changes hexcharacter codes in wikilinks to actual unicode characters
 *
 * Examples: [[Stra%C3%9Fe|street]] -> [[Straße|street]]
 *           [[AutoEd#History_.281990.29|History]] ->
 *               [[AutoEd#History (1990)|History]]
 *
 * Note: Contributed by CharlotteWeb
 *
 * Comments (CharlotteWeb):
 * To keep things simple we'll ignore all image links. because some people prefer
 * underscores in the file name and the caption can contain god-knows-what.
 * one easy way is to flag them with a character which should never be used,
 * but if it is already present we have a problem, so let's just quit.
 */
function autoEdUnicodeHex(txt) { //MAIN FUNCTION describes list of fixes
 if(txt.match(/\uE000/)) return(txt); // see [[Private Use Area]]
 txt = txt.replace(/(\[\[[\:\s*]*(?:Image|File|Media)\s*\:)/gi, "$1\uE000");
 if(m = txt.match(/\[\[[^\[\]\n\uE000]+\]\]/g)) {
  for(var i = 0; i < m.length; i++) {
   parts = m[i].split("|");
   link = parts[0];
   a = link.split("#")
   title = a[0];
   section = a[1];
   try {
    link = decodeURIComponent(title.replace(/\%(.[^0-9A-F]|[^0-9A-F].|$)/gi, "%25$1")
     ) + ( section ? ("#" + decodeURIComponent(section
           // change "." to "%" when followed by valid hex
           .replace(/\.([0-9A-F]{2})/gi, "%$1")
           .replace(/\%(.[^0-9A-F]|[^0-9A-F].|$)/gi, "%25$1")
         )
     ) : "" )
    } catch(e) { } // just do no decoding
      parts[0] = link; 
      txt = txt.replace(m[i], parts.join("|"));
   }
  }
  return(txt.replace(/\uE000/g, ""));
}
/* autoEdTemplates()
 * cleans up templates
 */
function autoEdTemplates(str) { //MAIN FUNCTION describes list of fixes
 
 //Remove unneeded Template: text from transclusions
 str = str.replace(/{{[_ ]*szablon:[_ ]*/gi, '{{');
 
 //Replace redirects to Reflist with Reflist
 str = str.replace(/{{[_ ]*(?:Reference[_ ]+List|References-Small|Reflink)[_ ]*(\||}})/gi, '{{Reflist$1');
 str = str.replace(/{{[_ ]*(?:Refs|Reference|Ref-list|Listaref|FootnotesSmall)[_ ]*(\||}})/gi, '{{Reflist$1');
 
 //Replace a long version of Reflist with Reflist
 str = str.replace(/<div[^<>]*[ ]+class=['"]*references-small['"]*[^<>]*>[\r\n]*<references[ ]*\/>[\r\n]*<\/div>/gim, '{{Reflist}}');
 
 //Replace redirects to about with about
 str = str.replace(/{{[_ ]*(?:Otheruses4|Four[_ ]+other[_ ]+uses|Otherusesabout|This2)[_ ]*(\||}})/gi, '{{about$1');
 
 return str;
}
/* autoEdTablestoWikitext()
 * replaces HTML tables with wikitables
 */
function autoEdTablestoWikitext(str) { //MAIN FUNCTION describes list of fixes
 
  // Remove newlines from inside table specific tags
  var loopcount = 0;
  while( str.search(/(?:<\/?table|<\/?tr|<\/?td|<\/?th)[^<>]*[\r\n]/gi) >= 0 && loopcount <= 10 ) {
    str.replace(/((?:<\/?table|<\/?tr|<\/?td|<\/?th)[^<>]*)[\r\n]/gi, '$1 ')
    loopcount++;
  }
  // Remove extra whitespace from inside table specific tags
  str=str.replace(/(<table|<tr|<td|<th)([^<>]*?)[\s]+(>)/gim, '$1$2$3');
  str=str.replace(/(<table|<tr|<td|<th)([^<>]*?)[\s][\s]+/gim, '$1$2 ');
  // Remove any extra junk </tr>, </td>, </th>, </table>
  str=str.replace(/(<\/table|<\/tr|<\/td|<\/th)[^<>]+(>)/gim, '$1$2');
  // Remove space whitespace after </tr>, </td>, </th>, <table>
  str=str.replace(/(<\/tr>|<\/td>|<\/th>|<table[^<>]*>)[\s]+/gim, '$1');
  // Remove space before <tr>, <td>, <th>, </table>
  str=str.replace(/[\s]+(<\/table>|<tr[^<>]*>|<td[^<>]*>|<th[^<>]*>)/gim, '$1');
  // Replace '<table stuff>' with '{| stuff'
  str=str.replace(/<table( [^<>]*|)>[\s]*/gim, '{|$1\n');
  // Replace '</table>' with '|}'
  str=str.replace(/[\s]*<\/table>/gi, '\n|}');
  // Replace '</td><td>' with '||'
  str=str.replace(/<\/td[\s]*>[\s]*<td[\s]*>/gim, '||');
  str=str.replace(/<\/td[\s]*>[\s]*<td ([^<>]+)>/gim, '|| $1 |');
  // Replace '</th><th>' with '!!'
  str=str.replace(/<\/th[\s]*>[\s]*<th[\s]*>/gim, '!!');
  str=str.replace(/<\/th[\s]*>[\s]*<th ([^<>]+)>/gim, '!! $1 |');
  // Replace '</td></tr>' and '</th></tr>' with EOL
  str=str.replace(/<\/(?:td|th)>[\s]*<\/tr>[\s]/gim, '\n');
  // Replace '</td>', '</th>', '</tr>' with EOL
  str=str.replace(/<\/(?:td|th|tr)>[\s]*/gim, '\n');
  // Replace '<tr>' with '|-'
  str=str.replace(/[\s]*<tr>[\s]*/gim, '\n|-\n');
  str=str.replace(/[\s]*<tr ([^<>]*)>[\s]*/gim, '\n|- $1\n');
  // Replace '<td>' with '|'
  str=str.replace(/[\s]*<td>([^\s])/gim, '\n| $1');
  str=str.replace(/[\s]*<td>([\s])/gim, '\n|$1');
  str=str.replace(/[\s]*<td[\s]*([^<>]*?)[\s]*>([^\s])/gim, '\n| $1 | $2');
  str=str.replace(/[\s]*<td[\s]*([^<>]*?)[\s]*>([\s])/gim, '\n| $1 |$2');
  // Replace '<th>' with '!'
  str=str.replace(/[\s]*<th>([^\s])/gim, '\n! $1');
  str=str.replace(/[\s]*<th>([\s])/gim, '\n!$1');
  str=str.replace(/[\s]*<th[\s]*([^<>]*?)[\s]*>([^\s])/gim, '\n! $1 | $2');
  str=str.replace(/[\s]*<th[\s]*([^<>]*?)[\s]*>([^\s])/gim, '\n! $1 |$2');
 
  return str;
}
/* autoEdExtraBreaks()
 * removes extra BR tags
 */
function autoEdExtraBreaks(str) { //MAIN FUNCTION describes list of fixes
 
//Usually unneeded BR tags from ends of image descriptions and wikilinks (]]), templates (}}), template parameters (|)
str = str.replace(/[\t ]*<[\s\/\.]*br[\s\/\.]*>[\t ]*([\t\n ]*?)(\]\]|}}|\|)/gim, '$1$2');
//BR tag before a list item
str = str.replace(/[\t ]*<[\s\/\.]*br[\s\/\.]*>[\t ]*([\s]*?[\n]\*)/gim, '$1');
//BR tag followed by at least two newlines
str = str.replace(/[\t ]*<[\s\/\.]*br[\s\/\.]*>[\t ]*([\n])[\t ]*([\n])/gim, '$1$2');
 
return str;
}
/* autoEdLinks()
 * cleans up common link errors
 */
function autoEdLinks(str) { //MAIN FUNCTION describes list of fixes
 
    str = str.replace(/\]\[/g, "] [");
 
    //repair bad external links
    str = str.replace(/\[?\[http:\/\/([^\]\n]*?)\]\]?/gi, "[http://$1]");
    //str = str.replace(/\[http:\/\/([^\]]*?)\|([^\]]*?)\]/gi, "[http://$1 $2]");
 
    return str;
}
 
/* Activates individual modules when "auto ed" tab is clicked */
function autoEdFunctions() {
    var txt = document.editform.wpTextbox1;
    txt.value = autoEdUnicodify(txt.value);
    txt.value = autoEdISBN(txt.value);
    txt.value = autoEdWhitespace(txt.value);
    txt.value = autoEdUnicodeHex(txt.value);
    txt.value = autoEdWikilinks(txt.value);
    txt.value = autoEdHTMLtoWikitext(txt.value);
    txt.value = autoEdHeadlines(txt.value);
    txt.value = autoEdUnicodeControlChars(txt.value);
    txt.value = autoEdTemplates(txt.value);
    txt.value = autoEdTablestoWikitext(txt.value);
    txt.value = autoEdExtraBreaks(txt.value);
    txt.value = autoEdLinks(txt.value);
}
 
//</nowiki></pre>