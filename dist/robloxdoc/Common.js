/* Any JavaScript here will be loaded for all users on every page load. */

/* getElementByClassName * /

if (!document.getElementByClassName)
{
	document.getElementsByClassName = function(cl) {
		var retnode = [];
		var elem = this.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
			if (elem[i].className == cl)
			{
				retnode.push(elem[i]);
			}
		}
		return retnode;
	};
}

/ * Class Reference Juggle * /

//if (document.getElementById("class-reference"))
//{
	var methods = document.getElementsByClassName("member-reference methods");
	for (var i=0; i < methods.length; i++)
	{
		document.getElementById("tabpage-methods").appendChild(methods.item(i));
	}
	
	var properties = document.getElementsByClassName("member-reference properties");
	for (var i=0; i < properties.length; i++)
	{
		document.getElementById("tabpage-properties").appendChild(properties.item(i));
	}
	
	var events = document.getElementsByClassName("member-reference events");
	for (var i=0; i < events.length; i++)
	{
		document.getElementById("tabpage-events").appendChild(events.item(i));
	}
//}

*/