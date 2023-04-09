/* Any JavaScript here will be loaded for all users on every page load. */

/* TEMPLATE:USERNAME */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* FIRSTEDITDATE */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FirstEditDate.js',
    ]
});
/* AUTO CREATE USERPAGE */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AutoCreateUserPages.js',
    ]
});

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{Userpage}}',
        3: false
    },
    summary: 'Creating my pages',
    notify: '<a href="/wiki/User:$2">Here is a link to your userpage, $1!</a>'
};

/* MSG BLOCK */

window.MessageBlock = {
	title : 'You have been blocked!',
	message : 'You have been blocked for the reason of \'$1\', your ban duration is $2.',
	autocheck : true
};

/* SPOILERS */

window.SpoilerAlertJS = {
    question: 'hey you, you better stay out or im gonna be angry',
    yes: 'okay…',
    no: 'no lol',
    fadeDelay: 1600
};

/* DISPLAYTITLE */

var DisplayTitle = document.getElementsByClassName("DisplayTitle");
var title =document.getElementsByClassName("page-header__title")[0];
for (var i=0; i<DisplayTitle.length; i++) {
    DisplayTitle[i].innerText = title.innerText;
}

/* DIALOGUE */

function dialogueInit() {
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
    
        function randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function regexClean(str) {
        return str.replace(/[\\^$.|?*+()[{]/g, function (match) {
            return '\\' + match;
        });
    }

    function getKeyFunc(string, options) {
        options = options || {};
        extrakeys = options.extrakeys || {};
        extrafuncs = options.extrafuncs || {};
        var lastParenthesesIndex = -1;
        var llastParenthesesIndex = -1;
        var rawParenthesesIndex = -1;
        var rawrequired = 0;
        var keyindex = -1;
        var parindex = -1;
        var parenthesesGoal = [];
        var potentialindexes = [];
        var rawMatch;

        var keylist = special.keys;
        var funclist = special.functions;
        var pkeylist = [];
        var pfunclist = [];

        for (var k in keylist) {
            if (keylist[k].potential) {
                if (keylist[k].potential.keys) {
                    for (var kk in keylist[k].potential.keys) {
                        pkeylist[kk] = keylist[k].potential.keys[kk];
                    }
                }

                if (keylist[k].potential.funcs) {
                    for (var ff in keylist[k].potential.funcs) {
                        pfunclist[ff] = keylist[k].potential.funcs[ff];
                    }
                }
            }
        }
        for (var k in extrakeys) keylist[k] = extrakeys[k];

        for (var f in funclist) {
            if (funclist[f].potential) {
                if (funclist[f].potential.keys) {
                    for (var kk in funclist[f].potential.keys) {
                        pkeylist[kk] = funclist[f].potential.keys[kk];
                    }
                }

                if (funclist[f].potential.funcs) {
                    for (var ff in funclist[f].potential.funcs) {
                        pfunclist[ff] = funclist[f].potential.funcs[ff];
                    }
                }
            }
        }
        for (var f in extrafuncs) funclist[f] = extrafuncs[f];

        var keys = Object.keys(keylist);
        var funcs = Object.keys(funclist);
        var pfuncs = Object.keys(pfunclist);

        function isParIndex(goal) {
            return parindex == goal;
        }

        for (var i in string) {
            var char = string[i];

            switch (char) {
                case '(':
                    var funcmatch = (string.substring(0, i)).match(new RegExp('(' + funcs.map(regexClean).join('|') + ')$', 'i'));
                    var pfuncmatch = (string.substring(0, i)).match(new RegExp('(' + (parenthesesGoal.length <= 0 ? pfuncs.map(regexClean).join('|') : '') + ')$', 'i'));

                    if (funcmatch) {
                        parindex++;
                        lastParenthesesIndex = i;
                        if (!rawMatch) {
                            var func = funclist[funcmatch[0].toLowerCase()];
                            if (func) {
                                if (func.raw) {
                                    rawParenthesesIndex = i;
                                    rawrequired++;
                                    rawMatch = funcmatch[0].toLowerCase();
                                }
                                if (func.parentheses) {
                                    parenthesesGoal.push(parindex - 1);
                                }
                            }
                        } else {
                            rawrequired++;
                        }
                    } else if (pfuncmatch) {
                        parindex++;
                        potentialindexes.push(parindex);
                    }
                    break;

                case ')':
                    var funcmatch = (string.substring(0, lastParenthesesIndex)).match(new RegExp('(' + funcs.map(regexClean).join('|') + ')$', 'i'));

                    if (funcmatch && string[i - 1] !== '\\') {
                        if (parenthesesGoal.find(isParIndex)) {
                            parenthesesGoal.splice(parenthesesGoal.findIndex(isParIndex), 1);
                        }
                        if (potentialindexes.find(isParIndex)) {
                            potentialindexes.splice(potentialindexes.findIndex(isParIndex), 1);
                        } else {
                            if (!rawMatch) {
                                lastParenthesesIndex++;
                                return {
                                    match: [funcmatch[0].toLowerCase(), string.substring(lastParenthesesIndex, i)],
                                    type: 'func'
                                };
                            } else {
                                rawrequired--;
                                llastParenthesesIndex = i;
                                if (rawrequired <= 0) {
                                    rawParenthesesIndex++;
                                    return {
                                        match: [rawMatch, string.substring(rawParenthesesIndex, i)],
                                        type: 'func'
                                    };
                                }
                            }
                        }
                        parindex--;
                    }
                    break;
            }

            var keymatch = string.substring(i).match(new RegExp('^(' + keys.map(regexClean).join('|') + ')', 'i'));
            if (keymatch) {
                keyindex = i;
                if (rawrequired <= 0) return {
                    match: keymatch[0].toLowerCase(),
                    type: 'key'
                };
            }
        }

        if (llastParenthesesIndex > -1) {
            var funcmatch = string.substring(0, lastParenthesesIndex).match(new RegExp('(' + funcs.map(regexClean).join('|') + ')$', 'i'));

            lastParenthesesIndex++;
            return {
                match: [funcmatch[0].toLowerCase(), string.substring(lastParenthesesIndex, llastParenthesesIndex)],
                type: 'func'
            };
        }

        if (keyindex > -1) {
            var keymatch = string.substring(keyindex).match(new RegExp('^(' + keys.map(regexClean).join('|') + ')', 'i'));

            return {
                match: keymatch[0].toLowerCase(),
                type: 'key'
            };
        }

        return false;
    }

    function splitKeyFunc(string, options) {
        options = options || {};
        extrafuncs = options.extrafuncs || {};
        args = options.args || Infinity;
        var lastParenthesesIndex = -1;
        var lastSplitIndex = 0;
        var parenthesesrequired = 0;
        var parenthesesGoal = [];
        var barfound = 0;
        var split = [];

        var funclist = special.functions;
        var pfunclist = [];

        for (var f in funclist) {
            if (funclist[f].potential) {
                if (funclist[f].potential.keys) {
                    for (var kk in funclist[f].potential.keys) {
                        pkeylist[kk] = funclist[f].potential.keys[kk];
                    }
                }

                if (funclist[f].potential.funcs) {
                    for (var ff in funclist[f].potential.funcs) {
                        pfunclist[ff] = funclist[f].potential.funcs[ff];
                    }
                }
            }
        }
        for (var f in extrafuncs) funclist[f] = extrafuncs[f];

        var funcs = Object.keys(funclist);
        var pfuncs = Object.keys(pfunclist);
        var afuncs = funcs.concat(pfuncs);

        function isParRequired(goal) {
            return parenthesesrequired == goal;
        }

        function barReplace(val) {
            return val.replace(/\\\|/, '|');
        }

        for (var i in string) {
            var char = string[i];
            i = Number(i);

            switch (char) {
                case '(':
                    var funcmatch = (string.substring(0, i)).match(new RegExp('(' + (parenthesesGoal.length <= 0 ? afuncs.map(regexClean).join('|') : '') + ')$', 'i'));
                    if (funcmatch) {
                        lastParenthesesIndex = i;
                        parenthesesrequired++;
                        var func = funclist[funcmatch[0].toLowerCase()];
                        if (func) {
                            if (func.parentheses) {
                                parenthesesGoal.push(parenthesesrequired - 1);
                            }
                        }
                    }
                    break;

                case '|':
                    if (parenthesesrequired <= 0 && string[i - 1] !== '\\') {
                        split.push(string.substring(lastSplitIndex, i - (string[i - 1] === ' ' ? 1 : 0)));
                        lastSplitIndex = i + (string[i + 1] === ' ' ? 2 : 1);
                        barfound++;
                    }
                    break;

                case ')':
                    var funcmatch = (string.substring(0, lastParenthesesIndex)).match(new RegExp('(' + (parenthesesGoal.length <= 0 ? afuncs.map(regexClean).join('|') : '') + ')$', 'i'));
                    if (funcmatch && string[i - 1] !== '\\') {
                        if (parenthesesGoal.find(isParRequired)) {
                            parenthesesGoal.splice(parenthesesGoal.findIndex(isParRequired), 1);
                        }
                        parenthesesrequired--;
                    }
                    break;
            }

            if (barfound == args - 1) {
                break;
            }
        }

        split.push(string.substring(lastSplitIndex));

        return split.map(barReplace);
    }

    var special = {
        keys: {
            _sanchezname: {
                func: function () {
                    var consonants = ['B', 'Z', 'R', 'V'];
                    var vowels = ['y', 'e', 'n', 'r'];
                    var conso2 = ['n', 'm', 'g', 'k'];

                    return randomChoice(consonants) + randomChoice(vowels) + randomChoice(conso2) + randomChoice(vowels) + randomChoice(conso2);
                }
            },

            _sancheztext: {
                func: function () {
                    var c1 = ['r', 'gr', 'yell', 'bl', 'or', 's'];
                    var c2 = ['ed', 'een', 'ow', 'eige', 'urple', 'ange', 'ilver'];
                    var s = [];

                    for (var i = 0; i < 5; i++) {
                        s.push(randomChoice(c1) + randomChoice(c2));
                    }

                    return s.join('');
                }
            }
        },

        functions: {
            choice: {
                func: function (matches) {
                    var word = matches[1];
                    var split = splitKeyFunc(word);
                    return randomChoice(split);
                },

                raw: true
            }
        }
    };

    function getKeywordsFor(string, options) {
        options = options || {};
        extrakeys = options.extrakeys || {};
        extrafuncs = options.extrafuncs || {};

        while (getKeyFunc(string, { extrakeys: extrakeys, extrafuncs: extrafuncs }) !== false) {
            var keydata = getKeyFunc(string, { extrakeys: extrakeys, extrafuncs: extrafuncs });

            switch (keydata.type) {
                case 'key':
                    var key = special.keys[keydata.match] || extrakeys[keydata.match];
                    var func = key.func;
                    var change = func(string);
                    string = typeof (change) === 'object' && change[1] === true ? change[0] : string.replace(new RegExp(regexClean(keydata.match), 'i'), change);
                    break;

                case 'func':
                    var funcmatch = keydata.match;
                    var funcName = funcmatch[0];
                    var match = funcmatch[1];
                    var mod = special.functions[funcName] || extrafuncs[funcName];
                    var func = mod.func;
                    var m = match;
                    if (!mod.raw) {
                        match = getKeywordsFor(match, msg, isBot, { extrakeys: extrakeys, extrafuncs: extrafuncs });
                    }
                    match = match.replace(/\\\)/g, ')');
                    if (!mod.raw) {
                        string = string.replace(m, match);
                    }
                    var change = func([funcName, match], string);
                    string = typeof (change) === 'object' && change[1] === true ? change[0] : string.replace(new RegExp(regexClean(funcName + '(' + match + ')'), 'i'), change);
                    break;
            }
        }

        return string;
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
            dialogueTextes[dialogueID].style[name] = value;
        }

        if (options[dialogueID].name === undefined) {
            options[dialogueID].name = '';
        }

        if (options[dialogueID].style) {
            for (var name in options[dialogueID].style) {
                var value = options[dialogueID].style[name];
                if (typeof (value) == 'object') value = randomChoice(value);
                dialogueTextes[dialogueID].style[name] = getKeywordsFor(value);
            }
        }

        if (options[dialogueID].nameStyle) {
            for (var name in options[dialogueID].nameStyle) {
                var value = options[dialogueID].nameStyle[name];
                if (typeof (value) == 'object') value = randomChoice(value);
                dialogueNames[dialogueID].style[name] = getKeywordsFor(value);
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
    }

    function playSound(sound, dialogueID) {
        if (options[dialogueID].begin) return;
        sound.currentTime = 0;
        sound.play().catch(function () { });
    }

    function removeButtons(dialogueID) {
        dialogueOptions[dialogueID].style.display = 'none';
        dialogueOptions[dialogueID].innerHTML = "";
    }

    function closePrompt(dialogueID) {
        restartMessages[dialogueID].style.display = 'block';
    }

    function changeText(time, string, dialogueID) {
        setTimeout(function () {
            dialogueTextes[dialogueID].innerHTML = string;

            if (options[dialogueID].begin) return;
            textSounds[dialogueID].currentTime = 0;
            playSound(textSounds[dialogueID], dialogueID);
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
            var htmlMatch = string.match(/^&#?\w+;|^<.+>/);

            if (htmlMatch) {
                characters.push(htmlMatch[0]);
                s += htmlMatch[0].length - 1;
            } else {
                characters.push(string[0]);
            }
        }

        var string = '';

        if (options[dialogueID].stopStartSound) {
            startSounds[dialogueID].pause();
        }

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
        if (v.btnstyle) {
            var btnText = btn.querySelector('.d-option');
            for (var name in v.btnstyle) {
                var value = v.btnstyle[name];
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
    }

    function removeElement(element, wait) {
        setTimeout(function () {
            element.remove();
        }, wait);
    }

    function newSound(url, dialogueID) {
        var sound = document.createElement('audio');
        sound.src = url;
        dialogues[dialogueID].appendChild(sound);
        
        return sound;
    }

    function displayAnswers(current, dialogueID) {
        if (current.question !== undefined && typeof (current.answers) == "object" && typeof (current.answers[0]) != "string") {
            if (typeof (current.answers[0]) == "object") {
                for (var i in current.answers) {
                    var v = current.answers[i];

                    appendButton(v, dialogueID);
                }
            } else {
                var v = current.answers;

                appendButton(v, dialogueID);
            }
            dialogueOptions[dialogueID].style.display = 'flex';
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

        clickSounds[dialogueID] = newSound('https://static.wikia.nocookie.net/pilgrammed-rblx/images/4/4d/Click.ogg', dialogueID);
        startSounds[dialogueID] = newSound('', dialogueID);
        textSounds[dialogueID] = newSound('', dialogueID);
        endSounds[dialogueID] = newSound('', dialogueID);
        restartMessages[dialogueID] = dialogue.querySelector('.d-reset');
        
        dialoguePaths[dialogueID] = JSON.parse(dialogueNames[dialogueID].innerHTML.replace(/<.+>/g, '').replace(/\{quot\}/g, '\\"').replace(/\{break\}/g, '<br/>'));

        console.log(dialoguePaths[dialogueID]);

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
                dialogue.querySelector('.d-response').innerHTML = error.stack;
            }
        }
    }
}

dialogueInit();

/* QUIZ */

window.quizName = "Quiz";
window.quizLang = "en";
window.resultsTextArray = [ 
    "you kinda suck",
    "not bad kid)",
    "woah good job man" 
];
window.questions = [
    ["how many tickets are there",
    "26 tickets",
    "25 tickets",
    "24 tickets",
    "27 tickets"], 

    ["when was ticketmaster added?",
    "march 10th",
    "march 11th",
    "march 9th",
    "march 12th"],

    ["who made this quiz",
    "aslapbattler",
    "i did",
    "peevee",
    "sanszillanime"],
    
    ["whats 2+2",
    "four",
    "three",
    "one",
    "seventeen"],
    
    ["do you like bread",
    "yes",
    "no",
    "maybe",
    "so"]
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});