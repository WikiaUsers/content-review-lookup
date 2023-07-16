mw.hook('wikipage.content').add(function() {
	var main = document.getElementById('buildFilter');
	if (!main) return;

	function createDiv(name, showAll, options) {
		var output = '<div id="' + name + 'Div" style="display: inline-block; padding: 1em;">' +
	        '<select id="' + name + '" name="' + name + '" class="form-control">' +
	            '<option selected="selected" value="">Show all ' + showAll + '</option>' +
	            '<option disabled="disabled">----------------------</option>';
	
		for (var i=0; i<options.length; i++) {
			var option = options[i];
			output += '<option value="' + option[0] + '">' + option[1] + '</option>';
		}

		output += '</select></div>';
		return output;
	}

	main.innerHTML = createDiv('buildTypeSelect', 'buid types', [
		['optimal', 'Optimal'],
		['alternative', 'Alternative'],
		['creative', 'Creative'],
		['unlabelled', 'Unlabelled']
	]) +
	createDiv('buildModeSelect', 'modes', [
		['allpurpose', 'All Purpose'],
		['arena', 'Drena'],
		['defense', 'Defense'],
		['assault', 'Assault'],
		['chain', 'Chain'],
		['unlabelled', 'Unlabelled']
	]) +
	createDiv('buildCostSelect', 'investment costs', [
		['low', 'Low'],
		['medium', 'Medium'],
		['lowmedium', 'Low and Medium'],
		['high', 'High'],
		['veryhigh', 'Very High']
	]) +
	createDiv('buildEmblemSelect', 'emblem/non-emblem', [
		['nonemblem', 'Non-Emblem Builds'],
		['emblem', 'Emblem Builds']
	]);
	var ele = {
		typeSelect: document.getElementById('buildTypeSelect'),
		modeSelect: document.getElementById('buildModeSelect'),
		costSelect: document.getElementById('buildCostSelect'),
		emblemSelect: document.getElementById('buildEmblemSelect')
	};
	ele.typeSelect.addEventListener('change', filterBuilds);
	ele.modeSelect.addEventListener('change', filterBuilds);
	ele.costSelect.addEventListener('change', filterBuilds);
	ele.emblemSelect.addEventListener('change', filterBuilds);

	var buildsToFilter = document.getElementsByClassName("skillbuild");

	function filterBuilds() {
	    var buildTypeFilter = ele.typeSelect.value;
	    var buildModeFilter = ele.modeSelect.value;
	    var buildCostFilter = ele.costSelect.value;
	    var buildEmblemFilter = ele.emblemSelect.value;
	
	    hideFilteredBuilds(buildTypeFilter, buildModeFilter, buildCostFilter, buildEmblemFilter);
	}
	
	function showAllBuilds() {
	    for (var i = 0; i < buildsToFilter.length; i++) {
	        buildsToFilter[i].style.display = "inline-block";
	    }
	}
	
	function hideFilteredBuilds(buildTypeFilter, buildModeFilter, buildCostFilter, buildEmblemFilter) {
	    for (var i = 0; i < buildsToFilter.length; i++) {
	        var build = buildsToFilter[i];
	        var buildType = buildTypeFilter && build.getAttribute("data-build-type");
	        var buildMode = buildModeFilter && build.getAttribute("data-build-mode");
	        var buildCost = buildCostFilter && build.getAttribute("data-build-cost");
	        var buildEmblem = buildEmblemFilter && build.getAttribute("data-build-emblem");
	
	        var showBuild = (!buildTypeFilter || buildType == buildTypeFilter) && // Build Type Filter
	            (!buildModeFilter || buildMode == buildModeFilter) && // Build Mode Filter
	            (!buildCostFilter || buildCost == buildCostFilter || // Build Cost Filter
	                (buildCostFilter == 'lowmedium' && (buildCost == 'low' || buildCost == 'medium'))) &&
	            (!buildEmblemFilter || buildEmblem == buildEmblemFilter || // Build Emblem Filter
	                (buildEmblemFilter == 'emblem' && buildEmblem !== '' && buildEmblem !== 'nonemblem'));
	
	        applyFilterAction(build, showBuild);
	    }
	}
	
	function applyFilterAction(element, show) {
	    element.style.display = show ? "inline-block" : "none";
	}
});