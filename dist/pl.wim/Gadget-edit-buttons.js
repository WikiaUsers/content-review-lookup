/**
* Dodaj przyciski do końca paska narzędzi
*/
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText, imageId) {
mwCustomEditButtons[mwCustomEditButtons.length] =
{"imageId": imageId,
"imageFile": imageFile,
"speedTip": speedTip,
"tagOpen": tagOpen,
"tagClose": tagClose,
"sampleText": sampleText};
}
 
/**
 * Générateur de tableaux
 * English: Generate an array using Mediawiki syntax
 *
 * @author: fr:user:dake
 * @version: 0.2
 */
 
function generateTableau(nbCol, nbRow, styleHeader) {
  var code = "\n{| " +
    ((styleHeader==1) ? 'class="wikitable"' : '')+
    '\n|+ Tytuł tabeli\n';
 
  for (var i=0; i<nbCol; i++) code += '! nagłówek ' + (i+1) + '\n';
 
  for (var j=0; j<nbRow; j++) {
    code += '|-\n';
    for (var i=0; i<nbCol; i++) code += '| komórka\n';
  }
 
  code += '|}';
  insertTags('','', code);
}
 
/**
 * English: Open a popup with parameters to generate an array. 
 * The number of rows/columns can be modified. Some additional
 * parameters are related to templates available on :fr
 *
 * @author: fr:user:dake
 * @version: 0.1
 */
 
function popupTableau() {
  var popup = window.open('','name','height=400,width=500');
 
  javaCode =  '<script type="text\/javascript">function insertCode(){';
  javaCode += 'var row = parseInt(document.paramForm.inputRow.value); ';
  javaCode += 'var col = parseInt(document.paramForm.inputCol.value); ';
  javaCode += 'var styleHeader = document.paramForm.inputHeader.checked; ';
  javaCode += 'var wgBreakFrames = false; ';
  javaCode += 'window.opener.generateTableau(col,row,styleHeader); ';
  javaCode += '}<\/script>';
 
  popup.document.write('<html><head><title>Parametry tworzonej tabeli</title>');
  popup.document.write(javaCode); 
  popup.document.write('<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><!-- wikibits js --><\/script>');
  popup.document.write('<style type="text\/css" media="screen">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; /*]]>*/<\/style>');
  popup.document.write('</head><body>');
  popup.document.write('<p>Wpisz parametry tworzonej tabeli: </p>');
  popup.document.write('<form name="paramForm">');
  popup.document.write('Liczba wierszy: <input type="text" name="inputRow" value="3" ><p>');
  popup.document.write('Liczba kolumn: <input type="text" name="inputCol" value="3" ><p>');
  popup.document.write('Styl "wikitabelki" (wikitable): <input type="checkbox" name="inputHeader" checked="1" ><p>');
  popup.document.write('</form">');
  popup.document.write('<p><a href="javascript:insertCode()">Wstaw kod tabeli do pola edycji</a></p>');
  popup.document.write('<p><a href="javascript:self.close()">Zamknij okno</a></p>');
  popup.document.write('</body></html>');
  popup.document.close();
}
 
/**
 * Insertion de nouveaux boutons dans la barre d'outil
 */
 
addCustomButton('/skins-1.5/common/images/button_hr.png',
                'Wstaw półpauzę',
                '–',
                '',
                '',
                'mw-editbutton-hyphen');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/0/04/Button_array.png',
                'Tabela',
                '{|\n|-\n|\n|\n|}',
                '',
                '',
                'tabela_przycisk');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/c/c9/Button_strike.png',
                'Przekreślenie',
                '<del>',
                '</del>',
                '',
                'mw-editbutton-strike');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png',
                'Indeks górny',
                '<sup>',
                '</sup>',
                'Tekst indeksem górnym');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png',
                'Indeks dolny',
                '<sub>',
                '</sub>',
                'Tekst indeksem dolnym');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/8/88/Btn_toolbar_enum.png',
                'Lista numerowana',
                '\n# element 1\n# element 2\n# element 3',
                '',
                '',
                'mw-editbutton-enum');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/1/11/Btn_toolbar_liste.png',
                'Lista wypunktowana',
                '\n* element A\n* element B\n* element C',
                '',
                '',
                'mw-editbutton-liste');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png',
                'Galeria obrazków',
                '\n<gallery>\n',
                '\n</gallery>\n',
                'Plik:Przykład.jpg|opis 1\nPlik:Przykład1.jpg|[[Jacuzzi]]\nPlik:Przykład2.jpg|[[chomik]]',
                'mw-editbutton-gallery');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/4/47/Button_redir.png',
                'Przekierowanie',
                '#PATRZ [[',
                ']]',
                'Nazwa artykułu docelowego',
                'mw-editbutton-redir');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png',
                'Kategoria',
                '[[Kategoria:',
                ']]',
                'Nazwa kategorii',
                'mw-editbutton-category');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png',
                'Szablon',
                '{{',
                '}}',
                'szablon do załączenia',
                'mw-editbutton-template');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png',
                'Wstaw ukryty komentarz',
                '<!--',
                '-->',
                '',
                'mw-editbutton-comment');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/c/c4/Button_ref.png',
                'Dodaj przypis',
                '<ref>',
                '</ref>',
                'przypis, informacje o źródle',
                'mw-editbutton-ref');
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/f/fe/Button_refs.png',
                'Wstaw listę przypisów',
                '{{Przypisy}}',
                '',
                '',
                'mw-editbutton-references');
 
var sekcjeKoncowe = '== Zobacz też ==\n'
 + '* [[Przykład]]\n\n'
 + '{{Przypisy}}\n\n'
 + '== Bibliografia ==\n'
 + '{{Bibliografia start}}\n'
 + '# [[Przykład]]\n'
 + '{{Bibliografia stop}}\n\n'
 + '== Linki zewnętrzne ==\n'
 + '* \n\n'
 
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/5/59/Button_sekcje.png',
                'Sekcje końcowe (Zobacz też, Przypisy, Bibliografia, Linki zewnętrzne)',
                sekcjeKoncowe,
                '',
                '',
                'mw-editbutton-voiraussi');
 
/**
 * Changer le lien du bouton de création de tableau et supprime le bouton signature sur les articles
 */
function changButtons() {
  toolbarArray = returnObjById('tabela_przycisk');
  if (toolbarArray) {
    toolbarArray.onclick = function() {
      popupTableau();
      return false;
    }
  }
 
  var btnSigImg = returnObjById('mw-editbutton-signature');
  if (btnSigImg && wgNamespaceNumber == 0) btnSigImg.style.display = "none";
  var btnHrImg = returnObjById('mw-editbutton-hr');
  if (btnHrImg) btnHrImg.style.display = "none";
}
hookEvent( 'load', changButtons );
//</nowiki>