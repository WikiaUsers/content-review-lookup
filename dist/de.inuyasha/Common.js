/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

// Eigenes Script für Spoiler
// http://de.naruto.wikia.com - by [[Benutzer:TrunX]]
 
var SpoilerHide = "Spoiler verbergen";
var SpoilerShow = "Spoiler anzeigen";
 
function createSpoilerLink()
{
   var obj;
   for(var i=0; i < document.getElementsByTagName("div").length; i++)
   {
      obj = document.getElementsByTagName("div")[i];
      if(obj.className == 'Head_Spoil')
      {
         obj.className = 'Head_Spoil';
         var SpoilerLink= document.createElement("a");
         SpoilerLink.setAttribute('id', 'cmdSpoil');
         SpoilerLink.setAttribute('href', 'javascript:clickShowHide();');
         SpoilerLink.appendChild(document.createTextNode( SpoilerShow ));
 
         var child = obj.firstChild;
         obj.removeChild(child);
         SpoilerLink.appendChild(child);
         //alert(obj.innerHTML);
         obj.insertBefore(SpoilerLink, obj.firstChild);
         //alert(obj.innerHTML);
         var pseudodummy= obj.innerHTML;
      }
   }
}
function clickShowHide()
{
	var SpoilerLink= document.getElementById('cmdSpoil');
	if (!SpoilerLink) {
		return false;
	}
	// Wenn Spoiler == Spoiler anzeigen
	if(SpoilerLink.firstChild.data == SpoilerShow)
	{
		SpoilerLink.firstChild.data = SpoilerHide;
	}
	else
	{
		SpoilerLink.firstChild.data = SpoilerShow;
	}
	SearchSpoilerClasses('span');
	SearchSpoilerClasses('div');
	SearchSpoilerClasses('tr');
	SearchSpoilerClasses('td');
}
function SearchSpoilerClasses(tag)
{
	var obj;
	for(var i=0; i < document.getElementsByTagName(tag).length; i++)
	{
		obj= document.getElementsByTagName(tag)[i];
		if(obj.className == 'Spoiler')
		{
			obj.className = 'UnSpoiler';
		}
		else if(obj.className == 'UnSpoiler')
		{
			obj.className = 'Spoiler';
		}
	}
}
 
addOnloadHook(createSpoilerLink);
 
// Für Toggeln
// http://de.naruto.wikia.com - by [[Benutzer:TrunX]]
function createToggle()
{
	var obj;
	var index = 1;
	for(var i=0; i < document.getElementsByTagName("span").length; i++)
	{
		obj = document.getElementsByTagName("span")[i];
		var elemClasses = obj.className.split(' ');
		if(elemClasses[0] == 'toToggle'|| elemClasses[0] == 'unToggle') // || elemClasses[1] == 'SB')
		{
			var SpoilerLink= document.createElement("a");
			var attrVar;
			SpoilerLink.setAttribute('id', obj.className);
			SpoilerLink.setAttribute('href', "javascript:ToggleClasses('" + obj.className + "');");
 
			var child = obj.firstChild;
			obj.removeChild(child);
			SpoilerLink.appendChild(child);
			obj.insertBefore(SpoilerLink, obj.firstChild);
			var pseudodummy= obj.innerHTML;
		}
	}
}
function ToggleClasses(Toggle)
{
	var SpoilerLink= document.getElementById(Toggle);
	if (!SpoilerLink) {
		return false;
	}
	// Funktionsaufruf Toggler ein-ausblenden
	Toggle = Toggle.split(' ');
	ToogleTag(Toggle,'div');
	ToogleTag(Toggle,'tr');
	ToogleTag(Toggle,'td');
 
	if(Toggle[0] == 'unToggle')
		Toggle[0] = 'toToggle';
	else
		Toggle[0] = 'unToggle';
 
	// Funktionsaufruf um die Clicker zu ändern
	TogglerClicker(Toggle);
}
function ToogleTag(Toggle,Tag)
{
	for(var i=0; i < document.getElementsByTagName(Tag).length; i++)
	{
		var obj= document.getElementsByTagName(Tag)[i];
		var elemClasses = obj.className.split(' ');
 
		for(var j=1; j < Toggle.length; j++)
		{
			if(elemClasses[1] != Toggle[1])
				break;
			if(typeof elemClasses[j] == 'undefined')
			{
				elemClasses[0] = 'unToggle';
				break;
			}
			if(elemClasses[j] == Toggle[j] && elemClasses.length <= Toggle.length)
				elemClasses[0] = Toggle[0];
			else
			{
				elemClasses[0] = 'toToggle';
				break;
			}
		}
		obj.className = elemClasses.join(' ');
	}
}
function TogglerClicker(Toggle)
{
	var SpoilerLink;
	for(var i=0; i < document.getElementsByTagName("span").length; i++)
	{
		var elemClasses = document.getElementsByTagName("span")[i].className.split(' ');
		if(elemClasses[0] == 'toToggle' || elemClasses[0] == 'unToggle')
		{
			SpoilerLink= document.getElementById(elemClasses.join(' '));
 
			if(SpoilerLink == null)
			{
				if(elemClasses[0] == 'unToggle')
					elemClasses[0] = 'toToggle'
				else
					elemClasses[0] = 'unToggle'
				SpoilerLink= document.getElementById(elemClasses.join(' '));
			}
 
			for(var j=1; j < Toggle.length; j++)
			{
				if(elemClasses[1] != Toggle[1])
					break;
				if(typeof elemClasses[j] == 'undefined')
				{
					elemClasses[0] = Toggle[0];
					break;
				}
				if(elemClasses[j] == Toggle[j] && elemClasses.length <= Toggle.length)
					elemClasses[0] = Toggle[0];
				else
				{
					elemClasses[0] = 'unToggle';
					break;
				}
			}
			if(SpoilerLink.innerHTML == 'Anzeigen' && elemClasses[0] == 'toToggle')
				SpoilerLink.innerHTML = 'Verbergen'
			else if(SpoilerLink.innerHTML == 'Verbergen' && elemClasses[0] == 'unToggle')
				SpoilerLink.innerHTML = 'Anzeigen'
			else;
			SpoilerLink.setAttribute('class', elemClasses.join(' '));
			SpoilerLink.setAttribute('id', elemClasses.join(' '));
			SpoilerLink.setAttribute('href', "javascript:ToggleClasses('" + elemClasses.join(' ') + "');");
		}
	}
}
 
 
addOnloadHook(createToggle);