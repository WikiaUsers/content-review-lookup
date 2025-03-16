importScript('MediaWiki:SkillSimulator-data.js');
var joblogId = "job-logo-";
$("div[id^=" + joblogId + "]").on('click', function(e){
	var id = $(this).attr('id');
	var jobNum = id.substr(joblogId.length, id.length - joblogId.length);
	var selectedJob = [];
	var isEnabled = true;
	if(jobNum > 0){
		for(var i = 0; i < jobNum; i++){
			var jobValue = $("#" + joblogId + i).attr('value');
			if(!isEnabled || jobValue == null || jobValue == "" || jobValue < 0){
				isEnabled = false;
				break;
			}else{
				selectedJob.push(jobValue);
			}
		}
	}
	if(isEnabled){
		var currentValue = $(this).attr('value');
		$("li", $(this).parent()).each(function(item, idex){
			if($(".job-separator-line", $(this)).length > 0){
				var isShow = selectedJob.length <= 0 || jobNum == 0;
				
				for(var i = 0; i < selectedJob.length; i++){
					if(!isShow){
						if($("." + selectedJob[i], $(this).next()).length){
							isShow = true;
						}else{
							isShow = false;
						}
					}
				}
				
				if(currentValue != null && currentValue != "" && $(".job-logo", $(this).next()).attr("id").indexOf(currentValue) >= 0){
					isShow = false;
				}
				
				if(!isShow){
					$(this).hide();
					$(this).next().hide();
				}else{
					$(this).show();
					$(this).next().show();
				}
			}
		});
			$(this).parent().find("ul").slideToggle(function() {
				if($('li:visible', $(this)).length <= 0){
					$(this).slideUp();
				}
    		});
		
	}
	
});

var jobPosId = "job";
$(".job-circle", $(".job-list")).on('click', function(e){
	var imgDiv = $(".job-logo", $(this));
	var id = $(imgDiv).attr('id');
	var idValues = id.split("-");
	if(idValues.length == 3 && idValues[0] == jobPosId){
		selectJob(idValues[1], idValues[2]);
	}
	
});

function selectJob(pos, value){
	$("#" + joblogId + pos).attr('value', value);
	removeImgClass($("#" + joblogId + pos));
	$("#" + joblogId + pos).addClass('img-' + value);
	removePopover($("#" + joblogId + pos));
	$("#" + joblogId + pos).append($("#popover-job-" + pos + "-" + value).clone());
	
	clearOtherJobPosValue(pos);
	
	GetJobSkillDataFromDb(pos, value).then(function(data){
		
		jobSkillData.forEach(function(skillData){
			
			var keys = Object.keys(jobSkillData[pos]);
			keys.forEach(function (key) {
    			var X = jobSkillData[pos][key]['位置']['X'];
    			var Y = jobSkillData[pos][key]['位置']['Y'];
    			
			});
		});
		
		GenSkillDataTree(pos, value);
	});
	
	
	$("#" + joblogId + pos).parent().find("ul").slideToggle(function() {
			
    });
	
}
function removeImgClass(item){
	var curClass = $(item).attr('class');
	var curClasss = curClass.split(" ");
	var editedClass = "";
	for(var i = 0; i < curClasss.length; i++){
		editedClass += (curClasss[i] == null || curClasss[i].trim() == "" || curClasss[i].indexOf("img-") >= 0  ? "" : " " + curClasss[i].trim());
	}
	//var regx = new RegExp('^img-[0-9A-z]*', 'g');
	//$(item).attr('class', $(item).attr('class').replace(regx, ''));
	$(item).attr('class', editedClass);
    return item;
}
function removePopover(item){
	$(item).find(".skill-popover").remove();
	return item;
}
function clearOtherJobPosValue(pos){
	$("div[id^=" + joblogId + "]").each(function(){
		var id = $(this).attr('id');
		var jobNum = id.substr(joblogId.length, id.length - joblogId.length);
		if(jobNum > pos){
			clearJobSelectedValue(jobNum);
		}
	});
	
}
var skillBoxDiv = "skillbox-job-";
function clearJobSelectedValue(pos){
	$("#" + joblogId + pos).attr('value', '');
	removeImgClass($("#" + joblogId + pos));
	removePopover($("#" + joblogId + pos));
	$("#" + joblogId + pos).parent().find("ul").slideUp();
	$("." + skillBoxDiv + pos).hide();
	$("." + skillBoxDiv + pos).empty();
	if(jobSkillData != null){
		jobSkillData[pos] = null;
	}
}
var maxSkillPoint = [0, 61, 15, 15];
function GenSkillDataTree(pos, jobValue){
	
	if(jobSkillData != null && jobSkillData[pos] != null && Object.entries(jobSkillData[pos]).length > 0){
		var cloneBox = $("#skill-box-temp").clone();
		setJobTitle(pos, jobValue, cloneBox);
		
		
		var MaxRow = 0;
		var MaxCol = 0;
		var keys = Object.keys(jobSkillData[pos]);
		keys.forEach(function (key) {
    			var X = jobSkillData[pos][key]['位置']['X'];
    			var Y = jobSkillData[pos][key]['位置']['Y'];
    			if (MaxRow < Y) {
        			MaxRow = Y;
    			}
    			if (MaxCol < X) {
        			MaxCol = X;
    			}
		});
		
		for(var i = 1; i <= MaxRow; i++){
			var cloneRow = $(".box-content", $("#skill-box-row-temp")).clone();
			$(cloneRow).attr("id", "skill-row-" + i);
			for(var j = 1; j <= MaxCol; j++){
				var cloneEmpty = $(".skill-container-empty", $("#skill-box-icon-empty-temp")).clone();
				$(cloneEmpty).attr("id", "skill-icon-" + i + "-" + j);
				cloneRow.append(cloneEmpty);
			}
			$(".skillTable", $(cloneBox)).append(cloneRow);
			$(".skillTable", $(cloneBox)).append('<div class="divider-vert-small"></div>');
			
		}
		var iconWidth = $(".icon-container, .skill-container", $("#skill-box-icon-value-temp")).css('width').replace('px', '') * 1;
		var boxSize = $(".box-side",  $("#skill-box-temp")).css('width').replace('px', '') * 1;
		var skillTablePadding = $(".skillTable",  $("#skill-box-temp")).css('padding').replace('px', '') * 1;
		var rowPadding = $(".box-content", $("#skill-box-row-temp")).css('padding-left').replace('px', '') * 1;
		var popoverWidth = $(".skill-popover", $(".icon-container, .skill-container", $("#skill-box-icon-value-temp"))).css('width').replace('px', '') * 1;
	
		keys.forEach(function (key) {
			var skillData = jobSkillData[pos][key];
    		var X = skillData['位置']['X'];
    		var Y = skillData['位置']['Y'];
    		
    		var cloneSkillIcon = $(".icon-container, .skill-container", $("#skill-box-icon-value-temp")).clone();
    		
    		$(cloneSkillIcon).on('mouseover', function(){
    			var simulatorWidth = $("#simulator").width();
				
    			if(simulatorWidth - ((simulatorWidth - (boxSize + skillTablePadding + rowPadding) * 2 - (iconWidth * MaxCol)) / (MaxCol + 1) + iconWidth) * X - popoverWidth < 0){
    				$(".skill-popover", $(this)).addClass("skill-popover-left");
    				$(".skill-popover", $(this)).css('left', iconWidth);
    			}else{
    				$(".skill-popover", $(this)).removeClass("skill-popover-left");
    				$(".skill-popover", $(this)).css('left', -1);
    			}
    		})
    		
    		
    		var skillName = key;
    		$(".popover-name", $(cloneSkillIcon)).html(skillName);
    		
    		var imgName = removeFileExt(skillData['圖片']);
    		$(".img, .icon", $(cloneSkillIcon)).addClass("img-" + imgName);
    		$(".img .popover-icon", $(cloneSkillIcon)).addClass("img-" + imgName);
    		
    		var skillType = skillData['類型'] != "被動" ? skillData['類型'] + "：" + skillData['屬性'] : skillData['類型'];
    		$(".popover-type", $(cloneSkillIcon)).html(skillType);
    		
    		var minLevel = skillData['最小等級'];
    		var maxLevel = skillData['最大等級'];
    		
    		var skillReq = skillData['學習條件'][minLevel]['技能'];
    		if(skillReq != null && skillReq.length > 2 && skillReq[0] == jobValue && skillReq[2] > 0){
    			var skillReqData = jobSkillData[pos][skillReq[1]];
    			var reqX = skillReqData['位置']['X'];
    			var reqY = skillReqData['位置']['Y'];
    			if(reqX == X){
    				$(".simulator-arrow-stop", cloneSkillIcon).show();
    			}
    			if(reqY < Y){
    				for(var i = reqY; i < Y; i++){
    					$(".simulator-arrow-continue", $("#skill-icon-" + i + "-" + X, cloneBox)).show();
    				}
    			}
    			
    		}
    		
    		
    		
    		$("#skill-icon-" + Y + "-" + X, cloneBox).replaceWith(cloneSkillIcon);
    		$(cloneSkillIcon).attr("id", "skill-icon-" + Y + "-" + X);
    		
		});
		
		setJobAvailable(pos, 0, cloneBox);
		
		$("." + skillBoxDiv + pos).empty();
		$("." + skillBoxDiv + pos).append(cloneBox.children());
		$("." + skillBoxDiv + pos).show();
	}else{
		$("." + skillBoxDiv + pos).empty();
		$("." + skillBoxDiv + pos).hide();
	}
}
function setJobTitle(pos, value, box){
	if(box == null){
		box = $("." + skillBoxDiv + pos);
	}
	$("#skill-box-title", box).html(value);
}
function setJobAvailable(pos, value, box){
	if(box == null){
		box = $("." + skillBoxDiv + pos);
	}
	var displayString = "(" + value + "/" + maxSkillPoint[pos] + ")";
	$("#skill-box-available", box).html(displayString);
}

function removeFileExt(filename){
	var n = filename.lastIndexOf(".");
	return n > -1 ? filename.substr(0, n) : str;
}