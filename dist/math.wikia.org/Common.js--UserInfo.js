// 16:41, February 16, 2017 (UTC)
// <source lang="JavaScript">

// UserInfo - Displays a small table of information about that user
// @author Shining-Armor
// url: http://shining-armor.wikia.com/wiki/MediaWiki:Wikia.js/UserInfo.js
// adapted for MATH by SpikeToronto
// Displays at [[Project:User info]]

var MATH = window.MATH || {};

MATH.widget = MATH.widget || {};
MATH.widget.info = {};

MATH.widget.info.data = {};

MATH.widget.info.fn = {};
MATH.widget.info.fn.ui = {};
MATH.widget.info.fn.ui.loader = {};
MATH.widget.info.fn.ui.table = {};
MATH.widget.info.fn.data = {};

MATH.widget.info.fn.ui.loader.updateLoadingIcon = function( m ) {
  document.getElementById( 'math-user-info' ).textContent = m;
};

MATH.widget.info.fn.ui.loader.loggedIn = function() {
  var message;
  
  if ( typeof MATH.widget.info.data.userName === 'string' ) {
    message = 'Loading your data ' + MATH.widget.info.data.userName + '! One moment...';
    MATH.widget.info.fn.ui.loader.updateLoadingIcon( message );
    MATH.widget.info.data.status = true;
  } else {
    message = 'Please login to use this widget!';
    MATH.widget.info.fn.ui.loader.updateLoadingIcon( message );
    MATH.widget.info.data.status = false;
  }
};

MATH.widget.info.fn.ui.table.init = function() {
  MATH.widget.info.data.table = document.createElement( 'table' );
  MATH.widget.info.data.tableHeading = document.createElement( 'tr' );
  MATH.widget.info.data.tableBody = document.createElement( 'tr' );
  
  MATH.widget.info.data.table.setAttribute( 'class', 'wikitable' );
  MATH.widget.info.data.table.setAttribute( 'width', '100%' );
  MATH.widget.info.data.table.setAttribute( 'align', 'center' );
};

MATH.widget.info.fn.ui.table.addEntry = function( k, v ) {
  var col, row;

  if ( k === 'registration' ) {
    v = MATH.widget.info.fn.data.parseTimeStamp( v );
  }

  row = document.createElement( 'td' );
  row.textContent = k;

  col = document.createElement( 'td' );
  col.textContent = v;

  MATH.widget.info.data.tableHeading.appendChild( row );
  MATH.widget.info.data.tableBody.appendChild( col );
};

MATH.widget.info.fn.ui.table.print = function() {
  MATH.widget.info.data.table.appendChild( MATH.widget.info.data.tableHeading );
  MATH.widget.info.data.table.appendChild( MATH.widget.info.data.tableBody );
  document.getElementById( 'math-user-info' ).textContent = '';
  document.getElementById( 'math-user-info' ).appendChild( MATH.widget.info.data.table );
};

MATH.widget.info.fn.data.parseTimeStamp = function( ts ) {
  var endings = [
    'st',
    'nd',
    'rd',
    'th'
  ];
  var months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };

  var stamps = ts.split( 'T' );

  stamps[1] = stamps[1].replace( 'Z', '' );
  stamps[0] = stamps[0].split( '-' );

  if ( parseInt( stamps[0][2] ) < 10 ) {
    stamps[0][2] = stamps[0][2].replace( '0', '' );
  }

  if ( stamps[0][2] === '1' ) {
    stamps[0][2] += endings[0];
  } else if (  stamps[0][2] === '2' ) {
    stamps[0][2] += endings[1];
  } else if (  stamps[0][2] === '3' ) {
    stamps[0][2] += endings[2];
  } else {
    stamps[0][2] += endings[3];
  }

  return months[stamps[0][1]] + ' ' + stamps[0][2] + ', ' + stamps[0][0] + ' at ' + stamps[1] + ' (UTC)';
};

MATH.widget.info.fn.data.fetchUserInfo = function() {
  $.ajax({
    crossDomain: true,
    url: 'http://community.wikia.com/api.php',
    type: 'POST',
    data: {
      action: 'query',
      list: 'users',
      ususers: MATH.widget.info.data.userName,
      usprop: 'registration|gender',
      format: 'json'
    },
    dataType: 'JSONP',
    success: function( data ) {
      data = $(data['query']['users']);
      data = data[0];

      console.log( data );

      MATH.widget.info.fn.ui.table.init();

      for (var key in data) {
        MATH.widget.info.fn.ui.table.addEntry( key, data[key] );
      }

      MATH.widget.info.fn.ui.table.print();
    },
    error: function() {
      var message = 'An error occured while fetching your information!';
      MATH.widget.info.fn.ui.loader.updateLoadingIcon( message );
    },
  });
};

MATH.widget.info.fn.init = function() {
  MATH.widget.info.data.userName = mw.config.get( 'wgUserName' );
  MATH.widget.info.fn.ui.loader.loggedIn();
  if ( MATH.widget.info.data.status === false ) return;
  MATH.widget.info.fn.data.fetchUserInfo();
};

MATH.widget.info.fn.init();

// </source>