RLQ.push(['jquery', function () {
  $(document).ready(function() {
    var skillforms = $('.skillform');
    if (skillforms.length > 0) {
      skillforms.each(function(idx, element) {
        initButtons($(element).find('.tabButtonLane'), function(tabs) {
          initSkillForm(element, tabs);
          $(element).find('.tabButtonLane button').first().click();
        });
      });
    }
  });
}]);


function initButtons(buttonContainer, finishedHandler) {
  var skillform = buttonContainer.closest('.skillform');
  
  // Remove any existence of another button
  buttonContainer.empty();
  
  var skillCount = skillform.find('.skilldataraw').length;
  
  for (var idx=1; idx<=skillCount; idx++) {
  	var idxNameAddOn = idx === 1 ? "" : ""+idx;
  	var skillElement = skillform.find('.skilldataraw[data-skilldata-content="skill' + idxNameAddOn + 'data"] div');
	if (skillElement.length === 1) {
	  var buttonData = convertSkillData(skillElement);
	  var button = $('<button></button>');
	  button.data('skilldata', buttonData);
	  //Special tab names in Template:PNCHero
	  if (skillform.hasClass('pnchero')){
	  	switch(idx){
	  		case 1:button.text('Passive'); break;
	  		case 2:button.text('Auto'); break;
	  		case 3:button.text('Ultimate'); break;
	  		default:button.text('Skill' + idx);
	  	}
	  }else{
		button.text('Skill' + idx);
	  }
	  
	  buttonContainer.append(button);
	}
  }
  
  finishedHandler(buttonContainer.find('button'));
}

function initSkillForm(element, tabs) {
  var skillform = $(element);
          
  // selector is not possible in Wiki so we have to create it :/
  var levelSelector = skillform.find('.skilllevel select');
  if (levelSelector.length < 1) {
    levelSelector = $('<select></select>');
    levelSelector.addClass("gf-droplist");
    skillform.find('.skilllevel').append(levelSelector);
  } 
  levelSelector.change(function() { display_data(skillform, $(this).data('skilldata')); });
  
  tabs.click(function(evt) {
    skillformButtonHandler(evt.target);
  });
}

function skillformButtonHandler(element) {
  var currentButton = $(element);
  var skillform = currentButton.closest('.skillform');
  
  skillform.find('.tabButtonLane button').removeClass('tabButton-active');
  currentButton.addClass('tabButton-active');
  
  var convertedData = currentButton.data('skilldata');
  
  display_data(skillform, convertedData);
}

function convertSkillData(dataElement) {
  skill_data = {};
  var key;
  
  dataElement.find('tbody tr').each(function(index, row) {
  	var key = $(row).find('th').text().trim();
  	var tds = $(row).find('td');
  	if (tds.length === 1) {
  		skill_data[key] = tds.first().html().trim();
  	} else {
  		var lines = tds.map(function(index, td) {
        	return $(td).text().trim();
    	});
  		skill_data[key] = lines;
  	}
  });
  
  return skill_data;
} 

function calculateDescriptionText(data, chosenLevelIdx) {
  var regex = /\(\$\w+\)/g;
  var resultText = data.text;
  
  if (!data.text || typeof data.text.match !== "function") {
    console.log("debug", data);
    return resultText;
  }
  
  var vars = data.text.match(regex);
  var i; // For i not being global :)
  for (i = 0; i < vars.length; i++) {
    var_name = vars[i].substring(2, vars[i].length - 1);
    resultText = resultText.replace(vars[i], "<span class='skill-value'>" + data[var_name][chosenLevelIdx] + "</span>");
  }
  return resultText;
}

function calculateConditionText(data, chosenLevelIdx) {
  /* Passive for skilldata without special properties. */
  var result = "Passive";
  /* Use support points for fairies by default, if this is an assimilated unit use action points instead */
  var pointsToUse = $('.skillform').hasClass('assimilated') ? ' action' : ' support';
  if (data.hasOwnProperty('skill_cost')) {
  	/* Fairys hav turn_cooldown and skill_cost. */
  	if (Array.isArray(data.skill_cost) || typeof data.skill_cost === 'object') {
      result = data.skill_cost[chosenLevelIdx] + pointsToUse + ' point(s) per use';
    } else {
      result = data.skill_cost + pointsToUse + ' point(s) per use';
    }
    if (data.hasOwnProperty('turn_cooldown')) {
      if (Array.isArray(data.turn_cooldown) || typeof data.turn_cooldown === 'object') {
        result += ', ' + data.turn_cooldown[chosenLevelIdx] + ' turn cooldown';
      } else {
      	result += ', ' + data.turn_cooldown + ' turn cooldown';
      }
    }
  } else if (data.hasOwnProperty('cooldown')) {
  	/* cooldown and initial are used for T-Doll Skills. */
    result = data.cooldown[chosenLevelIdx] + 's cooldown';
    if (data.hasOwnProperty('initial')) {
      result += ', ' + data.initial + 's initial cooldown';
    }
  } else if (data.hasOwnProperty('activation')) {
  	/* Skills/Buffs activated with a certain chance are defined by 'activation' */
    result = data.activation[chosenLevelIdx] + '% chance to activate';
  }
  return result;
}
 
function display_data(skillDataContainer, data) {
  if (data == null) {
    console.log("called without data", data);
    return;
  }
  
  // Make sure skillcontainer is visible, as it is display:none by default
  skillDataContainer.find('.skillcontent').show();
  
  // Make sure Level Selector shows the fitting amount of levels
  var idx = 0;
  var skillLevels = 10;
  var levelSelector = skillDataContainer.find('.skilllevel select');
  
  if (data.hasOwnProperty('skilllevelcount')) {
  	try {
  	  skillLevels = parseInt(data.skilllevelcount, 10);
  	} catch (e) {
  	  console.log("Error parsing 'skilllevelcount'", e);
  	}
  }
  
  if (levelSelector.find('option').length != skillLevels) {
    levelSelector.empty();
    for (idx=0; idx<skillLevels; idx++) {
      var opt = $('<option></option>');
      opt.text('Lv. ' + (idx+1));
      opt.attr('value', idx);
      if (idx == skillLevels-1) opt.prop('selected', true);
      levelSelector.append(opt);
    }
  }
  
  // We have to remember skilldata for the levelSelector
  levelSelector.data('skilldata', data);
      
  var name = skillDataContainer.find('.skillname');
  name.text(data.name);
  
  var iconImg = skillDataContainer.find('.skillicon img');
  var iconId = data.icon || "";
  var iconFilename = "Icon_Skill_" + iconId + ".png";
  if (iconImg.attr('alt') != iconFilename) {
    iconImg.attr('alt', iconFilename);
    var wikiPath = "/images/" + gfUtils.createWikiPathPart(iconFilename) + iconFilename;
    var fallbackPath = "/images/thumb/5/5b/skill_backup.png/75px-skill_backup.png 1.5x, /images/5/5b/skill_backup.png 2x"
    iconImg.attr('src', wikiPath);
    if (iconId == '' || iconId == null) {
	  iconImg.attr('srcset', fallbackPath);
	} else {
	  // Check if icon actually exists as a file
	  var img = new Image();
	  img.src = wikiPath;
	  img.onload = function(){ iconImg.attr('srcset', wikiPath + " 1.5x"); }
	  img.onerror = function(){ iconImg.attr('srcset', fallbackPath); }
	}
  }

  var chosenLevelIdx = skillDataContainer.find('.skilllevel select').val();
  
  var formatted_text = calculateDescriptionText(data, chosenLevelIdx);
  var description = skillDataContainer.find('.skilldesc');
  description.html(formatted_text);
  
  var conditions = skillDataContainer.find('.skillconditions');
  if (data.hasOwnProperty('cost')) {
    conditions.addClass('cost');
  } else {
    conditions.removeClass('cost');
  }
  if (data.hasOwnProperty('cooldown')) {
    conditions.addClass('cooldown');
  } else {
    conditions.removeClass('cooldown');
  }
  
  var conditionText = calculateConditionText(data, chosenLevelIdx);
  conditions.text(conditionText);
}