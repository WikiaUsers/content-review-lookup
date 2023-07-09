mw.hook('wikipage.content').add(function() {
	'use strict';
	var main = document.getElementById('maple_quiz_filter');
	if (!main) return;

	var html = '<div id="skill-filter-container" style="padding: 0 1em 1em 1em; border: 3px #67c9f3 solid; border-radius: 5px; background: rgba(255, 255, 255, 0.5); display: inline-block;">' +
		'<div style="display: inline-block"><h4>Filter questions:</h4></div>' +
		'<div id="question-container">' +
			'<div id="question-search-container" style="padding: 10px 10px 0 10px; display:inline-block;">' +
				'<input type="text" style="min-width:300px;" id="question-text" placeholder="Search for Question">' +
			'</div>' +
		'</div>' +
	'</div>';
	main.innerHTML = html;
	var ele = {
		questionText: document.getElementById("question-text"),
		questionsTable: document.getElementsByClassName('questions-table')
	};
	ele.questionText.addEventListener('keyup', filterQuestions);
	/**
	 * Function that filters Maple OX questions:
	 **/
	function filterQuestions() {
		// Get the value to search / filter by
		var questionText = ele.questionText.value.toUpperCase();
	
		// Get all the questions
		var questionRowsToFilter = ele.questionsTable[0].rows;
	
		// Go through every question, start at 1 because row 0 is the header row.
		for (var i = 1; i < questionRowsToFilter.length; i++) {
			// Get the skill information from the data attributes
			var question = questionRowsToFilter[i].cells[0].innerHTML;
	
			// Check skill name
			var matchesSkillName = (question.toUpperCase().indexOf(questionText) > -1);
	
			// If it matches all the filter / selects, then display the question.
			// Otherwise, hide the question.
			if (matchesSkillName) {
				questionRowsToFilter[i].style.display = "";
			} else {
				questionRowsToFilter[i].style.display = "none";
			}
		}
	}
});