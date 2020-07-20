/* Chat rules jQueryUI dialog by User:Mythrun */

$('.ChatModule .chat-name').html('Read the <a href="http://legouniverse.wikia.com/wiki/Project:Policy#Chat">rules</a> before joining!');

$('.ChatModule .chat-join').html('<button class="openrules">Join the Chat</button><style type="text/css">@import url(http://code.jquery.com/ui/1.8.24/themes/dark-hive/jquery-ui.css);</style><div class="chatrules" title="Chat Rules"><div style="font-weight:bold;">By clicking "Yes", you agree to follow the rules of the chat:</div><div class="textarea WikiaArticle" style="margin-top:10px;margin-bottom:10px;height:200px;overflow-y:scroll;">Inappropriate language is not allowed.<ul><li>Usage of inappropriate language will result in a warning.</li></ul><ul><li>Continued usage of inappropriate language will result in a one month ban from chat.</li></ul><ul><li>Continued usage of inappropriate language after a one month ban will result in a ban from chat for an indefinite amount of time.</li></ul><ul><li>If a link is to be given in chat, the page being linked to must be completely clean of any inappropriate language and/or material, or action corresponding to the severity of the offense will be taken.</li></ul>Advertising is not allowed in chat.<ul><li>Advertising will result in a warning.</li></ul><ul><li>Continued advertising will result in a one week ban from chat.</li></ul>Languages other than English are not allowed in chat.<ul><li>Usage of languages other than English will result in a warning.</li></ul><ul><li>Continued usage of languages other than English will result in a one week ban from chat.</li></ul>Spam is not allowed in chat.<ul><li>Spam will result in a warning.</li></ul><ul><li>Continued spam will result in a one day ban from chat.</li></ul><ul><li>Continued spam after a one day ban will result in a one week ban from chat.</li></ul><ul><li>Continued spam after a one week ban will result in a one month ban from chat.</li></ul><ul><li>Continued spam after a one month ban will result in a ban from chat for an indefinite amount of time.</li></ul></div></div>');
 
$( ".chatrules" ).dialog({
autoOpen: false,
draggable: false,
resizable: false,
open:function(){ $("body").css("overflow","hidden"); $(".chatrules").css("display","inherit !important"); $("#acceptrules").prop('disabled', true); $('.ui-dialog :button').blur(); } ,
close:function(){ $("body").css("overflow","auto"); $(".chatrules").css("display","none"); } ,
buttons: [
{ id: "acceptrules", text: "Yes", click: function() { $( this ).dialog( "close" ); ChatEntryPoint.onClickChatButton(true, '/wiki/Special:Chat'); } },
{ text: "No", click: function() { $( this ).dialog( "close" ); } } ]
});
 
$( ".openrules" ).click(function() {
$( ".chatrules" ).dialog( "open" );
return false;
});

$('.chatrules .textarea').scroll(function() {
    if ($(this).scrollTop() == $(this)[0].scrollHeight - $(this).height()) {
        $('#acceptrules').removeAttr('disabled');
    }
});

/* Outside link jQueryUI dialog by User:Mythrun */

$('body').append('<style type="text/css">@import url(http://code.jquery.com/ui/1.8.24/themes/dark-hive/jquery-ui.css);</style><div class="outsidelink" style="font-family:nunito;" title="Attention!">You are leaving <span style="font-weight:bold;font-size:105%;color:#fac117;">legouniverse.wikia.com</span>!<br /> We are not responsible for any content on <span class="outsideurl" style="font-weight:bold;font-size:105%;color:#fac117;"></span>!</div>');

$( ".outsidelink" ).dialog(
    {
        autoOpen: false,
        draggable: false,
        resizable: false,
        open:function(){ $("body").css("overflow","hidden"); $(".outsidelink").css("display","inherit !important"); $('.ui-dialog :button').blur(); } ,
        close:function(){ $("body").css("overflow","auto"); $(".outsidelink").css("display","none"); } ,
        buttons: 
        [
            { text: "BACK TO LEGOUNIVERSE.WIKIA.COM", click: function() { $( this ).dialog( "close" ); } },
            { id: "continue", text: "CONTINUE", click: function() { $( this ).dialog( "close" ); } } 
        ]
    }
);

$('a[href^="http://"]').not('[href^="http://legouniverse.wikia.com"], [class="image"]').click(
    function() {
        $( ".outsidelink" ).dialog( "close" );
        var outsidelink = $(this).attr("href");
        var urlattr = $(this).attr("url");
        if (outsidelink!=undefined)
        {
            $(this).attr("url", outsidelink );
            $(this).removeAttr("href");
            $( ".outsidelink" ).dialog( "open" );
            $( ".outsidelink .outsideurl" ).html( decodeURIComponent(outsidelink) );
            $( ".outsidelink" ).dialog('option', 'buttons', 
            [
                { text: "BACK TO LEGOUNIVERSE.WIKIA.COM", click: function() { $( this ).dialog( "close" ); } },
                { id: "continue", text: "CONTINUE", click: function() { $( this ).dialog( "close" ); window.open( outsidelink ); } } 
            ]
            );
        }
        else if (urlattr!=undefined)
        {
            $( ".outsidelink" ).dialog( "open" );
            $( ".outsidelink .outsideurl" ).html( decodeURIComponent(urlattr) );
            $( ".outsidelink" ).dialog('option', 'buttons', 
            [
                { text: "BACK TO LEGOUNIVERSE.WIKIA.COM", click: function() { $( this ).dialog( "close" ); } },
                { id: "continue", text: "CONTINUE", click: function() { $( this ).dialog( "close" ); window.open( urlattr ); } } 
            ]
            );
        }
    }
);