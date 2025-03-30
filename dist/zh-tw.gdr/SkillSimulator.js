importScript('MediaWiki:SkillSimulator-data.js');
var SimCal = new SkillSim();
mw.loader.using('mediawiki.util', function() {
  $(function() {
    setTimeout(function() {
      if (window.location.href.indexOf('?') !== -1) {
		// get skill data from url
        var url = window.location.href;
        var qIdx = url.indexOf('?')
        var qStr = url.substring(qIdx + 1);
        var params = qStr.split('&');
        var queryParams = {};
        for (var i = 0; i < params.length; i++) {
          var pair = params[i].split('=');
          queryParams[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        if (queryParams['jobs'] != null) {
          var poss64 = queryParams['jobs'];
          var poss = fromBase64(poss64);//data is encoded in base64 format

          if (queryParams['skills'] != null) {
            var learnedSkill64 = queryParams['skills'];
            var learnedSkill = fromBase64(learnedSkill64);
          }

          for (var pos in poss) {
            selectJob(pos, poss[pos], learnedSkill);
          }

        }
      }

      setTimeout(function() {
        $("#div-loading-gif").remove();//remove the anime that reduce resource
        $("#simulator").show();//after all data loaded show main function
      }, 500);
    }, 10);

  });
});

var joblogId = "job-logo-";
$("div[id^=" + joblogId + "]").on('click', function(e) {//control job list selection
  var id = $(this).attr('id');
  var jobNum = id.substr(joblogId.length, id.length - joblogId.length);
  var selectedJob = [];
  var isEnabled = true;// only enable when the prev job is selected
  if (jobNum > 0) {
    for (var i = 0; i < jobNum; i++) {
      var jobValue = $("#" + joblogId + i).attr('value');
      if (!isEnabled || jobValue == null || jobValue == "" || jobValue < 0) {
        isEnabled = false;
        break;
      } else {
        selectedJob.push(jobValue);
      }
    }
  }
  if (isEnabled) {
    var currentValue = $(this).attr('value');
    $("li", $(this).parent()).each(function(item, idex) {
      if ($(".job-separator-line", $(this)).length > 0) {
        var isShow = selectedJob.length <= 0 || jobNum == 0;

        for (var i = 0; i < selectedJob.length; i++) {
          if (!isShow) {
            if ($("." + selectedJob[i], $(this).next()).length) {
              isShow = true;
            } else {
              isShow = false;
            }
          }
        }

        if (currentValue != null && currentValue != "" && $(".job-logo", $(this).next()).attr("id").indexOf(currentValue) >= 0) {
          isShow = false;
        }

        if (!isShow) {//hidden the current selected value from list
          $(this).hide();
          $(this).next().hide();
        } else {
          $(this).show();
          $(this).next().show();
        }
      }
    });
    $(this).parent().find("ul").slideToggle(function() {
      if ($('li:visible', $(this)).length <= 0) {// auto close list when there are not having any choose
        $(this).slideUp();
      }
    });

  }

});

var jobPosId = "job";
$(".job-circle", $(".job-list")).on('click', function(e) {//control user selected job on job list
  var imgDiv = $(".job-logo", $(this));
  var id = $(imgDiv).attr('id');//id format "job-[job position]-[job name]"
  var idValues = id.split("-");
  if (idValues.length == 3 && idValues[0] == jobPosId) {
    selectJob(idValues[1], idValues[2]);
  }

});
$("#reset-button", $("#simulator")).on('click', function(e) {// regen all data when clicked reset
  jobSkillData.forEach(function(skillData, pos) {
    SimCal.addJob(pos, SimCal.getJobName(pos), skillData);
    GenSkillDataTree(pos, SimCal.getJobName(pos));
  });
  updateSummary(true);

});
$("#share-button", $("#simulator")).on('click', function(e) {//show shared url in share box when clicked share
  var url = getShareUrl();
  $("#share-url", $("#share-url-box")).html(url);
  $("#share-url-box").addClass("fade-in").show();

});
$("#copy-button", $("#share-url-box")).on('click', function(e) {// just copy the url which is showed in share box
  var url = $("#share-url", $("#share-url-box")).text();
  var textarea = document.createElement("textarea");
  textarea.value = url;
  document.body.appendChild(textarea);
  textarea.select();
  $(".copymsg", $("#share-url-box")).hide();
  try {
    document.execCommand("copy");
    $("#share-url-copyed", $("#share-url-box")).addClass("fade-in").show();
    setTimeout(function() {
      $("#share-url-copyed", $("#share-url-box")).removeClass("fade-in").hide();
    }, 3000);
  } catch (err) {
    $("#share-url-copyfail", $("#share-url-box")).show();
  }
  document.body.removeChild(textarea);
});
$("#close-button", $("#share-url-box")).on('click', function(e) {//hidden share box
  $("#share-url-box").removeClass("fade-in").hide();
});

function selectJob(pos, value, learnedSkill) {//select job
  $("#" + joblogId + pos).attr('value', value);
  removeImgClass($("#" + joblogId + pos));
  $("#" + joblogId + pos).addClass('img-' + value);
  removePopover($("#" + joblogId + pos));
  $("#" + joblogId + pos).append($("#popover-job-" + pos + "-" + value).clone());

  clearOtherJobPosValue(pos);//if selected an other job, remove the selected next job
  GetJobSkillDataFromDb(pos, value).then(function(data) {//get data from this wiki dataset
    SimCal.addJob(pos, value, jobSkillData[pos]);
    GenSkillDataTree(pos, value);
    if (learnedSkill != null) {//data from url
      SimCal.SetLearnedSkill(learnedSkill);
    }
    updateSummary(true);
  });

  //if(learnedSkill == null){
  //$("#" + joblogId + pos).parent().find("ul").slideToggle(function() {
  //$(this).slideUp();
  //});
  //}
  $("#" + joblogId + pos).parent().find("ul").slideUp();

}

function removeImgClass(item) {//remove img when unselected job
  var curClass = $(item).attr('class');
  var curClasss = curClass.split(" ");
  var editedClass = "";
  for (var i = 0; i < curClasss.length; i++) {
    editedClass += (curClasss[i] == null || curClasss[i].trim() == "" || curClasss[i].indexOf("img-") >= 0 ? "" : " " + curClasss[i].trim());
  }
  //var regx = new RegExp('^img-[0-9A-z]*', 'g');
  //$(item).attr('class', $(item).attr('class').replace(regx, ''));
  $(item).attr('class', editedClass);
  return item;
}

function removePopover(item) {//remove popover when unseleccted
  $(item).find(".skill-popover").remove();
  return item;
}

function clearOtherJobPosValue(pos) {//remove the selected next job value
  $("div[id^=" + joblogId + "]").each(function() {
    var id = $(this).attr('id');
    var jobNum = id.substr(joblogId.length, id.length - joblogId.length);
    if (jobNum > pos) {
      clearJobSelectedValue(jobNum);
    }
  });

}
var skillBoxDiv = "skillbox-job-";

function clearJobSelectedValue(pos) {//unslected job
  $("#" + joblogId + pos).attr('value', '');
  removeImgClass($("#" + joblogId + pos));
  removePopover($("#" + joblogId + pos));
  $("#" + joblogId + pos).parent().find("ul").slideUp();
  $("." + skillBoxDiv + pos).hide();
  $("." + skillBoxDiv + pos).empty();
  if (jobSkillData != null) {
    jobSkillData[pos] = null;
    SimCal.removeJob(SimCal.getJobName(pos));
  }
}

function GenSkillDataTree(pos, jobValue) {//gen skill table

  if (jobSkillData != null && jobSkillData[pos] != null && Object.entries(jobSkillData[pos]).length > 0) {//jobSkilldata is stored when select job
    var cloneBox = $("#skill-box-temp").clone();//get skill box format template
    setJobTitle(pos, jobValue, cloneBox);

    var MaxRow = 0;
    var MaxCol = 0;
    var keys = Object.keys(jobSkillData[pos]);
    keys.forEach(function(key) {//for gen table size
      var X = jobSkillData[pos][key]['位置']['X'];
      var Y = jobSkillData[pos][key]['位置']['Y'];
      if (MaxRow < Y) {
        MaxRow = Y;
      }
      if (MaxCol < X) {
        MaxCol = X;
      }
    });

    for (var i = 1; i <= MaxRow; i++) {
      var cloneRow = $(".box-content", $("#skill-box-row-temp")).clone();
      $(cloneRow).attr("id", "skill-row-" + i);//gen empty skill table frist, will replace with skill data when that position has value
      for (var j = 1; j <= MaxCol; j++) {
        var cloneEmpty = $(".skill-container-empty", $("#skill-box-icon-empty-temp")).clone();
        $(cloneEmpty).attr("id", "skill-icon-" + i + "-" + j);
        cloneRow.append(cloneEmpty);
      }
      $(".skillTable", $(cloneBox)).append(cloneRow);
      $(".skillTable", $(cloneBox)).append('<div class="divider-vert-small"></div>');

    }
    //getting all size value from css for cal popover will or not have enought szie to show
    var iconWidth = $(".icon-container, .skill-container", $("#skill-box-icon-value-temp")).css('width').replace('px', '') * 1;
    var boxSize = $(".box-side", $("#skill-box-temp")).css('width').replace('px', '') * 1;
    var skillTablePadding = $(".skillTable", $("#skill-box-temp")).css('padding').replace('px', '') * 1;
    var rowPadding = $(".box-content", $("#skill-box-row-temp")).css('padding-left').replace('px', '') * 1;
    var popoverWidth = $(".skill-popover", $(".icon-container, .skill-container", $("#skill-box-icon-value-temp"))).css('width').replace('px', '') * 1;

    keys.forEach(function(key) {
      var skillData = jobSkillData[pos][key];
      var X = skillData['位置']['X'];
      var Y = skillData['位置']['Y'];

      var cloneSkillIcon = $(".icon-container, .skill-container", $("#skill-box-icon-value-temp")).clone();

      $(cloneSkillIcon).on('mouseover', function() {
        var simulatorWidth = $("#simulator").width();

        if (simulatorWidth - ((simulatorWidth - (boxSize + skillTablePadding + rowPadding) * 2 - (iconWidth * MaxCol)) / (MaxCol + 1) + iconWidth) * X - popoverWidth < 0) {//if not enought show on left
          $(".skill-popover", $(this)).addClass("skill-popover-left");
          $(".skill-popover", $(this)).css('left', iconWidth);
        } else {//if enought show on right
          $(".skill-popover", $(this)).removeClass("skill-popover-left");
          $(".skill-popover", $(this)).css('left', -1);
        }
      })

      var skillName = key;
      $(".popover-name", $(cloneSkillIcon)).html(skillName);

      var imgName = removeFileExt(skillData['圖片']);//get image name from dataset
      $(".img.icon", $(cloneSkillIcon)).addClass("img-" + imgName);//set image with class which is stored in SkillSimulator-image.css
      $(".img.popover-icon", $(cloneSkillIcon)).addClass("img-" + imgName);

      var skillType = skillData['類型'] != "被動" ? skillData['類型'] + "：" + skillData['屬性'] : skillData['類型'];
      $(".popover-type", $(cloneSkillIcon)).html(skillType);//show the skill type
	 //show skill element type
      $(".img.popover-element", $(cloneSkillIcon)).addClass((skillData['類型'] != "被動" ? skillData['屬性'] : skillData['類型']));
      if (skillType == "被動") {//hidden element type when it is a passive skill
        $(".img.popover-element", $(cloneSkillIcon)).hide();
      }

      var minLevel = skillData['最小等級'];
      var maxLevel = skillData['最大等級'];

      var skillReq = skillData['學習條件'][minLevel]['技能'];//find the require skill
      if (skillReq != null && skillReq.length > 2 && skillReq[0] == jobValue && skillReq[2] > 0) {
        var skillReqData = jobSkillData[pos][skillReq[1]];
        var reqX = skillReqData['位置']['X'];
        var reqY = skillReqData['位置']['Y'];
        if (reqX == X) {//if the require skill position is above current skill show the arrow
          $(".simulator-arrow-stop", cloneSkillIcon).show();
        }
        if (reqY < Y) {
          for (var i = reqY; i < Y; i++) {//extend the arrow until the requie skill position
            $(".simulator-arrow-continue", $("#skill-icon-" + i + "-" + X, cloneBox)).show();
          }
        }

      }

      $("#skill-icon-" + Y + "-" + X, cloneBox).replaceWith(cloneSkillIcon);//replace the empty box
      $(cloneSkillIcon).attr("id", "skill-icon-" + Y + "-" + X);

      $(cloneSkillIcon).on('mousedown', function(e) {//select skill event
        e.preventDefault();
        var modify = 0;
        if (event.which === 1) {//left click selected
          modify = 1;
        } else if (event.which === 3) {//right click unselect
          modify = -1;
        }
        modifySkillLevel(this, jobValue, skillName, modify);

      });
      $(cloneSkillIcon).on('updateIcon', function(e) {
        e.preventDefault();
        updateSkillIcon(this, jobValue, skillName);//for update icon color which will black when level not enought, have dark color when level enought but not selected
      });
      $(cloneSkillIcon).on('contextmenu', function(e) {//prevent right click contextmenu
        e.preventDefault();

      });
      modifySkillLevel($(cloneSkillIcon), jobValue, skillName, 0);//trigger skill update

    });

    setJobAvailable(pos, 0, cloneBox);

    $("." + skillBoxDiv + pos).empty();
    $("." + skillBoxDiv + pos).append(cloneBox.children());
    $("." + skillBoxDiv + pos).show();

  } else {
    $("." + skillBoxDiv + pos).empty();
    $("." + skillBoxDiv + pos).hide();
  }
}

function setJobTitle(pos, value, box) {
  if (box == null) {
    box = $("." + skillBoxDiv + pos);
  }
  $("#skill-box-title", box).html(value);
}

function setJobAvailable(pos, usedPoint, box) {
  if (box == null) {
    box = $("." + skillBoxDiv + pos);// show point used in table
  }
//box id format skillbox-[job position]-[max Skill point]
  var maxSkillPoint = $(box).attr('id').substr((skillBoxDiv + pos + "-").length);//if used point is over show red color
  var displayString = "(" + ((maxSkillPoint - usedPoint < 0) ? '<font color="red">' + usedPoint + '</font>' : usedPoint) + "/" + maxSkillPoint + ")";

  $("#skill-box-available", box).html(displayString);

}

function updateSkillIcon(skillIcon, jobName, skillName) {
  if (SimCal != null) {
    var reqLevel = SimCal.tables[jobName].Skills[skillName].getNextReqLevel();
    var curSkillLevel = SimCal.tables[jobName].Skills[skillName].level;
    $(".pill-count", $(skillIcon)).html(curSkillLevel);

    //find whcih skill is required this skill
    for (var job in SimCal.tables) {
      if (SimCal.tables.hasOwnProperty(job)) {
        var table = SimCal.tables[job];
        for (var key in table.Skills) {
          var skill = table.Skills[key];
          for (var i = 0; i < skill.level; i++) {
            var reqSkill = skill.getReqSkill(i);
            if (reqSkill != null && reqSkill.length == 3) {
              var reqJob = reqSkill[0];
              var reqJobPos = SimCal.getPos(reqJob);
              if (reqJobPos >= 0) {
                var reqJobSkill = reqSkill[1];
                var reqJobSkillLevel = reqSkill[2];
                var sameSkill = reqJob == jobName && reqJobSkill == skillName;
                if (sameSkill && reqJobSkillLevel > curSkillLevel) {

                  var reqX = skill.X;
                  var reqY = skill.Y;

                  skill.level = 0;
                  modifySkillLevel($("#skill-icon-" + reqY + "-" + reqX, $(".skillbox-job-" + SimCal.getPos(job))), job, key, 0);
                }
              }
            }
          }
        }
      }
    }
    modifySkillLevel($(skillIcon), jobName, skillName, 0);
  }
}

function modifySkillLevel(skillIcon, jobName, skillName, modify) {
  if (SimCal != null) {
    var reqLevel = SimCal.tables[jobName].Skills[skillName].getNextReqLevel();
    var reqSkill = SimCal.tables[jobName].Skills[skillName].getNextReqSkill();
    var modifyLevel = SimCal.tables[jobName].Skills[skillName].changeLevel(modify);
    $(".popover-skill-curr", $(skillIcon)).html(SimCal.tables[jobName].Skills[skillName].getCurInfo());

    $(".popover-skill-next", $(skillIcon)).html(SimCal.tables[jobName].Skills[skillName].getNextInfo());

    var fee = SimCal.tables[jobName].Skills[skillName].getFee();
    var bronze = fee % 100;
    var silver = (fee - bronze) / 100 % 100;
    var gold = (fee - silver * 100 - bronze) / 100 / 100;

    $(".req-level", $(skillIcon)).html(SimCal.tables[jobName].Skills[skillName].getNextReqLevel());

    $(".gold", $(skillIcon)).html(gold);
    $(".silver", $(skillIcon)).html(silver);
    $(".bronze", $(skillIcon)).html(bronze);

    var curSkillLevel = SimCal.tables[jobName].Skills[skillName].level;
    $(".pill-count", $(skillIcon)).html(curSkillLevel);
    if (curSkillLevel > 0) {
      $(".img.icon", $(skillIcon)).removeClass("skill-low-level");
      $(".img.icon", $(skillIcon)).removeClass("skill-not-learned");
      $(".pill-count", $(skillIcon)).removeClass("pill-invisible");

      if (reqSkill != null && reqSkill.length == 3) {
        var reqJob = reqSkill[0];
        var reqJobPos = SimCal.getPos(reqJob);
        if (reqJobPos >= 0) {

          var reqJobSkill = reqSkill[1];
          var reqJobSkillLevel = reqSkill[2];
          var reqX = SimCal.tables[reqJob].Skills[reqJobSkill].X;
          var reqY = SimCal.tables[reqJob].Skills[reqJobSkill].Y;

          var reqSkillCurLevel = SimCal.tables[reqJob].Skills[reqJobSkill].level;
          if (reqSkillCurLevel < reqJobSkillLevel) {
            modifySkillLevel($("#skill-icon-" + reqY + "-" + reqX, $(".skillbox-job-" + reqJobPos)), reqJob, reqJobSkill, (reqJobSkillLevel - reqSkillCurLevel));
          }
        }
      }

    } else if (curSkillLevel == 0) {
      $(".img.icon", $(skillIcon)).addClass("skill-not-learned");
      $(".pill-count", $(skillIcon)).addClass("pill-invisible");
    }
    if (modify != 0) {
      updateSummary(modify != 0);
    }
    if (SimCal.level < SimCal.tables[jobName].Skills[skillName].getReqLevel(curSkillLevel - 1)) {
      $(".img.icon", $(skillIcon)).addClass("skill-low-level");
      $(".pill-count", $(skillIcon)).addClass("pill-invisible");
    } else {
      $(".img.icon", $(skillIcon)).removeClass("skill-low-level");
    }
  }
}

function updateSummary(updateIcon) {
  //display level on top
  $("#summary-level", $("#simulator")).html(SimCal.CalLevel());
  $("#summary-skill-points", $("#simulator")).html(SimCal.GetAvailablePoint());
  var fee = SimCal.getFee();
  var bronze = fee % 100;
  var silver = (fee - bronze) / 100 % 100;
  var gold = (fee - silver * 100 - bronze) / 100 / 100;

  $(".gold", $(".simulator-summary")).html(gold);
  $(".silver", $(".simulator-summary")).html(silver);
  $(".bronze", $(".simulator-summary")).html(bronze);

  if (updateIcon) {
    //update all skill icon color
    $(".icon-container.skill-container", $("#simulator")).trigger('updateIcon');
  }

  updateSkillDec();
  updateSkillPoint();
}

function updateSkillPoint() {
  for (var job in SimCal.tables) {
    if (SimCal.tables.hasOwnProperty(job)) {
      var table = SimCal.tables[job];
      var usedPoint = table.points;
      var pos = SimCal.getPos(job);
      setJobAvailable(pos, usedPoint);
    }
  }
}

function updateSkillDec() {//for listing information that skill is selected

  var skillBox = $("#skill-dec-box");
  var tabButtonList = $(".tab-button-list", skillBox);
  var tabContentsList = $(".tab-contents-list", skillBox);

  var learnedSkill = SimCal.GetLearnedSkill();
  for (var job in learnedSkill) {
    if (SimCal.tables.hasOwnProperty(job)) {
      var cloneTabButton;
      var hasTabButton = false;
      if ($("#tab-button-" + job, tabButtonList).length > 0) {
        cloneTabButton = $("#tab-button-" + job, tabButtonList);
        hasTabButton = true;

      } else {
        cloneTabButton = $("#tab-button-temp").clone();
        $(".tab-button", cloneTabButton).attr('id', "tab-button-" + job);

        $(".tab-icon", cloneTabButton).addClass('img-' + job);
        $(".tab-title", cloneTabButton).html(job);
      }
      var cloneTabContents;//if tab button is not exist, clone and add new one
      var hasTabContents = false;
      if ($("#tab-contents-" + job, tabContentsList).length > 0) {
        cloneTabContents = $("#tab-contents-" + job, tabContentsList);
        hasTabContents = true;
      } else {
        cloneTabContents = $("#tab-contents-temp").clone();
        $(".tab-contents", cloneTabContents).attr('id', "tab-contents-" + job);
      }

      var table = SimCal.tables[job];
      var learnedTable = learnedSkill[job];
      for (var skillName in learnedTable) {
        if (table.Skills.hasOwnProperty(skillName)) {
          var skill = table.Skills[skillName];
          var learedLevel = learnedTable[skillName];
          var cloneTabSkill;
          var hasTabSkill = false;
          if ($("#tab-content-" + skillName, cloneTabContents).length > 0) {//skill is existed in info list, update, if not, clone new and add it
            cloneTabSkill = $("#tab-content-" + skillName, cloneTabContents);
            hasTabSkill = true;
          } else {
            cloneTabSkill = $("#tab-content-temp").clone();
            $(".tab-content", $(cloneTabSkill)).attr("id", "tab-content-" + skillName);
            var imgName = removeFileExt(skill.data['圖片']);
            $(".img.icon", $(cloneTabSkill)).addClass("img-" + imgName);
            $(".tab-skill-title", $(cloneTabSkill)).html(skillName);

            var skillType = skill.data['類型'] != "被動" ? skill.data['類型'] + "：" + skill.data['屬性'] : skill.data['類型'];

            $(".tab-skill-type-icon", $(cloneTabSkill)).addClass((skill.data['類型'] != "被動" ? skill.data['屬性'] : skill.data['類型']));

            if (skillType == "被動") {
              $(".tab-skill-type-icon", $(cloneTabSkill)).hide();
            }
            $(".tab-skill-type-info", $(cloneTabSkill)).html(skillType);
          }

          $(".tab-skill-level", $(cloneTabSkill)).html('Lv.' + learedLevel);
          $(".tab-skill-detail", $(cloneTabSkill)).html(skill.getCurInfo());

          var cds = skill.GetCurrCds();
          if (cds != null && cds > 0) {
            $(".tab-skill-cd", $(cloneTabSkill)).show();
            $(".tab-skill-cd-sec", $(cloneTabSkill)).html(cds + "s");
          } else {
            $(".tab-skill-cd", $(cloneTabSkill)).hide();
          }

          if (!hasTabSkill) {
            if (hasTabContents) {
              $(cloneTabContents).append(cloneTabSkill.children());
            } else {
              $(".tab-contents", $(cloneTabContents)).append(cloneTabSkill.children());
            }
          }

        }
      }
      if (!hasTabButton) {
        $(".tab-button", cloneTabButton).on('click', function() {
          showSkillTab(this);
        });
        $(".tab-button-list", $("#skill-dec-box")).append(cloneTabButton.children());
      }
      if (!hasTabContents) {
        tabContentsList.append(cloneTabContents.children());
      }
    }
  }
  var tabButtonIdPrefix = "tab-button-";
  var tabContentsIdPrefix = "tab-contents-"
  var tabContentSkillIdPrefix = "tab-content-";
  $(".tab-button", tabButtonList).each(function() {//after adding skill info, remove unselect skill from info
    var jobName = $(this).attr('id').substr((tabButtonIdPrefix).length);
    if (!learnedSkill.hasOwnProperty(jobName)) {
      if ($(this).next().hasClass("job-separator-vert")) {
        $(this).next().remove();
      }
      $(this).remove();
      $("#" + tabContentsIdPrefix + jobName, tabContentsList).remove();
    } else {
      var contents = $("#" + tabContentsIdPrefix + jobName, tabContentsList);
      $(".tab-content", contents).each(function() {
        var skillName = $(this).attr('id').substr((tabContentSkillIdPrefix).length);
        if (!learnedSkill[jobName].hasOwnProperty(skillName)) {
          $(this).remove();
        }
      });

    }
  });

  //reording
  for (var pos in SimCal.poss) {
    var jname = SimCal.poss[pos];
    var tabButtonId = tabButtonIdPrefix + jname;
    $(tabButtonList).append($("#" + tabButtonId, tabButtonList));
    var skills = learnedSkill[jname];
    for (var sname in skills) {
      var skillId = tabContentSkillIdPrefix + sname;
      $("#" + tabContentsIdPrefix + jname, tabContentsList).append($("#" + skillId));
    }
  }

  var showingTab = null;
  if ($(".tab-button.active", tabButtonList).length > 0) {
    showingTab = $(".tab-button.active", tabButtonList);
  }

  var empty = $("#tab-content-nodata", tabButtonList);
  empty.hide();
  if ($(".tab-button", tabButtonList).length <= 0) {//show empty message when there are not having any skill info
    empty.show();
    $(".job-separator-vert", tabButtonList).remove();
  } else if (showingTab != null) {
    showSkillTab(showingTab);
  } else {
    showSkillTab($(".tab-button", tabButtonList)[0]);
  }
}

function showSkillTab(that) {
  var jobName = $(".tab-title", $(that)).text();
  $(".tab-contents", $("#skill-dec-box")).removeClass('active');
  $(".tab-button", $("#skill-dec-box")).removeClass('active');

  $("#tab-button-" + jobName, $(".tab-button-list", $("#skill-dec-box"))).addClass('active');
  $("#tab-contents-" + jobName, $(".tab-contents-list", $("#skill-dec-box"))).addClass('active');
}

function removeFileExt(filename) {
  var n = filename.lastIndexOf(".");
  return n > -1 ? filename.substr(0, n) : str;
}

function getShareUrl() {//get selected skill and return as base64 format
  var returnUrl = window.location.href.split('?')[0];
  if (SimCal != null) {
    var poss = SimCal.GetSelectedJob();
    var learnedSkill = SimCal.GetLearnedSkill();
    var poss64 = toBase64(poss);
    var learnedSkill64 = toBase64(learnedSkill);
    returnUrl = window.location.href.split('?')[0] + "?jobs=" + poss64 + "&skills=" + learnedSkill64;
  }
  return returnUrl;
}

function toBase64(obj) {
  var json = JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(json)));
}

function fromBase64(base64) {
  var json = decodeURIComponent(escape(atob(base64)));
  return JSON.parse(json);
}

// SkillSim Constructor Function
function SkillSim() {
  this.level = 1;
  this.points = 0;
  this.fee = 0;
  this.tables = [];
  this.poss = [];
}

SkillSim.prototype.addJob = function(pos, jobName, jobSkillData) {
  var currPossJob = this.getJobName(pos);
  if (currPossJob != jobName) {
    this.removeJob(currPossJob);
  }
  this.tables[jobName] = new SkillTable(jobSkillData);
  this.poss[pos] = jobName;
};

SkillSim.prototype.removeJob = function(jobName) {
  delete this.tables[jobName];
  for (var key in this.poss) {
    if (this.poss.hasOwnProperty(key)) {
      if (this.poss[key] == jobName) {
        this.poss[key] = null;
      }
    }
  }
};

SkillSim.prototype.getJobName = function(pos) {
  if (this.poss.hasOwnProperty(pos)) {
    return this.poss[pos];
  }
  return null;
};

SkillSim.prototype.getPos = function(jobName) {
  for (var key in this.poss) {
    if (this.poss.hasOwnProperty(key)) {
      if (this.poss[key] == jobName) {
        return key;
      }
    }
  }
  return -1;
};

SkillSim.prototype.getFee = function() {
  var totalFee = 0;
  for (var key in this.tables) {
    if (this.tables.hasOwnProperty(key)) {
      totalFee += this.tables[key].getFee();
    }
  }
  return totalFee;
};

SkillSim.prototype.CalLevel = function() {
  var levelFromSkill = 1;
  for (var job in this.tables) {
    if (this.tables.hasOwnProperty(job)) {
      var table = this.tables[job];
      for (var key in table.Skills) {
        if (table.Skills.hasOwnProperty(key)) {
          var skill = table.Skills[key];
          var skillLevel = skill.level;
          for (var i = 0; i < skillLevel; i++) {
            var reqLevel = skill.getReqLevel(i);
            if (reqLevel != null && reqLevel > 0) {
              levelFromSkill = Math.max(reqLevel, levelFromSkill);
            }
          }
        }
      }
    }
  }
  this.CalPoints();
  var levelFromTotal = (this.points > 2 ? 1 : 0) +
    Math.min(48, Math.max(0, this.points - 2)) +
    Math.min(10, Math.max(0, Math.round((this.points - 50) / 2))) +
    Math.max(0, this.points - 70);

  this.level = Math.max(levelFromTotal, levelFromSkill);

  return this.level;
};

SkillSim.prototype.GetAvailablePoint = function() {
  var levelSkillPoints = 2 + Math.max(0, Math.min(this.level, 50) - 1) + (Math.max(0, Math.min(this.level, 60) - 50)) * 2 + Math.max(0, this.level - 60);
  return levelSkillPoints - this.points;
};

SkillSim.prototype.CalPoints = function() {
  var usedP = 0;
  for (var job in this.tables) {
    if (this.tables.hasOwnProperty(job)) {
      usedP += this.tables[job].CalPoints();
    }
  }
  this.points = usedP;
  return this.points;
};

SkillSim.prototype.GetSelectedJob = function() {
  var reurnValue = {};
  for (var pos in this.poss) {
    reurnValue[pos] = this.poss[pos];
  }
  return reurnValue;
}

SkillSim.prototype.GetLearnedSkill = function() {
  var returnValue = {};
  for (var job in this.tables) {
    if (this.tables.hasOwnProperty(job)) {
      var table = this.tables[job];
      var returnSkills = {};
      for (var skillname in table.Skills) {
        if (table.Skills.hasOwnProperty(skillname)) {
          var skill = table.Skills[skillname];
          if (skill.level > 0) {
            returnSkills[skillname] = skill.level;
          }
        }
      }
      if (Object.keys(returnSkills).length > 0) {
        returnValue[job] = returnSkills;
      }
    }
  }
  return returnValue;
}

SkillSim.prototype.SetLearnedSkill = function(learnedSkill) {
  for (var job in learnedSkill) {
    if (this.tables.hasOwnProperty(job)) {
      var table = this.tables[job];
      var learnedTable = learnedSkill[job];
      for (var skillName in learnedTable) {
        if (table.Skills.hasOwnProperty(skillName)) {
          var skill = table.Skills[skillName];
          var learedLevel = learnedTable[skillName];
          skill.level = learedLevel;
        }
      }
    }
  }
}

// SkillTable Constructor Function
function SkillTable(jobSkillData) {
  this.SkillData = jobSkillData;
  this.Skills = [];
  this.maxRow = 0;
  this.maxCol = 0;
  for (var key in this.SkillData) {
    if (this.SkillData.hasOwnProperty(key)) {
      var skill = new Skill(this.SkillData[key]);
      this.Skills[key] = skill;

      if (this.maxRow < skill.Y) {
        this.maxRow = skill.Y;
      }
      if (this.maxCol < skill.X) {
        this.maxCol = skill.X;
      }
    }
  }
  this.points = 0;
}

SkillTable.prototype.CalPoints = function() {
  var usedP = 0;
  for (var key in this.Skills) {
    if (this.Skills.hasOwnProperty(key)) {
      var level = this.Skills[key].level;
      for (var i = 0; i < level; i++) {
        var reqLevel = this.Skills[key].getReqLevel(i);
        if (reqLevel != null && reqLevel > 0) {
          usedP++;
        }
      }
    }
  }
  this.points = usedP;
  return this.points;
};

SkillTable.prototype.getFee = function() {
  var totalFee = 0;
  for (var key in this.Skills) {
    if (this.Skills.hasOwnProperty(key)) {
      totalFee += this.Skills[key].getTotalFee();
    }
  }
  return totalFee;
};

// Skill Constructor Function
function Skill(skillData) {
  this.data = skillData;
  this.minLevel = this.data['最小等級'];
  this.maxLevel = this.data['最大等級'];
  this.level = this.minLevel;
  this.X = this.data['位置']['X'];
  this.Y = this.data['位置']['Y'];
}

Skill.prototype.GetCurrCds = function() {
  var idx = -1;
  var length = this.data['冷卻時間'].length;
  if (length > 0) {
    if (length < this.level || this.maxLevel <= this.level) {
      idx = length - 1;
    } else if (this.level > 0) {
      idx = this.level - 1;
    }
    if (idx >= 0) {
      return this.data['冷卻時間'][idx];
    }
  }
  return null;
};

Skill.prototype.getCurInfo = function() {
  var idx = -1;
  var length = this.data['說明'].length;
  if (length > 0) {
    if (length < this.level || this.maxLevel <= this.level) {
      idx = length - 1;
    } else if (this.level > 0) {
      idx = this.level - 1;
    }
    if (idx >= 0) {
      return this.data['說明'][idx];
    }
  }
  return null;
};

Skill.prototype.getNextInfo = function() {
  var idx = -1;
  var length = this.data['說明'].length;
  if (length > 0) {
    if (this.level < this.maxLevel && this.level > 0) {
      idx = this.level;
    } else if (this.level <= 0 || this.level < this.minLevel) {
      idx = this.minLevel + 1;
    }
    if (length <= idx) {
      idx = length - 1;
    }
    if (idx >= 0) {
      return this.data['說明'][idx];
    }
  }
  return null;
};

Skill.prototype.getFee = function() {
  var idx = -1;
  var length = this.data['升級花費'].length;
  if (length > 0) {
    if (this.level < this.maxLevel && this.level > 0) {
      idx = this.level;
    } else if (this.level <= 0 || this.level < this.minLevel) {
      idx = this.minLevel;
    }
    if (length <= idx) {
      idx = length - 1;
    }
    if (idx >= 0) {
      return this.data['升級花費'][idx];
    }
  }
  return 0;
};

Skill.prototype.getTotalFee = function() {
  var total = 0;
  var length = this.data['升級花費'].length;
  for (var idx = 0; idx < this.level; idx++) {
    total += this.data['升級花費'][(idx < length ? idx : length - 1)];
  }
  return total;
};

Skill.prototype.changeLevel = function(modify) {
  var editedLevel = this.level + modify;
  if (editedLevel < this.minLevel) {
    editedLevel = this.minLevel;
  } else if (editedLevel > this.maxLevel) {
    editedLevel = this.maxLevel;
  }
  var returnModify = editedLevel - this.level;
  this.level = editedLevel;
  return returnModify;
};

Skill.prototype.getNextReqLevel = function() {
  var idx = -1;
  var length = this.data['學習條件'].length;
  if (length > 0) {
    if (this.level < this.maxLevel && this.level > 0) {
      idx = this.level;
    } else if (this.level <= 0 || this.level < this.minLevel) {
      idx = this.minLevel;
    }
    if (length <= idx) {
      idx = length - 1;
    }
    if (idx >= 0) {
      return this.data['學習條件'][idx]['等級'];
    }
  }
  return null;
};

Skill.prototype.getReqLevel = function(level) {
  var idx = -1;
  var length = this.data['學習條件'].length;
  if (length > 0) {
    if (level < this.maxLevel && level > 0) {
      idx = level;
    } else if (level <= 0 || level < this.minLevel) {
      idx = 0;
    }
    if (length <= idx) {
      idx = length - 1;
    }
    if (idx >= 0) {
      return this.data['學習條件'][idx]['等級'];
    }
  }
  return null;
};

Skill.prototype.getNextReqSkill = function() {
  var idx = -1;
  var length = this.data['學習條件'].length;
  if (length > 0) {
    if (this.level < this.maxLevel && this.level > 0) {
      idx = this.level;
    } else if (this.level <= 0 || this.level < this.minLevel) {
      idx = this.minLevel;
    }
    if (length <= idx) {
      idx = length - 1;
    }
    if (idx >= 0) {
      return this.data['學習條件'][idx]['技能'];
    }
  }
  return null;
};

Skill.prototype.getReqSkill = function(level) {
  var idx = -1;
  var length = this.data['學習條件'].length;
  if (length > 0) {
    if (level < this.maxLevel && level > 0) {
      idx = level;
    } else if (level <= 0 || level < this.minLevel) {
      idx = 0;
    }
    if (length <= idx) {
      idx = length - 1;
    }
    if (idx >= 0) {
      return this.data['學習條件'][idx]['技能'];
    }
  }
  return null;
};