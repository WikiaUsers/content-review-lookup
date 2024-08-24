/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

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