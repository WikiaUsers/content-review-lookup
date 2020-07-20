/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */

Array.prototype.contains = function ( needle ) {
   for (i in this) {
	   if (this[i] == needle) return true;
   }
   return false;
}

Array.prototype.includes = function( needle ){
	for (i in this) {
		if (this[i].toString().includes(needle)) return true;
	}
	return false;
}
			
Array.prototype.includesIndexOf = function( needle ){
	for (i in this) {
		if (this[i].toString().includes(needle)) return i;
	}
	return -1;
}
			
String.prototype.clean = function(){
	return this.replace("↵", "").trim();
}
			
WikiaJS = {
	CharacterTooltip:{
		Id: "WikiaJS_Tooltip",
		BackgroundImageUrl: "",
		CharacterInfo: {
			StatusChartInfo: {
				Inteligence: 0,
				CombatProficiency: 0,
				Charisma: 0,
				Loyalty: 0
			},
			Title: "",
			GeneralInfo: {
				Gender: "",
				Status: "",
				Affiliation: "",
				KnightmareFrame: ""
			},
			Description: "",
			AbilitiesInfo: {
				ArrayOfImagesUrl: []
			}
		},
		Init: function(){
			var _div = $("<div id='" + this.Id + "' class='WikiaJS_Tooltip'></div>");
			var _divWrapper = $("<div id='" + this.Id + "_Wrapper" + "' class='WikiaJS_Tooltip_Wrapper'></div>");
			var _divCharacterInfo = $("<div id='" + this.Id + "_characterinfo" + "' class='WikiaJS_Tooltip_CharacterInfo'></div>");
			var _divCharacterInfoTitle = $("<div id='" + this.Id + "_characterinfo_title" + "' class='WikiaJS_Tooltip_CharacterInfo_Title'></div>");
			var _divCharacterInfoDescription = $("<div id='" + this.Id + "_characterinfo_description" + "' class='WikiaJS_Tooltip_CharacterInfo_Description'></div>");						
			
			_divCharacterInfo.append(_divCharacterInfoTitle);
			_divCharacterInfo.append(_divCharacterInfoDescription);
			_divWrapper.append(_divCharacterInfo);						
			
			_div.append(_divWrapper);
			
			$(window.document.body).append(_div);
		},
		Show: function(e, top, left){						
			$("#" + this.Id).css("display", "block");
			$("#" + this.Id).css("top", top + 20);
			$("#" + this.Id).css("left", left + 20);
		},
		Hide: function(){
			$("#" + this.Id).css("display", "none");
		},
		Positionate: function(e, el){
			var evt = e || window.event;
			
			var topEl = e.pageY - ($(el).height() / 2) - 20;
			var leftEl = 0;
			
			if(e.pageX >= ($(window).width() / 2))
				leftEl = (e.pageX - 30) - $("#" + this.Id).width();													
			else
				leftEl = e.pageX + 30;														
						
			// IE 8
			if (topEl === undefined) {
				leftEl = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				topEl = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			
			return { Y: topEl, X: leftEl };
		}
	}    
}		

$(window).load(function() {				
	WikiaJS.CharacterTooltip.Init();
	
	$(".NavButtonInfo").each(function(){
		$(this).on("mouseover", function(e){
			if($("#CharacterInfoToolTip").length > 0){
				var arrayStr = $("#CharacterInfoToolTip").html();							
				var array = arrayStr.split("#CharacterSplit");
				
				var selfLink = $(this).find(".NavInfoInfo").find(".selflink");
				
				var characterName = "";
				
				if(selfLink.length > 0)
					characterName = selfLink.html();
				else{
					var link = $(this).find(".NavInfoInfo").find("a");
					characterName = link.html();
				}	
					
				characterName = characterName.replace("...", "");
				
				var index = array.includesIndexOf(characterName);
				
				if(index >= 0){
					var characterInfo = array[parseInt(index)+1];
					
					var arrayAttributes = characterInfo.split("#AttributeSplit");
					
					for(var i = 0; i < arrayAttributes.length; i++){
						if(arrayAttributes[i].toString().includes("BackgroundImageUrl"))
							WikiaJS.CharacterTooltip.BackgroundImageUrl = arrayAttributes[i].toString().replace("BackgroundImageUrl:","").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_StatusChartInfo_Inteligence"))
							WikiaJS.CharacterTooltip.CharacterInfo.StatusChartInfo.Inteligence = arrayAttributes[i].toString().replace("CharacterInfo_StatusChartInfo_Inteligence:","").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_StatusChartInfo_CombatProficiency"))
							WikiaJS.CharacterTooltip.CharacterInfo.StatusChartInfo.CombatProficiency = arrayAttributes[i].toString().replace("CharacterInfo_StatusChartInfo_CombatProficiency:","").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_StatusChartInfo_Charisma"))
							WikiaJS.CharacterTooltip.CharacterInfo.StatusChartInfo.Charisma = arrayAttributes[i].toString().replace("CharacterInfo_StatusChartInfo_Charisma:","").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_StatusChartInfo_Loyalty"))
							WikiaJS.CharacterTooltip.CharacterInfo.StatusChartInfo.Loyalty = arrayAttributes[i].toString().replace("CharacterInfo_StatusChartInfo_Loyalty:","").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_Title"))
							WikiaJS.CharacterTooltip.CharacterInfo.Title = arrayAttributes[i].toString().replace("CharacterInfo_Title:","").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_GeneralInfo_Gender"))
							WikiaJS.CharacterTooltip.CharacterInfo.GeneralInfo.Gender = arrayAttributes[i].toString().replace("CharacterInfo_GeneralInfo_Gender:","").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_GeneralInfo_Status"))
							WikiaJS.CharacterTooltip.CharacterInfo.GeneralInfo.Status = arrayAttributes[i].toString().replace("CharacterInfo_GeneralInfo_Status:","").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_GeneralInfo_Affiliation"))
							WikiaJS.CharacterTooltip.CharacterInfo.GeneralInfo.Affiliation = arrayAttributes[i].toString().replace("CharacterInfo_GeneralInfo_Affiliation:","").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_GeneralInfo_KnightmareFrame"))
							WikiaJS.CharacterTooltip.CharacterInfo.GeneralInfo.KnightmareFrame = arrayAttributes[i].toString().replace("CharacterInfo_GeneralInfo_KnightmareFrame:","").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_Description"))
							WikiaJS.CharacterTooltip.CharacterInfo.Description = arrayAttributes[i].toString().replace("CharacterInfo_Description:", "").clean();
						if(arrayAttributes[i].toString().includes("CharacterInfo_AbilitiesInfo_ArrayOfImagesUrl"))
							WikiaJS.CharacterTooltip.CharacterInfo.AbilitiesInfo.ArrayOfImagesUrl = arrayAttributes[i].toString().replace("CharacterInfo_AbilitiesInfo_ArrayOfImagesUrl:", "").clean();
					}								
					
					if($("#" + WikiaJS.CharacterTooltip.Id + "_WrapperLink").length <= 0){
						var _a = $(WikiaJS.CharacterTooltip.BackgroundImageUrl);
						_a.attr("id", WikiaJS.CharacterTooltip.Id + "_WrapperLink");
						
						var _img = _a.find("img");
						_img.addClass("WikiaJS_BackgroungImg");
						
						$("#" + WikiaJS.CharacterTooltip.Id + "_Wrapper").append(_a);
					}
													
					$("#" + WikiaJS.CharacterTooltip.Id + "_characterinfo_title").html(WikiaJS.CharacterTooltip.CharacterInfo.Title);
					$("#" + WikiaJS.CharacterTooltip.Id + "_characterinfo_description").html(WikiaJS.CharacterTooltip.CharacterInfo.Description);
					
					var topEl = $(this).offset().top;
					var leftEl = $(this).offset().left;
					
					var evt = e || window.event;
					
					if(evt != null){
						var pos = WikiaJS.CharacterTooltip.Positionate(evt, this);
						
						topEl = pos.Y;
						leftEl = pos.X;
					}
				
					WikiaJS.CharacterTooltip.Show(topEl,leftEl);
				}
			}
		});
		
		$(this).on("mouseout", function(){
			WikiaJS.CharacterTooltip.Hide();
		});
		
		$(this).on("mousemove", function(e){
			var topEl = $(this).offset().top;
			var leftEl = $(this).offset().left;
			
			var evt = e || window.event;
			
			if(evt != null){
				var pos = WikiaJS.CharacterTooltip.Positionate(evt, this);
						
				topEl = pos.Y;
				leftEl = pos.X;
				
				$("#" + WikiaJS.CharacterTooltip.Id).css("top", topEl);
				$("#" + WikiaJS.CharacterTooltip.Id).css("left", leftEl);
			}		
		});
	});
});