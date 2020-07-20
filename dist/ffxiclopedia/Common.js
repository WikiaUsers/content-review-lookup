/* Any JavaScript here will be loaded for all users on every page load. */

/* Dismissable Watchlist Message */

function addDismissButton() {
  var watchlistMessage = document.getElementById("watchlist-message");
  if ( watchlistMessage == null ) return;
  var watchlistCookieID = watchlistMessage.className.replace(/cookie\-ID\_/ig,'');

  if ( document.cookie.indexOf( "hidewatchlistmessage-" + watchlistCookieID + "=yes" ) != -1 ) {
    watchlistMessage.style.display = "none";
  }

  var Button     = document.createElement( "span" );
  var ButtonLink = document.createElement( "a" );
  var ButtonText = document.createTextNode( "dismiss" );

  ButtonLink.setAttribute( "id", "dismissButton" );
  ButtonLink.setAttribute( "href", "javascript:dismissWatchlistMessage();" );
  ButtonLink.setAttribute( "title", "Hide this message for one week" );
  ButtonLink.appendChild( ButtonText );

  Button.appendChild( document.createTextNode( "[" ) );
  Button.appendChild( ButtonLink );
  Button.appendChild( document.createTextNode( "]" ) );

  watchlistMessage.appendChild( Button );
}

function dismissWatchlistMessage() {
  var e = new Date();
  e.setTime( e.getTime() + (7*24*60*60*1000) );
  var watchlistMessage = document.getElementById("watchlist-message");
  var watchlistCookieID = watchlistMessage.className.replace(/cookie\-ID\_/ig,'');
  document.cookie = "hidewatchlistmessage-" + watchlistCookieID + "=yes; expires=" + e.toGMTString() + "; path=/";
  watchlistMessage.style.display = "none";
}

addOnloadHook( addDismissButton );

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable( tableIndex ) {
  var Button = document.getElementById( "collapseButton" + tableIndex );
  var Table = document.getElementById( "collapsibleTable" + tableIndex );

  if ( !Table || !Button ) {
    return false;
  }

  var Rows = Table.rows;

  if ( Button.firstChild.data == collapseCaption ) {
    for ( var i = 1; i < Rows.length; i++ ) {
      Rows[i].style.display = "none";
    }
    Button.firstChild.data = expandCaption;
  } else {
    for ( var i = 1; i < Rows.length; i++ ) {
      Rows[i].style.display = Rows[0].style.display;
    }
    Button.firstChild.data = collapseCaption;
  }
}

function createCollapseButtons() {
  var tableIndex = 0;
  var NavigationBoxes = new Object();
  var Tables = document.getElementsByTagName( "table" );

  for ( var i = 0; i < Tables.length; i++ ) {
    if ( hasClass( Tables[i], "collapsible" ) ) {

      /* only add button and increment count if there is a header row to work with */
      var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
      if (!HeaderRow) continue;
      var Header = HeaderRow.getElementsByTagName( "th" )[0];
      if (!Header) continue;

      NavigationBoxes[ tableIndex ] = Tables[i];
      Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );

      var Button     = document.createElement( "span" );
      var ButtonLink = document.createElement( "a" );
      var ButtonText = document.createTextNode( collapseCaption );

      Button.style.styleFloat = "right";
      Button.style.cssFloat = "right";
      Button.style.fontWeight = "normal";
      Button.style.textAlign = "right";
      Button.style.width = "6em";

      ButtonLink.style.color = Header.style.color;
      ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
      ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
      ButtonLink.appendChild( ButtonText );

      Button.appendChild( document.createTextNode( "[" ) );
      Button.appendChild( ButtonLink );
      Button.appendChild( document.createTextNode( "]" ) );

      Header.insertBefore( Button, Header.childNodes[0] );
      tableIndex++;
    }
  }

  for ( var i = 0;  i < tableIndex; i++ ) {
    if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
      collapseTable( i );
    }
  }
}

addOnloadHook( createCollapseButtons );

/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */

// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
  var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
  var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

  if (!NavFrame || !NavToggle) {
    return false;
  }

  // if shown now
  if (NavToggle.firstChild.data == NavigationBarHide) {
    for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
      if ( hasClass( NavChild, 'NavPic' ) ) {
        NavChild.style.display = 'none';
      }
      if ( hasClass( NavChild, 'NavContent') ) {
        NavChild.style.display = 'none';
      }
    }
    NavToggle.firstChild.data = NavigationBarShow;

  // if hidden now
  } else if (NavToggle.firstChild.data == NavigationBarShow) {
    for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
      if (hasClass(NavChild, 'NavPic')) {
        NavChild.style.display = 'block';
      }
      if (hasClass(NavChild, 'NavContent')) {
        NavChild.style.display = 'block';
      }
    }
    NavToggle.firstChild.data = NavigationBarHide;
  }
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
  var indexNavigationBar = 0;
  // iterate over all < div >-elements 
  var divs = document.getElementsByTagName("div");
  for(var i = 0; NavFrame = divs[i]; i++) {
    // if found a navigation bar
    if (hasClass(NavFrame, "NavFrame")) {

      indexNavigationBar++;
      var NavToggle = document.createElement("a");
      NavToggle.className = 'NavToggle';
      NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
      NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

      var NavToggleText = document.createTextNode(NavigationBarHide);
      for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
        if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
          if (NavChild.style.display == 'none') {
            NavToggleText = document.createTextNode(NavigationBarShow);
            break;
          }
        }
      }

      NavToggle.appendChild(NavToggleText);
      // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
      for(var j = 0; j < NavFrame.childNodes.length;  j++) {
        if (hasClass(NavFrame.childNodes[j], "NavHead")) {
          NavFrame.childNodes[j].appendChild(NavToggle);
        }
      }
      NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
    }
  }
}

addOnloadHook( createNavigationBarToggleButton );


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
  var reCache = {};
  return function (element, className) {
    return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
  };
})();

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'ended...  ';
  } else {
    var tpm = 'in...  ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// Embed live blogs from Cover It Live (can be altered to embed anything really)
function escapeString(str){
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function GetLiveBlog(){
  var blip_elements = getElementsByClassName(document.getElementById('bodyContent'),'div','live_blog');
  for(var i = 0; i < blip_elements.length; i++){
    blip_elements[i].innerHTML = "<iframe src='"+ escapeString(blip_elements[i].firstChild.href) +"' scrolling='no' height='550px' width='550px' frameBorder='0'></iframe>";
  }
}
GetLiveBlog();

// *********************************************************
// Tooltips: Allows popups tooltips.
// *********************************************************
(function() { // Wrap the script in a closure to make the functions and variables private
  var containerSelector = '.WikiaArticle'; // selector for the content area of the article
  var inlineSelector = '.tooltip-source'; // selector for the inline element which controls the tooltip
  var previewWrapperSelector = '.ArticlePreviewInner'; // selector for the article preview
  var siteWrapperSelector = '.WikiaSiteWrapper'; // selector for the wrapper that's around the header and article
  var lazyLoadedImageSelector = 'img.lzyPlcHld:not(.lzyLoaded)';

  // Offset to position the tooltip slightly away from the mouse
  var mouseOffset = {
    top: 10,
    bottom: 0,
    left: 10,
    right: 10
  };

  // Tooltip CSS; make the tooltip float over other content
  var tooltipCSS = {
    position: 'fixed',
    'z-index': 1000
  };

  // Get the tooltip element from the inline element
  function getTooltip(element) {
    var inlineElement = $(element).closest(inlineSelector);
    if (inlineElement.length === 0) {
      return $();
    }

    // look for the unique id of the element if it exists
    var uniqueTooltipID = inlineElement.attr('data-tooltip-id');
    if (uniqueTooltipID) {
      return $('[data-tooltip-id="' + uniqueTooltipID + '"]').not(inlineElement);
    }

    // find the element by id
    tooltipID = inlineElement.attr('id') + '-tooltip';
    var tooltipElement = $(document.getElementById(tooltipID)); // using getElementById removes the need to escape special characters

    // generate a unique id and assign it to both
    var uniqueTooltipID = tooltipID + '_' + Math.floor(Math.random() * 10e10);
    inlineElement.attr('data-tooltip-id', uniqueTooltipID).attr('id', null);
    tooltipElement.attr('data-tooltip-id', uniqueTooltipID).attr('id', null);

    return tooltipElement;
  }

  function showTooltip(element) {
    var tooltip = getTooltip(element);
    tooltip.find(lazyLoadedImageSelector).trigger('onload'); // load any lazy loaded elements
    tooltip.css(tooltipCSS);
    relocateTooltip(tooltip);
    tooltip.show();
  }

  // move the tooltip to a higher level so that it doesn't slide under other elements
  function relocateTooltip(tooltip) {
    var parent = tooltip.parent();
    var previewWrapper = $(previewWrapperSelector);
    if (previewWrapper.length > 0 && !parent.is(previewWrapperSelector)) {
      return;
    }

    var siteWrapper = $(siteWrapperSelector);
    if (siteWrapper.length > 0 && !parent.is(siteWrapperSelector)) {
      tooltip.detach();
      siteWrapper.append(tooltip);
    }
  }

  function hideTooltip(element) {
    var tooltip = getTooltip(element);
    tooltip.hide();
  }

  function positionTooltip(element, tooltip, mouseX, mouseY) {
    var contentArea = getContentArea();

    // For deciding if we need to switch sides for the tooltip
    var tooltipHeight = tooltip.outerHeight();
    var tooltipWidth = tooltip.outerWidth();

    // Position the tooltip in the standard position (bottom-right of cursor)
    var positionY = mouseY + mouseOffset.top;
    var positionX = mouseX + mouseOffset.left;

    // Adjust the tooltip so that as much of it fits in the content area as possible
    if ((positionY + tooltipHeight) > contentArea.bottom) {
      var spaceAbove = (mouseY - contentArea.top);
      var spaceBelow = (contentArea.bottom - mouseY);
      if (spaceBelow < tooltipHeight) {
        positionY -= (tooltipHeight - spaceBelow + mouseOffset.top);
      }
    }
    if ((positionX + tooltipWidth) > contentArea.right) {
      var spaceLeft = (mouseX - contentArea.left);
      var spaceRight = (contentArea.right - mouseX);
      if (spaceLeft > spaceRight) {
        // Move the tooltip to the left of the element
        positionX = mouseX - tooltipWidth - mouseOffset.right;
      }
    }

    // Position the tooltip
    tooltip.css({
      left: positionX + 'px',
      top: positionY + 'px'
    });
  }

  // Get the bounds of the content area which the tooltip should stay within
  function getContentArea() {
    var container = $(containerSelector);
    var containerPosition = container.offset();
    var containerMargins = {
      top: Number.parseFloat(container.css('margin-top')),
      left: Number.parseFloat(container.css('margin-left'))
    };
    return {
      top: containerPosition.top - containerMargins.top,
      left: containerPosition.left - containerMargins.left,
      bottom: Math.min(container.height(), $(window).height()),
      right: containerPosition.left + container.width()
    };
  }

  function attachEvents() {
    // Attach events to the inline element
    $(inlineSelector).each(function(index, inlineElement) {
      $(inlineElement).mouseenter(function(event) {
        showTooltip(event.target);
      });
      $(inlineElement).mouseleave(function(event) {
        hideTooltip(event.target);
      });
      $(inlineElement).mousemove(function(event) {
        positionTooltip(event.target, getTooltip(this), event.clientX, event.clientY);
      });
    });
  }

  $(document).ready(function() {
    attachEvents();
  });

  $(window).on('EditPageAfterRenderPreview', function() {
    attachEvents();
  });
})();

// create collapsible header sections by including a collapse-sections tag
(function(global) {
  function createHeaderSections() {
    // find the collapse sections tag within the page.
    var tag = $('.collapse-sections');

    // stop if the tag is not found.
    if (tag.length === 0) {
      return;
    }

    // remove the tag so it doesn't show up to the user.
    tag.remove();

    var body = $('.WikiaArticle');
    var headline = 'span.mw-headline';
    var headers = [
      'h2:has('+headline+')',
      'h3:has('+headline+')'
    ];

    for (var i in headers) {
      var header = headers[i];
      var container = body.find(header).parent();

      // wrap text nodes in spans so that wrapping works properly
      container.contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      }).wrap('<span/>');

      container.find(header).each(function() {
        // wrap the content between headers in a div so that it can be collapsed.
        var id = $(this).find(headline).attr('id') + '-collapse';
        var wrapper = $(this).nextUntil(header).wrapAll('<div class="collapsible" id="'+id+'"/>');

        // add collapse buttons to the headers
        var button = $('<span class="showhide" for="'+id+'">hide</span>');
        button.on('click', function() {
          var id = $(this).attr('for');
          $(document.getElementById(id)).slideToggle();
          if (button.html() === 'hide') {
            button.html('show');
          } else {
            button.html('hide');
          }
        });
        $(this).find(headline).append(button);
      });
    }
  }

  $(document).ready(function() {
    createHeaderSections();
  });

  $(window).on('EditPageAfterRenderPreview', function() {
    createHeaderSections();
  });
})(this);

/**
 Wrap a div around specific header sections by including wrap-section tags.
 The data-target attribute of the tag specifies the target header's id.
 The data-class attribute of the tag specifies classes to add to the wrapper.
*/
(function(global) {
  function createWrappedSections() {
    // find the wrap section tags within the page.
    var tags = $('.wrap-section');

    // stop if no tags are found.
    if (tags.length === 0) {
      return;
    }

    // extract the sections from the "for" attribute of each tag
    var sections = [];
    tags.each(function() {
      var id = $(this).attr('data-target');
      var classes = $(this).attr('data-class');
      if (typeof id === 'string') {
        sections.push({
          id: id,
          classes: classes
        });
      }
    });

    // remove the tags so they don't show up to the user.
    tags.remove();

    // stop if no sections are found.
    if (sections.length === 0) {
      return;
    }

    var body = $('.WikiaArticle');
    var headline = 'span.mw-headline';
    var headers = [
      'h2:has('+headline+')',
      'h3:has('+headline+')'
    ];

    for (var headerIndex in headers) {
      var header = headers[headerIndex];
      var container = body.find(header).parent();

      // wrap text nodes in spans so that wrapping works properly.
      container.contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      }).wrap('<span/>');

      container.find(header).each(function() {
        var id = $(this).find(headline).attr('id');
        var section;
        for (var sectionIndex in sections) {
          if (sections[sectionIndex].id === id) {
            section = sections[sectionIndex];
            break;
          }
        }
        // skip the header if it's not one of the marked sections.
        if (typeof section === 'undefined') {
          return;
        }
        // wrap the header and everything until the next header in a div.
        var wrapper = $('<div/>');
        if (typeof section.classes === 'string') {
          wrapper.addClass(section.classes);
        }
        $(this).nextUntil(header).andSelf().wrapAll(wrapper);
      });
    }
  }

  $(document).ready(function() {
    createWrappedSections();
  });

  $(window).on('EditPageAfterRenderPreview', function() {
    createWrappedSections();
  });
})(this);

function addEventHandler(target, eventType, handler) {
  if (target.addEventListener) {
    target.addEventListener(eventType, handler, false);
  } else if (target.attachEvent) {
    target.attachEvent("on" + eventType, handler);
  } else {
    target["on" + eventType] = handler;
  }
}

/** Voting *******************************
 * By [[User:Spang|Spang]]
 * Voting system
 * Add "ratings.disabled = true" without the quotes to your JS to disable
 */
ratings = new Object();
ratings.getCallback = {
  success: function( o ){
    var j = YAHOO.tools.JSONParse(o.responseText);
    try {
      with( j.query.wkvoteart[wgArticleId] ){
        if( typeof votesavg != undefined && votesavg ){
          ratings.avgVote = ( 5>=votesavg>=1 ? Math.round(votesavg*10)/10 : 5 );
          ratings.text[0] = ( 'average rating: ' + ratings.avgVote );
        }
        if( typeof( uservote ) != 'undefined' && uservote ){
          ratings.myVote = uservote;
          ratings.hasVoted = true
        } else {
          ratings.hasVoted = false;
        }
        ratings.paint( 0 );
      }
    } catch( e ){}
  },
  failure: function( o ){
    ratings.out('connection failure :(');
  }
};

ratings.vote = function( a ){
  if( wgUserName == null ){
    window.location = '/wiki/Special:Userlogin?returnto=' + wgPageName;
    return;
  }
  var b = ( ratings.hasVoted == true ? 'update' : 'insert' );
  ratings.get = YAHOO.util.Connect.asyncRequest('GET', '/api.php?format=json&action=' + b + '&list=wkvoteart&wkuservote=1&wkctime=5&wkpage=' + wgArticleId + '&wkvote=' + a, ratings.voteCallback, null);
  ratings.myVote = a;
  ratings.paint(a, 'submitting vote...');
  ratings.votingInProgress = true;
};

ratings.voteCallback = {
  success: function( o ){
    var j = YAHOO.tools.JSONParse(o.responseText);
    if( j.item.wkvoteart[3] != undefined && ratings.retried != true ){
      ratings.retried = true;
      ratings.out('failed, retrying...');
      ratings.get = YAHOO.util.Connect.asyncRequest('GET', '/api.php?format=json&action=delete&list=wkvoteart&wkpage=' + wgArticleId, ratings.retry, null);
      return;
    };
    try {
      with( j.item.wkvoteart[0] == undefined ? j.item.wkvoteart : j.item.wkvoteart[0] ){
        ratings.hasVoted = true;
        ratings.myVote = vote;
        ratings.avgVote = Math.round(avgvote*10)/10;
        if( ratings.avgVote > 5 ) {
          ratings.avgVote = 5
        }
      }
    } catch( e ){
      ratings.out('Error: ' + e);
      ratings.votingInProgress = false;
      return;
    }
    ratings.votingInProgress = false;
    ratings.out('thanks for voting!');
    ratings.text[0] = ( 'average rating: ' + ratings.avgVote );
    ratings.timeout = setTimeout('ratings.paint(0)', 1000);
  },
  failure: function( o ){
    ratings.votingInProgress = false;
    ratings.out('connection failure :(');
  }
};

ratings.retry = {
  success: function( o ){
    ratings.get = YAHOO.util.Connect.asyncRequest('GET', '/api.php?format=json&action=insert&list=wkvoteart&wkuservote=1&wkctime=5&wkpage=' + wgArticleId + '&wkvote=' + ratings.myVote, ratings.voteCallback, null);
  },
  failure: function( o ){
    ratings.out('error');
  }
};

ratings.out = function( m ){
  document.getElementById('ratingMsg').innerHTML = m;
};

ratings.paint = function( n, m ){
  if( ratings.votingInProgress == true )
    return;

  YAHOO.util.Dom.setStyle(['vote-1','vote-2','vote-3','vote-4','vote-5'], 'backgroundPosition', '0 0');
  for( var l = 1; l <= n; l++ ){
    YAHOO.util.Dom.setStyle('vote-' + l, 'backgroundPosition', '0 -34px');
  }
  if( n === 0 && ( ratings.myVote != false || ratings.avgVote != undefined ) ){
    var a = ratings.hasVoted == true ? '0 -34px' : '0 -17px';
    var b = ratings.hasVoted != false ? ratings.myVote : ratings.avgVote;
    for( var l = 1; l <= b; l++ ){
      YAHOO.util.Dom.setStyle('vote-' + l, 'backgroundPosition', a);
    }
    if( l-ratings.avgVote < 1 && l <= 5 && ratings.hasVoted != true ){
      var p = ratings.avgVote-(l-1);
      var q = 0;
      switch( true ){
        case 0<p&&p<=.2:
          q = '-51px';
          break;
        case .2<p&&p<=.4:
          q = '-68px';
          break;
        case .4<p&&p<=.6:
          q='-85px';
          break;
        case .6<p&&p<=.8:
          q = '-102px';
          break;
        case .8<p&&p<1:
          q = '-119px';
          break;
        default:
      };
      document.getElementById('vote-' + l).style.backgroundPosition = '0px ' + q
    }
  };
  if( wgUserName == null && n != 0 )
    ratings.out('please log in to vote');
  else if( m == undefined )
    ratings.out( ratings.text[n] );
  else ratings.out( m );
};
ratings.setup = function(){
  if( wgIsArticle == false || ratings.disabled == true ) {
    return;
  }

  var a = document.getElementById('p-search');
  if( !a ) {
    return false;
  }

  ratings.p = document.createElement('div');
  ratings.p.innerHTML = '<h5>rating</h5><div id="ratingBody" class="pBody"><div><ul id="ratingStars" onmouseout="ratings.paint(0);"><li id="vote-1" class="voteStar" onmouseover="ratings.paint(1)" onclick="ratings.vote(1);">&nbsp;1</li><li id="vote-2" class="voteStar" onmouseover="ratings.paint(2)" onclick="ratings.vote(2);"> 2</li><li id="vote-3" class="voteStar" onmouseover="ratings.paint(3)" onclick="ratings.vote(3);"> 3</li><li id="vote-4" class="voteStar" onmouseover="ratings.paint(4)" onclick="ratings.vote(4);"> 4</li><li id="vote-5" class="voteStar" onmouseover="ratings.paint(5)" onclick="ratings.vote(5);"> 5&nbsp;</li></ul></div><span id="ratingMsg">rate this article!</span></div>';
  ratings.p.className = 'portlet';
  ratings.p.id = 'p-rating';
  document.getElementById('column-one').insertBefore(ratings.p, a);
  ratings.text = new Array('rate this article!', 'poor', 'nothing special', 'worth reading', 'pretty good', 'awesome!');
  ratings.get = YAHOO.util.Connect.asyncRequest('GET', '/api.php?format=json&action=query&list=wkvoteart&wkuservote=1&wkctime=5&wkpage=' + wgArticleId, ratings.getCallback, null);
};

/* YAHOO.util.Event.onContentReady('column-one', ratings.setup); */
addEventHandler(window, "load", ratings.setup);