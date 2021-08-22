/* Any JavaScript here will be loaded for all users on every page load. */

// Make selected images twice the size, since the game does that  
function resizeAllTableImages() {
    const imgs = document.querySelectorAll(".image2x");
    imgs.forEach(function(img) {
        img.width *= 2;
        img.height *= 2;
    });
}

mw.hook('wikipage.content').add(function () {
    resizeAllTableImages();
});

//Automatically expand pages to full-width and hide right bar on FandomDesktop by default
$(function() {
    if( !$('body.skin-fandomdesktop').length ){
        return;
    }
    //common.js is loaded BEFORE skin.fandomdesktop.js module.
    mw.loader.using("skin.fandomdesktop.js").then(function(){
        if( !$('.is-content-expanded').length ){
            if( ((mw.config.get("wgUserName") === null) ? localStorage.contentwidth : mw.user.options.get('contentwidth')) !== "collapsed"){
                $("button.content-size-toggle").click();
            }
        }
        if( !$('aside.page__right-rail.is-rail-hidden').length ){
            if( (mw.config.get("wgUserName") !== null) && (mw.user.options.get('rightrailvisible') !== "visible") ){
                $("button.right-rail-toggle").click();
            }
        }
    });
    
});