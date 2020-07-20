if(wgPageName === "MeerUndMehr:Portale") {
$("#portal-sidebar div").each(function() {
var name = $(this).attr('data-portalname');
var name_underscore = name.replace(" ", "%20");

var portal_url = "http://de.fanfictions.wikia.com/api.php?action=query&list=categorymembers&cmtitle=Category:" + name_underscore +  "-Fanfiction&cmsort=timestamp&cmdir=desc&cmnamespace=112&format=json";

//$("div.modul[data-portalname='" + name + "']").html("Hallo");

$.getJSON(portal_url, function(data) {

geschichte1 = data.query.categorymembers[0].title;
geschichte2 = data.query.categorymembers[1].title;

var slicingArray = [];

slicingArray[0] = geschichte1.slice(11);
slicingArray[1] = geschichte2.slice(11);
		
	$("div.modul[data-portalname='" + name + "']").html("<h3>" + name + "-Geschichten</h3><li><a href='/" + data.query.categorymembers[0].title +"'>" + slicingArray[0] + "</li></a>" + "<li><a href='/" + data.query.categorymembers[1].title +"'>" + slicingArray[1] + "</a></li>");
});

});
}
if(wgPageName === "MeerUndMehr:Portale/Genre") {
$("#portal-sidebar div").each(function() {
var name = $(this).attr('data-portalname');
var name_underscore = name.replace(" ", "%20");

var portal_url = "http://de.fanfictions.wikia.com/api.php?action=query&list=categorymembers&cmtitle=Category:Genre_-_" + name_underscore +  "&cmsort=timestamp&cmdir=desc&cmnamespace=112&format=json";

//$("div.modul[data-portalname='" + name + "']").html("Hallo");

$.getJSON(portal_url, function(data) {

geschichte1 = data.query.categorymembers[0].title;
geschichte2 = data.query.categorymembers[1].title;

var slicingArray = [];

slicingArray[0] = geschichte1.slice(11);
slicingArray[1] = geschichte2.slice(11);
		
	$("div.modul[data-portalname='" + name + "']").html("<h3>" + name + "-Geschichten</h3><li><a href='/" + data.query.categorymembers[0].title +"'>" + slicingArray[0] + "</li></a>" + "<li><a href='/" + data.query.categorymembers[1].title +"'>" + slicingArray[1] + "</a></li>");
});

});
}