/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
   type: "script",
   articles: [
       "w:c:dev:Countdown/code.js"
   ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'This refreshes the page automatically';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('InactiveUsers/code.js', 'dev');

InactiveUsers = { months: 2 };

/* Code for OA image maps */
$(document).ready(function() {
	if (mw.config.get("wgCategories").includes("OA")) {
		window.setInterval(function() {
			$(".OA-box").hide();
			var url = window.location.href;
			var id = url.split("#")[1];
			$("#OA-box-" + id).show();
		}, 100);
	}
});

/* April fools
Randomizes all the text and buttons on the Main Page
*/
if (mw.config.get("wgPageName") == "Cytus_Wiki" && mw.config.get("wgAction") == "view" && ((new Date()).toUTCString().includes("1 Apr") && !((new Date()).toUTCString().includes("11 Apr") || (new Date()).toUTCString().includes("21 Apr") || (new Date()).toUTCString().includes("31 Apr")))) {
	$(document).ready(function() {
		$(".WikiaPage span:not(:has(*)), .WikiaPage div:not(:has(*)), .WikiaPage a:not(:has(*)), .WikiaPage p:not(:has(*)), .WikiaPage h1:not(:has(*)), .WikiaPage b:not(:has(*)), .WikiaPage h2:not(:has(*)), .WikiaPage h3:not(:has(*)), .WikiaPage i:not(:has(*)), .WikiaPage u:not(:has(*)), #mw-content-text, button, .license-description").each(function() {
		    var text = $(this).html();
		    var splittext = text.split("");
		    var on = true;
		    for (var i = 0; i < splittext.length; i++) {
		        if (splittext[i] == "<") {
		            on = false;
		        } else if (splittext[i] == ">") {
		            on = true;
		            continue;
		        }
		        if (on) {
		            var temp = String.fromCharCode(Math.random() * (0xFFFF));
		            splittext[i] = temp;
		        }
		    }
		    $(this).html(splittext.join(""));
		});
		$(".WikiaPage").find("span, a, h1, h2, h3, h4, h5, h6, h7, header, div, button, input").each(function() {
			try {
			    var text = $(this).attr("title");
			    var splittext = text.split("");
			    var on = true;
			    for (var i = 0; i < splittext.length; i++) {
			        if (on) {
			            var temp = String.fromCharCode(Math.random() * (0xFFFF));
			            splittext[i] = temp;
			        }
			    }
			    $(this).attr("title", splittext.join(""));
			} catch (error) {
			
			}
		});
		$(".WikiaPage").find("span, a, h1, h2, h3, h4, h5, h6, h7, header, div, button, input").each(function() {
			try {
			    var text = $(this).attr("value");
			    var splittext = text.split("");
			    var on = true;
			    for (var i = 0; i < splittext.length; i++) {
			        if (on) {
			            var temp = String.fromCharCode(Math.random() * (0xFFFF));
			            splittext[i] = temp;
			        }
			    }
			    $(this).attr("value", splittext.join(""));
			} catch (error) {
			
			}
		});
	});
}