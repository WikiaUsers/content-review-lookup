/* <nowiki> */

/* ######################################################################## */
/* ### JavaScript here is loaded for all users and all skins.           ### */
/* ######################################################################## */


/* ######################################################################## */
/* ### ImportJS OVERRIDES                                               ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Overrides configurations of ImportJS modules.       ### */
/* ### Credit:      User:FWDekker                                       ### */
/* ######################################################################## */

// ArchiveTool changed their default values at some point.
// These lines revert it to the old values.
window.ArchiveToolConfig = { 
   archiveListTemplate: "Archives",
   archivePageTemplate: "Archivepage",
};


/* ######################################################################## */
/* ### SHARED CODE                                                      ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Used by multiple modules                            ### */
/* ### Credit:      various                                             ### */
/* ######################################################################## */

/**
 * Removes lazy loading from all images contained in `lazyIcon`.
 * 
 * By User:Sakaratte. 
 */
function removeLazyLoad(lazyIcon) {
    var lazyIconImages = lazyIcon.getElementsByTagName("img");
    for (var i = 0; i < lazyIconImages.length; i++) {
        var iconSrc = lazyIconImages[i].getAttribute("data-src");
        if (iconSrc !== null)
            lazyIconImages[i].setAttribute("src", iconSrc);
        lazyIconImages[i].className = "";
    }
}

/* ######################################################################## */
/* ### TITLE ICONS (Template:Games)                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Add icons to article title                          ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */
/* Commenting out titleIcons js since we no longer use it.
$(function() {
    if (window.wgIsMainpage)
        return;
    if (wgNamespaceNumber !== 0 && wgNamespaceNumber !== 4 && wgNamespaceNumber !== 110 && wgNamespaceNumber !== 502)
        return;
    if (skin !== "oasis" && skin !== "fandomdesktop")
        return;

    var wrapper = $("#va-titleicons-wrapper");
    var iconBar = $("#va-titleicons");
    var previewBar = $("#va-titleicons-preview");
    if (wrapper.length === 0 || iconBar.length === 0 || $("a", previewBar).length === 0)
        return;

    var articleDiv = $("#content");
    if (articleDiv.length > 0) {
        iconBar.css("display", "block");
        wrapper.prependTo(articleDiv);
    }

    $("#va-titleicons-more").append("<img width='0' height='0' class='va-titleicons-chevron' src='https://images.wikia.nocookie.net/common/skins/common/blank.gif'>");

    iconBar.hover(
        function() { $(this).addClass("va-titleicons-hover"); },
        function() { $(this).removeClass("va-titleicons-hover"); }
    );
    
    removeLazyLoad(document.getElementById("va-titleicons-preview"));
    removeLazyLoad(document.getElementById("va-titleicons-fullsize"));
});*/

/* ############################################################################# */
/* ### TICKER                                                                ### */
/* ### --------------------------------------------------------------------  ### */
/* ### Description: Displays a ticker, as in [[Template:Ticker]]             ### */
/* ### Credit:      unknown                                                  ### */
/* ###              User:FDekker                                             ### */
/* ############################################################################# */
$(function() {
    $(".ticker").each(function(_, ticker) {
        var step = 10;  // How many pixels to move text each tick
        var tickerSpeed = 200;
        
        ticker = $(ticker);
        
        if (ticker.attr('data-speed') !== undefined)
            tickerSpeed = parseInt(ticker.attr('data-speed'));
            
        if (ticker.attr('data-step') !== undefined)
            step = parseInt(ticker.attr('data-step'));
            
        ticker.css("display", "block");

        var wrapper = $(".tickerWrapper", ticker);
        wrapper.css("left", (step + ticker.width()) + "px");

        var text = $(".tickerText", ticker);
        var textWidth = text.outerWidth();

        setInterval(function() {
            var offset =
                (wrapper.position().left > -(textWidth + step))
                    ? (wrapper.position().left - step) + "px"  // Move left
                    : (ticker.width() + step) + "px";  // Reset
            wrapper.css("left", offset);
        }, tickerSpeed);
    });
});

/* ####################################################################################### */
/* ### Staff Images                                                                    ### */
/* ### --------------------------------------------------------------------            ### */
/* ### Description: Loads all of the latest staff images on the staff page.            ### */
/* ### URL: https://fallout.fandom.com/wiki/Fallout_Wiki:Administrators_and_moderators ### */
/* ### Credit:      User:TwoBearsHigh-Fiving                                           ### */
/* ###              User:FDekker                                                       ### */
/* ####################################################################################### */
$(function() {
    var placeholderClass = "user-image-placeholder";

    var placeholders = $("." + placeholderClass);
    if (placeholders.length === 0) 
        return;

    var users = placeholders
        .map(function(_, placeholder) { 
            return $(placeholder).attr("data-user");
        })
        .map(function(_, user) {
        	return user.replace(/@/g, "\"");
        })
        .toArray();
 
    $.ajax({
        url: "https://" + window.location.hostname + "/api/v1/User/Details",
        data: { "ids": users.join(",") },
        success: function(response) {
            response.items.forEach(function(item) {
            	var escapedName = item.name.replace(/"/g, "@");

            	$("." + placeholderClass + "[data-user]")
        			// Separate filter to support quotes in usernames
            		.filter(function() {
            			return $(this).data("user") === escapedName;
            		})
                    .each(function(_, placeholder) {
                        placeholder = $(placeholder);

                        var width = placeholder.attr("data-width");
                        var height = placeholder.attr("data-height");
                        if (width === undefined && height === undefined) {
                            width = "100px";
                            height = "100px";
                        } else if (width === undefined || height === undefined) {
                            width = width || height;
                            height = width || height;
                        }

                        placeholder.html(
                            "<img style='width: " + width + "; height: " + height + ";' " +
                                 "src='" + item.avatar + "'/>"
                        );
                    });
            });
        },
        dataType: "json"
    });
});

/* ##################################################################################### */
/* ### Notable content                                                               ### */
/* ### --------------------------------------------------------------------          ### */
/* ### Description: Create a collapsible template where mw-collapsible is not        ### */
/* ###              suitable to use.                                                 ### */
/* ### URL: https://fallout.fandom.com/wiki/Fallout_Wiki:Notable_content/draft       ### */
/* ### Credit:      User:Sakaratte                                                   ### */
/* ##################################################################################### */

$(function() {
    var collapseCaption = "Less";
    var expandCaption = "More";

    document.querySelectorAll(".np-collapsible").forEach(function(collapsible) {
        removeLazyLoad(collapsible);

        var collapsed = collapsible.querySelector("#np-collapsed");
        var helip = collapsible.querySelector("#np-helip");
        helip.innerHTML = expandCaption;
        helip.addEventListener("click", function(e) {
            var navState = helip.innerHTML;
            var navClassList = collapsed.classList;

            if (navState == expandCaption) {
                navClassList.add("np-visible");
                navClassList.remove("np-hidden");
                helip.innerHTML = collapseCaption;
            } else {
                navClassList.remove("np-visible");
                navClassList.add("np-hidden");
                helip.innerHTML = expandCaption;
            }
        });
    });
});

/* ##################################################################################### */
/* ### Global File Usage                                                             ### */
/* ### ----------------------------------------------------------------              ### */
/* ### Description: lists all pages in all language sections where the file is used  ### */
/* ### Credit:      User:Alex6122                                                    ### */
/* ##################################################################################### */
window.globalFileUsageConfig = {
    'lang': ['bg','de','en','es','fi','fr','hu','it','ja','ko','lt','nl','pl','ru','pt-br','sv','tr','uk','zh'],
    'auto_show': false,
    'on_delete': true
};

/* ##################################################################################### */
/* ### Mod table column toggles                                                      ### */
/* ### ----------------------------------------------------------------------------  ### */
/* ### Description: Hides/unhides Resources & Form ID cols when a div is clicked     ### */
/* ### Credit:      User:Scratchy1024                                                ### */
/* ##################################################################################### */
var toggleResourcesArray = document.getElementsByClassName("resourcesToggle"); //get array of resource toggle spans
for (var ac = 0, resourceSpan; (resourceSpan = toggleResourcesArray[ac]); ac++) { //for each span
  resourceSpan.addEventListener("click", function () { //add an event listener, execure the following code on event
    var tableArray = document.getElementsByClassName("mod-fallout76"); //get all mod tables
    for (var tc = 0, table; (table = tableArray[tc]); tc++) { //for each mod table
      for (var hc = 0; hc < table.rows[2].cells.length; hc++) { //for every header
        if (table.rows[1].cells[hc].classList.contains("resourcesHeader")) { //check if resource header
          var resCol1 = hc; //assign column number to var
        }
      }
      for (var jc = 1; jc < table.rows.length; jc++) { //for every row in the column (start at index 1 to hide headers)
        if (table.rows[jc].cells[resCol1]) { //if cell exists
          if (table.rows[jc].cells[resCol1].style.display === "none") { //if not visible
            table.rows[jc].cells[resCol1].style.display = ""; //make visible
          } else { //else visible
            table.rows[jc].cells[resCol1].style.display = "none"; //make not visible
          }
        }
      }
    }
    for (var bc = 0, resourceSpan; (resourceSpan = toggleResourcesArray[bc]); bc++) { //get array of resource toggle spans
      if (resourceSpan.innerHTML === "show resources") {
        resourceSpan.innerHTML = "hide resources"; //update display text
      } else {
        resourceSpan.innerHTML = "show resources"; //update display text
      }
    }
  });
}

var toggleFormIDArray = document.getElementsByClassName("formIDToggle");
for (var ad = 0, formIDSpan; (formIDSpan = toggleFormIDArray[ad]); ad++) {
  formIDSpan.addEventListener("click", function () {
    var tableArray = document.getElementsByClassName("mod-fallout76"); //get all mod tables
    for (var td = 0, table; (table = tableArray[td]); td++) {
      for (var hd = 0; hd < table.rows[2].cells.length; hd++) {
        if (table.rows[1].cells[hd].classList.contains("formIDHeader")) {
          var IDCol1 = hd;
        }
      }
      for (var jd = 1; jd < table.rows.length; jd++) {
        if (table.rows[jd].cells[IDCol1]) {
          if (table.rows[jd].cells[IDCol1].style.display === "none") {
            table.rows[jd].cells[IDCol1].style.display = "";
          } else {
            table.rows[jd].cells[IDCol1].style.display = "none";
          }
        }
      }
    }
    for (var bd = 0, formIDSpan; (formIDSpan = toggleFormIDArray[bd]); bd++) {
      if (formIDSpan.innerHTML === "show IDs") {
        formIDSpan.innerHTML = "hide IDs";
      } else {
        formIDSpan.innerHTML = "show IDs";
      }
    }
  });
}

$(function() { //hide resources and Form ID rows on load
var tableArray = document.getElementsByClassName("mod-fallout76"); //get all mod tables
for (var tb = 0, table; (table = tableArray[tb]); tb++) { //for each mod table
  for (var hb = 0; hb < table.rows[1].cells.length; hb++) { //for every cell in the header row (row 1)
    if (table.rows[1].cells[hb].classList.contains("resourcesHeader")) { //if the cell has this class
      var resCol = hb; //save that class in a variable
    }
    if (table.rows[1].cells[hb].classList.contains("formIDHeader")) { //if the cell has this class)
      var IDCol = hb; //save that class in a variable
    }
  }
  for (var jb = 1; jb < table.rows.length; jb++) {//for every row (start at 1 to hide headers)
    if (table.rows[jb].cells[resCol]) { //check if cell exists
    table.rows[jb].cells[resCol].style.display = "none"; //make resources not visible
    }
    if (table.rows[jb].cells[IDCol]) { //check if cell exists
    table.rows[jb].cells[IDCol].style.display = "none"; //make Form ID not visible
    }
  }
}
});