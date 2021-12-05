(function() {
	console.info('PersonalityQuiz');
	var container = document.querySelector('.personality-quiz');
	if (container === null) {
		return;
	}
	
	var questions = [];
	var answers = [];
	
	function loadQuestions() {
		return fetch(mw.util.getUrl('MediaWiki:Custom-PersonalityQuiz.json', { action: 'raw' })).then(function(res) {
			return res.json();
		});
	}
	
	function renderQuestion(index) {
		console.log('renderQuestion', index, questions, questions.questions);
		clearParent(container);
		var question = questions.questions[index];
		var title = document.createElement('h3');
		title.textContent = question.question;
		document.querySelector('.personality-quiz').appendChild(title);
		for(var idx in question.answers) {
			var item = question.answers[idx];
			var el = document.createElement('button');
			el.classList.add('wds-button', 'wds-color-success', 'wds-is-secondary', 'wds-is-full-width');
			el.textContent = item;
			el.addEventListener('click', clickHandler.bind(window, index, +idx));
			document.querySelector('.personality-quiz').appendChild(el);
		}
	}
	
	function clearParent(parent) {
		while((el = parent.firstChild) !== null) {
			el.remove();	
		}
	}
	
	function clickHandler(index, answer) {
		console.log(index, answer);
		answers.push(answer);
		if (index + 1 < questions.questions.length) {
			renderQuestion(index + 1);
		} else {
			renderScore();
		}
	}
	
	function renderScore() {
		clearParent(container);
		avg = Math.round(answers.reduce(function(carry, score) {
			return carry + score;
		}, 0) / answers.length);
		console.log('score', answers, avg, Object.keys(questions.score)[avg])
		var title = document.createElement('h3');
		var character = Object.keys(questions.score)[avg];
		title.textContent = 'Du bist: ' + character;
		var description = document.createElement('p');
		description.textContent = questions.score[character];
		container.appendChild(title);
		container.appendChild(description);
	}
	
	loadQuestions().then(function(json) {
		questions = json;
		renderQuestion(0);
	});
})();