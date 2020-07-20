/* Any JavaScript here will be loaded for all users on every page load. */

/* For the "World of Avatar" interactive section on the mainpage
 * Requires Leaflet 1.2.0 script import to run
 * By [[User:KettleMeetPot|KettleMeetPot]]
 */
var map;
var mapData;
var newPinNum = 0;

function mapClick(isTrusted) {
    $(".mainpage-map-link, .mainpage-view-thumbnail").click(function () {
        $("body").prepend('<div class="map-display-overlay" style="width: 100%;height: 100%;z-index: 100;background: rgba(0, 0, 0, 0.8); position:fixed; bottom:0px; display:none;"></div>');
        $("body").prepend('<div id="interactive-map" style="display:none"></div>');
        $(".map-display-overlay, #interactive-map").fadeIn("fast",function () { 
            makeMap(isTrusted);
        });
        $("#globalNavigation").attr('style','transform:translateY(-100%)');
        $(".map-display-overlay").click(function () {
            $("#interactive-map").remove();
            $(".map-display-overlay").remove();
            $("#globalNavigation").attr('style','');
        });
    });
}

function makeMap (isTrusted) {
    map = L.map('interactive-map', { 
            maxZoom: 1,
            minZoom: 0, 
            zoom: 0,
            center: [-347, 594],
            crs: L.CRS.Simple 
        });
    var southWest = map.unproject([0, 5625], 3);
	var northEast = map.unproject([10000, 0], 3);
    var bounds = new L.LatLngBounds(southWest, northEast);
    var image = L.imageOverlay('https://vignette.wikia.nocookie.net/avatar/images/9/9b/Map_14-min.png/revision/latest/scale-to-width-down/3000', bounds).addTo(map);
    map.setMaxBounds(bounds);
    
    /* Array of marker icons */
    var markerIcons = [
        'https://vignette.wikia.nocookie.net/avatar/images/e/e9/Pin_general.png',
        'https://vignette.wikia.nocookie.net/avatar/images/2/25/Pin_man-made_landmarks.png',
        'https://vignette.wikia.nocookie.net/avatar/images/b/ba/Pin_capital_city.png',
        'https://vignette.wikia.nocookie.net/avatar/images/e/e8/Pin_Air_Nomads_emblem.png',
        'https://vignette.wikia.nocookie.net/avatar/images/5/5e/Pin_Aang%27s_happy_face.png',
        'https://vignette.wikia.nocookie.net/avatar/images/b/b7/Pin_water.png',
        'https://vignette.wikia.nocookie.net/avatar/images/d/d4/Pin_natural_landmarks.png'
    ];
    
    /* Coordinates control display in the bottom left for debugging purposes */
    var CoordinatesDisplay = L.Control.extend({
        options: {
            position: 'bottomleft'
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom leaflet-coordinates-display');
            container.style.backgroundColor = 'white';
            container.style.width = '150px';
            container.style.height = '20px';
            container.style.paddingLeft = '10px';
            return container;
        }
    });
    
    /* Marker control button on the top left for ease-of-access */
    var AddMarkerButton = L.Control.extend({
        options: {
            position: 'topleft'
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom leaflet-marker-button');
            container.style.width = '40px'; //default was 30
            container.style.height = '40px'; //default was 30
            container.onclick = function () {
                console.log('buttonClicked');
            };
            return container;
        }
    });
    /* "Save changes" button control for visual editing tool */
    var editToolSaveButton = L.Control.extend({
        options: {
            position: 'topleft'
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('button', 'EditToolCommit submit');
            container.innerHTML = 'Save Changes';
            container.style.zIndex = -1;
            container.disabled = true;
            container.onclick = function () {
                mapData = 'The information for the pins and markers used on the [[User:KettleMeetPot/WorldMap|mainpage map]] are stored here.\n<!-- Page content demarcation for parser -->\n' + mapData + '\n<!-- Page content demarcation for parser -->'; 
                var edittoken = mw.user.tokens.get( 'editToken' );
                $('.EditToolCommit').prop("disabled", true);
                $.ajax({
                    type: "POST",
                    url: "https://avatar.fandom.com/api.php",
                    data: { action:'edit', title:'Avatar_Wiki:MainpageMapData', text: mapData, token: edittoken, summary:'Visual editing tool: committing changes.' },
                    success: function () {
                        location.reload(true);
                    }
                });
            };
            return container;
        }
    });
    
    /* SYSOP mode display notification */
    var sysopNote = L.Control.extend({
        options: {
            position: 'topleft'
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', '');
            container.innerHTML = 'Mode: SYSOP <br>' + wgUserName;
            container.style.color = '#00ff00';
            container.style.fontWeight = 'bold';
            return container;
        }
    });
    
    /* List of markers on the left hand side */
    var markersList = L.Control.extend({
        options: {
            position: 'topleft'
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom marker-list');
            container.style.background = 'rgba(255, 255, 255, 0.8)';
            container.style.width = '205px';
            container.style.height = '50px';
            container.style.paddingLeft = '5px';
            container.style.top = '30%';
            container.style.position = 'fixed';
            return container;
        }
    });
    
    /* Define marker icon classes */
    var standardPin = L.Icon.extend({
        options: {
            iconSize:     [25, 25], 
            iconAnchor:   [12.5, 12.5], 
            popupAnchor:  [-1, -14],
            className: 'map-marker-icons'
        }
    });

    var general = new standardPin({iconUrl: markerIcons[0]}),
        manmade = new standardPin({iconUrl: markerIcons[1]}),
        capital = new standardPin({iconUrl: markerIcons[2]}),
        air = new standardPin({iconUrl: markerIcons[3]}),
        aang = new standardPin({iconUrl: markerIcons[4]}),
        water = new standardPin({iconUrl: markerIcons[5]}),
        natural = new standardPin({iconUrl: markerIcons[6], popupAnchor:  [-3, -12]});
        
    /* Initialize controls and events */
    map.addControl(new CoordinatesDisplay());
    if ( isTrusted == true ) {
        map.addControl(new AddMarkerButton());
        map.addControl(new editToolSaveButton());
        map.addControl(new sysopNote());
    }
    map.addControl(new markersList());
    map.on("click", function (event) {
        $('.leaflet-coordinates-display').text( event.latlng.toString() );
	});
	
	$(".leaflet-marker-button").on('hover', function() {
        $(".leaflet-marker-button").animate({borderBottomRightRadius:'0px', borderTopRightRadius:'0px'}, 'fast');
        $('.marker-dropdown').stop(true, true).animate({width: "toggle"}, "fast");
        
    });
    
    map.whenReady(function () {
        if ( isTrusted == true ) {
            markerButtonInit(markerIcons);
        }
        markerListControl(markerIcons);
        
        var mapDataArray = mapData.replace(/\n/ig,'').split('\\');
        var arrayLength = mapDataArray.length;
        var descriptionLinkArray;
        var concatHTMLDescription;
        var formatTitle;
        var htmlLinkTitle;
        var isLink;
        var titleField;
        for ( i = 0; i < arrayLength; i += 5 ) {
            formatTitle = mapDataArray[i+3].replace(/\[\[/ig,'').replace(/\]\]/ig,'').split('|');
            if ( formatTitle.length == 2 ) {
                //is a piped link
                isLink = 'piped';
                titleField = formatTitle[1];
                htmlLinkTitle = '<a href="/wiki/' + formatTitle[0] + '" class="mapPopUpTitles">' + formatTitle[1] + '</a>';
            }
            else if ( mapDataArray[i+3].indexOf("[[") != -1 ) {
                //is a non-piped link
                isLink = 'non-piped';
                titleField = formatTitle[0];
                htmlLinkTitle = '<a href="/wiki/' + formatTitle[0] + '" class="mapPopUpTitles">' + formatTitle[0] + '</a>';
            }
            else {
                //no link
                isLink = false;
                titleField = formatTitle[0];
                htmlLinkTitle = '<span class="mapPopUpTitles">' + formatTitle[0] + '</span>';
            }
            
            var eMarker = L.marker([parseInt(mapDataArray[i]), parseInt(mapDataArray[i+1])], {icon: eval(mapDataArray[i+2]), opacity: 0.6, title:titleField, riseOnHover:true});
            
            descriptionLinkArray = mapDataArray[i+4].replace(/&amp;lt;/g,"<").replace(/&amp;quot;/g,'"').replace(/&amp;gt;/g,">").replace(/'''(.*)'''/g,"<span style='font-weight:bold'>$1</span>").split(/\[\[|]]/g); //Plus replacement of symbols
            concatHTMLDescription = concatenateHTMLlinksDescription (descriptionLinkArray);
            var popup = L.popup({ maxWidth: 400 }).setContent('<div class="titlePopUp">' + htmlLinkTitle + '</div><div class="descriptionPopUp" style="margin-top:3px; text-align:justify">' + concatHTMLDescription + '</div>');
            eMarker.addTo(map).bindPopup(popup);
            $(eMarker._icon).addClass('existing-marker-' + mapDataArray[i+2]);
            
            /* Initializes editing functions for checkpage users */
            if ( isTrusted == true ) {
                var existingPopUp = eMarker._popup._content;
                var existingIcon = mapDataArray[i+2];
                eMarker._popup.setContent(existingPopUp + '<div><a href="javascript:void(0)" id="editLink">edit</a> • <a href="javascript:void(0)" id="deleteLink">delete</a></div>');
                var concatDescription = concatenateEditLinksDescription (descriptionLinkArray);
                editExistingMarker(eMarker, existingIcon, isLink, formatTitle, concatDescription);
            }
        }
        
        /* Click function for the marker buttons control on top-left */
        $('.marker-dropdown').on('click', function (event) {
            if ( $('.marker-dropdown.active').length == 0 ) {
                var buttonID = $(this).attr('id').substr(6, 1);
                enableAddMarker(buttonID, general, manmade, capital, air, aang, water, natural, editToolSaveButton);
                $(this).addClass('active');
                event.stopPropagation();
            }
        });
    });
}

function enableAddMarker(buttonID, general, manmade, capital, air, aang, water, natural, editToolSaveButton) {
    var addMarkerVar = function(event) {
        addMarker(event, buttonID, general, manmade, capital, air, aang, water, natural, addMarkerVar, editToolSaveButton);
    };
    setTimeout(function() {
        map.on('click', addMarkerVar);
    }, 100);
}


function addMarker(event, buttonID, general, manmade, capital, air, aang, water, natural, addMarkerVar, editToolSaveButton) {
    newPinNum++;
    var iconArray = [general, manmade, capital, air, aang, water, natural];
    var Marker = L.marker(event.latlng,{
        icon:iconArray[buttonID], 
        opacity: 0.6,
        draggable:true
    });
    Marker.addTo(map).bindPopup('<input name="title" placeholder="title" autocomplete="off" id="titleEditPopUp"><textarea id="descriptionEditPopUp" tabindex="5" rows="4" style="resize:none; width:100%;margin-top: 5px" placeholder="Enter description"></textarea><button id="pin-submit" class="set-pin" disabled="disabled">Submit pin</button>');
    $(Marker._icon).addClass('new-edit-marker' + newPinNum);
    
    editToolPopUps(Marker, buttonID);
    
    map.off('click', addMarkerVar);
    $('#marker'+buttonID).removeClass('active');
}

function markerButtonInit (markerIcons) {
    $('.leaflet-marker-button').append('<div class="leaflet-bar leaflet-control leaflet-control-custom marker-dropdown" id="marker0" style="background-image:url(' + markerIcons[0] + '); display:none;"></div>');
    for (i = 1; i < 7; i++) { 
        if ( i % 2 === 0) {
            //even
            $('#marker' + (i-2)).append('<div class="leaflet-bar leaflet-control leaflet-control-custom marker-dropdown" id="marker' + i + '" style="background-image:url(' + markerIcons[i] + '); display:none;"></div>');
        }
        if ( i === 1) {
            //bottom row start button
            $('#marker0').after('<div class="leaflet-bar leaflet-control leaflet-control-custom marker-dropdown" id="marker1" style="bottom: 20px; left:50px; background-image:url(' + markerIcons[1] + '); display:none;"></div>');
        }
        if ( i % 2 !== 0 && i !== 1) {
            //odd
            $('#marker' + (i-2)).append('<div class="leaflet-bar leaflet-control leaflet-control-custom marker-dropdown" id="marker' + i + '" style="background-image:url(' + markerIcons[i] + '); display:none;"></div>');
        }
    }
}

function editToolPopUps (Marker, buttonID) {
    var iconNameOrder = ['general', 'manmade', 'capital', 'air', 'aang', 'water', 'natural'];
    Marker.on('click', function () {
        editInputBoxesKeyUp ();
        $("#pin-submit").click(function (){
            var pinDescription = $("#descriptionEditPopUp").val();
            var pinTitle = $("#titleEditPopUp").val();
            var markerLat = Math.round(Marker.getLatLng().lat);
            var markerLng = Math.round(Marker.getLatLng().lng);
            mapData = mapData.trim() + '\\\n' + markerLat + '\\' + markerLng + '\\' + iconNameOrder[buttonID] + '\\' + pinTitle + '\\' + pinDescription;
            Marker._popup.setContent('Pin stored. Please hit the "save changes" button to commit all added/changed/removed pins.');
            Marker.dragging.disable();
            $(Marker._icon).addClass('complete');
            if ( $('.complete').length == 1 ) {
                $('.EditToolCommit').prop("disabled", false);
            }
        });
    });
}

function editExistingMarker (eMarker, existingIcon, isLink, formatTitle, concatDescription) {
    eMarker.on('click', function () {
        $(eMarker._icon).focus();
        var markerLat = Math.round(eMarker.getLatLng().lat);
        var markerLng = Math.round(eMarker.getLatLng().lng);
        var titleInitial = $('.titlePopUp').text();
        var descriptionInitial = $('.descriptionPopUp').text();
        $("#deleteLink").click(function () {
            var reg = new RegExp('\\n^.*' + markerLat + '\\\\' + markerLng + '.*$',"mg");
            map.removeLayer(eMarker);
            mapData = mapData.replace(reg, "");
            if ( mapData.slice(-2).indexOf('\\') != -1) {
                    mapData = mapData.slice(0, -2) + '\n';
            }
            if ( $('.EditToolCommit').prop('disabled') == true ) {
                $('.EditToolCommit').prop("disabled", false);
            }
        });
        $("#editLink").click(function () {
            var titleString;
            if ( isLink == 'piped') {
                titleString = '[[' + formatTitle[0] + '|' + formatTitle[1] + ']]';
            }
            else if ( isLink == 'non-piped') {
                titleString = '[[' + formatTitle[0] + ']]';
            }
            else {
                titleString = formatTitle[0];
            }
            editExistingSetContent(eMarker, titleString, concatDescription);
            
            editInputBoxesKeyUp ();
            $("#pin-submit").click(function (){
                var pinDescription = $("#descriptionEditPopUp").val();
                var pinTitle = $("#titleEditPopUp").val();
                var reg = new RegExp('\\n^.*' + markerLat + '\\\\' + markerLng + '.*$',"mg");
                mapData = mapData.replace(reg, '\n' + markerLat + '\\' + markerLng + '\\' + existingIcon + '\\' + pinTitle + '\\' + pinDescription + '\\');
                if ( mapData.slice(-2).indexOf('\\') != -1) {
                    mapData = mapData.slice(0, -2) + '\n';
                }
                eMarker._popup.setContent('Pin stored. Please hit the "save changes" button to commit all added/changed/removed pins.');
                if ( $('.EditToolCommit').prop('disabled') == true ) {
                    $('.EditToolCommit').prop("disabled", false);
                }
            });
        });
    });
}

function editInputBoxesKeyUp () {
    $('#descriptionEditPopUp, #titleEditPopUp').keyup(function() {
        var pinDescription = $("#descriptionEditPopUp").val();
        var pinTitle = $("#titleEditPopUp").val();
        if ( pinDescription == "" || pinTitle == "") {
            $("#pin-submit").prop("disabled", true);
        }
        else {
            $("#pin-submit").prop("disabled", false);
        }
    });    
}

function editExistingSetContent (eMarker, title, description) {
    eMarker._popup.setContent('<input name="title" placeholder="title" autocomplete="off" id="titleEditPopUp" value="' + title + '"><textarea id="descriptionEditPopUp" tabindex="5" rows="4" style="resize:none; width:100%;margin-top: 5px" placeholder="Enter description">' + description + '</textarea><button id="pin-submit" class="set-pin" disabled="disabled">Submit pin</button>');
}

function concatenateEditLinksDescription (descriptionLinkArray) {
    var concatDescription = '';
    var isAPipedLink;
    for ( z = 0; z < descriptionLinkArray.length; z++ ) {
        isAPipedLink = descriptionLinkArray[z].split('|');
        if ( isAPipedLink.length == 2 ) {
            //is a piped link
            concatDescription = concatDescription + '[[' + isAPipedLink[0] + '|' + isAPipedLink[1] + ']]';
                }
        else if ( z % 2 !== 0) {
            //is a non-piped link; odd in array
            concatDescription = concatDescription + '[[' + descriptionLinkArray[z] + ']]';
        }
        else {
            concatDescription = concatDescription + descriptionLinkArray[z];
        }
    }
    return concatDescription;
}

function concatenateHTMLlinksDescription (descriptionLinkArray) {
    var concatDescription = '';
    var isAPipedLink;
    for ( z = 0; z < descriptionLinkArray.length; z++ ) {
        isAPipedLink = descriptionLinkArray[z].split('|');
        if ( isAPipedLink.length == 2 ) {
            //is a piped link
            concatDescription = concatDescription + '<a href="/wiki/' + isAPipedLink[0] + '">' + isAPipedLink[1] + '</a>';
                }
        else if ( z % 2 !== 0) {
            //is a non-piped link; odd in array
            concatDescription = concatDescription + '<a href="/wiki/' + descriptionLinkArray[z] + '">' + descriptionLinkArray[z] + '</a>';
        }
        else {
            concatDescription = concatDescription + descriptionLinkArray[z];
        }
    }
    return concatDescription;
}

function markerListControl (markerIcons) {
    var clicked = false;
    var iconNameOrder = ['General', 'Manmade', 'Capital', 'Air', 'Aang', 'Water', 'Natural'];
    $('.marker-list').append('<div class="listButton" id="intListButton"><div class="topFilterListText">Filter List</div><div class="filterListBody"></div></div>');
    for ( i = 0; i < 7; i++ ) {
        $('.filterListBody').append('<div style="background: black;width: 200px;height: 40px;left: 5px;position: relative;top: 5px;margin-bottom: 5px;"><img class="filter-image" src="' + markerIcons[i] + '"><span style="left: 15px;position: relative;bottom: 10px;font-size: large;color: #fcf3e6;">' + iconNameOrder[i] + '</span><input type="checkbox" name="checkbox" id="checkbox-' + i + '" class="map-checkbox" checked></div>');
        markerListControlFunction(i, iconNameOrder[i]);
        
    }
    $('#intListButton').click(function (event){
        if (clicked == false && event.target == this) {
            $('.topFilterListText').stop(true, true).animate({width: "toggle"}, "fast");
            $('.filterListBody').stop(true, true).animate({height: "toggle"}, "fast", function () {
                $('.marker-list').animate({width: "40px", height:"40px", paddingLeft:"0"}, "fast");
                $('.listButton').animate({marginTop:"0"}, "fast");
            });
        clicked = true;
        }
        else if (clicked == true && event.target == this) {
            $('.topFilterListText').stop(true, true).animate({width: "toggle"}, "fast");
            $('.marker-list').animate({width: "205px", height:"50px", paddingLeft:"10px"}, "fast", function () {
                $('.filterListBody').stop(true, true).animate({height: "toggle"});
            });
            $('.listButton').animate({marginTop:"5px"}, "fast");
            clicked = false;
        }
    });
}

function markerListControlFunction (i, iconNameOrder) {
    $('#checkbox-' + i).click(function () {
        if( $('#checkbox-' + i).is(':checked') ) {
            $('.existing-marker-' + iconNameOrder.toLowerCase()).show();
        }
        else {
            $('.existing-marker-' + iconNameOrder.toLowerCase()).hide();
        }
    });
}

$(document).ready(function() {
    if (wgPageName == "Avatar_Wiki" || wgPageName == "User:KettleMeetPot/WorldMap")  {
        var isTrusted;
        var head  = document.getElementsByTagName('head')[0];
        var style  = document.createElement('link');
        style.rel  = 'stylesheet';
        style.type = 'text/css';
        style.href = '//maps.wikimedia.org/leaflet/leaflet.css';
        head.appendChild(style);
        $.ajax({
            type: "POST",
            url: "https://avatar.fandom.com/api.php",
            data: { action:'query', prop:'revisions', titles:'Avatar_Wiki:MainpageMapData', rvprop:'content' },
        success: function (data) {
            mapData = data.split("&amp;lt;!-- Page content demarcation for parser --&amp;gt;");
            mapData = mapData[1];
            } 
        });
        $.ajax({
            type: "POST",
            url: "https://avatar.fandom.com/api.php",
            data: { action:'query', prop:'revisions', titles:'Avatar_Wiki:MainpageMapData/CheckPage', rvprop:'content' },
            success: function ( data ) {
                var match = data.search( wgUserName );
                if ( match != -1 && wgUserName != null ) {
                    isTrusted = true;
                }
            }
        });
        importArticles({
            type: "script",
            articles: [
             "u:Wikipedia:MediaWiki:GeoHack.js"
            ]
        });
        
        //$.ajax({
        //    url: "https://maps.wikimedia.org/leaflet/leaflet.js",
        //    dataType: "script",
         //   success: function(data){
                mapClick(isTrusted);
         //   }
       // });
    }
});