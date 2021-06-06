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

$( addDismissButton );

// Embed live blogs from Cover It Live (can be altered to embed anything really)
function escapeString(str){
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function GetLiveBlog(){
  var blip_elements = document.getElementsByClassName(document.getElementById('bodyContent'),'div','live_blog');
  for(var i = 0; i < blip_elements.length; i++){
    blip_elements.item(i).innerHTML = "<iframe src='"+ escapeString(blip_elements[i].firstChild.href) +"' scrolling='no' height='550px' width='550px' frameBorder='0'></iframe>";
  }
}
GetLiveBlog();

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

    var body = $("#content");
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

    var body = $("#content");
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