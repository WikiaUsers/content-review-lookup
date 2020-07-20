function findProfanity(testWord) {
	if (typeof(testWord) === "undefined"){
		testWord = "";
	}
	profAr = [
		/f[\*u]?[\*c]?[\*k]/gi ,
		/s[\*h][\*i]?[\*tz]/gi ,
		/slut/gi ,
		/damn/gi ,
		/[^(cl)]a[\*s][\*s][^(ume|ign)]/gi ,
		/[\*b][\*i]?[\*t]?[\*c][\*h]/gi ,
		/d[\*i]?ck/gi ,
		/pussy?/gi ,
		/wetback/gi ,
		/beaner/gi ,
		/chink/gi ,
		/coon/gi ,
		/nig{1,2}a/gi ,
		/nigg?[^(ht)]/gi ,
		/wh[\*o]re?/gi ,
		/b[\*i]?t?ch/gi ,
		/[^w]h[\*o]e[^(ver)]/gi ,
		/slag/gi ,
		/jailbait/gi ,
		/fag/gi ,
		/c[\*u]?nt/gi ,
		/(re)?tard/gi ,
		/v[\*a]g(ina)?/gi ,
		/downy/gi ,
		/sperg/gi ,
		/pen[\*i]s/gi ,
		/cl[\*iu]t(oris)?/gi ,
		/testicles/gi ,
		/b[\*o][\*o]b/gi ,
		/breast/gi ,
		/tentacle?s/gi ,
		/tit[^(le)]s?/gi ,
		/sexy?/gi ,
		/hell[^o]/gi ,
		/bl[\*o]w/gi ,
		/b[\*o]ner/gi ,
		/cl[\*o]p/gi ,
		/c[\*o]ck/gi ,
		/s[\*u]ck?/gi ,
		/cum/gi ,
		/d[\*o]uche?/gi ,
		/dumb?/gi ,
		/fat/gi ,
		/gay/gi ,
		/hand-?job/gi ,
		/homo/gi ,
		/hump/gi ,
		/jizz/gi ,
		/[^(ce|heart|ru|un|mi|app)]le(sb|zb)/gi ,
		/dyke/gi ,
		/k[iy]ke/gi ,
		/neg(ro)?/gi ,
		/[^(mi)]nut/gi ,
		/sack/gi ,
		/queef/gi ,
		/skank/gi ,
		/skeet/gi ,
		/jay/gi ,
		/va?jj/gi ,
		/wank/gi ,
		/freak/gi ,
		/jerk/gi ,
		/care/gi ,
		/opinion/gi ,
		/m[\*o]lest?/gi 
	];

	matchedInstances = 0;
	
	if (testWord == ""){
		if (wgPageName != "Special:RecentChanges"){
			$(".article-comm-text p").each(function() {
				currentHTML = $(this).html();
			
				for (i=0; i<profAr.length; i++){
					if (currentHTML.search(profAr[i]) != -1){
						currentCaret = 0;
						matchedStr = currentHTML.match(profAr[i]);
						matchedInstances += matchedStr.length;
						
						for (var x = 0; x<matchedStr.length; x++){
							currentBeginningSlice = currentHTML.slice(0, currentHTML.indexOf(matchedStr[x], currentCaret));
							currentEndSlice = currentHTML.slice(currentHTML.indexOf(matchedStr[x], currentCaret));
							
							strRep = "<span style='background-color: red; font-weight: bold'>"+matchedStr[x]+"</span>";
							currentHTML = ""+currentBeginningSlice + currentEndSlice.replace(matchedStr[x], strRep)+"";
							currentCaret += (currentBeginningSlice.length + strRep.length);
						}
					}
				}
				$(this).html(currentHTML);
			});
		}else{
			$(".comment").each(function() {
				currentHTML = $(this).html();
				
				if (currentHTML.indexOf("content was") == -1){
			
					for (i=0; i<profAr.length; i++){
						if (currentHTML.search(profAr[i]) != -1){
							currentCaret = 0;
							matchedStr = currentHTML.match(profAr[i]);
							matchedInstances += matchedStr.length;
							
							for (var x = 0; x<matchedStr.length; x++){
								currentBeginningSlice = currentHTML.slice(0, currentHTML.indexOf(matchedStr[x], currentCaret));
								currentEndSlice = currentHTML.slice(currentHTML.indexOf(matchedStr[x], currentCaret));
								
								strRep = "<span style='background-color: red; font-weight: bold'>"+matchedStr[x]+"</span>";
								currentHTML = ""+currentBeginningSlice + currentEndSlice.replace(matchedStr[x], strRep)+"";
								currentCaret += (currentBeginningSlice.length + strRep.length);
							}
						}
					}
				$(this).html(currentHTML);
				}
			});
		}
	}else{
		currentHTML = testWord;
		
		for (i=0; i<profAr.length; i++){
			if (currentHTML.search(profAr[i]) != -1){
				currentCaret = 0;
				matchedStr = currentHTML.match(profAr[i]);
				matchedInstances += matchedStr.length;
				
				alert("Matched RegExp: "+profAr[i]+"\nMatched words : "+matchedStr);
				
				for (var x = 0; x<matchedStr.length; x++){
					currentBeginningSlice = currentHTML.slice(0, currentHTML.indexOf(matchedStr[x], currentCaret));
					currentEndSlice = currentHTML.slice(currentHTML.indexOf(matchedStr[x], currentCaret));
					
					strRep = "<span style='background-color: red; font-weight: bold'>"+matchedStr[x]+"</span>";
					currentHTML = ""+currentBeginningSlice + currentEndSlice.replace(matchedStr[x], strRep)+"";
					currentCaret += (currentBeginningSlice.length + strRep.length);
				}
			}
		}
		alert(currentHTML);
	}
	if (testWord == ""){
		alert("Matched instances: "+matchedInstances);
	}
}

if ($('#WikiaArticleComments').length > 0){
	makeButtonInt = setInterval('if ($("#WikiaArticleComments").hasClass("loading") == false){$("#article-comments-counter-header").append(\'<button style="margin-top: 10px;" class="wikia-button" onclick="findProfanity()">Find profanity</span>\'); clearInterval(makeButtonInt);}', 500)

}else if (wgPageName == "Special:RecentChanges"){
	$("#AdminDashboardHeader h1:eq(0)").append('<button style="margin-left: 15px;" class="wikia-button" onclick="findProfanity()">Find profanity</span>');
}