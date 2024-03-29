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
*Highlight your vote
*Mark leading option
*Polls can be renamed without editing the poll page.  Redirected transclusions will not work.
*Duplicate polls on the same page are ignored.

Notes:
*Editing poll must be done manually

Future:
*Sanity check existing data

*/


if (typeof debug452 == "function") debug452("polls - start");

if (!$("#SRWpollstyle").length) {
	$('head').append('<style type="text/css" media="all" id="SRWpollstyle">'
	+'\n.SRWpoll>div[data-opt] { border: 3px solid purple;border-radius: 1em;margin: 1em 1em 0em 1em;cursor: pointer;display: inline-block;width: 452px; text-align:left; }'
	+'\n.SRWpoll>div[data-opt] p { margin: 0.5em 0 0.5em 0.5em; }'
	+'\n.SRWpoll>div:hover { background:purple;color:white }'
	+'\n.SRWpoll div figure { float: left; margin-right: 1em !important; }'
	+'\n.SRWpoll img { vertical-align:top; }'
	+'\n.SRWpoll .votes { float:right; color: blue; padding-left: 1em; }'
	+'\n.SRWpoll input { width:452px; }'
	+'\n.myVote {    background:purple; color:white; }'
	+'\n.myVote .votes {    color: yellow; }'
	+'\n.sprite.ok {    background-position: -1096px -80px; }'
	+'\n.sprite.error {    background-position: -1176px -80px; }'
	+'\n.SRWpoll .sprite {'
	+'\n    background-color: transparent;'
	+'\n    background-image: url(https://static.wikia.nocookie.net/saintsrow/images/d/d7/Sprite.png);'
	+'\n    background-repeat: no-repeat;'
	+'\n    height: 16px;'
	+'\n    width: 16px;'
	+'\n    float: right;'
	+'\n}'
	+'\n</style>');
}
if (mw.config.get("wgPageName").indexOf("Saints_Row_Wiki:Polls") != -1) {
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
	var newPollHTML = '<table>'
	  +'<tr><td>Poll title</td><td><input type="text" id="newPollname"></value></td></tr>'
	  +'<tr><td>Poll description</td><td><input type="text" id="newPolldesc"></value></td></tr>'
	  +'<tr><td>Related article</td><td><input type="text" id="newPolllink" placeholder="(Optional)"></value></td></tr>'
	  +'<tr><td>Poll image url</td><td><input type="text" id="newPollimage" placeholder="(Optional)"></value></td></tr>'
	  +'<tr><td colspan=2><hr></td></tr>'
	  +'<tr><td>Option</td><td><input type="text" id="newPolloption1" class="newPolloption" data-index="1"></value></td></tr>'
	  +'<tr><td>Image URL</td><td><input type="text" id="newPolloption1image" placeholder="(Optional)"></value></td></tr>'
	  +'</table><button id="SRWpollAdd">Add Option</button><button id="SRWpollSave">Save Poll</button>';

	SRWpopup("NewPoll", "New Poll", newPollHTML);

	$("#NewPoll .popupContent").addClass("SRWpoll").css({
	  "text-align":"center"
	});

	$("#SRWpollAdd").on("click", function(){
		$("#NewPoll .popupContent table").append('<tr><td colspan=2></td></tr>'
			+'<tr><td>Option</td><td><input type="text" id="newPolloption'+($(".newPolloption").length+1)+'" data-index="'+($(".newPolloption").length+1)+'" class="newPolloption"></value></td></tr>'
			+'<tr><td>Image URL</td><td><input type="text" id="newPolloption'+($(".newPolloption").length+1)+'image" placeholder="(Optional)"></td></tr>'
		);
		$("#NewPoll")[0].adjustTop();
	})

	$("#SRWpollSave").on("click", function(){
		var newpoll = '{{#ifexpr:{{#ifeq:{{NAMESPACE}}:{{BASEPAGENAME}}|Saints Row Wiki:Polls|0|1}} and {{#if:{{{1|}}}|0|1}}|Parameter missing, see [[Template:Poll]].}}<div class="SRWpoll" data-pll="{{#if:{{{1|}}}|{{{1|}}}|{{#ifeq:{{NAMESPACE}}|Saints Row Wiki|{{SUBPAGENAME}}|Error}}}}" data-dsc="'+$("#newPolldesc").val().replace(/"/g, "'")+'"';
		if ($("#newPolllink").val().length) newpoll += ' data-lnk="'+$("#newPolllink").val().replace(/_/g, " ")+'"';
		if ($("#newPollimage").val().length) newpoll += ' data-img="'+$("#newPollimage").val()+'"';
		newpoll += '><div class="pollstatus">Please wait for poll to load</div></div><noinclude>[\[Category:Polls|{{SUBPAGENAME}}]]</noinclude>'

		$(".newPolloption").each(function(){ 
			if (!$(this).val().length) return;
			newpoll += '<span data-pll="{{{1|{{SUBPAGENAME}}}}}" data-opt="'+$(this).attr("data-index")+'" data-txt="'+$(this).val()+'"';
			if ($("#"+$(this).attr("id")+"image").val().length)
				newpoll += ' data-img="'+$("#"+$(this).attr("id")+"image").val()+'"';
			newpoll += '></span>';
		});
		console.log(newpoll);
		$("#SRWpollSave").after("<div id='saveStatus'>Saving...</div>");

		$.ajax({
		  type: "POST",
		  url: "/api.php",
		  data: { 
			format:"json",
			action:"edit",
			title:mw.config.get("wgSiteName").replace(/ /g, "_")+":Polls/"+$("#newPollname").val().ucfirst(),
			token:mw.user.tokens.get("csrfToken"),
			summary: "creating poll",
			appendtext: newpoll
		  },
		  error: function(data) {
			$(".pollstatus", SRWpoll).html("Failed to save poll, please try again.");
			console.log(data);
		  },
		  success: function() {
			$("#saveStatus").html("Saved as <a href='/"+mw.config.get("wgSiteName").replace(/ /g, "_")+":Polls/"+$("#newPollname").val().ucfirst()+"'>"+mw.config.get("wgSiteName")+":Polls/"+$("#newPollname").val().ucfirst()+"</a>");
			$("#NewPoll .popupContent button").remove();
			
			$.ajax({
			  type: "POST",
			  url: "/api.php",
			  data: { 
				format:"json",
				action:"edit",
				title:"Forum:"+$("#newPollname").val().ucfirst(),
				token:mw.user.tokens.get("csrfToken"),
				summary: "creating poll discussion page",
				appendtext: "{"+"{forumheader|Polls}}\n{"+"{poll|{{PAGENAME}}}}\n"
			  },
			  error: function(data) {
				$(".pollstatus", SRWpoll).html("Failed to create forum page.");
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
					token:mw.user.tokens.get("csrfToken"),
					summary: "",
					appendtext: ""
				  }
				});
			  }
			});
		  }
		});        
	});
}

window.SRWpollInit = function() {
    if ($(".SRWpoll").length) {
	$(".SRWpoll").each(function(){ 
		var SRWpoll = $(this); 
		var SRWpollname = $(this).attr("data-pll"); 
                window.userID = mw.config.get("wgUserId") == null?0:mw.config.get("wgUserId");
                if (SRWpollname == "Error") { $(this).remove(); return;}
                if ($("div[data-opt][data-pll='"+SRWpollname+"']").length) { $(this).remove(); return;}

		if(!SRWpoll.attr("data-qz")) SRWpoll.prepend("<h3><a href='/Forum:"+SRWpoll.attr("data-pll")+"'>"+SRWpoll.attr("data-pll")+"</a></h3>");

		if (typeof SRWpoll.attr("data-img") != "undefined" && SRWpoll.attr("data-img").length) {
			var tmpimg = SRWpoll.attr("data-img");
			if (tmpimg.indexOf("http") == -1) tmpimg = 'https://vignette.wikia.nocookie.net/'+mw.config.get("wgDBname")+'/images/'+tmpimg+'/revision/latest/scale-to-width-down/200';
			SRWpoll.prepend('<figure style="float: right;"><img src="'+tmpimg+'" alt="poll image"></figure>');
		}
		$(".pollstatus", SRWpoll).before("<dl><dd><b>"+SRWpoll.attr("data-dsc")+"</b></dd></dl>");

		if (typeof SRWpoll.attr("data-lnk") != "undefined" && SRWpoll.attr("data-lnk").length) {
			SRWpoll.append("<dl><dd>Related article: <a href='/"+SRWpoll.attr("data-lnk")+"'>"+decodeURIComponent(SRWpoll.attr("data-lnk"))+"</a></dd></dl>");
		}
		$("span[data-pll='"+SRWpollname+"'][data-opt]").each(function(){ 
			if ($("div[data-pll='"+SRWpollname+"'][data-opt="+$(this).attr('data-opt')+"]").length) { console.log("error: dupe "+$(this).attr("data-opt")); return; }
			SRWpoll.append(
				$("<div>", { "data-opt":$(this).attr("data-opt"), "data-pll":$(this).attr("data-pll") })
					.click(function(){
						var SRWpoll = $(".SRWpoll[data-pll='"+SRWpollname+"']");
						if (userID == 0) {
							$(".pollstatus", SRWpoll).html("You are not signed in.").css({"color":"red"});
							return;
						}
						
						if (typeof SRWpoll.attr("data-voted") != "undefined") return;
						if($("div[data-pll='"+SRWpollname+"'][data-opt="+$(this).attr("data-opt")+"].myVote").length) { $(".pollstatus", SRWpoll).html("Thanks for voting!"); return;}
						$(".pollstatus", SRWpoll).html("Saving vote...");
						$("span[data-pll='"+SRWpollname+"']").filter(":last").after('<span data-pll="'+SRWpollname+'" data-usr="'+userID+'" data-vt="'+$(this).attr("data-opt")+'"></span>');
						var vote = $(this).attr("data-opt");
console.log("vote:"+vote);
						
						if (window.userID != 0 && localStorage.getItem('userID') == null)
							localStorage.setItem('userID', window.userID);
						if (localStorage.getItem('userID') != window.userID) vote = 0;
						$.ajax({
						  type: "POST",
						  url: "/api.php",
						  data: { 
							format:"json",
							action:"edit",
							title:mw.config.get("wgSiteName").replace(/ /g, "_")+":Polls/"+$(this).attr("data-pll").split("#")[0],
							token:mw.user.tokens.get("csrfToken"),
							summary: "Voting"+(vote == 0?'!':''),
							appendtext: SRWpoll.attr("data-lock")?'':'\n<span data-pll="'+$(this).attr("data-pll")+'" data-usr="'+localStorage.getItem('userID')+'" data-vt="'+vote+'"></span>',
							minor:1,
							nocreate:1
						  },
						  error: function() {
							$(".pollstatus", SRWpoll).html("Voting failed, please try again.");
						  },
						  success: function() {
						  	$(".pollstatus", SRWpoll).html("Vote saved. Thanks for voting!");
							SRWpoll.attr("data-voted", 1);
							$("div[data-pll='"+SRWpollname+"'] .sprite").remove();
							$("div[data-pll='"+SRWpollname+"'] .votes").remove();

							calcVotes(SRWpollname);
							/* nulledit current page to ensure embedded poll is updated - problem: other embeds? Primary purpose is for people refreshing the page they're on. */
							$.ajax({
							  type: "POST",
							  url: "/api.php",
							  data: { 
								format:"json",
								action:"edit",
								title:mw.config.get("wgPageName"),
								token:mw.user.tokens.get("csrfToken"),
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
				if (tmpimg.indexOf("http") == -1) tmpimg = 'https://vignette.wikia.nocookie.net/'+mw.config.get("wgDBname")+'/images/'+tmpimg+'/revision/latest/scale-to-width-down/200';
				$("div[data-pll='"+SRWpollname+"'][data-opt="+$(this).attr("data-opt")+"]").append('<figure><img src="'+tmpimg+'" alt="SRWpoll image"></figure>');
			}

			$("div[data-pll='"+SRWpollname+"'][data-opt="+$(this).attr("data-opt")+"]").append('<p>'+$(this).attr("data-txt")+'</p>');
		});
		if (mw.config.get("wgNamespaceNumber") != mw.config.get("wgNamespaceIds")["forum"] && !SRWpoll.attr("data-qz")) SRWpoll.after("<p><br>Discuss this poll on <a href='/Forum:"+SRWpoll.attr("data-pll")+"'>Forum:"+SRWpoll.attr("data-pll")+"</a></p>");
		$(".pollstatus", SRWpoll).empty();
		calcVotes(SRWpollname);
	});

	function calcVotes(SRWpollname) {
		var SRWpoll = $(".SRWpoll[data-pll='"+SRWpollname+"']");
		var SRWpollvotes = new Array(), SRWvotes = new Array(), SRWpollwinner = 0;
		$("span[data-pll='"+SRWpollname+"'][data-usr][data-vt]").each(function() {
			if($("div[data-pll='"+SRWpollname+"'][data-opt="+$(this).attr("data-vt")+"]"))
				SRWpollvotes[$(this).attr("data-usr")] = $(this).attr("data-vt");
		});		
		if (SRWpoll.attr("data-totals")) $(".pollstatus", SRWpoll).html("Total votes: "+Object.keys(SRWpollvotes).length);

		for(SRWpollvote in SRWpollvotes) {
			if (typeof SRWvotes[SRWpollvotes[SRWpollvote]] == "undefined") SRWvotes[SRWpollvotes[SRWpollvote]] = 0;
			SRWvotes[SRWpollvotes[SRWpollvote]]++;
		}
		for(SRWvote in SRWvotes) {
			$("div[data-pll='"+SRWpollname+"'][data-opt="+SRWvote+"]").prepend("<div class='votes'>"+Math.round(100 * SRWvotes[SRWvote] / Object.keys(SRWpollvotes).length )+"%</div>");
			SRWpollwinner = SRWvotes[SRWpollwinner] > SRWvotes[SRWvote]?SRWpollwinner:SRWvote;
		}
		if(SRWpoll.attr("data-qz"))
			$("div[data-pll='"+SRWpollname+"'][data-opt="+String.fromCharCode(SRWpoll.attr("data-qz"))+"]").prepend('<div class="sprite ok" title="Correct Answer"></div>');
		else if(typeof SRWvotes[SRWpollwinner] != "undefined" )
			$("div[data-pll='"+SRWpollname+"'][data-opt="+SRWpollwinner+"]").prepend('<div class="sprite ok" title="Leading"></div>');
		$("div[data-pll='"+SRWpollname+"'][data-opt]").removeClass("myVote");
		if(typeof SRWpollvotes[userID] != "undefined") {
			$("div[data-pll='"+SRWpollname+"'][data-opt="+SRWpollvotes[userID]+"]").addClass("myVote");
			if(SRWpoll.attr("data-qz")) {
				SRWpoll.attr("data-voted", 1);
console.log(SRWpollvotes[userID] + " ? " + String.fromCharCode(SRWpoll.attr("data-qz")));
				if (SRWpollvotes[userID] != String.fromCharCode(SRWpoll.attr("data-qz")))
				$("div[data-pll='"+SRWpollname+"'][data-opt="+SRWpollvotes[userID]+"]").prepend('<div class="sprite error" title="Wrong Answer"></div>');
			}
		} else if (!SRWpoll.attr("data-show")) {
			$(".sprite.ok", SRWpoll).remove();
			$(".votes", SRWpoll).remove();
			if(SRWpoll.attr("data-qz") != 0) $(".pollstatus", SRWpoll).append(" (You have not voted.  Results are shown after you vote.)");
		}
	}	
    }
    if (typeof debug452 == "function") debug452("polls - loaded");
}

$(function() {
	SRWpollInit();
});