// 20:25, December 14, 2014 (UTC)
// <source lang="JavaScript">

// JS for the ProfileMastheads
// From User:Rappy 4187

// Put Status Indicator (ATW:SI) in ProfileMasthead
$(function() {

  // Temporary support for Template:Statustop2
  if ($('.status.helpcursor').length) {
    switch( skin ) {
      case 'monobook':
        $('.status.helpcursor').appendTo('#firstHeading').css({float: 'right', fontSize: '12px', marginRight: '10px'}).prepend('Status: ').css('font-weight','bold');
        break;
      case 'oasis':
      case 'wikia':
        $('<li id="mastheadstatus"><span>Status</span></li>').prependTo('.masthead-info .details');
        $('.status.helpcursor').appendTo('.details li:first');
        break;
    }
  }
});

// </source>