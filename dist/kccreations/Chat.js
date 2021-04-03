importScriptPage("ChatTags/code.js", "dev");


//Music in Chat 
//Written by Shodai Tsuchi
function Music() {
    $.showCustomModal('Music',
        '<input style="font-size:16px" type="text" id="music" placeholder="Insert Link (e.g: v/Pgum6OT_VH8)"></input>', {
            id: 'CANCEL',
            width: 380,
            buttons: [{
                message: 'OK',
                defaultButton: true,
                handler: function () {
                if ( CONFIRM("You really want to put music on chat?")) {
                    addMusic();   
                } 
            }	
            },{		 
                message: 'Cancel',
                handler: function () {
                    close();    
                }
            }]
    });
}
 
function close() {
    $(' CANCEL').closeModal();
}
 
function addMusic() { 
    var music = $('#music').val();  
    music = $('body').append('<div class="right" style= POSITION:fixed; top:1005px; right:5px; z-index:5"><div style="width: 202px; overflow: hidden; height: 21px; margin-top: 5px; margin-bottom: 5px; margin-right: 5px; position:relative; top:; border: 3px outset #0f0f0f"><iframe width="417" height="23" src="https://www.youtube.com/' + music + '?version=3&hl=en_US&theme=dark&color=white&loop=1&autoplay=1" frameborder="0" allowfullscreen=0></iframe></div></div>');
    $('#cancel').closeModal();
}
 
$('<a class="wikia-button" href="javascript:Music()" style="position:absolute; right:100px; top:0;">Music</a>').appendTo($('.Write'));