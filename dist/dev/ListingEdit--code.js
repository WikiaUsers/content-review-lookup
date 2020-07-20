/* <syntaxhighlight lang="javascript"> */
window.ListingEdit = {
  init: function() {
      var listingCat, listingPages, lists, cats, inputWrap, inputBox, inputButton;
      listingCat = this.listingCat || /^Category:List\s/;
      listingPages = this.listingPages || false;
      // Fetch the categories on the page.
      cats = document.getElementById( "mw-normal-catlinks" ).getElementsByTagName( "ul" )[0].getElementsByTagName( "a" );	
      // Analyze the categories, and test them against the given regex.
      for ( i = 0; i < cats.length; i++ ) {
	if ( listingCat.test( cats[i].getAttribute( "title" ) ) || ( listingPages && mw.config.get( "wgPageName" ) === listingPages[i] ) ) {
	  lists = document.getElementById( "mw-content-text" ).getElementsByTagName("ul");
	  for ( j = 0; j < lists.length; j++ ) {
	    // If we have a match, discard any lists from the content that are part of the ToC etc.
	    if ( lists[j].parentNode.nodeName === "DIV" ) {
	      // Create the interface, loading custom settings.
	      inputWrap = document.createElement( "li" );
	      inputWrap.textContent = this.inputDescr || "Add a new element to the listing:";
	      inputBox = document.createElement( "input" );
	      inputBox.id = "listing-edit";
	      inputBox.type = "text";
	      inputWrap.appendChild(inputBox);
	      inputButton = document.createElement( "button" );
	      inputButton.id = "listing-update";
	      inputButton.textContent = this.buttonLabel || "Update!";
	      inputButton.addEventListener( "click", function() {
		// Submit the section heading's id for unique identification.
		var currentElem = document.getElementById( "listing-update" ).parentElement.parentElement, myId;
		while ( currentElem.previousElementSibling.nodeName.indexOf( "H" ) === -1 ) {
		  currentElem = currentElem.previousElementSibling;
		}
		myId = currentElem.previousElementSibling.childNodes[0].id;
		ListingEdit.onSubmit( myId )		
	      }, false );
	      inputWrap.appendChild( inputButton );
	      lists[j].appendChild( inputWrap );
	    }
	  }
	  break;
	}
      }
  },
  onSubmit: function(listId) {
    var headings, newItem, xhr, i;
    // Find which heading this textbox is at so that the specified section will be edited.
    headings = document.getElementsByClassName( "mw-headline" );
    for ( i = 0; i < headings.length; i++ ) {
      if ( headings[i].id === listId ) {
	break;
      }
    }
    // Get the value to be added.
    newItem = document.getElementById( "listing-edit" ).value;
    // Make the edit in an XMLHttpRequest.
    xhr = new XMLHttpRequest();
    xhr.open( "POST", "/api.php" );
    xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded; charset=UTF-8" );
    xhr.send( "action=edit&title=" + encodeURIComponent( mw.config.get( "wgPageName" ) ) + "&token=" + encodeURIComponent( mw.user.tokens.get( "editToken" ) ) + "&summary=Updated+listing&section=" + encodeURIComponent( String( i+1 ) ) + "&appendtext=\n*" + encodeURIComponent( newItem ) );
  }
}
/* </syntaxhighlight> */