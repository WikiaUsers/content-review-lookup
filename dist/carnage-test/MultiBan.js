(function($, mw, mainRoom){
    if (typeof window.MultiBan === 'function') return;
    function MultiBan(){}
    
    $.extend(MultiBan.prototype, {
        version: '0.0.1',
        loaded: false,
        userData: mainRoom.model.users.map(function(child){
            var obj = {};
            obj.name = child.attributes.name;
            obj.avatar = child.attributes.avatar;
            obj.isMod = child.attributes.isModerator;
            return obj;
        })
    });
}(jQuery, mediaWiki, mainRoom));