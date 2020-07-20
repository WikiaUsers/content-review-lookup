//Intended for personal use

//Simulate enter key
var e = jQuery.Event("keypress");
e.which = 13;
e.keyCode = 13;

if (wgCanonicalSpecialPageName=="Chat" && skin=="oasis") {
    console.log("Ready");
    $(".Rail").append('<h1 class="private" style="display: block;">Menu</h1>');
    addButton('clear', 'Clear box');
    $("body").on("DOMNodeInserted", function() {
        $('.Chat img.avatar').click(function() { $('textarea[name="message"]').val($(this).parent().data('user')) });
    });
}

function addButton(id, buttonName) {
    $(".Rail").append('<li id="'+id+'" class="chatbutton User">'+buttonName+'</li>');
}

$('#clear').click(function()
{
    $('textarea[name="message"]').val("");
});