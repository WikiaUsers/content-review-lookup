$(function(){
    //If an element with the remove background class is on the page, remove the background.
    if($(".Custom-Userpage-Background").length){
        $("body").removeClass("background-dynamic");
    } else {
        var Userpage;
        
        //If on a users own personal userspace area, check for a tag
        //in the body element that indicates the users username.
        $.each($("body").attr("Class").split(" "), function( i, val ){
            if (val.match(/page-User_([a-zA-Z0-9]+)/i) && val.match(/page-User_([a-zA-Z0-9]+)/i)[1] !== "blog"){
                Userpage = val.match(/page-User_([a-zA-Z0-9]+)/i)[1];
            } else if (val.match(/page-User_blog_([a-zA-Z0-9]+)/i)){
                Userpage = val.match(/page-User_blog_([a-zA-Z0-9]+)/i)[1];
            } else if (val.match(/page-Message_Wall_([a-zA-Z0-9]+)/i)){
                Userpage = val.match(/page-Message_Wall_([a-zA-Z0-9]+)/i)[1];
            } else if (val.match(/page-Special_Contributions_([a-zA-Z0-9]+)/i)){
                Userpage = val.match(/page-Special_Contributions_([a-zA-Z0-9]+)/i)[1];
            }
        });
        
        //If a username was found, generate a link to their userpage
        if (Userpage && NoBackgroundUserpages[Userpage]){
            $("body").removeClass("background-dynamic");
        }
    }
});