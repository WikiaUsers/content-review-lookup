/*
== Inserción de caracteres especiales en la caja de edición ==
Aquí se definen las listas de caracteres especiales que aparecen bajo la caja de edición. Anteriormente se definían en [[MediaWiki:Edittools]] y [[MediaWiki:Monobook.js]] les agregaba un menú. Esto tenía varias desventajas:
* Los que no usaban ''monobook'' o no usaban javascript sólo veían el primer recuadro. El resto quedaba oculto por el CSS, y no podían acceder a ellos ya que el menú no les aparecía.
* A los que no usaban CSS les aparecían '''todos''' los recuadros bajo la caja de edición. Varias páginas de caracteres especiales, la mayoría redundantes o innecesarios.
* El código generado eran unos '''90 KB''' que se agregaba al HTML de todas las páginas de edición, sin posibilidad de ''cachearlo'' a pesar de ser invariable.
La solución es dejar en [[MediaWiki:Edittools]] un conjunto mínimo de caracteres especiales indispensables y generar los distintos recuadros y el menú directamente mediante javascript. Esto trae los siguiente beneficios:
* La página queda aligerada para los que usen y los que no usen esta funcionalidad.
* Los datos y el código generador (este archivo) quedan en la ''caché'' del navegador del usuario.
* Al usar una sintaxis distinta al &lt;charinsert> se pueden poner espacios y ''titles'' en los caracteres a insertar.
A su vez, tiene algunas desventajas:
* Hay que usar la sintaxis de javascript y no se pueden cometer errores.
* No se reconoce la sintaxis wiki.
* Requiere procesamiento del lado del usuario.

== Instrucciones ==
Se definen cuatro (cinco) funciones:
* <code>seccion("<i>nombre</i>");</code> — se usa para iniciar una nueva sección (y entrada en el menú).
* <code>texto("<i>texto</i>");</code> — para insertar texto (separadores, &lt;br>s, lo que sea).
* <code>p();</code> — sólo el equivalente a “<code>texto(" · ");</code>”, para ahorrar tecleo.
* <code>caracter("<i>texto a insertar</i>", "<i>title</i>");</code> — genera código para insertar el texto. Con un signo <code>+</code> se marca dónde debe quedar el cursor tras la inserción. Se le puede poner (el segundo parámetro es opcional) un ''title'' que se mostrará cuando el cursor del mouse pase por arriba del caracter.
* <code>caracteres("<i>texto_a_insertar texto_a_insertar ...</i>");</code> — como el &lt;charinsert>: se separa el parámetro por los espacios y se genera código para insertar cada una de las partes.

A continuación se definen las funciones.

<pre><nowiki> */

function GeneraCaracteresEspeciales()
{
  var s = "";
  var escapeHTML = function(txt)
  {
     txt = txt.replace(/&/g, '&amp;');
     txt = txt.replace(/</g, '&lt;');
     txt = txt.replace(/>/g, '&gt;');
     return txt;
  }
  var escapeJS = function(txt)
  {
    txt = escapeHTML(txt);
    txt = txt.replace(/"/g, '\\&quot');
    txt = txt.replace(/\\/, '\\\\');
    txt = txt.replace(/'/, "\\'");
    return txt;
  }
  var seccion = function(nombre)
  {
    if (s != "") s += "</p>"
    s += "<p class=\"specialbasic\" title=\"" + nombre + "\">";
  };
  var texto    = function(txt) { s += txt; };
  var p        = function() { s += " · "; };
  var caracter = function(car, title)
  {
    var pre = ""; var post = "";
    if (car == "+") pre = car;
    else
    {
      var partes = car.split("+");
      pre = partes.shift();
      post = partes.join("+");
    }
    s += "<a href=\"#\" onclick=\"insertTags('" +
           escapeJS(pre)  + "', '" +
           escapeJS(post) + "', '');return false\"";
    if (title) s += " title=\"" +
                      escapeHTML(title).replace(/"/g, '&quot;') + "\"";
    s += ">" + escapeHTML(pre + post) + "</a>\n";
  };
  var caracteres = function(cars)
  {
    var arr = cars.split(/\s+/);
    for (var i in arr)
    {
      if (arr[i]) caracter(arr[i]);
    }
  };
/*
</nowiki></pre>

== Definiciones ==
=== Varios ===
<pre><nowiki> */
seccion("Varios");

texto("<small><b>Sintaxis wiki</b></small>"); p();
caracter("[[+]]",          "Enlace interno"); p();
caracter("[+]",            "Enlace externo"); p();
caracter("{{+}}",          "Plantilla");      p();
caracter("[[Categoría:+]]","Categorización"); p();
caracter("[[:Imagen:+]]",  "Enlace a imagen");p();
caracter("[[Media:+]]",    "Inserción de contenido multimedia"); p();
caracter("<gallery>+</gallery>", "Galería de imágenes"); p();
caracter("#REDIRECT [[+]]", "Redirección");   p();
caracter("<!-- + -->",      "Comentario HTML"); p();

texto("<small><b>Tipografía</b></small>"); p();
caracter("–",    "Menos");
caracter("—",    "Raya"); p();
caracter("“+”",  "Comillas altas");
caracter("‘+’",  "Comillas simples"); p();
caracter("«+»",  "Comillas latinas");
caracter("‹+›",  "Comillas latinas simples"); p();
caracter("„+“",  "Comillas alemanas");
caracter("‚+‘",  "Comillas alemanas simples"); p();
caracter("¿+?",  "Interrogación"); p();
caracter("¡+!",  "Exclamación");   p();
caracteres("~ | °");         p();
caracteres("· × ² ³ ½ € †"); p();

texto("<small><b>Ordinales</b></small>"); p();
caracteres("ª º"); p();

texto("<small><b>Letras c/diacríticos</b></small>"); p();
caracteres("Á É Í Ñ Ó Ú Ü"); p();
caracteres("á é í ñ ó ú ü"); p();

texto("<small><b>Matemática</b></small>"); p();
caracteres("∈ → ≠ ℕ ℤ ℚ ℝ");
/* </nowiki></pre>

=== Alfabeto latino con diacríticos ===
<pre><nowiki> */

seccion("Latino c/diacr.");

texto("<b>á</b>"); p();
caracteres("Á Ć É Í Ĺ Ń Ó Ŕ Ś Ú Ý Ź"); p();
caracteres("á ć é í ĺ ń ó ŕ ś ú ý ź"); p();

texto("<b>à</b>"); p();
caracteres("À È Ì Ò Ù"); p(); caracteres("à è ì ò ù"); p();

texto("<b>â</b>"); p();
caracteres("Â Ĉ Ê Ĝ Ĥ Î Ĵ Ô Ŝ Û Ŵ Ŷ Ẑ"); p();
caracteres("â ĉ ê ĝ ĥ î ĵ ô ŝ û ŵ ŷ ẑ"); p();

texto("<b>ä</b>"); p();
caracteres("Ä Ë Ḧ Ï Ö Ü Ẅ Ẍ Ÿ"); p();
caracteres("ä ë ḧ ï ö ü ẅ ẍ ÿ"); p();

texto("<b>ã</b>"); p();
caracteres("Ã Ẽ Ĩ Ñ Õ Ũ Ṽ Ỹ"); p();
caracteres("ã ẽ ĩ ñ õ ũ ṽ ỹ"); p();

texto("<b>č</b>"); p();
caracteres("Č Ď Ě Ľ Ň Ř Š Ť Ž"); p();
caracteres("č ď ě ľ ň ř š ť ž"); p();

texto("<b>ā</b>"); p();
caracteres("Ā Ē Ḡ Ī Ō Ū"); p();
caracteres("ā ē ḡ ī ō ū"); p();

texto("<b>ă</b>"); p();
caracteres("Ă Ĕ Ğ Ĭ Ŏ Ŭ"); p();
caracteres("ă ĕ ğ ĭ ŏ ŭ"); p();

texto("<b>ç</b>"); p();
caracteres("Ç Ḑ Ģ Ḩ Ķ Ļ Ņ Ŗ Ş Ţ"); p();
caracteres("ç ḑ ģ ḩ ķ ļ ņ ŗ ş ţ"); p();

texto("<b>å</b>"); p();
caracteres("Å Ů"); p();
caracteres("å ů"); p();

texto("<b>ą</b>"); p();
caracteres("Ą Ę Į Ǫ Ų"); p();
caracteres("ą ę į ǫ ų"); p();

texto("<b>ő</b>"); p();
caracteres("Ő Ű"); p();
caracteres("ő ű"); p();

texto("<b>ø</b>"); p();
caracteres("Đ Ǥ Ħ Ł Ø Ŧ Ƶ"); p();
caracteres("đ ð ǥ ħ ł ø ŧ ƶ"); p();

caracteres("ß"); p(); caracteres("Æ æ Œ œ"); p(); caracteres("Þ þ");

/* </nowiki></pre>

=== Alfabeto fonético internacional ===
<pre><nowiki> */

seccion("Alfabeto fonético");

caracteres(" ʈ ɖ ɟ ɡ ɢ ʡ ʔ "); p(); 
caracteres(" ɸ ʃ ʒ ɕ ʑ ʂ ʐ ʝ ɣ ʁ ʕ ʜ ʢ ɦ "); p(); 
caracteres(" ɱ ɳ ɲ ŋ ɴ "); p(); 
caracteres(" ʋ ɹ ɻ ɰ "); p(); 
caracteres(" ʙ ʀ ɾ ɽ "); p(); 
caracteres(" ɫ ɬ ɮ ɺ ɭ ʎ ʟ "); p(); 
caracteres(" ɥ ʍ ɧ "); p(); 
caracteres(" ɓ ɗ ʄ ɠ ʛ "); p(); 
caracteres(" ʘ ǀ ǃ ǂ ǁ "); p(); 
caracteres(" ɨ ʉ ɯ "); p(); 
caracteres(" ɪ ʏ ʊ "); p(); 
caracteres(" ɘ ɵ ɤ "); p(); 
caracteres(" ɚ "); p(); 
caracteres(" ɛ ɜ ɝ ɞ ʌ ɔ "); p(); 
caracteres(" ɐ ɶ ɑ ɒ "); p(); 
caracteres(" ʰ ʷ ʲ ˠ ˤ ⁿ ˡ "); p(); 
caracteres(" ˈ ˌ ː ˑ ");

/* </nowiki></pre>

=== Alemán ===
<pre><nowiki> */

seccion("Alemán");

caracteres("Ä Ö Ü"); p();
caracteres("ä ö ü"); p(); caracteres("ß");

/* </nowiki></pre>

=== Árabe ===
<pre><nowiki> */

seccion("Árabe");
caracteres("ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي"); p(); 
caracteres("ﺍ ﺑ ﺗ ﺛ ﺟ ﺣ ﺧ ﺩ ﺫ ﺭ ﺯ ﺳ ﺷ ﺻ ﺿ ﻃ ﻇ ﻋ ﻏ ﻓ ﻗ ﻛ ﻟ ﻣ ﻧ ﻫ ﻭ ﻳ"); p();
caracteres("ﺍ ﺒ ﺘ ﺜ ﺠ ﺤ ﺨ ﺪ ﺬ ﺮ ﺰ ﺴ ﺸ ﺼ ﻀ ﻄ ﻈ ﻌ ﻐ ﻔ ﻘ ﻜ ﻠ ﻤ ﻨ ﻬ ﻮ ﻴ"); p();
caracteres("ﺎ ﺐ ﺖ ﺚ ﺞ ﺢ ﺦ ﺪ ﺬ ﺮ ﺰ ﺲ ﺶ ﺺ ﺾ ﻂ ﻆ ﻊ ﻎ ﻒ ﻖ ﻚ ﻞ ﻢ ﻦ ﻪ ﻮ ﻲ"); p();
caracteres("ء- - - - - آ أ إ ة ؤ ئ ى"); p();
caracteres("پ چ ژ گ ﭪ ۰ ۱ ۲ ۳ ٤ ٥ ٦ ٧ ۸ ۹");


/* </nowiki></pre>

=== Catalán ===
<pre><nowiki> */

seccion("Catalán");

caracteres("Á À Ç É È Ë Í Ï Ó Ò Ö Ú Ù"); p();
caracteres("á à ç é è ë í ï ó ò ö ú ù");

/* </nowiki></pre>

=== Checo ===
<pre><nowiki> */

seccion("Checo");
caracteres("Á Č Ď É Ě Í Ň Ó Ř Š Ť Ú Ů Ý Ž"); p();
caracteres("á č ď é ě í ň ó ř š ť ú ů ý ž");

/* </nowiki></pre>

=== Alfabeto cirílico ===
<pre><nowiki> */

seccion("Cirílico");
caracteres("А Б В Г Д Ђ Е Ё Ж З Ѕ И Й Ј К Л Љ М Н Њ О П Р С Т Ћ У Ф Х Ц Ч Џ Ш Щ Ъ Ы Ь Э Ю Я"); p();
caracteres("а б в г д ђ е ё ж з ѕ и й ј к л љ м н њ о п р с т ћ у ф х ц ч џ ш щ ъ ы ь э ю я");

/* </nowiki></pre>

=== Devanāgarī ===
<pre><nowiki> */

seccion("Devanāgarī");
caracteres(" ः अ आ इ ई उ ऊ ऋ ऌ ऍ ऎ ए ऐ ऑ ऒ ओ औ क क़ ख ख़ ग ग़ घ ङ च छ ज ज़ झ ञ ट ठ");
caracteres("ड ड़ द ढ ढ़ ण त थ ध न ऩ प फ फ़ ब भ म य य़ र ऱ ल ळ ऴ व श ष स ह ़ ऽ ा ि ॊ ो ौ ् ी ु ू ृ ॄ ॅ ॆ े ै ॉ ");
caracteres("ॐ ॑ ॒ ॓ ॔ ॠ ॡ ॢ ॣ । ॥ ॰");

/* </nowiki></pre>

=== Escandinavo ===
<pre><nowiki> */

seccion("Escandinavo");
caracteres("À É Å Æ Ä Ø Ö"); p();
caracteres("à é å æ ä ø ö");

/* </nowiki></pre>

=== Esperanto ===
<pre><nowiki> */

seccion("Esperanto");
caracteres("Ĉ Ĝ Ĥ Ĵ Ŝ Ŭ"); p();
caracteres("ĉ ĝ ĥ ĵ ŝ ŭ");

/* </nowiki></pre>

=== Estonio ===
<pre><nowiki> */

seccion("Estonio");
caracteres("Č Š Ž Õ Ä Ö Ü"); p();
caracteres("č š ž õ ä ö ü");

/* </nowiki></pre>

=== Francés ===
<pre><nowiki> */

seccion("Francés");
caracteres("À Â Ç É È Ê Ë Î Ï Ô Œ Ù Û Ü Ÿ"); p();
caracteres("à â ç é è ê ë î ï ô œ ù û ü ÿ");

/* </nowiki></pre>

=== Galés ===
<pre><nowiki> */

seccion("Galés");
caracteres("Á À Â Ä É È Ê Ë Ì Î Ï Ó Ò Ô Ö Ù Û Ẁ Ŵ Ẅ Ý Ỳ Ŷ Ÿ"); p();
caracteres("á à â ä é è ê ë ì î ï ó ò ô ö ù û ẁ ŵ ẅ ý ỳ ŷ ÿ");

/* </nowiki></pre>

=== Griego ===
<pre><nowiki> */

seccion("Griego");
caracteres("Α Ά Β Γ Δ Ε Έ Ζ Η Ή Θ Ι Ί Κ Λ Μ Ν Ξ Ο Ό Π Ρ Σ Τ Υ Ύ Φ Χ Ψ Ω Ώ"); p();
caracteres("α ά β γ δ ε έ ζ η ή θ ι ί κ λ μ ν ξ ο ό π ρ σ τ υ ύ φ χ ψ ω ώ");

/* </nowiki></pre>

=== Hawaiano ===
<pre><nowiki> */

seccion("Hawaiano");
caracteres("Ā Ē Ī Ō Ū"); p();
caracteres("ā ē ī ō ū"); p(); caracteres("ʻ");

/* </nowiki></pre>

=== Hebreo ===
<pre><nowiki> */

seccion("Hebreo");
caracteres("א ב ג ד ה ו ז ח ט י כ ך ל מ ם נ ן ס ע פ ף צ ץ ק ר ש ת ־ ״ ׳");

/* </nowiki></pre>

=== Húngaro ===
<pre><nowiki> */

seccion("Húngaro");
caracteres("Ő Ű"); p();
caracteres("ő ű");

/* </nowiki></pre>

=== Inglés antiguo ===
<pre><nowiki> */

seccion("Inglés antiguo");
caracteres("Ā Æ Ǣ Ǽ Ċ Ð Ē Ġ Ī Ō Ū Ƿ Ȳ Þ Ȝ"); p();
caracteres("ā æ ǣ ǽ ċ ð ē ġ ī ō ū ƿ ȳ þ ȝ");

/* </nowiki></pre>

=== Islandés ===
<pre><nowiki> */

seccion("Islandés");
caracteres("Á Ð É Í Ó Ú Ý Þ Æ Ö"); p();
caracteres("á ð é í ó ú ý þ æ ö");

/* </nowiki></pre>

=== Italiano ===
<pre><nowiki> */

seccion("Italiano");
caracteres("Á À É È Í Ì Ó Ò Ú Ù"); p();
caracteres("á à é è í ì ó ò ú ù");

/* </nowiki></pre>

=== Letón ===
<pre><nowiki> */

seccion("Letón");
caracteres("Ā Č Ē Ģ Ī Ķ Ļ Ņ Š Ū Ž"); p();
caracteres("ā č ē ģ ī ķ ļ ņ š ū ž");

/* </nowiki></pre>

=== Lituano ===
<pre><nowiki> */

seccion("Lituano");
caracteres("Ą Č Ę Ė Į Š Ų Ū Ž"); p();
caracteres("ą č ę ė į š ų ū ž");

/* </nowiki></pre>

=== Maltés ===
<pre><nowiki> */

seccion("Maltés");
caracteres("Ċ Ġ Ħ Ż"); p();
caracteres("ċ ġ ħ ż");

/* </nowiki></pre>

=== Pinyin ===
<pre><nowiki> */

seccion("Pinyin");
caracteres("Á À Ǎ Ā É È Ě Ē Í Ì Ǐ Ī Ó Ò Ǒ Ō Ú Ù Ü Ǔ Ū Ǘ Ǜ Ǚ Ǖ"); p();
caracteres("á à ǎ ā é è ě ē í ì ǐ ī ó ò ǒ ō ú ù ü ǔ ū ǘ ǜ ǚ ǖ");

/* </nowiki></pre>

=== Polaco ===
<pre><nowiki> */

seccion("Polaco");
caracteres("Ą Ć Ę Ł Ń Ó Ś Ź Ż"); p();
caracteres("ą ć ę ł ń ó ś ź ż");

/* </nowiki></pre>

=== Portugués ===
<pre><nowiki> */

seccion("Portugués");
caracteres("Á À Â Ã Ç É Ê Í Ó Ô Õ Ú Ü"); p();
caracteres("á à â ã ç é ê í ó ô õ ú ü");

/* </nowiki></pre>

=== Romaji ===
<pre><nowiki> */

seccion("Romaji");
caracteres("Ā Ē Ī Ō Ū"); p();
caracteres("ā ē ī ō ū");

/* </nowiki></pre>

=== Rumano ===
<pre><nowiki> */

seccion("Rumano");
caracteres("Ă Â Î Ş Ţ"); p();
caracteres("ă â î ş ţ");

/* </nowiki></pre>

=== Serbio ===
<pre><nowiki> */

seccion("Serbio");
caracteres("А Б В Г Д Ђ Е Ж З И Ј К Л Љ М Н Њ О П Р С Т Ћ У Ф Х Ц Ч Џ Ш"); p();
caracteres("а б в г д ђ е ж з и ј к л љ м н њ о п р с т ћ у ф х ц ч џ ш");

/* </nowiki></pre>

=== Turco ===
<pre><nowiki> */

seccion("Turco");
caracteres("Ç Ğ I İ Ş"); p();
caracteres("ç ğ ı i ş");

/* </nowiki></pre>

=== Vietnamita ===
<pre><nowiki> */

seccion("Vietnamita");
caracteres("À Ả Á Ạ Ã Ă Ằ Ẳ Ẵ Ắ Ặ Â Ầ Ẩ Ẫ Ấ Ậ Đ È Ẻ Ẽ É Ẹ Ê Ề Ể Ễ Ế Ệ Ỉ Ĩ Í Ị Ì Ỏ Ó Ọ Ò Õ Ô Ồ Ổ Ỗ Ố Ộ Ơ Ờ Ở Ỡ Ớ Ợ Ù Ủ Ũ Ú Ụ Ư Ừ Ử Ữ Ứ Ự Ỳ Ỷ Ỹ Ỵ Ý"); p();
caracteres("à ả á ạ ã ă ằ ẳ ẵ ắ ặ â ầ ẩ ẫ ấ ậ đ è ẻ ẽ é ẹ ê ề ể ễ ế ệ ỉ ĩ í ị ì ỏ ó ọ ò õ ô ồ ổ ỗ ố ộ ơ ờ ở ỡ ớ ợ ù ủ ũ ú ụ ư ừ ử ữ ứ ự ỳ ỷ ỹ ỵ ý");

/* </nowiki></pre>

=== Yídish ===
<pre><nowiki> */

seccion("Yídish");
caracteres("א אַ אָ ב בֿ ג ד ה ו וּ װ ױ ז זש ח ט י יִ ײ ײַ כ ך כּ ל ל+ מ ם נ ן ס ע ע+ פ פּ פֿ ף צ ץ ק ר ש שׂ תּ ת ׳ ״ ־");

/* </nowiki></pre>

== Final ==
Aquí se cierran las funciones y se devuelve el código generado, para insertar en la página. A continuación se definen las funciones para manejar el menú de selección.
<pre><nowiki> */
  s += "</p>";
  return s;
}


function MenuDeCaracteresEspeciales() {
  var specialchars = document.getElementById('specialchars');
 
  if (specialchars) {
    specialchars.innerHTML = GeneraCaracteresEspeciales();
    var conjuntos = specialchars.getElementsByTagName("p");
    var menu = "<select style=\"display:inline\" " +
               "id=\"elSelectQueCambia\" " +
               "onChange=\"CambiaCaracteresEspecialesVisibles(selectedIndex)\">";
    for (var i in conjuntos) {
      var conjunto = conjuntos[i];
      if (conjunto.className != "specialbasic") continue;
      menu += "<option>" + conjunto.title + "</option>";
    }
    menu += "</select> &nbsp; ";
    specialchars.innerHTML = menu + specialchars.innerHTML;
 
   CambiaCaracteresEspecialesVisibles(0);
  }
}

function CambiaCaracteresEspecialesVisibles(n) {
  var select = document.getElementById("elSelectQueCambia");
  if (!select) return;
  var cual = select.options[n].text;
  var l = document.getElementById('specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = l[i].title == cual ? 'inline' : 'none';
   }
}

//</nowiki></pre>