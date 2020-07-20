$(function(){
    var points = document.getElementsByClassName("injectBrokenRedirects");
    if (points.length > 0) {
        var queryString = wgServer + "/api.php?action=query&list=querypage&qppage=BrokenRedirects&format=json&qplimit=500&offset=";
        var results = [];
        var performInjection = function(){
            var result = "<ul>";
            var prior = '\n<li> <span class="listRedirectsItem"><a class="text" href="http://' + window.location.hostname + '/wiki/';
            for (var index = 0; index < results.length; index++) {
                result = result + (prior + encodeURIComponent(results[index].split(" ").join("_")) + '?redirect=no">' + results[index] + '</a> → Dead link</span></li>');
            }
            result = result + "\n</ul>";
            for (var index = 0; index < points.length; index++) {
                points[index].innerHTML = result;
            }
            return;
        };
        var getsegment = function(offset) {
          $.getJSON( queryString + offset, function( data ) {
              var items = data.query.querypage.results;
              for (var index = 0; index < items.length; index++) {
                  results[results.length] = items[index].title;
              }
              if (items.length < 500) {
                  performInjection();
                  return;
              }
              getsegment(offset + 500);
              return;
          });
        };
        getsegment(0);
    }
});