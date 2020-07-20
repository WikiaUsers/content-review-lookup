  /////////////////////////////////////////////////////////////////////////////////////////////
 // This Script allows creating a list of File names in a sequence.                 <nowiki>//
/////////////////////////////////////////////////////////////////////////////////////////////
$('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" href="/wiki/Special:BlankPage/BarfMyList">Page Barf</a></li>');

$(function() {
    if (wgPageName === "Special:BlankPage/BarfMyList") {
        $('#mw-content-text').replaceWith('<div id="mw-content-text"><textarea style="width: 500px;height: 800px;" class="BarfWords"></textarea><div style="position: fixed;bottom: 2.9%;right: 17%;"><input class="BarfStuffSpace" placeholder="NameSpace (File:)"/><input class="BarfStuff" placeholder="Name"/><input class="BarfStuffTwo" placeholder="Max Number"/><input class="BarfNumberThree" placeholder="A suffix?"/><input class="BarfStuffExt" placeholder="Extension (.png)"/><button class="BarfNow">Do it!</button></div><div style="position: fixed;bottom: 5.6%;right: 31.2%;"><input class="BarfReplaceone" placeholder="Val 1"/><input class="BarfReplacetwo" placeholder="Val 2"/><button class="ReplaceNow">Replace!</button></div>')
    }
})

$('.BarfNow').on('click', function() {
    var BarfStuffSpaceT = $('.BarfStuffSpace').val() || '';
    var BarfStuffT = $('.BarfStuff').val() || '';
    var BarfStuffTwoT = parseInt($('.BarfStuffTwo').val()) || 10;
    var BarfNumberThreeT = $('.BarfNumberThree').val() || '';
    var BarfStuffExtT = $('.BarfStuffExt').val() || '';
    for (i = -1; i < BarfStuffTwoT; i++) {
        $('textarea.BarfWords').append(BarfStuffSpaceT + BarfStuffT + i + BarfNumberThreeT + BarfStuffExtT + '\n')
    }
})

$('.ReplaceNow').on('click', function() {
    var BarfRegex = new RegExp($('.BarfReplaceone').val(),"gm");
    var BarfReplacetwo = $('.BarfReplacetwo').val()
    $('.BarfWords').val($('.BarfWords').val().replace(BarfRegex, BarfReplacetwo));
})