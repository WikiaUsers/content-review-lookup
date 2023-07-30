/* Any JavaScript here will be loaded for all users on every page load. */

/* Format appearances and references sections */

$('h2:contains("Appearances and references")+ol').wrap('<div id="appearances-and-references"/>');

var listItems = $('div#appearances-and-references > ol > li > ol > li');

var subLists = $('div#appearances-and-references > ol > li > ol');

function button(){
  var buttonOne = $('<a>').html('Show/Hide').css('cursor','pointer').click(function(){
    if (subLists.css('display') == 'none'){
      subLists.css('display', 'block');
    } else {
      subLists.css('display', 'none');
    }
  });

  return buttonOne;
}

if (listItems.length < 10){
  subLists.css('display', 'block');
} else {
  subLists.css('display', 'none');
}

$('div#appearances-and-references').prepend('<span id="appearances-and-references-desc">This list of appearances and references includes '+listItems.length+' items.</span>');

$('span#appearances-and-references-desc').append(' (').append(button()).append(')');

/* Hide link returning to base page on subpages in the main namespace */

if(mw.config.get('wgNamespaceNumber') === 0){
  document.getElementsByClassName('page-header__page-subtitle')[0].style.display = 'none';
}