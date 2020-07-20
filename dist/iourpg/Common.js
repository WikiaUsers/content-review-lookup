/* Any JavaScript here will be loaded for all users on every page load. */

//Pet Arena enemy calculator by dustin789, added to by Bobogoobo
$(function() {
    if (mw.config.get('wgPageName') !== 'Pet_Arena') {
        return;
    }
    
    function enemyStats()
    {
        var levelInput = document.getElementById("level");
        if(isNaN(levelInput.value))
        {
            levelInput.value = "Not a number";
            return;
        }
        var level = parseInt(levelInput.value, 10);
        if(level < 1)
        {
            levelInput.value = "Invalid number";
            return;
        }
        document.getElementById("e_image").innerHTML =
            // index = enemy # because of header row
            $('#enemy-images tr').eq(level % 30 || 30).find('td > a')[0].outerHTML;
        var bonusDifficulty = 
            Math.max(0,(level-5)*5) + Math.max(0,(level-10)*2) + Math.max(0,(level-20)*10);
        var difficultyMod = 5 + level*5 + bonusDifficulty + Math.pow(level,2)/5;
        var levelMod = Math.floor(Math.min(level,30)/5);
        var modFive = Math.max(0,Math.floor((level-35)/5));
        var aboveLevelMod = 1+Math.pow(Math.max(0,level-100),1.5)/100;
        if(level>100)
        {
            aboveLevelMod *= Math.pow(1.1,Math.floor(level/100));    
        }
        var health = Math.floor(difficultyMod*Math.pow((level+1),2) *
            (Math.min(1,(0.15+0.1*levelMod)) +
            (Math.max(0,(level-35))+modFive)/50)*aboveLevelMod*0.8);
        document.getElementById("e_health").innerHTML = health.toLocaleString();
        var dmg = 0.35 * (5 + Math.pow(level,1.6) * 2.5 *
            (0.15+(0.085*levelMod)+(Math.max(0,level-35)/10+modFive*0.08))*aboveLevelMod);
        document.getElementById("e_avg_dmg").innerHTML = dmg.toLocaleString();
        document.getElementById("pp_reward").innerHTML = 
            ((1+Math.floor(level/25))*250).toLocaleString();
        var cumuPPReward = 0;
        for(var i = 1; i <= level; i++) 
        {
            cumuPPReward += (1+Math.floor(i/25))*250;
        }
        document.getElementById("cumu_pp_reward").innerHTML = cumuPPReward.toLocaleString();
        document.getElementById("pet_food_reward").innerHTML = 
            (Math.min(3,1+Math.floor(level/10))+Math.floor(level/50)).toLocaleString();
        var cumuPetFoodReward = 0;
        for(var j = 1; j <= level; j++)
        {
            cumuPetFoodReward += Math.min(3,1+Math.floor(j/10))+Math.floor(j/50);
        }
        document.getElementById("cumu_food_reward").innerHTML = 
            cumuPetFoodReward.toLocaleString();
    }

    function inputInit()
    {
        var div = document.getElementById("level_calc");
        var innerDiv = document.createElement("div");
        var inpt = document.createElement("input");
        inpt.id = "level";
        var button = document.createElement("button");
        button.innerHTML = "Calculate";
        button.onclick = enemyStats;
        innerDiv.style.border = "thin solid";
        innerDiv.appendChild(inpt);
        innerDiv.appendChild(document.createTextNode(" "));
        innerDiv.appendChild(button);
        div.insertBefore(innerDiv,div.childNodes[0]);
        $('#level_calc > p').attr('id', 'e_image');
    }

    inputInit();
});

//Inferno Tier user input script by Bobogoobo
$(function() {
	if (!$('#user-input-inferno').length) {
		return;
	}
 
	//Credit to http://stackoverflow.com/a/2901298
	function commas(num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
 
	//Abbreviate large numbers, and remove trailing 0s in decimals
	function format(commastr) {
		var parts = commastr.split(','), suffix = '';
		switch (parts.length - 1) {
			case 2:
				suffix = 'M';
				break;
			case 3:
				suffix = 'B';
				break;
			case 4:
				suffix = 'T';
				break;
			default:
				return parts.join(',');
		}
		var result = parts[0] + '.' + parts[1];
		while (result[result.length - 1] === '0') {
			result = result.substring(0, result.length - 1);
		}
		return result + ' ' + suffix;
	}
 
	$('#user-input-inferno').html(
		'<label>Inferno Tier:</label>' +
		' <input type="text" value="0" size="3" />' +
		' <a class="wikia-button" data-first-run="true">Set Tier</a>'
	).css('text-align', 'center').css('margin', '1em 0 0.5em 0');
 
	$('#user-input-inferno a').click(function() {
		var tier = parseInt($(this).prev().val(), 10);
		if (tier < 0 || tier > 500 || isNaN(tier) || $(this).prev().val().indexOf('.') !== -1) {
			alert('Inferno Tier must be an integer between 0 and 500.');
		} else {
			var isFirstRun = false;
			if ($(this).attr('data-first-run') === 'true') {
				isFirstRun = true;
				$(this).attr('data-first-run', 'false');
			}
 
			$('.user-input-inferno tr').each(function(index, elem) {
				if (!$(elem).find('th').length) {
					var $level = $(elem).find('td').eq(3);
					var $hp = $(elem).find('td').eq(4);
					if (isFirstRun) {
						//Initial level is based on planet, save to reuse later
						$level.attr('data-level', $level.text().replace(/,/g, ''));
					}
 
					var newLevel = parseInt($level.attr('data-level'), 10);
					newLevel += 150 * tier;
					$level.text(commas(newLevel));
 
					var newHp = newLevel * newLevel + 6;
					if (parseInt($(elem).find('td').eq(2).text(), 10) % 5 === 0) {
						//Bosses
						newHp *= 4;
					}
					var multiplier = 1 + (tier / 100) +
						(Math.floor(tier / 10) / 50) +
						(Math.floor(tier / 25) / 20) +
						(Math.floor(tier / 100) / 10);
					$hp.text(format(commas(Math.round(newHp * multiplier))));
				}
			});
		}
	});
});

//Countdown clock (import)
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});
        countdownTimer.translations = {
        en:{
        and: 'and',
        second: 'second',
        seconds: 'seconds',
        minute: 'minute',
        minutes: 'minutes',
        hour: 'hour',
        hours: 'hours'
        }
        };

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);