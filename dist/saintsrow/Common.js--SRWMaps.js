/* Saints Row Wiki Maps, by 452. v1.0.11
Created in response to Wikia Maps being abandoned with no updates or fixes in over 6 months.
Of course, the irony is that hardly anyone uses this, and I have gone years between updates because of it.
The difference is that I am one person, not a multi-million dollar corporation.

v1.0 includes most features of Special:Maps

 * Unlike Wikia Maps, [[wikilinks]] in descriptions are clickable links
 * Unlike Wikia Maps, only certain Categories are displayed by default
 * Unlike Wikia Maps, it is possible to import data.
 * Unlike Wikia Maps, it is possible to rollback the map.
 * Unlike Wikia Maps, there is confirmation before deleting categories.
 * Unlike Wikia Maps, categories cannot be deleted when pins exist.
 * Unlike Wikia Maps, info is shown on hover
 * Unlike Wikia Maps, Pins can have custom pin icons instead of only the category icon
 * Unlike Wikia Maps, images are specified separately to linked pages
 * Unlike Wikia Maps, changes are only saved when requested.
 * Unlike Wikia Maps, Pins will be able to have multiple categories. (status: Pending)

After the release of v1.0, I will manually create custom Maps for all existing Special:Maps, as there is not yet a Map creator .

Road map for v1.0:
 * v0.01 Load Data : Done! (2015-08-24)
 * v0.02 Show Map : Done! (2015-08-24)
 * v0.03 Load Full Map in background : Done! (2015-08-24)
 * * Show progress? No, this is currently impossible.  onprogress doesn't work, there's no way to get current/total bytes, or current loaded dimensions.  The only way is an XHR request, which is impossible as the image server is same-origin only.
 * v0.04 Zoom buttons : Done! (2015-08-25)
 * v0.05 Center when zooming : Done! (2015-08-27)
 * v0.06 Zoom - double click / shift click : Done! (2015-08-28)
 * v0.07 Move - click to center : Done! (2015-08-28)
 * Move - arrows : ...functional by default.
 * v0.08 Display Pins : Done! (2015-08-29)
 * v0.09 Hover Pin name : Done! (2015-08-29)
 * v0.10 Display Pin info on click : Done! (2015-09-30)
 * v0.11 Display Cat list: Done! (2015-09-01)
 * v0.12 Functional Cat list: Done! (2015-09-02)
 * v0.13 Map index template (2015-09-07)
 * v0.14 Embedding, and read-only embedding (2015-09-07)
         Cat Edit Interface:
 * v0.15 **Display info : Done (2015-09-04)
 * v0.16 **Edit         : Done (2015-09-05)
 * v0.17 **Mark Dirty   : Done (2015-09-05)
 * v0.18 **Validation   : Done (2015-09-06)
 * v0.19 **Load image from linked page: Done. (2015-09-06)
 * v0.20 **Update icon  : Done. (2015-09-07)
 * v0.21 **Create       : Done. (2015-09-07)
 * v0.22 **Delete       : Done. (2015-09-07)
         Pin Edit Interface
 * v0.23 **Display info : Done (2015-09-12)
 * v0.24 **Edit         : Done (2015-09-14)
 * v0.25 **Mark Dirty   : Done (2015-09-14)
 * v0.26 **Validation   : Done (2015-09-14)
 * v0.27 **Linked Image : Done (2015-09-14)
 * v0.28 **Update icon  : Done (2015-09-15)
 * v0.29 **Reset icon   : Done (2015-09-15)
 * v0.30 **Delete       : Done (2015-09-15)
 * v0.31 **Create       : Done (2015-09-21)
 * v0.32 **Prevent close: Done (2015-09-21)
 * v0.33 **Change cat   : Done (2015-09-21)
 * v0.34 Save all dirty data: Done! (2015-09-22)

Known issues:
 * Originally, the map was recentered when clicking a pin, but I've changed this so it only recenters when clicking the map.  However, this now means that the pin info flipcheck is performed before the image is loaded, sometimes resulting in the top of the pin info being outside the top of the screen.  To-do: attach a load event to the image.
 * 1 feature delayed: map creation interface to be implemented later (see below)
 * Deleting categories probably does weird things with CatOrder
 * Detect escape key to cancel any current action
 * Enabling category default checks it in category selector but doesn't reveal pin on the map
 * Firefox sucks.
 * What happens if 2 people are editing at the same time?  Does the save function check for edit conflicts?  ... No, it just appends to the page, which can result in duplicate pinids.  Solution: use temp pin ids, starting from pintemp1. on save: get page, renumber all uses of temp pins starting at the new most recent pin, then write to page.  Can potentially just do the replacement after converting dirty pins  to string, then reload the page after saving?  possible issue: unsure how agnostic pin handling functions are in regard to pinid format.  it should be neutral, but could potentially require "pin#". 
* Cats hidden by default are sometimes shown - Pin39 at Wardill Airport are in both category "misc" and "stairs", and while "stairs" are hidden, "misc" is not.  Additional consideration needs to be given to whether multiple cats are necessary, and how to prioritise hidden cats.  But in this specific case, "misc" is supposed to be deleted from pin39, so this is still a bug.  fixed?
* Changing category image does not change default image on existing pins. This indicates that the pin image is saved for each pin. Solve by not copying pin image to pin on creation, leave blank and refer to pin image when loading - do not copy, just look up category image. Also solve by looping existing pins when the category image is changed.
* Pin numbering messes up when previous deleted pins are purged, because it just counts the pins, and ignores the max pin number.  Solution:  Find the highest pin number on load, and increment from that.
* to-do: When creating and immediately deleting a pin, skip delete pin entry
* to-do: validate manual links in addition to main link
* to-do: add close link when editing
* to-do: abandon changes confirmations for edits
* to-do: trim whitespace


Solved issues:
 * v1.0.1 Pin icons now update when default category icon is changed - fixed to loop through all pins in that category to check if they use the default pin and update.
 * v1.0.2 Map now resizes when browser is resized - fixed to recalculate width of scrolling div.
 * v1.0.3 Pins in corners info obscured - fixed with padding div
 * v1.0.4 fixed save order, wipe dirty array on save
 * v1.0.5 fixed defaults overwriting changes, fixed cursor, positioning issue
 * v1.0.6 fixed new pin positioning issue, coloured errors
 * v1.0.7 parentheses added to valid characters, new edittoken obtained when old one expires
 * v1.0.8 removed zoom controls in Firefox, because Firefox sucks. (See "Known issues")
 * v1.0.9 warn when leaving without saving
 * v1.0.10 Resize height on resize, centers correctly after resize, doesn't recenter on pin click, scrolls to map top on click
 * v1.0.11 Several logic problems regarding hiding cats (When you display a cat hidden by default, then open and close the cat editor, the cat list reset the cat to hidden.  Bug originally introduced in v0.28/29.  Cause was renaming poorly named variables, and a missed variable rename.  and then, "false" != false)


v2.0 will include most suggestions I've made to Wikia, which are general usability improvements.

Extended features v1.x -> v2.0
 * v1.0x URL parameters:  centerX, centerY, Zoom level, Tags
 * v1.0x Pins can be "Tagged" with multiple categories (status: Partial)
 * v1.0x Move existing Pin - ctrl click?
 * v1.0x Clone existing Pin - alt click?
 * v1.0x Re-arrange cat order
 * v1.0x Category intersection
 * v1.0x Search/Highlight - by title, link, description
 * v1.0x Show only new pins?  Add default category of "new"?  No category, add separate popup menu with list of newest pins in reverse order with dates?    Define new?  How many?  1 week?
 * v1.0x Show only dirty pins?  Highlight dirty by default.  Easy.
 * v1.0x Show recently deleted pins?  Deleted pins are not currently displayed at all requires minor rewriting to displayed deleted as hidden category.  This will also facility in-map undeletion, instead of just rolling back changes.
 * v1.0x improve edit summary to list actions. (createPin, CreateCat, EditCat, EditPin, DeletePin, DeleteCat)
 * v1.0? Specify Pin width? ...currently unnecessary, but will be implemented if ever necessary.
 * v1.0x Specify map background colour ... redundant, as no surrounding is currently shown.
 * v1.0x Specify alternate inactive icon ... replaced by N/A symbol.

At this stage, if I have not already done so, I will replicate all Special:Maps maps and deactivate that feature.

After v2.0, and after transferring all map data, v2.? updates are mostly behind the scenes and admin features.

Extended features v2.x
 * v2.1 Purge outdated data - rewrites entire data page
 * v2.2 "New map" creator
 * v2.3 Embed and popup in articles (Via include, so WhatLinksHere works.)
        **Partial - full map and read-only embedding works. preview and popup pending
 * v2.4 Pin reuse across maps: Click "Load Pins" > display list of maps > select one > import as new pins
 * v2.? Research coloured regions, hover area name: https://github.com/kemayo/maphilight/blob/master/jquery.maphilight.js
 * v2.? Investigate merging validation functions.
 * v2.? UI for manually editing hidden values such as X and Y
 * v2.? mass check images exist

 * v2.? Easy rollback interface... otherwise known as the normal rollback button.  I can't think of a single reason to use a custom rollback

This list of features includes most suggestions I've previously made to Wikia, and I'm sure more features will occur to me during development.  Additional features will be added to the extended features section, unless they're simple and greatly increase usability.

*/

function createContainer() {
  $("#SRWmap").prepend(
    $("<div>", { id:"Controls", title:"" })
    .append(
        $("<div>", { id:"Progress", title:"Loading status" })
    ).append(
      $("<button>", {
        id:"SaveButton",
        title:"Save changes",
        class:"MapControls",
        html:"Save"
      }).hover( function() {
        $("#MapInfo").html("Click to save");
       }, function() {
        $("#MapInfo").html(" ");
      }).bind("click", function() {
        if ($(".unvalidatedPin").size()) {
          mapError("Pin must be completed or deleted.");
          return;
        }
        if($(".NewCat .failed").size() || $(".NewCat .pending").size()) {
          mapError("Category must be completed or deleted.");
          return;
        }
        savestring = "";
        for (i in SRW.Map.dirty)
          for (j in SRW.Map.dirty[i])
            savestring += "\n"+JSON.stringify(SRW.Map.dirty[i][j]);

        $("#Progress").html("Saving.");

        $.ajax({
          type: "POST",
          url: "/api.php",
          data: {
            format:"json",
            action:"edit",
            title:$("#SRWmap").attr("title"),
            token:mw.user.tokens.get("editToken"),
            summary: "Updating "+(savestring.match(/\n/g) || []).length+" items",
            appendtext: savestring,
            minor:1,
          },
          'success': function(result) {
            if (result.error) {
              $("#Progress").html("Error!");
              console.log(result);

              if (result.error.code == "badtoken") {
                $.ajax({
                  type: "POST",
                  url: "/api.php",
                  data: {
                    format: "json",
                    action: "query",
                    titles: wgPageName,
                    prop: 'info',
                    intoken: 'edit',
                  },
                  'success': function(result) {
                    mw.user.tokens.set("editToken", result.query.pages[Object.keys(result.query.pages)].edittoken);
                    console.log("Edit token expired, new token obtained");
                    $("#SaveButton").click();
                  }
                });
              }
            } else {
              $("#Progress").html("Saved!");
              SRW.Map.clean();
            }
          }
        });
      })
    ).append(
      $("<button>", {
        id:"ZoomOut",
        title:"Zoom Out",
        class:"MapControls",
        html:" Z- "
      }).hover( function() {
        $("#MapInfo").html("Click to zoom out")
       }, function() {
        $("#MapInfo").html(" ");
      }).bind("click", function() {
        zoom(-1);
      })
    ).append(
      $("<div>", {
        id:"ZoomLevel",
        title:"Zoom Level",
        class:"MapControls",
      })
    ).append(
      $("<button>", {
        id:"ZoomIn",
        title:"Zoom In",
        class:"MapControls",
        html:" Z+ "
      }).hover( function() {
        $("#MapInfo").html("Click to zoom in")
       }, function() {
        $("#MapInfo").html(" ");
      }).bind("click", function() {
        zoom(1);
      })
    ).append(
      $("<button>", {
        id:"NewPin",
        title:"New Pin",
        class:"MapControls",
        html:$("<img>", { src:"https://vignette.wikia.nocookie.net/saintsrow/images/5/5e/Ui_map_marker.png" })
      }).hover( function() {
        if ($("#ClickLayer").size()) $("#MapInfo").html("Click to cancel new pin placement");
        else $("#MapInfo").html("Click to place new pin");
       }, function() {
        $("#MapInfo").html(" ");
      }).bind("click", function() {
        if ($("#ClickLayer").size()) {
          $("#ClickLayer").remove();
          $("#MapInfo").html("New pin cancelled.");
          return;
        };
        if ($(".unvalidatedPin").size()) {
          mapError("Pin must be completed or deleted.");
          return;
        }
        if($(".NewCat .failed").size() || $(".NewCat .pending").size()) {
          mapError("Category must be completed or deleted.");
          return;
        }
        $("#CatBoxTitle").prop("checked", false);
        $("#MapInfo").html("Click on map to place new pin");
        $("#MapZoom").append(
          $("<div>", {
            id:"ClickLayer",
            title:"Click to place pin",
            style:"position: absolute;z-index: 2;top: 0;cursor:crosshair",
            width:SRW.Map.width,
            height:SRW.Map.height
          }).bind("click", function(e) {
            PinID = "Pin"+(Object.keys(SRW.Pins).length+1);
            SRW.Pins[PinID] = new Pin({
              ID:PinID,
              X:Math.round(e.offsetX/getZoom())+"",
              Y:Math.round(e.offsetY/getZoom())+""
            });
            dirty("Pins",PinID,"X");
            dirty("Pins",PinID,"Y");
            showPin(SRW.Pins[PinID]);
            $("#"+PinID).removeClass("hiddenPin");
            $("#"+PinID+" .pinCenter").css("zoom",1/getZoom())
            pinclick($("#"+PinID));
            $("#"+PinID).addClass("unvalidatedPin");
            $("#PinEdit").trigger("click");
            $("#ClickLayer").remove();
          })
        )
      })
    ).append(
      $("<div>", { id:"MapInfo", html:" ", title:"Current area" })
    )

  ).append(
    $("<div>", {
      id:"MapScroll",
      title:"", //this pops up in strange places
      width:$(".page-content").width(),
      height:$(".page-content").width()*3/4,
    }).append(
      $("<div>", {
        id:"MapPadding",
        title:"Out of bounds",
      }).append(
        $("<div>", {
          id:"MapZoom",
          title:"",
        })
      )
    ).bind("click", function(e) {
      if (["MapFull","MapSmall"].indexOf(e.target.id) == -1) return;
      if ($(".unvalidatedPin").size())
        mapError("Pin must be completed or deleted.");
      else
        $("#PinInfo").remove();
      if(SRW.Map.doubleclick) {
        if (e.shiftKey) zoom(-1,1); else zoom(1,1);
      } else {
        SRW.Map.setCenter(e.offsetX, e.offsetY);
        reCenter();
      }
      SRW.Map.doubleclick = true;
      SRW.Map.doubleclickTimeout = setTimeout(function() {SRW.Map.doubleclick = false;}, 400);
    }).bind("scroll", function() {
      if ($("#PinInfo").length) flipCheck();
    })
  );
}
function reCenter() {
  $(window).scrollTop($("#SRWmap").offset().top-60);
  $("#MapScroll").scrollLeft(SRW.Map.padding+Math.round(SRW.Map.centerX*getZoom())-(SRW.Map.viewWidth/2));
  $("#MapScroll").scrollTop(SRW.Map.padding+Math.round(SRW.Map.centerY*getZoom())-(SRW.Map.viewHeight/2));
}
function getZoom() {
  return (SRW.Map.viewWidth+(SRW.Map.width-SRW.Map.viewWidth)*SRW.Map.zoomLevel/SRW.Map.zoomLevels)/SRW.Map.width;
  //this there a simpler way to do this?
}
function updateZoom() {
  $(".pinCenter").css("zoom",1/getZoom())
  $("#ZoomLevel").html(SRW.Map.zoomLevels+1-SRW.Map.zoomLevel);
  if (SRW.Map.zoomLevel == 0) $("#ZoomOut").addClass("noCursor"); else $("#ZoomOut").removeClass("noCursor");
  if (SRW.Map.zoomLevel == SRW.Map.zoomLevels) $("#ZoomIn").addClass("noCursor"); else $("#ZoomIn").removeClass("noCursor");
}
function zoom(crement, noCenter) {
  if(!noCenter) SRW.Map.setCenter();
  if (navigator.userAgent.indexOf("Firefox") != -1) {  //temp fix because firefox sucks
    crement = 0; 
    $("#ZoomIn").remove();
    $("#ZoomOut").remove();
    $("#ZoomLevel").remove();
  }

  SRW.Map.zoomLevel += crement;
  if (SRW.Map.zoomLevel < 0) SRW.Map.zoomLevel = 0;
  if (SRW.Map.zoomLevel > SRW.Map.zoomLevels) SRW.Map.zoomLevel = SRW.Map.zoomLevels;
  $("#MapZoom").css("zoom", getZoom());
  reCenter();
  $("#PinInfoInner").css("zoom",1/getZoom());
  updateZoom();
}
function dirtyTag(cat, pin, state) {
  $("#SRWmap").addClass("dirty");
  $("#Progress").html("Unsaved changes.");

  if (typeof SRW.Map.dirty["Tags"] == "undefined") SRW.Map.dirty["Tags"] = {};
  TagID = "Tag"+Object.keys(SRW.Map.dirty["Tags"]).length;
  SRW.Map.dirty["Tags"][TagID] = {"ID":"Tag", "cat":cat, "pin":pin};
  if (state) SRW.Map.dirty["Tags"][TagID]["state"] = state;
}

function dirty(what, which, where) {
  $("#SRWmap").addClass("dirty");
  $("#Progress").html("Unsaved changes.");

  if (typeof SRW.Map.dirty[what] == "undefined") SRW.Map.dirty[what] = {};
  if (typeof SRW.Map.dirty[what][which] == "undefined") SRW.Map.dirty[what][which] = {};
  SRW.Map.dirty[what][which]["ID"] = which;
  SRW.Map.dirty[what][which][where] = (SRW[what][which][where]+"").split("/saintsrow/images/").pop();
}

function SRWMap(params) {

  //Map|name|5/55/Stilwater_SR1.png|3000|3406
  vars = ["name", "image", "width", "height", "small", "viewWidth", "viewHeight", "centerX", "centerY", "full"];
  for(i in vars) this[vars[i]] = "";
  this.zoomLevel=0;
  this.zoomLevels=5;
  this.dirty = {};
  this.iconPostfix = "/revision/latest/thumbnail-down/width/48/height/36";
  this.imagePostfix = "/revision/latest/thumbnail-down/width/150/height/84";
  this.imagePinPostfix = "/revision/latest/thumbnail-down/width/200/height/200";
//old kludge fix stopped working at some point, thanks wikia. https://saintsrow.fandom.com/wiki/MediaWiki:Common.js/SRWMaps.js?diff=next&oldid=342873
  this.filePrefix = "https://vignette.wikia.nocookie.net/saintsrow/images/";
  this.padding=500;

  this.clean = function(){
    $("#SRWmap").removeClass("dirty");
    this.dirty = { Cats:{}, Pins:{}, Tags:{} };
  }
  this.setParams = function(params) {
    this.setval("name", params, 1);
    this.setval("image", params, 1);
    this.setval("width", params, 1);
    this.setval("height", params, 1);

    this.image = this.filePrefix+this.image;
    this.small = this.image+"/revision/latest/scale-to-width-down/"+Math.floor($(".page-content").width());
    this.centerX=this.width/2;
    this.centerY=this.height/2
    this.clean();
  }
  this.setval = function(field, params) {
    if(params[field]) this[field] = params[field].trim();
  }

  this.setCenter=function(X, Y, Z) {
    if (!X) X = $("#MapScroll").scrollLeft()+(SRW.Map.viewWidth/2)-SRW.Map.padding;
    if (!Y) Y = $("#MapScroll").scrollTop()+(SRW.Map.viewHeight/2)-SRW.Map.padding;
    if (!Z) X = X/getZoom();
    if (!Z) Y = Y/getZoom();
    SRW.Map.centerX = Math.round(X);
    SRW.Map.centerY = Math.round(Y);
  }

  this.load=function(which) {
    if(which == "small") {
      $("#MapZoom").append(
        $("<img>", {
          id:"MapSmall",
          src:this.small,
          width:this.width,
          height:this.height,
        }).attr("data-title",this.name).attr("title","")
      ).css("zoom",($(".page-content").width()-16)/this.width);
    } else if(which == "full") {
      $("#Progress").html("Loading...");
      $("#MapSmall").after(
        $("<img>", {
          id:"MapFull",
          src:this.image, //+'?q=' + Math.random(),
          width:this.width,
          height:this.height,
        }).attr("data-title",this.name).attr("title","")
        .bind("load", function() {
          $("#Progress").html("Loaded.");
        }).bind("error", function() {
          alert("Full image failed to load");
        }).hover(
          function(e) { $("#MapInfo").html($(e.target).attr("data-title")) }
        )
      );
    }
  }
  this.setParams(params);
  this.load("small");
}
function Cat(params) {
  //Cat|Cat1|Test Cat|Map|7/76/Ui_act_question.png|3/37/Hangar_18.5_Hatch.jpg||1|452
  vars = ["ID", "name", "link", "icon", "image", "displayed", "order", "deleted"];
  for(i in vars) this[vars[i]] = "";

  this.ID = params.ID;
  this.pins = [];

  this.setParams = function(params) {
    this.setval("name", params, 1);
    this.setval("link", params, 1);
    this.setval("icon", params, 1);
    this.setval("image", params, 1);
    this.setval("displayed", params, 1);
    this.setval("order", params, 1);
    this.setval("deleted", params, 1);

    if (this.icon) this.icon = SRW.Map.filePrefix+this.icon.split("/saintsrow/images/").pop();
    if (this.image) this.image = SRW.Map.filePrefix+this.image.split("/saintsrow/images/").pop();

    if (this.order) SRW.CatOrder[this.order] = this.ID;
  }

  this.setval = function(field, params) {
    if(params[field]) this[field] = params[field].trim();
    if(this[field] == "false") this[field] = false;
  }
  this.addPin = function(pinID) {
    this.pins[pinID] = 1;
  }
  this.delPin = function(pinID) {
    this.pins[pinID] = 0; //check this.  yeah, that didn't work.
    delete this.pins[pinID];
  }
  this.setParams(params);
}
function Pin(params) {
  //Pin|1 Pin1|2 First test|3 This is a test, here's a link to [[Map]]|4 500|5 1000|6 Cellphone|||452
  vars = ["ID","name", "desc", "X", "Y", "link", "icon", "image", "deleted"];
  for(i in vars) this[vars[i]] = "";

  this.ID = params.ID;
  this.cats = [];

  this.setParams = function(params) {
    this.setval("ID", params, 1);
    this.setval("name", params, 1);
    this.setval("desc", params, 1);
    this.setval("X", params, 1);
    this.setval("Y", params, 1);
    this.setval("link", params, 1);
    this.setval("icon", params, 1);
    this.setval("image", params, 1);
    this.setval("deleted", params, 1);

    if (this.icon) this.icon = SRW.Map.filePrefix+this.icon.split("/saintsrow/images/").pop();
    if (this.image) this.image = SRW.Map.filePrefix+this.image.split("/saintsrow/images/").pop();
  }
  this.setval = function(field, params, override) {
    if ((this[field] == "" || override) && params[field]) this[field] = params[field].trim();
  }

  this.addCat = function(catID, override) {
    if (override) this.cats.unshift(catID);
    else this.cats.push(catID);

    tempCat = SRW.Cats[this.cats[override && this.cats[1]?1:0]];
    for(i in {link:"", icon:"", image:""}) {
      this.setval(i,  SRW.Cats[this.cats[0]], this[i] == tempCat[i]);
    }
  }
  this.delCat = function(catID) {
    if (this.cats.indexOf(catID) != -1) this.cats.splice(this.cats.indexOf(catID), 1);
  }

  this.setParams(params);
}
function editCats() {
  if ($(".unvalidatedPin").size()) {
    mapError("Pin must be completed or deleted.");
    return;
  }
  $("#MapScroll").append(
    $("<div>", {id:"CatEditBox"})
    .append(
      $("<button>", {
        id:"CatEditClose",
        class:"PinButton",
        title:"Close category editor",
        html:"close"
      }).bind("click", function(){
        if($(".NewCat .failed").size() || $(".NewCat .pending").size()) {
          mapError("Category must be completed or deleted.");
        } else if (!$("#CatEditDone.pending").size() && !$("#CatEditDone.failed").size() && !$("#CatEditDone.ok").size()) {
          //no changes, no reload
          $("#CatEditBox").remove();
        } else {
          $("#CatEditBox").remove();
          $("#CatBox").remove();
          showCats(1);
        }
      })
    )
    .append($("<div>", {id:"CatEditList", style:"max-height:"+Math.floor($("#MapScroll").height()*0.80)+"px" }) )
    .append(
      $("<button>", {
        id:"CatEditNew",
        class:"PinButton",
        title:"New Category",
        html:"new"
      }).bind("click", function() {
        CatID = "Cat"+(Object.keys(SRW.Cats).length+1);
        SRW.CatOrder.push(CatID);
        SRW.Cats[CatID] = new Cat({ID:CatID, order:(SRW.CatOrder.length-1)+""});
        dirty("Cats",CatID,"order");
        showEditCat(CatID);
        $("#edit"+CatID).addClass("NewCat");
        $("#icon"+CatID).val( "Ui_map_quest.png");
        $("#CatEditDone").click();
      })
    )
    .append(
      $("<button>", {
        id:"CatEditDone",
        class:"PinButton",
        title:"Validate changes",
        html:"validate"
      }).bind("click", function() {
        $("#CatEditDone").addClass("nothing").removeClass("ok").removeClass("failed"); //reset
        for(CatOID in SRW.CatOrder) {
          CatID = SRW.CatOrder[CatOID];
          cat = SRW.Cats[CatID];
          if (cat.deleted) continue;
          vars = ["name", "link", "icon", "image", "displayed"];
          for(j in vars) {
            field = vars[j];
            target = "#edit"+CatID+" #"+field+CatID;
            $(target).removeClass("pending").removeClass("failed").removeClass("ok"); //reset

            if ($(target).prop("type") == "text") $(target).val( $(target).val().trim());

            if ($(target).prop("type") == "checkbox") {
              /* No validation for checkbox */
              if ($(target).prop("checked") !== Boolean(cat[field])) {
                SRW.Cats[CatID][field] = Boolean($(target).prop("checked"))+"";
                dirty("Cats",CatID,field);
              }
            } else if (field == "icon" || field == "image") {
              /* Image validation done via API, strip url and file: parts. */
              if (field == "icon" && !$(target).val()) {
                $(target).addClass("failed");
                $("#CatEditDone").addClass("failed");
                continue;
              }
              if ($(target).val() !== decodeURIComponent(cat[field].split("/").pop())) {
                $(target).addClass("pending");
                $("#CatEditDone").removeClass("nothing").addClass("pending");
                if (field == "image" && !$(target).val()) { /* allow blank image */
                  $(target).removeClass("pending").addClass("ok");
                  if (!$("#CatEditBox input.pending").size()) $("#CatEditDone").removeClass("pending").addClass("ok");

                  SRW.Cats[CatID]["image"] = "";
                  dirty("Cats",CatID,field);
                  $("#edit"+CatID+" #"+field+"Preview").attr("src","");
                  continue;
                }
                if ($(target).val().indexOf("/revision/latest/") != -1)
                  $(target).val( $(target).val().split("/revision").shift());
                if ($(target).val().indexOf("http://") != -1)
                  $(target).val( decodeURIComponent($(target).val().split("/").pop()));
                if ($(target).val().indexOf("https://") != -1)
                  $(target).val( decodeURIComponent($(target).val().split("/").pop()));
                if ($(target).val().toLowerCase().indexOf("file:") != -1)
                  $(target).val( $(target).val().split("[Ff]ile:").pop());

                if ($(target).val())
                $.getJSON('/api.php?action=imageserving&format=json&wisTitle=File:'+encodeURIComponent($(target).val())+'&requestid='+CatID+'|'+field)
                .always(function (data) {
                  if (typeof data.responseJSON != "undefined") data.requestid = data.responseJSON.requestid;
                  CatID = data.requestid.split("|")[0];
                  field = data.requestid.split("|")[1];
                  target = "#edit"+CatID+" #"+field+CatID;

                  if (data.statusText == "error" || typeof data.image == "undefined" || typeof data.image.error != "undefined") {
                    $(target).removeClass("pending").addClass("failed");
                    $("#CatEditDone").removeClass("pending").removeClass("ok").addClass("failed");
                  } else {
                    $(target).removeClass("pending").removeClass("failed").addClass("ok");
                    if (!$("#CatEditBox input.pending").size()) $("#CatEditDone").removeClass("pending").addClass("ok");
                    newImage = SRW.Map.filePrefix+data.image.imageserving.split("/revision/latest").shift().split("/saintsrow/images/").pop();

                    $(target).val( decodeURIComponent(newImage.split("/").pop()));
                    $("#edit"+CatID+" #"+field+"Preview").parent().attr("href","/wiki/File:"+newImage.split("/").pop());
                    $("#edit"+CatID+" #"+field+"Preview").attr("src",newImage+SRW.Map[field+"Postfix"]);

                    if (field == "icon") {
                      for(pID in SRW.Cats[CatID].pins)
                        if ($("#"+pID+" img").attr("src") == SRW.Cats[CatID][field]+SRW.Map.iconPostfix)
                          $("#"+pID+" img").attr("src", newImage+SRW.Map.iconPostfix);
                    }
                    SRW.Cats[CatID][field] = newImage;
                    dirty("Cats",CatID,field);
                  }
                });
              }
            } else {
              /* Validation alpha+special for name and link, then validate link */
              if (field == "name" && !$(target).val()) {
                $(target).addClass("failed");
                $("#CatEditDone").addClass("failed");
              }
              else if ($(target).val() !== cat[field]) {
                $(target).addClass("pending");
                $("#CatEditDone").removeClass("nothing").addClass("pending");
                if( /[^a-zA-Z0-9 .,:'"!&\?\-\/\(\)]/.test( $(target).val() ) ) {
                  $(target).removeClass("pending").addClass("failed");
                  $("#CatEditDone").removeClass("pending").removeClass("ok").addClass("failed");
                  continue;
                }
                if (field == "link" && $(target).val()) {
                  $.getJSON('/api.php?action=imageserving&format=json&wisTitle='+encodeURIComponent($(target).val())+'&requestid='+CatID+'|'+field)
                  .always(function (data) {
                    if (typeof data.responseJSON != "undefined") data.requestid = data.responseJSON.requestid;
                    CatID = data.requestid.split("|")[0];
                    field = data.requestid.split("|")[1];
                    target = "#edit"+CatID+" #"+field+CatID;

                    if (data.statusText == "error" || typeof data.image == "undefined") {
                      $(target).removeClass("pending").removeClass("ok").addClass("failed");
                      $("#CatEditDone").removeClass("pending").removeClass("ok").addClass("failed");
                    } else {
                      $(target).removeClass("pending").removeClass("failed").addClass("ok");
                      if (!$("#CatEditBox input.pending").size()) $("#CatEditDone").removeClass("pending").addClass("ok");
                      SRW.Cats[CatID][field] = $(target).val();
                      dirty("Cats",CatID,field);

                      if (typeof data.image.imageserving == "string" && $("#edit"+CatID+" #image"+CatID).val() == "") {
                        autoImage = SRW.Map.filePrefix+data.image.imageserving.split("/revision/latest").shift().split("/saintsrow/images/").pop();

                        SRW.Cats[CatID]["image"] = autoImage;
                        dirty("Cats",CatID,"image");
                        $("#edit"+CatID+" #image"+CatID).val( decodeURIComponent(autoImage.split("/").pop()));
                        $("#edit"+CatID+" #image"+CatID).addClass("ok");
                        $("#edit"+CatID+" #imagePreview").attr("src",autoImage+SRW.Map.imagePostfix);
                        $("#edit"+CatID+" #imagePreview").parent().attr("href","/wiki/File:"+autoImage.split("/").pop());
                      }
                    }
                  });
                } else {
                  $(target).removeClass("pending").removeClass("failed").addClass("ok");
                  if (!$("#CatEditBox input.pending").size()) $("#CatEditDone").removeClass("pending").addClass("ok");
                  SRW.Cats[CatID][field] = $(target).val();
                  dirty("Cats",CatID,field);
                }
              }
            }
          }
        }
        CatID = cat = field = target = null;
      })
    )
  )

  for(CatOID in SRW.CatOrder) {
    CatID = SRW.CatOrder[CatOID];
    showEditCat(CatID);
  }
}
function showEditCat(CatID) {
  cat = SRW.Cats[CatID];
  if(cat.deleted) return;
  $("#CatEditList")
  .append(
    $("<div>", { id:"edit"+CatID })
    .append(
      $("<div>", {
        id:"del"+CatID,
        class:"DelButton PinButton ",
        title:"Delete category",
        html:"X"
      }).attr("for",CatID)
      .bind("click", function() {
        CatID=$(this).attr("for");
        if (Object.keys(SRW.Cats[CatID].pins).length) {
          alert("Cannot delete: Pins exist for this Category.");
        } else if (confirm('Delete this category?')) {
          if($("#edit"+CatID+".NewCat").size()) {
            delete SRW.Cats[CatID];
            delete SRW.CatOrder[SRW.CatOrder.indexOf(CatID)];
          } else {
            SRW.Cats[CatID].deleted = "1";
            dirty("Cats",CatID,"deleted");
          }
          $("#edit"+CatID).remove();
        }
      })
    )
    .append(
      $("<div>")
      .append(
        $("<div>")
        .append($("<label>").append("Name: ") )
        .append($("<input>", { id:"name"+CatID, type:"text", val:cat.name }))
        .append($("<div>", { class:"MapStatus"}))
        .append($("<br>"))
        .append($("<label>").append("Page: ") )
        .append($("<input>", { id:"link"+CatID, type:"text", val:cat.link.trim() }))
        .append($("<div>", { class:"MapStatus"}))
      )
      .append($("<input>", { type:"checkbox", id:"displayed"+CatID }).prop("checked", cat.displayed ))
      .append($("<label>").attr("for","displayed"+CatID).html("Displayed by default") )
      .append($("<a>", { href:"/wiki/File:"+cat.icon.split("/").pop(), target:"_blank" })
        .append($("<img>", { id:"iconPreview", src:cat.icon?cat.icon+SRW.Map.iconPostfix:"", class:"IconPreview" }) )
      )
      .append($("<br>"))
      .append($("<label>").append("Icon: ") )
      .append($("<input>", { id:"icon"+CatID, class:"long", type:"text", val:decodeURIComponent(cat.icon.split("/").pop()) }) )
      .append($("<div>", { class:"MapStatus"}))
      .append($("<br>"))
      .append($("<label>").append("Image: ") )
      .append($("<input>", { id:"image"+CatID, class:"long", type:"text", val:decodeURIComponent(cat.image.split("/").pop()) }) )
      .append($("<div>", { class:"MapStatus"}))
    )
    .append($("<a>", { href:"/wiki/File:"+cat.image.trim().split("/").pop(), target:"_blank" })
      .append(
        $("<img>", {
          id:"imagePreview",
          class:"ImagePreview",
          src:cat.image.trim()?cat.image.trim()+SRW.Map.imagePostfix:""
        })
      )
    )
  )
}
//Name | Icon | File:IconPage | Linked Page  | Image | File:ImagePage | checkbox display by default

function showCats(expand) {
  $("#MapScroll").append(
    $("<div>", {id:"CatBox", title:""})
    .append($("<label>").attr("for","CatBoxTitle").attr("title","Click to display categories") )
    .append($("<input>", { type:"checkbox", id:"CatBoxTitle" }).prop("checked", expand) )
    .append(
      $("<button>", {
        id:"CatEdit",
        class:"PinButton",
        title:"Edit categories",
        html:"edit"
      }).hover( function() {
        $("#MapInfo").html("Click to edit categories");
       }, function() {
        $("#MapInfo").html(" ");
      }).bind("click", function(){ editCats() } )
    )
    .append($("<div>", {id:"CatList"}) )
  )
  for(CatOID in SRW.CatOrder) {
    CatID = SRW.CatOrder[CatOID];
    cat = SRW.Cats[CatID];
    if(cat.deleted) continue;
    $("#CatList")
    .append($("<input>", { type:"checkbox", id:CatID }).prop("checked", cat.displayed ) )
    .append(
      $("<label>",{ title:"Click to toggle" }).attr("for",CatID)
      .append($("<img>", { src:cat.icon?cat.icon+SRW.Map.iconPostfix:"" }))
      .append(cat.name)
      .bind("click", function() {
        CatID=$(this).attr("for");
        //SRW.Cats[CatID].displayed = !$("#"+CatID).prop("checked");

        if (!$("#"+CatID).prop("checked"))
          for(pID in SRW.Cats[CatID].pins)
            $("#"+pID).removeClass("hiddenPin");
        else
          for(pID in SRW.Cats[CatID].pins) {
            $("#"+pID).addClass("hiddenPin");
            for(cID in SRW.Pins[pID].cats)
              if(!$("#"+SRW.Pins[pID].cats[cID]).prop("checked")) $("#"+pID).removeClass("hiddenPin");
          }
      })
    )
    if (cat.displayed)
      for (pID in cat.pins)
        $("#"+pID).removeClass("hiddenPin");
  }
}
function showPins() {
  for(i in SRW.Pins) {
    pin = SRW.Pins[i];
    if(pin.deleted) continue;
    showPin(pin);
  }
}
function showPin(pin) {
  $("#MapZoom").append(
    $("<div>", {
      id:pin.ID,
      class:"pin point hiddenPin",
      style:"left:"+pin.X+"px;top:"+pin.Y+"px;"
    }).append(
      $("<img>", {
        class:"pinCenter",
        src:pin.icon?pin.icon+SRW.Map.iconPostfix:SRW.Map.filePrefix+"5/5e/Ui_map_marker.png",
        title:pin.name
      }).hover( function() {
        $("#MapInfo").html($(this).attr("title")) }, function() { $("#MapInfo").html(" ");
      }).bind('click', function() {
        //to-do: handle move and clone modifiers
        pinclick($(this).parent());
      })
    )
  );
}
function pinclick(target) {
  if ($(".unvalidatedPin").size()) {
    mapError("Pin must be completed or deleted.");
    return;
  }
  $("#PinInfo").remove();
//  SRW.Map.setCenter($(target).position().left, $(target).position().top, 1);
//  reCenter();

  pin = SRW.Pins[$(target).attr("id")];

  $("#MapZoom").append(
    $("<div>", {
      id:"PinInfo",
      class:"point up",
      style:"left:"+Math.round($(target).position().left+$(target).width()/2)+"px;"
            +"top:"+Math.round($(target).position().top+$(target).height()/2)+"px;"
    }).append(
      $("<div>", {
        id:"PinInfoInner",
      }).append(
        $("<a>", {
          href:"/wiki/File:"+pin.image.trim().split("/").pop(),
          target:"_blank"
        }).append(
          $("<img>", {
            id:"imagePreview",
            src:pin.image.trim()?pin.image.trim()+SRW.Map.imagePinPostfix:""
          })
        )
      ).append(
        $("<div>", {
          class:"PinTitle",
          html:pin.link.trim()?$("<a>", {href:'/wiki/'+pin.link,html:pin.name}):pin.name
        })
      ).append(
        $("<div>", {
          class:"PinDesc",
          html:parseLinks(pin.desc)
        })
      ).append(
        $("<div>").append(
          $("<button>", {
            id:"PinEdit",
            class:"PinButton",
            html:"edit"
          }).attr("for", pin.ID)
          .bind('click', function() {
            pin = SRW.Pins[$(this).attr("for")];
            $(".PinTitle").remove();
            $(".PinDesc").remove();
            $("#PinEdit").parent().remove();

            $("#PinInfoInner").addClass("PinEdit")
            .append($("<input>", { id:"PinID", type:"hidden", val:pin.ID }))
            .append($("<div>", { class:"fRight" })
              .append($("<label>").append("Name: ") )
              .append($("<input>", { id:"name"+pin.ID, type:"text", val:pin.name }))
              .append($("<div>", { class:"MapStatus"}))

              .append($("<br>"))
              .append($("<label>").append("Page: ") )
              .append($("<input>", { id:"link"+pin.ID, type:"text", val:pin.link.trim() }))
              .append($("<div>", { class:"MapStatus"}))

              .append($("<br>"))
              .append($("<label>").append("Type: ") )
              .append(
                $("<select>", { id:"type"+pin.ID })
              )

              .append($("<br>"))
              .append($("<label>", { title:"A short summary", html:"Desc: " }))
              .append($("<textarea>", { id:"desc"+pin.ID, title:"A short summary", html:pin.desc.trim() }))
              .append($("<div>", { class:"MapStatus"}))
            ).append(
              $("<div>",{ style:"width:100%", class:"fRight" })
              .append(
                $("<a>", { href:"/wiki/File:"+pin.icon.split("/").pop(), target:"_blank" })
                .append($("<img>", { id:"iconPreview", src:pin.icon?pin.icon+SRW.Map.iconPostfix:"", class:"IconPreview" }) )
              )
              .append(
                $("<div>", { class:"fRight" })
                .append($("<label>").append("Image: ") )
                .append($("<input>", { id:"image"+pin.ID, class:"long", type:"text", val:decodeURIComponent(pin.image.split("/").pop()) }))
                .append($("<div>", { class:"MapStatus"}))

                .append($("<br>"))
                .append($("<label>").append("Icon: ") )
                .append($("<input>", { id:"icon"+pin.ID, class:"long", type:"text", val:decodeURIComponent(pin.icon.split("/").pop()) }))
                .append($("<div>", { class:"MapStatus"}))
              )

            ).append(
              $("<button>", {
                id:"PinEditDone",
                class:"PinButton",
                title:"Validate changes",
                html:"validate"
              }).bind("click", function() {
                $("#PinEditDone").addClass("nothing").removeClass("ok").removeClass("failed"); //reset
                PinID = $("#PinID").val();
                pin = SRW.Pins[PinID];

                vars = ["name", "desc", "type", "link", "icon", "image"]; //"deleted"
                $("#PinEdit").addClass("pending");
                for(j in vars) {
                  field = vars[j];
                  target = "#"+field+PinID;
                  $(target).removeClass("pending").removeClass("failed").removeClass("ok"); //reset

                  if ($(target).prop("type") == "text") $(target).val( $(target).val().trim());

                  if (field == "type") {
                    if ($("#"+field+PinID+" option").size() != Object.keys(SRW.Cats).length) $("#PinInfo").remove(); //triggers if html has been edited. But it doesn't delete the pin, it places the with no fields. FIX THIS.
                    sCatID = SRW.CatOrder[$(target).prop("selectedIndex")];
                    if(sCatID == SRW.Pins[PinID].cats[0]) continue; //to-do: change this to allow resetting without revalidating.

                    $(target).addClass("pending");
                    $("#PinEditDone").removeClass("nothing").addClass("pending");

                    SRW.Pins[PinID].addCat(sCatID, 1);
                    SRW.Cats[sCatID].addPin(PinID);

                    for(i = 0; i < SRW.Pins[PinID].cats.length; i++) {
                      if (i == 0) continue;
                      CatID = SRW.Pins[PinID].cats[i];
                      SRW.Cats[CatID].delPin(PinID);
                      SRW.Pins[PinID].delCat(CatID);
                      dirtyTag(CatID, PinID, "deleted");
                      i--;
                    }
                    dirtyTag(sCatID, PinID);

                    if (!$("#link"+PinID).val()) {
                      $("#link"+PinID).val( pin.link);
                    }
                    if (!$("#image"+PinID).val()) {
                      $("#image"+PinID).val( pin.image.split("/").pop());
                      $("#imagePreview").parent().attr("href", "/wiki/File:"+pin.image.split("/").pop() );
                      $("#imagePreview").attr("src", pin.image?pin.image+SRW.Map.imagePinPostfix:"" );
                    }
                    if (!$("#icon"+PinID).val()) {
                      $("#icon"+PinID).val( pin.icon.split("/").pop());
                      $("#"+PinID+" img").attr("src", pin.icon?pin.icon+SRW.Map.iconPostfix:"");
                      $("#iconPreview").parent().attr("href", "/wiki/File:"+pin.icon.split("/").pop() );
                      $("#iconPreview").attr("src", pin.icon?pin.icon+SRW.Map.iconPostfix:"" );
                    }

                    $(target).removeClass("pending").addClass("ok");
                    if (!$(".PinEdit input.pending").size()) $("#PinEditDone").removeClass("pending").addClass("ok");

                  } else if (field == "icon" || field == "image") {
                    /* Image validation done via API, strip url and file: parts. */

                    if (field == "icon" && !$(target).val()) {
                      if (typeof pin.cats[0] != "undefined") $(target).val( SRW.Cats[pin.cats[0]].icon);
                    }
                    if ($(target).val() !== decodeURIComponent(pin[field].split("/").pop())) {
                       $(target).addClass("pending");
                       $("#PinEditDone").removeClass("nothing").addClass("pending");
                       if (!$(target).val()) { /* allow blank image */
                         $(target).removeClass("pending").addClass("ok");
                         if (!$(".PinEdit input.pending").size()) $("#PinEditDone").removeClass("pending").addClass("ok");

                         SRW.Pins[PinID]["image"] = "";
                         dirty("Pins",PinID,field);
                         $(".PinEdit #"+field+"Preview").attr("src","");
                         if ($(".unvalidatedPin").size() && !$(".PinInfo .pending").size() && !$(".PinInfo .failed").size()) $(".unvalidatedPin").removeClass("unvalidatedPin");
                         continue;
                       }
                       if ($(target).val().indexOf("/revision/latest/") != -1)
                         $(target).val( $(target).val().split("/revision").shift());
                       if ($(target).val().indexOf("https://") != -1)
                         $(target).val( decodeURIComponent($(target).val().split("/").pop()));
                       if ($(target).val().indexOf("http://") != -1)
                         $(target).val( decodeURIComponent($(target).val().split("/").pop()));
                       if ($(target).val().toLowerCase().indexOf("file:") != -1)
                         $(target).val( $(target).val().split("[Ff]ile:").pop());

                       if ($(target).val())
                       $.getJSON('/api.php?action=imageserving&format=json&wisTitle=File:'+encodeURIComponent($(target).val())+'&requestid='+PinID+'|'+field)
                       .always(function (data) {
                         if (typeof data.responseJSON != "undefined") data.requestid = data.responseJSON.requestid;
                         PinID = data.requestid.split("|")[0];
                         field = data.requestid.split("|")[1];
                         target = "#"+field+PinID;

                         if (data.statusText == "error" || typeof data.image == "undefined" || typeof data.image.error != "undefined") {
                            $(target).removeClass("pending").addClass("failed");
                            $("#PinEditDone").removeClass("pending").removeClass("ok").addClass("failed");
                         } else {
                            $(target).removeClass("pending").removeClass("failed").addClass("ok");
                            if (!$(".PinEdit input.pending").size()) $("#PinEditDone").removeClass("pending").addClass("ok");

                            newImage = SRW.Map.filePrefix+data.image.imageserving.split("/revision/latest").shift().split("/saintsrow/images/").pop();

                            $(".PinEdit #"+field+"Preview").parent().attr("href","/wiki/File:"+newImage.split("/").pop());

                            if (field == "icon") {
                              $(".PinEdit #iconPreview").attr("src",newImage+SRW.Map.iconPostfix);
                              $("#"+PinID+" img").attr("src", newImage+SRW.Map.iconPostfix);
                            } else {
                              $(".PinEdit #imagePreview").attr("src",newImage+SRW.Map.imagePinPostfix);
                              $(".PinEdit #imagePreview").parent().parent().parent().removeClass("thin");
                              $(".PinEdit #imagePreview[src='']").parent().parent().parent().addClass("thin");
                            }
                            SRW.Pins[PinID][field] = newImage;
                            dirty("Pins",PinID,field);
                            $(target).val( decodeURIComponent(newImage.split("/").pop()));
                            if ($(".unvalidatedPin").size() && !$(".PinInfo .pending").size() && !$(".PinInfo .failed").size()) $(".unvalidatedPin").removeClass("unvalidatedPin");
                         }
                       });
                    }
                  } else {

                    //vars = ["name", "desc", "link"];

                    /* Validation alpha+special for name and link, then validate link */
                    if (field == "name" && !$(target).val()) {
                       $(target).addClass("failed");
                       $("#PinEditDone").addClass("failed");
                    }
                    else if ($(target).val() !== pin[field]) {

                       $(target).addClass("pending");
                       $("#PinEditDone").removeClass("nothing").addClass("pending");
                       if( /[^a-zA-Z0-9 .,:'"!&\?\-\/\[\]\|\(\)\n]/.test( $(target).val() ) ) {
                         $(target).removeClass("pending").addClass("failed");
                         $("#PinEditDone").removeClass("pending").removeClass("ok").addClass("failed");
                         continue;
                       }
                       if (field == "link" && $(target).val()) {
                         $.getJSON('/api.php?action=imageserving&format=json&wisTitle='+encodeURIComponent($(target).val())+'&requestid='+PinID+'|'+field)
                         .always(function (data) {
                            if (typeof data.responseJSON != "undefined") data.requestid = data.responseJSON.requestid;
                            PinID = data.requestid.split("|")[0];
                            field = data.requestid.split("|")[1];
                            target = "#"+field+PinID;

                            if (data.statusText == "error" || typeof data.image == "undefined") {
                              $(target).removeClass("pending").removeClass("ok").addClass("failed");
                              $("#PinEditDone").removeClass("pending").removeClass("ok").addClass("failed");
                            } else {
                              $(target).removeClass("pending").removeClass("failed").addClass("ok");
                              if (!$(".PinEdit input.pending").size()) $("#PinEditDone").removeClass("pending").addClass("ok");
                              SRW.Pins[PinID][field] = $(target).val();
                              dirty("Pins",PinID,field);

                              if (typeof data.image.imageserving == "string" && $("#image"+PinID).val() == "") {
                                 autoImage = SRW.Map.filePrefix+data.image.imageserving.split("/revision/latest").shift().split("/saintsrow/images/").pop();

                                 SRW.Pins[PinID]["image"] = autoImage;
                                 dirty("Pins",PinID,"image");
                                 $("#image"+PinID).val( decodeURIComponent(autoImage.split("/").pop()));
                                 $("#image"+PinID).addClass("ok");
                                 $(".PinEdit #imagePreview").attr("src",autoImage+SRW.Map.imagePinPostfix);
                                 $(".PinEdit #imagePreview").parent().attr("href","/wiki/File:"+autoImage.split("/").pop());
                                 $(".PinEdit #imagePreview").parent().parent().parent().removeClass("thin");
                                 $(".PinEdit #imagePreview[src='']").parent().parent().parent().addClass("thin");
                              }
                              if ($(".unvalidatedPin").size() && !$(".PinInfo .pending").size() && !$(".PinInfo .failed").size()) $(".unvalidatedPin").removeClass("unvalidatedPin");
                            }
                         });
                       } else {
                         $(target).removeClass("pending").removeClass("failed").addClass("ok");
                         if (!$(".PinEdit input.pending").size()) $("#PinEditDone").removeClass("pending").addClass("ok");

                         SRW.Pins[PinID][field] = $(target).val();
                         dirty("Pins",PinID,field);
                         if (field=="name") $("#"+PinID+" img").attr("title",$(target).val());
                         if ($(".unvalidatedPin").size() && !$(".PinInfo .pending").size() && !$(".PinInfo .failed").size()) $(".unvalidatedPin").removeClass("unvalidatedPin");
                       }
                    }
                  }
                }
                $("#PinEdit").removeClass("pending");
              })
            ).append(
              $("<button>", {
                id:"PinEditDelete",
                class:"PinButton",
                title:"Delete pin",
                html:"delete pin"
              }).attr("for",pin.ID)
              .bind("click", function() {
                PinID = $(this).attr("for");
                if (confirm('Delete this pin?')) {
                  if($("#edit"+PinID+".NewPin").size()) {
                    delete SRW.Pins[PinID];
                    delete SRW.Map.dirty.Pins[PinID];
                  } else {
                     SRW.Pins[PinID].deleted = "1";
                     dirty("Pins",PinID,"deleted");
                  }
                  $("#"+PinID).remove();
                  $("#PinInfo").remove();
                }
              })
            )
            for(CatOID in SRW.CatOrder) { /* populate cat dropdown */
              $("#type"+pin.ID).append(
                $("<option>", {
                  id:"option"+SRW.CatOrder[CatOID],
                  html:SRW.Cats[SRW.CatOrder[CatOID]].name
                })
              )
            }
            $("#option"+SRW.Pins[pin.ID].cats[0]).prop("selected", true);
            flipCheck();
          })
        )
//          .append( $("<button>", { id:"PinClone", class:"PinButton", html:"clone" }) )
//          .append( $("<button>", { id:"PinMove",  class:"PinButton", html:"move"  }) )
      )
    )
  );
  $("#imagePreview[src='']").parent().parent().parent().addClass("thin");
  if ($("#SRWmap.readonly").size()) $("#PinEdit").remove();
  $("#PinInfoInner").css("zoom",1/getZoom());
  flipCheck();
}
RegExp.escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
function parseLinks(desc) {
  linksArray = desc.match(/\[\[(.*?)\]\]/g);
  if (linksArray) $.each(linksArray, function(k, v) {
    linkFound = v.replace(/\[\[/g,"").replace(/\]\]/g,"");
    if (linkFound.indexOf("|") != -1) {
      linkParts = linkFound.split("|");
      linkReplaced = "<a href='/wiki/"+linkParts[0].replace(/'/g,"%27")+"' target='_blank'>"+linkParts[1]+"</a>";
    } else {
      linkReplaced = "<a href='/wiki/"+linkFound.replace(/'/g,"%27")+"' target='_blank'>"+linkFound+"</a>";
    }
    desc= desc.replace(RegExp(RegExp.escape(v),"g"),linkReplaced);
  });
  return desc;
}
function flipCheck() {
  if (SRW.Map.padding/getZoom()+$("#PinInfo").position().top - $("#MapScroll").scrollTop()/getZoom() > 0)
    $("#PinInfo").removeClass("down right left").addClass("up");
  if (SRW.Map.padding/getZoom()+$("#PinInfo").position().top - $("#MapScroll").scrollTop()/getZoom() < 0)
    $("#PinInfo").removeClass("up right left").addClass("down");
  if (SRW.Map.padding/getZoom()+$("#PinInfo").position().left - $("#MapScroll").scrollLeft()/getZoom() < 0)
    $("#PinInfo").removeClass("up down left").addClass("right");
  if ((($("#MapScroll").scrollLeft()+SRW.Map.viewWidth)/getZoom())-(SRW.Map.padding/getZoom()+$("#PinInfo").position().left+$("#PinInfo").width()) < 0)
    $("#PinInfo").removeClass("up down right").addClass("left");
  if ((($("#MapScroll").scrollTop()+SRW.Map.viewHeight)/getZoom())-(SRW.Map.padding/getZoom()+$("#PinInfo").position().top+$("#PinInfo").height()) < 0)
    $("#PinInfo").removeClass("down right left").addClass("up");
}
function parseData(data) {
  var params;
  $(data.split("\n")).each(function( index, line ) {
    if (line.substr(0,2) != "{\"") return;
    params = JSON.parse(line);

    if (params.ID == "Map") {

      SRW.Map = new SRWMap(params);

    } else if (params.ID.substr(0,3) == "Cat") {
      if (typeof SRW.Cats[params.ID] == "undefined") SRW.Cats[params.ID] = new Cat(params);
      else SRW.Cats[params.ID].setParams(params);

    } else if (params.ID.substr(0,3) == "Pin") {

      if (typeof SRW.Pins[params.ID] == "undefined") SRW.Pins[params.ID] = new Pin(params);
      else SRW.Pins[params.ID].setParams(params);

    } else if (params.ID.substr(0,3) == "Tag") {
      if (params.state == "deleted") {
        SRW.Pins[params.pin].delCat(params.cat);
        SRW.Cats[params.cat].delPin(params.pin);
      } else {
        SRW.Cats[params.cat].addPin(params.pin);
        SRW.Pins[params.pin].addCat(params.cat, (params.state == "default"?1:0));
      }
    }
  });
}
function mapError(errorText) {
  $("#MapInfo").html("<span style='color:red;font-weight:bold;'>"+errorText+"</span>");
}
function loadData() {
  console.log("loadData");
  $.ajax({
    'dataType': 'text',
    'data': {
      'title': $("#SRWmap").attr("title"),
      'action': 'raw',
      'ctype': 'text/plain',
      'c':Math.random()
    },
    'url': wgScript,
    'success': function(data) {
      console.log("loadData success");
      parseData(data);
      afterInit();
    }
  });
}
function readyStateChanged() {
  if (document.readyState == "complete") {
    if (!$("#MapFull").length) SRW.Map.load("full");
    console.log("SRWMaps - readyState = complete");
  }
}
function afterInit() {
  console.log("afterInit");
  SRW.Map.viewWidth  = $("#MapScroll").prop("clientWidth");
  SRW.Map.viewHeight = $("#MapScroll").prop("clientHeight");

  showPins();
  showCats();
  updateZoom();
  reCenter();
  zoom(0); //temp fix for positioning problem
  if (navigator.userAgent.indexOf("Firefox") != -1) $("#SRWmap").before("Zoom controls are not available in Firefox, because Firefox sucks. Please consider using a better browser.")

  if ($("#SRWmap.readonly").size()) {
    $("#PinEdit").remove();
    $("#CatEdit").remove();
    $("#NewPin").remove();
  }

  if (document.readyState == "complete") readyStateChanged();
  else $(document).on('readystatechange', readyStateChanged);
}

$(function() {
  SRW = {Map:{}, Cats:{}, Pins:{}, CatOrder:[]};
  console.log("script init 1.0.11");
  $(".page-header h1").html($(".page-header h1").html().replace("Saints Row Wiki:Maps/","Map:"))
  if (wgPageName == $("#SRWmap").attr("title")) $(".page-content").css("margin",0);

  //reset for testing
    $("#SRWmap").removeClass("dirty");
    $("#Controls").remove();
    $("#MapScroll").remove();
    $("#CatBox").remove();
  //end reset

  createContainer();
  loadData();

  $(window).on("resize", function() {
    $("#MapScroll").width(Math.round($(".page-content").width()))
//    $("#MapScroll").height(Math.round($(".page-content").width()*3/4));
//    if ($("#MapScroll").height() > $(window).height() - 150) 
    $("#MapScroll").height(Math.round($(window).height()- 120));

    SRW.Map.viewWidth  = $("#MapScroll").prop("clientWidth");
    SRW.Map.viewHeight = $("#MapScroll").prop("clientHeight");
    zoom(0); //getzoom() changes when resized

    $("#CatEditList").css({"max-height":Math.floor($("#MapScroll").height()*0.80)+"px" });
  });
  $(window).on("beforeunload", function() {  if(  $("#SRWmap").hasClass("dirty")) return ''; });
});