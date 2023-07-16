/** Mobile template **/
// Callback wrapper. Allows to refer to the element
var updateTr = function(elem)
{
	return function(data, textStatus, jqXHR)
	{
        // Removing MediaWiki comment and parsing html
		var html = $.parseHTML(data["parse"]["text"]["*"].replace(/<!--[\s\S]*?-->/g, "").trim());
		elem.replaceWith(html);
	};
};

// Replace each mobile-template with corresponding pc template
$(".mobile-template").each(function ()
	{
		var data = $(this).data();
		if(data)
		{
			// Parsing the template with MediaWiki API
			$.getJSON("/api.php?action=parse&text=" + encodeURIComponent(data["template"]) + "&prop=text&format=json", updateTr($(this)));
		}
	}
);