var SocialMediaButtonsNamespaces = [0],
    SocialMediaButtons = { colorScheme: "color" };
importScriptPage('SocialIcons/code.js','dev');

$("#ajax-poll-33798EBC9C2FD0CE1DF0CB1A8D839B80").click(function(){
    this.setAttribute('contenteditable', 'true');
    $(this).focus();
}).blur(function(){
    this.setAttribute('contenteditable', 'false'); 
});

$("#content a").click(function(e){
    e.stopPropagation();
});

$("#ajax-poll-33798EBC9C2FD0CE1DF0CB1A8D839B80").css("color:#006cb0");