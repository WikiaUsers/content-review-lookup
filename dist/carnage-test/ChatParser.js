(function(factory){
    var deferred = $.Deferred();
    
    var timeout = setTimeout(function(){
        clearTimeout(timeout);
        timeout = null;
        
        if (!("mainRoom" in window)) return;
        
        window.mainRoom.socket.bind("initial", deferred.resolve.bind(deferred));
    }, 2000);
    
    $.when(deferred).done(factory);
}(function(){
    console.log(window.mainRoom);
}));