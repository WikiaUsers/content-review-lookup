$(function() {
    // All images will be hosted here.
    var image_prefix = "https://vignette.wikia.nocookie.net/fantastic-frontier-roblox/images/";
    var watermark = "8/89/Wiki-wordmark.png";
    
    var MIN_ZOOM = 0.5;
    var MAX_ZOOM = 6;
    
    var DRAG_MARGIN = 100;
    var MARKER_SIZE_LARGE = 64;
    
    // Convert a string of type X,Y into a coordinate object.
    function getXY(str) {
        var arr = str.split(",");
        if (arr.length > 1)
            return {"x": parseInt(arr[0]), "y": parseInt(arr[1])};
        else
            return {"x": -1, "y": -1};
    }
    
    // Credits to https://codepen.io/techslides/pen/zowLd
    // Adds ctx.getTransform() - returns an SVGMatrix
	// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
	function trackTransforms(ctx) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
        var xform = svg.createSVGMatrix();
        ctx.getTransform = function(){ return xform; };
        
        var savedTransforms = [];
        var save = ctx.save;
        ctx.save = function() {
            savedTransforms.push(xform.translate(0, 0));
            return save.call(ctx);
        };
        
        var restore = ctx.restore;
        ctx.restore = function() {
            xform = savedTransforms.pop();
            return restore.call(ctx);
        };
        
        var scale = ctx.scale;
        ctx.scale = function(sx,sy) {
            xform = xform.scaleNonUniform(sx,sy);
            return scale.call(ctx,sx,sy);
        };
        
        var rotate = ctx.rotate;
        ctx.rotate = function(radians) {
            xform = xform.rotate(radians*180/Math.PI);
            return rotate.call(ctx,radians);
        };
        
        var translate = ctx.translate;
        ctx.translate = function(dx,dy) {
            xform = xform.translate(dx,dy);
            return translate.call(ctx,dx,dy);
        };
        
        var transform = ctx.transform;
        ctx.transform = function(a,b,c,d,e,f) {
            var m2 = svg.createSVGMatrix();
            m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
            xform = xform.multiply(m2);
            return transform.call(ctx,a,b,c,d,e,f);
        };
        
        var setTransform = ctx.setTransform;
        ctx.setTransform = function(a,b,c,d,e,f) {
            xform.a = a;
            xform.b = b;
            xform.c = c;
            xform.d = d;
            xform.e = e;
            xform.f = f;
            return setTransform.call(ctx,a,b,c,d,e,f);
        };
        
        var pt  = svg.createSVGPoint();
        ctx.transformedPoint = function(x,y) {
            pt.x = x;
            pt.y = y;
            return pt.matrixTransform(xform.inverse());
        }
	}
	
	// Copied from our checklist script, so we can integrate progress to quest cards.
	// Variables to determine which save/load methods are available. We want to save checklists persistently for the user when they return.
    var localstorageEnabled, cookiesEnabled = false;
    
    // Checks if localStorage is available.
    var lsTestKey = 'test' + Math.floor(1000 + Math.random() * 99000);
    try {
        localStorage.setItem(lsTestKey, lsTestKey);
        localStorage.removeItem(lsTestKey);
        localstorageEnabled = true;
    } catch(e) {
        localstorageEnabled = false;
    }
    // If localStorage is unavailable, we'll check if cookies are enabled.
    if (!localstorageEnabled) {
        cookiesEnabled = navigator.cookieEnabled;
    }
    
    // Code to get / set cookies from their cookie name. Used if localStorage is unavailable.
    function getCookieValueByRegEx(cookieName) {
        var cookieArray = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
        return cookieArray ? cookieArray.pop() : '';
    }
    function setCookie(cname, cvalue, expiresInDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    // Loads the checklist data for a specific checklist as an object.
    function loadChecklistData(tableId) {
        if (localstorageEnabled) {
            var item = localStorage.getItem("checklist_table_" + tableId);
            return item !== null ? JSON.parse(item) : {};
        } else if (cookiesEnabled) {
            var cookieValue = getCookieValueByRegEx("checklist_table_" + tableId);
            return cookieValue.length > 0 ? JSON.parse(cookieValue) : {};
        } else {
            return {};
        }
    }
	
	var outlineBuffer = document.createElement("canvas");
	var imageMasks = {};
	
    function createImageMask(img) {
        var key = img.src;
        if (key in imageMasks)
            return imageMasks[key];
        var buffer = document.createElement("canvas"), w = img.width, h = img.height;
        buffer.width = w;
        buffer.height = h;
        var ctx = buffer.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var pixels = ctx.getImageData(0, 0, w, h).data;
        var mask = {};
        var len = pixels.length;
        for (var i = 3; i < len; i += 4)
            if (pixels[i] > 20) mask[(i - 3) / 4] = 1;
        imageMasks[key] = mask;
        buffer = null, ctx = null, pixels = null, len = null;
        return mask;
	}
	
	// Hover outline.
	// Credits to https://stackoverflow.com/a/28416298
	function drawOutline(canvas, ctx, img, x, y, size) {
        var w = img.width;
        var h = img.height;
        outlineBuffer.width = w + 10;
        outlineBuffer.height = h + 10;
        var bctx = outlineBuffer.getContext("2d");
        bctx.clearRect(0, 0, w + 10, h + 10);
        
        var dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1], // offset array
            s = 1,  // thickness scale
            i = 0;  // iterator
        
        // draw images at offsets from the array scaled by s
        for(; i < dArr.length; i += 2)
            bctx.drawImage(
                img, 5 + dArr[i] * s, 5 + dArr[i+1] * s, w, h);
        
        // fill with color
        bctx.globalCompositeOperation = "source-in";
        bctx.fillStyle = "white";
        bctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // draw original image in normal mode
        bctx.globalCompositeOperation = "source-over";
        bctx.drawImage(img, 5, 5, w, h);
        
        var scaleUp = (w + 10) / w;
        var margin = (scaleUp - 1) * 0.5;
        ctx.drawImage(outlineBuffer, x - size * margin, y - size * margin, size * scaleUp, size * scaleUp);
	}
	
	// Hover detection
    function inArea(ctx, p, bx, by, w, h) {
        return p.x >= bx && p.y >= by && p.x <= bx + w && p.y <= by + h;
    }
    
    function inImage(ctx, key, img, p, bx, by, w, h) {
        if (((image_prefix + key) in imageMasks) && inArea(ctx, p, bx, by, w, h)) {
            var x = Math.floor(((p.x - bx) / w) * img.width),
                y = Math.floor(((p.y - by) / h) * img.height);
            return imageMasks[image_prefix + key][x + y * img.width] === 1;
        }
        return false;
    }
    
    function capitalize(str) 
    {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    function formatType(type) {
        if (type == "npc") return "NPC";
        var words = type.split("_");
        for (var i = 0; i < words.length; i++)
            words[i] = capitalize(words[i]);
        return words.join(" ");
    }
    
    // Credit to https://stackoverflow.com/a/2901298
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    function appendTextLine(elem, text) {
        elem.append("<br/>");
        elem.append(document.createTextNode(text));
    }
    
    // Generate a tooltip card for the current entity.
    function showTooltip(map, tooltip, entity_data) {
        tooltip.find(".icon").css({"background-image": "url('" + image_prefix + entity_data.image + "')"});
        tooltip.find(".title").text(entity_data.article_text);
        var types = entity_data.types.slice();
        for (var i = 0; i < types.length; i++)
            types[i] = formatType(types[i]);
        var info = tooltip.find(".info");
        info.text(types.join(", "));
        // Entity has HP, show HP
        if ("hp" in entity_data)
            appendTextLine(info, "HP: " + entity_data.hp);
        // Entity is a vendor, show list of vendor items
        if ("vendor_list" in entity_data) {
            var vl = $("<div class=\"vendor-list\"><span>Vendor items:</span><br><ul></ul></div>");
            for (var i = 0; i < entity_data.vendor_list.length; i++)
                vl.find("ul").append($("<li></li>").text(entity_data.vendor_list[i]));
            info.append(vl);
        }
        // Entity is a quest giver, show quest info-card
        if ("quest_giver" in entity_data) {
            var quest_data = entity_data.quest_giver;
            var qi = $("<div class=\"quest-info\"><img/><span class=\"quest-title\"></span><span class=\"quest-desc\"></span><span class=\"quest-progress\"></span></div>");
            qi.find("img").attr("src", image_prefix + quest_data.icon);
            appendTextLine(qi.find(".quest-title").text("Quest:"), quest_data.name);
            qi.find(".quest-desc").text(quest_data.description);
            if ("checklist_id" in quest_data) {
                var quest_progress = 0;
                var quest_progress_data = loadChecklistData(quest_data.checklist_id);
                for (var i = 0; i < quest_data.checklist_items.length; i++)
                    if (quest_progress_data[quest_data.checklist_items[i]] === true)
                        quest_progress++;
                qi.find(".quest-progress").text(
                    Math.min(quest_progress, quest_data.checklist_items.length) +
                    " / " + quest_data.checklist_items.length);
            }
            info.append(qi);
        }
        // Entity is teleport, show destinations
        if ("teleport" in entity_data) {
            var tp_data = entity_data.teleport;
            var ti = $("<div class=\"teleport-info\"><span class=\"tp-title\">Teleport destinations</span><ul></ul></div>");
            for (var i = 0; i < tp_data.length; i++)
                ti.find("ul").append($("<li></li>").text(tp_data[i].text));
            info.append(ti);
        }
        // Entity has a screenshot, show screenshot info-card
        if ("screenshot" in entity_data) {
            var scc = $("<div class=\"scr-info\"><img/><span class=\"price\"></span></div>");
            scc.find("img").attr("src", image_prefix + entity_data.screenshot.image);
            if ("price" in entity_data.screenshot)
                scc.find(".price").text(numberWithCommas(entity_data.screenshot.price) + "g");
            info.append(scc);
        }
        tooltip.show();
    }
    
    function hideTooltip(map, tooltip) {
        tooltip.hide();
    }
    
    function createToggleElem(toggles_enabled, redraw, info) {
        var elem = $("<label><div class=\"color-indicator\"></div><input type=\"checkbox\"><span></span></label>");
        elem.find(".color-indicator").css({"background-color": info.color});
        elem.find("span").text(formatType(info.id));
        elem.find("input").attr("value", info.id);
        
        elem.find("input").change(function() {
            if (this.checked) {
                var index = toggles_enabled.indexOf(info.id);
                if (index < 0)
                    toggles_enabled.push(info.id);
            } else {
                var index = toggles_enabled.indexOf(info.id);
                if (index > -1)
                    toggles_enabled.splice(index, 1);
            }
            redraw();
        });
        
        if (toggles_enabled.includes(info.id))
            elem.find("input").prop('checked', true);
        
        return elem;
    }
    
    function isMarkerEnabled(toggles_enabled, marker_data) {
        for (var i = 0; i < marker_data.types.length; i++)
            if (toggles_enabled.indexOf(marker_data.types[i]) > -1)
                return true;
        return false;
    }
    
    // Creates a list over the minimap, from which the user can pick a choice.
    function createPromptList(map, title, options, callback) {
        var ol = $("<div class=\"minimap-overlay\"><ul><li class=\"option-title\"></li></ul></div>");
        ol.find(".option-title").text(title);
        
        options = options.slice(); // Copy array.
        options.push({"text": "Cancel"});
        
        var onClick = function() {
            var opt = $(this);
            var data = opt.data("option-data");
            ol.remove();
            if (data.text !== "Cancel")
                callback(data);
        };
        
        for (var i = 0; i < options.length; i++) {
            var opt = $("<li class=\"option\"></li>");
            opt.text(options[i].text);
            opt.data("option-data", options[i]);
            opt.click(onClick);
            ol.find("ul").append(opt);
        }
        
        var h = map.height();
        var w = map.width();
        ol.css({
            "top": (-h) + "px", "margin-bottom": (-h) + "px", "width": w + "px", "height": h + "px"
        });
        map.after(ol);
    }
    
    // Find our base information for all maps. The data will be served as JSON.
    // Unfortunately, I couldn't find an endpoint that gives the raw page data.

    $.get(
		mw.config.get(['wgScript']).wgScript,
		{ title: mw.util.wikiUrlencode('Template:MapData'), action: 'raw', ctype: 'application/json' }
	).done(function(data) {
		var loadMinimap = function(ph_map, loadData) {
            // Gets the user-submitted data for this minimap.
            var height = loadData.height;
            var width = loadData.width;
            var world = loadData.world;
            var view_pos = loadData.view_pos;
            var toggles_enabled = loadData.toggles_enabled;
            var zoom_level = loadData.zoom_level;
            
            var hovered_marker = null;
            var hovering_region = null;
            
            // Checks if the world is valid.
            if (world in data.worlds)
            {
                var world_data = data.worlds[world];
                
                var map_wrapper = $("<a class='minimap-wrapper'><canvas class='minimap loaded'>Your browser does not support HTML5 Canvas. Minimaps can't show.</canvas></a>");
                var map = map_wrapper.find(".minimap");
                map_wrapper.css({"width": width + "px"});
                map.css({
                    "width": width + "px",
                    "height": height + "px",
                    "background-color": world_data.background_color,
                });
                
                var tooltip = $("<div class='minimap-tooltip' style='display:hidden'><div class='icon'></div><div class='content'><div class='title'></div><div class='info'></div></div></div>");
                
                // We're using a canvas to draw our minimap.
                var canvas = map[0];
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                
                trackTransforms(ctx);
                
                // We're storing all images in an associative lookup, avoiding duplicates.
                var images = {};
                var isTaggedMarker = {};
                
                images[watermark] = new Image();
                
                // Scans for world images.
                for (var key in data.worlds) {
                    if (data.worlds[key].background_image !== "")
                        images[data.worlds[key].background_image] = new Image();
                    for (var i = 0; i < data.worlds[key].detail_tiles.length; i++)
                        images[data.worlds[key].detail_tiles[i].image] = new Image();
                }

                // Scans for marker images.
                for (var key in data.markers)
                    if (data.markers[key].image !== "") {
                        images[data.markers[key].image] = new Image();
                        isTaggedMarker[image_prefix + data.markers[key].image] = true;
                    }
                
                // Init hover state for markers in the current world.
                for (var i = 0; i < world_data.markers.length; i++)
                    world_data.markers[i].is_hovered = false;
                
                var bg_img = images[world_data.background_image];
                var wm_img = images[watermark];
                
                // Dragging and zooming functionality.
                var lastX = canvas.width / 2, lastY = canvas.height / 2;
                var currentScale = 1;
                
                // Re-evaluates hovering on items and such.
                var recalcHover = function(performMove) {
                    var hover_change = false,
                        hovering_any = false,
                        hovered_region = hovering_region !== null;
                    hovered_marker = null;
                    hovering_region = null;
                    var p = ctx.transformedPoint(lastX, lastY);
                    if (toggles_enabled.indexOf("regions") > -1) {
                        for (var i = 0; i < world_data.regions.length; i++) {
                            var region_data = world_data.regions[i];
                            if (region_data.article !== "") {
                                var line_height = region_data.text_scale * 12;
                                ctx.font = "bold " + line_height + "px Rubik,\"Helvetica Neue\",Helvetica,Arial,sans-serif";
                                for (var j = 0; j < region_data.title.length; j++) {
                                    var text = region_data.title[j];
                                    var twidth = ctx.measureText(text).width;
                                    var px = region_data.text_position.x - twidth * 0.5,
                                        py = region_data.text_position.y + j * line_height;
                                    
                                    if (inArea(ctx, p, px, py - line_height * 0.8, twidth, line_height)) {
                                        if (hovering_region != region_data)
                                            hover_change = true;
                                        hovering_region = region_data;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (hovering_region === null) {
                        if (hovered_region)
                            hover_change = true;
                        for (var i = 0; i < world_data.markers.length; i++)
                        {
                            var entity_data = world_data.markers[i];
                            var marker_data = data.markers[entity_data.id];
                            var pos_x = entity_data.location.x - marker_data.icon_size / 2;
                            var pos_y = entity_data.location.y - marker_data.icon_size / 2;
                            var is_hovered = isMarkerEnabled(toggles_enabled, marker_data) && inImage(
                                ctx, marker_data.image, images[marker_data.image], p, pos_x, pos_y, marker_data.icon_size, marker_data.icon_size
                            );
                            if (is_hovered !== entity_data.is_hovered)
                                hover_change = true, hovering_any = hovering_any || is_hovered;
                            entity_data.is_hovered = is_hovered;
                            if (is_hovered)
                                hovered_marker = entity_data;
                        }
                    }
                    
                    if (performMove && dragStart){
                        var pt = ctx.transformedPoint(lastX,lastY);
                        ctx.translate(pt.x-dragStart.x, pt.y-dragStart.y);
                        
                        constrainDrag();
                        redraw();
                    } else if (hover_change)
                        redraw();
                    
                    map_wrapper.removeAttr("href").removeAttr("target");
                    var offset = map.offset();
                    /*if (hover_change && !hovering_any) {
                        hideTooltip(map, tooltip);
                        map.removeClass("interact");
                    } else if (hovering_any) {
                        var offset = map.offset();
                        showTooltip(
                            map,
                            tooltip,
                            data.markers[hovered_marker.id]
                        );
                        if ("article" in data.markers[hovered_marker.id]) {
                            map.addClass("interact");
                            map_wrapper.attr("href", "https://fantastic-frontier-roblox.wikia.com/wiki/" + data.markers[hovered_marker.id].article).attr("target", "");
                        } else if ("teleport" in data.markers[hovered_marker.id]) {
                            map.addClass("interact");
                        } else
                            map.removeClass("interact");
                    }*/
                    if (hovering_region !== null) {
                        map.addClass("interact");
                        map_wrapper.attr("href", "https://fantastic-frontier-roblox.wikia.com/wiki/" + hovering_region.article).attr("target", "__blank");
                    } else if (hovered_marker !== null) {
                        var marker_data = data.markers[hovered_marker.id];
                        showTooltip(
                            map,
                            tooltip,
                            marker_data
                        );
                        if ("article" in marker_data) {
                            map.addClass("interact");
                            map_wrapper.attr("href", "https://fantastic-frontier-roblox.wikia.com/wiki/" + marker_data.article).attr("target", "");
                        } else if ("teleport" in marker_data) {
                            map.addClass("interact");
                        } else
                            map.removeClass("interact");
                    } else {
                        hideTooltip(map, tooltip);
                        map.removeClass("interact");
                    }
                    
                    tooltip.css({
                        "left": (offset.left + lastX - 40) + "px",
                        "top": (offset.top + lastY + 30) + "px"
                    });
                };
                
                // Our drawing function; again, based off of that codepen.
                var redraw = function() {
                    // Clear the entire canvas
                    var p1 = ctx.transformedPoint(0, 0);
                    var p2 = ctx.transformedPoint(canvas.width,canvas.height);
                    ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
                    
                    ctx.save();
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.clearRect(0, 0, canvas.width,canvas.height);
                    ctx.restore();
                    
                    // Draw the background
                    ctx.drawImage(images[world_data.background_image], 0, 0);
                    // Add detail tiles (high-quality smaller images of the background)
                    for (var i = 0; i < world_data.detail_tiles.length; i++) {
                        var tile_data = world_data.detail_tiles[i];
                        if (currentScale >= tile_data.zoom_scale_min_limit) {
                            var img = images[tile_data.image];
                            var t_width = img.width * tile_data.scale,
                                t_height = img.height * tile_data.scale;
                            if ("rotate" in tile_data)
                                ctx.rotate(tile_data.rotate);
                            ctx.drawImage(
                                img,
                                tile_data.center.x - t_width / 2, tile_data.center.y - t_height / 2,
                                t_width, t_height
                            );
                            if ("rotate" in tile_data)
                                ctx.rotate(-tile_data.rotate);
                        }
                    }
                    
                    if (toggles_enabled.indexOf("regions") > -1) {
                        ctx.lineWidth = 3;
                        ctx.setLineDash([15, 5]);
                        for (var i = 0; i < world_data.regions.length; i++) {
                            if (world_data.regions[i].area !== "") {
                                ctx.translate(
                                    world_data.regions[i].area_offset.x,
                                    world_data.regions[i].area_offset.y
                                );
                                var p = new Path2D(world_data.regions[i].area);
                                ctx.strokeStyle = world_data.regions[i].color;
                                ctx.stroke(p);
                                ctx.translate(
                                    -world_data.regions[i].area_offset.x,
                                    -world_data.regions[i].area_offset.y
                                );
                            }
                        }
                        ctx.setLineDash([]);
                    }
                    
                    for (var i = 0; i < world_data.markers.length; i++) {
                        var entity_data = world_data.markers[i];
                        var marker_data = data.markers[entity_data.id];
                        var pos_x = entity_data.location.x - marker_data.icon_size / 2;
                        var pos_y = entity_data.location.y - marker_data.icon_size / 2;
                        
                        if (isMarkerEnabled(toggles_enabled, marker_data)) {
                            if (hovering_region === null && hovered_marker === entity_data)
                                drawOutline(
                                    canvas, ctx,
                                    images[marker_data.image],
                                    pos_x, pos_y,
                                    marker_data.icon_size
                                );
                            else
                                ctx.drawImage(
                                    images[marker_data.image],
                                    pos_x, pos_y,
                                    marker_data.icon_size, marker_data.icon_size
                                );
                        }
                    }
                    
                    if (toggles_enabled.indexOf("regions") > -1) {
                        for (var i = 0; i < world_data.regions.length; i++) {
                            var region_data = world_data.regions[i];
                            var line_height = region_data.text_scale * 12;
                            ctx.font = "bold " + line_height + "px Rubik,\"Helvetica Neue\",Helvetica,Arial,sans-serif";
                            if (hovering_region == region_data) {
                                ctx.lineWidth = 5;
                                ctx.strokeStyle = "rgba(10, 10, 10, 0.2)";
                                for (var j = 0; j < region_data.title.length; j++) {
                                    var text = region_data.title[j];
                                    var twidth = ctx.measureText(text).width;
                                    ctx.strokeText(
                                        text,
                                        region_data.text_position.x - twidth * 0.5,
                                        region_data.text_position.y + j * line_height + 2
                                    );
                                }
                                ctx.strokeStyle = "white";
                                for (var j = 0; j < region_data.title.length; j++) {
                                    var text = region_data.title[j];
                                    var twidth = ctx.measureText(text).width;
                                    ctx.strokeText(
                                        text,
                                        region_data.text_position.x - twidth * 0.5,
                                        region_data.text_position.y + j * line_height
                                    );
                                }
                            }
                            
                            ctx.lineWidth = 3;
                            ctx.fillStyle = region_data.text_color;
                            ctx.strokeStyle = region_data.text_outline_color;
                            for (var j = 0; j < region_data.title.length; j++) {
                                var text = region_data.title[j];
                                var twidth = ctx.measureText(text).width;
                                ctx.strokeText(
                                    text,
                                    region_data.text_position.x - twidth * 0.5,
                                    region_data.text_position.y + j * line_height
                                );
                                ctx.fillText(
                                    text,
                                    region_data.text_position.x - twidth * 0.5,
                                    region_data.text_position.y + j * line_height
                                );
                            }
                        }
                    }
                    
                    ctx.save();
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.drawImage(
                        wm_img,
                        5, height - 5 - wm_img.height * 0.5,
                        wm_img.width * 0.5, wm_img.height * 0.5
                    );
                    ctx.restore();
                };
                
                var dragStart,dragged;
                
                var toggles_list = $("<div class='minimap-toggles'></div>");
                
                // Teleport callback. This reloads the entire minimap with a new one!
                var performTeleport = function(tp_data) {
                    loadMinimap(map_wrapper, {
                        width: width,
                        height: height,
                        world: tp_data.world,
                        view_pos: tp_data.view_pos,
                        zoom_level: tp_data.zoom_level,
                        toggles_enabled: toggles_enabled
                    });
                    tooltip.remove();
                    toggles_list.remove();
                }
                
                // Clear dragging if the mouse was released while outside the canvas.
                map.on("mousedown mouseover", function (e) {
                    if (!(e.buttons == 1 || e.buttons == 3))
                        dragStart = null;
                }).on("mouseleave", function() {
                    hideTooltip(map, tooltip);
                    map.removeClass("interact");
                });
                var is_redirecting = false;
                map.on("mousedown", function(e) {
                    if (e.buttons == 1) {
                        if (hovering_region !== null) {
                            if ("article" in hovering_region) {
                                is_redirecting = true;
                                window.open("https://fantastic-frontier-roblox.wikia.com/wiki/" + hovering_region.article, "_blank");
                                setTimeout(function() {
                                    is_redirecting = false;
                                }, 200); // Block zooming for 0.2s
                            }
                        } else if (hovered_marker !== null) {
                            var marker_data = data.markers[hovered_marker.id];
                            if ("article" in marker_data) {
                                is_redirecting = true;
                                window.location.href = "https://fantastic-frontier-roblox.wikia.com/wiki/" + marker_data.article;
                            } else if ("teleport" in marker_data) {
                                if (marker_data.teleport.length > 1) {
                                    createPromptList(
                                        map,
                                        "Select destination",
                                        marker_data.teleport,
                                        performTeleport
                                    );
                                } else
                                    performTeleport(marker_data.teleport[0]);
                            }
                        }
                    }
                });
                
                var constrainDrag = function() {
                    var tl = ctx.transformedPoint(0, 0); // Top left corner of map projected back to pixel scale.
                    
                    if (tl.x < -DRAG_MARGIN || tl.y < -DRAG_MARGIN)
                        ctx.translate(
                            Math.min(0, tl.x + DRAG_MARGIN),
                            Math.min(0, tl.y + DRAG_MARGIN)
                        );
                    if ((-tl.x + bg_img.width) * currentScale < canvas.width - DRAG_MARGIN * currentScale || (-tl.y + bg_img.height) * currentScale < canvas.height - DRAG_MARGIN * currentScale)
                        ctx.translate(
                            -Math.min(0, (-tl.x + bg_img.width) * currentScale - canvas.width + DRAG_MARGIN * currentScale) / currentScale,
                            -Math.min(0, (-tl.y + bg_img.height) * currentScale - canvas.height + DRAG_MARGIN * currentScale) / currentScale
                        );
                };
            
                canvas.addEventListener('mousedown',function(evt){
                    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
                    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
                    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
                    dragStart = ctx.transformedPoint(lastX,lastY);
                    dragged = false;
                }, false);
            
                canvas.addEventListener('mousemove',function(evt){
                    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
                    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
                    dragged = true;
                    
                    recalcHover(true);
                }, false);
                
                canvas.addEventListener('mouseup',function(evt){
                    dragStart = null;
                    if (!dragged && !is_redirecting) zoom(evt.shiftKey ? -1 : 1 );
                }, false);
                
                var scaleFactor = 1.1;
                
                var zoom = function(clicks, isInit){
                    var pt = ctx.transformedPoint(lastX,lastY);
                    var factor = Math.pow(scaleFactor,clicks);
                    if (currentScale * factor >= MIN_ZOOM && currentScale * factor <= MAX_ZOOM) {
                        currentScale = currentScale * factor;
                        ctx.translate(pt.x,pt.y);
                        ctx.scale(factor,factor);
                        ctx.translate(-pt.x,-pt.y);
                        if (!isInit) constrainDrag();
                        redraw();
                    }
                }
            
                var handleScroll = function(evt){
                    var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
                    if (delta) zoom(delta);
                    return evt.preventDefault() && false;
                };
                
                canvas.addEventListener('DOMMouseScroll',handleScroll,false);
                canvas.addEventListener('mousewheel',handleScroll,false);
                
                // Init from user template settings.
                currentPosX = -view_pos.x + width / 2;
                currentPosY = -view_pos.y + height / 2;
                ctx.translate(currentPosX, currentPosY);
                
                var imgLoaded = function(ev) {
                    if (ev.target.src in isTaggedMarker)
                        createImageMask(ev.target);
                    redraw();
                };
                
                for (var key in images) {
                    var k = key;
                    var img = images[k];
                    img.crossOrigin = "Anonymous";
                    img.onload = imgLoaded;
                    img.src = image_prefix + key;
                }
                
                // Show our minimap.
                ph_map.replaceWith(map_wrapper);
                $("body").append(tooltip);
                zoom(zoom_level, true);
                hideTooltip(map, tooltip);
                redraw();
                
                toggles_list.css({"top": (-height) + "px", "left": (width + 5) + "px"});
                for (var i = 0; i < data.toggles.length; i++)
                    toggles_list.append(createToggleElem(toggles_enabled, redraw, data.toggles[i]));
                map_wrapper.after(toggles_list);
                toggles_list.css({"margin-bottom": (-toggles_list.height()) + "px"});
            }
		}
        
        // Find all minimap elements.
        $(".minimap").each(function() {
            var ph_map = $(this);
            
            // Gets the user-submitted data for this minimap.
            var height = ph_map.data("height");
            var width = ph_map.data("width");
            var world = ph_map.data("world");
            var pos = ph_map.data("view-pos");
            var toggles_enabled = ph_map.data("toggles-enabled").split(",");
            var zoom_level = parseInt(ph_map.data("zoom-level"));
            
            var failMap = function(reason) {
                ph_map.attr("data-fail-reason", reason);
                ph_map.addClass("fail");
            }
            
            // Check arguments, and fail if invalid.
            if (isNaN(parseInt(height)))
                return failMap("Invalid canvas height.");
            if (isNaN(parseInt(width)))
                return failMap("Invalid canvas width.");
            if (isNaN(zoom_level))
                return failMap("Invalid zoom level.");
            
            // Checks if the world is valid.
            if (world in data.worlds)
            {
                var view_pos = getXY(pos);
                if (view_pos.x < 0 || view_pos.y < 0 || isNaN(view_pos.x) || isNaN(view_pos.y))
                    return failMap("Invalid view position.");
                
                loadMinimap(ph_map, {
                    width: width,
                    height: height,
                    world: world,
                    view_pos: view_pos,
                    toggles_enabled: toggles_enabled,
                    zoom_level: zoom_level
                });
            }
            else
            {
                ph_map.attr("data-fail-reason", "Invalid world.");
                ph_map.addClass("fail");
            }
            
        });
    }).fail(function(err) {
		$(".minimap").each(function() {
            var ph_map = $(this);
            ph_map.attr("data-fail-reason", "Minimap could not load due to malformed data. Please retry soon.");
            ph_map.addClass("fail");
        });
	});
});