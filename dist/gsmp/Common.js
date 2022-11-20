/* Any JavaScript here will be loaded for all users on every page load. */

// Genius embed integration code:
var emb = document.querySelector(".rg_embed_link"); // Elements handled with {{GeniusLyrics}}
if (emb != undefined) {
    console.log("Genius embed detected on page",emb);
    var songId = emb.getAttribute("data-song-id"); // We grab the song ID from the template
    
    var scr = document.createElement("script");
    scr.setAttribute("src","//genius.com/songs/"+songId+"/embed.js"); // We insert the applicable Genius embed code - this will replace the template with lyrics and annotations from Genius
    
    var ifr = document.createElement("iframe");
    emb.appendChild(ifr);
    //ifr.contentDocument.open();
    ifr.contentDocument.body.appendChild(scr);
    setTimeout(function(){ifr.contentDocument.close()},1000);
    
    console.log("Genius embed for song",songId,"successfully embedded");
}