/* Any JavaScript here will be loaded for all users on every page load. */

//HoverAndLoad: When hovering over a span, add an image related to the text in the span, that is hidden unless you hover over the span
   function HoverAndLoad(e) {
      //Add the class that hides the image when not hovered
      e.target.className = e.target.className + ' hover';
      var searchText = e.target.innerHTML;
      searchText.replace(' ', '+')
      //Get the name of the card to be shown
      
      var queryURL = 'https://api.scryfall.com/cards/named?exact=' + searchText + '&format=image&version=small';
      //API call that returns a small image
      
      e.target.innerHTML = e.target.innerHTML + '<span><img src="' + queryURL + '"></span>';
      //Add the image... Is still only visible while hovering
   
      e.target.removeEventListener("mouseenter", HoverAndLoad);
      //DON'T DO IT AGAIN! since we've done it now
   }

//When loading, find all span tags with the ShowCard class, and setup HoverAndLoad() on them... only run it WHEN they Hover!
   window.onload = function() {
   //Find all spans with 'ShowCard'...
   var toShow = document.getElementsByClassName("ShowCard");
   console.log('FOUND ' + toShow.length + ' CARDS!');
   if (false) {
	//alert('FOUND ' + toShow.length + ' CARDS!');
   }
   for (count = 0; count < toShow.length; count++) {
   		//And make them show the Card of the same name ONLY when HOVERED
        toShow[count].addEventListener("mouseenter", HoverAndLoad);
   	}
   	alert('DONE!');
   }