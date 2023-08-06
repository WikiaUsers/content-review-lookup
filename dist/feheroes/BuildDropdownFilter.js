/* [[Template:BuildDropdownFilter]] */
(function(mw) {
	'use strict';

	var ele, buildsToFilter;

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

	function showAllBuilds() {
	    for (var i = 0; i < buildsToFilter.length; i++) {
	        buildsToFilter[i].style.display = "inline-block";
	    }
	}

	function applyFilterAction(element, show) {
	    element.style.display = show ? "inline-block" : "none";
	}

	function hideFilteredBuilds(buildTypeFilter, buildModeFilter, buildCostFilter, buildEmblemFilter) {
	    for (var i = 0; i < buildsToFilter.length; i++) {
	        var build = buildsToFilter[i];
	        var buildType = buildTypeFilter && build.getAttribute("data-build-type");
	        var buildMode = buildModeFilter && build.getAttribute("data-build-mode");
	        var buildCost = buildCostFilter && build.getAttribute("data-build-cost");
	        var buildEmblem = buildEmblemFilter && build.getAttribute("data-build-emblem");
	
	        var showBuild = (!buildTypeFilter || buildType === buildTypeFilter) && // Build Type Filter
	            (!buildModeFilter || buildMode === buildModeFilter) && // Build Mode Filter
	            (!buildCostFilter || buildCost === buildCostFilter || // Build Cost Filter
	                (buildCostFilter === 'lowmedium' && (buildCost === 'low' || buildCost === 'medium'))) &&
	            (!buildEmblemFilter || buildEmblem === buildEmblemFilter || // Build Emblem Filter
	                (buildEmblemFilter === 'emblem' && buildEmblem !== '' && buildEmblem !== 'nonemblem'));
	
	        applyFilterAction(build, showBuild);
	    }
	}

	function filterBuilds() {
	    var buildTypeFilter = ele.typeSelect.value;
	    var buildModeFilter = ele.modeSelect.value;
	    var buildCostFilter = ele.costSelect.value;
	    var buildEmblemFilter = ele.emblemSelect.value;
	
	    hideFilteredBuilds(buildTypeFilter, buildModeFilter, buildCostFilter, buildEmblemFilter);
	}

	function init($content) {
		var main = $content.find('#buildFilter:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
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

		buildsToFilter = $content.find(".skillbuild");

		ele = {
			typeSelect: $content.find('#buildTypeSelect')[0],
			modeSelect: $content.find('#buildModeSelect')[0],
			costSelect: $content.find('#buildCostSelect')[0],
			emblemSelect: $content.find('#buildEmblemSelect')[0]
		};
		ele.typeSelect.addEventListener('change', filterBuilds);
		ele.modeSelect.addEventListener('change', filterBuilds);
		ele.costSelect.addEventListener('change', filterBuilds);
		ele.emblemSelect.addEventListener('change', filterBuilds);
	}

	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);