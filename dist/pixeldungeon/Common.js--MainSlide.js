if(wgPageName == 'User:SirPenta/Sandbox'){
    document.getElementById("mPage_Button_Wiki").addEventListener("click", function (e){
        document.getElementById("mPage_Content").style.transform = "translate(0, 0)";
    });
    
    document.getElementById("mPage_Button_Comm").addEventListener("click", function (e){
        document.getElementById("mPage_Content").style.transform = "translate(-52%, 0)";
    });
}