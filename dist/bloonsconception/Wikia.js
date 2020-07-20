$(function() {
    if ( mw.config.get( 'wgPageName' ) == "User_blog:Logologologol/Tools" ) {
        $("#pp").click(function(){$("#p").val($("#p").val().replace(/\./g,'').toUpperCase().split('').join('.')+".");});
        $("#qq").click(function(){$("#q").val($("#q").val().replace(/\./g,'').length);});
        $("#s1").click(function(){$("#moveme").animate({left:"500px"},500000/$("#s").val(),"linear",function(){$(this).css("left","0");});});
        $("#s2").click(function(){$("#moveme").animate({left:"500px"},500000/$("#s").val()/70,"linear",function(){$(this).css("left","0");});});
        $("#rq").click(function(){
            $("#resx").val(+$("#pre").val().split("&")[0]);
            $("#resy").val(+$("#pre").val().split("&")[1]);
        });
        $("#rr").click(function(){
            $("#inch").html("inch");
            var xxresx = $("#resx").val(),
                xxresy = $("#resy").val(),
                xxscrs = $("#scrs").val(),
                xxppi  = Math.sqrt(xxresx*xxresx+xxresy*xxresy)/xxscrs,
                xxpwd  = 25.4/xxppi;
            $("#wid").val(Math.round(100*xxresx/xxppi)/100);
            $("#hig").val(Math.round(100*xxresy/xxppi)/100);
            $("#ppi").val(Math.round(xxppi));
            $("#pp2").val(Math.round(xxppi*xxppi));
            $("#pwd").val(Math.round(10000*xxpwd)/10000);
            $("#psz").val(Math.round(10000*xxpwd*xxpwd)/10000);
        });
        $("#rs").click(function(){
            if ($(".inch").html()==("inch"))
                {
                $(".inch").html("mm");
                $("#wid").val(Math.round(100*$("#wid").val()*25.4)/100);
                $("#hig").val(Math.round(100*$("#hig").val()*25.4)/100);
                }
            else
                {
                $(".inch").html("inch");
                $("#wid").val(Math.round(100*$("#wid").val()/25.4)/100);
                $("#hig").val(Math.round(100*$("#hig").val()/25.4)/100);
                }
        });
    }
});

//Meta's Secret Policy Code

$(function(){if(mw.config.get( 'wgPageName' ) == "Bloons_Conception_Wiki:Policies"){
    var supersecretcode = "";
    var superappended = false;
    var xvceVnz8XOMoq90HY = "00000000";
    var dots = 0;

    xvceVnz8XOMoq90HY = xvceVnz8XOMoq90HY.replace(/0/g,function(){return Math.floor(Math.random() * 9 - 0.0000000000001);});
    $("#mw-content-text").html($("#mw-content-text").html().replace(/\.(?!([^<]+)?>)/g,function(){
        return " ^^" + dots++ + "^^";
    }));
    dots = Math.floor(Math.random() * dots + 1 - 0.0000000000001);
    $("#mw-content-text").html($("#mw-content-text").html().replace(/ \^\^(.+?)\^\^/g,function(ttt){
        if (ttt.substring(3,ttt.length-2)==dots)
            return "<div class='spin' style='cursor:help;display:inline-block;transform-origin:50% 80%;font-size:180%;text-shadow: 0px -2px #88a, 0px -4px #446, 1.73px 1px #88a, 3.46px 2px #446, -1.73px 1px #88a, -3.46px 2px #446' title='Congratulations! You have found the Super Secret Dot! The password is: " + xvceVnz8XOMoq90HY + "'>.</div>";
        else return ".";
    }));

    $("td").filter(function(){return !isNaN($(this).text())}).click(function(){console.log(supersecretcode += $(this).text().trim())});
    $("th:contains(Notes)").click(function(){
        if(supersecretcode === xvceVnz8XOMoq90HY){
            if(superappended === false){
                $(this).append($("<div id='supersecretrule' style='text-align:left;font-weight:normal;display:none'>").load("/wiki/Project:Supersecretpage #mw-content-text", function(){
                        $("#supersecretrule").slideDown(4000);
                        superappended = true;
                    }));
                }
                else $("#supersecretrule").slideDown(4000);
            }
            else $("#supersecretrule").slideUp(1000);
        supersecretcode="";
    });
}});

//Classes
var bright = $("<div></div>");
$(".hover").hover(function(){
    bright.css({
        "background":"rgba(255,255,255,0.4)",
        "width":"inherit",
        "height":"inherit",
        "position":"inherit",
        "right":"inherit"
    });
    $(this).prepend(bright);
}, function(){
    bright.remove();
});