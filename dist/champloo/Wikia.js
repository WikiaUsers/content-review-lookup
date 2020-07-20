/*** Checking my JS from that forum: http://community.wikia.com/wiki/Forum:MediaWiki:Sitenotice_isn%27t_working ***/
$('.WikiaActivityModule').before('<div class="module" id="AirhogsModule"></div>');
$('#AirhogsModule').append('<h1 id="AirhogsNotifictionsHeader" >Notifications</h1>');

$('#AirhogsModule').prepend('<div class="tally counter" style="float: right;"></div>');
$('#AirhogsModule .tally').append('<em id="AirhogsCount"></em>');
if($('#bubbles_count').html() == '') {
  $('#AirhogsCount').html('0');
} else if(document.getElementById('bubbles_count').innerHTML.length < 3) {
  $('#AirhogsCount').html($('#bubbles_count').html());
} else {
  $('#AirhogsCount').html('99<sup>+</sup>');
}
$('#AirhogsModule .tally em').after('<span class="fixedwidth" style="width:75px;">unread messages</span>');

$('#AirhogsModule').append('<div id="AirhogsNotificationsList" class="blurry" style="min-height: 1px; max-height: 1px; opacity: 0; transition: all 1s;-webkit-transition: all 1s;-moz-transition: all 1s;"></div>')

$('#AirhogsModule').append('<hr id="AirhogsNotificationsHR" style="transition:  opacity .5s;-webkit-transition:  opacity .5s;-moz-transition: opacity .5s;"/><div id="AirhogsNotificationsShowHide" class="wikia-menu-button secondary" style="margin: 5px auto; width: 30px; text-align: center; display: block;" onclick="airhogsNavigationShowHideFunction()"><span id="AirhogsNotificationsShowHideSpan" style="display: block; transition:  all .5s 1s;-webkit-transition:  all .5s 1s;-moz-transition: all .5s 1s;">&#9662;</span></div>');

var AirhogsNavigationShow = false;
function airhogsNavigationShowHideFunction() {
  if (AirhogsNavigationShow == false) {
    AirhogsNavigationShow = true;
    $('#AirhogsNotificationsShowHideSpan').css('transform','rotate(180deg)').css('-ms-transform','rotate(180deg)').css('-moz-transform','rotate(180deg)').css('-webkit-transform','rotate(180deg)').css('-o-transform','rotate(180deg)');
    $('#AirhogsNotificationsList').css('min-height', '100px').css('max-height', '100px').css('opacity', '255');
    $('#AirhogsNotificationsHR').css('opacity','0');
  } else {
    AirhogsNavigationShow = false;
    $('#AirhogsNotificationsShowHideSpan').css('transform','rotate(0deg)').css('-ms-transform','rotate(0deg)').css('-moz-transform','rotate(0deg)').css('-webkit-transform','rotate(0deg)').css('-o-transform','rotate(0deg)');
    $('#AirhogsNotificationsList').css('min-height', '1px').css('max-height', '1px').css('opacity', '0');
    $('#AirhogsNotificationsHR').css('opacity','255');
  }
}

$('#AirhogsNotifictionsHeader').css('margin-bottom','0px');

function AirhogsNotificationsFillContent() {
  $('#AirhogsNotificationsList').html(document.getElementsByClassName("notifications-for-wiki-list")[0].innerHTML);
}
setTimeout(AirhogsNotificationsFillContent(), 600);