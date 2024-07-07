/* Credits: Raleigh - Templater in Pilgrammed Fandom.*/

var dialogues = {};

var options = {};
var defaultOptions = {};

var dialogueNames = {};
var dialogueTextes = {};
var dialogueOptions = {};

var clickSounds = {};
var startSounds = {};
var textSounds = {};
var endSounds = {};
var restartMessages = {};

var dialoguePaths = {};

var scaleElements = [];

function getContainerScale(element) {
	var computedStyle = getComputedStyle(element);
	
	var w = element.clientWidth;
	var h = element.clientHeight;
	
	w -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + 
		 parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth) + 
		 parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);
	h -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom) + 
		 parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth) + 
		 parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);
	
	return { w: w, h: h };
}

function scaleText(element) {
	var parent = element.parentElement;
	var fontSize = getComputedStyle(element).fontSize;
	var sElement = scaleElements.find(function(e) {
		return e.element == element;
	});

	if (!sElement) {
		var event = element.addEventListener('change', function() {
			scaleText(element);
		});
		sElement = { element: element, parent: parent, fontSize: fontSize };
		scaleElements.push(sElement);
	}
	
	element.style.fontSize = sElement.fontSize;
	
	var elementScale = getContainerScale(element);
	var parentScale = getContainerScale(parent);

	if (elementScale.w > parentScale.w || elementScale.h > parentScale.h) {
		while (element.clientWidth > parent.clientWidth || element.clientHeight > parent.clientHeight) {
			element.style.fontSize = parseFloat(element.style.fontSize) - 1 + 'px';
		}
	}
	
	return element;
}

function changeScale(element, px) {
	var sElement = scaleElements.find(function (e) {
		return e.element == element;
	});
	
	if (sElement) {
		sElement.fontSize = px;
		scaleText(sElement.element);
	}
}

function stopScale(element) {
	var index = scaleElements.findIndex(function (e) {
		return e.element == element;
	});
	
	if (index > -1) scaleElements.splice(i, 1);
}

function scaleAllText() {
	for (var i in scaleElements) scaleText(scaleElements[i].element);
}

function removeElement(element, wait) {
    setTimeout(function () {
        element.remove();
    }, wait);
}

function newSound(url, dialogueID, loop) {
    var sound = document.createElement('audio');
    sound.src = url;
    sound.loop = !!loop;
    dialogues[dialogueID].appendChild(sound);
    
    return sound;
}

function playSound(sound, dialogueID) {
    if (options[dialogueID].begin) return;
    sound.currentTime = 0;
    sound.play().catch(function () { });
}

function loadOptions(optionsObject, dialogueID) {
    if (!options[dialogueID]) {
        options[dialogueID] = {};
    }

    for (var optionName in optionsObject) {
        var option = optionsObject[optionName];
        options[dialogueID][optionName] = option;
    }

    if (!defaultOptions[dialogueID]) {
        defaultOptions[dialogueID] = options[dialogueID];
    }

    if (!defaultOptions[dialogueID].dstyle) {
        defaultOptions[dialogueID].dstyle = {};
        for (var i = 0; i < dialogueTextes[dialogueID].style.length; i++) {
            var name = dialogueTextes[dialogueID].style.item(i);
            var value = dialogueTextes[dialogueID].style[name];
            defaultOptions[dialogueID].dstyle[name] = value;
        }
    }

    for (var name in defaultOptions[dialogueID].dstyle) {
        var value = defaultOptions[dialogueID].dstyle[name];
        if (typeof (value) == 'object') value = randomChoice(value);
        value = getKeywordsFor(value);
        if (name.match(/fontSize|font-size/)) changeScale(dialogueTextes[dialogueID], value);
        dialogueTextes[dialogueID].style[name] = value;
    }

    if (options[dialogueID].name === undefined) {
        options[dialogueID].name = '';
    }

    if (options[dialogueID].style) {
        for (var name in options[dialogueID].style) {
            var value = options[dialogueID].style[name];
            if (typeof (value) == 'object') value = randomChoice(value);
            value = getKeywordsFor(value);
            if (name.match(/fontSize|font-size/)) changeScale(dialogueTextes[dialogueID], value);
            dialogueTextes[dialogueID].style[name] = value;
        }
    }

    if (options[dialogueID].nameStyle) {
        for (var name in options[dialogueID].nameStyle) {
            var value = options[dialogueID].nameStyle[name];
            if (typeof (value) == 'object') value = randomChoice(value);
            value = getKeywordsFor(value);
            if (name.match(/fontSize|font-size/)) changeScale(dialogueNames[dialogueID], value);
            dialogueNames[dialogueID].style[name] = value;
        }
    }

    if (options[dialogueID].textSound) {
        if (!(textSounds[dialogueID].src.endsWith(options[dialogueID].textSound))) {
            textSounds[dialogueID].src = '/wiki/Special:Filepath/' + options[dialogueID].textSound;
        }
    }

    if (options[dialogueID].startSound) {
        if (!(startSounds[dialogueID].src.endsWith(options[dialogueID].startSound))) {
            startSounds[dialogueID].src = '/wiki/Special:Filepath/' + options[dialogueID].startSound;
        }
    }

    if (options[dialogueID].loopStartSound !== undefined) {
        startSounds[dialogueID].loop = options[dialogueID].loopStartSound || false;
    }

    var name = options[dialogueID].name;

    if (typeof (name) == 'object') name = randomChoice(name);

    dialogueNames[dialogueID].innerHTML = getKeywordsFor(options[dialogueID].name);

    if (dialogueNames[dialogueID].style.display === 'none') {
        dialogueNames[dialogueID].style.display = 'block';
    }
    
    scaleText(dialogueNames[dialogueID]);
}

function removeButtons(dialogueID) {
	var buttons = dialogueOptions[dialogueID].children.length;

    dialogueOptions[dialogueID].style.display = 'none';
    for (var i = 0; i < buttons; i++) {
    	var element = dialogueOptions[dialogueID].children.item(0);
    	stopScale(element);
    	element.remove();
    }
}

function closePrompt(dialogueID) {
    restartMessages[dialogueID].style.display = 'block';
}

function changeText(time, string, dialogueID) {
    setTimeout(function () {
        dialogueTextes[dialogueID].innerHTML = string;
        scaleText(dialogueTextes[dialogueID]);
    }, time);
}

function displayQuestion(question, dialogueID) {
    var totalDuration = 0;

    if (options[dialogueID].startDelay) {
        totalDuration += options[dialogueID].startDelay;
    }

    if (options[dialogueID].begin === undefined) {
        options[dialogueID].begin = true;
    } else if (options[dialogueID].begin === true) {
        options[dialogueID].begin = false;
    }

    if (options[dialogueID].startSound && options[dialogueID].playStartSound) {
        if (options[dialogueID].playAfterDelay) {
            setTimeout(function () {
                playSound(startSounds[dialogueID], dialogueID);
            }, options[dialogueID].startDelay);
        } else {
            playSound(startSounds[dialogueID], dialogueID);
        }
    }

    dialogueTextes[dialogueID].innerHTML = '';

    if (typeof (question) == "object") question = randomChoice(question);
    question = getKeywordsFor(question);

    var characters = [];

    for (var s = 0; s < question.length; s++) {
        var string = question.substring(s);
        var escapeMatch = string.match(/^&#?\w+;/);
        var htmlMatch = string.match(/^<.*>/);

        if (escapeMatch) {
            characters.push(escapeMatch[0]);
            s += escapeMatch[0].length - 1;
        } else if (htmlMatch) {
        	var htmlMatches = htmlMatch[0].match(/<[^>]*>/g);
        	if (htmlMatches.length >= 2) {
        		var htmlStr = htmlMatches[0];
        		var htmlEnd = htmlMatches[1];
        		
        		var htmlMid = htmlMatch[0].substring(htmlMatches[0].length, htmlMatch[0].length - htmlMatches[1].length);
        		
        		for (var ss = 0; ss < htmlMid.length; ss++) {
        			var str = '';

        			if (ss <= 0) str += htmlStr;
        			str += htmlMid[ss];
        			if (ss >= (htmlMid.length + 1)) str += htmlEnd;
        			
        			characters.push(str);
        		}
        	} else {
            	characters.push(htmlMatch[0]);
        	}

            s += htmlMatch[0].length - 1;
        } else {
            characters.push(string[0]);
        }
    }
    
    console.log(characters);

    var string = '';

    if (options[dialogueID].stopStartSound) startSounds[dialogueID].pause();
    if (!options[dialogueID].begin) textSounds[dialogueID].play();

    for (var i in characters) {
        var character = characters[i];

        string += character;
        changeText(totalDuration, string, dialogueID);
        totalDuration += options[dialogueID].waitTime || 10;
    }

    if (!options[dialogueID].begin) setTimeout(function () {
        textSounds[dialogueID].pause();
        playSound(endSounds[dialogueID], dialogueID);
    }, totalDuration);

    return totalDuration;
}

function appendButton(v, dialogueID) {
    var btn = document.createElement('div');
    btn.classList.add('d-optionC');
    btn.innerHTML = '<div class="d-option">' + getKeywordsFor(v.option) + '</div>';
    
    var btnText = btn.querySelector('.d-option');

    if (v.btnstyle) {
        for (var name in v.btnstyle) {
	        var value = v.btnstyle[name];
	        if (typeof (value) == 'object') value = randomChoice(value);
	        value = getKeywordsFor(value);
	        if (name.match(/fontSize|font-size/)) changeScale(btnText, value);
	        btnText.style[name] = value;
        }
    }

    if (options[dialogueID].begin === undefined) {
        options[dialogueID].begin = true;
    } else if (options[dialogueID].begin === true) {
        options[dialogueID].begin = false;
    }

    dialogueOptions[dialogueID].appendChild(btn);
    
    btn.addEventListener('click', function () {
        if (typeof (v) == "object") {
            playSound(clickSounds[dialogueID], dialogueID);
            nextDialogue(v, dialogueID);
        }
    });
    scaleText(btnText);
    
    return btn;
}

function displayAnswers(current, dialogueID) {
    if (current.question !== undefined && typeof (current.answers) == "object" && typeof (current.answers[0]) != "string") {
        dialogueOptions[dialogueID].style.display = 'flex';
        if (typeof (current.answers[0]) == "object") {
            for (var i in current.answers) {
                var v = current.answers[i];

                appendButton(v, dialogueID);
            }
        } else {
            var v = current.answers;

            appendButton(v, dialogueID);
        }
        return;
    }

    var actions = {
        popup: function (args) {
            var popup = document.createElement('img');
            popup.classList.add('d-popup');
            popup.src = '/wiki/Special:Filepath/' + args[0];
            dialogueTextes[dialogueID].appendChild(popup);
            removeElement(popup, 1000);
        }
    };

    if (typeof (current.answers) == "object" && current.answers.length) {
        closePrompt(dialogueID);

        for (var i in current.answers) {
            var actionName = current.answers[i];

            var barindex = actionName.indexOf("+");
            var args = actionName.substring(barindex > -1 ? barindex + 1 : 0, actionName.length).split("+");
            var action = actions[actionName.substring(0, barindex > -1 ? barindex : actionName.length)];
            if (action) action(args);
        }
    } else {
        var actionName = current.answers;
        closePrompt(dialogueID);

        if (actionName) {
            var barindex = actionName.indexOf("+");
            var args = actionName.substring(barindex > -1 ? barindex + 1 : 0, actionName.length).split("+");
            var action = actions[actionName.substring(0, barindex > -1 ? barindex : actionName.length)];
            if (action) action(args);
        }
    }
}

function nextDialogue(current, dialogueID) {
    current = current || dialoguePaths[dialogueID];

    if (typeof (current) == 'object' && current[0] !== undefined) {
        current = randomChoice(current);
    }

    var waittime = 0;

    removeButtons(dialogueID);

    if (current.options || !options[dialogueID]) {
        loadOptions(current.options, dialogueID);
    }

    if (current.question !== undefined) {
        waittime = displayQuestion(current.question, dialogueID);
    }

    setTimeout(function () {
        displayAnswers(current, dialogueID);
    }, waittime)
}

function createDialogue(dialogue, dialogueID) {
    dialogues[dialogueID] = dialogue;

    dialogueNames[dialogueID] = dialogue.querySelector('.d-name');
    dialogueTextes[dialogueID] = dialogue.querySelector('.d-response');
    dialogueOptions[dialogueID] = dialogue.querySelector('.d-optionsC');

    clickSounds[dialogueID] = newSound('https://static.wikia.nocookie.net/studlands-beta-roblox/images/1/17/Click_Dialogue.wav', dialogueID);
    startSounds[dialogueID] = newSound('', dialogueID);
    textSounds[dialogueID] = newSound('https://static.wikia.nocookie.net/studlands-beta-roblox/images/4/4a/Dialogue_Play.wav/', dialogueID, true);
    endSounds[dialogueID] = newSound('', dialogueID);
    restartMessages[dialogueID] = dialogue.querySelector('.d-reset');
    
    dialoguePaths[dialogueID] = JSON.parse(dialogueNames[dialogueID].innerText);

    restartMessages[dialogueID].addEventListener('click', function () {
        restartMessages[dialogueID].style.display = 'none';
        removeButtons(dialogueID);
        nextDialogue(dialoguePaths[dialogueID], dialogueID);
    });

    restartMessages[dialogueID].style.display = 'none';
    removeButtons(dialogueID);
    nextDialogue(dialoguePaths[dialogueID], dialogueID);
}

var fetchedDialogues = document.querySelectorAll('.dialogue');

if (fetchedDialogues.length) {
    for (var i = 0; i < fetchedDialogues.length; i++) {
        var dialogue = fetchedDialogues.item(i);
        try {
            createDialogue(dialogue, 'dialogue' + i);
        } catch (error) {
            var dialogText = dialogue.querySelector('.d-response')
            dialogText.innerHTML = error.stack;
            scaleText(dialogText);
        }
    }
}

window.addEventListener('resize', scaleAllText);
window.addEventListener('orientationchange', scaleAllText);