  function disco() {
        var elements = document.getElementsByTagName('*');
        for (var i = elements.length - 1; i >= 0; i--) {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            elements[i].style.color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            elements[i].style.backgroundColor = '#' + r.toString(16) + g.toString(16) + b.toString(16);
        };
        setTimeout(disco, 120);
    };
    var kkeys = [],
    konami = "73,76,73,75,69,80,73,69"; // I like pie
    $(document).keydown(function (e) {
        if(e.keyCode===32){ // 32 = space = they can do ilikepie kthx
            return;
        }
        kkeys.push(e.keyCode);
        if (kkeys.toString().indexOf(konami) >= 0) {
            $(document).unbind('keydown', arguments.callee);
            disco();
            $('body').append('<iframe title="YouTube video player" width="0" height="0" src="http://www.youtube.com/embed/-1mvN6lU0oU?rel=0;autoplay=1"></iframe>');
            $('body').append('<img id="elTroll" src="http://4.bp.blogspot.com/_vI6LGR352yE/TIA8dD6tRII/AAAAAAAAACA/Az2WOCv-rcQ/S220/Transparent_Trollface2.png" />');
            $('#elTroll').css({
                "position": "fixed",
                "bottom": "0px",
            })
           $('body').append('<img id="elTrolls" src="http://4.bp.blogspot.com/_vI6LGR352yE/TIA8dD6tRII/AAAAAAAAACA/Az2WOCv-rcQ/S220/Transparent_Trollface2.png" />');
            $('#elTrolls').css({
                "position": "fixed",
                "bottom": "0px",
                "right": "0px",
            })
            $('body').append('<img id="elTrollss" src="http://4.bp.blogspot.com/_vI6LGR352yE/TIA8dD6tRII/AAAAAAAAACA/Az2WOCv-rcQ/S220/Transparent_Trollface2.png" />');
            $('#elTrollss').css({
                "position": "fixed",
                "top": "0px",
                "right": "0px",
            })
            $('body').append('<img id="elTrollsss" src="http://4.bp.blogspot.com/_vI6LGR352yE/TIA8dD6tRII/AAAAAAAAACA/Az2WOCv-rcQ/S220/Transparent_Trollface2.png" />');
            $('#elTrollsss').css({
                "position": "fixed",
                "top": "0px",
            })
            $(".WikiaNotifications").html("<li><div style=\"padding:6px 15px 6px 20px;line-height:1.3;font-size:11px;\">Damn didn't see that coming did you? :D</div></li></ul>");
            var interval = null;
            var counter = 0;
            clearInterval(interval);
            interval = setInterval(function(){
                if (counter != -360) {
                    counter -= 1;
                    $('#elTroll').css({
                        MozTransform: 'rotate(-' + -counter + 'deg)',
                        WebkitTransform: 'rotate(' + -counter + 'deg)',
                        transform: 'rotate(' + -counter + 'deg)'
                    });
                    $('#elTrolls').css({
                        MozTransform: 'rotate(-' + -counter + 'deg)',
                        WebkitTransform: 'rotate(' + -counter + 'deg)',
                        transform: 'rotate(' + -counter + 'deg)'
                    });
                    $('#elTrollss').css({
                        MozTransform: 'rotate(-' + -counter + 'deg)',
                        WebkitTransform: 'rotate(' + -counter + 'deg)',
                        transform: 'rotate(' + -counter + 'deg)'
                    });
                    $('#elTrollsss').css({
                        MozTransform: 'rotate(-' + -counter + 'deg)',
                        WebkitTransform: 'rotate(' + -counter + 'deg)',
                        transform: 'rotate(' + -counter + 'deg)'
                    });
                }else{
                    counter = 360;

                }
            }, 10);

        }
    });
$(function () {
$("<ul id=\"WikiaNotifications\" class=\"WikiaNotifications\" style=\"position:fixed;z-index:9001;margin:0;left:0;\"><li><div style=\"padding:6px 15px 6px 20px;line-height:1.3;font-size:11px;\">Did you know that you can get free pie by typing <span style=\"color:white;\"><br /><u>i like pie</u><br /></span>Yes on this website...<br /> Doesn't hurt to try right?</div></li></ul>").appendTo('ul.tools');
});