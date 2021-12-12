var idfsgsdialogues = document.querySelectorAll('.idfsgsdialogue');
var options = {};
var dialogueNPCName = {};
var dialogueText = {};
var textSounds = {};
var endSounds = {};
var startSounds = {};
var optionsList = {};
var restartMessage = {};
var dialogue_path = {};
var defaultOptions = {};
var dialogues = {};

function loadOptions(optionsObject, dialoguename) {
	if (!options[dialoguename]) {
		options[dialoguename] = {};
	}
	
	for (var optionName in optionsObject) {
		var option = optionsObject[optionName];
		options[dialoguename][optionName] = option;
    }
	
	if (!defaultOptions[dialoguename]) {
		defaultOptions[dialoguename] = options[dialoguename];
	}

    if (!defaultOptions[dialoguename].dstyle) {
    	defaultOptions[dialoguename].dstyle = {};
		for (var i = 0; i < dialogueText[dialoguename].style.length; i++) {
			var name = dialogueText[dialoguename].style.item(i);
			var value = dialogueText[dialoguename].style[name];
	    	defaultOptions[dialoguename].dstyle[name] = value;
		}
    }
   
	for (var name in defaultOptions[dialoguename].dstyle) {
		var value = defaultOptions[dialoguename].dstyle[name];
    	dialogueText[dialoguename].style[name] = value;
	}

	if (options[dialoguename].name === undefined) {
		options[dialoguename].name = '';
	}
	
    if (options[dialoguename].style) {
        for (var name in options[dialoguename].style) {
            var value = options[dialoguename].style[name];
            dialogueText[dialoguename].style[name] = value;
        }
    }
	
    if (options[dialoguename].nameStyle) {
        for (var name in options[dialoguename].nameStyle) {
            var value = options[dialoguename].nameStyle[name];
            dialogueNPCName[dialoguename].style[name] = value;
        }
    }
    
    if (options[dialoguename].textSound) {
    	textSounds[dialoguename].src = '/wiki/Special:Filepath/' + options[dialoguename].textSound;
    }
    
    if (options[dialoguename].startSound) {
    	startSounds[dialoguename].src = '/wiki/Special:Filepath/' + options[dialoguename].startSound;
    }

	dialogueNPCName[dialoguename].innerHTML = options[dialoguename].name;

    if (dialogueNPCName[dialoguename].style.display === 'none') {
		dialogueNPCName[dialoguename].style.display = 'block';
    }
}

function remove_buttons(dialoguename) {
	optionsList[dialoguename].style.display = 'none';
	optionsList[dialoguename].innerHTML = "";
}

function close_prompt(dialoguename) {
	restartMessage[dialoguename].style.display = 'block';
}

function change_text(time, string, dialoguename) {
	setTimeout(function() {
		dialogueText[dialoguename].innerHTML = string;
		textSounds[dialoguename].currentTime = 0;
		textSounds[dialoguename].play().catch(function () { });
        if (options[dialoguename].stopStartSound) {
            startSounds[dialoguename].pause();
            startSounds[dialoguename].currentTime = 0;
        }
	}, time);
}

function display_question(question, dialoguename) {
	var totalduration = 0;

    if (options[dialoguename].startDelay) {
        totalduration += options[dialoguename].startDelay;
    }

	if (options[dialoguename].startSound) {
        startSounds[dialoguename].currentTime = 0;
		startSounds[dialoguename].play().catch(function () { });
	}
	
    dialogueText[dialoguename].innerHTML = '';

	if (typeof (question) == "object") {
		question = question[Math.floor(Math.random() * question.length)];
	}

	for (var s = 1; s <= question.length; s++) {
		var string = question.substring(0, s);

		change_text(totalduration, string, dialoguename);
		totalduration += options[dialoguename].waitTime || 25;
	}
	
	
	return totalduration;
}

function append_button(v, dialoguename) {
	var btn = document.createElement('div');
	btn.classList.add('idfsgsdialogueoption');
	btn.innerHTML = '<div class="idfsgsdialogueoptiontext" style="font-weight: 900;font-size:15px;color:white;text-shadow:-1px -1px 0 black,0 -1px 0 black,1px -1px 0 black,1px 0 0 black,1px 1px 0 black, 0 1px 0 black,-1px 1px 0 black,-1px 0 0 black;text-align: center;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);width: 100%;line-height: normal;">' + v.option + '</div>';
	if (v.btnstyle) {
	    var btnText = btn.querySelector('.idfsgsdialogueoptiontext');
	    for (var name in v.btnstyle) {
	        var value = v.btnstyle[name];
	        btnText.style[name] = value;
	    }
	}
	optionsList[dialoguename].appendChild(btn);
	btn.addEventListener('click', function () {
		if (typeof (v) == "object") {
			next_dialogue(v, dialoguename);
		}
	});
}

function removefish(fish) {
	setTimeout(function () {
		fish.remove();
	}, 2000);
}

function display_answers(current, dialoguename) {
	if (current.answers) {
		if (current.question && typeof (current.answers) == "object" && typeof (current.answers[0]) != "string") {
			if (typeof (current.answers[0]) == "object") {
				for (var i in current.answers) {
					var v = current.answers[i];
					
					append_button(v, dialoguename);
				}
			} else {
				var v = current.answers;
			
			    append_button(v, dialoguename);
			}
			optionsList[dialoguename].style.display = 'flex';
		} else if (typeof (current.answers) == "string" || (typeof (current.answers) == "object" && type(current.answers[1]) == "string")) {
			var actions = {
				close_dialog: function () {
					close_prompt(dialoguename);
				},
			
			    fishbrap: function () {
			    	close_prompt(dialoguename);
			    	var fish = document.createElement('img');
			    	fish.classList.add('fishbrap');
			    	fish.src = 'https://static.wikia.nocookie.net/i-dont-feel-so-good-simulator/images/7/76/FishHeathen.png/';
			    	var brap = document.createElement('audio');
			    	brap.style.display = 'none';
			    	brap.src = 'https://static.wikia.nocookie.net/i-dont-feel-so-good-simulator/images/c/cd/Brap.mp3';
			    	fish.appendChild(brap);
			    	dialogues[dialoguename].appendChild(fish);
			    	brap.play().catch(function () { });
			    	removefish(fish);
			    }
			};

			if (typeof (current.answers) == "object") {
				for (var i in current.answers) {
					var action = current.answers[i];

					var barindex = action.indexOf("|");

					var args = action.substring(barindex > -1 ? barindex + 1 : 0, action.length).split("|");

					actions[action.substring(0, barindex > -1 ? barindex : action.length)](args);
				}
			} else {
				var action = current.answers;

				var barindex = action.indexOf("|");

				var args = action.substring(barindex > -1 ? barindex + 1 : 0, action.length).split("|");

				actions[action.substring(0, barindex > -1 ? barindex : action.length)](args);
			}
		}
	}
}
		
function next_dialogue(current, dialoguename) {
	current = current || dialogue_path[dialoguename];
	
	var waittime = 0;

	remove_buttons(dialoguename);

	if (current.options) {
		loadOptions(current.options, dialoguename);
	}

	if (current.question) {
		waittime = display_question(current.question, dialoguename);
	}

	setTimeout(function() {
		textSounds[dialoguename].pause();
		textSounds[dialoguename].currentTime = 0;
		endSounds[dialoguename].currentTime = 0;
		endSounds[dialoguename].play().catch(function() { });
		display_answers(current, dialoguename);
	}, waittime)
}

function create_dialogue(idfsgsdialogue, dialoguename) {
	dialogues[dialoguename] = idfsgsdialogue;
	dialogueNPCName[dialoguename] = idfsgsdialogue.querySelector('.idfsgsdialoguenpcname');
	dialogueText[dialoguename] = idfsgsdialogue.querySelector('.idfsgsdialoguetext');
	optionsList[dialoguename] = idfsgsdialogue.querySelector('.idfsgsdialogueoptionscontainer');
	restartMessage[dialoguename] = idfsgsdialogue.querySelector('.idfsgsdialoguerestart');
	
	var textSound = document.createElement('audio');
	textSound.src = 'https://static.wikia.nocookie.net/i-dont-feel-so-good-simulator/images/f/ff/Message.mp3';
	textSound.style.display = 'none';
	idfsgsdialogue.appendChild(textSound)
	textSounds[dialoguename] = textSound;
	
	var endSound = document.createElement('audio');
	endSound.src = 'https://static.wikia.nocookie.net/i-dont-feel-so-good-simulator/images/9/9e/DialogEnd.mp3';
	endSound.style.display = 'none';
	idfsgsdialogue.appendChild(endSound)
	endSounds[dialoguename] = endSound;
	
	var startSound = document.createElement('audio');
	startSound.style.display = 'none';
	idfsgsdialogue.appendChild(startSound)
	startSounds[dialoguename] = startSound;
	
	dialogue_path[dialoguename] = JSON.parse(dialogueNPCName[dialoguename].innerHTML.replace(/<.+>/g, '').replace(/\{quot\}/g, '\\"'));
	
	restartMessage[dialoguename].addEventListener('click', function () {
		restartMessage[dialoguename].style.display = 'none';
		remove_buttons(dialoguename);
		next_dialogue(dialogue_path[dialoguename], dialoguename);
	});
	
	restartMessage[dialoguename].style.display = 'none';
	remove_buttons(dialoguename);
	next_dialogue(dialogue_path[dialoguename], dialoguename);
}

if (idfsgsdialogues.length) {
	for (var i = 0; i < idfsgsdialogues.length; i++) {
		var idfsgsdialogue = idfsgsdialogues.item(i);
		try {
			create_dialogue(idfsgsdialogue, 'dialogue' + i)
		} catch (error) {
			idfsgsdialogue.querySelector('.idfsgsdialoguetext').innerHTML = error;
		}
	}
}