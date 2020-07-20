/**
 * ChatOptions
 * Change how Special:Chat looks and functions using an interface.
 * Uses cookies to store the changes.
 * A potential solution to all your ChatHacks problems.
 *
 * Many thanks to the Call of Duty Wiki Chat,
 * who supported and helped this the whole way through.
 * It has been much appreciated. Thank you!
 *
 * WARNING
 * Make sure you are not loading MediaWiki:Chat.js/load.js 
 * with MediaWiki:Chat-edit-count.
 * Load it with MediaWiki:Chat-welcome-message, or this
 * will malfunction badly.
 * TODO: Improve user interface
 *
 * @version 1.3.1
 * @author Callofduty4
 * @author Madnessfan34537
 * @author Sactage <sactage@gmail.com> 
 *
 * @version 2.0.0
 * @author Tierrie
 *
 * Changelog:
 * Renamed MediaWiki:Chat.js/load.js to MediaWiki:Chat/AutoLoad.js 
 * Moved onLoad calls to jQuery's ready
 * Encoded icon as 64bit data
 * Moved setCookies to jQuery cookies, fixed cookie compliance issue
 * Added color pickers
 * Cleaned up UI
 */


if(wgCanonicalSpecialPageName == 'Chat') {
  (function(){
    
    // load color picker if it is not already loaded
    if (!$.fn.ColorPicker || typeof($.fn.ColorPicker) == undefined) {
      importScript('MediaWiki:Jquery.colorpicker.js');
      importStylesheet('MediaWiki:Jquery.colorpicker.css');
    }
    
    var cookie_id = 'chat';
    
    function removeCookie(key) {
      setCookie(key);
    }
    
    function setCookie(key, value) {
      if(value=="undefined" || value == "null") value = null;
      $.cookie(cookie_id + key, value, { expires: 150, path: '/' });
    }
    
    function getCookie(key) {
      return $.cookie(cookie_id + key);
    }
   
    var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
    function rgb2hex(rgb) {
      if (rgb.substr(0, 1) === '#') { return rgb };
      
      if (rgb.match(/rgba/)) {
        rgb = rgb.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/);
      } else {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      }
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
    function hex(x) {
      return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
    
    /**
     * Function to check if a chat options module is enabled
     */
    function isEnabled(module) {
      return (getCookie(module) === "true");
    }
    
    // store chat customisation options as an object
    var chatOptions = {
      look: {
        font: {
          default_color: "rgb(212,212,212)",
          color: getCookie("fontcolor"),
          family: getCookie("fontfamily"),
        },
        surround: {
          default_color: "rgb(0,0,0)",
          color: getCookie("surroundcolor"),
        },
        selfpost: {
          default_color: "rgb(33,33,33)",
          color: getCookie("selfpostcolor"),
        },
        background: {
          default_color: "rgb(24,24,24)",
          color: getCookie("backgroundcolor"),
        },
      },
      modules: {
        ChatHacks: {
          element: "#ChatHacks",
          enabled: isEnabled("ChatHacks"),
          loaded: false,
          load: function () {
            if ($("#pingspan").length > 0 || this.loaded)
              return;
            importScriptPage("User:Monchoman45/ChatHacks.js", "c");
            this.loaded = true;
          }
        },
        TabComplete: {
          element: "#TabComplete",
          enabled: isEnabled("TabComplete"),
          loaded: false,
          load: function () {
            importScriptPage("User:Joeytje50/tabinsert.js","rs");
            this.loaded = true;
          }
        },
        MultiKick: {
          element: "#MultiKick",
          enabled: isEnabled("MultiKick"),
          loaded: false,
          load: function () {
            var groups = mw.config.get("wgUserGroups");
            if ((!groups.indexOf("chatmoderator") && !groups.indexOf("sysop") && !groups.indexOf("staff") && !groups.indexOf("helper") && !groups.indexOf("vstf")) || $("MultiKickerButton").length) {
              return; // Do not load
            }
            importScriptPage("User:Madnessfan34537/multikick.js","cod");
            $('<a id="MultiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">MultiKick</a>').appendTo('.Write'); // to prevent issues with the button not loading
            this.loaded = true;
          }
        },
        MultiPM: {
          element: "#MultiPM",
          enabled: isEnabled("MultiPM"),
          loaded: false,
          load: function () {
            importScriptPage("MediaWiki:Chat.js/multipms.js", "cod");
            this.loaded = true;
          }
        },
        SearchBar: {
          element: "#SearchBar",
          enabled: isEnabled("SearchBar"),
          loaded: false,
          load: function () {
            importScriptPage("MediaWiki:Chat.js/searchbar.js","cod");
            this.loaded = true;
          }
        },
        IgnoreURL: {
          element: "#IgnoreURL",
          enabled: isEnabled("IgnoreURL"),
          loaded: false,
          load: function () {
            $('head').append('<style type="text/css">li[data-user="' + (window.ignoreBot || "URL") + '"] {display:none;}</style>');
            this.loaded = true;
          }
        },
        StopSideScroll: {
          element: "#StopSideScroll",
          enabled: isEnabled("StopSideScroll"),
          loaded: false,
          load: function () {
            $('head').append('<style type="text/css">#WikiaPage .Chat .message { word-wrap: break-word; }</style>');
            this.loaded = true;
          }
        }
      }
    }
    
    /**
     * Applies updated settings to the chat skin
     */
    function updateChatSkin() {
      $('body').css({"background-color":chatOptions.look.surround.color});
      $('.WikiaPage').css({"background-color":chatOptions.look.background.color, "color":chatOptions.look.font.color, "font-family":chatOptions.look.font.family});
      $('.Chat').css({"font-family":chatOptions.look.font.family});
      $('.Rail').css({"font-family":chatOptions.look.font.family}); 
      $('.ChatHeader').css({"background-color":chatOptions.look.background.color, "font-family":chatOptions.look.font.family});
      var selfPostElement = document.createElement('style');
      selfPostElement.innerHTML = '.Chat .you{background:' + chatOptions.look.selfpost.color + ' !important;}';
      $('head').append(selfPostElement);
      $('.Write [name="message"]').css({"color":chatOptions.look.font.color});
      $('.Write .message').css({"background-color":chatOptions.look.background.color});
      $('.ChatHeader .User .username').css({"color":chatOptions.look.font.color});
      
      for (var m in chatOptions.modules) {
        if ( chatOptions.modules.hasOwnProperty( m ) ) {
          var module = chatOptions.modules[m];
          if (typeof module.enabled === 'boolean' && module.enabled && !module.loaded) {
            module.load();
          }
        }
      }
    }
     
    /**
     * Displays the options window
     */
    function openOptions() {
      $.showCustomModal( "Options", '<form class="WikiaForm"><fieldset><div class="input-group"><label>Colors</label><div id="chat_look_backgroundcolor" class="chat_look"><div id="color_selector_backgroundcolor" class="color_selector"><div></div></div>Background color<a title="Reset colors to default">[x]</a></div><div id="chat_look_selfbackgroundcolor" class="chat_look"><div id="color_selector_selfbackgroundcolor" class="color_selector"><div></div></div>Own messages background color<a title="Reset colors to default">[x]</a></div><div id="chat_look_surroundcolor" class="chat_look"><div id="color_selectorsurroundcolor" class="color_selector"><div></div></div>Surround color<a title="Reset colors to default">[x]</a></div><div id="chat_look_fontcolor" class="chat_look"><div id="color_selector_fontcolor" class="color_selector"><div></div></div>Font color<a title="Reset colors to default">[x]</a></div></div><div class="input-group"><label>Font</label><select id="chat_look_fontface"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select>Font family</div><div class="input-group"><label>Features</label><div id="chat_modules_chathacks"><input type="checkbox" name="ChatHacks" value="ChatHacks" id="ChatHacks"/>Enable <a href="http://c.wikia.com/wiki/User:Monchoman45/ChatHacks.js" target="_blank">chat hacks</a></div><div id="chat_modules_multipm"><input type="checkbox" name="MultiPM" value="MultiPM" id="MultiPM"/>Enable <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/MultiPM.js" target="_blank">multi user messaging</a></div><div id="chat_modules_tabcomplete"><input type="checkbox" name="TabComplete" value="TabComplete" id="TabComplete"/>Enable <a href="http://runescape.wikia.com/wiki/User:Joeytje50/tabinsert.js" target="_blank">tab completion</a></div><div id="chat_modules_searchbar"><input type="checkbox" name="SearchBar" value="SearchBar" id="SearchBar"/>Enable <a href="http://callofduty.wikia.com/wiki/MediaWiki:Chat.js/SearchBar.js" target="_blank">wiki search bar</a></div><div id="chat_modules_multikick"><input type="checkbox" name="MultiKick" value="MultiKick" id="MultiKick" />Enable <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/MultiKick.js" target="_blank">multi kick</a></div><div id="chat_modules_ignoreurl"><input type="checkbox" name="IgnoreURL" value="IgnoreURL" id="IgnoreURL"/>Ignore URL in main chat</div><div id="chat_modules_stopsidescroll"><input type="checkbox" name="StopSideScroll" value="StopSideScroll" id="StopSideScroll"/>Stop side scroll during spam</div></div></fieldset></form>',
      {
        id: "optionsWindow",
        width: 450,
        buttons: [
          {
            id: "cancel",
            message: "Cancel",
            handler: function () {
              closeOptions();
            }
          },
          {
            id: "updateCookie",
            defaultButton: true,
            message: "Update!",
            handler: function () {
              updateCookie();
            }
          }
        ]
      });
      
      // check if various modules have been enabled by the user, and check their boxes if so
      if (chatOptions.modules.ChatHacks.enabled)
        $("#ChatHacks").attr("checked",true);
      if (chatOptions.modules.MultiPM.enabled)
        $("#MultiPM").attr("checked",true);
      if (chatOptions.modules.TabComplete.enabled)
        $("#TabComplete").attr("checked",true);
      if (chatOptions.modules.SearchBar.enabled)
        $("#SearchBar").attr("checked",true);
      if (chatOptions.modules.MultiKick.enabled)
        $("#MultiKick").attr("checked",true);
      if (chatOptions.modules.IgnoreURL.enabled)
        $("#IgnoreURL").attr("checked",true);
      if (chatOptions.modules.StopSideScroll.enabled)
        $("#StopSideScroll").attr("checked",true);
      
      // enum through the available window fonts
      if (typeof window.customFonts !== "undefined" && window.customFonts.length) {
        for (var i = 0; i < window.customFonts.length; i++) {
          var font = window.customFonts[i];
          $("#fontfamily").append('<option value="' + font+ '" style="font-family:' + font + ';">' + font.slice(0,1).toUpperCase() + font.slice(1) + '</option>');
        }
      }
      
      // set certain modules' checkboxes to disabled if specific conditions are not met
      if (!wgUserGroups.indexOf("chatmoderator") && !wgUserGroups.indexOf("sysop") && !wgUserGroups.indexOf("staff") && !wgUserGroups.indexOf("helper") && !wgUserGroups.indexOf("vstf"))
        $("#MultiKick").attr("disabled",true);
       
      // sets the font selector to the one chosen currently
      $("select option[value='" + chatOptions.look.font.family + "']").attr("selected","selected");
    
      // function that hooks the color selector
      function hookColorPicker(el, cur) {
        $(el + ' div').css('background-color',cur);
        
        $(el).ColorPicker({
    			onShow: function(colpkr) {
    				$(colpkr).fadeIn(200);
    				return false;
    			},
    			onHide: function(colpkr) {
    				$(colpkr).fadeOut(200);
    				return false;
    			},
    			onSubmit: function(hsb, hex, rgb) {
    				$(el + ' div').css('background-color', '#' + hex);
    			},
    			onBeforeShow: function(colpkr) {
    				$(this).ColorPickerSetColor(rgb2hex($(el + ' div').css('background-color')));
    			}
    		});
      }
      
      // hack to see if there exists a message from yourself, if not, create an empty message to get the background
      if($('.Chat you').length == 0) { $('.Chat ul').append('<li class="you" style="display: none;"/>'); }
      
      // hook the color picker onto the selectors
      hookColorPicker('#color_selector_backgroundcolor', $('.WikiaPage').css('background-color'));
      hookColorPicker('#color_selector_selfbackgroundcolor', $('.Chat .you').css('background-color'));
      hookColorPicker('#color_selectorsurroundcolor', $('body').css('background-color'));
      hookColorPicker('#color_selector_fontcolor', $('.WikiaPage').css('color'));
      
      // set up a default button after each of the color options that resets the color to the default
      $('#chat_look_backgroundcolor a').click(function() { $('#color_selector_backgroundcolor div').css('background-color', chatOptions.look.background.default_color)});
      $('#chat_look_selfbackgroundcolor a').click(function() { $('#color_selector_selfbackgroundcolor div').css('background-color', chatOptions.look.selfpost.default_color)});
      $('#chat_look_surroundcolor a').click(function() { $('#color_selectorsurroundcolor div').css('background-color', chatOptions.look.surround.default_color)});
      $('#chat_look_fontcolor a').click(function() { $('#color_selector_fontcolor div').css('background-color', chatOptions.look.font.default_color)});
    }
    
    /**
     * Close the options window without saving any changes
     */
    function closeOptions() {
      $('#optionsWindow').remove();
      $('.blackout').remove();
    } // end closeOptions()
     
    /**
     * Saves user options and stores them in a cookie for persistence across sessions
     */
    function updateCookie() {
      chatOptions.look.background.color = $('#color_selector_backgroundcolor div').css('background-color');
      chatOptions.look.surround.color = $('#color_selectorsurroundcolor div').css('background-color');
      chatOptions.look.selfpost.color = $('#color_selector_selfbackgroundcolor div').css('background-color');
      chatOptions.look.font.color = $('#color_selector_fontcolor div').css('background-color');
      chatOptions.look.font.family = $('#chat_look_fontface').val();
      
      for (var m in chatOptions.modules) {
        if ( chatOptions.modules.hasOwnProperty( m ) ) {
          var module = chatOptions.modules[m];
          if (typeof module.element != 'undefined' && $(module.element).attr("checked")) {
            module.enabled = true;
          } else {
            module.enabled = false;
          }
        }
      }
      
      // Set the cookies
      for (var m in chatOptions.modules) {
        setCookie(m, chatOptions.modules[m].enabled);
      }
      
      for (var l in chatOptions.look) {
        if(chatOptions.look[l]) {
          if(chatOptions.look[l].font) {
            setCookie(l + 'font', chatOptions.look[l].font);
          }
          if(chatOptions.look[l].color) {
            setCookie(l + 'color', chatOptions.look[l].color);
          }
        } else {
          removeCookie(l);
        }
      }
      updateChatSkin();
      closeOptions();
    } // end updateCookie()
    
    // add options button
    if (!$("#chat-options-button").length) {
      // Prevent multiple buttons from being appended
      $('.Rail').append('<div id="chat-options-button"><img height="16" width="16" class="sprite gear" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" /><div class="chat-options">Options</div></div>');
      $('.Rail #chat-options-button').click(openOptions);
    }
    
    $(document).ready(updateChatSkin);
  })(); // execute the anonymous function for scopin
}