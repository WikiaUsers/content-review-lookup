// Base URL for images on the wiki
var IMAGE_BASE_LINK = 'https://static.wikia.nocookie.net/fantastic-frontier-roblox/images/';
// Update: to abstract away from this specific wiki server, we try find the name from the MediaWiki API, if found.
if (('mw' in window) && ('config' in mw) && ('wgServerName' in mw.config.values)) {
  IMAGE_BASE_LINK = 'https://static.wikia.nocookie.net/' + mw.config.values.wgServerName.replace('.fandom.com', '') + '/images/';
}

// Mini JS parser - this is due to several planned simulator modes (both present and future) having widely ranging implementations, and making changes based on game updates would otherwise mean redoing the review process over and over.
/* The mini JS parser only has access to a subset of simple commands, such as aritmethic expressions and some logic / functional design, to work with data processing. The idea is to:
- 1) Prepare loot-data from the Data Source structure, if data depends on factors not settable in the Data Source structure directly (can happen).
- 2) Processing loot-data when running the simulation. This is for custom-mode simulations (e.g. Deli minigame, farming, etc.)
*/

/*
Syntax:
x = 2 <-- variable assignment. local scope by default, unless the variable already exists in a parent scope.
obj.member = value <-- member assignment
lib.method(args) <-- method call, on object/library. 'console' and 'Math' are included known libraries.
if (condition) { expression } <-- if clause
for (start; condition; iteration) { expression } <-- for-loop clause
while (condition) { expression } <-- while clause
function name(args) { expression } <-- function declaration
name = (args) => { expression } <-- also function declaration (as lambda)
name(args) <-- function call
return expression <-- return statement (either value, variable, etc.)
operators +, -, *, ^, %, !, >, >=, <, <=, == and != are available.
numbers, strings and booleans are supported, and you can use JSON for objects & arrays.
strings can be either denoted with single-quote ' or double-quote ".
Character escaping is not supported. Parantheses for ordering are only partially supported.
Comments are not supported.
*/
function LinkedDictionary(parent) {
  this._parent = parent;
  this._values = {};
}
LinkedDictionary.prototype.get = function(key) {
  if (key in this._values) return this._values[key];
  if (this._parent) return this._parent.get(key);
};
LinkedDictionary.prototype.set = function(key, val, forceLocal) {
  if (!forceLocal && this._parent && this._parent.get(key) !== undefined) this._parent.set(key);
  this._values[key] = val;
};
LinkedDictionary.prototype.flatten = function() {
  var obj = {};
  if (this._parent) {
    var other = this._parent.flatten();
    for (var k1 in other) obj[k1] = other[k1];
  }
  for (var k2 in this._values) obj[k2] = this._values[k2];
  return obj;
};
var performParse;
var handleReturn = function(state, value) {
  state.scope._dofinish = true;
  state.scope._result = value;
};
var getEnclosedContent = function(str, begin, end) {
  var level = begin ? 0 : 1, content = '', totalLength = 0, hasStarted = !begin;
  var isString = false, isEscaped = false;
  for (var i = 0; i < str.length; i++) {
    totalLength++;
    var char = str[i];
    if (char === end && !isString) {
      level--;
      if (level === 0 && hasStarted) break;
    }
    if (level > 0) content += char;
    // We don't want to have characters such as () or {} in strings to affect counting matching pairs of () or {}.
    if (char === '\\') isEscaped = !isEscaped;
    if (!isEscaped && (char === '"' || char === '\'')) isString = !isString;
    if (char !== '\\') isEscaped = false;
    if (char === begin && !isString) {
      hasStarted = true;
      level++;
    }
  }
  return { content: content, length: content.length > 0 ? totalLength : 0 };
};
var libs = {
  'console': console,
  'Math': Math,
  'Array': Array,
  'Object': Object,
  'Date': Date
};
var operands = {
  // Math
  '+': { before: true, after: true, handler: function(b, a) { return b + a; } },
  '-': { before: true, after: true, handler: function(b, a) { return b - a; } },
  '*': { before: true, after: true, handler: function(b, a) { return b * a; } },
  '/': { before: true, after: true, handler: function(b, a) { return b / a; } },
  '^': { before: true, after: true, handler: function(b, a) { return Math.pow(b, a); } },
  '%': { before: true, after: true, handler: function(b, a) { return b % a; } },
  // Comparison
  '===': { before: true, after: true, handler: function(b, a) { return b === a; } },
  '==': { before: true, after: true, handler: function(b, a) { return b == a; } },
  '!=': { before: true, after: true, handler: function(b, a) { return b != a; } },
  '>': { before: true, after: true, handler: function(b, a) { return b > a; } },
  '>=': { before: true, after: true, handler: function(b, a) { return b >= a; } },
  '<': { before: true, after: true, handler: function(b, a) { return b < a; } },
  '<=': { before: true, after: true, handler: function(b, a) { return b <= a; } },
  // Logic/Booleans
  '!': { before: false, after: true, handler: function(b, a) { return !a; } },
  '&&': { before: true, after: true, handler: function(b, a) { return b && a; } },
  '||': { before: true, after: true, handler: function(b, a) { return b || a; } },
};
var handleExpr = function(state, str) {
  if (!str) return null;
  str = str.trim();
  var isString = false, isEscaped = false, oprBuffer = '', oprStart = 0;
  for (var i = 0; i < str.length; i++) {
    var char = str[i];
    if (char === '\\') isEscaped = !isEscaped;
    if (!isEscaped && (char === '"' || char === '\'')) isString = !isString;
    if (char !== '\\') isEscaped = false;
    if (!isString) {
      if (char.match(/[^\w_;,\(\) ]/g)) {
	    if (oprBuffer === '') oprStart = i;
        oprBuffer += char;
      } else { // Only when we've fully read the operand, we can be sure to perform it. Ex. to avoid confusion between (==, ===) or (>, >=).
	    if (oprBuffer in operands) {
          var before = null, after = null;
          if (operands[oprBuffer].before) before = handleExpr(state, str.substring(0, oprStart).trim());
          if (operands[oprBuffer].after) after = handleExpr(state, str.substring(i).trim());
          return operands[oprBuffer].handler(before, after);
        }
        oprBuffer = '';
      }
    }
  }
  if (str === 'true' || str === 'false')
    return str === 'true';
  else if (str.startsWith('"') || str.startsWith('\''))
    return str.substring(1, str.length - 1);
  else if (str.startsWith('{') || str.startsWith('['))
    return JSON.parse(str);
  else if (parseFloat(str) || str === '0')
    return parseFloat(str);
  else if (str.match(/^[\w\.]+$/g)) {
    var parts = str.split('.');
    var value = state.scope.vars.get(parts.shift());
    while (parts.length > 0) { value = value[parts.shift()]; }
    return value;
  } else if (str.match(/^\w+\[[^\]]+\]/g)) {
    var key = getEnclosedContent(str, '[', ']');
    return state.scope.vars.get(str.split('[')[0])[handleExpr(state, key.content)];
  } else if (str.match(/^\s*?(\w+)\.(\w+)\(([^\)]*)\);?/g)) {
    var match = /^\s*?(\w+)\.(\w+)\(([^\)]*)\);?/g.exec(str);
    var varName = match[1].trim();
    var method = match[2].trim();
    if (varName in libs) return libs[varName][method].apply(libs[varName], match[3].split(/, *?/g).map(function(arg) {
      return handleExpr(state, arg);
    }));
    else return state.scope.vars.get(varName)[method].apply(state.scope.vars.get(varName), match[3].split(/, *?/g).map(function(arg) {
      return handleExpr(state, arg);
    }));
  } else if (str.match(/^\s*?(\w+)\(([^\)]*)\);?/g)) {
    var _state = { buffer: str, scope: state.scope };
    performParse(_state);
    return _state._result;
  }
  else throw new Error('Invalid syntax for expression "' + str + '".');
};
var parserConfig = [
  { id: 'funcdecl', syntax: /^\s*?function (\w+)\(([^\)]+?)\)/g, handler: function(state, match) {
    var name = match[1].trim();
    var args = (match[2] || '').trim().split(/, ?/g);
    var body = getEnclosedContent(state.buffer, '{', '}');
    state.buffer = state.buffer.substring(body.length);
    state.scope.vars.set(name, {
      parentScope: state.scope,
      args: args,
      body: body.content
    });
  } },
  { id: 'lambda', syntax: /^\s*?(\w+) = \(([^\)]+?)\) ?=> ?/g, handler: function(state, match) {
    parserConfig.find(function(config) { return config.id === 'funcdecl'; }).handler(state, match);
  } },
  { id: 'if', syntax: /^\s*?if ?\(/g, handler: function(state, match) {
    var condition = getEnclosedContent('(' + state.buffer, '(', ')');
    state.buffer = state.buffer.substring(condition.length);
    var body = getEnclosedContent(state.buffer, '{', '}');
    state.buffer = state.buffer.substring(body.length);
    if (handleExpr(state, condition.content)) { performParse({ buffer: body.content, scope: state.scope }); }
  } },
  { id: 'for', syntax: /^\s*?for ?\(/g, handler: function(state, match) {
    var condition = getEnclosedContent('(' + state.buffer, '(', ')');
    state.buffer = state.buffer.substring(condition.length);
    var body = getEnclosedContent(state.buffer, '{', '}');
    state.buffer = state.buffer.substring(body.length);
    var conditionParts = condition.content.split(/; */g);
    performParse({ buffer: conditionParts[0], scope: state.scope });
    for (; handleExpr(state, conditionParts[1]); performParse({ buffer: conditionParts[2], scope: state.scope })) {
      performParse({ buffer: body.content, scope: state.scope });
    }
  } },
  { id: 'while', syntax: /^\s*?while ?\(/g, handler: function(state, match) {
    var condition = getEnclosedContent('(' + state.buffer, '(', ')');
    state.buffer = state.buffer.substring(condition.length);
    var body = getEnclosedContent(state.buffer, '{', '}');
    state.buffer = state.buffer.substring(body.length);
    while (handleExpr(state, condition.content)) { performParse({ buffer: body.content, scope: state.scope }); }
  } },
  { id: 'methodcall', syntax: /^\s*?(\w+)\.(\w+)\(([^\)]*)\);?/g, handler: function(state, match) {
    handleExpr(state, match[0]);
  } },
  { id: 'funccall', syntax: /^\s*?(\w+)\(([^\)]*?)\);?/g, handler: function(state, match) {
    var name = match[1].trim();
    var func = state.scope.vars.get(name);
    var args = (match[2] || '').trim().split(/, ?/g);
    var scopeVars = new LinkedDictionary(state.scope.vars);
    if (typeof func == 'function') {
      var result = func(args.map(function(arg) { return handleExpr(state, arg.trim()); }));
      state._result = result;
    } else {
      for (var i = 0; i < args.length; i++) scopeVars.set(func.args[i].trim(), handleExpr(state, args[i].trim()), true);
      var _state = { buffer: func.body, scope: { vars: scopeVars } };
      performParse(_state);
      state._result = _state._result;
    }
  } },
  { id: 'memberassign', syntax: /^\s*?(\w+)\.(\w+) = /g, handler: function(state, match) {
    var varName = match[1].trim();
    var key = match[2].trim();
    var value = getEnclosedContent(state.buffer, null, ';');
    state.buffer = state.buffer.substring(value.length);
    state.scope.vars.get(varName)[key] = handleExpr(state, value.content);
  } },
  { id: 'varassign', syntax: /^\s*?(\w+) = /g, handler: function(state, match) {
    var value = getEnclosedContent(state.buffer, null, ';');
    state.buffer = state.buffer.substring(value.length);
    state.scope.vars.set(match[1].trim(), handleExpr(state, value.content));
  } },
  { id: 'return', syntax: /^\s*?return ([^;]+);?/g, handler: function(state, match) {
    handleReturn(state, handleExpr(state, match[1]));
  } }
];

var MAX_TOKENS = 100000;
performParse = function(state) {
  var __i = 0;
  while (state.buffer.trim().length > 0 && __i < MAX_TOKENS) {
    __i++;
    for (var i = 0; i < parserConfig.length; i++) {
      var info = parserConfig[i];
      var match = info.syntax.exec(state.buffer);
      if (match) {
        state.buffer = state.buffer.substring(match[0].length);
        info.handler(state, match);
        break;
      }
    }
    if (state.scope._dofinish) break;
  }
  if (__i == MAX_TOKENS) throw new Error('Maximum number of tokens reached. Program probably recursing infinitely?');
};

/* Math'sy stuff */

// Finds a possible reward conforming to the logic of the 'Otherworld Tower' in Fantastic Frontier.
// Tiers are 'T1', 'T2', 'T3', 'T4' or 'T5'.
// Used as a replacement for hundreds of if-elseif cases.
function getReward(payload, tier) {
  var rtable = payload.data.loot[tier];
  var info = payload.data.calc_info[tier];
  var n = Math.floor(Math.random() * info.num);
  for (var i = 0; i < info.cases.length; i++) {
    var infoCase = info.cases[i];
    if (n >= infoCase.at_least) {
      return rtable[Math.floor(infoCase.lower + Math.random() * infoCase.range)];
    }
  }
  return null;
}
// Generates a list of items that are possible rewards from a certain floor (5-50)
// Used in the 'Otherworld Tower' simulator mode.
function generateRewards(payload, floor) {
  var rewards = [];
  var score = Math.floor(floor / 5) * 10 + Math.random() * 6;
  score += payload.data.checkpoint_info[floor] || 0;
  score = Math.floor(score * 0.715);
  for (var i = 100; i >= 0; i -= 25) {
    if (i != 0 && score >= i) {
      score -= i * Math.floor(Math.random() * 1.1);
      rewards.push(getReward(payload, "T" + Math.floor(i / 25 + 1)));
    } else if (score < 25) {
      if (score >= 7) rewards.push(getReward(payload, "T1"));
      score = 0;
    }
  }
  return rewards.filter(function(item) { return item !== null; });
}
// Helper: Combines the elements of array 'b' into array 'a'.
function combine(a, b) {
  for (var i = 0; i < b.length; i++) {
    a.push(b[i]);
  }
}
// Helper: Shuffles the elements of an array, and returns it as a new array.
// We are using the Fisher-Yates Algorithm for this.
function shuffleList(arr) {
  var result = [];
  combine(result, arr);
  for (var i = 0; i < arr.length; i++) {
    var j = Math.floor(Math.random() * arr.length);
    var _v = result[i];
    result[i] = result[j];
    result[j] = _v;
  }
  return result;
}
// Similar to generateRewards(...), but here we specify only to consider
// drop chances as a single run.
// Configurations 'shuffle_loot', 'max_items' and 'min_items' can be used
// to control our randomness and output array size constraints.
function generateChanceRewards(payload) {
  var rewards = [];
  var loot = payload.data.loot;
  if (payload.data.calc_info.shuffle_loot) {
    loot = shuffleList(loot);
  }
  var item;
  for (var r = 0; r < payload.data.calc_info.max_items; r++) {
    item = loot[Math.floor(Math.random() * loot.length)];
    if (Math.random() < item.chance) {
	  rewards.push(item);
    }
  }
  // If 'min_items' is specified, we keep going until we have
  // at least the required amount of loot.
  if (payload.data.calc_info.min_items) {
    while (rewards.length < payload.data.calc_info.min_items) {
      item = loot[Math.floor(Math.random() * loot.length)];
      if (Math.random() < item.chance) {
        rewards.push(item);
      }
    }
  }
  return rewards;
}
// Finds the average of a set of numbers.
// Seems to work even on sets of millions of numbers.
function avg(mean) {
  var sum = mean.reduce(function(acc, value) { return acc + value; }, 0);
  if (mean.length == 0) return 0;
  return sum / mean.length;
}
// Thousands separator for money values. Found on the internetz.
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// Legacy JS support, instead of using the spread operator.
// Used to perform Math.min / Math.max calls on arrays.
function runVarArgFunc(func, arr, initial) {
	for (var i = 0; i < arr.length; i++) {
		initial = func(initial, arr[i]);
	}
	return initial;
}
// Draws a bar chart/graph given a set of values.
// 'args' is an object of form { values: [...number], barColor: color, avg: number, avgColor: color }
function drawBarChart(canvas, args) {
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;
  ctx.fillStyle = args.barColor;
  var values = args.values;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var vl = Math.max(1, values.length);
  var bw = w / vl;
  var max = runVarArgFunc(Math.max, values, 0.001);
  var min = runVarArgFunc(Math.min, values, max + 1) * 0.5;
  for (var i = 0; i < values.length; i++) {
    var sh = (values[i] - min) / (max - min);
    ctx.fillRect((i / vl) * w, h - sh * h, bw, sh * h);
  }
  ctx.fillStyle = args.avgColor;
  var avgY = Math.ceil(h - ((args.avg - min) / (max - min)) * h);
  ctx.fillRect(0, avgY, w, 1);
}
// Dictionary to lookup our different simulator functions.
// Currently 'tower_sim' and 'chance_table' are supported.
var simulators = {
  tower_sim: function(payload) {
    var runs = [];
    var _step = payload.input.floor_step;
    var _startf = payload.input.start_floor;
    var _endf = payload.input.floor;
    // Show loading screen.
    // If the user runs millions of simulations, we need this to keep
    // user experience unhindered.
    payload.widget.find('.sim-main-screen').addClass('hidden');
    payload.widget.find('.sim-processing-wait').removeClass('hidden');
    var loadBar = payload.widget.find('.loaderBar')[0];
    loadBar.style.widget = '0';
    payload.input.runs = Math.max(1, payload.input.runs);
    var _r = 0;
    var _totalMin = null;
    var _totalMax = null;
    // Async callback for when the load-bar is done.
    var simulationDataReady = function() {
      payload.widget.find('.sim-main-screen').removeClass('hidden');
      payload.widget.find('.sim-processing-wait').addClass('hidden');
      var lootSummary = payload.widget.find('.loot-summary-holder');
      var lootGrid = lootSummary.find('.grid');
      lootGrid.empty();
  
      // Show a single run's loot.
      var showRunLoot = function(run) {
        var lootGrid = payload.widget.find('.sim-loot-inspect .run-loot-grid');
        lootGrid.empty();
  
        var worthMost = null;
  
        for (var i = 0; i < run.loot.length; i++) {
          var floor = run.loot[i];
          var profit = floor.items.reduce(function(acc, item) { return acc + item.price; }, 0);
  
          var lootCard = $('<div class="loot-card"><div class="loot-card-items"></div><div class="row-spaced">' +
            '<span class="info">' + payload.data.texts.x_floor.replace('{n}', floor.floor) +
            '</span><span class="worth">' + numberWithCommas(profit) + 'g</span></div></div>');
  
          for (var j = 0; j < floor.items.length; j++) {
            var item = floor.items[j];
            var tile = $('<a target="__blank"><img /></a>');
            tile.attr('href', '/wiki/' + item.link).attr('title', item.name);
            if (item.amount) tile.css({ '--amount': "'" + item.amount + "'" });
            if (item.image) tile.find('img').attr('src', IMAGE_BASE_LINK + item.image);
            lootCard.find('.loot-card-items').append(tile);
  
            if (worthMost === null || item.price > worthMost.price) worthMost = item;
          }
          lootGrid.append(lootCard);
        }
  
        // Show summary info for the single run (profit, worth most item).
        payload.widget.find('.loot-run-profit .worth').text(numberWithCommas(run.profit) + 'g');
        payload.widget.find('.loot-run-worthmost b').text(worthMost ? worthMost.name : '-');
        payload.widget.find('.loot-run-worthmost .worth').text(worthMost ? '(' + numberWithCommas(worthMost.price) + 'g)' : '');
        if (worthMost && worthMost.image) {
          payload.widget.find('.loot-run-worthmost-tile').attr('href', '/wiki/' + worthMost.link).attr('title', worthMost.name).removeClass('hidden');
          if (worthMost.amount) payload.widget.find('.loot-run-worthmost-tile').css({ '--amount': "'" + worthMost.amount + "'" });
          payload.widget.find('.loot-run-worthmost-tile img').attr('src', IMAGE_BASE_LINK + worthMost.image);
        } else {
          payload.widget.find('.loot-run-worthmost-tile').addClass('hidden');
        }
  
        payload.widget.find('.sim-main-screen').addClass('hidden');
        payload.widget.find('.sim-loot-inspect').removeClass('hidden');
      };
      // Create a box to describe a tower run.
      var generateRunSummaryCard = function(run) {
        var itemCount = run.loot.reduce(function(acc, loot) { return acc + loot.items.length; }, 0);
        var lootCard = $('<div class="loot-card enabled"><div class="loot-card-items"></div><div class="row-spaced">' +
          '<span class="info">' + payload.data.texts[itemCount !== 1 ? 'x_items' : '1_item'].replace('{amount}', itemCount) +
          '</span><span class="worth">' + numberWithCommas(run.profit) + 'g</span></div></div>');
        var items = run.loot.reduce(function(acc, loot) { combine(acc, loot.items); return acc; }, []);
        items.sort(function(a, b) { return b.price - a.price; });
        for (var j = 0; j < Math.min(5, items.length); j++) {
          var item = items[j];
          var tile = $('<a target="__blank"><img /></a>');
          tile.attr('href', '/wiki/' + item.link).attr('title', item.name);
          if (item.amount) tile.css({ '--amount': "'" + item.amount + "'" });
          if (item.image) tile.find('img').attr('src', IMAGE_BASE_LINK + item.image);
          lootCard.find('.loot-card-items').append(tile);
  
          tile.click(function(ev) {
            ev.stopPropagation();
          });
        }
        lootGrid.append(lootCard);
  
        lootCard.click(function() {
          showRunLoot(run);
        });
      };
  
      for (var i = 0; i < Math.min(6, runs.length); i++) {
        generateRunSummaryCard(runs[i]);
      }
      // Display summary info about the simulation as a whole.
      lootSummary.find('.more-results-hidden').text(
        payload.data.texts[runs.length !== 7 ? 'x_results_not_shown' : '1_result_not_shown'].replace('{amount}', runs.length - 6));
      if (runs.length > 6) lootSummary.find('.more-results-hidden').removeClass('hidden');
      else lootSummary.find('.more-results-hidden').addClass('hidden');
      lootGrid.parent().removeClass('hidden');
  
      var _profitAvg = avg(runs.map(function(run) { return run.profit; }));
      lootSummary.find('.loot-summary-average .worth').text(numberWithCommas(Math.floor(_profitAvg)) + 'g');
      lootSummary.find('.loot-summary-min .worth').text(numberWithCommas(_totalMin) + 'g');
      lootSummary.find('.loot-summary-max .worth').text(numberWithCommas(_totalMax) + 'g');
  
      var hourFactor = 3600 / (payload.input.run_time.min * 60 + payload.input.run_time.sec);
      lootSummary.find('.loot-summary-average-hour .worth').text(numberWithCommas(Math.floor(_profitAvg * hourFactor)) + 'g');
      lootSummary.find('.loot-summary-min-hour .worth').text(numberWithCommas(Math.floor(_totalMin * hourFactor)) + 'g');
      lootSummary.find('.loot-summary-max-hour .worth').text(numberWithCommas(Math.floor(_totalMax * hourFactor)) + 'g');
  
      var chartRuns = runs;
      if (chartRuns.length > 50) {
        chartRuns = [];
        for (var j = 0; j < runs.length; j += runs.length * 0.02) {
          var v = Math.floor(j);
          if (v < runs.length) chartRuns.push(runs[v].profit);
        }
      }
      
      var canvas = lootSummary.find('.graph-container canvas')[0];
      drawBarChart(canvas, {
        values: chartRuns,
        barColor: payload.widget.css('--active1').trim(),
        avg: _profitAvg,
        avgColor: payload.widget.css('--charthighlight').trim()
      });
    };

    // Testing the simulator on a scale of >400000 runs showed performance issues.
    // Therefore, we employ chunk-based simulation with requestAnimationFrame() to
    // preserve the user experience while performing heavy simulation tasks.
    var _chunkSize = 20000;
    if (payload.input.runs > 60000) _chunkSize = 5000;
    else if (payload.input.runs > 20000) _chunkSize = 10000;
    // Note: The simulation id is used for the 'cancel' button during load.
    var simulationId = Math.floor(Math.random() * 1000000) + '-' + Math.floor(Math.random() * 1000000);
    var chunkSimulation = function() {
      var _t = Math.min(_chunkSize, payload.input.runs - _r);
      for (var r = 0; r < _t; r++) {
        _r++;
        var run = { loot: [], profit: 0 };
        for (var floor = Math.ceil((_startf + 1) / _step) * _step; floor <= _endf; floor += _step) {
          var loot = generateRewards(payload, floor);
          run.loot.push({ floor: floor, items: loot });
        }
        run.profit = run.loot.reduce(function(acc, loot) {
			return acc + loot.items.reduce(function(acc2, item) { return acc2 + item.price; }, 0);
		}, 0);
        runs.push(run);
        if (_totalMin == null || run.profit < _totalMin) _totalMin = run.profit;
        if (_totalMax == null || run.profit > _totalMax) _totalMax = run.profit;
      }
      if (simulationId !== payload.data.__simulationId) {
        payload.widget.find('.sim-main-screen').removeClass('hidden');
        payload.widget.find('.sim-processing-wait').addClass('hidden');
        return;
      }
      if (_r < payload.input.runs) {
        loadBar.style.width = ((_r / payload.input.runs) * 100) + '%';
        requestAnimationFrame(chunkSimulation);
      } else {
        simulationDataReady();
      }
    };
    payload.data.__simulationId = simulationId;
    requestAnimationFrame(chunkSimulation);
  },
  chance_table: function(payload) {
    var runs = [];
    // Show loading screen.
    // If the user runs millions of simulations, we need this to keep
    // user experience unhindered.
    payload.widget.find('.sim-main-screen').addClass('hidden');
    payload.widget.find('.sim-processing-wait').removeClass('hidden');
    var loadBar = payload.widget.find('.loaderBar')[0];
    loadBar.style.widget = '0';
    payload.input.runs = Math.max(1, payload.input.runs);
    var _r = 0;
    var _totalMin = null;
    var _totalMax = null;
    // Async callback for when the load-bar is done.
    var simulationDataReady = function() {
      payload.widget.find('.sim-main-screen').removeClass('hidden');
      payload.widget.find('.sim-processing-wait').addClass('hidden');
      var lootSummary = payload.widget.find('.loot-summary-holder');
      var lootGrid = lootSummary.find('.grid');
      lootGrid.empty();
  
      // Create a box to describe a single run.
      var generateRunSummaryCard = function(run) {
        var itemCount = run.items.length;
        var lootCard = $('<div class="loot-card"><div class="loot-card-items"></div><div class="row-spaced">' +
          '<span class="info">' + payload.data.texts[itemCount !== 1 ? 'x_items' : '1_item'].replace('{amount}', itemCount) +
          '</span><span class="worth">' + numberWithCommas(run.profit) + 'g</span></div></div>');
        var items = run.items;
        items.sort(function(a, b) { return b.price - a.price; });
        for (var j = 0; j < Math.min(5, items.length); j++) {
          var item = items[j];
          var tile = $('<a target="__blank"><img /></a>');
          tile.attr('href', '/wiki/' + item.link).attr('title', item.name);
          if (item.amount) tile.css({ '--amount': "'" + item.amount + "'" });
          if (item.image) tile.find('img').attr('src', IMAGE_BASE_LINK + item.image);
          lootCard.find('.loot-card-items').append(tile);
  
          tile.click(function(ev) {
            ev.stopPropagation();
          });
        }
        lootGrid.append(lootCard);
      };
  
      for (var i = 0; i < Math.min(6, runs.length); i++) {
        generateRunSummaryCard(runs[i]);
      }
      // Display summary info about the simulation as a whole.
      lootSummary.find('.more-results-hidden').text(
        payload.data.texts[runs.length !== 7 ? 'x_results_not_shown' : '1_result_not_shown'].replace('{amount}', runs.length - 6));
      if (runs.length > 6) lootSummary.find('.more-results-hidden').removeClass('hidden');
      else lootSummary.find('.more-results-hidden').addClass('hidden');
      lootGrid.parent().removeClass('hidden');
  
      var _profitAvg = avg(runs.map(function(run) { return run.profit; }));
      lootSummary.find('.loot-summary-average .worth').text(numberWithCommas(Math.floor(_profitAvg)) + 'g');
      lootSummary.find('.loot-summary-min .worth').text(numberWithCommas(_totalMin) + 'g');
      lootSummary.find('.loot-summary-max .worth').text(numberWithCommas(_totalMax) + 'g');
  
      var hourFactor = 3600 / (payload.input.run_time.min * 60 + payload.input.run_time.sec);
      lootSummary.find('.loot-summary-average-hour .worth').text(numberWithCommas(Math.floor(_profitAvg * hourFactor)) + 'g');
      lootSummary.find('.loot-summary-min-hour .worth').text(numberWithCommas(Math.floor(_totalMin * hourFactor)) + 'g');
      lootSummary.find('.loot-summary-max-hour .worth').text(numberWithCommas(Math.floor(_totalMax * hourFactor)) + 'g');
  
      var chartRuns = runs;
      if (chartRuns.length > 50) {
        chartRuns = [];
        for (var j = 0; j < runs.length; j += runs.length * 0.02) {
          var v = Math.floor(j);
          if (v < runs.length) chartRuns.push(runs[v].profit);
        }
      }
      
      var canvas = lootSummary.find('.graph-container canvas')[0];
      drawBarChart(canvas, {
        values: chartRuns,
        barColor: payload.widget.css('--active1').trim(),
        avg: _profitAvg,
        avgColor: payload.widget.css('--charthighlight').trim()
      });
    };
    // Testing the simulator on a scale of >400000 runs showed performance issues.
    // Therefore, we employ chunk-based simulation with requestAnimationFrame() to
    // preserve the user experience while performing heavy simulation tasks.
    var _chunkSize = 20000;
    if (payload.input.runs > 60000) _chunkSize = 5000;
    else if (payload.input.runs > 20000) _chunkSize = 10000;
    // Note: The simulation id is used for the 'cancel' button during load.
    var simulationId = Math.floor(Math.random() * 1000000) + '-' + Math.floor(Math.random() * 1000000);
    var chunkSimulation = function() {
      var _t = Math.min(_chunkSize, payload.input.runs - _r);
      for (var r = 0; r < _t; r++) {
        _r++;
        var run = { items: generateChanceRewards(payload), profit: 0 };
        run.profit = run.items.reduce(function(acc, item) { return acc + item.price; }, 0);
        runs.push(run);
        if (_totalMin == null || run.profit < _totalMin) _totalMin = run.profit;
        if (_totalMax == null || run.profit > _totalMax) _totalMax = run.profit;
      }
      if (simulationId !== payload.data.__simulationId) {
        payload.widget.find('.sim-main-screen').removeClass('hidden');
        payload.widget.find('.sim-processing-wait').addClass('hidden');
        return;
      }
      if (_r < payload.input.runs) {
        loadBar.style.width = ((_r / payload.input.runs) * 100) + '%';
        requestAnimationFrame(chunkSimulation);
      } else {
        simulationDataReady();
      }
    };
    payload.data.__simulationId = simulationId;
    requestAnimationFrame(chunkSimulation);
  },
  custom: function(payload) {
    var runs = [];
    // Show loading screen.
    // If the user runs millions of simulations, we need this to keep
    // user experience unhindered.
    payload.widget.find('.sim-main-screen').addClass('hidden');
    payload.widget.find('.sim-processing-wait').removeClass('hidden');
    var loadBar = payload.widget.find('.loaderBar')[0];
    loadBar.style.widget = '0';
    payload.input.runs = Math.max(1, payload.input.runs);
    var _r = 0;
    var _totalMin = null;
    var _totalMax = null;
    // Async callback for when the load-bar is done.
    var simulationDataReady = function() {
      payload.widget.find('.sim-main-screen').removeClass('hidden');
      payload.widget.find('.sim-processing-wait').addClass('hidden');
      var lootSummary = payload.widget.find('.loot-summary-holder');
      var lootGrid = lootSummary.find('.grid');
      lootGrid.empty();
  
      // Create a box to describe a single run.
      var generateRunSummaryCard = function(run) {
        var itemCount = run.items.length;
        var lootCard = $('<div class="loot-card"><div class="loot-card-items"></div><div class="row-spaced">' +
          '<span class="info">' + payload.data.texts[itemCount !== 1 ? 'x_items' : '1_item'].replace('{amount}', itemCount) +
          '</span><span class="worth">' + numberWithCommas(run.profit) + 'g</span></div></div>');
        if (run.className) { lootCard.addClass('loot-card-' + run.className); } // Some cards can be styled specifically for the given simulator.
        var items = run.items;
        items.sort(function(a, b) { return b.price - a.price; });
        for (var j = 0; j < Math.min(5, items.length); j++) {
          var item = items[j];
          var tile = $('<a target="__blank"><img /></a>');
          tile.attr('href', '/wiki/' + item.link).attr('title', item.name);
          if (item.amount) tile.css({ '--amount': "'" + item.amount + "'" });
          if (item.image) tile.find('img').attr('src', IMAGE_BASE_LINK + item.image);
          lootCard.find('.loot-card-items').append(tile);
  
          tile.click(function(ev) {
            ev.stopPropagation();
          });
        }
        lootGrid.append(lootCard);
      };
  
      for (var i = 0; i < Math.min(6, runs.length); i++) {
        generateRunSummaryCard(runs[i]);
      }
      // Display summary info about the simulation as a whole.
      lootSummary.find('.more-results-hidden').text(
        payload.data.texts[runs.length !== 7 ? 'x_results_not_shown' : '1_result_not_shown'].replace('{amount}', runs.length - 6));
      if (runs.length > 6) lootSummary.find('.more-results-hidden').removeClass('hidden');
      else lootSummary.find('.more-results-hidden').addClass('hidden');
      lootGrid.parent().removeClass('hidden');
  
      var _profitAvg = avg(runs.map(function(run) { return run.profit; }));
      lootSummary.find('.loot-summary-average .worth').text(numberWithCommas(Math.floor(_profitAvg)) + 'g');
      lootSummary.find('.loot-summary-min .worth').text(numberWithCommas(_totalMin) + 'g');
      lootSummary.find('.loot-summary-max .worth').text(numberWithCommas(_totalMax) + 'g');
  
      var hourFactor = 3600 / (payload.input.run_time.min * 60 + payload.input.run_time.sec);
      lootSummary.find('.loot-summary-average-hour .worth').text(numberWithCommas(Math.floor(_profitAvg * hourFactor)) + 'g');
      lootSummary.find('.loot-summary-min-hour .worth').text(numberWithCommas(Math.floor(_totalMin * hourFactor)) + 'g');
      lootSummary.find('.loot-summary-max-hour .worth').text(numberWithCommas(Math.floor(_totalMax * hourFactor)) + 'g');
  
      var chartRuns = runs;
      if (chartRuns.length > 50) {
        chartRuns = [];
        for (var j = 0; j < runs.length; j += runs.length * 0.02) {
          var v = Math.floor(j);
          if (v < runs.length) chartRuns.push(runs[v].profit);
        }
      }
      
      // Preparation task to perform after the simulation, but before drawing the chart.
      // Usable for processing result data to make the canvas bar-graph more relevant based on various analyses to reduce outliers etc.
      if ('afterSimulation' in payload.data.calc_info) {
        var bindingVars = new LinkedDictionary();
        bindingVars.set('payload', payload, true); // Read the payload to determine what loot/items/etc. the user has obtained.
        bindingVars.set('chartRuns', chartRuns, true); // The data for the chart to process.
        var runState = { buffer: payload.data.calc_info.afterSimulation, scope: { vars: bindingVars } };
        performParse(runState); // Return value is disregarded.
      }
      var canvas = lootSummary.find('.graph-container canvas')[0];
      drawBarChart(canvas, {
        values: chartRuns,
        barColor: payload.widget.css('--active1').trim(),
        avg: _profitAvg,
        avgColor: payload.widget.css('--charthighlight').trim()
      });
    };
    // Preparation task to perform before the simulation.
    // Usable for pre-processing loot data based on simulation settings etc.
    if ('beforeSimulation' in payload.data.calc_info) {
      var bindingVars = new LinkedDictionary();
      bindingVars.set('payload', payload, true); // Read the payload to determine what loot/items/etc. the user gets.
      var runState = { buffer: payload.data.calc_info.beforeSimulation, scope: { vars: bindingVars } };
      performParse(runState); // Return value is disregarded.
    }
    // Testing the simulator on a scale of >400000 runs showed performance issues.
    // Therefore, we employ chunk-based simulation with requestAnimationFrame() to
    // preserve the user experience while performing heavy simulation tasks.
    var _chunkSize = 2000;
    if (payload.input.runs > 60000) _chunkSize = 1500;
    else if (payload.input.runs > 20000) _chunkSize = 1800;
    // Note: The simulation id is used for the 'cancel' button during load.
    var simulationId = Math.floor(Math.random() * 1000000) + '-' + Math.floor(Math.random() * 1000000);
    var chunkSimulation = function() {
      var _t = Math.min(_chunkSize, payload.input.runs - _r);
      for (var r = 0; r < _t; r++) {
        _r++;
        var bindingVars = new LinkedDictionary();
        bindingVars.set('payload', payload, true); // Read the payload to determine what loot/items/etc. the user gets.
        var runState = { buffer: payload.data.calc_info.generateRewards, scope: { vars: bindingVars } };
        performParse(runState);
        var run = runState.scope._result; // Use the parsed result as loot data. Expected to have items & profit.
        run.profit = run.items.reduce(function(acc, item) { return acc + item.price; }, 0);
        runs.push(run);
        if (_totalMin == null || run.profit < _totalMin) _totalMin = run.profit;
        if (_totalMax == null || run.profit > _totalMax) _totalMax = run.profit;
      }
      if (simulationId !== payload.data.__simulationId) {
        payload.widget.find('.sim-main-screen').removeClass('hidden');
        payload.widget.find('.sim-processing-wait').addClass('hidden');
        return;
      }
      if (_r < payload.input.runs) {
        loadBar.style.width = ((_r / payload.input.runs) * 100) + '%';
        requestAnimationFrame(chunkSimulation);
      } else {
        simulationDataReady();
      }
    };
    payload.data.__simulationId = simulationId;
    requestAnimationFrame(chunkSimulation);
  }
};
// Maps the values from the HTML DOM into a JS object, which we
// can use in our simulator callback function.
function runSimulation(widget, data) {
  var payload = { data: data, widget: widget, input: {} };
  for (var i = 0; i < data.controls.length; i++) {
    var control = data.controls[i];
    switch (control.type) {
      case 'range':
        var slider = widget.find('input[data-widget-input-id="' + control.id + '"]');
        payload.input[control.id] = parseInt(slider.val());
      break;
      case 'number':
        var input = widget.find('input[data-widget-input-id="' + control.id + '"]');
        payload.input[control.id] = parseInt(input.val());
      break;
      case 'radio':
        var button = widget.find('input[name="' + control.id + '"]:checked');
        payload.input[control.id] = parseInt(button.val());
      break;
      case 'time':
        var timeHolder = widget.find('div[data-widget-input-id="' + control.id + '"]');
        payload.input[control.id] = {
          min: parseInt(timeHolder.find('.timecontrol-min').val()),
          sec: parseInt(timeHolder.find('.timecontrol-sec').val())
        };
      break;
      case 'raw':
        payload.input[control.id] = control.value;
      break;
      default:
        break;
    }
  }
  simulators[data.run_button.func](payload);
}
// Builds the HTML elements and logic from some static data.
// Useful for customizing the input controls that the user can adjust to simulate their runs.
function buildInputControl(control, controlsHolder) {
  switch (control.type) {
    case 'range':
      var rangeSlider = $('<div><span class="control-title"></span><div><input type="range"/><span class="range-value" style="--left: 100">50</span></div></div>');
      rangeSlider.find('.control-title').text(control.name);
      var slider = rangeSlider.find('input');
      slider.attr('data-widget-input-id', control.id);
      if (control.min != undefined) slider.attr('min', control.min);
      if (control.max != undefined) slider.attr('max', control.max);
      if (control.default != undefined) slider.attr('value', control.default);
      if (control.step != undefined) slider.attr('step', control.step);
      var rangeValue = rangeSlider.find('.range-value');
      var sliderValue = control.default || 0;
      var sliderMin = control.min || 0;
      var sliderMax = control.max || 100;
      rangeValue.text(sliderValue + '');
      rangeValue.css({ '--left': ((sliderValue - sliderMin) * 100 / (sliderMax - sliderMin)) + '' });
      controlsHolder.append(rangeSlider);
      slider.on('input', function() {
        var val = $(this).val();
        var left = ((val - sliderMin) * 100 / (sliderMax - sliderMin));
        rangeValue.text(val + '').css({ '--left': left + '' });
      });
    break;
    case 'number':
      var numberInput = $('<label><span class="control-title"></span><input type="number" class="setwidth-6 spacing-rs"/></label>');
      numberInput.find('.control-title').text(control.name);
      var input = numberInput.find('input');
      input.attr('data-widget-input-id', control.id);
      if (control.min != undefined) input.attr('min', control.min);
      if (control.max != undefined) input.attr('max', control.max);
      if (control.default != undefined) input.attr('value', control.default);
      if (control.button) {
        var button = $('<a class="btn"></a>');
        button.text(control.button.text);
        var val = control.button.value;
        button.click(function() { input.val(val); });
        numberInput.append(button);
      }
      controlsHolder.append(numberInput);
      input.on('change', function() {
        var val = parseInt($(this).val());
        if (!val || val < (control.min || 0)) input.val(control.min || 0);
        else if (control.max && val > control.max) input.val(control.max);
      });
    break;
    case 'radio':
      var holder = $('<div><span class="control-title"></span></div>');
      holder.find('.control-title').text(control.name);
      holder.attr('data-widget-input-id', control.id);
      for (var j = 0; j < control.values.length; j++) {
        var v = control.values[j];
        var btn = $('<label><input type="radio"><div class="radio-btn"></div></label>');
        btn.find('input').attr('name', control.id).attr('value', v.value);
        if (v.checked) btn.find('input').attr('checked', true);
        btn.find('.radio-btn').text(v.text);
        holder.append(btn);
      }
      controlsHolder.append(holder);
    break;
    case 'time':
      var timeHolder = $('<div><span class="control-title"></span><input type="number" min="1" max="1000" class="timecontrol-min setwidth-4"/> : ' +
        '<input type="number" min="0" max="59" class="timecontrol-sec setwidth-4"/></div>');
      timeHolder.find('.control-title').text(control.name);
      timeHolder.attr('data-widget-input-id', control.id);
      var def = control.default.split(':');
      timeHolder.find('.timecontrol-min').val(parseInt(def[0])).attr('title', control.min.title).attr('placeholder', control.min.placeholder);
      timeHolder.find('.timecontrol-sec').val(parseInt(def[1])).attr('title', control.sec.title).attr('placeholder', control.sec.placeholder);
      controlsHolder.append(timeHolder);
    break;
    case 'raw':
      break;
    default:
      console.warn('Unreckognized control type:', control.type, control);
      break;
  }
}

// Helper: Replaces all occurrences of a substring within a string. (JS only has .replace ???)
function replaceAll(str, find, repl) {
	while (str.indexOf(find) !== -1) str = str.replace(find, repl);
	return str;
}
// Loads up the logic of the Simulator Widget.
function loadWidget(widget) {
    // Update: to abstract away from this specific wiki server, we try find the name from the MediaWiki API, if found. If mw is loaded later than the script? Shouldn't be possible...
	if (('mw' in window) && ('config' in mw) && ('wgServerName' in mw.config.values)) {
	  IMAGE_BASE_LINK = 'https://static.wikia.nocookie.net/' + mw.config.values.wgServerName.replace('.fandom.com', '') + '/images/';
	}
	var title = widget.attr('data-title');
	widget.find('>h1').text(title);
	var footertext = widget.attr('data-footertext');
	if (footertext && footertext.length > 0 && footertext !== 'Footer text') {
		widget.find('.footer span').text(footertext);
	}
	// Our data source file contains JSON data of hundreds of items, drop chances and simulator configurations.
	// For example, check this -> Template:TowerSimulatorData
	var datasource = widget.attr('data-datasource');
	$.get('/index.php?title=' + encodeURIComponent(datasource) + '&action=raw&ctype=text%2Fplain', function(jsonStr) {
	    jsonStr = replaceAll(jsonStr, String.fromCharCode(160), ''); // odd 160 ASCII code making our JSON invalid :(
	    var data = JSON.parse(jsonStr);
	    
	    if (data.calc_info && data.calc_info.prepareData) {
		  var bindingVars = new LinkedDictionary();
		  bindingVars.set('data', data, true); // Allow modification of the Data Source contents.
	      var prepareDataState = { buffer: data.calc_info.prepareData, scope: { vars: bindingVars } };
	      performParse(prepareDataState);
	    }
	    
	    // For internationalization purposes - if other wikis want to employ this simulator widget.
	    widget.find('.loot-summary-average .text').text(data.texts.avg_profit);
	  	widget.find('.loot-summary-min .text').text(data.texts.min_profit);
	  	widget.find('.loot-summary-max .text').text(data.texts.max_profit);
	  	widget.find('.loot-summary-average-hour .text').text(data.texts.avg_profit_hour);
	  	widget.find('.loot-summary-min-hour .text').text(data.texts.min_profit_hour);
	  	widget.find('.loot-summary-max-hour .text').text(data.texts.max_profit_hour);
	  	widget.find('.graph-container').css({ '--title': "'" + data.texts.profit_dist + "'" });
	  	widget.find('.sim-loot-inspect-results').text(data.texts.results);
	  	widget.find('.sim-loot-inspect-runloot').text(data.texts.run_loot);
	  	widget.find('.loot-run-profit .text').text(data.texts.total_profit);
	  	widget.find('.loot-run-worthmost .text').text(data.texts.worth_most);
	  	widget.find('.btn-cancel').text(data.texts.cancel);
	  	widget.find('.back-btn').click(function() {
	    	widget.find('.sim-main-screen').removeClass('hidden');
	    	widget.find('.sim-loot-inspect').addClass('hidden');
	  	});
	  	var controlsHolder = widget.find('.controls-holder');
	  	for (var i = 0; i < data.controls.length; i++) {
	    	buildInputControl(data.controls[i], controlsHolder);
	  	}
	  	var simulationButton = $('<a class="btn btn-large"></a>');
	  	simulationButton.text(data.run_button.text);
	  	controlsHolder.append(simulationButton);
	  	simulationButton.click(function() {
	    	runSimulation(widget, data);
	  	});
	  	widget.find('.btn-cancel').click(function() {
	    	data.__simulationId = null;
	  	});
	});
}

// Hook up to article page load, find all Simulator Widgets, and initialize them.
mw.hook("wikipage.content").add(function($content) {
	var widgets = $content.find('.SimulatorWidget');
	// Note: I am a bit fearful in case we need to change this HTML later on, as the JS will need re-approval then.
	// Hopefully the customization in our data source file, and CSS, will take care of most of this.
	widgets.html('<h1>-</h1><div class="row sim-main-screen"><form class="col-5 controls-holder"></form><div class="col-7 loot-summary-holder hidden"><h3>Results</h3><div class="grid"></div><p class="more-results-hidden">- more results not shown</p><div class="loot-card setheight-20 padding-ls"><div><div class="float-right graph-container" style="--title:\'Profit distribution\'"><canvas width="114" height="60"></canvas></div><span class="text-large loot-summary-average"><span class="text">Average profit</span>:<br/><span class="worth"></span></span><span class="text-info loot-summary-min"><span class="text">Minimum profit</span>: <span class="worth"></span></span><span class="text-info loot-summary-max"><span class="text">Maximum profit</span>: <span class="worth"></span></span></div><hr/><div><span class="text-large loot-summary-average-hour"><span class="text">Avg. profit / hour</span>:<br/><span class="worth"></span></span><span class="text-info loot-summary-min-hour"><span class="text">Min. profit / hour</span>: <span class="worth"></span></span><span class="text-info loot-summary-max-hour"><span class="text">Max. profit / hour</span>: <span class="worth"></span></span></div></div></div></div><div class="row sim-loot-inspect hidden"><div class="col-12"><div class="grid-auto-width"><span class="back-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM16 7L0.999999 7L0.999999 9L16 9L16 7Z" fill="var(--textcolor)"/></svg><span class="sim-loot-inspect-results">Results</span></span><h3 class="sim-loot-inspect-runloot">Run Loot</h3></div><div class="grid run-loot-grid"></div><div class="grid"><div class="loot-card grid-auto-width"><div class="loot-card-padding"><a href="#" target="__blank" title="Item name" class="tile-big float-right loot-run-worthmost-tile"><img /></a><span class="text-large loot-run-profit"><span class="text">Total profit</span>: <span class="worth"></span></span><span class="text-info loot-run-worthmost"><span class="text">Worth most</span>: <b>-</b> <span class="worth"></span></span></div></div></div></div></div><div class="row sim-processing-wait hidden"><div class="col-12"><div class="loader"><div class="loaderBar"></div></div><a class="btn btn-cancel">Cancel</a></div></div><div class="footer"><svg class="footer-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="var(--background)" d="M0,0 L100,0 L50,100 L0,0 z"></path></svg><span></span></div>');
	
	for (var i = 0; i < widgets.length; i++) {
		loadWidget($(widgets[i]));
	}
});