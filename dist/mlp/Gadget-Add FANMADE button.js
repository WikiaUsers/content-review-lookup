 if (wgPageName.indexOf("Special:MovePage") != -1 && wgPageName.indexOf("File") != -1){
    $('input#wpNewTitleMain').after("<a class='wikia-button' onclick='$(\"input#wpNewTitleMain\").val(\"FANMADE \"+$(\"input#wpNewTitleMain\").val())' >Add \"FANMADE\"</a>");
  }