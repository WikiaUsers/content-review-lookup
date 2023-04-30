/*

== Helpers ==
<pre>
 */

 /** Internet Explorer bug fix **************************************************
  *
  *  Description: Fixes IE horizontal scrollbar bug
  *  Maintainers: [[User:Tom-]]?
  */
 
 if (navigator.appName == "Microsoft Internet Explorer" && document.compatMode == "CSS1Compat")
 {
   var oldWidth;
   var docEl = document.documentElement;
 
   function fixIEScroll()
   {
     if (!oldWidth || docEl.clientWidth > oldWidth)
       doFixIEScroll();
     else
       setTimeout(doFixIEScroll, 1);
 
     oldWidth = docEl.clientWidth;
   }
 
   function doFixIEScroll() {
     docEl.style.overflowX = (docEl.scrollWidth - docEl.clientWidth < 4) ? "hidden" : "";
   }
 
   document.attachEvent("onreadystatechange", fixIEScroll);
   attachEvent("onresize", fixIEScroll);
 }

/** 
  * Correctly handle PNG transparency in Internet Explorer 6.
  * http://homepage.ntlworld.com/bobosola. Updated 18-Jan-2006.
  *  
  * Adapted for Wikipedia by Remember_the_dot and Edokter.
  *  
  * http://homepage.ntlworld.com/bobosola/pnginfo.htm states "This page contains more information for
  * the curious or those who wish to amend the script for special needs", which I take as permission to
  * modify or adapt this script freely. I release my changes into the public domain.
  */  
 
function PngFix()
{
    try
    {
        if (!document.body.filters)
        {
            window.PngFixDisabled = true
        }
    }
    catch (e)
    {
        window.PngFixDisabled = true
    }
    if (!window.PngFixDisabled)
    {
        var documentImages = document.images
        var documentCreateElement = document.createElement
        var funcEncodeURI = encodeURI
 
        for (var i = 0; i < documentImages.length;)
        {
            var img = documentImages[i]
            var imgSrc = img.src
 
            if (imgSrc.substr(imgSrc.length - 3).toLowerCase() == "png" && !img.onclick)
            {
                if (img.useMap)
                {
                    img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + encodeURI(imgSrc) + "')"
                    img.src = "http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif"
                    i++
                }
                else
                {
                    var outerSpan = documentCreateElement("span")
                    var innerSpan = documentCreateElement("span")
                    var outerSpanStyle = outerSpan.style
                    var innerSpanStyle = innerSpan.style
                    var imgCurrentStyle = img.currentStyle
 
                    outerSpan.id = img.id
                    outerSpan.className = img.className
                    outerSpanStyle.backgroundImage = imgCurrentStyle.backgroundImage
                    outerSpanStyle.borderWidth = imgCurrentStyle.borderWidth
                    outerSpanStyle.borderStyle = imgCurrentStyle.borderStyle
                    outerSpanStyle.borderColor = imgCurrentStyle.borderColor
                    outerSpanStyle.display = "inline-block"
                    outerSpanStyle.fontSize = "0"
                    outerSpanStyle.verticalAlign = "middle"
                    if (img.parentElement.href) outerSpanStyle.cursor = "hand"
 
                    innerSpanStyle.width = "1px"
                    innerSpanStyle.height = "1px"
                    innerSpanStyle.display = "inline-block"
                    innerSpanStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + funcEncodeURI(imgSrc) + "')"
 
                    outerSpan.appendChild(innerSpan)
                    img.parentNode.replaceChild(outerSpan, img)
                }
            }
            else
            {
                i++
            }
        }
    }
}
 
if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.substr(22, 1) == "6")
{
    window.attachEvent("onload", PngFix)
}
 
/**
  * Remove need for CSS hacks regarding MSIE and IPA.
  */
 
if(navigator.userAgent.indexOf("MSIE") != -1 && document.createStyleSheet) {
   document.createStyleSheet().addRule('.IPA', 'font-family: "Doulos SIL", "Charis SIL", Gentium, "DejaVu Sans", Code2000, "TITUS Cyberbit Basic", "Arial Unicode MS", "Lucida Sans Unicode", "Chrysanthi Unicode";');
}

// ============================================================
// BEGIN Enable multiple onload functions

// setup onload functions this way:
// aOnloadFunctions[aOnloadFunctions.length] = function_name; // without brackets!

if (!window.aOnloadFunctions) {
  var aOnloadFunctions = new Array();
}

window.onload = function() {
  if (window.aOnloadFunctions) {
    for (var _i=0; _i<aOnloadFunctions.length; _i++) {
      aOnloadFunctions[_i]();
    }
  }
}

// END Enable multiple onload functions
// ============================================================

function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

/*
</pre>
== Barras de navegação ==
<pre>
 */

 // ============================================================
 // BEGIN Dynamic Navigation Bars (experimantal)
 
 // set up the words in your language
 var NavigationBarHide = ' [ocultar]';
 var NavigationBarShow = ' [exibir]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 0;
 
 
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
                NavChild != null;
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
                NavChild != null;
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
 // ============================================================

/*
</pre>

== Interwikis ==
<pre>
 */

function interwikiExtra() 
{
   // iterate over all <span>-elements
   for(var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      // if found a linkInfo span
      if(a.className == "interwiki-info") {
         // iterate over all <li>-elements
         var count=0;
         
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            if(b.className == "interwiki-" + a.id) {
               b.innerHTML = b.innerHTML + " "+a.title;
               if(a.title == "(vo)") { b.title = "Texto original"; }
            }
         else if(b.className == "interwiki-" + a.id.substr(0,a.id.length-1)) {
               count = count+1;
               if(a.id.charAt(a.id.length-1) == count) {
                  b.innerHTML = b.innerHTML + " "+a.title;
               }
            }
         }
      }
   }
}

addLoadEvent(interwikiExtra);

/**********************
*** Add arrows on sidebar to compare current page to interlanguage link'd page
*** by [[user:Pathoschild]], based on older script by unknown
**********************/

function BilingualLink() {
	if(document.getElementById('p-lang') != null) {
		// get list of links
		var biboxes = document.getElementById('p-lang').getElementsByTagName('li');

		// iterate over links
		for(var i=0; i<biboxes.length; i++) {
			// get link
			var bilink = biboxes[i].getElementsByTagName('a')[0];

			// create new URL
			var bilang = bilink.getAttribute('href').match(/http:\/\/([^\.]+)\.wikisource/)[1];
			var bilanglink = wgServer + '/wiki/' + wgPageName + '?match=' + bilang;

			// create link
			var bianchor = document.createElement('a');
			bianchor.setAttribute('href',bilanglink);
			bianchor.setAttribute('title','Compare this page with the '+bilang+' version.');
			bianchor.appendChild(document.createTextNode(' ⇔'));

			// add link
			biboxes[i].appendChild(bianchor);
		}
	}
}

addOnloadHook(BilingualLink);

/*
</pre>

== Correlatos na lateral ==
<pre>
 */

// InterProjekt-Links (vgl. [[MediaZilla:708]])
 document.write('<style type="text/css">#interProject, #sisterProjects {display: none; speak: none;} #p-tb .pBody {padding-right: 0;}<\/style>');
 function iProject() {
  if (document.getElementById("interProject")) {
   var iProject = document.getElementById("interProject").innerHTML;
   var interProject = document.createElement("div");
   interProject.style.marginTop = "0.7em";
   interProject.innerHTML = '<h5>Correlatos<\/h5><div class="pBody">'+iProject+'<\/div>';
   document.getElementById("p-tb").appendChild(interProject);
  }
 }
 addOnloadHook(iProject);

/*
</pre>
== Layout para Discussão ==
<pre>
 */

/**
 * Transformer certaines pages en page de discussion avec le modèle {{page de discussion}}
 */
function TransformeEnDiscussion() 
{
   var transformeEnPDD = document.getElementById("transformeEnPageDeDiscussion");
   if(transformeEnPDD)
     document.body.className = "ns-1";
}

addOnloadHook(TransformeEnDiscussion);

/*
</pre>
== Botões extras ==
<pre>
 */
function mwInsertEditButton(parent, item) {
        var image = document.createElement("img");
        image.width = 23;
        image.height = 22;
        image.src = item.imageFile;
        image.border = 0;
        image.style.cursor = "pointer";
        var ref = document.createElement("a")
        ref.setAttribute("href", "javascript:insertTags(\"" + item.tagOpen + "\",\"" + item.tagClose + "\",\"" + item.sampleText + "\");")
        ref.setAttribute("title", item.speedTip);
        ref.appendChild(image);
        
        parent.appendChild(ref);
}

// Remplit la variable mwCustomEditButtons (voir /skins-1.5/commons/wikibits.js) pour ajouter des boutons à la barre d'outils 
function addCustomButton(imageFile, speedTip, tagOpen, tagClose, sampleText)
{
 mwCustomEditButtons[mwCustomEditButtons.length] =
 {"imageFile": imageFile,
  "speedTip": speedTip,
  "tagOpen": tagOpen,
  "tagClose": tagClose,
  "sampleText": sampleText};
}

addCustomButton('http://upload.wikimedia.org/wikipedia/commons/8/8f/Button_poeme.png','Poesia','<poem>\\n\\n','\\n</poem>','');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/b/b4/Button_category03.png','Categoria','\[\[Categoria:','\]\]','título da categoria');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/a/a0/Button_references_alt.png','Inserir nota de rodapé','<ref>','</ref>','');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/9/9a/Button_references.png','Gerar índice das notas de rodapé','<references />','','');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/7/78/Button_titre.png','Barra de navegação padrão','\{\{navegar\\n|obra=','\\n|autor=\\n|anterior=\\n|posterior=\\n|seção=\\n|notas=\\n}\}','');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/0/03/Button_chapitre.png','Barra de navegação para Hinos','\{\{hino\\n|obra=','\\n|letra por=\\n|melodia por=\\n|notas=\\n}\}','');
addCustomButton('http://upload.wikimedia.org/wikipedia/commons/3/38/Button_plume.png','Predefinição para páginas de prefixo Autor:','\{\{autor\\n| InicialUltimoNome =','\\n| Imagem            =\\n| Nome              =\\n| Datas             =\\n| Wikipedia         =\\n| Wikiquote         =\\n| Wikicommons       =\\n| MiscBio           =\\n}\}','');


 /*
 </pre>

== Force IP Preview ==
 */
 
 // Force IP to preview before saving changes.
 // Copyright Marc Mongenet, 2006
 function forcePreview()
 {
        if (wgUserName != null) return;
        var saveButton = document.getElementById("wpSave");
        if (!saveButton) return;
        if (location.search.search(/&action=edit/) == -1) return;
        saveButton.disabled = true;
        saveButton.style.fontWeight = "normal";
        document.getElementById("wpPreview").style.fontWeight = "bold";
 }
 
 addLoadEvent(forcePreview);

/*
</pre>

== onglets  ==
<pre>*/
/* modifica ''discussione'' in ''fonte'' (it.wikisource) */
function onglets()
{
   if( document.getElementById("copyrightinfo") )
       {
          var a = document.getElementById("ca-talk");
          if(a){
                a = a.firstChild;
                var s = a.innerHTML;
                var i = s.lastIndexOf('Discussão');
                a.innerHTML = s.substring(0,i)+"dados de copyright";
                }
       }
}
addOnloadHook(onglets);

/*</pre>
*/

/*********************
Quality indicators
Author: ThomasV
*********************/
function icon_src(t){
	var src='';
	switch(t){
		case "0%": src='http://upload.wikimedia.org/wikipedia/commons/8/8f/00%25.png'; break;
		case "25%": src='http://upload.wikimedia.org/wikipedia/commons/5/5b/25%25.png'; break;
		case "50%": src='http://upload.wikimedia.org/wikipedia/commons/3/3a/50%25.png'; break;
		case "75%": src='http://upload.wikimedia.org/wikipedia/commons/c/cd/75%25.png'; break;
		case "100%": src='http://upload.wikimedia.org/wikipedia/commons/6/64/100%25.png'; break;
	} 
	return src;
}
 
function pageQuality() {
 
	var a = document.getElementById("ca-nstab-main");
	if(wgCanonicalNamespace == "Page") a = document.getElementById("ca-nstab-page");
	if(!a) return;
 
	var q = document.getElementById("textquality")
	if( q ) {
		var new_img = document.createElement("img");
		new_img.setAttribute("src", icon_src(q.className));
		a.firstChild.appendChild(new_img);
	}
 
	for(
		var i=0; 
		spanElem = document.getElementsByTagName("span")[i]; 
		i++
	) {
	if (spanElem.className == "pagequality")  {
		var new_img = document.createElement("img");
		new_img.setAttribute("src", icon_src(spanElem.title));
 
		if(wgCanonicalNamespace == "Page") {
			a.firstChild.appendChild(new_img);
		}
		else {
			s1 = spanElem.parentNode.previousSibling;
			opttext = s1.firstChild.firstChild;
			img = opttext.firstChild.nextSibling.nextSibling.nextSibling;
			next = img.nextSibling;
			opttext.removeChild(img);
			opttext.insertBefore(new_img,next);
		}
	}
   }
}
 
addOnloadHook(pageQuality);