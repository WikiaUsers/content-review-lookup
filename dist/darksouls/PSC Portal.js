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
        case "22":
            $("#portal_header_22").fadeToggle(300);
            $("#portal_content_22").fadeToggle(300);
            $("#portal_header_21").delay(300).fadeToggle(300);
            $("#portal_content_21").delay(300).fadeToggle(300);
            tab = "21";
            break;
        case "21":
            $("#portal_header_21").fadeToggle(300);
            $("#portal_content_21").fadeToggle(300);
            $("#portal_header_20").delay(300).fadeToggle(300);
            $("#portal_content_20").delay(300).fadeToggle(300);
            tab = "20";
            break;
        case "20":
            $("#portal_header_20").fadeToggle(300);
            $("#portal_content_20").fadeToggle(300);
            $("#portal_header_19").delay(300).fadeToggle(300);
            $("#portal_content_19").delay(300).fadeToggle(300);
            tab = "19";
            break;
        case "19":
            $("#portal_header_19").fadeToggle(300);
            $("#portal_content_19").fadeToggle(300);
            $("#portal_header_18").delay(300).fadeToggle(300);
            $("#portal_content_18").delay(300).fadeToggle(300);
            tab = "18";
            break;
        case "18":
            $("#portal_header_18").fadeToggle(300);
            $("#portal_content_18").fadeToggle(300);
            $("#portal_header_17").delay(300).fadeToggle(300);
            $("#portal_content_17").delay(300).fadeToggle(300);
            tab = "17";
            break;
        case "17":
            $("#portal_header_17").fadeToggle(300);
            $("#portal_content_17").fadeToggle(300);
            $("#portal_header_16").delay(300).fadeToggle(300);
            $("#portal_content_16").delay(300).fadeToggle(300);
            tab = "16";
            break;
        case "16":
            $("#portal_header_16").fadeToggle(300);
            $("#portal_content_16").fadeToggle(300);
            $("#portal_header_15").delay(300).fadeToggle(300);
            $("#portal_content_15").delay(300).fadeToggle(300);
            tab = "15";
            break;
        case "15":
            $("#portal_header_15").fadeToggle(300);
            $("#portal_content_15").fadeToggle(300);
            $("#portal_header_14").delay(300).fadeToggle(300);
            $("#portal_content_14").delay(300).fadeToggle(300);
            tab = "1";
            break;
        case "14":
            $("#portal_header_14").fadeToggle(300);
            $("#portal_content_14").fadeToggle(300);
            $("#portal_header_13").delay(300).fadeToggle(300);
            $("#portal_content_13").delay(300).fadeToggle(300);
            tab = "13";
            break;
        case "13":
            $("#portal_header_13").fadeToggle(300);
            $("#portal_content_13").fadeToggle(300);
            $("#portal_header_12").delay(300).fadeToggle(300);
            $("#portal_content_12").delay(300).fadeToggle(300);
            tab = "12";
            break;
        case "12":
            $("#portal_header_12").fadeToggle(300);
            $("#portal_content_12").fadeToggle(300);
            $("#portal_header_11").delay(300).fadeToggle(300);
            $("#portal_content_11").delay(300).fadeToggle(300);
            tab = "11";
            break;
        case "11":
            $("#portal_header_11").fadeToggle(300);
            $("#portal_content_11").fadeToggle(300);
            $("#portal_header_10").delay(300).fadeToggle(300);
            $("#portal_content_10").delay(300).fadeToggle(300);
            tab = "10";
            break;
        case "10":
            $("#portal_header_10").fadeToggle(300);
            $("#portal_content_10").fadeToggle(300);
            $("#portal_header_9").delay(300).fadeToggle(300);
            $("#portal_content_9").delay(300).fadeToggle(300);
            tab = "9";
            break;
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
            $("#portal_header_22").delay(300).fadeToggle(300);
            $("#portal_content_22").delay(300).fadeToggle(300);
            $("#portal_return").delay(300).fadeToggle(300);
            tab = "22";
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
            $("#portal_header_10").delay(300).fadeToggle(300);
            $("#portal_content_10").delay(300).fadeToggle(300);
            tab = "10";
            break;
        case "10":
            $("#portal_header_10").fadeToggle(300);
            $("#portal_content_10").fadeToggle(300);
            $("#portal_header_11").delay(300).fadeToggle(300);
            $("#portal_content_11").delay(300).fadeToggle(300);
            tab = "11";
            break;
        case "11":
            $("#portal_header_11").fadeToggle(300);
            $("#portal_content_11").fadeToggle(300);
            $("#portal_header_12").delay(300).fadeToggle(300);
            $("#portal_content_12").delay(300).fadeToggle(300);
            tab = "12";
            break;
        case "12":
            $("#portal_header_12").fadeToggle(300);
            $("#portal_content_12").fadeToggle(300);
            $("#portal_header_13").delay(300).fadeToggle(300);
            $("#portal_content_13").delay(300).fadeToggle(300);
            tab = "13";
            break;
        case "13":
            $("#portal_header_13").fadeToggle(300);
            $("#portal_content_13").fadeToggle(300);
            $("#portal_header_14").delay(300).fadeToggle(300);
            $("#portal_content_14").delay(300).fadeToggle(300);
            tab = "14";
            break;
        case "14":
            $("#portal_header_14").fadeToggle(300);
            $("#portal_content_14").fadeToggle(300);
            $("#portal_header_15").delay(300).fadeToggle(300);
            $("#portal_content_15").delay(300).fadeToggle(300);
            tab = "15";
            break;
        case "15":
            $("#portal_header_15").fadeToggle(300);
            $("#portal_content_15").fadeToggle(300);
            $("#portal_header_16").delay(300).fadeToggle(300);
            $("#portal_content_16").delay(300).fadeToggle(300);
            tab = "16";
            break;
        case "16":
            $("#portal_header_16").fadeToggle(300);
            $("#portal_content_16").fadeToggle(300);
            $("#portal_header_17").delay(300).fadeToggle(300);
            $("#portal_content_17").delay(300).fadeToggle(300);
            tab = "17";
            break;
        case "17":
            $("#portal_header_17").fadeToggle(300);
            $("#portal_content_17").fadeToggle(300);
            $("#portal_header_18").delay(300).fadeToggle(300);
            $("#portal_content_18").delay(300).fadeToggle(300);
            tab = "18";
            break;
        case "18":
            $("#portal_header_18").fadeToggle(300);
            $("#portal_content_18").fadeToggle(300);
            $("#portal_header_19").delay(300).fadeToggle(300);
            $("#portal_content_19").delay(300).fadeToggle(300);
            tab = "19";
            break;
        case "19":
            $("#portal_header_19").fadeToggle(300);
            $("#portal_content_19").fadeToggle(300);
            $("#portal_header_20").delay(300).fadeToggle(300);
            $("#portal_content_20").delay(300).fadeToggle(300);
            tab = "20";
            break;
        case "20":
            $("#portal_header_20").fadeToggle(300);
            $("#portal_content_20").fadeToggle(300);
            $("#portal_header_21").delay(300).fadeToggle(300);
            $("#portal_content_21").delay(300).fadeToggle(300);
            tab = "21";
            break;
        case "21":
            $("#portal_header_21").fadeToggle(300);
            $("#portal_content_21").fadeToggle(300);
            $("#portal_header_22").delay(300).fadeToggle(300);
            $("#portal_content_22").delay(300).fadeToggle(300);
            tab = "22";
            break;
        case "22":
            $("#portal_header_22").fadeToggle(300);
            $("#portal_content_22").fadeToggle(300);
            $("#portal_return").fadeToggle(300);
            $("#portal_header_1").delay(300).fadeToggle(300);
            $("#portal_content_1").delay(300).fadeToggle(300);
            tab = "1";
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

$(".portal_link_10").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_10").delay(300).fadeToggle(300);
    $("#portal_content_10").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "10";
});

$(".portal_link_11").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_11").delay(300).fadeToggle(300);
    $("#portal_content_11").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "11";
});

$(".portal_link_12").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_12").delay(300).fadeToggle(300);
    $("#portal_content_12").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "12";
});

$(".portal_link_13").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_13").delay(300).fadeToggle(300);
    $("#portal_content_13").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "13";
});

$(".portal_link_14").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_14").delay(300).fadeToggle(300);
    $("#portal_content_14").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "14";
});

$(".portal_link_15").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_15").delay(300).fadeToggle(300);
    $("#portal_content_15").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "15";
});
 
$(".portal_link_16").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_16").delay(300).fadeToggle(300);
    $("#portal_content_16").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "16";
});

$(".portal_link_17").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_17").delay(300).fadeToggle(300);
    $("#portal_content_17").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "17";
});

$(".portal_link_18").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_18").delay(300).fadeToggle(300);
    $("#portal_content_18").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "18";
});

$(".portal_link_19").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_19").delay(300).fadeToggle(300);
    $("#portal_content_19").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "19";
});

$(".portal_link_20").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_20").delay(300).fadeToggle(300);
    $("#portal_content_20").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "20";
});

$(".portal_link_21").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_21").delay(300).fadeToggle(300);
    $("#portal_content_21").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "21";
});

$(".portal_link_22").click( function() {
    $("#portal_header_1").fadeToggle(300);
    $("#portal_content_1").fadeToggle(300);
    $("#portal_header_22").delay(300).fadeToggle(300);
    $("#portal_content_22").delay(300).fadeToggle(300);
    $("#portal_return").delay(300).fadeToggle(300);
    tab = "22";
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
 
$(".portal_link_10").hover(
    function() {
        $(".portal_link_10").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_10").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_11").hover(
    function() {
        $(".portal_link_11").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_11").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link_12").hover(
    function() {
        $(".portal_link_12").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_12").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);

$(".portal_link_13").hover(
    function() {
        $(".portal_link_13").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_13").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);

$(".portal_link_14").hover(
    function() {
        $(".portal_link_14").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_14").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);

$(".portal_link_15").hover(
    function() {
        $(".portal_link_15").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_15").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);

$(".portal_link_16").hover(
    function() {
        $(".portal_link_16").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_16").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);

$(".portal_link_17").hover(
    function() {
        $(".portal_link_17").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_17").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);

$(".portal_link_18").hover(
    function() {
        $(".portal_link_18").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_18").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);

$(".portal_link_19").hover(
    function() {
        $(".portal_link_19").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_19").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);

$(".portal_link_20").hover(
    function() {
        $(".portal_link_20").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_20").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);

$(".portal_link_21").hover(
    function() {
        $(".portal_link_21").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_21").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);

$(".portal_link_22").hover(
    function() {
        $(".portal_link_22").css("text-shadow", "#e1e1e2 0 0 15px");
    }, function() {
        $(".portal_link_22").css("text-shadow", "#e1e1e2 0 0 5px");
    }
);
 
$(".portal_link a").removeAttr("href");