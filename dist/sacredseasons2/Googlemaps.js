//importScriptPage('Mediawiki:jstree/jquery.hotkeys.js');
//importScriptPage('Mediawiki:jstree/jquery.cookie.js');
//importScriptPage('Mediawiki:jstree/jquery.jstree.js');

function importScriptPageWithCallBack(page, callback, server) {
    var url;
    if (localcontent) {
        url = encodeURIComponent(page.replace( / /g , '_')).replace('%2F', '/').replace('%3A', ':');
        var colonpos = url.lastIndexOf(":");
        if (colonpos > -1)
            url = url.slice(colonpos + 1);
    } else {
        url = '/index.php?title=' + encodeURIComponent(page.replace( / /g , '_')).replace('%2F', '/').replace('%3A', ':') + '&action=raw&ctype=text/javascript';
        if (typeof server == "string")
            url = (server.indexOf('://') == -1) ? 'http://' + server + '.wikia.com' + url : server + url;
    }
    //    $.getScript(url, callback);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onreadystatechange = function() {
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
            callback();
        }
    };
    script.onload = callback;
    script.src = url;
    document.body.appendChild(script);
}

var gmcontroller = new Googlemapscontrollerclass("#map_canvas", "#sidePanel");
var SS2_RANGE_ZOOMMAX = 12;

function initializegooglemaps() {
    //	gmcontroller.Initializegooglemaps();
    if ($(gmcontroller.googleMapDiv).length) {
        //        alert('test1');
        //$('h1').css("color","#ff0000");
        importScriptPageWithCallBack('Mediawiki:jstree/jquery.jstree.js', function() { jstreeloaded(); });
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=googlemapsloaded";
        document.body.appendChild(script);
    }
}

var googlemapsLoaded = false;

function googlemapsloaded() {
    if (!(googlemapsLoaded)) {
        googlemapsLoaded = true;
        if (jstreeLoaded)
            gmcontroller.UserInterfaceLoaded();
    }
}

var jstreeLoaded = false;

function jstreeloaded() {
    if (!(jstreeLoaded)) {
        jstreeLoaded = true;
        if (googlemapsLoaded)
            gmcontroller.UserInterfaceLoaded();
    }
}

function Googlemapscontrollerclass(googleMapDiv, jsTreeDiv) {
    this.googleMapDiv = googleMapDiv;
    this.jsTreeDiv = jsTreeDiv;
    this.markerdrag = false;
    GooglemapsConnector.prototype.oController = this;
}

Googlemapscontrollerclass.prototype.googleMapDiv = '';
Googlemapscontrollerclass.prototype.jsTreeDiv = '';
Googlemapscontrollerclass.prototype.markerdrag = false;
Googlemapscontrollerclass.prototype.oTree = null;
Googlemapscontrollerclass.prototype.oGM = null;
Googlemapscontrollerclass.prototype.oCurrentNode = null;
Googlemapscontrollerclass.prototype.iZoom = 0;
Googlemapscontrollerclass.prototype.googlemapsReady = false;
Googlemapscontrollerclass.prototype.jstreeReady = false;
Googlemapscontrollerclass.prototype.lUserEventInProgress = false;
Googlemapscontrollerclass.prototype.oMapConnectors = new Object();
Googlemapscontrollerclass.prototype.ss2MapTypeArray = new Array();
Googlemapscontrollerclass.prototype.ss2MapTypeIDArray = new Array();
Googlemapscontrollerclass.prototype.infowindow = null;


Googlemapscontrollerclass.prototype.FillEnvVars = function() {
    if (getUrlVars()["DollHouseMode"]) {
        this.markerdrag = getUrlVars()["DollHouseMode"].toString().toLowerCase() == "off" ? false : true;
    } else if (typeof DollHouseMode == "boolean") {
        this.markerdrag = DollHouseMode;
    }
};
Googlemapscontrollerclass.prototype.JsTreeInitialize = function() {
    $.jstree._themes = 'jstree/themes/';
    // call `.jstree` with the options object
    var plugins = ["themes", "html_data", "ui", "checkbox"];
    $(this.jsTreeDiv)		// call `.jstree` with the options object
        .jstree({
                "ui": {
                    "selected_parent_open": true,
                    "selected_parent_close": false,
                    "select_limit": 1
                },
                "checkbox": {
                    "two_state": true,
                    "checked_parent_open": false
                },
	    // the `plugins` array allows you to configure the active plugins on this instance
                "plugins": plugins,
	    // each plugin you have included can have its own config object
                "html_data": {
                    "data": "<ul></ul>"
                },
                "core": {
                    "open_parents": false,
                    "initially_open": ["root"]
                },
                "themes": {
                    "theme": "default"
                },
                "parentobject": this
            }).data('oControl', this)
        .bind("loaded.jstree", function(event, data) {
            var oControl = $(this).data("oControl");
            oControl.oTree = jQuery.jstree._reference(oControl.jsTreeDiv);
            oControl.JsTreeReady();
        })
        .bind("select_node.jstree", function(event, data) {
            var oConnector = $(data.rslt.obj).data('oConnector');
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                oConnector.TreeView_On_Select_Node(event, data);
                oConnector.lUserEventInProgress = false;
            }
        })
        .bind("dblclick.jstree", function(event, data) {
            var oTreeObj = $.jstree._reference(event.target);
            oTreeObj.toggle_node(event.target);
        })
        .bind("deselect_node.jstree", function(event, data) {
            var oConnector = $(data.rslt.obj).data('oConnector');
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                oConnector.TreeView_On_Deselect_Node(event, data);
                oConnector.lUserEventInProgress = false;
            }
        })
        .bind("open_node.jstree", function(event, data) {
            var oConnector = $(data.rslt.obj).data('oConnector');
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                oConnector.TreeView_On_Open_Node(event, data);
                oConnector.lUserEventInProgress = false;
            }
        })
        .bind("after_open.jstree", function(event, data) {
            var oConnector = $(data.rslt.obj).data('oConnector');
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                oConnector.TreeView_On_After_Open(event, data);
                oConnector.lUserEventInProgress = false;
            }
        })
        .bind("close_node.jstree", function(event, data) {
            var oConnector = $(data.rslt.obj).data('oConnector');
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                oConnector.TreeView_On_Close_Node(event, data);
                oConnector.lUserEventInProgress = false;
            }
        })
        .bind("after_close.jstree", function(event, data) {
            var oConnector = $(data.rslt.obj).data('oConnector');
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                oConnector.TreeView_On_After_Close(event, data);
                oConnector.lUserEventInProgress = false;
            }
        })
        .bind("check_node.jstree", function(event, data) {
            var oConnector = $(data.rslt.obj).data('oConnector');
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                oConnector.TreeView_On_Check_Node(event, data);
                oConnector.lUserEventInProgress = false;
            }
        })
        .bind("uncheck_node.jstree", function(event, data) {
            var oConnector = $(data.rslt.obj).data('oConnector');
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                oConnector.TreeView_On_Uncheck_Node(event, data);
                oConnector.lUserEventInProgress = false;
            }
        });
};
Googlemapscontrollerclass.prototype.JsTreeReady = function() {
    if (this.markerdrag) {
        this.oTree.show_checkboxes();
    } else {
        this.oTree.hide_checkboxes();
    }
    ;
    this.LoadAreas();
    this.jstreeReady = true;
    //   alert('Tree ready');
    if (this.googlemapsReady)
        this.UserInterfaceReady();

};
Googlemapscontrollerclass.prototype.GoogleMapsInitialize = function() {

    var latlng = new window.google.maps.LatLng(0, 0);
    var myOptions = {
        zoom: SS2_RANGE_ZOOMMAX,
        center: latlng,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false
    };

    this.oGM = new window.google.maps.Map(document.getElementById("map_canvas"), myOptions);
    this.oGM.oController = this;

    for (var i = 0; i < this.ss2MapTypeArray.length; i++) {
        var ss2MapTypeTemp = this.ss2MapTypeArray[i];
        this.oGM.mapTypes.set(ss2MapTypeTemp.name, ss2MapTypeTemp);
        //
    }
    // ss2Map.setMapTypeId(ss2MapType.name);

    this.infowindow = new window.google.maps.InfoWindow();
    window.google.maps.event.addListener(this.oGM, 'click', function() {
        this.oController.infowindow.close();
    });
    this.GoogleMapsReady();
};

Googlemapscontrollerclass.prototype.GoogleMapsReady = function() {
    //   alert('maps ready');
    this.googlemapsReady = true;
    if (this.jstreeReady)
        this.UserInterfaceReady();
};
Googlemapscontrollerclass.prototype.UserInterfaceReady = function() {

    this.oTree.select_node('#' + this.IDFormat('Plimouth/Map'));
    this.oTree.open_node('#' + this.IDFormat('Plimouth/Map'));
};

Googlemapscontrollerclass.prototype.IDFormat = function(id) {
    return 'GMC_' + id.replace( /\/Map$/ , '').replace( /\s/g , '_').replace( /\//g , '_slash_').replace( /\&/g , '_and_').replace( /'/g , '_quote_').replace( /"/g , '_doublequote_');
};

Googlemapscontrollerclass.prototype.GetJSONData = function(articleName) {
    var json = "{}";
    if (localcontent) {
        $.ajax({
                async: false,
                type: "GET",
                data: "",
                dataType: "HTML",
                url: articleName.replace( /&/g , 'And') + '.htm',
                success: function(data) {
                    json = $(data).find(".JSON").text();
                }
            });
    } else {
        $.ajax({
                async: false,
                url: '/' + articleName + '?action=render',
                success: function(data) {
                    json = $(data).find(".JSON").text();
                }
            });
    }
    return jQuery.parseJSON(json);
};

Googlemapscontrollerclass.prototype.LoadAreas = function() {

    var oAreas = this.GetJSONData('Maps_JSON');
    var node;
    var counter = 0;
    for (var oArea in oAreas) {
        if (!oAreas.hasOwnProperty(oArea))
            continue;
        counter++;
        var jsonId = oAreas[oArea];
        //      var pipo = 'before adding maptype'.concat(MapType);
        updateMarkerStatus('before adding area (' + counter + '): ' + oArea);
        node = new SS2MapConnector(oArea, jsonId).oNode;
        this.oMapConnectors[oArea] = node;

        //        node.oParentMapConnector = node;
        //        node.oParentConnector = node;
        updateMarkerStatus('after adding area: (' + counter + '): ' + oArea);
        //    alert(MapType);
    }

};


Googlemapscontrollerclass.prototype.UserInterfaceLoaded = function() {

    this.FillEnvVars();
    this.DefineProjectedOverlay();

    this.FillMapTypes();
    this.JsTreeInitialize();
    this.GoogleMapsInitialize();

    updateMarkerStatus('Area=' + getUrlVars()["area"]);

    //  window.google.maps.event.addListener(this.oGM, 'zoom_changed', function () {
    //      alert(gmcontroller.oGM.getZoom()); 
    //  });


};

Googlemapscontrollerclass.prototype.GotoGoogleMap = function(mapConnector, x, y) {
    this.SetCurrentNode(mapConnector);
    this.SetCoordinates(mapConnector, x || this.oCurrentNode.oDefaultMap.startx, y || this.oCurrentNode.oDefaultMap.starty);
};

Googlemapscontrollerclass.prototype.SetCurrentNode = function(mapConnector) {
    if (this.oCurrentNode == null || !(this.oCurrentNode.oDefaultMap === mapConnector.oDefaultMap)) {
        if (!this.markerdrag) {
            if (this.oCurrentNode)
                this.oCurrentNode.SetVisible(false);
        }
        this.oCurrentNode = mapConnector;
        if (!this.markerdrag) {
            this.oCurrentNode.SetVisible(true);
        }
        this.SetMapTypeID(this.oCurrentNode.oDefaultMap.tileset);
    }
};

Googlemapscontrollerclass.prototype.CreateAndReturnMapConnector = function (oParentConnector, mapPath, jsonname) {
    var idPrefix = ((oParentConnector) ? oParentConnector.cId + "/" : "");
    updateMarkerStatus('Find node' + mapPath);

    var oNode = this.oTree._get_node("#" + this.IDFormat(idPrefix + mapPath));
    updateMarkerStatus('Found node' + mapPath);
    var aPathParts;
    if (!(oNode)) {
        //      alert(mapPath);
        aPathParts = mapPath.replace(/\/Map$/, '').split("/");
        var semiPath = new String();
        var oPreviousConnector = oParentConnector;
        var oMainConnector = oParentConnector;
        for (var pathPart = 0; pathPart < aPathParts.length; pathPart++) {
            semiPath += (pathPart == 0 ? "" : "/") + aPathParts[pathPart];
            updateMarkerStatus('Find node ' + semiPath);
            oNode = this.oTree._get_node("#" + this.IDFormat(idPrefix + semiPath));
            updateMarkerStatus('Found node ' + semiPath);
            if (!(oNode)) {
                var caption = aPathParts[pathPart];
                if (pathPart == aPathParts.length - 1 && /^Map\d+$/.test(caption)) {
                    caption = caption.replace(/^Map/, 'Room ');
                }
                updateMarkerStatus('Create node ' + aPathParts[pathPart]);
                var newParentConnector = new SS2MapConnector(aPathParts[pathPart], jsonname, oPreviousConnector, caption, oMainConnector, (pathPart > 0 && pathPart < aPathParts.length - 1));
                updateMarkerStatus('Created node ' + aPathParts[pathPart]);
                oNode = newParentConnector.oNode;
                //            newParentNode.CreateNode(oParentConnector, 'last', {
                //                data: aPathParts[0]
                //            }, function () {
                //            }, true, aPathParts[0]);
            }
            oPreviousConnector = oNode.data('oConnector');
            if (pathPart == 0) oMainConnector = oPreviousConnector;

        }
    }
    if (oNode) {
        return oNode.data('oConnector');
    } else {
        return false;
    }
};

Googlemapscontrollerclass.prototype.SetMapTypeID = function(maptypename) {
    this.oGM.setMapTypeId(maptypename.slice(4).replace( /_/g , ' '));

};

Googlemapscontrollerclass.prototype.SetCoordinates = function(mapConnector, x, y) {
    var center =  this.FromPixelXYToLatLng(x, y, mapConnector.oMapTileSet.projection);

    this.oGM.setCenter(center);
};


Googlemapscontrollerclass.prototype.AddNPCMarker = function(projection, id, x, y, w, h, zx, zy, ax, ay, captionOverride) {
    var npc = new this.FromPixelXYToLatLng(x, y, projection);
    var marker;
    var imageBounds = new window.google.maps.LatLngBounds(new this.FromPixelXYToLatLng(x + (-ax) * zx, y + (h - ay) * zy, projection), new this.FromPixelXYToLatLng(x + (w - ax) * zx, y + (-ay) * zy, projection));
    if (this.markerdrag) {
        var image = this.getMarkerImage(id, w, h, zx, zy, ax, ay);

        marker = new window.google.maps.Marker({
                position: npc,
                map: this.oGM,
                title: (captionOverride) ? captionOverride : id,
                icon: image,
                draggable: true,
                raiseOnDrag: false
            });
        marker.origx = x;
        marker.origy = y;
        marker.sizex = w;
        marker.sizey = h;
        marker.zoomx = zx;
        marker.zoomy = zy;
        marker.anchorx = 0;
        marker.anchory = 0;
        // Add dragging event listeners.
        window.google.maps.event.addListener(marker, 'dragstart', function() {
            var oConnector = marker.oConnector;
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                var markerTitle = marker.getTitle();
                updateMarkerStatus('Dragging...' + markerTitle);
                oConnector.lUserEventInProgress = false;
            }
        });
        window.google.maps.event.addListener(marker, 'drag', function() {
            var oConnector = marker.oConnector;
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                updateMarkerStatus('Dragging...' + marker.getTitle());
                updateMarkerPosition(marker);
                oConnector.lUserEventInProgress = false;
            }
        });
        window.google.maps.event.addListener(marker, 'dragend', function() {
            var oConnector = marker.oConnector;
            if (!oConnector.lUserEventInProgress) {
                oConnector.lUserEventInProgress = true;
                updateMarkerStatus('Drag ended');
                oConnector.lUserEventInProgress = false;
            }
        });

    } else {
        marker = new ProjectedOverlay('http://sacredseasons2.wikia.com/wiki/Special:Filepath?file=' + id + '.png', imageBounds, {
            clickable: true,
            map: this.oGM,
            title: (captionOverride) ? captionOverride : id,
            percentOpacity: 100
        });

        /*

        'http://sacredseasons2.wikia.com/wiki/Special:Filepath?file='+id+'.png',
        imageBounds,
        {
        clickable: true,
        map: omap
        });
        */
        marker.position = new this.FromPixelXYToLatLng(x + (0.5 * w - ax) * zx, y + (-ay) * zy, projection);
        //marker.setMap(omap);
        //	marker.title=id
    }
    window.google.maps.event.addListener(marker, 'click', function() {
        var oConnector = marker.oConnector;
        if (!oConnector.lUserEventInProgress) {
            oConnector.lUserEventInProgress = true;
            oConnector.GoogleMaps_On_Select_Marker();
            oConnector.lUserEventInProgress = false;
        }
    });
    //updateMarkerPosition(marker);
    return marker;
};

Googlemapscontrollerclass.prototype.getMarkerImage = function(id, w, h, zx, zy, ax, ay) {
    var image = new window.google.maps.MarkerImage('http://sacredseasons2.wikia.com/wiki/Special:Filepath?file=' + id + '.png');
    image.size = new window.google.maps.Size(w, h);
    image.scaledSize = new window.google.maps.Size(w * zx, h * zy);
    image.anchor = new window.google.maps.Point(ax * zx, ay * zy);
    return image;
};

Googlemapscontrollerclass.prototype.FillMapTypes = function() {

    var oMapTypes = this.GetJSONData('Map_Tile_Sets_JSON');
    var returnObj = "";
    var counter = 0;
    for (var cMapType in oMapTypes) {
        if (!oMapTypes.hasOwnProperty(cMapType))
            continue;
        counter++;
        var x = oMapTypes[cMapType].tilesizex;
        var y = oMapTypes[cMapType].tilesizey;
        var z = oMapTypes[cMapType].zoommax;
        var mapType = cMapType.slice(4);
        //       var pipo = 'before adding maptype'.concat(MapType);
        updateMarkerStatus('before adding maptype (' + counter + '): ' + mapType);
        var oMapType = this.addMapType(mapType, x, y, z);
        updateMarkerStatus('after adding maptype: (' + counter + '): ' + mapType);
        //    alert(MapType);
        if (mapType == "Plimouth")
            returnObj = oMapType;
    }
    return returnObj;
};

Googlemapscontrollerclass.prototype.addMapType = function (mapname, x, y, z) {
    var projection = new SS2Projection();
    projection.SetDimensions(x, y, z);
    var ss2Options = {
        getTileUrl: function (coord, zoom) {
            var realzoom = zoom - this.minZoom;
            var numTiles = 1 << realzoom;
            var offset = 1 << (zoom - 1);
            var xx = coord.x - offset;
            var yy = coord.y - offset;
            if (xx < 0 || xx >= numTiles) {
                return null;
            }
            if (yy < 0 || yy >= numTiles) {
                return null;
            }
            return "http://sacredseasons2.wikia.com/wiki/Special:Filepath?file=Map_" + this.name + "_" + realzoom + "_" + xx + "_" + yy + ".png";
        },
        tileSize: new window.google.maps.Size(projection.SS2_RANGE_X, projection.SS2_RANGE_Y),
        isPng: true,
        minZoom: SS2_RANGE_ZOOMMAX - projection.SS2_RANGE_ZOOM,
        maxZoom: SS2_RANGE_ZOOMMAX,
        name: mapname
    };

    var ss2MapType = new window.google.maps.ImageMapType(ss2Options);
    ss2MapType.projection = projection;
    this.ss2MapTypeArray.push(ss2MapType);
    if ((mapname.indexOf(" ") == -1) || (mapname == "Swordfish Tavern")) {
        this.ss2MapTypeIDArray.push(mapname);
    };


    return ss2MapType;

};

Googlemapscontrollerclass.prototype.FromPixelXYToLatLng = function (x, y, projection) {

    var lat = -180 * (y + 0.5) / Math.pow(2, SS2_RANGE_ZOOMMAX) / projection.SS2_RANGE_Y;
    var lng = 360 * (x + 0.5) / Math.pow(2, SS2_RANGE_ZOOMMAX) / projection.SS2_RANGE_X;
    //  var lat = radiansToDegrees(latRadians);
    return new window.google.maps.LatLng(lat, lng, true);
};

Googlemapscontrollerclass.prototype.fromLatLngToPixelXY = function (latLng, projection) {

    var pointy = Math.floor(Math.pow(2, SS2_RANGE_ZOOMMAX) * projection.SS2_RANGE_Y * latLng.lat() / -180);
    var pointx = Math.floor(Math.pow(2, SS2_RANGE_ZOOMMAX) * projection.SS2_RANGE_X * latLng.lng() / 360);
    //  var lat = radiansToDegrees(latRadians);
    return new window.google.maps.Point(pointx, pointy);
};

Googlemapscontrollerclass.prototype.DefineProjectedOverlay = function () {

    // Create an overlay on the map from a projected image - Maps v3...
    // Author. John D. Coryat 05/2009
    // USNaviguide LLC - http://www.usnaviguide.com
    // Thanks go to Mile Williams EInsert: http://econym.googlepages.com/einsert.js, Google's GOverlay Example and Bratliff's suggestion...
    // Opacity code from TPhoto: http://gmaps.tommangan.us/addtphoto.html
    // This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
    //
    // Parameters:
    //    map: This Map
    //    imageUrl: URL of the image (Mandatory)
    //    bounds: Bounds object of image destination (Mandatory)
    //    Options:
    //    addZoom: Added Zoom factor as a parameter to the imageUrl (include complete parameter, including separater like '?zoom='
    //    percentOpacity: Default 50, percent opacity to use when the image is loaded 0-100.
    //    id: Default imageUrl, ID of the div
    //
    ProjectedOverlay.prototype = new window.google.maps.OverlayView();

    ProjectedOverlay.prototype.createElement = function () {

        var panes = this.getPanes();
        var div = this.div_;

        if (!div) {
            div = this.div_ = document.createElement("div");
            div.style.position = "absolute";
            div.setAttribute('id', this.id_);
            div.overlay = this;
            this.div_ = div;
            this.lastZoom_ = -1;
            if (this.percentOpacity_) {
                this.setOpacity(this.percentOpacity_);
            }
            if (this.clickable) {
                div.style.cursor = 'pointer';
                panes.overlayMouseTarget.appendChild(div);
                div.setAttribute('title', this.title);
                window.google.maps.event.addDomListener(div, 'click', function(e) {
                    e.cancelBubble = true;
                    if (e.stopPropagation) e.stopPropagation();
                    window.google.maps.event.trigger(this.overlay, 'click');
                    //                   var overlay = this.overlay;
                    //                   infowindow.close();
                    //                  updateMarkerStatus('Overlay Loading...' + overlay.title);
                    //                   load_content(overlay.getMap(), overlay, overlay.title);
                    //                   updateMarkerStatus('Overlay Loaded...' + overlay.title);
                });
            } else {
                panes.overlayLayer.appendChild(div);
            }

        }
    };
    ProjectedOverlay.prototype.onAdd = function () {
        // Creates the element if it doesn't exist already.
        this.createElement();
    }; // Remove the main DIV from the map pane

    ProjectedOverlay.prototype.getTitle = function () {
        return this.title;
    };
    ProjectedOverlay.prototype.setTitle = function (caption) {
        this.title = caption;
    };

    ProjectedOverlay.prototype.onRemove = function () {
        // Creates the element if it doesn't exist already.

        if (this.div_) {
            this.setMap(null);
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
        }
    }; // Redraw based on the current projection and zoom level...

    ProjectedOverlay.prototype.draw = function (firstTime) {

        if (!this.div_) {
            return;
        }

        var c1 = this.get('projection').fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var c2 = this.get('projection').fromLatLngToDivPixel(this.bounds_.getNorthEast());

        if (!c1 || !c2)
            return;

        // Now position our DIV based on the DIV coordinates of our bounds

        this.div_.style.width = Math.abs(c2.x - c1.x) + "px";
        this.div_.style.height = Math.abs(c2.y - c1.y) + "px";
        this.div_.style.left = Math.min(c2.x, c1.x) + "px";
        this.div_.style.top = Math.min(c2.y, c1.y) + "px";

        // Do the rest only if the zoom has changed...

        if (this.lastZoom_ == this.map_.getZoom()) {
            return;
        }

        this.lastZoom_ = this.map_.getZoom();

        var url = this.url_;

        if (this.addZ_) {
            url += this.addZ_ + this.map_.getZoom();
        }

        this.div_.innerHTML = '<img src="' + url + '"  width=' + this.div_.style.width + ' height=' + this.div_.style.height + ' >';
    };
    ProjectedOverlay.prototype.setOpacity = function (opacity) {
        if (opacity < 0) {
            opacity = 0;
        }
        if (opacity > 100) {
            opacity = 100;
        }
        var c = opacity / 100;

        if (typeof (this.div_.style.filter) == 'string') {
            this.div_.style.filter = 'alpha(opacity:' + opacity + ')';
        }
        if (typeof (this.div_.style.KHTMLOpacity) == 'string') {
            this.div_.style.KHTMLOpacity = c;
        }
        if (typeof (this.div_.style.MozOpacity) == 'string') {
            this.div_.style.MozOpacity = c;
        }
        if (typeof (this.div_.style.opacity) == 'string') {
            this.div_.style.opacity = c;
        }
    };
};

function ProjectedOverlay(imageUrl, bounds, opts) {

    this.clickable = opts.clickable || false;
    this.map_ = opts.map;
    this.url_ = imageUrl;
    this.bounds_ = bounds;
    this.addZ_ = opts.addZoom || '';
    // Add the zoom to the image as a parameter
    this.id_ = opts.id || this.url_;
    // Added to allow for multiple images
    this.percentOpacity_ = opts.percentOpacity || 50;
    this.title = opts.title || '';
    if (this.map_) {
        this.setMap(this.map_);
    }
}

function GooglemapsConnector() {
}

GooglemapsConnector.prototype.oNode = null;
GooglemapsConnector.prototype.cId = null;
//GooglemapsConnector.prototype.oController=null;
GooglemapsConnector.prototype.oParentConnector = null;
GooglemapsConnector.prototype.rawId = null;
GooglemapsConnector.prototype.lArea = false;
GooglemapsConnector.prototype.stemId = null;
GooglemapsConnector.prototype.cWikiPage = null;

GooglemapsConnector.prototype.Create_Node = function (node, position, js, callback, isLoaded, id) {

    this.oNode = this.oController.oTree.create_node((typeof node.oNode == "object") ? node.oNode : node, position, js, callback, isLoaded).data('oConnector', this);
    if (id) {
        this.cId = id;
        this.oNode.attr("id", this.oController.IDFormat(id));
    }
    //	this.oNode.oConnector=this;
};

GooglemapsConnector.prototype.CreateNode = function (id, json, grandParentConnector, captionOverride, hasChildren, insertPosition, virtual, iconUrl) {
    this.caption = (captionOverride) ? captionOverride : id;
    this.cJSON = json;
    this.rawId = ((grandParentConnector) ? grandParentConnector.cId + "/" : "") + id;
    this.stemId = id;
    this.cWikiPage = ((grandParentConnector && !grandParentConnector.lArea) ? grandParentConnector.cWikiPage + "/" : "") + id +
        (!(virtual && /^Map \d+$/.test(id)) ? '/Map' : "");
    var nodeData = (iconUrl) ? { data: { title: this.caption, icon: iconUrl}} : { data: this.caption };
    this.Create_Node(grandParentConnector || -1, insertPosition || 'last', nodeData, function() {
    }, true, this.rawId);
    if (grandParentConnector) {
        this.oParentMapConnector = grandParentConnector;
        this.oParentConnector = grandParentConnector;
    }
    if (hasChildren) {
        this.oNode.removeClass('jstree-leaf').addClass('jstree-closed');
    }
    //    var node = this.oNode;
    //    this.CreateNode(node, 'inside', {
    //        data: 'placeholder'
    //    }, function () {
    //    }, true);
    //    this.oNode = node;
    return this.oNode;
};

GooglemapsConnector.prototype.TreeView_On_Select_Node = function(event, data) {
    //	alert('selected');
    updateMarkerStatus(this.caption + ' selected');
};
GooglemapsConnector.prototype.TreeView_On_Deselect_Node = function(event, data) {
    //	alert(this.caption + ' deselected');
    updateMarkerStatus(this.caption + ' deselected');
};
GooglemapsConnector.prototype.TreeView_On_DblClick_Node = function(event, data) {
    //	alert(this.caption + ' deselected');
    updateMarkerStatus(this.caption + ' dblclicked');

    //	this.oController.jsTree.open_node(this.oNode);
};
GooglemapsConnector.prototype.TreeView_On_Open_Node = function(event, data) {
    updateMarkerStatus(this.caption + ' opened');
    //	alert(this.caption + ' opened');
};
GooglemapsConnector.prototype.TreeView_On_After_Open = function(event, data) {
    //	alert(this.caption + ' after open');
};
GooglemapsConnector.prototype.TreeView_On_Close_Node = function(event, data) {
    updateMarkerStatus(this.caption + ' closed');
    //	alert(this.caption + ' closed');
};
GooglemapsConnector.prototype.TreeView_On_After_Close = function(event, data) {
    //	alert(this.caption + ' after close');
};
GooglemapsConnector.prototype.TreeView_On_Check_Node = function(event, data) {
    //	alert(this.caption + ' checked');
};
GooglemapsConnector.prototype.TreeView_On_Uncheck_Node = function(event, data) {
    //	alert(this.caption + ' unchecked');
};

function SS2MapConnector(id, json, parentConnector, captionOverride, parentMapConnector, virtual) {
    this.lArea = (!(parentMapConnector));
    this.CreateNode(id, json, parentConnector, captionOverride, true, parentMapConnector, virtual);
    if (parentMapConnector)
        this.oParentMapConnector = parentMapConnector;
    if (virtual) {
        this.lVirtual = true;
    } else {
        this.oController.oMapConnectors[this.rawId] = this;
    }
    this.oMapObjects = new Object();
    this.aMapObjectTypes = new Array();
    return this;
};

SS2MapConnector.prototype = new GooglemapsConnector();
SS2MapConnector.prototype.oArea = null;
SS2MapConnector.prototype.oDefaultMap = null;
SS2MapConnector.prototype.oMap = null;
SS2MapConnector.prototype.oJSON = null;
SS2MapConnector.prototype.cJSON = '';
SS2MapConnector.prototype.lVirtual = false;
SS2MapConnector.prototype.oParentMapConnector = null;
SS2MapConnector.prototype.aMapObjectTypes = new Array();
SS2MapConnector.prototype.oMapObjects = new Object();

SS2MapConnector.prototype.CreateParentNode = function(id, json, grandParentConnector, captionOverride) {
    return this.CreateNode(id, json, grandParentConnector, captionOverride, true);
};

SS2MapConnector.prototype.LoadJSON = function (jsonname) {
    updateMarkerStatus('Get json ' + jsonname);
    this.oJSON = this.oController.GetJSONData(jsonname);
    updateMarkerStatus('Got json');
    var cJSONPart;
    var oJSONPart;
    this.lVirtual = true;
    for (cJSONPart in this.oJSON) {
        if (!this.oJSON.hasOwnProperty(cJSONPart))
            continue;
        oJSONPart = this.oJSON[cJSONPart];

        if (cJSONPart.toString().indexOf("/") < 0) {
            if (cJSONPart == "Roomnodes") {
                this.oRoomNodes = oJSONPart;
            } else {
                if (cJSONPart == "Dungeons" || cJSONPart == "SubAreas") {
                    for (var cJSONSubPart in oJSONPart) {
                        if (!oJSONPart.hasOwnProperty(cJSONSubPart))
                            continue;

                        var oJSONSubPart = oJSONPart[cJSONSubPart];

                        var subnode = this.oController.CreateAndReturnMapConnector(this, cJSONSubPart, oJSONSubPart);
                        if (subnode) {
                            //                       subnode.oJSON = oJSONSubPart;
                        }
                    }
                }
            }
        }
    }
    if (this.oRoomNodes) {
        for (var cSubStructure in this.oRoomNodes) {
            if (!this.oRoomNodes.hasOwnProperty(cSubStructure))
                continue;
            var iRoomNodesRoomCount = this.oRoomNodes[cSubStructure];
            for (var iRoom = (iRoomNodesRoomCount == 0 ? 0 : 1); iRoom <= iRoomNodesRoomCount; iRoom++) {
                cJSONPart = cSubStructure + "/Map" + (iRoom == 0 ? "" : iRoom);
                oJSONPart = this.oJSON[cJSONPart];
                this.LoadMapNode(this.oParentMapConnector, cJSONPart, oJSONPart);
            }
        }
    } else {
        for (cJSONPart in this.oJSON) {
            if (!this.oJSON.hasOwnProperty(cJSONPart))
                continue;
            oJSONPart = this.oJSON[cJSONPart];
            if (cJSONPart.toString().indexOf("/") >= 0) {
                //           alert(cJSONPart);
                this.LoadMapNode(this.oParentMapConnector, cJSONPart, oJSONPart);
            }
        }
    }
};

SS2MapConnector.prototype.LoadMapNode = function (oParentMapConnector, cJSONPart, oJSONPart) {
    var nodeController = this.oController.CreateAndReturnMapConnector(oParentMapConnector, cJSONPart);
    if (oJSONPart) {
        if (nodeController) {
            nodeController.LoadMapObjects(oJSONPart);
            nodeController.oDefaultMap = oJSONPart;
            nodeController.lVirtual = false;
        }
        if (nodeController.oParentConnector) {
            var oMapTileSet = nodeController.oMapTileSet;
            do {
                nodeController = nodeController.oParentConnector;
                if (!(nodeController.oDefaultMap)) {
                    nodeController.oDefaultMap = oJSONPart;
                    nodeController.oMapTileSet = oMapTileSet;
                }
            } while (nodeController.oParentConnector && !(nodeController.oParentConnector === nodeController));
        }
    }
};

SS2MapConnector.prototype.LoadMapObjects = function (oMapJSON) {
    this.oMap = oMapJSON;
    this.oMapTileSet = this.oController.oGM.mapTypes[oMapJSON.tileset.slice(4).replace(/_/g, ' ')];
    for (var cJSONPart in this.oMap) {
        if (!this.oMap.hasOwnProperty(cJSONPart))
            continue;
        var oJSONPart = this.oMap[cJSONPart];
        if (cJSONPart == "NPC" || cJSONPart == "NPC") {
            var lFirst = true;
            for (var cJSONSubPart in oJSONPart) {
                if (!oJSONPart.hasOwnProperty(cJSONSubPart))
                    continue;
                if (lFirst) {
                    lFirst = false;
                    this.aMapObjectTypes.add(cJSONPart);
                }
                var oJSONSubPart = oJSONPart[cJSONSubPart];
                var newObjectConnector = new SS2ObjectConnector(this, cJSONPart, cJSONSubPart, oJSONSubPart);

                //               alert(cJSONSubPart + " " + oJSONSubPart.wikiname);
            }
        }
    }
    for (var objectType in this.aMapObjectTypes) {
         this.loadInfoHTML(this.aMapObjectTypes[objectType]);
    }
};

SS2MapConnector.prototype.loadInfoHTML = function (family) {
    var id = this.cWikiPage + "/" + family;
    if (localcontent) {
        $.ajax({
            type: "GET",
            data: "",
            dataType: "HTML",
            oConnect: this,
            cFamily: family,
            url: id.replace( /&/g , 'And') + '.htm',
            success: function (data) {
                this.oConnect.fillInfoHTML(this.cFamily, data);
            }
        });

    } else {
        $.ajax({
            oConnect: this,
            cFamily: family,
            url: '/' + id + '?action=render',
            success: function (data) {
                this.oConnect.fillInfoHTML(this.cFamily, data);
            }
        });
    }

};

SS2MapConnector.prototype.fillInfoHTML = function (family, data) {
    for (var cMapObject in this.oMapObjects) {
        if (!this.oMapObjects.hasOwnProperty(cMapObject))
            continue;
        var oMapObject = this.oMapObjects[cMapObject];
        if (!(oMapObject.cFamily === family) || oMapObject.cInfoHTML.length)
            continue;
        var divObject = $(data).find("." + family.toLowerCase() + "-" + oMapObject.cChildID)[0];
        if (divObject)
            oMapObject.cInfoHTML = divObject.innerHTML.replace( /\<a /g , '<a target="_blank" ');
    }
};
SS2MapConnector.prototype.TreeView_On_Open_Node = function(event, data) {
    updateMarkerStatus('Start opening node');
    this.LoadMap();
};
SS2MapConnector.prototype.TreeView_On_Select_Node = function(event, data) {
    updateMarkerStatus('Start selecting node');
    this.SelectMap();
};
SS2MapConnector.prototype.SelectMap = function(x, y) {
    updateMarkerStatus('Start loading map');
    this.LoadMap();
    //    this.oController.SetCurrentNode(this);
    if (this.oDefaultMap) {
        updateMarkerStatus('Start selecting map tile set ' + this.oDefaultMap.tileset);
        gmcontroller.GotoGoogleMap(this, x, y);
        //     this.oController.SetMapTypeID(this.oDefaultMap.tileset);
        //      this.oController.SetCoordinates(this.oDefaultMap.startx, this.oDefaultMap.starty);
    }

};
SS2MapConnector.prototype.LoadMap = function() {
    if (this.lVirtual || (this.oMap)) {
        //       alert('loaded');
    } else {
        this.LoadJSON(this.cJSON);
        //   this.oController.oTree.close_all(this.oNode, true);
    }
};

SS2MapConnector.prototype.TreeView_On_Check_Node = function(event, data) {
    this.SetVisible(true);
};

SS2MapConnector.prototype.TreeView_On_Uncheck_Node = function(event, data) {
    this.SetVisible(false);
};

SS2MapConnector.prototype.SetVisible = function(visible) {
    this.LoadMap();
    for (var cMapObject in this.oMapObjects) {
        if (!this.oMapObjects.hasOwnProperty(cMapObject))
            continue;
        var oMapObject = this.oMapObjects[cMapObject];
        oMapObject.SetVisible(visible);
//        if (visible) {
//            this.oController.oTree.check_node(oMapObject);
//        } else {
//            this.oController.oTree.uncheck_node(oMapObject);
//        }
    }
};

function SS2ObjectConnector(mapConnector, family, id, jsonData) {

    // {"map": "Overgrown Path/Map/NPC", "wikiname": "Marked Soil 7", "image": "", "caption": "", "x": 1067, "y": 798, "width": 52, "height": 37, "zoomx":1, "zoomy": 1}
    // this.oParentMapConnector = mapConnector;
    this.cParent = mapConnector.cId;
    this.cFamily = family;
    this.cChildID = id;
    mapConnector.oMapObjects[mapConnector.cId + "/" + family + "/" + id] = this;
    this.cJSON = id;
    this.oJSON = jsonData;
    //alert(this.oJSON.wikiname);
    this.oJSON.anchorx = this.oJSON.anchorx || this.oJSON.width / 2;
    this.oJSON.anchory = this.oJSON.anchory || this.oJSON.height;
    this.oMarker = mapConnector.oController.AddNPCMarker(mapConnector.oMapTileSet.projection, this.oJSON.wikiname, this.oJSON.x, this.oJSON.y,
        this.oJSON.width, this.oJSON.height, this.oJSON.zoomx, this.oJSON.zoomy, this.oJSON.anchorx, this.oJSON.anchory,
        (this.oJSON.caption) ? this.oJSON.caption : this.oJSON.wikiname);
    this.oLeaf = this.CreateLeaf(family + "/" + id, jsonData, mapConnector, family + ": " + this.oJSON.wikiname);
    this.oMarker.oConnector = this;
    if (this.oController.markerdrag) {
        this.oController.oTree.uncheck_node(this.oLeaf);
    } else {
        this.oController.oTree.check_node(this.oLeaf);
    }
    ;

}

SS2ObjectConnector.prototype = new GooglemapsConnector();
SS2ObjectConnector.prototype.oParentMapConnector = null;
SS2ObjectConnector.prototype.oLeaf = null;
SS2ObjectConnector.prototype.oMarker = null;
SS2ObjectConnector.prototype.oJSON = null;
SS2ObjectConnector.prototype.cJSON = '';
SS2ObjectConnector.prototype.lTreeNonUI = false;
SS2ObjectConnector.prototype.cInfoHTML = '';

SS2ObjectConnector.prototype.CreateLeaf = function(id, json, parentConnector, captionOverride) {
    return this.CreateNode(id, json, parentConnector, captionOverride, false);
};

SS2ObjectConnector.prototype.TreeView_On_Select_Node = function(event, data) {
    updateMarkerStatus('Start selecting leaf ' + this.oJSON.wikiname);
    if (!this.oController.markerdrag) {
        this.oParentMapConnector.SelectMap(this.oJSON.x, this.oJSON.y);
    }
    this.SetVisible(true);
    this.oController.oTree.check_node(this.oLeaf);
    this.SelectMarker();
};

SS2ObjectConnector.prototype.SelectMarker = function() {
    this.oController.infowindow.close();
    updateMarkerStatus('Loading...' + this.oMarker.getTitle());
    this.load_content(this.oMarker.getMap(), this.oMarker, this.oMarker.getTitle());
    updateMarkerStatus('Loaded...' + this.oMarker.getTitle());
};

SS2ObjectConnector.prototype.load_content = function (map, marker, id) {
    var options;
    this.maxwidth = 660;
    if (this.cInfoHTML) {
        options = {
            content: this.cInfoHTML,
            maxwidth: this.maxwidth
        };
        this.oController.infowindow.setOptions(options);
        this.oController.infowindow.open(map, marker);
    } else {
        if (localcontent) {
            var resultString = 'This is a fixed string to show something in the infowindow';
            options = {
                content: resultString,
                maxwidth: this.maxwidth
            };
            this.oController.infowindow.setOptions(options);
            $.ajax({
                type: "GET",
                data: "",
                dataType: "HTML",
                oConnect: this,
                url: id + '.htm',
                success: function (data, textStatus, jqXHR) {
                    var ajaxResultString = $(data).find(".tooltip-content")[0].innerHTML;
                    this.oConnect.cInfoHTML = ajaxResultString.replace(/\<a /g, '<a target="_blank" ');
                    var ajaxOptions = {
                        content: this.oConnect.cInfoHTML,
                        maxwidth: this.oConnect.maxwidth
                    };
                    this.oConnect.oController.infowindow.setOptions(ajaxOptions);
                    this.oConnect.oController.infowindow.open(map, marker);
                },
                error: function () {
                    this.oConnect.oController.infowindow.open(map, marker);
                }
            });

        } else {
            $.ajax({
                oConnect: this,
                url: '/' + id + '?action=render',
                success: function (data) {
                    var ajaxResultString = $(data).find(".tooltip-content")[0].innerHTML;
                    this.oConnect.cInfoHTML = ajaxResultString.replace(/\<a /g, '<a target="_blank" ');
                    var ajaxOptions = {
                        content: this.oConnect.cInfoHTML,
                        maxwidth: this.oConnect.maxwidth
                    };
                    this.oConnect.oController.infowindow.setOptions(ajaxOptions);
                    this.oConnect.oController.infowindow.open(map, marker);
                }
            });
        }
    }
};

SS2ObjectConnector.prototype.TreeView_On_Check_Node = function(event, data) {
    this.SetVisible(true);
};
SS2ObjectConnector.prototype.TreeView_On_Uncheck_Node = function(event, data) {
    this.SetVisible(false);
};

SS2ObjectConnector.prototype.GoogleMaps_On_Select_Marker = function() {
    this.SelectMarker();
    this.SelectLeaf();
};

SS2ObjectConnector.prototype.SelectLeaf = function() {
//    if (!this.lTreeNonUI) {
//        this.lTreeNonUI = true;
    this.oController.oTree.deselect_all();
    this.oController.oTree.select_node(this.oLeaf);
//        this.lTreeNonUI = false;
//    }
};


SS2ObjectConnector.prototype.SetVisible = function(visible) {
    this.lvisible = visible;
    if (this.lvisible) {
        if (!(this.oMarker.getMap() === this.oController.oGM)) {

            this.oMarker.setMap(this.oController.oGM);
        }
        this.oController.oTree.check_node(this.oLeaf);
    } else {
        this.oMarker.setMap(null);
        this.oController.oTree.uncheck_node(this.oLeaf);
    }
};


function SS2Projection() {

    this.SetDimensions(256, 256, 4);
};

SS2Projection.prototype.SetDimensions = function(x, y, z) {

    this.SS2_RANGE_X = x;

    this.SS2_RANGE_Y = y;

    this.SS2_RANGE_ZOOM = z;

    // Using the base map tile, denote the lat/lon of the equatorial origin.
    this.worldOrigin_ = new window.google.maps.Point(this.SS2_RANGE_X * 400 / 800, this.SS2_RANGE_Y / 2);
    // This projection has equidistant meridians, so each longitude degree is a linear
    // mapping.
    this.worldCoordinatePerLonDegree_ = this.SS2_RANGE_X / 360;

    // This constant merely reflects that latitudes vary from +90 to -90 degrees.
    this.worldCoordinateLatRange = this.SS2_RANGE_Y / 2;
};

SS2Projection.prototype.fromLatLngToPoint = function(latLng) {

    var origin = this.worldOrigin_;
    var x = origin.x + this.worldCoordinatePerLonDegree_ * latLng.lng();

    // Please notice that latitude is measured from the world coordinate origin
    // at the top left of the map.
    // var latRadians = degreesToRadians(latLng.lat());
    var y = origin.y - this.worldCoordinateLatRange * latLng.lat() / 90;
    //alert(latLng.lng()+':'+x+'      '+latLng.lat()+':'+y);
    return new window.google.maps.Point(x, y);
};

SS2Projection.prototype.fromPointToLatLng = function(point, noWrap) {

    var y = point.y;
    var x = point.x;

    if (y < 0) {
        y = 0;
    }
    if (y >= this.SS2_RANGE_Y) {
        y = this.SS2_RANGE_Y;
    }

    var origin = this.worldOrigin_;
    var lng = (x - origin.x) / this.worldCoordinatePerLonDegree_;
    var lat = 90 * ((origin.y - y) / this.worldCoordinateLatRange);
    //  var lat = radiansToDegrees(latRadians);
    return new window.google.maps.LatLng(lat, lng, noWrap);
};

function updateMarkerStatus(str) {
    document.getElementById('markerStatus').innerHTML = str;
}

function updateMarkerPosition(marker) {
    var map = marker.getMap();
    var projection = map.getProjection();
    var latLng = marker.getPosition();
    var point = gmcontroller.fromLatLngToPixelXY(latLng, projection);
    document.getElementById('info').innerHTML = [
        -(point.x - marker.origx) / marker.zoomx - marker.anchorx, -(point.y - marker.origy) / marker.zoomy - marker.anchory
    ].join(', ');
}

Array.prototype.indexAt = function() {
    var arrayLength = this.length;
    for (var i = 0; i < arrayLength; i++) {
        if (this[i] === arguments[0])
            return i;
    };
    return -1; 
};

Array.prototype.add = function(newElement) {
    if (this.indexAt(newElement) == -1) this.push(newElement);
    return this;
};

addOnloadHook(initializegooglemaps);