//Original code by User:Deadcoder
//Script made by User:Prince(ss) Platinum
 
var PowerPageMakerLangPacks = new Object();
$(function () {
PowerPageMakerLangPacks.en = {
    New_Page: "New_Page",
    NewPage: "New Page",
    CreateANewPage: "Tạo Trang Mới",
    main: "Trang",
    blog: "Blog",
    category: "Category:",
    MediaWiki: "MediaWiki:",
    Template: "Template:",
    Forum: "Forum",
    PageTitle: "Tên Trang",
    PageContent: "Kiểu Trang",
    Blank: "Trống",
    Populated: "Trang chính Project",
    Create: "Tạo Trang",
    NeedName: "Hãy điền tên trang cho trang bạn muốn tạo.",
    BlogURL: "Special:CreateBlogPage",
    forumDomain: "Topic:",
    genericError: "Bị Lỗi"
};

    var lang = wgPageContentLanguage;
    var langpacks = PowerPageMakerLangPacks;
 
    $(function () {
        for (var j = 0; j < document.getElementsByClassName("createpage").length; j++) {
            document.getElementsByClassName("createpage")[j].addEventListener("click", function () {
                setTimeout(function () {
                    window.location.replace("http://" + location.hostname + "/wiki/" + langpacks[lang].New_Page);
                }, 314);
            });
        }
        $("#p-search").ready(function(){
             $("#p-search").append('<a href="http://' + location.hostname + '/wiki/' + langpacks[lang].New_Page + '"><button type="button" id="newpagebutton" style="height:2em;width:10em;font-weight:700;">' + langpacks[lang].NewPage + '</button></a>');
        });
       $("#quickbar").ready(function(){
             $("#quickbar").append('<a href="http://' + location.hostname + '/wiki/' + langpacks[lang].New_Page + '"><button type="button" id="newpagebutton" style="height:2em;width:10em;font-weight:700;">' + langpacks[lang].NewPage + '</button></a>');
        });
    });
 
    if (mw.config.get("wgPageName") === langpacks[lang].New_Page) {
 
    var html = '<table style="direction:ltr; font-family: Lucida Bright, Arial, Verdana; font-size:1em; margin:1em auto; width:650px; -moz-border-radius:24px; -webkit-border-radius:24px; border-radius: 24px; border:2px solid red; padding:12px; text-align:justify; background-color:white; color:black;"><tbody><tr><th><center><span style="color:red"><p class="MarckScript"><b>Sonako Wiki - Chú ý </b></p></span></center></th></tr><tr><td><center><a href="/wiki/Thread:63417" title="Thread:63417">Không tạo Trang mới khi chưa qua bài Test năng lực. Click vào đây để biết thêm chi tiết</a></center></td></tr></tbody></table><span id="form0"><fieldset style="padding: 15px; width: 94%; font-size:120%; border: solid 1px #FFFFFF;"> <h3 style="padding:5px; font-size:120%; font-weight:700;" id="pageTitle">' + langpacks[lang].CreateANewPage + '</h3> <span name="option" style="border: 3px solid #FF00FF; padding: 5px;"><input type="radio" name="namespace" value="main" checked="checked">' + langpacks[lang].main + '</input></span> <span name="option" style="border: 3px solid #FFFF00; padding: 5px;"><input type="radio" name="namespace" value="blog">' + langpacks[lang].blog + '</input></span> <span name="option" style="border: 3px solid #FF8800; padding: 5px;"><input type="radio" name="namespace" value="category">' + langpacks[lang].category + '</input></span> <span name="option" style="border: 3px solid #00FFFF; padding: 5px;"><input type="radio" name="namespace" value="mediawiki">' + langpacks[lang].MediaWiki + '</input></span> <span name="option" style="border: 3px solid #00FF00; padding: 5px;"><input type="radio" name="namespace" value="template">' + langpacks[lang].Template + '</input></span> <span name="option" style="border: 3px solid #1111FF; padding: 5px;"><input type="radio" name="namespace" value="forum">' + langpacks[lang].Forum + '</input></span> <br/><br/><input type="text" id="NewPageTitle" placeholder="' + langpacks[lang].PageTitle + '" style="height:2.5em; width:99%;" x-webkit-speech="x-webkit-speech" /><br/><br/><span>' + langpacks[lang].PageContent + ': </span><span name="option" style="border: 3px solid #FF0000; padding: 5px;"><input type="radio" name="pagecontent" value="blank" checked="checked">' + langpacks[lang].Blank + '</input></span> <span name="option" style="border: 3px solid #FF2288; padding: 5px;"><input type="radio" name="pagecontent" value="populated">' + langpacks[lang].Populated + '</input></span> <button id="createpage" type="button" style="float: right; height:2.5em; width:10em; font-weight:700;" type="button" onclick="PowerPageMakerMakeNewPage();">' + langpacks[lang].Create + '</button></fieldset></span>';
    $("#WikiaArticle").ready(function(){
       $("#WikiaArticle").html(html);
    });
    $("#bodyContent").ready(function(){
       $("#bodyContent").html(html);
    });
    $("#article").ready(function(){
       $("#article").html(html);
    });
    }
});
 
function PowerPageMakerMakeNewPage () {
    var lang = wgPageContentLanguage;
    var langpacks = PowerPageMakerLangPacks;
    var namespace,
        pagetosend = document.getElementById("NewPageTitle").value || "NULL",
        content;
 
    if (pagetosend === "NULL") {
        alert(langpacks[lang].NeedName);
        return;
    }
 
    var radioname = document.getElementsByName("namespace"),
        radiocont = document.getElementsByName("pagecontent");
 
    for (var i = 0; i < radioname.length; i++) {
        if (radioname[i].checked) {
            namespace = radioname[i].value;
            break;
        }
    }
 
    for (i = 0; i < radiocont.length; i++) {
        if (radiocont[i].checked) {
            content = radiocont[i].value;
            break;
        }
    }
 
    var wgServer = mw.config.get("wgServer") + '/wiki/';
    var link;
    switch (namespace) {
        case "main":
            link = wgServer + pagetosend + '?action=edit';
            break;
        case "blog":
            link = wgServer + langpacks[lang].BlogURL;
            if (langpacks[lang].BlogURL === "FAULT") {
                alert(langpacks[lang].genericError);
                return;
            }
            break;
        case "category":
            link = wgServer + langpacks[lang].category + pagetosend + '?action=edit';
            break;
        case "mediawiki":
            link = wgServer + langpacks[lang].MediaWiki + pagetosend + '?action=edit';
            break;
        case "template":
            link = wgServer + langpacks[lang].Template + pagetosend + '?action=edit';
            break;
        case "forum":
            link = wgServer + langpacks[lang].forumDomain + pagetosend + '?openEditor=1';
            if (langpacks[lang].forumDomain === "FAULT") {
                alert(langpacks[lang].genericError);
                return;
            }
            break;
        default:
            alert(langpacks[lang].genericError);
            return;
    }
    if ((content === 'populated') && (namespace !== 'forum') && (namespace !== 'mediawiki') && (namespace !== 'blog')) {
        link += "&preload=Template:Project_Page";
    }
    window.location = link;
}
//