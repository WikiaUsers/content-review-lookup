/* voting system begin */

if ( document.getElementById("ScoreVoteCountContainer") !== null ) {

	//collecting all votes

	var SupportVoteScores = document.getElementsByClassName("SupportVoteNum");
	var NeutralVoteScores = document.getElementsByClassName("NeutralVoteNum");
	var OpposeVoteScores = document.getElementsByClassName("OpposeVoteNum");

	var votesCount = SupportVoteScores.length + NeutralVoteScores.length + OpposeVoteScores.length;
	var votesNumSum = 0;

	//processing support votes

	for (var i = 0; i < SupportVoteScores.length; i++) {
		if (SupportVoteScores[i].innerHTML === "NaN") {
			votesCount--;
		} else {
			votesNumSum += parseInt(SupportVoteScores[i].innerHTML);
		}
	}

	//processing oppose votes

	for (var i = 0; i < OpposeVoteScores.length; i++) {
		if (OpposeVoteScores[i].innerHTML === "NaN") {
			votesCount--;
		} else {
			votesNumSum -= parseInt(OpposeVoteScores[i].innerHTML);
		}
	}

	//getting configuration

	var ScoreVoteCount = document.getElementById("ScoreVoteCount");

	var ScoreVoteConfig = ScoreVoteCount.className.split(" ");

	var PassScoreRaw = ScoreVoteConfig[0].substring(2);
	var PassScore = !isNaN(PassScoreRaw) ? parseInt(PassScoreRaw) / 100.00 : 0.00;

	var WordRaw = ScoreVoteConfig[1].substring(1).split(/[0-9]/).splice(1,3);
	var WordZero = WordRaw[0].replace("_"," ");
	var WordMinus = WordRaw[1].replace("_"," ");
	var WordPlus = WordRaw[2].replace("_"," ");

	var TargetNameRaw = ScoreVoteConfig[2].substring(2);
	var TargetName = TargetNameRaw.replace("_"," ");

	var ResultRaw = ScoreVoteConfig[3].substring(1).split(/[0-9]/).splice(1,2);
	var ResultTrue = ResultRaw[0].replace("_"," ");
	var ResultFalse = ResultRaw[1].replace("_"," ");

	var ExceptRaw = ScoreVoteConfig[4].substring(1).split(/[0-9]/).splice(1,2);
	var ExceptOne = ExceptRaw[0].toLowerCase();
	var ExceptTwo = ExceptRaw[1].toLowerCase();

	//vote status helpers

	var neutralIcon = '<img src="https://vignette.wikia.nocookie.net/spongebob/images/b/b3/Neutral.png/revision/latest/scale-to-width-down/15?cb=20140913201058" alt="Neutral" height="15" width="15">';
	var supportIcon = '<img src="https://vignette.wikia.nocookie.net/spongebob/images/a/ab/Support.png/revision/latest/scale-to-width-down/15?cb=20140913200712" alt="Support" height="15" width="15">';
	var opposeIcon = '<img src="https://vignette.wikia.nocookie.net/spongebob/images/b/bc/Oppose.png/revision/latest/scale-to-width-down/15?cb=20140913200954" alt="Oppose" width="15" height="15">';

	var CurrScore = Math.round( (votesNumSum / votesCount) * 100 ) / 100;

	if (isNaN(CurrScore)) CurrScore = 0.00;

	var CurrScoreStr = CurrScore.toFixed(2);

	var passes = PassScore > 0.00 ? CurrScore >= PassScore : CurrScore > 0.00;

	var ExceptInfo = ["zeroicon"];

	var ExceptCombRaw = ExceptOne + ExceptTwo;
	var ExceptComb = [];

	for (var i = 0; i < ExceptInfo.length; i++) {
		ExceptComb.push(ExceptCombRaw.includes(ExceptInfo[i]));
	}

	//defining vote status

	var currentVoteStatus = "";

	currentVoteStatus += '<span style="font-size:15px; font-weight:normal;">';

	if (ResultTrue !== "" && ResultFalse !== "") {
		if (ExceptComb[0]) {
			currentVoteStatus += passes ? supportIcon : (CurrScore >= 0.00 ? neutralIcon : opposeIcon);
		} else {
			currentVoteStatus += passes ? supportIcon : opposeIcon;
		}
	} else {
		currentVoteStatus += CurrScore > 0.00 ? supportIcon : (CurrScore === 0.00 ? neutralIcon : opposeIcon);
	}

	currentVoteStatus += ' Community';

	if (CurrScore < 0.00) {
		currentVoteStatus += ' ' + WordMinus;
		if (TargetName !== "") {
			currentVoteStatus += ' ' + TargetName;
		}
	} else if (CurrScore > 0.00) {
		currentVoteStatus += ' ' + WordPlus;
		if (TargetName !== "") {
			currentVoteStatus += ' ' + TargetName;
		}
	} else {
		currentVoteStatus += ' is ' + WordZero;
	}

	if (!currentVoteStatus.endsWith(WordZero)) {
		currentVoteStatus += ' with score "' + CurrScoreStr + '"';
	}

	if (ResultTrue !== "" && ResultFalse !== "") {
		currentVoteStatus += ', result is "' + (passes ? ResultTrue : ResultFalse) + '"';
	}

	currentVoteStatus += '.';

	//writing vote status to page

	ScoreVoteCount.innerHTML = currentVoteStatus;

}

if ( document.getElementById("ScoreVoteCountContainerMulti") !== null ) {

	//collecting all votes

	var SupportVoteScores = document.getElementsByClassName("SupportVoteNum");
	var NeutralVoteScores = document.getElementsByClassName("NeutralVoteNum");
	var OpposeVoteScores = document.getElementsByClassName("OpposeVoteNum");

	var dictVotesCount = {};
	var dictVotesNumSum = {};

	//processing support votes

	for (var i = 0; i < SupportVoteScores.length; i++) {
		var key = SupportVoteScores[i].parentElement.className;

		if (!dictVotesCount.hasOwnProperty(key)) {
			dictVotesCount[key] = 0;
			dictVotesNumSum[key] = 0;
		}
		
		if (SupportVoteScores[i].innerHTML !== "NaN") {
			dictVotesCount[key] += 1;
			dictVotesNumSum[key] += parseInt(SupportVoteScores[i].innerHTML);
		}
	}

	//processing neutral votes

	for (var i = 0; i < NeutralVoteScores.length; i++) {
		var key = NeutralVoteScores[i].parentElement.className;

		if (!dictVotesCount.hasOwnProperty(key)) {
			dictVotesCount[key] = 0;
			dictVotesNumSum[key] = 0;
		}
		
		if (NeutralVoteScores[i].innerHTML !== "NaN") {
			dictVotesCount[key] += 1;
		}
	}

	//processing oppose votes

	for (var i = 0; i < OpposeVoteScores.length; i++) {
		var key = OpposeVoteScores[i].parentElement.className;

		if (!dictVotesCount.hasOwnProperty(key)) {
			dictVotesCount[key] = 0;
			dictVotesNumSum[key] = 0;
		}
		
		if (OpposeVoteScores[i].innerHTML !== "NaN") {
			dictVotesCount[key] += 1;
			dictVotesNumSum[key] -= parseInt(OpposeVoteScores[i].innerHTML);
		}
	}

	//defining vote status

	var counter = 0;

	var currentVoteStatus = "";

	currentVoteStatus += '<span style="font-size:15px; font-weight:normal;">';

	for (var key in dictVotesCount) {
		if (dictVotesCount.hasOwnProperty(key)) {
			var tmpCurrScore = Math.round( (dictVotesNumSum[key] / dictVotesCount[key]) * 100 ) / 100;
			if (isNaN(tmpCurrScore)) tmpCurrScore = 0.00;
			if (counter > 0) currentVoteStatus += ", ";
			currentVoteStatus += '"' + key + '" has score "' + tmpCurrScore.toFixed(2) + '"';
			counter += 1;
		}
	}

	currentVoteStatus += counter === 0 ? 'N/A' : '.';

	currentVoteStatus += '</span>';

	//writing vote status to page

	document.getElementById("ScoreVoteCount").innerHTML = currentVoteStatus;

}

/* voting system end */