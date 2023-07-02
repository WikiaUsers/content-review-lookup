/**
 * UserInfo - Displays a small table of information about that user
 *
 * @author Shining-Armor
 */
var SA = window.SA || {};
 
SA.widget = SA.widget || {};
SA.widget.info = {};
 
SA.widget.info.data = {};
SA.widget.info.fn = {};
SA.widget.info.fn.ui = {};
SA.widget.info.fn.ui.loader = {};
SA.widget.info.fn.ui.table = {};
SA.widget.info.fn.data = {};

SA.widget.searchButton = document.createElement('a');

SA.widget.info.fn.ui.addButton = function() {
      document.getElementById('sa-user-info').appendChild(SA.widget.searchButton);
};

SA.widget.info.fn.ui.loader.updateLoadingIcon = function( m ) {
  document.getElementById( 'sa-user-info' ).textContent = m;
  SA.widget.info.fn.ui.addButton();
};
 
SA.widget.info.fn.ui.loader.loggedIn = function(i18n) {
  var message;
 
  if (typeof SA.widget.info.data.userName === 'string' ) {
    message = SA.widget.info.data.userName === mw.config.get('wgUserName') ? i18n.msg('loading', SA.widget.info.data.userName).escape() :  i18n.msg('loadingUser', SA.widget.info.data.userName).plain();
    SA.widget.info.fn.ui.loader.updateLoadingIcon( message );
    SA.widget.info.data.status = true;
  } else {
    message = i18n.msg('logIn').plain();
    SA.widget.info.fn.ui.loader.updateLoadingIcon( message );
    SA.widget.info.data.status = false;
  }
};
 
SA.widget.info.fn.ui.table.init = function() {
  SA.widget.info.data.table = document.createElement( 'table' );
  SA.widget.info.data.tableHeading = document.createElement( 'tr' );
  SA.widget.info.data.tableBody = document.createElement( 'tr' );
 
  SA.widget.info.data.table.setAttribute( 'class', 'wikitable' );
};
 
SA.widget.info.fn.ui.table.addEntry = function( k, v ) {
  var col, row;
 
  if ( k === 'Registration' ) {
    v = SA.widget.info.fn.data.parseTimeStamp( v );
  }
 
  row = document.createElement( 'td' );
  row.textContent = k;
 
  col = document.createElement( 'td' );
  col.textContent = v;
 
  SA.widget.info.data.tableHeading.appendChild( row );
  SA.widget.info.data.tableBody.appendChild( col );
};
 
SA.widget.info.fn.ui.table.print = function() {
  SA.widget.info.data.table.appendChild( SA.widget.info.data.tableHeading );
  SA.widget.info.data.table.appendChild( SA.widget.info.data.tableBody );
  document.getElementById( 'sa-user-info' ).textContent = '';
  document.getElementById( 'sa-user-info' ).appendChild( SA.widget.info.data.table );
  SA.widget.info.fn.ui.addButton();
};
 
SA.widget.info.fn.data.parseTimeStamp = function( ts ) {
  // Some accounts made in 2006 or earlier have no registration.
  if (ts === null) {
      return 'N/A';
  }
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
 
SA.widget.info.fn.data.fetchUserInfo = function(i18n) {
  $.ajax({
    crossDomain: true,
    url: 'https://community.fandom.com/api.php',
    type: 'POST',
    data: {
      action: 'query',
      list: 'users',
      ususers: SA.widget.info.data.userName,
      usprop: 'registration|gender',
      format: 'json'
    },
    dataType: 'JSONP',
    success: function( data ) {
      data = $(data['query']['users']);
      data = data[0];
      if (!data) { // Handle invalid usernames
          SA.widget.info.fn.ui.loader.updateLoadingIcon(i18n.msg('not-found', SA.widget.info.data.userName).plain());
          return;
      }
      console.log( data );
 
      SA.widget.info.fn.ui.table.init();
 
      for (var key in data) {
        SA.widget.info.fn.ui.table.addEntry(i18n.msg(key).escape(), data[key]);
      }
 
      SA.widget.info.fn.ui.table.print();
    },
    error: function() {
      var message = i18n.msg('error').plain();
      SA.widget.info.fn.ui.loader.updateLoadingIcon( message );
    },
  });
};
 
SA.widget.info.fn.init = function(username, i18n) {
  SA.widget.info.data.userName = username ? username : mw.config.get( 'wgUserName' );
  SA.widget.info.fn.ui.loader.loggedIn(i18n);
  if ( SA.widget.info.data.status === false ) return;
  SA.widget.info.fn.data.fetchUserInfo(i18n);
  SA.widget.searchButton.classList.add('wikia-button');
  SA.widget.searchButton.textContent = i18n.msg('search').plain();
  SA.widget.searchButton.onclick = function() {
      SA.widget.info.data.userName = prompt(i18n.msg('prompt').plain()) || mw.config.get('wgUserName');
      SA.widget.info.fn.data.fetchUserInfo(i18n);
  }; 
  SA.widget.info.fn.ui.addButton();
};


if (document.getElementById('sa-user-info') !== null) {
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('UserInfo').then(function(i18n) {
            SA.widget.info.fn.init(document.getElementById('sa-user-info').getAttribute('data-username'), i18n);
        });
    });
}

importArticles({
    type: 'script',
    articles: 'u:dev:MediaWiki:I18n-js/code.js'
});