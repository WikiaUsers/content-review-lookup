document.getElementsByTagName('body')[0].onload = function() {
    old = document.title;
    unread = 0;
     
    mainRoom.model.chats.bind("afteradd", function() {
        if(!document.hasFocus()){
            unread++;
            document.title = "(" + unread + ") " + old;
        }
    });
 
    window.onfocus = function() {
        document.title = old;
        unread = 0;
    }
};