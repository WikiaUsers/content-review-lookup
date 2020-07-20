/* Any JavaScript here will be loaded for all users on every page load. */
function autosort()
{
	var tables = document.getElementsByClassName('sortable');
	for(var a = 0; a < tables.length; a++)
	{
		var classes = tables[a].getAttribute('class').split(' ');
		for(var b = 0; b < classes.length; b++)
		{
			var matched = /^autosort=([0-9]+),(a|d)$/.exec(classes[b]);
			if(matched)
			{
				var sortables = tables[a].getElementsByClassName('sortheader');
				if(sortables)
				{
					var toSort = sortables[matched[1] - 1];
					ts_resortTable(toSort);
					if(matched[2] == 'd')
					{
						ts_resortTable(toSort);
					}
				}
			}
		}
	}
}
addOnloadHook(autosort);