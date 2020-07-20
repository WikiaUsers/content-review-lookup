// Cancel Edit Button
 
$(function addCancel () { 
  if (typeof(wgIsEditPage) != 'undefined') { 
  $('<span id="cancelbutton" class="button" style="margin-top:2px, text-decoration:none"><a id="cancelbuttonlink" href="/wiki/'+ wgPageName +'"><span style="color:#FFFFFF">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
  }
});

// Changes text of "What links here" button (capitalizing "L" and "H" in "links" and "here")

/* $('#PageHeader a[href^="/wiki/Special:WhatLinksHere"]').text('What Links Here'); */