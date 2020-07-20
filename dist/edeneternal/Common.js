/* Any JavaScript here will be loaded for all users on every page load. */
function mk(tag)
{
	return document.createElement(tag);
}

function getItemTip(e)
{
	var r = new Object();
	var ee_iname = $(e.currentTarget).find(".ee_iname");
	try{
		if (ee_iname.length == 0)
		{
			ee_iname = $(e.currentTarget).find("a");
			r.title = ee_iname.attr("title");
		}
		else
			r.title = ee_iname.text();
	}
	catch(exc){console.log(exc);}
	r.action = "render";
	$.get("./../index.php", r, 
	function(data) {
		var _div = $("#WikiaArticle");
		var tooltip = $("#ee_iteminfo");
		try
		{
			if (tooltip.length == 0)
				tooltip = $(mk("div")).attr("id", "ee_iteminfo").css("position", "absolute").css("top", e.layerY + "px").css("left", (e.layerX + 10) + "px");
		}
		catch(exc) {console.log(exc);}
		console.log(tooltip);
		tooltip.html(data);
		_div.append(tooltip.show());
	});
}

function moveItemTip(e)
{
	try
	{
		$("#ee_iteminfo").css("top", e.layerY + "px").css("left", (e.layerX + 10) + "px");
	}
	catch(exc)
	{
		console.log(exc);
	}
}

$(function()
{
	//Bind to every element with ItemTip as its class
	$(".ee_itip").bind({
		mouseenter: function(e) {getItemTip(e)} ,
		mouseleave: function() {try{$("#ee_iteminfo").hide(); } catch(exc) {}},
		mousemove: function(e) {moveItemTip(e)}
	})
	//Bind mousemove
});