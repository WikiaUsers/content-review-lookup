/* Any JavaScript here will be loaded for all users on every page load. */

/*--------------Display clock on navigation corner-----------------*/
importScriptPage('DisplayClock/code.js', 'dev');

/*--------------Create edit summary dropdown in editor----------------*/
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

/*--------------BandCamp Audio Embed for Rocket Lanterns----------------*/
$("#iframeloader").replaceWith('<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=3401474244/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=4252733987/transparent=true/" seamless><a href="http://craftuner.bandcamp.com/album/intersection">INTERSECTION by Farhan</a></iframe>');

/*--------------BandCamp Audio Embed for ^/7(L|?[_(L+#<>+&|^(o)----------*/
$("#hyphen").replaceWith('<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=730206968/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=4228838567/transparent=true/" seamless><a href="http://hyphenjp.bandcamp.com/album/freetracks">Freetracks by Hyphen</a></iframe>');