/* Any JavaScript here will be loaded for all users on every page load. */
/*******************************
/* Wiki Subpage Tooltip Script *
/*******************************/
// Author:  Shawn Bruckner
// Date:    2013-Apr-28
// License: CC-BY 3.0
// Version: beta

var wst = wst || {

    dataSubpageTitle : '/Tooltip',
    loadingTemplate: 'Template:Tooltip hover box loading',
    loadedTemplate: 'Template:Tooltip hover box',
    loadingHtml: null,
    classPrefix: 'wst-tooltip-',
    articlePath : null,
    fullScriptPath : null,
    scriptPath: null,
    dataTitlesToCheck: Array(),
    contentTitles: Array(),
    dataTitles: Array(),

    encodeAllSpecial : function( unencoded ) {
        var encoded = ""; 
        var c;
        var safeChars = /[0-9A-Za-z]/;
        for( var i = 0; i < unencoded.length; i++ ) {
            c = unencoded.charAt(i);
            if ( safeChars.test( c ) ) {
                encoded = encoded + c;
            } else {
                encoded = encoded + '_' + c.charCodeAt().toString(16) + '-';
            }
        }
        return encoded;
    },

    getTitleFromHref : function( href ) {
        var end;
        var result = null;
        if ( href.indexOf( wst.fullScriptPath ) === 0 ) {
            end = href.substring( wst.fullScriptPath.length );
            result = ( new RegExp( 'title=([^&]*)' ) ).exec( end );
        } else if ( href.indexOf( wst.scriptPath ) === 0 ) {
            end = href.substring( wst.scriptPath.length );
            result = ( new RegExp( 'title=([^&]*)' ) ).exec( end );
        } else if ( href.indexOf( wst.articlePath ) === 0 ) {
            end = href.substring( wst.articlePath.length );
            result = ( new RegExp( '([^?]*)' ) ).exec( end );
        }

        if ( result ) {
            console.log( result[1].substring(0, 8) );
            if ( decodeURIComponent( result[1] ).substring(0, 8) !== "Spécial:" ) {
                return decodeURIComponent( result[1] );
            } else {
                return null;
            }
        } else {
            return null;
        }
    },

    getTitlesAndContentLinks : function() {
        var links = $( '#mw-content-text a[href]' );
        var uniqueTitles = {};
        var title;

        for ( var i = 0; i < links.length; i++ ) {
            if( title = wst.getTitleFromHref( links[i].href ) ) {
                uniqueTitles[title] = null; // hackish way to ensure only unique titles are added
            }
        }

        for ( uniqueTitle in uniqueTitles ) { 
          wst.dataTitlesToCheck.push( uniqueTitle + wst.dataSubpageTitle ); // put unique titles into the array
        }
    },

    beginLinkSetup : function() {
        wst.articlePath = mw.config.get( 'wgServer' ) + mw.config.get( 'wgArticlePath' ).replace( /\$1/, '' );
        wst.fullScriptPath = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' );
        wst.scriptPath = mw.config.get( 'wgScript' );

        wst.getTitlesAndContentLinks();

        if ( wst.dataTitlesToCheck.length > 0 ) {
            $.ajax( {
                type: 'POST',
                url: mw.util.wikiScript( 'api' ),
                data: { action: 'parse', format: 'json', text: '{{:' + wst.loadingTemplate + '}}' },
                dataType: 'json',
                success: wst.midLinkSetup
            } );
        }
    },

    midLinkSetup: function( jsonData ) {
        wst.loadingHtml = jsonData.parse.text['*'];

        wst.startQueryPageExistence();        
    },

    startQueryPageExistence : function( ) {
        titleSubset = Array();
        for ( i = 0; i < 50 && wst.dataTitlesToCheck.length > 0; i++ ) {
            titleSubset.push( wst.dataTitlesToCheck.pop() );
        }
        var titles = titleSubset.join( '|' );

        $.ajax( {
             type: 'POST',
             url: mw.util.wikiScript( 'api' ),
             data: { action: 'query', format: 'json', titles: titles },
             dataType: 'json',
             success: wst.finishQueryPageExistence
        } );
    },

    finishQueryPageExistence : function( jsonData ) {
        wst.filterTitles( jsonData.query.pages );

        if ( wst.dataTitlesToCheck.length > 0 ) {
            wst.startQueryPageExistence();
        } else {
            wst.finishLinkSetup();
        }
    },

    filterTitles : function( pageData ) {
        var result, title;
        for ( index in pageData ) {
            result = pageData[index];
            if ( result.missing === undefined ) {
                title = result.title.replace( / /g, '_' );
                wst.dataTitles.push( title );
                wst.contentTitles.push( title.substring( 0, title.length - wst.dataSubpageTitle.length ) );
            }
        }
    },

    finishLinkSetup : function( ) {
        for ( var i = 0; i < wst.contentTitles.length; i++ ) {
            $( 'body' ).append( '<div id="' + wst.classPrefix + wst.encodeAllSpecial( wst.contentTitles[i] ) + 
                '" style="display: none; position: absolute; z-index: 10000;">' + 
                wst.loadingHtml.replace( /\$1/, wst.contentTitles[i].replace( /_/, " " ) ) + '</div>' );
        }

        var title, id;
        var links = $( '#mw-content-text a[href]' );
        for ( var i = 0; i < links.length; i++ ) {
            title = wst.getTitleFromHref( links[i].href );
            if ( title !== null && $.inArray( title, wst.contentTitles ) !== -1 ) {
                id = wst.classPrefix + wst.encodeAllSpecial( title );
                links.eq(i).on( 'mouseover', { id : id, title : title }, function( event ) { wst.showTooltip( event ); } );
                links.eq(i).on( 'mousemove', { id : id }, function( event ) { wst.moveTooltip( event ); } );
                links.eq(i).on( 'mouseout', { id : id }, function( event ) { wst.hideTooltip( event ); } );
            }
        }
    },

    showTooltip : function( event ) {
        tooltipBox = $( '#' + event.data.id );
        wst.positionTooltip( event.data.id, event.pageX, event.pageY );
        tooltipBox.fadeIn();

        if ( !tooltipBox.hasClass( 'loaded' ) && !tooltipBox.hasClass( 'loading' ) ) {
            tooltipBox.addClass( wst.classPrefix + 'loading' );
            wst.beginLoadTooltip( event.data.id, event.data.title );
        }
    },

    beginLoadTooltip : function( id, title ) {
        $.ajax( {
             type: 'POST',
             url: mw.util.wikiScript( 'api' ),
             data: { action: 'parse', format: 'json', title: title.replace( /_/, ' ' ),
                 text: '{{:' + title + wst.dataSubpageTitle + '|' + wst.loadedTemplate + '}}' },
             dataType: 'json',
             success: function( jsonData ) { wst.finishLoadTooltip( id, jsonData ); }
        } );
    },

    finishLoadTooltip : function( id, jsonData ) {
        tooltipBox = $( '#' + id );
        tooltipBox.addClass( 'loaded' );
        tooltipBox.removeClass( 'loading' );
        tooltipBox.html( jsonData.parse.text['*'] );
    },

    moveTooltip : function( event ) {
        wst.positionTooltip( event.data.id, event.pageX, event.pageY );
    },

    positionTooltip: function( id, pageX, pageY ) {
        var tooltip = $( '#' + id );
        var bodyOffsets = document.body.getBoundingClientRect();
        var bodyX = pageX - bodyOffsets.left;
        var bodyY = pageY - bodyOffsets.top;
        var scrollX = $( document ).scrollLeft();
        var scrollY = $( document ).scrollTop();
        var bodyWidth = $( 'body' ).width();
        var bodyHeight = $( 'body' ).height();
        var viewWidth = $( window ).width();
        var viewHeight = $( window ).height();
        var topAdjust = 6;

        if ( tooltip.width() * 1.1 > pageX - scrollX ) {
            tooltip.css( { 'left' : bodyX - scrollX + 15, 'right' : 'auto' } );
            topAdjust = 36;
        } else {
            tooltip.css( { 'right' : bodyWidth - bodyX + scrollX + 6, 'left' : 'auto' } );
        }

        if ( tooltip.height() * 1.5 > pageY - scrollY ) {
            tooltip.css( { 'top' : bodyY - scrollY + topAdjust, 'bottom' : 'auto' } );
        } else {
            tooltip.css( { 'bottom' : bodyHeight - bodyY + scrollY + 3, 'top' : 'auto' } );
        }
    },

    hideTooltip : function( event ) {
        $( '#' + event.data.id ).fadeOut();
    }

};

$( document ).ready( wst.beginLinkSetup );

/***********************************
/* End Wiki Subpage Tooltip Script *
/***********************************/

/**************************************************************************************
/* Show All / Hide All extension to Media Wiki's Collapsible functionality
/*
/* Contract:
/*
/*   For every pair of elements of class mw-customtoggle and mw-collapsible,
/*   the elements must also have a matching class in the front of their list of classes
/*   not including mw-showall or mw-hideall.
/*   For every Show All or Hide All link/button, this class must be the first class
/*   not including mw-showall or mw-hideall.
/*
/*   We just so happen to be hijacking the 'plainlinks' class for this purpose,
/*   but that does not have to be the case.  Any other class should work.
/***************************************************************************************/
// Author:  Gregory LaVerde Arthur Kuns
// Date:    2016-Oct-24
// License: CC-BY 3.0
// Version: beta

var glakSHA = glakSHA || {

  // This is the class that Media Wiki puts the action on.
  toggleClass: 'mw-customtoggle',

  // This is the class that Media Wiki collapses and expands.
  collapsibleClass: 'mw-collapsible',

  // This is the class that Media Wiki assigns to collapsibleClass that it collapsed.
  collapsedClass: 'mw-collapsed',

  showAllClass: 'mw-showall',
  hideAllClass: 'mw-hideall',

  // Lazily loaded pairs of toggleClass:collapsedClass in FIFO order.
  // See unused function below, for performance hope I won't have to use it!
  showHidePairs: {},

  findToggles : function( collpsPairClass ) {
    return document.getElementsByClassName(collpsPairClass+' '+this.toggleClass)
  },

  findCollapsibles : function( collpsPairClass ) {
    return document.getElementsByClassName(collpsPairClass+' '+this.collapsibleClass)
  },

  /*
   * This function is not used.
   *
   * Examples kept in case order is necessary:
   *
   *   toggles = this.getOrderedElementsByClassName(this.getToggleClass(collpsPairClass), function(a, i){return {index: i, value: a.className.split(/[ -]/)[3]}});
   *   collapsibles = this.getOrderedElementsByClassName(this.getCollapsibleClass(collpsPairClass), function(a, i){return {index: i, value: a.id.split(/[ -]/)[2]}});
   */
  getOrderedElementsByClassName : function( objects, mapFn ) {

    var mapped;
    mapped = Array.prototype.slice.call(objects).map(mapFn);
    mapped.sort(function(a, b) {
      return a.value > b.value ? 1 : (a.value < b.value ? -1 : 0);
    });

    return mapped.map(function(el){
      object = objects[el.index];
      object.idglak = el.value;
      return object;
    });
  },

  // Assert function meant to catch contract violations.
  // Assert that toggle has a matching collapsible and vice versa.
  assertIdglakArrays : function( arri, arriName, arrj, arrjName ) {

    if (arri.length != arrj.length) {
      console.log(arri.length+' of '+arriName+' is not '+arrj.length+' like '+arrjName);
    }

    for (var i=0; i<arri.length; i++) {
      var idglak = arri[i].idglak;
      if (idglak) {
        var matches = [];
        for (var j=0; j<arrj.length; j++) {
          if (idglak == arrj[j].idglak) {
            matches.push(idglak);
          }
        }
        if (matches.length == 0) {
          console.log((idglak ? idglak : '') +' in '+arriName+' is not in '+arrjName);
        }
      }
    }

    return arri;
  },

  // Lazily capture mw-customtoggle objects
  getToggles : function( collpsPairClass ) {

    if (!(collpsPairClass in this.showHidePairs)) {
      this.showHidePairs[collpsPairClass] = {};
    }

    var collapsiblePair = this.showHidePairs[collpsPairClass];

    if (this.toggleClass in collapsiblePair) {
      return collapsiblePair[this.toggleClass];
    }

    collapsiblePair[this.toggleClass] = this.findToggles(collpsPairClass);

    if (collpsPairClass in collapsiblePair) {
      assertIdglakArrays(
        collapsiblePair[this.toggleClass],
        this.toggleClass,
        collapsiblePair[this.collapsibleClass],
        this.collapsibleClass
      );
    }

    return collapsiblePair[this.toggleClass];
  },

  // Lazily capture mw-collapsible objects
  getCollapsibles : function( collpsPairClass ) {

    if (!(collpsPairClass in this.showHidePairs)) {
      this.showHidePairs[collpsPairClass] = {};
    }

    var collapsiblePair = this.showHidePairs[collpsPairClass];

    if (this.collapsibleClass in collapsiblePair) {
      return collapsiblePair[this.collapsibleClass];
    }

    collapsiblePair[this.collapsibleClass] = this.findCollapsibles(collpsPairClass);

    if (this.toggleClass in collapsiblePair) {
      this.assertIdglakArrays(
        collapsiblePair[this.collapsibleClass],
        this.collapsibleClass,
        collapsiblePair[this.toggleClass],
        this.toggleClass
      );
    }

    return collapsiblePair[this.collapsibleClass];
  },

  /*
   * Add onclick events to DOM objects for showing/hiding all collapsible tables.
   * The show/hide DOM objects specify what class to do a match with the other two sets of DOM objects.
   * Different show/hide classes allow for multiple Show All / Hide All buttons if necessary.
   */
  showHideAddOnclick : function( sHAClass, doCollapse ) {

    // Get all of the elements matching sHAClass to accept the onclick function
    var sHAArr = document.getElementsByClassName(sHAClass);

    // there should only be one, but just being sure
    for ( var i = 0; i < sHAArr.length; i++ ) {
      var a = sHAArr[i];

      // Remove the sHAClass from an array copy of the classes of a
      // a.class is always empty
      var classesArr = jQuery.grep(a.className.split(' '), function(value) {
        return value != sHAClass;
      });
      var collpsPairClass = classesArr[0];

      // Add the show all / hide all closure to list of functions
      // to call during the onclick event of the show all / hide all button
      a.onclick = function(e) {
        // Prevent redirect on click!!!
        e.preventDefault();

        var collapsibles = glakSHA.getCollapsibles(collpsPairClass);
        var toggles = glakSHA.getToggles(collpsPairClass);

        // Act like a user clicking the toggling elements to
        // appropriately show or hide their collapsible entities
        for (var i=0;i<toggles.length;i++) {
          var isCollapsed = $(collapsibles[i]).hasClass(glakSHA.collapsedClass);

          if ((isCollapsed || doCollapse) &&
              !(isCollapsed && doCollapse)) {
            toggles[i].click();
          }
        }

        // Prevent redirect on click!!!
        return false;
      };
    }
  },

  // Add onclick events to showAllClass and hideAllClass DOM objects
  beginShowHideAllSetup : function() {
    glakSHA.showHideAddOnclick(glakSHA.showAllClass, false);
    glakSHA.showHideAddOnclick(glakSHA.hideAllClass, true);
  }
};

// Attach all Javascript-enable functionality to DOM objects after the page loads.
$( document ).ready( glakSHA.beginShowHideAllSetup );

/******************************************************************************
/* End Show All / Hide All extension to Media Wiki's Collapsible functionality
/******************************************************************************/