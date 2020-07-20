/* Any JavaScript here will be loaded for all users on every page load. */
 
/*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 *
 * Version 1.3   -   Updated: Mar. 23, 2010
 *
 * This TipTip jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){
  $.fn.tipTip = function(options) {
    var defaults = { 
      activation: "hover",
      keepAlive: false,
      maxWidth: "200px",
      edgeOffset: 3,
      defaultPosition: "bottom",
      delay: 0,
      fadeIn: 100,
      fadeOut: 100,
      attribute: "title",
      content: false, // HTML or String to fill TipTip with
        enter: function(){},
        exit: function(){}
      };
     var opts = $.extend(defaults, options);
     
     // Setup tip tip elements and render them to the DOM
     if($("#tiptip_holder").length <= 0){
       var tiptip_holder = $('<div id="tiptip_holder" style="max-width:'+ opts.maxWidth +';"></div>');
      var tiptip_content = $('<div id="tiptip_content"></div>');
      var tiptip_arrow = $('<div id="tiptip_arrow"></div>');
      $("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')));
    } else {
      var tiptip_holder = $("#tiptip_holder");
      var tiptip_content = $("#tiptip_content");
      var tiptip_arrow = $("#tiptip_arrow");
    }
    
    return this.each(function(){
      var org_elem = $(this);
      if(opts.content){
        var org_title = opts.content;
      } else {
        var org_title = org_elem.attr(opts.attribute);
      }
      if(org_title != ""){
        if(!opts.content){
          org_elem.removeAttr(opts.attribute); //remove original Attribute
        }
        var timeout = false;
        
        if(opts.activation == "hover"){
          org_elem.hover(function(){
            active_tiptip();
          }, function(){
            if(!opts.keepAlive){
              deactive_tiptip();
            }
          });
          if(opts.keepAlive){
            tiptip_holder.hover(function(){}, function(){
              deactive_tiptip();
            });
          }
        } else if(opts.activation == "focus"){
          org_elem.focus(function(){
            active_tiptip();
          }).blur(function(){
            deactive_tiptip();
          });
        } else if(opts.activation == "click"){
          org_elem.click(function(){
            active_tiptip();
            return false;
          }).hover(function(){},function(){
            if(!opts.keepAlive){
              deactive_tiptip();
            }
          });
          if(opts.keepAlive){
            tiptip_holder.hover(function(){}, function(){
              deactive_tiptip();
            });
          }
        }
      
        function active_tiptip(){
          opts.enter.call(this);
          tiptip_content.html(org_title);
          tiptip_holder.hide().removeAttr("class").css("margin","0");
          tiptip_arrow.removeAttr("style");
          
          var top = parseInt(org_elem.offset()['top']);
          var left = parseInt(org_elem.offset()['left']);
          var org_width = parseInt(org_elem.outerWidth());
          var org_height = parseInt(org_elem.outerHeight());
          var tip_w = tiptip_holder.outerWidth();
          var tip_h = tiptip_holder.outerHeight();
          var w_compare = Math.round((org_width - tip_w) / 2);
          var h_compare = Math.round((org_height - tip_h) / 2);
          var marg_left = Math.round(left + w_compare);
          var marg_top = Math.round(top + org_height + opts.edgeOffset);
          var t_class = "";
          var arrow_top = "";
          var arrow_left = Math.round(tip_w - 12) / 2;

                    if(opts.defaultPosition == "bottom"){
                      t_class = "_bottom";
                     } else if(opts.defaultPosition == "top"){ 
                       t_class = "_top";
                     } else if(opts.defaultPosition == "left"){
                       t_class = "_left";
                     } else if(opts.defaultPosition == "right"){
                       t_class = "_right";
                     }
          
          var right_compare = (w_compare + left) < parseInt($(window).scrollLeft());
          var left_compare = (tip_w + left) > parseInt($(window).width());
          
          if((right_compare && w_compare < 0) || (t_class == "_right" && !left_compare) || (t_class == "_left" && left < (tip_w + opts.edgeOffset + 5))){
            t_class = "_right";
            arrow_top = Math.round(tip_h - 13) / 2;
            arrow_left = -12;
            marg_left = Math.round(left + org_width + opts.edgeOffset);
            marg_top = Math.round(top + h_compare);
          } else if((left_compare && w_compare < 0) || (t_class == "_left" && !right_compare)){
            t_class = "_left";
            arrow_top = Math.round(tip_h - 13) / 2;
            arrow_left =  Math.round(tip_w);
            marg_left = Math.round(left - (tip_w + opts.edgeOffset + 5));
            marg_top = Math.round(top + h_compare);
          }

          var top_compare = (top + org_height + opts.edgeOffset + tip_h + 8) > parseInt($(window).height() + $(window).scrollTop());
          var bottom_compare = ((top + org_height) - (opts.edgeOffset + tip_h + 8)) < 0;
          
          if(top_compare || (t_class == "_bottom" && top_compare) || (t_class == "_top" && !bottom_compare)){
            if(t_class == "_top" || t_class == "_bottom"){
              t_class = "_top";
            } else {
              t_class = t_class+"_top";
            }
            arrow_top = tip_h;
            marg_top = Math.round(top - (tip_h + 5 + opts.edgeOffset));
          } else if(bottom_compare | (t_class == "_top" && bottom_compare) || (t_class == "_bottom" && !top_compare)){
            if(t_class == "_top" || t_class == "_bottom"){
              t_class = "_bottom";
            } else {
              t_class = t_class+"_bottom";
            }
            arrow_top = -12;            
            marg_top = Math.round(top + org_height + opts.edgeOffset);
          }
        
          if(t_class == "_right_top" || t_class == "_left_top"){
            marg_top = marg_top + 5;
          } else if(t_class == "_right_bottom" || t_class == "_left_bottom"){    
            marg_top = marg_top - 5;
          }
          if(t_class == "_left_top" || t_class == "_left_bottom"){  
            marg_left = marg_left + 5;
          }
          tiptip_arrow.css({"margin-left": arrow_left+"px", "margin-top": arrow_top+"px"});
          tiptip_holder.css({"margin-left": marg_left+"px", "margin-top": marg_top+"px"}).attr("class","tip"+t_class);
          
          if (timeout){ clearTimeout(timeout); }
          timeout = setTimeout(function(){ tiptip_holder.stop(true,true).fadeIn(opts.fadeIn); }, opts.delay);  
        }
        
        function deactive_tiptip(){
          opts.exit.call(this);
          if (timeout){ clearTimeout(timeout); }
          tiptip_holder.fadeOut(opts.fadeOut);
        }
      }        
    });
  }
})(jQuery);    


/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code originally by "pcj" of Wowpedia
 * Maintenance, cleanup, style and bug fixes by Grunny
 * (http://community.wikia.com/wiki/User:Grunny)
 */
var ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
  ajaxTimer,
  ajaxRefresh = 60000,
  refreshText = 'Auto-refresh page',
  refreshHover = 'Enable auto-refreshing of this page',
  doRefresh = true;

if ( !window.ajaxPages ) {
  var ajaxPages = new Array( 'Special:RecentChanges','Special:WikiActivity' );
}
if ( !window.ajaxCallAgain ) {
  var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
  refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
  refreshHover = AjaxRCRefreshHoverText;
}

/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie( c_name, value, expiredays ) {
  var exdate = new Date();
  exdate.setDate( exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}

/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie( c_name ) {
  if ( document.cookie.length > 0 ) {
    var c_start = document.cookie.indexOf( c_name + "=" );
    if ( c_start !== -1 ) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf( ";", c_start );
      if ( c_end === -1 ) {
        c_end = document.cookie.length;
      }
      return unescape( document.cookie.substring( c_start, c_end ) );
    }
  }
  return "";
}

/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
  var  ajaxRLCookie = ( getCookie( "ajaxload-" + wgPageName ) == "on" ) ? true : false,
    appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstHeading' ) );
  appTo.append( '&nbsp;<span id="ajaxRefresh"><span style="cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="vertical-align: baseline; float: none;" border="0" alt="Refreshing page" /></span></span>' );
  $( '#ajaxLoadProgress' ).ajaxSend( function ( event, xhr, settings ) {
    if ( location.href == settings.url ) {
      $( this ).show();
    }
  } ).ajaxComplete ( function ( event, xhr, settings ) {
    var  $collapsibleElements = $( '#mw-content-text' ).find( '.mw-collapsible' );
    if ( location.href == settings.url ) {
      $( this ).hide();
      for ( var i = 0; i < ajaxCallAgain.length; i++ ) {
        ajaxCallAgain[i]();
      }
      if ( $collapsibleElements.length ) {
        $collapsibleElements.makeCollapsible();
      }
      if ( mw.config.get( 'wgNamespaceNumber' ) === -1 && mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Recentchanges' ) {
        mw.special.recentchanges.init();
      }
    }
  } );
  $( '#ajaxToggle' ).click( toggleAjaxReload );
  $( '#ajaxToggle' ).attr( 'checked', ajaxRLCookie);
  if ( getCookie( "ajaxload-" + wgPageName ) == "on" ) {
    loadPageData();
  }
}

/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
  if ( $( '#ajaxToggle' ).prop( 'checked' ) === true ) {
    setCookie( "ajaxload-" + wgPageName, "on", 30 );
    doRefresh = true;
    loadPageData();
  } else {
    setCookie( "ajaxload-" + wgPageName, "off", 30 );
    doRefresh = false;
    clearTimeout( ajaxTimer );
  }
}

/**
 * Does the actual refresh
 */
function loadPageData() {
  var cC = '#mw-content-text';
  $( cC ).load( location.href + " " + cC + " > *", function ( data ) {
    if ( doRefresh ) {
      ajaxTimer = setTimeout( loadPageData, ajaxRefresh );
    }
  } );
}

/**
 * Load the script on specific pages
 */
$( function () {
  for ( var x = 0; x < ajaxPages.length; x++ ) {
    if ( wgPageName == ajaxPages[x] && $( '#ajaxToggle' ).length === 0 ) {
      preloadAJAXRL();
    }
  }
} );

/* Main page */
/** Poll text **/
$(document).ready(function() {
	$(".ajax-poll .total").parent().addClass("pollText");
});