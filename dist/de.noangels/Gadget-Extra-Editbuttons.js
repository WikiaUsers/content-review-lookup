//============================================================
// en: ADD SOME EXTRA BUTTONS TO THE EDITPANEL [[:en:User:MarkS/Extra edit buttons]]
// de: FÜGE NEUE BUTTON IN DIE WERKZEUGLEISTE [[:de:Benutzer:Olliminatore/Extra-Editbuttons]]
//   Converted by [[User:Olliminatore]] 25.09.2006 
//============================================================
// de: Die Reihenfolge und Anzahl der Buttons ist über die (alphabetische) Variable customEditButtons wählbar.
//

var XEBOrder=[];
var attributes = ["imageFile","speedTip","tagOpen","tagClose","sampleText"];
// isMSIE55

//fills the variable mwCustomEditButtons (s. function in /wikibits.js), with buttons for the toolbar  
function addCustomButton(){
 var a = {};
 for (d in attributes) a[attributes[d]] = arguments[d];
 mwCustomEditButtons.push(a);
};

if (typeof usersignature == 'undefined') var usersignature = '-- \~\~\~\~';

var Isrc='http://upload.wikimedia.org/wikipedia/commons/';
var BDict={
'A':['e/e9/Button_headline2.png','Sekundäre Überschrift','\n=== ',' ===','Sekundäre Überschrift'],
'A3':['/3/3a/Button_headline3.png','Untergeordnete Überschrift','\n==== ',' ====','Untergeordnete Überschrift'],
'B':['1/13/Button_enter.png','Zeilenumbruch','<br />','',''],
 'B1':['6/62/Button_desambig.png','Begriffsklärungseite','{{Begriffsklärung}}','',''],
 'B2':['5/5e/Button_disambig_small.png','Dieser Artikel erläutert…','{{Dieser Artikel|','}}','erläutert den Buchstaben X, zu anderen Bedeutungen siehe [[X (Begriffsklärung)]].'],
 'B3':['5/5e/Button_disambig_small.png','Begriffsklärungshinweis','{{Begriffsklärungshinweis}}','',''],
 'C':['5/5f/Button_center.png','Zentriert','<div style="text-align: center;">\n','\n<\/div>','Zentriert'],
 'CF':['3/37/Btn_toolbar_commentaire.png','Chemische Formel',':<math>\u005Cmathrm{','}</math>',''],
 'CO':['6/6c/Button_commons.png','Commons','{{Commons|Category:','}}','Seitenname'],
'D':['e/ea/Button_align_left.png','Left-Align','<div style="text-align: left; direction: ltr; margin-left: 1em;">\n','\n<\/div>','Left-aligned Text'],
 'DS':['4/4e/Button_romain.png','SORTIERUNG','{{SORTIERUNG:','}}','Sortierbegriff'],
 'DO':['e/e9/Button_done.png','Erledigt (kurz)','{{Erl.}}','',''],
 'ER':['9/9d/Button_fait.png','Erledigt (lang)','{{Erledigt|1=' + usersignature,'}}',''],
'E':['0/04/Button_array.png','Tabelle','\n{| class="wikitable" \n|- \n| 1 || 2\n|- \n| 3 || 4','\n|}\n',''],
'F':['8/8f/Button_poeme.png','Farbiger Text','<span style="color: color">','<\/span>','Farbig'],
'FS':['1/1b/Button_miss_signature.png','Fehlende Signatur','\{\{subst\:Unsigned|','}}','BENUTZER'],
'G':['9/9e/Btn_toolbar_gallery.png','Bildergalerie',"\n<gallery>\nDatei:M63.jpg|[[M63]]\nDatei:Mona Lisa.jpg|[[Mona Lisa]]\nDatei:Truite arc-en-ciel.jpg|Eine [[Forelle ]]\n<\/gallery>","",''],
'H':['7/74/Button_comment.png','Versteckter Kommentar',"<!--","-->",'Versteckt'],
'I':['4/41/Button_hr_halfwidth.png','Gedankenstrich','–','',''],
'I1':['6/6a/Button_sup_letter.png','Hochgestellter Text (superscript)','<sup>','<\/sup>','Hochgestellt'],
'I2':['a/aa/Button_sub_letter.png','Tiefgestellter Text (subscript)','<sub>','<\/sub>','Tiefgestellt'],
'J1':['5/58/Button_small.png','Kleingeschriebener Text (small)','<small>','<\/small>','Klein'],
'J2':['5/56/Button_big.png','Größerer Text (big)','<big>','<\/big>','Groß'],
'K':['b/b4/Button_category03.png','Kategorie',"[[Kategorie:","]]",'Name der Kategorie'],
'KR':['b/b1/Button_dagger.png','Kreuz','†','',''],
'L':['8/8e/Button_shifting.png','Setze Tab(s)',':','',':'],
'M':['f/fd/Button_blockquote.png','Markiert ein Zitat mit Absatz','<blockquote style="border: 1px solid blue; padding: 2em;">\n','\n<\/blockquote>','Text'],
'N':['4/4b/Button_nbsp.png','Geschütztes Leerzeichen (nonbreaking space)','&nbsp;','',''],
'NT':['b/bf/Button_thinsp.png','Schmales geschütztes Leerzeichen','&thinsp;','',''],
'O':['2/23/Button_code.png','Code einfügen','<code>','<\/code>','Code'],
'P':['3/3c/Button_pre.png','Vorformatierter Text','<pre>','<\/pre>','Präformatierter Text'],
'P1':['9/93/Button_sub_link.png','Link zu einem Seiten-Abschnitt','[[Seite#',']]','Abschnitt'],
'PF':['f/ff/Button_arrow_right.png','Pfeil nach rechts','\u2192','',''],
'PD':['e/ee/Button_vote_biblio.png','Personendaten','{{Personendaten\n|NAME=\n|ALTERNATIVNAMEN=','\n|KURZBESCHREIBUNG=\n|GEBURTSDATUM=\n|GEBURTSORT=\n|STERBEDATUM=\n|STERBEORT=\n}}',''],
'PO':['c/c7/Button_polytonique.png','Unicode-Sonderzeichen der altgriechischen Schrift','{{Polytonisch|','}}','Text'],
'Q':['d/d3/Button_definition_list.png','Definitionsliste','\n; ',' : ','Text'],
'Q1':['0/05/Button_Anf%C3%BChrung.png','Anführungszeichen',"„","“",'Text'],
'Q2':['2/26/Button_latinas.png','Latinas',"«","»",'Text'],
'Q3':['b/bc/Button_guillemet.png','Guillemets',"»","«",'Text'],
'R':['7/79/Button_reflink.png','Markiere eine Referenz','<ref>','<\/ref>','Bezugsangabe'],
'R1':['c/c4/Button_ref.png','Referenz mit Name','<ref name="">','<\/ref>','Bezugsangabe'],
'R2':['f/fe/Button_refs.png','Wiederholungs-Referenz','<ref name="','"/>','Referenzname'],
'R3':['9/9a/Button_references.png','Referenz-Footer','\n== Einzelnachweise ==\n<references />\n','',''],
 'RD':['7/70/Button_fusion.png','Redundanz','{{subst:Redundanz|','}}','Artikel1|Artikel2|Artikel3…'], 
'S':['c/c9/Button_strike.png','Durchgestrichener Text',"<s>","<\/s>",'Durchgestrichen'],
 'SA':['b/bb/Seealso.png','Siehe auch','\n== Siehe auch ==\n','',''],
 'SC':['0/02/Button_S_yellow.png','SourceCode hervorheben','<source lang="javascript">',"<\/source>",'Quelltext'], 
 'SM':['7/74/Button_oeil.png','Smiley','<tt style="background:#FE3">','</tt>',':D'],
 'ST':['7/72/Button_span_2.png','span-tag mit CSS-Angabe','<span style="">','<\/span>','Markierter Inhalt'],
'T':['e/eb/Button_plantilla.png','Vorlage','{{','}}','Vorlagenname'],
 'TL':['e/eb/Button_templatelink.png','Vorlagenlink','{{[[Vorlage:','|]]}}','Vorlagenname'],
 'TT':['3/30/Tt_icon.png','Schreibmaschinenstil','<tt>','<\/tt>','Teletyper Text'],
'U':['f/fd/Button_underline.png','Unterstreichen',"<u>","<\/u>",'Unterstrichener Text'],
 'UR':['e/ec/Button_aviso.png','Urheberrecht ungeklärt',"{{Urheberrecht ungeklärt}}","",''],
 'URV':['9/9d/Button_halt.png','Urheberrechtsverletzung',"{{URV}} [","] " + usersignature,'Url'],
'V':['c/c8/Button_redirect.png','Weiterleitung (Redirect)',"#WEITERLEITUNG [[","]]",'Ziel einfügen'],
'VP':['b/ba/Button_conserver.png','Vote *pro*',"# {{pro}} " + usersignature,"",''],
'VC':['f/fc/Button_supp.png','Vote *contra*',"# {{contra}} " + usersignature,"",''],
'VN':['4/4e/Button_neutre.png','Vote *neutral*',"# {{neutral}} " + usersignature,"",''],
 'WB':['6/61/Button_wikibooks.png','Wikibooks',"{{Wikibooks","}}",'|Seitenname'],
 'WS':['e/eb/Button_wikisource.png','Wikisource',"{{Wikisource","}}",'|Seitenname'],
 'WT':['b/bf/WP-icon.png','Wiktionary',"{{Wiktionary","}}",'|Seitenname'],
 'WV':['b/b5/Button_wikiversity.png','Wikiversity',"{{Wikiversity","}}",'|Seitenname'],
'W':['8/88/Btn_toolbar_enum.png','Nummerierung',"\n# Element 1\n# Element 2\n# Element 3","",''],
'X':['1/11/Btn_toolbar_liste.png','Liste',"\n* Element A\n* Element B\n* Element C","",''],
'Y1':['c/ce/Button_no_include.png','No Include',"<noinclude>","<\/noinclude>",'Text'],
'Y2':['7/79/Button_include.png','Include only',"<includeonly>","<\/includeonly>",'Text'],
'Z':['3/35/Button_substitute.png','Ersetzen',"{{subst:","}}",'Vorlage'],
 'ZI':['8/83/Button_biocitas.png','Zitat',"{{Zitat|","}}",'Text|Autor (optional)|Quelle (optional)'],
 'T1':['c/c6/Blending_blue_button_background.png','Spacer (no function)','','','']
};


function initButtons(){
  var bc,d;
     if (typeof customEditButtons!='string') // can be modified
	XEBOrder="A,A3,B,E,F,G,H,I1,I2,J1,K,M,Q,R,R1,R2,R3,S,T,U,V,W,X".split(",");
     else if (customEditButtons.toLowerCase()=='all') 
	for (b in BDict) XEBOrder.push(b);
     else XEBOrder=customEditButtons.split(",");

	for (b in BDict) BDict[b][0] = Isrc+BDict[b][0]; // // Add the start of the URL (Isrc) to the XEB buttons
	// If the user has defined any buttons then add them into the available button lists 
	if (typeof myButtons=='object')
	  for (b in myButtons) BDict[b] = myButtons[b];	// custom user buttons
  // Add the media wiki standard buttons into the available buttons 
	for (b in mwEditButtons) { // add standard buttons for full XEB order changing
		BDict[b]=[];
	//	for (d in mwEditButtons[b]) 
		for (d in attributes) BDict[b].push(mwEditButtons[b][attributes[d]]);
	}
	
	// Build the new buttons 
	for (i=0;i<XEBOrder.length;i++) {
		bc = BDict[XEBOrder[i]];
		//try { // catch not existing button names
		addCustomButton(bc[0],bc[1],bc[2],bc[3],bc[4]);
		//}
		// catch(e) {continue}
	}
	// Remove the default buttons (if requested by the user)
	eraseButtons();
};

//============================================================
// Table generator 
//============================================================
/** en: Generate an array using Mediawiki syntax
* @author: originally from fr:user:dake
* @version: 0.2 */
function generateTable(caption, exhead, nbCol, nbRow, exfield, align){
	var code = "\n";
	code += '{| class="wikitable" ' + align + '\n'
		+ caption + exhead;
	if (exfield) code += '!\n';
	for (i=1;i<nbCol+1;i++) code += '! FELD ' + i + '\n';
	var items = 0;
	for (var j=0;j<nbRow;j++){
		if (exfield) { 
			items++;
			code += '|-\n! style="background: #FFDDDD;"|ITEM ' + items + '\n';
		}	else code += '|-\n';
		for (i=0;i<nbCol;i++) code += '| Element\n';
	}
	code += '|}\n';
	insertTags('','', code);
	editform.elements['wpSummary'].value+=' table+';
	return false
};


/** en: Open a popup with parameters to generate an array. 
* The number of rows/columns can be modified.
* @author: originally fr:user:dake 
* @version: 0.2 */
function popupTable(){
  var popup = window.open('about:blank','WPtable','height=400,width=400,scrollbars=yes');
  var javaCode = '<script type="text\/javascript">function insertCode(){'
  +'var caption = (document.paramForm.inputCaption.checked)?"\|\+ TABLE CAPTION \\n":""; '
	+'var exhead = (document.paramForm.inputHead.checked)?\'\|\- style=\"background: #DDFFDD;\"\\n\':""; '
  +'var row = parseInt(document.paramForm.inputRow.value); '
  +'var col = parseInt(document.paramForm.inputCol.value); '
  +'var exfield = document.paramForm.inputItems.checked; '
  +'var align = (document.paramForm.inputAlign.checked)?\'align="center"\':""; '
  +'window.opener.generateTable(caption,exhead,col,row,exfield,align); '
  +'window.close()}<\/script>';
  
  popup.document.write('<html><head><title>Make table<\/title>'
// +'<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><\/script>'
//+'<style type="text\/css" media="screen,projection">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; /*]]>*/<\/style>'
  + javaCode +'<\/head><body>'
  +'<p>Enter the table parameters below: <\/p>'
  +'<form name="paramForm">'
	+'Table caption: <input type="checkbox" name="inputCaption"><p\/>'
  +'Table alignment: center<input type="checkbox" name="inputAlign"><p\/>'
	+'Table headline: colored<input type="checkbox" name="inputHead"><p\/>'
  +'Number of rows: <input type="text" name="inputRow" value="3" size="2"><p\/>'
  +'Number of columns: <input type="text" name="inputCol" value="3" size="2"><p\/>'
  //+'Alternating grey lines: <input type="checkbox" name="inputLine" checked="1" ><p\/>'
  +'Item column: <input type="checkbox" name="inputItems" ><p\/>'
  +'<\/form">'
  +'<i>The default table allows for fields and values only.<\/i><p\/>'
  +'Check "Item column" to allow for the table to have fields, items, and values.<\/i><p\/>'
  +'<p><a href="javascript:insertCode()"> Insert table into window<\/a> &nbsp;&nbsp;&nbsp; |'
  +' &nbsp;&nbsp;&nbsp;<a href="javascript:self.close()">Cancel<\/a><\/p>'
  +'<\/body><\/html>');
  popup.document.close();
  return false
};


/** en: Removes arbitrary standard buttons from the toolbar
* @author: [[:de:User:Olliminatore]]
* @version: 0.2 (01.10.2006) **/
function eraseButtons(){
	if(typeof rmEditButtons!='object') return;
	if (typeof rmEditButtons[0] == 'string' && rmEditButtons[0].toLowerCase() == 'all') 
		return mwEditButtons=[];
	//Remove the buttons the user doesn't want 
	for(i=0;i<rmEditButtons.length;i++){
		var n=rmEditButtons[i]-i;
		if(n>=0 && n<mwEditButtons.length){
			if(n<mwEditButtons.length){
				var x = -1;
				while((++x)<mwEditButtons.length)
					if(x>=n)
						mwEditButtons[x] = mwEditButtons[x+1];
			}
		mwEditButtons.pop();
		}
	}
};

// Adds extended onclick-function to some buttons 
function extendButtons(){
	if(!(allEditButtons = document.getElementById('toolbar'))) return false;
	if(typeof editform == 'undefined')
		if(!(window.editform = document.editform)) return false;

	XEBOrder.getIndex = function (item){
	 if(is_gecko) return this.indexOf(item);
	 else //is IE (Opera < 9)
		 for (var i=0;i < this.length;i++) if (this[i]==item) return Number(i);
   	return -1
	}
	var searchbox = allEditButtons.getElementsByTagName('span')[0];
	if (searchbox) allEditButtons.appendChild(searchbox) // pay Zocky/Search Box
	
	allEditButtons = allEditButtons.getElementsByTagName('img');

	var bu_len = mwEditButtons.length;
	var c=0;

	if(!allEditButtons.length) return false;

	// own signature
	if (bu_len>0){
		if(typeof rmEditButtons=='object' && rmEditButtons.pop()==10) c=1;
			mwEditButtons[bu_len-2+c].tagOpen=usersignature;
		if(usersignature != '-- \~\~\~\~')
			allEditButtons[bu_len-2+c].src=Isrc+'d/d1/Button_mysignature.png';
	}

	//  table
	if((c=XEBOrder.getIndex('E')) != -1) allEditButtons[bu_len+c].onclick=popupTable;

	// redirect
	c=XEBOrder.getIndex('V');
	if(c != -1)
		allEditButtons[bu_len+c].onclick=function(){
		 if (a = window.prompt("Wohin soll der Redirect\?", "")) {
		 a = '\#WEITERLEITUNG \[\[' + a + '\]\]';
		 editform.wpTextbox1.value=a;
		 editform.wpSummary.value=a; // not more needed?
		 editform.wpWatchthis.checked=false
		 }
  		};
	
	// spacer width
	if((c = XEBOrder.getIndex('T1')) != -1) allEditButtons[bu_len+c].width = 6;
};

if ((wgAction=="edit") || (wgAction=="submit"))
        addOnloadHook(initButtons);

if(!wgIsArticle) // only if edit
	hookEvent("load", extendButtons);