/* Any JavaScript here will be loaded for all users on every page load. *// <source lang="JavaScript">
 
if (typeof (pagediff) == 'undefined') { /* Guard against double inclusions */
 
 var pagediff = {
  page1: "",
  page2: "",
 
  callback: function(jsonobj) {
 
    if( jsonobj && jsonobj.query ) {
     var revid1 = 0;
     var revid2 = 0;
     for (var page in jsonobj.query.pages) {
       var p = jsonobj.query.pages[page];
       if( !revid1 ) revid1 = p.revisions[0].revid;
       else revid2 = p.revisions[0].revid;
     }
    }
    document.location.href = wgScript + "?title=" + encodeURIComponent( "Scratchpad:Pagediff"  )+ "&oldid=" + revid1 + "&diff=" + revid2;
  },
 
  setup: function() {
    pagediff.page1 = getURLParamValue( "oldpage" ).replace( "+", "_" );
    pagediff.page2 = getURLParamValue( "newpage" ).replace( "+", "_" );
 
    importScriptURI( wgScriptPath + "/api.php?action=query&format=json&prop=revisions&rvprop=ids&titles=" + encodeURIComponent(pagediff.page1) + "|" + encodeURIComponent(pagediff.page2) + "&callback=pagediff.callback"  );
  }
 
 }
}
 
pagediff.setup();
 
// </source>