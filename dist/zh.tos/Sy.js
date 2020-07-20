$('<section id="sy-convert"><div class="interface selected"><textarea id="sy-convert-textarea" placeholder="字串"></textarea><br /><input type="button" id="sy-convert-button-encode" value="編碼" /><input type="button" id="sy-convert-button-clear" value="清除" /></div><div class="interface select2"><input type="button" id="sy-convert-button-copy" value="複製" /></div></section>').appendTo('#syData');
StoryConvert = typeof StoryConvert != "undefined" ? StoryConvert : {};
StoryConvert.functions = typeof StoryConvert.functions != "undefined" ? StoryConvert.functions : {};

$("section#sy-convert input#sy-convert-button-encode").click(function() {
    StoryConvert.functions.encode();
});

$("section#sy-convert input#sy-convert-button-clear").click(function() {
    $("section#sy-convert textarea#sy-convert-textarea").val("");
});

$("section#sy-convert input#sy-convert-button-copy").click(function() {
    $("section#sy-convert textarea#sy-convert-textarea").select();
    document.execCommand("Copy");
});

StoryConvert.functions.encode = function() {
    var a = $("section#sy-convert textarea#sy-convert-textarea").val(),
        b = $.parseJSON(a),
        c = ["enterScript", "startScript", "bossScript", "endScript", "clearScript"],
        d = ["%7B%7BStoryDialog%7CF%7D%7D", "%7B%7BStoryDialog%7D%7D", "%7B%7BStoryDialog%7CB%7D%7D", "%7B%7BStoryDialog%7CC%7D%7D", "%7B%7BStoryDialog%7CA%7D%7D"],
        tmp = "";
    if (a.length > 0) {
        $("section#sy-convert textarea#sy-convert-textarea").attr("disabled", "disabled");
        for (i = 0; i < c.length; i++) {
            var ex = b[c[i]];
            if ((ex != null) && (ex != "")) {
                tmp += d[i] + "\n" + format(ex);
            }
        }
        $("section#sy-convert textarea#sy-convert-textarea").val(decodeURI(tmp.replace(/<br>\n$/gi,""))).removeAttr("disabled");
    }
};

function format(e) {
    var te = "";
    $.each(e.split(/\r\n|\n|\r/), function(k, v) {
        var c = v.replace(/#Scene\d+/g, "").split("~");
        te += switchtext(c) + "<br>\n";
    });
    return te;
}

function switchtext(a) {
    var ta = "";
    var tempx = (typeof window.Sytitle != "object") ? ["-1000", "-1001", "-1008"]:window.Sytitle;
    //var tempx = window.Sytitle;
    if (["0", "1"].indexOf(a[parseInt(a.length - 1)]) == -1) a[a.length] = "0";
    a[0] = a[0].split("^")[a[parseInt(a.length - 1)]];
    var ather = (parseInt(a[0]) < 0) ? "%7C"+a[1]:"";
    a.splice([parseInt(a.length-1)]);
    ta = (tempx.indexOf(a[0]) != -1) ? ":" + a[1]:(a.length < 3) ? "%7B%7B" + a[0] + "%7C50%7D%7D：「" + a[1] + "」":"%7B%7B" + a[0] + "%7C50" + ather + "%7D%7D%20" + a[1] + "：「" + a[2] + "」";
    return ta.replace("「『", "『").replace("』」", "』");
}

$('section#sy-convert').css('width', '700px').css('height', '400px').css('overflow', 'hidden').css('background', '#fafafa').css('border', '1px solid #cccccc').css('border-radius', '5px').css('-moz-border-radius', '5px').css('-webkit-border-radius', '5px').css('background-color', '#999').css('text-align', 'center').css('color', '#333333').css('font-size', '15px').css('z-index', '2');
$('section#sy-convert h3').css('border-bottom', '1px solid #333').css('font-size', '15px').css('font-weight', 'bold');
$('section#sy-convert #sy-convert-textarea').css('width', '685px').css('height', '337px').css('resize', 'none');
$('section#sy-convert > div').css('display', 'none').css('width', 'auto').css('text-align', 'right');
$('section#sy-convert > div.selected').css('display', 'inline-block');
$('section#sy-convert > div.select2').css('display', 'grid');