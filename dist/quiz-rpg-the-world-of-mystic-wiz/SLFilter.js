function runFilter(form)
{
	var formData = form.serializeArray().reduce(accumulate, {});
	var evo = formData["evo"];
	var displayMode = formData["displayMode"];
	
	//var elementFireDisplay = 'none';
	//var elementWaterDisplay = 'none';
	//var elementThunderDisplay = 'none';
	var showElementIconDisplay = 'none';
	var showRankIconDisplay = 'none';
	var showMaxEvoIconDisplay = 'none';
	
	// Show all data as default
	$('.SLSpirit').css('display', 'none');
	$('.SLTable tr').css('display', 'none');
	
	// DISPLAY TOGGLE
	if (displayMode == "imageonly")
		$('.SLTable').addClass('ImageOnlyStyle').removeClass('ImageNameStyle');
	else
		$('.SLTable').addClass('ImageNameStyle').removeClass('ImageOnlyStyle');
	
	// SPIRITS FILTER
	if ($("#elementFire").is(':checked'))
	{
		$(".SLSpirit.fire").css('display', '');
		$('.SLTable tr.hasfire').css('display', '');
	}
	if ($("#elementWater").is(':checked'))
	{
		$(".SLSpirit.water").css('display', '');
		$('.SLTable tr.haswater').css('display', '');
	}
	if ($("#elementThunder").is(':checked'))
	{
		$(".SLSpirit.thunder").css('display', '');
		$('.SLTable tr.hasthunder').css('display', '');
	}
	
	if (evo == "max") //Evo filter
	{
		$('.SLSpirit').not('.ismaxevo').css('display', 'none');
		$('.SLTable tr').not('.hasmaxevo').css('display', 'none');
	}
	
	if ($("#showElementIcon").is(':checked')) { showElementIconDisplay = ''; }
	if ($("#showRankIcon").is(':checked')) { showRankIconDisplay = ''; }
	if ($("#showMaxEvoIcon").is(':checked')) { showMaxEvoIconDisplay = ''; }
	
	// ICONS TOGGLE
	$(".SLTable.ImageOnlyStyle .SLSpirit .SLElement").css('display', showElementIconDisplay);
	$(".SLTable.ImageOnlyStyle .SLSpirit .SLRank").css('display', showRankIconDisplay);
	$(".SLTable.ImageOnlyStyle .SLSpirit .SLMaxEvo").css('display', showMaxEvoIconDisplay);
	
	// TABLE HEADER
	$('.SLTable tr.SLHeader').css('display', '');
}

// Transforms Form inputs into an array based on "name" property
function accumulate(prev, cur, index, array)
{
	if (cur.value !== "")
	{
		prev[cur.name] = cur.value;
	}
	return prev;
}