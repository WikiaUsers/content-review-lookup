function ttInit() {
	var ttdialogues = document.querySelectorAll('.ttdialogue');
	var options = {};
	var dialogueNPCName = {};
	var dialogueText = {};
	var optionsList = {};
	var restartMessage = {};
	var dialogue_path = {};
	var defaultOptions = {};
	var dialogues = {};
	
	function r(x) {
		return x[Math.floor(Math.random() * x.length)];
	}
	
	function regexClean(str) {
	    return str.replace(/[\\^$.|?*+()[{]/g, function(match) {
	    	return '\\' + match;
	    });
	}
	
	function getKeyMod(string, options) {
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
	
	function splitKeyMod(string, options) {
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
		    	func: function() {
			    	var consonants = ['B', 'Z', 'R', 'V'];
			        var vowels = ['y', 'e', 'n', 'r'];
			        var conso2 = ['n', 'm', 'g', 'k'];
			
			    	return r(consonants) + r(vowels) + r(conso2) + r(vowels) + r(conso2);
			    }
		    },
		   
		    _sancheztext: {
		    	func: function() {
			    	var c1 = ['r', 'gr', 'yell', 'bl', 'or', 's'];
			    	var c2 = ['ed', 'een', 'ow', 'eige', 'urple', 'ange', 'ilver'];
			    	var s = [];
			
			    	for (var i = 0; i < 5; i++) {
			    		s.push(r(c1) + r(c2));
			    	}
			
			    	return s.join('');
			    }
		    }
		},
		
		functions: {
	        choice: {
	            func: function(matches) {
	                var word = matches[1];
	                var split = splitKeyMod(word);
	                return r(split);
	            },
	
	            raw: true
	        }
		}
	};
	
	function getKeywordsFor(string, options) {
		options = options || {};
		extrakeys = options.extrakeys || {};
		extrafuncs = options.extrafuncs || {};
	
	    while (getKeyMod(string, { extrakeys: extrakeys, extrafuncs: extrafuncs }) !== false) {
	        var keydata = getKeyMod(string, { extrakeys: extrakeys, extrafuncs: extrafuncs });
	
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
			if (typeof (value) == 'object') value = r(value);
	    	dialogueText[dialoguename].style[name] = value;
		}
	
		if (options[dialoguename].name === undefined) {
			options[dialoguename].name = '';
		}
		
	    if (options[dialoguename].style) {
	        for (var name in options[dialoguename].style) {
	            var value = options[dialoguename].style[name];
	            if (typeof (value) == 'object') value = r(value);
	            dialogueText[dialoguename].style[name] = getKeywordsFor(value);
	        }
	    }
		
	    if (options[dialoguename].nameStyle) {
	        for (var name in options[dialoguename].nameStyle) {
	            var value = options[dialoguename].nameStyle[name];
	            if (typeof (value) == 'object') value = r(value);
	            dialogueNPCName[dialoguename].style[name] = getKeywordsFor(value);
	        }
	    }
	
	    var name = options[dialoguename].name;
	   
	    if (typeof (name) == 'object') name = r(name);
	
		dialogueNPCName[dialoguename].innerHTML = getKeywordsFor(options[dialoguename].name);
	
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
			
			if (options[dialoguename].begin) return;
		}, time);
	}
	
	function display_question(question, dialoguename) {
		var totalduration = 0;
	
	    if (options[dialoguename].startDelay) {
	        totalduration += options[dialoguename].startDelay;
	    }
	    
	    if (options[dialoguename].begin === undefined) {
			options[dialoguename].begin = true;
		} else if (options[dialoguename].begin === true) {
			options[dialoguename].begin = false;
		}
		
	    dialogueText[dialoguename].innerHTML = '';
	
		if (typeof (question) == "object") question = r(question);
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
	
	    for (var i in characters) {
	    	var character = characters[i];
	    	
	    	string += character;
	    	change_text(totalduration, string, dialoguename);
	    	totalduration += options[dialoguename].waitTime || 25;
	    }
		
		return totalduration;
	}
	
	function append_button(v, dialoguename) {
		var btn = document.createElement('div');
		btn.classList.add('ttdialogueoption');
		btn.innerHTML = '<div class="ttdialogueoptiontext">' + getKeywordsFor(v.option) + '</div>';
		if (v.btnstyle) {
		    var btnText = btn.querySelector('.ttdialogueoptiontext');
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
	
	function remove_element(element, wait) {
		setTimeout(function () {
			element.remove();
		}, wait);
	}
	
	function display_answers(current, dialoguename) {
		if (current.answers) {
			if (current.question !== undefined && typeof (current.answers) == "object" && typeof (current.answers[0]) != "string") {
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
			} else if (typeof (current.answers) == "string" || (typeof (current.answers) == "object" && typeof(current.answers[1]) == "string")) {
				var actions = {
					close_dialog: function () {
						close_prompt(dialoguename);
					},
				
				    popup: function (args) {
				    	close_prompt(dialoguename);
				    	var popup = document.createElement('img');
				    	popup.classList.add('popup');
				    	popup.src = '/wiki/Special:Filepath/' + args[0];
				    	dialogueText[dialoguename].appendChild(popup);
				    	remove_element(popup, 500);
				    }
				};
	
				if (typeof (current.answers) == "object") {
					for (var i in current.answers) {
						var action = current.answers[i];
	
						var barindex = action.indexOf("+");
	
						var args = action.substring(barindex > -1 ? barindex + 1 : 0, action.length).split("+");
	
						actions[action.substring(0, barindex > -1 ? barindex : action.length)](args);
					}
				} else {
					var action = current.answers;
	
					var barindex = action.indexOf("+");
	
					var args = action.substring(barindex > -1 ? barindex + 1 : 0, action.length).split("+");
	
					actions[action.substring(0, barindex > -1 ? barindex : action.length)](args);
				}
			}
		}
	}
			
	function next_dialogue(current, dialoguename) {
		current = current || dialogue_path[dialoguename];
		
		if (typeof (current) == 'object' && current[0] !== undefined) {
			current = current[Math.floor(Math.random() * current.length)]
		}
		
		var waittime = 0;
	
		remove_buttons(dialoguename);
	
		if (current.options) {
			loadOptions(current.options, dialoguename);
		}
	
		if (current.question !== undefined) {
			waittime = display_question(current.question, dialoguename);
		}
	
		setTimeout(function() {
			display_answers(current, dialoguename);
		}, waittime)
	}
	
	function create_dialogue(ttdialogue, dialoguename) {
		dialogues[dialoguename] = ttdialogue;
		dialogueNPCName[dialoguename] = ttdialogue.querySelector('.ttdialoguenpcname');
		dialogueText[dialoguename] = ttdialogue.querySelector('.ttdialoguetext');
		optionsList[dialoguename] = ttdialogue.querySelector('.ttdialogueoptionscontainer');
		restartMessage[dialoguename] = ttdialogue.querySelector('.ttdialoguerestart');
		
		dialogue_path[dialoguename] = JSON.parse(dialogueNPCName[dialoguename].innerHTML.replace(/<.+>/g, '').replace(/\{quot\}/g, '\\"').replace(/\{break\}/g, '<br/>'));
		
		console.log(dialogue_path[dialoguename]);
		
		restartMessage[dialoguename].addEventListener('click', function () {
			restartMessage[dialoguename].style.display = 'none';
			remove_buttons(dialoguename);
			next_dialogue(dialogue_path[dialoguename], dialoguename);
		});
		
		restartMessage[dialoguename].style.display = 'none';
		remove_buttons(dialoguename);
		next_dialogue(dialogue_path[dialoguename], dialoguename);
	}
	
	if (ttdialogues.length) {
		for (var i = 0; i < ttdialogues.length; i++) {
			var ttdialogue = ttdialogues.item(i);
			try {
				create_dialogue(ttdialogue, 'dialogue' + i)
			} catch (error) {
				ttdialogue.querySelector('.ttdialoguetext').innerHTML = error.stack;
			}
		}
	}
}

ttInit();