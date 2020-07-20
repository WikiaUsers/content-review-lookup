nullEditDelay = 1000;
importScriptPage('MassNullEdit/code.js', 'dev');

var divWikiaArticle = document.getElementById("WikiaArticle");

//Made by Felix Kling on StackOverflow (felix-kling.de)
function containsClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

//Made by meouw and Andy E on StackOverflow
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft;
        _y += el.offsetTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function XOR(a,b) {
  return ( a || b ) && !( a && b );
}

var PIPID = -1;
function PIP(point, vs) {
    if(PIPID == -1) PIPID = page_watch("PIP array", vs);
    else page_watch_update(PIPID, vs);
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = Number(vs[i][0]), yi = Number(vs[i][1]);
        var xj = Number(vs[j][0]), yj = Number(vs[j][1]);
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

                                /*****************/
                                /* Made by Helveg*/
                                /*****************/

//WatchIDs
var PosWatchID = -1;
var InPoligon0ID = -1;
var InPoligon1ID = -1;

var ActiveMap = null;
var MapAreas = []; //Will contain all map area coords for the active map. 1st dimension: areas. 2nd dimension points. 3rd dimension x-y.
var MapCalPoints = []; //Array of points in current polygon on a calibration page.
var xDistortion = 1.2, yDistortion = 0.6; //Canvas' ratio to a 250x250 object.
var MapHighLightPolyDrawn = false; //Is there a polygon highlighted on a map object?
var inArea = -1;
var Difficulties = []; //List of difficulty tabs on the page.

var jsDT_LogDisabled = false;
var jsDT_WatchDisabled = true;
var jsDT_LogMax = 50;
var jsDT_LogDivID = "JSDevLog";
var jsDT_LogHeadText = "JavaScript Log";
var jsDT_LogTop = 400; //top property of the log box, adjust it to reposition the log.

function page_log_init()
{
    //Initialise log div.
    divLog = document.createElement("div");
    divLog.id = jsDT_LogDivID;
    divLog.className = "log";
    divLog.style.top = jsDT_LogTop + "px";
    //Initialise heading.
    divLogHeading = document.createElement("div");
    divLogHeading.className = "log-head";
    divLogHeading.innerHTML = "- " + jsDT_LogHeadText;
    divLogHeading.onclick = page_log_head_click;
    //Add to document tree.
    divLog.appendChild(divLogHeading);
    document.body.insertBefore(divLog,document.body.firstChild);
}

function page_log_head_click(e)
{
    var i;
    this.style.overflow = "hidden";
    if(this.innerHTML == "- " + jsDT_LogHeadText)
    { //Collapse
        this.style.borderBottom = "0";
        this.innerHTML = "+ " + jsDT_LogHeadText;
        for(i=1;i<this.parentNode.childNodes.length;i++)
        { //i=1 to skip heading node.
            this.parentNode.childNodes[i].style.visibility = "hidden";
            this.parentNode.childNodes[i].style.position = "absolute";
        }
    }
    else
    { //Expand
        this.style.borderBottom = "";
        this.innerHTML = "- " + jsDT_LogHeadText;
        for(i=1;i<this.parentNode.childNodes.length;i++)
        { //i=1 to skip heading node.
            this.parentNode.childNodes[i].style.position = "static";
            this.parentNode.childNodes[i].style.visibility = "visible";
        }
    }
}

function get_page_log()
{
    return document.getElementById(jsDT_LogDivID);
}

function page_log_entry(msg, className)
{
    if(jsDT_LogDisabled) return;
    divLog = get_page_log();
    //First log on the page creates the div
    if(divLog === null){ page_log_init() }
    if(divLog.childNodes.length < jsDT_LogMax)
    {
        //Initialise log entry
        divLogEntry = document.createElement("div");
        divLogEntry.className = className;
        divLogEntry.innerHTML = msg;
        //Append to log.
        divLog.appendChild(divLogEntry);
    }
}

function page_watch(name, value, id)
{
    try
    {
        if(jsDT_WatchDisabled) return id;
        if(id === null || id === undefined || id == -1) 
        {
            page_log_entry("Watch: " + name + " = '" + value + "'", "log-watch");
            id = get_page_log().childNodes.length - 1;
        } else page_watch_update(id, value);
    }catch(err){page_error(id + "page_watch > " + err.message);}
    return id;
}

function page_watch_update(id, value)
{
    if(jsDT_WatchDisabled) return;
    divLog = get_page_log();
    divLog.childNodes[id].innerHTML = divLog.childNodes[id].innerHTML.split("'")[0] + "'" + value + "'";
}

function page_error(msg)
{
    try{
        page_log_entry("!!Error: " + msg,"log-error");
    }catch(err)
    {
        alert("Error displaying error! That's pretty bad. " + err.message + "\nDisplaying error: " + msg);
    }
}

function page_log(msg)
{
    try
    {
        page_log_entry(msg, "log-entry");
    }catch(err)
    {
        page_error("page_log > " + err.message);
    }
    
}

function page_warning(msg)
{
    try
    {
        page_log_entry("#Warning: " + msg, "log-warning");
    }catch(err)
    {
        page_error("page_warning > " + err.message);
    }
    
}

function clearAltDivs()
{
    try
    {
        document.body.removeChild(document.getElementById("map-alt-div"));
        clearAltDivs(); //In case a onmouseout Event wasn't triggered this keeps trying to clear up any element with the 'map-alt-div' id.
    }catch(err){}
}

function setAltDiv(text, x, y)
{
    clearAltDivs();
    var altDiv = document.createElement("div");
    altDiv.setAttribute("class","map-alt-div");
    altDiv.setAttribute("id","map-alt-div");
    altDiv.innerHTML = text;
    altDiv.setAttribute("style", "position: absolute; top: " + y + "px; left: " + x + "px; z-index: 202;");
    document.body.appendChild(altDiv);
}

function f_alt_mouseover(e)
{
    try {
        r = getOffset(this);
        var x, y;
        if(this.getAttribute("alt-x") === null || this.getAttribute("alt-y") === null)
        {
            x = Math.floor(r.left + this.offsetWidth);
            y = Math.floor(r.top + this.offsetHeight);
        }
        else //Specific Alt-Text coords set
        {
            x = Number(this.getAttribute("alt-x"));
            y = Number(this.getAttribute("alt-y"));
        }
        setAltDiv(this.getAttribute("data-link-alt"), x, y);
    }
    catch(err) {
        page_error("f_alt_mouseover > " + err.message);
    }
}

function f_alt_mouseout(e)
{
    try
    {
        clearAltDivs();
    }
    catch(er)
    {
        page_error("f_alt_mouseout > "+ err.message);
    }
}

function map_size(map)
{
    try
    {
        return {width: map.style.width.split("p")[0], height: map.style.height.split("p")[0]};
    }catch(err)
    {
        page_warning("map_size > Couldn't parse width or height property of map. Returned 250x250");
        return {width: 250, height: 250};
    }
}

function map_canvas(map)
{
    canvas = null;
    try
    {
        canvas = map.getElementsByClassName("map-canvas")[0];
    }catch(err)
    {
        page_warning("map_canvas > Creating new canvas");
        try
        {
            canvas = document.createElement("canvas");
            canvas.className = "map-canvas";
            map.appendChild(canvas);
        }catch(err)
        {
            page_error("map_canvas > Canv not found, could not create new: " + err.message);
        }
    }
    return canvas;
}

function map_x(x)
{
    var resizeDistortion = 1;
    try //Check for activemap or ignore.
    {
        var mapSize = map_size(ActiveMap);
        resizeDistortion = Number(250/mapSize.width);
    }catch(err){   }
    return x * xDistortion * resizeDistortion;
}

function map_y(y)
{
    var resizeDistortion = 1;
    try //Check for activemap or ignore.
    {
        var mapSize = map_size(ActiveMap);
        resizeDistortion = Number(250/mapSize.height);
    }catch(err){   }
    return y * yDistortion * resizeDistortion;
}

function map_draw_edges(map)
{
try{
    //page_log("Drawing edges for map. (" + MapAreas.length + " polygons)");
    var canvas = map.getElementsByClassName("map-canvas")[0];
    var ctx = canvas.getContext("2d");
    var mapSize = map_size(map);
    ctx.clearRect(0,0,map_x(mapSize.width),map_y(mapSize.height));
    ctx.globalAlpha = 0.5;
    for(i = 0; i < MapAreas.length; i++)
    {
        //page_log("Drawing map polygon with " + MapAreas[i].length + " points.");
        ctx.beginPath();
        ctx.moveTo(map_x(MapAreas[i][0][0]),map_y(MapAreas[i][0][1]));
        for(j=1;j<MapAreas[i].length;j++)
        {
            //page_log("line to x:" + MapAreas[i][j][0] + " y:"+MapAreas[i][j][1]);
            ctx.lineTo(map_x(MapAreas[i][j][0]),map_y(MapAreas[i][j][1]));
        }
        ctx.strokeStyle = map_area_color();
        ctx.closePath();
        ctx.stroke();
    }
    ctx.globalAlpha=1;
}catch(err){page_error("map_draw_edges > " + err.message);}
}

function map_area(map, area)
{
    return map.getElementsByClassName("map-data-link-area")[area];
}

function map_area_color(map, area)
{
    return "#00ff00";
}

function map_highlight_area(map,area)
{
    try
    {
        var canvas = map.getElementsByClassName("map-canvas")[0];
        var ctx = canvas.getContext("2d");
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = map_area_color();
        ctx.beginPath();
        ctx.moveTo(map_x(MapAreas[area][0][0]),map_y(MapAreas[area][0][1]));
        for(j=1;j<MapAreas[area].length;j++)
        {
            //page_log("line to x:" + MapAreas[i][j][0] + " y:"+MapAreas[i][j][1]);
            ctx.lineTo(map_x(MapAreas[area][j][0]),map_y(MapAreas[area][j][1]));
        }
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
    }catch(err){
        page_error("map_highlight_area > " + err.message);
    }
}

function map_overlay_onclick(e){
    
}

function map_overlay_onmouseover(e){
    try
    {
        MapAreas = getMapAreas(this.parentNode); //Set map areas. This way map areas don't have to be loaded every mouse move.
        ActiveMap = this.parentNode;
    }catch(err)
    {
        page_error("map_overlay_onmouseover > " + err.message);
    }
}

function map_overlay_onmouseout(e){
    MapAreas = []; //Clear map areas
    ActiveMap = null;
}

function map_overlay_onmousemove(e){
try{
    page_watch_update(PosWatchID,"X: " + e.offsetX + " Y: " + e.offsetY);
    var anything = false;
    for(var i=0;i<MapAreas.length;i++)
    {
        var polyX = [];
        var polyY = [];
        var polyCorners = 0;
        for(var j=0;j<MapAreas[i].length;j++)
        {
            polyX.push(MapAreas[i][j][0]);
            polyY.push(MapAreas[i][j][1]);
            polyCorners++;
        }
        if(PIP([e.offsetX, e.offsetY], MapAreas[i]))
        {
            anything = true;
            if(inArea != -1 && inArea != i) //New area
            {
                map_draw_edges(this.parentNode);
                MapHighLightPolyDrawn = false;
            }
            if(MapHighLightPolyDrawn === false)
            {
                map_highlight_area(this.parentNode,i);
                MapHighLightPolyDrawn = true;
                inArea = i;
            }
            var offset = getOffset(this.parentNode);
            var areaDiv = map_area(this.parentNode,i);
            setAltDiv(areaDiv.getAttribute("data-link-area"), offset.left + e.offsetX + 10, offset.top + e.offsetY + 10);
        }
    }
    if(!anything && !containsClass(this.parentNode, "map-calibrate") && inArea != -1) //Not in area anymore
    {
        clearAltDivs();
        inArea = -1;
        map_draw_edges(this.parentNode);
        MapHighLightPolyDrawn = false;
    }
}catch(err)
{
    page_error("map_overlay_onmousemove > " + err.message);
}
}

function map_clear(map)
{
    var ctx = map_canvas(map).getContext("2d");
    var size = map_size(map);
    ctx.clearRect(0,0,map_x(size.width), map_y(size.height));
}

function map_cal_textbox()
{
    try
    {
        return document.getElementById("map-calibrate-text");
    }catch(er){    }
    return null;
}

function map_cal_drawPoints(map)
{
try
{
    if(MapCalPoints.length > 0)
    {
        var ctx = map_canvas(map).getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "#ff0000";
        ctx.strokeStyle="#00aa00";
        ctx.moveTo(map_x(MapCalPoints[0][0]),map_y(MapCalPoints[0][1]));
        for(i = 0;i<MapCalPoints.length;i++)
        {
            ctx.lineTo(map_x(MapCalPoints[i][0]),map_y(MapCalPoints[i][1]));
            ctx.fillRect(map_x(MapCalPoints[i][0]-2),map_y(MapCalPoints[i][1]-2), map_x(4), map_y(4));
        }
        ctx.closePath();
        ctx.stroke();
    }
}catch(err)
{
    page_error("map_cal_drawPoints > " + err.message);
}
}

function parseDleID(mapID,dleID)
{
    return "map-" + mapID + "-data-link-" + dleID;
}

function parseCalText(tb)
{
    tb.value = "{{Map/Area|name=xxxxx";
    var mapSize = map_size(ActiveMap);
    for(j=0;j<MapCalPoints.length;j++)
    {
        tb.value += "|" + Number(MapCalPoints[j][0]/mapSize.width*250) + ";" + Number(MapCalPoints[j][1]/mapSize.height*250);
    }
    tb.value += "}}";
}

function nextCalShape()
{
    var calDiv = document.getElementsByClassName("map-calibrate-menu")[0];
    var newShapeBtn = document.createElement("input");
    newShapeBtn.setAttribute("type", "button");
    newShapeBtn.value = "New Area";
    var mapCalTB = document.createElement("textarea");
    mapCalTB.style.width="20em";
    mapCalTB.style.height="10em";
    mapCalTB.id = "map-calibrate-text";
    mapCalTB.style.display = "inline";
    newShapeBtn.style.display = "inline";
    newShapeBtn.onclick = function()
    {
        this.parentNode.removeChild(this);
        map_cal_textbox().id = "";
        MapCalPoints = [];
        nextCalShape();
    };
    calDiv.appendChild(mapCalTB);
    calDiv.appendChild(newShapeBtn);
}

function calibrateMap(map){
    try
    {
        for(i = 0; i < map.childNodes.length; i++)
        {
            if(containsClass(map.childNodes[i],"map-overlay"))
            {
                initCalibrateMenu();
                
                map.childNodes[i].onclick = function(e) {
                    try{
                        var map = this.parentNode;
                        var offset =  getOffset(this);
                        var relativeX = e.offsetX;
                        var relativeY = e.offsetY;
                        x250 = Math.round(relativeX);
                        y250 = Math.round(relativeY);
                        x350 = Math.round(relativeX/350*250);
                        y350 = Math.round(relativeY/350*250);
                        x500 = Math.round(relativeX/500*250);
                        y500 = Math.round(relativeY/500*250);
                        MapCalPoints.push([relativeX, relativeY]);
                        map_clear(map);
                        map_cal_drawPoints(map);
                        if((tb = map_cal_textbox()) !==null)
                        {
                            parseCalText(tb);
                        }else{
                            page_log("no map cal tb");
                        }
                    }catch(err){
                        page_error("cal_map.onclick > " + err.message);
                    }
                };
            }
        }
    }catch(err)
    {
        page_error("calibrateMap > " + err.message);
    }
}

//Pass the map object, returns all map area coords
function getMapAreas(map)
{
try{
    var map_areas = [];
    var mapSize = map_size(map);
    for(i=0;i<map.childNodes.length;i++)
    {
        if(map.childNodes[i].getAttribute && map.childNodes[i].getAttribute("data-link-area") !== null)
        {
            node = map.childNodes[i];
            area = [];
            for(j=0;j<node.childNodes.length;j++)
            {
                area.push(node.childNodes[j].innerHTML.split(";"));
                area[area.length-1][0] = Number(area[area.length-1][0] * mapSize.width/250);
                area[area.length-1][1] = Number(area[area.length-1][1] * mapSize.height/250);
            }
            map_areas.push(area);
        }
    }
    return map_areas;
}catch(err)
{
    page_error("getMapAreas > " + err.message);
}
}

function initCalibrateMenu()
{
    var calDiv = null;
    try
    {
        calDiv = document.getElementsByClassName("map-calibrate-menu")[0];
    }catch(err)
    {
        page_warning("No calibration menu spaceholder on calibration map page.");
        return;
    }
    nextCalShape();
}

//Initialise MapAreas
function initAreaDLE(dle)
{
   
}

function map_poly_print(map){
    var cv = map_canvas(map);
    var ctx = cv.getContext("2d");
    ctx.fillStyle= "#ffffff";
    ctx.beginPath();
    for(var i = 0; i <= map_size(map).width;i++)
    {
        for(var j = 0;j <= map_size(map).height;j++){
            for(var a =0;a<MapAreas.length;a++)
            {
                ctx.globalAlpha = 0.3 * PIP([i,j],MapAreas[a]);
                ctx.fillRect( map_x(i), map_y(j), 1, 1 );
            }
        }
    }
    ctx.globalAlpha = 1;
    ctx.closePath();
}

//Sets DLE EventHandlers and DOM attributes
function initDLE(dle)
{
    //Add DLE alt text EventHandlers
    if(dle.getAttribute('data-link-alt')){ //Element with Alt-Text
        //Set Alt-Text EventHandlers
        dle.onmouseover = f_alt_mouseover;
        dle.onmouseout = f_alt_mouseout;
    }
    if(dle.getAttribute('data-link-area')) //Area element
    {
        initAreaDLE(dle);
    }
    if(dle.getAttribute('error')) //Error during template call
    {
        page_error(dle.getAttributes('error'));
    }
}

//Map Page?
function initMaps()
{
    try{
        maps = document.getElementsByClassName("map");
        for(var j = 0; j < maps.length;j++)
        {
            PosWatchID = page_watch("POS", "NAN");
            InPolygon0ID = page_watch("POLY1", "false");
            InPolygon1ID = page_watch("POLY2", "false");
            var map = maps[j];
            ActiveMap = map;
            var mapSize = map_size(map);
            //Add map canvas;
            var canvas = document.createElement("canvas");
            canvas.className = "map-canvas";
            canvas.style.width = mapSize.width + "px";
            canvas.style.height = mapSize.height + "px";
            map.appendChild(canvas);
            //Set map-container EventHandlers
            map.getElementsByClassName("map-overlay")[0].onclick = map_overlay_onclick;
            map.getElementsByClassName("map-overlay")[0].onmouseover = map_overlay_onmouseover;
            map.getElementsByClassName("map-overlay")[0].onmouseout = map_overlay_onmouseout;
            map.getElementsByClassName("map-overlay")[0].onmousemove = map_overlay_onmousemove;
            for(var i = 0; i < map.childNodes.length; i++)
            {
                //Iterate through the child nodes to find all DLE children and set their EventHandlers
                var dle = map.childNodes[i];
                if(containsClass(dle, "map-data-link")) //Map Data link element
                {
                    initDLE(dle);
                }
            }
            MapAreas = getMapAreas(map);
            map_draw_edges(map);
            if(containsClass(map, "calibrate"))
            {
                calibrateMap(map);
            }
            if(containsClass(map, "poly-print"))
            {
                //Debug test, print all pixels inside areas according to PointInPoly algorithms
                map_poly_print(map);
                //Clear EventHandlers
                map.getElementsByClassName("map-overlay")[0].onclick = null;
                map.getElementsByClassName("map-overlay")[0].onmouseover = null;
                map.getElementsByClassName("map-overlay")[0].onmouseout = null;
                map.getElementsByClassName("map-overlay")[0].onmousemove = null;
            }
        }
    }catch(err)
    {
        page_error("InitMap > " + err.message);
    }
    
}

function getDiffDiv(i)
{
    return document.getElementsByClassName("difficulties")[i];
}

function getTabs(difficulty)
{
    try
    {
        var ret = [];
        var tabs = document.getElementsByClassName("difficulty-tab");
        for(var i = 0; i < tabs.length; i++)
        {
            if(tabs[i].getAttribute("data-difficulty") == difficulty) ret.push(tabs[i]);
        }
        return ret;
    }catch(err){ page_error("Can't find tab '" + difficulty + "'"); }
}

function getTab(difficulty)
{
    try
    {
        var tabs = document.getElementsByClassName("difficulty-tab");
        for(var i = 0; i < tabs.length; i++)
        {
            if(tabs[i].getAttribute("data-difficulty") == difficulty) return tabs[i];
        }
        page_error("Can't find tab '" + difficulty + "'");
        return undefined;
    }catch(err){ page_error("Can't find tab '" + difficulty + "'"); }
}

function closeTab(difficulty)
{
    try
    {
        var tabs = getTabs(difficulty);
        for(var k = 0;k<tabs.length;k++) tabs[k].style.display = "none";
    }catch(err)
    {
        page_error("Can't close tab '" + difficulty + "'");
    }
}

function openTab(difficulty)
{
    try
    {
        for(var j = 0;j<Difficulties.length;j++) closeTab(Difficulties[j]); //Close all tabs
        var tabs = getTabs(difficulty);
        for(var k = 0;k<tabs.length;k++) tabs[k].style.display = "block";
        var tabButtons = document.getElementsByClassName("difficulty-button");
        for(var i = 0; i < tabButtons.length; i++)
        {
            var btn = tabButtons[i];
            if(btn.getAttribute("data-difficulty") == difficulty) btn.className = "difficulty-button difficulty-btn-selected";
            else btn.className = "difficulty-button difficulty-btn-unselected";
        }
    }catch(err){ page_error("openTab > " + err.message); }
}

function tabBtnClick()
{
    openTab(this.getAttribute("data-difficulty"));
}

//Load the tabs into Difficulties[], find the default, collapse all but default, set parent width accordingly, set EventHandlers.
function initTabs()
{
    try
    {
        var tabs = document.getElementsByClassName("difficulty-tab");
        if (tabs.length === 0 ) return;
        var _default = 0;
        Difficulties = [];
        for(var i=0;i<tabs.length;i++)
        {
            var tab = tabs[i];
            if(tab.getAttribute("data-difficulty") == "")
            {
                page_warning("initTabs() > Element with class difficulty-tab but without data-difficulty attribute.");
                continue;
            }
            Difficulties.push(tab.getAttribute("data-difficulty"));
            if(tab.getAttribute("data-default") == "true") _default = i;
            
            var tabBtn = document.createElement("div");
            tabBtn.setAttribute("data-difficulty", Difficulties[i]);
            tabBtn.className = "difficulty-button";
            tabBtn.onclick = tabBtnClick;
            tabBtn.innerHTML = " " + Difficulties[i].charAt(0).toUpperCase() + Difficulties[i].slice(1);
            tabBtn.style.cursor = "pointer";
            tabs[i].parentNode.insertBefore(tabBtn,tabs[i].parentNode.childNodes[0]);
        }
        openTab(Difficulties[_default]);
    }catch(err)
    {
        page_error("initTabs() > " + err.message);
    }
}

function setPopup(popup, parent, e)
{
    try
    {
        var offset = getOffset(parent);
        popup.style.left = (offset.left + e.offsetX + 5) + "px";
        popup.style.top = (offset.top + e.offsetY + 5) + "px";
        popup.style.display = "block"; //show
    }catch(err) {page_error("setPopup > " + err.message);}
}

function clearPopup(popup)
{
    popup.style.display = "none"; //hide
}

function pop_mousemove(e)
{
    if(popupArticles === null) return;
    setPopup(popupArticles[this.getAttribute("data-link-pop")], this, e);
}

function pop_mouseout()
{
    clearPopup(popupArticles[this.getAttribute("data-link-pop")]);
}

function initPopup(e, p)
{
    if(p !== undefined) //Don't set handlers for popups that won't work anyway
    {
        //Move to uppermost container for correct offset
        p.parentNode.removeChild(p);
        document.body.appendChild(p);
        e.onmousemove = pop_mousemove;
        e.onmouseout = pop_mouseout;
    }
}

function initElements()
{
    try
    {
        var pops = document.getElementsByClassName("POP");
        popupArticles = {};
        for(var j = 0; j < pops.length; j++)
        {
            popupArticles[pops[j].getAttribute("id")] = pops[j];
        }
        
        var elems =  document.getElementsByTagName("*");
        for(var i = 0; i < elems.length; i++)
        {
            var elem = elems[i];
            //Popup Article "Button"?
            if(elem.hasAttribute("data-link-pop")) 
            {
                initPopup(elem, popupArticles[elem.getAttribute("data-link-pop")]);
            }
        }
    }catch(err)
    {
        page_error("initElements() > " + err.message);
    }
}

//Main
try
{
    initMaps();
    initTabs();
    initElements();
}
catch(err)
{
    page_error("Main > " + err.message);
}

//Debugging/Testing Section. Displays only on Sandbox:JavaScript
if(window.location == "http://cp2.wikia.com/wiki/Sandbox:JavaScript")
{
    
}