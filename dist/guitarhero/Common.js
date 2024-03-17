/* Any JavaScript here will be loaded for all users on every page load. */
GetEmbeddedWidget = function() {

var blip_elements = getElementsByClassName(document.getElementById('bodyContent'),'div','wikia_widget');
 for(var i = 0; i < blip_elements.length; i++){
 blip_elements[i].innerHTML = "<object width='480' height='401' id='FiveminPlayer' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'><param name='allowfullscreen' value='true'/><param name='allowScriptAccess' value='always'/><param name='movie' value='http://www.5min.com/Embeded/4554601/&sid=163'><embed src='http://www.5min.com/Embeded/4554601/&sid=163' type='application/x-shockwave-flash' width='480' height='401' allowfullscreen='true' allowScriptAccess='always'></embed></object><br/><span style='font-family: Verdana; font-size: 10px;'>More <a href='http://www.5min.com/Category/Music/Guitar' target='_blank'>Guitar Lessons</a> at 5min.com <http://5min.com></span>";
 }
};

YAHOO.util.Event.onDOMReady(GetEmbeddedWidget);