//<source lang="jquery">
/* .................    http://brainstorm.com.ua/   ............... #
#                                                                   #
#                                                                   #
#           Strawberry Fields Forever Public License                #
#                                                                   #
#     0. Овладевая этот Джаваскрипт любым образом, вы признаёте,    #
#                что земляничные поля вечны...                      #
#                                                                   #
#                                                                   #
#      http://ru.elderscrolls.wikia.com/wiki/Карта_(Skyrim)         #
#                                                                   #
# ================================================================= #
*/



// Scroll-disabler
$.fn.disableScroll = function() {
    var oldScrollPos = $(window).scrollTop();

    $(window).on('scroll.scrolldisabler',function ( event ) {
       $(window).scrollTop( oldScrollPos );
       event.preventDefault();
    });
};
$.fn.enableScroll = function() {
    $(window).off('scroll.scrolldisabler');
};



// CSS, Sir!
importArticles({
    type: "style",
    article: "MediaWiki:SkyrimMap.css"
});



// Fix <br /> in MapMarker tip
function fixbr() {
    var s44ebpElements = document
    .getElementsByClassName("elderscrollsBalloonPopup");
    for (var i = 0; i < s44ebpElements.length; i++)
        s44ebpElements[i].title = 
        s44ebpElements[i].title.split('[br]').join("\n");
}



// Balloon Content Wrapper
var S44mbpInnerHTML = '<div id="S44mapBalloonContainer" '
    +'class="mw-content-ltr mw-content-text">'
    +'<div id="visibleBalloonElement"><div><span id="closeButton">✕</span>'
    +'<div id="s44BaloonCorner"></div></div><div id="S44balloonHeaderOne">'
    +'</div><div id="contentWrapper"></div></div></div>'
    +'<div id="S44bgLayer"></div>',

    // «Please Standby» Arrow
    S44Arrow = '<div style="width: 100%; height: 400px;' +
    'font-size: 400px; position: relative; z-index: 2;">➘</div>',
    
    MainColor = '#4b7a00'; // ??? O_o
 


// Content-wrapper Injection
document.getElementsByTagName("body")[0]
.insertAdjacentHTML('afterbegin', S44mbpInnerHTML);



// Load Map!
$('.ajaxXmlLink, .ajaxLink').on('click', function(){
    
    // Get url
    var url= wgServer + '/index.php?action=render&title=' +
        $(this).attr('id').replace(/\./g, '%'),
        
        // Map Marker Id
        marktxtid=encodeURIComponent($(this).children('a:first')
        .text()).replace(/'/g,"%27").replace(/"/g,"%22").split('%20')
        .join('_').split('%').join('\\.');
        
        
    $('#ajaxContentArea').html(S44Arrow)
    .load(url, function(){
        
        fixbr();
        
        // Red mark
        $('#'+marktxtid).children('img:first')
        .css({
            borderRadius: 9,
            border: '5px solid rgba(190,35,3,0)',
            boxShadow: '0px 0px 12px 12px rgba(190, 35, 3, 0.7)',
            background: 'rgba(190,35,3,0.7)',
            margin: -5
        })
        $('table.wikitable.overlayMap table span#'+marktxtid)
        .closest('table')
        .css({background: 'rgba(190, 35, 3, 0.7)'})
        
        //Scroll down
        $('html, body').animate({
            scrollTop: $('#ajaxContentArea').offset().top-100
        }).animate({
            scrollTop: $('#'+marktxtid).offset().top-100
        })
    })
})



// Load Balloon!
$(document).on('click', '.elderscrollsBalloonPopup', function(){
    
    // Get position
    var tableOffs=$('.overlayMap').offset(),
        iconOffs=$(this).find('img:first').offset(),
        width=$(this).find('img:first').width(),
        height=$(this).find('img:first').height(),
        
        // Get url
        url=wgServer + '/wiki/' +
        $(this).attr('id').replace(/\./g, '%') + '?action=render';
    
    // Title
    $('#S44balloonHeaderOne').text(decodeURIComponent($(this).attr('id')
    .replace(/\./g, '%').replace(/\_/g, '%20')))
    
    
    // Green Mark
    $('#S44tempMark').attr('id', '')  // Reset old
        // ...
        // Attach new!
    $(this).children('img:first').attr('id', 'S44tempMark')
    
    
    // ========================
    //        Geometry
    // ========================
    $('#s44BaloonCorner')
    .css({marginLeft:iconOffs.left-tableOffs.left+
    
    // Monobook or not?
    (wgSkin=='monobook'?(width/2):50+(width*0.66))+
    
    // Rail-correction
    (wgSkin=='monobook'?150:
    ($('#WikiaRail').width()>300?0:-150))+
    100 // Width-correction
    })
    
    $('#visibleBalloonElement')
    .css({marginTop:(height/2)+5+iconOffs.top})

    
    // Viewport centering
    $('html, body').animate({
        scrollTop: $(this).offset().top-70}, {
        complete: function(){
            //  Load Article 2 Balloon and Show!
            $('#contentWrapper').load(url, function(){
                $('#S44mapBalloonContainer, #S44bgLayer').show()
                
                // Disable Scroll!!!
                $("html, body").disableScroll();
                
                // Reset Viewport Scroller!!!
                $('#contentWrapper').animate({
                    scrollTop: 0
                })
            })
        }
    })
})



// Close Balloon!
$('#closeButton, #S44bgLayer').on('click', function(){
    $('#S44mapBalloonContainer, #S44bgLayer').hide()
    
    $("html, body").enableScroll();
})


// Override. Just Scroll-on-click
$('a[href$="#top"]').on('click', function(){
    $(this).attr('href', 'javascript:void(0);')
})

fixbr();


//</source>