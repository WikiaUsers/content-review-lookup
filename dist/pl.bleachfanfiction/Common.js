/*<pre>*/

importArticles({
    type: "script",
    articles: [
      "MediaWiki:Common.js/chatango.js", /* Chatango */
    ]
});

/* Automatyczne odświeżanie ostatnich zmian */
ajaxPages = ["Specjalna:Ostatnie_zmiany"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

 var NavigationBarHide = '[ukryj]';
 var NavigationBarShow = '[pokaż]';


/* Code for custom edit buttons (ō, ū characters). */
if (mwCustomEditButtons) {

/*** wrappers *****/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|reason=",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Add the ō character",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Add the ū character",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
}

/* Code for auto-adding template to all new blog posts (thanks to User:Monchoman45 @ Central Wikia for this). */
function BlogPreload() {
	var creating = true;
	for(i in location.href.split('&')) {
		if(location.href.split('&')[i].split('=')[0] == 'pageId') {
			creating = false;
		}
	}
	if(wgPageName == 'Special:CreateBlogPage' && creating == true) {
		if(document.getElementById('cke_contents_wpTextbox1') != null) {
			document.getElementById('cke_contents_wpTextbox1').getElementsByTagName('iframe')[0].contentDocument.getElementById('bodyContent').innerHTML = '<p data-rte-fromparser="true"><img data-rte-meta="%7B%22type%22%3A%22double-brackets%22%2C%22lineStart%22%3A%22%22%2C%22title%22%3A%22Template%3ABlogheader%22%2C%22placeholder%22%3A1%2C%22wikitext%22%3A%22%7B%7BTemplate%3ABlogheader%7D%7D%22%7D" class="placeholder placeholder-double-brackets" data-cke-saved-src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" type="double-brackets"></p><p data-rte-fromparser="true" data-rte-empty-lines-before="1"><img data-rte-meta="%7B%22type%22%3A%22comment%22%2C%22wikitext%22%3A%22%3C%21--%20Please%20put%20your%20content%20under%20this%20line.%20--%3E%22%2C%22placeholder%22%3A1%7D" data-rte-instance="177-1852961854d9ce6078620f" class="placeholder placeholder-comment" data-cke-saved-src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" type="comment"></p>';
		}
		else {
			document.getElementById('wpTextbox1').innerHTML = '{{Blogheader}}\n\n<!-- Please place your content under this line. -->';
		}
	}
}

/* 4. Dodatkowe przyciski */
/* Autor: [[User:Gudyś|Gudyś]] */
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",  //ścieżka do obrazka (pełna ścieżka)22x22px
        "speedTip": "Przekierowanie",    //tekst który się wyświetli gdy najedziemy na przycisk myszką
        "tagOpen": "#PATRZ[[",        //znacznik rozpoczynający
        "tagClose": "]]",      //znacznik kończący
        "sampleText": "Tytuł strony"   ////tekst pomiędzy znacznikami (domyślnie zaznaczony)
};
mwCustomEditButtons.push(button);
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",  
        "speedTip": "Tekst przekreślony",    
        "tagOpen": "<del>",
        "tagClose": "</del>",
        "sampleText": "Tekst przekreślony"
};
mwCustomEditButtons.push(button);
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
        "speedTip": "Złamanie linii",    
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
};
mwCustomEditButtons.push(button);
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
        "speedTip": "Indeks górny",
        "tagOpen": "<sup>",
        "tagClose": "</sup>",
        "sampleText": "Indeks górny"
};
mwCustomEditButtons.push(button);
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
        "speedTip": "Indeks dolny",
        "tagOpen": "<sub>",
        "tagClose": "</sub>",
        "sampleText": "Indeks dolny"
};
mwCustomEditButtons.push(button);
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
        "speedTip": "Mały tekst",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Mały tekst"
}; 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
 
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
     "speedTip": "Wstaw galerię grafiki",
     "tagOpen": "\n<gallery>\n",
     "tagClose": "\n</gallery>",
     "sampleText": "Plik:Przykład.jpg|Podpis1\nPlik:Przykład.jpg|Podpis2"};
 
mwCustomEditButtons.push(button);
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/f/fd/Button_blockquote.png",
        "speedTip": "Długi cytat",
        "tagOpen": "<blockquote>",
        "tagClose": "</blockquote>",
        "sampleText": "Tutaj wstaw długi cytat"
};
mwCustomEditButtons.push(button);
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/79/Button_reflink.png",
        "speedTip": "Przypis",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Tutaj wstaw treść przypisu"
};
mwCustomEditButtons.push(button);
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/2a/Button_category_plus.png",
        "speedTip": "Wstaw kategorię",
        "tagOpen": "[[Kategoria:",
        "tagClose": "]]",
        "sampleText": "Nazwa kategorii"
};
mwCustomEditButtons.push(button);
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
        "speedTip": "Wstaw szablon",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Nazwa szablonu"
};
mwCustomEditButtons.push(button);
 
var button = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
        "speedTip": "Wstaw tabelę",
        "tagOpen": '{| class="wikitable"\n|-\n',
        "tagClose": "\n|}",
        "sampleText": '! nagłówek 1\n! nagłówek 2\n! nagłówek 3\n|-\n| wiersz 1, komórka 1\n| wiersz 1, komórka 2\n| wiersz 1, komórka 3\n|-\n| wiersz 2, komórka 1\n| wiersz 2, komórka 2\n| wiersz 2, komórka 3',
};
 
mwCustomEditButtons.push(button);
 
function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}
 
if(document.title.indexOf("Specjalna:Blockip") == 0) document.write('<script type="text/javascript" src="/index.php?title=U%C5%BCytkownik:Szoferka/popupmenu.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 
var NavigationBarShowDefault = 1; 

addOnloadHook(BlogPreload);
/*</pre>*/