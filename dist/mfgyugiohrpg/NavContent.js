// Hook setup
 
if(!window.onloadSubpagesFuncts) {
    var onloadSubpagesFuncts = [];
}
 
function addOnloadSubpagesHook(hookFunct) {
    onloadSubpagesFuncts[onloadSubpagesFuncts.length] = hookFunct;
}
 
function runOnloadSubpagesHook(el) {
    if(!(document.getElementById && document.getElementsByTagName)) {
	return;
    }
    for(var i=0; i<onloadSubpagesFuncts.length; i++) {
	onloadSubpagesFuncts[i](el);
    }
}
 
 
// Navigation bar
 
function NavContentCreate(el) {
 
    if(!el) el=document;
 
    // Hide all parts
    $("div.NavContentFrame div.NavContentPart",el).hide();
 
    // Hide the header inside each part
    $("div.NavContentFrame div.NavContentPart div.NavContentHeader",el).hide();
 
    // Add some space and a vertical bar between the bar links
    $("div.NavContentFrame div.NavContentBar",el)
	.each(function(){
		$("a.NavContentBarLink",this).not(":last").after("&nbsp;| ");
	    })
	.show();
 
    // Add navigation links to each progress bar
    $("div.NavContentFrame div.NavContentPart div.NavContentProgressBar",el)
        .each(function(){
		$("span",this)
		    .each(function(){
			    $(this).after("<a></a>");
		        });
	    });
 
    $("div.NavContentFrame div.NavContentPart div.NavContentProgressBar a",el)
	.each(function(){
		$(this)
		    .addClass($(this).prev("span").attr("class"))
		    .css({cursor: "pointer"})
		    .text($(this).prev("span").text());
	    })
 
    // Hide all non-clickable links
    $("div.NavContentFrame div.NavContentPart div.NavContentProgressBar span",el)
	.hide();
 
    // Add some space and a vertical bar between the progress bar links
    $("div.NavContentFrame div.NavContentPart div.NavContentProgressBar",el)
	.each(function(){
		$("a",this).not(":last").after("&nbsp;| ");
	    });
 
    // Replace link with message on load-on-demand div's
    $("div.NavContentFrame div.NavContentPart div.NavContentContent.load-on-demand",el)
        .find("div.NavContentContentPart a:not(.new)")
	.hide()
	.siblings().show();
 
    // Add actions to each link in bar
    $("div.NavContentFrame div.NavContentBar",el)
	.each(function(i){
		$("a.NavContentBarLink",this)
		    .each(function(j){
			    $(this).click(
			        function(){
				    // Make all other links normal face
				    $(this).parent()
					.find("a.NavContentBarLink")
					.not(":eq(" + j + ")")
					.css("fontWeight","normal");
				    // Toggle this link (normal/bold)
				    if($(this).css("fontWeight")=="bold" ||
                                       $(this).css("fontWeight")==700)
					$(this).css("fontWeight","normal");
				    else
					$(this).css("fontWeight","bold");
				    // Make all other parts hidden
				    $(this).parents("div.NavContentFrame")
					.find("div.NavContentPart")
					.not(":eq(" + j + ")")
					.hide();
				    // Load contents if needed
				    var contents = $(this).parents("div.NavContentFrame")
					.find("div.NavContentPart").eq(j)
					.find("div.NavContentContent");
				    if (contents.hasClass("load-on-demand")) {
					if(!contents.find("a").hasClass("new")) {
					    addr = $("a",contents).attr("href");
                                            host = addr.split(/\/index.php/g)[0];
                                            addr = addr.split(/\/index.php/g)[1];
                                            if (/[\?\&]title\=/.test(addr)) {
                                                addr = addr.match(/[\?\&]title\=[^\?\&]+/);
                                                addr = addr[0].match(/([\?\&]title\=)([^\?\&]+)/);
                                                addr = addr[2];
                                            }
                                            else {
                                                addr = addr.slice(1);
                                            }
					    $(contents).load(host + "/index.php?action=ajax&rs=wfAjaxLoadContent&rsargs="
					            + addr,
					    	{},
					    	function(){
					    	    runOnloadSubpagesHook(this);
					    	    $(this).removeClass("load-on-demand");
					    	    $("div.NavContentContentPart:first",this).slideDown("normal");
					    	    $("div.NavContentContentPart:gt(0)",this).hide();
					    	    if($("div.NavContentContentPart",this).size()>1)
					    	        $(this).parent().find("div.NavContentProgressBar").show();
					    	});
					}
				    }
				    // Toggle the visibility of this part
				    if($(this).css("fontWeight")=="bold" ||
                                       $(this).css("fontWeight")==700)
					$(this).parents("div.NavContentFrame")
					    .find("div.NavContentPart").eq(j)
					    .slideDown("normal");
				    else
					$(this).parents("div.NavContentFrame")
					    .find("div.NavContentPart").eq(j)
					    .slideUp("normal");
				});
			});
	    });
 
    // Hide all but the first content in each part
    $("div.NavContentFrame div.NavContentPart div.NavContentContent",el)
    	.each(function(){
    		$("div.NavContentContentPart:first",this).show();
    	    });
    $("div.NavContentFrame div.NavContentPart div.NavContentContent",el)
    	.each(function(){
    		$("div.NavContentContentPart:gt(0)",this).hide();
    	    });
 
    // If there is zero or one content in a part then the progress bar is hidden
    $("div.NavContentFrame div.NavContentPart",el)
	.each(function(){
		if($("div.NavContentContentPart",this).size()<2) {
		    $("div.NavContentProgressBar",this).hide();
		}
		else {
		    $("div.NavContentProgressBar",this).show();
		}
	    });
 
    // Actions to perform when a progress bar link is clicked
    $("div.NavContentFrame",el)
	.each(function(i){
		$("div.NavContentPart div.NavContentProgressBar",this)
		    .each(function(j){
			    $("a.NavContentShowLess",this).click(
			        function(){
				    // Make this link invisible if needed
				    if($(this).parents("div.NavContentPart")
				          .find("div.NavContentContentPart:visible")
				          .size() < 2) {
					$(this).hide()
					    .parent()
					    .find("span.NavContentShowLess")
					    .show()
					    .end()
					    .find("a.NavContentShowNone")
					    .hide()
					    .end()
					    .find("span.NavContentShowNone")
					    .show();
				    }
				    // Hide the last visible content
				    $(this).parents("div.NavContentPart")
					.find("div.NavContentContentPart:visible:last")
					.slideUp("normal");
				    // Make other links visible
				    $(this).parent()
					.find("span.NavContentShowMore").hide()
					.end()
				        .find("a.NavContentShowMore").show()
					.end()
					.find("span.NavContentShowAll").hide()
					.end()
				        .find("a.NavContentShowAll").show();
				});
			    $("a.NavContentShowMore",this).click(
				function(){
				    // Make other links invisible if needed
				    if($(this).parents("div.NavContentPart")
				          .find("div.NavContentContentPart:hidden")
				          .size() < 2) {
					$(this).hide()
					    .parent()
					    .find("span.NavContentShowMore").show()
					    .end()
					    .find("a.NavContentShowAll").hide()
					    .end()
					    .find("span.NavContentShowAll").show();
				    }
				    // Show the first invisible content
				    $(this).parents("div.NavContentPart")
					.find("div.NavContentContent").show()
					.end()
					.find("div.NavContentContentPart:hidden:first").slideDown("normal");
				    // Make less/none links visible
				    $(this).parent()
					.find("span.NavContentShowLess").hide()
					.end()
					.find("a.NavContentShowLess").show()
					.end()
					.find("span.NavContentShowNone").hide()
					.end()
				        .find("a.NavContentShowNone").show();
				});
			    $("a.NavContentShowAll",this).click(
				function(){
				    // Show all invisible content
				    $(this).parents("div.NavContentPart")
					.find("div.NavContentContent").show()
					.find("div.NavContentContentPart:hidden:first")
					.slideDown("normal", function(){
						$(this).parents("div.NavContentContent")
						    .find("div.NavContentContentPart:hidden")
						    .show();
					    });
				    // Make less/none links visible
				    $(this).parent()
					.find("span.NavContentShowLess").hide()
					.end()
					.find("a.NavContentShowLess").show()
					.end()
				        .find("span.NavContentShowNone").hide()
					.end()
					.find("a.NavContentShowNone").show();
				    // Make more/all links invisible
				    $(this).hide().parent()
					.find("span.NavContentShowAll").show()
					.end()
					.find("a.NavContentShowMore").hide()
					.end()
					.find("span.NavContentShowMore").show();
				});
			    $("a.NavContentShowNone",this).click(
				function(){
				    // Hide all visible content
				    $(this).parents("div.NavContentPart")
					.find("div.NavContentContent").show()
					.find("div.NavContentContentPart:visible:last")
					.slideUp("normal", function(){
						$(this).parents("div.NavContentContent")
						    .find("div.NavContentContentPart:visible")
						    .hide();
					    });				    
				    // Make more/all links visible
				    $(this).parent()
					.find("span.NavContentShowMore").hide()
					.end()
					.find("a.NavContentShowMore").show()
					.end()
				        .find("span.NavContentShowAll").hide()
					.end()
					.find("a.NavContentShowAll").show();
				    // Make less/none links invisible
				    $(this).hide().parent()
					.find("span.NavContentShowNone").show()
					.end()
					.find("a.NavContentShowLess").hide()
					.end()
					.find("span.NavContentShowLess").show();
				});
			});
	    });
}
 
 
function NavContentLoadContent(el) {
 
    if(!el) el=document;
 
    // Replace link with message on load-on-demand div's
    $("div.NavContentFrame div.NavContentPart div.NavContentContent.load-on-demand",el)
        .find("div.NavContentContentPart a:not(.new)")
	.hide()
	.siblings().show();
 
    // Load content
    $("div.load-on-demand",el).each(function(){
	    if(!$("a",this).hasClass("new")) {
		addr = $("a",this).attr("href");
                host = addr.split(/\/index.php/g)[0];
                addr = addr.split(/\/index.php/g)[1];
                if (/[\?\&]title\=/.test(addr)) {
                    addr = addr.match(/[\?\&]title\=[^\?\&]+/);
                    addr = addr[0].match(/([\?\&]title\=)([^\?\&]+)/);
                    addr = addr[2];
                }
                else {
                    addr = addr.slice(1);
                }
		$(this).load(host + "/index.php?action=ajax&rs=wfAjaxLoadContent&rsargs="
				 + addr,
		    {},
		    function(){
			runOnloadSubpagesHook(this);
			$(this).removeClass("load-on-demand");
		    });
	    }
    });
}