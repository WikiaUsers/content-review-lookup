 /** Change Special:Search to use a drop-down menu *******************************************************
   *
   *  Description: Change Special:Search to use a drop-down menu, with the default being
   *               the internal MediaWiki engine
   *  Created and maintained by: [[User:Gracenotes]]
   */
 
 if (wgPageName == "പ്രത്യേകം:Search") {
         var searchEngines = [];
         addOnloadHook(SpecialSearchEnhanced);
 }
 
 function SpecialSearchEnhanced() {
         var createOption = function(site, action, mainQ, addQ, addV) {
                 var opt = document.createElement('option');
                 opt.appendChild(document.createTextNode(site));
                 searchEngines[searchEngines.length] = [action, mainQ, addQ, addV];
                 return opt;
         }
 	
         if (document.forms['powersearch'])
         var searchForm = document.forms['powersearch'];
         if (document.forms['search'])
         var searchForm = document.forms['search'];

         if (searchForm.lsearchbox) {
             var searchBox = searchForm.lsearchbox;
         } else {
             var searchBox = searchForm.search;
         }
         var selectBox = document.createElement('select');
         selectBox.id = 'searchEngine';
         searchForm.onsubmit = function() {
                 var optSelected = searchEngines[document.getElementById('searchEngine').selectedIndex];
                 searchForm.action = optSelected[0];
	             searchBox.name = optSelected[1];
                 searchForm.title.value = optSelected[3];
                 searchForm.title.name = optSelected[2];
         }
         selectBox.appendChild(createOption('MediaWiki search', wgScriptPath + '/index.php', 'search', 'title', 'Special:Search'));
         selectBox.appendChild(createOption('Google', 'http://www.google.com/search', 'q', 'sitesearch', 'ml.wikipedia.org'));
         selectBox.appendChild(createOption('Yahoo', 'http://search.yahoo.com/search', 'p', 'vs', 'ml.wikipedia.org'));
         selectBox.appendChild(createOption('Windows Live', 'http://search.live.com/results.aspx', 'q', 'q1', 'site:http://ml.wikipedia.org'));
         selectBox.appendChild(createOption('Wikiwix', 'http://www.wikiwix.com/', 'action', 'lang', 'ml'));
         selectBox.appendChild(createOption('Exalead', 'http://www.exalead.com/wikipedia/results', 'q', 'language', 'ml'));
         searchBox.style.marginLeft = '0px';
         if (document.getElementById('loadStatus')) {
             var lStat = document.getElementById('loadStatus');
         } else {
             var lStat = searchForm.fulltext;
         }
         lStat.parentNode.insertBefore(selectBox, lStat);
 }

/**തിരഞ്ഞെടുത്ത ലേഖനങ്ങളിലേയ്ക്ക്‌ ഇന്റർ വിക്കി ലിങ്കുകൾ നൽകാൻ**************
 *  തിരഞ്ഞെടുത്ത ലേഖനങ്ങളിലേയ്ക്ക്‌ ഇന്റർ വിക്കി ലിങ്കുകൾ നൽകാനായി ഈ സ്ക്രിപ്റ്റ്‌ ഉപയോഗിയ്ക്കാം മറ്റു ഭാഷകളിൽ എന്നു
 *  കാണുന്ന സെക്ഷനിലെ ബുള്ളറ്റുകൾ ഈ ഫങ്ക്ഷൻ മാറ്റിയെഴുതും. ആംഗലേയ വിക്കിയിൽ നിന്നും കൊണ്ടുവന്നത്‌
 */
 function LinkFA() 
 {
     if ( document.getElementById( "p-lang" ) ) {
         var InterwikiLinks = document.getElementById( "p-lang" ).getElementsByTagName( "li" );
 
         for ( var i = 0; i < InterwikiLinks.length; i++ ) {
             if ( document.getElementById( InterwikiLinks[i].className + "-fa" ) ) {
                 InterwikiLinks[i].className += " FA"
                 InterwikiLinks[i].title = "മറ്റൊരു ഭാഷയിൽ ഈ ലേഖനം തിരഞ്ഞെടുക്കപ്പെട്ടതാണ്‌.";
             }
         }
     }
 }
 
 addOnloadHook( LinkFA );

/** Main Page layout fixes *********************************************************
 *
 *  Description:        Various layout fixes for the main page, including an
 *                      additional link to the complete list of languages available
 *                      and the renaming of the 'Article' to to 'Main Page'.
 *  Maintainers:        User:AzaToth, User:R. Koot
 */

function mainPageRenameNamespaceTab() {
    try {
        var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
        if ( Node.textContent ) {      // Per DOM Level 3
            Node.textContent = 'പ്രധാന താൾ';
        } else if ( Node.innerText ) { // IE doesn't handle .textContent
            Node.innerText = 'പ്രധാന താൾ';
        } else {                       // Fallback
            Node.replaceChild( Node.firstChild, document.createTextNode( 'പ്രധാന താൾ' ) ); 
        }
    } catch(e) {
        // bailing out!
    }
}

function mainPageAppendCompleteListLink() {
    try {
        var node = document.getElementById( "p-lang" )
                           .getElementsByTagName('div')[0]
                           .getElementsByTagName('ul')[0];

        var aNode = document.createElement( 'a' );
        var liNode = document.createElement( 'li' );

        aNode.appendChild( document.createTextNode( 'Complete list' ) );
        aNode.setAttribute( 'href' , 'http://meta.wikimedia.org/wiki/List_of_Wikipedias ' );
        liNode.appendChild( aNode );
        liNode.className = 'interwiki-completelist';
        node.appendChild( liNode );
     } catch(e) {
       // lets just ignore what's happened
       return;
    }
}

if ( wgTitle == 'പ്രധാന താൾ' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
       addOnloadHook( mainPageRenameNamespaceTab );
}

if ( wgTitle == 'പ്രധാന താൾ' && wgNamespaceNumber == 0 ) {
       addOnloadHook( mainPageAppendCompleteListLink );
}

/**<pre><nowiki>*/
/** Extra toolbar options ****************************************************** 
  *
  *  Description: UNDOCUMENTED
  *  Maintainers: [[User:MarkS]]?, [[User:Voice of All]], [[User:R. Koot]]
  */
 
 //This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.
 // This is based on the original code on Wikipedia:Tools/Editing tools
 // To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
     "speedTip": "Line break",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
     "speedTip": "Superscript",
     "tagOpen": "<sup>",
     "tagClose": "</sup>",
     "sampleText": "Superscript text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
     "speedTip": "Subscript",
     "tagOpen": "<sub>",
     "tagClose": "</sub>",
     "sampleText": "Subscript text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
     "speedTip": "Small",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Small Text"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
     "speedTip": "Insert hidden Comment",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Comment"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
     "speedTip": "Insert a picture gallery",
     "tagOpen": "\n<gallery>\n",
     "tagClose": "\n</gallery>",
     "sampleText": "Image:Example.jpg|Caption1\nImage:Example.jpg|Caption2"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
     "speedTip": "Insert block of quoted text",
     "tagOpen": "<blockquote>\n",
     "tagClose": "\n</blockquote>",
     "sampleText": "Block quote"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
     "speedTip": "Insert a table",
     "tagOpen": '{| class="wikitable"\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/ml/2/20/Button_subst.png",
     "speedTip": "സബ്സ്റ്റിറ്റിയൂഷൻ (subst) ചേർക്കുക",
     "tagOpen": "{{Subst:",
     "tagClose": "}}",
     "sampleText": "Welcome"};

  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
     "speedTip": "റഫറൻ‌സുകൾ നൽകാൻ",
     "tagOpen": "<ref>\n",
     "tagClose": "\n</ref>",
     "sampleText": "References"};
 }
/*</nowiki></pre>*/

/*<pre><nowiki>
ടൂൾ ബാർ ബട്ടണുകൾ അടുക്കിപ്പെറുക്കി വയ്ക്കാനുള്ള സ്ക്രിപ്റ്റ്‌
Maintainer : [[User:Tux the penguin]]
*/
function lija_rearrange()
{
var def,ext;
if(mwEditButtons)
def=mwEditButtons;

if(mwCustomEditButtons)
ext=mwCustomEditButtons;

if(def!=null && ext!=null)
{
var defc=def.slice();
 var extc=ext.slice();
try
  {
def[2]=extc[1];
def[3]=defc[4];
def[4]=extc[8];
def[5]=extc[5];
def[6]=extc[9];
def[7]=extc[2];
def[8]=defc[10];
def[9]=extc[6];
def[10]=defc[8];
def[def.length]={
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/88/Btn_toolbar_enum.png",
     "speedTip": "എണ്ണമിട്ട പട്ടിക",
     "tagOpen": "\n#",
     "tagClose": "\n#രണ്ടാമത്തെ ഇനം\n#മൂന്നാമത്തെ ഇനം",
     "sampleText": "ഒന്നാമത്തെ ഇനം"};
def[def.length]={
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/11/Btn_toolbar_liste.png",
     "speedTip": "എണ്ണമിടാത്ത പട്ടിക",
     "tagOpen": "\n*",
     "tagClose": "\n*രണ്ടാമത്തെ ഇനം\n*മൂന്നാമത്തെ ഇനം",
     "sampleText": "ഒന്നാമത്തെ ഇനം"};
def[def.length]={
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png",
     "speedTip": "സൂചിക ചേര്ക്കുക",
     "tagOpen": "[[Category:",
     "tagClose": "]]",
     "sampleText": "ഉള്ളടക്കം"};
 

ext[0]=defc[2];
ext[1]=defc[3];
ext[2]=defc[5];
ext[3]=defc[6];
ext[4]=extc[7];
ext[5]=defc[7];
ext[6]=extc[3];
ext[7]=extc[4];
ext[8]=extc[0];
ext[9]=extc[10];
ext[10]=extc[11];
ext[11]=defc[9];
}
catch(ex)
{
//എറർ ഉണ്ടായാൽ..... സഹിക്കുക. അല്ലാണ്ടെന്തു ചെയ്യാൻ ?
}
}


}

addOnloadHook(lija_rearrange);
//****************************************************************************************************************
//ടൂൾ ബാർ സ്ക്രിപ്റ്റ്‌ ഇവിടെ അവസാനിയ്ക്കുന്നു. 
//****************************************************************************************************************
/*</nowiki></pre>*/


/*
<nowiki><pre>

    This script is a modified version of Alex benenson's cyrillic translitarator and this version was created by [[User:Peringz|Peringz]]
*/

var consonants = {"ക":"ക","ഖ":"ഖ","ഗ":"ഗ","ഘ":"ഘ","ങ":"ങ","ച":"ച","ഛ":"ഛ","ജ":"ജ","ഝ":"ഝ","ഞ":"ഞ","ട":"ട","ഠ":"ഠ","ഡ":"ഡ","ഢ":"ഢ","ണ":"ണ","ത":"ത","ഥ":"ഥ","ദ":"ദ","ധ":"ധ","ന":"ന","പ":"പ","ഫ":"ഫ","ബ":"ബ","ഭ":"ഭ","മ":"മ","യ":"യ","ര":"ര","ല":"ല","വ":"വ","ശ":"ശ","ഷ":"ഷ","സ":"സ","ഹ":"ഹ","ള":"ള","ഴ":"ഴ","റ":"റ","റ്റ":"റ്റ"};
var chillaksharam = {"ൺ":"ണ","ൻ":"ന","ം":"മ","ർ":"ര","ൽ":"ല","ൾ":"ള","്\\u200D":""};

var vowels = '"്a":"","്e":"െ","്i":"ി","്o":"ൊ","്u":"ു","്A":"ാ","്E":"േ","്I":"ീ","്O":"ോ","്U":"ൂ","്Y":"ൈ","െe":"ീ","ൊo":"ൂ","ിi":"ീ","ിe":"ീ","ുu":"ൂ","ുo":"ൂ","്r":"്ര്",';
var roman = '"k":"ക്","ക്h":"ഖ്","g":"ഗ്","ഗ്h":"ഘ്","ൻg":"ങ്","c":"ക്\\u200D","ക്\\u200Dh":"ച്","ച്h":"ഛ്","j":"ജ്","ജ്h":"ഝ്","ൻj":"ഞ്","ൻh":"ഞ്","T":"ട്","ട്h":"ഠ്","D":"ഡ്","ഡ്h":"ഢ്","റ്റ്h":"ത്","ത്h":"ഥ്","d":"ദ്","ദ്h":"ധ്","p":"പ്","പ്h":"ഫ്","f":"ഫ്","b":"ബ്","ബ്h":"ഭ്","y":"യ്","v":"വ്","w":"വ്","z":"ശ്","S":"ശ്","സ്h":"ഷ്","s":"സ്","h":"ഹ്","ശ്h":"ഴ്","x":"ക്ഷ്","R":"റ്","t":"റ്റ്",';
var chill = '"N":"ൺ","n":"ൻ","m":"ം","r":"ർ","l":"ൽ","L":"ൾ",';
var swaram = '"a":"അ","അa":"ആ","A":"ആ","e":"എ","E":"ഏ","എe":"ഈ","i":"ഇ","ഇi":"ഈ","ഇe":"ഈ","അi":"ഐ","I":"ഐ","o":"ഒ","ഒo":"ഊ","O":"ഓ","അu":"ഔ","ഒu":"ഔ","u":"ഉ","ഉu":"ഊ","U":"ഊ","H":"ഃ","റ്h":"ഋ","ർ^":"ഋ","ഋ^":"ൠ","ൽ^":"ഌ","ഌ^":"ൡ",';
//var numerals = '"1":"൧","2":"൨","3":"൩","4":"൪","5":"൫","6":"൬","7":"൭","8":"൮","9":"൯","0":"൦",';
var conjuncts = '"ൻt":"ന്റ്","ന്റ്h":"ന്ത്","ൻk":"ങ്ക്","ൻn":"ന്ന്","ൺN":"ണ്ണ്","ൾL":"ള്ള്","ൽl":"ല്ല്","ംm":"മ്മ്","ൻm":"ന്മ്","ന്ന്g":"ങ്ങ്","ൻd":"ന്ദ്","ൺm":"ണ്മ്","ൽp":"ല്പ്","ംp":"മ്പ്","റ്റ്t":"ട്ട്","ൻT":"ണ്ട്","ൺT":"ണ്ട്","്ര്^":"ൃ","ൻc":"ൻ\\u200D","ൻ\\u200Dh":"ഞ്ച്","ൺD":"ണ്ഡ്",';
var others = '"്L":"്ല്","~":"്\\u200C","്~":"്\\u200C","\\u200C~":"\\u200C","ം~":"മ്","ക്\\u200Dc":"ക്ക്\\u200D","ക്ക്\\u200Dh":"ച്ച്","q":"ക്യൂ",';
var caps = '"B":"ബ്ബ്","C":"ക്ക്\\u200D","F":"ഫ്","G":"ഗ്ഗ്","J":"ജ്ജ്","K":"ക്ക്","M":"മ്മ്","P":"പ്പ്","Q":"ക്യൂ","V":"വ്വ്","W":"വ്വ്","X":"ക്ഷ്","Y":"യ്യ്","Z":"ശ്ശ്",';
var ZWNJ = '"_":"\\u200C"';

// for compatibility with bookmarklets
function cyr_translit(src) {
    return to_cyrillic(src);
}

var conversionHash = undefined;
var maxcyrlength = 0;

function getConversionHash() {
    if (conversionHash == undefined) {
        // TODO
        var opr = "{" + vowels + roman + chill + swaram +  conjuncts + caps + others;
        for (var consonant in consonants) {
	        opr += '"' + consonant + 'a":"' + consonant + 'ാ",';
	        opr += '"' + consonant + 'e":"' + consonant + 'േ",';
	        opr += '"' + consonant + 'i":"' + consonant + 'ൈ",';
	        opr += '"' + consonant + 'o":"' + consonant + 'ോ",';
	        opr += '"' + consonant + 'u":"' + consonant + 'ൗ",';
        }
		
        for (var chk in chillaksharam) {
            opr += '"' + chk + 'a":"' + chillaksharam[chk] + '",';
            opr += '"' + chk + 'e":"' + chillaksharam[chk] + 'െ",';
            opr += '"' + chk + 'i":"' + chillaksharam[chk] + 'ി",';
            opr += '"' + chk + 'o":"' + chillaksharam[chk] + 'ൊ",';
            opr += '"' + chk + 'u":"' + chillaksharam[chk] + 'ു",';
            opr += '"' + chk + 'A":"' + chillaksharam[chk] + 'ാ",';
            opr += '"' + chk + 'E":"' + chillaksharam[chk] + 'േ",';
            opr += '"' + chk + 'I":"' + chillaksharam[chk] + 'ീ",';
            opr += '"' + chk + 'O":"' + chillaksharam[chk] + 'ോ",';
            opr += '"' + chk + 'U":"' + chillaksharam[chk] + 'ൂ",';
            opr += '"' + chk + 'Y":"' + chillaksharam[chk] + 'ൈ",';
            opr += '"' + chk + 'r":"' + chillaksharam[chk] + '്ര്",';
            opr += '"' + chk + 'y":"' + chillaksharam[chk] + '്യ്",';
            opr += '"' + chk + 'v":"' + chillaksharam[chk] + '്വ്",';
            opr += '"' + chk + 'w":"' + chillaksharam[chk] + '്വ്",';
            opr += '"' + chk + '~":"' + chillaksharam[chk] + '്\\u200C",';
        }
		
        opr += ZWNJ + "}";
        // var tb = document.getElementById('wpTextbox1');
        // tb.value = opr;
        conversionHash = eval("("+opr+")");
        maxcyrlength=6;
    }

    return conversionHash;
}

function to_cyrillic(src, output, chunks) {
    if (src == undefined || src == "" || src == null)
        return src;
    if (output == undefined)
        output = new String();

    var hash = getConversionHash();
	
    var location = 0;
	
    while (location < src.length) {
        var len = Math.min(maxcyrlength, src.length - location);
        var arr = undefined;
        var sub;
        while (len > 0) {
	        sub = src.substr(location, len);
	        arr = hash[sub];
	        if (arr != undefined) 
		        break;
	        else 
		        len--;
        }
		
        // need this for translit on the fly
        if (chunks != undefined)
	        chunks[chunks.length] = sub;
			
        if (arr == undefined) {
	        output += sub;
	        location ++;
        }
        else {

	        // case analysis
	        var newChar = arr;
			
	        if (sub.toLowerCase() == sub.toUpperCase() && arr.length > 1 && arr[1] && (newChar.toUpperCase() != newChar.toLowerCase())) {
			
		        // need translit hash to determine if previous character (and possibly the one before it) 
		        // were converted and are in upper case
				
		        // set prevDud to true previous is not a translated character or simply a blank
		        // set prevCap to true if previous was translated and was upper case

		        var prevCh = output.length == 0 ? null : output.substr(output.length - 1, 1);
		        var prevDud = !prevCh || !getTranslitString(prevCh);
		        var prevCap = (!prevDud && prevCh == prevCh.toUpperCase());

		        // sub is caseless but result isn't. case will depend on lookbehind and lookahead
		        if (prevDud || !prevCap) {
			        output += newChar.toLowerCase();
			        prevCap = false;
		        }
		        else {
			        var next = " ";
			        if (location + len < src.length)
				        next = src.substr(location + len, 1);

			        if (next != next.toUpperCase() && next == next.toLowerCase() ) {
				        //next is lowercase (and not caseless)
				        output += newChar.toLowerCase();
			        }
			        else if (next == next.toUpperCase() && next != next.toLowerCase() ) {
				        // next is uppercase (and not caseless)
				        output += newChar.toUpperCase();
			        }
			        else {
				        // next is caseless. output case determined by the case of output[length - 2]
				        var pprevCh = output.length == 1 ? null : output.substr(output.length - 2, 1);
				        var pprevDud = !pprevCh || !getTranslitString(pprevCh);
				        if (!pprevDud && (pprevCh == pprevCh.toUpperCase())) {
					        //pre-prev is in upper case. output is also uppercase
					        output += newChar.toUpperCase();
				        }
				        else {
				            output += newChar.toLowerCase();
				        }
						
			        }
		        }
					
	        }
	        else if ((sub.toLowerCase() == sub.toUpperCase()) && (arr.length < 2 || !arr[1])) {
				
		        // literal treatment of newChar
		        output += newChar;

	        }
	        else if (sub != sub.toLowerCase()) {
			
		        // sub not all-lowercase
		        output += newChar.toUpperCase();
	        }
	        else {
					
					
					
		        // sub is lowercase
	            output += newChar.toLowerCase();
	        }
	        location += len;
        }
    }
	
    return output;
}



function convertIt(src,converter){
 var resultbuffer=""; 
    for(var i=0;i<src.length;i++){
    resultbuffer=converter(resultbuffer+src[i]);
    }
        return converter(resultbuffer);

}



var translitHash = undefined;

function initTranslit() {
    if (translitHash == undefined) {
        translitHash = new Array();

        for (var i = 0; i < conversionHash.length; i++) {
	        var ch = conversionHash[i][1];
	        // if the translit string is not caseless, convert cyr string to upper case
	        // otherwise maintain its case
	        if (conversionHash[i][0].toUpperCase() != conversionHash[i][0].toLowerCase())
		        ch = ch.toUpperCase();
				
	        if (translitHash[ch] == undefined)
		        translitHash[ch] = conversionHash[i][0];
        }
    }
}




//-- translit on-the-fly -- 

function replaceValue(node, value, stepback) {
    if (stepback == undefined)
        stepback = 0;
		
    if (isExplorer()) {
        var range = document.selection.createRange();
        range.moveStart("character", -stepback);
        range.text = value;
        range.collapse(false);
        range.select();
    }
    else {
        var scrollTop = node.scrollTop;
        var cursorLoc =  node.selectionStart;
        node.value = node.value.substring(0, node.selectionStart - stepback) + value + 
                node.value.substring(node.selectionEnd, node.value.length);
        node.scrollTop = scrollTop;
        node.selectionStart = cursorLoc + value.length - stepback;
        node.selectionEnd = cursorLoc + value.length - stepback;
    }
}


// compare positions
function positionIsEqual(other) {
    if (isExplorer())
        return this.position.isEqual(other.position);
    else
        return this.position == other.position;
  
}

function Position(node) {
  if (node.selectionStart != undefined)
    this.position = node.selectionStart;
  else if (document.selection && document.selection.createRange())
    this.position = document.selection.createRange();
    
  this.isEqual = positionIsEqual;
}

function resetState() {
    this.position = new Position(this.node);
    this.transBuffer = "";
    this.cyrBuffer = "";
}

function StateObject(node) {
    this.node = node;
    this.reset = resetState;
    this.cyrBuffer = "";
    this.transBuffer = "";
    this.position = new Position(node);
}


var stateHash = new Array();

function isExplorer() {
  return (document.selection != undefined && document.selection.createRange().isEqual != undefined);
}

function pressedKey(event) {
  if (isExplorer())
    return event.keyCode;
  else
    return event.which;
}

function transliterateKey(event) {
     /*
    if ((event.keyCode == 255 && event.charCode > 0) || event.keyCode == 8) {
        return;
    }
    */
    
    if (event == undefined)
        event = window.event;
    
    var node = null;
    if (event.target) {
        node = event.target;
        }
    else if (event.srcElement) {
        node = event.srcElement;
        }
		
		
    // initialize state
    var state = stateHash[node];
    if (state == null) {
        state = new StateObject(node);
        stateHash[node] = state;
    }
    if ( (pressedKey(event) > 20) && !event.ctrlKey && !event.altKey && !event.metaKey) {

        var c = String.fromCharCode(pressedKey(event));

        // process input
        var result = process_translit(state, c);
        // finish up
        if (c != result.out || result.replace != 0) {
          if (isExplorer())
	        event.returnValue = false;
          else
            event.preventDefault();
		  
          replaceValue(node, result.out, result.replace);
		  
          state.position = new Position(node);

        }
    }
	
}

function TranslitResult() {
    this.out = "";
    this.replace = 0;
}

function process_translit(state, c) {
    // reset state if position changed
    if (!state.position.isEqual(new Position(state.node)))
        state.reset();
		
    var result = new TranslitResult();
	
    // initial backbuffer. Add to it as characters are converted
    var backbuffer = getBackBuffer(state.node, state.cyrBuffer.length, 2);
    var chunks = new Array();
	
    state.transBuffer = state.transBuffer+ c

    var str = to_cyrillic(state.cyrBuffer+c, backbuffer, chunks);

    // remove backbuffer from output
    str = str.substr(backbuffer.length);
    result.out = str; 
    /* str is now left alone - it has the output matching contents of chunks and 
       will be used to reinitialize backbuffers, along with chunks and state.transBuffer
    */
	
    // get the difference between state.cyrBuffer and output
    for (var i = 0; i < Math.min(state.cyrBuffer.length, result.out.length); i++) {
        if (state.cyrBuffer.substr(i, 1) != result.out.substr(i, 1)) {
	        result.replace = state.cyrBuffer.length - i;
	        result.out = result.out.substr(i);
	        break;
        }
    }
    if (result.replace == 0) {
               if(result.out.length<state.cyrBuffer.length)
		        result.replace=state.cyrBuffer.length- result.out.length;
        result.out = result.out.substr(Math.min(state.cyrBuffer.length, result.out.length));
                 
                       //    result.out+="\u0008"
                         
    }
	
    // update state: backbuffer, bufferArray
    if (chunks.length > 0 && chunks[chunks.length - 1] == result.out.substr(result.out.length - 1)) {
        // no convertion took place, reset state
        state.reset();
    }
    else {
        while (state.transBuffer.length > maxcyrlength) {
	        state.transBuffer = state.transBuffer.substr(chunks[0].length);
	        chunks.shift();
	        str = str.substr(1);
        }
        state.cyrBuffer = str;
    }
    return result;
}

function getBackBuffer(node, offset, count) {
		
    if (isExplorer()) { //.tagName.toUpperCase() == "EDITOR") {
	
        var range = document.selection.createRange();
        range.moveStart("character", -offset);
        var result = range.text.substr(-count);
        if (!result)
	        result = "";
			
        return result;

    } else {
        return node.value.substring(0, node.selectionStart - offset).substr(-count);
    }
}

// need this for bookmarklets
function getSelectedNode() {
  if (document.activeElement)
    return document.activeElement;
  else
    if (window.getSelection && window.getSelection() && window.getSelection().rangeCount > 0) {
        var range = window.getSelection().getRangeAt(0);
        if (range.startContainer && range.startContainer.childNodes && range.startContainer.childNodes.length > range.startOffset)
	        return range.startContainer.childNodes[range.startOffset]
    }
  return null;
}

function toggleCyrMode() {
    var node = getSelectedNode();
    if (node) {
        if (stateHash[node]) {
	        if (removeKeyEventListener(node))
		        delete stateHash[node];
        }
        else {
	        if (addKeyEventListener(node))
		        stateHash[node] = new StateObject(node);
        }
    }
}

function addKeyEventListener(node) {
    if (node.addEventListener)
        node.addEventListener("keypress", transliterateKey, false);
    else if (node.attachEvent)
        node.attachEvent("onkeypress", transliterateKey);
    else return false;
    return true;
}
function removeKeyEventListener(node) {
    if (node.removeEventListener)
        node.removeEventListener("keypress", transliterateKey, false);
    else if (node.detachEvent)
        node.detachEvent("onkeypress", transliterateKey);
    else return false;
    return true;
}

function getSelectedText() {
    if (isExplorer()) {
        return document.selection.createRange().text;
    }
    else {
        var node = getSelectedNode();
        if (node && node.value && node.selectionStart != undefined && node.selectionEnd != undefined)
	        return node.value.substring(node.selectionStart, node.selectionEnd);
    }
    return "";
}


	/* calling functions  */

        function addLoadEvent(func) {
            
            if (window.addEventListener) 
                window.addEventListener("load", func, false);
            else if (window.attachEvent) 
                window.attachEvent("onload", func);
        }

        function addTranslit(editForm,textBox) {
            checkrt(editForm); // check for translit support

            if (textBox.addEventListener) 
                textBox.addEventListener("keypress", processKeys, false);
            else if (textBox.attachEvent) 
                textBox.attachEvent("onkeypress", processKeys);
        }

        function addTextEvent() {

			///////
			if(lija_getCookie('mlWikiTranslit')!=null && lija_getCookie('mlWikiTranslit')!="")  
              realTime=(lija_getCookie('mlWikiTranslit')=="true")?true:false;
            //////

            var editForm =document.getElementById('editform');
            if(editForm != null) {
                var textBox=document.getElementById('wpTextbox1');
                var textSummary = document.getElementById('wpSummary');
                addTranslit(editForm,textBox);
                addCheckbox(editForm,textBox );
                if(textSummary) { addTranslit(editForm,textSummary); }
            }

            // add transliteration feature to search form also
            var searchForm = document.getElementById('searchform');
            if( searchForm != null ) {
				try {
					var searchBox = document.getElementById('searchInput');
					 // add IME checkbox control to searchForm
					if (searchBox != null || searchForm != null) {
						var element = document.createElement("input");
						element.setAttribute("type","checkbox");
						element.setAttribute("id","sbrealtime");
						if (element.addEventListener) 
							element.addEventListener("click", rtClick, false);
						else if (element.attachEvent) 
							element.attachEvent("onclick", rtClick);
						
						// var labelcheckBox = document.createTextNode('മലയാളത്തിലെഴുതുക');					
						var chkSpan = document.createElement("span");
						chkSpan.setAttribute("id","spnRealtime");
						var searchBody = document.getElementById('searchBody');
						searchBody.appendChild(element);
						searchBody.appendChild(chkSpan);
						
						// searchForm.insertBefore(element,searchBox);
						document.getElementById("sbrealtime").checked = realTime;
						document.getElementById('spnRealtime').innerHTML = '<a href="http://ml.wikipedia.org/wiki/സഹായം:ടൈപ്പിംഗ്‌" title="Switches keyboard between Malayalam and English">മലയാളത്തിലെഴുതുക</a>';
						// searchForm.insertBefore(chkSpan,searchBox);
						// var p = document.createElement("p");
						// p.setAttribute("style","width:100%;height:1px;");
						// searchForm.insertBefore(p,searchBox);
					}
				 }
				 catch(ex)
				 {
				  //എററിനെ ഓടിക്കുക.
				 }
				 
				 if(searchBox) { addTranslit(searchForm,searchBox); }
			}             
			
			// add transliteration feature to power search.

            var powerSearchForm = document.getElementById('search');
            if( powerSearchForm != null) { 
               var powerSearchBox = document.getElementById('lsearchbox');
               if( powerSearchBox ) { addTranslit(powerSearchForm, powerSearchBox );}
            } // add transliteration feature to move page.

            var movePageForm = document.getElementById('movepage');
            if( movePageForm != null ) {
                var newTitleBox = document.getElementById('wpNewTitle');
                if( newTitleBox ) {addTranslit(movePageForm, newTitleBox);}
                var reasonBox = document.getElementById('wpReason');
                if( reasonBox ) {addTranslit(movePageForm, reasonBox ); }
                          
            }

               //വിക്കിപീഡിയ:കളരി
               var kalariForm = document.getElementById('createbox');
            if( kalariForm != null ) {

                var kalariText = document.getElementsByName('title')[0];
                if( kalariText ) {addTranslit(kalariForm, kalariText);}
                }

             //അപ്‌ലോഡ് താൾ
            //********************
            var upForm=document.getElementById('upload');
            if(upForm)//ഈ ഫോം ഇല്ലെങ്കിൽ പിന്നെ മുന്നോട്ട് പോകണ്ട.
            {
              var upName=document.getElementById('wpDestFile');
              var upComment=document.getElementById('wpUploadDescription');
              if(upName) addTranslit(upForm,upName);
              if(upComment) addTranslit(upForm,upComment);
            }
           //**************
         
			//പവർ സേർച്ച്
			//**************
			/*   var nsSearchForm=document.getElementById('powersearch');
              if(nsSearchForm)
               {
                     addTranslit(nsSearchForm,document.getElementsByName('search')[1]);
               }*/
			//**************
    }
        

    function addCheckbox(editform,textBox) {


            if(editform==null||textBox==null) return;

                   try
                    {
            var element = document.createElement("input");
            element.setAttribute("type","checkbox");
            element.setAttribute("id","realtime");

            if (element.addEventListener) 
                element.addEventListener("click", rtClick, false);
            else if (element.attachEvent) 
                element.attachEvent("onclick", rtClick);

            var labelcheckBox = document.createTextNode(' മലയാളം എഴുതുവാൻ ഈ ഉപാധി സ്വീകരിക്കുക - Use Ctrl + M to Toggle.');
            editform.insertBefore(element,textBox);
            document.getElementById("realtime").checked = realTime;
            editform.insertBefore(labelcheckBox,textBox);
            var p = document.createElement("p");
            p.setAttribute("style","width:100%;height:1px;");
            editform.insertBefore(p,textBox);
             }
             catch(ex)
             {
              //എററിനെ ഓടിക്കുക.
             }
        }

        var imeStatus = false;
        
        function processKeys(event) {
            if (rtsupported) {
                e = event || window.event;

                var myKeyCode = 0;
                var myShiftKey = false;
                if( document.all ) { //IE
                    myKeycode = e.keyCode;
                    myShiftKey = e.shiftKey;
                } else if ( document.getElementById || document.layers ) {
                    myKeyCode = e.which;
                    myShiftKey = (myKeyCode == 16)?true:false;
                }
                

                if ((e.keyCode == 13 && e.ctrlKey) || (e.which == 109 && e.ctrlKey))
	            {
		            realTime = !realTime;
					lija_setCookie('mlWikiTranslit',realTime,1);//save in cookie
					var chk = document.getElementById('realtime');
					var chkSb = document.getElementById('sbrealtime');
					if (chk) { chk.checked = realTime; }
					if (chkSb) { chkSb.checked = realTime; }
	                return false;
	            }
	            
	            else if ((e.keyCode >= 3328 && e.keyCode <= 3455) || (e.which >= 3328 && e.which <= 3455)) {
	                var chk = document.getElementById('realtime');
					var spanSb = document.getElementById('spnRealtime');
					var chkSb = document.getElementById('sbrealtime');
	                if (imeStatus == false || realTime) {
	                    realTime = false;
					    if (chk) { chk.checked = realTime; chkSb.checked = realTime; spanSb.innerText = chkSb.checked }
					    imeStatus = true;
					   //alert('A Malayalam input tool was detected. Disabling in-built transliteration. To turn it On again use Ctrl+M');
						window.status='A Malayalam input tool was detected. Disabling in-built transliteration. To turn it On again use Ctrl+M';//FF failure
					    // return false;
					}
	            }
                            
                else if (realTime) {
                    imeStatus = false;
                    transliterateKey(event); // call transliteration function
                }
            } 
        }
        var realTime=false;

        function rtClick(event) {
                       realTime = !realTime;
                       lija_setCookie('mlWikiTranslit',realTime,1);//save in cookie
        }

        var rtsupported = false;
        var error; 

        function checkrt(editform) {
            try {
        	
            /*
            var nav = navigator.userAgent.toUpperCase();
            rtsupported = (nav.indexOf("GECKO") >= 0 || nav.indexOf("OPERA") >= 0 || nav.indexOf("SAFARI") >= 0);
            */
        	
                rtsupported = (document.selection != undefined)
        		
                if (!rtsupported) {
	                var element = document.createElement("TEXTAREA");
	                editform.appendChild(element);
        			
	                if (element.selectionStart != undefined)
		                rtsupported = true;
		                editform.removeChild(element);
                }
        		
            } catch (error) {}
        }

		//************************************
		// ട്രാൻസ്‌ലിറ്ററേഷൻ സ്ക്രിപ്റ്റിൽ കൂക്കി സപ്പോർട്ട് ചേർക്കാനുള്ള ശ്രമം

		function lija_getCookie(cookieName)
		{
		if (document.cookie.length>0)
		{ 
		cookieStart=document.cookie.indexOf(cookieName + "=");
		if (cookieStart!=-1)
		{ 
		cookieStart=cookieStart + cookieName.length+1;
		cookieEnd=document.cookie.indexOf(";",cookieStart);
		if (cookieEnd==-1) cookieEnd=document.cookie.length;
		return unescape(document.cookie.substring(cookieStart,cookieEnd));
		} 
		}
		return "";
		}

		function lija_setCookie(cookieName,value,expiredays)
		{
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=cookieName+ "=" +escape(value)+"; path=/"+
		((expiredays==null) ? "" : "; expires="+exdate.toGMTString());
		}

		//************************************

// add this line to your monobook.js to disable in-built transliteration - thanks to Sadik Khalid for this quick tip
 // var userIMEEnabled = false;   // paste this line to user monobook.js and remove // from the begining of this line

// check for user preference and load in-built transliteration tool
  if(typeof(window.userIMEEnabled) == 'undefined') { addLoadEvent(addTextEvent); }
 
/*
</pre></nowiki>
*/

/*
==addLoadEvent==
<pre> */
function addLoadEvent(func) 
{
  addOnloadHook( func );
}

/* </pre> */


/*
== Dynamic Navigation Bars (experimental) ==
<pre> */
 // BEGIN Dynamic Navigation Bars (experimental)
 // FIXME: currently only works for one nav bar on a page at a time
 // ===============================================
 
// set up the words in your language
 var NavigationBarHide = '[ഒളിപ്പിക്കുക]';
 var NavigationBarShow = '[പ്രദർശിപ്പിക്കുക]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1;
 //Honor the User Preferences
 if ( getCookie('WikipediaPreferencesShowNav') != 'true' ) {
         NavigationBarShowDefault = 0;
    } else {
      if ( wgNamespaceNumber == 0 ) NavigationBarShowDefault = 999 ;
    }
/* </pre> */


/*
=== toggleNavigationBar ===*
<pre> */
 // shows and hides content and picture (if available) of navigation bars
 // Parameters:
 //     indexNavigationBar: the index of navigation bar to be toggled
 function toggleNavigationBar(indexNavigationBar)
 {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
        }
    NavToggle.firstChild.data = NavigationBarHide;
    }
 }
 /* </pre> */


/*
=== createNavigationBarToggleButton ===
<pre> */
 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
            
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(
              var j=0; 
              j < NavFrame.childNodes.length; 
              j++
            ) {
              if (NavFrame.childNodes[j].className == "NavHead") {
                NavFrame.childNodes[j].appendChild(NavToggle);
              }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }
 
 }
 
 addLoadEvent(createNavigationBarToggleButton);
 
 // END Dynamic Navigation Bars
 // ======================
/* </pre> */


/*
==Cookies==
<pre> */
//Cookie helpers
//===========
function setCookie(cookieName, cookieValue) {
 var today = new Date();
 var expire = new Date();
 var nDays = 30;
 expire.setTime( today.getTime() + (3600000 * 24 * nDays) );
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";path=/w"
                 + ";expires="+expire.toGMTString();
 document.cookie = cookieName + "=" + escape(cookieValue)
                 + ";path=/wiki"
                 + ";expires="+expire.toGMTString();
}

function getCookie(cookieName) {
  var start = document.cookie.indexOf( cookieName + "=" );
  if ( start == -1 ) return "";
  var len = start + cookieName.length + 1;
  if ( ( !start ) &&
    ( cookieName != document.cookie.substring( 0, cookieName.length ) ) )
      {
        return "";
      }
  var end = document.cookie.indexOf( ";", len );
  if ( end == -1 ) end = document.cookie.length;
  return unescape( document.cookie.substring( len, end ) );
}

function deleteCookie(cookieName) {
  if ( getCookie(cookieName) ) {
    document.cookie = cookieName + "=" + ";path=/w" +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    document.cookie = cookieName + "=" + ";path=/wiki" +
    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
  }
}
/* </pre> */


/*
== Interproject links ==
<pre> */
function Projectlinks() {
        var elements = new Array();
        var spans = document.getElementsByTagName('span');
        
        // filter for projectlinks
        for (var i=0, j=0; i<spans.length; i++) {
                if (spans[i].className == 'interProject') {
                        elements[j] = spans[i].getElementsByTagName('a')[0];
                        j++;
                }
        }
        
        
        if (j) {
                // create navbox
                var plheader = document.createElement('h5');
                plheader.appendChild(document.createTextNode('In other projects'));
                var plbox = document.createElement('div');
                plbox.setAttribute('class','pBody');
                plbox.setAttribute('style','margin-top:0.7em;');
                var pllist = document.createElement('ul');

                // append
                for (var i=0; i<elements.length; i++) {
                        var plitem = document.createElement('li');
                        plitem.appendChild(elements[i]);
                        pllist.appendChild(plitem);
                }
                plbox.appendChild(plheader);
                plbox.appendChild(pllist);
                document.getElementById("p-tb").appendChild(plbox);
        }
}

addLoadEvent(Projectlinks);
/* </pre> */


 /*
==addCharSubsetMenu==
<pre> */

/* add menu for selecting subsets of secial characters  */
/***** must match MediaWiki:Edittools *****/
function addCharSubsetMenu() {
  var edittools = document.getElementById('editpage-specialchars');

  if (edittools) {
    var menu = "<select id=\"charSubsetControl\" style=\"display:inline\" onChange=\"chooseCharSubset(selectedIndex)\">";
    menu += "<option>ഫലകങ്ങൾ</option>";
    menu += "<option>വിക്കിവിന്യാസങ്ങൾ</option>";
    menu += "<option>മലയാളം</option>";
    menu += "<option>കൊറിയൻ</option>";
    menu += "<option>ലത്തീൻ</option>";
    menu += "<option>ഐ.പി.എ.</option>";
    menu += "<option>പലവക</option>";
    menu += "<option>അറബി</option>";
    menu += "<option>ദേവനാഗരി</option>";
    menu += "<option>ഹിബ്രു</option>";
    menu += "<option>പഴയ ഇംഗ്ലീഷ്</option>";
    menu += "</select>";
    edittools.innerHTML = menu + edittools.innerHTML;

    /* default subset from cookie */
    var s = parseInt( getCookie('edittoolscharsubset') );
    if ( isNaN(s) ) s = 0;

    /* update dropdown control to value of cookie */
    document.getElementById('charSubsetControl').selectedIndex = s; 

    /* display the subset indicated by the cookie */
    chooseCharSubset( s );
  }
}
/* </pre> */

/* 
===chooseCharSubsetMenu===
<pre> */
/* select subsection of special characters */
function chooseCharSubset(s) {
  var l = document.getElementById('editpage-specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
  setCookie('edittoolscharsubset', s);
}


/* </pre> */

/* 
== customizeWikipedia ==
<pre> */

function customizeWikipedia() {
  addCharSubsetMenu();
}
 
addLoadEvent(customizeWikipedia);

/* </pre> */