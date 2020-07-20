;(function loadUntilMainRoom(mw, $, mainRoom){
    if (typeof window.mainRoom == 'undefined'){
        setInterval(loadUntilMainRoom, 500);
        return;
    }
    
    
})(this.mediaWiki, this.jQuery, this.mainRoom);