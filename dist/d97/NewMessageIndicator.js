oldTitle = $("title").text();

var counter = 0;

if($("#MsgCount_214").css("display")=="none") {
    document.title = oldTitle;
} else {
    var titleTimerId = setInterval(function(){
        document.title = '('+$("#MsgCount_214").text()+') '+oldTitle;
        counter++;
        if(counter == 5){
            clearInterval(titleTimerId);
        }
    }, 100);
}