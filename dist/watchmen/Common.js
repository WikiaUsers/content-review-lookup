/* Any JavaScript here will be loaded for all users on every page load. */
/* Watchmen website widget */
GetEmbeddedWidget = function() {
var blip_elements = getElementsByClassName(document.getElementById('bodyContent'),'div','wikia_widget');
 for(var i = 0; i < blip_elements.length; i++){
 blip_elements[i].innerHTML = "<object width='375' height='375'><param name='wmode' value='transparent' /><param name='allowFullScreen' value='true' /><param name='movie' value='http://www.ppiwidget.com/campaigns/as3base.swf?inst_id=162489'/><embed src='http://www.ppiwidget.com/campaigns/as3base.swf?inst_id=162489' type='application/x-shockwave-flash' width='375' height='375' wmode='transparent' allowFullScreen='true'></embed></object>";
 }
}
jQuery(document).ready(GetEmbeddedWidget);