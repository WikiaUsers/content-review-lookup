/*
452's javascript poll

Features:
*No anon voting
*No loading of external data
*Create dialog
*Images supported
*Embedding supported
*Voting in an embedded poll purges current page
*Multiple polls on one page
*Votes hidden until user has voted
*Polls can be renamed without editing the poll page.  Redirected transclusions will not work.
*Duplicate polls on the same page are ignored.

Notes:
*Editing poll must be done manually

Future:
*Sanity check on existing data
*Maybe highlight leading option

*/

if (!$("#SRWpollstyle").size()) {
	$('head').append('<style type="text/css" media="all" id="SRWpollstyle">'
	+'\n.SRWpoll>div[data-opt] { border: 3px solid purple;border-radius: 1em;margin: 1em 1em 0em 1em;cursor: pointer;display: inline-block;width: 452px; }'
	+'\n.SRWpoll>div:hover { background:cornflowerblue; }'
	+'\n.SRWpoll div figure { float: left; margin-right: 1em; }'
	+'\n.SRWpoll img { vertical-align:top; }'
	+'\n.SRWpoll .votes { float:right; color: blue; padding-left: 1em; }'
	+'\n.SRWpoll input { width:452px; }'
	+'\n.sprite.ok {    background-position: -1096px -80px; }'
	+'\n.sprite.error {    background-position: -1176px -80px; }'
	+'\n.SRWpoll .sprite {'
	+'\n    background-color: transparent;'
	+'\n    background-image: url(https://images.wikia.nocookie.net/__cb1487361765/common/skins/shared/images/sprite.png);'
	+'\n    background-repeat: no-repeat;'
	+'\n    height: 16px;'
	+'\n    width: 16px;'
	+'\n    float: right;'
	+'\n}'
	+'\n</style>');
}
if (wgPageName.indexOf("Saints_Row_Wiki:Polls") != -1) {
	$("#mw-content-text").prepend(
		$("<button>", {
			id:"newPollButton",
			style:"float:right",
			html:"Create New Poll"
		}).click(function(){
			newPoll();
		})
	)
	$(".SRWpoll ~ *").css("display", "none");
}
String.prototype.ucfirst = function() { return this.charAt(0).toUpperCase() + this.substr(1); }

function newPoll() {
	$().makeModal({
	  id: "ModalTable",
	  width: 626,
	});
	$("#ModalTable .modalContent").addClass("SRWpoll").css({
	  "text-align":"center",
	  overflow: "auto",
	  height: $(window).height() - 150
	})
	.append('<table>'
	  +'<tr><td>Poll title</td><td><input type="text" id="newPollname"></value></td></tr>'
	  +'<tr><td>Poll description</td><td><input type="text" id="newPolldesc"></value></td></tr>'
	  +'<tr><td>Related article</td><td><input type="text" id="newPolllink" placeholder="(Optional)"></value></td></tr>'
	  +'<tr><td>Poll image url</td><td><input type="text" id="newPollimage" placeholder="(Optional)"></value></td></tr>'
	  +'<tr><td colspan=2><hr></td></tr>'
	  +'<tr><td>Option</td><td><input type="text" id="newPolloption1" class="newPolloption" data-index="1"></value></td></tr>'
	  +'<tr><td>Image URL</td><td><input type="text" id="newPolloption1image" placeholder="(Optional)"></value></td></tr>'
	  +'</table>'
	)
	.append(
	  $("<button>", {
		html:"Add Option"
	  }).click(function(){
		$("#ModalTable .modalContent table").append('<tr><td colspan=2></td></tr>'
			+'<tr><td>Option</td><td><input type="text" id="newPolloption'+($(".newPolloption").size()+1)+'" data-index="'+($(".newPolloption").size()+1)+'" class="newPolloption"></value></td></tr>'
			+'<tr><td>Image URL</td><td><input type="text" id="newPolloption'+($(".newPolloption").size()+1)+'image" placeholder="(Optional)"></td></tr>'
		);
	  })
	)
	.append(
	  $("<button>", {
		id:"savePoll",
		style:"",
		html:"Save Poll"
	  }).click(function(){
	
		var newpoll = '{{#ifexpr:{{#ifeq:{{NAMESPACE}}:{{BASEPAGENAME}}|Saints Row Wiki:Polls|0|1}} and {{#if:{{{1|}}}|0|1}}|Parameter missing, see [[Template:Poll]].}}<div class="SRWpoll" data-pll="{{#if:{{{1|}}}|{{{1|}}}|{{#ifeq:{{NAMESPACE}}|Saints Row Wiki|{{SUBPAGENAME}}|Error}}}}" data-dsc="'+$("#newPolldesc").val().replace(/"/g, "'")+'"';
		if ($("#newPolllink").val().length) newpoll += ' data-lnk="'+$("#newPolllink").val()+'"';
		if ($("#newPollimage").val().length) newpoll += ' data-img="'+$("#newPollimage").val()+'"';
		newpoll += '><span class="pollstatus">Please wait for poll to load</span></div>[\[Category:Polls]]'

		$(".newPolloption").each(function(){ 
			if (!$(this).val().length) return;
			newpoll += '\n<span data-pll="{{{1|{{SUBPAGENAME}}}}}" data-opt="'+$(this).attr("data-index")+'" data-txt="'+$(this).val()+'"';
			if ($("#"+$(this).attr("id")+"image").val().length)
				newpoll += ' data-img="'+$("#"+$(this).attr("id")+"image").val()+'"';
			newpoll += '></span>';
		});
		console.log(newpoll);
		$("#savePoll").after("<div id='saveStatus'>Saving...</div>");

		$.ajax({
		  type: "POST",
		  url: "/api.php",
		  data: { 
			format:"json",
			action:"edit",
			title:wgSiteName.replace(/ /g, "_")+":Polls/"+$("#newPollname").val().ucfirst(),
			token:mw.user.tokens.get("editToken"),
			summary: "creating poll",
			appendtext: newpoll
		  },
		  error: function(data) {
			$(".SRWpoll[data-pll='"+SRWpoll+"'] .pollstatus").html("Failed to save poll, please try again.");
			console.log(data);
		  },
		  success: function() {
			$("#saveStatus").html("Saved as <a href='/"+wgSiteName.replace(/ /g, "_")+":Polls/"+$("#newPollname").val().ucfirst()+"'>"+wgSiteName+":Polls/"+$("#newPollname").val().ucfirst()+"</a>");
			$("#ModalTable .modalContent button").remove();
			
			$.ajax({
			  type: "POST",
			  url: "/api.php",
			  data: { 
				format:"json",
				action:"edit",
				title:"Forum:"+$("#newPollname").val().ucfirst(),
				token:mw.user.tokens.get("editToken"),
				summary: "creating poll discussion page",
				appendtext: "{{forumheader|Polls}}\n{{poll|{{PAGENAME}}}}\n"
			  },
			  error: function(data) {
				$(".SRWpoll[data-pll='"+SRWpoll+"'] .pollstatus").html("Failed to create forum page.");
				console.log(data);
			  },
			  success: function() {
				$("#saveStatus").append("<br>Created discussion page <a href='/Forum:"+$("#newPollname").val().ucfirst()+"'>Forum:"+$("#newPollname").val().ucfirst()+"</a>");
				$.ajax({
				  type: "POST",
				  url: "/api.php",
				  data: { 
					format:"json",
					action:"edit",
					title:"Saints_Row_Wiki:Forums/Polls",
					token:mw.user.tokens.get("editToken"),
					summary: "",
					appendtext: ""
				  }
				});
			  }
			});
		  }
		});        
	  })
	)
}

if ($(".SRWpoll").size()) {
	$(".SRWpoll").each(function(){ 
		var SRWpoll = $(this).attr("data-pll"); window.userID = typeof wgTrackID != "undefined"?wgTrackID:0;
                if (SRWpoll == "Error") { $(this).remove(); return;}
                if ($("div[data-opt][data-pll='HUD in screenshots']").size()) { $(this).remove(); return;}

		$(".SRWpoll[data-pll='"+SRWpoll+"']").prepend("<h3>"+$(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-pll")+"</h3>");

		if (typeof $(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-img") != "undefined" && $(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-img").length) {
			var tmpimg = $(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-img");
			if (tmpimg.indexOf("http") == -1) tmpimg = 'https://vignette.wikia.nocookie.net/'+wgDBname+'/images/'+tmpimg+'/revision/latest/scale-to-width-down/200';
			$(".SRWpoll[data-pll='"+SRWpoll+"']").prepend('<figure style="float: right;"><img src="'+tmpimg+'" alt="poll image"></figure>');
		}
		$(".SRWpoll[data-pll='"+SRWpoll+"']").append("<dl><dd>"+$(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-dsc")+"</dd></dl>");

		if (typeof $(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-lnk") != "undefined" && $(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-lnk").length) {
			$(".SRWpoll[data-pll='"+SRWpoll+"']").append("<dl><dd>Related article: <a href='/"+$(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-lnk")+"'>"+$(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-lnk")+"</a></dd></dl>");
}
		$("span[data-pll='"+SRWpoll+"'][data-opt]").each(function(){ 
			if ($("div[data-pll='"+SRWpoll+"'][data-opt="+$(this).attr('data-opt')+"]").size()) { console.log("error: dupe "+$(this).attr("data-opt")); return; }
			$(".SRWpoll[data-pll='"+SRWpoll+"']").append(
				$("<div>", { "data-opt":$(this).attr("data-opt"), "data-pll":$(this).attr("data-pll") })
					.click(function(){
						if (userID == 0) {
							$(".SRWpoll[data-pll='"+SRWpoll+"'] .pollstatus").html("Please log in to vote.").css({"color":"red"});
							return;
						}
						
						if (typeof $(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-voted") != "undefined") return;
						if($("div[data-pll='"+SRWpoll+"'][data-opt="+$(this).attr("data-opt")+"] div.sprite").size()) { $(".SRWpoll[data-pll='"+SRWpoll+"'] .pollstatus").html("Vote saved. Thanks for voting!"); return;}
						$(".SRWpoll[data-pll='"+SRWpoll+"'] .pollstatus").html("Saving vote...");
						$("span[data-pll='"+SRWpoll+"']").filter(":last").after('<span data-pll="'+SRWpoll+'" data-usr="'+userID+'" data-vt="'+$(this).attr("data-opt")+'"></span>');
						var vote = $(this).attr("data-opt");
						if (window.userID != 0 && localStorage.getItem('userID') == null)
							localStorage.setItem('userID', window.userID);
						if (localStorage.getItem('userID') != window.userID) vote = 0;
						$.ajax({
						  type: "POST",
						  url: "/api.php",
						  data: { 
							format:"json",
							action:"edit",
							title:wgSiteName.replace(/ /g, "_")+":Polls/"+$(this).attr("data-pll"),
							token:mw.user.tokens.get("editToken"),
							summary: "Voting for "+vote,
							appendtext: '\n<span data-pll="{{{1|{{SUBPAGENAME}}}}}" data-usr="'+localStorage.getItem('userID')+'" data-vt="'+vote+'"></span>',
							minor:1,
						  },
						  error: function() {
							$(".SRWpoll[data-pll='"+SRWpoll+"'] .pollstatus").html("Voting failed, please try again.");
						  },
						  success: function() {
						  	$(".SRWpoll[data-pll='"+SRWpoll+"'] .pollstatus").html("Vote saved. Thanks for voting!");
							$(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-voted", 1);
							$("div[data-pll='"+SRWpoll+"'] .sprite").remove();
							$("div[data-pll='"+SRWpoll+"'] .votes").remove();
							calcVotes(SRWpoll);
							$.ajax({
							  type: "POST",
							  url: "/api.php",
							  data: { 
								format:"json",
								action:"edit",
								title:wgPageName,
								token:mw.user.tokens.get("editToken"),
								summary: "",
								appendtext: ""
							  }
							});
						  }
						});        
					})
			);
			if (typeof $(this).attr("data-img") != "undefined" && $(this).attr("data-img").length) {
				var tmpimg = $(this).attr("data-img");
				if (tmpimg.indexOf("http") == -1) tmpimg = 'https://vignette.wikia.nocookie.net/'+wgDBname+'/images/'+tmpimg+'/revision/latest/scale-to-width-down/200';
				$("div[data-pll='"+SRWpoll+"'][data-opt="+$(this).attr("data-opt")+"]").append('<figure><img src="'+tmpimg+'" alt="SRWpoll image"></figure>');
			}

			$("div[data-pll='"+SRWpoll+"'][data-opt="+$(this).attr("data-opt")+"]").append('<p>'+$(this).attr("data-txt")+'</p>');
		});
		if (wgNamespaceNumber == 4) $(".SRWpoll[data-pll='"+SRWpoll+"']").after("<p>To discuss this poll, please go to <a href='/Forum:"+$(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-pll")+"'>Forum:"+$(".SRWpoll[data-pll='"+SRWpoll+"']").attr("data-pll")+"</a></p>");
		$(".SRWpoll[data-pll='"+SRWpoll+"'] .pollstatus").empty();
		calcVotes(SRWpoll);
	});

	function calcVotes(SRWpoll) {
		var SRWpollvotes = new Array(), SRWvotes = new Array();
		$("span[data-pll='"+SRWpoll+"'][data-usr][data-vt]").each(function() {
			if($("div[data-pll='"+SRWpoll+"'][data-opt="+$(this).attr("data-vt")+"]"))
				SRWpollvotes[$(this).attr("data-usr")] = $(this).attr("data-vt");
		});		
		$(".SRWpoll[data-pll='"+SRWpoll+"'] .pollstatus").html("Total votes: "+Object.keys(SRWpollvotes).length);

		for(SRWpollvote in SRWpollvotes) {
			if (typeof SRWvotes[SRWpollvotes[SRWpollvote]] == "undefined") SRWvotes[SRWpollvotes[SRWpollvote]] = 0;
			SRWvotes[SRWpollvotes[SRWpollvote]]++;
		}
		for(SRWvote in SRWvotes) {
			$("div[data-pll='"+SRWpoll+"'][data-opt="+SRWvote+"]").prepend("<div class='votes'>"+SRWvotes[SRWvote]+" votes</div>");
		}
		if(typeof SRWpollvotes[userID] != "undefined") {
			$("div[data-pll='"+SRWpoll+"'][data-opt="+SRWpollvotes[userID]+"]").prepend('<div class="sprite ok" title="your vote"></div>')
		} else {
			$("div[data-pll='"+SRWpoll+"'] .votes").remove();
			$("div[data-pll='"+SRWpoll+"'] .pollstatus").append(" (You have not voted in this poll.  Results are shown after you vote.)");
		}
	}	
}