// If on a user or user talk page, and not a subpage...
if ((wgNamespaceNumber == 2 || wgNamespaceNumber == 3) &&
    !/\//.test(wgTitle)) {
  // add a hook to...
  $(function() {
    // init AJAX and request the user's gender from the API
    var a = sajax_init_object();
    a.open("GET", wgServer + wgScriptPath + 
                  "/api.php?format=json&action=query&list=users&ususers=" + 
                  escape(wgTitle.replace(/ /, "_")) + "&usprop=gender",
           true);
 
    // when response arrives...
    a.onreadystatechange = function() {
      if(a.readyState == 4 && a.status == 200) {
        // parse the JSON response
        var genderText = 
          eval("(" + a.responseText + ")").query.users[0].gender;
 
        // U+2640 and U+2642 are female and male signs respectively.
        var genderSymbol = "";
        if (genderText == "female") {
          genderSymbol = "<span class=\"female-icon\">&#x2640;</span>";
        } else if (genderText == "male") {
          genderSymbol = "<span class=\"male-icon\">&#x2642;</span>";
        }
 
 
        // if gender was specified, append the symbol
        if (genderSymbol != "") {
          document.getElementById("firstHeading").innerHTML += 
            "&nbsp;" + genderSymbol;
        }
      }
    };
 
    // send the API request
    a.send();
  });
}