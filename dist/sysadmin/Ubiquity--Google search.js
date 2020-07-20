 CmdUtils.makeSearchCommand({
  names: ["g"],
  url: "http://www.google.com/search?q={QUERY}",
  license: "Derived from the built-in feeds in Ubiquity. Somebody please update the license here.",
  icon: "chrome://ubiquity/skin/icons/google.ico",
  description: "Searches Google for your words.",
  help: "You can use the keyboard shortcut ctrl + alt + number to open one " +
        "of the Google results shown in the preview.",
  preview: function(pblock, {object}) {
    var searchTerm = object.text;
    // Don't even display any text before fetching search results,
    // since the results come back nearly instantaneously. In the
    // future, we can display a throbber.
    if(searchTerm.length < 1) {
      pblock.innerHTML = _("Searches Google for your words.");
      return;
    }
    
    var url = "http://ajax.googleapis.com/ajax/services/search/web";
    var params = { v: "1.0", q: searchTerm };
    
    CmdUtils.previewGet( pblock, url, params, function(data) {
      var numToDisplay = 3;
      var results = data.responseData.results.splice( 0, numToDisplay );
      
      //for access keys
      for(var i=0;i<results.length;i++){
        var result = results[i];
        result.key = i+1;
      }
      
      var noResultsMessage = _("Your search - ${searchTerm} - did not match any documents.",
                              {searchTerm:searchTerm});
      var tipsMessage = _("Tip: You can go to any result in this preview by pressing control, alt, and the result number at the same time.");
      
      pblock.innerHTML = CmdUtils.renderTemplate(
        jQuery("#google-search", feed.dom).html(),
          { results:results,
            searchTerm:searchTerm,
            noResultsMessage:noResultsMessage,
            tipsMessage:tipsMessage
          });
      }, "json");
  }
 });