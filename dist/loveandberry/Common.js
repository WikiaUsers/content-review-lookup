/* Any JavaScript here will be loaded for all users on every page load. */

// Featured Song Selector / Featured Card Selector (Trial Run)
// Function to randomly pick any one of the set data items to display on the main page when the said page is opened. Changes every time the page is loaded.
// LoliJuicy: This is a trial run to see if the result is expected, and whether the feature is nice...
importArticles({
  type: 'script',
  articles: [
    'MediaWiki:CardData.js',
    'MediaWiki:SongData.js',
  ]
}).then(function() {
    // Show Featured Songs

	// REDUNDANT CODE //
    // Selects a random featured song to display, it picks a random index of the current item list
    //var selectedSong = featuredSong[Math.floor(Math.random() * featuredSong.length)];

    // Swap out with placeholder content from template FeaturedSong
    //$('.featured-song-content').html(selectedSong);
    // END //
    
  	// Try to load embed JSON  
	if (window.songList && window.songList.length) {
		var randomSong = window.songList[Math.floor(Math.random() * window.songList.length)];
	
		$('.featured-song-content').html(`
		  <div>
		    ${randomSong.figure}
		    ${randomSong.para}
		    ${randomSong.link}	        
		  </div>
		`);
		
		console.log("song loaded");
	}
	
    // Show Featured Cards
	//console.log('Data:', window.cardList);
	// Try to load embed JSON
	  if (window.cardList && window.cardList.length) {
	    var randomCard = window.cardList[Math.floor(Math.random() * window.cardList.length)];
	    
		//console.log(randomCard.image);
		
	    $('.featured-card-content').html(`
	      <div>
	        <figure class="mw-halign-center" typeof="mw:File">
	          <a href="${randomCard.link}" class="mw-file-description image">
	            <img src="${randomCard.image}" decoding="async" loading="lazy" width="180" class="mw-file-element ls-is-cached lazyloaded"  data-relevant="0" data-src="${randomCard.image}">
	          </a>
	          <figcaption></figcaption>
	        </figure>
	        <p style="margin: 10px; text-align: justify;">
	          <span style="font-weight: bold;">${randomCard.name}</span> ${randomCard.desc}
	        </p>
	        <p style="margin: 10px;">
	          <a href="${randomCard.link}" title="${randomCard.name}">Read more...</a>
	        </p>
	      </div>
	    `);
	    
	    console.log("card loaded");
	  }
}).catch(err => {
  console.error('Failed to load content:', err);
});