/**
 * Function that filters skills based on:
 *   - Skill name
 *   - Skill Type (Active/Passive)
 *   - Skill Level Learned
 **/
mw.hook('wikipage.content').add(function() {
	'use strict';
	var main = document.getElementById('skill_filter');
	if (!main) return;

	var html = '<div id="skill-filter-container" style="padding: 0 1em 1em 1em; border: 3px #67c9f3 solid; border-radius: 5px; background: rgba(255, 255, 255, 0.5); display: inline-block;">' +
		'<div style="display: inline-block"><h4>Filter skills:</h4></div>' +
		'<div id="skill-select-container">' +
			'<div id="skill-name-search-container" style="padding: 10px 10px 0 10px; display:inline-block;">' +
				'<input type="text" id="skill-name-search-text" placeholder="Search by Skill Name">' +
			'</div>' +
			'<div id="skill-type-select-container" style="padding: 10px 10px 0 10px; display:inline-block;">' +
				'<select id="skill-type-select" name="skill-type-select" class="form-control">' +
					'<option selected="selected" value="">Show all skill types</option>' +
					'<option value="Active">Active</option>' +
					'<option value="Passive">Passive</option>' +
				'</select>' +
			'</div>' +
			'<div id="skill-level-select-container" style="padding: 10px 10px 0 10px; display:inline-block;">' +
				'<select id="skill-level-select" name="skill-level-select" class="form-control">' +
					'<option selected="selected" value="">Show all level skills</option>' +
					'<option value="1-10">1-10</option>' +
					'<option value="11-20">11-20</option>' +
					'<option value="21-30">21-30</option>' +
					'<option value="31-40">31-40</option>' +
					'<option value="41-50">41-50</option>' +
				'</select>' +
			'</div>' +
		'</div>' +
	'</div>';
	main.innerHTML = html;
	var ele = {
		search: document.getElementById('skill-name-search-text'),
		typeSelect: document.getElementById('skill-type-select'),
		levelSelect: document.getElementById('skill-level-select'),
		collapsible: document.getElementsByClassName("skill-collapsible")
	};
	ele.search.addEventListener('keyup', filterSkills);
	ele.typeSelect.addEventListener('change', filterSkills);
	ele.levelSelect.addEventListener('change', filterSkills);
	function filterSkills() {
		// Get all the values from the filter / select inputs
		var skillNameText = ele.search.value.toUpperCase();
		var skillTypeSelect = ele.typeSelect.value;
		var skillLevelSelect = ele.levelSelect.value;
	
		// Get all the skills
		var skillsToFilter = ele.collapsible;
	
		// Go through every skill
		for (var i = 0; i < skillsToFilter.length; i++) {
			// Get the skill information from the data attributes
			var skillName = skillsToFilter[i].getAttribute("data-skill-name");
			var skillType = skillsToFilter[i].getAttribute("data-skill-type");
			var skillLevel = skillsToFilter[i].getAttribute("data-skill-level");
	
			// Check skill name
			var matchesSkillName = (skillName.toUpperCase().indexOf(skillNameText) > -1);
	
			// Check skill type
			var hasSkillType = (skillTypeSelect == "" || skillType == skillTypeSelect);
	
			// Check skill level
			var levels = skillLevelSelect.split("-");
			var inSkillLevel = isInLevelRange(skillLevel, levels);
	
			// If it matches all the filter / selects, then display the skill.
			// Otherwise, hide the skill.
			if (matchesSkillName && hasSkillType && inSkillLevel) {
				skillsToFilter[i].style.display = "";
			} else {
				skillsToFilter[i].style.display = "none";
			}
		}
	}
	
	/**
	 * Function that returns whether or not a skill level is within a level range
	 * @param skillLevel The level the skill is learned at
	 * @param levels Array with the min and max level range
	 * @return bool
	 **/
	function isInLevelRange(skillLevel, levels) {
		skillLevel = (skillLevel === "-") ? 1 : parseInt(skillLevel);

		if (levels.length < 2) {
			return true;
		} else {
			for (var i = 0; i < levels.length; i++) {
				levels[i] = parseInt(levels[i]);
			}
		}
	
		if (skillLevel >= levels[0] && skillLevel <= levels[1]) {
			return true;
		}
		return false;
	}
});