$(".quiz").click(function() {
    var num = this.id;
    console.log(num);
    if(num == "0") {
        location.href = "http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/end";
    }
    else if(num == "00") {
        location.href = "http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/termination";
    }
    else if(num == "1") {
        var myWindow = window.open("http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/start", "", "height=600, width=800");
    }
    else if(num == "h1") {
        var myWindow = window.open("http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/9", "", "height=600, width=800");
    }
    else if(num == "h2") {
        var myWindow = window.open("http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/3", "", "height=600, width=800");
    }
    else if(num == "h3") {
        var myWindow = window.open("http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/4", "", "height=600, width=800");
    }
    else if(num == "c1") {
        var myWindow = window.open("http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/5", "", "height=600, width=800");
    }
    else if(num == "c2") {
        var myWindow = window.open("http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/6", "", "height=600, width=800");
    }
    else if(num == "log") {
        var myWindow = window.open("http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/7", "", "height=600, width=800");
    }
    else if(num == "users") {
        var myWindow = window.open("http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/11", "", "height=600, width=800");
    }
    else if(num == "edit") {
        var myWindow = window.open("http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/12", "", "height=600, width=800");
    }
    else {
        num = (Number(num) * 2) + 4;
        location.href = "http://lmbw.wikia.com/wiki/User:Drew1200/LMBW Quiz/"+num;
    }
});

/*
if(wgUserName == "Drew1200") {
    document.getElementById("nav.wikia-menu-button").style.display = "block";
    sheet.insertRule(' nav.wikia-menu-button { display: block !important; }', sheet.cssRules.length);
}*/