/* Any JavaScript here will be loaded for all users on every page load. */

/* Single global var -- Please keep your variable scopes as specific as possible.
 * If you must use global variables, create it as a property of the global variable after checking that it doesn't already have that property.
 */
var KIRBY_WIKI_GLOBAL = KIRBY_WIKI_GLOBAL || {};

/* JavaScript from Wikipedia. All function definitions have different scope than functions used for Kirby Wiki
 * All of this is legacy code for backwards-compatibility with special DOM hooks used in older MediaWiki versions
 * when certain functions are not natively supported, e.g. "collapsble" instead of "mw-collapsible" to make a table collapsible
 * These are not dependant on jQuery
 */

/** Test if an element has a certain class
 *
 * Description  : Uses regular expressions and caching for better performance.
 * Maintainers  : [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]] (Wikipedia)
 *
 * Required for : Collapsible tables
 * Copied from  : Wikipedia
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Collapsible tables
 *
 *  Description : Allows tables to be collapsed, showing only the header. See
 *                [[Wikipedia:NavFrame]].
 *  Maintainers : [[User:R. Koot]] (Wikipedia)
 *
 *  Requires    : hasClass
 *  Copied from : Wikipedia
 */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);

    if (!Table || !Button) { return false; }

    var Rows = Table.rows;

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) { Rows[i].style.display = "none"; }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) { Rows[i].style.display = Rows[0].style.display; }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;

            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}

addOnloadHook(createCollapseButtons);


/**
 * Sanitize.js
 * 
 * JavaScript implementation of parser-whitelist-based HTML sanitizer. Configurable strictness.
 * Always guarantees valid HTML or XHTML output.
 * 
 * Source code: https://github.com/gbirke/Sanitize.js 
 */
 
/**
 * Copyright (c) 2010 by Gabriel Birke
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function Sanitize(){
  var i, e, options;
  options = arguments[0] || {};
  this.config = {};
  this.config.elements = options.elements ? options.elements : [];
  this.config.attributes = options.attributes ? options.attributes : {};
  this.config.attributes[Sanitize.ALL] = this.config.attributes[Sanitize.ALL] ? this.config.attributes[Sanitize.ALL] : [];
  this.config.allow_comments = options.allow_comments ? options.allow_comments : false;
  this.allowed_elements = {};
  this.config.protocols = options.protocols ? options.protocols : {};
  this.config.add_attributes = options.add_attributes ? options.add_attributes  : {};
  this.dom = options.dom ? options.dom : document;
  for(i=0;i<this.config.elements.length;i++) {
    this.allowed_elements[this.config.elements[i]] = true;
  }
  this.config.remove_element_contents = {};
  this.config.remove_all_contents = false;
  if(options.remove_contents) {
    
    if(options.remove_contents instanceof Array) {
      for(i=0;i<options.remove_contents.length;i++) {
        this.config.remove_element_contents[options.remove_contents[i]] = true;
      }
    }
    else {
      this.config.remove_all_contents = true;
    }
  }
  this.transformers = options.transformers ? options.transformers : [];
}

Sanitize.REGEX_PROTOCOL = /^([A-Za-z0-9\+\-\.\&\;\*\s]*?)(?:\:|&*0*58|&*x0*3a)/i;

// emulate Ruby symbol with string constant
Sanitize.RELATIVE = '__RELATIVE__';
Sanitize.ALL = '__ALL__';

Sanitize.prototype.clean_node = function(container) {
  var fragment = this.dom.createDocumentFragment();
  this.current_element = fragment;
  this.whitelist_nodes = [];

  

  /**
   * Utility function to check if an element exists in an array
   */
  function _array_index(needle, haystack) {
    var i;
    for(i=0; i < haystack.length; i++) {
      if(haystack[i] == needle) 
        return i;
    }
    return -1;
  }
  
  function _merge_arrays_uniq() {
    var result = [];
    var uniq_hash = {};
    var i,j;
    for(i=0;i<arguments.length;i++) {
      if(!arguments[i] || !arguments[i].length)
        continue;
      for(j=0;j<arguments[i].length;j++) {
        if(uniq_hash[arguments[i][j]])
          continue;
        uniq_hash[arguments[i][j]] = true;
        result.push(arguments[i][j]);
      }
    }
    return result;
  }
  
  /**
   * Clean function that checks the different node types and cleans them up accordingly
   * @param elem DOM Node to clean
   */
  function _clean(elem) {
    var clone;
    switch(elem.nodeType) {
      // Element
      case 1:
        _clean_element.call(this, elem);
        break;
      // Text
      case 3:
        clone = elem.cloneNode(false);
        this.current_element.appendChild(clone);
        break;
      // Entity-Reference (normally not used)
      case 5:
        clone = elem.cloneNode(false);
        this.current_element.appendChild(clone);
        break;
      // Comment
      case 8:
        if(this.config.allow_comments) {
          clone = elem.cloneNode(false);
          this.current_element.appendChild(clone);
        }
        break;
      default:
        if (console && console.log) console.log("unknown node type", elem.nodeType);
        break;
    }
 
  }
  
  function _clean_element(elem) {
    var i, j, clone, parent_element, name, allowed_attributes, attr, attr_name, attr_node, protocols, del, attr_ok;
    var transform = _transform_element.call(this, elem);
    
    elem = transform.node;
    name = elem.nodeName.toLowerCase();
    
    // check if element itself is allowed
    parent_element = this.current_element;
    if(this.allowed_elements[name] || transform.whitelist) {
        this.current_element = this.dom.createElement(elem.nodeName);
        parent_element.appendChild(this.current_element);
        
      // clean attributes
      var attrs = this.config.attributes;
      allowed_attributes = _merge_arrays_uniq(attrs[name], attrs[Sanitize.ALL], transform.attr_whitelist);
      for(i=0;i<allowed_attributes.length;i++) {
        attr_name = allowed_attributes[i];
        attr = elem.attributes[attr_name];
        if(attr) {
            attr_ok = true;
            // Check protocol attributes for valid protocol
            if(this.config.protocols[name] && this.config.protocols[name][attr_name]) {
              protocols = this.config.protocols[name][attr_name];
              del = attr.value.toLowerCase().match(Sanitize.REGEX_PROTOCOL);
              if(del) {
                attr_ok = (_array_index(del[1], protocols) != -1);
              }
              else {
                attr_ok = (_array_index(Sanitize.RELATIVE, protocols) != -1);
              }
            }
            if(attr_ok) {
              attr_node = document.createAttribute(attr_name);
              attr_node.value = attr.value;
              this.current_element.setAttributeNode(attr_node);
            }
        }
      }
      
      // Add attributes
      if(this.config.add_attributes[name]) {
        for(attr_name in this.config.add_attributes[name]) {
          attr_node = document.createAttribute(attr_name);
          attr_node.value = this.config.add_attributes[name][attr_name];
          this.current_element.setAttributeNode(attr_node);
        }
      }
    } // End checking if element is allowed
    // If this node is in the dynamic whitelist array (built at runtime by
    // transformers), let it live with all of its attributes intact.
    else if(_array_index(elem, this.whitelist_nodes) != -1) {
      this.current_element = elem.cloneNode(true);
      // Remove child nodes, they will be sanitiazied and added by other code
      while(this.current_element.childNodes.length > 0) {
        this.current_element.removeChild(this.current_element.firstChild);
      }
      parent_element.appendChild(this.current_element);
    }

    // iterate over child nodes
    if(!this.config.remove_all_contents && !this.config.remove_element_contents[name]) {
      for(i=0;i<elem.childNodes.length;i++) {
        _clean.call(this, elem.childNodes[i]);
      }
    }
    
    // some versions of IE don't support normalize.
    if(this.current_element.normalize) {
      this.current_element.normalize();
    }
    this.current_element = parent_element;
  } // END clean_element function
  
  function _transform_element(node) {
    var output = {
      attr_whitelist:[],
      node: node,
      whitelist: false
    };
    var i, j, transform;
    for(i=0;i<this.transformers.length;i++) {
      transform = this.transformers[i]({
        allowed_elements: this.allowed_elements,
        config: this.config,
        node: node,
        node_name: node.nodeName.toLowerCase(),
        whitelist_nodes: this.whitelist_nodes,
        dom: this.dom
      });
      if (transform === null) 
        continue;
      else if(typeof transform == 'object') {
        if(transform.whitelist_nodes && transform.whitelist_nodes instanceof Array) {
          for(j=0;j<transform.whitelist_nodes.length;j++) {
            if(_array_index(transform.whitelist_nodes[j], this.whitelist_nodes) == -1) {
              this.whitelist_nodes.push(transform.whitelist_nodes[j]);
            }
          }
        }
        output.whitelist = transform.whitelist ? true : false;
        if(transform.attr_whitelist) {
          output.attr_whitelist = _merge_arrays_uniq(output.attr_whitelist, transform.attr_whitelist);
        }
        output.node = transform.node ? transform.node : output.node;
      }
      else {
        throw new Error("transformer output must be an object or null");
      }
    }
    return output;
  }
  
  
  
  for(i=0;i<container.childNodes.length;i++) {
    _clean.call(this, container.childNodes[i]);
  }
  
  if(fragment.normalize) {
    fragment.normalize();
  }
  
  return fragment;
  
};

if ( typeof define === "function" ) {
  define( "sanitize", [], function () { return Sanitize; } );
}


/* JavaScript for Kirby Wiki -------------------------------------------------------------------
 * Many of these are dependant on jQuery
 */

/** Asynchronously load Youtube iframe player API
 *  This method of loading is necessary for the script to run properly
 *
 *  Maintainers : [[User:Changtau2005]] (kirby.wikia.com)
 *  Status      : Not maintained
 *
 *  Copied from : https://developers.google.com/youtube/iframe_api_reference
 */
function loadYtPlayerAPI() {
    var tag = document.createElement('script');
    tag.src = 'http://www.youtube.com/iframe_api';
    tag.type = 'text/javascript';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

addOnloadHook(loadYtPlayerAPI);

/** 
 * This is used to create a JS-enabled Youtube player that exposes Google's API to configure our
 * soundtrack playbacks. We mainly use this to set the showinfo parameter to 0 as it really messes
 * up the UI.
 * 
 * Supports both Flash and iframe players and can force to either one. Default Youtube MediaWiki
 * plugin forces Flash version, which has been deprecated. Does not enforce minimum viewport sizes
 * as per the default MediaWiki plugin.
 * 
 * When lightweight mode is on, makes div with PLAYER_HOOK as a placeholder with the right
 * background and initializes a trigger that loads the actual Youtube object on click.
 * 
 * Currently only embeds a player and does not construct any references to YT objects in JS
 * If custom JS interfacing is needed, suggested implementation would be to return or
 * enqueue an encapsulating function which is then called by:
 *  onYouTubeIframeAPIReady() -- iframe API, or
 *  onYouTubePlayerReady() -- flash API
 * 
 * Dependencies: Sanitize
 * 
 * Interfaces with [[Template:YoutubePlayer]]
 * 
 * Status: Maintained (Nov 2016)
 * Maintainer: [[User:Changtau2005]] (kirby.wikia.com)
 * 
 * API reference: https://developers.google.com/youtube/iframe_api_reference
 * 
 */
function initYoutubePlayers() {
    
    var INSTANCE_HOOK = '.kw-js-ytplayer-hook';
    var TRACKID_HOOK = '.kw-js-ytplayer-trackid';
    var WIDTH_HOOK = '.kw-js-ytplayer-width';
    var HEIGHT_HOOK = '.kw-js-ytplayer-height';
    var START_HOOK = '.kw-js-ytplayer-start';
    var SHOWINFO_HOOK = '.kw-js-ytplayer-showinfo';
    var ISLIGHTWEIGHT_HOOK = '.kw-js-ytplayer-islightweight';
    var VERSION_HOOK = '.kw-js-ytplayer-version'; // toggle between flash or iframe player
    var PLAYER_HOOK = '.kw-js-ytplayer-player';
    var BGIMG_HOOK = 'kw-js-ytplayer-bgimg'; // css hook for addClass(). Therefore no '.'
    var SANITIZE_HOOK = '.kw-js-sanitize';
    
    // This all needs to be in string format
    // Most important player parameters not exposed to the template are specified here
    // Autoplay needs to be set to 1 when placeholder mode is on
    // API reference: https://developers.google.com/youtube/player_parameters
    var DEFAULT_PLAYER_PARAMS = {
        color: "red",
        controls: "2",
        modestbranding: "0",
        playsinline: "1",
        fs: "0",
        jsapi: "1",
        origin: "http://kirby.wikia.com",
        rel: "0",
        version: "3",
    };
    
    // Default parameters; used if the node(s) specifying the parameter value(s) are not well-formed
    // This is to handle malformed templates or class misuse that we cannot control
    var DEFAULT_TRACKID = ""; // point to blank trackId
    var DEFAULT_WIDTH = "250";
    var DEFAULT_HEIGHT = "40";
    var DEFAULT_START = "0";
    var DEFAULT_SHOWINFO = "1";
    var DEFAULT_ISLIGHTWEIGHT = "0";
    var DEFAULT_VERSION = "iframe";
    
    
    var sanitizer = new Sanitize({
        elements: [] // Disallow all HTML nodes and attrs, and malformed nodes except text nodes
    });
    
    var instances = [];
    var playerParams = [];
    var players = [];
    
    // Gets instances of DOM specified by [[Template:YoutubePlayer]]
    function getInstances() {
        instances = $(INSTANCE_HOOK);
    }
    
    // Gets all sanitized player parameters from specified template parameters
    function getPlayerParams() {
        
        function getParam(node, defaultValue) {
            var param;
            
            // Edge case: One or more expected data nodes missing from malformed template etc.
            // Use default values
            if (node === undefined) {
                param = defaultValue;
                
            // Otherwise:
            // Sanitize input to text node and additionally trim all potential stray whitespaces
            // from template, because whitespaces will cause a malformed URI
            } else {
                param = $.trim($('<span>').append(sanitizer.clean_node(node)).text());
            }
            return param;
        }
        
        for(var i = 0; i < instances.length; i++) {
            var instanceElem = $(instances[i]);
            
            var trackIdNode = instanceElem.children(TRACKID_HOOK)[0];
            var widthNode = instanceElem.children(WIDTH_HOOK)[0];
            var heightNode = instanceElem.children(HEIGHT_HOOK)[0];
            var startNode = instanceElem.children(START_HOOK)[0];
            var showinfoNode = instanceElem.children(SHOWINFO_HOOK)[0];
            var isLightweightNode = instanceElem.children(ISLIGHTWEIGHT_HOOK)[0];
            var versionNode = instanceElem.children(VERSION_HOOK)[0];
            
            var trackId = getParam(trackIdNode, DEFAULT_TRACKID);
            var width = getParam(widthNode, DEFAULT_WIDTH);
            var height = getParam(heightNode, DEFAULT_HEIGHT);
            var start = getParam(startNode, DEFAULT_START);
            var showinfo = getParam(showinfoNode, DEFAULT_SHOWINFO);
            var isLightweight = getParam(isLightweightNode, DEFAULT_ISLIGHTWEIGHT);
            var version = getParam(versionNode, DEFAULT_VERSION);
            
            playerParams.push({
                trackId: trackId,
                width: width,
                height: height,
                start: start,
                showinfo: showinfo,
                isLightweight: isLightweight, // not a Youtube parameter
                version: version // not a Youtube parameter
            });
        }
    }
    
    function constructYtElem(playerParams) {
        
        function constructSrc() {
            
            var stringBuilder = [];
            switch(playerParams.version) {
                case "flash":
                    stringBuilder.push("http://youtube.com/v/"); // Flash embeds use this URI
                    break;
                case "iframe": // default case; fallthrough
                default:
                    stringBuilder.push("http://youtube.com/embed/"); // iframe embeds use this URI
                    break;
            }
            stringBuilder.push(playerParams.trackId);

            stringBuilder.push("?");
            stringBuilder.push("start");
            stringBuilder.push("=");
            stringBuilder.push(playerParams.start);
            
            stringBuilder.push("&");
            stringBuilder.push("showinfo");
            stringBuilder.push("=");
            stringBuilder.push(playerParams.showinfo);
            
            // If lightweight, then set autoplay to 1 so video plays when load is triggered
            stringBuilder.push("&");
            stringBuilder.push("autoplay");
            stringBuilder.push("=");
            switch(playerParams.isLightweight) {
                case "1":
                    stringBuilder.push("1");
                    break;
                    
                case "0": // default case; fallthrough
                default:
                    stringBuilder.push("0");
                    break;
            }
            
            for(var prop in DEFAULT_PLAYER_PARAMS) {
                if (DEFAULT_PLAYER_PARAMS.hasOwnProperty(prop)) {
                    stringBuilder.push("&");
                    stringBuilder.push(prop);
                    stringBuilder.push("=");
                    stringBuilder.push(DEFAULT_PLAYER_PARAMS[prop]);
                }
            }
            
            var src = stringBuilder.join("");
            // console.log(src);
            return src;
        }
        
        var ytElem;
        switch(playerParams.version) {
            case "flash":
                ytElem = $('<object>');
                ytElem.attr({
                    'width': playerParams.width,
                    'height': playerParams.height,
                    'type': 'application/x-shockwave-flash',
                    'data': constructSrc()
                });
                break;
                
            case "iframe": // default case; fallthrough
            default:
                ytElem = $('<iframe>');
                ytElem.addClass('yt-player');
                ytElem.attr({
                    'width': playerParams.width,
                    'height': playerParams.height,
                    'src': constructSrc()
                });
                break;
        }
        return ytElem[0];
    }
    
    // If not using lightweight player then this simply puts the video element into the page
    // If using lightweight player then bind a once-only onclick trigger that does the above
    function setupPlayers() {
        
        for(var i = 0; i < instances.length; i++) {
            var instanceElem = $(instances[i]);
            var playerNode = instanceElem.children(PLAYER_HOOK)[0];
            var player = constructYtElem(playerParams[i]);
            
            // Edge case: If player node is missing from malformed template etc
            // Form a placeholder node so code runs as usual but don't put it into the document.
            if(playerNode === undefined) {
                playerNode = $('<span>')[0];
            }
            
            $(playerNode).empty(); // remove throbber element
            
            switch(playerParams[i].isLightweight) {
                case "1":
                    $(playerNode).addClass(BGIMG_HOOK);
                    $(playerNode).attr({'aria-label': 'Watch video'}); // Without the video title, this is the best we could do
                    (function(_player, _playerNode) { // closure to preserve the right player, playerNode values
                        $(_playerNode).one("click", function (event) {
                            $(_playerNode).removeClass(BGIMG_HOOK);
                            $(_playerNode).removeAttr('aria-label');
                            _playerNode.append(_player);
                        });
                    }(player, playerNode));
                    break;
                    
                case "0": // default case; fallthrough
                default:
                    playerNode.append(player);
                    break;
            }
        }
    }
    
    getInstances();
    getPlayerParams();
    setupPlayers();
    
    // console.log(instances);
    // console.log(playerParams);
    
}

addOnloadHook(initYoutubePlayers);


/* Anything under this line is not currently in use ------------------------------------------ */


/** Kirby Wiki's AJAX Youtube playlist player ***************************************************
 *  Retrieves and displays track info of each playlist and dynamically creates player
 *    controls. Avoids using Youtube's cramped embedded playlist navigation, and all
 *    tracks play from a single iframe.
 *
 *  Maintainers : [[User:Changtau2005]] (kirby.wikia.com)
 *  Status      : This is a mess. needs refactor. Not currently used.
 *
 *  Required by : [[Template:YoutubePlaylistPlayer]]
 *
 */

/** Locates DOM patterns as defined by [[Template:YoutubePlaylistPlayer]], retrieves data,
 *  and gets playlist data from Youtube for each one
 */
function initYoutubePlaylistPlayers() {

    // DOM hooks
    var WIKI_PREFIX = 'kw',
        PLAYER_POSTFIX = '-ytplaylistplayer',
        INNER_WRAPER_POSTFIX = '-ytplaylistplayer-inner-wrapper',
        PLAYLIST_POSTFIX = '-ytplaylistplayer-playlist',
        PLAYLIST_NOTICE_POSTFIX = '-ytplaylistplayer-notice',
        PLAYLIST_ROW = '-playlist-row-',
        PLAYLIST_INDEX = '-playlist-index-',
        PLAYLIST_TITLE = '-playlist-title-',
        PLAYLIST_CONTROL = '-playlist-controls-',
        PLAYLIST_DURATION = '-playlist-duration-',
        PLAYLIST_DESCRIPTION = '-playlist-description-';

    var MAX_RESULTS = 50,             // Youtube's upper limit is 50
        MAX_TRACK_LENGTH_EXPONENT = 5;  // 10^5 seconds. Used for correct client-side table sorting behaviour only.

    var iframeArray = $('iframe' + '.' + WIKI_PREFIX + PLAYER_POSTFIX),
        kwId,
        playlistId,
        iframe;

    /**
     *  @param mainId     :String      Unique specified id in template, e.g. KRtDL, KatAM, KDL etc.
     *  @param iframe     :DOM element Iframe of player
     */
    function KwYoutubePlaylistPlayer(kwId, playlistId, iframe) {

        var playlistLength = 0,     // No. of tracks in playlist
            playlistDuration = 0,   // Sum of duration of all tracks, in seconds
            playlistId;

        function init() {

            var startIndex = 1; // which video in the playlist to start fetching from

            function getFeed(startIndex) {

                function appendControls(parent, index) {

                    var playButton,
                        playButtonInner,
                        pauseButton,
                        pauseButtonInner;

                    playButtonInner = $('<img></img>');
                    playButtonInner.attr({
                        src: 'https://images.wikia.nocookie.net/kirby/en/images/a/a2/Playback-play-small.png',
                        alt: 'Play'
                    });
                    playButton = $('<a></a>');
                    playButton.append(playButtonInner);
                    playButton.click(function () {
                        iframe.contentWindow.postMessage(JSON.stringify({
                            event: 'command',
                            id: kwId,
                            func: 'playVideoAt',
                            args: [index]
                        }), '*');
                    });

                    pauseButtonInner = $('<img></img>');
                    pauseButtonInner.attr({
                        src: 'https://images.wikia.nocookie.net/kirby/en/images/9/96/Playback-pause-small.png',
                        alt: 'Pause'
                    });
                    pauseButton = $('<a></a>');
                    pauseButton.append(pauseButtonInner);
                    pauseButton.click(function () {
                        iframe.contentWindow.postMessage(JSON.stringify({
                            event: 'command',
                            id: kwId,
                            func: 'pauseVideo',
                            args: []
                        }), '*');
                    });

                    parent.append(playButton);
                    parent.append(pauseButton);
                }

                // inserts data into cells generated by the MediaWiki template
                function appendPlaylistDetails(data) {

                    var indexCell,
                        titleCell,
                        controlsCell,
                        durationCell,
                        descCell,
                        titleAnchorElement,
                        throbberElement;

                    indexCell = $('#' + kwId + PLAYLIST_INDEX + '0');
                    indexCell.append('P');

                    titleCell = $('#' + kwId + PLAYLIST_TITLE + '0');
                    titleAnchorElement = $('<a></a>');
                    titleAnchorElement.html(data.feed.title.$t);
                    titleAnchorElement.attr({
                        id: 'PL' + data.feed['yt$playlistId'].$t,
                        href: 'http://www.youtube.com/playlist?list=' + 'PL' + data.feed['yt$playlistId'].$t,
                        target: '_blank'
                    });
                    titleCell.append(titleAnchorElement);

                    controlsCell = $('#' + kwId + PLAYLIST_CONTROL + '0');
                    appendControls(controlsCell, 0);

                    durationCell = $('#' + kwId + PLAYLIST_DURATION + '0');
                    throbberElement = $('<img></img>');
                    throbberElement.attr({
                        src: 'https://images.wikia.nocookie.net/kirby/en/images/8/82/Basic_throbber.gif',
                        title: 'Remaining data is still loading... Please wait.',
                        alt: 'Basic throbber.gif'
                    });
                    durationCell.append(throbberElement);

                    descCell = $('#' + kwId + PLAYLIST_DESCRIPTION + '0');
                    descCell.append(' (' + data.feed['openSearch$totalResults'].$t + ' tracks)');
                }

                // inserts data into cells generated by the MediaWiki template
                function appendTrackDetails(data, startIndex) {

                    $.each(data.feed.entry, function (i, v) {

                        var index = startIndex.toString();

                        var tr = $('#' + kwId + PLAYLIST_ROW + index),
                            prevTr = $('#' + kwId + PLAYLIST_ROW + (startIndex - 1).toString()),
                            indexCell,
                            titleCell,
                            controlsCell,
                            durationCell;

                        var emptyRow = '<tr id="' + kwId + PLAYLIST_ROW + index + '">' +
                                        '<td id="' + kwId + PLAYLIST_INDEX + index + '"></td>' +
                                        '<td id="' + kwId + PLAYLIST_TITLE + index + '"></td>' +
                                        '<td id="' + kwId + PLAYLIST_CONTROL + index + '"></td>' +
                                        '<td id="' + kwId + PLAYLIST_DURATION + index + '"></td>' +
                                        '<td id="' + kwId + PLAYLIST_DESCRIPTION + index + '"></td>' +
                                        '</tr>';

                        // Rows pre-inserted by the MediaWiki template are hidden by default, as they only contain comments of tracks
                        if (tr.length === 0) { // if row is not defined in MediaWiki
                            $(prevTr).after(emptyRow); // insert an empty row
                        }
                        else {
                            tr.show(); // unhide the row
                        }

                        // playlist index
                        indexCell = $('#' + kwId + PLAYLIST_INDEX + startIndex);
                        indexCell.append('<span class="kw-sortkey">' + padTime(index, 4) + '</span>' + index);

                        // video title
                        var vidTitle,
                            titleSubString,
                            anchor;

                        vidTitle = v.title.$t; // unrefined title with extension (.wmv etc)
                        // find last "." character and take substring before it. If not found, take whole string
                        titleSubString = vidTitle.substring(0, vidTitle.lastIndexOf("."));
                        if (titleSubString !== '') { vidTitle = titleSubString; }
                        anchor = $('<a></a>');
                        anchor.html(vidTitle);
                        anchor.addClass('external');
                        anchor.attr({
                            id: v['media$group']['yt$videoid'].$t, // required to highlight the appropriate row
                            href: v['media$group']['media$player'].url,
                            target: '_blank'
                        });
                        titleCell = $('#' + kwId + PLAYLIST_TITLE + index);
                        titleCell.append(anchor);

                        // player controls
                        controlsCell = $('#' + kwId + PLAYLIST_CONTROL + index);
                        appendControls(controlsCell, (startIndex - 1));

                        // duration
                        var trackDuration = v['media$group']['yt$duration'].seconds;
                        KIRBY_WIKI_GLOBAL.youtubePlaylistPlayer.players[kwId].playlistDuration += parseInt(trackDuration);
                        durationCell = $('#' + kwId + PLAYLIST_DURATION + index);
                        durationCell.append('<span class="kw-sortkey">' + padTime(trackDuration, MAX_TRACK_LENGTH_EXPONENT) + '</span>');
                        durationCell.append(secondsToClock(trackDuration));

                        startIndex += 1;

                    });
                }

                /** Finalizes player data. Scrolls window to id == uri fragment and highlights the row (if any), and
                 *  finalizes playlist duration
                 */
                function finalizePlayer() {
                    $('#' + kwId + PLAYLIST_DURATION + '0').html('<span class="kw-sortkey">' + padTime(KIRBY_WIKI_GLOBAL.youtubePlaylistPlayer.players[kwId].playlistDuration, MAX_TRACK_LENGTH_EXPONENT) + '</span>' + secondsToClock(KIRBY_WIKI_GLOBAL.youtubePlaylistPlayer.players[kwId].playlistDuration));
                    var uriFragment = window.location.toString();
                    if (uriFragment.lastIndexOf('#') != -1) {
                        uriFragment = uriFragment.substring(uriFragment.lastIndexOf('#') + 1);
                        $('#' + uriFragment).parent().parent().addClass('playlist-highlight');
                        document.getElementById(uriFragment).scrollIntoView(true);
                    }
                }

                function secondsToClock(seconds) {
                    if (Math.floor(seconds / 3600) >= 1) {
                        return (Math.floor(seconds / 3600) + ':' + padTime(Math.floor(seconds / 60) % 60, 2) + ':' + padTime((seconds % 60), 2));
                    } else {
                        return (Math.floor(seconds / 60) + ':' + padTime((seconds % 60), 2));
                    }
                }

                function padTime(input, length) {
                    var str = input.toString();
                    while (str.length < length) { str = '0' + str; }
                    return str;
                }

                function onAjaxSuccess(data) {
                    if (startIndex === 1) {
                        $('#' + kwId + PLAYLIST_NOTICE_POSTFIX).parent().remove(); // remove no-js notice
                        KIRBY_WIKI_GLOBAL.youtubePlaylistPlayer.players[kwId].playlistLength = parseInt(data.feed['openSearch$totalResults'].$t);
                        appendPlaylistDetails(data);
                    }
                    appendTrackDetails(data, startIndex);
                    var overflow = startIndex + MAX_RESULTS;
                    if (overflow < KIRBY_WIKI_GLOBAL.youtubePlaylistPlayer.players[kwId].playlistLength) { 
                        getFeed(overflow);
                    }
                    else { finalizePlayer(); } // last internal recursive call - finalize data
                }

                var startIndex = startIndex || 1;

                $.ajax({
                    url: 'http://gdata.youtube.com/feeds/api/playlists/' + playlistId + '?v=2&alt=json&max-results=' + MAX_RESULTS.toString() + '&start-index=' + startIndex.toString(),
                    dataType: 'jsonp',
                    success: onAjaxSuccess
                });
            }

            $('#' + kwId + PLAYLIST_NOTICE_POSTFIX).parent().remove(); // remove no-javascript notice
            getFeed();

        };

        return {
            init: init,
            playlistLength: playlistLength,
            playlistDuration: playlistDuration,
            playlistId: playlistId,
            kwId: kwId,
            iframe: iframe
        }

    }

    // initialize new global property
    KIRBY_WIKI_GLOBAL.youtubePlaylistPlayer = KIRBY_WIKI_GLOBAL.youtubePlaylistPlayer || {
        players: {}
    };

    iframeArray.each(function (i, v) {
        if ($(this).prop('tagName') === 'IFRAME') {
            kwId = $(this).parent().attr('data-kw-id');    // Get kirby wiki id -- e.g. KatAM, KCC etc
            playlistId = $(this).attr('id');
            iframe = $(this)[0];
            
            iframe.contentWindow.postMessage(JSON.stringify({
                event: 'listening', id: kwId
            }), '*');
            window.addEventListener('message', function(event) {
                
                // youtube player states
                var YT_STATE_UNSTARTED = -1;
                var YT_STATE_ENDED = 0;
                var YT_STATE_PLAYING = 1;
                var YT_STATE_PAUSED = 2;
                var YT_STATE_BUFFERING = 3;
                var YT_STATE_CUED = 5;
                
                if(event.source === iframe.contentWindow) {
                    var data = JSON.parse(event.data);
                    
                    var kwId;
                    var playerState;
                    var playlistIndex;
                    var trackId;
                    var playerRowElement;
                    var kwPlayer;

                    kwId = data.id;
                    if(data.info !== null) {
                        
                        // On player state change i.e. load, play, pause, stop, all 3 vars will be defined
                        if(data.info.playerState !== undefined) {
                            playerState = data.info.playerState;
                            playlistIndex = data.info.playlistIndex;
                            trackId = data.info.videoData.video_id;
                            
                            
                            playerRowElement = $('#' + trackId).parent().parent();
                            kwPlayer = KIRBY_WIKI_GLOBAL.youtubePlaylistPlayer.players[kwId];

                            // For some reason youtube increments playlistIndex by 2 each time the playlist autoplays
                            // so we are forced to fallback to tracking current playing track by trackId
                            if(playerState === YT_STATE_PLAYING) {
                                if(kwPlayer.lastPlayedTrackId !== undefined) {
                                    $('#' + kwPlayer.lastPlayedTrackId).parent().parent().removeClass('playlist-playing');
                                }
                                playerRowElement.addClass('playlist-playing');
                                kwPlayer.lastPlayedTrackId = trackId;
                            } else {
                                playerRowElement.removeClass('playlist-playing');
                            }
                        }
                    }
                }
            });

            KIRBY_WIKI_GLOBAL.youtubePlaylistPlayer.players[kwId] = new KwYoutubePlaylistPlayer(kwId, playlistId, iframe);
            KIRBY_WIKI_GLOBAL.youtubePlaylistPlayer.players[kwId].init();
        }
    });

}

addOnloadHook(initYoutubePlaylistPlayers);