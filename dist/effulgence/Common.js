/* Any JavaScript here will be loaded for all users on every page load. */
function loadIntersection(cat1, cat2) {
$.get("http://effulgence.wikia.com/api.php?action=query&list=categoryintersection&limit=100&categories=Category:"+cat1+"|Category:"+cat2+"&format=json", function(data){
  alert("Data: " + JSON.stringify(data));
});
}