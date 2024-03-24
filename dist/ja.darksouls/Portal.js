tab = "1";
 
$("#portal_return").click( function() {
    $("#portal_header_"+tab).fadeToggle(300);
    $("#portal_content_"+tab).fadeToggle(300);
    $("#portal_return").fadeToggle(300);
    $("#portal_header_1").delay(300).fadeToggle(300);
    $("#portal_content_1").delay(300).fadeToggle(300);
    tab = "1";
});
 
$("#portal_previous").click( function() {
    switch(tab) {
        case "9":
            $("#portal_header_9").fadeToggle(300);
            $("#portal_content_9").fadeToggle(300);
            $("#portal_header_8").delay(300).fadeToggle(300);
            $("#portal_content_8").delay(300).fadeToggle(300);
            tab = "8";
            break;
        case "8":
            $("#portal_header_8").fadeToggle(300);
            $("#portal_content_8").fadeToggle(300);
            $("#portal_header_7").delay(300).fadeToggle(300);
            $("#portal_content_7").delay(300).fadeToggle(300);
            tab = "7";
            break;
        case "7":
            $("#portal_header_7").fadeToggle(300);
            $("#portal_content_7").fadeToggle(300);
            $("#portal_header_6").delay(300).fadeToggle(300);
            $("#portal_content_6").delay(300).fadeToggle(300);
            tab = "6";
            break;
        case "6":
            $("#portal_header_6").fadeToggle(300);
            $("#portal_content_6").fadeToggle(300);
            $("#portal_header_5").delay(300).fadeToggle(300);
            $("#portal_content_5").delay(300).fadeToggle(300);
            tab = "5";
            break;
        case "5":
            $("#portal_header_5").fadeToggle(300);
            $("#portal_content_5").fadeToggle(300);
            $("#portal_header_4").delay(300).fadeToggle(300);
            $("#portal_content_4").delay(300).fadeToggle(300);
            tab = "4";
            break;
        case "4":
            $("#portal_header_4").fadeToggle(300);
            $("#portal_content_4").fadeToggle(300);
            $("#portal_header_3").delay(300).fadeToggle(300);
            $("#portal_content_3").delay(300).fadeToggle(300);
            tab = "3";
            break;
        case "3":
            $("#portal_header_3").fadeToggle(300);
            $("#portal_content_3").fadeToggle(300);
            $("#portal_header_2").delay(300).fadeToggle(300);
            $("#portal_content_2").delay(300).fadeToggle(300);
            tab = "2";
            break;
        case "2":
            $("#portal_header_2").fadeToggle(300);
            $("#portal_content_2").fadeToggle(300);
            $("#portal_return").fadeToggle(300);
            $("#portal_header_1").delay(300).fadeToggle(300);
            $("#portal_content_1").delay(300).fadeToggle(300);
            tab = "1";
            break;
        case "1":
            $("#portal_header_1").fadeToggle(300);
            $("#portal_content_1").fadeToggle(300);
            $("#portal_header_9").delay(300).fadeToggle(300);
            $("#portal_content_9").delay(300).fadeToggle(300);
            $("#portal_return").delay(300).fadeToggle(300);
            tab = "9";
            break;
 
        case "5c":
            $("#portal_header_5c").fadeToggle(300);
            $("#portal_content_5c").fadeToggle(300);
            $("#portal_header_5b").delay(300).fadeToggle(300);
            $("#portal_content_5b").delay(300).fadeToggle(300);
            tab = "5b";
            break;
        case "5b":
            $("#portal_header_5b").fadeToggle(300);
            $("#portal_content_5b").fadeToggle(300);
            $("#portal_header_5a").delay(300).fadeToggle(300);
            $("#portal_content_5a").delay(300).fadeToggle(300);
            tab = "5a";
            break;
        case "5a":
            $("#portal_header_5a").fadeToggle(300);
            $("#portal_content_5a").fadeToggle(300);
            $("#portal_header_5c").delay(300).fadeToggle(300);
            $("#portal_content_5c").delay(300).fadeToggle(300);
            tab = "5c";
            break;
    }
});
 
$("#portal_next").click( function() {
    switch(tab) {
        case "1":
            $("#portal_header_1").fadeToggle(300);
            $("#portal_content_1").fadeToggle(300);
            $("#portal_header_2").delay(300).fadeToggle(300);
            $("#portal_content_2").delay(300).fadeToggle(300);
            $("#portal_return").delay(300).fadeToggle(300);
            tab = "2";
            break;
        case "2":
            $("#portal_header_2").fadeToggle(300);
            $("#portal_content_2").fadeToggle(300);
            $("#portal_header_3").delay(300).fadeToggle(300);
            $("#portal_content_3").delay(300).fadeToggle(300);
            tab = "3";
            break;
        case "3":
            $("#portal_header_3").fadeToggle(300);
            $("#portal_content_3").fadeToggle(300);
            $("#portal_header_4").delay(300).fadeToggle(300);
            $("#portal_content_4").delay(300).fadeToggle(300);
            tab = "4";
            break;
        case "4":
            $("#portal_header_4").fadeToggle(300);
            $("#portal_content_4").fadeToggle(300);
            $("#portal_header_5").delay(300).fadeToggle(300);
            $("#portal_content_5").delay(300).fadeToggle(300);
            tab = "5";
            break;
        case "5":
            $("#portal_header_5").fadeToggle(300);
            $("#portal_content_5").fadeToggle(300);
            $("#portal_header_6").delay(300).fadeToggle(300);
            $("#portal_content_6").delay(300).fadeToggle(300);
            tab = "6";
            break;
        case "6":
            $("#portal_header_6").fadeToggle(300);
            $("#portal_content_6").fadeToggle(300);
            $("#portal_header_7").delay(300).fadeToggle(300);
            $("#portal_content_7").delay(300).fadeToggle(300);
            tab = "7";
            break;
        case "7":
            $("#portal_header_7").fadeToggle(300);
            $("#portal_content_7").fadeToggle(300);
            $("#portal_header_8").delay(300).fadeToggle(300);
            $("#portal_content_8").delay(300).fadeToggle(300);
            tab = "8";
            break;
        case "8":
            $("#portal_header_8").fadeToggle(300);
            $("#portal_content_8").fadeToggle(300);
            $("#portal_header_9").delay(300).fadeToggle(300);
            $("#portal_content_9").delay(300).fadeToggle(300);
            tab = "9";
            break;
        case "9":
            $("#portal_header_9").fadeToggle(300);
            $("#portal_content_9").fadeToggle(300);
            $("#portal_return").fadeToggle(300);
            $("#portal_header_1").delay(300).fadeToggle(300);
            $("#portal_content_1").delay(300).fadeToggle(300);
            tab = "1";
            break;
 
        case "5a":
            $("#portal_header_5a").fadeToggle(300);
            $("#portal_content_5a").fadeToggle(300);
            $("#portal_header_5b").delay(300).fadeToggle(300);
            $("#portal_content_5b").delay(300).fadeToggle(300);
            tab = "5b";
            break;
        case "5b":
            $("#portal_header_5b").fadeToggle(300);
            $("#portal_content_5b").fadeToggle(300);
            $("#portal_header_5c").delay(300).fadeToggle(300);
            $("#portal_content_5c").delay(300).fadeToggle(300);
            tab = "5c";
            break;
        case "5c":
            $("#portal_header_5c").fadeToggle(300);
            $("#portal_content_5c").fadeToggle(300);
            $("#portal_header_5a").delay(300).fadeToggle(300);
            $("#portal_content_5a").delay(300).fadeToggle(300);
            tab = "5a";
            break;
    }
});
 
$(".portal_link_2").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_2").delay(300).fadeToggle(300);
    $("#portal_content_2").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "2";
});
 
$(".portal_link_3").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_3").delay(300).fadeToggle(300);
    $("#portal_content_3").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "3";
});
 
$(".portal_link_4").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_4").delay(300).fadeToggle(300);
    $("#portal_content_4").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "4";
});
 
$(".portal_link_5").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_5").delay(300).fadeToggle(300);
    $("#portal_content_5").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "5";
});
 
$(".portal_link_6").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_6").delay(300).fadeToggle(300);
    $("#portal_content_6").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "6";
});
 
$(".portal_link_7").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_7").delay(300).fadeToggle(300);
    $("#portal_content_7").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "7";
});
 
$(".portal_link_8").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_8").delay(300).fadeToggle(300);
    $("#portal_content_8").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "8";
});
 
$(".portal_link_9").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_9").delay(300).fadeToggle(300);
    $("#portal_content_9").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "9";
});
 
$(".portal_link_5a").click( function() {
    $("#portal_header_5").fadeToggle(300);
    $("#portal_content_5").fadeToggle(300);
    $("#portal_header_5a").delay(300).fadeToggle(300);
    $("#portal_content_5a").delay(300).fadeToggle(300);
    tab = "5a";
});
 
$(".portal_link_5b").click( function() {
    $("#portal_header_5").fadeToggle(300);
    $("#portal_content_5").fadeToggle(300);
    $("#portal_header_5b").delay(300).fadeToggle(300);
    $("#portal_content_5b").delay(300).fadeToggle(300);
    tab = "5b";
});
 
$(".portal_link_5c").click( function() {
    $("#portal_header_5").fadeToggle(300);
    $("#portal_content_5").fadeToggle(300);
    $("#portal_header_5c").delay(300).fadeToggle(300);
    $("#portal_content_5c").delay(300).fadeToggle(300);
    tab = "5c";
});
 
$(".portal_link_2").hover(
    function() {
        $(".portal_link_2").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_2").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_3").hover(
    function() {
        $(".portal_link_3").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_3").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_4").hover(
    function() {
        $(".portal_link_4").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_4").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_5").hover(
    function() {
        $(".portal_link_5").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_5").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_6").hover(
    function() {
        $(".portal_link_6").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_6").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_7").hover(
    function() {
        $(".portal_link_7").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_7").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_8").hover(
    function() {
        $(".portal_link_8").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_8").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_9").hover(
    function() {
        $(".portal_link_9").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_9").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_5a").hover(
    function() {
        $(".portal_link_5a").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_5a").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_5b").hover(
    function() {
        $(".portal_link_5b").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_5b").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_5c").hover(
    function() {
        $(".portal_link_5c").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_5c").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link a").removeAttr("href");