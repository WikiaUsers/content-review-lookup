/**
 * Account Age - Displays how many days old a user's account is
 *
 * Based off of Shining-Armor's UserInfo.js, found on [[w:c:shining-armor]]; currently is a work in progress
 */
 
var KC = window.KC || {};
 
KC.widget = KC.widget || {};
KC.widget.info = {};
 
KC.widget.info.data = {};
 
KC.widget.info.fn = {};
KC.widget.info.fn.ui = {};
KC.widget.info.fn.ui.loader = {};
KC.widget.info.fn.ui.table = {};
KC.widget.info.fn.data = {};
 
KC.widget.info.fn.ui.loader.updateLoadingIcon = function( m ) {
  document.getElementById( 'kc-account-age' ).textContent = m;
};
 
KC.widget.info.fn.ui.loader.loggedIn = function() {
  var message;
 
  if ( typeof KC.widget.info.data.userName === 'string' ) {
    message = 'Loading your registration data ' + KC.widget.info.data.userName + '! One moment...';
    KC.widget.info.fn.ui.loader.updateLoadingIcon( message );
    KC.widget.info.data.status = true;
  } else {
    message = 'Please login to use this widget!';
    KC.widget.info.fn.ui.loader.updateLoadingIcon( message );
    KC.widget.info.data.status = false;
  }
};
 
SA.widget.info.fn.ui.table.init = function() {
  KC.widget.info.data.table = document.createElement( 'table' );
  KC.widget.info.data.tableHeading = document.createElement( 'tr' );
  KC.widget.info.data.tableBody = document.createElement( 'tr' );
 
  KC.widget.info.data.table.setAttribute( 'class', 'wikitable' );
};
 
KC.widget.info.fn.ui.table.addEntry = function( k, v ) {
  var col, row;
 
  if ( k === 'registration' ) {
    v = KC.widget.info.fn.data.parseTimeStamp( v );
  }
 
  row = document.createElement( 'td' );
  row.textContent = k;
 
  col = document.createElement( 'td' );
  col.textContent = v;
 
  KC.widget.info.data.tableHeading.appendChild( row );
  KC.widget.info.data.tableBody.appendChild( col );
};
 
KC.widget.info.fn.ui.table.print = function() {
  KC.widget.info.data.table.appendChild( KC.widget.info.data.tableHeading );
  KC.widget.info.data.table.appendChild( KC.widget.info.data.tableBody );
  document.getElementById( 'kc-account-age' ).textContent = '';
  document.getElementById( 'kc-account-age' ).appendChild( KC.widget.info.data.table );
};
 
KC.widget.info.fn.data.parseTimeStamp = function( ts ) {
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
 
KC.widget.info.fn.init = function() {
  KC.widget.info.data.userName = mw.config.get( 'wgUserName' );
  KC.widget.info.fn.ui.loader.loggedIn();
  if ( KC.widget.info.data.status === false ) return;
  KC.widget.info.fn.data.fetchUserInfo();
};
 
KC.widget.info.fn.init();