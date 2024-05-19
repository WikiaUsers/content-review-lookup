// 18:13, February 15, 2017 (UTC)
// <source lang="JavaScript">

// UserInfo - Displays a small table of information about that user
// @author Shining-Armor
// url: http://shining-armor.wikia.com/wiki/MediaWiki:Wikia.js/UserInfo.js
// adapted for SP by SpikeToronto
// Displays at [[Project:User info]]

var SP = window.SP || {};

SP.widget = SP.widget || {};
SP.widget.info = {};

SP.widget.info.data = {};

SP.widget.info.fn = {};
SP.widget.info.fn.ui = {};
SP.widget.info.fn.ui.loader = {};
SP.widget.info.fn.ui.table = {};
SP.widget.info.fn.data = {};

SP.widget.info.fn.ui.loader.updateLoadingIcon = function( m ) {
  document.getElementById( 'sp-user-info' ).textContent = m;
};

SP.widget.info.fn.ui.loader.loggedIn = function() {
  var message;
  
  if ( typeof SP.widget.info.data.userName === 'string' ) {
    message = 'Loading your data ' + SP.widget.info.data.userName + '! One moment...';
    SP.widget.info.fn.ui.loader.updateLoadingIcon( message );
    SP.widget.info.data.status = true;
  } else {
    message = 'Please login to use this widget!';
    SP.widget.info.fn.ui.loader.updateLoadingIcon( message );
    SP.widget.info.data.status = false;
  }
};

SP.widget.info.fn.ui.table.init = function() {
  SP.widget.info.data.table = document.createElement( 'table' );
  SP.widget.info.data.tableHeading = document.createElement( 'tr' );
  SP.widget.info.data.tableBody = document.createElement( 'tr' );
  
  SP.widget.info.data.table.setAttribute( 'class', 'wikitable' );
  SP.widget.info.data.table.setAttribute( 'width', '100%' );
  SP.widget.info.data.table.setAttribute( 'align', 'center' );
};

SP.widget.info.fn.ui.table.addEntry = function( k, v ) {
  var col, row;

  if ( k === 'registration' ) {
    v = SP.widget.info.fn.data.parseTimeStamp( v );
  }

  row = document.createElement( 'td' );
  row.textContent = k;

  col = document.createElement( 'td' );
  col.textContent = v;

  SP.widget.info.data.tableHeading.appendChild( row );
  SP.widget.info.data.tableBody.appendChild( col );
};

SP.widget.info.fn.ui.table.print = function() {
  SP.widget.info.data.table.appendChild( SP.widget.info.data.tableHeading );
  SP.widget.info.data.table.appendChild( SP.widget.info.data.tableBody );
  document.getElementById( 'sp-user-info' ).textContent = '';
  document.getElementById( 'sp-user-info' ).appendChild( SP.widget.info.data.table );
};

SP.widget.info.fn.data.parseTimeStamp = function( ts ) {
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

SP.widget.info.fn.data.fetchUserInfo = function() {
  $.ajax({
    crossDomain: true,
    url: 'http://community.wikia.com/api.php',
    type: 'POST',
    data: {
      action: 'query',
      list: 'users',
      ususers: SP.widget.info.data.userName,
      usprop: 'registration|gender',
      format: 'json'
    },
    dataType: 'JSONP',
    success: function( data ) {
      data = $(data['query']['users']);
      data = data[0];

      console.log( data );

      SP.widget.info.fn.ui.table.init();

      for (var key in data) {
        SP.widget.info.fn.ui.table.addEntry( key, data[key] );
      }

      SP.widget.info.fn.ui.table.print();
    },
    error: function() {
      var message = 'An error occured while fetching your information!';
      SP.widget.info.fn.ui.loader.updateLoadingIcon( message );
    },
  });
};

SP.widget.info.fn.init = function() {
  SP.widget.info.data.userName = mw.config.get( 'wgUserName' );
  SP.widget.info.fn.ui.loader.loggedIn();
  if ( SP.widget.info.data.status === false ) return;
  SP.widget.info.fn.data.fetchUserInfo();
};

SP.widget.info.fn.init();

// </source>