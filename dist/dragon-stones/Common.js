importStylesheetPage('User:Jgjake2/css/ElderScrolls/popup.css', 'deadisland'); //Import the style sheet for this script - jgjake2
/* 

This file contains the default configuration options for balloon tooltips.
Default options can be edited in this file or changed after the Balloon object is 
initiliazed as follows:

  var balloon = new Balloon;
  balloon.fontColor   = 'black';
  balloon.fontFamily  = 'Arial, sans-serif';
  balloon.fontSize    = '12pt';
  etc...

*/

// This function adds the default configuration and also custom 
// configuration sets, specified in 'case' stanzas
BalloonConfig = function(balloon, set) {
  set = set || '';

  
  //https://images.wikia.nocookie.net/elderscrolls/images/e/e2/ElderScrolls_balloon.png
  //https://images.wikia.nocookie.net/elderscrolls/images/a/a4/ElderScrolls_balloon_ie.png
  //https://images.wikia.nocookie.net/elderscrolls/images/7/77/ElderScrolls_close.png
  //https://images.wikia.nocookie.net/elderscrolls/images/5/59/ElderScrolls_down_left.png
  //https://images.wikia.nocookie.net/elderscrolls/images/5/5f/ElderScrolls_down_right.png
  //https://images.wikia.nocookie.net/elderscrolls/images/c/c8/ElderScrolls_up_left.png
  //https://images.wikia.nocookie.net/elderscrolls/images/2/2b/ElderScrolls_up_right.png
  
  ////////////////////////////////////////////////////////////////////////////////////////
  // The default "base" config applied to all balloon objects.                          //
  // See http://gmod.org/wiki/Popup_Balloons#Customization for                          //
  // details about config options                                                       //
  //                                                                                    //
  // values can be overriden in custom config cases (see below)                         //
  ////////////////////////////////////////////////////////////////////////////////////////
  if (!balloon.configured || set == 'ElderScrollsBubble') {                             //
    balloon.fontColor          = 'white';                                               //
    balloon.fontFamily         = 'Arial, sans-serif';                                   //
    balloon.fontSize           = '10pt';                                                //
    balloon.minWidth           = 150;                                                   //
    balloon.maxWidth           = 700;                                                   //
    balloon.delayTime          = 300;                                                   //
    balloon.vOffset            = 10;                                                    //
    balloon.hOffset            = 10;                                                    //
    balloon.stem               = true;                                                  //
    balloon.images             = 'https://images.wikia.nocookie.net/elderscrolls/images';//
    balloon.ieImage            = 'a/a4/ElderScrolls_balloon_ie.png';                    //
    balloon.balloonImage       = 'e/e2/ElderScrolls_balloon.png';                       //
    balloon.upLeftStem         = 'c/c8/ElderScrolls_up_left.png';                       //
    balloon.downLeftStem       = '5/59/ElderScrolls_down_left.png';                     //
    balloon.upRightStem        = '2/2b/ElderScrolls_up_right.png';                      //
    balloon.downRightStem      = '5/5f/ElderScrolls_down_right.png';                    //
    balloon.closeButton        = '7/77/ElderScrolls_close.png';                         //
    balloon.closeButtonWidth   = 16;                                                    //
    balloon.allowAJAX          = true;                                                  //
    balloon.allowIframes       = true;                                                  //
    balloon.trackCursor        = true;                                                  //
	balloon.allowScripts       = true;                                                  //
    balloon.shadow             = 20;                                                    //
    balloon.padding            = 10;                                                    //
    balloon.stemHeight         = 32;                                                    //
    balloon.stemOverlap        = 3;                                                     //
    balloon.vOffset            = 1;                                                     //
    balloon.hOffset            = 1;                                                     //
    balloon.opacity            = 0.95;                                                  //
    balloon.configured         = set || true;                                           //
  }                                                                                     //
  ////////////////////////////////////////////////////////////////////////////////////////
  
  
  ////////////////////////////////////////////////////////////////////////////////////////
  // Custom configuration options -- Add a case below for your config set (default sets://
  // GBox, GPlain, and GFade)                                                           //
  ////////////////////////////////////////////////////////////////////////////////////////
  switch(set) {
    case('GBubble') :
    balloon.fontColor          = 'black';
    balloon.fontFamily         = 'Arial, sans-serif';
    balloon.fontSize           = '12pt';
    balloon.minWidth           = 100;
    balloon.maxWidth           = 750;
    balloon.delayTime          = 350;
    balloon.vOffset            = 10;
    balloon.hOffset            = 10;
    balloon.stem               = true;
    balloon.images             = 'https://images.wikia.nocookie.net/deadisland/images';
    balloon.ieImage            = '3/39/GBubble_balloon_ie.png';
    balloon.balloonImage       = '7/76/GBubble_balloon.png';
    balloon.upLeftStem         = '4/43/Up_left.png';
    balloon.downLeftStem       = 'b/bc/GBubble_down_left.png';
    balloon.upRightStem        = 'b/b3/Up_right.png';
    balloon.downRightStem      = 'c/cf/GBubble_down_right.png';
    balloon.closeButton        = '3/36/GBubble_close.png';
    balloon.closeButtonWidth   = 16;
    balloon.allowAJAX          = true;
    balloon.allowIframes       = true;
    balloon.trackCursor        = true;
    balloon.shadow             = 20;
    balloon.padding            = 10;
    balloon.stemHeight         = 32;
    balloon.stemOverlap        = 3;
    balloon.vOffset            = 1;
    balloon.hOffset            = 1;    
    balloon.opacity            = 0.95;
	break;
	
    // A formatted box (no background image)
    case('GBox') : 
      balloon.fontColor   = 'black';
      balloon.bgColor     = 'whitesmoke';
      balloon.borderStyle = '2px solid gray'; 
      balloon.padding     = 5;
      balloon.shadow      = 0;
      balloon.stem        = false;
      balloon.opacity     = 0.8;
      balloon.hOffset     = 1;
      balloon.vOffset     = 1;
      balloon.allowFade   = false;
      break;

    // A simpler balloon
    case('GPlain') :
	  balloon.fontColor     = 'black';
      balloon.padding       = 5;
      balloon.images        = 'https://images.wikia.nocookie.net/deadisland/images';
      balloon.balloonImage  = '2/23/GPlain_balloon.png';
      balloon.upLeftStem    = '1/10/GPlain_up_left.png';
      balloon.downLeftStem  = 'b/bf/GPlain_down_left.png';
      balloon.upRightStem   = '2/26/GPlain_up_right.png';
      balloon.downRightStem = '8/86/GPlain_down_right.png';
      balloon.closeButton   = '6/69/GPlain_close.png';
      balloon.ieImage       = null;
      balloon.shadow        = 0;  
      balloon.stemHeight    = 15;
      balloon.stemOverlap   = 1;
      balloon.opacity       = 0.85;
      break;

    // The default cartoon bubble with a fade-in effect
    case('GFade') :
      balloon.allowFade   = true;
      balloon.fadeIn      = 1000;
      balloon.faedOut     = 200;
      break;
  }
}



/*
 balloon.js -- a DHTML library for balloon tooltips

 $Id: balloon.js 22300 2009-12-01 09:40:39Z sheldon_mckay $

 See http://www.gmod.org/wiki/index.php/Popup_Balloons
 for documentation.

 Copyright (c) 2007-2009 Sheldon McKay, Cold Spring Harbor Laboratory

 This balloon tooltip package and associated files not otherwise copyrighted are 
 distributed under the MIT-style license:
 
 http://opensource.org/licenses/mit-license.php

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

*/

// These global variables are necessary to avoid losing scope when
// setting the balloon timeout and for inter-object communication
var currentBalloonClass;
var balloonIsVisible;
var balloonIsSticky;
var balloonInvisibleSelects;
var balloonIsSuppressed;
var tooltipIsSuppressed;


//////////////////////////////////////////////////////////////////////////
// This is constructor that is called to initialize the Balloon object  //
//////////////////////////////////////////////////////////////////////////
var Balloon = function () {
  // Cursor tracking enabled by default
  this.trackCursor = true;
  
  // Track the cursor every time the mouse moves
  document.onmousemove = this.setActiveCoordinates;

//DISABLED
  // scrolling aborts visible balloons
  //var myObject = this.isIE() ? window : document;
  //myObject.onscroll  = function(){Balloon.prototype.nukeTooltip()};

  // make balloons go away if the page is unloading or waiting
  // to unload.
  window.onbeforeunload = function(){
    Balloon.prototype.nukeTooltip();
    balloonIsSuppressed = true;
  };

  // for IE, the balloons can't start until the page is finished loading
  // set a flag that will get toggled when loading is finished
  if (this.isIE()) {
    this.suppress = true;
  }

  return this;
}

//////////////////////////////////////////////////////////////////////////
// This is the method that is called on mouseover.  It has a built-in   //
// delay time to avoid balloons popping up on rapid mouseover events    //
//////////////////////////////////////////////////////////////////////////
Balloon.prototype.showTooltip = function(evt,caption,sticky,width,height) {
  // If the objext is not configured by now, fall back to default
  if (!this.configured) {
    BalloonConfig(this,'GBubble');
  }

  // Cursor tracking halts after one of these vertical
  // or horizontal thresholds are reached
  this.stopTrackingX = this.trackCursor ? 100 : 10;
  this.stopTrackingY = this.trackCursor ? 50  : 10;

  // Awful IE bug, page load aborts if the balloon is fired
  // before the page is fully loaded.
  if (this.isIE() && document.readyState.match(/complete/i)) {
    this.suppress = false;
  }

  // All balloons have been suppressed, go no further
  if (this.suppress || balloonIsSuppressed) {
    return false;
  }

  // Non-sticky balloons suppressed
  if (tooltipIsSuppressed && !sticky) {
    return false;
  }

  // We use 1-100 scale for opacity internally
  if (this.opacity && this.opacity < 1) {
    this.opacity = parseInt(parseFloat(this.opacity) * 100);
  }
  else if (this.opacity && this.opacity == 1) {
    this.opacity = 100;
  }
  else if (!this.opacity) {
    this.opacity == 100;
  }

  // Sorry Konqueror, no fade-in or translucency for you!
  if (this.isKonqueror()) {
    this.allowFade = false;
    this.opacity   = 100;
  }

  // With IE, fading and translucency are not very compatible
  // use opaque balloons if fadein is enabled
  if (this.isIE() && this.allowFade) {
    this.opacity = 100;
  }

  // Check for mouseover (vs. mousedown or click)
  var mouseOver = evt.type.match('mouseover','i');  

  // if the firing event is a click, fade-in and a non-sticky balloon make no sense
  if (!mouseOver) {
    sticky = true;
    this.fadeOK = false;
    // case where hover and click events both trigger balloons
    if (balloonIsVisible) {
      this.hideTooltip();
    }
  }
  else {
    this.fadeOK = this.allowFade;
  }

  // Don't fire on mouseover if a non-sticky balloon is visible
  if (balloonIsVisible && !balloonIsSticky && mouseOver) {
    return false;
  }

  // Don't start a non-sticky balloon if a sticky one is visible
  if (balloonIsVisible && balloonIsSticky && !sticky) {
    return false;
  }

  // Ignore repeated firing of mouseover->mouseout events on 
  // the same element (Safari)
  var el = this.getEventTarget(evt);
  if (sticky && mouseOver && this.isSameElement(el,this.currentElement)) {
    return false;
  }  
  this.currentElement = el;
  
  // remember the coordinates of the element
  this.elCoords = this.getLoc(el,'region');

  // attach a mouseout event handler to the target element
  if (!sticky) {
    var mouseoutFunc = el.onmouseout;
    var closeBalloon = function() { 
      Balloon.prototype.hideTooltip();
      // fall through to any onmouseout event specified elsewhere
      if (mouseoutFunc) {
        mouseoutFunc();
      }
    }
    if (!mouseOver) {
      el.onmouseup  = function() {return false};
    }
    el.onmouseout = closeBalloon;
  }  
  
  balloonIsSticky = sticky;

  this.hideTooltip();

  // request the contents synchronously (ie wait for result)
  this.currentHelpText = this.getAndCheckContents(caption);

  // no contents? abort.
  if (!this.currentHelpText) {
    return false;
  }

  this.width  = width;
  this.height = height;
  this.actualWidth = null;

  // make sure old balloons are removed
  this.hideTooltip();

  // Put the balloon contents and images into a visible (but offscreen)
  // element so they will be preloaded and have a layout to 
  // calculate the balloon dimensions
  this.container = document.createElement('div');
  this.container.id = 'balloonPreloadContainer';
  document.body.appendChild(this.container);
  this.setStyle(this.container,'position','absolute');
  this.setStyle(this.container,'top',-8888);
  this.setStyle(this.container,'font-family',this.fontFamily);
  this.setStyle(this.container,'font-size',this.fontSize);

  // protect escaped '&'
  this.currentHelpText = this.currentHelpText.replace(/\&amp;/g, '&amp;amp');
  this.container.innerHTML = unescape(this.currentHelpText);
  
  // make sure balloon image path is complete
  if (this.images) {

    // main background image
    this.balloonImage  = this.balloonImage  ? this.images +'/'+ this.balloonImage  : false;
    this.ieImage       = this.ieImage       ? this.images +'/'+ this.ieImage       : false;

    // optional stems
    this.upLeftStem    = this.upLeftStem    ? this.images +'/'+ this.upLeftStem    : false;
    this.upRightStem   = this.upRightStem   ? this.images +'/'+ this.upRightStem   : false;
    this.downLeftStem  = this.downLeftStem  ? this.images +'/'+ this.downLeftStem  : false;
    this.downRightStem = this.downRightStem ? this.images +'/'+ this.downRightStem : false;

    this.closeButton   = this.closeButton   ? this.images +'/'+ this.closeButton   : false;

    this.images        = false;
  }

  // The PNG alpha channels (shadow transparency) are not 
  // handled properly by IE < 6.  Also, if opacity is set to
  // < 1 (translucent balloons), any version of IE does not
  // handle the image properly.
  // Google chrome is a bit dodgey too
  // If there is an IE image provided, use that instead.
  if (this.ieImage && (this.isIE() || this.isChrome())) {
    if (this.isOldIE() || this.opacity || this.allowFade) {    
      this.balloonImage = this.ieImage;
    }
  }

  // preload balloon images 
  if (!this.preloadedImages) {
    var images = new Array(this.balloonImage, this.closeButton);
    if (this.ieImage) {
      images.push(this.ieImage);
    }
    if (this.stem) {
      images.push(this.upLeftStem,this.upRightStem,this.downLeftStem,this.downRightStem);
    }
    var len = images.length;
    for (var i=0;i<len;i++) {
      if ( images[i] ) {
        this.preload(images[i]);
      }
    }
    this.preloadedImages = true;
  }

  currentBalloonClass = this;

  // Capture coordinates for mousedown or click
  if (!mouseOver) {
    this.setActiveCoordinates(evt);
  }

  // Remember which event started this
  this.currentEvent = evt;

  // prevent interaction with gbrowse drag and drop
  evt.cancelBubble  = true;

  // Make delay time short for onmousedown
  var delay = mouseOver ? this.delayTime : 1;
  this.timeoutTooltip = window.setTimeout(this.doShowTooltip,delay);
  this.pending = true;
}

// Preload the balloon background images
Balloon.prototype.preload = function(src) {
  var i = new Image;
  i.src = src;

  // append to the DOM tree so the images have a layout,
  // then remove.
  this.setStyle(i,'position','absolute');
  this.setStyle(i,'top',-8000);
  document.body.appendChild(i);
  document.body.removeChild(i);
}


/////////////////////////////////////////////////////////////////////
// Tooltip rendering function
/////////////////////////////////////////////////////////////////////
Balloon.prototype.doShowTooltip = function() {
  var self = currentBalloonClass;

  // Stop firing if a balloon is already being displayed
  if (balloonIsVisible) {
    return false;  
  }
 
  if (!self.parent) {
    if (self.parentID) {
      self.parent = document.getElementById(self.parentID);
    }
    else {
      self.parent = document.body;
    }
    self.xOffset = self.getLoc(self.parent, 'x1');
    self.yOffset = self.getLoc(self.parent, 'y1');
  }

  // a short delay time might cause some intereference
  // with fading
  window.clearTimeout(self.timeoutFade);
  if (!balloonIsSticky) {
    self.setStyle('visibleBalloonElement','display','none');
  }

  // make sure user-configured numbers are not strings
  self.parseIntAll();

  // create the balloon object
  var balloon = self.makeBalloon();

  // window dimensions
  var pageWidth   = YAHOO2.util.Dom.getViewportWidth();
  var pageCen     = Math.round(pageWidth/2);
  var pageHeight  = YAHOO2.util.Dom.getViewportHeight();
  var pageLeft    = YAHOO2.util.Dom.getDocumentScrollLeft();
  var pageTop     = YAHOO2.util.Dom.getDocumentScrollTop();
  var pageMid     = pageTop + Math.round(pageHeight/2);
  self.pageBottom = pageTop + pageHeight;
  self.pageTop    = pageTop;
  self.pageLeft   = pageLeft;
  self.pageRight  = pageLeft + pageWidth;

  // balloon orientation
  var vOrient = self.activeTop > pageMid ? 'up' : 'down';
  var hOrient = self.activeRight > pageCen ? 'left' : 'right';
  
  // get the preloaded balloon contents
  var helpText = self.container.innerHTML;
  self.actualWidth = self.getLoc(self.container,'width');
  if (!isNaN(self.actualWidth)) {
    self.actualWidth += 10;
  }
  self.parent.removeChild(self.container);
  var wrapper = document.createElement('div');
  wrapper.id = 'contentWrapper';
  
  
  if(self.tBalloonType == 'ajax'){
    wrapper.setAttribute('class','WikiaArticle');
    wrapper.setAttribute('style','width:100%; border:0px; padding:0px; margin:0px;');
	var tableBegin = '<table class="wikitable" style="width:100%; border:0px; padding:0px; margin:0px;">';
	tableBegin = tableBegin + '<tr><th style="text-align:center; background-color:#790700;"><a href="/wiki/' + self.tBalloonLink + '"><span style="color:#D5D4D4; font-weight:700; font-size:12pt;">Click Here To View The Full Article</span></a></th></tr>';
    tableBegin = tableBegin + '<tr><td>';
    var tableEnd = '</td></tr></table>';
	self.contents.appendChild(wrapper);
	wrapper.innerHTML = tableBegin + helpText + tableEnd;
  } else {
	self.contents.appendChild(wrapper);
	wrapper.innerHTML = helpText;
  }


  // how and where to draw the balloon
  self.setBalloonStyle(vOrient,hOrient,pageWidth,pageLeft);

  // close control for balloon or box
  if (balloonIsSticky) {
    self.addCloseButton();
  }

  balloonIsVisible = true;
  self.pending = false;  

  // in IE < 7, hide <select> elements
  self.showHide();

  self.startX = self.activeLeft;
  self.startY = self.activeTop;

  self.fade(0,self.opacity,self.fadeIn);
}

Balloon.prototype.addCloseButton = function () {
  var self         = currentBalloonClass;
  var margin       = Math.round(self.padding/2);
  var closeWidth   = self.closeButtonWidth || 16;
  var balloonTop   = self.getLoc('visibleBalloonElement','y1') + margin + self.shadow;
  var BalloonLeft  = self.getLoc('topRight','x2') - self.closeButtonWidth - self.shadow - margin;
  var closeButton  = document.getElementById('closeButton');

  if (!closeButton) {
    closeButton = new Image;
    closeButton.setAttribute('id','closeButton');
    closeButton.setAttribute('src',self.closeButton);
    closeButton.onclick = function() {
      Balloon.prototype.nukeTooltip();
    };
    self.setStyle(closeButton,'position','absolute');
    document.body.appendChild(closeButton);
  }

  // I have no idea why
  if (self.isIE()) {
    BalloonLeft = BalloonLeft - 5;
  }

  self.setStyle(closeButton,'top',balloonTop);
  self.setStyle(closeButton,'left',BalloonLeft);
  self.setStyle(closeButton,'display','inline');
  self.setStyle(closeButton,'cursor','pointer');
  self.setStyle(closeButton,'z-index',999999999);
}

// use a fresh object every time to make sure style 
// is not polluted
Balloon.prototype.makeBalloon = function() {
  var self = currentBalloonClass;

  var balloon = document.getElementById('visibleBalloonElement');
  if (balloon) {
    self.hideTooltip();
  }

  balloon = document.createElement('div');
  balloon.setAttribute('id','visibleBalloonElement');
  self.parent.appendChild(balloon);
  self.activeBalloon = balloon;

  self.parts = new Array();
  var parts = new Array('contents','topRight','bottomRight','bottomLeft');
  for (var i=0;i<parts.length;i++) {
    var child = document.createElement('div');
    child.setAttribute('id',parts[i]);
    balloon.appendChild(child);
    if (parts[i] == 'contents') self.contents = child;
    self.parts.push(child);
  }
  //self.parts.push(balloon);

  if (self.displayTime)  {
    self.timeoutAutoClose = window.setTimeout(this.hideTooltip,self.displayTime);
  }
  return balloon;
}

Balloon.prototype.setBalloonStyle = function(vOrient,hOrient,pageWidth,pageLeft) {
  var self = currentBalloonClass;
  var balloon = self.activeBalloon;

  if (typeof(self.shadow) != 'number') self.shadow = 0;
  if (!self.stem) self.stemHeight = 0;

  var fullPadding   = self.padding + self.shadow;
  var insidePadding = self.padding;
  var outerWidth    = self.actualWidth + fullPadding;
  var innerWidth    = self.actualWidth;  

  self.setStyle(balloon,'position','absolute');
  self.setStyle(balloon,'top',-9999);
  self.setStyle(balloon,'z-index',1000000);

  if (self.height) {
    self.setStyle('contentWrapper','height',self.height-fullPadding);
  }

  if (self.width) {
    self.setStyle(balloon,'width',self.width);  
    innerWidth = self.width - fullPadding;
    if (balloonIsSticky) {
      innerWidth -= self.closeButtonWidth;
    }
    self.setStyle('contentWrapper','width',innerWidth);
  }
  else {
    self.setStyle(balloon,'width',outerWidth);
    self.setStyle('contentWrapper','width',innerWidth);
  }

  // not too big...
  if (!self.width && self.maxWidth && outerWidth > self.maxWidth) {
    self.setStyle(balloon,'width',self.maxWidth);
    self.setStyle('contentWrapper','width',self.maxWidth-fullPadding);
  }
  // not too small...
  if (!self.width && self.minWidth && outerWidth < self.minWidth) {
    self.setStyle(balloon,'width',self.minWidth);
    self.setStyle('contentWrapper','width',self.minWidth-fullPadding);
  }

  self.setStyle('contents','z-index',2);
  self.setStyle('contents','color',self.fontColor);
  self.setStyle('contents','font-family',self.fontFamily);
  self.setStyle('contents','font-size',self.fontSize);
  self.setStyle('contents','background','url('+self.balloonImage+') top left no-repeat');
  self.setStyle('contents','padding-top',fullPadding);
  self.setStyle('contents','padding-left',fullPadding);

  self.setStyle('bottomRight','background','url('+self.balloonImage+') bottom right no-repeat');
  self.setStyle('bottomRight','position','absolute');
  self.setStyle('bottomRight','right',0-fullPadding);
  self.setStyle('bottomRight','bottom',0-fullPadding);
  self.setStyle('bottomRight','height',fullPadding);
  self.setStyle('bottomRight','width',fullPadding);
  self.setStyle('bottomRight','z-index',-1);

  self.setStyle('topRight','background','url('+self.balloonImage+') top right no-repeat');
  self.setStyle('topRight','position','absolute');
  self.setStyle('topRight','right',0-fullPadding);
  self.setStyle('topRight','top',0);
  self.setStyle('topRight','width',fullPadding);

  self.setStyle('bottomLeft','background','url('+self.balloonImage+') bottom left no-repeat');
  self.setStyle('bottomLeft','position','absolute');
  self.setStyle('bottomLeft','left',0);
  self.setStyle('bottomLeft','bottom',0-fullPadding);
  self.setStyle('bottomLeft','height',fullPadding);
  self.setStyle('bottomLeft','z-index',-1);

  if (this.stem) {
    var stem = document.createElement('img');
    self.setStyle(stem,'position','absolute');
    balloon.appendChild(stem);
 
    if (vOrient == 'up' && hOrient == 'left') {  
      stem.src = self.upLeftStem;
      var height = self.stemHeight + insidePadding - self.stemOverlap;
      self.setStyle(stem,'bottom',0-height);
      self.setStyle(stem,'right',0);             
    }
    else if (vOrient == 'down' && hOrient == 'left') {
      stem.src = self.downLeftStem;
      var height = self.stemHeight - (self.shadow + self.stemOverlap);
      self.setStyle(stem,'top',0-height);
      self.setStyle(stem,'right',0);
    }
    else if (vOrient == 'up' && hOrient == 'right') {
      stem.src = self.upRightStem;
      var height = self.stemHeight + insidePadding - self.stemOverlap;
      self.setStyle(stem,'bottom',0-height);
      self.setStyle(stem,'left',self.shadow);
    }
    else if (vOrient == 'down' && hOrient == 'right') {
      stem.src = self.downRightStem;
      var height = self.stemHeight - (self.shadow + self.stemOverlap);
      self.setStyle(stem,'top',0-height);
      self.setStyle(stem,'left',self.shadow);
    }
    if (self.fadeOK && self.isIE()) {
      self.parts.push(stem);
    }
  }

  if (self.allowFade) {
    self.setOpacity(1);
  }
  else if (self.opacity) {
    self.setOpacity(self.opacity);
  }

  // flip left or right, as required
  if (hOrient == 'left') {
    var pageWidth = self.pageRight - self.pageLeft;
    var activeRight = pageWidth - self.activeLeft;
    self.setStyle(balloon,'right',activeRight);
  }
  else {
    var activeLeft = self.activeRight - self.xOffset;
    self.setStyle(balloon,'left',activeLeft);
  }

  // oversized contents? Scrollbars for sticky balloons, clipped for non-sticky
  var overflow = balloonIsSticky ? 'auto' : 'hidden';
  self.setStyle('contentWrapper','overflow',overflow);

  // a bit of room for the closebutton
  if (balloonIsSticky) {
    self.setStyle('contentWrapper','margin-right',self.closeButtonWidth);
  }

  // Make sure the balloon is not offscreen horizontally.
  // We handle vertical sanity checking later, after the final
  // layout is set.
  var balloonLeft   = self.getLoc(balloon,'x1');
  var balloonRight  = self.getLoc(balloon,'x2');
  var scrollBar     = 20;

  if (hOrient == 'right' && balloonRight > (self.pageRight - fullPadding)) {
    var width = (self.pageRight - balloonLeft) - fullPadding - scrollBar;
    self.setStyle(balloon,'width',width);
    self.setStyle('contentWrapper','width',width-fullPadding);
  }
  else if (hOrient == 'left' && balloonLeft < (self.pageLeft + fullPadding)) {
    var width = (balloonRight - self.pageLeft) - fullPadding;
    self.setStyle(balloon,'width',width);
    self.setStyle('contentWrapper','width',width-fullPadding);
  }

  // Get the width/height for the right and bottom outlines
  var balloonWidth  = self.getLoc(balloon,'width');
  var balloonHeight = self.getLoc(balloon,'height');

  // IE7 quirk -- look for unwanted overlap cause by an off by 1px error
  var vOverlap = self.isOverlap('topRight','bottomRight');
  var hOverlap = self.isOverlap('bottomLeft','bottomRight');
  if (vOverlap) {
    self.setStyle('topRight','height',balloonHeight-vOverlap[1]);
  }
  if (hOverlap) {
    self.setStyle('bottomLeft','width',balloonWidth-hOverlap[0]);
  }

  // vertical position of the balloon
  if (vOrient == 'up') {
    var activeTop = self.activeTop - balloonHeight;
    self.setStyle(balloon,'top',activeTop);
  }
  else {
    var activeTop = self.activeBottom;
    self.setStyle(balloon,'top',activeTop);
  }

  // Make sure the balloon is vertically contained in the window
  var balloonTop    = self.getLoc(balloon,'y1');
  var balloonBottom = self.height ? balloonTop + self.height : self.getLoc(balloon,'y2');
  var deltaTop      = balloonTop < self.pageTop ? self.pageTop - balloonTop : 0;
  var deltaBottom   = balloonBottom > self.pageBottom ? balloonBottom - self.pageBottom : 0;

  if (vOrient == 'up' && deltaTop) {
    var newHeight = balloonHeight - deltaTop;
    if (newHeight > (self.padding*2)) {
      self.setStyle('contentWrapper','height',newHeight-fullPadding);
      self.setStyle(balloon,'top',self.pageTop+self.padding);
      self.setStyle(balloon,'height',newHeight);
    }
  }
  if (vOrient == 'down' && deltaBottom) {
    var newHeight = balloonHeight - deltaBottom - scrollBar;
    if (newHeight > (self.padding*2) + scrollBar) {
      self.setStyle('contentWrapper','height',newHeight-fullPadding);
      self.setStyle(balloon,'height',newHeight);
    }
  }

  // If we have an iframe, make sure it fits properly
  var iframe = balloon.getElementsByTagName('iframe');
  if (iframe[0]) {
    iframe = iframe[0];
    var w = self.getLoc('contentWrapper','width');
    if (balloonIsSticky && !this.isIE()) {
      w -= self.closeButtonWidth;
    }
    var h = self.getLoc('contentWrapper','height');
    self.setStyle(iframe,'width',w);
    self.setStyle(iframe,'height',h);
    self.setStyle('contentWrapper','overflow','hidden');
  }

  // Make edges match the main balloon body
  self.setStyle('topRight','height', self.getLoc(balloon,'height'));
  self.setStyle('bottomLeft','width', self.getLoc(balloon,'width'));

  self.hOrient = hOrient;
  self.vOrient = vOrient;
}


// Fade method adapted from an example on 
// http://brainerror.net/scripts/javascript/blendtrans/
Balloon.prototype.fade = function(opacStart, opacEnd, millisec) {
  var self = currentBalloonClass || new Balloon;
  if (!millisec || !self.allowFade) {
    return false;
  }

  opacEnd = opacEnd || 100;

  //speed for each frame
  var speed = Math.round(millisec / 100);
  var timer = 0;
  for(o = opacStart; o <= opacEnd; o++) {
    self.timeoutFade = setTimeout('Balloon.prototype.setOpacity('+o+')',(timer*speed));
    timer++;
  }
}

Balloon.prototype.setOpacity = function(opc) {
  var self = currentBalloonClass;
  if (!self || !opc) return false;

  var o = parseFloat(opc/100);

  // opacity handled differently for IE
  var parts = self.isIE() ? self.parts : [self.activeBalloon];

  var len = parts.length;
  for (var i=0;i<len;i++) {
    self.doOpacity(o,opc,parts[i]);
  }
}

Balloon.prototype.doOpacity = function(op,opc,el) {
  var self = currentBalloonClass;
  if (!el) return false;

  // CSS standards-compliant browsers!
  self.setStyle(el,'opacity',op);

  // old IE
  self.setStyle(el,'filter','alpha(opacity='+opc+')');

  // old Mozilla/NN
  self.setStyle(el,'MozOpacity',op);

  // old Safari
  self.setStyle(el,'KhtmlOpacity',op);
}

Balloon.prototype.nukeTooltip = function() {
  this.hideTooltip(1);
}

Balloon.prototype.hideTooltip = function(override) { 
  // some browsers pass the event object == we don't want it
  if (override && typeof override == 'object') override = false;
  if (balloonIsSticky && !override) return false;
  var self = currentBalloonClass;
  Balloon.prototype.showHide(1);
  Balloon.prototype.cleanup();

  if (self) {
    window.clearTimeout(self.timeoutTooltip);
    window.clearTimeout(self.timeoutFade);
    window.clearTimeout(self.timeoutAutoClose);
    if (balloonIsSticky) {
      self.currentElement = null;
    }
    self.startX = 0;
    self.startY = 0;
  }

  balloonIsVisible = false;
  balloonIsSticky  = false;
}

// Garbage collection
Balloon.prototype.cleanup = function() {
  var self = currentBalloonClass;
  var body;
  if (self) {
    body = self.parent   ? self.parent 
         : self.parentID ? document.getElementById(self.parentID) || document.body
         : document.body;
  }
  else {
    body = document.body;
  }

  var bubble = document.getElementById('visibleBalloonElement');
  var close  = document.getElementById('closeButton');
  var cont   = document.getElementById('balloonPreloadContainer');
  if (bubble) { body.removeChild(bubble) } 
  if (close)  { body.removeChild(close)  }
  if (cont)   { body.removeChild(cont)   }
}


// this function is meant to be called externally to clear
// any open balloons
hideAllTooltips = function() {
  var self = currentBalloonClass;
  if (!self) return;
  window.clearTimeout(self.timeoutTooltip);
  if (self.activeBalloon) self.setStyle(self.activeBalloon,'display','none');
  balloonIsVisible    = false;
  balloonIsSticky     = false;
  currentBalloonClass = null;
}


// Track the active mouseover coordinates
Balloon.prototype.setActiveCoordinates = function(evt) {
  var self = currentBalloonClass;
  if (!self) {
    return true;
  }

  var evt = evt || window.event || self.currentEvent;
  if (!evt) {
    return true;
  }
  
  self.currentEvent = {};
  for (var i in evt) {
    self.currentEvent[i] = evt[i];
  }

  // avoid silent NaN errors
  self.hOffset = self.hOffset || 1;
  self.vOffset = self.vOffset || 1;
  self.stemHeight = self.stem && self.stemHeight ? (self.stemHeight|| 0) : 0;

  var scrollTop  = 0;
  var scrollLeft = 0;

  var XY = self.eventXY(evt);
  adjustment   = self.hOffset < 20 ? 10 : 0;
  self.activeTop    = scrollTop  + XY[1] - adjustment - self.vOffset - self.stemHeight;
  self.activeLeft   = scrollLeft + XY[0] - adjustment - self.hOffset;
  self.activeRight  = scrollLeft + XY[0];
  self.activeBottom = scrollTop  + XY[1] + self.vOffset + 2*adjustment;

  // dynamic positioning but only if the balloon is not sticky
  // and cursor tracking is enabled
  if (balloonIsVisible && !balloonIsSticky) {
    var deltaX = Math.abs(self.activeLeft - self.startX);
    var deltaY = Math.abs(self.activeTop - self.startY);

    // Close the balloon if the cursor has left the firing element
    if (  XY[0] < self.elCoords.left || XY[0] > self.elCoords.right
       || XY[1] < self.elCoords.top  || XY[1] > self.elCoords.bottom ) {
      self.hideTooltip();
    }
    
    // In some cases , such as <area> elements in image maps or big elements,
    // we need to kill the balloon if the mouse has strayed too far.
    if (deltaX > self.stopTrackingX || deltaY > self.stopTrackingY) {
      self.hideTooltip();
    }
    else if (self.trackCursor) {
      var b = self.activeBalloon;
      var bwidth  = self.getLoc(b,'width');
      var bheight = self.getLoc(b,'height');
      var btop    = self.getLoc(b,'y1');
      var bleft   = self.getLoc(b,'x1');

      if (self.hOrient == 'right') {
        self.setStyle(b,'left',self.activeRight);
      }
      else if (self.hOrient == 'left') {
        self.setStyle(b,'right',null);
        var newLeft = self.activeLeft - bwidth;
        self.setStyle(b,'left',newLeft);
      }

      if (self.vOrient == 'up') {
        self.setStyle(b,'top',self.activeTop - bheight);
      }
      else if (self.vOrient == 'down') {
        self.setStyle(b,'top',self.activeBottom);
      }
    }
  }

  return true;
}

////
// event XY and getEventTarget Functions based on examples by Peter-Paul
// Koch http://www.quirksmode.org/js/events_properties.html
Balloon.prototype.eventXY = function(event) {
  var XY = new Array(2);
  var e = event || window.event;
  if (!e) {
    return false;
  }
  if (e.pageX || e.pageY) {
    XY[0] = e.pageX;
    XY[1] = e.pageY;
    return XY;
  }
  else if ( e.clientX || e.clientY ) {
    XY[0] = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    XY[1] = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
    return XY;
  }
}

Balloon.prototype.getEventTarget = function(event) {
  var targ;
  var e = event || window.event;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
  if (targ.nodeType == 3) targ = targ.parentNode; // Safari
  return targ;
}
////


Balloon.prototype.setStyle = function(el,att,val) {
  if (!el) { 
    return false;
  }
  if (typeof(el) != 'object') {
    el = document.getElementById(el);
  }
  if (!el) {
    return false;
  }
  
  var v = val;

  if (val && att.match(/left|top|bottom|right|width|height|padding|margin/)) {
    val = new String(val);
    if (!val.match(/auto/)) {
      val += 'px';
    }
  }


  // z-index does not work as expected
  if (att == 'z-index') {
    if (el.style) {
      el.style.zIndex = parseInt(val);
    }
  }
  else {
    // Oh just shut up, IE
    if (this.isIE() && att.match(/^left|right|top|bottom$/)  && !parseInt(val) && val != 0) {
      val = null;
    }

    YAHOO2.util.Dom.setStyle(el,att,val);
  }
}

// Uses YAHOO's region class for element coordinates
Balloon.prototype.getLoc = function(el,request) {
  var region = YAHOO2.util.Dom.getRegion(el);

  switch(request) {
    case ('y1') : return parseInt(region.top);
    case ('y2') : return parseInt(region.bottom);
    case ('x1') : return parseInt(region.left);
    case ('x2') : return parseInt(region.right);
    case ('width')  : return (parseInt(region.right)  - parseInt(region.left));
    case ('height') : return (parseInt(region.bottom) - parseInt(region.top));
    case ('region') : return region; 
  }

  return region;
}

// We don't know if numbers are overridden with strings
// so play it safe
Balloon.prototype.parseIntAll = function() {
  this.padding     = parseInt(this.padding);
  this.shadow      = parseInt(this.shadow);
  this.stemHeight  = parseInt(this.stemHeight);
  this.stemOverlap = parseInt(this.stemOverlap);
  this.vOffset     = parseInt(this.vOffset);
  this.delayTime   = parseInt(this.delayTime);
  this.width       = parseInt(this.width);
  this.maxWidth    = parseInt(this.maxWidth);
  this.minWidth    = parseInt(this.minWidth);
  this.fadeIn      = parseInt(this.fadeIn) || 1000;
}


// show/hide select elements in older IE
// plus user-defined elements
Balloon.prototype.showHide = function(visible) {
  var self = currentBalloonClass || new Balloon;

  // IE z-index bug fix (courtesy of Lincoln Stein)
  if (self.isOldIE()) {
    var balloonContents = document.getElementById('contentWrapper');
    if (!visible && balloonContents) {
      var balloonSelects = balloonContents.getElementsByTagName('select');
      var myHash = new Object();
      for (var i=0; i<balloonSelects.length; i++) {
        var id = balloonSelects[i].id || balloonSelects[i].name;
        myHash[id] = 1;
      }
      balloonInvisibleSelects = new Array();
      var allSelects = document.getElementsByTagName('select');
      for (var i=0; i<allSelects.length; i++) {
        var id = allSelects[i].id || allSelects[i].name;
        if (self.isOverlap(allSelects[i],self.activeBalloon) && !myHash[id]) {
          balloonInvisibleSelects.push(allSelects[i]);
          self.setStyle(allSelects[i],'visibility','hidden');
        }
      }
    }
    else if (balloonInvisibleSelects) {
      for (var i=0; i < balloonInvisibleSelects.length; i++) {
        var id = balloonInvisibleSelects[i].id || balloonInvisibleSelects[i].name;
        self.setStyle(balloonInvisibleSelects[i],'visibility','visible');
     }
     balloonInvisibleSelects = null;
    }
  }

  // show/hide any user-specified elements that overlap the balloon
  if (self.hide) {
    var display = visible ? 'inline' : 'none';
    for (var n=0;n<self.hide.length;n++) {
      if (self.isOverlap(self.activeBalloon,self.hide[n])) {
        self.setStyle(self.hide[n],'display',display);
      }
    }
  }
}

// Try to find overlap
Balloon.prototype.isOverlap = function(el1,el2) {
  if (!el1 || !el2) return false;
  var R1 = this.getLoc(el1,'region');
  var R2 = this.getLoc(el2,'region');
  if (!R1 || !R2) return false;
  var intersect = R1.intersect(R2);
  if (intersect) {
    // extent of overlap;
    intersect = new Array((intersect.right - intersect.left),(intersect.bottom - intersect.top));
  }
  return intersect;
}

// Coordinate-based test for the same element
Balloon.prototype.isSameElement = function(el1,el2) {
  if (!el1 || !el2) return false;
  var R1 = this.getLoc(el1,'region');
  var R2 = this.getLoc(el2,'region');
  var same = R1.contains(R2) && R2.contains(R1);
  return same ? true : false;
}


///////////////////////////////////////////////////////
// Security -- get the balloon contents while checking 
// for disallowed elements.
//////////////////////////////////////////////////////
Balloon.prototype.getAndCheckContents = function(caption) {
  var originalCaption = caption;
  var notAllowed = 'are not allowed in popup balloons in this web site.  \
Please contact the site administrator for assistance.';
  var notSupported = 'AJAX is not supported for popup balloons in this web site.  \
Please contact the site administrator for assistance.';
  
  // no Help Url without AJAX
  if (this.helpUrl && !this.allowAJAX) {
    alert('Sorry, you have specified help URL '+this.helpUrl+' but '+notSupported);
    return null;
  }

  // look for a url in the balloon contents
  if (caption.match(/^url:/)) {
    this.activeUrl = caption.replace(/^url:/,'');
    caption = '';
  }
  // or if the text is a bare hyperlink
  else if (caption.match(/^(https?:|\/|ftp:)\S+$/i)) {
    this.activeUrl = caption;
    caption = '';
  }

  // Make sure AJAX is allowed
  if (this.activeUrl && !this.allowAJAX) {
    alert('Sorry, you asked for '+originalCaption+' but '+notSupported);
    return null;
  }  

  // check if the contents are to be retrieved from an element
  if (caption.match(/^load:/)) {
    var load = caption.split(':');
    if (!document.getElementById(load[1])) alert ('problem locating element '+load[1]);
    caption = document.getElementById(load[1]).innerHTML;
    this.loadedFromElement = true;
  }

  // check if iframes are allowed
  if (caption.match(/\<\s*iframe/i) && !this.allowIframes) {
    alert('Sorry: iframe elements '+notAllowed);
    return null;
  }

  // check if event handlers are allowed
  if (caption.match(/\bon(load|mouse|click|unload|before)[^=]*=/i) && !this.allowEventHandlers) {
    alert('Sorry: JavaScript event handlers '+notAllowed);
    return null;
  }

  // check for script elements
  if (caption.match(/\<\s*script/i) && !this.allowScripts) {
    alert('Sorry: <script> elements '+notAllowed);
    return null;
  }

  // request the contents
  //var $tmpOverlayIcon = $('.overlayIcon');
  //var $tmpOverlayIcon_children = $tmpOverlayIcon.children();
  //var $tmpOverlayIcon_children_children = $tmpOverlayIcon_children.children();
  //$tmpOverlayIcon.css('cursor','progress');
  //$tmpOverlayIcon_children.css('cursor','progress');
  //$tmpOverlayIcon_children_children.css('cursor','progress');
  this.currentHelpText = this.getContents(caption);
  this.loadedFromElement = false;
  //$tmpOverlayIcon.css('cursor','pointer');
  //$tmpOverlayIcon_children.css('cursor','pointer');
  //$tmpOverlayIcon_children_children.css('cursor','pointer');
  
  return this.currentHelpText;;
}


///////////////////////////////////////////////////////
// AJAX widget to fill the balloons
// requires prototype.js
///////////////////////////////////////////////////////
Balloon.prototype.getContents = function(section) {

  // just pass it back if no AJAX handler is required.
  if (!this.helpUrl && !this.activeUrl) return section;

  // or if the contents are already loaded from another element
  if (this.loadedFromElement) return section;

  // inline URL takes precedence
  var url = this.activeUrl || this.helpUrl;
  url    += this.activeUrl ? '' : '?section='+section;

  // activeUrl is meant to be single-use only
  this.activeUrl = null;

  var ajax;
  if (window.XMLHttpRequest) {
    ajax = new XMLHttpRequest();
  } else {
    ajax = new ActiveXObject("Microsoft.XMLHTTP");
  }

  if (ajax) {
    ajax.open("GET", url, false);
    ajax.onreadystatechange=function() {
      //alert(ajax.readyState);
    };
    try {
      ajax.send(null);
    }
    catch (e) {
    // alert(e);
    }
    var txt = this.escapeHTML ? escape(ajax.responseText) : ajax.responseText;
    return  txt || section;
  }
  else {
    return section;
  }
}


// test for internet explorer
Balloon.prototype.isIE = function() {
  return document.all && !window.opera;
}

// test for internet explorer (but not IE7)
Balloon.prototype.isOldIE = function() {
  if (navigator.appVersion.indexOf("MSIE") == -1) return false;
  var temp=navigator.appVersion.split("MSIE");
  return parseFloat(temp[1]) < 7;
}

// test for Konqueror
Balloon.prototype.isKonqueror = function() {
  return navigator.userAgent.toLowerCase().indexOf( 'konqueror' ) != -1;
}

// and Google chrome
Balloon.prototype.isChrome = function() {
  return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
}


/*
 This is a subclass of balloon.js -- uses a simple box rather than a 
 a balloon/bubble image.  It can have a background image and a styled
 bgcolor and border but is otherwise meant to be simple and lightweight.
*/

//////////////////////////////////////////////////////////////////////////
// This is constructor that is called to initialize the Balloon object  //
//////////////////////////////////////////////////////////////////////////
var Box = function () {
  // Track the cursor every time the mouse moves
  document.onmousemove = this.setActiveCoordinates;

  // scrolling aborts unsticky box
  document.onscroll    = Balloon.prototype.hideTooltip;

  // go away if the page is unloading or waiting
  // to unload.
  window.onbeforeunload = function(){
    Balloon.prototype.nukeTooltip;
    balloonIsSuppressed = true;
  };

  // for IE, the box can't start until the page is finished loading
  // set a flag that will get toggled when loading is finished
  if (this.isIE()) {
    this.suppress = true;
  }

  return this;
}

// Inherit from Balloon class
Box.prototype = new Balloon();


// Make the box element -- this overrides the parent method
Box.prototype.makeBalloon = function() {
  var self = currentBalloonClass;
  
  // use ID 'visibleBalloonElement' for consistency with parent class
  var box = document.getElementById('visibleBalloonElement');
  if (box) self.parent.removeChild(box);
  box = document.createElement('div');
  box.setAttribute('id','visibleBalloonElement');
  self.parent.appendChild(box);
  self.activeBalloon = box;

  var contents = document.createElement('div');
  contents.setAttribute('id','contents');
  box.appendChild(contents);
  self.contents = contents;
  self.parts = new Array(box);

  self.setStyle(contents,'z-index',2);
  self.setStyle(contents,'color',self.fontColor);
  self.setStyle(contents,'font-family',self.fontFamily);
  self.setStyle(contents,'font-size',self.fontSize);

  if (balloonIsSticky) {
    self.setStyle(contents,'margin-right',10); 
  }
  else if (self.displayTime)  {
    self.timeoutAutoClose = window.setTimeout(this.hideTooltip,self.displayTime);
  }

  return box;
}

// Set the box style -- overrides the parent method
Box.prototype.setBalloonStyle = function(vOrient,hOrient) {
  var self = currentBalloonClass;
  var box  = self.activeBalloon;

  self.shadow     = 0;
  self.stem       = false;
  self.stemHeight = 0;

  self.setStyle(box,'background',self.bgColor);
  self.setStyle(box,'border',self.borderStyle);
  self.setStyle(box,'position','absolute');
  self.setStyle(box,'padding',self.padding);
  self.setStyle(box,'top',-9999);
  self.setStyle(box,'z-index',1000000);

  // If width and/or height are specified, harden the
  // box at those dimensions, but not if the space needed
  // is less tha the space that would be used.
  if (self.width) {
    var widthUsed = self.getLoc('contents','width') + 20;
    var newWidth = widthUsed > self.width ? self.width : widthUsed;
    self.setStyle('contents','width',newWidth);
  }
  if (self.height) {
    var heightUsed = self.getLoc('contents','height') + 20;
    var newHeight = heightUsed > self.height ? self.height : heightUsed;
    self.setStyle('contents','height',newHeight+(2*self.padding));
  }

  // flip left or right, as required
  if (hOrient == 'left') {
    var pageWidth = self.pageRight - self.pageLeft;
    var activeRight = pageWidth - self.activeLeft;
    self.setStyle(box,'right',activeRight);
  }
  else {
    self.setStyle(box,'left',self.activeRight - self.xOffset);
  }

  if (!self.width) {
    var width = self.getLoc('contents','width');
    if (self.isIE()) width += self.padding;
    if (width > self.maxWidth) width = self.maxWidth + self.padding;
    if (width < self.minWidth) width = self.minWidth;
    self.setStyle(box,'width',width);
  }

  var overflow = balloonIsSticky ? 'auto' : 'hidden';
  self.setStyle('contents','overflow',overflow);

  // Make sure the box is not offscreen horizontally.
  // We handle vertical sanity checking later, after the final
  // layout is set.
  var boxLeft   = self.getLoc(box,'x1');
  var boxRight  = self.getLoc(box,'x2');
  var scrollBar     = 20;

  if (hOrient == 'right' && boxRight > (self.pageRight - self.padding)) {
    self.setStyle('contents','width',(self.pageRight - boxLeft) - self.padding - scrollBar);
  }
  else if (hOrient == 'left' && boxLeft < (self.pageLeft + self.padding)) {
    self.setStyle('contents','width',(boxRight - self.pageLeft) - self.padding);
  }

  // Get the width/height for the right and bottom outlines
  var boxWidth  = self.getLoc(box,'width');
  var boxHeight = self.getLoc(box,'height');

  if (self.allowFade) {
    self.setOpacity(0.01);
  }
  else {
    self.setOpacity(self.opacity);
  }

  if (!(self.activeTop && self.activeBottom)) {
    self.setActiveCoordinates();
  }

  if (vOrient == 'up') {
    var activeTop = self.activeTop - boxHeight;
    self.setStyle(box,'top',activeTop);
  }
  else if (vOrient == 'down')  {
    var activeTop = self.activeBottom;
    self.setStyle(box,'top',activeTop);
  }
  self.setStyle(box,'display','inline');

  // Make sure the box is vertically contained in the window
  var boxTop    = self.getLoc(box,'y1');
  var boxBottom = self.getLoc(box,'y2');
  var deltaTop      = boxTop < self.pageTop ? self.pageTop - boxTop : 0;
  var deltaBottom   = boxBottom > self.pageBottom ? boxBottom - self.pageBottom : 0;

  if (vOrient == 'up' && deltaTop) {
    var newHeight = boxHeight - deltaTop;
    if (newHeight > (self.padding*2)) {
      self.setStyle('contents','height',newHeight);
      self.setStyle(box,'top',self.pageTop+self.padding);
      self.setStyle(box,'height',newHeight);
    }
  }

  if (vOrient == 'down' && deltaBottom) {
    var newHeight = boxHeight - deltaBottom - scrollBar;
    if (newHeight > (self.padding*2) + scrollBar) {
      self.setStyle('contents','height',newHeight);
      self.setStyle(box,'height',newHeight);
    }
  }

  self.hOrient = hOrient;
  self.vOrient = vOrient;
}

Box.prototype.addCloseButton = function () {
  var self = currentBalloonClass;
  var margin   = Math.round(self.padding/2);
  var closeWidth = self.closeButtonWidth || 16;
  var balloonTop   = self.getLoc('visibleBalloonElement','y1') + margin;
  var balloonRight = self.getLoc('visibleBalloonElement','x2') - margin - self.closeButtonWidth;
  var closeButton = document.getElementById('closeButton');

  if (!closeButton) {
    closeButton = new Image;
    closeButton.setAttribute('id','closeButton');
    closeButton.setAttribute('src',self.closeButton);
    closeButton.onclick = function() {
      Balloon.prototype.nukeTooltip();
    };
    self.setStyle(closeButton,'position','absolute');
    document.body.appendChild(closeButton);
  }

  if (self.isIE()) {
    balloonRight -= self.padding;
  }

  self.setStyle(closeButton,'top',balloonTop);
  self.setStyle(closeButton,'left',balloonRight);
  self.setStyle(closeButton,'display','inline');
  self.setStyle(closeButton,'cursor','pointer');
  self.setStyle(closeButton,'z-index',999999999);
}



/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.0
*/
if(typeof YAHOO2=="undefined"){var YAHOO2={}}YAHOO2.namespace=function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=YAHOO2;for(j=(d[0]=="YAHOO2")?1:0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]]}}return o};YAHOO2.log=function(msg,cat,src){var l=YAHOO2.widget.Logger;if(l&&l.log){return l.log(msg,cat,src)}else{return false}};YAHOO2.register=function(name,mainClass,data){var mods=YAHOO2.env.modules;if(!mods[name]){mods[name]={versions:[],builds:[]}}var m=mods[name],v=data.version,b=data.build,ls=YAHOO2.env.listeners;m.name=name;m.version=v;m.build=b;m.versions.push(v);m.builds.push(b);m.mainClass=mainClass;for(var i=0;i<ls.length;i=i+1){ls[i](m)}if(mainClass){mainClass.VERSION=v;mainClass.BUILD=b}else{YAHOO2.log("mainClass is undefined for module "+name,"warn")}};YAHOO2.env=YAHOO2.env||{modules:[],listeners:[]};YAHOO2.env.getVersion=function(name){return YAHOO2.env.modules[name]||null};YAHOO2.env.ua=function(){var o={ie:0,opera:0,gecko:0,webkit:0};var ua=navigator.userAgent,m;if((/KHTML/).test(ua)){o.webkit=1}m=ua.match(/AppleWebKit\/([^\s]*)/);if(m&&m[1]){o.webkit=parseFloat(m[1])}if(!o.webkit){m=ua.match(/Opera[\s\/]([^\s]*)/);if(m&&m[1]){o.opera=parseFloat(m[1])}else{m=ua.match(/MSIE\s([^;]*)/);if(m&&m[1]){o.ie=parseFloat(m[1])}else{m=ua.match(/Gecko\/([^\s]*)/);if(m){o.gecko=1;m=ua.match(/rv:([^\s\)]*)/);if(m&&m[1]){o.gecko=parseFloat(m[1])}}}}}return o}();(function(){YAHOO2.namespace("util","widget","example");if(typeof YAHOO2_config!="undefined"){var l=YAHOO2_config.listener,ls=YAHOO2.env.listeners,unique=true,i;if(l){for(i=0;i<ls.length;i=i+1){if(ls[i]==l){unique=false;break}}if(unique){ls.push(l)}}}})();YAHOO2.lang={isArray:function(o){if(o){var l=YAHOO2.lang;return l.isNumber(o.length)&&l.isFunction(o.splice)&&!l.hasOwnProperty(o.length)}return false},isBoolean:function(o){return typeof o==='boolean'},isFunction:function(o){return typeof o==='function'},isNull:function(o){return o===null},isNumber:function(o){return typeof o==='number'&&isFinite(o)},isObject:function(o){return(o&&(typeof o==='object'||YAHOO2.lang.isFunction(o)))||false},isString:function(o){return typeof o==='string'},isUndefined:function(o){return typeof o==='undefined'},hasOwnProperty:function(o,prop){if(Object.prototype.hasOwnProperty){return o.hasOwnProperty(prop)}return!YAHOO2.lang.isUndefined(o[prop])&&o.constructor.prototype[prop]!==o[prop]},_IEEnumFix:function(r,s){if(YAHOO2.env.ua.ie){var add=["toString","valueOf"];for(i=0;i<add.length;i=i+1){var fname=add[i],f=s[fname];if(YAHOO2.lang.isFunction(f)&&f!=Object.prototype[fname]){r[fname]=f}}}},extend:function(subc,superc,overrides){if(!superc||!subc){throw new Error("YAHOO2.lang.extend failed, please check that "+"all dependencies are included.");}var F=function(){};F.prototype=superc.prototype;subc.prototype=new F();subc.prototype.constructor=subc;subc.superclass=superc.prototype;if(superc.prototype.constructor==Object.prototype.constructor){superc.prototype.constructor=superc}if(overrides){for(var i in overrides){subc.prototype[i]=overrides[i]}YAHOO2.lang._IEEnumFix(subc.prototype,overrides)}},augmentObject:function(r,s){if(!s||!r){throw new Error("Absorb failed, verify dependencies.");}var a=arguments,i,p,override=a[2];if(override&&override!==true){for(i=2;i<a.length;i=i+1){r[a[i]]=s[a[i]]}}else{for(p in s){if(override||!r[p]){r[p]=s[p]}}YAHOO2.lang._IEEnumFix(r,s)}},augmentProto:function(r,s){if(!s||!r){throw new Error("Augment failed, verify dependencies.");}var a=[r.prototype,s.prototype];for(var i=2;i<arguments.length;i=i+1){a.push(arguments[i])}YAHOO2.lang.augmentObject.apply(this,a)},dump:function(o,d){var l=YAHOO2.lang,i,len,s=[],OBJ="{...}",FUN="f(){...}",COMMA=', ',ARROW=' => ';if(!l.isObject(o)||o instanceof Date||("nodeType"in o&&"tagName"in o)){return o}else if(l.isFunction(o)){return FUN}d=(l.isNumber(d))?d:3;if(l.isArray(o)){s.push("[");for(i=0,len=o.length;i<len;i=i+1){if(l.isObject(o[i])){s.push((d>0)?l.dump(o[i],d-1):OBJ)}else{s.push(o[i])}s.push(COMMA)}if(s.length>1){s.pop()}s.push("]")}else{s.push("{");for(i in o){if(l.hasOwnProperty(o,i)){s.push(i+ARROW);if(l.isObject(o[i])){s.push((d>0)?l.dump(o[i],d-1):OBJ)}else{s.push(o[i])}s.push(COMMA)}}if(s.length>1){s.pop()}s.push("}")}return s.join("")},substitute:function(s,o,f){var i,j,k,key,v,meta,l=YAHOO2.lang,saved=[],token,DUMP='dump',SPACE=' ',LBRACE='{',RBRACE='}';for(;;){i=s.lastIndexOf(LBRACE);if(i<0){break}j=s.indexOf(RBRACE,i);if(i+1>=j){break}token=s.substring(i+1,j);key=token;meta=null;k=key.indexOf(SPACE);if(k>-1){meta=key.substring(k+1);key=key.substring(0,k)}v=o[key];if(f){v=f(key,v,meta)}if(l.isObject(v)){if(l.isArray(v)){v=l.dump(v,parseInt(meta,10))}else{meta=meta||"";var dump=meta.indexOf(DUMP);if(dump>-1){meta=meta.substring(4)}if(v.toString===Object.prototype.toString||dump>-1){v=l.dump(v,parseInt(meta,10))}else{v=v.toString()}}}else if(!l.isString(v)&&!l.isNumber(v)){v="~-"+saved.length+"-~";saved[saved.length]=token}s=s.substring(0,i)+v+s.substring(j+1)}for(i=saved.length-1;i>=0;i=i-1){s=s.replace(new RegExp("~-"+i+"-~"),"{"+saved[i]+"}","g")}return s},trim:function(s){try{return s.replace(/^\s+|\s+$/g,"")}catch(e){return s}},merge:function(){var o={},a=arguments,i;for(i=0;i<a.length;i=i+1){YAHOO2.lang.augmentObject(o,a[i],true)}return o},isValue:function(o){var l=YAHOO2.lang;return(l.isObject(o)||l.isString(o)||l.isNumber(o)||l.isBoolean(o))}};YAHOO2.util.Lang=YAHOO2.lang;YAHOO2.lang.augment=YAHOO2.lang.augmentProto;YAHOO2.augment=YAHOO2.lang.augmentProto;YAHOO2.extend=YAHOO2.lang.extend;YAHOO2.register("yahoo",YAHOO2,{version:"2.3.0",build:"442"});(function(){var Y=YAHOO2.util,getStyle,setStyle,id_counter=0,propertyCache={},reClassNameCache={};var isOpera=YAHOO2.env.ua.opera,isSafari=YAHOO2.env.ua.webkit,isGecko=YAHOO2.env.ua.gecko,isIE=YAHOO2.env.ua.ie;var patterns={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var toCamel=function(property){if(!patterns.HYPHEN.test(property)){return property}if(propertyCache[property]){return propertyCache[property]}var converted=property;while(patterns.HYPHEN.exec(converted)){converted=converted.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase())}propertyCache[property]=converted;return converted};var getClassRegEx=function(className){var re=reClassNameCache[className];if(!re){re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)');reClassNameCache[className]=re}return re};if(document.defaultView&&document.defaultView.getComputedStyle){getStyle=function(el,property){var value=null;if(property=='float'){property='cssFloat'}var computed=document.defaultView.getComputedStyle(el,'');if(computed){value=computed[toCamel(property)]}return el.style[property]||value}}else if(document.documentElement.currentStyle&&isIE){getStyle=function(el,property){switch(toCamel(property)){case'opacity':var val=100;try{val=el.filters['DXImageTransform.Microsoft.Alpha'].opacity}catch(e){try{val=el.filters('alpha').opacity}catch(e){}}return val/100;case'float':property='styleFloat';default:var value=el.currentStyle?el.currentStyle[property]:null;return(el.style[property]||value)}}}else{getStyle=function(el,property){return el.style[property]}}if(isIE){setStyle=function(el,property,val){switch(property){case'opacity':if(YAHOO2.lang.isString(el.style.filter)){el.style.filter='alpha(opacity='+val*100+')';if(!el.currentStyle||!el.currentStyle.hasLayout){el.style.zoom=1}}break;case'float':property='styleFloat';default:el.style[property]=val}}}else{setStyle=function(el,property,val){if(property=='float'){property='cssFloat'}el.style[property]=val}}var testElement=function(node,method){return node&&node.nodeType==1&&(!method||method(node))};YAHOO2.util.Dom={get:function(el){if(!el||el.tagName||el.item){return el}if(YAHOO2.lang.isString(el)){return document.getElementById(el)}if(el.splice){var c=[];for(var i=0,len=el.length;i<len;++i){c[c.length]=Y.Dom.get(el[i])}return c}return el},getStyle:function(el,property){property=toCamel(property);var f=function(element){return getStyle(element,property)};return Y.Dom.batch(el,f,Y.Dom,true)},setStyle:function(el,property,val){property=toCamel(property);var f=function(element){setStyle(element,property,val)};Y.Dom.batch(el,f,Y.Dom,true)},getXY:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false}var parentNode=null;var pos=[];var box;var doc=el.ownerDocument;if(el.getBoundingClientRect){box=el.getBoundingClientRect();return[box.left+Y.Dom.getDocumentScrollLeft(el.ownerDocument),box.top+Y.Dom.getDocumentScrollTop(el.ownerDocument)]}else{pos=[el.offsetLeft,el.offsetTop];parentNode=el.offsetParent;var hasAbs=this.getStyle(el,'position')=='absolute';if(parentNode!=el){while(parentNode){pos[0]+=parentNode.offsetLeft;pos[1]+=parentNode.offsetTop;if(isSafari&&!hasAbs&&this.getStyle(parentNode,'position')=='absolute'){hasAbs=true}parentNode=parentNode.offsetParent}}if(isSafari&&hasAbs){pos[0]-=el.ownerDocument.body.offsetLeft;pos[1]-=el.ownerDocument.body.offsetTop}}parentNode=el.parentNode;while(parentNode.tagName&&!patterns.ROOT_TAG.test(parentNode.tagName)){if(Y.Dom.getStyle(parentNode,'display').search(/^inline|table-row.*$/i)){pos[0]-=parentNode.scrollLeft;pos[1]-=parentNode.scrollTop}parentNode=parentNode.parentNode}return pos};return Y.Dom.batch(el,f,Y.Dom,true)},getX:function(el){var f=function(el){return Y.Dom.getXY(el)[0]};return Y.Dom.batch(el,f,Y.Dom,true)},getY:function(el){var f=function(el){return Y.Dom.getXY(el)[1]};return Y.Dom.batch(el,f,Y.Dom,true)},setXY:function(el,pos,noRetry){var f=function(el){var style_pos=this.getStyle(el,'position');if(style_pos=='static'){this.setStyle(el,'position','relative');style_pos='relative'}var pageXY=this.getXY(el);if(pageXY===false){return false}var delta=[parseInt(this.getStyle(el,'left'),10),parseInt(this.getStyle(el,'top'),10)];if(isNaN(delta[0])){delta[0]=(style_pos=='relative')?0:el.offsetLeft}if(isNaN(delta[1])){delta[1]=(style_pos=='relative')?0:el.offsetTop}if(pos[0]!==null){el.style.left=pos[0]-pageXY[0]+delta[0]+'px'}if(pos[1]!==null){el.style.top=pos[1]-pageXY[1]+delta[1]+'px'}if(!noRetry){var newXY=this.getXY(el);if((pos[0]!==null&&newXY[0]!=pos[0])||(pos[1]!==null&&newXY[1]!=pos[1])){this.setXY(el,pos,true)}}};Y.Dom.batch(el,f,Y.Dom,true)},setX:function(el,x){Y.Dom.setXY(el,[x,null])},setY:function(el,y){Y.Dom.setXY(el,[null,y])},getRegion:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false}var region=Y.Region.getRegion(el);return region};return Y.Dom.batch(el,f,Y.Dom,true)},getClientWidth:function(){return Y.Dom.getViewportWidth()},getClientHeight:function(){return Y.Dom.getViewportHeight()},getElementsByClassName:function(className,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[]}var nodes=[],elements=root.getElementsByTagName(tag),re=getClassRegEx(className);for(var i=0,len=elements.length;i<len;++i){if(re.test(elements[i].className)){nodes[nodes.length]=elements[i];if(apply){apply.call(elements[i],elements[i])}}}return nodes},hasClass:function(el,className){var re=getClassRegEx(className);var f=function(el){return re.test(el.className)};return Y.Dom.batch(el,f,Y.Dom,true)},addClass:function(el,className){var f=function(el){if(this.hasClass(el,className)){return false}el.className=YAHOO2.lang.trim([el.className,className].join(' '));return true};return Y.Dom.batch(el,f,Y.Dom,true)},removeClass:function(el,className){var re=getClassRegEx(className);var f=function(el){if(!this.hasClass(el,className)){return false}var c=el.className;el.className=c.replace(re,' ');if(this.hasClass(el,className)){this.removeClass(el,className)}el.className=YAHOO2.lang.trim(el.className);return true};return Y.Dom.batch(el,f,Y.Dom,true)},replaceClass:function(el,oldClassName,newClassName){if(!newClassName||oldClassName===newClassName){return false}var re=getClassRegEx(oldClassName);var f=function(el){if(!this.hasClass(el,oldClassName)){this.addClass(el,newClassName);return true}el.className=el.className.replace(re,' '+newClassName+' ');if(this.hasClass(el,oldClassName)){this.replaceClass(el,oldClassName,newClassName)}el.className=YAHOO2.lang.trim(el.className);return true};return Y.Dom.batch(el,f,Y.Dom,true)},generateId:function(el,prefix){prefix=prefix||'yui-gen';var f=function(el){if(el&&el.id){return el.id}var id=prefix+id_counter++;if(el){el.id=id}return id};return Y.Dom.batch(el,f,Y.Dom,true)||f.apply(Y.Dom,arguments)},isAncestor:function(haystack,needle){haystack=Y.Dom.get(haystack);if(!haystack||!needle){return false}var f=function(node){if(haystack.contains&&node.nodeType&&!isSafari){return haystack.contains(node)}else if(haystack.compareDocumentPosition&&node.nodeType){return!!(haystack.compareDocumentPosition(node)&16)}else if(node.nodeType){return!!this.getAncestorBy(node,function(el){return el==haystack})}return false};return Y.Dom.batch(needle,f,Y.Dom,true)},inDocument:function(el){var f=function(el){if(isSafari){while(el=el.parentNode){if(el==document.documentElement){return true}}return false}return this.isAncestor(document.documentElement,el)};return Y.Dom.batch(el,f,Y.Dom,true)},getElementsBy:function(method,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[]}var nodes=[],elements=root.getElementsByTagName(tag);for(var i=0,len=elements.length;i<len;++i){if(method(elements[i])){nodes[nodes.length]=elements[i];if(apply){apply(elements[i])}}}return nodes},batch:function(el,method,o,override){el=(el&&el.tagName)?el:Y.Dom.get(el);if(!el||!method){return false}var scope=(override)?o:window;if(el.tagName||(!el.item&&!el.slice)){return method.call(scope,el,o)}var collection=[];for(var i=0,len=el.length;i<len;++i){collection[collection.length]=method.call(scope,el[i],o)}return collection},getDocumentHeight:function(){var scrollHeight=(document.compatMode!='CSS1Compat')?document.body.scrollHeight:document.documentElement.scrollHeight;var h=Math.max(scrollHeight,Y.Dom.getViewportHeight());return h},getDocumentWidth:function(){var scrollWidth=(document.compatMode!='CSS1Compat')?document.body.scrollWidth:document.documentElement.scrollWidth;var w=Math.max(scrollWidth,Y.Dom.getViewportWidth());return w},getViewportHeight:function(){var height=self.innerHeight;var mode=document.compatMode;if((mode||isIE)&&!isOpera){height=(mode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight}return height},getViewportWidth:function(){var width=self.innerWidth;var mode=document.compatMode;if(mode||isIE){width=(mode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth}return width},getAncestorBy:function(node,method){while(node=node.parentNode){if(testElement(node,method)){return node}}return null},getAncestorByClassName:function(node,className){node=Y.Dom.get(node);if(!node){return null}var method=function(el){return Y.Dom.hasClass(el,className)};return Y.Dom.getAncestorBy(node,method)},getAncestorByTagName:function(node,tagName){node=Y.Dom.get(node);if(!node){return null}var method=function(el){return el.tagName&&el.tagName.toUpperCase()==tagName.toUpperCase()};return Y.Dom.getAncestorBy(node,method)},getPreviousSiblingBy:function(node,method){while(node){node=node.previousSibling;if(testElement(node,method)){return node}}return null},getPreviousSibling:function(node){node=Y.Dom.get(node);if(!node){return null}return Y.Dom.getPreviousSiblingBy(node)},getNextSiblingBy:function(node,method){while(node){node=node.nextSibling;if(testElement(node,method)){return node}}return null},getNextSibling:function(node){node=Y.Dom.get(node);if(!node){return null}return Y.Dom.getNextSiblingBy(node)},getFirstChildBy:function(node,method){var child=(testElement(node.firstChild,method))?node.firstChild:null;return child||Y.Dom.getNextSiblingBy(node.firstChild,method)},getFirstChild:function(node,method){node=Y.Dom.get(node);if(!node){return null}return Y.Dom.getFirstChildBy(node)},getLastChildBy:function(node,method){if(!node){return null}var child=(testElement(node.lastChild,method))?node.lastChild:null;return child||Y.Dom.getPreviousSiblingBy(node.lastChild,method)},getLastChild:function(node){node=Y.Dom.get(node);return Y.Dom.getLastChildBy(node)},getChildrenBy:function(node,method){var child=Y.Dom.getFirstChildBy(node,method);var children=child?[child]:[];Y.Dom.getNextSiblingBy(child,function(node){if(!method||method(node)){children[children.length]=node}return false});return children},getChildren:function(node){node=Y.Dom.get(node);if(!node){}return Y.Dom.getChildrenBy(node)},getDocumentScrollLeft:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft)},getDocumentScrollTop:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollTop,doc.body.scrollTop)},insertBefore:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null}return referenceNode.parentNode.insertBefore(newNode,referenceNode)},insertAfter:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null}if(referenceNode.nextSibling){return referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling)}else{return referenceNode.parentNode.appendChild(newNode)}}}})();YAHOO2.util.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l};YAHOO2.util.Region.prototype.contains=function(region){return(region.left>=this.left&&region.right<=this.right&&region.top>=this.top&&region.bottom<=this.bottom)};YAHOO2.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left))};YAHOO2.util.Region.prototype.intersect=function(region){var t=Math.max(this.top,region.top);var r=Math.min(this.right,region.right);var b=Math.min(this.bottom,region.bottom);var l=Math.max(this.left,region.left);if(b>=t&&r>=l){return new YAHOO2.util.Region(t,r,b,l)}else{return null}};YAHOO2.util.Region.prototype.union=function(region){var t=Math.min(this.top,region.top);var r=Math.max(this.right,region.right);var b=Math.max(this.bottom,region.bottom);var l=Math.min(this.left,region.left);return new YAHOO2.util.Region(t,r,b,l)};YAHOO2.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}")};YAHOO2.util.Region.getRegion=function(el){var p=YAHOO2.util.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new YAHOO2.util.Region(t,r,b,l)};YAHOO2.util.Point=function(x,y){if(YAHOO2.lang.isArray(x)){y=x[1];x=x[0]}this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y};YAHOO2.util.Point.prototype=new YAHOO2.util.Region();YAHOO2.register("dom",YAHOO2.util.Dom,{version:"2.3.0",build:"442"});







//////////////////////////////////////////////////////////////////
//               Elder Scrolls Wiki Popups
// Popup Code Source: http://gmod.org/wiki/Popup_Balloons
// Wikia Additions: http://deadisland.wikia.com/wiki/User:Jgjake2
//////////////////////////////////////////////////////////////////
	var hasClass = (function () {
		var reCache = {};
			return function (element, className) {
			return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
		};
	})();
	// white balloon with default configuration
	var balloon    = new Balloon;
	BalloonConfig(balloon,'GBubble');
	
	// Elder Scrolls Config
	var elderscrollsBubble    = new Balloon;
	BalloonConfig(elderscrollsBubble,'ElderScrollsBubble');

	// plain balloon tooltip
	var tooltip  = new Balloon;
	BalloonConfig(tooltip,'GPlain');
	
	// fading balloon
	var fader = new Balloon;
	BalloonConfig(fader,'GFade');

	// a plainer popup box
	var box         = new Box;
	BalloonConfig(box,'GBox');

	// a box that fades in/out
	var fadeBox     = new Box;
	BalloonConfig(fadeBox,'GBox');
	fadeBox.bgColor     = 'black';
	fadeBox.fontColor   = 'white';
	fadeBox.borderStyle = 'none';
	fadeBox.delayTime   = 200;
	fadeBox.allowFade   = true;
	fadeBox.fadeIn      = 750;
	fadeBox.fadeOut     = 200;
	
	function reInitBalloons() {
		BalloonConfig(balloon,'GBubble');
		BalloonConfig(elderscrollsBubble,'ElderScrollsBubble');
		BalloonConfig(tooltip,'GPlain');
		BalloonConfig(fader,'GFade');
		BalloonConfig(box,'GBox');
		BalloonConfig(fadeBox,'GBox');
		fadeBox.bgColor     = 'black';
		fadeBox.fontColor   = 'white';
		fadeBox.borderStyle = 'none';
		fadeBox.delayTime   = 200;
		fadeBox.allowFade   = true;
		fadeBox.fadeIn      = 750;
		fadeBox.fadeOut     = 200;
	}
	
	function getElementsByClass2(elementName, tagname, tclass){
		var itemsfound = new Array();
		var elements = elementName.getElementsByTagName(tagname);
		for(var i=0;i<elements.length;i++){
			if(hasClass(elements[i], tclass)){
				itemsfound.push(elements[i]);
			}
		}
		return itemsfound;
	}
	
	function removeByClass(tagname, className){
		var spans = getElementsByClass2(document, tagname, className);
		for (x in spans){
			spans[x].parentNode.removeChild(spans[x]);
		}
	}
	
	function RemoveClassName(objElement, strClass){
		if (objElement.className){
			var arrList = objElement.className.split(' ');
			var strClassUpper = strClass.toUpperCase();
			for(var i = 0; i < arrList.length; i++){
				if (arrList[i].toUpperCase() == strClassUpper){
					arrList.splice(i, 1);
					i--;
				}
			}
			objElement.className = arrList.join(' ');
		}
	}
	
	// Remove Sectons of pages with "removeOnHover" class for ajax popups.
	function removeUnwantedContent(){
		removeByClass('div', 'removeOnHover');
	}
	
	// Must clean any div with "removeOnHover" class if it is on the current page.
	// Otherwise it will be remove when an ajax popup is used.
	function removeOnHoverClass(){
		var divs = getElementsByClass2(document, 'div', 'removeOnHover');
		for (x in divs){
			RemoveClassName(divs[x], 'removeOnHover');
		}
	}
	addOnloadHook(removeOnHoverClass);
	
	function AddClassName(objElement, strClass, blnMayAlreadyExist){
		if ( objElement.className ){
			var arrList = objElement.className.split(' ');
			if ( blnMayAlreadyExist ){
				var strClassUpper = strClass.toUpperCase();
				for ( var i = 0; i < arrList.length; i++ ){
					if ( arrList[i].toUpperCase() == strClassUpper ){
						arrList.splice(i, 1);
						i--;
					}
				}
			}
			arrList[arrList.length] = strClass;
			objElement.className = arrList.join(' ');
		} else {
			objElement.className = strClass;
		}
	}
	
	function regEx(str, pattern, modifiers){
		var patt=new RegExp(pattern,modifiers);
		return patt.exec(str);
	}
    
	function firePopup(event, tBalloon) {
		reInitBalloons();
		
		// Set Up Balloon Type - ['ClassName', BalloonVar]
		var isSticky = hasClass(tBalloon, 'stickyBalloon') ? 1 : 0;
		var balloonType = elderscrollsBubble;
		var balloonTypes = [
			['classicBalloon', balloon],
			['plainBalloon', tooltip],
			['boxBalloon', box],
			['fadeBalloon', fader],
			['fadeBoxBalloon', fadeBox]
		];
		for (x in balloonTypes) if(hasClass(tBalloon, balloonTypes[x][0])) balloonType = balloonTypes[x][1];

		if(hasClass(tBalloon, 'noTransparentBG')){ balloonType.opacity = 1;
			} else { balloonType.opacity = 0.90; }
		if(hasClass(tBalloon, 'noDelay')){ balloonType.delayTime = 1;
			} else { balloonType.delayTime = 350; }
		if(hasClass(tBalloon, 'noStem')){ balloonType.stem = false;
			} else { balloonType.stem = true; }
		
		//var customWidth = regEx(tBalloon.className, 'customBalloonWidth([0-9][0-9][0-9]?)', '');
		//if(customWidth != null) {
			//parseInt(customWidth[1]);
		//}
		
		var customOpacity = regEx(tBalloon.className, 'customBalloonOpacity([0-9][0-9][0-9]?)', '');
		if(customOpacity != null) balloonType.opacity = (parseFloat(customOpacity[1]) > 1) ? (parseFloat(customOpacity[1]) / 100) : (parseFloat(customOpacity[1]));
		
		var customFontColor = regEx(tBalloon.className, 'customBalloonFontColor(.*?) ', '');
		if(customFontColor != null) balloonType.fontColor = customFontColor[1];
		
		var customFontSize = regEx(tBalloon.className, 'customBalloonFontSize(.*?) ', '');
		if(customFontSize != null) balloonType.fontSize = customFontSize[1];
		
		var customBGColor = regEx(tBalloon.className, 'customBalloonBGColor(.*?) ', '');
		if(customBGColor != null) balloonType.bgColor = customBGColor[1];
		
		var customDelay = regEx(tBalloon.className, 'customBalloonDelay([0-9][0-9]?[0-9]?)', '');
		if(customDelay != null) balloonType.delayTime = customDelay[1];
		
		balloonType.tBalloonType = '';
		balloonType.tBalloonLink = '';
		if(hasClass(tBalloon, 'clickAndHover')) {
			var mouseOver = event.type.match('mouseover','i');
			if (!mouseOver) {
				balloonType.showTooltip(event,'load:' + tBalloon.id + 'Popup', isSticky);
			} else {
				balloonType.showTooltip(event,'load:' + tBalloon.id + 'Popup2', isSticky);
			}
		} else if(hasClass(tBalloon, 'ajaxBalloon')){
			balloonType.tBalloonType = 'ajax';
			balloonType.tBalloonLink = tBalloon.id.replace('\.2F','/').replace('\.27','\'').replace('\.28','(').replace('\.29',')');
			balloonType.showTooltip(event,'url:http://elderscrolls.wikia.com/index.php?title=' + tBalloon.id.replace('\.2F','/').replace('\.27','\'').replace('\.28','(').replace('\.29',')') + '&action=render', 1);
		} else {
			balloonType.showTooltip(event,'load:' + tBalloon.id + 'Popup', isSticky);
		}
	}
	
	function makeMyLinefeedReal(imageElement) {
		var titleAttribute;
		titleAttribute = imageElement.title;
		//titleAttribute = titleAttribute.replace(/\[br\]/, String.fromCharCode(10));
		titleAttribute = titleAttribute.replace(/\[br\]/, "\r\n");
		imageElement.title = titleAttribute;
	}
	
	function makeAllPopupBalloons(){
		makePopupBalloons(document);
	}
	
	function makePopupBalloonsById(tId){
		var obj = document.getElementById(tId);
		makePopupBalloons(obj);
	}
	
	function makePopupBalloons(obj){
		var balloons = getElementsByClass2(obj, 'span', 'elderscrollsBalloonPopup');
		for (x in balloons){
			// Remove the title attribute from any links inside the hover area
			var balloonLinks = balloons[x].getElementsByTagName('a');
			for(var i=0;i<balloonLinks.length;i++) balloonLinks[i].setAttribute('title', '');
			// Add class "tt" if it doesn't already have it
			//AddClassName(balloons[x], 'tt', true); //if(!hasClass(balloons[x], 'tt')) AddClassName(balloons[x], 'tt', false);
			// Set popup to fire when clicked if clickBalloon is used. Otherwise it fires when hovered.
			//if(hasClass(balloons[x], 'ajaxBalloon')) balloons[x].id = balloons[x].id.replace('\.2F','/');
			makeMyLinefeedReal(balloons[x]);
			if(hasClass(balloons[x], 'clickAndHover')) {
				balloons[x].onclick = function(event) { firePopup(event, this); };
				balloons[x].onmouseover = function(event) { firePopup(event, this); };
			} else if(hasClass(balloons[x], 'clickBalloon')) balloons[x].onclick = function(event) { firePopup(event, this); };
			else balloons[x].onmouseover = function(event) { firePopup(event, this); };
			//if(hasClass(balloons[x], 'dblclicklinkBalloon')) balloons[x].onDblClick = function(event) { window.location.href = 'http://http://elderscrolls.wikia.com/index.php?title=' + this.id.replace('\.2F','/'); };
		}
	}
	addOnloadHook(makeAllPopupBalloons);

// Collapsible tables are broken on the elder scrolls so I'm adding this till it is fixed

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

 function sortTableByDefault(){
    var $sortableTables = $(".sortByDefault");
    $sortableTables.each( function(i) {
		try {
			var sortableTables_th = $sortableTables[i].getElementsByTagName( "th" )[0];
			var sortableTables_sortHeader = getElementsByClass2(sortableTables_th, 'a', 'sortheader')[0];
			var sortableTables_sortHeader_Img = sortableTables_sortHeader.getElementsByTagName('img')[0];
			var imgSrcBefore = sortableTables_sortHeader_Img.src;
			$(sortableTables_sortHeader).removeAttr("onclick");
			$(sortableTables_sortHeader).bind('click', function() {
				ts_resortTable(this);
				changeSortImg(this);
				return false;
			});
			$(sortableTables_sortHeader).click();
		} catch(e){};
    });
}

function changeSortImg(sortHeader){
    var sortHeader_Img = sortHeader.getElementsByTagName('img')[0];
    if(sortHeader_Img.src.indexOf("sort_down.gif") >= 0){
        $(sortHeader_Img).attr("src", "https://images.wikia.nocookie.net/elderscrolls/images/7/7a/Sort_down.gif");
    } else if(sortHeader_Img.src.indexOf("sort_up.gif") >= 0){
        $(sortHeader_Img).attr("src", "https://images.wikia.nocookie.net/elderscrolls/images/5/5b/Sort_up.gif");
    }
}
addOnloadHook( sortTableByDefault );

$.fn.watch = function(props, callback, timeout){
    if(!timeout)
        timeout = 10;
    return this.each(function(){
        var el 		= $(this),
            func 	= function(){ __check.call(this, el) },
            data 	= {	props: 	props.split(","),
                        func: 	callback,
                        vals: 	[] };
        $.each(data.props, function(i) { data.vals[i] = el.css(data.props[i]); });
        el.data(data);
        if (typeof (this.onpropertychange) == "object"){
            el.bind("propertychange", callback);
        } else if ($.browser.mozilla){
            el.bind("DOMAttrModified", callback);
        } else {
            setInterval(func, timeout);
        }
    });
    function __check(el) {
        var data 	= el.data(),
            changed = false,
            temp	= "";
        for(var i=0;i < data.props.length; i++) {
            temp = el.css(data.props[i]);
            if(data.vals[i] != temp){
                data.vals[i] = temp;
                changed = true;
                break;
            }
        }
        if(changed && data.func) {
            data.func.call(el, data);
        }
    }
}


var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

var collapseButtonClass = "collapsible2";
var collapseButtonId = "collapseButton2Id";
var collapsibleTableId = "collapsibleTable2Id";
 
function collapseTable2( tableIndex ){
    var Button = document.getElementById( collapseButtonId + tableIndex );
    var Table = document.getElementById( collapsibleTableId + tableIndex );
    
    var Button2 = document.getElementById( collapseButtonId + tableIndex + '_2');
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
        if(Button2) Button2.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
        if(Button2) Button2.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons2(){
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], collapseButtonClass ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", collapsibleTableId + tableIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", collapseButtonId + tableIndex );
            //ButtonLink.setAttribute( "href", "#" );
            //addHandler( ButtonLink,  "click", new Function( "evt", "collapseTable2(" + tableIndex + " );") );
			//javascript
			ButtonLink.setAttribute( "href", "javascript:collapseTable2(" + tableIndex + " );" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            //Header.insertBefore( Button, Header.firstChild );
			Header.appendChild( Button );
            tableIndex++;
        }
    }
    var contentArea = document.getElementById( 'WikiaMainContent' );
	var secondButtonSpan = getElementsByClass2(contentArea, 'span', 'HideTableButton');
    
    for ( var i = 0; i < secondButtonSpan.length; i++ ) {
        var buttonLink = secondButtonSpan[i].getElementsByTagName('a')[0];
        if(buttonLink) {
            //var buttonLink_title = buttonLink.title;
            var buttonLink_title = secondButtonSpan[i].title;
            secondButtonSpan[i].setAttribute( "title", '' );
            if(!buttonLink_title) buttonLink_title = "0";
            buttonLink.setAttribute( "id", collapseButtonId + buttonLink_title + '_2' );
            buttonLink.setAttribute( "href", "javascript:collapseTable2(" + buttonLink_title + " );" );
        }
    }
    
    var hideOnShow = getElementsByClass2(contentArea, 'div', 'HideOnTableExpand');
    for ( var i = 0; i < hideOnShow.length; i++ ) {
        var divTitle = hideOnShow[i].title;
        var tableId = collapsibleTableId + divTitle;
        var $tableLastChild = $("#" + tableId + " tbody :last-child");
        hideOnShow[i].setAttribute( "id", collapsibleTableId + divTitle + "_HideOnShow" );
        hideOnShow[i].setAttribute( "title", "" );
        //alert("Last Child HTML:" + $tableLastChild.html() + "  Table Last Child Type:" + $tableLastChild.get(0).tagName );
        $tableLastChild.watch('style', function(){
            //alert("Parent ID: " + this.parentNode.id);
            var $tmpTableEl = $(this).parent().parent();
            //alert("This style:" + $(this).css('display') + "  Table:" + $tmpTableEl.attr('id'));
            //alert("Last Child Display: " + this.lastChild.style.display);
            var $telem = $("#" + $tmpTableEl.attr('id') + "_HideOnShow");
            if($(this).css('display') == "none"){
                $telem.css('display', 'block');
            } else {
                $telem.css('display', 'none');
            }
        });
    }
    
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable2( i );
        } 
        else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if ( hasClass( element, "outercollapse" ) ) {
                    collapseTable2 ( i );
                    break;
                }
            }
        }
    }
}
 
addOnloadHook( createCollapseButtons2 );



/***********************************************
 * Dynamic Ajax Loading
 * By jgjake2
 ***********************************************/
var rootdomain = "http://elderscrolls.wikia.com/index.php?title="
var urlsuffex = "&action=render";
var ajaxContainerId = "ajaxContentArea";
var ajaxLoadingIcon = "https://images.wikia.nocookie.net/elderscrolls/images/f/f3/AjaxLoading.gif";
var ajaxLoadingIconId ="ajaxLoadingIcon";
var apiRootdomain = "http://elderscrolls.wikia.com/api.php?action=parse&text=";
var apiUrlsuffex = "&format=xml";

function ajaxpage(url, container) {
    var newurl = rootdomain + url.replace('\.2F','/').replace('\.27','\'').replace('\.28','(').replace('\.29',')') + urlsuffex;
    $('#' + container).html('');
	jumpToAnchor('tableEnd');
    $('#' + container).load(newurl);
    //removeUnwantedContent();
    //var fmbox = $('#' + container).find('.fmbox')[0];
    //if(fmbox) $(fmbox).remove();
}

function addAjaxLinks(){
//fmbox
    var $ajaxDivs = $(".ajaxLink");
    //if($(ajaxDivs).length == 0) return;
    $ajaxDivs.each( function(i) {
        var ajaxDiv_Link = $(this).children("a")[0];
        var tURL = $ajaxDivs[i].id;
        ajaxDiv_Link.setAttribute('href', "javascript:ajaxpage('" + tURL + "', '" + ajaxContainerId + "');");
		
		var ajaxDiv_Image = $(this).find('img')[0];
		var ajaxDiv_Image_Parent = $(ajaxDiv_Image).parent();
		var ajaxDiv_Image_Parent_Html = $(ajaxDiv_Image_Parent).html();
		var thref = "javascript:ajaxpage('" + tURL + "', '" + ajaxContainerId + "');";
		$(ajaxDiv_Image_Parent).html('<a href="' + thref + '">' + ajaxDiv_Image_Parent_Html + '</a>');
    } );
    
    $('#' + ajaxLoadingIconId).css({'z-index' : '99', 'position' : 'relative', 'top' : '0px', 'left' : '0px', 'width' : '100%', 'height' : '200px'});
    $('#' + ajaxLoadingIconId).html('<br><img src="' + ajaxLoadingIcon + '" height="30px" width="30px" style="display: block; margin-left: auto; margin-right: auto; margin-top: auto; margin-bottom: auto;"/>');
    
    $('#' + ajaxContainerId).ajaxStart(function() {
        $('#' + ajaxLoadingIconId).show();
    }).ajaxComplete(function() {
        $('#' + ajaxLoadingIconId).hide();
        makePopupBalloonsById(ajaxContainerId);
    });

}

function addAjaxXmlLinks(){
    var $ajaxDivs = $(".ajaxXmlLink");
    //if($(ajaxDivs).length == 0) return;
    $ajaxDivs.each( function(i) {
        var ajaxDiv_Link = $(this).children("a")[0];
        var tURL = $ajaxDivs[i].id;
		tURL = tURL.replace('\.2F','/').replace('\.27','\'').replace('\.28','(').replace('\.29',')');
		var highlightNumber = $ajaxDivs[i].title;
		var tmpText = "{{" + tURL + "|highlight=" + highlightNumber + "|AjaxXMLRequest=1}}";
		var newurl = apiRootdomain + tmpText + apiUrlsuffex;
		ajaxDiv_Link.setAttribute('href', "javascript:renderAjaxXmlPage('" + newurl + "', '" + ajaxContainerId + "');");
    } );
    
    $('#' + ajaxLoadingIconId).css({'z-index' : '99', 'position' : 'relative', 'top' : '0px', 'left' : '0px', 'width' : '100%', 'height' : '200px'});
    $('#' + ajaxLoadingIconId).html('<br><img src="' + ajaxLoadingIcon + '" height="30px" width="30px" style="display: block; margin-left: auto; margin-right: auto; margin-top: auto; margin-bottom: auto;"/>');
    
    $('#' + ajaxContainerId).ajaxStart(function() {
        $('#' + ajaxLoadingIconId).show();
    }).ajaxComplete(function() {
        $('#' + ajaxLoadingIconId).hide();
    });
}

function jumpToAnchor(id) {
	//var new_position = $('#'+id).offset();
	//window.scrollTo(new_position.left,new_position.top);
	$('html, body').animate({scrollTop: $('#'+id).offset().top}, 500);
}

function renderAjaxXmlPage(turl, container) {
    $('#' + container).html('');
	jumpToAnchor('tableEnd');
	$.ajax({
			type: "GET",
		url: turl,
		dataType: "xml",
		success: function(xml) {
			//alert($(xml).find("text").text());
			$('#' + container).html($(xml).find("text").text());
            //var fmbox = $('#' + container).find('.fmbox')[0];
            //if(fmbox) $(fmbox).remove();
            //removeUnwantedContent();
			makePopupBalloonsById(container);
		}
	});
}
/*
function removeFmboxFromContainer(){
//removeOnAjax
    var fmbox = $('#' + ajaxContainerId).find('.fmbox')[0];
    if(fmbox) $(fmbox).remove();
}
*/

function removeUnwantedContent(){
    var $content = $('#' + ajaxContainerId).find('.removeOnAjax');
    if($content){
        if($.isArray($content)) {
            $content.each( function(i) {
                $(this).remove();
            });
        } else {
            $(content).remove();
        }
    }
}

addOnloadHook(addAjaxLinks);
addOnloadHook(addAjaxXmlLinks);


// JQuery URL Parser plugin - https://github.com/allmarkedup/jQuery-URL-Parser
// Written by Mark Perkins, mark@allmarkedup.com
// License: http://unlicense.org/ (i.e. do what you want with it!)

(function($, undefined) {
    
    var tag2attr = {
        a       : 'href',
        img     : 'src',
        form    : 'action',
        base    : 'href',
        script  : 'src',
        iframe  : 'src',
        link    : 'href'
    },
    
	key = ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"], // keys available to query

	aliases = { "anchor" : "fragment" }, // aliases for backwards compatability

	parser = {
		strict  : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
		loose   :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
	},

	querystring_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g, // supports both ampersand and semicolon-delimted query string key/value pairs

	fragment_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g; // supports both ampersand and semicolon-delimted fragment key/value pairs

	function parseUri( url, strictMode )
	{
		var str = decodeURI( url ),
		    res   = parser[ strictMode || false ? "strict" : "loose" ].exec( str ),
		    uri = { attr : {}, param : {}, seg : {} },
		    i   = 14;

		while ( i-- )
		{
			uri.attr[ key[i] ] = res[i] || "";
		}

		// build query and fragment parameters

		uri.param['query'] = {};
		uri.param['fragment'] = {};

		uri.attr['query'].replace( querystring_parser, function ( $0, $1, $2 ){
			if ($1)
			{
				uri.param['query'][$1] = $2;
			}
		});

		uri.attr['fragment'].replace( fragment_parser, function ( $0, $1, $2 ){
			if ($1)
			{
				uri.param['fragment'][$1] = $2;
			}
		});

		// split path and fragement into segments

        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');
        
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');
        
        // compile a 'base' domain attribute
        
        uri.attr['base'] = uri.attr.host ? uri.attr.protocol+"://"+uri.attr.host + (uri.attr.port ? ":"+uri.attr.port : '') : '';
        
		return uri;
	};

	function getAttrName( elm )
	{
		var tn = elm.tagName;
		if ( tn !== undefined ) return tag2attr[tn.toLowerCase()];
		return tn;
	}

	$.fn.url = function( strictMode )
	{
	    var url = '';

	    if ( this.length )
	    {
	        url = $(this).attr( getAttrName(this[0]) ) || '';
	    }

        return $.url( url, strictMode );
	};

	$.url = function( url, strictMode )
	{
	    if ( arguments.length === 1 && url === true )
        {
            strictMode = true;
            url = undefined;
        }
        
        strictMode = strictMode || false;
        url = url || window.location.toString();
        	    	            
        return {
            
            data : parseUri(url, strictMode),
            
            // get various attributes from the URI
            attr : function( attr )
            {
                attr = aliases[attr] || attr;
                return attr !== undefined ? this.data.attr[attr] : this.data.attr;
            },
            
            // return query string parameters
            param : function( param )
            {
                return param !== undefined ? this.data.param.query[param] : this.data.param.query;
            },
            
            // return fragment parameters
            fparam : function( param )
            {
                return param !== undefined ? this.data.param.fragment[param] : this.data.param.fragment;
            },
            
            // return path segments
            segment : function( seg )
            {
                if ( seg === undefined )
                {
                    return this.data.seg.path;                    
                }
                else
                {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];                    
                }
            },
            
            // return fragment segments
            fsegment : function( seg )
            {
                if ( seg === undefined )
                {
                    return this.data.seg.fragment;                    
                }
                else
                {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];                    
                }
            }
            
        };
        
	};

})(jQuery);


/////////////////////////////////////////
//          Cookie Functions           //
/////////////////////////////////////////

function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name,"",-1);
}

function testCookies(){
    setCookie('test', 'none', '1');
    //Set_Cookie( 'test', 'none', '', '/', '', '' );
    if (getCookie('test')){
        deleteCookie('test');
        return true;
    } else return false;
}

/////////////////////////////////////////
//        End Cookie Functions         //
/////////////////////////////////////////

/////////////////////////////////////////
//            Wiki Message             //
/////////////////////////////////////////


var WIKIMESSAGECONFIG = (function() {
     var private = {
         'MESSAGE_EXPIRE_TIME': '7', //In Days
         'COOKIEID': 'jgjake2popupMessage',
         'COOKIE_VALUE_PREFIX_CLOSED': 'Closed:',
         'COOKIE_VALUE_PREFIX_NOTCLOSED': 'NotClosed:'
     };

     return {
        get: function(name) { return private[name]; }
    };
})();
//alert('MY_CONST: ' + WIKIMESSAGECONFIG.get('MESSAGE_EXPIRE_TIME'));  // 1

function setMessageCookie(cookieId, value, exp){
    setCookie(cookieId, value, exp);
}

function addNewMessage(message, creationDate){
    var today = new Date();
    var messageExpire = new Date(creationDate);
    messageExpire.setDate(creationDate.getDate()+WIKIMESSAGECONFIG.get('MESSAGE_EXPIRE_TIME'));
    //alert('Today:' + today + '\r\n' + 'Expire:' + messageExpire);
    if(messageExpire > today){
        var cookieId = WIKIMESSAGECONFIG.get('COOKIEID');
        var cookieVal = getCookie(cookieId);
        if(cookieVal != null){
            if(cookieVal.substring(0, WIKIMESSAGECONFIG.get('COOKIE_VALUE_PREFIX_CLOSED').length) == WIKIMESSAGECONFIG.get('COOKIE_VALUE_PREFIX_CLOSED')){
                var tmpDate = new Date(cookieVal.substring(WIKIMESSAGECONFIG.get('COOKIE_VALUE_PREFIX_CLOSED').length, cookieVal.length));
                if(tmpDate < creationDate){
                    setMessageCookie(cookieId, WIKIMESSAGECONFIG.get('COOKIE_VALUE_PREFIX_NOTCLOSED') + creationDate, WIKIMESSAGECONFIG.get('MESSAGE_EXPIRE_TIME'));
                    addNewMessageToPage(message);
                    return;
                } else return;
            }
        }
        if(cookieVal == null || cookieVal == WIKIMESSAGECONFIG.get('COOKIE_VALUE_PREFIX_NOTCLOSED') + creationDate){
            if(cookieVal == null) setMessageCookie(cookieId, WIKIMESSAGECONFIG.get('COOKIE_VALUE_PREFIX_NOTCLOSED') + creationDate, WIKIMESSAGECONFIG.get('MESSAGE_EXPIRE_TIME'));
            addNewMessageToPage(message);
        }
    }
}

function messageClosed(){
    var today = new Date();
    setMessageCookie(WIKIMESSAGECONFIG.get('COOKIEID'), WIKIMESSAGECONFIG.get('COOKIE_VALUE_PREFIX_CLOSED') + today, WIKIMESSAGECONFIG.get('MESSAGE_EXPIRE_TIME'));
    $('#WikiaNotifications').remove();
}

function addNewMessageToPage(message){
    var footerDiv = $('#WikiaFooter div')[1];
    var newMessage = document.createElement("ul");
    newMessage.setAttribute('class', 'WikiaNotifications');
    newMessage.setAttribute('id', 'WikiaNotifications');
    var messageLink = '<a id="messageCloseLink" class="sprite close-notification"></a>';
    var messageP = '<p>' + message + '</p>';
    var messageDiv = '<div style="display: block; max-width:350px;" id="msg_590" data-type="5">' + messageLink + messageP + '</div>';
    var messageLi = '<li>' + messageDiv + '</li>'
    newMessage.innerHTML = messageLi;
    footerDiv.appendChild(newMessage);
    document.getElementById('messageCloseLink').addEventListener('click', messageClosed, false);
}

function addMessageOnPages(pageNames, message, creationDate){
    var url = $.url();
    var currentPage = url.segment(-1);
    for (x in pageNames){
        if(currentPage == pageNames[x]){
            addNewMessage(message, creationDate);
            return;
        }
    }
}

function addMessageOnPath(pathNames, message, creationDate){
    var url = $.url();
    var currentPage = url.attr('path');
    for (x in pathNames){
        if(currentPage == pathNames[x]){
            addNewMessage(message, creationDate);
            return;
        }
    }
}

function addMessageToWiki(){
    if(!testCookies()) return;
    var pathNames = ['/wiki/Map_(Skyrim)', '/wiki/User:Jgjake2', '/wiki/User_talk:Jgjake2'];
    //var pageNames = ['Map_(Skyrim)', 'User:Jgjake2', 'User_talk:Jgjake2'];
    var message = '<span style="font-weight:800; font-size:120%;">Skyrim Map Updates Are Coming Soon!</span><br>If you have any questions or requests, message me: <a href="/wiki/User_talk:Jgjake2">Jgjake2</a>';
    var creationDate = new Date("January 5, 2012 06:52:00");
    //addMessageOnPages(pageNames, message, creationDate);
    addMessageOnPath(pathNames, message, creationDate);
}
//addOnloadHook(addMessageToWiki);

/////////////////////////////////////////
//          End Wiki Message           //
/////////////////////////////////////////


// Add Syntax Highlighting
importScriptPage('User:Jgjake2/js/ElderScrolls/SyntaxHighlight.js', 'deadisland');

$(document).ready(function() {
    $(".linkhover").hover(function() {
        $(".imagehover").css("display","table");
    },function() {
        $(".imagehover").css("display","none");
    });
});